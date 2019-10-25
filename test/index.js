global.performance = {
  mark: Object,
  measure: Object,
  clearMarks: Object,
  clearMeasures: Object,
  getEntriesByName: () => ['']
};

var PerfBack = require('../cjs');

var pb = PerfBack();
var cb = pb.measure(function () {});
cb();

pb = PerfBack(true);
cb = pb.measure(function () {});
cb();

pb = PerfBack(false, true);
cb = pb.measure(function () {});
cb();

pb = PerfBack();
cb = pb.measure('no-op', function () {});
cb();

