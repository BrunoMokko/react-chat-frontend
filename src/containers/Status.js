import React from "react";
import { Status as StatusBase } from "components";
import { connect } from "react-redux";

const Status = ({ currentDialogId, user, dialogs }) => {
    if (!dialogs.length || !currentDialogId) {
        return null;
    }

    const currentDialogObj = dialogs.find(
        dialog => dialog._id === currentDialogId
    );

    let partner = {};

    // if (!user) return null;


    if (currentDialogObj.author._id === user._id) {
        partner = currentDialogObj.partner;
    } else {
        partner = currentDialogObj.author;
    }

    return <StatusBase online={Boolean(partner.isOnline)} fullname={partner.fullname} />;
};

export default connect(({ dialogs, user }) => ({
    dialogs: dialogs.items,
    currentDialogId: dialogs.currentDialogId,
    user: user.data
}))(Status);
