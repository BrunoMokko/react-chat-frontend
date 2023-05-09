import React from 'react';
import PropTypes from "prop-types";
import checkedIcon from '../../img/8757697_double check_check_chatting_delivery_social media_icon.png';
import checkedSingleIcon from '../../img/8757544_single check_check_chatting_pending_social media_icon.png';

const CheckIcon = ({isMe, isReaded}) => {
    return  isMe && (isReaded ?(<img className='cheked__icon' src={checkedIcon} alt="Cheked Icon"/>
    ) : (
        <img className='cheked__icon cheked__icon-no' src={checkedSingleIcon} alt="Cheked Icon"/>))
};

CheckIcon.propTypes = {
    isReaded: PropTypes.bool,
    isMe: PropTypes.bool,

};
export default CheckIcon;