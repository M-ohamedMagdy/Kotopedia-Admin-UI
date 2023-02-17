import { ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Component, OnChanges ,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder } from '@angular/forms';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{

  AddingForm:FormGroup;

  category: any[] = [
    {value: 'crime', viewValue: 'Crime'},
    {value: 'romantic', viewValue: 'Romantic'},
    {value: 'fantasy' , viewValue: 'Fantasy' },
    {value: 'children', viewValue: 'Children'},
    {value: 'business', viewValue: 'Business'},
    {value: 'history' , viewValue: 'History' },
  ];

  constructor(private prodServ:ProductsService ,private formBulider:FormBuilder ,private http:HttpClient ){
      this.AddingForm = this.formBulider.group({
        title:['',[Validators.required,Validators.maxLength(20),Validators.minLength(3)]],
        category:[''],
        unitPrice:['',[Validators.required]],
        description:['',[Validators.required]],
        author:['',[Validators.required,Validators.maxLength(12),Validators.minLength(3)]],
        photo:[[],[Validators.required]],
      })
  }

  get titleValid(){
    return !this.AddingForm.controls['title'].value ? 'You must enter a value'
      : !this.AddingForm.controls['title'].valid ? 'Not a valid format' : '';
  }

  get authorValid(){
    return !this.AddingForm.controls['author'].value ? 'You must enter a value'
      : !this.AddingForm.controls['author'].valid ? 'Not a valid format' : '';
  }


  Products:any;
  ngOnInit(): void {
    this.prodServ.getAllProducts().subscribe(
      {
        next:(res)=>{
          this.Products = res;
          console.log(this.Products)
        },
        error(err){console.log(err)}
      }
    )
  }

  ngOnChanges(): void {}

  selectedFile:File|any =null ;

  getPhoto(event:any) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  AddOne(){
    try {
    const fd = new FormData();
    fd.append('title',this.AddingForm.get('title')?.value);
    fd.append('category',this.AddingForm.get('category')?.value);
    fd.append('unitPrice',this.AddingForm.get('unitPrice')?.value);
    fd.append('description',this.AddingForm.get('description')?.value);
    fd.append('author',this.AddingForm.get('author')?.value);
    fd.append('photo',this.selectedFile,this.selectedFile.name);
    console.log(fd);
    console.log(this.AddingForm.value);


    this.prodServ.addNewProduct(fd).subscribe({
      next:res=>{
      console.log(res);
      console.log(this.AddingForm.value);
      this.AddingForm.reset();
    },error:err=>{
      console.log(fd);
    }
    })

    } catch (error) {
      console.log(error);
    }

  }

  deleteAll(){
    this.prodServ.deleteAllProducts().subscribe({
      next:res=>{
        console.log('all products deleted successfully');
      },error:err=>{
        console.log(err)
      }
    })
  }
  del(){}
  edit(){}

}
  // allProducts:any;
  // emptyText = '';
  // newBook:any;



  // getBook(e:any){
  //   // this.newBook = e.target.value;
  //   // console.log(this.newBook);

  // }

  // fire(){
  //   // console.log(this.newBook);
  //   // console.log(typeof this.newBook);
  //   // console.log(JSON.parse(this.newBook));
  //   // console.log(typeof JSON.parse(this.newBook));
  // }

  // get(x:string){
  //   // this.newBook = JSON.parse(x);
  // }


// }
