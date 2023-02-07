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
        environment.httpOptions.params = new HttpParams();
        Object.assign(environment.httpOptions, {
            headers: null
        })
        
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




