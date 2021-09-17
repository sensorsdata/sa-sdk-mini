declare namespace sensors {
  function init(para: object);
  function track(e: string, p?: object, c?: any): void;
  function initPara (p: object): void;
  function quick(params: any): void;
  function use(name: string, option: object);

  function identify(id: string, isSave?: boolean);
  function login(id: string, callback?: any): void;
  function logout(isChangeId?: boolean): void;

  function setOnceProfile(prop: object, c?: any): void;
  function setProfile(prop: object, c?: any): void;
  function appendProfile(prop: object, c?: any): void;
  function incrementProfile(prop: object, c?: any): void;
  function deleteProfile(prop: object, c?: any): void;
  function unsetProfile(prop: object, c?: any): void;

  function registerPage(obj: object): void;
  function register(obj: object): void;
  function registerOnce(obj: object): void;
  function registerSession(obj: object): void;
  function registerSessionOnce(obj: object): void;
  function clearAllRegister(list: Array<string>): void;

  function getPresetProperties(): any;
}

// export default sensors;