import React from 'react';
import {Form, Input} from "antd";
import {LockOutlined, MailOutlined, MailTwoTone, UserOutlined} from "@ant-design/icons";
import {Button, Block} from "../../../components";
import {Link} from "react-router-dom";

import validateField from "../../../helpers/validateField";


const LoginForm = (props) => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = props;
    return (
        <div>
            <div className="auth__top">
                <span className='auth__chat-name'>ToSpeak</span>
                <h2>Войти в аккаунт </h2>
                <p>Пожалуйста, ввойдите в аккаунт</p>
            </div>
            <Block>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            hasFeedback
                            validateStatus={
                                !touched.email ? '' :
                                    errors.email  ? (
                                        'error'
                                    ) : (
                                        'success'
                                    )
                            }
                            help={!touched.email ? '' :
                                errors.email  }

                        >
                            <Input prefix={<MailOutlined  className="site-form-item-icon" />}
                                   id="email"
                                   placeholder="Электронная почта"
                                   value={values.email}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   size="large" />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            validateStatus={validateField("password", touched, errors)}
                            help={!touched.password ? '' :
                                errors.password  }
                            name="password"
                            type='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите Ваш пароль!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Пароль"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button disabled={isSubmitting} onClick={handleSubmit}  type="primary" size="large" htmlType="submit" className="login-form-button">
                                Войти в аккаунт
                            </Button>
                        </Form.Item>
                        <Link className='auth__register-link' to='/registeration'>Зарегистрироваться</Link>
                    </Form>
            </Block>
        </div>
    );

};

export default LoginForm;