// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/stages/gameState/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameState = void 0;
var GameState;

(function (GameState) {
  GameState[GameState["GAME"] = 0] = "GAME";
  GameState[GameState["MENU"] = 1] = "MENU";
  GameState[GameState["GAME_OVER"] = 2] = "GAME_OVER";
})(GameState = exports.GameState || (exports.GameState = {}));
},{}],"src/js/control/gamePad/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePad = void 0;
var GamePad;

(function (GamePad) {
  GamePad["UP"] = "ArrowUp";
  GamePad["DOWN"] = "ArrowDown";
  GamePad["ENTER"] = "Enter";
})(GamePad = exports.GamePad || (exports.GamePad = {}));
},{}],"src/js/bird/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bird = void 0;

var Bird =
/** @class */
function () {
  function Bird(x, y) {
    this.x = x;
    this.y = y;
    this.isJumping = false;
    this.color = "green";
    this.size = 18;
  }

  Bird.prototype.draw = function (paint) {
    paint.fillStyle = this.color;
    paint.fillRect(this.x, this.y, this.size, this.size);
  };

  Bird.prototype.hasCollision = function (other) {
    var birdRectangle = {
      x: this.x,
      y: this.y,
      width: this.size,
      height: this.size
    };

    if (birdRectangle.x < other.x + other.width && birdRectangle.x + birdRectangle.width > other.x && birdRectangle.y < other.y + other.height && birdRectangle.y + birdRectangle.height > other.y) {
      return true;
    }

    return false;
  };

  Bird.prototype.reset = function () {
    this.x = 10;
    this.y = 0;
  };

  Object.defineProperty(Bird.prototype, "position", {
    get: function get() {
      return {
        x: this.x,
        y: this.y
      };
    },
    enumerable: false,
    configurable: true
  });

  Bird.prototype.update = function () {
    if (this.isJumping) {
      this.y -= 80;
      this.isJumping = false;
    }

    this.y += 2;
  };

  return Bird;
}();

exports.Bird = Bird;
},{}],"src/js/pipeGroup/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PipeGroup = void 0;

var PipeGroup =
/** @class */
function () {
  function PipeGroup(x, canvasWidth, canvasHeight) {
    this.x = x;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    var downstairsHeight = Math.floor(Math.random() * 120) + 50;
    var upstairsHeight = Math.floor(Math.random() * 150) + 50;
    this.upstairs = {
      x: x,
      y: 0,
      width: PipeGroup.MAX_WIDTH,
      height: upstairsHeight
    };
    this.downstairs = {
      x: x,
      y: canvasHeight - downstairsHeight,
      width: PipeGroup.MAX_WIDTH,
      height: downstairsHeight
    };
  }

  PipeGroup.prototype.reset = function () {
    var _a = this,
        x = _a.x,
        y = _a.y;

    var downstairsHeight = Math.floor(Math.random() * 120) + 50;
    var upstairsHeight = Math.floor(Math.random() * 150) + 50;
    this.upstairs = {
      x: this.x + this.canvasWidth / 2,
      y: 0,
      width: PipeGroup.MAX_WIDTH,
      height: upstairsHeight
    };
    this.downstairs = {
      x: this.x + this.canvasWidth / 2,
      y: this.canvasHeight - downstairsHeight,
      width: PipeGroup.MAX_WIDTH,
      height: downstairsHeight
    };
  };

  PipeGroup.prototype.drawRectangle = function (paint, rectangle, color) {
    paint.fillStyle = color;
    paint.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  };

  PipeGroup.prototype.draw = function (paint) {
    this.drawRectangle(paint, this.upstairs, '#fff');
    this.drawRectangle(paint, this.downstairs, "red");
  };

  PipeGroup.prototype.update = function () {
    if (this.upstairs.x < -PipeGroup.MAX_WIDTH) {
      this.upstairs.x = this.canvasWidth;
      var upstairsHeight = Math.floor(Math.random() * 150) + 50;
      this.upstairs.height = upstairsHeight;
    }

    if (this.downstairs.x < -PipeGroup.MAX_WIDTH) {
      this.downstairs.x = this.canvasWidth;
      var downstairsHeight = Math.floor(Math.random() * 120) + 50;
      this.downstairs.height = downstairsHeight;
      this.downstairs.y = this.canvasHeight - downstairsHeight;
    }

    this.upstairs.x -= 5;
    this.downstairs.x -= 5;
  };

  PipeGroup.MAX_WIDTH = 20;
  return PipeGroup;
}();

exports.PipeGroup = PipeGroup;
},{}],"src/js/stages/game/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var gameState_1 = require("../gameState");

