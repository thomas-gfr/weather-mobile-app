import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RapidApiService {
    constructor(private request: HttpClient) {}

    public getCityNameByLongitudeLatitude(params?: object) {
        environment.httpOptions.params = new HttpParams();
        Object.assign(environment.httpOptions, {
            headers: {
                'X-RapidAPI-Key': '448cb95b10msh81fa15a9e16ecd7p1fa178jsn2b59d7903f1a',
                'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
            }
        })
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                if (value !== null && value !== undefined) environment.httpOptions.params = environment.httpOptions.params.append(key, value);
            }
        }

        return this.request.get('https://trueway-geocoding.p.rapidapi.com/ReverseGeocode', environment.httpOptions);
    }
}