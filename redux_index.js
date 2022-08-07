import React from "react";
import { createContext, useReducer } from "react";


// context의 초기 state 정의
const initialState = {
    id: '',
    pw: '',
    nickname:'' 
};

// action 객체, 값을 바꿀수 잇다.
export const actionChangeName = (user_id, user_pw, user_nickname) => {
    return{
        type:'ACTION_INSERT_VALUE',
        payload: {user_id,user_pw, user_nickname}
    }
}

// context 생성
const Context = createContext({});

// reducer 생성
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION_INSERT_VALUE':
      return Object.assign({},state,{id: action.user_id, pw: action.user_pw, nickname:action.user_nickname})
    default:
      return state;
  }
};
