const models = require('../models')

const getRecords = async () => {
    return await models.record.find()
}

const addRecord = async (data) => {
    try {
        if(!data.width) throw ('Nie podano szerokości')
        if(!data.heigth) throw ('Nie podano długości')
        if(!data.count) throw ('Nie podano ilości')
        if(!data.day) throw ('Nie podano daty')

        if(parseFloat(data.width) <= 0) throw ('Nieprawidłowa szerokość')
        if(parseFloat(data.heigth) <= 0) throw ('Nieprawidłowa długość')
        if(parseInt(data.count) <= 0) throw ('Nieprawidłowa ilość')

        if(!data.day.includes('-')) throw ('Nieprawidłowy format daty')

        let checkDay = data.day.split('-')

        if(!checkDay[0] || !checkDay[1] || !checkDay[2]) throw ('Nieprawidłowy format daty')

        let checkDate = new Date(checkDay[0] + '-' + checkDay[1] + '-' + checkDay[2])
        let now = new Date()

        if(checkDate === 'Invalid Date') throw ('Nieprawidłowy format daty')
        if(checkDate - now > 0) throw ('Nie można dodawać wpisów z przyszłą datą')

        return await models.record.create({
            width: data.width,
            heigth: data.heigth,
            count: data.count,
            day: data.day
        })
    } catch (error) {
        console.log(`[addRecord] ${error}`)
        return { error: error }
    }
}

const editRecord = async (data) => {
    try {
        if(!data.width) throw ('Nie podano szerokości')
        if(!data.heigth) throw ('Nie podano długości')
        if(!data.count) throw ('Nie podano ilości')
        if(!data.id) throw ('Nieprawidłowy wpis')

        if(parseFloat(data.width) <= 0) throw ('Nieprawidłowa szerokość')
        if(parseFloat(data.heigth) <= 0) throw ('Nieprawidłowa długość')
        if(parseInt(data.count) <= 0) throw ('Nieprawidłowa ilość')

        return await models.record.findOneAndUpdate(
            { _id: data.id },
            { width: data.width,
            heigth: data.heigth,
            count: data.count },
            { new: true }
        )
    } catch (error) {
        console.log(`[editRecord] ${error}`)
        return { error: error }
    }
}

const deleteRecord = async (data) => {
    try {
        if(!data.id) throw ('Nieprawidłowy wpis')

        return await models.record.findOneAndDelete(
            { _id: data.id }
        )
    } catch (error) {
        console.log(`[deleteRecord] ${error}`)
        return { error: error }
    }
}

module.exports = {
    getRecords,
    addRecord,
    editRecord,
    deleteRecord
}