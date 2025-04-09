require('dotenv').config();
const express = require('express');
const connectToDb = require('./database/db')
const bookRoutes = require('./routes/book-routes')
const authRoutes = require('./routes/auth-routes')
const homeRoutes = require('./routes/home-routes')
const adminRoutes = require('./routes/admin-routes')
const aggregationRoutes = require('./routes/aggregation-route')
const app = express();
const port= process.env.PORT || 4000;


//connect to db
connectToDb();

//middlewears
app.use(express.json());

//routes here`to show db queries
app.use('/api/books',bookRoutes)

//authentication routes
app.use('/api/auth',authRoutes)

//role based authontication
app.use('/api/home',homeRoutes);

app.use('/api/admin',adminRoutes)


app.use('/api/aggregation',aggregationRoutes)

app.listen(port,()=>{
    console.log(`server running on portttt ${port}`);
    
})
