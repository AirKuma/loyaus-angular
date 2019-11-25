import { Component, OnInit } from '@angular/core';
import { AuctionService }    from '../auction.service';
import { ROOT } from '../../../app/app-config';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommentService }    from '../../common/comment.service';
import { AuthService } from '../../auth/auth.service';
import { UserService }    from '../../user/user.service';
import { DatePipe } from '@angular/common';
import { Title }     from '@angular/platform-browser';
import { MetaService } from 'ng2-meta';
import { MessageService } from '../../message/message.service';
import { PagerService } from '../../common/pager.service';
declare var $:any;

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
  public auctionDetail:any;
  public date:any;
  public now:any
  root:string = ROOT;
  public selectedId:number;
  public start:number=0;
  public limit:number=10;
  public commentdatas = [];
  public content ='';
  islogin:boolean;
  public userId:any;
  public price = '';
  public biddatas:any;
  public contactData:any;
  public report = '';
  public type:string;
  public priceError:string; 
  public imagedatas:any;

  public commentreport = '';
  public commentupdate = '';

  public usercolleg:any;
  public error:any;
  public actived:any;
  public isfavor:any;

  sandbutton:number=1;

  commentpager: any = {};
  commentpagedItems: any[];
  commentpagerlimit:number = 5;

  bidpager: any = {};
  bidpagedItems: any[];
  bidpagerlimit:number = 5;


  constructor(private messageService : MessageService,private auctionservice : AuctionService, private route: ActivatedRoute, private commentService : CommentService, private authService : AuthService, private userservice : UserService, private router: Router, private datepipe: DatePipe, private titleService: Title, private metaService: MetaService, private pagerService: PagerService) { 
      //this.titleService.setTitle("Loyaus");
      //this.metaService.setTitle("555");
      // setTimeout(() => {
      //   this.metaService.setTitle('test');
      // });
  }

  ngAfterViewChecked() {
    console.log("countdown");
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');

        $this.countdown(finalDate, function(event) {
          $this.html(event.strftime('%D 天 %H 時 %M 分 %S 秒'));
        });
      });
  }

  ngOnInit() {
    this.islogin = this.authService.isLogin();
    this.route.params.subscribe(params => {
       this.selectedId = +params['id'];
       this.type = params['type'];

       this.loadDetail(this.selectedId);
      //  this.loadCommentData();
      //  this.loadBidData();
    });
    if(this.islogin){
      this.loadUserId();
      this.ifFavor();
    }
    else{
      this.userId = 0;
      this.usercolleg = 'fju';
    }
  }

  priceCheck(){
     if(this.type=="bid"){
        if(this.biddatas[0] && this.price <= this.auctionDetail[0].price ){
          this.priceError = "價錢不能小於或等於"+this.auctionDetail[0].price;
          return true;
        }
        else if(!this.biddatas[0] && this.price < this.auctionDetail[0].price){
          this.priceError = "價錢不能小於"+this.auctionDetail[0].price;
          return true;
        }
     }else{
        if(this.biddatas[0] && this.price >= this.auctionDetail[0].price){
          this.priceError = "價錢不能大於或等於"+this.auctionDetail[0].price;
          return true;
        }
        else if(!this.biddatas[0] && this.price > this.auctionDetail[0].price){
          this.priceError = "價錢不能大於"+this.auctionDetail[0].price;
          return true;
        }
     }

  }

  loadUserId(){
    this.userservice.loadUserData()
      .then(res => {
          console.log(res.data[0]);
          this.userId = res.data[0].id;
          this.usercolleg = res.data[0].college.data[0].acronym;
          this.actived = res.data[0].actived;
          console.log(this.userId);
        })
  }

  loadDetail(itemid){
    this.date = new Date();
    this.now = this.datepipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss');

    this.auctionservice.LoadDetail(itemid)
        .then(res => {
          this.error = 0;
           //check url
            if((res.data[0].type==0 && this.type!='bid') || (res.data[0].type==1 && this.type!='seek')){
                let itemtype = 'bid';
                if(res.data[0].type==1)
                  itemtype = 'seek';
                this.router.navigate(['/auction/'+itemtype+'/item/'+this.selectedId]);
            }
          
          this.auctionDetail = res.data;
          this.titleService.setTitle("Loyaus "+this.auctionDetail[0].name);

          // //meta
          // if(this.auctionDetail[0].image[0])
          //   this.metaService.setTag('og:image',this.auctionDetail[0].image[0].file_path);
          // else
          //   this.metaService.setTag('og:image',null);
          // this.metaService.setTag('og:title',"["+this.auctionDetail[0].category.name+"] "+this.auctionDetail[0].name);
          // this.metaService.setTag('og:site_name',"輔大Loyaus拍賣平台");
          // this.metaService.setTag('og:description',"NT$ "+this.auctionDetail[0].price);
          // this.metaService.setTag('og:type',"blog");
          // this.metaService.setTag('og:url',this.root+'auction/'+this.type+'/item/'+this.selectedId);
          // this.metaService.setTag('og:app_id',"298858140449739");

          this.loadimagedates();
          this.loadCommentData(1);
          this.loadBidData();
          this.loadContactData(this.auctionDetail[0].user_id);
          console.log(this.auctionDetail);
     },err=>{
          this.error = 1;
          this.titleService.setTitle("Loyaus 此項目不見了！");
      })

  }

  itemComment(){
    if(this.content != ""){
      this.sandbutton = 0;
      this.commentService.postComment(this.content, this.selectedId)
        .then(data =>{
          console.log(data);
          this.start = 0;
          this.loadCommentData(1);
          this.loadDetail(this.selectedId);
          this.content = "";
          this.sandbutton = 1;
        }, err=>{
          alert("無效留言");
          this.sandbutton = 1;
        })
    }else{
      console.log("empty");
    }
  }

  loadCommentData(setpage){
    this.auctionservice.LoadItemCommentData(this.selectedId,'','')
      .then(res => {
          this.commentdatas = res.data;
          this.setcommentPage(setpage);
      })
    console.log(this.commentdatas)
  }

  loadimagedates(){
    this.auctionservice.LoadItemImageData(this.selectedId)
      .then(res => {
          this.imagedatas = res.data;

          //meta
          if(this.imagedatas[0])
            this.metaService.setTag('og:image',this.imagedatas[0].file_path);
          else
            this.metaService.setTag('og:image',null);
          this.metaService.setTag('og:title',"["+this.auctionDetail[0].category.name+"] "+this.auctionDetail[0].name);
          this.metaService.setTag('og:site_name',"輔大Loyaus拍賣平台");
          this.metaService.setTag('og:description',"NT$ "+this.auctionDetail[0].price);
          this.metaService.setTag('og:type',"blog");
          this.metaService.setTag('og:url',this.root+'auction/'+this.type+'/item/'+this.selectedId);
          this.metaService.setTag('og:app_id',"298858140449739");
      })
  }

  itemBid(){
    if(this.price != ""){
      this.sandbutton = 0;
      this.auctionservice.postBid(this.price, this.selectedId)
        .then(data =>{
          this.loadBidData();
          this.loadDetail(this.selectedId);
          this.price = "";
          this.sandbutton = 1;
        }, err=>{
          alert("無效出價");
          this.loadBidData();
          this.loadDetail(this.selectedId);
          this.sandbutton = 1;
        })
    }else{
      console.log("empty");
    }
}

