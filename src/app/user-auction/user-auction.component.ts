import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { UserAuctionService }    from './user-auction.service';

@Component({
  selector: 'app-user-auction',
  templateUrl: './user-auction.component.html',
  styleUrls: ['./user-auction.component.css']
})
export class UserAuctionComponent implements OnInit {
  public myitem:any;

  constructor(private titleService: Title, private userAuctionService : UserAuctionService) { 
       setTimeout(() => {
           this.titleService.setTitle("Loyaus 我的項目");
      });
  }

  ngOnInit() {
    this.loadMyItemCountDatas();
  }

  loadMyItemCountDatas(){
    this.userAuctionService.LoadMyItemCountData()
      .then(res => {
          this.myitem = res;
          console.log(this.myitem );
          console.log(this.myitem[0]);
      }, err => console.log('hey, error' + err),
      )
  }

}
