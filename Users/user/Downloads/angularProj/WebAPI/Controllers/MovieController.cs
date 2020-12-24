using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Data;
using WebAPI.Data.Repo;

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
        public async Task<IActionResult> getMovies()
        {
            //return new string[]{"KalyanaRaman","Vettam","Shutter Island"};
            var movies= await repo.GetMoviesAsync();
            
            return Ok(movies);
        }

        [HttpPut("post")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> AddMovie(Movie movie)
        {
             var x=movie.ID;
             if(x!=0)
            { Movie us = dc.Movies.Where(temp => temp.ID == x).FirstOrDefault();
            //return new string[]{"KalyanaRaman","Vettam","Shutter Island"};
           //var movie1 = Newtonsoft.Json.JsonConvert.DeserializeObject<Movie>(movie);
           //JObject json = JObject.Parse(movie);
           us.name=movie.name;
           us.imagePath=movie.imagePath;
           us.description=movie.description;
           us.actors=movie.actors;
            
            await repo.SaveAsync();
            return StatusCode(201);}
            else
            {
                repo.AddMovie(movie);
            await repo.SaveAsync();
            return StatusCode(201);
            }

            
        }

        [HttpPut("delete")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> DeleteMovie(Movie movie)
        {
            repo.DeleteMovie(movie.ID);
            await repo.SaveAsync();
            return Ok(movie.ID);
        }     
    }
}