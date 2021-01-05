using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.ComponentModel.Design;
using System.ComponentModel;
using System.Web;
using System.Net;
using System.IO.MemoryMappedFiles;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Data;
using WebAPI.Data.Repo;
using System.Drawing;
using System.Text;
using System.Drawing.Design;
using System.Drawing.Drawing2D;
using System.Drawing.Printing;
using System.Drawing.Text;
using System.IO.IsolatedStorage;
using System.Drawing.Imaging;
using System.Windows.Input;
using System.Drawing.Configuration;
using AutoMapper;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        
        private readonly movieDbContext dc;
        private readonly IMovieRepository repo;
    
        public MovieController(movieDbContext dc, IMovieRepository repo)
        {
            this.repo=repo;
            this.dc=dc;
        }
    
        [HttpGet]
        [Authorize(Roles = "Admin,AppUser")]
        public IActionResult getMovies()
        {       
            List<MovieFullModel> allMovies = new List<MovieFullModel>();         
            var movies=GetMovies();
            var actors=GetActors();
            var moviecasts=dc.MovieCasts.ToList();
            foreach(var movie in movies)
            {MovieFullModel movieFull=new MovieFullModel();
            
                movieFull.MovieID=movie.MovieID;
                movieFull.name=movie.name;
                movieFull.imagePath=movie.imagePath;
                //get byte64 from image path
                     string folderPath=movie.imageUrl;
                     string fileName=movie.name;
                     var files=Directory.GetFiles(@"C:\Users\user\Downloads\angularProj\WebAPI\Data\MoviePoster");
                     var dataContent=string.Empty;
                     
                     foreach(var file in files)
                     {
                         if(Path.GetFileNameWithoutExtension(file)==fileName){
                             byte[] datas=System.IO.File.ReadAllBytes(file);
                             dataContent=Convert.ToBase64String(datas);
                             movie.imageUrl=dataContent;
                             break;
                         }                         
                     }
                     
                movieFull.imageUrl=movie.imageUrl;
                movieFull.description=movie.description;
                int mid=movie.MovieID;
                var mc=moviecasts.Where(x=>x.MovieID==mid).ToArray();
                List<ActorFullModel> allActors = new List<ActorFullModel>();
                foreach(var actor in mc)
                {
                    ActorFullModel actorFull=new ActorFullModel();
                    actorFull.ActorID=actor.ActorID;
                    actorFull.role=actor.role;
                    var act=dc.Actors.Where(x=>x.ActorID==actor.ActorID).FirstOrDefault();
                    actorFull.name=act.name;
                    allActors.Add(actorFull);                 
                }
                movieFull.actors=allActors.ToArray();
                allMovies.Add(movieFull);
            }
            return Ok(allMovies);
        }

        private List<Movie> GetMovies()
        {
            return(dc.Movies.ToList());
        }

        private List<Actor> GetActors()
        {
            return(dc.Actors.ToList());
        }

         
        [HttpPut("post2")]
        [Authorize(Roles ="Admin")]
        public  IActionResult AddMovie2(MovieFullModel movie)
        {
            Movie us=new Movie();            
            MovieCast mc=new MovieCast();
            //convert and store image
            if(movie.imageUrl!=null){
            byte[] imgBytes=Convert.FromBase64String(movie.imageUrl);
            using(var ms=new MemoryStream(imgBytes,0,imgBytes.Length))
            {
                Image image=Image.FromStream(ms,true);
                string folderPath="Data\\MoviePoster\\"+movie.name+".jpg";
                System.IO.File.WriteAllBytes(folderPath,imgBytes);
                movie.imageUrl=folderPath;
            }
            }


            foreach(var actor in movie.actors){
                checkactor(actor.name);
            }
            checkmovie(movie.name,movie.imagePath,movie.description,movie.MovieID,movie.imageUrl);

            Movie value=dc.Movies.Where(x=>x.name==movie.name).FirstOrDefault();
            List<MovieCast> del=dc.MovieCasts.Where(x=>x.MovieID==value.MovieID).ToList();
             foreach(var movi in del)
             {
                 dc.MovieCasts.Remove(movi);
                 dc.SaveChanges();
             }
            
            foreach(var actor in movie.actors){
                checkmoviecast(movie.name,actor.name,actor.role);
            }         
            return Ok(movie);
        }
        

        private void checkactor(string actorname)
             {
                var value=dc.Actors.Where(x=>x.name==actorname).FirstOrDefault();
                if(value==null)
                {
                  dc.Actors.Add(new Actor(){name=actorname});
                  dc.SaveChanges();
                }
             }
         
         private void checkmovie(string moviename,string imagepath,string description,int mid,string imageUrl)
             {
                 Movie value=dc.Movies.Where(x=>x.name==moviename).FirstOrDefault();
                 if(value==null)
                 {
                     dc.Movies.Add(new Movie(){name=moviename,imagePath=imagepath,description=description,imageUrl=imageUrl});
                     dc.SaveChanges();}
                 else{
                     value.description=description;
                     value.imagePath=imagepath;             
                     dc.SaveChanges();
                     }
             }
         
         private void checkmoviecast(string moviename,string actorname, string role)
         {
             Movie value=dc.Movies.Where(x=>x.name==moviename).FirstOrDefault();
             Actor value2=dc.Actors.Where(x=>x.name==actorname).FirstOrDefault();
             MovieCast value3=dc.MovieCasts.Where(x=>x.ActorID==value2.ActorID&&x.MovieID==value.MovieID).FirstOrDefault();
             if(value!=null&&value2!=null&&value3==null)
             {
                 int mid=value.MovieID;
                 int aid=value2.ActorID;
                 dc.MovieCasts.Add(new MovieCast(){MovieID=mid,ActorID=aid,role=role});
                 dc.SaveChanges();
             }
             else if(value!=null&&value2!=null&&value3!=null)
             {
                 value3.role=role;
                 dc.SaveChanges();
             }
         }


        [HttpPut("delete")]
        [Authorize(Roles ="Admin")]
        public  IActionResult DeleteMovie(Movie movie)
        {
           var moviez=dc.Movies.Find(movie.MovieID);
           dc.Movies.Remove(moviez);
           dc.SaveChangesAsync();
           return Ok(movie.MovieID);
        }     
    }
}