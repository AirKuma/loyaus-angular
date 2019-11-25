import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API_ROOT } from '../../app/app-config';

@Injectable()
export class ActivateService {
  auth_token:any;

  constructor(public http: Http) {
       this.auth_token = localStorage.getItem('token');
   }

   public postActivateEmail(email){
      let activate_email = JSON.stringify({email: email });
      return this.http.post(API_ROOT + "activate/send",activate_email,
      {
          headers: this.authHeader
      })
      .toPromise()
      .then(res => {
          //console.log(res);
          return res;
      })
      .catch(this.handleError);
  }

  activateAccount(code){

    let url = API_ROOT+"activate/"+ code;
    console.log(url);
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
