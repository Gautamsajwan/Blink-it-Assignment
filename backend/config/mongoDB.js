import mongoose from 'mongoose'
import 'dotenv/config'

const mongoURI = process.env.MONGO_URI

const connectDB = async() => {
	try {
		const response = await mongoose.connect(mongoURI, {
			dbName: 'Blinkit'
		})
		console.log(`database connected successfully`)
		// console.log(`database connected successfully at ${response.connection.host}`)
	} catch(err) {
		console.error(err)
	}
}

export default connectDB