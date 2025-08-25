using AzatProject.Server.Data;
using AzatProject.Server.Interfaces.Queries.Users;
using AzatProject.Server.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace AzatProject.Server.Services.Queries.Users
{
    public class UserQueryService : DbContextServiceBase, IUserQueryService
    {
        public UserQueryService(AppDbContext context) : base(context)
        {
        }

        public async Task<List<User>> GetAllUsersAsync(string? email = null, string? name = null)
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrEmpty(email))
                query = query.Where(u => u.Email.Contains(email));

            if (!string.IsNullOrEmpty(name))
                query = query.Where(u => u.FullName.Contains(name));

            return await query.AsNoTracking().ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(long id)
        {
            return await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}
