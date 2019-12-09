import flags from 'utils/flags';

export const getBrowserAndVersion = (userAgent) => {

  let browser = '';
  let browserVersion = 0;

  if (/Opera[\/\s](\d+\.\d+)/.test(userAgent)) {
    browser = 'Opera';
  } else if (/Edge[\/\s](\d+\.\d+);/.test(userAgent)) {
    browser = 'Edge';
  } else if (/MSIE (\d+\.\d+);/.test(userAgent)) {
    browser = 'IE';
  } else if (/Navigator[\/\s](\d+\.\d+)/.test(userAgent)) {
    browser = 'Netscape';
  } else if (/Chrome[\/\s](\d+\.\d+)/.test(userAgent)) {
    browser = 'Chrome';
  } else if (/Safari[\/\s](\d+\.\d+)/.test(userAgent)) {
    browser = 'Safari';
    /Version[\/\s](\d+\.\d+)/.test(userAgent);
    browserVersion = parseFloat(new Number(RegExp.$1));
  } else if (/Firefox[\/\s](\d+\.\d+)/.test(userAgent)) {
    browser = 'Firefox';
  }
  if (browserVersion === 0){
    browserVersion = parseFloat(new Number(RegExp.$1));
  }

  return {
    name: browser,
    version: browserVersion,
  };
};

export const getFlagForLocale = locale => {
  const countryCode = locale.split('-')[1];
  const flag = flags.filter(flag => flag.code === countryCode)[0];
  if (flag) {
    return flag.emoji;
  }
}
