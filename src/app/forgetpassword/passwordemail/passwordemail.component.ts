import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl , ReactiveFormsModule} from '@angular/forms';
import { Title }     from '@angular/platform-browser';
import { UserValidator } from  '../../validators/user';
import { ForgetpasswordService } from '../forgetpassword.service';

@Component({
  selector: 'app-passwordemail',
  templateUrl: './passwordemail.component.html',
  styleUrls: ['./passwordemail.component.css']
})
export class PasswordemailComponent implements OnInit {
  PasswordForm: FormGroup;
  public csrf_token:any;
  public email:any;

  sandbutton:number=1;

  constructor(private formBuilder: FormBuilder, private titleService: Title, private forgetpasswordService : ForgetpasswordService) { 
      setTimeout(() => {
          this.titleService.setTitle("Loyaus 重設密碼");
      });
      this.PasswordForm = this.formBuilder.group({
      'email': ['', [Validators.required, UserValidator.emailValidator, UserValidator.collegeEmailValidator]],
    })
  }

  ngOnInit() {
      //this.Csrf_token()
  }

  // Csrf_token(){
  //   this.forgetpasswordService.getCsrf_token()
  //     .then(res => {
  //         console.log(res);
  //         this.csrf_token = res['_body'];
  //       })
  // }

  sendRmail(){
    this.sandbutton = 0;
    this.email = JSON.stringify(this.PasswordForm.value);
    console.log(this.email);
      this.forgetpasswordService.postSendEmail(this.email)
        .then(data =>{
          console.log(data);
          this.sandbutton = 1;
        }, err=>{
          alert("寄送無效！");
          this.sandbutton = 1;
        })
    
  }

}
