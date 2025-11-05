using Microsoft.EntityFrameworkCore;

namespace StudentManagement.DataModels
{
    public class StudentAdminContext: DbContext
    {
        public StudentAdminContext(DbContextOptions<StudentAdminContext> options) : base(options)
        {
        }

        public DbSet<Student> Student { get; set; }
        public DbSet<Gender> Gender { get; set; }
        public DbSet<Address> Address { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Gender>().HasData(
                new Gender { Id = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa8"), Description = "Erkek" },
                new Gender { Id = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa7"), Description = "Kadın" }
            );
        }
    }

    
}


