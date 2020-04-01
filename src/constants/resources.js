let ResourcesConstants;

if (ENVIRONMENT === 'production') {
  ResourcesConstants = {
    WS_URL: 'wss://api.metrecord.com',
    WWW_URL: 'https://www.metrecord.com',
    API_URL: 'https://api.metrecord.com',
    SHIM_URL: 'https://js.metrecord.com/widget/shim.js',
    METRECORD_ON_METRECORD_CLIENT_ID: 'xrZvV7ltXw7N',
    STRIPE_PUBLIC_KEY: 'pk_live_9A2J2gztN0g3NIIARbaAt5sC00dsD1AoNN',
  }
} else {
  ResourcesConstants = {
    WS_URL: 'ws://localhost:4050',
    API_URL: 'http://localhost:4050',
    SHIM_URL: 'http://localhost:9000/shim.js',
    WWW_URL: 'https://localhost:4050',
<<<<<<< Updated upstream
    APP_URL: 'http://localhost:3200',
    METRECORD_ON_METRECORD_CLIENT_ID: 'GZZPEPjPzQ8W',
=======
    APP_URL: 'http://localhost:3000',
    METRECORD_ON_METRECORD_CLIENT_ID: 'FfoIE9r8dlxP',
>>>>>>> Stashed changes
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
