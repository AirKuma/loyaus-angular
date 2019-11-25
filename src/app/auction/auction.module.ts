import { NgModule }       from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';


import { AuctionComponent }    from './auction/auction.component';
import { AuctionListComponent }    from './auction/auction-list.component';

import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';

import { AuctionService }        from './auction.service';
import { AuctionCreateComponent } from './auction-create/auction-create.component';
import { AuctionEditComponent } from './auction-edit/auction-edit.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuctionRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuctionComponent,
    AuctionListComponent,
    AuctionDetailComponent,
    AuctionCreateComponent,
    AuctionEditComponent,
  ],
  providers: [
    AuctionService
  ]
})
export class AuctionModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/