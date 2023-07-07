//是否记住密码（快速登录）
//设置isRemember
export const setIsRemember = (isRemember) => {
    localStorage.setItem('isRemember', isRemember);
}

//清除isRemember
export const clearIsRemember = () => {
    localStorage.removeItem('isRemember');
}

//获取isRemember
export const getIsRemember = () => {
    return localStorage.getItem('isRemember');
}
