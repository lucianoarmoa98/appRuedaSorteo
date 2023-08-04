
//refesca los datos de la descripcion al editar o crear
export const refreshApi = (refresh) => {
    return {
        type: 'REFRESH_API',
        payload: refresh,
    };
};


//obtiene los usuarios
export const getUsers = (users) => {
    return {
        type: 'GET_USERS',
        payload: users,
    };
};