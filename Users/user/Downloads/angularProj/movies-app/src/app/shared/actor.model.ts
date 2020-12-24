import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';

export class Actor{
    public name:string;
    public role:string;

    constructor(name:string,role:string){
        this.name=name;
        this.role=role;
    }
}