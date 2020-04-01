const root = state => state.user;

const byIdRoot = state => root(state).byId;
export const usersById = byIdRoot;

export const anyUserHasPaymentInfo = (state) => !!Object.values(byIdRoot(state)).filter(user => !!user.stripe_customer_id).length