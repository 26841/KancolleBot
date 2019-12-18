const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const cron = require('cron').CronJob;
const patt = /(^|[\s]+)[pP]+[oO]+[iI]+([-~!?.*_\s]+|$)/i;
const poi = ['Poi!', '!ioP', 'POI!', 'Pooooiiiii!', 'POOOOIIIII!', 'ぽい!', 'ぽーい!', 'P.\no.\ni.', '¡ᴉoԀ', '\:regional_indicator_p:\:regional_indicator_o:\:regional_indicator_i:'];
const client = new Discord.Client();
const birthdays = require('./birthday.json');
const ships = require('@kancolle/data/wiki/ship');
const quotes = require('./quotes.json');
const { api, tl, tlShip, tlShipFromId } = require('@kancolle/data');
const getQuotes = name => {
	let form = ships[name];
	const forms = [form];
	while (form._remodel_from) {
		const prev = ships[form._remodel_from.replace('/', ' ').trim()];
		forms.unshift(prev);
		form = prev;
	}
	return Object.assign({}, ...forms.map(form => quotes[form._api_id]));
};
let timeout;
let timeout2;
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
const cooldowns = new Discord.Collection();

client.once('ready', () => {
	client.guilds.forEach(g =>
		g.channels
			.filter(c => c.type === 'text' && c.permissionsFor(g.me).has('SEND_MESSAGES'))
			.sort((a, b) => b.position - a.position)
			.first()
			.send('Update/Reboot Successful!')
			.catch(e => console.error(`Could not send to ${g.name}:`, e)),
	);
	console.log('Ready!');
	birthdayMessage();
	idle();
	liveTime();
	client.user.setActivity('.help for commands');
});

client.on('message', message => {

	if(!message.author.bot && String(message).match(patt)) {
		idle(message);
		return message.channel.send(poi[Math.floor(Math.random() * poi.length)]);
	}

	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
		idle(message);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}


});

function birthdayMessage() {
	const job = new cron('1 0 0 * * *', function() {
		const today = new Date();
		const month = today.getMonth() + 1;
		const day = today.getDate();
		const obj = birthdays[`${month}`][`${day}`];
		const names = [];
		let namesString = '';
		if (obj) {
			for (const key in obj) {
				names.push(key);
			}
			if (names.length === 1) {
				namesString = names[0];
			}
			else if (names.length === 2) {
				namesString = names[0] + ' and ' + names[1];
			}
			else {
				for (let i = 0; i < names.length - 1; i++) {
					namesString += (names[i] + ', ');
				}
				namesString += 'and ' + names[names.length - 1];
			}
			const birthdayEmbed = new Discord.RichEmbed()
				.setColor('#0099ff')
				.setTitle('Happy Birthday, ' + namesString + '!');
			client.guilds.forEach(g =>
				g.channels
					.filter(c => c.type === 'text' && c.permissionsFor(g.me).has('SEND_MESSAGES'))
					.sort((a, b) => b.position - a.position)
					.first()
					.send(birthdayEmbed)
					.catch(e => console.error(`Could not send to ${g.name}:`, e)),
			);
		}
	});
	job.start();
}

function liveTime() {
	const job2 = new cron('0 */1 * * * *', function() {
		try {
			const today = new Date();
			let minutes = today.getMinutes();
			if (minutes < 10) {
				minutes = '0' + minutes;
			}
			client.user.setActivity((today.getMonth() + 1) + '/' + today.getDate() + ', ' + today.getHours() + ':' + minutes + ':' + today.getSeconds());
		}
		catch (error) {
			console.log(error);
		}
	});
	job2.start();
}

function idle() {
	if (timeout) {
		clearInterval(timeout);
		timeout = null;
	}
	timeout = setInterval(() => {
		let quote;
		let randKey;
		try {
			do {
				const keys = Object.keys(quotes);
				const randIndex = Math.floor(Math.random() * keys.length);
				randKey = keys[randIndex];
				const quotelist = quotes[+randKey]['Idle'];
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
			const idleEmbed = new Discord.RichEmbed()
				.setColor('#0099ff')
				.setThumbnail('https://raw.githubusercontent.com/26841/Kancolle_Icons/master/Base/' + tl.tlShipFromId(+randKey).split(' ').join('_') + '.png')
				.addField(tl.tlShipFromId(+randKey), quote)
				.setTimestamp();
			client.guilds.forEach(g =>
				g.channels
					.filter(c => c.type === 'text' && c.permissionsFor(g.me).has('SEND_MESSAGES'))
					.sort((a, b) => b.position - a.position)
					.first()
					.send(idleEmbed)
					.catch(e => console.error(`Could not send to ${g.name}:`, e)),
			);
		}
		catch (error) {
			console.log(error);
		}
	}, 1800000);
}

client.login(process.env.BOT_TOKEN);
