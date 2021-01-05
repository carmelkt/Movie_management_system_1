using System.Threading.Tasks;
using System.Collections.Generic;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public interface IMovieRepository
    {
        Task<IEnumerable<Movie>> GetMoviesAsync();

        void AddMovie(Movie movie);

        void DeleteMovie(int MovieId);

        Task<bool> SaveAsync();
         
    }
}