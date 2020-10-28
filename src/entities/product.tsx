export interface IProduct {
    _id: string;
    name: string;
    unitPrice: number;
    available: boolean;
    description: string;
    store_id: string;
    creationDate: string;
    mainImage: string;
    images: string[];
    product_type: string;
}


class Product {
    private _id: string;
    private name: string;
    private unitPrice: number;
    private available: boolean;
    private description: string;
    private store_id: string;
    private creationDate: string;
    private mainImage: string;
    private images: string[];
    private product_type: string;

    constructor(init_params: IProduct) {
        this._id = (init_params._id != null) ? init_params._id : '';
        this.unitPrice = (init_params.unitPrice != null) ? init_params.unitPrice : 0.0;
        this.available = (init_params.available != null) ? init_params.available : false;
        this.description = (init_params.description != null) ? init_params.description : '';
        this.name = (init_params.name != null) ? init_params.name : '';
        this.store_id = (init_params.store_id != null) ? init_params.store_id : '';
        this.creationDate = (init_params.creationDate != null) ? init_params.creationDate : '';
        this.mainImage = (init_params.mainImage != null) ? init_params.mainImage : '';
        this.images = (init_params.images != null) ? init_params.images : []; 
        this.product_type = (init_params.product_type != null) ? init_params.product_type : '';
    }

    get id(): string {
        return this._id;
    }
}

export default Product;