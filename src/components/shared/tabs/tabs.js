import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Tabs extends React.Component {
	constructor(props) {
        super(props);
        this.state = { redirectTo: ''};
	}

    componentDidMount() {
        // cada que se monte el componente inicializar el indicador de los tabs dado el id actual.
        let tabs = document.getElementById(this.props.id);
        window.M.Tabs.init(tabs);
        console.log('se inicializo la instancia de tabs');
    }

    componentWillUnmount() {
        console.log('Se desmonto el componente de los tabs');
    }

    onTabClick(event, toUrl) {
        console.log(toUrl);
        this.setState({redirectTo: toUrl});
    }

	render() {
        let redirect = (this.state.redirectTo != '') ? <Redirect to={this.state.redirectTo} /> : null;
        // generamos los links a partir del arreglo de opciones.
        let tab_options = this.props.tab_options;
        if (tab_options != null) {
            tab_options = tab_options.map((option) => {
                return <li className="tab" key={tab_options.indexOf(option)}><a onClick={(event) => { this.onTabClick(event, option.to)}} className={(tab_options.indexOf(option) == 0) ? 'active' : ''} to={option.to}><i className="material-icons left">{option.icon}</i>{option.label}</a></li>;
            });
        }
        let tabs_classes = 'nav-content default-primary-color z-depth-4 ';
        tabs_classes += (this.props.bottomNavigation != null) ? 'bottom_navigation' : '';
        return (
            <div className={tabs_classes}>
                {/* Como la libreria de materialize en los tabs esta obstruyendo los eventos no se puede usar
                    un elemento de Link para redireccionar por lo que se utilizara la directiva de <Redirect en caso de que deba redireccionarse.*/}
                {redirect} 
                <ul id={this.props.id} className="tabs tabs-transparent">
                    {tab_options}
                </ul>
            </div>
        );
	}
}
export default Tabs;