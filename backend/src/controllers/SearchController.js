const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    // raio 10km + filtro de techs
    async index(request, response) { 
        const { longitude, latitude, techs } = request.query

        const devs = await Dev.find({
            techs: {
                $in: parseStringAsArray(techs)
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        })

        response.json({devs})
    }
}