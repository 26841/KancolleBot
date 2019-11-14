const Booru = require('booru');
const {BooruError, sites} = require('booru');
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'

const site = 'safebooru';
const tags = ['glaceon'];

// Search with promises
module.exports = {
	name: 'arttest',
	description: 'Get two random images from danbooru (sfw by danbooru ratings)',
	cooldown: 5,
	execute(message, args) {
		Booru.search(site, args, { limit: 2, random: true })
			.then(posts => {
				// Log the direct link to each image
				console.log(args);
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
