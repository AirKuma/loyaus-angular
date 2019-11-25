import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAuctionListComponent }    from './user-auction-list/user-auction-list.component';

import { UserAuctionComponent } from './user-auction.component';

import { AuthGuard }  from '../common/auth-guard.service';


const userAuctionRoutes: Routes = [
  {
    path: '',
    component: UserAuctionComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', redirectTo: 'bid/admin'},
          { path: ':type/admin', component: UserAuctionListComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userAuctionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserAuctionRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/