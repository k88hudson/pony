module.exports = function(){
  return {
    config: function( env ) {
      var config = {
        PORT: env.get( "PORT" ),
        DEV: env.get( "NODE_ENV" )
      };
      return function( req, res ) {
        res.set( "Content-Type", "application/javascript");
        res.send( "define(function(require){ return " + JSON.stringify( config ) + " });");
      };
    },
    page: function( view ) {
      return function( req, res ) {
        res.render( view + ".html", { page: view } );
      };
    }
  };
};
