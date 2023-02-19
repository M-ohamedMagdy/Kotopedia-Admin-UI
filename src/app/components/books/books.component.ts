import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{

  constructor(private prodServ:ProductsService){}

  allProducts:any;
  emptyText = '';
  newBook:any;

  ngOnInit(): void {
    this.prodServ.getAllProducts().subscribe({
      next:(res)=>{this.allProducts=res; console.log(this.allProducts);},
      error:(error)=>{console.log(error);}
    })
  }

  getBook(e:any){
    this.newBook = e.target.value;
    console.log(this.newBook);

  }

  fire(){
    console.log(this.newBook);
    console.log(typeof this.newBook);
    console.log(JSON.parse(this.newBook));
    console.log(typeof JSON.parse(this.newBook));
  }

  get(x:string){
    this.newBook = JSON.parse(x);
  }

del(){

}

edit(){

}
}
