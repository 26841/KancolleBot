const { each } = require('bluebird');
const _ = require('lodash');
const { search } = require('booru');

const site = 'danbooru';
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'

module.exports = {
	name: 'arttest',
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
			console.error(error.message || error);
		}
	},
};
