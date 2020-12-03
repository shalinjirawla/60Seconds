using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.Models.Contexts
{
    public class SixtySecondsDbContext : DbContext
    {
        public SixtySecondsDbContext(DbContextOptions<SixtySecondsDbContext> options) : base(options)
        {
        }

        public DbSet<BusinessUnit> BusinessUnits { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<BusinessUnitUser> BusinessUnitUsers { get; set; }
        public DbSet<UserSession> UserSessions { get; set; }
        public DbSet<BusinessUnitKeyword> BusinessUnitKeywords { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<NotificationUser> NotificationUsers { get; set; }
        public DbSet<UserDeviceToken> UserDeviceTokens { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<Scenario> Scenarios { get; set; }
        public DbSet<ScenarioKeyword> ScenarioKeywords { get; set; }
        public DbSet<Script> Scripts { get; set; }
        public DbSet<ScriptContent> ScriptContents { get; set; }
        public DbSet<AudioRehearsal> AudioRehearsals { get; set; }
        public DbSet<VideoRehearsal> VideoRehearsals { get; set; }
        public DbSet<Task> Tasks { get; set; }
        public DbSet<TaskAssignment> TaskAssignments { get; set; }
        public DbSet<TaskAssignmentAction> TaskAssignmentActions { get; set; }
        public DbSet<TaskAssignmentFeedback> TaskAssignmentFeedbacks { get; set; }
        public DbSet<TaskAssignmentComment> TaskAssignmentComments { get; set; }
        public DbSet<TaskAssignmentCommentTags> TaskAssignmentCommentTags { get; set; }
        public DbSet<TaskAssignmentLike> TaskAssignmentLikes { get; set; }
        public DbSet<TaskAssignmentShare> TaskAssignmentShares { get; set; }
        public DbSet<UserTokenDetail> UserTokenDetails { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BusinessUnitUser>().HasKey(t => new { t.BusinessUnitId, t.UserId, t.RoleId });
            modelBuilder.Entity<BusinessUnitUser>().HasOne(t => t.BusinessUnit).WithMany(t=> t.Users).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<BusinessUnitUser>().HasOne(t => t.User).WithMany(t=> t.Roles).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<BusinessUnitUser>().HasOne(t => t.Role).WithMany( t=> t.Users).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>().HasOne(u => u.CreatedByUser).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<User>().HasOne(u => u.UpdatedByUser).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<User>().HasOne(u => u.DeletedByUser).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<User>().HasOne(u => u.ReportToUser).WithMany().OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<NotificationUser>().HasKey(t => new { t.BusinessUnitId, t.UserId, t.NotificationId });
            modelBuilder.Entity<NotificationUser>().HasOne(t => t.BusinessUnit).WithMany(t=> t.Notifications).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<NotificationUser>().HasOne(t => t.User).WithMany(t=> t.Notifications).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<NotificationUser>().HasOne(t => t.Notification).WithMany(t=> t.Users).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ScenarioKeyword>().HasKey(t=> t.Id);
            modelBuilder.Entity<ScenarioKeyword>().HasOne(sk => sk.Scenario).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Script>().HasOne(t => t.Task).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Scenario>().HasOne(t => t.Task).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignment>().HasOne(t => t.Script).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignment>().HasOne(t => t.Scenario).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignment>().HasOne(t => t.Task).WithMany(t => t.TaskAssignments).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Script>().HasOne(bu => bu.Scenario).WithOne().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Script>().HasOne(bu => bu.Scenario).WithOne().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignment>().HasOne(bu => bu.User).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<AudioRehearsal>().HasOne(a => a.TaskAssignment).WithMany(t => t.AudioRehearsals).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<VideoRehearsal>().HasOne(v => v.TaskAssignment).WithMany(t => t.VideoRehearsals).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignmentAction>().HasOne(ta => ta.TaskAssignment).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignmentFeedback>().HasOne(ta => ta.TaskAssignment).WithMany(t=>t.TaskAssignmentFeedbacks).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignmentComment>().HasOne(ta => ta.TaskAssignment).WithMany(t=>t.TaskAssignmentComments).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignmentLike>().HasOne(ta => ta.TaskAssignment).WithMany(t=>t.TaskAssignmentLikes).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignmentShare>().HasOne(ta => ta.TaskAssignment).WithMany(t=>t.TaskAssignmentShares).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignmentShare>().HasOne(ta => ta.User).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TaskAssignmentAction>().HasOne(ta => ta.TaskAssignment).WithMany(t => t.TaskAssignmentActions).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Task>().HasOne(t => t.CreatedByUser).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Task>().HasOne(t => t.DeletedByUser).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Task>().HasOne(t => t.BusinessUnit).WithMany().OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserSession>().HasKey(t => t.Id);
            modelBuilder.Entity<UserTokenDetail>().HasKey(t => new { t.TokenId, t.SessionId });
            modelBuilder.Entity<UserSession>().HasOne(t => t.Role).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<UserSession>().HasOne(t => t.User).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<UserSession>().HasOne(t => t.BusinessUnit).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<UserTokenDetail>().HasOne(t => t.UserSession).WithMany().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<UserDeviceToken>().HasOne(t => t.UserSession).WithMany().OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TaskAssignmentCommentTags>().HasOne(ta => ta.Comment).WithMany(t => t.Tags).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Seed();
        }
    }
}
