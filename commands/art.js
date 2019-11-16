const fetch = require('node-fetch');
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'

module.exports = {
	name: 'art',
	description: 'Get two random images from danbooru (sfw by danbooru ratings)',
	execute(message, args) {
		if (args.length < 3) {
			let tags = '';
			for (const arg in args) {
				tags += args[arg] + '+';
			}
			const url = 'https://danbooru.donmai.us/posts.json?tags=' + tags + 'rating:safe&limit=2&random=true';
			console.log(url);
			fetch(url)
				.then(res => res.json())
				.then(json => {
					for (const post in json) {
						message.channel.send('https://danbooru.donmai.us/posts/' + json[post].id);
					}
				});
		}
		else {
			return message.reply('You cannot search for more than two tags at a time!');
		}
	},
};
