import { Observable } from 'rxjs';
import axios from 'axios';
const API = 'http://api.positionstack.com/v1/';
const ACCESS_KEY = '5a975ee81985652612fc0e71ec038034';

class MapService {
    
    constructor () {

    }

    getAddressFromCoord(lat, lng) {
        return new Observable(subscriber => {
            axios.get(`${API}reverse?access_key=${ACCESS_KEY}&query=${lat},${lng}`)
            .then(function (response) {
                console.log(response);
                subscriber.next(response.data);
            })
            .catch(function (error) {
                subscriber.error(error);
            }).finally(() => {
                subscriber.complete();
            });
        });
    }

    getCoordFromAddress(address) {
        return new Observable(subscriber => {
            axios.get(`${API}forward?access_key=${ACCESS_KEY}&query=${address},Ensenada&country=MX&region=Baja+California`)
            .then(function (response) {
                console.log(response);
                subscriber.next(response.data);
            })
            .catch(function (error) {
                subscriber.error(error);
            }).finally(() => {
                subscriber.complete();
            });
        });
    }

}

export default new MapService();
  