const alarmService = require('../services/alarm.service')
const moment = require('moment')
const schedule = require('node-schedule')
const { createEndAlarm } = require('../services/alarm.service')
module.exports = {
    getAlarm: async (req, res) => {
        const userId = 'f37d59f2-c0ce-4712-a7d8-04314158a300'
        // 유저의 정보 가져오기
        //  유저가 참여 예정인 그룹러닝 게시물 정보(호스트) 가져와야함
        try {
            const data = await alarmService.getAlarm(userId)
            res.status(200).send({
                success: true,
                data,
            })
        } catch (error) {
            res.status(400).send({
                success: false,
                message: '알람 불러오기에 실패하였습니다',
            })
        }
    },
    // 매일 8시마다 createDdayAlarm
    createDdayAlarm: () => {
        schedule.scheduleJob('* * 8 * * *', alarmService.createDdayAlarm)
    },
    // 매 30분마다 createStartAlarm, createEndAlarm(실제시간 기준 30분, 00분)
    createStartAlarm: () => {
        schedule.scheduleJob(' * */30 * * * *', alarmService.createStartAlarm)
    },
    createEndAlarm: () => {
        schedule.scheduleJob(' * */30 * * * *', alarmService.createEndAlarm)
    },
}

// createStartAlarm, createEndAlarm의 범위를 지정해주어야함.
//
