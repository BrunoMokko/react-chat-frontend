import React, {useState, useEffect }from "react";
import './Dialogs.scss';
import DialogItem from "../DialogItem";
import {connect} from 'react-redux';
import {dialogsActions} from "../../redux/actions";
import orderBy from "lodash/orderBy";
import {Input, Empty} from "antd";
import socket from 'core/socket';



const { Search } = Input;

const Dialogs = ({ fetchDialogs, currentDialogId, setCurrentDialogId, items, userId }) =>  {
    const [inputValue, setValue] = useState('');
    const [filtered, setFiltredItems] = useState(Array.from(items));


    const onChangeInput = (value = '') => {
        setFiltredItems(
            items.filter(
                dialog =>
                    dialog.author?.fullname?.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                    dialog.partner?.fullname?.toLowerCase().indexOf(value.toLowerCase()) >= 0,
            )
        );
        setValue(value);
    };



    // const onNewDialog = () => {
    //     fetchDialogs();
    // }

    window.fetchDialogs = fetchDialogs;

    useEffect(() => {
        if (items.length) {
            onChangeInput();
        }
    }, [items]);

    useEffect(() => {
        fetchDialogs();
        socket.on('SERVER:DIALOG_CREATED', fetchDialogs);

        return () => socket.removeListener('SERVER:DIALOG_CREATED', fetchDialogs);


    }, []);






    return (
        <div className="dialogs">
            <div className="chat__sidebar-search">
                <Search
                    placeholder="Поиск среди контактов"
                    onChange={(event) => onChangeInput(event.target.value)}

                    value={inputValue}
                    style={{
                        width: '100%',
                    }}
                />
            </div>
            {filtered.length ? (
                    orderBy(filtered, ["created_at"], ["desc"]).map(item => (
                        item.author && <DialogItem
                            onSelect={setCurrentDialogId}
                            isMe={item.author._id === userId}
                            currentDialogId={currentDialogId}
                            key={item._id}
                            userId={userId}
                            {...item}
                        />
                    )))
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                         description="Ничего не найдено"/>}
        </div>
    );
};



export default connect(({dialogs}) => dialogs, dialogsActions)(Dialogs);