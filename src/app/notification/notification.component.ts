import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { NotificationService }    from './notification.service';
import { Title, DOCUMENT }     from '@angular/platform-browser';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public  notificationdatas:any;
  public start:number=0;
  public limit:number=10;

  constructor(@Inject(DOCUMENT) private document: Document,private notificationService : NotificationService, private titleService: Title) {
        setTimeout(() => {
            this.titleService.setTitle("Loyaus 我的通知");
        });
   }

  ngOnInit() {
    this.loadNotificationDatas();
  }

  loadNotificationDatas(){
    this.notificationService.LoadNotificationData(this.limit, this.start)
      .then(res => {
          this.notificationdatas = res.data;
      })
  }

  is_read(read){
    console.log("read= "+read);
      if(read==0)
        return "#f5f5f5";
  }


  @HostListener("window:scroll", [])
  onWindowScroll() {
    let offsetHeight = this.document.body.offsetHeight;
    let innerHeight = window.innerHeight;
    let scrollY = window.scrollY;

    // console.log(bottom);
    // console.log(offsetHeight);
    // console.log(scrollHeight);
    // console.log(window.innerHeight);
    // console.log(window.scrollY);
    if (scrollY+innerHeight >= offsetHeight-10) {
          this.doInfinite();
      } 
  }

  doInfinite() {
    setTimeout(() => {
      this.start+=10;
      
      this.notificationService.LoadNotificationData(this.limit, this.start)
          .then(
          (res) => {
              //console.log(res.data.length);
              if(res.data != ''){
                for (let x of res.data){
                this.notificationdatas.push(x);
                //console.log(this.itemdatas);
                }
                this.start -= (10-res.data.length);
              }else{
                // if(this.nodata == 1){
                //   let toast = this.toastCtrl.create({
                //   message: '己經沒有資料',
                //   duration: 1000
                //   });
                //   toast.present();
                //   this.nodata = 0;
                // }
                this.start -= 10;
              }
          })
    });

    console.log(this.start);
  }

}
