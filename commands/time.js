module.exports = {
	name: 'time',
	description: 'Time Check',
	cooldown: 5,
	execute(message) {
		const today = new Date();
		message.channel.send(today.getMonth() + '/' + today.getDate() + ',' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds());
	},
};
