using AzatProject.Server.Models.Users;

namespace AzatProject.Server.Interfaces.Queries.Users
{
    /// <summary>
    /// Сервис для выполнения запросов (чтения) данных о пользователях.
    /// </summary>
    public interface IUserQueryService
    {
        /// <summary>
        /// Получить всех пользователей.
        /// </summary>
        Task<List<User>> GetAllUsersAsync(string? email = null, string? name = null);

        /// <summary>
        /// Получить пользователя по уникальному идентификатору.
        /// </summary>
        /// <param name="id">Идентификатор пользователя.</param>
        /// <returns>Пользователь или null, если не найден.</returns>
        Task<User?> GetUserByIdAsync(long id);
    }
}
