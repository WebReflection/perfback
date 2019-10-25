function PerfBack(production, ignoreLogs) {
  var __proto__ = PerfBack.prototype;
  var profiler = {__proto__: __proto__, log: !ignoreLogs};
  return Object.defineProperties(
    profiler,
    {
      production: {value: !!production},
      measure: {value: __proto__.measure.bind(profiler)}
    }
  );
}

PerfBack.prototype.measure = function measure(name, fn) {
  var self = this;
  if (self.production)
    return fn || name;
  if (arguments.length < 2) {
    fn = name;
    name = fn.name || ''.split.call(fn, /[\r\n]+/)[0].slice(0, 80);
  }
  var random = Math.random();
  var i = 0;
  return function () {
    var log = self.log;
    if (log) {
      var id = name + random + i++;
      performance.mark(id);
    }
    var result = fn.apply(this, arguments);
    if (log) {
      performance.measure(id, id);
      performance.clearMarks(id);
      console.log(name, performance.getEntriesByName(id)[0].duration);
      performance.clearMeasures(id);
    }
    return result;
  };
};
module.exports = PerfBack;
