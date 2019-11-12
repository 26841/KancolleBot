const Booru = require('booru');
const { BooruError, sites } = require('booru');
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'
const site = 'danbooru';

module.exports = {
	name: 'art2',
	description: 'Get a random image from danbooru, test using filter',
	execute(message, args) {
		Booru.search(site, args, { limit: 100, random: true })
			.then(posts => {
				// Log the direct link to each image
				posts.filter(post => (post || {}).rating === 's')
					.slice(0, 2)
					.forEach(post => message.channel.send(post.postView));
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
	},
};
