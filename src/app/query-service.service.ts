import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class QueryServiceService {

  constructor(
    private http: HttpClient // Inject httpClient
  ) { }

  // Post Request path , header <option>, data <option>
  postReq(path: string,header ?, data ?): Observable<any> {
    return this.http.post(path,header,data);
  }

  // Get Request path , header <option>
  getReq(path: string, header ?): Observable<any> {
    return this.http.get(path, header);
  }

  // Put Request path , header <option>, data <option>
  putReq(path: string, header ?, data ?): Observable<any> {
    return this.http.put(path, header, data);
  }

   // Delete Request path , header <option>, data <option>
   deleteReq(path: string, data ?): Observable<any> {
    return this.http.delete(path, data);
  }

}
