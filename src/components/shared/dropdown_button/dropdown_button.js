import React, {Component} from 'react';

class DropdownButton extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            option_selected: {id: -1, label: 'Filtrar'}
        }
	}

    componentDidMount() {
        let dropdown = document.getElementById(this.props.id);
        console.log(dropdown);
        //window.M.Dropdown.init(dropdown);
        window.M.AutoInit();
    }

    onOptionClick(event) {
        let current_option_selected = this.state.option_selected;
        if (current_option_selected.id != parseInt(event.target.getAttribute('tabindex'))) {
            current_option_selected = {id: parseInt(event.target.getAttribute('tabindex')), label: event.target.textContent}
            this.setState({option_selected: current_option_selected});
            this.props.onDropdownOptionSelected({dropdown_id: this.props.id, option: current_option_selected});
        }
    }

	render() {
        let btn_dropdown_classes = 'dropdown-trigger waves-effect waves-light btn-flat ';
        btn_dropdown_classes += (this.props.classes != null) ? this.props.classes : '';
        let dropdown_options = this.props.options.map((option) => {
            return <li key={this.props.options.indexOf(option)} tabIndex={option.id}><a onClick={(event) => { this.onOptionClick(event)}} tabIndex={option.id}>{option.label}</a></li>;
        });
        return (
            <div className="dropdown_products_title">
                <a className={btn_dropdown_classes} data-target={this.props.id}><i className="material-icons right">arrow_drop_down</i>{this.state.option_selected.label}</a>
                <ul id={this.props.id} className='dropdown-content'>
                    {dropdown_options}
                </ul>
            </div>
        );
	}
}
export default DropdownButton;