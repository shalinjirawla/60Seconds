import {
    GET_GALLERY_LOADING, GET_GALLERY_SUCCESS, GET_GALLERY_FAILED, GET_COMMENTS_LOADING, GET_COMMENTS_SUCCESS,
    GET_COMMENTS_FAILED, ADD_COMMENT_LOADING, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILED, IS_LIKE_GALLERY, IS_LIKE_GALLERY_SUCCESS,
    SELECTED_GALLERY, DELETE_COMMENT_LOADING, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILED, GET_TAG_USERS_LOADING,
    GET_TAG_USERS_SUCCESS, GET_TAG_USERS_FAILED, POST_SHARE_LOADING, POST_SHARE_SUCCESS, POST_SHARE_FAILED, POST_TASK_FAILED
} from '../types'

const initialState = {
    getGalleryLoading: false,
    galleries: [],
    gallery: {},
    getGalleryError: undefined,
    getCommentsLoading: false,
    comments: [],
    getCommentsError: undefined,
    addCommentLoading: false,
    addCommentError: undefined,
    isLikeLoading: [],
    deleteCommentLoading: false,
    deleteCommentError: undefined,
    tagUsers: [],
    tagUsersLoading: false,
    tagUsersError: undefined,
    shareLoading: false,
    shareError: undefined
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_GALLERY_LOADING:
            return { ...state, getGalleryLoading: true, getGalleryError: undefined }
        case GET_GALLERY_SUCCESS:
            return {
                ...state,
                getGalleryLoading: false,
                galleries: action.payload.records,
                pageIndex: action.payload.pageIndex,
                getGalleryError: undefined
            }
        case GET_GALLERY_FAILED:
            return { ...state, getGalleryLoading: false, getGalleryError: action.error }

        case GET_COMMENTS_LOADING:
            return { ...state, getCommentsLoading: true, getCommentsError: undefined }
        case GET_COMMENTS_SUCCESS:
            return {
                ...state,
                getCommentsLoading: false,
                comments: action.payload.records,
                pageIndex: action.payload.pageIndex,
                getCommentsError: undefined
            }
        case GET_COMMENTS_FAILED:
            return { ...state, getCommentsLoading: false, getCommentsError: action.error }

        case ADD_COMMENT_LOADING:
            return { ...state, addCommentLoading: true, addCommentError: undefined }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state, addCommentLoading: false, comments: [action.payload, ...state.comments], addCommentError: undefined
            }
        case ADD_COMMENT_FAILED:
            return { ...state, addCommentLoading: false, addCommentError: action.error }

        case SELECTED_GALLERY:
            return {
                ...state,
                gallery: state.galleries.find(g => g.taskAssignmentId === action.payload)
            }

        case IS_LIKE_GALLERY:
            let likedGalleryIndex = state.isLikeLoading.findIndex(u => u.taskAssignmentId === action.payload);
            if (likedGalleryIndex > -1) {
                return {
                    ...state,
                    isLikeLoading: [
                        ...state.isLikeLoading.slice(0, likedGalleryIndex),
                        ...state.isLikeLoading.slice(likedGalleryIndex + 1),
                    ]
                }
            }
            else {
                return {
                    ...state,
                    isLikeLoading: [...state.isLikeLoading, action.payload],
                }
            }
        case IS_LIKE_GALLERY_SUCCESS:
            let galleryIndex = state.galleries.findIndex(u => u.taskAssignmentId === action.payload);
            let gallery = state.galleries[galleryIndex]
            gallery.isLiked = !gallery.isLiked
            gallery.likesCount = gallery.isLiked ? gallery.likesCount + 1 : gallery.likesCount > 0 && gallery.likesCount - 1
            return {
                ...state,
                galleries: [
                    ...state.galleries.slice(0, galleryIndex),
                    gallery,
                    ...state.galleries.slice(galleryIndex + 1),
                ],
                gallery: { ...gallery },
                isLikeLoading: [
                    ...state.isLikeLoading.slice(0, galleryIndex),
                    ...state.isLikeLoading.slice(galleryIndex + 1),
                ],
            }

        case DELETE_COMMENT_LOADING:
            return { ...state, deleteCommentLoading: true, deleteCommentError: undefined }
        case DELETE_COMMENT_SUCCESS:
            let commentIndex = state.comments.findIndex(c => c.id === action.payload);
            return {
                ...state,
                comments: [
                    ...state.comments.slice(0, commentIndex),
                    ...state.comments.slice(commentIndex + 1)
                ],
                deleteCommentLoading: false
            }
        case DELETE_COMMENT_FAILED:
            return { ...state, deleteCommentLoading: false, deleteCommentError: action.payload }

        case GET_TAG_USERS_LOADING:
            return { ...state, tagUsersLoading: true, tagUsersError: undefined }
        case GET_TAG_USERS_SUCCESS:
            return { ...state, tagUsers: action.payload.records, tagUsersLoading: false, tagUsersError: undefined }
        case GET_TAG_USERS_FAILED:
            return { ...state, tagUsersLoading: false, tagUsersError: action.payload }

        case POST_SHARE_LOADING:
            return { ...state, shareLoading: true, shareError: undefined }
        case POST_SHARE_SUCCESS:
            return { ...state, shareLoading: false, shareError: undefined }
        case POST_TASK_FAILED:
            return { ...state, shareLoading: false, shareError: action.payload }

        default:
            return state;
    }
}