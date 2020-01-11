import { path } from 'ramda'

const root = state => state.org

const orgRoot = state => root(state).org || {}
export const clientId = state => orgRoot(state).client_id
export const clientSecret = state => orgRoot(state).client_secret
export const orgId = state => orgRoot(state).id
export const orgCreatedAt = state => orgRoot(state).created_at

const subscriptionRoot = state => root(state).subscription || {}
export const subscriptionPlanId = state => path(['items', 'data', '0', 'plan', 'id'], subscriptionRoot(state))