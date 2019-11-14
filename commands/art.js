const { each } = require('bluebird');
const _ = require('lodash');
const { search } = require('booru');
const site = 'danbooru';
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'
const tags = ['nagato_(kantai_collection)', 'mutsu_(kantai_collection)'];

module.exports = {
	name: 'art',
	description: 'Get two random images from danbooru (sfw by danbooru ratings)',
	async execute(message, args) {
		try {
			await each(
				_(await search(site, tags.slice(0, tags.length - 1), { limit: 100, random: true }))
					.filter(post => (post || {}).rating === 's' && (post || {}).previewUrl !== null)
					.take(2),
				post => {console.log(tags); message.channel.send(post.postView);},
			);
		}
		catch (error) {
			if (tags.length > 2) {
				message.reply('You cannot search for more than two tags at a time!');
			}
			else {
				message.channel.send('Something went wrong.');
				console.error(error.message || error);
			}
		}
	},
};
