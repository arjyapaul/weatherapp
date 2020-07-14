const request=require('request')
const geocode=function(address,callback){
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJqeWEiLCJhIjoiY2p4dzBvZmpnMDRxaDNvbW9ydzEyMGpmcCJ9.QQRBTmIxc44LXS-x7SqbXg&limit=1'
    request({url,json:true},function(error,{body}){
        if(error){
            callback('Unable to connect to location service!',undefined)
        }
        else if(body.features.length===0){
            callback('Invalid place or Unable to find the location!',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                Location:body.features[0].place_name
            })
        }
        
    })
}

module.exports=geocode