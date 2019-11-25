import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { API_ROOT } from '../../app/app-config';

@Injectable()
export class AuctionService {
auth_token:any;

  constructor(public http: Http) {
      this.auth_token = localStorage.getItem('token');
   }

   LoadItemData(type:string, college:string, category:string, limit:any, offset:any, fields:any){

    let url = API_ROOT+"items?type="+ type +"&college="+ college +"&category="+ category +"&limit="+ limit +"&offset="+ offset +"&fields=" +fields;
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

  LoadHomeItemData(){

    let url = API_ROOT+"homeitems";
    console.log(url);
    return this.http.get(url)
    .toPromise()
    .then((res : Response) => res.json())
    .catch(this.handleError);
  }

   LoadItemCategoryData(type:string){
    let url = API_ROOT+"items/" + type + "/categories";
    return this.http.get(url)
        .toPromise()
        .then((res : Response) => res.json())
        .catch(this.handleError);
  }

  LoadDetail(id:number){
    let url = API_ROOT+"items/"+id;
    console.log(this.authHeader);
    return this.http.get(url,
    {
         headers: this.authHeader
    })
    .toPromise()
    .then((res : Response) => res.json())
    .catch(this.handleError);
  }

  public postItem(data, type:string){
    let link = API_ROOT+"webitems?Itemtype="+ type;
    return this.http.post(link , data,
    {
        headers: this.authHeader
    })
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  LoadItemCommentData(id:number, limit:any, offset:any){
    let url = API_ROOT+"items/"+ id + "/comment?limit="+ limit +"&offset="+ offset;
    console.log(url);
    return this.http.get(url)
        .toPromise()
        .then((res : Response) => res.json())
        .catch(this.handleError);
  }

  LoadItemBidData(id:number, limit:any, offset:any){
    let url = API_ROOT+"items/"+ id + "/bid?limit="+ limit +"&offset="+ offset;
    console.log(url);
    return this.http.get(url)
        .toPromise()
        .then((res : Response) => res.json())
        .catch(this.handleError);
  }

  LoadItemImageData(id:number){
    let url = API_ROOT+"items/"+ id + "/image";
    console.log(url);
    return this.http.get(url)
        .toPromise()
        .then((res : Response) => res.json())
        .catch(this.handleError);
  }

  LoadMyItemData(type, limit:any, offset:any){

    let url = API_ROOT+"me/adminItems?limit="+ limit +"&offset="+ offset+"&type="+type;
    console.log(url);
    return this.http.get(url,
    {
         headers: this.authHeader
    })
    .toPromise()
    .then((res : Response) => res.json())
    .catch(this.handleError);
  }

  public postBid(price,id:number){
      
      let price_js = JSON.stringify({price: price });

      return this.http.post(API_ROOT + "items/"+ id +"/bid", price_js,
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

  public postFree(id:number){

      return this.http.post(API_ROOT + "items/"+ id +"/free", null ,
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
      console.log(this.authHeader);

      return this.http.post(API_ROOT + "items/"+ id +"/report", report_js ,
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

  public postRepost(id:number){

      return this.http.post(API_ROOT + "items/"+ id +"/repost",null,
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

  public destroyItem(id:number){
      return this.http.delete(API_ROOT + "items/"+ id,
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

  public destroyItemImage(id:number,type:string,publicid:number){
      return this.http.delete(API_ROOT + "items/image/"+ id +"?auction=" +type+"&publicid="+publicid,
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

  public putEditItem(data, id){

      console.log(API_ROOT + "items/" +id);
      return this.http.put(API_ROOT + "items/" +id ,data,
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

  public postItemImage(data,itemid){
    let link = API_ROOT+"items/image?itemid="+itemid;
    return this.http.post(link , data,
    {
        headers: this.authHeader
    })
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  public postfavor(id:number){

      return this.http.post(API_ROOT + "items/"+ id +"/favor", null ,
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

  public getIffavor(id:number){

      return this.http.get(API_ROOT + "items/"+ id +"/iffavor" ,
      {
          headers: this.authHeader
      })
      .toPromise()
      .then((res : Response) => res.json())
      .catch(this.handleError);
  }

  LoadItemCategoryCount(type:string, college:string){

    let url = API_ROOT+"items/category/count?type="+ type +"&college="+ college;
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
