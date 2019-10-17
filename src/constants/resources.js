let ResourcesConstants;

if (ENVIRONMENT === 'production') {
  ResourcesConstants = {
    WS_URL: 'wss://api.getquicksnap.com',
    WWW_URL: 'https://www.getquicksnap.com',
    API_URL: 'https://api.getquicksnap.com',
    SHIM_URL: 'https://js.getquicksnap.com/widget/shim.js',
    SNAPPER_ON_SNAPPER_CLIENT_ID: 'pF1hk8nYIfC1',
  }
} else {
  ResourcesConstants = {
    WS_URL: 'ws://localhost:4000',
    API_URL: 'http://localhost:4000',
    SHIM_URL: 'http://localhost:9000/shim.js',
    WWW_URL: 'https://localhost:4000',
    APP_URL: 'http://localhost:3000',
    SNAPPER_ON_SNAPPER_CLIENT_ID: '_EyUcGFcI31H',
  }
}

export const DEBUG = ENVIRONMENT !== 'production'
export const API_URL = ResourcesConstants.API_URL
export const WS_URL = ResourcesConstants.WS_URL
export const SNAPPER_ON_SNAPPER_CLIENT_ID = ResourcesConstants.SNAPPER_ON_SNAPPER_CLIENT_ID
export const SHIM_URL = ResourcesConstants.SHIM_URL
export const WWW_URL = ResourcesConstants.WWW_URL