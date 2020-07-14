const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=72e2124abf10b51bcc0cf09cde3dcfce&units=metric'
    request({url,json:true},function(error,{body}){
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.cod){
            callback('Unable to find the location!',undefined)
        }
        else{
            callback(undefined,body.daily[0].weather[0].description+'. It is currently '+body.current.temp+'C temperatures outside and '+body.current.clouds+' % chance of rain falling')
        }
    })
}
module.exports=forecast