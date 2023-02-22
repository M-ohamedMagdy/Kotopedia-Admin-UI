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
  UpdatingForm:FormGroup;

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

      this.UpdatingForm = this.formBulider.group({
        title:['',[Validators.maxLength(20),Validators.minLength(3)]],
        category:[''],
        unitPrice:[''],
        description:[''],
        author:['',[Validators.maxLength(12),Validators.minLength(3)]],
        photo:[],
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
    this.selectedFile = <File>event.target.files[0];
  }

  //Add Product
  AddOne(){
    try {
    const fd = new FormData();
    fd.append('title',this.AddingForm.get('title')?.value);
    fd.append('category',this.AddingForm.get('category')?.value);
    fd.append('unitPrice',this.AddingForm.get('unitPrice')?.value);
    fd.append('description',this.AddingForm.get('description')?.value);
    fd.append('author',this.AddingForm.get('author')?.value);
    fd.append('photo',this.selectedFile,this.selectedFile.name);

    this.selectedFile = null;

    //console.log(fd);
    //console.log(this.AddingForm.value);


    this.prodServ.addNewProduct(fd).subscribe({
      next:res=>{
      this.prodServ.getAllProducts().subscribe(
        {
          next:(res)=>{
            this.Products=res;
          },
          error(err){console.log(err)}
        }
      )
    },error:err=>{
      console.log(fd);
    }
    })
    } catch (error) {
      console.log(error);
    }

    this.AddingForm.reset();
  }

  //Delete All Products
  deleteAll(){
    this.prodServ.deleteAllProducts().subscribe({
      next:res=>{
        console.log(res);
      },error:err=>{
        console.log(err)
      }
    })
    this.Products=[];

  }

  //Search By category
  getBooks(category:string){
    this.prodServ.getProductsByCategory(category).subscribe({
      next:res=>{
        console.log(res);
        this.Products = res;
      },error:err=>{
        console.log(err)
      }
    })
  }

  //Delete Book by Id
  deleteBookById(id:string){
    this.prodServ.deleteProductById(id).subscribe({
      next:res=>{
        console.log(res);
        this.prodServ.getAllProducts().subscribe({
          next:(res)=>{this.Products=res},
          error:(err)=>{console.log(err)}
        });
      },
      error:err=>{
        console.log(err);

      }
    })
        location.reload();
  }

  productID:any;

  updateBookInfo(book:any){
    this.productID = book._id;
    this.UpdatingForm = this.formBulider.group({
      title:[book.title, [Validators.maxLength(20),Validators.minLength(3)]],
      category:[book.category],
      unitPrice:[book.unitPrice],
      description:[book.description],
      author:[book.author,[Validators.maxLength(12),Validators.minLength(3)]],
      photo:[],
    })
  }

  updateOne(){
    try {
      const fd = new FormData();
      fd.append('id',this.productID);
      fd.append('title',this.UpdatingForm.get('title')?.value);
      fd.append('category',this.UpdatingForm.get('category')?.value);
      fd.append('unitPrice',this.UpdatingForm.get('unitPrice')?.value);
      fd.append('description',this.UpdatingForm.get('description')?.value);
      fd.append('author',this.UpdatingForm.get('author')?.value);

      if(this.selectedFile){
        fd.append('photo',this.selectedFile,this.selectedFile.name);
        this.selectedFile = null;
      }

      this.prodServ.updateProduct(fd).subscribe({
        next:res=>{
          this.prodServ.getAllProducts().subscribe(
            {
              next:(res)=>{
                console.log(res);
              },
              error(err){console.log(err)}
            }
          )
        console.log(res);
        // location.reload(); //not working here
        },
        error:err=>{
          console.log(fd);
        }})
      } catch (error) { console.log(error) }

  }

}
