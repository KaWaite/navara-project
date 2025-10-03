import oe from "@navara/three";
import ae, { createContext as se, useContext as ue, useState as D, useRef as U, useEffect as j } from "react";
var w = { exports: {} }, v = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var L;
function ce() {
  if (L) return v;
  L = 1;
  var n = Symbol.for("react.transitional.element"), f = Symbol.for("react.fragment");
  function i(u, o, c) {
    var E = null;
    if (c !== void 0 && (E = "" + c), o.key !== void 0 && (E = "" + o.key), "key" in o) {
      c = {};
      for (var d in o)
        d !== "key" && (c[d] = o[d]);
    } else c = o;
    return o = c.ref, {
      $$typeof: n,
      type: u,
      key: E,
      ref: o !== void 0 ? o : null,
      props: c
    };
  }
  return v.Fragment = f, v.jsx = i, v.jsxs = i, v;
}
var _ = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var M;
function ie() {
  return M || (M = 1, process.env.NODE_ENV !== "production" && function() {
    function n(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === re ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case h:
          return "Fragment";
        case G:
          return "Profiler";
        case z:
          return "StrictMode";
        case Z:
          return "Suspense";
        case Q:
          return "SuspenseList";
        case ee:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case J:
            return "Portal";
          case B:
            return (e.displayName || "Context") + ".Provider";
          case X:
            return (e._context.displayName || "Context") + ".Consumer";
          case H:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case K:
            return r = e.displayName || null, r !== null ? r : n(e.type) || "Memo";
          case g:
            r = e._payload, e = e._init;
            try {
              return n(e(r));
            } catch {
            }
        }
      return null;
    }
    function f(e) {
      return "" + e;
    }
    function i(e) {
      try {
        f(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var t = r.error, a = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          a
        ), f(e);
      }
    }
    function u(e) {
      if (e === h) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === g)
        return "<...>";
      try {
        var r = n(e);
        return r ? "<" + r + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var e = O.A;
      return e === null ? null : e.getOwner();
    }
    function c() {
      return Error("react-stack-top-frame");
    }
    function E(e) {
      if (C.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function d(e, r) {
      function t() {
        Y || (Y = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      t.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: t,
        configurable: !0
      });
    }
    function k() {
      var e = n(this.type);
      return I[e] || (I[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function b(e, r, t, a, m, l, P, A) {
      return t = l.ref, e = {
        $$typeof: N,
        type: e,
        key: r,
        props: l,
        _owner: m
      }, (t !== void 0 ? t : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: k
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: P
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: A
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function T(e, r, t, a, m, l, P, A) {
      var s = r.children;
      if (s !== void 0)
        if (a)
          if (te(s)) {
            for (a = 0; a < s.length; a++)
              y(s[a]);
            Object.freeze && Object.freeze(s);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else y(s);
      if (C.call(r, "key")) {
        s = n(e);
        var R = Object.keys(r).filter(function(ne) {
          return ne !== "key";
        });
        a = 0 < R.length ? "{key: someKey, " + R.join(": ..., ") + ": ...}" : "{key: someKey}", V[s + a] || (R = 0 < R.length ? "{" + R.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          a,
          s,
          R,
          s
        ), V[s + a] = !0);
      }
      if (s = null, t !== void 0 && (i(t), s = "" + t), E(r) && (i(r.key), s = "" + r.key), "key" in r) {
        t = {};
        for (var S in r)
          S !== "key" && (t[S] = r[S]);
      } else t = r;
      return s && d(
        t,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), b(
        e,
        s,
        l,
        m,
        o(),
        t,
        P,
        A
      );
    }
    function y(e) {
      typeof e == "object" && e !== null && e.$$typeof === N && e._store && (e._store.validated = 1);
    }
    var p = ae, N = Symbol.for("react.transitional.element"), J = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), z = Symbol.for("react.strict_mode"), G = Symbol.for("react.profiler"), X = Symbol.for("react.consumer"), B = Symbol.for("react.context"), H = Symbol.for("react.forward_ref"), Z = Symbol.for("react.suspense"), Q = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), ee = Symbol.for("react.activity"), re = Symbol.for("react.client.reference"), O = p.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, C = Object.prototype.hasOwnProperty, te = Array.isArray, x = console.createTask ? console.createTask : function() {
      return null;
    };
    p = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var Y, I = {}, $ = p.react_stack_bottom_frame.bind(
      p,
      c
    )(), F = x(u(c)), V = {};
    _.Fragment = h, _.jsx = function(e, r, t, a, m) {
      var l = 1e4 > O.recentlyCreatedOwnerStacks++;
      return T(
        e,
        r,
        t,
        !1,
        a,
        m,
        l ? Error("react-stack-top-frame") : $,
        l ? x(u(e)) : F
      );
    }, _.jsxs = function(e, r, t, a, m) {
      var l = 1e4 > O.recentlyCreatedOwnerStacks++;
      return T(
        e,
        r,
        t,
        !0,
        a,
        m,
        l ? Error("react-stack-top-frame") : $,
        l ? x(u(e)) : F
      );
    };
  }()), _;
}
var W;
function le() {
  return W || (W = 1, process.env.NODE_ENV === "production" ? w.exports = ce() : w.exports = ie()), w.exports;
}
var fe = le();
const q = se(void 0), de = () => {
  const n = ue(q);
  if (!n)
    throw new Error(
      "Navara React Error: You have to invoke this hook inside of ViewProvider."
    );
  return n;
}, Re = ({
  canvas: n,
  children: f,
  ...i
}) => {
  const [u, o] = D(), [c, E] = D(!1), d = U(void 0);
  return d.current = u, j(() => {
    if (d.current) {
      console.warn("You need to recreate ThreeView.");
      return;
    }
    const k = n && "current" in n ? n.current : n, b = new oe({ canvas: k, ...i });
    return o(b), (async () => {
      try {
        await b.init(), E(!0);
      } catch (T) {
        console.error("Navara init failed:", T);
      }
    })(), () => {
    };
  }, [n, i]), /* @__PURE__ */ fe.jsx(q.Provider, { value: { view: u }, children: c ? f : null });
};
function ve({ config: n, onReady: f }) {
  const { view: i } = de(), u = U(null);
  return j(() => {
    const o = i.addLayer(n);
    return u.current = o, f?.(o), () => {
      o.delete(), u.current = null;
    };
  }, [i, n, f]), j(() => {
    u.current && u.current.update(n);
  }, [n]), null;
}
export {
  ve as Layer,
  Re as ViewProvider,
  de as useViewContext
};
