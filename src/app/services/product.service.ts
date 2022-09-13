import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  selectedProduct: Product = new Product();

  constructor(private fireBase: AngularFirestore) { 
    
  }


  addProduct(product: Product){
    if(product.id == null){
      product.id = this.fireBase.createId();
    }
    return this.fireBase.collection('products').doc(product.id).set(Object.assign({},product));
  }

  getProducts(){
    return this.fireBase.collection<Product>('products').valueChanges();
  }

  updateProduct(product: Product) {
    return this.fireBase.doc('products/' + product.id).update(product);
  }

  deleteProduct(idProduct: string) {
    return this.fireBase.doc('products/' + idProduct).delete();
  }
}
