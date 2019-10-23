# perfback

[![Build Status](https://travis-ci.com/WebReflection/perfback.svg?branch=master)](https://travis-ci.com/WebReflection/perfback) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/perfback/badge.svg?branch=master)](https://coveralls.io/github/WebReflection/perfback?branch=master)

A simple callback performance monitor

```js
import PerfBack from 'perfback';
// or const PerfBack = require('perfback');

const pb = new PerfBack(
  production,   // boolean value to specify it's production code or not
                // if true, the pb.measure(fn) method would return just the fn
  ignoreLogs    // to indicate if logs should be shown in console
                // false by default
);

const fn = pb.measure(() => {});

// from now on, every fn() call will log its invoking duration

```
