'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Category = mongoose.model('Category');

/**
 * Globals
 */
var user, category;

/**
 * Unit tests
 */
describe('Category Model Unit Tests:', function() {
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
			category = new Category({
				name: 'Category Name',
				id:0,
				parent_id:1,
				product_id_collection:[1,2],
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return category.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			category.name = '';
			category.id=0;
			category.parent_id=1;
			category.product_id_collection=[1,2];
			return category.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without category.id = string', function(done) { 
			category.name = 'root';
			category.id= 'hello';
			category.parent_id=1;
			category.product_id_collection=[1,2];
			return category.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without category.parent_id = string', function(done) { 
			category.name = 'root';
			category.id=0;
			category.parent_id='';
			category.product_id_collection=[1,2];
			return category.save(function(err) {
				should.exist(err);
				done();
			});
		});

	it('should be able to show an error when try to save without category.product_ids == string', function(done) { 
			category.name = 'root';
			category.id= 0;
			category.parent_id=1;
			category.product_id_collection=['hello','word'];
			return category.save(function(err) {
				should.exist(err);
				done();
			});
		});




	});

	afterEach(function(done) { 
		Category.remove().exec();
		User.remove().exec();

		done();
	});
});

