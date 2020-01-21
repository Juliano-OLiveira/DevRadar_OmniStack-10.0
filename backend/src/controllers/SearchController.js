const Dev = require('../models/Dev')
const parseStingAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request,response){
        // buscar todos dev num raio de 10km
        // filtrar por tecnologia
        //console.log(resquest.query);
const {longitude, latitude,techs} = request.query;

const techsArray = parseStingAsArray(techs);
console.log(techsArray);


const devs = await Dev.find({
    techs:{
        $in: techsArray,
    },
        location: {
            $near: {
                $geometry:{
                    type: 'Point',
                    coordinates: [longitude, latitude],
                },
                $maxDistance: 10000,
            },
        },
    
});



        return response.json({devs})
        

    }
}