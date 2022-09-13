import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productForm!: FormGroup;
  public products!: Product;



  constructor(public productService: ProductService, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    
    this.createForm();
    this.products = new Product();
  }

  createForm(){
    this.productForm = this.formBuilder.group({
      id: [this.products?.id || null],
      name: [this.products?.name || null],
      category: [this.products?.category || null],
      location: [this.products?.location || null],
      price: [this.products?.price || null]
    })
  }

  onSubmit(){
    if(this.productForm.value.id == null){
      console.log('crando');
      this.registerProduct();
    }else{
      console.log('actualizando');
      this.updateProduct();
    }
  }

  async registerProduct(){
    if(this.productForm.valid){
      this.products = this.productForm.value;

      await this.productService.addProduct(this.products).then(
        (res) => {
          this.resetForm(this.productForm);
        }
      ).catch(
        (err) =>{
          console.log("Error: " + err);
        }
      );
    }else{
      console.log("Ingrese todos los campos");
    }
  }

  async updateProduct(){
    if(this.productForm.valid){
      this.products = this.productForm.value;
      console.log(this.productForm.value.id);

      await this.productService.updateProduct(this.products).then(
        (res) => {
          this.resetForm(this.productForm);
        }
      ).catch(
        (err) =>{
          console.log("Error: " + err);
        }
      );
    }else{
      console.log("Ingrese todos los campos");
    }
  }


  resetForm(productForm: FormGroup){
    if (productForm.value != null) {
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }


}
