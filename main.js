import './main.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Loading from './Loading';
import Main_Table from './main_Table';


function Main() {
  const nickname = localStorage.getItem('nickname');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const mainAPI = async () => {
    setLoading(true)
      await axios.get('http://127.0.0.1:15000/getList').then((response) => {
        console.log('게시글 랜더링 성공');
        setPosts(response.data)
        setLoading(false)
      }).catch((error) => {
        console.log('게시글 랜더링 실패');
        console.log(error);
      })
  }

  // 렌더링
  useEffect(() => {
    console.log('게시글 랜더링 중');
    mainAPI();
  }, []);

  console.log(loading);
  // 메인화면으로 전환
  const logout = () => {
    navigate('/');
  }

  // 글쓰기화면으로 전환  
  const write = () => {
    navigate('/write');
  }



console.log(posts);
  return (
      <div className='main'>
        <span> 반갑습니다. {nickname}님</span>
        <button id='logout' onClick={logout}>로그아웃</button>
        <h1>게시판</h1>
        <div><button id='write_button' onClick={write}>글쓰기</button></div>
        <div className='list-title'>
        {loading ? <Loading /> : <Main_Table item={posts} />}
        </div>
      </div>
  );
}

export default Main;