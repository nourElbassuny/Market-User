import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) { }
  getAllProducts(){
    return this.http.get("https://fakestoreapi.com/products");
  }
  getAllCategories(){
    return this.http.get("https://fakestoreapi.com/products/categories");
  }

  getProductByCategory(key:any){
    return this.http.get("https://fakestoreapi.com/products/category/"+key);
  }
  getProductById(id:any){
    return this.http.get("https://fakestoreapi.com/products/"+id);
  }

}
