using Microsoft.EntityFrameworkCore;
using PortalRowerowy.API.Models;

namespace PortalRowerowy.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserPhoto> UserPhotos { get; set; }
        public DbSet<Adventure> Adventures { get; set; }
        public DbSet<AdventurePhoto> AdventurePhotos { get; set; }
        public DbSet<SellBicycle> SellBicycles { get; set; }
        public DbSet<SellBicyclePhoto> SellBicyclePhotos { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<AdventureLike> AdventureLikes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Like>()
            .HasKey(k => new { k.UserLikesId, k.UserIsLikedId });

            builder.Entity<Like>()
            .HasOne(u => u.UserIsLiked)
            .WithMany(u => u.UserLikes)
            .HasForeignKey(u => u.UserIsLikedId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Like>()
            .HasOne(u => u.UserLikes)
            .WithMany(u => u.UserIsLiked)
            .HasForeignKey(u => u.UserLikesId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>().HasOne(u => u.Sender)
                                    .WithMany(m => m.MessagesSent)
                                    .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>().HasOne(u => u.Recipient)
                                     .WithMany(m => m.MessagesRecived)
                                     .OnDelete(DeleteBehavior.Restrict);



            builder.Entity<AdventureLike>()
            .HasKey(k => new { k.UserLikesAdventureId, k.AdventureIsLikedId });

            builder.Entity<AdventureLike>()
            .HasOne(u => u.AdventureIsLiked)
            .WithMany(u => u.UserLikesAdventure)
            .HasForeignKey(u => u.AdventureIsLikedId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<AdventureLike>()
            .HasOne(u => u.UserLikesAdventure)
            .WithMany(u => u.AdventureIsLiked)
            .HasForeignKey(u => u.UserLikesAdventureId)
            .OnDelete(DeleteBehavior.Restrict);


            // builder.Entity<AdventureLike>()
            // .HasKey(k => new { k.UserLikesAdventureId, k.AdventureIsLikedId });

            // builder.Entity<AdventureLike>()
            // .HasOne(u => u.AdventureIsLikedId)
            // .WithMany(u => u.UserLikesAdventureId)
            // .HasForeignKey(u => u.AdventureIsLikedId)
            // .OnDelete(DeleteBehavior.Restrict);

            // builder.Entity<AdventureLike>()
            // .HasOne(u => u.UserLikes)
            // .WithMany(u => u.UserIsLiked)
            // .HasForeignKey(u => u.UserLikesId)
            // .OnDelete(DeleteBehavior.Restrict);


        }

    }
}