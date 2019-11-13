module.exports = {
	name: 'time',
	description: 'Time Check',
	cooldown: 5,
	execute(message) {
		const today = new Date();
		let minutes = today.getMinutes();
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		message.channel.send((today.getMonth() + 1) + '/' + today.getDate() + ', ' + today.getHours() + ':' + minutes + ':' + today.getSeconds());
	},
};
