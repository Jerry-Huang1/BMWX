'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Product = mongoose.model('Product');

/**
 * Globals
 */
var user, product;

/**
 * Unit tests
 */
describe('Product Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			product = new Product({
				name: 'Product Name',
				id:1,
				description:'product description',				
				image_url: ['url1','url2'],
				price:'10.50',
				quantity:25,
				sku:112,
				category_id_collection:['2','5'],
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return product.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			product.name = '';
			product.id=1;
			product.description='hello';
			product.image_url=['url1','url2'];
			product.price='10.50';
			product.quantity=25;
			product.sku=112;
			product.category_id_collection=['2','5'];

			return product.save(function(err) {
				should.exist(err);
				done();
			});
		});
		it('should be able to show an error when try to save with product id  = string(auto generated)', function(done) { 
			product.name = 'product name';
			product.id='string';
			product.description='hello';
			product.image_url=['url1','url2'];
			product.price='10.50';
			product.quantity=25;
			product.sku=112;
			product.category_id_collection=['2','5'];
			return product.save(function(err) {
				should.exist(err);
				done();
			});
		});
		it('should be able to show an error when try to save without description', function(done) { 
			product.name = 'product name';
			product.id='string';
			Product.description='';
			product.image_url=['url1','url2'];
			product.price='10.50';
			product.quantity=25;
			product.sku=112;
			product.category_id_collection=['2','5'];
			return product.save(function(err) {
				should.exist(err);
				done();
			});
		});
		it('should be able to show an error when try to save without image_url', function(done) { 
			product.name = 'product name';
			product.id='string';
			Product.description='hello';			
			product.image_url=['',''];
			product.price='10.50';
			product.quantity=25;
			product.sku=112;
			product.category_id_collection=['2','5'];
			return product.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without price', function(done) { 
			product.name = 'product name';
			product.id='string';
			Product.description='hello';			
			product.image_url=['url1','url2'];
			product.price='';
			product.quantity=25;
			product.sku=112;
			product.category_id_collection=['2','5'];
			return product.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without stock quantity', function(done) { 
			product.name = 'product name';
			product.id='string';
			Product.description='hello';			
			product.image_url=['url1','url2'];
			product.price='10.50';
			product.quantity=0;
			product.sku=112;
			product.category_id_collection=['2','5'];
			return product.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without sku id', function(done) { 
			product.name = 'product name';
			product.id='string';
			Product.description='hello';			
			product.image_url=['url1','url2'];
			product.price='10.50';
			product.quantity=25;
			product.sku=0;
			product.category_id_collection=['2','5'];
			return product.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without category_id_collection auto add by relate to category', function(done) { 
			product.name = 'product name';
			product.id='string';
			Product.description='hello';			
			product.image_url=['url1','url2'];
			product.price='10.50';
			product.quantity=25;
			product.sku=112;
			product.category_id_collection=[0,0];
			return product.save(function(err) {
				should.exist(err);
				done();
			});
		});


	});

	afterEach(function(done) { 
		Product.remove().exec();
		User.remove().exec();

		done();
	});
});