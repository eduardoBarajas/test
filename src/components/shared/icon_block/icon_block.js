import React from 'react';

const IconBlock = (props) => {
    let col_size = (props.size != null) ? props.size : 'col s12 m4';
    let title_style = (props.title_style != null) ? props.title_style : 'center light-blue-text';
    let icon = (props.icon != null) ? props.icon : 'flash_on';
    let subtitle = (props.subtitle != null) ? <h5 className="center">{props.subtitle}</h5> : null;
    let text = (props.text != null) ? props.text : 'We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.';
    return (
        <div className={col_size}>
            <div className="icon-block">
                <h2 className={title_style}><i className="material-icons">{icon}</i></h2>
                {subtitle}
                <p className="light">{text}</p>
            </div>
        </div>
    )
}

export default IconBlock;