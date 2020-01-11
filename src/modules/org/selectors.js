import { path } from 'ramda'

const root = state => state.org

const orgRoot = state => root(state).org || {}
export const clientId = state => orgRoot(state).client_id
export const clientSecret = state => orgRoot(state).client_secret
export const orgId = state => orgRoot(state).id
export const orgCreatedAt = state => orgRoot(state).created_at

const properties = state => root(state).properties || []
const gates = state => properties(state).filter(p => p.namespace === 'GATES')
export const hasCustomMetrics = state => gates(state).filter(p => p.name === 'has_custom_metrics' && p.value === 'true').length > 0

const subscriptionRoot = state => root(state).subscription || {}
export const subscriptionPlanId = state => path(['items', 'data', '0', 'plan', 'id'], subscriptionRoot(state))