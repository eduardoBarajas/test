import React, {Component} from 'react';
import './product_review.css';

class ProductReview extends React.Component {
	constructor(props) {
        super(props);
	}

    componentDidMount() {
    }

	render() {
        
        return (
            <div className="white_background">
                <div className="product_review_content">
                    <span>
                        <i className="material-icons">star</i>
                        <i className="material-icons">star</i>
                        <i className="material-icons">star</i>
                        <i className="material-icons">star</i>
                        <i className="material-icons">star</i>
                    </span>
                    <h5 className="product_review_title">
                        Testing a review
                    </h5>
                    <span className="product_review_creator">
                        <strong>
                            tester
                        </strong>
                        <strong>
                            Aug 19, 2020
                        </strong>
                    </span>
                    <p className="product_review_content">
                        lorepseum asdoasdkoasd
                    </p>
                </div>
                <hr className="w-90 margin-center hr-no-margin"/>
            </div>
        );
	}
}
export default ProductReview;