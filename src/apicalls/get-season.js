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
                let episodes = []
                response.body.episodes.forEach(function(episode) {
                    episodes.push({
                        air_date: episode.air_date,
                        number: episode.episode_number,
                        name: episode.name,
                        overview: episode.overview,
                        rating: episode.vote_average,
                    })
                })
                const data = {
                    air_date: response.body.air_date,
                    name: response.body.name,
                    overview: response.body.overview,
                    poster: response.body.poster_path,
                    number: response.body.season_number,
                    episodes
                }
                resolve(data)
            }
        })
    })
}

module.exports = getSeason