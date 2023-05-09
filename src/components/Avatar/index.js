import React from "react";
import PropTypes from 'prop-types';
import './Avatar.scss';
import {generateAvatarFromHash} from "../../helpers";

const Avatar = ({user}) => {
    if(!user ) {
        return null;
    }

    if(user.avatar){
        return(
            <img
                className='avatar'
                src={user.avatar}
                alt={`Avatar ${user.fullname}`}/>
        );
    } else {
        const {color, colorLighten} = generateAvatarFromHash(user._id);
        const firstFullnameChar = user.fullname ? user.fullname[0].toUpperCase() : '';
        return (
            <div style={{ background: `linear-gradient(135deg, ${color}, ${colorLighten} )`}} className='avatar avatar--symbol'>{firstFullnameChar}</div>
        )
    };
};


Avatar.propTypes = {
    className: PropTypes.string
}


export default Avatar;