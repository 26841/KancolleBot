const { each } = require('bluebird');
const _ = require('lodash');
const Booru = require('booru');
const site = 'gelbooru';
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'

module.exports = {
	name: 'art',
	description: 'Get two random images from gelbooru (sfw by gelbooru ratings).',
	async execute(message, args) {
		try {
			await each(
				_(await Booru.search(site, args, { limit: 100, random: true }))
					.filter(post => (post || {}).rating === 's' && (post || {}).previewUrl !== null)
					.take(2),
				post => {console.log(args); message.channel.send(post.postView);},
			);
		}
		catch (error) {
			message.channel.send('Something went wrong.');
			console.error(error.message || error);
		}
	},
};
