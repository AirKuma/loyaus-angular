import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API_ROOT } from '../../app/app-config';

@Injectable()
export class UserService {
auth_token:any;

  constructor(public http: Http) {
     this.auth_token = localStorage.getItem('token');
     console.log(this.auth_token);
   }

   loadUserData(){
    let url = API_ROOT+"me";
    console.log(url);
    console.log(this.authHeader);
    return this.http.get(url,
    {
         headers: this.authHeader
    })
    .toPromise()
    .then((res : Response) => res.json())
    .catch(this.handleError);
  }

  public postEditProfile(data){

      return this.http.put(API_ROOT + "me",data,
      {
          headers: this.authHeader
      })
      .toPromise()
      .then(res => {
          return res.json();
      })
      .catch(this.handleError);

  }

  public postEditPassword(data){

      return this.http.put(API_ROOT + "me/password",data,
      {
          headers: this.authHeader
      })
      .toPromise()
      .then(res => {
          return res.json();
      })
      .catch(this.handleError);

  }

  LoadUserContactData(id:number)
  {
    let url = API_ROOT+"users/"+ id;
    console.log(url);
    return this.http.get(url)
    .toPromise()
    .then((res : Response) => res.json())
    .catch(this.handleError);
  }

  public isUsernameUnique(username){
        let url = API_ROOT+"me/"+username+"/ifusernameunique";
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then((res : Response) => res.json())
  }

  public checkCurrentPawword(password){
    let url = API_ROOT+"me/password?old_password="+password;
    return this.http.get(url,
    {
         headers: this.authHeader
    })
    .toPromise()
    .then((res : Response) => res.json())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

  private get authHeader() {
      var headers:any = new Headers();
      headers.append('Content-Type', 'application/json');     
      headers.append('Authorization', 'Bearer ' + this.auth_token);
      return headers;
  }

}
