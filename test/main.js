const assert = require("assert");
const Traceto_crypto = require('../index.js');
const crypto = require('crypto');
const ecies = require("eth-ecies");
const secrets = require('secret-sharing.js');

const Buffer = require('safe-buffer').Buffer;

const eutil = require('ethereumjs-util');


//function test files
const randomFunction = require('./randomFunction.js');
const hex2str_str2hex = require('./hex2str_str2hex.js');
const sha = require('./sha.js');
const encrypt_decrypt = require('./encrypt_decrypt.js');
const split_combine = require('./split_combine.js');

const traceto_crypto = new Traceto_crypto();

describe('testing hex2str function', function(){
	describe('testing the inputs and error catching of hex2str function', function(){
		it('should return the right outputs', function(done){
			this.timeout(30000000);
			hex2str_str2hex.testHex2Str(function(){
				done();
			})
		});

		it('should capture the right errors', function(done){
			this.timeout(30000000);
			hex2str_str2hex.testHex2StrErrorCapturing(function(){
				done();
			})
		});
	});
});



describe('testing str2hex function', function(){
	describe('testing the inputs and error catching of str2hex function', function(){
		it('should return the right outputs', function(done){
			this.timeout(300000000);
			hex2str_str2hex.testStr2Hex(function(){
				done();
			})
		});

		it('should capture the right errors', function(done){
			this.timeout(300000000);
			hex2str_str2hex.testStr2HexErrorCapturing(function(){
				done();
			})
		});
	});
});


describe('testing sha1 function', function(){
	describe('testing the inputs and error catching of sha1 function', function(){
		it('should return the right outputs', function(done){
			this.timeout(300000000);
			sha.testSHA1(function(){
				done();
			})
		});

		it('should capture the right errors', function(done){
			this.timeout(300000000);
			sha.testSHA1ErrorCapturing(function(){
				done();
			})
		});
	});
});


describe('testing sha256 function', function(){
	describe('testing the inputs and error catching of sha256 function', function(){
		it('should return the right outputs', function(done){
			this.timeout(300000000);
			sha.testSHA256(function(){
				done();
			})
		});

		it('should capture the right errors', function(done){
			this.timeout(300000000);
			sha.testSHA256ErrorCapturing(function(){
				done();
			})
		});
	});
});

describe('testing sha512 function', function(){
	describe('testing the inputs and error catching of sha512 function', function(){
		it('should return the right outputs', function(done){
			this.timeout(300000000);
			sha.testSHA512(function(){
				done();
			})
		});

		it('should capture the right errors', function(done){
			this.timeout(300000000);
			sha.testSHA512ErrorCapturing(function(){
				done();
			})
		});
	});
});

describe('testing encrypt and decrypt function', function(){
	describe('testing encrypting and decrypting of strings and error capturing', function(){
		it('should return the same string before encrypting and after decrypting', function(done){
			this.timeout(300000000);
			encrypt_decrypt.testEncrypt_Decrypt(function(){
				done();
			})
		});

		it('should catpture the right error', function(done){
			this.timeout(300000000);
			encrypt_decrypt.testEncrypt_DecryptErrorCapturing(function(){
				done();
			})
		});
	});
});


describe('testing split and combine function', function(){
	describe('testing splitting and combining of strings and error capturing', function(){
		it('should return the same string before splitting and after combining', function(done){
			this.timeout(300000000);
			split_combine.testSplit_Combine(function(){
				done();
			})
		});

		it('should catpture the right error', function(done){
			this.timeout(300000000);
			split_combine.testSplit_CombineErrorCapturing(function(){
				done();
			})
		});
	});
});







