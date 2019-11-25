import { Component, OnInit } from '@angular/core';
import { ActivateService }    from '../activate.service';
import { UserService }    from '../../user/user.service';
import { Router} from '@angular/router';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  public email = '';

  constructor(private activateservice : ActivateService, private router: Router, private userservice : UserService, private titleService: Title) {
       setTimeout(() => {
          this.titleService.setTitle("Loyaus");
       });
   }

  ngOnInit() {
      this.userservice.loadUserData()
      .then(res => {
          if(res.data[0].actived==1)
            this.router.navigate(['/'+res.data[0].college.data[0].acronym+'/auction/bid']);
        })
  }

  ActivateEmail(){
    if(this.email != ""){
      this.activateservice.postActivateEmail(this.email)
        .then(data =>{
          console.log(data);
          //console.log(data._body);
          this.email = "";
          alert("成功發送帳號鏈結, 請檢查您的電郵信箱!");
        }, err=>{
          alert("Email輸入錯誤");
        })
    }else{
      console.log("empty");
    }
}

}
