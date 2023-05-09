import { userApi } from '../../api';
import openNotification from "../../helpers/openNotification";

const Actions = {
    setUserData: data => ({
        type: 'USER:SET_DATA',
        payload: data,
    }),
    setIsAuth: bool => ({
        type: 'USER:SET_IS_AUTH',
        payload: bool,
    }),
    fetchUserData: () => dispatch => {
        userApi.getMe().then(({data}) => {
            dispatch(Actions.setUserData(data));
        }).catch(err => {
            if (err.response && err.response.status === 403) {
                dispatch(Actions.setIsAuth(false));
                delete window.localStorage.token;
            }
        });

    },
    fetchUserLogin: postData => dispatch => {
        return userApi
            .login(postData).then(({data}) => {
                const {status, token} = data;
                if(status === 'error') {
                    openNotification({
                        text: "Неверный логин или пароль",
                        type: 'error',
                        title: 'Ошибка!',
                        placement: 'topLeft'
                    });
                } else {
                    openNotification({
                        text: "Понеслась :)",
                        type: 'success',
                        title: 'Авторизация успешна!'
                    })
                    window.axios.defaults.headers.common["token"] = token;
                    window.localStorage['token'] = token;
                    dispatch(Actions.fetchUserData());
                    dispatch(Actions.setIsAuth(true));
                }
                return data;
            })
    },
    fetchUserRegistration: postData => () => {
        return userApi
            .registration(postData).then(({data}) => {
                return data;
            })
    }
};

export default Actions;