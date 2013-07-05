var express = require( "express" ),
    habitat = require( "habitat" ),
    nunjucks = require( "nunjucks" ),
    path = require( "path" ),
    route = require( "./routes" ),
    lessMiddleWare = require( "less-middleware" );

habitat.load();

var app = express(),
    env = new habitat(),
    nunjucksEnv = new nunjucks.Environment( new nunjucks.FileSystemLoader( path.join( __dirname, 'views' ))),
    fontawesome = require("fontawesome-express"),
    connectFonts = require("connect-fonts"),
    opensans = require("connect-fonts-opensans"),
    routes = route(),
    NODE_ENV = env.get( "NODE_ENV" ),
    WWW_ROOT = path.resolve( __dirname, "public" ),
    middleware = require("./lib/middleware");

nunjucksEnv.express( app );

app.disable( "x-powered-by" );

app.use( express.logger( NODE_ENV === "development" ? "dev" : "" ) );
app.use( express.compress() );
app.use( express.static( path.join( __dirname, "public" )));
app.use( express.bodyParser() );
app.use( middleware.detectLocale );
app.use(connectFonts.setup({
  fonts: [opensans],
  allow_origin: 'http://localhost:9999'
}));

var optimize = NODE_ENV !== "development",
    tmpDir = path.join( require( "os" ).tmpDir(), "k88hudson.pony" );

app.use( lessMiddleWare({
  once: optimize,
  debug: !optimize,
  dest: tmpDir,
  src: WWW_ROOT,
  compress: optimize,
  yuicompress: optimize,
  optimization: optimize ? 0 : 2
}));
app.use( express.static( tmpDir ) );
app.use( app.router );


app.get( "/", routes.page( "index" ) );
app.get( "/config.js", routes.config( env ) );

fontawesome( app, { optimize: NODE_ENV != "development" } );

app.listen( env.get( "PORT" ), function() {
  console.log( "Server listening ( http://localhost:%d )", env.get( "PORT" ));
});

