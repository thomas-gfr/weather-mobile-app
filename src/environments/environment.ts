import { HttpParams } from '@angular/common/http';

export const environment = {
    production: false,
    BASE_API: '/api', // les urls sont déjà basé sur le proxy.conf inutile de mettre l'url complet.
    httpOptions: {
        params: new HttpParams()
    },
};
