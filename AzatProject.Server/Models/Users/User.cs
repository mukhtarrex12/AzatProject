using AzatProject.Server.Enums.Users;
using System.ComponentModel.DataAnnotations;

namespace AzatProject.Server.Models.Users
{
    public class User : BaseEntity<long>
    {
        [Required]
        [MaxLength(150)]
        public string FullName { get; set; }

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        public UserRole Role { get; set; } = UserRole.User;

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}