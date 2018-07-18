import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { Products } from './../../models/product';
import { DetailListPage } from './../../pages/detail-list/detail-list';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";
// custom validator seacrh from database
// import { ItemNameValidators } from "../../common/validators/ItemName.validators";
@Component({
  selector: 'create',
  templateUrl: 'create.html'
})
export class CreateComponent {
  // Validation forms
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  form = new FormGroup({
    'itemName' :  new FormControl('',[Validators.required,Validators.minLength(3)]),
    'itemQty' : new FormControl('',[Validators.required]),
    'brandName' : new FormControl('',[Validators.required,Validators.minLength(3)]),
    'shippingDetails' : new FormControl('',[Validators.required,Validators.minLength(3)])
  })
    get ItemName(){ return this.form.get('itemName') }
    get ItemQty(){ return this.form.get('itemQty') } 
    get BrandName(){ return this.form.get('brandName') } 
    get ShippingDetails(){ return this.form.get('shippingDetails') }  

  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  text: string;
  products = {} as Products;
  private db ;
  private persons;


  constructor(public NavCtrl : NavController, public ProductService: ProductServiceProvider) {
 
  } 

  ionViewDidLoad(){

  }   
    
  AddItem(){
    if(this.form.valid){
      try{
        this.ProductService.createProducts({  
          itemName : this.products.itemName,
          itemQty : this.products.itemQty,
          brandName : this.products.brandName,
          shippingDetails : this.products.shippingDetails
        })
        this.NavCtrl.push(DetailListPage);
      }catch(err){
        console.log(err);
      }
    }else{
      this.form.setErrors({
        invalidForm : true
      })
    }
   
  }

  goToList(){
    this.NavCtrl.push(DetailListPage);
  }
}
