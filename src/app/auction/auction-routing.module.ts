import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuctionComponent }    from './auction/auction.component';
import { AuctionListComponent }    from './auction/auction-list.component';


import { AuthGuard }  from '../common/auth-guard.service';


const auctionRoutes: Routes = [
  {
    path: '',
    component: AuctionComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: ':category', component: AuctionListComponent },
          { path: '', component: AuctionListComponent}
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
export class AuctionRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/