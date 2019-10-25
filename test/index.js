global.performance = {
  mark: Object,
  measure: Object,
  clearMarks: Object,
  clearMeasures: Object,
  getEntriesByName: () => [{duration: Math.random()}]
};

var PerfBack = require('../cjs');

var pb = PerfBack();
var cb = pb.measure(function () {});
cb();

pb = PerfBack(true);
cb = pb.measure(function () {});
cb();
pb.toString();

pb = PerfBack(false, true);
cb = pb.measure(function () {});
cb();

pb = PerfBack();
cb = pb.measure('no-op', function () {});
cb();

var id = pb.start('callback');
pb.end(id);

id = pb.start();
pb.end(id);
pb.toString();
