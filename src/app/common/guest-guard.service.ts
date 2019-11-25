import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
}                           from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService }    from '../user/user.service';

@Injectable()
export class GuestGuard implements CanActivate, CanActivateChild, CanLoad {
  public actived:any;

  constructor(private authService: AuthService, private userservice : UserService, private router: Router) {}

  canActivate(): boolean {
    return this.checkGuest();
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;

    return this.checkGuest();
  }

  checkGuest(): boolean {
    // this.userservice.loadUserData()
    //   .then(res => {
    //        this.actived = res.data[0].actived;
    //     })
        
    if (this.authService.isLogin()) { 
        //this.router.navigate(['/fju/auction/bid']);
        this.userservice.loadUserData()
        .then(res => {
            this.router.navigate(['/'+res.data[0].college.data[0].acronym+'/auction/bid']);
            //window.location.reload();
          })
        return false;
    }else{
        return true; 
    }
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/