import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../sevices/product-service.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { ProductComponent } from "../product/product.component";
import { RouterLink } from '@angular/router';
import { ProductDetailsComponent } from "../product-details/product-details.component";


@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, ProductComponent, RouterLink, ProductDetailsComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {
  products:any[]=[];
  category:string[]=[];
  loading:boolean=true;
 
  constructor(private service:ProductServiceService){}
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
   

  getProducts(){
    this.loading=false;
    this.service.getAllProducts().subscribe((res:any)=>{
         this.products=res;
         this.loading=true;
        })
      }
  getCategories(){
    this.loading=false;
    this.service.getAllCategories().subscribe((res:any)=>{
      this.category=res;
      this.loading=true;
    })
  }
  filterCategory(event:any){
    let value=event.target.value;
    if(value=="all"){
      this.getProducts();
    } else{
      this.getProductsCategory(value);
    }
  }
  getProductsCategory(key:string){
    this.loading=false;
    this.service.getProductByCategory(key).subscribe((res:any)=>{
      this.products=res;
      this.loading=true;
    })
  }
  
}
