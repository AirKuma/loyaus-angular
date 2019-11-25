import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl , ReactiveFormsModule} from '@angular/forms';
import { UserValidator } from  '../../validators/user';
import { AuthService } from '../../auth/auth.service';
import { UserService }    from '../user.service';
import 'rxjs/add/operator/toPromise';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public majordatas = [];
   editProfileForm: FormGroup;
   public userdata:any;

  constructor(private formBuilder: FormBuilder, private authService : AuthService, private userservice : UserService, private titleService: Title) { 
      setTimeout(() => {
           this.titleService.setTitle("Loyaus 個人資料");
      });
  }

  ngOnInit() {
    this.editProfileForm = this.formBuilder.group({
      'lastname': ['', [Validators.required, Validators.maxLength(10)]],
      'firstname': ['', [Validators.required, Validators.maxLength(10)]],
      'birthday': ['', Validators.required],
      'major_id': ['', Validators.required],
      'username': ['', [Validators.maxLength(20), UserValidator.figureValidator]],
      'phone': [''],
      'line_username': [''],
      'telegram_username': [''],
      'gender': [''],
      'other_email': ['', UserValidator.otherEmailValidator],
    })
     this.loadUserDatas();
     this.loadmajordats();
  }

  loadUserDatas(){
    this.userservice.loadUserData()
      .then(res => {
          this.userdata = res.data;
          if(this.userdata[0].other_email==null)
            this.userdata[0].other_email= '';
          this.editProfileForm = this.formBuilder.group({
            'lastname': [this.userdata[0].lastname, [Validators.required, Validators.maxLength(10)]],
            'firstname': [this.userdata[0].firstname, [Validators.required, Validators.maxLength(10)]],
            'birthday': [this.userdata[0].birthday, Validators.required],
            'major_id': [this.userdata[0].major_id, Validators.required],
            'username': [this.userdata[0].username, [Validators.maxLength(20), UserValidator.figureValidator, UserValidator.ifUsernameUnique(this.userservice, this.userdata[0].username)]],
            'phone': [this.userdata[0].phone],
            'line_username': [this.userdata[0].line_username],
            'telegram_username': [this.userdata[0].telegram_username],
            'gender': [this.userdata[0].gender.toString()],
            'other_email': [this.userdata[0].other_email, UserValidator.otherEmailValidator],
        })
            console.log(this.userdata);
      })
  }

  loadmajordats(){
    this.authService.LoadMajorData()
      .then(res => {
          this.majordatas = res.data;
      })
  }

  editProfile(){
  let useredit = JSON.stringify(this.editProfileForm.value);
    this.userservice.postEditProfile(useredit)
        .then(data =>{
          //console.log(data);
          window.location.reload();
        }, err=>{
          alert("更新無效");
        })
  }

}
