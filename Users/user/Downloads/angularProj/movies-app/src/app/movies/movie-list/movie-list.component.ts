import { Component,  OnDestroy,  OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit,  OnDestroy {

  movies:Movie[];
  subscription:Subscription;

  constructor(private movieService:MovieService,
    private router:Router,
    private route:ActivatedRoute,
    private dsService:DataStorageService) { }

  ngOnInit(): void {
    this.subscription=this.movieService.moviesChanged
    .subscribe(
      (movies:Movie[])=>{
        this.movies=movies;
      }
    );
    this.movies=this.movieService.getMovies();
    
  }

  onNewMovie(){
this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(){
this.subscription.unsubscribe(); 
  }

  

}
