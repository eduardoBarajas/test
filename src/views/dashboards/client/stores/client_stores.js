import React from 'react';
import {StoresList} from '../../../../components/components';

class ClientStores extends React.Component {
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
                    <StoresList/>
                </div>
            </div>
        );
	}
}

export default ClientStores;