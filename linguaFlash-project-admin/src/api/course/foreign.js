import request from '@/utils/request'

export function getForeign(pageNum, pageSize, keyword) {
    return request({
        url: `/my/foreign/courses/${pageNum}/${pageSize}`,
        method: 'post',
        data: {keyword}
    })
}

export function updateStatus(params) {
    return request({
        url: `/my/foreign/update/status`,
        method: 'get',
        params
    })
}

export function updateForeign(id, data) {
    return request({
        url: `/my/foreign/update/foreign/${id}`,
        method: 'post',
        data
    })
}

export function deleteForeign(id) {
    return request({
        url: `/my/foreign/delete/foreign/${id}`,
        method: 'get',
    })
}

