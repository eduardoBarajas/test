import React from 'react';

import {OrdersList} from '../../../../components/components';

class ClientOrders extends React.Component {
	constructor(props) {
        super(props);
	}

    onFilterChange(event) {
        console.log(event);
    }

    componentDidMount() {
        // 
    }

    componentWillUnmount() {
        
    }

	render() {
        return (
            <div>
                <div className="container animate__animated animate__fadeIn">
                    <OrdersList/>
                </div>
            </div>
        );
	}
}

export default ClientOrders;