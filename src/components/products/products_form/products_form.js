import React, {useReducer, useEffect} from 'react';
import { take } from 'rxjs/operators';
import { concat } from 'rxjs';
import {Link, useLocation} from "react-router-dom";
import {ImageSelector} from '../../components';
import {MONEY} from '../../../helpers/regex_constants';
import {parseMoneyInput} from '../../../helpers/forms_utils';
import FirebaseStorageService from '../../../services/general/firebase_storage_service';
import ProductsService from '../../../services/products/products_service';
import Product from '../../../entities/product';
import md5 from 'md5';
const STORE_LOGOS_REF = "/deliveryapp/stores/";
const ORIGINAL_FORM_STATE = 1;

const initialState = () => {
    return {
        backgroundTasks: {
            uploadingImage: false,
        },
        resetFormCount: ORIGINAL_FORM_STATE, 
        store_id: '',
        form: {
            _id: undefined,
            name: '',
            description: '',
            image: {name: '', url: ''},
            creationDate: new Date().toISOString(),
            unitPrice: ''
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
        case 'updateForm': {
            state.form = {...state.form, ...action.fields};
            return {...state};
        }
        case 'productSaved': {
            let initState = initialState();
            initState.store_id = state.store_id;
            return {...initState, resetFormCount: state.resetFormCount + ORIGINAL_FORM_STATE};
        }
        case 'setProduct': {
            //let store = new Store(action.store);
            //state.form = {_id: store._id, name: store.name, description: store.description, image: {name: '', url: store.logoImage}, email: store.email,
            //    telephone: store.phones.local, cellphone: store.phones.cellphone, lat: store.addressCoord.latitude, lng: store.addressCoord.longitude, address: store.address,
            //    creationDate: store.creationDate};
            //state.form.name = 'hole prros';
            return {...state, store_id: action.store_id, formIntegrity: md5(state.form)};
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

const StoreForm = (props) => {
    const [state, dispatch] = useReducer(reducer, undefined, initialState);
    const location_state = useLocation().state;
    console.log(state);
    useEffect( () => {
        if (state.resetFormCount == ORIGINAL_FORM_STATE) {
            // cargamos la tienda en el estado.
            let id_store = '';
            if (location_state != null && location_state.store_id != null) {
                id_store = location_state.store_id;
                dispatch({type: 'setProduct', store_id: id_store});
            }
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
            console.log("UNMOUNT: NewProductForm");
        }
    }, [state.resetFormCount]);
    return (
        <div>
            <ul className="stepper linear">
                <li className="step active">
                    <div className="step-title waves-effect waves-dark">Datos del producto</div>
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
                                <ImageSelector resetState={state.resetFormCount} imageUrl={state.form.image.url} canSelect={state.form.name.length > 0 && !state.backgroundTasks.uploadingImage} isUploading={state.backgroundTasks.uploadingImage} btnLabel={"Agregar Imagen"} onImageSelected={(file, name) => {
                                    dispatch({type: 'backgroundTasks', tasks: { uploadingImage: true }});
                                    if (state.form.image.name != '') {
                                        // ya estaba una imagen antes por lo que se procede a eliminar.
                                        const reemplazar_logo = concat(FirebaseStorageService.fileDelete(STORE_LOGOS_REF + state.store_id + '/products', state.form.image.name), FirebaseStorageService.fileUpload(STORE_LOGOS_REF + state.store_id + '/products', name, file));
                                        reemplazar_logo.subscribe(
                                            value => {
                                                if (value.url != null) {
                                                    window.M.toast({html: 'Se actualizo la imagen del producto', classes: 'success-toast'});
                                                    dispatch({type: 'updateForm', fields: {'image': {name: name, url: value.url}}});
                                                }
                                            },
                                            err => {console.log(err);  window.M.toast({html: 'Ocurrio un problema al subir la imagen', classes: 'error-toast'});},
                                            () => dispatch({type: 'backgroundTasks', tasks: { uploadingImage: false }})
                                        );
                                    } else {
                                        FirebaseStorageService.fileUpload(STORE_LOGOS_REF + state.store_id + '/products', name, file).pipe(take(1)).subscribe(
                                            next => {
                                                window.M.toast({html: 'Se selecciono la imagen', classes: 'success-toast'});
                                                dispatch({type: 'updateForm', fields: {'image': {name: name, url: next.url}}});
                                                dispatch({type: 'backgroundTasks', tasks: { uploadingImage: false }});
                                            },
                                            err => {console.log(err);  window.M.toast({html: 'Ocurrio un problema al subir la imagen', classes: 'error-toast'});}
                                        );
                                    }
                                }}/>
                            </div>
                            <div className="input-field col s12">
                                <input id="linear_unit_price" name="linear_unit_price" type="text" className="validate" value={parseMoneyInput(state.form.unitPrice)}  onChange={(e) => {
                                    dispatch({type: 'updateForm', fields: {'unitPrice': (e.target.value.length > 1) ? e.target.value.substr(1, e.target.value.length) : e.target.value}});
                                }} required/>
                                <label className={`${state.form.unitPrice.length > 0 ? "active" : ""}`} htmlFor="linear_unit_price">Precio Unitario</label>
                            </div>
                        </div>
                        <div className="step-actions">
                            <button className="waves-effect waves-dark btn blue next-step">Continuar</button>
                        </div>
                    </div>
                </li>
                <li className="step">
                    <div className="step-title waves-effect waves-dark">Finalizar</div>
                    <div className="step-content">
                        <button className="waves-effect waves-dark btn blue" onClick={(e) => {
                            let product = new Product({_id: state.form._id, name: state.form.name, description: state.form.description, mainImage: state.form.image.url,
                                creationDate: state.form.creationDate, unitPrice: parseFloat(state.form.unitPrice), store_id: state.store_id});
                            // comparamos si se hicieron cambios
                            if (state.form.formIntegrity != '') {
                                // significa que si tenemos que validar que se hayan hecho cambios
                                if (state.form.formIntegrity == md5(product)) {
                                    console.log('No se hicieron cambios en el form');
                                } else {
                                    console.log('Se hicieron cambios en el form');
                                }
                            }
                            ProductsService.saveProduct(product).pipe(take(1)).subscribe({
                                next(response) { 
                                    window.M.toast({html: 'El producto fue con exito', classes: 'success-toast'});
                                    dispatch({type: 'productSaved'});  
                                },
                                error(err) { 
                                    console.error('something wrong occurred: ' + err);
                                    window.M.toast({html: 'Ocurrio un problema al agregar el producto, intenta de nuevo', classes: 'error-toast'});
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