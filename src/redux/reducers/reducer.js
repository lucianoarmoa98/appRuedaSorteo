//-------------------------------estados iniciales, se manejan en el reducer
const initialState = {
    refreshApi: false,
    users: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REFRESH_API':
            return {
                ...state,
                refreshApi: !state.refreshApi,
            };
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
            };

        default:
            return state;
    }
};