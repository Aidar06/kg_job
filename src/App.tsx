import React, {useEffect, useState} from 'react';
import './App.scss';
import Header from "./components/Header/header";
import Nav from "./components/Nav/nav";
import {useAppDispatch, useAppSelector} from "./hooks/resux";
import {fetchUser, postUser} from "./store/reducers/ActionCreater";
import {userSlice} from "./store/reducers/UserSlice";
import {AiOutlineLogin} from "react-icons/ai";
import SignUp from "./components/signs/signUp";
import SignIn from "./components/signs/signIn";
import Jobs from "./components/Jobs/jobs";
import Add from './components/Add/add';
import Favorite from "./components/Favorite/favorite'";

function App() {

    const  [nav,setNav] = useState('home')
    const dispatch = useAppDispatch()
    const {inAcc} = useAppSelector(state => state.accReducer)


    const [sign, setSign] = useState('')

    // app bg style
    const appStile = () => {
        if (nav === 'acc'){
            return 'rgb(63,7,7)'
        }else if (nav === 'favorite'){
            return 'rgb(4, 59, 54)'
        }else if (nav === 'home'){
            return 'rgb(6, 61, 4)'
        }else if (nav === 'add'){
            return 'rgb(60, 1, 68)'
        }else  if (nav === 'massage'){
            return 'rgb(84,80,9)'
        }
    }

    return (
        <div style={{background: appStile()}} className="App">
            <Header/>
            <Nav nav={nav} setNav={setNav}/>

            {
                !inAcc ?
                    <div id='register'>
                        <div className='register'>
                            {
                                sign === '' ?
                                    <div className="register--block">
                                        <h1>Зарегистрируйтесь чтобы <br/>начать</h1>
                                        <div className="register--block__btn">
                                            <button onClick={()=> setSign('in')}>sign in</button>
                                            <button onClick={()=> setSign('up')}>sign up</button>
                                        </div>
                                    </div> :
                                    sign === 'in' ?
                                        <SignIn sign={sign} setSign={setSign}/>
                                        :
                                        <SignUp sign={sign} setSign={setSign}/>

                            }
                        </div>
                    </div>
                    :
                    <div id='rel'>
                        {
                            nav === 'home'? <Jobs/> : ''
                        }
                        {
                            nav === 'add'? <Add/> : ''
                        }
                        {
                            nav === 'favorite'? <Favorite/> : ''
                        }
                    </div>
            }
        </div>
    );
}

export default App;
