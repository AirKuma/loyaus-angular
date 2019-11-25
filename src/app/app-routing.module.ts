import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }    from './home/home.component';
import { NotificationComponent }    from './notification/notification.component';
import { ActivateComponent }    from './activate/activate/activate.component';
import { ActivateAccountComponent }    from './activate/activate-account/activate-account.component';

import { GuestGuard }  from './common/guest-guard.service';
import { AuthGuard }  from './common/auth-guard.service';

import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';
import { AuctionDetailComponent }    from './auction/auction-detail/auction-detail.component';
import { AuctionCreateComponent }    from './auction/auction-create/auction-create.component';
import { AuctionEditComponent }    from './auction/auction-edit/auction-edit.component';

const appRoutes: Routes = [
  // {
  //     path: '',
  //     redirectTo: '/',
  //     pathMatch: 'full'
  // },
  { 
    path: ':college/auction/:type',  
    loadChildren: 'app/auction/auction.module#AuctionModule',
  },
  { 
    path: 'auth',  
    loadChildren: 'app/auth/auth.module#AuthModule',
  },
  { 
    path: 'password',  
    loadChildren: 'app/forgetpassword/forgetpassword.module#ForgetPasswordModule',
  },
  { 
    path: 'message',  
    loadChildren: 'app/message/message.module#MessagenModule',
  },
  { 
    path: 'account',  
    loadChildren: 'app/user/user.module#UserModule',
  },
  { 
    path: 'auction',  
    loadChildren: 'app/user-auction/user-auction.module#UserAuctionModule',
  },
  { path: 'auction/:type/item/:id', 
    component: AuctionDetailComponent
  },
  { 
      path: 'auction/:type/create', 
      component: AuctionCreateComponent,
      canActivate: [AuthGuard],
      canLoad: [AuthGuard], 
  },
  { 
      path: 'auction/:type/edit/:id', 
      component: AuctionEditComponent,
      canActivate: [AuthGuard],
      canLoad: [AuthGuard],  
  },
  { 
      path: '', 
      component: HomeComponent,
      canActivate: [GuestGuard], 
      canLoad: [GuestGuard],
  },
  { 
      path: 'notifications', 
      component: NotificationComponent, 
      canActivate: [AuthGuard],
      canLoad: [AuthGuard],
  },
  { 
      path: 'activate', 
      component: ActivateComponent,
      canActivate: [AuthGuard],
      canLoad: [AuthGuard], 
  },
  { 
      path: 'activate/:code', 
      component: ActivateAccountComponent,
  },
  { path: '**', component: PageNotFoundComponent },
  //{ path: '**', redirectTo: '404' }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/