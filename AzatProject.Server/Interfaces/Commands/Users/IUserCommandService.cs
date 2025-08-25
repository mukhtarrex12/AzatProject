using AzatProject.Server.Models.Users;

namespace AzatProject.Server.Interfaces.Commands.Users
{
    /// <summary>
    /// Сервис для изменения данных о пользователях.
    /// </summary>
    public interface IUserCommandService
    {
        /// <summary>
        /// Создать пользователя.
        /// </summary>
        Task<long> CreateUserAsync(User user);

        /// <summary>
        /// Обновить пользователя.
        /// </summary>
        Task UpdateUserAsync(User user);

        /// <summary>
        /// Удалить пользователя.
        /// </summary>
        Task DeleteUserAsync(long id);
    }
}
