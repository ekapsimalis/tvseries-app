const mongoose = require('mongoose')

// MongoDB local server for development env
// Switch to altas 

mongoose.connect('mongodb://127.0.0.1:27017/series-app-db', {
    useNewUrlParser: true,
    useCreateIndex: true

})

