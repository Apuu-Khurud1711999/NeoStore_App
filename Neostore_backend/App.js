const express = require('express')
const cors = require('cors')
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const postRoutes=require('./routes/postRoutes')
app.use('/api/',postRoutes)

const categoryRouter = require('./routes/categoryRouter')
app.use('/pro/',categoryRouter) 

const colorRouter = require('./routes/colorRouter')
app.use('/pro/',colorRouter) 

app.listen(PORT, (err) => {
    if (err) throw err;
    else {
        console.log("Server runs on " + PORT);
    }
})
