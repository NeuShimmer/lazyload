import inViewport from 'in-viewport';

const lazyAttrs = ['data-src'];
const replacedGetAttribute = [];

function lazyload(opt) {
  const opts = Object.assign({
    'offset': 200,
    'src': 'data-src',
    'container': false,
    'loader': null,
    'replaceGetAttribute': false
  }, opt || {});

  if (typeof opts.src === 'string') {
    if (lazyAttrs.indexOf(opts.src) === -1) {
      lazyAttrs.push(opts.src);
    }
  }

  const elts = [];

  function show(elt) {
    const src = findRealSrc(elt);

    if (src) {
      if (opts.loader) {
        opts.loader(elt, src);
      } else {
        elt.src = src;
      }
    }

    elt.setAttribute('data-lzled', true);
    elts[elts.indexOf(elt)] = null;
  }

  function findRealSrc(elt) {
    if (typeof opts.src === 'function') {
      return opts.src(elt);
    }

    return elt.getAttribute(opts.src);
  }

  function register(elt) {
    // unsubscribe onload
    // needed by IE < 9, otherwise we get another onload when changing the src
    elt.onload = null;
    elt.removeAttribute('onload');

    // https://github.com/vvo/lazyload/issues/62
    elt.onerror = null;
    elt.removeAttribute('onerror');

    if (elts.indexOf(elt) === -1) {
      inViewport(elt, opts, show);
      replaceGetAttribute(elt);
    }
  }

  return register;
}

function replaceGetAttribute(elt) {
  const elementName = elt.__proto__;
  if (replacedGetAttribute.indexOf(elementName) !== -1) {
    return;
  }

  const original = elementName.getAttribute;
  elementName.getAttribute = function(name) {
    if (name === 'src') {
      var realSrc;
      for (var i = 0, max = lazyAttrs.length; i < max; i++) {
        realSrc = original.call(this, lazyAttrs[i]);
        if (realSrc) {
          break;
        }
      }

      return realSrc || original.call(this, name);
    }

    // our own lazyloader will go through theses lines
    // because we use getAttribute(opts.src)
    return original.call(this, name);
  };
}

export default lazyload;
