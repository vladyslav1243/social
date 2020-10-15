import {getUserStatus, setUserProfileInfo, updateStatus} from "../services/services";

const ADD_POST = 'ADD_POST';
const UPDATE_POST_TEXT = 'UPDATE_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const GET_USER_STATUS = 'GET_USER_STATUS';
const SET_USER_STATUS = 'SET_USER_STATUS';

const initialState = {
    postData: [
        {avatar: 'https://mir-avatarok.3dn.ru/_si/0/03342719.jpg', post: 'Hi, a\'m Avatar', likesCount: 20},
        {avatar: 'https://mir-avatarok.3dn.ru/_si/0/03342719.jpg', post: 'First Post', likesCount: 55}
    ],
    postText: '',
    profile: null,
    status: null
};

export const updatePostTextCreator = (text) => {
    return {
        type: UPDATE_POST_TEXT,
        payload: text
    }
};

export const addPostCreator = () => {
    return {
        type: ADD_POST
    }
};

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        payload: profile
    }
}

export const getStatus = (status) => {
    return {
        type: GET_USER_STATUS,
        payload: status
    }
}

export const setStatus = (status) => {
    return {
        type: SET_USER_STATUS,
        payload: status
    }
}

export const setUserProfileThunkCreator = (id) => (dispatch) => {
    setUserProfileInfo(id)
        .then(data => {
            dispatch(setUserProfile(data));
        })
}

export const getUserStatusThunkCreator = (id) => (dispatch) => {
    getUserStatus(id)
        .then(data => {
            dispatch(getStatus(data))
        });
}

export const setUserStatusThunkCreator = (status) => (dispatch) => {
    updateStatus(status)
        .then(data => {
            dispatch(setStatus(data))
        });
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE :
            return {...state, profile: action.payload}
        case GET_USER_STATUS :
            return {...state, status: action.payload}
        case SET_USER_STATUS :
            return {...state, status: action.payload}
        case UPDATE_POST_TEXT:
            return  {...state, postText: action.payload};
        case ADD_POST:
            let newPost = {
                avatar: 'https://mir-avatarok.3dn.ru/_si/0/03342719.jpg',
                post: state.postText,
                likesCount: 0
            };
            return  {...state, postText: '', postData: [newPost, ...state.postData]};
        default:
            return state;
    }
};

export default profileReducer;