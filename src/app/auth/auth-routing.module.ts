import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }    from './login/login.component';
import { RegisterComponent }    from './register/register.component';

import { GuestGuard }  from '../common/guest-guard.service';



const auctionRoutes: Routes = [
    { 
        path: 'login',  
        component: LoginComponent,
        canActivate: [GuestGuard],
        canLoad: [GuestGuard], 
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [GuestGuard],
        canLoad: [GuestGuard], 
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(auctionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/