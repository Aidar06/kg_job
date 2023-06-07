import React from 'react';
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {useAppSelector} from "../../hooks/resux";
import {favoriteSlice} from "../../store/reducers/FavoriteSlice";
import {IPost} from "../../models/IPost";
import {useDispatch} from "react-redux";

const Favorite = () => {
    const dispatch = useDispatch()

    const {favorite} = useAppSelector(state => state.favoriteReducer)

    const {user} = useAppSelector(state => state.accReducer)

    const {removeFavorite} = favoriteSlice.actions

    const removeFavoriteClick = (el:IPost)=> {
        // @ts-ignore
        dispatch(removeFavorite(el))
    }
    return (
        <div className='favorite'>
            {
                favorite.length ? <div className='favorite--group'>
                    {
                        favorite.map((el,ind) => (
                            <div className='favorite--group__block'>
                                <h1>{el.title}</h1>
                                <h2>{el.costs}</h2>
                                <h3>{el.author}</h3>
                                <h4>phone: <a href="#">{el.phone}</a></h4>
                                <h4>gmail: <a href="#">{el.gmail}</a></h4>
                                <h5>{el.online}</h5>
                                <p>{el.description}</p>

                                <div className='favorite--group__block--btn'>
                                    <button>откликнутся</button>
                                    {
                                        // @ts-ignore
                                        !favorite.some(fa => el['_id'] === fa['_id']) ? <AiOutlineHeart/> : <AiFillHeart onClick={()=> removeFavoriteClick(el)} style={{color: ' #ff5900'}}/>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div> :
                    <div className='favorite--text'>
                        <h1>У вас нет понравивших вакансий</h1>
                    </div>
            }
        </div>
    );
};

export default Favorite;