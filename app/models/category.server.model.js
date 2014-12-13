'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Category name',
		trim: true
	},
	id: {
		type: Number,
		default: 0,
	},
	parent_id: {
		type: Number,
		required: 'Please select Parent Category name',
		default: 0
	},
	product_id_collection: {
		type: [{type: Number,default: 0}]
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Category', CategorySchema);