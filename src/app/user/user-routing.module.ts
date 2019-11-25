import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditPasswordComponent }    from './edit-password/edit-password.component';
import { EditProfileComponent }    from './edit-profile/edit-profile.component';
import { FacebookComponent }    from './facebook/facebook.component';

import { UserComponent } from './user.component';

import { AuthGuard }  from '../common/auth-guard.service';


const auctionRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: 'profile'},
          { path: 'profile', component: EditProfileComponent },
          { path: 'password', component: EditPasswordComponent },
          { path: 'fb', component: FacebookComponent}
        ]
      }
    ]
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
export class UserRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/