﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PortalRowerowy.API.Data;

namespace PortalRowerowy.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200123180956_ExtendedUser")]
    partial class ExtendedUser
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("PortalRowerowy.API.Models.Adventure", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<int>("Distance");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Adventures");
                });

            modelBuilder.Entity("PortalRowerowy.API.Models.AdventurePhoto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AdventureId");

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<bool>("IsMain");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("AdventureId");

                    b.ToTable("AdventurePhotos");
                });

            modelBuilder.Entity("PortalRowerowy.API.Models.SellBicycle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<int>("Price");

                    b.Property<string>("TypeBicycle");

                    b.Property<string>("Url");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("SellBicycles");
                });

            modelBuilder.Entity("PortalRowerowy.API.Models.SellBicyclePhoto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<bool>("IsMain");

                    b.Property<int?>("SellBicycleId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("SellBicycleId");

                    b.ToTable("SellBicyclePhotos");
                });

            modelBuilder.Entity("PortalRowerowy.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Bicycles");

                    b.Property<string>("City");

                    b.Property<string>("Country");

                    b.Property<DateTime>("Created");

                    b.Property<DateTime>("DateOfBirth");

                    b.Property<string>("Description");

                    b.Property<string>("DreamBicycle");

                    b.Property<string>("Gender");

                    b.Property<string>("Interests");

                    b.Property<DateTime>("LastActive");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Profession");

                    b.Property<string>("TypeBicycle");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PortalRowerowy.API.Models.UserPhoto", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("Description");

                    b.Property<bool>("IsMain");

                    b.Property<string>("Url");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserPhotos");
                });

            modelBuilder.Entity("PortalRowerowy.API.Models.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Values");
                });

            modelBuilder.Entity("PortalRowerowy.API.Models.Adventure", b =>
                {
                    b.HasOne("PortalRowerowy.API.Models.User")
                        .WithMany("Adventures")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("PortalRowerowy.API.Models.AdventurePhoto", b =>
                {
                    b.HasOne("PortalRowerowy.API.Models.Adventure")
                        .WithMany("AdventurePhotos")
                        .HasForeignKey("AdventureId");
                });

            modelBuilder.Entity("PortalRowerowy.API.Models.SellBicycle", b =>
                {
                    b.HasOne("PortalRowerowy.API.Models.User")
                        .WithMany("SellBicycles")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("PortalRowerowy.API.Models.SellBicyclePhoto", b =>
                {
                    b.HasOne("PortalRowerowy.API.Models.SellBicycle")
                        .WithMany("SellBicyclePhotos")
                        .HasForeignKey("SellBicycleId");
                });

            modelBuilder.Entity("PortalRowerowy.API.Models.UserPhoto", b =>
                {
                    b.HasOne("PortalRowerowy.API.Models.User")
                        .WithMany("UserPhotos")
                        .HasForeignKey("UserId");
                });
#pragma warning restore 612, 618
        }
    }
}
