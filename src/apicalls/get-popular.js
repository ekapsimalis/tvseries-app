const api = require('./api')
const request = require('request')

const url = 'https://api.themoviedb.org/3/tv/popular?api_key=' + api +'&language=el&page=1'

const getPopular = () => {
    return new Promise((resolve, reject) => {
        request({url, json: true}, (error, response) => {
            if (error) {
                reject('Check your internet connection')
            } else if (response.body === undefined) {
                reject('Something went wrong...')
            } else {
                const movies = response.body.results
                const data = movies.filter(function (movie) {
                    return movie.origin_country[0] !== 'JP' && movie.origin_country[0] !== 'IN'
                })
                resolve(data)
            }
        })
    })
}

module.exports = getPopular