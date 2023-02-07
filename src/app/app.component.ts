import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { find, tap } from 'rxjs';
import { GeocodingApiService } from './shared/service/api/geocoding-api.service.ts/geocoding-api.service';
import { OpenMeteoApiService } from './shared/service/api/open-meteo/open-meteo-api.service';
import { Geolocation } from '@capacitor/geolocation';
import { Position } from '@capacitor/geolocation';
import { RapidApiService } from './shared/service/api/rapid-api/rapid-api.service';
import { ITabWeather } from './shared/interfaces/tab-weather.model';

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
    public imgAlea: number = Math.floor(Math.random() * (4 - 1)) + 1;
    public cityWeather: any

    public tabWeather: Array<ITabWeather[]> = []
    public tabDate = []
    public tabTime = []
    public tabTemp = []
    public lastSearch: any[] = []

    constructor(
        private openMeteoApiService: OpenMeteoApiService,
        private geocodingApiService: GeocodingApiService,
        private rapidApi: RapidApiService
    ) {}

    public ngOnInit(): void {
        const printCurrentPosition = async () => {
            const coordinates = await Geolocation.getCurrentPosition();
            this.controlCity.setValue(`${coordinates.coords.latitude}, ${coordinates.coords.longitude}`)
        };

        this.getCurrentLocation()

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
                        console.error(error);
                    })
                }
            }),
        ).subscribe()
    }

    public getWeather(value): void {
        this.openMeteoApiService.getWeatherByLongitudeLatitude({
            longitude: value.longitude,
            latitude: value.latitude,
            hourly: 'temperature_2m',
            current_weather: true
        })
        .pipe(
            tap((response: any) => {
                this.cityWeather = response
                this.tabTemp = JSON.parse(JSON.stringify(response)).hourly.temperature_2m
                this.tabTime = JSON.parse(JSON.stringify(response)).hourly.time

                this.constructTabWeather()
            })
        ).subscribe()
    }

    public constructTabWeather(): void {
        if (this.tabTime.length > 0){
            let referntDay: string = this.tabTime[0].replace(/T.*/, '')
            let tabDayTemp: ITabWeather[] = []

            for (let index = 0; index < this.tabTemp.length; index++) {
                let object = {
                    temperature: this.tabTemp[index],
                    time: this.tabTime[index]
                }
                if (this.tabTime[index].replace(/T.*/, '') !== referntDay) {
                    this.tabWeather.push(tabDayTemp)
                    this.tabDate.push(referntDay)
                    tabDayTemp = []
                    referntDay = this.tabTime[index].replace(/T.*/, '')
                }
                tabDayTemp.push(object)
            }
        }
    }

    public onChangeValueAutoComplete(value) : void {
        let city = null
        city = this.cities.find((item: any) => value.includes(item.name))
        this.getWeather(city)
    }

    public getCurrentLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: Position) => {
                if (position) {
                    const postion = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                    }
                    this.getWeather(postion)
                    this.getCityNameByLongitudeLatitude(postion)
                }
            },
                (error) => console.error(error));
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    public getCityNameByLongitudeLatitude(value): void {
        this.rapidApi.getCityNameByLongitudeLatitude({location: value.latitude + ',' + value.longitude}).pipe(
            tap((response: any) => {
                this.controlCity.setValue(response.results[0].locality)
                
                this.cityWeather = {
                    ...this.cityWeather,
                    address: response.results[0].address,
                    area: response.results[0].area,
                    region: response.results[0].region,
                }
            })
        ).subscribe()
    }
}