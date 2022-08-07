import './detail.css';
import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import {AiFillLike} from 'react-icons/ai'
import {AiOutlineLike} from 'react-icons/ai'

import Item_C from './Item_C';
import Loading from '../Loading';
    
function Detail(){
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(false);

    // 현재 접속중인 사용자 정보
    const id = localStorage.getItem('id');
    const pw = localStorage.getItem('pw');

    const idx = location.state.index;
    const writer = location.state.writer;
    const titles = location.state.titles;
    const cont = location.state.cont;
    const like = location.state.like;
    const inputTime = location.state.inputTime;

    // 렌더링 될때 댓글, 추천 조회
    const[comments, setComments] = useState([]);
    const[isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        setLoading(true)
        console.log('랜더링 중');
        detailAPI();
    },[])

    // 댓글, 추천 조회
    const detailAPI = async() => {
        console.log(id);
        await axios.get(`http://127.0.0.1:15000/getComment?IDX=${idx}&USER_ID=${id}`).then((response) => {
           console.log('댓글, 추천 랜더링 성공');
           console.log(response.data.result);
           console.log(response.data.result2);
  
           setComments(response.data.result)

            if (response.data.result2.length == 0) {
                setIsChecked(false)
            } else {
                setIsChecked(true)
            }
            setLoading(false)
       }).catch((error) => {
           console.log('댓글 랜더링 실패');
           console.log(error);
       })

   }
   


    // 추천 클릭
    const[countLike,setCountLike] = useState(like)
    const click_like= async() => {
        console.log('좋아요 클릭');
        if(isChecked == false){
            // 추천 + 1
            setIsChecked(true)
            setCountLike(countLike+1)

            await axios.post(`http://127.0.0.1:15000/insert_like`,{
                id: id,         // 추천 누른 사용자
                idx: idx,       // 추천 누른 게시글
                likes: countLike+1
            })

        }else{
            // 추천 - 1
            setIsChecked(false)
            setCountLike(countLike-1)

            await axios.post(`http://127.0.0.1:15000/delete_like`,{
                id: id,         // 추천 누른 사용자
                idx: idx,       // 추천 누른 게시글
                likes: countLike-1
            })
        }
    }



    // 게시글 수정
    const update_detail=async() => {
        let id_list
        let pw_list

        // 해당 게시글 작성자의 아아디, 비밀번호 가져오기
        await axios.get(`http://127.0.0.1:15000/getIDPW?WRITER='${writer}'`).then((response) => {
            id_list = response.data[0].USER_ID
            pw_list = response.data[0].PASSWORD
        })

        if(id_list != id){
            alert('게시글 작성자만 수정/삭제가 가능합니다.')
        }else{
            var input = prompt('비밀번호를 입력해주세요.');
            if(input == pw_list){
                navigate('./modify',{state: {idx: idx, title:titles, cont: cont}})
            }else{
                alert('비밀번호를 다시 입력해주세요.');
            }
        }
    }

    // 게시글 삭제
    const remove_detail = async() => {
        let id_list
        let pw_list
        // 해당 게시글 작성자의 아아디, 비밀번호 가져오기
        await axios.get(`http://127.0.0.1:15000/getIDPW?WRITER='${writer}'`).then((response) => {
            id_list = response.data[0].USER_ID
            pw_list = response.data[0].PASSWORD
        })

        if(id_list != id){
            alert('게시글 작성자만 수정/삭제가 가능합니다.')
        }else{
            var input = prompt('비밀번호를 입력해주세요.');
            if (input == pw_list) {
                var res = window.confirm('게시글을 삭제하시겠습니까?');
                if (res) {
                    axios.get(`http://127.0.0.1:15000/delete`,{
                        IDX: idx
                    }).then((response) => {
                        console.log('게시글 삭제 성공');
                        alert('삭제가 성공적으로 됬습니다.')
                        navigate('../main')
                    }).catch((error) => {
                        console.log('게시글 삭제 실패');
                        alert('게시글 삭제를 실패했습니다.')
                        console.log(error);
                    })
                }
            } else {
                alert('비밀번호를 다시 입력해주세요.');
            }
        }
    }
console.log(comments);
console.log(idx);
    return(
        <div className='App'> 
            <h1>{titles}</h1>
            <hr />
            <div className='info'>
                <span>작성자 : {writer}</span>
                <span>작성일 : {inputTime}</span>
                <span>추천 : {countLike}</span>
                <span>
                    {
                        isChecked ?
                            <AiFillLike className="button" style={{ fontSize: '30px' }} onClick={click_like} /> :
                            <AiOutlineLike className="button" style={{ fontSize: '30px' }} onClick={click_like} />
                    }
                </span>
            </div>
            <hr />
            <div className='content'>
                <span>{cont}</span>
            </div>
            <div className='option_btn'>
                <button onClick={() => { navigate('../main') }}>목록</button>
                <button onClick={update_detail}>수정</button>
                <button onClick={remove_detail}>삭제</button>
            </div>
            {loading?<Loading/>:<Item_C item={comments} idx={idx}/>}
        </div>
    );
}
export default Detail;

