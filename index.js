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

PerfBack.prototype.measure = function measure(fn) {
  var self = this;
  if (self.production)
    return fn;
  var name = fn.name || ''.split.call(fn, /[\r\n]+/)[0].slice(0, 80);
  var random = Math.random();
  var i = 0;
  return function () {
    if (self.log) {
      var id = name + random + i++;
      performance.mark(id);
    }
    var result = fn.apply(this, arguments);
    if (id) {
      performance.measure(id, id);
      performance.clearMarks(id);
      console.log(name, performance.getEntriesByName(id)[0].duration);
      performance.clearMeasures(id);
    }
    return result;
  };
};
