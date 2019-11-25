import { Component, OnInit } from '@angular/core';
import { ROOT } from '../../app/app-config';
import { MessageService } from './message.service';
import { UserService }    from '../user/user.service';
import { Title }  from '@angular/platform-browser';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  root:string = ROOT;
  public start:number=0;
  public limit:number=10;
  public threaddatas:any;
  public auth_user:any;

  constructor(private messageService : MessageService, private userservice : UserService, private titleService: Title) {
      setTimeout(() => {
          this.titleService.setTitle("Loyaus 通訊");
      });
   }

  ngOnInit() {
      this.loadThreadDatas();
      this.loadUserId();
  }

  loadThreadDatas(){
    this.messageService.LoadThreadsData(this.limit, this.start)
      .then(res => {
          this.threaddatas = res.data;
          console.log(this.threaddatas);
      })
  }

  loadUserId(){
    this.userservice.loadUserData()
      .then(res => {
          this.auth_user = res.data[0].id;
          console.log(this.auth_user);
        })
  }

  is_read(read){
      if(read!=0)
        return "#fff";
  }

  postThreadRead(id){
    this.messageService.postThreadRead(id)
      .then(data =>{
        console.log(data);
        this.messageService.LoadThreadsData(this.threaddatas.length, 0)
        .then(res => {
            this.threaddatas = res.data;
            console.log(this.threaddatas);
        })
      })
  }

  strollBottom(){
    var itemList = document.getElementById("chat");
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
      
      this.messageService.LoadThreadsData(this.limit, this.start)
          .then(
          (res) => {
              //console.log(res.data.length);
              if(res.data != ''){
                for (let x of res.data){
                this.threaddatas.push(x);
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
