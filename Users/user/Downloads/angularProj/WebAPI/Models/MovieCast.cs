using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class MovieCast
    {
        [Key]
        public int ActorID { get; set; }
        [Key] 
        public int MovieID { get; set; }
        [ForeignKey("ActorID")]
        public Actor Actor { get; set; }
        [ForeignKey("MovieID")]
        public Movie Movie { get; set; }
        public string role { get; set; }
               
    }
}