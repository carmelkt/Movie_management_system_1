import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Injectable({providedIn:'root'})
export class MoviesResolverService implements Resolve<Movie[]>{
    constructor(private dsService:DataStorageService,
        private movieService:MovieService){

    }

    resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
const movies=this.movieService.getMovies();

if(movies.length==0){
    return this.dsService.fetchMovies();
} else{
    return movies;
}
       
    }

}