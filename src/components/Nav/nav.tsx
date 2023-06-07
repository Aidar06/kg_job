import React, {FC} from 'react';
import {BiCommentDetail, BiUser} from "react-icons/bi";
import {AiOutlineHeart, AiOutlinePlus} from "react-icons/ai";
import {BsPersonWorkspace} from "react-icons/bs";

interface navProps {
    nav: string
    setNav: any
}

const Nav: FC<navProps> = ({nav, setNav}) => {

    const navChange = {
        fontSize: 30,
        width: 55,
        height: 55,
        color: '#ff5900',
        border: '2px solid #ff5900'
    }


    return (
        <div id='nav'>
            <div className='nav'>
                <div style={{width: nav === 'acc' ? '100%' : ''}} className='nav--block'>
                    <div style={nav === 'acc'? navChange: {}}  onClick={() => setNav('acc')}
                         className='nav--block__icon'>
                        <BiUser/>
                    </div>
                    <div style={{left: nav === 'acc' ? '' : '120px'}} className='nav--block__line'/>
                </div>
                <div style={{width: nav === 'favorite' ? '100%' : ''}} className='nav--block'>
                    <div style={nav === 'favorite'? navChange : {}} onClick={() => setNav('favorite')}
                         className='nav--block__icon'>
                        <AiOutlineHeart/>
                    </div>
                    <div style={{left: nav === 'favorite' ? '' : '120px'}} className='nav--block__line'></div>
                </div>
                <div style={{width: nav === 'home' ? '100%' : ''}} className='nav--block'>
                    <div style={nav === 'home'? navChange : {}} onClick={() => setNav('home')}
                         className='nav--block__icon'>
                        <BsPersonWorkspace/>
                    </div>
                    <div style={{left: nav === 'home' ? '' : '120px'}} className='nav--block__line'/>
                </div>
                <div style={{width: nav === 'add' ? '100%' : ''}} className='nav--block'>
                    <div style={nav === 'add'? navChange : {}} onClick={() => setNav('add')}
                         className='nav--block__icon'>
                        <AiOutlinePlus/>
                    </div>
                    <div style={{left: nav === 'add' ? '' : '120px'}} className='nav--block__line'/>
                </div>
                <div style={{width: nav === 'massage' ? '100%' : ''}} className='nav--block'>
                    <div style={nav === 'massage'? navChange : {}} onClick={() => setNav('massage')}
                         className='nav--block__icon'>
                        <BiCommentDetail/>
                    </div>
                    <div style={{left: nav === 'massage' ? '' : '120px'}} className='nav--block__line'/>
                </div>
            </div>
        </div>
    );
};

export default Nav;