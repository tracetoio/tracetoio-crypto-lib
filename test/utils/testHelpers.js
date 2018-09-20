const index = require('../../index')







exports.fetchStrings = function(numberOfStrings){
	return new Promise(function(resolve, reject){
		generateStrings(numberOfStrings, function(err, result){
			if(err){
				reject(error);
			} else{
				resolve(result);
			}
		})
	})
}


exports.fetchCheckedStrings = function(stringArray){
	return new Promise(function(resolve, reject){
		checkStrings(stringArray, function(err, result){
			if(err){
				reject(error);
			}else{
				console.log("the result is ", result)
				resolve(result)
			}
		})
	})
}

function generateStrings(numberOfStrings, callback){
	var stringArray = [];
	for(var i = 0; i<numberOfStrings; i++){
		stringArray.push(index.random(100))
		console.log("generating string ", i)
		if(stringArray.length==10000){
			return callback(null, stringArray);
		}
	}
} 





async function checkStrings(stringArray, callback){

	const unique = await stringArray.reduce(
		function(array, value){
			if(array.indexOf(value)>=0){
				return array
			}
			else {
				return array.concat(value)
			}
		}
	, [])

	return callback(null, unique)
}