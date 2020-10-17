import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class CityService {
    private url = environment.SERVICE_BASE + "/city/";

    constructor(private http: HttpClient) { }

    getAllCity(formvalue?) {
        return this.http.get(this.url, { params: formvalue });
    }

    delete(id) {
        return this.http.delete(this.url + "/" + id);
    }

    addRow(cityValue) {
        return this.http.post(this.url, cityValue);
    }

    updateRow(id, cityValue) {
        return this.http.patch(this.url + "/" + id, cityValue);
    }
}