import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OpenMeteoApiService {
    constructor(private request: HttpClient) {}

    public getWeatherByLongitudeLatitude(params?: object) {
        environment.httpOptions.params = new HttpParams();
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                if (value !== null && value !== undefined) environment.httpOptions.params = environment.httpOptions.params.append(key, value);
            }
        }

        return this.request.get('https://api.open-meteo.com/v1/forecast', environment.httpOptions).pipe(retry({ count: 1, delay: 1000 }));
    }
}