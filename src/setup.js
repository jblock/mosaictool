var lastTime = 0,
    vendors = ['ms', 'moz', 'webkit', 'o'],
    x,
    length,
    currTime,
    timeToCall;

for(x = 0, length = vendors.length; x < length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = 
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        currTime = new Date().getTime();
        timeToCall = Math.max(0, 16 - (currTime - lastTime));
        lastTime = currTime + timeToCall;
        return window.setTimeout(function() { callback(currTime + timeToCall); }, 
          timeToCall);
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
};

$(function() {

    App.DEBUG = true;

    if (App.DEBUG) {
        Utils.c = window.console || {};
    } else {
        Utils.c = {};
        Utils.c.log = function(args) {
            return false;
        }
    }

	App.window = $(window);

    App.isSafari = navigator.userAgent.toLowerCase().indexOf('safari');

    App.hideImage = false;

	Backbone.emulateJSON = true;

	App._layers = new App.Layers;

	App.main = new App.AppView;

});