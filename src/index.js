// 1. Create json server
const jsonServer = require('json-server');
const server = jsonServer.create();

// 2. Set default router and middleware
const router = jsonServer.router({});
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// 3. Handling request and response
const PORT = 3002; // Port value is changeable
const THROTTLE = 1500; // Time delay for each request

router.render = (req, res) => {
	const path = req.originalUrl;
	try {
		const mock = require('./mockdata' + path + '/response.json');
		setTimeout(() => {
			res.status(200).jsonp(mock);
		}, Math.random() * THROTTLE);
	} catch (error) {
		res.status(200).jsonp(`API ${path} is not mocked (existed)`);
	}
};

// 4. Start server
server.listen(PORT, () => {
	console.log('JSON Server is running');
});
