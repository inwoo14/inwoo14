import './modify.css';

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';




function Modify() {
    const navigate = useNavigate();
    const location = useLocation();
    const {idx, title, cont} = location.state;

    const [titles, setTitles] = useState(title);
    const [contents, setContents] = useState(cont);
   
    const update = async() => {
        console.log(idx, titles, contents);
        if(window.confirm('수정 하시겠습니까?')){
            await axios.post(`http://127.0.0.1:15000/update`,{
                idx : idx,
                title : titles,
                cont : contents
            }).then((response) => {
                alert('수정 성공')
                navigate('../main')
            }).catch((error)=>{
                console.log(error);
                alert('에러 발생')
            });
        }
    }

    return (
      <div className='App'>
          <form>
            <p>
                <input className='title-input' type="text" name='title' value={titles} onChange={(event) => {
                setTitles(event.target.value)
                }}/>
            </p>
            <p>
                <textarea name="cont" value={contents} onChange={(event) => {
                setContents(event.target.value)
                }}></textarea>
            </p>
          </form>
            <div className='option_btn'>
                <button onClick={update}>수정</button>
            </div>
      </div>
    );
}

export default Modify;