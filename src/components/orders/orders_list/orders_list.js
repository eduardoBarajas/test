import React from 'react';
import {useSpring, animated} from 'react-spring';

function OrdersList() {
  const props = useSpring({opacity: 1, from: {opacity: 0}})
  return <animated.div style={props}>Orders</animated.div>
}

export default OrdersList;