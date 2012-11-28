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

/**
* https://gist.github.com/3619992/eef6ef36d6161aec114d760608c42dc2971bdb61
* Moves a model to the given index, if different from its current index. Handy
* for shuffling models about after they've been pulled into a new position via
* drag and drop.
*/
Backbone.Collection.prototype.move = function(model, toIndex) {
  var fromIndex = this.indexOf(model)
  if (fromIndex == -1) {
    throw new Error("Can't move a model that's not in the collection")
  }
  if (fromIndex !== toIndex) {
    this.models.splice(toIndex, 0, this.models.splice(fromIndex, 1)[0])
  }
}

$(function() {

    App.DEBUG = false;

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