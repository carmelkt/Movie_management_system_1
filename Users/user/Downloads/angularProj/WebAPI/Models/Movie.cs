using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;
namespace WebAPI.Models
{
    public class Movie
    {[Key]
       public int MovieID { get; set; }

        public string name{get; set;}

        public string description{get; set;}

        public string imagePath{get; set;}

        public string imageUrl{get;set;}

         public List<MovieCast> MovieCasts{get; set;}
    }
}