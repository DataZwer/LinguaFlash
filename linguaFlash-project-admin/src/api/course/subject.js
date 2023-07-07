import request from '@/utils/request'

export function getSubject(pageNum, pageSize, keyword) {
    return request({
        url: `/my/subject/courses/${pageNum}/${pageSize}`,
        method: 'post',
        data: { keyword }
    })
}

export function getAllForeign() {
    return request({
        url: `/my/subject/getforeign`,
        method: 'get',
    })
}

export function addSubject(data) {
    return request({
        url: `/my/subject/add/subject`,
        method: 'post',
        data
    })
}

export function updateStatus(params) {
    return request({
        url: `/my/subject/update/status`,
        method: 'get',
        params
    })
}

export function updateSubject(id, data) {
    return request({
        url: `/my/subject/update/subject/${id}`,
        method: 'post',
        data
    })
}

export function deleteSubject(id) {
    return request({
        url: `/my/subject/delete/subject/${id}`,
        method: 'get',
    })
}