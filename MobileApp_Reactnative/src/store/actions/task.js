
import {
    GET_ALLTASKS_LOADING, GET_ALLTASKS_SUCCESS, GET_ALLTASKS_FAILED, SAVE_SCENARIO, SAVE_SCRIPT, GET_RECIPIENTS_LOADING,
    GET_RECIPIENTS_SUCCESS, GET_RECIPIENTS_FAILED, GET_SCRIPT_FIELD_LOADING, GET_SCRIPT_FIELD_SUCCESS, GET_SCRIPT_FIELD_FAILED,
    POST_TASK_LOADING, POST_TASK_SUCCESS, POST_TASK_FAILED,
    GET_TASKASSIGNMENT_LOADING, GET_TASKASSIGNMENT_SUCCESS,
    POST_VIDEOREHEARSAL_LOADING, POST_VIDEOREHEARSAL_SUCCESS, POST_VIDEOREHEARSAL_FAILED,
    GET_TASKASSIGNMENT_FAILED, GET_ALLTASKS_CLEAR, UPDATE_TASK_LOADING, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILED, GET_FEEDBACKS_LOADING,
    GET_FEEDBACKS_SUCCESS, GET_FEEDBACKS_FAILED,
    GET_KEYWORDS_LOADING, GET_KEYWORDS_SUCCESS, GET_KEYWORDS_FAILED, CLEAR_TASK
} from '../types'
import { axiosInstance } from '../../api/Services';

export const getAllTasksAPI = (pageIndex, pageSize, access_token) => {
    return dispatch => {
        getAllTasks(dispatch)

        axiosInstance.get(`/Task/GetUserTaskList?pageIndex=${pageIndex}&pageSize=${pageSize}`)
            .then(response => {
                if (response.status === 200) {
                    getAllTaskSuccess(dispatch, response.data.data)
                } else {
                    getAllTaskFailed(dispatch, "Tasks were not retrieved successfully.")
                }
            }).catch(err => {
                console.log('GetUserTaskList error');
                getAllTaskFailed(dispatch, "Tasks were not retrieved successfully.")
            })

    }
}

export const saveScenario = (scenario) => {
    return dispatch => {
        saveScenarioSuccess(dispatch, scenario)
    }
}

export const saveScript = (script) => {
    return dispatch => {
        saveScriptSuccess(dispatch, script)
    }
}

export const getScriptFieldsAPI = () => {
    return dispatch => {
        getScriptFields(dispatch)
        axiosInstance
            .get(`/BusinessUnit/1/scriptfields`)
            .then(response => {
                if (response.status === 200) {
                    getScriptFieldsSuccess(dispatch, response.data.data)
                } else {
                    getScriptFieldsFailed(dispatch, "Script Fields were not retrieved successfully.")
                }
            }).catch(err => {
                getScriptFieldsFailed(dispatch, "Script Fields were not retrieved successfully.")
            })

    }
}

export const getRecipientsAPI = () => {
    return dispatch => {
        getRecipients(dispatch)
        axiosInstance
            .get(`/User/GetRecipients`)
            .then(response => {
                if (response.status === 200) {
                    getRecipientsSuccess(dispatch, response.data.data)
                } else {
                    getRecipientsFailed(dispatch, "Recipients were not retrieved successfully.")
                }
            }).catch(err => {
                getRecipientsFailed(dispatch, "Recipients were not retrieved successfully.")
            })

    }
}

export const postTaskAPI = (task, success) => {
    return dispatch => {
        postTask(dispatch)
        axiosInstance
            .post(`/task`, task)
            .then(response => {
                if (response.status === 200) {
                    task.id = response.data.data
                    postTaskSuccess(dispatch, task)
                    success()
                } else {
                    postTaskFailed(dispatch, "Recipients were not retrieved successfully.")
                }
            }).catch(err => {
                postTaskFailed(dispatch, "Recipients were not retrieved successfully.")
            })

    }
}

export const postVideoRehearsalAPI = (request, success) => {
    return dispatch => {
        postVideoRehearsal(dispatch)
        axiosInstance
            .post(`/VideoRehearsal`, request)
            .then(response => {
                if (response.status === 200) {
                    postVideoRehearsalSuccess(dispatch, response.data);
                    success()
                } else {
                    postVideoRehearsalFailed(dispatch, "Video was not able to submit successfully.")
                }
            }).catch(err => {
                console.log('eeer', err.message);
                postVideoRehearsalFailed(dispatch, "Video was not able to submit successfully.")
            })

    }
}

export const getTaskAssignmentById = (taskId, TaskAssignmentId) => {
    return dispatch => {
        getTaskAssignment(dispatch)
        axiosInstance
            .get(`/Task/${taskId}/TaskAssignments/${TaskAssignmentId}`)
            .then(response => {
                if (response.status === 200) {
                    let data = response.data.data;
                    // console.log(data)
                    data.taskId = taskId
                    data.taskAssignmentId = TaskAssignmentId
                    getTaskAssignmentSuccess(dispatch, data)
                } else {
                    getTaskAssignmentFailed(dispatch, "Task was not retrieved successfully.")
                }
            }).catch(err => {
                getTaskAssignmentFailed(dispatch, "Task was not retrieved successfully.")
            })

    }
}

