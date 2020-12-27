import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // isLoggedIn=false;
  // constructor(private service:AuthService){

  // }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
    // this.isLoggedIn=!this.isLoggedIn;
    // window.location.reload();
    }
  }
} 
