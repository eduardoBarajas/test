import React from 'react';
import {useSpring, animated} from 'react-spring';

function StoreOrders(props) {
  const anim_props = useSpring({opacity: 1, from: {opacity: 0}});
  return (
    <div>
      <animated.div style={anim_props}>
        Orders
      </animated.div>
    </div>
  );
}

export default StoreOrders;