import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API_ROOT } from '../../app/app-config';


@Injectable()
export class MessageService {
  auth_token:any;

  constructor(public http: Http) {
      this.auth_token = localStorage.getItem('token');
   }

   public LoadThreadsData(limit:number, offset:number){

    let url = API_ROOT+"threads?limit="+ limit +"&offset="+ offset;
    console.log(url);
    return this.http.get(url,
    {
        headers: this.authHeader
    })
    .toPromise()
    .then((res : Response) => res.json())
    .catch(this.handleError);
  }

   public getIfThread(id){

    let url = API_ROOT+"ifthread/"+id;
    console.log(url);
    return this.http.get(url,
    {
        headers: this.authHeader
    })
    .toPromise()
    .then((res : Response) => res.json())
    .catch(this.handleError);
  }

  public postCreateThread(id){
    let link = API_ROOT+"threads/"+id;
    return this.http.post(link , null,
    {
        headers: this.authHeader
    })
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  public LoadMessageData(limit:number, offset:number, id){

    let url = API_ROOT+"messages/"+ id +"?limit="+ limit +"&offset="+ offset;
    console.log(url);
    return this.http.get(url,
    {
        headers: this.authHeader
    })
    .toPromise()
    .then((res : Response) => res.json())
    .catch(this.handleError);
  }

  public postCreateMessage(body,id){
    
    let body_js = JSON.stringify({body: body });
    let link = API_ROOT+"messages?id="+id;

    return this.http.post(link , body_js,
    {
        headers: this.authHeader
    })
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  public postThreadRead(id){
    
    let link = API_ROOT+"threads/"+id+"/read";

    return this.http.post(link , null,
    {
        headers: this.authHeader
    })
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  public postReadMessage(){
    let link = API_ROOT+"messages/me/count";
    return this.http.post(link , null,
    {
      headers: this.authHeader
    })
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
 }

  public getReadMessage(){
    let url = API_ROOT+"messages/me/count";
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
