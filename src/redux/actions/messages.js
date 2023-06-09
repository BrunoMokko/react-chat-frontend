import { messagesApi } from '../../api';

const Actions = {
    setMessages: items => ({
        type: 'MESSAGES:SET_ITEMS',
        payload: items
    }),
    addMessage: message => (dispatch, getState) => {
        const { dialogs } = getState();
        const { currentDialogId } = dialogs;

        if (message.dialog._id && currentDialogId === message.dialog._id) {
            dispatch({
                type: "MESSAGES:ADD_MESSAGE",
                payload: message
            });
        }
    },
    fetchSendMessage: ( text, dialogId ) => dispatch => {
        return  messagesApi.send(text, dialogId);
    },
    setIsLoading: bool => ({
        type: 'MESSAGES:SET_IS_LOADING',
        payload: bool
    }),
    fetchMessages: dialogId => dispatch => {
        dispatch(Actions.setIsLoading(true));
        messagesApi.getAllByDialogId(dialogId).then(({data}) => {
            dispatch(Actions.setMessages(data));
        })
            .catch(() => {
                dispatch(Actions.setIsLoading(false));
            })
    }
};

export default Actions;