import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GeocodingApiService {
    constructor(private request: HttpClient) {}

    public getListCity(params?: string) {
        // environment.httpOptions.params = new HttpParams();
        // if (params) {
        //     for (const [key, value] of Object.entries(params)) {
        //         if (value !== null && value !== undefined) environment.httpOptions.params = environment.httpOptions.params.append(key, value);
        //     }
        // }

        // return this.request.get('https://geocoding-api.open-meteo.com/v1/search', environment.httpOptions).pipe(retry({ count: 1, delay: 1000 }));

        return new Promise((resolve, reject) => { 
            fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${params}`)
            .then((response) => {
                return resolve(response.json());
            })
            .catch((error) => {
                return reject(error);
            })
        });
    }
}




