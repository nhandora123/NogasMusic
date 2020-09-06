const mongoose = require('mongoose');

let connect_Mgdb = 'mongodb+srv://sa:123@cluster0-govkb.gcp.mongodb.net/Noras_AppChat?retryWrites=true&w=majority'
const connectDB = async () => {
    const conn = await mongoose.connect(connect_Mgdb, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
        err => {
            if (err) {
                console.log('Can not connect to mongodb' + err);
            }else{
                console.log('Connect to mongodb seccessful');
            }
        }
    )
    console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports = connectDB;
