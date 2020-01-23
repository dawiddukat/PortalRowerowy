using Microsoft.EntityFrameworkCore;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserPhoto> UserPhotos { get; set; }
        public DbSet<Adventure> Adventures { get; set; }
        public DbSet<AdventurePhoto> AdventurePhotos { get; set; }
        public DbSet<SellBicycle> SellBicycles { get; set; }
        public DbSet<SellBicyclePhoto> SellBicyclePhotos { get; set; }
    }
}