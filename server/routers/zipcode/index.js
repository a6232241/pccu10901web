var zipdb = require("zippity-do-dah");
var weather = require('openweather-apis');
weather.setLang('zh_tw');
weather.setAPPID("d30d4191ebe5d952f389eb4df4fa8df6");

app.get(/^\/(\d{5})$/, function (req, res, next) {
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if (!location.zipcode) {
        next();
        return;
    }
    var latitude = location.latitude;
    var longitude = location.longitude;
    weather.setCoordinate(latitude, longitude);
    weather.getAllWeather(function (err, JSONObj) {
        if (err) {
            next();
            return;
        }
        res.json({
            zipcode: zipcode,
            city: JSONObj.name,
            temperature: JSONObj.main.temp
        });
    });
});