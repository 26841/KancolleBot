const fetch = require('node-fetch');
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'

module.exports = {
	name: 'nsfw2',
	description: 'Get two random nsfw images from danbooru',
	execute(message, args) {
		if (!message.channel.nsfw) {
			message.reply('I can\'t execute that command in a non-nsfw channel!');
		}
		else if (args.length < 3) {
			let tags = '';
			for (const arg in args) {
				tags += args[arg] + '+';
			}
			const ratings = ['questionable', 'explicit'];
			for (let i = 0 ; i < 2 ; i++) {
				const randomRating = ratings[Math.floor(Math.random() * ratings.length)];
				const url = 'https://danbooru.donmai.us/posts.json?tags=' + tags + 'rating:' + randomRating + '&limit=1&random=true';
				fetch(url)
					.then(res => res.json())
					.then(json => {
						for (const post in json) {
							console.log(json[post]);
							message.channel.send('https://danbooru.donmai.us/posts/' + json[post].id);
						}
					});
			}
		}
		else {
			return message.reply('You cannot search for more than two tags at a time!');
		}
	},
};
