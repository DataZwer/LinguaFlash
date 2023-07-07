import request from '@/utils/request'

export function getWordPlan(pageNum, pageSize, keyword) {
    return request({
        url: `/my/plan/getlist/${pageNum}/${pageSize}`,
        method: 'post',
        data: { keyword }
    })
}

export function updateWordPlan(data) {
    return request({
        url: `/my/plan/update/wordplan`,
        method: 'post',
        data
    })
}