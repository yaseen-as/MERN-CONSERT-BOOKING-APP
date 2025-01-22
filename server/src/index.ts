import 'dotenv/config'
import connectDB  from './configs/connectDB.config'
import app from './app'

const PORT=process.env.PORT as string

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`);
    })
    
})