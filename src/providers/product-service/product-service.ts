import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PouchDB from "pouchdb";
@Injectable()
export class ProductServiceProvider {

  data : any;
  db : any;
  remote : any;
  constructor(public http: HttpClient) {
    this.db = new PouchDB('productmanagement');
    this.remote = 'http://localhost:5984/productmanagement';

    let options = {
      live : true,
      retry : true,
      continuous : true,
    }

    this.db.sync(this.remote,options);
  }


  getProducts(){
    if(this.data){
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {
      this.db.allDocs({include_docs : true}).then((result) =>{
        this.data = [];
        let docs = result.rows.map(row => {
          this.data.push(row.doc)
        });
        resolve(this.data);

        this.db.changes({live : true, since : 'now', include_docs : true}).on('change',(change) => { 
          this.handleChange(change);
        });
      }).catch(err => {
        console.log(err);
      })
    })
  }

  createProducts(product){
    this.db.post(product)
  }

  updateProducts(product){
    this.db.put(product).catch((err) => {
      console.log(err);
    });
  }

  deleteProducts(product){
    this.db.remove(product).catch((err) => {
      console.log(err);
    })
  }

  handleChange(change){
    let changedDocs = null;
    let changedIndex = null;

    this.data.forEach((doc,index) =>{
      if(doc._id === change.id){
        changedDocs = doc;
        changedIndex = index;
      }
    })
    // A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex,1);
    }else{
      // A document was updated
      if(changedDocs){
        this.data[changedIndex] = change.doc;
      }else{
        // A document was added
        this.data.push(change.doc);
      }
    }
  }


}
