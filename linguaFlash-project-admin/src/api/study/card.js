import request from '@/utils/request'

export function getWord(pageNum, pageSize, keyword) {
    return request({
        url: `/my/word/wordlist/${pageNum}/${pageSize}`,
        method: 'post',
        data: { keyword }
    })
}

export function getWordById(pageNum, pageSize, keyword, id) {
    return request({
        url: `/my/userWord/getlist/${pageNum}/${pageSize}`,
        method: 'post',
        data: { keyword, id }
    })
}

export function getAllWord() {
    return request({
        url: `/my/userWord/get/allword`,
        method: 'post',
    })
}

export function getAllSubject() {
    return request({
        url: `/my/word/getsubject`,
        method: 'get',
    })
}

export function addWord(data) {
    return request({
        url: `/my/word/add/word`,
        method: 'post',
        data
    })
}

export function addUserWord(data) {
    return request({
        url: `/my/userWord/add/userword`,
        method: 'post',
        data
    })
}

export function getUserInfoById(id) {
    return request({
        url: `/my/userWord/get/userinfo`,
        method: 'post',
        data:{id}
    })
}

export function updateIscollect(params) {
    return request({
        url: `/my/userWord/update/iscollect`,
        method: 'get',
        params
    })
}

export function updateIslearned(params) {
    return request({
        url: `/my/userWord/update/islearned`,
        method: 'get',
        params
    })
}

export function deleteUserWord(params) {
    return request({
        url: `/my/userWord/delete/userWord`,
        method: 'get',
        params
    })
}

export function updateWord(id, data) {
    return request({
        url: `/my/word/update/word/${id}`,
        method: 'post',
        data
    })
}

export function deleteWord(id) {
    return request({
        url: `/my/word/delete/word/${id}`,
        method: 'get',
    })
}