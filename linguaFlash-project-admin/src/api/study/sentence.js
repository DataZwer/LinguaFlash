import request from '@/utils/request'


export function getSentence(pageNum, pageSize, keyword) {
    return request({
        url: `/my/sentence/sentencelist/${pageNum}/${pageSize}`,
        method: 'post',
        data: { keyword }
    })
}

export function getAllSubject() {
    return request({
        url: `/my/sentence/getsubject`,
        method: 'get',
    })
}

export function addSentence(data) {
    return request({
        url: `/my/sentence/add/sentence`,
        method: 'post',
        data
    })
}

export function updateSentence(id, data) {
    return request({
        url: `/my/sentence/update/sentence/${id}`,
        method: 'post',
        data
    })
}

export function deleteSentence(id) {
    return request({
        url: `/my/sentence/delete/sentence/${id}`,
        method: 'get',
    })
}

export function getAllSentence() {
    return request({
        url: `/my/userSentence/get/allsentence`,
        method: 'post',
    })
}

export function getSentenceById(pageNum, pageSize, keyword, id) {
    return request({
        url: `/my/userSentence/getlist/${pageNum}/${pageSize}`,
        method: 'post',
        data: { keyword, id }
    })
}

export function addUserSentence(data) {
    return request({
        url: `/my/userSentence/add/userSentence`,
        method: 'post',
        data
    })
}

export function updateIslearned(params) {
    return request({
        url: `/my/userSentence/update/islearned`,
        method: 'get',
        params
    })
}

export function updateUserSentece(data) {
    return request({
        url: `/my/userSentence/update/usersentence`,
        method: 'post',
        data
    })
}

export function deleteUserSentence(params) {
    return request({
        url: `/my/userSentence/delete/userSentence`,
        method: 'get',
        params
    })
}