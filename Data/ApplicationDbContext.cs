using MatchPredictor.Model;
using Microsoft.EntityFrameworkCore;
namespace MatchPredictor.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Fighter> Fighters { get; set; }

    }
}
