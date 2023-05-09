import { notification } from 'antd';

export default ({ text, type = 'info', title, duration = 3, placement }) =>
    notification[type]({
        message: title,
        description: text,
        duration,
        placement,
    });