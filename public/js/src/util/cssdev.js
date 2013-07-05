define( function (require) {

  var baseDir = "/css",
      extDir;

  function createTag( url ) {
    var el = document.createElement( "link" );
    el.setAttribute( "rel", "stylesheet" );
    el.setAttribute( "href", url );
    return el;
  }

  var cssConfig = require( baseDir + "/style.js" );

  return function( options ) {
    options = options || {};
    baseDir = options.baseDir || "/css";
    extDir = options.extDir || "/css/ext";

    console.log( cssConfig );
    /*page = options.page,
        files = cssConfig.main.concat( css[ page ] || [] );

    return {
      createTag: createTag,
      devmode: function() {
        files.forEach( function( name ) {
          var el = createTag( baseDir + "/" + name + ".css" );
          document.head.appendChild( el );
        });
      }
    };

    */

  };

});
