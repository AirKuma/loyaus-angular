import { Component, OnInit } from '@angular/core';
import { AuctionService }    from '../auction.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ROOT } from '../../../app/app-config';
import { Title }     from '@angular/platform-browser';
import { PagerService } from '../../common/pager.service';
import { Location } from '@angular/common';
declare var $:any;

@Component({
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  public type:string;
  public itemdatas:any;
  public start:number=0;
  public limit:any=12;
  //public college:number=1;
  public college:string;
  public category: string;
  root:string = ROOT;
  title:string;

  pager: any = {};
  pagedItems: any[];
  pagerlimit:number = 15;
  thispage:any;

  constructor(private auctionservice : AuctionService, private route: ActivatedRoute, private router: Router, private titleService: Title, private location: Location, private pagerService: PagerService) { 

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
       this.college = params['college'];
       this.thispage = params['page'];
       if(params['category'])
          this.category = params['category'];
       else
        this.category = '';
      
      //check url
       if(this.type!='bid' && this.type!='seek')
          this.router.navigate(['/'+this.college+'/auction/bid']);
        
      if(this.type=='bid')
        this.title = "拍賣";
      else
        this.title = "競投";
      
      setTimeout(() => {
          this.titleService.setTitle("Loyaus "+this.title);
       });
       this.loadItemDatas();
    });
  }

  loadItemDatas(){
    this.auctionservice.LoadItemData(this.type, this.college, this.category , '', '', '')
      .then(res => {
          this.itemdatas = res.data;
          this.setPage(this.thispage?this.thispage:1);
      }, err => console.log('hey, error' + err),
      )
  }

  setPage(page: number) {
        if (page < 1 || (page > this.pager.totalPages && this.pager.totalPages!=0) ) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.itemdatas.length, page,this.pagerlimit);
 
        // get current page of items
        this.pagedItems = this.itemdatas.slice(this.pager.startIndex, this.pager.endIndex + 1);

        // if(this.category=='')
        //   this.router.navigate(['/'+this.college+'/auction/'+this.type, { page: page}]);
        // else
        //   this.router.navigate(['/'+this.college+'/auction/'+this.type+'/'+this.category, { page: page}]);
        // if(!this.first)
        if(this.category=='')
          this.location.go( '/'+this.college+'/auction/'+this.type+';page='+page );
        else
          this.location.go( '/'+this.college+'/auction/'+this.type+'/'+this.category+';page='+page );
        //this.location.go( this.router.url+';page='+page );
 
    }

}
