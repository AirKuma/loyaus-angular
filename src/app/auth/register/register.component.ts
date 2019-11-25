import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl , ReactiveFormsModule} from '@angular/forms';
import { UserValidator } from  '../../validators/user';
import { AuthService } from '../../auth/auth.service';
import { UserService }    from '../../user/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userdata : any;
  public majordatas = [];

  sandbutton:number=1;

  constructor(private formBuilder: FormBuilder, private authService : AuthService, private router: Router, private route: ActivatedRoute, private userservice : UserService, private titleService: Title) {
      setTimeout(() => {
          this.titleService.setTitle("Loyaus 註冊");
      });
   }

   form(){
     this.registerForm = this.formBuilder.group({
      'lastname': ['', [Validators.required, Validators.maxLength(10)]],
      'firstname': ['', [Validators.required, Validators.maxLength(10)]],
      'email': ['', [Validators.required, UserValidator.emailValidator, UserValidator.ifEmailUnique(this.authService), UserValidator.collegeEmailValidator, Validators.maxLength(255)]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'password_confirmation': ['', [Validators.required, Validators.minLength(6)]],
      'birthday': ['', Validators.required],
      'major_id': ['', Validators.required],
      'gender': ['1', Validators.required],
    }, {validator: this.matchingPasswords('password', 'password_confirmation')})
   }

  ngOnInit() {
      this.loadmajordats();
      this.form();
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

  loadmajordats(){
    this.authService.LoadMajorData()
      .then(res => {
          this.majordatas = res.data;
      })
  }

  register(){
  this.sandbutton = 0;
  this.userdata = this.registerForm.value;
    this.authService.postRegister(this.userdata)
        .then(data =>{
          console.log(data);
          this.login(this.userdata.email,this.userdata.password);
          this.sandbutton = 1;
        }, err=>{
          console.log(err);
          alert("註冊無效");
         this.sandbutton = 1;
        })
  }

  login(username,password){
    var $obs = this.authService.getAuthToken(username, password);
    
    $obs.subscribe(
            data => {
                console.log(data);

                //this.router.navigate(['/fju/auction/bid']);
                this.authService.setTokenHeader(data);
                 this.userservice.loadUserData()
                .then(res => {
                    this.router.navigate(['/'+res.data[0].college.data[0].acronym+'/auction/bid']);
                    window.location.reload();
                  })
                window.location.reload();
            },
            err => {
                console.log(err);
            },
            () => console.log('Finish Auth'));
  }

}
