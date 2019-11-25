import { NgModule }       from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';


import { EditPasswordComponent }    from './edit-password/edit-password.component';
import { EditProfileComponent }    from './edit-profile/edit-profile.component';
import { FacebookComponent }    from './facebook/facebook.component';

import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService }        from './user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditPasswordComponent,
    EditProfileComponent,
    FacebookComponent,
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/