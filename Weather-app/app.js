const geocode=require('./geocode')
const forecast=require('./forecast')
const request=require('request')

const address=process.argv[2]
if(!address){
    console.log('please provide a Location')
}
else{
    geocode(address,function(error,{latitude,longitude,Location}){
        if(error){
            return console.log(error)
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return console.log(error)
            }
            console.log(Location)
            console.log(forecastData)
        })
    })
}





