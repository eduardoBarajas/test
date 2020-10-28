import React, {useReducer, useEffect} from 'react';
import { concat } from 'rxjs';
import { take } from 'rxjs/operators';
import {Link, useLocation} from "react-router-dom";
import {ImageSelector, MapView, Modal} from '../../components';
import {STRING_NO_SPECIAL_SYMBOLS, TELEPHONE_NUMBER, EMAIL} from '../../../helpers/regex_constants';
import {parseNumTel, validateNumTel} from '../../../helpers/forms_utils';
import FirebaseStorageService from '../../../services/general/firebase_storage_service';
import StoresService from '../../../services/stores/stores_service';
import Store from '../../../entities/store';
import md5 from 'md5';
const STORE_LOGOS_REF = "/deliveryapp/stores/logos";
const ORIGINAL_FORM_STATE = 1;

const initialState = () => {
    return {

        backgroundTasks: {
            uploadingLogo: false,
        },
        resetFormCount: ORIGINAL_FORM_STATE, 
        choosing_map_location: false,
        form: {
            _id: undefined,
            name: '',
            description: '',
            image: {name: '', url: ''},
            email: '',
            telephone: '',
            cellphone: '',
            lat: 0,
            lng: 0,
            address: '', 
            creationDate: new Date().toISOString()
        },
        formIntegrity: ''
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'backgroundTasks': {
            state.backgroundTasks = {...state.backgroundTasks, ...action.tasks};
            return {...state};
        }
        case 'mapChange': {
            return {...state, choosing_map_location: action.open};
        }
        case 'updateForm': {
            state.form = {...state.form, ...action.fields};
            return {...state};
        }
        case 'storeSaved': {
            let initState = initialState();
            return {...initState, resetFormCount: state.resetFormCount + ORIGINAL_FORM_STATE};
        }
        case 'setStore': {
            let store = new Store(action.store);
            state.form = {_id: store._id, name: store.name, description: store.description, image: {name: '', url: store.logoImage}, email: store.email,
                telephone: store.phones.local, cellphone: store.phones.cellphone, lat: store.addressCoord.latitude, lng: store.addressCoord.longitude, address: store.address,
                creationDate: store.creationDate};
            return {...state, formIntegrity: md5(state.form)};
        }
    }
    return state;
}

const validateStepOne = () => {
    // validamos el nombre
    let valid = {valid: true, errorMessage: ''};
    let nombre = document.getElementById('linear_name').value;
    let descripcion = document.getElementById('linear_description').value;
    if (nombre.length <= 0)
        valid = {valid: false, errorMessage: 'Ingresa un nombre valido'};
    if (descripcion.length <= 0)
        valid = {valid: false, errorMessage: 'Ingresa una descripcion valida'};
    return valid;
}

const validateStepTwo = () => {
    // validamos el nombre
    let valid = {valid: true, errorMessage: ''};
    let regex = new RegExp(EMAIL);
    let email = document.getElementById('linear_email').value;
    let num_tel = document.getElementById('linear_telNumber').value;
    let num_cel = document.getElementById('linear_cellNumber').value;
    if (!regex.test(email))
        valid = {valid: false, errorMessage: 'Ingresa un correo valido'};
    regex = new RegExp(TELEPHONE_NUMBER);
    if (!regex.test(num_tel))
        valid = {valid: false, errorMessage: 'Ingresa un telefono valido'};
    if (num_cel.length > 0) 
        if (!regex.test(num_cel))
            valid = {valid: false, errorMessage: 'Ingresa un celular valido'};
    return valid;
}

const validateStepThree = () => {
    // validamos el nombre
    let valid = {valid: true, errorMessage: ''};
    let address = document.getElementById('linear_address').value;
    if (address.length <= 0)
        valid = {valid: false, errorMessage: 'Selecciona una direccion valida'};
    return valid;
}

