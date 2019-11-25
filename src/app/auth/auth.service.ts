import { Injectable } from '@angular/core';
import { Http, Response, Headers} from '@angular/http';
import { API_ROOT } from '../../app/app-config';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";


@Injectable()
export class AuthService {
  client_id:string = "gsaddfdsfassgg322431";
  client_secret:string = "sfdsgfd423tergfdgfadg";
  auth_token:{ header_name : string, header_value: string} = {header_name: '', header_value: ''};

  constructor(public http: Http) { }

  get tokenUrl() {
      return API_ROOT + "oauth/access_token";
  }

  public getAuthToken(username, password) {
        
        let creds = `username=${username}` +
            `&password=${password}` +
            `&grant_type=password` +
            `&client_id=${this.client_id}` +
            `&client_secret=${this.client_secret}`;
        console.log(creds);
        let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        
        var $obs = this.http.post(this.tokenUrl, creds, {
                headers: header
            })
            .map(res => this.getToken(res));
            
          $obs.subscribe(
                data => {
                    //this.setTokenHeader(data)
                },
                err => {
                    console.log('Error')
                },
                () => console.log('Finish Auth'));
          return $obs;    
    }

    private getToken(res) {
        console.log(res);
        return res.json().access_token;
    }

    public setTokenHeader(token) {
        if (token) {
            console.log(token); 
             window.localStorage.setItem('token', token);  
            this.auth_token.header_name = "Authorization";
            this.auth_token.header_value = "Bearer " + token;

           return token
            //.then(res => res.json());
        }
    }

    public postRegister(data){
        let link = API_ROOT+"users";
        return this.http.post(link , data)
            .toPromise()
            .then(res => res.json())
    }

    public LoadMajorData(){
        let url = API_ROOT+"majors";
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then((res : Response) => res.json())
    }
    

    isLogin(){
        //console.log("I am bear777");
        if(localStorage.getItem('token'))
            return true
        else
            return false
    }

    public isEmailUnique(email){
        let url = API_ROOT+"users/"+email+"/ifemailunique";
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then((res : Response) => res.json())
    }

}
