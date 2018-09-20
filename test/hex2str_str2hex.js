'use strict'

const Traceto_crypto = require('../index');
const eutil = require('ethereumjs-util');
const specialChar = require('./lib/special_char');	
const assert = require('assert')
const chai = require('chai')
const expect = chai.expect;

const traceto_crypto = new Traceto_crypto();

exports.testHex2Str = function(callback){
	//test the basic conversion cases 
	assert.equal(traceto_crypto.Hex2Str('61'),'a')
	assert.equal(traceto_crypto.Hex2Str('2340213332316f746563617274'),'traceto123!@#')
	assert.equal(traceto_crypto.Hex2Str(''),'')	
	callback();
}


exports.testHex2StrErrorCapturing = function(callback){
	//case 1 when input is empty
	expect(function(){
		traceto_crypto.Hex2Str()
	}).to.throw(
		'Input must be a hexadecimal string'
	)

	//case 2 when input is an integer instead of a string
	expect(function(){
		traceto_crypto.Hex2Str(123)
	}).to.throw(
		'Input must be a hexadecimal string'
	)
	callback();
}




exports.testStr2Hex = function(callback){
	//test the basic conversion cases
	assert.equal(traceto_crypto.Str2Hex(""), "")
	assert.equal(traceto_crypto.Str2Hex('traceto123!@#'),'2340213332316f746563617274' )
	assert.equal(traceto_crypto.Str2Hex('a'), '61')
	assert.equal(traceto_crypto.Str2Hex('8'), '38')
	assert.equal(traceto_crypto.Str2Hex('{33}//sda[?3&^'), '5e26333f5b6164732f2f7d33337b')
	assert.equal(traceto_crypto.Str2Hex("   "), "202020")

	testHexCharacters("123456789", function(err, result){
		//if false, it means no non hex characters are found
		assert.equal(result, false)
	})

	testHexCharacters('owbfowiebfwbefowb3o423n4e29hfr092h4o209', function(err, result){
		//if false, it means no non hex characters are found
		assert.equal(result, false)
	})
	callback();
}



exports.testStr2HexErrorCapturing = function(callback){
	//case 1 when input is empty 
	expect(function(){
		traceto_crypto.Str2Hex()
	}).to.throw(
		'Input must be a character string.'
	)

	//case 2 when the input is an integer instead of a string
	expect(function(){
		traceto_crypto.Str2Hex(123)
	}).to.throw(
		'Input must be a character string.'
	)

	callback();
}

function testHexCharacters(string, callback){
	var output = traceto_crypto.Str2Hex(string);
	var hexRegEx = /([^A-F0-9])/gim //for checking that only hexadecimal characters are found
	output = output.replace(/0x/i, "") //remove the first set of 0x we find
	callback(null, hexRegEx.test(output));
}
	
