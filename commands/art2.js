const { each } = require('bluebird');
const _ = require('lodash');
const Booru = require('booru');
const site = 'danbooru';
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'

module.exports = {
	name: 'art2',
	description: 'Get two random images from danbooru (sfw by danbooru ratings)',
	async execute(message, args) {
		try {
			Booru.search(site, args.slice(0, args.length - 1), { limit: 100, random: true })
				.then(posts => {
					console.log(posts);
					posts.filter(post => (post || {}).rating === 's' && (post || {}).previewUrl !== null).take(2),
					post => {console.log(args); message.channel.send(post.postView);};
				});
		}
		catch (error) {
			console.log(args);
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
