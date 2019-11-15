const { each } = require('bluebird');
const _ = require('lodash');
const Booru = require('booru');
const site = 'danbooru';
const fetch = require('node-fetch');
// for ES6:
// import Booru, { search, BooruError, sites } from 'booru'

module.exports = {
	name: 'art2',
	description: 'Get two random images from danbooru (sfw by danbooru ratings)',
	execute(message, args) {
		let tags = '';
		if (args.length < 3) {
			for (const arg in args) {
				tags += args[arg] + '+';
			}
			const url = 'https://danbooru.donmai.us/posts.json?tags=' + tags + 'rating:safe&limit=2&random=true';
			fetch(url)
				.then(res => res.json())
				.then(json => {
					console.log(json);
					for (const post in json) {
						console.log(json[post]);
						console.log(json[post].file_url);
					}
				});
		}
		else {
			return message.reply('You cannot search for more than two tags at a time!');
		}
	},
};
