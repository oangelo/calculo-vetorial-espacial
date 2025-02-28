!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define(t)
      : ((e =
          'undefined' != typeof globalThis
            ? globalThis
            : e || self).RevealSearch = t());
})(this, function () {
  'use strict';
  /*!
   * Handles finding a text string anywhere in the slides and showing the next occurrence to the user
   * by navigatating to that slide and highlighting it.
   *
   * @author Jon Snyder <snyder.jon@gmail.com>, February 2013
   */ return () => {
    let e, t, n, l, o, i, r;
    function s() {
      (t = document.createElement('div')),
        t.classList.add('searchbox'),
        (t.style.position = 'absolute'),
        (t.style.top = '10px'),
        (t.style.right = '10px'),
        (t.style.zIndex = 10),
        (t.innerHTML =
          '<input type="search" class="searchinput" placeholder="Search..." style="vertical-align: top;"/>\n\t\t</span>'),
        (n = t.querySelector('.searchinput')),
        (n.style.width = '240px'),
        (n.style.fontSize = '14px'),
        (n.style.padding = '4px 6px'),
        (n.style.color = '#000'),
        (n.style.background = '#fff'),
        (n.style.borderRadius = '2px'),
        (n.style.border = '0'),
        (n.style.outline = '0'),
        (n.style.boxShadow = '0 2px 18px rgba(0, 0, 0, 0.2)'),
        (n.style['-webkit-appearance'] = 'none'),
        e.getRevealElement().appendChild(t),
        n.addEventListener(
          'keyup',
          function (t) {
            if (13 === t.keyCode)
              t.preventDefault(),
                (function () {
                  if (i) {
                    var t = n.value;
                    '' === t
                      ? (r && r.remove(), (l = null))
                      : ((r = new c('slidecontent')),
                        (l = r.apply(t)),
                        (o = 0));
                  }
                  l &&
                    (l.length && l.length <= o && (o = 0),
                    l.length > o && (e.slide(l[o].h, l[o].v), o++));
                })(),
                (i = !1);
            else i = !0;
          },
          !1
        ),
        d();
    }
    function a() {
      t || s(), (t.style.display = 'inline'), n.focus(), n.select();
    }
    function d() {
      t || s(), (t.style.display = 'none'), r && r.remove();
    }
    function c(t, n) {
      var l = document.getElementById(t) || document.body,
        o = n || 'EM',
        i = new RegExp('^(?:' + o + '|SCRIPT|FORM)$'),
        r = ['#ff6', '#a0ffff', '#9f9', '#f99', '#f6f'],
        s = [],
        a = 0,
        d = '',
        c = [];
      (this.setRegex = function (e) {
        (e = e.replace(/^[^\w]+|[^\w]+$/g, '').replace(/[^\w'-]+/g, '|')),
          (d = new RegExp('(' + e + ')', 'i'));
      }),
        (this.getRegex = function () {
          return d
            .toString()
            .replace(/^\/\\b\(|\)\\b\/i$/g, '')
            .replace(/\|/g, ' ');
        }),
        (this.hiliteWords = function (t) {
          if (null != t && t && d && !i.test(t.nodeName)) {
            if (t.hasChildNodes())
              for (var n = 0; n < t.childNodes.length; n++)
                this.hiliteWords(t.childNodes[n]);
            var l, f;
            if (3 == t.nodeType)
              if ((l = t.nodeValue) && (f = d.exec(l))) {
                for (var p = t; null != p && 'SECTION' != p.nodeName; )
                  p = p.parentNode;
                var u = e.getIndices(p),
                  h = c.length,
                  y = !1;
                for (n = 0; n < h; n++)
                  c[n].h === u.h && c[n].v === u.v && (y = !0);
                y || c.push(u),
                  s[f[0].toLowerCase()] ||
                    (s[f[0].toLowerCase()] = r[a++ % r.length]);
                var g = document.createElement(o);
                g.appendChild(document.createTextNode(f[0])),
                  (g.style.backgroundColor = s[f[0].toLowerCase()]),
                  (g.style.fontStyle = 'inherit'),
                  (g.style.color = '#000');
                var v = t.splitText(f.index);
                (v.nodeValue = v.nodeValue.substring(f[0].length)),
                  t.parentNode.insertBefore(g, v);
              }
          }
        }),
        (this.remove = function () {
          for (
            var e, t = document.getElementsByTagName(o);
            t.length && (e = t[0]);

          )
            e.parentNode.replaceChild(e.firstChild, e);
        }),
        (this.apply = function (e) {
          if (null != e && e)
            return this.remove(), this.setRegex(e), this.hiliteWords(l), c;
        });
    }
    return {
      id: 'search',
      init: (n) => {
        (e = n),
          e.registerKeyboardShortcut('CTRL + Shift + F', 'Search'),
          document.addEventListener(
            'keydown',
            function (e) {
              'F' == e.key &&
                (e.ctrlKey || e.metaKey) &&
                (e.preventDefault(),
                t || s(),
                'inline' !== t.style.display ? a() : d());
            },
            !1
          );
      },
      open: a,
    };
  };
});
