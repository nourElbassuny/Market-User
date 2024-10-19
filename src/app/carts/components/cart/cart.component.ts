import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { CartServiceService } from '../../services/cart-service.service';
import { fstat } from 'fs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private service:CartServiceService){}
  cartProducts:any[]=[];
  total:any=0;
  success:boolean=false;
  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts=JSON.parse(localStorage.getItem("cart")!);
    }
    this.getCartTotal();
  }
  getCartTotal(){
    this.total=0;
    for(let index in this.cartProducts){
      this.total+=(this.cartProducts[index].item.price*this.cartProducts[index].quantity);
    }
  }

addCart() {
  let products=this.cartProducts.map(item=>{
    return {productId:item.item.id,quantity:item.quantity}
  })
  let Model={
    userId:5,
    date:new Date(),
    products:products
  }
  this.service.createNewCart(Model).subscribe(res=>{
      this.success=true;
  })
}
deleteProduct(index: number) {
  this.cartProducts.splice(index,1);
  localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  this.getCartTotal();
}
minsAmount(index:number) {
  if(this.cartProducts[index].quantity>1){
  this.cartProducts[index].quantity--;
  this.getCartTotal();
  localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  }
  
} 
detectChange() {
  localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  this.getCartTotal();
}
addAmount(index:number) {
   this.cartProducts[index].quantity++;
   this.getCartTotal();
   localStorage.setItem("cart",JSON.stringify(this.cartProducts));
}
clearCart() {
  this.cartProducts=[];
  localStorage.setItem("cart",JSON.stringify(this.cartProducts));
  this.getCartTotal();
}

}
