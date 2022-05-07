import { Injectable } from '@angular/core';
import { HttpClient ,  } from '@angular/common/http';
import { Observable} from "rxjs";
import { Data } from '../interfaces/data';


@Injectable({
  providedIn: 'root'
})
export class InsertDataService {
  private insertUrl = 'http://localhost:3456/tabla';

  constructor(private http: HttpClient) { }
  getRecord(): Observable<Data[]> {
    return this.http.get<Data[]>(this.insertUrl)
  }
  addRecord(data: Data): Observable<Data[]> {
    const send = {
      fields: data.fields,
      registerData : data.registerData
    };  
    return this.http.post<Data[]>(this.insertUrl, send);
  }
}

