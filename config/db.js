const mongoose = require('mongoose');

let connect_Mgdb = 'mongodb+srv://nogav:01684205241@cluster0-ykqpg.mongodb.net/Nogav_Credentials?retryWrites=true&w=majority'

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
            } else {
                console.log('Connect to mongodb successful');
            }
        }
    )
    console.log(`MongoDB Connected: ${conn.connection.host}`)
}

module.exports = connectDB;