//fill模块的计划信息
//设置fillPlan
export const setFillPlan = ({ plan, complete, timeStamp }) => {
    localStorage.setItem('fillPlan', JSON.stringify({ plan, complete, timeStamp }));
}

//清除fillPlan
export const clearFillPlan = () => {
    localStorage.removeItem('fillPlan');
}

//获取fillPlan
export const getFillPlan = () => {
    return JSON.parse(localStorage.getItem('fillPlan'));
}