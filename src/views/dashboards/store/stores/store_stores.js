import React, { useEffect, useState } from 'react';
import StoresService from '../../../../services/stores/stores_service';
import { take } from 'rxjs/operators';
import '../stores/store_stores.css';
import {Link} from "react-router-dom";
import {FlipCard} from '../../../../components/components';
import {BaseView} from './../../../views';
import { useHistory } from "react-router-dom";

const redirectByHistory = (history, e) => {
    const location = {
        pathname: '/Tiendas/AgregarTienda'
    }
    history.push(location);
    e.preventDefault();
} 

const StoreStores = (props) => {
    const [stores, setStores] = useState([]);
    let history = useHistory();
    useEffect(() => {
        const feature_discover = document.getElementById("featureDiscover");
        const instance = window.M.TapTarget.init(feature_discover);
        const feature_discover_btn = document.getElementsByClassName('tap-target-origin')[0];
        // reemplazamos la funcion default del discover por que no es compatible con el router de react.
        feature_discover_btn.addEventListener('click', (e) => { redirectByHistory(history, e) });
        instance.open();
        setTimeout(() => {
            instance.close();
        }, 1500);
        StoresService.getStoresByIdStore().pipe(take(1)).subscribe({
            next(response) { 
                let stores = [];
                response.forEach((store) => {
                    console.log(store);
                    let front_card = <div> 
                        <span className="card-title" style={{borderBottom: 'solid'}}>{store.name}</span>
                        <div className="row">
                            <div className="col s6 m6" style={{textAlign: 'center'}}>
                                <span className="card-title z-depth-3" style={{fontSize: '1.3rem', borderRadius: '10px'}}>Verificada</span>
                                <p>{(store.verified) ? 'Verificada' : 'No verificada'}</p>
                            </div>
                            <div className="col s6 m6" style={{textAlign: 'center'}}>
                                <span className="card-title z-depth-3" style={{fontSize: '1.3rem', borderRadius: '10px'}}>Activa</span>
                                <p>{(store.active) ? 'Activa' : 'No activa'}</p>  
                            </div>
                        </div>
                    </div>;
                    let back_card =
                        <div className="card-content white-text">
                            <span className="card-title" style={{borderBottom: 'solid'}}>{store.name}</span>
                            <div className="row">
                                <div className="col s12 m12" style={{textAlign: 'center'}}>
                                    <span className="card-title z-depth-3" style={{fontSize: '1.3rem', borderRadius: '10px'}}>#Productos Ofrecidos</span>
                                    <p>{(store.verified) ? 'Verificada' : 'No verificada'}</p>
                                </div>
                                <div className="col s6 m6 my-1" style={{textAlign: 'center'}}>
                                    <span className="card-title z-depth-3" style={{fontSize: '1.3rem', borderRadius: '10px'}}>Agregada En</span>
                                    <p>{new Date(store.creationDate).toLocaleDateString()}</p>  
                                </div>
                                <div className="col s6 m6 my-1" style={{textAlign: 'center'}}>
                                    <span className="card-title z-depth-3" style={{fontSize: '1.3rem', borderRadius: '10px'}}>Reviews</span>
                                    <p>{(store.verified) ? '0.0' : '5.0'}</p>
                                </div>
                            </div>
                            <div className="card-action">
                                <Link to={{
                                    pathname: '/Tiendas/EditarTienda',
                                    state: {
                                        store_id: store._id
                                    }
                                }}>Editar Tienda</Link>
                                <Link to={{
                                    pathname: '/Tiendas/Productos',
                                    state: {
                                        store_id: store._id
                                    }
                                }}>Ver Productos</Link>
                            </div>
                        </div>;
                    stores.push(<FlipCard key={store._id} id={store._id} size="s12 m4" color="blue z-depth-4" front={front_card} back={back_card}/>);
                });
                setStores(stores);
            },
            error(err) { 
                console.error('(StoreStores)[getStoresByIdStore]something wrong occurred: ' + err);
                window.M.toast({html: 'Ocurrio un problema al cargar las tiendas, intenta mas tarde', classes: 'error-toast'});
            }
        });
        return () => {
            // Anything in here is fired on component unmount.
            console.log("UNMOUNT: StoreStores");
            feature_discover_btn.removeEventListener('click', (e) => { redirectByHistory(history, e) } );
        }
    }, []);
    return (
        <div>
            <BaseView title="Mis tiendas" content={
                <div>
                    <div className="row">
                        {stores}
                    </div>
                    <div className="fixed-action-btn">
                        <Link to={'/Tiendas/AgregarTienda'} id="btn_agregar_tienda" className="btn-floating tooltipped btn-large purple floating-button-margin">
                            <i className="large material-icons">add</i>
                        </Link>
                        <div id="featureDiscover" className="tap-target dark-primary-color text-primary-color" data-target="btn_agregar_tienda">
                            <div className="tap-target-content">
                            <h5>Agregar Tienda</h5>
                            <p>Haz click aqui para agregar una nueva tienda.</p>
                            </div>
                        </div>
                    </div> 
                </div>
            }/>
        </div>
    );
}

export default StoreStores;