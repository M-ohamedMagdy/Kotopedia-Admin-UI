import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {

  loader=true;

  ngOnInit(): void {
    setTimeout(() => { this.loader=false;  }, 3000);
  }

  logout(){
    location.replace("http://localhost:4201/home"); 
  }



}
