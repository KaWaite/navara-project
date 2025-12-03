import p from "@navara/three";
import { createContext as m, useContext as k, useState as R, useRef as a, useEffect as v } from "react";
var l = { exports: {} }, c = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var x;
function T() {
  if (x) return c;
  x = 1;
  var e = Symbol.for("react.transitional.element"), s = Symbol.for("react.fragment");
  function i(n, r, t) {
    var o = null;
    if (t !== void 0 && (o = "" + t), r.key !== void 0 && (o = "" + r.key), "key" in r) {
      t = {};
      for (var u in r)
        u !== "key" && (t[u] = r[u]);
    } else t = r;
    return r = t.ref, {
      $$typeof: e,
      type: n,
      key: o,
      ref: r !== void 0 ? r : null,
      props: t
    };
  }
  return c.Fragment = s, c.jsx = i, c.jsxs = i, c;
}
var f;
function C() {
  return f || (f = 1, l.exports = T()), l.exports;
}
var V = C();
const w = m(void 0), _ = () => {
  const e = k(w);
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
  const [n, r] = R(), [t, o] = R(!1), u = a(void 0);
  return u.current = n, v(() => {
    if (u.current) {
      console.warn("You need to recreate ThreeView.");
      return;
    }
    const h = e && "current" in e ? e.current : e, d = new p({ canvas: h, ...i });
    return r(d), u.current = d, (async () => {
      try {
        await d.init(), o(!0);
      } catch (E) {
        console.error("Navara init failed:", E);
      }
    })(), () => {
    };
  }, [e, i]), /* @__PURE__ */ V.jsx(w.Provider, { value: { view: n }, children: t ? s : null });
};
function J({
  config: e,
  onReady: s
}) {
  const { view: i } = _(), n = a(null), r = a(e), t = a(s);
  return r.current = e, v(() => {
    const o = i.addLayer(r.current);
    n.current = o;
    const u = t.current?.(o);
    return () => {
      u?.(), o.delete(), n.current = null;
    };
  }, [i]), v(() => {
    n.current && n.current.update(e);
  }, [e]), null;
}
export {
  J as Layer,
  y as ViewProvider,
  _ as useViewContext
};
