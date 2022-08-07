const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const server = app.listen(15000, () => {
    console.log('server start, port 15000')
    createPool();
})

async function createPool(){
    connection = await oracledb.createPool({
        user          : "SMS",
        password      : "a9876",
        connectString : "MJOO",
        poolAlias: "dbPool"
    })
}

const oracledb = require('oracledb')

oracledb.initOracleClient({libDir:"./instantclient_21_6"})
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

oracledb.autoCommit = true

app.post('/login', (request, response) => {
    console.log('로그인');
    getLogin(request, response)
})

app.post('/insert', (request,response) => {
    console.log('게시글 삽입');
    getInsert(request,response)
})

app.get('/getList', (request,response) => {
    console.log('게시글 조회');
    getList(request,response)
})

app.get('/getComment', (request,response) => {
    console.log('댓글, 추천 조회');
    getComment(request,response)
})

app.post('/insert_comment',(request,response) => {
    console.log('댓글 삽입');
    getInsertComment(request,response)
})

app.post('/update_comment',(request,response) => {
    console.log('댓글 수정');
    getUpdateComment(request,response)
})

app.post('/delete_comment',(request,response) => {
    console.log('댓글 삭제');
    getDeleteComment(request,response)
})

app.get('/getIDPW', (request,response) => {
    console.log('게시글 작성자의 아이디, 비밀번호 조회');
    getIDPW(request,response)
})

app.post('/delete',(request,response) => {
    console.log('게시글 삭제');
    getDelete(request,response)
})

// 게시글 수정
app.post('/update',(request,response) => {
    console.log('게시글 수정');
    getUpdate(request,response)
})

// 좋아요 삽입
app.post('/insert_like',(request,response) => {
    console.log('좋아요 삽입');
    getInsertLike(request,response)
})

// 좋아요 삭제
app.post('/delete_like',(request,response) => {
    console.log('좋아요 삭제');
    getDeleteLike(request,response)
})



