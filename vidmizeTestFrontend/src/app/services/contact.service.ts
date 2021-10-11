import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../interfaces/contact';
import { Region } from '../interfaces/region';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  userInfo: any;

  constructor( private route: ActivatedRoute ,private  httpClient: HttpClient) { }

  getAllRegions(): Observable<any>{
    return this.httpClient.get<any[]>(environment.API_GEO_FRANCE);
  }

  addContact(contact:Contact){
    let body = JSON.stringify(contact) 
    console.log(body)
    return this.httpClient.post(environment.BACK_END_CONTACTS, body);
  }

  getAllcontactsByUser(email): Observable<any>{
      this.userInfo = JSON.stringify({email})
      return this.httpClient.post<any>(environment.BACK_END_CONTACTS_USER, this.userInfo );
    }

  deleteContact(id){
    return this.httpClient.delete(environment.BACK_END_CONTACTS + "/" + id);
  }
}