var gamePad_1 = require("../../control/gamePad");

var bird_1 = require("../../bird");

var pipeGroup_1 = require("../../pipeGroup");

var Game =
/** @class */
function () {
  function Game(width, height) {
    this.width = width;
    this.height = height;
    this.actualState = gameState_1.GameState.MENU;
    this.bird = new bird_1.Bird(10, 0);
    this.pipes = [new pipeGroup_1.PipeGroup(width - pipeGroup_1.PipeGroup.MAX_WIDTH, width, height), new pipeGroup_1.PipeGroup(width - pipeGroup_1.PipeGroup.MAX_WIDTH - 180, width, height)];
  }

  ;

  Game.prototype.keyUp = function (key) {
    switch (key) {
      case gamePad_1.GamePad.UP:
        if (this.actualState === gameState_1.GameState.GAME) {
          this.bird.isJumping = true;
        }

        break;

      case gamePad_1.GamePad.ENTER:
        if (this.actualState === gameState_1.GameState.MENU) {
          this.actualState = gameState_1.GameState.GAME;
        } else if (this.actualState === gameState_1.GameState.GAME_OVER) {
          this.actualState = gameState_1.GameState.GAME;
          this.pipes.forEach(function (pipe) {
            return pipe.reset();
          });
          this.bird.reset();
        }

    }
  };

  Game.prototype.keyDown = function (key) {
    switch (key) {
      case gamePad_1.GamePad.UP:
        if (this.actualState === gameState_1.GameState.GAME) {
          this.bird.isJumping = false;
        }

        break;
    }
  };

  Game.prototype.draw = function (paint) {
    if (this.actualState === gameState_1.GameState.GAME) {
      paint.beginPath();
      paint.fillStyle = "#000";
      paint.fillRect(0, 0, this.width, this.height);
      paint.closePath();
      paint.fill();

      for (var _i = 0, _a = this.pipes; _i < _a.length; _i++) {
        var pipe = _a[_i];
        pipe.draw(paint);
      }

      this.bird.draw(paint);
    } else if (this.actualState === gameState_1.GameState.GAME_OVER) {
      paint.beginPath();
      paint.fillStyle = "red";
      paint.font = "20px Arial";
      paint.fillText("Game Over", this.width / 2 - 50, this.height / 2);
      paint.fill();
    } else if (this.actualState === gameState_1.GameState.MENU) {
      paint.beginPath();
      paint.fillStyle = "#000";
      paint.fillRect(0, 0, this.width, this.height);
      paint.fillStyle = "red";
      paint.font = "20px Arial";
      paint.fillText("FlappyBird", this.width / 2 - 50, this.height / 2);
      paint.fillStyle = "#fff";
      paint.font = "15px Arial";
      paint.fillText("Aperte enter para começar", this.width / 2 - 100, this.height / 2 + 30);
      paint.fill();
    }
  };

  Game.prototype.update = function () {
    if (this.actualState === gameState_1.GameState.GAME) {
      this.bird.update();

      for (var _i = 0, _a = this.pipes; _i < _a.length; _i++) {
        var pipe = _a[_i];
        pipe.update();

        if (this.bird.hasCollision(pipe.downstairs)) {
          this.actualState = gameState_1.GameState.GAME_OVER;
        }

        if (this.bird.hasCollision(pipe.upstairs)) {
          this.actualState = gameState_1.GameState.GAME_OVER;
        }
      }

      if (this.bird.position.y > this.height) {
        this.actualState = gameState_1.GameState.GAME_OVER;
      }
    } else if (this.actualState === gameState_1.GameState.MENU) {}
  };

  return Game;
}();

exports.Game = Game;
},{"../gameState":"src/js/stages/gameState/index.ts","../../control/gamePad":"src/js/control/gamePad/index.ts","../../bird":"src/js/bird/index.ts","../../pipeGroup":"src/js/pipeGroup/index.ts"}],"src/js/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_1 = require("./stages/game");

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var WIDTH = 128;
var HEIGHT = 160;
var SCALE = 3;
canvas.width = WIDTH * SCALE;
canvas.height = HEIGHT * SCALE;
var game = new game_1.Game(canvas.width, canvas.height);

function update() {
  game.update();
}

function draw() {
  game.draw(context);
}

window.addEventListener("keyup", function (event) {
  game.keyUp(event.key);
});
window.addEventListener("keydown", function (event) {
  game.keyDown(event.key);
});

function mainLoop() {
  update();
  draw();
  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
},{"./stages/game":"src/js/stages/game/index.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46307" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/main.ts"], null)
//# sourceMappingURL=/main.c1e57f8b.js.map