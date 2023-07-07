//学习更多的信息 
//设置studyMore
export const setStudyMore = (studyMore) => {
    localStorage.setItem('studyMore', JSON.stringify(studyMore));
}

//清除studyMore
export const clearStudyMore = () => {
    localStorage.removeItem('studyMore');
}

//获取studyMore
export const getStudyMore = () => {
    return JSON.parse(localStorage.getItem('studyMore'));
}

// //学习更多的单词数 
// //设置studyMoreNumber
// export const setStudyMoreNumber = (studyMoreNumber) => {
//     localStorage.setItem('studyMoreNumber', studyMoreNumber);
// }

// //清除studyMore
// export const clearStudyMoreNumber = () => {
//     localStorage.removeItem('studyMoreNumber');
// }

// //获取studyMore
// export const getStudyMoreNumber = () => {
//     return localStorage.getItem('studyMoreNumber');
// }