const StoreForm = (props) => {
    const [state, dispatch] = useReducer(reducer, undefined, initialState);
    const location_state = useLocation().state;
    
    console.log(props);
    console.log(state);
    useEffect( () => {
        console.log(props);
        if (props.form_mode.toUpperCase() == 'EDIT' && state.resetFormCount == ORIGINAL_FORM_STATE) {
            // cargamos la tienda en el estado.
            let id_store = '';
            if (location_state != null && location_state.store_id != null) {
                id_store = location_state.store_id;
            }
            StoresService.getStoreById(id_store).pipe(take(1)).subscribe({
                next(store) { dispatch({type: 'setStore', store: store}); },
                error(err) {  console.log("STORES_FORM: " + err);  window.M.toast({html: 'Ocurrio un problema al obtener la tienda, intenta de nuevo', classes: 'error-toast'});}
            });
        }
        const stepper = document.querySelector('.stepper');
        const steps = document.getElementsByClassName('step');
        for (let i = 0; i < steps.length; i++) {
            steps[i].classList.remove('done');
        }
        const stepper_instance = new window.MStepper(stepper, {
            // options
            firstActive: 0, // this is the default
            validationFunction: (stepperForm, activeStepContent) => {
                let step = activeStepContent.getAttribute('step');
                let valido = true;
                switch (parseInt(step)) {
                    case 1: valido = validateStepOne(); break;
                    case 2: valido = validateStepTwo(); break;
                    case 3: valido = validateStepThree(); break;
                }
                if (!valido.valid) {
                    stepper_instance.wrongStep();
                    window.M.toast({html: valido.errorMessage, classes: 'error-toast'});
                }
                    
                return valido.valid;
            }
        });
        stepper_instance.resetStepper();
        return () => {
            // Anything in here is fired on component unmount.
            console.log("UNMOUNT: NewStoreForm");
        }
    }, [state.resetFormCount]);
    return (
        <div>
            <ul className="stepper linear">
                <li className="step active">
                    <div className="step-title waves-effect waves-dark">Datos de la tienda</div>
                    <div className="step-content" step="1" >
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="linear_name" name="linear_name" type="text" className="validate" required value={state.form.name} onChange={(e) => {
                                    dispatch({type: 'updateForm', fields: {'name': e.target.value}});
                                }}/>
                                <label className={`${state.form.name.length > 0 ? "active" : ""}`} htmlFor="linear_name">Nombre</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="linear_description" name="linear_description" type="text" className="validate" value={state.form.description}  onChange={(e) => {
                                    dispatch({type: 'updateForm', fields: {'description': e.target.value}});
                                }} required/>
                                <label className={`${state.form.description.length > 0 ? "active" : ""}`} htmlFor="linear_description">Descripcion</label>
                            </div>
                            <div className="col s12">
                                <ImageSelector resetState={state.resetFormCount} imageUrl={state.form.image.url} canSelect={state.form.name.length > 0 && !state.backgroundTasks.uploadingLogo} isUploading={state.backgroundTasks.uploadingLogo} btnLabel={"Agregar Logo"} onImageSelected={(file, name) => {
                                    dispatch({type: 'backgroundTasks', tasks: { uploadingLogo: true }});
                                    if (state.form.image.name != '') {
                                        // ya estaba una imagen antes por lo que se procede a eliminar.
                                        const reemplazar_logo = concat(FirebaseStorageService.fileDelete(STORE_LOGOS_REF, state.form.image.name), FirebaseStorageService.fileUpload(STORE_LOGOS_REF, name, file));
                                        reemplazar_logo.subscribe(
                                            value => {
                                                if (value.url != null) {
                                                    window.M.toast({html: 'Se actualizo el logo', classes: 'success-toast'});
                                                    dispatch({type: 'updateForm', fields: {'image': {name: name, url: value.url}}});
                                                }
                                            },
                                            err => {console.log(err);  window.M.toast({html: 'Ocurrio un problema al subir la imagen', classes: 'error-toast'});},
                                            () => dispatch({type: 'backgroundTasks', tasks: { uploadingLogo: false }})
                                        );
                                    } else {
                                        FirebaseStorageService.fileUpload(STORE_LOGOS_REF, name, file).pipe(take(1)).subscribe(
                                            next => {
                                                window.M.toast({html: 'Se selecciono el logo', classes: 'success-toast'});
                                                dispatch({type: 'updateForm', fields: {'image': {name: name, url: next.url}}});
                                                dispatch({type: 'backgroundTasks', tasks: { uploadingLogo: false }});
                                            },
                                            err => {console.log(err);  window.M.toast({html: 'Ocurrio un problema al subir la imagen', classes: 'error-toast'});}
                                        );
                                    }
                                }}/>
                            </div>
                        </div>
                        <div className="step-actions">
                            <button className="waves-effect waves-dark btn blue next-step">Continuar</button>
                        </div>
                    </div>
                </li>
                <li className="step">
                    <div className="step-title waves-effect waves-dark">Contacto</div>
                    <div className="step-content" step="2">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="linear_email" name="linear_email" type="email" className="validate" value={state.form.email} onChange={(e) => {dispatch({type: 'updateForm', fields: {'email': e.target.value}});}} required/>
                                <label className={`${state.form.email.length > 0 ? "active" : ""}`} htmlFor="linear_email">Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="linear_telNumber" name="linear_telNumber" type="text" className="validate" value={parseNumTel(state.form.telephone)} onChange={(e) => {
                                        let validate = validateNumTel(e.target);
                                        if (validate.valid)
                                            dispatch({type: 'updateForm', fields: {'telephone': validate.value}});
                                }} required/>
                                <label className={`${state.form.telephone.length > 0 ? "active" : ""}`} htmlFor="linear_telNumber">Telefono</label>
                            </div>
                            <div className="input-field col s12">
                                <input id="linear_cellNumber" name="linear_cellNumber" type="text" className="validate" value={parseNumTel(state.form.cellphone)} onChange={(e) => {
                                    let validate = validateNumTel(e.target);
                                    if (validate.valid)
                                        dispatch({type: 'updateForm', fields: {'cellphone': validate.value}});
                                }} required/>
                                <label className={`${state.form.cellphone.length > 0 ? "active" : ""}`} htmlFor="linear_cellNumber">Celular (Opcional)</label>
                            </div>
                        </div>
                        <div className="step-actions">
                            <button className="waves-effect waves-dark btn blue next-step">Continuar</button>
                            <button className="waves-effect waves-dark btn-flat previous-step">Regresar</button>
                        </div>
                    </div>
                </li>
                <li className="step">
                    <div className="step-title waves-effect waves-dark">Ubicacion (Direccion)</div>
                    <div className="step-content" step="3">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="linear_address" name="linear_address" type="text" className={`validate`} disabled value={state.form.address}/>
                                <label htmlFor="linear_address" className={`${state.form.address.length > 0 ? "active" : ""}`}>Direccion</label>
                            </div>
                            <div className="input-field col s12">
                                <a className="waves-effect waves-dark btn-flat w-100" style={{textAlign: 'center'}} onClick={(e) => {dispatch({type: 'mapChange', open: true})}}><i className="material-icons">map</i>Eligir ubicacion</a>
                            </div>
                            <Modal id={"modal_mapview"} isOpen={state.choosing_map_location} body={<MapView onMapLocationSelected={
                                (address) => {
                                    if (address == null) {
                                        window.M.toast({html: 'Ubicacion no valida, selecciona otra', classes: 'error-toast'});
                                    } else {
                                        dispatch({type: 'updateForm', fields: address})
                                        dispatch({type: 'mapChange', open: false});
                                        window.M.toast({html: 'Ubicacion seleccionada', classes: 'success-toast'});
                                    }
                                }
                            }/>}/>
                        </div>
                        <div className="step-actions">
                            <button className="waves-effect waves-dark btn blue next-step">Continuar</button>
                            <button className="waves-effect waves-dark btn-flat previous-step">Regresar</button>
                        </div>
                    </div>
                </li>
                <li className="step">
                    <div className="step-title waves-effect waves-dark">Finalizar</div>
                    <div className="step-content">
                        <button className="waves-effect waves-dark btn blue" onClick={(e) => {
                            let store = new Store({_id: state.form._id, name: state.form.name, description: state.form.description, logoImage: state.form.image.url, email: state.form.email,
                                address: state.form.address, addressCoord: {latitude: state.form.lat, longitude: state.form.lng}, creationDate: state.form.creationDate,
                                phones: {local: state.form.telephone, cellphone: state.form.cellphone}} 
                            );
                            // comparamos si se hicieron cambios
                            if (state.form.formIntegrity != '') {
                                // significa que si tenemos que validar que se hayan hecho cambios
                                if (state.form.formIntegrity == md5(store)) {
                                    console.log('No se hicieron cambios en el form');
                                } else {
                                    console.log('Se hicieron cambios en el form');
                                }
                            }
                            StoresService.saveStore(store).pipe(take(1)).subscribe({
                                next(response) { 
                                    window.M.toast({html: 'La tienda fue agregada con exito', classes: 'success-toast'});
                                    dispatch({type: 'storeSaved'});  
                                },
                                error(err) { 
                                    console.error('something wrong occurred: ' + err);
                                    window.M.toast({html: 'Ocurrio un problema al agregar la tienda, intenta de nuevo', classes: 'error-toast'});
                                }
                            });
                            e.preventDefault();
                        }}>Guardar</button>
                    </div>
                </li>
            </ul>
        </div>
    );
};
export default StoreForm;