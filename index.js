const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const cron = require('node-cron');
const patt = /p+o+i+/i;
const poi = ['Poi!', '!ioP', 'POI!', 'Pooooiiiii!', 'POOOOIIIII!', 'ぽい!', 'ぽーい!'];
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
	client.guilds.forEach(g =>
		g.channels
			.filter(c => c.type === 'text' && c.permissionsFor(g.me).has('SEND_MESSAGES'))
			.sort((a, b) => b.position - a.position)
			.first()
			.send('Ready!')
			.catch(e => console.error(`Could not send to ${g.name}:`, e))
	);
	const date = new Date();
	console.log((date.getMonth() + 1) + '-' + (date.getDate() + 1));
	scheduledMessageTest();
});

client.on('message', message => {

	if(!message.author.bot && String(message).match(patt)) {
		message.channel.send(poi[Math.floor(Math.random() * poi.length)]);
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

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

function scheduledMessageTest() {
	cron.schedule('0 0 12 * * *', () => {
		const date = new Date();
		const currDate = (date.getMonth() + 1) + '-' + (date.getDate() + 1);
		const dates = new Map([['8-8', '8-8'], ['8-9', '8-9'], ['8-10', '8-10']]);
		if (dates.has(currDate)) {
			client.guilds.forEach(g =>
				g.channels
					.filter(c => c.type === 'text' && c.permissionsFor(g.me).has('SEND_MESSAGES'))
					.sort((a, b) => b.position - a.position)
					.first()
					.send('The current date at UTC+12 should be ' + dates.get(currDate))
					.catch(e => console.error(`Could not send to ${g.name}:`, e))
			);
		}
	});
}

function scheduledMessage2() {
	cron.schedule('0 * * * * *', () => {
		client.channels.get('598301679464742921').send('running a task every minute');
	});
}

function scheduledMessage() {
	cron.schedule('0 0 * * * *', () => {
		client.guilds.forEach(g =>
			g.channels
				.filter(c => c.type === 'text' && c.permissionsFor(g.me).has('SEND_MESSAGES'))
				.sort((a, b) => b.position - a.position)
				.first()
				.send('running a task every hour')
				.catch(e => console.error(`Could not send to ${g.name}:`, e))
		);
	});
}

client.login(process.env.BOT_TOKEN);
