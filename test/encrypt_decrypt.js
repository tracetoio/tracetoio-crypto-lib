'use strict'

const Traceto_crypto = require('../index');
const eutil = require('ethereumjs-util');
const specialChar = require('./lib/special_char');	
const assert = require('assert')
const chai = require('chai')
const expect = chai.expect;
const traceto_crypto = new Traceto_crypto();

exports.testEncrypt_Decrypt = function(callback){
	//encryptThenDecrypt function encrypts the string then decrypts it to return the original string
	//test basic conversion cases
	assert.equal(encryptThenDecrypt('0xf2ceccb5b79f0551d15f1ddc578b144971ded167fd4d0682d456fec0d55368b6','traceto123'), 'traceto123')
	assert.equal(encryptThenDecrypt('0x326b99194547af9394b1a77ebeccda0c9aedb4b0ea803e6428090eba8c2c1efb','hello, welcome to trace123123123, there is, 112 wer ////'), 'hello, welcome to trace123123123, there is, 112 wer ////')
	assert.equal(encryptThenDecrypt('0x326b99194547af9394b1a77ebeccda0c9aedb4b0ea803e6428090eba8c2c1efb',''), '')
	assert.equal(encryptThenDecrypt('0x326b99194547af9394b1a77ebeccda0c9aedb4b0ea803e6428090eba8c2c1efb',' '), ' ')
	assert.equal(encryptThenDecrypt('0x326b99194547af9394b1a77ebeccda0c9aedb4b0ea803e6428090eba8c2c1efb','⿏'), '⿏')
	assert.equal(encryptThenDecrypt('0x326b99194547af9394b1a77ebeccda0c9aedb4b0ea803e6428090eba8c2c1efb','ඵྵ⏭¶⻤ワ'), 'ඵྵ⏭¶⻤ワ')
	assert.equal(encryptThenDecrypt('0x326b99194547af9394b1a77ebeccda0c9aedb4b0ea803e6428090eba8c2c1efb','HelLlLPwefoin(#( 230923klasd9**'), 'HelLlLPwefoin(#( 230923klasd9**')

	callback();
}



exports.testEncrypt_DecryptErrorCapturing = function(callback){

	//case 1 inappropriate public key 
	expect(function(){
		var pubKey = '0x4376b146190901d4b80a7c05b3cb15b764f84e4b6ac304ac16d9a13a135b921613aacc2b529d15c009044ff608cf1dc71d3775681343083d45484d7';
		traceto_crypto.Encrypt('hello', pubKey);
	}).to.throw(
		'Unknown point format'
	)

	//case 2 pulic key and private key do not match
	expect(function(){
		var priKeyFalse = '0x326b99194547af9394b1a77ebeccda0c9aedb4b0ea803e6428090eba8c2c1',
			priKeyTrue = '0x326b99194547af9394b1a77ebeccda0c9aedb4b0ea803e6428090eba8c2c1efb',
			pubKey = eutil.privateToPublic(priKeyTrue),
			encryptedString = traceto_crypto.Encrypt('Hello', pubKey)
		traceto_crypto.Decrypt(encryptedString, priKeyFalse)
	}).to.throw(
		'MAC mismatch'
	)

	callback();
}


function encryptThenDecrypt(priKey, string){
	//encrypt the string then decrypt it with a pri pub key pair
	var priKey = priKey,
		pubKey = eutil.privateToPublic(priKey),
		encryptedString = traceto_crypto.Encrypt(string, pubKey ),
	 	decryptedString = traceto_crypto.Decrypt(encryptedString, priKey);
	return decryptedString;
}




