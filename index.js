'use strict'

try{
    const app = require('./app/app');
    const port =  7431

    app.listen(port, ()=> { console.log("SERVER OK") } )
}catch(error)
{
    console.log("SERVER ERROR", error);
}