import React from 'react';
import './spinner.css';

const Spinner = (props) => {
    return (
        <div className="spinner-container">
            <div className="row mx-0">
                <div className="col s2 m2" style={{marginTop: '0.5em', marginLeft: '15%'}}>
                    <div className={`preloader-wrapper active ${props.size}`}>
                        <div className="spinner-layer spinner-red-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s8 m8">
                    <p>{props.label}</p>
                </div>
            </div>
        </div>
    );
}

export default Spinner;