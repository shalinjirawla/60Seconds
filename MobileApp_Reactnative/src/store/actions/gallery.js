import {
    GET_GALLERY_LOADING, GET_GALLERY_SUCCESS, GET_GALLERY_FAILED, GET_COMMENTS_LOADING, GET_COMMENTS_SUCCESS, GET_COMMENTS_FAILED,
    ADD_COMMENT_LOADING, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILED, IS_LIKE_GALLERY, IS_LIKE_GALLERY_SUCCESS, IS_LIKE_GALLERY_FAILED,
    SELECTED_GALLERY, DELETE_COMMENT_LOADING, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILED, GET_TAG_USERS_LOADING, GET_TAG_USERS_SUCCESS,
    GET_TAG_USERS_FAILED, POST_SHARE_LOADING, POST_SHARE_SUCCESS, POST_SHARE_FAILED
} from '../types'
import { axiosInstance } from '../../api/Services'

export const getGalleriesAPI = (pageIndex, pageSize) => {
    return dispatch => {
        getGalleries(dispatch)
        axiosInstance
            .get(`/gallery?pageIndex=${pageIndex}&pageSize=${pageSize}`)
            .then(response => {
                if (response.status === 200) {
                    getGalleriesSuccess(dispatch, response.data.data)
                } else {
                    getGalleriesFailed(dispatch, "Galleries were not retrieved successfully.")
                }
            }).catch(err => {
                getGalleriesFailed(dispatch, "Galleries were not retrieved successfully.")
            })

    }
}

export const getCommentsAPI = (taskAssignmentId, pageIndex, pageSize) => {
    return dispatch => {
        getComments(dispatch)
        axiosInstance
            .get(`/TaskAssignmentComment?taskAssignmentId=${taskAssignmentId}&pageIndex=${pageIndex}&pageSize=${pageSize}&direction=DESC`)
            .then(response => {
                if (response.status === 200) {
                    getCommentsSuccess(dispatch, response.data.data)
                } else {
                    getCommentsFailed(dispatch, "Comments were not retrieved successfully.")
                }
            }).catch(err => {
                getCommentsFailed(dispatch, "Comments were not retrieved successfully.")
            })

    }
}

export const addCommentAPI = (comment) => {
    debugger
    return dispatch => {
        addComment(dispatch)
        axiosInstance
            .post(`/taskAssignmentComment`, comment)
            .then(response => {
                if (response.status === 200) {
                    comment.id = response.data.data
                    addCommentSuccess(dispatch, comment)
                } else {
                    addCommentFailed(dispatch, "Failed to add your comment")
                }
            }).catch(err => {
                addCommentFailed(dispatch, "Failed to add your comment")
            })

    }
}

export const selectedGallery = (taskAssignmentId) => {
    return dispatch => getSelectedGallery(dispatch, taskAssignmentId)
}

export const isLikeAPI = (taskAssignmentId, isLiked) => {
    return dispatch => {
        isGalleryLike(dispatch, taskAssignmentId);
        axiosInstance
            .put(`/Gallery/${taskAssignmentId}/LikeUnlikePitch/${isLiked}`)
            .then(response => {
                if (response.status === 200) {
                    isGalleryLikeSuccess(dispatch, taskAssignmentId)
                } else {
                    isGalleryLikeFailed(dispatch, "Failed")
                }
            }).catch(err => {
                isGalleryLikeFailed(dispatch, "Failed")
            })
    }
}

export const deleteCommentAPI = (id) => {
    debugger;
    return dispatch => {
        deleteComment(dispatch)
        axiosInstance
            .delete(`/taskAssignmentComment/${id}`)
            .then(response => {
                if (response.status === 200) {
                    deleteCommentSuccess(dispatch, id)
                } else {
                    deleteCommentFailed(dispatch, "Failed to delete your comment")
                }
            }).catch(err => {
                deleteCommentFailed(dispatch, "Failed to delete your comment")
            })

    }
}

export const fetchUsers = (pageIndex, pageSize, keyword) => {
    return dispatch => {
        getUsers(dispatch)
        axiosInstance
            .get(`/User/GetTeamMembers?pageIndex=${pageIndex}&pageSize=${pageSize}&searchKeyword=${keyword}`)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    getUsersSuccess(dispatch, response.data)
                } else {
                    getUsersFailed(dispatch, "Failed to fetch users")
                }
            }).catch(err => {
                getUsersFailed(dispatch, "Failed to fetch users")
            })

    }
}

export const shareAPI = (taskAssignmentId, users, next) => {
    debugger;
    return dispatch => {
        postShare(dispatch)
        axiosInstance
            .post(`/Gallery/${taskAssignmentId}/Share`, { users })
            .then(response => {
                if (response.status === 200) {
                    postShareSuccess(dispatch, response.data)
                    next()
                } else {
                    postShareFailed(dispatch, "Failed to share")
                }
            }).catch(err => {
                postShareFailed(dispatch, "Failed to share")
            })

    }
}

const getGalleries = (dispatch) => dispatch({ type: GET_GALLERY_LOADING })
const getGalleriesSuccess = (dispatch, payload) => dispatch({ type: GET_GALLERY_SUCCESS, payload })
const getGalleriesFailed = (dispatch, error) => dispatch({ type: GET_GALLERY_FAILED, error })

const getComments = (dispatch) => dispatch({ type: GET_COMMENTS_LOADING })
const getCommentsSuccess = (dispatch, payload) => dispatch({ type: GET_COMMENTS_SUCCESS, payload })
const getCommentsFailed = (dispatch, error) => dispatch({ type: GET_COMMENTS_FAILED, error })

const addComment = (dispatch) => dispatch({ type: ADD_COMMENT_LOADING })
const addCommentSuccess = (dispatch, payload) => dispatch({ type: ADD_COMMENT_SUCCESS, payload })
const addCommentFailed = (dispatch, error) => dispatch({ type: ADD_COMMENT_FAILED, error })

const isGalleryLike = (dispatch, payload) => dispatch({ type: IS_LIKE_GALLERY, payload })
const isGalleryLikeSuccess = (dispatch, payload) => dispatch({ type: IS_LIKE_GALLERY_SUCCESS, payload })
const isGalleryLikeFailed = (dispatch, error) => dispatch({ type: IS_LIKE_GALLERY_FAILED, error })

const getSelectedGallery = (dispatch, payload) => dispatch({ type: SELECTED_GALLERY, payload: payload })

const deleteComment = (dispatch) => dispatch({ type: DELETE_COMMENT_LOADING })
const deleteCommentSuccess = (dispatch, payload) => dispatch({ type: DELETE_COMMENT_SUCCESS, payload })
const deleteCommentFailed = (dispatch, error) => dispatch({ type: DELETE_COMMENT_FAILED, error })

const getUsers = (dispatch) => dispatch({ type: GET_TAG_USERS_LOADING })
const getUsersSuccess = (dispatch, payload) => dispatch({ type: GET_TAG_USERS_SUCCESS, payload })
const getUsersFailed = (dispatch, error) => dispatch({ type: GET_TAG_USERS_FAILED, error })

const postShare = (dispatch) => dispatch({ type: POST_SHARE_LOADING })
const postShareSuccess = (dispatch, payload) => dispatch({ type: POST_SHARE_SUCCESS, payload })
const postShareFailed = (dispatch, error) => dispatch({ type: POST_SHARE_FAILED, error })