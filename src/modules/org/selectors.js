import { path } from 'ramda'

const root = state => state.org

const orgRoot = state => root(state).org || {}
export const clientId = state => orgRoot(state).client_id

const subscriptionRoot = state => root(state).subscription || {}
export const subscriptionPlanId = state => path(['items', 'data', '0', 'plan', 'id'], subscriptionRoot(state))