import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Region } from '../interfaces/region';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInfo: any;
  constructor(private  httpClient: HttpClient) { }

  loginUser(email: string , password : string): Observable<any>{
    this.userInfo = JSON.stringify({email,password})
    return this.httpClient.post<any>(environment.BACK_END_USER_LOGIN, this.userInfo );
  }
  registerUser(user: User){
    return this.httpClient.post(environment.BACK_END_USER_REGISTER, user);
  }

  checkUser(email : string): Observable<any>{
    this.userInfo = JSON.stringify({email})
    return this.httpClient.post<any>(environment.BACK_END_USER_CHECK, this.userInfo );
  }
  
}
