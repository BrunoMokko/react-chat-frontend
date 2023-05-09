import { combineReducers } from "redux";

const reducers = ["messages", "dialogs", "user"];

export default combineReducers(
    reducers.reduce((initial, name) => {
        initial[name] = require(`./${name}`).default;
        return initial;
    }, {})
);
