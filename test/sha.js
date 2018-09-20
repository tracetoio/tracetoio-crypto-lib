'use strict'

const Traceto_crypto = require('../index');
const eutil = require('ethereumjs-util');
const assert = require('assert')
const chai = require('chai')
const expect = chai.expect;
const traceto_crypto = new Traceto_crypto();

exports.testSHA1 = function(callback){
	//basic test cases to test the hashing function
	assert.equal(traceto_crypto.SHA1('traceto123'), '57761870e7f039ed9a5108f8b4e41ea971d90231');
	assert.equal(traceto_crypto.SHA1('911'), 'f3751173cf413033da9676f3ac6086157005059c');
	assert.equal(traceto_crypto.SHA1('soccer'),'5c17fa03e6d5fc247565e1cd8ffa70e1bfe5b8d9');
	assert.equal(traceto_crypto.SHA1('+_'), '892d149510a1196219003df0cfda0ae2cbad7969');
	assert.equal(traceto_crypto.SHA256('string'),'473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8');
	callback();
}


exports.testSHA1ErrorCapturing = function(callback){
	//capture error when input is empty
	expect(function(){
		traceto_crypto.SHA1()
	}).to.throw(
		'The "data" argument must be one of type string, TypedArray, or DataView. Received type undefined'
	)


	//capture error when input is integer instead of string 
	expect(function(){
		traceto_crypto.SHA1(123)
	}).to.throw(
		'The "data" argument must be one of type string, TypedArray, or DataView. Received type number'
	)
	callback();
}



exports.testSHA256 = function(callback){
	//basic test cases to test the hashing function
	assert.equal(traceto_crypto.SHA256('123'),'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3');
	assert.equal(traceto_crypto.SHA256('xyz'),'3608bca1e44ea6c4d268eb6db02260269892c0b42b86bbf1e77a6fa16c3c9282');
	assert.equal(traceto_crypto.SHA256('+=-'),'f6664e2bc59a87e9e53ad441299a9f88bd00abc6256ab46e4e204846d643f37d');
	assert.equal(traceto_crypto.SHA256('traceto123+-XYZ'),'3b7d11653a83079f684cc586992aff96ed5ea58558ab96b2d78dd9dafd8620e3');
	assert.equal(traceto_crypto.SHA256(''),'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
	assert.equal(traceto_crypto.SHA256(' '),'36a9e7f1c95b82ffb99743e0c5c4ce95d83c9a430aac59f84ef3cbfab6145068');
	assert.equal(traceto_crypto.SHA256('ꪪ'),'cf8f1a2ede4c9a2e9c5745e6e5128080e978069340d6e8c01070178e88dffeda');
	assert.equal(traceto_crypto.SHA256('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'),'b20e12a7bcf7a0bcc5150265aab9c40b1d673781c143a73be76232d81e6038ec');
	assert.equal(traceto_crypto.SHA256('123456789012345kjerbgfiuwbednwefbq.ubfifb)(&)(&)#(@HJonsf)_(I_IS6789012345678901234567890123456789012345678901234567890123456789012345678901234567890'),'1456c6c6fff635b95351abdc68722b98bc1379d3a98e72a0588ae22732ed64e7');
	callback();
}


exports.testSHA256ErrorCapturing = function(callback){
	//capture error when input is empty
	expect(function(){
		traceto_crypto.SHA256()
	}).to.throw(
	 	'The "data" argument must be one of type string, TypedArray, or DataView. Received type undefined'
	)

	//capture error when input is integer instead of string
	expect(function(){
		traceto_crypto.SHA256(256)
	}).to.throw(
		'The "data" argument must be one of type string, TypedArray, or DataView. Received type number'
	)
	callback()
}


exports.testSHA512 = function(callback){
	//basic test cases to test the hashing function
	assert.equal(traceto_crypto.SHA512('123'),'3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');
	assert.equal(traceto_crypto.SHA512('xyz'),'4a3ed8147e37876adc8f76328e5abcc1b470e6acfc18efea0135f983604953a58e183c1a6086e91ba3e821d926f5fdeb37761c7ca0328a963f5e92870675b728');
	assert.equal(traceto_crypto.SHA512('+=-'),'7cddd9227882154faf1783ceab1af2c4800bcb39ef5b17eb96d8a2c3f4ea0e0ba57d21f0d1b7f6e5076f88242e2b3c6bed0c4cb8a023bcb5ac26bf9800d63b66');
	assert.equal(traceto_crypto.SHA512('traceto123+-XYZ'),'d5a6f6a6708e5fe26b76e857ef6c97ab1b1e1d6eed532021fb4aa5b78a830fcd5ff14f7bd45f6a764eca2595728fda3008bb655f9ce1e00df619cc44cf95c4ae');
	assert.equal(traceto_crypto.SHA512(''),'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e');
	assert.equal(traceto_crypto.SHA512(' '),'f90ddd77e400dfe6a3fcf479b00b1ee29e7015c5bb8cd70f5f15b4886cc339275ff553fc8a053f8ddc7324f45168cffaf81f8c3ac93996f6536eef38e5e40768');
	assert.equal(traceto_crypto.SHA512('ꪪ'),'9154b1e7b27fe962078e3c4347b1ba20b7d3f34503bada33d33941b017ea7f348e451c3beeede13f0569263944443e9556a0a30cb12b7db0c133f279ae07e990');
	callback();
}


exports.testSHA512ErrorCapturing = function(callback){
	//capture error when input empty
	expect(function(){
		traceto_crypto.SHA512()
	}).to.throw(
	 	'The "data" argument must be one of type string, TypedArray, or DataView. Received type undefined'
	)

	//capture error when input is integer instead of string
	expect(function(){
		traceto_crypto.SHA512(256)
	}).to.throw(
		'The "data" argument must be one of type string, TypedArray, or DataView. Received type number'
	)
	callback()
}