itemFree(){
  this.sandbutton = 0;
      this.auctionservice.postFree(this.selectedId)
        .then(data =>{
            this.loadBidData();
            this.loadDetail(this.selectedId);
            this.sandbutton = 1;
           // window.location.reload();
        }, err=>{
          alert("無效");
          this.loadBidData();
          this.loadDetail(this.selectedId);
          this.sandbutton = 1;
        })
  }

loadBidData(){
    this.auctionservice.LoadItemBidData(this.selectedId,'','')
      .then(res => {
          this.biddatas = res.data;
          this.setbidPage(1);
           console.log(this.biddatas);
      })
  }

  loadContactData(user_id){
    this.userservice.LoadUserContactData(user_id)
      .then(res => {
          this.contactData = res.data;
          console.log(this.contactData);
      })
  }

  itemReport(){
      this.auctionservice.postReport(this.report, this.selectedId)
        .then(data =>{
          console.log(data);
          this.loadDetail(this.selectedId);
          this.report = "";
        }, err=>{
          alert("舉報無效，一個項目只能舉報一次！");
        })
  } 

  iteDestroy(){
      this.auctionservice.destroyItem(this.selectedId)
        .then(data =>{
          this.router.navigate(['/'+this.usercolleg+'/auction/'+this.type]);
        }, err=>{
           alert("刪除無效！");
        })
  } 

  commentReport(id){
      this.commentService.postReport(this.commentreport,id)
        .then(data =>{
          this.start = 0;
          this.loadCommentData(this.commentpager.currentPage);
          this.commentreport = "";
          console.log(data);
        }, err=>{
          console.log("AAAAAAA"+err);
          alert("舉報無效，一個留言只能舉報一次！");
        })
  }

  commentDestroy(id){
      this.commentService.destroyComment(id)
        .then(data =>{
          console.log(data);
          //this.commentdatas.splice(this.commentdatas.indexOf(id), 1);
          //this.start = 0;
          if(this.commentdatas.length-1<=(this.commentpager.totalPages-1)*this.commentpagerlimit)
            this.loadCommentData(this.commentpager.currentPage-1);
          else
            this.loadCommentData(this.commentpager.currentPage);
          //this.loadDetail(this.selectedId);
        }, err=>{
          alert("刪除無效");
        })
  }

  commentUpdate(id){
      if(this.commentupdate != ""){
      this.commentService.putUpdateComment(this.commentupdate, id)
        .then(data =>{
          console.log(data);
          this.start = 0;
          this.loadCommentData(this.commentpager.currentPage);
        }, err=>{
          alert("修改無效");
        })
    }else{
      console.log("empty");
    }
  }

  commentedit(content){
     this.commentupdate = content; 
  }
    

  setClasses(index) {
    if(index==0)
      return "active";
  }

  setClassescomment(index) {
    if(index==0)
      return "toggle_margin";
  }

  setClasseshow(free) {
    if(free==0)
      return "col-lg-8";
    else
      return "col-lg-12";
  }

  target(model, id){
    return model+id;
  }

  setPriceIconClasses(free){
      if(free==0)
        return "btn btn-secondary bidIcon";
      else
        return "btn btn-secondary wantIcon2";
  }

  postmessage(){
    this.messageService.getIfThread(this.auctionDetail[0].user_id)
      .then(res => {
          console.log(res);
          if(res==0){
              this.messageService.postCreateThread(this.auctionDetail[0].user_id)
              .then(res => {
                console.log(res);
                  this.router.navigate(['/message/'+this.auctionDetail[0].user_id]);
              })
          }else{
              this.router.navigate(['/message/'+this.auctionDetail[0].user_id]);
          }
      })
    
  }

  postfavor(){
      if(this.isfavor==0){
        this.isfavor = 1;
        this.auctionDetail[0].favor_count+=1;
      }else{
        this.isfavor = 0;
        this.auctionDetail[0].favor_count-=1;
      }
      this.auctionservice.postfavor(this.selectedId)
        .then(data =>{
            //this.ifFavor();
            //this.loadDetail(this.selectedId);
        }, err=>{
          alert("無效");
        })
  }

  ifFavor(){
    this.auctionservice.getIffavor(this.selectedId)
      .then(res => {
          if(res==0)
            this.isfavor = 0;
          else
            this.isfavor = 1;
        })
  }

  setFavorClass(){
      if(this.isfavor==0)
        return "btn btn-secondary favorIcon";
      else
        return "btn btn-secondary calfavorIcon";
  }

  sendMessage(event) {
    this.userservice.LoadUserContactData(this.auctionDetail[0].user_id)
    .then(seller => {
        let userId = seller.data[0].user_id;
        if(this.userId == this.auctionDetail[0].user_id){
          userId = this.biddatas[0].id;
        }
        else{
          userId = this.auctionDetail[0].user_id;
        }
        console.log(this.userId);
        console.log(userId);
        this.router.navigate(['/message/'+userId]);
    })  
  }

  setcommentPage(page: number) {
    console.log(this.commentpager.totalPages);
    
        // if (page < 1 || page > this.commentpager.totalPages) {
        //     return;
        // }
        if (page < 1 || (page > this.commentpager.totalPages && this.commentpager.totalPages!=0) ) {
            return;
        }
 
        // get pager object from service
        this.commentpager = this.pagerService.getPager(this.commentdatas.length, page,this.commentpagerlimit);
 
        // get current page of items
        this.commentpagedItems = this.commentdatas.slice(this.commentpager.startIndex, this.commentpager.endIndex + 1);
  }

  setbidPage(page: number) {
        // if (page < 1 || page > this.bidpager.totalPages) {
        //     return;
        // }

        if (page < 1 || (page > this.bidpager.totalPages && this.bidpager.totalPages!=0)) {
            return;
        }
 
        // get pager object from service
        this.bidpager = this.pagerService.getPager(this.biddatas.length, page,this.bidpagerlimit);
 
        // get current page of items
        this.bidpagedItems = this.biddatas.slice(this.bidpager.startIndex, this.bidpager.endIndex + 1);
    }


}
