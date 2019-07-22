const request = require('request')
const api = require('./api')

const getSeason = (id, seasonNumber) => {
    const url = 'https://api.themoviedb.org/3/tv/' + id + '/season/' + seasonNumber + '?api_key=' + api + '&language=el'
    return new Promise((resolve, reject) => {
        request({url: url, json: true}, (error, response) => {
            if (error) {
                reject('Check your internet connection')
            } else if (response.body.status_code) {
                reject(response.body.status_message)
            } else {
                resolve(response.body)
            }
        })
    })
}

module.exports = getSeason