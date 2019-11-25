import { Component, OnInit } from '@angular/core';
import { AuctionService }    from '../../auction/auction.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Title }     from '@angular/platform-browser';
import { PagerService } from '../../common/pager.service';
import { Location } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-user-auction-list',
  templateUrl: './user-auction-list.component.html',
  styleUrls: ['./user-auction-list.component.css']
})
export class UserAuctionListComponent implements OnInit {
  public type:string;
  public itemdatas:any;
  public start:number=0;
  public limit:any=12;
  public date:any;
  public now:any;

  pager: any = {};
  pagedItems: any[];
  pagerlimit:number = 10;
  thispage:any;

  constructor(private location: Location, private auctionservice : AuctionService, private route: ActivatedRoute, private datepipe: DatePipe, private router: Router, private titleService: Title, private pagerService: PagerService) { 
      // setTimeout(() => {
      //      this.titleService.setTitle("Loyaus 我的項目");
      // });
  }

  ngAfterViewChecked() {
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');

        $this.countdown(finalDate, function(event) {
          $this.html(event.strftime('%D 天 %H 時 %M 分 %S 秒'));
        });
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.type = params['type'];
       this.thispage = params['page'];

       //check url
       if(this.type!='bid' && this.type!='seek')
          this.router.navigate(['/auction/bid/admin']);

       this.loadMyItemDatas();
    });
  }

  loadMyItemDatas(){
    //this.now = new Date().toJSON().slice(0,19);
    this.date = new Date();
    this.now = this.datepipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss');

    this.auctionservice.LoadMyItemData(this.type, this.limit, this.start)
      .then(res => {
          this.itemdatas = res.data;
          this.setPage(this.thispage?this.thispage:1);
          //this.setPage(1);
          this.titleService.setTitle("Loyaus 我的項目");
      }, err => console.log('hey, error' + err),
      )
  }

  itemRepost(id){
      this.auctionservice.postRepost(id)
        .then(data =>{
          this.loadMyItemDatas();
        }, err=>{
          alert("重發無效");
        })
  }

  target(id){
    return "#repostItemModal-"+id;
  }

  setPage(page: number) {
        if (page < 1 || (page > this.pager.totalPages && this.pager.totalPages!=0)) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.itemdatas.length, page,this.pagerlimit);
 
        // get current page of items
        this.pagedItems = this.itemdatas.slice(this.pager.startIndex, this.pager.endIndex + 1);


        //this.router.navigate(['/auction/'+this.type+'/admin', { page: page}]);
        // if(!this.first)
        this.location.go( '/auction/'+this.type+'/admin;page='+page );
 
    }

}
