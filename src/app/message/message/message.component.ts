import { Component, OnInit } from '@angular/core';
import { ROOT } from '../../../app/app-config';
import { MessageService } from './../message.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService }    from '../../user/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  root:string = ROOT;
  public start:number=0;
  public limit:number=10;
  public selectedId:number;
  public messages:any;
  public contactData:any;
  public error:any;
  public body ='';
  public auth_user:any;

  sandbutton:number=1;
  private current;
  private pre;

  constructor(private messageService : MessageService, private route: ActivatedRoute, private userservice : UserService, private titleService: Title) { 
      setTimeout(() => {
          this.titleService.setTitle("Loyaus 通訊");
      });
  }

  ngOnInit() {
     this.route.params.subscribe(params => {
       this.selectedId = +params['id'];
           this.start = 0;
       if(this.selectedId){
          this.loadUserId();
          this.loadMessageDatas();
          this.loadContactUser();
       }else{
         this.error = 0;
       }  
    });
  }

  loadMessageDatas(){
    this.messageService.LoadMessageData(this.limit, this.start, this.selectedId)
      .then(res => {
          this.messages = res.data;
          //console.log(this.messages[0].user.data[0]);
          this.postThreadRead(this.messages[0].thread_id);
          this.error = 0;
          this.autoScroll();
      },err=>{
          this.error = 1;
      })
  }

  postThreadRead(id){
    this.messageService.postThreadRead(id)
      .then(data =>{
        console.log(data);
      })
  }

  loadContactUser(){
    this.userservice.LoadUserContactData(this.selectedId)
      .then(res => {
          this.contactData = res.data;
          console.log(this.contactData);
          this.error = 0;
      },err=>{
          this.error = 1;
      })
  }


  createMessage(){
    if(this.body != ""){
      this.sandbutton = 0;
      this.messageService.postCreateMessage(this.body, this.selectedId)
        .then(data =>{
          console.log(data);
          this.start = 0;
          this.loadMessageDatas();
          //this.messages.push(this.body);
          // this.messageService.LoadMessageData(1,0, this.selectedId)
          // .then(res => {
          //     //this.messages = res.data;
          //     console.log(res.data);
          //     //this.messages.push(res.data);
              // for (let x of data){
              //     this.messages.push(x);
              //   }
          //     //console.log(this.messages[0].user.data[0]);
          //     this.error = 0;
          //     this.autoScroll();
          // })

          this.body = "";
          this.sandbutton = 1;
        }, err=>{
          alert("傳送訊息無效");
          this.sandbutton = 1;
        })
    }else{
      console.log("empty");
    }
  }

  loadUserId(){
    this.userservice.loadUserData()
      .then(res => {
          this.auth_user = res.data[0].id;
          console.log(this.auth_user);
        })
  }

  // ScrolltoBottom(){
  //   // var element = document.getElementById('chatmessage');
  //   // element.scrollTop = element.scrollHeight;
  //   console.log(this.messages[this.messages.length-1].id);
  //   document.getElementById('17').focus();
  // }
  
  autoScroll() {
    setTimeout(function () {
        var itemList = document.getElementById("chatmessage");
        itemList.scrollTop = itemList.scrollHeight;
        console.log('kuma');
    });
}

scrollToPre(pre){
  setTimeout(function () {
    var itemList = document.getElementById("chatmessage");
    this.current = itemList.scrollHeight;
    if(parseInt(this.current)-parseInt(pre)>400)
      itemList.scrollTop = parseInt(this.current)-parseInt(pre)-(200);

        console.log(pre);
        console.log(this.current);
        console.log(itemList.scrollTop);
        console.log(window.screen.height);
        console.log(parseInt(this.current)-parseInt(pre));
    });
}


ToTop(){
  var itemList = document.getElementById("chatmessage");
  let top = itemList.scrollTop;
  console.log(top);
  if(top<=0){
      this.doInfinite();
  }

}

doInfinite() {
    setTimeout(() => {
      //this.limit+=10;
      this.start+=10;
      
      this.messageService.LoadMessageData(this.limit, this.start, this.selectedId)
          .then(
          (res) => {
              if(res.data != ''){

                var itemList = document.getElementById("chatmessage");
                this.pre = itemList.scrollHeight;
                console.log(this.pre);
            
                for (let x of res.data.reverse()){
                  this.messages.unshift(x);
                }

                //this.messagedatas = res.data;
                this.messageService.LoadMessageData(this.messages.length, 0, this.selectedId)
                .then(
                  (res) => {
                    this.messages = res.data;
                })

                this.start -= (10-res.data.length);
                this.scrollToPre(this.pre);
              }else{
                this.start -= 10;
                // this.messageService.LoadMessageData(this.messagedatas.length, 0, this.selectedId)
                // .subscribe(
                //   (res) => {
                //     this.messagedatas = res.data;
                // })
              }
          })
      //infiniteScroll.complete();
    });

    console.log(this.start);
  }

}
