const Booru = require('booru');
const { BooruError, sites } = require('booru');
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'
const site = 'danbooru';

module.exports = {
	name: 'nsfw',
	description: 'Get a random nsfw image from danbooru (only functional in nsfw channels)',
	execute(message, args) {
		if (!message.channel.nsfw) {
			message.reply('I can\'t execute that command in a non-nsfw channel!');
		}
		else {
			Booru.search(site, args, { limit: 2, random: true })
				.then(posts => {
					// Log the direct link to each image
					console.log(posts);
					for (const post of posts) {
						console.log(post);
						console.log(post.postView);
						if (post && post.rating !== 's') {
							message.channel.send(post.postView);
						}
						else {
							message.channel.send('Chickens!');
						}
					}
				})
				.catch(err => {
					if (err instanceof BooruError) {
						// It's a custom error thrown by the package
						// Typically results from errors the boorus returns, eg. "too many tags"
						console.error(err.message);
					}
					else {
						// This means something pretty bad happened
						console.error(err);
					}
				});
		}
	},
};
