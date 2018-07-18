
import { DetailListPage } from './../pages/detail-list/detail-list';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// Compoents
import { CreateComponent } from '../components/create/create';
import { ItemListComponent } from "../components/item-list/item-list";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductServiceProvider } from '../providers/product-service/product-service';
// Importing HTTP modules
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailListPage,
    CreateComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailListPage,
    CreateComponent,
    ItemListComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductServiceProvider
  ]
})
export class AppModule {}
