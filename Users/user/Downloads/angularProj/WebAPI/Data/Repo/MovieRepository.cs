using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Data.Repo
{
    public class MovieRepository : IMovieRepository
    {
        private readonly movieDbContext dc;
        public MovieRepository(movieDbContext dc)
        {
            this.dc=dc;
        }
        public void AddMovie(Movie movie)
        {
            dc.Movies.AddAsync(movie);
        }

        public void DeleteMovie(int MovieId)
        {
           var movie=dc.Movies.Find(MovieId);
           dc.Movies.Remove(movie);
        }

        public async Task<IEnumerable<Movie>> GetMoviesAsync()
        {
            return await dc.Movies.ToListAsync();
        }

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync()>0;
        }
    }
}