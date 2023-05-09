import { withFormik } from 'formik';
import RegisterForm from '../components/RegisterForm';
import store from 'redux/store';
import {userActions} from 'redux/actions';

export default withFormik({
    validate: values => {
        let errors = {};
        if (!values.email) {
            errors.email = 'Пожалуйста, введите Вашу электронную почту!';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.email
            )
        ) {
            errors.email = 'Неверный адрес электронной почты!';
        }

        if(!values.fullname) {
            errors.fullname = 'Введите Имя'
        } else if(!/^(?=.{2,})/.test(values.username)) {
            errors.fullname = 'Слишком короткое имя'

        }

        if(!values.password) {
            errors.password = 'Введите пароль'
        } else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(values.password)) {
            errors.password = 'Слишком легкий пароль! Пароль должен быть не менее 8 символов (Пример: eTO18mof)'

        }

        if(!values.confirm) {
            errors.confirm = 'Подтвердите пароль'
        } else if(values.confirm !== values.password) {
            errors.confirm = 'Неверный пароль'

        }
        return errors;
    },
    handleSubmit: (values, { setSubmitting }) => {
        store.dispatch(userActions.fetchUserRegistration(values)).then(()=> {

                    window.location.href = '/registeration/verify';

            setSubmitting(false);
        })
            .catch(() => {
                setSubmitting(false);
            });
    },
    displayName: 'RegisterForm',
})(RegisterForm);