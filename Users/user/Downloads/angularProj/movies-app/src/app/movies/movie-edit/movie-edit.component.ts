import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { MovieService } from '../movie.service';
import {saveAs} from 'file-saver';
import * as FileSaver from 'file-saver';
import {DomSanitizer} from '@angular/platform-browser';
import { Movie } from '../movie.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  id:number;
  editMode=false;
  movieForm:FormGroup;
  imagePath:string;
  viewImage:string;
  viewImageFile;
  movies:Movie[];
  movieExist=false;



  constructor(private route :ActivatedRoute,
    private movieService:MovieService,
    private router:Router,
    private dsService:DataStorageService,
    private _sanitizer:DomSanitizer,
    private toastr: ToastrService,) { }

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
    const movie=this.movieService.getMovie(this.id);
    
    if(this.movieForm.get('imagePath').value==null)
    {this.movieForm.patchValue({"imagePath":movie.imagePath});}
     this.movieService.updateMovie(this.id,this.movieForm.value);
   } else{
    this.movies=this.movieService.getMovies();
    this.movies.forEach(movi=> {
      if(this.movieForm.get('name').value==movi.name)
      {
        this.movieExist=true;
        this.toastr.error('Go to edit movie','Movie Exists');
      }
    });
    if(!this.movieExist)
    {
     this.movieService.addMovie(this.movieForm.value);
    }
   }
   this.onCancel();
   this.dsService.storeMovies();
  }

  onAddActor(){
    (<FormArray>this.movieForm.get('actors')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'role':new FormControl(null,Validators.required)
      })
    )
  }

  onDeleteActor(index:number){
(<FormArray>this.movieForm.get('actors')).removeAt(index);
  }

  onCancel(){
this.router.navigate(['../'],{relativeTo:this.route});
  }

  // saveData(){
  //   this.dsService.storeMovies();
  // }

  

  private initForm(){
let movieName='';
let movieImagePath;
// let movieImagePath=this.imagePath;
let movieDescription='';
// let movieActors='';
let movieID=0;
let movieActors=new FormArray([]);

if(this.editMode){
  const movie=this.movieService.getMovie(this.id);
  movieName=movie.name;
  this.viewImageFile=this._sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,'+movie.imagePath);
  // movieImagePath=movie.imagePath;
  this.viewImageFile=this._sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,'+movie.imagePath);
  movieImagePath=this.imagePath;
  // movieImagePath=this.imagePath;
  // movieImagePath=this.viewImageFile;
  movieDescription=movie.description;
  // movieActors=movie.actors;
  movieID=movie.movieID;
  
 if(movie['actors']){
    for(let actor of movie.actors){
      movieActors.push(
        new FormGroup({
          'name':new FormControl(actor.name,Validators.required),
          'role':new FormControl(actor.role,Validators.required)
        })
      );
    }
  }
}
    this.movieForm=new FormGroup({
      'name':new FormControl(movieName,Validators.required),
      // 'imagePath':new FormControl(movieImagePath,Validators.required),
      'imagePath':new FormControl(movieImagePath),
      'description':new FormControl(movieDescription,Validators.required),
      // 'actors':new FormControl(movieActors,Validators.required),
      'movieID':new FormControl(movieID),
      'actors':movieActors
    });
    

  }
  
  get controls() { // a getter!
    return (<FormArray>this.movieForm.get('actors')).controls;
  } 

  selectFile(event){
    
    const file = (event.target as HTMLInputElement).files[0];
    // this.movieForm.patchValue({
    //   imagex:file
    // });
    this.movieForm.get('imagePath').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    
    
    
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.viewImage=reader.result as string;
this.viewImageFile=reader.result;
      // this.imagePath=reader.result.toString().split(',')[1];
      this.imagePath=reader.result.toString().split(',')[1];
      // this.imagePath = reader.result as string;
      console.log(this.imagePath);
      
      this.movieForm.controls['imagePath'].setValue(
        this.imagePath
      );
    }
    
      }
    }
  



