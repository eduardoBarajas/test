export interface IReview {
    _id: string;
    idUser: string;
    flaggedCount: number;
    title: string;
    review: string;
    creationDate: string;
    rate: number;
}

class Review {
    private _id: string;
    private idUser: string;
    private flaggedCount: number;
    private title: string;
    private review: string;
    private creationDate: string;
    private rate: number;

    constructor(init_params: IReview) {
        this._id = (init_params._id != null) ? init_params._id : '';
        this.idUser = (init_params.idUser != null) ? init_params.idUser : '';
        this.flaggedCount = (init_params.flaggedCount != null) ? init_params.flaggedCount : 0;
        this.title = (init_params.title != null) ? init_params.title : '';
        this.review = (init_params.review != null) ? init_params.review : '';
        this.creationDate = (init_params.creationDate != null) ? init_params.creationDate : '';
        this.rate = (init_params.rate != null) ? init_params.rate : 0;
    }
}

export default Review;