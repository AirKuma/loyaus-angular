import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
//import { AuctionComponent } from './auction/auction/auction.component';
import { AppRoutingModule }     from './app-routing.module';

import { AuctionModule }     from './auction/auction.module';
import { AuthModule }     from './auth/auth.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

import { UserModule }     from './user/user.module';
import { CommentService }        from './common/comment.service';
import { UserAuctionModule }     from './user-auction/user-auction.module';
import { DatePipe } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService }        from './notification/notification.service';
import { ActivateComponent } from './activate/activate/activate.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard }  from './common/auth-guard.service';
import { GuestGuard }  from './common/guest-guard.service';
import { ActivateAccountComponent } from './activate/activate-account/activate-account.component';

import { ActivateService }    from './activate/activate.service';
import { MetaModule, MetaConfig } from 'ng2-meta';

import { MessagenModule }     from './message/message.module';
import { ForgetPasswordModule }     from './forgetpassword/forgetpassword.module';
import { PagerService } from './common/pager.service';

const metaConfig: MetaConfig = ({
  //Append a title suffix such as a site name to all titles
  //Defaults to false
  useTitleSuffix: true,
  defaults: {
    title: 'Loyaus',
  }
});

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotificationComponent,
    ActivateComponent,
    PageNotFoundComponent,
    ActivateAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AuctionModule,
    AuthModule,
    ReactiveFormsModule,
    UserModule,
    UserAuctionModule,
    MessagenModule,
    ForgetPasswordModule,
    MetaModule.forRoot(metaConfig)
  ],
  providers: [CommentService, DatePipe, NotificationService, AuthGuard, GuestGuard, ActivateService, Title, PagerService],
  bootstrap: [AppComponent],
})
export class AppModule { }

