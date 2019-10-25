var PerfBack = (function (cache, random) {
  return function PerfBack(production, ignoreLogs) {
    return production ?
      {
        production: true,
        log: false,
        start: pass,
        end: pass,
        measure: pass
      } :
      {
        production: false,
        log: !ignoreLogs,
        get start() {
          return start.bind(this);
        },
        get end() {
          return end.bind(this);
        },
        get measure() {
          return measure.bind(this);
        }
      };
  };

  function end(id) {
    performance.measure(id, id);
    performance.clearMarks(id);
    var name = cache[id];
    var duration = performance.getEntriesByName(id)[0].duration;
    console.log(name, duration);
    performance.clearMeasures(id);
    delete cache[id];
    return {name: name, duration: duration};
  }

  function start(name) {
    var id = '' + random++;
    cache[id] = name || 'function';
    performance.mark(id);
    return id;
  }

  function measure(name, callback) {
    var fn = callback || name;
    var log = fn === name ?
              (fn.name || ''.split.call(fn, /[\r\n]+/)[0].slice(0, 80)) :
              name;
    var self = this;
    return function () {
      var id = self.log ? start(log) : '';
      var result = fn.apply(this, arguments);
      if (id) end(id);
      return result;
    };
  }

  function pass(name, callback) {
    return callback || name;
  }
}(
  Object.create(null),
  Math.random()
));
module.exports = PerfBack;
