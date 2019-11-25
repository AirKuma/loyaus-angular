import { Component, OnInit } from '@angular/core';
import { AuctionService }    from '../auction.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Title }     from '@angular/platform-browser';

@Component({
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  public categoryatas = [];
  public type:string;
  public college:any;
  public category:any;
  title:string;
  public categorycount:any;

  constructor(private auctionservice : AuctionService, private route: ActivatedRoute, private router: Router, private titleService: Title) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.type = params['type'];
       this.college = params['college'];
       //this.category = params['category'];
      // console.log(this.category);
      if(this.type=='bid')
        this.title = "拍賣";
      else
        this.title = "競投";
      
      setTimeout(() => {
          this.titleService.setTitle("Loyaus "+this.title);
       });
       
       console.log(this.college);
       this.loadCategoryDatas();
       this.loadCategoryCountDatas();
       console.log("MYYYYLLLLL");
    });
  }

  loadCategoryDatas(){
    this.auctionservice.LoadItemCategoryData(this.type)
      .then(res => {
          this.categoryatas = res.data;
          console.log(this.categoryatas);
      }, err => console.log('error' + err)
    )
  }

  loadCategoryCountDatas(){
    console.log("MYYYY");
    this.auctionservice.LoadItemCategoryCount(this.type,this.college)
      .then(res => {
          this.categorycount = res;
          console.log(res);
      }, err => console.log('error' + err)
    )
  }

  // searchCollege(acronym,college){
  //   console.log(college);
  //   // if(this.category)
  //   //     this.router.navigate(['/'+acronym+'/auction/'+this.type+'/'+this.category]);
  //   // else
  //   this.router.navigate(['/'+acronym+'/auction/'+this.type]);
  //    //this.college = college;
  // }

  searchCollege(event){
    console.log(event);
     console.log(123);
     this.router.navigate(['/'+event+'/auction/'+this.type]);
     //this.router.navigate(['/'+acronym+'/auction/'+this.type]);
  }

  gocategory(category){
    if(category!='')
      this.router.navigate(['/'+this.college+'/auction/'+this.type+'/'+category, { page: 1}]);

    this.loadCategoryCountDatas();
  }


}
