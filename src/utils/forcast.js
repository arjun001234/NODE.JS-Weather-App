const request = require('request');

const forcast = (latitude,longitude,callback) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=f2aa681ffcbb4945a34111734201712&q=${latitude},${longitude}`
    request({url,json: true},(error,{ body }) => {
        if(error) {
            callback('Check your Connection',undefined);
        } else if(body.error) {
            callback('Invalid Location. Try Again',undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temp_c,
                rain: body.current.cloud,
                region: body.location.region,
                country: body.location.country
            })
        }
    })
}
module.exports = forcast;