import { NgModule }       from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';


import { PasswordemailComponent }    from './passwordemail/passwordemail.component';
import { ResetspasswordComponent }    from './resetspassword/resetspassword.component';

import { ForgetPasswordRoutingModule } from './forgetpassword-routing.module';

import { ForgetpasswordService }        from './forgetpassword.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgetPasswordRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    PasswordemailComponent,
    ResetspasswordComponent,
  ],
  providers: [
    ForgetpasswordService
  ]
})
export class ForgetPasswordModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/