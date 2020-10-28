import React, {Component} from 'react';
import './quantity_selector.css';

class QuantitySelector extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            cantidad_actual: 0,
            precio_acumulado: 0,
            descuento_acumulado: 0,
            active_icon: 'none'
        }
	}

    componentDidMount() {
        
    }

    onValueChange(cantidad, event_type) {
        if (cantidad >= 0) {
            this.setState({precio_acumulado: cantidad * this.props.precio_individual, descuento_acumulado: cantidad * this.props.descuento_individual, 
                cantidad_actual: cantidad, active_icon: event_type});
        }
    }

	render() {
        let icon_classes = {addIcon: 'unselectable material-icons add', removeIcon: 'unselectable material-icons remove'};
        if (this.state.active_icon == 'addIcon') 
            icon_classes.addIcon += ' active_quantity';
        if (this.state.active_icon == 'removeIcon') 
            icon_classes.removeIcon += ' active_quantity';
        return (
            <div className="price-quantity-wrapper primary-text-color ">
                <div className="price-wrapper">
                    <label>Precio</label>
                    <span className="price" data-product-price="">
                        ${this.state.precio_acumulado}
                    </span>
                    {this.state.descuento_acumulado > 0 &&
                        <s data-compare-price="">${this.state.descuento_acumulado}</s>
                    }
                </div>
                <div className="input-field quantity-counter">
                    <label htmlFor="Quantity">Cantidad</label>
                    <i className={icon_classes.removeIcon} onClick={(event) => {this.onValueChange(this.state.cantidad_actual - 1, 'removeIcon')}}>remove_circle_outline</i>
                    <input type="number" id="Quantity" name="quantity" onChange={(event) => {this.onValueChange(parseInt(event.currentTarget.value, 'onchange'))}}value={this.state.cantidad_actual} min="0"/>
                    <i className={icon_classes.addIcon} onClick={(event) => {this.onValueChange(this.state.cantidad_actual + 1, 'addIcon')}}>add_circle_outline</i>
                </div>
            </div>
        );
	}
}
export default QuantitySelector;