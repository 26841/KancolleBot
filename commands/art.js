const { each } = require('bluebird');
const _ = require('lodash');
const { search } = require('booru');
const site = 'danbooru';
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'

module.exports = {
	name: 'art',
	description: 'Get two random images from danbooru',
	async execute(message, args) {
		try {
			await each(
				_(await search(site, args, { limit: 100, random: true }))
					.filter(post => (post || {}).rating === 's')
					.take(2),
				post => message.channel.send(post.postView),
			);
		}
		catch (error) {
			if (args.length > 2) {
				message.reply('You cannot search for more than two tags at a time!');
			}
			else {
				message.channel.send('Something went wrong.');
				console.error(error.message || error);
			}
		}
	},
};
