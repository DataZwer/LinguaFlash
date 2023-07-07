//复习单词按钮的开关
//设置moduleSwitch
export const setModuleSwitch = (moduleSwitch) => {
    localStorage.setItem('moduleSwitch', JSON.stringify(moduleSwitch));
}

//清除moduleSwitch
export const clearModuleSwitch = () => {
    localStorage.removeItem('moduleSwitch');
}

//获取moduleSwitch
export const getModuleSwitch = () => {
    return JSON.parse(localStorage.getItem('moduleSwitch'));
}