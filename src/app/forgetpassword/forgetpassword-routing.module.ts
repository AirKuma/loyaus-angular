import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PasswordemailComponent }    from './passwordemail/passwordemail.component';
import { ResetspasswordComponent }    from './resetspassword/resetspassword.component';

import { GuestGuard }  from '../common/guest-guard.service';


const forgetpasswordRoutes: Routes = [
  { 
        path: 'email',  
        component: PasswordemailComponent,
        canActivate: [GuestGuard],
        canLoad: [GuestGuard], 
    },
    {
        path: 'reset/:token',
        component: ResetspasswordComponent,
        canActivate: [GuestGuard],
        canLoad: [GuestGuard], 
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(forgetpasswordRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ForgetPasswordRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/