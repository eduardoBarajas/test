import React from 'react';
import {Link} from "react-router-dom";

const RouterButton = (props) => {
    return (
        <Link to={props.to} className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary">{props.label}</Link>
    );
}

export default RouterButton;