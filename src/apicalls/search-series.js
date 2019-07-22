// Due to move to client side JavaScript...
// TODO

const request = require('request')
const api = require('./api')

const searchSeries = (querry) => {
    const url = 'https://api.themoviedb.org/3/search/tv?api_key=' + api + '&language=el&query=' + querry + '&page=1'
    return new Promise((resolve, reject) => {
        request({url: url, json: true}, (error, response) => {
            if (error) {
                reject('Check your internet connection')
            } else {
                const results = response.body.results
                resolve(results)
            }
        })
    })
}

module.exports = searchSeries