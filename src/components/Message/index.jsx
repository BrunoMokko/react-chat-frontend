import React, {useState, useRef, useEffect} from "react";
import PropTypes from 'prop-types';
import './Message.scss';
import classNames from "classnames";
import {Avatar, CheckIcon, Time} from "../index";
import {convertCurrentTime} from "../../helpers";
import PlayIcon from '../../img/play.svg';
import PauseIcon from '../../img/pause.svg';
import data from '@emoji-mart/data'
import { init } from 'emoji-mart'

init({ data })

const MessageAudio = ({audioSrc}) => {
    const [isPlaying, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioElem = useRef(null);

    const tooglePlay = () => {
        if(!isPlaying) {
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    };

    useEffect(()=> {
        audioElem.current.addEventListener(
            'playing',
            () => {
                setPlaying(true);
            },
            false
        );
        audioElem.current.addEventListener(
            'ended',
            () => {
                setPlaying(false);
                setProgress(0);
                setCurrentTime(0);
            },
            false
        );
        audioElem.current.addEventListener(
            'pause',
            () => {
                setPlaying(false);
            },
            false
        );
        audioElem.current.addEventListener(
            'timeupdate',
            () => {
                const duration = audioElem.current && audioElem.current.duration || 0;
                setCurrentTime(audioElem.current.currentTime);
                setProgress((audioElem.current.currentTime / duration) * 100);
            });
        audioElem.current.addEventListener('loadedmetadata', () => {
            setCurrentTime(audioElem.current.duration);
        });
    }, [])
    return (
        <div className="message__audio">
            <audio ref={audioElem} src={audioSrc} preload='auto'/>
            <div className="message__audio-progress" style={{ width: progress + '%'}}></div>
            <div className="message__audio-info">
                <div className="message__audio-btn">
                    <button onClick={tooglePlay}>
                        {isPlaying ? <img src={PauseIcon} alt=""/> : <img src={PlayIcon} alt=""/>}
                    </button>
                </div>
                {isPlaying ?
                    <div className="message__audio-wave active">
                        <div className="boxContainer">
                            <div className="box box1"></div>
                            <div className="box box2"></div>
                            <div className="box box3"></div>
                            <div className="box box4"></div>
                            <div className="box box5"></div>
                            <div className="box box1"></div>
                            <div className="box box2"></div>
                            <div className="box box3"></div>
                            <div className="box box4"></div>
                            <div className="box box5"></div>
                            <div className="box box1"></div>
                            <div className="box box2"></div>
                            <div className="box box3"></div>
                            <div className="box box4"></div>
                            <div className="box box5"></div>
                            <div className="box box1"></div>
                            <div className="box box2"></div>
                            <div className="box box3"></div>
                            <div className="box box4"></div>
                            <div className="box box5"></div>
                        </div>
                    </div> : <div className="message__audio-wave">
                    <div className="boxContainer">
                        <div className="box box1" style={{animationName: 'none'}}></div>
                        <div className="box box2" style={{animationName: 'none'}}></div>
                        <div className="box box3" style={{animationName: 'none'}}></div>
                        <div className="box box4" style={{animationName: 'none'}}></div>
                        <div className="box box5" style={{animationName: 'none'}}></div>
                        <div className="box box1" style={{animationName: 'none'}}></div>
                        <div className="box box2" style={{animationName: 'none'}}></div>
                        <div className="box box3" style={{animationName: 'none'}}></div>
                        <div className="box box4" style={{animationName: 'none'}}></div>
                        <div className="box box5" style={{animationName: 'none'}}></div>
                        <div className="box box1" style={{animationName: 'none'}}></div>
                        <div className="box box2" style={{animationName: 'none'}}></div>
                        <div className="box box3" style={{animationName: 'none'}}></div>
                        <div className="box box4" style={{animationName: 'none'}}></div>
                        <div className="box box5" style={{animationName: 'none'}}></div>
                        <div className="box box1" style={{animationName: 'none'}}></div>
                        <div className="box box2" style={{animationName: 'none'}}></div>
                        <div className="box box3" style={{animationName: 'none'}}></div>
                        <div className="box box4" style={{animationName: 'none'}}></div>
                        <div className="box box5" style={{animationName: 'none'}}></div>
                    </div>
                </div>}
                <span className="message__audio-duration" >
                    {convertCurrentTime(currentTime)}
                </span>
            </div>
        </div>
    )
}

const Message = ({avatar,user,text,date,isMe,isReaded, attachments, isTyping, audio}) => {
    return (
        <div className={classNames('message', {
            'message__isme': isMe,
            'message--is-typing': isTyping,
            'message--is-audio' : audio,
            'message--image': attachments && attachments.length === 1,
        })}>
            <div className="message__container">
                <CheckIcon isMe={isMe} isReaded={isReaded}/>
                <div className="message__avatar">
                    <Avatar user={user}/>
                </div>
                <div className="message__content">
                    <div>
                        {(audio || text || isTyping) && (<div className="message__bubble">
                            {text && <p className="message__text">{text}</p>}
                            {isTyping && (<div className="message__is-typing">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>)}
                            { audio && <MessageAudio audioSrc={audio}/> }
                        </div>)}
                        {attachments && (<div className="message__attachments">
                            {attachments.map(item => (
                                <div className='message__attachments-item'>
                                    <img src={item.url} alt={item.filename}/>
                                </div>
                            ))}
                        </div>)}
                        {date && <span className="message__date"><Time date={date}/></span>}
                    </div>
                </div>
            </div>
        </div>

    )

};



Message.defaultProps = {
    user: {}
}

Message.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    user: PropTypes.object,
    attachments: PropTypes.array,
    isTyping: PropTypes.bool,
    isReaded: PropTypes.bool,
    isMe: PropTypes.bool,
    audio: PropTypes.string

};


export default Message;