const request = require('request')
const api = require('./api')


const getSerie = (id) => {
    const url = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=' + api + '&language=el'
    return new Promise((resolve, reject) => {
        request({url: url, json: true}, (error, response) => {
            if (error) {
                reject('Check your internet connection')
            } else if (response.body === undefined) {
                reject('Something went wrong')
            } else {
                const movie = response.body
                resolve(movie)
            }
        })
    })
}

module.exports = getSerie