import React, {useReducer, useEffect, useState} from 'react';
import {
    useLocation,
    useHistory 
} from "react-router-dom";
import { useSpring, animated as a } from 'react-spring';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    
});

const initialState = () => {
    return {
        busy: false,
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'busy': {
            return {busy: action.busy};
        }
    }
    return state;
}

const FlipCard = (props) => {
    //const [flipped, set] = useReducer(reducer, undefined, initialState);
    const [flipped, set] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    });
    const classes = useStyles();
    return (
        <div id={props.id} className={`col ${props.size}`} onClick={() => set(state => !state)}>
            <div className={"card " + props.color}>
                {!flipped &&
                    <a.div style={{ opacity: opacity.interpolate(o => 1 - o), transform }} className="card-content white-text">
                        {props.front}
                    </a.div>
                }
                {flipped &&
                    <a.div style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }}>
                        {props.back}
                    </a.div>
                }
            </div>
        </div>
    );
};
export default FlipCard;