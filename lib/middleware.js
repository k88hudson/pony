 module.exports.detectLocale = function(req, res, next) {
    var locale = req.headers["accept-language"];
    if ( locale ) {
      res.locals.locale = locale.slice(0,2);
      console.log(res);
    }
    res.locals.test = "test";
   next();
 };
