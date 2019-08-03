const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';
// const Discord = require('discord.js');

module.exports = {
	name: 'sheet',
	description: 'Sheet Display Test',
	execute(message, args) {
		args.join(' ');
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
				range: 'Sheet4!B5:AR',
			}, (err, res) => {
				if (err) return console.log('The API returned an error: ' + err);
				const rows = res.data.values;
				if (rows.length) {
					message.channel.send('#, Name:');
					const matchRow = rows.find(row => row[0] === args);
					message.channel.send(`${matchRow[0]}, ${matchRow[1]}`);
				}
				else {
					console.log('No data found.');
				}
			});
		}

	},
};
