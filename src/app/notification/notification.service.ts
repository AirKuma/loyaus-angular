import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API_ROOT } from '../../app/app-config';

@Injectable()
export class NotificationService {
  auth_token:any;

  constructor(public http: Http) { 
      this.auth_token = localStorage.getItem('token');
  }

  LoadNotificationData(limit:number, offset:number){
    let url = API_ROOT+"notifications?limit="+ limit +"&offset="+ offset;
    console.log(this.authHeader);
    return this.http.get(url,{
         headers: this.authHeader
    })
    .toPromise()
    .then((res : Response) => res.json())
    .catch(this.handleError);
  }

  public postReadNotification(){
    let link = API_ROOT+"notifications/me/count";
    return this.http.post(link , null,
    {
      headers: this.authHeader
    })
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  public getReadNotification(){
    let url = API_ROOT+"notifications/me/count";
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
