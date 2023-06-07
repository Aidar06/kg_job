import React, {useEffect, useState} from 'react';
import {AiFillDelete, AiOutlineHeart, AiOutlinePlus} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../../hooks/resux";
import {postJob, fetchPostsOwner, jobDelete} from "../../store/reducers/ActionCreater";
import Loading from "../../littleComponets/Loading/loading";
import Error from "../../littleComponets/Error/error";
import {IPost} from "../../models/IPost";
import {BsFillPenFill} from "react-icons/bs";
import {IoIosArrowDown} from "react-icons/io";
import {IUser} from "../../models/IUser";

const Add = () => {
    const {user}:any = useAppSelector(state => state.accReducer)
    const {isLoading,error}:any = useAppSelector(state => state.postJobReducer)
    const dispatch = useAppDispatch()

    // inputs
    const [clickBtn,setClickBtn] = useState(false)

    const [title,setTitle] = useState('')
    const [cost,setCosts] = useState('')
    const [gmail,setGmail] = useState(user.gmail)
    const [phone,setPhone] = useState(user.phone)
    const [online,setOnline] = useState('online')
    const [description,setDescription] = useState('')
    const input:boolean = title === '' || cost === '' || gmail === '' || phone === '' || online === '' || description === ''
    const gmailForm:boolean = gmail.includes('@gmail.com') || gmail.includes('@mail.ru')

    const inputStyle = {
        border: '2px solid red'
    }

    // post job

    const newPost = {
        author: user.name,
        title: title,
        gmail: gmail,
        phone: phone,
        description: description,
        online: online,
        costs: cost,
        ownerId: user['_id'],
        responses: [],
    }


    function postJobFn(){
        // @ts-ignore
        dispatch(postJob(newPost))
    }

    // ownerJob
    const {postsOwner, isLoadingOwner, errorOwner}:any = useAppSelector(state => state.postOwnerReducer)

    const [changeDel,setChangeDel] = useState(false)
    useEffect(()=> {
        // @ts-ignore
        dispatch(fetchPostsOwner(user['_id']))
    }, [isLoading,changeDel])


    // see response
    const [seeRes,setSeeRes] = useState(false)

    // delete job

    function deleteJobFn(el:object){
        // @ts-ignore
        dispatch(jobDelete(el['_id']))
        // @ts-ignore
        console.log(el['_id'])
    }


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
            <div id='add'>
                <div className="add">
                    <div className="add--input">
                        <div className="add--input__block">
                            <h3>какая работы</h3>
                            <input style={clickBtn && title === ''? inputStyle: {}} onChange={(e)=> setTitle(e.target.value)} type="text"/>
                        </div>
                        <div className="add--input__block">
                            <h3>оплата</h3>
                            <input style={clickBtn && cost === ''? inputStyle: {}} onChange={(e)=> setCosts(e.target.value)} type="text"/>
                        </div>
                        <div className="add--input__block">
                            <h3>Gmail</h3>
                            <input style={clickBtn && (gmail === '' || !gmailForm)? inputStyle: {}} onChange={(e)=> setGmail(e.target.value)} defaultValue={user.gmail} type="text"/>
                        </div>
                        <div className="add--input__block">
                            <h3>телефон</h3>
                            <input style={clickBtn && phone === ''? inputStyle: {}} onChange={(e)=> setPhone(e.target.value)} defaultValue={user.phone} type="text"/>
                        </div>
                        <div className="add--input__block bl">
                            <h3>тип работы</h3>
                            <select onChange={(e)=> setOnline(e.target.value)}>
                                <option>online</option>
                                <option>offline</option>
                            </select>
                        </div>
                        <div className="add--input__block bl">
                            <h3>описание</h3>
                            <textarea style={clickBtn && description === ''? inputStyle: {}} onChange={(e)=> setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="add--input__btn">
                            <button onClick={()=> input || !gmailForm? setClickBtn(true) : postJobFn()}><AiOutlinePlus/></button>
                        </div>
                    </div>
                    <div className='myJobs'>
                        <h1 className='myJobs--title'>мои вакансии</h1>
                        <div className='myJobs--group'>
                            {
                                isLoadingOwner? <Loading/> : errorOwner? <Error/> :
                                    postsOwner.length === 0? <h1 style={{color: 'wheat'}}>нет у вас вакансий</h1> :
                                        postsOwner.map((el:IPost) => (
                                        <div className='myJobs--group__block'>
                                            <div className='myJob--group__block--el'>
                                                <h1>{el.title}</h1>
                                            </div>
                                            <div className='myJob--group__block--el'>
                                                <h2>{el.costs}</h2>
                                            </div>
                                            <div className='myJob--group__block--el'>
                                                <h3>{el.author}</h3>
                                            </div>
                                            <div className='myJob--group__block--el'>
                                                <h4>phone: <a href="#">{el.phone}</a></h4>
                                            </div>
                                            <div className='myJob--group__block--el'>
                                                <h4>gmail: <a href="#">{el.gmail}</a></h4>
                                            </div>
                                            <div className='myJob--group__block--el'>
                                                <h5>{el.online}</h5>
                                            </div>
                                            <div className='myJob--group__block--el'>
                                                <p>{el.description}</p>
                                            </div>

                                            <div className='myJob--group__block--response'>
                                                <h3><span>{el.responses.length}</span> откликов</h3>
                                                {
                                                    el.responses.length !== 0 ?
                                                        <div>
                                                            <div onClick={()=> setSeeRes(!seeRes)} className='myJob--group__block--response__see'>
                                                                <h5>смотреть откликов</h5>
                                                                <IoIosArrowDown style={{transform: seeRes? '' : 'rotate(180deg)', transition: '.6s'}}/>
                                                            </div>
                                                            <div style={{height: seeRes? '0px' : ''}} className='myJob--group__block--response__users'>
                                                                {
                                                                    el.responses.map((us:IUser,ind) => (
                                                                        <div className='myJob--group__block--response__users--user'>
                                                                            <h1>{us.name}</h1>
                                                                            <h2>gmail: <a href='#'>{us.gmail}</a></h2>
                                                                            <h2>phone: <a href='#'>{us.phone}</a></h2>
                                                                            <div>{ind + 1}</div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div> : ''
                                                }
                                            </div>

                                            <div className='myJobs--group__block--btn'>
                                                <button onClick={()=> {deleteJobFn(el); setChangeDel(!changeDel)}}><AiFillDelete/></button>
                                                <button><BsFillPenFill/></button>
                                            </div>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default Add;