using Dlvr.SixtySeconds.Shared.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Dlvr.SixtySeconds.Shared.Constants
{
    public class ActionGroups
    {
        public static List<AssignmentAction> AllActions { get { return Enum.GetValues(typeof(AssignmentAction)).Cast<AssignmentAction>().ToList(); } }
        public static List<AssignmentAction> CreateActions { get { return new List<AssignmentAction>() { AssignmentAction.DRAFT, AssignmentAction.CREATE }; } }
        public static List<AssignmentAction> ScenarioActions { get { return new List<AssignmentAction>() { AssignmentAction.SCENARIO_PENDING, AssignmentAction.SCENARIO_APPROVED }; } }
        public static List<AssignmentAction> ScriptActions { get { return new List<AssignmentAction>() { AssignmentAction.SCRIPT_PENDING, AssignmentAction.SCRIPT_READ, AssignmentAction.SCRIPT_APPROVED }; } }
        public static List<AssignmentAction> RehearsalActions { get { return new List<AssignmentAction>() { AssignmentAction.REHEARSAL_STARTED }; } }
        public static List<AssignmentAction> VideoActions { get { return new List<AssignmentAction>() { AssignmentAction.VIDEODELIVERY_PENDING, AssignmentAction.VIDEO_STARTED, AssignmentAction.VIDEO_SAVED, AssignmentAction.VIDEO_SUBMITTED, AssignmentAction.VIDEO_APPROVED, AssignmentAction.VIDEO_DELETED }; } }
        public static List<AssignmentAction> FeedbackActions { get { return new List<AssignmentAction>() { AssignmentAction.NEW_FEEDBACK, AssignmentAction.FEEDBACK_READ }; } }
        public static List<AssignmentAction> FeaturedActions { get { return new List<AssignmentAction>() { AssignmentAction.FEATURED }; } }
    }
}