export const updateTaskAPI = (taskId, task, success) => {
    return dispatch => {
        updateTask(dispatch)
        axiosInstance
            .put(`/task/${taskId}/TaskAssignment`, task)
            .then(response => {
                if (response.status === 200) {
                    updateTaskSuccess(dispatch, task)
                    success()
                } else {
                    updateTaskFailed(dispatch, "update task failed")
                }
            }).catch(err => {
                updateTaskFailed(dispatch, "update task failed")
            })

    }
}

export const getFeedbacksAPI = (taskAssignmentId, scenarioId, pageIndex, pageSize) => {
    return dispatch => {
        getFeedbacks(dispatch)
        axiosInstance
            .get(`/TaskAssignmentFeedback?TaskAssignmentId=${taskAssignmentId}&ScenarioId=${scenarioId}&PageIndex=${pageIndex}&PageSize=${pageSize}`)
            .then(response => {
                if (response.status === 200) {
                    getFeedbacksSuccess(dispatch, response.data.data)
                } else {
                    getFeedbacksFailed(dispatch, "Could not fetch business unit keywords")
                }
            }).catch(err => {
                getFeedbacksFailed(dispatch, "Could not fetch business unit keywords")
            })

    }
}

export const getBUKeywords = (pageIndex, pageSize) => {
    return dispatch => {
        keywordsLoading(dispatch)
        axiosInstance
            .get(`/BusinessUnit/keywords?PageIndex=${pageIndex}&PageSize=${pageSize}&Direction=ASC`)
            .then(response => {
                if (response.status === 200) {
                    keywordsSuccess(dispatch, response.data.data)
                } else {
                    keywordsFailed(dispatch, "Could not fetch business unit keywords")
                }
            }).catch(err => {
                keywordsFailed(dispatch, err)
            })

    }
}

export const clearTasks = () => (dispatch) => dispatch({ type: CLEAR_TASK })


const getAllTasks = (dispatch) => dispatch({ type: GET_ALLTASKS_LOADING })
const getAllTaskSuccess = (dispatch, payload) => dispatch({ type: GET_ALLTASKS_SUCCESS, payload })
const getAllTaskFailed = (dispatch, error) => dispatch({ type: GET_ALLTASKS_FAILED, error })

const getTaskAssignment = (dispatch) => dispatch({ type: GET_TASKASSIGNMENT_LOADING })
const getTaskAssignmentClear = (dispatch) => dispatch({ type: GET_ALLTASKS_CLEAR })
const getTaskAssignmentSuccess = (dispatch, payload) => dispatch({ type: GET_TASKASSIGNMENT_SUCCESS, payload })
const getTaskAssignmentFailed = (dispatch, error) => dispatch({ type: GET_TASKASSIGNMENT_FAILED, error })

const saveScenarioSuccess = (dispatch, payload) => dispatch({ type: SAVE_SCENARIO, payload })
const saveScriptSuccess = (dispatch, payload) => dispatch({ type: SAVE_SCRIPT, payload })

const getRecipients = (dispatch) => dispatch({ type: GET_RECIPIENTS_LOADING })
const getRecipientsSuccess = (dispatch, payload) => dispatch({ type: GET_RECIPIENTS_SUCCESS, payload })
const getRecipientsFailed = (dispatch, error) => dispatch({ type: GET_RECIPIENTS_FAILED, error })

const getScriptFields = (dispatch) => dispatch({ type: GET_SCRIPT_FIELD_LOADING })
const getScriptFieldsSuccess = (dispatch, payload) => dispatch({ type: GET_SCRIPT_FIELD_SUCCESS, payload })
const getScriptFieldsFailed = (dispatch, error) => dispatch({ type: GET_SCRIPT_FIELD_FAILED, error })

const postTask = (dispatch) => dispatch({ type: POST_TASK_LOADING })
const postTaskSuccess = (dispatch, payload) => dispatch({ type: POST_TASK_SUCCESS, payload })
const postTaskFailed = (dispatch, error) => dispatch({ type: POST_TASK_FAILED, error })

const postVideoRehearsal = (dispatch) => dispatch({ type: POST_VIDEOREHEARSAL_LOADING })
const postVideoRehearsalSuccess = (dispatch, payload) => dispatch({ type: POST_VIDEOREHEARSAL_SUCCESS, payload })
const postVideoRehearsalFailed = (dispatch, error) => dispatch({ type: POST_VIDEOREHEARSAL_FAILED, error })

const updateTask = (dispatch) => dispatch({ type: UPDATE_TASK_LOADING })
const updateTaskSuccess = (dispatch, payload) => dispatch({ type: UPDATE_TASK_SUCCESS, payload })
const updateTaskFailed = (dispatch, error) => dispatch({ type: UPDATE_TASK_FAILED, error })

const getFeedbacks = (dispatch) => dispatch({ type: GET_FEEDBACKS_LOADING })
const getFeedbacksSuccess = (dispatch, payload) => dispatch({ type: GET_FEEDBACKS_SUCCESS, payload })
const getFeedbacksFailed = (dispatch, error) => dispatch({ type: GET_FEEDBACKS_FAILED, error })

const keywordsLoading = (dispatch) => dispatch({ type: GET_KEYWORDS_LOADING })
const keywordsSuccess = (dispatch, payload) => dispatch({ type: GET_KEYWORDS_SUCCESS, payload })
const keywordsFailed = (dispatch, error) => dispatch({ type: GET_KEYWORDS_FAILED, error })
