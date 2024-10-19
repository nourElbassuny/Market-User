import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../sevices/product-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  id!:any;
  data:any={};
  cartProducts:any[]=[];
  amount:number=1;


  constructor(private route:ActivatedRoute,private service:ProductServiceService){
      this.id=this.route.snapshot.paramMap.get("id");
  }
  ngOnInit(): void {
   this.getProduct();
  }

getProduct(){
  this.service.getProductById(this.id).subscribe((res:any)=>{
    this.data=res;
  })
}

addToCart(event:any){
  if("cart" in localStorage){
    this.cartProducts=JSON.parse(localStorage.getItem("cart")!);
    let exist=this.cartProducts.find(item=> item.item.id==event.id);
    if(exist){
      alert("product is already in your cart")
    }else{
    this.cartProducts.push({item:event,quantity:this.amount});
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
    }
  }else{
    this.cartProducts.push({item:event,quantity:this.amount});
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  }
}

}
