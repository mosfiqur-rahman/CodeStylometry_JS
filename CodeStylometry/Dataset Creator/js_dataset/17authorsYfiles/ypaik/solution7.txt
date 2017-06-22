//Usage: node solution.js file.in > file.out
'use strict';

var fs = require('fs');
var data = fs.readFileSync(process.argv[2], 'utf-8').replace(/\r/g, '').split('\n').filter(String);

function prepare(data) {
	var caseNum = data.shift();

	var cases = [];
	for(var i = 0; i < caseNum; i++) {
		var partyNum = data.shift();
		var peoples = data.shift().split(' ');
		var parties = [];
		var total = 0;
		for(var j = 0; j < partyNum; j++) {
			var people = parseInt(peoples[j]);
			parties.push({
				name: String.fromCharCode(65 + j),
				num: people
			});
			total += people;
		}
		cases.push({
			parties: parties,
			total: total
		});
	}

	return {
		cases: cases
	};
}

function cSort(x, y) {
	if(x.num > y.num) {
		return -1;
	}
	if(x.num < y.num) {
		return 1;
	}
	return 0;
}

function solve(data) {
	data.cases.forEach(function(item, index) {

		var p = item.parties;
		var total = item.total;
		var solutions = [];

		if(total%2 !== 0) {
			p.sort(cSort);
			p[0].num = p[0].num - 1;
			solutions.push(p[0].name);
			total -= 1;
		}

		while(total > 0) {
			p.sort(cSort);
			if(p[0].num === p[1].num || p[1].num + 1 === p[0].num) {
				p[0].num = p[0].num - 1;
				p[1].num = p[1].num - 1;
				solutions.push(p[0].name + p[1].name);
			}		
			else {
				p[0].num = p[0].num - 2;
				solutions.push(p[0].name + p[0].name);
			}
			total -= 2;
		}

		console.log('Case #' + (index + 1) + ': ' + solutions.join(' '));
	});
}

solve(prepare(data));