import React from 'react';
import {FormOutlined, TeamOutlined} from "@ant-design/icons";
import {Button, Modal, Select, Form, Input   } from "antd";
import Dialogs from "../Dialogs";

const { Option } = Select;
const { TextArea } = Input;
const Sidebar = ({user,
                  onShow,
                  onClose,
                  visible,
                  users,
                  onSearch,
                  onChangeInput,
                  selectedUserId,
                  onChangeTextArea,
                  onSelectUser,
                  inputValue,
                  isLoading,
                  onModalOk,
                  messageText}) => {
    const options = users.map(user => <Option key={user._id}>{user.fullname}</Option>);

    return (
        <div className="chat__sidebar">
            <div className="chat__sidebar-header">
                <div>
                    <TeamOutlined style={{ color: 'black'}}/>
                    <span>Список диалогов</span>
                </div>
                <Button onClick={onShow} type='circle' style={{border: 'none',
                    boxShadow: 'none',
                    background: 'none'}}
                        icon={<FormOutlined style={{ color: 'black'}}/>} />
            </div>

             <div className="chat__sidebar-dialogs">
                <Dialogs
                    userId={user && user._id}
                />
            </div>
            <Modal title="Создать диалог"
                   open={visible}
                   onCancel={onClose}
                   footer={[
                       <Button key="back" onClick={onClose}>
                           Закрыть
                       </Button>,
                       <Button
                           style={{ background: '#12E2DC'}}
                           disabled={!messageText}
                           key="submit"
                           type="primary"
                           loading={isLoading}
                           onClick={onModalOk}>
                           Создать
                       </Button>,
                   ]}>
                <Form className="add-dialog-form">
                    <Form.Item label="Введите имя пользователя или E-Mail">
                <Select
                    value={inputValue}
                    onSearch={onSearch}
                    onChange={onChangeInput}
                    onSelect={onSelectUser}
                    notFoundContent={null}
                    style={{ width: '100%' }}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    placeholder="Введите имя пользователя или почту"
                    showSearch>
                    {options}
                </Select>
                    </Form.Item>
                    {selectedUserId && (
                        <Form.Item label="Введите текст сообщения">
                            <TextArea
                                autosize={{ minRows: 3, maxRows: 10 }}
                                onChange={onChangeTextArea}
                                value={messageText}
                            />
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </div>
    );
};

Sidebar.defaultProps = {
    users: [],
};

export default Sidebar;