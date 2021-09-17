declare namespace sensors {
    function init(server_url: string, heatmap?:object ): void;
    function init(param:any): void;
    function track(e: string, p?: object): void;
    function setPara (p: object): void;
    function login(id: string): void;
    function logout(isChangeId?: boolean): void;
    function setOnceProfile(prop: object): void;
    function setProfile(prop: object): void;
    function registerApp(prop: object): void;
    function clearAppRegister(list: Array<string>): void;
    function quick(param: any): void;
}
export default sensors
