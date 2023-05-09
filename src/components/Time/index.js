import React from 'react';
import formatDistanceToNow from "date-fns/esm/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import PropTypes from "prop-types";


const Time = ({date}) => {
    const jsonDate = new Date(date).toJSON();
    return formatDistanceToNow(new Date(jsonDate),
        {addSuffix: true, locale: ruLocale})
}


    Time.propTypes = {
        date: PropTypes.string,
    };


export default Time;