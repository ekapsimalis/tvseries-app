const fs = require('fs')
const path = require('path')
const api = require('./api')
const request = require('request')

const logPath = path.join(__dirname, '../../logs/report.txt')
const url = 'https://api.themoviedb.org/3/tv/popular?api_key=' + api +'&language=el&page=1'

const getPopular = () => {
    return new Promise((resolve, reject) => {
        request({url, json: true}, (error, response) => {
            if (error) {
                console.log(error)
                const date = new Date()
                fs.appendFileSync(logPath, date.toLocaleDateString() + '-->' + error.toString() + ' || ')
                reject(error.toString())
            } else if (response.body === undefined) {
                reject('Something went wrong...')
            } else {
                const series = response.body.results
                const data = series.filter(function(serie) {
                    return serie.origin_country[0] !== 'JP' && serie.origin_country[0] !== 'IN'
                })
                resolve(data)
            }
        })
    })
}

module.exports = getPopular