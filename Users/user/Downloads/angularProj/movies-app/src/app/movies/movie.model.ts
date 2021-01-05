import { Actor } from "../shared/actor.model";


export class Movie{
    public name:string;
    public description:string;
    public imagePath:string;
    public imageUrl:string;
    public actors:Actor[];
    public movieID:number;

    constructor(name:string, desc:string, imagePath:string, actors:Actor[],movieID:number,imageUrl:string){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.imageUrl=imageUrl;
        this.actors=actors;
        this.movieID=movieID;
    }
}