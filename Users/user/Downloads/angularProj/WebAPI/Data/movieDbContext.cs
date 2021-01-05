
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Data
{
    public class movieDbContext: DbContext
    {
        public movieDbContext(DbContextOptions<movieDbContext> options):base(options){}  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {           
            modelBuilder.Entity<MovieCast>().HasKey(x => new { x.ActorID, x.MovieID });
            base.OnModelCreating(modelBuilder);
        }
 


        public  DbSet<Movie> Movies {get; set;}
        public DbSet<MovieCast> MovieCasts{get; set;}
        public  DbSet<Actor> Actors {get; set;}

    }
    
}

   
