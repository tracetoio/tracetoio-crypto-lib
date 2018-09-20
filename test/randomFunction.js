const testHelpers = require('./utils/testHelpers');
const assert = require('assert')



exports.testDuplicates = function(callback){
	var numberOfStrings = 10000
	//generate randomly a certain number of strings 
	//using reduce function to remove duplicates from the array of string, returning only an array of unique strings
	//test will pass if the length of returned array of unique strings remained unchanged
	testHelpers.fetchStrings(numberOfStrings).then(result=>{
		testHelpers.fetchCheckedStrings(result).then(result=>{
			console.log("the results is", result)
			assert.equal(result.length, numberOfStrings)
			callback()
		})
	})
}


// len 100, values 100000 no duplication

// len 20, values 10000 duplication, 9946----10000