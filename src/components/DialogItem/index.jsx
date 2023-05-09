import React from "react";
import classNames from 'classnames';


import {CheckIcon, Avatar} from "../index";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import {Link} from 'react-router-dom'




const DialogItem = ({ unreaded, isMe, currentDialogId, createdAt, text, onSelect,_id, lastMessage, partner}) => {
    const getMessageTime = createdAt => {
        const date = new Date(Date.parse(createdAt));
        if (isNaN(date)) {
            return "Invalid Date";
        }
        if (isToday(date)) {
            return format(date, 'HH:mm');
        } else {
            return format(date, 'dd.mm.yyyy');
        }
    };


    return (
        <Link to={`/dialog/${_id}`} className='dialogs-link'>
        <div className={classNames('dialogs__item',
            {'dialogs__item-online' : partner.isOnline,
             'dialogs__item-selected' : currentDialogId === _id
        })} onClick={onSelect.bind(this, _id)}>
            <div className="dialogs__item-avatar">
                <Avatar user={partner}/>
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <b>{partner?.fullname}</b>
                    <span className='dialogs__item-info-date'>
                        {getMessageTime(lastMessage?.createdAt)}
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <p className='dialogs__item-info-bottom-message'>
                        {lastMessage?.text}
                    </p>
                    {isMe && <CheckIcon isMe={true} isReaded={false}/>}
                    {lastMessage?.unreaded > 0 && <div className="dialogs__item-info-bottom-count">{lastMessage?.unreaded > 9 ? '+9' : lastMessage?.unreaded}</div>}
                </div>
            </div>
        </div>
            </Link>
    )

};



export default DialogItem;