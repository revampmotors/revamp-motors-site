// hover.js — makes style-hover / style-focus attributes live.
(function () {
  function parse(str) {
    var out = [];
    if (!str) return out;
    var parts = str.split(';');
    for (var i = 0; i < parts.length; i++) {
      var s = parts[i].trim();
      if (!s) continue;
      var j = s.indexOf(':');
      if (j < 0) continue;
      out.push([s.slice(0, j).trim(), s.slice(j + 1).trim()]);
    }
    return out;
  }
  function apply(el, attr, key) {
    var decl = parse(el.getAttribute(attr));
    var prev = [];
    for (var i = 0; i < decl.length; i++) {
      var p = decl[i][0];
      prev.push([p, el.style.getPropertyValue(p), el.style.getPropertyPriority(p)]);
      el.style.setProperty(p, decl[i][1], 'important');
    }
    el[key] = prev;
  }
  function restore(el, key) {
    var prev = el[key];
    if (!prev) return;
    for (var i = 0; i < prev.length; i++) {
      if (prev[i][1]) el.style.setProperty(prev[i][0], prev[i][1], prev[i][2]);
      else el.style.removeProperty(prev[i][0]);
    }
    el[key] = null;
  }
  document.addEventListener('mouseover', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-hover]') : null;
    while (el) {
      if (!el.__hoverPrev) apply(el, 'data-hover', '__hoverPrev');
      el = el.parentElement ? el.parentElement.closest('[data-hover]') : null;
    }
  }, true);
  document.addEventListener('mouseout', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-hover]') : null;
    while (el) {
      if (el.__hoverPrev && !(e.relatedTarget && el.contains(e.relatedTarget))) restore(el, '__hoverPrev');
      el = el.parentElement ? el.parentElement.closest('[data-hover]') : null;
    }
  }, true);
  document.addEventListener('focusin', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-focus]') : null;
    if (el && !el.__focusPrev) apply(el, 'data-focus', '__focusPrev');
  }, true);
  document.addEventListener('focusout', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('[data-focus]') : null;
    if (el && el.__focusPrev) restore(el, '__focusPrev');
  }, true);
})();
