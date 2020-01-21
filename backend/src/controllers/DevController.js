const Dev = require('../models/Dev');
const axios = require('axios');
const parseStingAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

// index , show, update, store ,destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },



    async store(request, response) {
        //console.log(request.body);
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            console.log(name, avatar_url, bio);

            const techsArray = parseStingAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],

            }


            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            });
            //filtar as conexões que estão no maximo 10 km de distancia,
            // e que o no dev tenha umas da tecnologias filtradas

            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray,
            )
           sendMessage(sendSocketMessageTo, 'new-dev', dev);
            
        }



        return response.json(dev);




    }


}