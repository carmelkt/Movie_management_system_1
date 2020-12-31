using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;
namespace WebAPI.Models
{
    public class Actor
    {
        [Key]
        public int ActorID{get; set;}
        public string name{get; set;}
    }
}