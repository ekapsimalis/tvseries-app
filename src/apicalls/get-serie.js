const request = require('request')
const api = require('./api')


const getSerie = (id) => {
    const url = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=' + api + '&language=el'
    return new Promise((resolve, reject) => {
        request({url: url, json: true}, (error, response) => {
            if (error) {
                reject('Service Unreachable!')
            } else if (response.body === undefined) {
                reject('Something went wrong')
            } else {
                let genres = []
                let networks = []
                let seasons = []
                response.body.genres.forEach(function(genre) {
                    genres.push(genre.name)
                })
                response.body.networks.forEach(function(network) {
                    networks.push(network.name)
                })
                response.body.seasons.forEach(function(season) {
                    seasons.push({
                        date: season.air_date,
                        episodes: season.episode_count,
                        name: season.name,
                        overview: season.overview,
                        poster: season.poster_path,
                        season_number: season.season_number
                    })
                })
                const serie = {
                    poster: response.body.poster_path,
                    id: response.body.id,
                    name: response.body.name,
                    next_episode: response.body.next_episode_to_air,
                    number_of_seasons: response.body.number_of_seasons,
                    original_name: response.body.original_name,
                    overview: response.body.overview,
                    status: response.body.status,
                    rating: response.body.vote_average,
                    genres,
                    networks,
                    seasons   
                }
                resolve(serie)
            }
        })
    })
}

module.exports = getSerie