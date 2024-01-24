const { model, Schema } = require('mongoose');

const logSchema = new Schema({
	item: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ['holding', 'back in stock'],
		required: true
	},
	timestamp: {
		type: Date,
		default: Date.now
	}
});

module.exports = model('Log', logSchema);
