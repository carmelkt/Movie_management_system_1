import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthGuardGuard } from './au_th/auth-guard.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HeaderComponent } from './header/header.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { MovieStartComponent } from './movies/movie-start/movie-start.component';
import { MoviesResolverService } from './movies/movies-resolver.service';
import { MoviesComponent } from './movies/movies.component';

const appRoutes:Routes=[
    {path:'', redirectTo:'/auth/login',pathMatch:'full'},

    // {path:'header',component:HeaderComponent},

{path:'movies', component:MoviesComponent,resolve:[MoviesResolverService], children:[
    {path:'',component:MovieStartComponent},
    {path:'new',component:MovieEditComponent,canActivate:[AuthGuardGuard],data:{permittedRoles:['Admin']}},
    {path:':id', component:MovieDetailComponent, resolve:[MoviesResolverService]},
    {path:':id/edit', component:MovieEditComponent, resolve:[MoviesResolverService],canActivate:[AuthGuardGuard],data :{permittedRoles:['Admin']}}  
],canActivate:[AuthGuardGuard]},
//{path:'header',component:HeaderComponent,canActivate:[AuthGuardGuard]},
  {path:'forbidden',component:ForbiddenComponent},
  //{path:'adminpanel',component:AdminPanelComponent,canActivate:[AuthGuardGuard],data :{permittedRoles:['Admin']}},
{path:'auth',component:AuthComponent, children:[
    {path:'',component:LoginComponent},
    {path:'registration',component:RegistrationComponent},
    {path:'login',component:LoginComponent}
]}
];

@NgModule({
imports:[RouterModule.forRoot(appRoutes)],
exports:[RouterModule]
})

export class appRoutingModule{

}