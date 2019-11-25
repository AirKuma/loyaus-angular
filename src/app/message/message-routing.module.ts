import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MessageComponent }    from './message/message.component';
import { ThreadComponent }    from './thread.component';

import { AuthGuard }  from '../common/auth-guard.service';


const messageRoutes: Routes = [
  {
    path: '',
    component: ThreadComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: ':id', component: MessageComponent },
          { path: '', component: MessageComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(messageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MessageRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/