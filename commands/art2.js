const Booru = require('booru');
const { BooruError, sites } = require('booru');
const site = 'danbooru';
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'

module.exports = {
	name: 'art2',
	description: 'Get two random images from danbooru (sfw by danbooru ratings)',
	execute(message, args) {
		let count = 0;
		Booru.search(site, args, { limit: 100, random: true })
			.then(posts => {
				for (const post of posts) {
					if (count === 2) {
						break;
					}
					if (post.rating === 's') {
						count++;
						message.channel.send(post.postView);
					}
				}
			})
			.catch(err => {
				if (err instanceof BooruError) {
					console.error(err.message);
				}
				else {
					console.error(err);
				}
			});
	},
};
