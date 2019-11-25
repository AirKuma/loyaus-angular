import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserService }    from '../../user/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any;
  auth_type:string = "N/A";
  auth_status:string = "";
  is_auth_error:any = "";
  message:any;

  sandbutton:number=1;

  constructor(private authService : AuthService, private router: Router, private route: ActivatedRoute, private userservice : UserService, private titleService: Title) { 
      setTimeout(() => {
          this.titleService.setTitle("Loyaus 登入");
      });
      this.data = {};
      this.data.username = "";
      this.data.password = "";
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
       if(params['message'])
          this.message = params['message'];
        if(params['username'])
          this.data.username = params['username'];
    });
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

                 this.authService.setTokenHeader(data);
                 this.userservice.loadUserData()
                .then(res => {
                    this.router.navigate(['/'+res.data[0].college.data[0].acronym+'/auction/bid']);
                    window.location.reload();
                    this.sandbutton = 1;
                  })
                //this.router.navigate(['/fju/auction/bid']);
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

  logError(err) {
      console.error('Error: ' + err);
  }

}
