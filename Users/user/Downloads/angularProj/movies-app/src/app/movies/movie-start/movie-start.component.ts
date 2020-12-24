import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-movie-start',
  templateUrl: './movie-start.component.html',
  styleUrls: ['./movie-start.component.css']
})
export class MovieStartComponent implements OnInit {
userDetails;
  constructor(private service:AuthService) { }

  ngOnInit(){
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

}
