'use strict'

const Traceto_crypto = require('../index');
const eutil = require('ethereumjs-util');
const specialChar = require('./lib/special_char');	
const assert = require('assert')
const chai = require('chai')
const expect = chai.expect;
const traceto_crypto = new Traceto_crypto();

exports.testSplit_Combine = function(callback){
	//split string with different combinatio of m and n values, 
	//check the number of parts 
	//check that to combine them back you need the right amount of parts
	//combination should fail if not enough parts are used

	//case 1 m = n
	var hex = '5e26333f5b6164732f2f7d33337b',
		m 	= 5,
		n 	= 5,
		parts = traceto_crypto.Split(hex, m, n);

	assert.equal(parts.length, 5);
	assert.equal(traceto_crypto.Combine(parts), hex);
	parts.pop();
	assert.notEqual(traceto_crypto.Combine(parts), hex);
	parts.splice(2);
	assert.notEqual(traceto_crypto.Combine(parts), hex);


	//case 2 m < n
		hex = '5e26333f5b6164732f2f7d33337b',
		m 	= 10,
		n 	= 5,
		parts = traceto_crypto.Split(hex,m,n);

	assert.equal(parts.length,10);
	assert.equal(traceto_crypto.Combine(parts), hex);
	parts.pop();
	assert.equal(traceto_crypto.Combine(parts), hex);
	parts.splice(3);
	assert.notEqual(traceto_crypto.Combine(parts), hex);


	//case 3 hex is an empty string
		hex = '',
		m 	= 10,
		n 	= 5,
		parts = traceto_crypto.Split(hex, m, n);
	assert.equal(parts.length, 10);
	assert.equal(traceto_crypto.Combine(parts), "");
	parts.pop();
	assert.equal(traceto_crypto.Combine(parts), "");
	parts.splice(2);
	assert.notEqual(traceto_crypto.Combine(parts), "")

	callback();
}



exports.testSplit_CombineErrorCapturing = function(callback){

	//case 1 number of shares param is string instead of an integer
	var hex = '2340213332316f746563617274',
		m 	= '10',
		n 	= '5';
	expect(function(){
		traceto_crypto.Split(hex, m, n);
	}).to.throw(
		'Number of shares must be an integer between 2 and 2^bits-1 (255), inclusive.'
	)


	//case 2 input contains non hexadecimal characters like x y z
		hex = '2340213332316f746563617274zxyyuuvvVVV',
		m 	= 10,
		n 	= 3;
	expect(function(){
		traceto_crypto.Split(hex, m, n);
	}).to.throw(
		'Invalid hex character.'
	)
	

	//case 3 m > n
		hex = '5e26333f5b6164732f2f7d33337b',
		m 	= 10,
		n 	= 20,
	expect(function(){
		traceto_crypto.Split(hex, m, n);
	}).to.throw(
		'Threshold number of shares was 20 but must be less than or equal to the 10 shares specified as the total to generate.'
	)


	callback();
}





const Split = function(hex, m, n){
	// split into m parts and of length n which can be combined back together
	return secrets.share(hex, m, n);
}




const Combine = function(pieces){
	//combin all m parts in to the origninal form 
	return secrets.combine(pieces)
}




