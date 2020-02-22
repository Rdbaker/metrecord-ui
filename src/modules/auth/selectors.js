import { ActionTypes } from './constants';


const authRoot = state => state.auth || {};

export const getToken = state => authRoot(state).token;

const verificationRoot = state => authRoot(state).verification;
const verificationStatus = state => verificationRoot(state).status;
export const verificationNeverFetched = state => verificationStatus(state) === undefined;
export const verificationPending = state => verificationStatus(state) === ActionTypes.VERIFY_USER_PENDING;
export const verificationFailed = state => verificationStatus(state) === ActionTypes.VERIFY_USER_FAILED;
export const verificationError = state => verificationRoot(state).error;
export const verificationSuccess = state => verificationStatus(state) === ActionTypes.VERIFY_USER_SUCCESS;

const reportFalseEmailRoot = state => authRoot(state).reportFalseEmail;
const reportFalseEmailStatus = state => reportFalseEmailRoot(state).status;
export const reportFalseEmailNeverFetched = state => reportFalseEmailStatus(state) === undefined;
export const reportFalseEmailPending = state => reportFalseEmailStatus(state) === ActionTypes.REPORT_FALSE_EMAIL_PENDING;
export const reportFalseEmailFailed = state => reportFalseEmailStatus(state) === ActionTypes.REPORT_FALSE_EMAIL_FAILED;
export const reportFalseEmailError = state => reportFalseEmailRoot(state).error;
export const reportFalseEmailSuccess = state => reportFalseEmailStatus(state) === ActionTypes.REPORT_FALSE_EMAIL_SUCCESS;