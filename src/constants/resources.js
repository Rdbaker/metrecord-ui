let ResourcesConstants;

if (ENVIRONMENT === 'production') {
  ResourcesConstants = {
    WS_URL: 'wss://api.metrecord.com',
    WWW_URL: 'https://www.metrecord.com',
    API_URL: 'https://api.metrecord.com',
    SHIM_URL: 'https://js.metrecord.com/widget/shim.js',
    METRECORD_ON_METRECORD_CLIENT_ID: 'pF1hk8nYIfC1',
    STRIPE_PUBLIC_KEY: '',
  }
} else {
  ResourcesConstants = {
    WS_URL: 'ws://localhost:4000',
    API_URL: 'http://localhost:4000',
    SHIM_URL: 'http://localhost:9000/shim.js',
    WWW_URL: 'https://localhost:4000',
    APP_URL: 'http://localhost:3000',
    METRECORD_ON_METRECORD_CLIENT_ID: '_EyUcGFcI31H',
    STRIPE_PUBLIC_KEY: 'pk_test_lFyMgHz3urgqHVwm1Y0bYNXT00Ku5dO3Vp',
  }
}

export const DEBUG = ENVIRONMENT !== 'production'
export const API_URL = ResourcesConstants.API_URL
export const WS_URL = ResourcesConstants.WS_URL
export const METRECORD_ON_METRECORD_CLIENT_ID = ResourcesConstants.METRECORD_ON_METRECORD_CLIENT_ID
export const SHIM_URL = ResourcesConstants.SHIM_URL
export const WWW_URL = ResourcesConstants.WWW_URL
export const STRIPE_PUBLIC_KEY = ResourcesConstants.STRIPE_PUBLIC_KEY