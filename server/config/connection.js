import { connect, connection } from 'mongoose'

connect(
	process.env.MONGODB_URI || 'mongodb+srv://ericwittenstein:2SnHfy%40QK!SB8e4@cluster0.jpjowxc.mongodb.net/bootSocialDB?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)

export default connection