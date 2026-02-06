import E from "@navara/three";
import { createContext as m, useContext as k, useState as x, useRef as c, useEffect as R } from "react";
var v = { exports: {} }, a = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f;
function T() {
  if (f) return a;
  f = 1;
  var e = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function i(u, r, n) {
    var t = null;
    if (n !== void 0 && (t = "" + n), r.key !== void 0 && (t = "" + r.key), "key" in r) {
      n = {};
      for (var o in r)
        o !== "key" && (n[o] = r[o]);
    } else n = r;
    return r = n.ref, {
      $$typeof: e,
      type: u,
      key: t,
      ref: r !== void 0 ? r : null,
      props: n
    };
  }
  return a.Fragment = s, a.jsx = i, a.jsxs = i, a;
}
var w;
function _() {
  return w || (w = 1, v.exports = T()), v.exports;
}
var C = _();
const h = m(void 0), V = () => {
  const e = k(h);
  if (!e)
    throw new Error(
      "Navara React Error: You have to invoke this hook inside of ViewProvider."
    );
  return e;
}, y = ({
  canvas: e,
  children: s,
  ...i
}) => {
  const [u, r] = x(), [n, t] = x(!1), o = c(void 0);
  return o.current = u, R(() => {
    if (o.current) {
      console.warn("You need to recreate ThreeView.");
      return;
    }
    const d = e && "current" in e ? e.current : e, l = new E({ canvas: d, ...i });
    return r(l), o.current = l, (async () => {
      try {
        await l.init(), t(!0);
      } catch (p) {
        console.error("Navara init failed:", p);
      }
    })(), () => {
    };
  }, [e, i]), /* @__PURE__ */ C.jsx(h.Provider, { value: { view: u }, children: n ? s : null });
};
function J({
  config: e,
  onReady: s
}) {
  const { view: i } = V(), u = c(null), r = c(e), n = c(s);
  return r.current = e, R(() => {
    const t = i.addLayer(r.current);
    u.current = t;
    const o = n.current?.(t);
    return () => {
      o?.(), t.delete(), u.current = null;
    };
  }, [i]), R(() => {
    if (u.current) {
      const t = u.current;
      if ("data" in e) {
        const { data: o, ...d } = e;
        t.update(d);
      } else
        t.update(e);
    }
  }, [e]), null;
}
export {
  J as Layer,
  y as ViewProvider,
  V as useViewContext
};
