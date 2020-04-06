
const CACHE_NAME = 'metrecord_app_cache';


class Cache {
  static _getData() {
    return JSON.parse(sessionStorage.getItem(CACHE_NAME) || '{}')
  }

  static _saveData(data) {
    sessionStorage.setItem(CACHE_NAME, JSON.stringify(data));
  }

  static get(name) {
    return Cache._getData()[name];
  }

  static set(name, value) {
    const data = Cache._getData();
    data[name] = value
    Cache._saveData(data);
  }
}

export default Cache;