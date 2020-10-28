export interface IStore {
    _id: string;
    name: string;
    active: boolean;
    description: string;
    creationDate: string;
    images: string[];
    logoImage: string;
    address: string;
    addressCoord: {latitude: number, longitude: number};
    email: string;
    phones: {local: '', cellphone: ''};
    verified: boolean;
    storeType: string;   
}

class Store {
    private _id: string;
    private name: string;
    private active: boolean;
    private description: string;
    private creationDate: string;
    private images: string[];
    private logoImage: string;
    private address: string;
    private addressCoord: {latitude: number, longitude: number};
    private email: string;
    private phones: {local: '', cellphone: ''};
    private verified: boolean;
    private storeType: string;

    constructor(init_params: IStore) {
       this._id = (init_params._id != null) ? init_params._id : '';
       this.name = (init_params.name != null) ? init_params.name : '';
       this.active = (init_params.active != null) ? init_params.active : false;
       this.description = (init_params.description != null) ? init_params.description : '';
       this.creationDate = (init_params.creationDate != null) ? init_params.creationDate : '';
       this.images = (init_params.images != null) ? init_params.images : [];
       this.logoImage = (init_params.logoImage != null) ? init_params.logoImage : '';
       this.address = (init_params.address != null) ? init_params.address : '';
       this.addressCoord = (init_params.addressCoord != null) ? init_params.addressCoord : {latitude: 0, longitude: 0};
       this.email = (init_params.email != null) ? init_params.email : '';
       this.phones = (init_params.phones != null) ? init_params.phones : {local: '', cellphone: ''};
       this.verified = (init_params.verified != null) ? init_params.verified : false;
       this.storeType = (init_params.storeType != null) ? init_params.storeType : '';
    }

    get getId(): string {
        return this._id;
    }

    get getName(): string {
        return this.name;
    }

    get getVerified(): boolean {
        return this.verified;
    }

    get getCreationDate(): string {
        return this.creationDate;
    }

    get getActive(): boolean {
        return this.active;
    }

    get getLogo(): string {
        return this.logoImage;
    }
}

export default Store;