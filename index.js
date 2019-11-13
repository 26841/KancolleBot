const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const cron = require('cron').CronJob;
const patt = /(^|[\s]+)[pP]+[oO]+[iI]+([-~!?.*_\s]+|$)/i;
const poi = ['Poi!', '!ioP', 'POI!', 'Pooooiiiii!', 'POOOOIIIII!', 'ぽい!', 'ぽーい!', 'P.\no.\ni.', '¡ᴉoԀ', '\:regional_indicator_p:\:regional_indicator_o:\:regional_indicator_i:'];
const client = new Discord.Client();
const birthdays = require('./birthday.json');
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
	client.user.setActivity('.help for commands');
});

client.on('message', message => {

	if(!message.author.bot && String(message).match(patt)) {
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
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}


});

function birthdayMessage() {
	const today = new Date();
	const month = today.getMonth();
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
		const job = new cron('0 0 0 ' + day + ' ' + month + ' *', function() {
			client.guilds.forEach(g =>
				g.channels
					.filter(c => c.type === 'text' && c.permissionsFor(g.me).has('SEND_MESSAGES'))
					.sort((a, b) => b.position - a.position)
					.first()
					.send('Happy Birthday to ' + namesString + '!')
					.catch(e => console.error(`Could not send to ${g.name}:`, e)),
			);
		});
		job.start();
	}
}

client.login(process.env.BOT_TOKEN);
