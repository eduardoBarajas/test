import React from 'react';
import './product_details.css';
import {useSpring, animated} from 'react-spring';
import {ProductReview, QuantitySelector} from '../../components';

const ProductDetails = () => {
    const props = useSpring({opacity: 1, from: {opacity: 0}});
	/*const props = useSpring({
        from: { left: '0%', top: '0%', width: '0%', height: '0%', background: 'lightgreen' },
        to: async next => {
          while (1) {
            await next({ left: '0%', top: '0%', width: '100%', height: '100%', background: 'lightblue' })
            await next({ height: '50%', background: 'lightgreen' })
            await next({ width: '50%', left: '50%', background: 'lightgoldenrodyellow' })
            await next({ top: '0%', height: '100%', background: 'lightpink' })
            await next({ top: '50%', height: '50%', background: 'lightsalmon' })
            await next({ width: '100%', left: '0%', background: 'lightcoral' })
            await next({ width: '50%', background: 'lightseagreen' })
            await next({ top: '0%', height: '100%', background: 'lightskyblue' })
            await next({ width: '100%', background: 'lightslategrey' })
          }
        },
      })
    */
    return (
        <div className="product-details-container prodcut-details-parent-div">
            <animated.div className="product-details-container overlay" style={props}>
                <div className="row product-details-content mb-0">
                    <div className="col s12 offset-m2 m8 no-padding">
                        <div className="card grey lighten-5 no-margin">
                            <div className="card-content white-text no-padding">
                                <div className="row mb-0 mx-0">
                                    <div className="col s12 m4 no-padding">
                                        <img className="product_image_details responsive-img" src="https://www.educaciontrespuntocero.com/wp-content/uploads/2019/06/homer.gif"/>
                                        <div className="product_name_details">
                                            <span className="card-title primary-text-color">Card Title</span>
                                            <div className="row quantity_selector_container">
                                                <QuantitySelector precio_individual={60.00} descuento_individual={100.00} />
                                            </div>
                                            <div className="row">
                                                <a className="w-100 waves-effect waves-light purple darken-1 btn"><i className="material-icons right">add_shopping_cart</i>Agregar al carrito</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col s12 m8">
                                        <div className="row mx-1 my-1">
                                            <p className="primary-text-color">I am a very simple card. I am good at containing small bits of information.
                                            I am convenient because I require little markup to use effectively.</p>
                                        </div>
                                        <div className="row white-text green-background z-depth-2 reviews_container mx-1 my-1">
                                            <div className="product_review_content">
                                                <h5>Resenias del producto</h5>
                                                <span>
                                                    <i className="material-icons">star</i>
                                                    <i className="material-icons">star</i>
                                                    <i className="material-icons">star</i>
                                                    <i className="material-icons">star</i>
                                                    <i className="material-icons">star</i>
                                                    <span>Based on 22 reviews</span>
                                                </span>
                                                <hr className="hr-no-margin"/>
                                            </div>
                                            <div className="content primary-text-color">
                                                <ProductReview/>
                                                <ProductReview/>
                                                <ProductReview/>
                                                <ProductReview/>
                                                <ProductReview/>
                                                <ProductReview/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </animated.div>
        </div>
        
    );
}

export default ProductDetails;