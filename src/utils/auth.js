const COOKIE_NAME = 'METRECORD_ADMIN_AUTH';

export const expireToken = () => {
  document.cookie = `${COOKIE_NAME}=;expires=${(new Date()).toUTCString()};path=/;domain=${document.domain}`;
  try {
    return localStorage.removeItem(COOKIE_NAME);
  } catch (err) {
    return null;
  }
};

export const getToken = () => {
  const startIndex = document.cookie.indexOf(COOKIE_NAME);
  if (startIndex === -1) {
    return getCookieFromLocalStorage();
  }
  const startSlice = startIndex + COOKIE_NAME.length + 1;
  const endIndex = document.cookie.slice(startIndex).indexOf(';');
  if (endIndex === -1) {
    return document.cookie.slice(startSlice);
  } else {
    return document.cookie.slice(startSlice, startIndex + endIndex);
  }
};

const getCookieFromLocalStorage = () => {
  try {
    return localStorage.getItem(COOKIE_NAME);
  } catch (err) {
    return null;
  }
}

export const setToken = (token) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 7);

  const cookie = `${COOKIE_NAME}=${token};expires=${expireDate.toGMTString()};path=/;domain=${document.domain}`;
  document.cookie = cookie;
  try {
    localStorage.setItem(COOKIE_NAME, token);
  } catch (err) {
    console.info('metrecord could not store token to localStorage');
  }
};
