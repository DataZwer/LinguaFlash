//记住密码时的快速登录所用的加密 密码
//设置passWord
export const setPassWord = (passWord) => {
    localStorage.setItem('passWord', passWord);
}

//清除passWord
export const clearPassWord = () => {
    localStorage.removeItem('passWord');
}

//获取passWord
export const getPassWord = () => {
    return localStorage.getItem('passWord');
}
