import React, {Component, useEffect, useState} from 'react';
import './search_filter.css';
import {DropdownButton} from '../../components';

const dropdown_options = {
    product_type: [{id: 1, label: 'Opcion1'}, {id: 2, label: 'Opcion2'}, {id: 3, label: 'Opcion3'}],
    order_by: [{id: 4, label: 'Opcion4'}, {id: 5, label: 'Opcion5'}, {id: 6, label: 'Opcion6'}]
}

const SearchFilterProducts = () => {
    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
       setScrolled((offset > 60 ));
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const onFilterOptionSelected = (option_selected: Event) => {
        console.log(option_selected);
    }
    let search_filter_classes = "search_filter_pinned ";
    search_filter_classes += (scrolled) ? 'scrolled' : '';
	return (
        <div className={search_filter_classes}>
            <div className="search_filter_div default-primary-color">
                <div className="row">
                    <div className="col s6 m6 offset-l8 l2">
                        <label className="label_search_filter">Tipo De Producto</label>
                        <DropdownButton options={dropdown_options.product_type} classes="text-primary-color" id="dropdown_search_filter_show_only" onDropdownOptionSelected={(event: Event) => {onFilterOptionSelected(event)}}/>
                    </div>
                    <div className="col s6 m6 l2">
                        <label className="label_search_filter">Ordenar Por</label>
                        <DropdownButton options={dropdown_options.order_by} classes="text-primary-color" id="dropdown_search_filter_order_by" onDropdownOptionSelected={(event: Event) => {onFilterOptionSelected(event)}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchFilterProducts;