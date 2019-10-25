# perfback

[![Build Status](https://travis-ci.com/WebReflection/perfback.svg?branch=master)](https://travis-ci.com/WebReflection/perfback) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/perfback/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/perfback?branch=master)

A simple callback performance monitor, compatible with IE11 and above.

```js
import PerfBack from 'perfback';
// or const PerfBack = require('perfback');

const pb = new PerfBack(
  production,   // boolean value to specify it's production code or not
                // if true, the pb.measure(fn) method would return just the fn
  ignoreLogs    // to indicate if logs should be shown in console
                // false by default (pass true to avoid logging)
);

// all methods are self bound
const {measure, start, end} = pb;


// pass a function
const fn = measure(() => {});

// or a name to log, and a function
const fn = measure('noop', () => {});

// from now on, every fn() call will log its invoking duration
fn();

// create a mark unique id
const id = start('description');

// whenever is convenient, clear the mark and read the log
end(id);

// if you'd like to stop logging a specific PerfBack object
pb.log = false;
// from now on all marks that where not set won't measure performance
```
