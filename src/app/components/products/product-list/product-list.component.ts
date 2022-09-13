import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product';

import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public products: Product[] = [];
  public deleteTrue: boolean = false;

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProducts();
    
  }

  async getProducts(){

    let productSub = await this.productService.getProducts().subscribe(
      res => {
        this.products = res;
      }
    )

    this.subscriptions.push(productSub);

  }
  

  delete(idProduct: any){
    this.productService.deleteProduct(idProduct).then(
      res => {
        this.deleteTrue = true;
      }
    );
  }

  async edit(product: Product){
    this.productService.selectedProduct = await Object.assign({}, product);
    
  }

}
