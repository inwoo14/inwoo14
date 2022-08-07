import './write.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Write() {
    const navigate = useNavigate();

    const id = localStorage.getItem('id');
    const nickname = localStorage.getItem('nickname');

    const [listContent, setListContent] = useState({
        title: '',
        content: ''
    })

    // 제목 받아서 {title : '내용'} 형식으로 listContent에 저장
    const getValue = (e) => {
        const { name, value } = e.target;
        setListContent({
            ...listContent,
            [name]: value
        })
    }

    // 게시글 DB에 저장, title, content, writer를 파라미터로 보냄
    const submitReview = () => {
        axios.post('http://127.0.0.1:15000/insert', {
            title: listContent.title,
            content: listContent.content,
            writer: nickname
        }).then((response) => {
            alert('등록완료!');
            navigate(-1);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className='App'>
            <div className='form-wrapper'>
                <input className='title-input' type="text" placeholder='제목' name='title' onChange={getValue} />
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        placeholder: "내용을 입력하세요.",
                    }}
                    onReady={editor => {
                        console.log('Editor is ready to use!', editor);
                    }}
                    // 내용 받아서 {content : '내용'} 형식으로 listContent에 저장
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setListContent({
                            ...listContent,
                            content: data
                        })
                    }}
                    onError={(instance, details) => {
                        console.log(instance);
                    }}
                // onBlur={ ( event, editor ) => {
                //     console.log( 'Blur.', editor );
                // } }
                // onFocus={ ( event, editor ) => {
                //     console.log( 'Focus.', editor );
                // } }
                />
            </div>
            <button className='submit-button' onClick={submitReview}>
                게시
            </button>
            <button className='cancle-button' onClick={()=>navigate('../main')}>
                취소
            </button>
        </div>
    )
}

export default Write;