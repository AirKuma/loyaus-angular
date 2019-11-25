import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API_ROOT } from '../../app/app-config';

@Injectable()
export class CommentService {
  auth_token:any;

  constructor(public http: Http) { 
    this.auth_token = localStorage.getItem('token');
  }

  public postComment(content,id:number){
       let content_js = JSON.stringify({content: content });

        return this.http.post(API_ROOT + "items/"+ id +"/comment", content_js,
        {
            headers: this.authHeader
        })
        .toPromise()
        .then(res => {
            console.log(res);
            return res.json();
        })
        .catch(this.handleError);
  }

  public postReport(content,id:number){

      let report_js = JSON.stringify({content: content });

      return this.http.post(API_ROOT + "comments/"+ id +"/report", report_js ,
      {
          headers: this.authHeader
      })
      .toPromise()
      .then(res => {
          console.log(res);
          return res.json();
      })
      .catch(this.handleError);
  }

  public destroyComment(id:number){
      return this.http.delete(API_ROOT + "comments/"+ id,
      {
          headers: this.authHeader
      })
      .toPromise()
      .then(res => {
          console.log(res);
          return res.json();
      })
      .catch(this.handleError);
  }

  public putUpdateComment(content,id:number){
      let content_js = JSON.stringify({content: content });
      return this.http.put(API_ROOT + "comments/"+id,content_js,
      {
          headers: this.authHeader
      })
      .toPromise()
      .then(res => {
          return res.json();
      })
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
