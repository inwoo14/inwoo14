import styles from './login.module.css';
import axios from "axios";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

var id
var pw
var change_index
function Login() {
  let navigate = useNavigate();
  // useState
  const [inputs, setInputs] = useState({
    input_id: '',
    input_pw: ''
  });
  const { input_id, input_pw } = inputs

  // 바뀐 값 전역변수에 넣기
  switch (change_index) {
    case 'input_id': id = input_id; break;
    case 'input_pw': pw = input_pw; break;
    default: break;
  }

  // onChange
  const onChange = (e) => {
    const { name, value } = e.target;
    change_index = name

    // 랜더링
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 로그인 처리
  const login = () => {
    axios.post('http://127.0.0.1:15000/login', {
      USER_ID: id,
      PASSWORD: pw
    }).then((response) => {
      console.log(response.data);
      let code = response.data.code
      let message = response.data.message
      document.getElementById('message').textContent = message

      if (code == '0') {
        let nickname = response.data.nickname
        console.log('화면전환');
        localStorage.setItem('id', id)
        localStorage.setItem('pw', pw)
        localStorage.setItem('nickname', nickname)
        navigate('./main');
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  // JSX
  return (
    <div className={styles.main}>
      <h1 className={styles.logo}>게시판</h1>
      <div className={styles.container}>
        <input className={styles.account} name='input_id' placeholder='아이디' onChange={onChange}></input>
        <input className={styles.account} name='input_pw' placeholder='비밀번호' onChange={onChange}></input>
        <div className={styles.message}><p id='message'> </p></div>
        <button className={styles.login} onClick={login}> 로그인 </button>
      </div>
    </div>
  );
}

export default Login;
