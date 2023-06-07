import React, {FC, useState} from 'react';
import {AiOutlineLogin} from "react-icons/ai";
import Loading from "../../littleComponets/Loading/loading";
import Error from "../../littleComponets/Error/error";
import {useAppDispatch, useAppSelector} from "../../hooks/resux";
import {getUserGmail, postUser} from "../../store/reducers/ActionCreater";
import {userSlice} from "../../store/reducers/UserSlice";
import AccSlice, {accSlice} from "../../store/reducers/AccSlice";


interface signInProps {
    sign: string
    setSign: any
}

const SignIn: FC<signInProps> = ({sign,setSign}) => {
    let {isLoading,error,user,userCheck}:any = useAppSelector(state => state.accReducer)
    const dispatch = useAppDispatch()

    const [gmailSingUp,setGmailSignUp] = useState<string>('')
    const [passwordSingUp,setPasswordSignUp] = useState<string>('')


    function registerAcc() {
        // @ts-ignore
        dispatch(getUserGmail(gmailSingUp))
    }
    //inputs
    const [clickBtn,setClickBtn] = useState(false)
    const input:boolean =gmailSingUp === '' || passwordSingUp === ''
    const gmailInput:boolean = gmailSingUp.includes('@gmail.com') || gmailSingUp.includes('@mail.ru')
    const passwordInput:boolean = user.password === passwordSingUp

    const inputStyle = {
        border: '1px solid red'
    }

    const {logInAcc} = accSlice.actions
    function logInAccDis(){
        // @ts-ignore
        dispatch(logInAcc())
    }
    //inputs

    console.log(userCheck)
    //components
    if (isLoading){
        return (
            <Loading/>
        )
    }else if (error){
        return (
            <Error/>
        )
    }else {
        return (
            <div className='register--sign'>
                <h1>Войти</h1>
                {
                    userCheck === false? <h4>нет такого аккаунта <span onClick={() => setSign('up')}>sign up?</span></h4>: ''
                }
                {
                    userCheck === 'no acc' || userCheck === false?<div className='register--sign__input'>
                        <h3>gmail <span>{!gmailInput && clickBtn? 'не правильный формат' : ''}</span></h3>
                        <input style={clickBtn && (gmailSingUp === '' || !gmailInput)? inputStyle: {}} onChange={(e)=> {setGmailSignUp(e.target.value); setClickBtn(false)}} type="email"/>
                    </div>: <div className='register--sign__input'>
                        <h3>пароль <span>{!passwordInput && clickBtn? 'не правильный пароль' : ''}</span></h3>
                        <input style={clickBtn && (passwordSingUp  === '' || !passwordInput)? inputStyle: {}} onChange={(e)=> {setPasswordSignUp(e.target.value); setClickBtn(false)}} type="password"/>
                    </div>
                }
                <button style={{marginTop: 50}} onClick={()=> userCheck === 'no acc' || userCheck === false? gmailSingUp === '' || !gmailInput? setClickBtn(true): registerAcc(): passwordSingUp === '' || !passwordInput? setClickBtn(true): logInAccDis()}><AiOutlineLogin/></button>
                <h4>у меня нет аккаунта: <span onClick={() => setSign('up')}>sign up?</span></h4>
            </div>
        );
    }
};

export default SignIn;