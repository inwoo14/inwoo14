import { useState } from 'react';
import './Item_C.css'
import Loading from '../Loading';
import axios from 'axios';


// item : 댓글 배열, idx : 해당 게시글의 idx
function Item_C(item) {
    let idx = item.idx
    let comments = item.item

    // 현재 접속중인 사용자 정보
    const id = localStorage.getItem('id');
    const pw = localStorage.getItem('pw');
    const nickname = localStorage.getItem('nickname');

    const [loading, setLoading] = useState(false);

    // 해당 댓글의 idx
    const [c_idx,setC_idx] = useState('');
    let [c_writer,setC_writer] = useState('');


    // 댓글 입력
    const [writeComment,setWriteComment] = useState('');

    // 댓글 삽입
    const insert_comment= async() => {
        if(writeComment.length == 0){
            alert('댓글을 입력해주세요.')
        }else{
            console.log('댓글 삽입');
            setLoading(true)
            console.log(idx);
            console.log(writeComment);
            console.log(id);
            await axios.post(`http://127.0.0.1:15000/insert_comment`,{
                L_IDX : idx,
                CONT : writeComment,
                ID : id,
            }).then((response) => {
                console.log('댓글 삽입 성공');
                setLoading(false)
                // 화면 새로고침
                window.location.replace('/detail')
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    // 댓글 수정
    const update_comment = async () => {
        console.log('댓글 수정');
        setLoading(true)
        console.log(writeComment);
        await axios.post(`http://127.0.0.1:15000/update_comment`, {
            IDX: c_idx,
            CONT: writeComment
        }).then((response) => {
            console.log('댓글 수정 성공');
            setLoading(false)
            // 화면 새로고침
            window.location.replace('/detail')
        }).catch((error) => {
            console.log(error);
        })
    }
    
    const [isModifyComment, setIsModifyComment] = useState(true);
    
    const hover=(items) =>{
        setC_idx(items.IDX); 
        setC_writer(items.WRITER);
    }

    const update=(items) => {
        if(c_writer == nickname){
            setWriteComment(items.CONT)
            setIsModifyComment(false)
        }else{
            alert('댓글 작성자만 수정/삭제가 가능합니다.')
        }
    }
        
    const remove= async() => {
        if(c_writer == nickname){
            if(window.confirm('댓글을 삭제하시겠습니까?')){
                console.log('댓글 삭제');
                setLoading(true)
                await axios.post(`http://127.0.0.1:15000/delete_comment`, {
                    IDX: c_idx
                }).then((response) => {
                    console.log('댓글 삭제 성공');
                    setLoading(false)
                    // 화면 새로고침
                    window.location.replace('/detail')
                }).catch((error) => {
                    console.log(error);
                })
            }
        }else{
            alert('댓글 작성자만 수정/삭제가 가능합니다.')
        }

        
    }

    return (
        <div className='comment_area'>
                <span>댓글</span>
                <hr />
                <div>
                    <form>
                        {isModifyComment?
                            <input id='text_comment' type="text" placeholder='댓글을 입력해주세요.'onChange={(e)=>{setWriteComment(e.target.value)}} />:
                            <input id='text_comment' type="text"  value={writeComment} onChange={(e)=>{setWriteComment(e.target.value)}} />
                        }
                        {isModifyComment?
                            <button id='submit_comment' type="button" onClick={insert_comment}>작성</button>:
                            <button id='submit_comment' type="button" onClick={update_comment}>수정</button>
                        }
                    </form>
                </div>
                <hr />
                <div>
                {comments.map((items, idx) => {
                return(
                    <div className='comment' key={idx} onMouseOver={()=> hover(items)}>
                        <div>
                            <span className='comment_user'>{items.WRITER}</span> | <span className='comment_time'>{items.INPUTTIME}</span>
                            <span className='sub' id='sub_s' onClick={()=> update(items)}>수정</span>
                            <span className='sub'>  |  </span>
                            <span className='sub' onClick={remove}>삭제</span>
                        </div>
                        <div className='comment_content'>
                            {items.CONT}
                        </div>
                    </div>
                )
            })}
                </div>
            </div>
    );
}
export default Item_C;

