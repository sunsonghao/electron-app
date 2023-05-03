exports.debounce = function(fn, time) {
  let timer;
  return function(...rest) {
    if (timer) { 
      clearTimeout(timer);
    }

    return new Promise(resolve => {
      timer = setTimeout(() => {
        resolve(fn.apply(this, rest))
      }, time);
    });
  }
}

exports.throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function() {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function() {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};