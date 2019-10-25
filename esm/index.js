var PerfBack = (function (cache, random) {

  return PerfBack;

  function PerfBack(production, noLog) {
    return production ?
      {
        production: true,
        log: false,
        start: pass,
        end: pass,
        measure: pass,
        toString: toString
      } :
      {
        production: false,
        log: !noLog,
        get start() {
          return start.bind(this);
        },
        get end() {
          return end.bind(this);
        },
        get measure() {
          return measure.bind(this);
        },
        toString: toString
      };
  }

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
    var mark = fn === name ?
                (fn.name || ''.split.call(fn, /[\r\n]+/)[0].slice(0, 80)) :
                name;
    var self = this;
    return function () {
      var id = self.log ? start(mark) : '';
      var result = fn.apply(this, arguments);
      if (id) end(id);
      return result;
    };
  }

  function pass(name, callback) {
    return callback || name;
  }

  function toString() {
    return this.production ?
      'function (pass, toString) { return {production: true, log: false,' +
      ' start: pass, end: pass, measure: pass, toString: toString}; }(\n' +
      pass + ',\n' + toString + ')' :
      [
        'function (cache, random) {',
        '  return ' + PerfBack + '(false, ' + !this.log + ');',
        '  ' + start,
        '  ' + end,
        '  ' + measure,
        '  ' + pass,
        '  ' + toString,
        '}(Object.create(null), Math.random())'
      ].join('\n');
  }
}(
  Object.create(null),
  Math.random()
));
export default PerfBack;
