import React from 'react';
import {Link} from "react-router-dom";
import './product_card.css';

const CARD_COLORS = ['blue', 'orange', 'dark', 'purple', 'green'];

const ProductCard = (props) => {
    let images_component = null, card_title = null, card_action = null, card_reveal = null;
    if (props.images != null) {
        if (props.images.length > 1) {
            // agregar el carrousel aqui.
        } else {
            // si solo hay una imagen entonces se agrega solo esa.
            images_component = <img className="activator img-card" src={props.images[0]}/>;
        }
    }
    if (props.title != null) 
        card_title = props.title;
    if (props.see_more_url != null)
        card_action = <div className="card-action"><Link to={props.see_more_url}>Ver Mas</Link></div>;
    if (props.card_reveal != null) 
        card_reveal = <div className="card-reveal"><span className="card-title grey-text text-darken-4">{card_title}<i className="material-icons right">close</i></span>{props.card_reveal}</div>;
    
    /*
        <div className="card small z-depth-2">
            <div className="card-image waves-effect waves-block waves-light">
                {images_component}
            </div>
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                    {card_title}
                    <i className="material-icons right">more_vert</i>
                </span>
                {card_action}
            </div>
            {card_reveal}
        </div>

    */





    /*
        <div class='product_div'>
            <div className={`product--${card_color}`}>
                <div class='product_inner'>
                    <img src='http://www.pngall.com/wp-content/uploads/5/Serving-Food-PNG-Image-HD.png' width='290'/>
                    
                    <a class="btn-floating fab-product-card waves-effect waves-light red"><i class="material-icons">local_grocery_store</i></a>
                    <span>
                        <p>Nike Air (Women)</p>
                        <p>Size 7</p>
                        <p>Price £199.99</p>
                    </span>
                    
                    
                </div>
                <div class='product_overlay'>
                    <h2>Añadir al carrito</h2>
                    <i className="material-icons">cart</i>
                </div>
            </div>
        </div>
    */

    let card_color = CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length + 1)];
    if (card_color == null) card_color = 'blue';
    return (

        <div className="card z-depth-2">
            <div className="card-content product_div">
                <div className={`product--${card_color}`}>
                    <div class='product_inner'>
                        <img className="product-content-image" src='http://www.pngall.com/wp-content/uploads/5/Serving-Food-PNG-Image-HD.png'/>
                    </div>
                    <div className="product_info">
                        <a class="btn-floating btn-small fab-product-card waves-effect waves-light red"><i class="material-icons">local_grocery_store</i></a>
                        <span className="product-content-info">
                            <p>Nike Air (Women)</p>
                            <p>Size 7</p>
                            <p>Price £199.99</p>
                        </span>
                    </div>
                    <div class='product_overlay'>
                        <h2>Añadir al carrito</h2>
                        <i className="material-icons">cart</i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;