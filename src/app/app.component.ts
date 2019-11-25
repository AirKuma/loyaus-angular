import { Component, NgZone } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router} from '@angular/router';
import { UserService }    from './user/user.service';
import { ROOT } from '../app/app-config';
import { NotificationService }    from './notification/notification.service';
import { MessageService }    from './message/message.service';
import * as io from 'socket.io-client'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [ AuthService,UserService ]
})
export class AppComponent {
  data: any;
  auth_type:string = "N/A";
  auth_status:string = "";
  is_auth_error:any = "";
  islogin:boolean;
  public userdata:any;
  root:string = ROOT;

  public  notificationdatas:any;
  public start:number=0;
  public limit:number=10;

  public usercolleg:any;

  sandbutton:number=1;
  noticount:any;
  messagecount:any;

  socketHost: string = "http://45.55.22.181:3000/";
  socket:any;
  zone:any;
  reloadnoti:boolean;

  constructor(private authService : AuthService, private router: Router, private userservice : UserService, private notificationService : NotificationService, private messageServicetion : MessageService) {
    this.data = {};
    this.data.username = "";
    this.data.password = "";

    console.log("I am bear");
    this.islogin = this.authService.isLogin();
    if(this.islogin){
      this.reloadnoti = true;
      this.loadUserDatas();
      this.loadUserNotificationCount();
      this.loadUserMessageCount();
      //this.loadNotificationDatas();
    }else{
       this.usercolleg = "1"
    }
  }

  connectSocket(){
    this.socket = io.connect(this.socketHost);
    this.zone = new NgZone({enableLongStackTrace: false});
    this.socket.on("connect", (msg) =>{
      this.zone.run(() =>{
         
      this.socket.emit('set-token', this.userdata[0].email);
        console.log(msg);

      });
    });

    this.socket.on('notification', (msg) => {
      this.zone.run(() =>{
      this.noticount = msg;
      this.reloadnoti = true;
      //this.loadNotificationDatas();
      console.log("notification", msg);
      });
    });

    this.socket.on('messageread', (msg) => {
      this.zone.run(() =>{
      this.messagecount = msg;
      console.log("message", msg);
      });
    });
  }

  loadUserDatas(){
    this.userservice.loadUserData()
      .then(res => {
          this.usercolleg = res.data[0].college.data[0].acronym;
          console.log(this.usercolleg);
          this.userdata = res.data;
          console.log("I USER 2");
          this.connectSocket();
        })
      console.log(this.userdata);
  }

  loadNotificationDatas(){
    if( ( !this.notificationdatas || this.noticount>0 ) || this.reloadnoti == true){
      this.notificationService.LoadNotificationData(this.limit, 0)
        .then(res => {
            this.notificationdatas = res.data;
            this.reloadnoti = false;

            var itemList = document.getElementById("notificationsBody");
            itemList.scrollTop = 0;
        })
    }
  }
  

  login(){
    this.sandbutton = 0;
    this.auth_type = 'Token';
    var $obs = this.authService.getAuthToken(this.data.username, this.data.password);
    
    $obs.subscribe(
            data => {
                this.auth_status = 'OK';
                this.is_auth_error = false;
                console.log("82");
                console.log(data);

                //this.islogin = true;
                this.authService.setTokenHeader(data);

                 this.userservice.loadUserData()
                .then(res => {
                    this.usercolleg = res.data[0].college.data[0].acronym;
                    this.router.navigate(['/'+this.usercolleg+'/auction/bid']);
                    this.sandbutton = 1;
                    window.location.reload();
                  })
                
                // this.router.navigate(['/fju/auction/bid']);
                window.location.reload();
            },
            err => {
                this.auth_status = `Error: ${err}`;
                this.is_auth_error = true;
                this.logError(err)

                this.router.navigate(['/auth/login', { message: '帳號或密碼錯誤', username:this.data.username }]);
                this.sandbutton = 1;
            },
            () => console.log('Finish Auth'));

  }

  logout(){
    localStorage.removeItem('token');
    this.islogin = false;
    this.router.navigate(['/']);
    //window.location.reload();
  }

  logError(err) {
      console.error('Error: ' + err);
  }
  reloadNotification(){
    //console.log("reloadNotification");
    // window.location.reload();
    //this.loadNotificationDatas();
    this.reloadnoti = true;
    document.getElementById('notificationContainer').style.display = 'none';
  }

  is_read(read){
      if(read==0)
        return "#f5f5f5";
  }


  checkall(){
     // window.location.reload();
  }

  loadUserNotificationCount(){
    this.notificationService.getReadNotification()
      .then(res => {
          console.log(res);
          this.noticount = res;

      })
  }

  loadUserMessageCount(){
    this.messageServicetion.getReadMessage()
      .then(res => {
          console.log(res);
          this.messagecount = res;

      })
  }

  readnotification(){
    this.loadNotificationDatas();
    this.noticount = 0;
    
        this.notificationService.postReadNotification()
      .then(res => {
          console.log(res);
      }) 
  }

  readmessage(){
    this.messagecount = 0;
    console.log("AAA");
        this.messageServicetion.postReadMessage()
      .then(res => {
          console.log(res);
      })  
  }

  strollBottom(){
    var itemList = document.getElementById("notificationsBody");
    let bottom = itemList.scrollTop;
    // console.log(bottom);
    // console.log(itemList.scrollHeight);
    // console.log(itemList.offsetHeight);
    console.log(bottom);
    console.log(itemList.scrollHeight);
    console.log(itemList.offsetHeight);
    if(bottom + itemList.offsetHeight >= itemList.scrollHeight-1){
        this.doInfinite();
    }

  }

  doInfinite() {
    setTimeout(() => {
      this.start+=10;
      
      this.notificationService.LoadNotificationData(10, this.start)
          .then(
          (res) => {
              //console.log(res.data.length);
              if(res.data != ''){
                for (let x of res.data){
                this.notificationdatas.push(x);
                //console.log(this.itemdatas);
                }
                //this.limit = this.notificationdatas.length+res.data.length;
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
