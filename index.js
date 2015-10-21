var readline = require('readline');
var Decimal = require('decimal');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var myNum = 0;
var coins = [2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

var combi = [];
var combiIndex = 0;

rl.question("Enter your number: ", function(answer) {
  
	processNumber(answer);

	combi = combi.filter(function(n){ return n != undefined });

	console.log(combi);

	console.log("There are: " + combi.length + " combinations!");

	rl.close();
});

function processNumber(number, coinsIndex, combination) {

	coinsIndex = coinsIndex || 0;
	combination = combination || null;

	//First launch recursion starting from each money
	if(coinsIndex < coins.length-1)
		processNumber(number, coinsIndex+1, combination);

	// If coin is higer than number exit
	if(number - coins[coinsIndex] < 0) return;

	var thisNum = number;
	var partialCombi = new Array();

	if(combination)	{
		partialCombi = combi[combination].slice(0);
	}

	combination = combiIndex++;
	combi[combination] = partialCombi;

	do{
		// loop subtraction
		thisNum = Decimal(thisNum).sub(coins[coinsIndex]).toNumber();

		if( thisNum >= 0){						

			combi[combination].push(coins[coinsIndex]);

			if( thisNum > 0 )
				for(var i=coinsIndex+1; i<coins.length; i++)
					processNumber(thisNum, i, combination);
		}
		else if ( thisNum < 0 || isNaN(thisNum) )
		{
			delete combi[combination];
		}

	} while(thisNum > 0)
}