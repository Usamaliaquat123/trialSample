import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
/**
 * Generated class for the ItemListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-list',
  templateUrl: 'item-list.html'
})
export class ItemListComponent {
  productDatas: any;

  constructor( public ProductService: ProductServiceProvider, public alertController: AlertController) {
    this.ProductService.getProducts().then((data) => {
      this.productDatas = data;
    
    });
   
  }
  ionViewWillLoad(){
    this.ProductService.getProducts().then((data) => {
      this.productDatas = data;
  
    });
  }

  updateProduct(product){
    let prompt = this.alertController.create({
      title: 'Update',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'itemName',
          placeholder : 'Item Name'
        },{
          name : 'itemQty',
          placeholder : 'Item Quantity'
        },{
          name : 'brandName',
          placeholder : 'Brand Name'
        },{
          name : 'shippingDetails',
          placeholder : 'Shipping Address'
        }
      ],
      buttons: [
        {
          text: 'Update',
          handler: data => {
            this.ProductService.updateProducts({
              _id: product._id,
              _rev: product._rev,
              itemName : data.itemName,
              itemQty : data.itemQty,
              brandName : data.brandName,
              shippingDetails : data.shippingDetails
            });
          }
        }
      ]
    });
    prompt.present();
  }
  deleteProduct(product){
    this.ProductService.deleteProducts(product);
  }
}
