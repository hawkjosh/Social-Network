const mongoose = require('mongoose')

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb+srv://josh:social-network@social-network.44lq4eq.mongodb.net/?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)

module.exports = mongoose.connection