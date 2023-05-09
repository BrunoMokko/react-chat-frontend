import React from 'react';
import {Form, Input} from "antd";
import {LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import {Button, Block} from "../../../components";
import {Link} from "react-router-dom";


const RegisterForm = (props) => {
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
        isSubmitting
    } = props;
    return (
        <div>
            <div className="auth__top">
                <span className='auth__chat-name'>ToSpeak</span>
                <h2>Регистрация</h2>
                <p>Для входа в <span className='auth__chat-name'>ToSpeak</span>, Вам нужно зарегистрироваться</p>
            </div>
            <Block>

                <Form
                    onSubmit={handleSubmit}
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
                        name="fullname"
                        hasFeedback
                        validateStatus={
                            !touched.fullname ? '' :
                                errors.fullname  ? (
                                    'error'
                                ) : (
                                    'success'
                                )
                        }
                        help={!touched.fullname ? '' :
                            errors.fullname  }
                    >
                        <Input
                            id="fullname"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Ваше Имя"
                            value={values.fullname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            size="large"
                        />
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        validateStatus={
                            !touched.password ? '' :
                                errors.password  ? (
                                    'error'
                                ) : (
                                    'success'
                                )
                        }
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
                    <Form.Item
                        name="confirm"
                        type='password'
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, подтвердите Ваш пароль!',
                            },
                        ]}
                        hasFeedback
                        validateStatus={
                            !touched.confirm ? '' :
                                errors.confirm  ? (
                                    'error'
                                ) : (
                                    'success'
                                )
                        }
                        help={!touched.confirm ? '' :
                            errors.confirm  }
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            id="confirm"
                            value={values.confirm}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Подтвердите пароль"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button disabled={isSubmitting} onClick={handleSubmit}  type="primary" size="large" htmlType="submit" className="login-form-button">
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                    <Link className='auth__register-link' to='/login'>Войти в аккаунт</Link>
                </Form>

            </Block>
        </div>
    );
};

export default RegisterForm;