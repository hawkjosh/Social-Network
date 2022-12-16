const mongoose = require('mongoose')

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb+srv://socialnetwork:socialnetwork@socialnetworkcluster.zkswifg.mongodb.net/?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)

module.exports = mongoose.connection