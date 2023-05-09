import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import './Status.scss'


const Status = ({online, fullname}) => {
    return  (
        <div>
            <div className="chat__dialog-header-center">
                <b className="chat__dialog-fullname" style={{color:'black'}}>{fullname}</b>
                <div className="chat__dialog-status">
                    <span className={classNames('status', {'status-online': online})}>
                        {online ? 'в сети' : 'не в сети'}</span>
                </div>
            </div>
        </div>
    )
};

Status.propTypes = {
    online: PropTypes.bool

};
export default Status;