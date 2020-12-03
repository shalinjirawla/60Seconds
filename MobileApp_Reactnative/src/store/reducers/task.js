import {
    GET_ALLTASKS_LOADING, GET_ALLTASKS_SUCCESS, GET_ALLTASKS_FAILED, SAVE_SCENARIO, SAVE_SCRIPT, GET_RECIPIENTS_LOADING,
    GET_RECIPIENTS_SUCCESS, GET_RECIPIENTS_FAILED, GET_SCRIPT_FIELD_LOADING, GET_SCRIPT_FIELD_SUCCESS, GET_SCRIPT_FIELD_FAILED,
    POST_TASK_LOADING, POST_TASK_SUCCESS, POST_TASK_FAILED, UPDATE_TASK_LOADING, UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILED,
    GET_TASKASSIGNMENT_LOADING, GET_TASKASSIGNMENT_SUCCESS, GET_TASKASSIGNMENT_FAILED, GET_TASKASSIGNMENT_CLEAR, GET_FEEDBACKS_LOADING, GET_FEEDBACKS_SUCCESS, GET_FEEDBACKS_FAILED,
    POST_VIDEOREHEARSAL_LOADING, POST_VIDEOREHEARSAL_SUCCESS, POST_VIDEOREHEARSAL_FAILED,
    GET_KEYWORDS_LOADING, GET_KEYWORDS_SUCCESS, GET_KEYWORDS_FAILED, CLEAR_TASK
} from '../types'

const initialState = {
    getTasksLoading: true,
    tasks: [],
    scenario: {},
    script: {},
    getTasksError: undefined,
    pageSize: 10,
    pageIndex: 1,
    getRecipientsLoading: false,
    recipients: [],
    getRecipientsError: undefined,
    getScriptFieldsLoading: false,
    scriptFields: [],
    getScriptFieldsError: undefined,
    postTaskLoading: false,
    postTaskFailed: undefined,
    taskLoading: false,
    task: null,
    taskError: undefined,
    updateTaskLoading: false,
    updateTaskFailed: undefined,
    feedbacks: [],
    getFeedbacksLoading: false,
    getFeedbacksError: undefined,
    videoSubmitLoading: false,
    videoSubmitResponse: null,
    videoSubmitError: null,
    keywords: [],
    keywordsLoading: true,
    keywordsError: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALLTASKS_LOADING:
            return { ...state, getTasksLoading: true, getTasksError: undefined, task: null }
        case GET_ALLTASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
                // pageSize: action.payload.pageSize,
                pageIndex: action.payload.pageIndex,
                getTasksLoading: false,
                getTasksError: undefined,
                videoSubmitResponse: null
            }
        case GET_ALLTASKS_FAILED:
            return { ...state, getTasksLoading: true, getTasksError: action.error }

        case GET_RECIPIENTS_LOADING:
            return { ...state, getRecipientsLoading: true, getRecipientsError: undefined }
        case GET_RECIPIENTS_SUCCESS:
            return {
                ...state,
                recipients: action.payload,
                getRecipientsLoading: false,
                getRecipientsError: undefined
            }
        case GET_RECIPIENTS_FAILED:
            return { ...state, getRecipientsLoading: true, getRecipientsError: action.error }

        case GET_SCRIPT_FIELD_LOADING:
            return { ...state, getScriptFieldsLoading: true, getScriptFieldsError: undefined }
        case GET_SCRIPT_FIELD_SUCCESS:
            return {
                ...state,
                scriptFields: action.payload,
                getScriptFieldsLoading: false,
                getScriptFieldsError: undefined
            }
        case GET_SCRIPT_FIELD_FAILED:
            return { ...state, getScriptFieldsLoading: true, getScriptFieldsError: action.error }

        case POST_TASK_LOADING:
            return { ...state, postTaskLoading: true, postTaskFailed: undefined }
        case POST_TASK_SUCCESS:
            return {
                ...state,
                //tasks: [...state.tasks, action.payload],
                task: null,
                script: {},
                scenario: {},
                postTaskLoading: false,
                postTaskFailed: undefined
            }
        case POST_TASK_FAILED:
            return { ...state, postTaskLoading: true, postTaskFailed: action.error }

        case SAVE_SCENARIO:
            return { ...state, scenario: action.payload }

        case SAVE_SCRIPT:
            return { ...state, script: action.payload }

        case GET_TASKASSIGNMENT_LOADING:
            return { ...state, taskLoading: true, task: null, taskError: null }
        case GET_TASKASSIGNMENT_CLEAR:
            return { ...state, taskLoading: false, task: null, taskError: null }
        case GET_TASKASSIGNMENT_SUCCESS:
            return {
                ...state,
                task: action.payload,
                taskLoading: false,
                taskError: null
            }
        case GET_TASKASSIGNMENT_FAILED:
            return { ...state, taskLoading: false, task: null, taskError: action.error }

        case UPDATE_TASK_LOADING:
            return { ...state, updateTaskLoading: true, updateTaskFailed: undefined }
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                updateTaskLoading: false,
                task: null,
                script: {},
                scenario: {},
                updateTaskFailed: undefined
            }
        case UPDATE_TASK_FAILED:
            return { ...state, updateTaskLoading: false, updateTaskFailed: action.error }

        case GET_FEEDBACKS_LOADING:
            return { ...state, getFeedbacksLoading: true, getFeedbacksError: undefined }
        case GET_FEEDBACKS_SUCCESS:
            return {
                ...state,
                feedbacks: action.payload.records,
                pageIndex: action.payload.pageIndex,
                getFeedbacksLoading: false,
                getFeedbacksError: undefined
            }
        case GET_FEEDBACKS_FAILED:
            return { ...state, getFeedbacksLoading: true, getFeedbacksError: action.error }

        case POST_VIDEOREHEARSAL_LOADING:
            return { ...state, videoSubmitLoading: true, videoSubmitError: action.error }
        case POST_VIDEOREHEARSAL_SUCCESS:
            return {
                ...state,
                videoSubmitResponse: action.payload,
                videoSubmitLoading: false,
                videoSubmitError: null
            }
        case POST_VIDEOREHEARSAL_FAILED:
            return { ...state, videoSubmitLoading: false, videoSubmitResponse: null, videoSubmitError: action.error }

        case GET_KEYWORDS_LOADING:
            return { ...state, keywordsLoading: true, keywordsError: undefined }
        case GET_KEYWORDS_SUCCESS:
            return {
                ...state,
                keywords: action.payload.records,
                keywordsLoading: false,
                keywordsError: undefined
            }
        case GET_KEYWORDS_FAILED:
            return { ...state, keywordsLoading: false, keywordsError: action.error }

        case CLEAR_TASK:
            return {
                ...state, script: {}, scenario: {}, task: null
            }

        default:
            return state;
    }

}
