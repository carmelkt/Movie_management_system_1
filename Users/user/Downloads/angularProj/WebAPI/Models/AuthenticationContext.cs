using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class AuthenticationContext:IdentityDbContext
    {
        public AuthenticationContext(DbContextOptions options):base(options){ }
        public DbSet<ApplicationUser> ApplicationUsers{get; set;}        
    }
}
