import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../enviroments/enviroment';
import * as CryptoJS from 'crypto-js'; 
@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  salt='i@am$utilityAid';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'response' as 'response'
  };
  constructor(private http:HttpClient) { }
  public sendobj :Subject<any>= new BehaviorSubject<any>(null);
  loggedInType$ : Observable<any> = this.sendobj.asObservable();
  
  public formDataObj : Subject<any> = new BehaviorSubject<any>(null);
  quoteFormObj$ : Observable<any> = this.formDataObj.asObservable()
  
  public sendData(email: any){
    // console.log("in servicee: " +email)
    this.sendobj.next(email);
    // this.send.next(islogin);
  }

  public quoteFormData(data: any){
    console.log("in servicee: " +data)
    this.formDataObj.next(data);
  }

  postdata(data:any){
    console.log("in service" ,data)
    return this.http.post<any>(`https://utility-aid.co.uk:3001/api/login`,data);
  }

  getPostcodeData(data:any){
    return this.http.post<any>(environment.baseUrl+`/api/getSupplyAddresses`,data);
  }

  getElectricPricesList(request :any) {
    return this.http.post(environment.baseUrl+`/api/getElectricPrices`, request)
  }

  getGasPricesList(request :any) {
    return this.http.post(environment.baseUrl+`/api/getGasPrices`, request)
  }

  encryptData(value: any): any {
    return CryptoJS.AES.encrypt(value, this.salt).toString();
   }

   decryptData(value: any){
    return CryptoJS.AES.decrypt(value, this.salt).toString(CryptoJS.enc.Utf8);
  }

  getSuppliers() {
    return this.http.get(environment.baseUrl + "/api/suppliers");
  }


}

  
  



