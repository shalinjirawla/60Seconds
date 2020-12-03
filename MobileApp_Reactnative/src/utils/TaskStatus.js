const TASK_STATUS_ALL = [
    "SCENARIO_PENDING",
    "SCENARIO_APPROVED",
    "SCRIPT_PENDING",
    "SCRIPT_APPROVED",
    "VIDEODELIVERY_PENDING",
    "VIDEO_APPROVED",
    "NEW_FEEDBACK",
    "FEEDBACK_READ",
    "CREATE",
    "DRAFT",
    "SCRIPT_READ",
    "REHEARSAL_STARTED",
    "VIDEO_STARTED",
    "VIDEO_SAVED",
    "VIDEO_DELETED",
    "VIDEO_SUBMITTED",
    "FEATURED"
];
const TASK_STATUS_PENDING = ["SCENARIO_PENDING", "SCRIPT_PENDING", "VIDEODELIVERY_PENDING"];
const TASK_STATUS_APPROVED = ["SCENARIO_APPROVED", "SCRIPT_APPROVED", "VIDEO_APPROVED"];
const TASK_STATUS_STARTED = ["REHEARSAL_STARTED", "VIDEO_STARTED"];

export const RenderTaskStatusIcon = (status) => {

    if (TASK_STATUS_PENDING.includes(status)) {
        return require(`../../assets/Pending_approval_Activity_2.png`);
    }
    else if (TASK_STATUS_STARTED.includes(status)) {
        return require(`../../assets/Made_an_Edit_Activity.png`);
    }
    else if (TASK_STATUS_APPROVED.includes(status)) {
        return require(`../../assets/Approved_Activity.png`);
    }
    else if (status === TASK_STATUS_ALL[6]) {
        return require(`../../assets/Comments_Activity_highlighted.png`);
    }
    else if (status === TASK_STATUS_ALL[7]) {
        return require(`../../assets/Comments_Activity_read.png`);
    }
    else if (status === TASK_STATUS_ALL[8]) {
        return require(`../../assets/Created_Activity.png`);
    }
}

export const RenderTaskStatusTextColor = (status) => {

    if (status === TASK_STATUS_ALL[6])
        return "#FD6F2A";
    else
        return "#536278";

}