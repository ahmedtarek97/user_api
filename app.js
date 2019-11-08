const express = require('express');
const app = express();
const morgan = require('morgan');
const userRoutes=require('./api/routes/user');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
//extract data from the body of the requst and makes it easily readable
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// handling CORS errors
app.use((req,res,next)=>{

res.header('Acess-Control-Allow-Origin');



});

app.use('/user',userRoutes);
//requsts that was not handled by the userRoutes
app.use((req,res,next)=>{

const error = new Error('Not found');
error.status=404;
next(error);
});

//will handle all errors from the application
app.use((error,req,res,next)=>{


res.status(error.status || 500);
res.json({

error:{



    message: error.message



}




});
}
);

module.exports=app;