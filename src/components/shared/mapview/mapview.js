import React, {useReducer, useEffect, useRef} from 'react';
import { Observable } from 'rxjs';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import 'mapbox-gl/dist/mapbox-gl.css';
import './mapview.css';
import MapService from '../../../services/general/map_service';
import { take } from 'rxjs/operators';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1MjMiLCJhIjoiY2psa2lpNTRzMG43azNrbzU2emYxaThtNiJ9.j20WpkbxDZbaszbFUToebg';
const md5 = require('md5');

const initialState = () => {
    return {
        lng: -116.563056,
        lat: 31.852508,
        zoom: 14,
        resized: false,
        address: '',
        openAutoComplete: false,
        address_locations: []
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'resizeMap': {
            return {...state, resized: action.resized};
        }
        case 'coordChange': {
            return {...state, lng: action.lng, lat: action.lat, address: action.address};
        }
        case 'addressChange': {
            return {...state, address: action.address};
        }
    }
    return state;
}

const MapView = (props) => {
    const [state, dispatch] = useReducer(reducer, undefined, initialState);
    let mapContainer = null;
    useEffect( () => {
        console.log('se esta inciializando el mapbiew');
        var elem = document.getElementById('address_input');
        var limites_mapa = [
            [-116.835714, 31.488703], // Southwest coordinates
            [-116.233085, 32.127540] // Northeast coordinates
        ];
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [state.lng, state.lat],
            zoom: state.zoom,
            maxBounds: limites_mapa
        });
        var popup = new mapboxgl.Popup({ closeOnClick: false })
            .setHTML(
                ReactDOMServer.renderToStaticMarkup(
                    <div>
                        <p style={{color: 'black'}}>Elige una ubicacion</p>
                    </div>
                )
            );
        var marker = new mapboxgl.Marker({
            draggable: true
        })
        .setLngLat([state.lng, state.lat])
        .setPopup(popup)
        .addTo(map);
        
        function onDragEnd() {
            var lngLat = marker.getLngLat();
            console.log(lngLat);
            MapService.getAddressFromCoord(lngLat.lat, lngLat.lng).pipe(take(1)).subscribe({
                next(response) { 
                    if (response.data[0] != null) {
                        popup.setHTML(
                            ReactDOMServer.renderToStaticMarkup(
                                <div>
                                    <p style={{color: 'black'}}>{response.data[0].label}</p>
                                </div>
                            )
                        );
                        marker.setPopup(popup);
                        dispatch({type: 'coordChange', lat: lngLat.lat, lng: lngLat.lng, address: response.data[0].label});
                    }
                        
                },
                error(err) { console.error('something wrong occurred: ' + err); }
            });
        }
        marker.on('dragend', onDragEnd);
        // Add geolocate control to the map.
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                enableHighAccuracy: true
            },
                trackUserLocation: true
            })
        );
        
        map.on('load', function() {
            if (!state.resized) {
                map.resize();
                dispatch({type: 'resizeMap', resized: true});
            }
        });
        window.M.Autocomplete.init(elem, {
            minLength: 0,
            onAutocomplete: (value) => {
                let addresses = (sessionStorage.getItem('addresses') != null) ? JSON.parse(sessionStorage.getItem('addresses')) : null;
                if (addresses != null) {
                    addresses.forEach((addr) => {
                        if (md5(addr.label) == md5(value)) {
                            popup.setHTML(
                                ReactDOMServer.renderToStaticMarkup(
                                    <div>
                                        <p style={{color: 'black'}}>{value}</p>
                                    </div>
                                )
                            );
                            marker.setLngLat([addr.longitude, addr.latitude])
                            .setPopup(popup);
                            map.flyTo({
                                center: [addr.longitude, addr.latitude],
                                essential: true // this animation is considered essential with respect to prefers-reduced-motion
                            });
                        }
                    });
                }
                dispatch({type: 'addressChange', address: value});
            }
        });
        return () => {
            // Anything in here is fired on component unmount.
            console.log("UNMOUNT: MapView");
        }
    }, []);
    return (
        <div className="row mb-0">
            <div className="col s12 m12">
                <div className="card default-primary-color darken-1 mapCard">
                    <div className="card-content mapCard-content white-text">
                        <span className="card-title mapCard-title">
                            <div className="card-panel input-field no-padding no-margin primary-text-color">
                                <i className="material-icons prefix input_direction_icon">map</i>
                                <input id="address_input" type="text" autoComplete="off"  className="validate input_direction_map autocomplete" value={state.address} onChange={(e) => {
                                    dispatch({type: 'addressChange', address: e.target.value});
                                }}/>
                                <label className={`input_direction_label ${(state.address != null && state.address.length > 0) ? "active" : ""}`} htmlFor="address_input">Direccion</label>
                                <a id="btn_buscar_address" className="waves-effect waves-teal btn-flat" onClick={(e) => {
                                    let autocomplete_element = document.getElementById('address_input');
                                    MapService.getCoordFromAddress(state.address).pipe(take(1)).subscribe({
                                        next(response) { 
                                            if (response.data.length > 0) {
                                                // limpiamos el valor para que los resultados puedan ser mostrados.
                                                autocomplete_element.value = '';
                                                let instance_autocomplete = window.M.Autocomplete.getInstance(autocomplete_element);
                                                let autocomplete_data = {};
                                                response.data.forEach((addr) => {
                                                    autocomplete_data[addr.label] = null;
                                                });
                                                instance_autocomplete.updateData(autocomplete_data);
                                                sessionStorage.setItem('addresses', JSON.stringify(response.data));
                                                autocomplete_element.click();
                                            } else {
                                                console.log('No se encontraron resultados');
                                            }
                                            console.log(response);
                                        },
                                        error(err) { console.error('something wrong occurred: ' + err); }
                                    });
                                }}><i className="material-icons right">search</i></a>
                            </div>
                        </span>
                        <div ref={el => mapContainer = el} className="mapContainer"/>
                    </div>
                    <div className="card-action mapCardAction no-padding text-primary-color">
                        <a className="btn-guardar-map waves-effect waves-teal btn-flat" onClick={(event) => {
                            props.onMapLocationSelected({lat: state.lat, lng: state.lng, address: state.address});
                        }}>CONFIRMAR</a>
                    </div>
                </div>
            </div>
        </div>     
    );
}

export default MapView;