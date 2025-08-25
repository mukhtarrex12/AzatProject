using AzatProject.Server.Interfaces.Commands.Users;
using AzatProject.Server.Interfaces.Queries.Users;
using AzatProject.Server.Models.Users;
using Microsoft.AspNetCore.Mvc;

namespace AzatProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserQueryService _queryService;
        private readonly IUserCommandService _commandService;

        public UsersController(
            IUserQueryService queryService,
            IUserCommandService commandService)
        {
            _queryService = queryService;
            _commandService = commandService;
        }

        /// <summary>
        /// Получить всех пользователей.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAll(string? email = null, string? name = null)
        {
            var users = await _queryService.GetAllUsersAsync(email, name);
            return Ok(users);
        }

        /// <summary>
        /// Получить пользователя по идентификатору.
        /// </summary>
        [HttpGet("{id:long}")]
        public async Task<ActionResult<User>> GetById(long id)
        {
            var user = await _queryService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        /// <summary>
        /// Создать пользователя.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<long>> Create([FromBody] User user)
        {
            var id = await _commandService.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        /// <summary>
        /// Обновить пользователя.
        /// </summary>
        [HttpPut("{id:long}")]
        public async Task<IActionResult> Update(long id, [FromBody] User user)
        {
            if (id != user.Id)
                return BadRequest("Id в URL и в теле должны совпадать.");
            await _commandService.UpdateUserAsync(user);
            return NoContent();
        }

        /// <summary>
        /// Удалить пользователя.
        /// </summary>
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete(long id)
        {
            await _commandService.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
