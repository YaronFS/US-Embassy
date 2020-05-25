using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace test.Models
{
    public partial class WeatherAppContext : DbContext
    {
        public WeatherAppContext()
        {
        }

        public WeatherAppContext(DbContextOptions<WeatherAppContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Locations> Locations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-075EH3S;Database=WeatherApp;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Locations>(entity =>
            {
                entity.HasKey(e => e.LocationId);

                entity.Property(e => e.LocationId)
                    .HasColumnName("locationId")
                    .ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(100);

                entity.Property(e => e.Temperature).HasColumnName("temperature");

                entity.Property(e => e.WeatherText)
                    .IsRequired()
                    .HasColumnName("weatherText")
                    .HasMaxLength(50);
            });
        }
    }
}
