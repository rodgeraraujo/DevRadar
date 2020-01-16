const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
        const devs = await Dev.find()

        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, longitude, latitude } = request.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const githubResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            let { name, avatar_url, bio } = githubResponse.data

            const techsArray = parseStringAsArray(techs)

            if(!name) name = githubResponse.data.login

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                }
            })
        }

        response.json(dev)
    }
}