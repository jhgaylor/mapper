// CORS headers...  lets just let them all in, shall we?
WebApp.rawConnectHandlers.use( "*", function(req, res, next) {
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('Access-Control-Allow-Origin', '*');
});