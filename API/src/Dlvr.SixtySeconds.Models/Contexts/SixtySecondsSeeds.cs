using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.Models.Contexts
{
    public static class SixtySecondsSeeds
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            SeedCountries(modelBuilder);
            SeedStates(modelBuilder);
            SeedRoles(modelBuilder);
            SeedBusinessUnit(modelBuilder);
            SeedUser(modelBuilder);
            SeedUserRole(modelBuilder);
        }

        public static void SeedCountries(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Country>().HasData(
                new Country() { Id = 1, Name = "Austrilia" },
                new Country() { Id = 2, Name = "Singapore" },
                new Country() { Id = 3, Name = "India" }
            );
        }

        public static void SeedStates(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<State>().HasData(
               new State() { Id = 1, CountryId = 1, Name = "Victoria" },
               new State() { Id = 2, CountryId = 2, Name = "Singapore" },
               new State() { Id = 3, CountryId = 3, Name = "Gujarat" },
               new State() { Id = 4, CountryId = 1, Name = "New South Wales" },
               new State() { Id = 5, CountryId = 1, Name = "Western Australia" }
           );
        }

        public static void SeedRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
              new Role() { Id = 1, Auth0RoleId = "rol_OgEP5bCa89sY17JG", Name = "Admin", CreatedOn = DateTime.UtcNow },
              new Role() { Id = 2, Auth0RoleId = "rol_LLTgQ3r0mHMyeH8b", Name = "Coach", CreatedOn = DateTime.UtcNow },
              new Role() { Id = 3, Auth0RoleId = "rol_v0AmlMLlkkbk5BI0", Name = "SalesPerson", CreatedOn = DateTime.UtcNow }
          );
        }

        public static void SeedBusinessUnit(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BusinessUnit>().HasData(
             new BusinessUnit()
             {
                 Id = 1,
                 CountryId = 1,
                 StateId = 1,
                 BrandName = "Sixty Seconds",
                 Email = "james@thedlvr.co",
                 ScriptFieldCollection = new List<BusinessUnit.ScriptField>()
                 {
                     new BusinessUnit.ScriptField()
                     {
                         Id = 1,
                         Index = 1,
                         Title = "Open Call",
                         Description = "Open Call"
                     },
                     new BusinessUnit.ScriptField(){
                         Id = 2,
                         Index = 2,
                         Title = "Features and Benifits",
                         Description = "Features and Benifits"
                     },
                     new BusinessUnit.ScriptField(){
                         Id = 3,
                         Index = 3,
                         Title = "Handle Objection",
                         Description = "Handle Objection"
                     },
                     new BusinessUnit.ScriptField(){
                         Id = 4,
                         Index = 4,
                         Title = "Close",
                         Description = "Close"
                     }
                 },
                 Name = "Sixty Seconds",
                 Terms = string.Empty,
                 CreatedOn = DateTime.UtcNow
             }
         );
        }


        public static void SeedUser(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
              new User()
              {
                  Id = 1,
                  Auth0Id = "",
                  FirstName = "Admin",
                  LastName = "",
                  Email = "james@thedlvr.co",
                  Phone = "",
                  CreatedOn = DateTime.UtcNow
              },
              new User()
              {
                  Id = 2,
                  Auth0Id = "auth0|5eac66d09721430be8d148bc",
                  FirstName = "Sales",
                  LastName = "Manager",
                  Email = "coach@thedlvr.co",
                  Phone = "1234567",
                  ReportTo = 1,
                  CreatedOn = DateTime.UtcNow
              },
              new User()
              {
                  Id = 3,
                  Auth0Id = "auth0|5e9a8226e6e7eb0bdfb35ddd",
                  FirstName = "Pavan",
                  LastName = "Welihinda",
                  Email = "pavan@thedlvr.co.in",
                  Phone = "1213456",
                  ReportTo = 2,
                  CreatedOn = DateTime.UtcNow
              }
          );
        }

        public static void SeedUserRole(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BusinessUnitUser>().HasData(
              new BusinessUnitUser() { BusinessUnitId = 1, UserId = 1, RoleId = 1 },
              new BusinessUnitUser() { BusinessUnitId = 1, UserId = 2, RoleId = 2 },
              new BusinessUnitUser() { BusinessUnitId = 1, UserId = 3, RoleId = 3 }
          );
        }
    }
}
