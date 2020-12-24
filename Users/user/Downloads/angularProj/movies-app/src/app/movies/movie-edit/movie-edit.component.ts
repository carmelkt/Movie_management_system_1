import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  id:number;
  editMode=false;
  movieForm:FormGroup;


  constructor(private route :ActivatedRoute,
    private movieService:MovieService,
    private router:Router,
    private dsService:DataStorageService) { }

  ngOnInit(){
this.route.params.subscribe(
  (params:Params)=>{
    this.id=+params['id'];
    this.editMode=params['id'] !=null;
    this.initForm();
  }
);


  
}


  onSubmit(){
   if(this.editMode){
     this.movieService.updateMovie(this.id,this.movieForm.value);
   } else{
     this.movieService.addMovie(this.movieForm.value);
   }
   this.onCancel();
   this.dsService.storeMovies();
  }

//   onAddActor(){
//     (<FormArray>this.movieForm.get('actors')).push(
//       new FormGroup({
//         'name':new FormControl(null,Validators.required),
//         'role':new FormControl(null,Validators.required)
//       })
//     )
//   }

//   onDeleteActor(index:number){
// (<FormArray>this.movieForm.get('actors')).removeAt(index);
//   }

  onCancel(){
this.router.navigate(['../'],{relativeTo:this.route});
  }

  // saveData(){
  //   this.dsService.storeMovies();
  // }

  

  private initForm(){
let movieName='';
let movieImagePath='';
let movieDescription='';
let movieActors='';
let movieID=0;
//let movieActors=new FormArray([]);

if(this.editMode){
  const movie=this.movieService.getMovie(this.id);
  movieName=movie.name;
  movieImagePath=movie.imagePath;
  movieDescription=movie.description;
  movieActors=movie.actors;
  movieID=movie.id;
  
//  if(movie['actors']){
//     for(let actor of movie.actors){
//       movieActors.push(
//         new FormGroup({
//           'name':new FormControl(actor.name,Validators.required),
//           'role':new FormControl(actor.role,Validators.required)
//         })
//       );
//     }
//   }
}
    this.movieForm=new FormGroup({
      'name':new FormControl(movieName,Validators.required),
      'imagePath':new FormControl(movieImagePath,Validators.required),
      'description':new FormControl(movieDescription,Validators.required),
      'actors':new FormControl(movieActors,Validators.required),
      'id':new FormControl(movieID)
      //'actors':movieActors
    });
    

  }
  
  // get controls() { // a getter!
  //   return (<FormArray>this.movieForm.get('actors')).controls;
  // } 


}
