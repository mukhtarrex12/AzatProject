using AzatProject.Server.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace AzatProject.Server.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
    }
}
