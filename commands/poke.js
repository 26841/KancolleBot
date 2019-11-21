const quotes = require('./quotes.json');
const { api, tl, tlShip, tlShipFromId } = require('@kancolle/data');
const Discord = require('discord.js');

module.exports = {
	name: 'poke',
	description: 'Poke someone!',
	cooldown: 5,
	execute(message) {
		let quote;
		let randKey;
		do {
			const keys = Object.keys(quotes);
			const randIndex = Math.floor(Math.random() * keys.length);
			randKey = keys[randIndex];
			console.log(randKey);
			const quotelist = quotes[+randKey]['Poke(1)'];
			if (typeof quotelist === 'object' && quotelist !== null) {
				const keys2 = Object.keys(quotelist);
				const randIndex2 = Math.floor(Math.random() * keys2.length);
				const randKey2 = keys[randIndex2];
				quote = quotelist[randKey2];
			}
			else {
				quote = quotelist;
			}
		} while (!quote);
		const pokeEmbed = new Discord.RichEmbed()
			.setColor('#0099ff')
			.setThumbnail('https://raw.githubusercontent.com/26841/Kancolle_Icons/master/Base/' + tl.tlShipFromId(+randKey).split(' ').join('_') + '.png')
			.addField(tl.tlShipFromId(+randKey), quote);
		message.channel.send(pokeEmbed);
	},
};
