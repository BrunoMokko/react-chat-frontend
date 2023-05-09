import React from 'react';
import PropTypes from "prop-types";
import { Empty, Spin } from "antd";
import Message from "../Message";
import classNames from "classnames";
import './Messages.scss'


const Messages = ({blockRef,isLoading, items, user, author}) => {
    return <div ref={blockRef} className={classNames('messages', {'messages--loading' : isLoading})}> {isLoading ?
        (<Spin tip="Загрузка сообщений" size="large">
            <div className="content" />
        </Spin>)  : items && !isLoading ? (
            items.length > 0 ? (
                items.map(item => <Message key={item._id} {...item} isMe={user && user._id === item.user?._id}
                />)) : (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Диалог пуст' />)
        ) : (<Empty description='Откройте диалог' />)}
    </div>
};

Messages.propTypes = {
    items: PropTypes.array
};

export default Messages;
