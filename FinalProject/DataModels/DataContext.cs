using DataModels.Entities;
using DataModels.Enums;
using DataModels.Utils;
using Microsoft.EntityFrameworkCore;

namespace DataModels
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().HasData(new User()
            {
                Id = 1,
                Name = "Admin",
                Username = "admin",
                Password = "admin123".Encode(),
                Role = Role.ADMIN
            });

            builder.Entity<DishRecipe>().HasKey(dr => new { dr.DishId, dr.MaterialId });
            builder.Entity<Order>().HasKey(o => new { o.BillId, o.DishId });
            builder.Entity<BookingOrder>().HasKey(o => new { o.BookingId, o.DishId });

            builder.Entity<DishPromotion>().HasKey(dp => new { dp.DishId, dp.PromotionId });
            builder.Entity<CustomerPromotion>().HasKey(cp => new { cp.CustomerId, cp.PromotionId });

            builder.Entity<Attachment>()
                .HasOne<Dish>(a => a.Dish)
                .WithOne(d => d.Attachment)
                .HasForeignKey<Dish>(d => d.AttachmentId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.Entity<Attachment>()
                .HasOne<Promotion>(a => a.Promotion)
                .WithOne(p => p.Attachment)
                .HasForeignKey<Promotion>(p => p.AttachmentId)
                .OnDelete(DeleteBehavior.SetNull);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Table> Tables { get; set; }

        public DbSet<Provider> Providers { get; set; }

        public DbSet<Material> Materials { get; set; }

        public DbSet<ReceiptMaterial> ReceiptMaterials { get; set; }

        public DbSet<DishCategory> DishCategories { get; set; }

        public DbSet<Dish> Dishes { get; set; }

        public DbSet<DishRecipe> DishRecipes { get; set; }

        public DbSet<Attachment> Attachments { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public DbSet<Booking> Bookings { get; set; }

        public DbSet<BookingOrder> BookingOrders { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Bill> Bills { get; set; }

        public DbSet<Promotion> Promotions { get; set; }

        public DbSet<DishPromotion> DishPromotions { get; set; }

        public DbSet<CustomerPromotion> CustomerPromotions { get; set; }

        public DbSet<PushNotifToken> PushNotifTokens { get; set; }
    }
}
