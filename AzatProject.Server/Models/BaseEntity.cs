using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AzatProject.Server.Models
{
    /// <summary>
    /// Базовая сущность с автоинкрементным идентификатором.
    /// </summary>
    public abstract class BaseEntity<TKey>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public required TKey Id { get; set; }
    }
}
