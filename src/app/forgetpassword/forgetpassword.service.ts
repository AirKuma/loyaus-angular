import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API_ROOT } from '../../app/app-config';

@Injectable()
export class ForgetpasswordService {

  constructor(public http: Http) { }

//   getCsrf_token(){
//     let url = API_ROOT+"csrftokens";
//     console.log(url);
//     return this.http.get(url)
//         .toPromise()
//         //.then(res => res.json())
//         .catch(this.handleError);
//   }

  public postSendEmail(email){

      let url = API_ROOT + "sendemail";
      console.log(url);

      return this.http.post(url, email)
      .toPromise()
      .then(res => {
          console.log(res);
          return res.json();
      })
      .catch(this.handleError);
  }

  public postResetPassword(data,token){

      let url = API_ROOT + "resetpassword?token="+token;
      console.log(url);

      return this.http.post(url, data)
      .toPromise()
      .then(res => {
          console.log(res);
          return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

}
