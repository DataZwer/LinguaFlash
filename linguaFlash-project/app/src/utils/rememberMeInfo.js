//快速登录的信息
//设置rememberMeInfo
export const setRememberMeInfo = (rememberMeInfo) => {
    localStorage.setItem('rememberMeInfo', JSON.stringify(rememberMeInfo));
}

//清除rememberMeInfo
export const clearRememberMeInfo = () => {
    localStorage.removeItem('rememberMeInfo');
}

//获取rememberMeInfo
export const getRememberMeInfo = () => {
    return JSON.parse(localStorage.getItem('rememberMeInfo'));
}
