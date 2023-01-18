import { HttpHeaders, HttpParams } from '@angular/common/http';

export const environment = {
    production: true,
    httpOptions: {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        params: new HttpParams()
    },
};
