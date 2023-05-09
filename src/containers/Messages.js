import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { messagesActions } from 'redux/actions';
import socket from 'core/socket';

import { Messages as BaseMessages } from 'components';



const Dialogs = ({ currentDialogId, user, fetchMessages, addMessage, items, isLoading }) => {

    const messagesRef = useRef(null);
    const onNewMessage = data => {
        addMessage(data);
    };

    useEffect(() => {
        if(currentDialogId) {
            fetchMessages(currentDialogId);
        }
        socket.on('SERVER:NEW_MESSAGE', onNewMessage);
        return () => socket.removeListener('SERVER:NEW_MESSAGE', onNewMessage);
    }, [currentDialogId]);

    useEffect(()=> {
            messagesRef.current.scrollTo(0, 99999)
    },[items])



    return (
        <BaseMessages
            blockRef={messagesRef}
            items={items}
            isLoading={isLoading}
            user={user}
        />
    );
};


export default connect(({dialogs, messages, user}) => ({
    currentDialogId: dialogs.currentDialogId,
    items: messages.items,
    user: user.data,
    isLoading: messages.isLoading}), messagesActions)(Dialogs);