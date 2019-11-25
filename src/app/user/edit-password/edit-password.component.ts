import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl , ReactiveFormsModule} from '@angular/forms';
import { UserService }    from '../user.service';
import { Router} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Title }     from '@angular/platform-browser';
import { UserValidator } from  '../../validators/user';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;
  public userdata:any;
  public useremail:string;

  sandbutton:number=1;

  constructor(private formBuilder: FormBuilder, private userservice : UserService, private router: Router, private titleService: Title) {
      setTimeout(() => {
           this.titleService.setTitle("Loyaus 個人帳號");
      });
   }

  ngOnInit() {
     this.getUseremail();
     this.form();
  }

  form(){
    this.updatePasswordForm = this.formBuilder.group({
      'old_password': ['', [Validators.required, Validators.minLength(6), UserValidator.checkCurrentPassword(this.userservice)]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'password_confirmation': ['', [Validators.required, Validators.minLength(6)]]
    }, {validator: this.matchingPasswords('password', 'password_confirmation')})
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

  getUseremail(){
    this.userservice.loadUserData()
      .then(res => {
          this.useremail = res.data[0].email;
      })
  }

  editPassword(){
  this.sandbutton = 0;
  this.userdata = JSON.stringify(this.updatePasswordForm.value);
  
    this.userservice.postEditPassword(this.userdata)
        .then(data =>{
          console.log(data);
          this.logout();
          this.sandbutton = 1;
        }, err=>{
          alert("更新無效");
          this.sandbutton = 1;
        })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    window.location.reload();
  }
}
