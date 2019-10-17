const authRoot = state => state.auth || {};

export const getToken = state => authRoot(state).token;