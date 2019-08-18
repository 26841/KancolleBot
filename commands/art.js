const Booru = require('booru');
const { BooruError, sites } = require('booru');
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'
const site = 'safebooru';

module.exports = {
	name: 'art',
	description: 'Get a random image from safebooru',
	execute(message) {
		console.log(message);
		console.log(String(message));
		Booru.search(site, String(message), { limit: 1, random: true })
			.then(posts => {
				// Log the direct link to each image
				for (const post of posts) {
					console.log(post.fileUrl);
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
	},
};
