'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill product name',
		trim: true
	},
	id: {
		type: Number,
		default: 0,
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill product description'		
	},
	image_url: {
		type: [{type: String,default: '',required: 'Please add photo'}]
	},
	price: {
		type: String,
		default: '',
		required: 'Please fill product price',
		trim: true
	},
	quantity: {
		type: Number,
		default: 0,
		required: 'Please fill product quantity in stock',
		trim: true
	},
	sku: {
		type: Number,
		default: 0,
		required: 'Please fill product sku id',
		trim: true		
	},
	category_collection: {
		type: [{type: String,default: '',required: 'Please select one category'}]
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

mongoose.model('Product', ProductSchema);