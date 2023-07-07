//拼写模块的计划和已完成
//设置spellNumber
export const setSpellNumber = ({ planNumber, finishNumber}) => {
    localStorage.setItem('spellNumber', JSON.stringify({ planNumber, finishNumber }));
}

//清除spellNumber
export const clearSpellNumber = () => {
    localStorage.removeItem('spellNumber');
}

//获取spellNumber
export const getSpellNumber = () => {
    return JSON.parse(localStorage.getItem('spellNumber'));
}

