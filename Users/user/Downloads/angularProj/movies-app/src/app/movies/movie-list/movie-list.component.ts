import { Component,  OnDestroy,  OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit,  OnDestroy {
  isAdmin=false;

  movies:Movie[];
  subscription:Subscription;

  constructor(private movieService:MovieService,
    private router:Router,
    private route:ActivatedRoute,
    private dsService:DataStorageService,
    private service:AuthService) { }

  ngOnInit(): void {
    this.subscription=this.movieService.moviesChanged
    .subscribe(
      (movies:Movie[])=>{
        this.movies=movies;
      }
    );
    if(localStorage.getItem('token')!=null){
      if(this.service.roleMatch(['Admin'])){
        this.isAdmin=true;
      }}
    this.movies=this.movieService.getMovies();    
  }

  onNewMovie(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(){
    this.subscription.unsubscribe(); 
    this.isAdmin=false;
  }
}
