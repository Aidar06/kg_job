import React, {FC, useState} from 'react';
import {AiOutlineLogin} from "react-icons/ai";
import {postUser} from "../../store/reducers/ActionCreater";
import {useAppDispatch, useAppSelector} from "../../hooks/resux";
import Loading from "../../littleComponets/Loading/loading";
import Error from "../../littleComponets/Error/error";
import {accSlice} from "../../store/reducers/AccSlice";


interface signUpProps {
    sign: string
    setSign: any
}

const SignUp: FC<signUpProps> = ({sign,setSign}) => {
    const {isLoading,error} = useAppSelector(state => state.accReducer)
    const dispatch = useAppDispatch()


    const [nameSingUp,serNameSignUp] = useState<string>('')
    const [gmailSingUp,serGmailSignUp] = useState<string>('')
    const [phoneSingUp,serPhoneSignUp] = useState<string>('')
    const [passwordSingUp,serPasswordSignUp] = useState<string>('')

    const newAcc = {
        name: nameSingUp,
        phone: phoneSingUp,
        description: 'не чего нет',
        gmail: gmailSingUp,
        password: passwordSingUp,
        responses: []
    }

    const {logInAcc} = accSlice.actions
    function registerAcc() {
        // @ts-ignore
        dispatch(postUser(newAcc))
        // @ts-ignore
        dispatch(logInAcc())
    }


    //inputs
    const [clickBtn,setClickBtn] = useState(false)
    const input:boolean = phoneSingUp === '' || gmailSingUp === '' || passwordSingUp === '' || nameSingUp === ''
    const gmailInput:boolean = gmailSingUp.includes('@gmail.com') || gmailSingUp.includes('@mail.ru')


    const inputStyle = {
        border: '1px solid red'
    }
    //inputs



    // components
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
                <h1>Регистрация</h1>
                <div className='register--sign__input'>
                    <h3>ФИО</h3>
                    <input style={clickBtn && nameSingUp === ''? inputStyle: {}} onChange={(e)=> serNameSignUp(e.target.value)} type="text"/>
                </div>
                <div className='register--sign__input'>
                    <h3>телефон</h3>
                    <input style={clickBtn && phoneSingUp === ''? inputStyle: {}} onChange={(e)=> serPhoneSignUp(e.target.value)} type="tel"/>
                </div>
                <div className='register--sign__input'>
                    <h3>gmail <span>{!gmailInput && clickBtn? 'не правильный формат' : ''}</span></h3>
                    <input style={clickBtn && (gmailSingUp === '' || !gmailInput)? inputStyle: {}} onChange={(e)=> serGmailSignUp(e.target.value)} type="email"/>
                </div>
                <div className='register--sign__input'>
                    <h3>пароль</h3>
                    <input style={clickBtn && passwordSingUp === ''? inputStyle: {}} onChange={(e)=> serPasswordSignUp(e.target.value)} type="password"/>
                </div>
                <button onClick={()=> input || !gmailInput? setClickBtn(true) : registerAcc()}><AiOutlineLogin/></button>
                <h4>у меня есть аккаунт: <span onClick={()=> setSign('in')}>sign in?</span></h4>
            </div>
        );
    }

};

export default SignUp;