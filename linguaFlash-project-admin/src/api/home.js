import request from '@/utils/request'

export function getAllWordPlan() {
    return request({
        url: '/my/home/wordplan',
        method: 'post',
    })
}

export function getAllSentencePlan() {
    return request({
        url: '/my/home/sentenceplan',
        method: 'post',
    })
}

export function getDataNum() {
    return request({
        url: '/my/home/numdata',
        method: 'get',
    })
}

export function getForeignPie() {
    return request({
        url: '/my/home/foreignpie',
        method: 'get',
    })
}

export function getSubjectPie() {
    return request({
        url: '/my/home/subjectpie',
        method: 'get',
    })
}

export function getSubjectLevel() {
    return request({
        url: '/my/home/subject/level',
        method: 'post',
    })
}