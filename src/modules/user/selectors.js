const root = state => state.user;

const defaultUser = {
  username: 'Member',
  id: 0,
}

const byIdRoot = state => root(state).byId;

export const getUser = (state, userId) => byIdRoot(state)[userId] || defaultUser