const request = require('request')
const api = require('./api')

const searchSeries = (querry) => {
    const url = 'https://api.themoviedb.org/3/search/tv?api_key=' + api + '&language=el&query=' + querry + '&page=1'
    return new Promise((resolve, reject) => {
        request({url: url, json: true}, (error, response) => {
            if (error) {
                reject('Service Unreachable!')
            } else {
                const data = response.body.results
                const results = data.filter(function(result) {
                    return result.origin_country[0] !== 'JP' && result.origin_country[0] !== 'IN'
                })
                resolve(results)
            }
        })
    })
}

module.exports = searchSeries