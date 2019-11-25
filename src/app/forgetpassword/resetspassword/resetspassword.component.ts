import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl , ReactiveFormsModule} from '@angular/forms';
import { Title }     from '@angular/platform-browser';
import { UserValidator } from  '../../validators/user';
import { ForgetpasswordService } from '../forgetpassword.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-resetspassword',
  templateUrl: './resetspassword.component.html',
  styleUrls: ['./resetspassword.component.css']
})
export class ResetspasswordComponent implements OnInit {
  PasswordForm: FormGroup;
  token:String;

  sandbutton:number=1;

  constructor(private formBuilder: FormBuilder, private titleService: Title, private forgetpasswordService : ForgetpasswordService, private route: ActivatedRoute) {
      setTimeout(() => {
          this.titleService.setTitle("Loyaus 重設密碼");
      });

      this.PasswordForm = this.formBuilder.group({
      'email': ['', [Validators.required, UserValidator.emailValidator, UserValidator.collegeEmailValidator]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'password_confirmation': ['', [Validators.required, Validators.minLength(6)]]
    }, {validator: this.matchingPasswords('password', 'password_confirmation')})
   }

  ngOnInit() {
      this.route.params.subscribe(params => {
       this.token = params['token'];
    });
  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
    }
  }

  resetPassword(){
    this.sandbutton = 0;
    let resetdata = JSON.stringify(this.PasswordForm.value);
    this.forgetpasswordService.postResetPassword(resetdata,this.token)
        .then(data =>{
          alert("重設成功！");
          this.sandbutton = 1;
        }, err=>{
          alert("重設無效！");
          this.sandbutton = 1;
        })
  }

}
