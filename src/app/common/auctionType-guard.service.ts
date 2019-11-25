import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras, Route
}                           from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService }    from '../user/user.service';

@Injectable()
export class AuctionTypeGuard implements CanActivate, CanActivateChild {
  public actived:any;

  constructor(private authService: AuthService, private userservice : UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log(url);
    return this.checkType(route.params['type']);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  // canLoad(route: Route): boolean {
  //   let url = `/${route.path}`;

  //   return this.checkType();
  // }

  checkType(type): boolean {
    if (type!='bid' && type!='seek') { 
        this.router.navigate(['/fju/auction/bid']);
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