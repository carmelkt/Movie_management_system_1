import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})

export class HeaderComponent implements OnInit{
userDetails;

constructor(private dsService:DataStorageService, private router:Router, private service:AuthService){

}

ngOnInit() {
    if(localStorage.getItem('token')!=null){
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );}
  }

onSaveData(){
this.dsService.storeMovies();
}

onFetchData(){
    this.dsService.fetchMovies().subscribe()
}

onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
   
}