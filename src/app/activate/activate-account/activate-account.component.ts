import { Component, OnInit } from '@angular/core';
import { ActivateService }    from '../activate.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  public code:string;

  constructor(private activateservice : ActivateService, private route: ActivatedRoute, private router: Router, private titleService: Title) { 
     setTimeout(() => {
          this.titleService.setTitle("Loyaus");
      });
  }

  ngOnInit() {
     this.route.params.subscribe(params => {
       this.code = params['code'];

       this.Activate()
    });
  }

  Activate(){
    this.activateservice.activateAccount(this.code)
      .then(data =>{
        console.log(data);
        alert("認證成功!");
        this.router.navigate(['/']);
      }, err=>{
        alert("發生錯誤，請在嘗試一次！");
      })
  }


}
