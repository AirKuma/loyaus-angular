import { Component, OnInit } from '@angular/core';
import { UserService }    from './user.service';
import { ROOT } from '../../app/app-config';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public userdata:any;
  root:string = ROOT;

  constructor(private userservice : UserService) {
      console.log("I USER");
   }

  ngOnInit() {
    console.log("I USER 1");
    this.loadUserDatas();
  }

  loadUserDatas(){
    this.userservice.loadUserData()
      .then(res => {
          this.userdata = res.data;
          console.log("I USER 2");
        })
      console.log(this.userdata);
  }

}