// 로그인
async function getLogin(request, response) {
    let connection
    try {
        // connection = await oracledb.getConnection({
        //     user          : "SMS",
        //     password      : "a9876",
        //     connectString : "MJOO"
        // })
        connection = await oracledb.getConnection('dbPool')
        let queryString = request.body;

        let id = queryString['USER_ID']
        let pw = queryString['PASSWORD']

        let message = ''

        if (!id) {
            message += '아이디를 입력해주세요. '
        }
        if (!pw) {
            message += '비밀번호를 입력해주세요. '
        }

        if(message != '' ){
            response.json({'code':'1', 'message' : message.substring(0, message.length-1)})
        }else{
            let sql = `SELECT USER_ID, PASSWORD, NICKNAME FROM PROGRAM_USER WHERE USER_ID = '${id}'`
            const result = await connection.execute(sql)

            let f_id = result.rows[0]
            console.log(f_id);
            if(f_id == undefined){
                message += '해당 아이디는 없습니다.'
            }else{
                let f_pw = f_id.PASSWORD
                if(pw != f_pw){
                    message += '비밀번호가 틀렸습니다. '
                }
            }
            if(message == ''){
                let nickname = f_id.NICKNAME
                console.log(nickname);
                response.json({'code':'0', 'message':'로그인 성공', 'nickname':nickname})
            }else{
                response.json({'code':'1','message':message})    
            }

        }
                  
    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}

// 게시글 삽입
async function getInsert(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection('dbPool')
        let queryString = request.body;

        let title = queryString['title']
        let content = queryString['content']
        // html 태그 제거
        content = content.replace(/<[^>]*>?/g, '');
        let writer = queryString['writer']

        let message = ''

        
        if(!title){
            message += '제목을 입력해 주세요. '
        }
        if(!content){
            message += '내용을 입력해 주세요. '
        }

        if(message != ''){
            response.json({'code':'1', 'message' : message.substring(0, message.length-1)})
        }else{
            let sql = `INSERT INTO PROGRAM_LIST VALUES ((SELECT NVL(MAX(IDX)+1, 1) FROM PROGRAM_LIST)
            , '${title}', '${content}', SYSDATE, 0, '${writer}')`
            console.log(sql);
            const result = await connection.execute(sql)
            response.json({'code':'0', 'message':'삽입 성공'})
        }                
    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}

// 게시글 조회
async function getList(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection('dbPool')
        let sql = 
        `SELECT IDX, TITLES, CONT, INPUTTIME, LIKES, WRITER
        FROM (
            SELECT IDX, TITLES, CONT, TO_CHAR(INPUTTIME, 'YYYY-MM-DD HH24:MI:SS') AS INPUTTIME, LIKES, WRITER
            FROM PROGRAM_LIST
            ORDER BY LIKES DESC
        )
        WHERE ROWNUM <= 3
        UNION ALL
        SELECT IDX, TITLES, CONT, INPUTTIME, LIKES, WRITER
        FROM (
            SELECT IDX, TITLES, CONT, TO_CHAR(INPUTTIME, 'YYYY-MM-DD HH24:MI:SS') AS INPUTTIME, LIKES, WRITER
            FROM PROGRAM_LIST
            ORDER BY INPUTTIME DESC
        )`
        console.log(sql);
        const result = await connection.execute(sql)
        console.log(result);
        response.json(result.rows)             
    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}

// 댓글, 추천 조회
async function getComment(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection('dbPool')
        let queryString = request.query;
        let idx = queryString['IDX']
        let id = queryString['USER_ID']

        let sql = `SELECT IDX, L_IDX, TO_CHAR(INPUTTIME, 'YYYY-MM-DD HH24:MI:SS') AS INPUTTIME, WRITER, CONT
        FROM PROGRAM_COMMENT 
        WHERE L_IDX=${idx} 
        ORDER BY INPUTTIME DESC`

        let sql2 =  `SELECT * FROM PROGRAM_LIKE
        WHERE U_IDX=${id} 
        AND L_IDX=${idx}`

        console.log(sql);
        console.log(sql2);

        const result = await connection.execute(sql)
        const result2 = await connection.execute(sql2)
        
        console.log(result.rows);
        console.log(result2.rows);
        response.json({result:result.rows, result2:result2.rows}) 

    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}

// 댓글 삽입
async function getInsertComment(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection('dbPool')
        let queryString = request.body;

        let l_idx = queryString['L_IDX']
        console.log(l_idx);
        let content = queryString['CONT']
        let id = queryString['ID']

        let sql = `INSERT INTO PROGRAM_COMMENT
        VALUES ((SELECT NVL(MAX(IDX)+1, 1) FROM PROGRAM_COMMENT),
        ${l_idx},
        SYSDATE,
        (select NICKNAME from program_user WHERE USER_ID = ${id}),
        '${content}'
        )`
        console.log(sql);
        const result = await connection.execute(sql)
        connection.commit()
        response.json({'code':'0', 'message':'삽입 성공'})
    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}

// 댓글 수정
async function getUpdateComment(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection('dbPool')
        let queryString = request.body;

        let idx = queryString['IDX']
        let cont = queryString['CONT']

        let sql = `UPDATE PROGRAM_COMMENT
        SET CONT = '${cont}'
        WHERE IDX = ${idx}`
        console.log(sql);

        const result = await connection.execute(sql)

        console.log(result.rowsAffected);
        if(result.rowsAffected == 1){
            console.log('update 된 값이 한개!');
            connection.commit()
            response.json({ 'code': '0', 'message': '삭제 성공' })
        }else{
            console.log('update 된 값이 여러개!');
            connection.rollback()
            response.json({ 'code': '1', 'message': '삭제 실패' })
        }
        
    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}

// 댓글 삭제
async function getDeleteComment(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection('dbPool')
        let queryString = request.body;

        let idx = queryString['IDX']
        console.log(idx);
        let sql = `DELETE FROM PROGRAM_COMMENT WHERE IDX=${idx}`
        console.log(sql);
        const result = await connection.execute(sql)

        if(result.rowsAffected == 1){
            console.log('delete 된 값이 한개!');
            connection.commit()
            response.json({ 'code': '0', 'message': '삭제 성공' })
        }else{
            console.log('delete 된 값이 여러개!');
            connection.rollback()
            response.json({ 'code': '1', 'message': '삭제 실패' })
        }
        
    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}

// 게시글 작성자 아이디, 비번 조회
async function getIDPW(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection('dbPool')
        let queryString = request.query;

        let writer = queryString['WRITER']
        
        console.log(writer);
        let sql = 
        `SELECT USER_ID, PASSWORD FROM PROGRAM_USER
        WHERE NICKNAME = ${writer}`
        const result = await connection.execute(sql)
        response.json(result.rows)             
    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}

// 게시글 삭제
async function getDelete(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection('dbPool')
        let queryString = request.body;

        let idx = queryString['IDX']
        console.log(idx);
        let sql = `DELETE FROM PROGRAM_LIST WHERE IDX=${idx}`
        console.log(sql);
        const result = await connection.execute(sql)

        if(result.rowsAffected == 1){
            console.log('delete 된 값이 한개!');
            connection.commit()
            response.json({ 'code': '0', 'message': '삭제 성공' })
        }else{
            console.log('delete 된 값이 여러개!');
            connection.rollback()
            response.json({ 'code': '1', 'message': '삭제 실패' })
        }
        
    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}


// 게시글 수정
async function getUpdate(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection('dbPool')
        let queryString = request.body;

        let idx = queryString['idx']
        let title = queryString['title']
        let cont = queryString['cont']

        let sql = `UPDATE PROGRAM_LIST
        SET TITLES = '${title}', 
        CONT = '${cont}'
        WHERE IDX = ${idx}`
        console.log(sql);

        const result = await connection.execute(sql)

        console.log(result.rowsAffected);
        if(result.rowsAffected == 1){
            console.log('update 된 값이 한개!');
            connection.commit()
            response.json({ 'code': '0', 'message': '삭제 성공' })
        }else{
            console.log('update 된 값이 여러개!');
            connection.rollback()
            response.json({ 'code': '1', 'message': '삭제 실패' })
        }
        
    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}

// 좋아요 삽입
async function getInsertLike(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection('dbPool')
        let queryString = request.body;

        let id = queryString['id']
        let idx = queryString['idx']

        let likes = queryString['likes']


        let sql_insert = `INSERT INTO PROGRAM_LIKE
        VALUES ((SELECT NVL(MAX(IDX)+1, 1) FROM PROGRAM_LIKE),
        '${id}',
        ${idx})`

        let sql_update = `UPDATE PROGRAM_LIST
        SET LIKES = ${likes}
        WHERE IDX = ${idx}`

        console.log(sql_insert);
        console.log(sql_update);
        await connection.execute(sql_insert)
        await connection.execute(sql_update)
        connection.commit()
        response.json({'code':'0', 'message':'삽입, 수정 성공'})
    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}

// 좋아요 삭제
async function getDeleteLike(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection('dbPool')
        let queryString = request.body;

        let id = queryString['id']
        let idx = queryString['idx']

        let likes = queryString['likes']


        let sql_delete = `DELETE FROM PROGRAM_LIKE
        WHERE U_IDX = ${id}
        AND L_IDX = ${idx}`

        let sql_update = `UPDATE PROGRAM_LIST
        SET LIKES = ${likes}
        WHERE IDX = ${idx}`

        console.log(sql_delete);
        console.log(sql_update);
        await connection.execute(sql_delete)
        await connection.execute(sql_update)
        connection.commit()
        response.json({'code':'0', 'message':'삭제, 수정 성공'})
    } catch (error) {
        console.log(error)
        response.send(error.message)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}