using AzatProject.Server.Data;
using AzatProject.Server.Interfaces.Commands.Users;
using AzatProject.Server.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace AzatProject.Server.Services.Commands.Users
{
    public class UserCommandService : DbContextServiceBase, IUserCommandService
    {
        public UserCommandService(AppDbContext context) : base(context)
        {

        }

        public async Task<long> CreateUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user.Id;
        }

        public async Task DeleteUserAsync(long id)
        {
            if (id == 0)
            {
                throw new ArgumentNullException(nameof(id), "Переданный идентификатор оказался равен нулю!");
            }

            int affectedRows = await _context.Users
                .Where(x => x.Id == id)
                .ExecuteDeleteAsync();

            if (affectedRows == 0)
            {
                throw new InvalidOperationException($"Пользователь с Id={id} не найден, удаление не выполнено.");
            }
        }

        public async Task UpdateUserAsync(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (user.Id == 0)
            {
                throw new ArgumentException("Id пользователя не может быть равен 0", nameof(user));
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == user.Id);

            if (existingUser == null)
            {
                throw new InvalidOperationException($"Пользователь с Id={user.Id} не найден.");
            }

            existingUser.FullName = user.FullName;
            existingUser.Email = user.Email;
            existingUser.Role = user.Role;

            await _context.SaveChangesAsync();
        }
    }
}
