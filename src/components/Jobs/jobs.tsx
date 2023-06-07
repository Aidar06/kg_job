import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/resux";
import {IPost} from "../../models/IPost";
import {fetchPosts,responseJob} from "../../store/reducers/ActionCreater";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import Loading from "../../littleComponets/Loading/loading";
import Error from "../../littleComponets/Error/error";
import {favoriteSlice} from "../../store/reducers/FavoriteSlice";

const Jobs = () => {
    const {posts,error,isLoading} = useAppSelector(state => state.postReducer)
    const {user} = useAppSelector(state => state.accReducer)
    const dispatch = useAppDispatch()

    const [changeUse,setChangeUse] = useState(true)
    useEffect(()=> {
        // @ts-ignore
        dispatch(fetchPosts())
    }, [changeUse])

    const {favorite} = useAppSelector(state => state.favoriteReducer)
    const {addFavorite,removeFavorite} = favoriteSlice.actions
    const addFavoriteClick = (el:IPost)=> {
        // @ts-ignore
        dispatch(addFavorite(el))
    }
    const removeFavoriteClick = (el:IPost)=> {
        // @ts-ignore
        dispatch(removeFavorite(el))
    }

    // response
    const addResponse = (el:IPost)=> {
        const responseObj:IPost = {
            // @ts-ignore
            "_id": el['_id'],
            "author": el.author,
            "title": el.title,
            "description": el.description,
            "phone": el.phone,
            "gmail": el.gmail,
            "online": el.online,
            "costs": el.costs,
            "responses": [
                ...el.responses, user
            ],
            "ownerId": el.ownerId
        }

        // @ts-ignore
        dispatch(responseJob(responseObj))
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
            <div className='jobs'>
                <div className='jobs--group'>
                    <h1 className='jobs--group__title'>Вакансии</h1>
                    {
                        posts.map((el:IPost,ind) => (
                            <div className='jobs--group__block'>
                                <h1>{el.title}</h1>
                                <h2>{el.costs}</h2>
                                <h3>{el.author}</h3>
                                <h4>phone: <a href="#">{el.phone}</a></h4>
                                <h4>gmail: <a href="#">{el.gmail}</a></h4>
                                <h5>{el.online}</h5>
                                <p>{el.description}</p>
                                <h6><span>{el.responses.length}</span> откликов</h6>

                                <div className='jobs--group__block--btn'>
                                    {
                                        // @ts-ignore
                                        el.responses.some(re => re['_id'] === user['_id'])? <button>вы уже откликнулись</button> :
                                            <button onClick={()=> {addResponse(el); setChangeUse(!changeUse)}}>откликнутся</button>
                                    }
                                    {
                                        // @ts-ignore
                                        !favorite.some(fa => el['_id'] === fa['_id']) ? <AiOutlineHeart onClick={()=> addFavoriteClick(el)}/> : <AiFillHeart onClick={()=> removeFavoriteClick(el)} style={{color: ' #ff5900'}}/>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
};

export default Jobs;