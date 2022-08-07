import React from "react";
import {Background, LoadingText} from './Loading_Style';
import Spinner from './assets/Loading.gif';

export default () => {
    return (
        <Background>
            <LoadingText>로딩중입니다...</LoadingText>
            <img src={Spinner} alt="로딩중" width="5%"/>
        </Background>
    );
};
