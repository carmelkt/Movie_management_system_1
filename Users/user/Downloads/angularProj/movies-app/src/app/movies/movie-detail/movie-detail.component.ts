import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie:Movie;
  id:number;

  constructor(private movieService:MovieService,
    private dsService:DataStorageService,
     private route:ActivatedRoute,
     private router:Router,
     private service:AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
this.id=+params['id'];
this.movie=this.movieService.getMovie(this.id);
      }
    )
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
