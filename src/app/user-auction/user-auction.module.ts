import { NgModule }       from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';


import { UserAuctionListComponent }    from './user-auction-list/user-auction-list.component';

import { UserAuctionComponent } from './user-auction.component';
import { UserAuctionRoutingModule } from './user-auction-routing.module';

import { UserAuctionService }    from './user-auction.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserAuctionRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserAuctionListComponent,
    UserAuctionComponent
  ],
  providers: [
    UserAuctionService
  ]
})
export class UserAuctionModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/