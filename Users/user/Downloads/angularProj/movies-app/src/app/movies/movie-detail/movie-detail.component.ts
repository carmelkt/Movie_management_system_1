import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie:Movie;
  id:number;
  isAdmin=false;
  viewImage;
  viewImage2;

  constructor(private movieService:MovieService,
    private dsService:DataStorageService,
     private route:ActivatedRoute,
     private router:Router,
     private service:AuthService,
     private _sanitizer:DomSanitizer) { }

  ngOnInit() {        
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.movie=this.movieService.getMovie(this.id);
        this.viewImage=this._sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,'+this.movie.imagePath);
        this.viewImage2=this._sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,'+this.movie.imageUrl);
        if(localStorage.getItem('token')!=null){  
          if(this.service.roleMatch(['Admin'])){   
            this.isAdmin=true; 
          }
        }
      })
  }

  onEditMovie(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

  onDeleteMovie(){
    if(this.service.roleMatch(['Admin'])){
    this.dsService.deleteMovies(this.id);
    this.movieService.deleteMovie(this.id);
    
    this.router.navigate(['../movies']);}

    else this.router.navigate(['../forbidden']);
  }
}
