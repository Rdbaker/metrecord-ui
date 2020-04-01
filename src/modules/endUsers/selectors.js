const root = state => state.endUsers;

export const endUserPage = state => root(state).page;
export const endUserPageNeverLoaded = state => endUserPage(state) === null;
