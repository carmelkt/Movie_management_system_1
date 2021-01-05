import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../movies/movie.service';
import { Movie } from '../movies/movie.model';
import {map,tap} from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class DataStorageService{

    constructor(private http:HttpClient,
        private movieService:MovieService){}

    deleteMovies(index:number){
        const movies=this.movieService.getMovies();
        const movie=movies[index];
        this.http.put('http://localhost:5000/api/movie/delete',movie).subscribe(
            response=>{
                console.log(response);
            }
        );
    }

    storeMovies(){     
        const movies=this.movieService.getMovies();
        for(let movieEl of movies){
            this.http.put('http://localhost:5000/api/movie/post2',movieEl).subscribe(    
            response=>{      
                console.log(response);   
            }
            );}
    }

    fetchMovies(){
       return this.http.get<Movie[]>('http://localhost:5000/api/movie')
        .pipe(map(movies=>{
            return movies.map(movie=>{
                return {...movie, actors:movie.actors?movie.actors:[]}//
            });
        }),
        tap(movies=>{
            this.movieService.setMovies(movies);
        })
        )}   
    }
