import React from 'react';

const BaseView = (props) => {
    return (
        <div>
            {props.title != null && 
                <div className="section no-pad-bot" id="index-banner">
                    <div className="container">
                        <h1 className="header center orange-text">{props.title}</h1>
                        {props.subtitle != null && 
                            <div className="row center">
                                <h5 className="header col s12 light">{props.subtitle}</h5>
                            </div>
                        }
                        <br/>
                    </div>
                </div>
            }

            {props.content && 
                <div className="container cards">
                    <div className="section">
                        {props.content}
                    </div>
                    <br/><br/>
                </div>
            }
        </div>
    );
}

export default BaseView;