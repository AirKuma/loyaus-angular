import { NgModule }       from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';


import { MessageComponent }    from './message/message.component';
import { ThreadComponent }    from './thread.component';

import { MessageRoutingModule } from './message-routing.module';


import { MessageService }        from './message.service';



@NgModule({
  imports: [
    CommonModule,
    MessageRoutingModule,
    FormsModule
  ],
  declarations: [
    MessageComponent,
    ThreadComponent,
  ],
  providers: [
    MessageService
  ]
})
export class MessagenModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/