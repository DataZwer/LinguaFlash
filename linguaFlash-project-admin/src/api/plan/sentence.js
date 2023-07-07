import request from '@/utils/request'

export function getSentencePlan(pageNum, pageSize, keyword) {
    return request({
        url: `/my/plan/getlist/${pageNum}/${pageSize}`,
        method: 'post',
        data: { keyword }
    })
}

export function updateSentencePlan(data) {
    return request({
        url: `/my/plan/update/sentenceplan`,
        method: 'post',
        data
    })
}