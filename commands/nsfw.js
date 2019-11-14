const { each } = require('bluebird');
const _ = require('lodash');
const { search } = require('booru');
const site = 'danbooru';
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'

module.exports = {
	name: 'nsfw',
	description: 'Get two random nsfw images from danbooru (only functional in nsfw channels)',
	async execute(message, args) {
		if (!message.channel.nsfw) {
			message.reply('I can\'t execute that command in a non-nsfw channel!');
		}
		else {
			try {
				await each(
					_(await search(site, args.slice(0, args.length - 1), { limit: 100, random: true }))
						.filter(post => (post || {}).rating !== 's' && (post || {}).previewUrl !== null)
						.take(2),
					post => {console.log(args); message.channel.send(post.postView);},
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
		}
	},
};
