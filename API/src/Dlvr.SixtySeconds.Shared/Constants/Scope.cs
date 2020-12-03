using System;
using System.Collections.Generic;
using System.Text;

namespace Dlvr.SixtySeconds.Shared.Constants
{
    public class Scope
    {
        public static class BusinessUnit
        {
            public const string AllRead = "bu-all-read";
            public const string Read = "bu-read";
            public const string Create = "bu-create";
            public const string Update = "bu-update";
            public const string Delete = "bu-delete";
            public const string ScriptfieldsRead = "bu-scriptfields-read";
            public const string ReadKeywords = "bu-keywords-read";
        }
        public static class Analytic
        {
            public const string Read = "analytics-read";
        }
        public static class Feedback
        {
            public const string Read = "feedback-read";
            public const string Create = "feedback-create";
            public const string Delete = "feedback-delete";
        }
        public static class Deliver
        {
            public const string Read = "deliver-read";
            public const string Create = "deliver-create";
            public const string Delete = "deliver-delete";
        }
        public static class Rehearse
        {
            public const string Read = "rehearse-read";
            public const string Create = "rehearse-create";
            public const string Delete = "rehearse-delete";
        }
        public static class Gallery
        {
            public const string Read = "gallery-read";
        }
        public static class Pitch
        {
            public const string Read = "pitch-read";
            public const string LikeCreateUpdate = "pitch-like-create-update";
            public const string ScriptDownloadRead = "pitch-script-download-read";
            public const string ScriptVideodownloadRead = "pitch-script-videodownload-read";
            public const string Share = "pitch-share";
        }
        public static class Comment
        {           
            public const string Read = "comment-read";
            public const string Create = "comment-create";
            public const string Delete = "comment-delete";
        }
        public static class Task
        {
            public const string FeatureCreateUdpate = "task-feature-create-udpate";
            public const string Create = "task-create";
            public const string Update = "task-update";
            public const string UserRead = "task-user-read";
            public const string AllRead = "task-all-read";
            public const string AssignmentRead = "task-assignment-read";
            public const string AssignmentDetailRead = "task-assignment-detail-read";
            public const string ScriptApproveUpdate = "task-scriptapprove-update";
            public const string Delete = "task-delete";
            public const string AssignmentDelete = "task-assignment-delete";
            public const string VideoApproveUpdate = "task-videoapprove-update";
        }
        public static class User
        {
            public const string AllRead = "user-all-read";
            public const string Create = "user-create";
            public const string Update = "user-update";
            public const string Read = "user-read";
            public const string Delete = "user-delete";
        }

        public static class Role
        {
            public const string AllRead = "role-all-read";
        }

        public static List<string> Permissions
        {
            get
            {
                return new List<string>()
                {
                    //BusinessUnit//
                    BusinessUnit.Read,
                    BusinessUnit.AllRead,
                    BusinessUnit.Create,
                    BusinessUnit.Delete,
                    BusinessUnit.Update,
                    BusinessUnit.ScriptfieldsRead,
                    BusinessUnit.ReadKeywords,

                    //Analytics//
                    Analytic.Read,

                    //Feedback//
                    Feedback.Read,
                    Feedback.Create,
                    Feedback.Delete,

                    //Deliver//
                    Deliver.Create,
                    Deliver.Read,
                    Deliver.Delete,

                    //Rehearse//
                    Rehearse.Read,
                    Rehearse.Create,
                    Rehearse.Delete,

                    //Gallery//
                    Gallery.Read,

                    //Pitch//
                    Pitch.Read,
                    Pitch.LikeCreateUpdate,
                    Pitch.ScriptDownloadRead,
                    Pitch.ScriptVideodownloadRead,
                    Pitch.Share,

                    //Comment//
                    Comment.Read,
                    Comment.Create,
                    Comment.Delete,

                    //Task//
                    Task.Create,
                    Task.Delete,
                    Task.AssignmentRead,
                    Task.AssignmentDetailRead,
                    Task.FeatureCreateUdpate,
                    Task.ScriptApproveUpdate,
                    Task.Update,
                    Task.UserRead,
                    Task.VideoApproveUpdate,
                    Task.AllRead,

                    //User//
                    User.Create,
                    User.Delete,
                    User.Read,
                    User.AllRead,
                    User.Update,

                    //Role//
                    Role.AllRead

                };
            }
        }
    }
}
