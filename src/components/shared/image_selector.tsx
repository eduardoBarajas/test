import React, {useReducer, useEffect} from 'react';
import { Button, GridList, GridListTileBar, IconButton, makeStyles, Slide, Tooltip, Typography } from '@material-ui/core';
import GridListTile from '@material-ui/core/GridListTile/GridListTile';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
const md5 = require('md5');

const initialState = () => {
    return {
        resetState: 0,
        images: []
    }
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ImageSelected': {
            // checamos que no este en el arreglo
            let nImages = state.images.filter((image: {file: any, name: string}) => {
                return (image.file == action.file);
            });
            if (nImages.length > 0) {
                console.log('ya estaba agregada la imagen');
                return {...state};
            }
            state.images.push({file: action.file, name: action.name});
            return {...state};
        }
        case 'updateResetState': {
            return {...state, resetState: action.newState, image: {file: '', name: ''}};
        }
        default: return state;
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
      width: '100%'
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    grid_list_add_new_tile: {
        width: 'auto!important',
    },
    add_image_icon: {
        width: '3em',
        height: '3em'
    },
    delete_imagen_icon: {
        color: 'white'
    },
    '@keyframes color_change': {
        from: { color: 'white', width: '3em', height: '3em'},
        to: { color: 'rgba(114, 5, 182, 0.8)', width: '2.8em', height: '2.8em' }
    },
    '@-webkit-keyframes color_change': {
        from: { color: 'white', width: '3em', height: '3em'},
        to: { color: 'rgba(114, 5, 182, 0.8)', width: '2.8em', height: '2.8em' }
    },
    icon_camera: {
        width: '3em!important',
        height: '3em!important'
    },
    icon_camera_loading: {
        animation: 'color_change 1s infinite alternate'
    },
    add_image_button: {
        width: '100%',
        height: '100%',
        fontSize: '1.1rem',
        backgroundColor: 'rgba(56,142,60 ,1)!important',
        color: 'white!important'
    },
    add_image_button_loading: {
        backgroundColor: 'whitesmoke!important',
        color: 'rgba(114, 5, 182, 0.8)!important'
    },
    'add_image_button:hover': {
        color: 'rgba(114, 5, 182, 0.8)!important',
        backgroundColor: 'whitesmoke!important'
    }
}));

export interface ImageSelectorProps {
    resetState: number,
    imageUrl: string,
    onImageSelected: any,
    isUploading: boolean
}

const ImageSelector = (props: ImageSelectorProps) => {
    const [state, dispatch] = useReducer(reducer, undefined, initialState);
    const classes = useStyles();
    // cuando el padre modifique su estado de reset se debe notificar a este componente, una vez se compruebe no son el mismo se reinicia este componenete, 
    // el estado inicial de este componente debe ser menor al del padre para que se pueda asegurar una diferencia.
    if (props.resetState != state.resetState) {
        dispatch({type: 'updateResetState', newState: props.resetState});
    }
    if (props.imageUrl != '' && state.image.file == '') {
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

    /*
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
    */





    return (
        <GridList className={classes.gridList} cols={2.5}>
            <GridListTile key={0} className={classes.grid_list_add_new_tile}>
                <Tooltip title="Delete">
                    <Button disabled={props.isUploading} className={'add_image_button ' + (props.isUploading ? 'add_image_button_loading' : '')} size="medium" color="primary" aria-label="add" onClick={(e) => {
                        let fileSelector = document.createElement('input');
                        fileSelector.setAttribute('type', 'file');
                        fileSelector.setAttribute('multiple', 'multiple');
                        fileSelector.addEventListener('change', (e) => {
                            if (fileSelector.files != null) {
                                 // se obtiene el nombre y el tipo de archivo.
                                let [filename, filetype] = fileSelector.files[0].name.split('.');
                                // se crea el nuevo nombre utilizando el tiempo para hacerlo unico.
                                filename = `${md5(filename + new Date().getTime())}.${filetype}`;
                                props.onImageSelected(fileSelector.files[0], filename);
                                dispatch({type: 'ImageSelected', file: URL.createObjectURL(fileSelector.files[0]), name: filename});
                            }
                        });
                        fileSelector.click();
                        e.preventDefault();
                    }}>
                        <div>
                            <PhotoCameraIcon className={'icon_camera ' + (props.isUploading ? 'icon_camera_loading' : '')} />
                            <Typography variant="body2">{(props.isUploading ? 'Cargando...' : 'Nueva Imagen')}</Typography>
                        </div>
                    </Button>
                </Tooltip>
            </GridListTile>
            {state.images.map((image: {file: any, name: string}) => (
                <Slide key={state.images.indexOf(image) + 1} direction="left" in={true} mountOnEnter unmountOnExit>
                    <GridListTile>
                        <img src={image.file} alt={`Imagen${state.images.indexOf(image)}`} />
                        <GridListTileBar
                            title={`Imagen ${state.images.indexOf(image) + 1}`}
                            className={classes.titleBar}
                            actionIcon={
                            <IconButton onClick={() => {
                                dispatch({type: 'alertDialogShow', isOpen: true, title: 'Eliminar imagen', body: 'Deseas eliminar esta imagen?', options: {one: {label: 'Cancelar', value: ''}, two: {label: 'Eliminar', value: state.images.indexOf(image)}}});
                            }} className={classes.delete_imagen_icon} aria-label={`eliminar foto`}>
                                <DeleteIcon />
                            </IconButton>
                            }
                        />
                    </GridListTile>
                </Slide>
            ))}
        </GridList>
    )
};

export default ImageSelector;