import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail-list',
  templateUrl: 'detail-list.html',
})
export class DetailListPage {
 data : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
 
  }

  ionViewDidLoad() {
  
  }

}
