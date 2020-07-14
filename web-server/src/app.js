const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./geocode')
const forecast=require('./forecast')

const app=express()
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',function(req,res){
    res.render('index',{
        title:'My Home Page',
        name: 'Arjya'
    })
})
app.get('/about',function(req,res){
    res.render('about',{
        title:'About Page',
        name:'Mr. A. PAUL'
    })
})
app.get('/help',function(req,res){
    res.render('help',{
        help:'Call us'
    })
})
// app.get('',function(req,res){
//     res.send('Hello Express!')
// })

// app.get('/help',function(req,res){
//     res.send('Help Page')
// })

// app.get('/about',function(req,res){
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather',function(req,res){
    if(!req.query.address){
        return res.send({
            error:'Please Provide a valid address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,Location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                Location,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*',function(req,res){
    res.send('HELP ARTICLE NOT FOUND!')
})

app.get('*',function(req,res){
    res.send('my 404 page')
})

app.listen(3000,function(){
    console.log('Server Running on port 3000')
})
