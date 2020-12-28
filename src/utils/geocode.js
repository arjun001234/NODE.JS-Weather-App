const request = require('request');

const geocode = (place,callback) => {
     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=pk.eyJ1IjoiYXJqdW4wMDEiLCJhIjoiY2tpc3RlNHhpMGk0NjJzcGR2OXIwNXIzNSJ9.5ell2PGnt-GQROHMSNcycA&limit=1`
    request({url,json: true},(error,{ body }) => {
        if(error) {
            callback('Unable to Connect.Plz Check your connection',undefined)
        } else if(body.features.length === 0) {
            callback('Invalid Location.Enter Again',undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    } )
}

module.exports = geocode;