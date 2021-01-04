
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Data
{
    public class movieDbContext: DbContext
    {
        public movieDbContext(DbContextOptions<movieDbContext> options):base(options){}   
        
        public  DbSet<Movie> Movies {get; set;}
        
    }
    
}

   
