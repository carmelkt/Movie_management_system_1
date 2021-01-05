import { Component,  Input, OnInit} from '@angular/core';
import { Movie } from '../../movie.model';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  viewImage;

  constructor(private _sanitizer:DomSanitizer){}

  @Input() movie:Movie;
  
  @Input() index:number;
  

  ngOnInit() {
     this.viewImage=this._sanitizer.bypassSecurityTrustResourceUrl('data:image;base64,'+this.movie.imagePath);
  }
}
