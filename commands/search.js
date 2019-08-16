const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';
const Discord = require('discord.js');

module.exports = {
	name: 'search',
	description: 'Sheet Search Test',
	execute(message, args) {
		if (!args.length) {
			return message.reply('You need to provide something to search!');
		}
		fs.readFile('credentials.json', (err, content) => {
			if (err) return console.log('Error loading client secret file:', err);
			// Authorize a client with credentials, then call the Google Sheets API.
			authorize(JSON.parse(content), search);
		});
		function authorize(credentials, callback) {
			const { client_secret, client_id, redirect_uris } = credentials.installed;
			const oAuth2Client = new google.auth.OAuth2(
				client_id, client_secret, redirect_uris[0]);

			// Check if we have previously stored a token.
			fs.readFile(TOKEN_PATH, (err, token) => {
				if (err) return getNewToken(oAuth2Client, callback);
				oAuth2Client.setCredentials(JSON.parse(token));
				callback(oAuth2Client);
			});
		}
		function getNewToken(oAuth2Client, callback) {
			const authUrl = oAuth2Client.generateAuthUrl({
				access_type: 'offline',
				scope: SCOPES,
			});
			console.log('Authorize this app by visiting this url:', authUrl);
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});
			rl.question('Enter the code from that page here: ', (code) => {
				rl.close();
				oAuth2Client.getToken(code, (err, token) => {
					if (err) return console.error('Error while trying to retrieve access token', err);
					oAuth2Client.setCredentials(token);
					// Store the token to disk for later program executions
					fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
						if (err) return console.error(err);
						console.log('Token stored to', TOKEN_PATH);
					});
					callback(oAuth2Client);
				});
			});
		}

		/**
		 * Prints the names and majors of students in a sample spreadsheet:
		 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
		 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
		 */
		function search(auth) {
			const sheets = google.sheets({ version: 'v4', auth });
			sheets.spreadsheets.values.get({
				spreadsheetId: '1UG3571gvb8E5arKOPdmB80MW_H91HPqaqDzKv0yPkTc',
				range: 'Sheet4!B5:CF',
			}, (err, res) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					let matchRow;
					if (!isNaN(args)) {
						matchRow = rows.find(row => row[0] == args);
						if (matchRow == null || `${matchRow[1]}` == 'NO DATA') {
							return message.reply('That ID does not have a corresponding kanmusu yet!');
						}
					}
					else {
						const name = args.join(' ');
						const properName = toTitleCase(name);
						matchRow = rows.find(row => row[1] == properName);
						if (matchRow == null) {
							return message.reply('Please check spelling!');
						}
					}
					embed(matchRow);
					// message.channel.send('#, Name:, 名前, Seiyuu, Artist, Rarity, Class, Type, Implementation Date, Birthday, Current Age');
					// message.channel.send(`${matchRow[0]}, ${matchRow[1]}, ${matchRow[2]}, ${matchRow[3]}, ${matchRow[4]}, ${matchRow[5]}, ${matchRow[6]}, ${matchRow[7]}, ${matchRow[8]}, ${matchRow[9]}, ${matchRow[10]}`);
				}
				else {
					console.log('No data found.');
				}
			});
		}

		function toTitleCase(str) {
			return str.replace(
				/\w\S*/g,
				function(txt) {
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				}
			);
		}

		function embed(matchRow) {
			const file = new Discord.Attachment('./thumbnails/' + `${matchRow[1]}` + '.png');
			console.log('attachment://' + `${matchRow[1]}` + '.png');
			const date = new Date();
			const hour = 64 + date.getHours() % 15 - Math.floor(date.getHours() / 15) * 9;
			message.channel.send({
				files: [file],
				embed: {
					color: 0x0099ff,
					title: `${matchRow[0]}` + ': ' + `${matchRow[1]}`,
					url: matchRow[82],
					description: 'Some description here',
					thumbnail: {
						url: 'attachment://' + `${matchRow[1]}` + '.png',
					},
					fields: [
						{
							name: 'Regular field title',
							value: 'Some value here',
						},
						{
							name: '\u200b',
							value: '\u200b',
						},
						{
							name: 'Inline field title',
							value: 'Some value here',
							inline: true,
						},
						{
							name: 'Inline field title',
							value: 'Some value here',
							inline: true,
						},
						{
							name: 'Inline field title',
							value: 'Some value here',
							inline: true,
						},
					],
					image: {
						url: `${matchRow[80]}`,
					},
					timestamp: date,
					footer: {
						text: `${matchRow[hour]}`,
						icon_url: matchRow[81],
					},
				} });
		}
	},
};
