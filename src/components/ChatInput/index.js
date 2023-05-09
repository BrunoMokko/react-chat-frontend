import React, {useState} from "react";
import PropTypes from 'prop-types';

import './ChatInput.scss';
import {SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined} from "@ant-design/icons";
import {Input, Button} from "antd";
import { UploadField } from '@navjobs/upload';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


const ChatInput = (props) => {

    const [value, setValue] = useState('');
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const toogleEmojiPicker = () => {
        setShowEmojiPicker(!emojiPickerVisible);
    }
    const {onSendMessage,currentDialogId} = props;


    const handleSendMessage = (e) => {
        if(e.keyCode === 13) {
            onSendMessage(value, currentDialogId)
            setValue('')
        }
    }

    return (
        <div className='chat-input'>
            <div className="chat-input__smile-btn">
                {emojiPickerVisible && <div className="chat-input__emoji-picker">
                    <Picker
                        data={data}
                        locale='ru'
                        theme='light'
                        set='native'
                        skin={[1, 2, 3, 4, 5, 6]}
                        previewPosition='none'
                        navPosition='bottom'
                        onEmojiSelect={console.log}/>
                </div>}
                <Button onClick={toogleEmojiPicker} type='circle' style={{border: 'none', boxShadow: 'none'}}
                        icon={<SmileOutlined />} />


            </div>
            <Input
                onChange={e => setValue(e.target.value)}
                onKeyUp={handleSendMessage}
                value={value}
                placeholder="Введите текст сообщения"
                style={{
                    width: '100%',
                    height: '38px',
                }}
            />
            <div className="chat-input__actions">
                <UploadField
                    onFiles={files => console.log(files)}
                        containerProps={{
                        className: 'chat-input__actions-upload-btn'
                    }}
                        uploadProps={{
                        accept: '.jpg,.jpeg,.png,.gif,.bmp',
                        multiple: 'multiple'
                    }}

                        >
                    <Button type='circle' style={{border: 'none', boxShadow: 'none'}}
                            icon={<CameraOutlined />}  />
                        </UploadField>









                {value ? <Button type='circle' style={{border: 'none', boxShadow: 'none'}}
                                 icon={<SendOutlined
                                     style={{transform: 'rotate(-30deg)',
                                         position: 'relative',
                                         top: '-2.5px',
                                         right: '0'}}/>} />
                    : <Button type='circle' style={{border: 'none', boxShadow: 'none'}}
                              icon={<AudioOutlined />} /> }
            </div>
        </div>
    )

};

ChatInput.propTypes = {
    className: PropTypes.string
}


export default ChatInput;
