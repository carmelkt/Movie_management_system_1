

export class Movie{
    public name:string;
    public description:string;
    public imagePath:string;
    public actors:string;
    public id:number;

    constructor(name:string, desc:string, imagePath:string, actors:string,id:number){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.actors=actors;
        this.id=id;
    }
}