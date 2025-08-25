using AzatProject.Server.Data;

namespace AzatProject.Server.Services
{
    public class DbContextServiceBase
    {
        protected readonly AppDbContext _context;

        protected DbContextServiceBase(AppDbContext context)
        {
            _context = context;
        }
    }
}
