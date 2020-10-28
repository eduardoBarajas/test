import React, {useReducer, useEffect} from 'react';
import '../image_selector/image_selector.css';
import NoLogoImage from '../../../assets/images/yourLogoHere.png';
import {Spinner} from '../../components';
const md5 = require('md5');

const initialState = () => {
    return {
        image: {file: NoLogoImage, name: ''},
        resetState: 0
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ImageSelected': {
            return {...state, image: {file: action.file, name: action.name}};
        }
        case 'updateResetState': {
            return {...state, resetState: action.newState, image: {file: NoLogoImage, name: ''}};
        }
        default: return state;
    }
}


const ImageSelector = (props) => {
    const [state, dispatch] = useReducer(reducer, undefined, initialState);
    let fileSelector = null;
    // cuando el padre modifique su estado de reset se debe notificar a este componente, una vez se compruebe no son el mismo se reinicia este componenete, 
    // el estado inicial de este componente debe ser menor al del padre para que se pueda asegurar una diferencia.
    if (props.resetState != state.resetState) {
        dispatch({type: 'updateResetState', newState: props.resetState});
    }
    if (props.imageUrl != '' && state.image.file == NoLogoImage) {
        dispatch({type: 'ImageSelected', file: props.imageUrl, name: 'imagen_guardada'});
    }
    useEffect( () => {
        return () => {
            // Anything in here is fired on component unmount.
            console.log("UNMOUNT: ImageUploader");
            // liberamos la memoria utilizada para mostrar la imagen
            if (state.image.file != null) 
                URL.revokeObjectURL(state.image.file);
        }
    }, []);
    return (
        <div className="row">
            <div className="col s12 m4 l4">
                <div className="card">
                    <div className="card-image">
                        <img className="responsive-img" src={state.image.file}/>
                    </div>
                    <div className="card-content">
                        <p className="image_details_text_title">Resolucion Permitida</p>
                        <p className="image_details_text_body">256px * 256px</p>
                    </div>
                    <div className="card-action no-padding">
                        {(props.isUploading) && 
                            <Spinner label="Subiendo imagen" size="small"/>
                        }
                        {(!props.isUploading) &&
                            <a className={`waves-effect waves-light w-100 btn ${(props.canSelect) ? '' : 'disabled'}`} onClick={(e) => {
                                fileSelector = document.createElement('input');
                                fileSelector.setAttribute('type', 'file');
                                fileSelector.setAttribute('multiple', 'multiple');
                                fileSelector.addEventListener('change', (e) => {
                                    // se obtiene el nombre y el tipo de archivo.
                                    let [filename, filetype] = fileSelector.files[0].name.split('.');
                                    // se crea el nuevo nombre utilizando el tiempo para hacerlo unico.
                                    filename = `${md5(filename + new Date().getTime())}.${filetype}`;
                                    props.onImageSelected(fileSelector.files[0], filename);
                                    dispatch({type: 'ImageSelected', file: URL.createObjectURL(fileSelector.files[0]), name: filename});
                                });
                                fileSelector.click();
                            }}><i className="material-icons left">camera_alt</i>Selecciona un logo</a>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ImageSelector;