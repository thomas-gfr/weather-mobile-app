import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, map, tap } from 'rxjs';
import { GeocodingApiService } from './shared/service/api/geocoding-api.service.ts/geocoding-api.service';
import { OpenMeteoApiService } from './shared/service/api/open-meteo/open-meteo-api.service';

import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public title = 'mobile-app';
    public controlCity: FormControl = new FormControl('');
    public cityOptions: string[] = [];
    public cities: [] = [];

    public cityWeather: any

    constructor(
        private openMeteoApiService: OpenMeteoApiService,
        private geocodingApiService: GeocodingApiService
    ) {}

    public ngOnInit(): void {
        
        const printCurrentPosition = async () => {
            const coordinates = await Geolocation.getCurrentPosition();
            this.controlCity.setValue(`${coordinates.coords.latitude}, ${coordinates.coords.longitude}`)
        };

        console.log(printCurrentPosition)
        this.controlCity.valueChanges.pipe(
            tap((value) => {
                if (value.length > 1) {
                    this.geocodingApiService.getListCity(value).then((response: any) => {
                        if (response.results){
                            this.cities = response.results
                            this.cityOptions = response.results.map((item: any) => {
                                item.displayedLabel = `${item.name} (${item.country})`
                                return item.displayedLabel
                            });
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                }
            }),
        ).subscribe()
    }

    public getWeather(value): void {
        let city = null
        city = this.cities.find((item: any) => value.includes(item.name))
        this.openMeteoApiService.getWeatherByLongitudeLatitude({
            longitude: city.longitude,
            latitude: city.latitude,
            hourly: 'temperature_2m',
            current_weather: true
        })
        .subscribe((response) => {
            this.cityWeather = response
        })
    }

    
}