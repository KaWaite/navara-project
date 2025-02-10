var on = Object.defineProperty;
var an = (t, e, r) => e in t ? on(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var A = (t, e, r) => an(t, typeof e != "symbol" ? e + "" : e, r);
import cn, { TransferableGeometry as Er, ConstructTerrainMeshResult as ln, DelegatedWorkerTasksResult as Ge, UpsampleTerrainMeshResult as un, TransferableFloatAttribute as U, TransferablePolygonGeometry as fn, ConstructPolygonBatchedFeatureResult as dn, ExtentRadianF32 as Tr, TransferablePolylineGeometry as hn, ConstructPolylineBatchedFeatureResult as gn, TextureFragmentStatus as Ft, PointMaterial as pn, BillboardMaterial as mn, ModelMaterial as An, PolylineMaterial as vn, PolygonMaterial as wn, ElevationDecoder as yr, Core as xn } from "@navara/engine";
import "@navara/engine-worker";
import { Vector2 as F, UnsignedByteType as Se, SRGBColorSpace as z, DepthTexture as Cr, DepthStencilFormat as En, UnsignedInt248Type as Tn, UnsignedIntType as yn, WebGLRenderTarget as te, REVISION as Ue, BasicDepthPacking as xe, Scene as ie, Camera as Cn, Mesh as k, LinearFilter as Q, Uniform as _, Color as N, LoadingManager as Dn, Texture as ce, NearestFilter as Re, ShaderMaterial as fe, NoBlending as ze, PerspectiveCamera as Et, NoColorSpace as Dr, BufferGeometry as de, BufferAttribute as P, Material as ae, LinearSRGBColorSpace as br, BackSide as ee, DoubleSide as be, FrontSide as Qe, EventDispatcher as Br, TrianglesDrawMode as bn, TriangleFanDrawMode as gt, TriangleStripDrawMode as Ir, Loader as We, LoaderUtils as Be, FileLoader as Le, SpotLight as Bn, PointLight as In, DirectionalLight as Sr, MeshBasicMaterial as se, MeshPhysicalMaterial as W, Matrix4 as Oe, Vector3 as pe, Quaternion as Rr, InstancedMesh as Sn, InstancedBufferAttribute as Rn, Object3D as Tt, TextureLoader as Mr, ImageBitmapLoader as Mn, InterleavedBuffer as Pn, InterleavedBufferAttribute as _n, LinearMipmapLinearFilter as Pr, RepeatWrapping as pt, PointsMaterial as Ln, LineBasicMaterial as On, MeshStandardMaterial as _r, PropertyBinding as kn, SkinnedMesh as Fn, LineSegments as Nn, Line as Hn, LineLoop as Gn, Points as Un, Group as me, MathUtils as zn, OrthographicCamera as Qn, Skeleton as Wn, AnimationClip as Yn, Bone as Vn, InterpolateLinear as Lr, NearestMipmapNearestFilter as Xn, LinearMipmapNearestFilter as jn, NearestMipmapLinearFilter as Kn, ClampToEdgeWrapping as Jn, MirroredRepeatWrapping as qn, InterpolateDiscrete as Zn, VectorKeyframeTrack as Nt, NumberKeyframeTrack as Ht, QuaternionKeyframeTrack as Gt, Box3 as $n, Sphere as ei, Interpolant as ti, Cache as Ut, ImageLoader as ri, SpriteMaterial as Or, Sprite as le, UniformsLib as ni, MeshLambertMaterial as yt, RawShaderMaterial as ii, GLSL3 as si, RGBAFormat as zt, AlwaysStencilFunc as kr, KeepStencilOp as ke, IncrementWrapStencilOp as Fr, DecrementWrapStencilOp as Nr, NotEqualStencilFunc as Hr, ZeroStencilOp as Ae, WebGLRenderer as oi, FloatType as ai, HalfFloatType as ci, AmbientLight as li } from "three";
function L(t) {
  return `${t.ind}_${t.gen}`;
}
function Ct(t) {
  return `${t}_globe`;
}
function Dt(t) {
  return `${t}_globe_gbuffer`;
}
function Ie(t) {
  return !!t && typeof t == "object" && "ind" in t && "gen" in t;
}
class ui {
  constructor() {
    A(this, "record", {});
  }
  getOrInsert(e) {
    return this.record[e] ? this.record[e] : (this.record[e] = new bt(e), this.record[e]);
  }
}
class bt {
  constructor(e, r = !0) {
    A(this, "id");
    A(this, "continuable");
    A(this, "currentPending");
    A(this, "next");
    A(this, "parent");
    this.id = e, this.continuable = r;
  }
  then(e) {
    return this.next || (this.next = new bt(this.id, !1), this.next.parent = this), !this.currentPending && this.continuable && (this.continuable = !1, this.next.continuable = !1, this.currentPending = e().then(() => {
      this.currentPending = void 0, this.next && (this.next.continuable = !0);
    })), this.next;
  }
  end() {
    if (!this.continuable)
      return;
    let e = this.parent;
    if (!e) {
      this.continuable = !0;
      return;
    }
    for (this.continuable = !1; e.parent; )
      e = e.parent;
    e.continuable = !0;
  }
}
const fi = (t) => {
  const { event: e } = t;
  return Ie(e) ? L(e) : void 0;
};
class di {
  constructor() {
    A(this, "stacks", {
      camera_transform_updated: [],
      data_requested: [],
      data_requester_removed: [],
      mesh_added: [],
      mesh_updated: [],
      mesh_removed: [],
      object_transform_updated: [],
      renderable_feature_added: [],
      renderable_feature_changed: [],
      renderable_feature_removed: [],
      texture_fragment_removed: [],
      texture_fragment_requested: [],
      worker_task_delegated: [],
      worker_task_removed: []
    });
    A(this, "addedEventIds", /* @__PURE__ */ new Set());
    A(this, "transactionManager", new ui());
  }
  needsUpdate() {
    return Object.values(this.stacks).some((e) => !!e.length);
  }
  pushEvents(e) {
    for (const r of Object.keys(this.stacks)) {
      const n = e == null ? void 0 : e[r];
      n && (Array.isArray(n) ? this.stacks[r] = this.stacks[r].concat(n) : this.stacks[r].push(n));
    }
  }
  forEachStack(e, r, n = 10) {
    let i = 0;
    for (const o of this.stacks[e]) {
      if (i === n)
        break;
      r(o), o != null && o.free && o.free instanceof Function && o.free(), i++;
    }
    this.stacks[e].splice(0, i);
  }
  async forEachStackAsync(e, r, n = 20, i) {
    const o = [];
    let s = 0;
    const a = [];
    for (const l of this.stacks[e]) {
      if (s === n)
        break;
      const f = l;
      i && !i(f) || (o.push(r(f)), a.push(s), s++);
    }
    const c = [];
    let u = 0;
    for (const l of a) {
      const f = l - u;
      c.push(this.stacks[e][f]), this.stacks[e].splice(f, 1), u++;
    }
    await Promise.all(o);
    for (const l of c)
      l != null && l.free && l.free instanceof Function && l.free();
  }
  removeDuplicatedTransactionEvents(e) {
    let r = 0;
    const n = [];
    for (const o of this.stacks[e.remove.key]) {
      if (!Ie(o)) {
        r++;
        continue;
      }
      const s = L(o), a = this.stacks[e.add.key].findIndex(
        (u) => {
          if (!Ie(u)) return;
          const l = L(u);
          return s === l;
        }
      ), c = a !== -1;
      if (c && this.stacks[e.add.key].splice(a, 1), e.change) {
        const u = this.stacks[e.change.key].findIndex((f) => {
          if (!Ie(f)) return;
          const h = L(f);
          return s === h;
        });
        u !== -1 && this.stacks[e.change.key].splice(u, 1);
      }
      c && n.push(r), r++;
    }
    let i = 0;
    for (const o of n)
      this.stacks[e.remove.key].splice(o - i, 1), i++;
  }
  processTransactionEvents(e, r, n, i) {
    const {
      shouldProcess: o,
      generateEventId: s = fi,
      onAbort: a
    } = i ?? {};
    this.removeDuplicatedTransactionEvents(r);
    const c = this.transactionManager.getOrInsert(e).then(
      () => this.forEachStackAsync(
        r.add.key,
        (u) => (a && this.addedEventIds.add(s({ type: "add", event: u })), n({ type: "add", event: u })),
        r.add.max,
        o ? (u) => o({ type: "add", event: u }) : void 0
      )
    ).then(() => (a && this.addedEventIds.clear(), this.forEachStackAsync(
      r.remove.key,
      (u) => n({ type: "remove", event: u }),
      r.remove.max,
      o ? (u) => o({ type: "remove", event: u }) : void 0
    )));
    if (s && a && this.addedEventIds.size)
      for (const u of this.stacks[r.remove.key]) {
        if (!u) continue;
        const l = u, f = s({
          type: "remove",
          event: l
        });
        f && this.addedEventIds.has(f) && (a(l), this.addedEventIds.delete(f));
      }
    if (r.change) {
      const u = r.change;
      c.then(
        () => this.forEachStackAsync(
          u.key,
          (l) => n({ type: "change", event: l }),
          u.max,
          o ? (l) => o({ type: "change", event: l }) : void 0
        )
      ).end();
    } else
      c.end();
  }
}
function hi(t) {
  return t != null;
}
class mt {
  constructor(e) {
    A(this, "cached_mesh_handle");
    A(this, "coords");
    A(this, "max_height");
    this.cached_mesh_handle = e.cached_mesh_handle ? new pi(e.cached_mesh_handle) : void 0, this.coords = new gi(e.coords), this.max_height = e.max_height;
  }
  free() {
  }
}
class gi {
  constructor(e) {
    A(this, "x");
    A(this, "y");
    A(this, "z");
    this.x = e.x, this.y = e.y, this.z = e.z;
  }
  free() {
  }
}
class pi {
  constructor(e) {
    A(this, "vertices");
    A(this, "uvs");
    A(this, "indices");
    A(this, "heights");
    this.vertices = e.vertices, this.uvs = e.uvs, this.indices = e.indices, this.heights = e.heights;
  }
  free() {
  }
}
class Bt {
  constructor(e, r) {
    A(this, "coords");
    A(this, "size");
    this.coords = e, this.size = r;
  }
  transfer_coords() {
    return this.coords;
  }
  clone() {
    return new Bt(this.coords.slice(), this.size);
  }
  free() {
  }
}
class mi {
  constructor(e, r, n) {
    A(this, "uvs");
    A(this, "indices");
    A(this, "heights");
    this.uvs = e, this.indices = r, this.heights = n;
  }
  free() {
  }
}
class Gr {
  constructor(e) {
    A(this, "decoder");
    this.decoder = new Ai(e);
  }
  free() {
  }
}
class Ai {
  constructor(e) {
    A(this, "b_scaler");
    A(this, "boundary");
    A(this, "epsilon");
    A(this, "g_scaler");
    A(this, "max_offset");
    A(this, "min_offset");
    A(this, "offset");
    A(this, "r_scaler");
    this.b_scaler = e.b_scaler, this.boundary = e.boundary, this.epsilon = e.epsilon, this.g_scaler = e.g_scaler, this.max_offset = e.max_offset, this.min_offset = e.min_offset, this.offset = e.offset, this.r_scaler = e.r_scaler;
  }
  free() {
  }
}
class vi {
  constructor(e) {
    A(this, "batch_ids");
    A(this, "crs");
    A(this, "expected_winding_orders");
    A(this, "holes");
    A(this, "holes_boundaries");
    A(this, "holes_sizes");
    A(this, "holes_total_sizes");
    A(this, "length");
    A(this, "outer_ring");
    A(this, "outer_ring_sizes");
    this.batch_ids = e.transferBatchIds(), this.crs = e.crs(), this.expected_winding_orders = e.transferExpectedWindingOrders(), this.holes = e.transferHoles(), this.holes_boundaries = e.transferHolesBoundaries(), this.holes_sizes = e.transferHolesSizes(), this.holes_total_sizes = e.transferHolesTotalSizes(), this.length = e.length(), this.outer_ring = e.transferOuterRing(), this.outer_ring_sizes = e.transferOuterRingSizes();
  }
  setBatchIds(e, r) {
  }
  setExpectedWindingOrders(e, r) {
  }
  setOuterRing(e, r) {
  }
  setOuterRingSizes(e, r) {
  }
  setHoles(e, r) {
  }
  setHolesBoundaries(e, r) {
  }
  setHolesSizes(e, r) {
  }
  setHolesTotalSizes(e, r) {
  }
  drop() {
  }
  transferBatchIds() {
    throw new Error();
  }
  transferExpectedWindingOrders() {
    throw new Error();
  }
  transferOuterRing() {
    throw new Error();
  }
  transferOuterRingSizes() {
    throw new Error();
  }
  transferHoles() {
    throw new Error();
  }
  transferHolesBoundaries() {
    throw new Error();
  }
  transferHolesSizes() {
    throw new Error();
  }
  transferHolesTotalSizes() {
    throw new Error();
  }
  free() {
  }
}
class wi {
  constructor(e) {
    A(this, "clamp_to_ground");
    A(this, "use_ground_normals");
    A(this, "color");
    A(this, "extruded_height");
    A(this, "height");
    A(this, "show");
    A(this, "wireframe");
    A(this, "__internal__");
    this.clamp_to_ground = e.clamp_to_ground, this.use_ground_normals = e.use_ground_normals, this.color = e.color, this.extruded_height = e.extruded_height, this.height = e.height, this.show = e.show, this.wireframe = e.wireframe;
  }
  free() {
  }
}
class xi {
  constructor(e) {
    A(this, "points");
    A(this, "points_sizes");
    A(this, "batch_ids");
    A(this, "crs");
    A(this, "length");
    this.points = e.transferPoints(), this.points_sizes = e.transferPointsSizes(), this.batch_ids = e.transferBatchIds(), this.crs = e.crs(), this.length = e.length();
  }
  setPoints(e, r) {
  }
  setPointsSizes(e, r) {
  }
  setBatchIds(e, r) {
  }
  drop() {
  }
  transferPoints() {
    throw new Error();
  }
  transferPointsSizes() {
    throw new Error();
  }
  transferBatchIds() {
    throw new Error();
  }
  free() {
  }
}
class Ei {
  constructor(e) {
    A(this, "clamp_to_ground");
    A(this, "use_ground_normals");
    A(this, "color");
    A(this, "height");
    A(this, "width");
    A(this, "show");
    A(this, "__internal__");
    this.clamp_to_ground = e.clamp_to_ground, this.use_ground_normals = e.use_ground_normals, this.color = e.color, this.width = e.width, this.height = e.height, this.show = e.show;
  }
  free() {
  }
}
const Ti = ["png"];
var yi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ci(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Di(t) {
  if (t.__esModule) return t;
  var e = t.default;
  if (typeof e == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    r.prototype = e.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(t).forEach(function(n) {
    var i = Object.getOwnPropertyDescriptor(t, n);
    Object.defineProperty(r, n, i.get ? i : {
      enumerable: !0,
      get: function() {
        return t[n];
      }
    });
  }), r;
}
var j = {}, Ur = { exports: {} };
const bi = {}, Bi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bi
}, Symbol.toStringTag, { value: "Module" })), ve = /* @__PURE__ */ Di(Bi);
(function(t) {
  var e = function(n) {
    return typeof n < "u" && n.versions != null && n.versions.node != null && n + "" == "[object process]";
  };
  t.exports.isNode = e, t.exports.platform = typeof process < "u" && e(process) ? "node" : "browser";
  var r = t.exports.platform === "node" && ve;
  t.exports.isMainThread = t.exports.platform === "node" ? (!r || r.isMainThread) && !process.connected : typeof Window < "u", t.exports.cpus = t.exports.platform === "browser" ? self.navigator.hardwareConcurrency : ve.cpus().length;
})(Ur);
var It = Ur.exports, $e = {}, Qt;
function Ye() {
  if (Qt) return $e;
  Qt = 1;
  function t(i, o) {
    var s = this;
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (typeof i != "function")
      throw new SyntaxError("Function parameter handler(resolve, reject) missing");
    var a = [], c = [];
    this.resolved = !1, this.rejected = !1, this.pending = !0;
    var u = function(h, d) {
      a.push(h), c.push(d);
    };
    this.then = function(h, d) {
      return new t(function(g, p) {
        var v = h ? e(h, g, p) : g, m = d ? e(d, g, p) : p;
        u(v, m);
      }, s);
    };
    var l = function(h) {
      return s.resolved = !0, s.rejected = !1, s.pending = !1, a.forEach(function(d) {
        d(h);
      }), u = function(d, g) {
        d(h);
      }, l = f = function() {
      }, s;
    }, f = function(h) {
      return s.resolved = !1, s.rejected = !0, s.pending = !1, c.forEach(function(d) {
        d(h);
      }), u = function(d, g) {
        g(h);
      }, l = f = function() {
      }, s;
    };
    this.cancel = function() {
      return o ? o.cancel() : f(new r()), s;
    }, this.timeout = function(h) {
      if (o)
        o.timeout(h);
      else {
        var d = setTimeout(function() {
          f(new n("Promise timed out after " + h + " ms"));
        }, h);
        s.always(function() {
          clearTimeout(d);
        });
      }
      return s;
    }, i(function(h) {
      l(h);
    }, function(h) {
      f(h);
    });
  }
  function e(i, o, s) {
    return function(a) {
      try {
        var c = i(a);
        c && typeof c.then == "function" && typeof c.catch == "function" ? c.then(o, s) : o(c);
      } catch (u) {
        s(u);
      }
    };
  }
  t.prototype.catch = function(i) {
    return this.then(null, i);
  }, t.prototype.always = function(i) {
    return this.then(i, i);
  }, t.prototype.finally = function(i) {
    const o = this, s = function() {
      return new t((a) => a()).then(i).then(() => o);
    };
    return this.then(s, s);
  }, t.all = function(i) {
    return new t(function(o, s) {
      var a = i.length, c = [];
      a ? i.forEach(function(u, l) {
        u.then(function(f) {
          c[l] = f, a--, a == 0 && o(c);
        }, function(f) {
          a = 0, s(f);
        });
      }) : o(c);
    });
  }, t.defer = function() {
    var i = {};
    return i.promise = new t(function(o, s) {
      i.resolve = o, i.reject = s;
    }), i;
  };
  function r(i) {
    this.message = i || "promise cancelled", this.stack = new Error().stack;
  }
  r.prototype = new Error(), r.prototype.constructor = Error, r.prototype.name = "CancellationError", t.CancellationError = r;
  function n(i) {
    this.message = i || "timeout exceeded", this.stack = new Error().stack;
  }
  return n.prototype = new Error(), n.prototype.constructor = Error, n.prototype.name = "TimeoutError", t.TimeoutError = n, $e.Promise = t, $e;
}
var q = { exports: {} }, ge = {}, Wt;
function Ii() {
  return Wt || (Wt = 1, ge.validateOptions = function(e, r, n) {
    if (e) {
      var i = e ? Object.keys(e) : [], o = i.find((a) => !r.includes(a));
      if (o)
        throw new Error('Object "' + n + '" contains an unknown option "' + o + '"');
      var s = r.find((a) => Object.prototype[a] && !i.includes(a));
      if (s)
        throw new Error('Object "' + n + '" contains an inherited option "' + s + '" which is not defined in the object itself but in its prototype. Only plain objects are allowed. Please remove the option from the prototype or override it with a value "undefined".');
      return e;
    }
  }, ge.workerOptsNames = [
    "credentials",
    "name",
    "type"
  ], ge.forkOptsNames = [
    "cwd",
    "detached",
    "env",
    "execPath",
    "execArgv",
    "gid",
    "serialization",
    "signal",
    "killSignal",
    "silent",
    "stdio",
    "uid",
    "windowsVerbatimArguments",
    "timeout"
  ], ge.workerThreadOptsNames = [
    "argv",
    "env",
    "eval",
    "execArgv",
    "stdin",
    "stdout",
    "stderr",
    "workerData",
    "trackUnmanagedFds",
    "transferList",
    "resourceLimits",
    "name"
  ]), ge;
}
var et, Yt;
function Si() {
  return Yt || (Yt = 1, et = `!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self).worker=n()}(this,(function(){"use strict";function e(n){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(n)}function n(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var t={};var r=function(e,n){this.message=e,this.transfer=n},o={};function i(e,n){var t=this;if(!(this instanceof i))throw new SyntaxError("Constructor must be called with the new operator");if("function"!=typeof e)throw new SyntaxError("Function parameter handler(resolve, reject) missing");var r=[],o=[];this.resolved=!1,this.rejected=!1,this.pending=!0;var a=function(e,n){r.push(e),o.push(n)};this.then=function(e,n){return new i((function(t,r){var o=e?u(e,t,r):t,i=n?u(n,t,r):r;a(o,i)}),t)};var f=function(e){return t.resolved=!0,t.rejected=!1,t.pending=!1,r.forEach((function(n){n(e)})),a=function(n,t){n(e)},f=d=function(){},t},d=function(e){return t.resolved=!1,t.rejected=!0,t.pending=!1,o.forEach((function(n){n(e)})),a=function(n,t){t(e)},f=d=function(){},t};this.cancel=function(){return n?n.cancel():d(new s),t},this.timeout=function(e){if(n)n.timeout(e);else{var r=setTimeout((function(){d(new c("Promise timed out after "+e+" ms"))}),e);t.always((function(){clearTimeout(r)}))}return t},e((function(e){f(e)}),(function(e){d(e)}))}function u(e,n,t){return function(r){try{var o=e(r);o&&"function"==typeof o.then&&"function"==typeof o.catch?o.then(n,t):n(o)}catch(e){t(e)}}}function s(e){this.message=e||"promise cancelled",this.stack=(new Error).stack}function c(e){this.message=e||"timeout exceeded",this.stack=(new Error).stack}return i.prototype.catch=function(e){return this.then(null,e)},i.prototype.always=function(e){return this.then(e,e)},i.prototype.finally=function(e){var n=this,t=function(){return new i((function(e){return e()})).then(e).then((function(){return n}))};return this.then(t,t)},i.all=function(e){return new i((function(n,t){var r=e.length,o=[];r?e.forEach((function(e,i){e.then((function(e){o[i]=e,0==--r&&n(o)}),(function(e){r=0,t(e)}))})):n(o)}))},i.defer=function(){var e={};return e.promise=new i((function(n,t){e.resolve=n,e.reject=t})),e},s.prototype=new Error,s.prototype.constructor=Error,s.prototype.name="CancellationError",i.CancellationError=s,c.prototype=new Error,c.prototype.constructor=Error,c.prototype.name="TimeoutError",i.TimeoutError=c,o.Promise=i,function(n){var t=r,i=o.Promise,u="__workerpool-cleanup__",s={exit:function(){}},c={addAbortListener:function(e){s.abortListeners.push(e)},emit:s.emit};if("undefined"!=typeof self&&"function"==typeof postMessage&&"function"==typeof addEventListener)s.on=function(e,n){addEventListener(e,(function(e){n(e.data)}))},s.send=function(e,n){n?postMessage(e,n):postMessage(e)};else{if("undefined"==typeof process)throw new Error("Script must be executed as a worker");var a;try{a=require("worker_threads")}catch(n){if("object"!==e(n)||null===n||"MODULE_NOT_FOUND"!==n.code)throw n}if(a&&null!==a.parentPort){var f=a.parentPort;s.send=f.postMessage.bind(f),s.on=f.on.bind(f),s.exit=process.exit.bind(process)}else s.on=process.on.bind(process),s.send=function(e){process.send(e)},s.on("disconnect",(function(){process.exit(1)})),s.exit=process.exit.bind(process)}function d(e){return Object.getOwnPropertyNames(e).reduce((function(n,t){return Object.defineProperty(n,t,{value:e[t],enumerable:!0})}),{})}function l(e){return e&&"function"==typeof e.then&&"function"==typeof e.catch}s.methods={},s.methods.run=function(e,n){var t=new Function("return ("+e+").apply(this, arguments);");return t.worker=c,t.apply(t,n)},s.methods.methods=function(){return Object.keys(s.methods)},s.terminationHandler=void 0,s.abortListenerTimeout=1e3,s.abortListeners=[],s.terminateAndExit=function(e){var n=function(){s.exit(e)};if(!s.terminationHandler)return n();var t=s.terminationHandler(e);return l(t)?(t.then(n,n),t):(n(),new i((function(e,n){n(new Error("Worker terminating"))})))},s.cleanup=function(e){if(!s.abortListeners.length)return s.send({id:e,method:u,error:d(new Error("Worker terminating"))}),new i((function(e){e()}));var n,t=s.abortListeners.map((function(e){return e()})),r=new i((function(e,t){n=setTimeout((function(){t(new Error("Timeout occured waiting for abort handler, killing worker"))}),s.abortListenerTimeout)})),o=i.all(t).then((function(){clearTimeout(n),s.abortListeners.length||(s.abortListeners=[])}),(function(){clearTimeout(n),s.exit()}));return i.all([o,r]).then((function(){s.send({id:e,method:u,error:null})}),(function(n){s.send({id:e,method:u,error:n?d(n):null})}))};var p=null;s.on("message",(function(e){if("__workerpool-terminate__"===e)return s.terminateAndExit(0);if(e.method===u)return s.cleanup(e.id);try{var n=s.methods[e.method];if(!n)throw new Error('Unknown method "'+e.method+'"');p=e.id;var r=n.apply(n,e.params);l(r)?r.then((function(n){n instanceof t?s.send({id:e.id,result:n.message,error:null},n.transfer):s.send({id:e.id,result:n,error:null}),p=null})).catch((function(n){s.send({id:e.id,result:null,error:d(n)}),p=null})):(r instanceof t?s.send({id:e.id,result:r.message,error:null},r.transfer):s.send({id:e.id,result:r,error:null}),p=null)}catch(n){s.send({id:e.id,result:null,error:d(n)})}})),s.register=function(e,n){if(e)for(var t in e)e.hasOwnProperty(t)&&(s.methods[t]=e[t],s.methods[t].worker=c);n&&(s.terminationHandler=n.onTerminate,s.abortListenerTimeout=n.abortListenerTimeout||1e3),s.send("ready")},s.emit=function(e){if(p){if(e instanceof t)return void s.send({id:p,isEvent:!0,payload:e.message},e.transfer);s.send({id:p,isEvent:!0,payload:e})}},n.add=s.register,n.emit=s.emit}(t),n(t)}));
//# sourceMappingURL=worker.min.js.map
`), et;
}
var Vt;
function Ri() {
  if (Vt) return q.exports;
  Vt = 1;
  var { Promise: t } = Ye(), e = It;
  const { validateOptions: r, forkOptsNames: n, workerThreadOptsNames: i, workerOptsNames: o } = Ii();
  var s = "__workerpool-terminate__", a = "__workerpool-cleanup__";
  function c() {
    var w = l();
    if (!w)
      throw new Error("WorkerPool: workerType = 'thread' is not supported, Node >= 11.7.0 required");
    return w;
  }
  function u() {
    if (typeof Worker != "function" && (typeof Worker != "object" || typeof Worker.prototype.constructor != "function"))
      throw new Error("WorkerPool: Web Workers not supported");
  }
  function l() {
    try {
      return ve;
    } catch (w) {
      if (typeof w == "object" && w !== null && w.code === "MODULE_NOT_FOUND")
        return null;
      throw w;
    }
  }
  function f() {
    if (e.platform === "browser") {
      if (typeof Blob > "u")
        throw new Error("Blob not supported by the browser");
      if (!window.URL || typeof window.URL.createObjectURL != "function")
        throw new Error("URL.createObjectURL not supported by the browser");
      var w = new Blob([Si()], { type: "text/javascript" });
      return window.URL.createObjectURL(w);
    } else
      return __dirname + "/worker.js";
  }
  function h(w, C) {
    if (C.workerType === "web")
      return u(), d(w, C.workerOpts, Worker);
    if (C.workerType === "thread")
      return E = c(), g(w, E, C);
    if (C.workerType === "process" || !C.workerType)
      return p(w, v(C), ve);
    if (e.platform === "browser")
      return u(), d(w, C.workerOpts, Worker);
    var E = l();
    return E ? g(w, E, C) : p(w, v(C), ve);
  }
  function d(w, C, E) {
    r(C, o, "workerOpts");
    var T = new E(w, C);
    return T.isBrowserWorker = !0, T.on = function(D, b) {
      this.addEventListener(D, function(M) {
        b(M.data);
      });
    }, T.send = function(D, b) {
      this.postMessage(D, b);
    }, T;
  }
  function g(w, C, E) {
    r(E == null ? void 0 : E.workerThreadOpts, i, "workerThreadOpts");
    var T = new C.Worker(w, {
      stdout: (E == null ? void 0 : E.emitStdStreams) ?? !1,
      // pipe worker.STDOUT to process.STDOUT if not requested
      stderr: (E == null ? void 0 : E.emitStdStreams) ?? !1,
      // pipe worker.STDERR to process.STDERR if not requested
      ...E == null ? void 0 : E.workerThreadOpts
    });
    return T.isWorkerThread = !0, T.send = function(D, b) {
      this.postMessage(D, b);
    }, T.kill = function() {
      return this.terminate(), !0;
    }, T.disconnect = function() {
      this.terminate();
    }, E != null && E.emitStdStreams && (T.stdout.on("data", (D) => T.emit("stdout", D)), T.stderr.on("data", (D) => T.emit("stderr", D))), T;
  }
  function p(w, C, E) {
    r(C.forkOpts, n, "forkOpts");
    var T = E.fork(
      w,
      C.forkArgs,
      C.forkOpts
    ), D = T.send;
    return T.send = function(b) {
      return D.call(T, b);
    }, C.emitStdStreams && (T.stdout.on("data", (b) => T.emit("stdout", b)), T.stderr.on("data", (b) => T.emit("stderr", b))), T.isChildProcess = !0, T;
  }
  function v(w) {
    w = w || {};
    var C = process.execArgv.join(" "), E = C.indexOf("--inspect") !== -1, T = C.indexOf("--debug-brk") !== -1, D = [];
    return E && (D.push("--inspect=" + w.debugPort), T && D.push("--debug-brk")), process.execArgv.forEach(function(b) {
      b.indexOf("--max-old-space-size") > -1 && D.push(b);
    }), Object.assign({}, w, {
      forkArgs: w.forkArgs,
      forkOpts: Object.assign({}, w.forkOpts, {
        execArgv: (w.forkOpts && w.forkOpts.execArgv || []).concat(D),
        stdio: w.emitStdStreams ? "pipe" : void 0
      })
    });
  }
  function m(w) {
    for (var C = new Error(""), E = Object.keys(w), T = 0; T < E.length; T++)
      C[E[T]] = w[E[T]];
    return C;
  }
  function x(w, C) {
    if (Object.keys(w.processing).length === 1) {
      var E = Object.values(w.processing)[0];
      E.options && typeof E.options.on == "function" && E.options.on(C);
    }
  }
  function y(w, C) {
    var E = this, T = C || {};
    this.script = w || f(), this.worker = h(this.script, T), this.debugPort = T.debugPort, this.forkOpts = T.forkOpts, this.forkArgs = T.forkArgs, this.workerOpts = T.workerOpts, this.workerThreadOpts = T.workerThreadOpts, this.workerTerminateTimeout = T.workerTerminateTimeout, w || (this.worker.ready = !0), this.requestQueue = [], this.worker.on("stdout", function(S) {
      x(E, { stdout: S.toString() });
    }), this.worker.on("stderr", function(S) {
      x(E, { stderr: S.toString() });
    }), this.worker.on("message", function(S) {
      if (!E.terminated)
        if (typeof S == "string" && S === "ready")
          E.worker.ready = !0, b();
        else {
          var H = S.id, O = E.processing[H];
          if (O !== void 0 && (S.isEvent ? O.options && typeof O.options.on == "function" && O.options.on(S.payload) : (delete E.processing[H], E.terminating === !0 && E.terminate(), S.error ? O.resolver.reject(m(S.error)) : O.resolver.resolve(S.result))), S.method === a) {
            var J = E.tracking[S.id];
            J !== void 0 && (S.error ? (clearTimeout(J.timeoutId), J.resolver.reject(m(S.error))) : (E.tracking && clearTimeout(J.timeoutId), J.resolver.resolve(J.result))), delete E.tracking[H];
          }
        }
    });
    function D(S) {
      E.terminated = !0;
      for (var H in E.processing)
        E.processing[H] !== void 0 && E.processing[H].resolver.reject(S);
      E.processing = /* @__PURE__ */ Object.create(null);
    }
    function b() {
      for (const S of E.requestQueue.splice(0))
        E.worker.send(S.message, S.transfer);
    }
    var M = this.worker;
    this.worker.on("error", D), this.worker.on("exit", function(S, H) {
      var O = `Workerpool Worker terminated Unexpectedly
`;
      O += "    exitCode: `" + S + "`\n", O += "    signalCode: `" + H + "`\n", O += "    workerpool.script: `" + E.script + "`\n", O += "    spawnArgs: `" + M.spawnargs + "`\n", O += "    spawnfile: `" + M.spawnfile + "`\n", O += "    stdout: `" + M.stdout + "`\n", O += "    stderr: `" + M.stderr + "`\n", D(new Error(O));
    }), this.processing = /* @__PURE__ */ Object.create(null), this.tracking = /* @__PURE__ */ Object.create(null), this.terminating = !1, this.terminated = !1, this.cleaning = !1, this.terminationHandler = null, this.lastId = 0;
  }
  return y.prototype.methods = function() {
    return this.exec("methods");
  }, y.prototype.exec = function(w, C, E, T) {
    E || (E = t.defer());
    var D = ++this.lastId;
    this.processing[D] = {
      id: D,
      resolver: E,
      options: T
    };
    var b = {
      message: {
        id: D,
        method: w,
        params: C
      },
      transfer: T && T.transfer
    };
    this.terminated ? E.reject(new Error("Worker is terminated")) : this.worker.ready ? this.worker.send(b.message, b.transfer) : this.requestQueue.push(b);
    var M = this;
    return E.promise.catch(function(S) {
      if (S instanceof t.CancellationError || S instanceof t.TimeoutError)
        return M.tracking[D] = {
          id: D,
          resolver: t.defer()
        }, delete M.processing[D], M.tracking[D].resolver.promise = M.tracking[D].resolver.promise.catch(function(H) {
          delete M.tracking[D];
          var O = M.terminateAndNotify(!0).then(function() {
            throw H;
          }, function(J) {
            throw J;
          });
          return O;
        }), M.worker.send({
          id: D,
          method: a
        }), M.tracking[D].timeoutId = setTimeout(function() {
          M.tracking[D].resolver.reject(S);
        }, M.workerTerminateTimeout), M.tracking[D].resolver.promise;
      throw S;
    });
  }, y.prototype.busy = function() {
    return this.cleaning || Object.keys(this.processing).length > 0;
  }, y.prototype.terminate = function(w, C) {
    var E = this;
    if (w) {
      for (var T in this.processing)
        this.processing[T] !== void 0 && this.processing[T].resolver.reject(new Error("Worker terminated"));
      this.processing = /* @__PURE__ */ Object.create(null);
    }
    for (var D of Object.values(E.tracking))
      clearTimeout(D.timeoutId), D.resolver.reject(new Error("Worker Terminating"));
    if (E.tracking = /* @__PURE__ */ Object.create(null), typeof C == "function" && (this.terminationHandler = C), this.busy())
      this.terminating = !0;
    else {
      var b = function(S) {
        if (E.terminated = !0, E.cleaning = !1, E.worker != null && E.worker.removeAllListeners && E.worker.removeAllListeners("message"), E.worker = null, E.terminating = !1, E.terminationHandler)
          E.terminationHandler(S, E);
        else if (S)
          throw S;
      };
      if (this.worker)
        if (typeof this.worker.kill == "function") {
          if (this.worker.killed) {
            b(new Error("worker already killed!"));
            return;
          }
          var M = setTimeout(function() {
            E.worker && E.worker.kill();
          }, this.workerTerminateTimeout);
          this.worker.once("exit", function() {
            clearTimeout(M), E.worker && (E.worker.killed = !0), b();
          }), this.worker.ready ? this.worker.send(s) : this.requestQueue.push({ message: s }), this.cleaning = !0;
          return;
        } else if (typeof this.worker.terminate == "function")
          this.worker.terminate(), this.worker.killed = !0;
        else
          throw new Error("Failed to terminate worker");
      b();
    }
  }, y.prototype.terminateAndNotify = function(w, C) {
    var E = t.defer();
    return C && E.promise.timeout(C), this.terminate(w, function(T, D) {
      T ? E.reject(T) : E.resolve(D);
    }), E.promise;
  }, q.exports = y, q.exports._tryRequireWorkerThreads = l, q.exports._setupProcessWorker = p, q.exports._setupBrowserWorker = d, q.exports._setupWorkerThreadWorker = g, q.exports.ensureWorkerThreads = c, q.exports;
}
var tt, Xt;
function Mi() {
  if (Xt) return tt;
  Xt = 1;
  var t = 65535;
  tt = e;
  function e() {
    this.ports = /* @__PURE__ */ Object.create(null), this.length = 0;
  }
  return e.prototype.nextAvailableStartingAt = function(r) {
    for (; this.ports[r] === !0; )
      r++;
    if (r >= t)
      throw new Error("WorkerPool debug port limit reached: " + r + ">= " + t);
    return this.ports[r] = !0, this.length++, r;
  }, e.prototype.releasePort = function(r) {
    delete this.ports[r], this.length--;
  }, tt;
}
var rt, jt;
function Pi() {
  if (jt) return rt;
  jt = 1;
  var { Promise: t } = Ye(), e = Ri(), r = It, n = Mi(), i = new n();
  function o(l, f) {
    typeof l == "string" ? this.script = l || null : (this.script = null, f = l), this.workers = [], this.tasks = [], f = f || {}, this.forkArgs = Object.freeze(f.forkArgs || []), this.forkOpts = Object.freeze(f.forkOpts || {}), this.workerOpts = Object.freeze(f.workerOpts || {}), this.workerThreadOpts = Object.freeze(f.workerThreadOpts || {}), this.debugPortStart = f.debugPortStart || 43210, this.nodeWorker = f.nodeWorker, this.workerType = f.workerType || f.nodeWorker || "auto", this.maxQueueSize = f.maxQueueSize || 1 / 0, this.workerTerminateTimeout = f.workerTerminateTimeout || 1e3, this.onCreateWorker = f.onCreateWorker || (() => null), this.onTerminateWorker = f.onTerminateWorker || (() => null), this.emitStdStreams = f.emitStdStreams || !1, f && "maxWorkers" in f ? (s(f.maxWorkers), this.maxWorkers = f.maxWorkers) : this.maxWorkers = Math.max((r.cpus || 4) - 1, 1), f && "minWorkers" in f && (f.minWorkers === "max" ? this.minWorkers = this.maxWorkers : (a(f.minWorkers), this.minWorkers = f.minWorkers, this.maxWorkers = Math.max(this.minWorkers, this.maxWorkers)), this._ensureMinWorkers()), this._boundNext = this._next.bind(this), this.workerType === "thread" && e.ensureWorkerThreads();
  }
  o.prototype.exec = function(l, f, h) {
    if (f && !Array.isArray(f))
      throw new TypeError('Array expected as argument "params"');
    if (typeof l == "string") {
      var d = t.defer();
      if (this.tasks.length >= this.maxQueueSize)
        throw new Error("Max queue size of " + this.maxQueueSize + " reached");
      var g = this.tasks, p = {
        method: l,
        params: f,
        resolver: d,
        timeout: null,
        options: h
      };
      g.push(p);
      var v = d.promise.timeout;
      return d.promise.timeout = function(x) {
        return g.indexOf(p) !== -1 ? (p.timeout = x, d.promise) : v.call(d.promise, x);
      }, this._next(), d.promise;
    } else {
      if (typeof l == "function")
        return this.exec("run", [String(l), f], h);
      throw new TypeError('Function or string expected as argument "method"');
    }
  }, o.prototype.proxy = function() {
    if (arguments.length > 0)
      throw new Error("No arguments expected");
    var l = this;
    return this.exec("methods").then(function(f) {
      var h = {};
      return f.forEach(function(d) {
        h[d] = function() {
          return l.exec(d, Array.prototype.slice.call(arguments));
        };
      }), h;
    });
  }, o.prototype._next = function() {
    if (this.tasks.length > 0) {
      var l = this._getWorker();
      if (l) {
        var f = this, h = this.tasks.shift();
        if (h.resolver.promise.pending) {
          var d = l.exec(h.method, h.params, h.resolver, h.options).then(f._boundNext).catch(function() {
            if (l.terminated)
              return f._removeWorker(l);
          }).then(function() {
            f._next();
          });
          typeof h.timeout == "number" && d.timeout(h.timeout);
        } else
          f._next();
      }
    }
  }, o.prototype._getWorker = function() {
    for (var l = this.workers, f = 0; f < l.length; f++) {
      var h = l[f];
      if (h.busy() === !1)
        return h;
    }
    return l.length < this.maxWorkers ? (h = this._createWorkerHandler(), l.push(h), h) : null;
  }, o.prototype._removeWorker = function(l) {
    var f = this;
    return i.releasePort(l.debugPort), this._removeWorkerFromList(l), this._ensureMinWorkers(), new t(function(h, d) {
      l.terminate(!1, function(g) {
        f.onTerminateWorker({
          forkArgs: l.forkArgs,
          forkOpts: l.forkOpts,
          workerThreadOpts: l.workerThreadOpts,
          script: l.script
        }), g ? d(g) : h(l);
      });
    });
  }, o.prototype._removeWorkerFromList = function(l) {
    var f = this.workers.indexOf(l);
    f !== -1 && this.workers.splice(f, 1);
  }, o.prototype.terminate = function(l, f) {
    var h = this;
    this.tasks.forEach(function(m) {
      m.resolver.reject(new Error("Pool terminated"));
    }), this.tasks.length = 0;
    var d = function(m) {
      i.releasePort(m.debugPort), this._removeWorkerFromList(m);
    }, g = d.bind(this), p = [], v = this.workers.slice();
    return v.forEach(function(m) {
      var x = m.terminateAndNotify(l, f).then(g).always(function() {
        h.onTerminateWorker({
          forkArgs: m.forkArgs,
          forkOpts: m.forkOpts,
          workerThreadOpts: m.workerThreadOpts,
          script: m.script
        });
      });
      p.push(x);
    }), t.all(p);
  }, o.prototype.stats = function() {
    var l = this.workers.length, f = this.workers.filter(function(h) {
      return h.busy();
    }).length;
    return {
      totalWorkers: l,
      busyWorkers: f,
      idleWorkers: l - f,
      pendingTasks: this.tasks.length,
      activeTasks: f
    };
  }, o.prototype._ensureMinWorkers = function() {
    if (this.minWorkers)
      for (var l = this.workers.length; l < this.minWorkers; l++)
        this.workers.push(this._createWorkerHandler());
  }, o.prototype._createWorkerHandler = function() {
    const l = this.onCreateWorker({
      forkArgs: this.forkArgs,
      forkOpts: this.forkOpts,
      workerOpts: this.workerOpts,
      workerThreadOpts: this.workerThreadOpts,
      script: this.script
    }) || {};
    return new e(l.script || this.script, {
      forkArgs: l.forkArgs || this.forkArgs,
      forkOpts: l.forkOpts || this.forkOpts,
      workerOpts: l.workerOpts || this.workerOpts,
      workerThreadOpts: l.workerThreadOpts || this.workerThreadOpts,
      debugPort: i.nextAvailableStartingAt(this.debugPortStart),
      workerType: this.workerType,
      workerTerminateTimeout: this.workerTerminateTimeout,
      emitStdStreams: this.emitStdStreams
    });
  };
  function s(l) {
    if (!c(l) || !u(l) || l < 1)
      throw new TypeError("Option maxWorkers must be an integer number >= 1");
  }
  function a(l) {
    if (!c(l) || !u(l) || l < 0)
      throw new TypeError("Option minWorkers must be an integer number >= 0");
  }
  function c(l) {
    return typeof l == "number";
  }
  function u(l) {
    return Math.round(l) == l;
  }
  return rt = o, rt;
}
var nt = {}, it, Kt;
function zr() {
  if (Kt) return it;
  Kt = 1;
  function t(e, r) {
    this.message = e, this.transfer = r;
  }
  return it = t, it;
}
var Jt;
function Qr() {
  return Jt || (Jt = 1, function(t) {
    var e = zr(), r = Ye().Promise, n = "__workerpool-terminate__", i = "__workerpool-cleanup__", o = 1e3, s = {
      exit: function() {
      }
    }, a = {
      /**
       * 
       * @param {() => Promise<void>} listener 
       */
      addAbortListener: function(d) {
        s.abortListeners.push(d);
      },
      emit: s.emit
    };
    if (typeof self < "u" && typeof postMessage == "function" && typeof addEventListener == "function")
      s.on = function(d, g) {
        addEventListener(d, function(p) {
          g(p.data);
        });
      }, s.send = function(d, g) {
        g ? postMessage(d, g) : postMessage(d);
      };
    else if (typeof process < "u") {
      var c;
      try {
        c = ve;
      } catch (d) {
        if (!(typeof d == "object" && d !== null && d.code === "MODULE_NOT_FOUND")) throw d;
      }
      if (c && /* if there is a parentPort, we are in a WorkerThread */
      c.parentPort !== null) {
        var u = c.parentPort;
        s.send = u.postMessage.bind(u), s.on = u.on.bind(u), s.exit = process.exit.bind(process);
      } else
        s.on = process.on.bind(process), s.send = function(d) {
          process.send(d);
        }, s.on("disconnect", function() {
          process.exit(1);
        }), s.exit = process.exit.bind(process);
    } else
      throw new Error("Script must be executed as a worker");
    function l(d) {
      return Object.getOwnPropertyNames(d).reduce(function(g, p) {
        return Object.defineProperty(g, p, {
          value: d[p],
          enumerable: !0
        });
      }, {});
    }
    function f(d) {
      return d && typeof d.then == "function" && typeof d.catch == "function";
    }
    s.methods = {}, s.methods.run = function(g, p) {
      var v = new Function("return (" + g + ").apply(this, arguments);");
      return v.worker = a, v.apply(v, p);
    }, s.methods.methods = function() {
      return Object.keys(s.methods);
    }, s.terminationHandler = void 0, s.abortListenerTimeout = o, s.abortListeners = [], s.terminateAndExit = function(d) {
      var g = function() {
        s.exit(d);
      };
      if (!s.terminationHandler)
        return g();
      var p = s.terminationHandler(d);
      return f(p) ? (p.then(g, g), p) : (g(), new r(function(v, m) {
        m(new Error("Worker terminating"));
      }));
    }, s.cleanup = function(d) {
      if (!s.abortListeners.length)
        return s.send({
          id: d,
          method: i,
          error: l(new Error("Worker terminating"))
        }), new r(function(w) {
          w();
        });
      var g = function() {
        s.exit();
      }, p = function() {
        s.abortListeners.length || (s.abortListeners = []);
      };
      const v = s.abortListeners.map((w) => w());
      let m;
      const x = new r((w, C) => {
        m = setTimeout(function() {
          C(new Error("Timeout occured waiting for abort handler, killing worker"));
        }, s.abortListenerTimeout);
      }), y = r.all(v).then(function() {
        clearTimeout(m), p();
      }, function() {
        clearTimeout(m), g();
      });
      return r.all([
        y,
        x
      ]).then(function() {
        s.send({
          id: d,
          method: i,
          error: null
        });
      }, function(w) {
        s.send({
          id: d,
          method: i,
          error: w ? l(w) : null
        });
      });
    };
    var h = null;
    s.on("message", function(d) {
      if (d === n)
        return s.terminateAndExit(0);
      if (d.method === i)
        return s.cleanup(d.id);
      try {
        var g = s.methods[d.method];
        if (g) {
          h = d.id;
          var p = g.apply(g, d.params);
          f(p) ? p.then(function(v) {
            v instanceof e ? s.send({
              id: d.id,
              result: v.message,
              error: null
            }, v.transfer) : s.send({
              id: d.id,
              result: v,
              error: null
            }), h = null;
          }).catch(function(v) {
            s.send({
              id: d.id,
              result: null,
              error: l(v)
            }), h = null;
          }) : (p instanceof e ? s.send({
            id: d.id,
            result: p.message,
            error: null
          }, p.transfer) : s.send({
            id: d.id,
            result: p,
            error: null
          }), h = null);
        } else
          throw new Error('Unknown method "' + d.method + '"');
      } catch (v) {
        s.send({
          id: d.id,
          result: null,
          error: l(v)
        });
      }
    }), s.register = function(d, g) {
      if (d)
        for (var p in d)
          d.hasOwnProperty(p) && (s.methods[p] = d[p], s.methods[p].worker = a);
      g && (s.terminationHandler = g.onTerminate, s.abortListenerTimeout = g.abortListenerTimeout || o), s.send("ready");
    }, s.emit = function(d) {
      if (h) {
        if (d instanceof e) {
          s.send({
            id: h,
            isEvent: !0,
            payload: d.message
          }, d.transfer);
          return;
        }
        s.send({
          id: h,
          isEvent: !0,
          payload: d
        });
      }
    }, t.add = s.register, t.emit = s.emit;
  }(nt)), nt;
}
const { platform: _i, isMainThread: Li, cpus: Oi } = It;
function ki(t, e) {
  var r = Pi();
  return new r(t, e);
}
j.pool = ki;
function Fi(t, e) {
  var r = Qr();
  r.add(t, e);
}
j.worker = Fi;
function Ni(t) {
  var e = Qr();
  e.emit(t);
}
j.workerEmit = Ni;
const { Promise: Hi } = Ye();
j.Promise = Hi;
j.Transfer = zr();
j.platform = _i;
j.isMainThread = Li;
j.cpus = Oi;
let At;
const Gi = (t, e = navigator.hardwareConcurrency - 1) => At ?? (At = j.pool(t, {
  maxWorkers: e,
  workerOpts: {
    type: void 0
  }
})), Wr = () => At, st = () => Wr().stats().pendingTasks === 0;
function Ui(t, e, r) {
  return Wr().exec(t, e, r);
}
/**
 * postprocessing v6.36.6 build Tue Dec 31 2024
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2024 Raoul van Rüschen
 * @license Zlib
 */
var ot = 1 / 1e3, zi = 1e3, Qi = class {
  /**
   * Constructs a new timer.
   */
  constructor() {
    this.startTime = performance.now(), this.previousTime = 0, this.currentTime = 0, this._delta = 0, this._elapsed = 0, this._fixedDelta = 1e3 / 60, this.timescale = 1, this.useFixedDelta = !1, this._autoReset = !1;
  }
  /**
   * Enables or disables auto reset based on page visibility.
   *
   * If enabled, the timer will be reset when the page becomes visible. This effectively pauses the timer when the page
   * is hidden. Has no effect if the API is not supported.
   *
   * @type {Boolean}
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
   */
  get autoReset() {
    return this._autoReset;
  }
  set autoReset(t) {
    typeof document < "u" && document.hidden !== void 0 && (t ? document.addEventListener("visibilitychange", this) : document.removeEventListener("visibilitychange", this), this._autoReset = t);
  }
  get delta() {
    return this._delta * ot;
  }
  get fixedDelta() {
    return this._fixedDelta * ot;
  }
  set fixedDelta(t) {
    this._fixedDelta = t * zi;
  }
  get elapsed() {
    return this._elapsed * ot;
  }
  /**
   * Updates this timer.
   *
   * @param {Boolean} [timestamp] - The current time in milliseconds.
   */
  update(t) {
    this.useFixedDelta ? this._delta = this.fixedDelta : (this.previousTime = this.currentTime, this.currentTime = (t !== void 0 ? t : performance.now()) - this.startTime, this._delta = this.currentTime - this.previousTime), this._delta *= this.timescale, this._elapsed += this._delta;
  }
  /**
   * Resets this timer.
   */
  reset() {
    this._delta = 0, this._elapsed = 0, this.currentTime = performance.now() - this.startTime;
  }
  getDelta() {
    return this.delta;
  }
  getElapsed() {
    return this.elapsed;
  }
  handleEvent(t) {
    document.hidden || (this.currentTime = performance.now() - this.startTime);
  }
  dispose() {
    this.autoReset = !1;
  }
}, Wi = /* @__PURE__ */ (() => {
  const t = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), e = new Float32Array([0, 0, 2, 0, 0, 2]), r = new de();
  return r.setAttribute("position", new P(t, 3)), r.setAttribute("uv", new P(e, 2)), r;
})(), K = class vt {
  /**
   * A shared fullscreen triangle.
   *
   * The screen size is 2x2 units (NDC). A triangle needs to be 4x4 units to fill the screen.
   * @see https://michaldrobot.com/2014/04/01/gcn-execution-patterns-in-full-screen-passes/
   * @type {BufferGeometry}
   * @internal
   */
  static get fullscreenGeometry() {
    return Wi;
  }
  /**
   * Constructs a new pass.
   *
   * @param {String} [name] - The name of this pass. Does not have to be unique.
   * @param {Scene} [scene] - The scene to render. The default scene contains a single mesh that fills the screen.
   * @param {Camera} [camera] - A camera. Fullscreen effect passes don't require a camera.
   */
  constructor(e = "Pass", r = new ie(), n = new Cn()) {
    this.name = e, this.renderer = null, this.scene = r, this.camera = n, this.screen = null, this.rtt = !0, this.needsSwap = !0, this.needsDepthTexture = !1, this.enabled = !0;
  }
  /**
   * Sets the render to screen flag.
   *
   * If this flag is changed, the fullscreen material will be updated as well.
   *
   * @type {Boolean}
   */
  get renderToScreen() {
    return !this.rtt;
  }
  set renderToScreen(e) {
    if (this.rtt === e) {
      const r = this.fullscreenMaterial;
      r !== null && (r.needsUpdate = !0), this.rtt = !e;
    }
  }
  /**
   * Sets the main scene.
   *
   * @type {Scene}
   */
  set mainScene(e) {
  }
  /**
   * Sets the main camera.
   *
   * @type {Camera}
   */
  set mainCamera(e) {
  }
  /**
   * Sets the renderer
   *
   * @deprecated
   * @param {WebGLRenderer} renderer - The renderer.
   */
  setRenderer(e) {
    this.renderer = e;
  }
  /**
   * Indicates whether this pass is enabled.
   *
   * @deprecated Use enabled instead.
   * @return {Boolean} Whether this pass is enabled.
   */
  isEnabled() {
    return this.enabled;
  }
  /**
   * Enables or disables this pass.
   *
   * @deprecated Use enabled instead.
   * @param {Boolean} value - Whether the pass should be enabled.
   */
  setEnabled(e) {
    this.enabled = e;
  }
  /**
   * The fullscreen material.
   *
   * @type {Material}
   */
  get fullscreenMaterial() {
    return this.screen !== null ? this.screen.material : null;
  }
  set fullscreenMaterial(e) {
    let r = this.screen;
    r !== null ? r.material = e : (r = new k(vt.fullscreenGeometry, e), r.frustumCulled = !1, this.scene === null && (this.scene = new ie()), this.scene.add(r), this.screen = r);
  }
  /**
   * Returns the current fullscreen material.
   *
   * @deprecated Use fullscreenMaterial instead.
   * @return {Material} The current fullscreen material, or null if there is none.
   */
  getFullscreenMaterial() {
    return this.fullscreenMaterial;
  }
  /**
   * Sets the fullscreen material.
   *
   * @deprecated Use fullscreenMaterial instead.
   * @protected
   * @param {Material} value - A fullscreen material.
   */
  setFullscreenMaterial(e) {
    this.fullscreenMaterial = e;
  }
  /**
   * Returns the current depth texture.
   *
   * @return {Texture} The current depth texture, or null if there is none.
   */
  getDepthTexture() {
    return null;
  }
  /**
   * Sets the depth texture.
   *
   * This method will be called automatically by the {@link EffectComposer}.
   * You may override this method if your pass relies on the depth information of a preceding {@link RenderPass}.
   *
   * @param {Texture} depthTexture - A depth texture.
   * @param {DepthPackingStrategy} [depthPacking=BasicDepthPacking] - The depth packing.
   */
  setDepthTexture(e, r = xe) {
  }
  /**
   * Renders this pass.
   *
   * This is an abstract method that must be overridden.
   *
   * @abstract
   * @throws {Error} An error is thrown if the method is not overridden.
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {WebGLRenderTarget} outputBuffer - A frame buffer that serves as the output render target unless this pass renders to screen.
   * @param {Number} [deltaTime] - The time between the last frame and the current one in seconds.
   * @param {Boolean} [stencilTest] - Indicates whether a stencil mask is active.
   */
  render(e, r, n, i, o) {
    throw new Error("Render method not implemented!");
  }
  /**
   * Sets the size.
   *
   * You may override this method if you want to be informed about the size of the backbuffer/canvas.
   * This method is called before {@link initialize} and every time the size of the {@link EffectComposer} changes.
   *
   * @param {Number} width - The width.
   * @param {Number} height - The height.
   */
  setSize(e, r) {
  }
  /**
   * Performs initialization tasks.
   *
   * This method is called when this pass is added to an {@link EffectComposer}.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Boolean} alpha - Whether the renderer uses the alpha channel or not.
   * @param {Number} frameBufferType - The type of the main frame buffers.
   */
  initialize(e, r, n) {
  }
  /**
   * Performs a shallow search for disposable properties and deletes them.
   *
   * The {@link EffectComposer} calls this method when it is being destroyed. You can use it independently to free
   * memory when you're certain that you don't need this pass anymore.
   */
  dispose() {
    for (const e of Object.keys(this)) {
      const r = this[e];
      (r instanceof te || r instanceof ae || r instanceof ce || r instanceof vt) && this[e].dispose();
    }
    this.fullscreenMaterial !== null && this.fullscreenMaterial.dispose();
  }
}, Yi = class extends K {
  /**
   * Constructs a new clear mask pass.
   */
  constructor() {
    super("ClearMaskPass", null, null), this.needsSwap = !1;
  }
  /**
   * Disables the global stencil test.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {WebGLRenderTarget} outputBuffer - A frame buffer that serves as the output render target unless this pass renders to screen.
   * @param {Number} [deltaTime] - The time between the last frame and the current one in seconds.
   * @param {Boolean} [stencilTest] - Indicates whether a stencil mask is active.
   */
  render(t, e, r, n, i) {
    const o = t.state.buffers.stencil;
    o.setLocked(!1), o.setTest(!1);
  }
}, Vi = `#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <colorspace_fragment>
#include <dithering_fragment>
}`, Xi = "varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}", ji = class extends fe {
  /**
   * Constructs a new copy material.
   */
  constructor() {
    super({
      name: "CopyMaterial",
      uniforms: {
        inputBuffer: new _(null),
        opacity: new _(1)
      },
      blending: ze,
      toneMapped: !1,
      depthWrite: !1,
      depthTest: !1,
      fragmentShader: Vi,
      vertexShader: Xi
    });
  }
  /**
   * The input buffer.
   *
   * @type {Texture}
   */
  set inputBuffer(t) {
    this.uniforms.inputBuffer.value = t;
  }
  /**
   * Sets the input buffer.
   *
   * @deprecated Use inputBuffer instead.
   * @param {Number} value - The buffer.
   */
  setInputBuffer(t) {
    this.uniforms.inputBuffer.value = t;
  }
  /**
   * Returns the opacity.
   *
   * @deprecated Use opacity instead.
   * @return {Number} The opacity.
   */
  getOpacity(t) {
    return this.uniforms.opacity.value;
  }
  /**
   * Sets the opacity.
   *
   * @deprecated Use opacity instead.
   * @param {Number} value - The opacity.
   */
  setOpacity(t) {
    this.uniforms.opacity.value = t;
  }
}, Ki = class extends K {
  /**
   * Constructs a new save pass.
   *
   * @param {WebGLRenderTarget} [renderTarget] - A render target.
   * @param {Boolean} [autoResize=true] - Whether the render target size should be updated automatically.
   */
  constructor(t, e = !0) {
    super("CopyPass"), this.fullscreenMaterial = new ji(), this.needsSwap = !1, this.renderTarget = t, t === void 0 && (this.renderTarget = new te(1, 1, {
      minFilter: Q,
      magFilter: Q,
      stencilBuffer: !1,
      depthBuffer: !1
    }), this.renderTarget.texture.name = "CopyPass.Target"), this.autoResize = e;
  }
  /**
   * Enables or disables auto resizing of the render target.
   *
   * @deprecated Use autoResize instead.
   * @type {Boolean}
   */
  get resize() {
    return this.autoResize;
  }
  set resize(t) {
    this.autoResize = t;
  }
  /**
   * The output texture.
   *
   * @type {Texture}
   */
  get texture() {
    return this.renderTarget.texture;
  }
  /**
   * Returns the output texture.
   *
   * @deprecated Use texture instead.
   * @return {Texture} The texture.
   */
  getTexture() {
    return this.renderTarget.texture;
  }
  /**
   * Enables or disables auto resizing of the render target.
   *
   * @deprecated Use autoResize instead.
   * @param {Boolean} value - Whether the render target size should be updated automatically.
   */
  setAutoResizeEnabled(t) {
    this.autoResize = t;
  }
  /**
   * Saves the input buffer.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {WebGLRenderTarget} outputBuffer - A frame buffer that serves as the output render target unless this pass renders to screen.
   * @param {Number} [deltaTime] - The time between the last frame and the current one in seconds.
   * @param {Boolean} [stencilTest] - Indicates whether a stencil mask is active.
   */
  render(t, e, r, n, i) {
    this.fullscreenMaterial.inputBuffer = e.texture, t.setRenderTarget(this.renderToScreen ? null : this.renderTarget), t.render(this.scene, this.camera);
  }
  /**
   * Updates the size of this pass.
   *
   * @param {Number} width - The width.
   * @param {Number} height - The height.
   */
  setSize(t, e) {
    this.autoResize && this.renderTarget.setSize(t, e);
  }
  /**
   * Performs initialization tasks.
   *
   * @param {WebGLRenderer} renderer - A renderer.
   * @param {Boolean} alpha - Whether the renderer uses the alpha channel.
   * @param {Number} frameBufferType - The type of the main frame buffers.
   */
  initialize(t, e, r) {
    r !== void 0 && (this.renderTarget.texture.type = r, r !== Se ? this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1" : t !== null && t.outputColorSpace === z && (this.renderTarget.texture.colorSpace = z));
  }
}, qt = /* @__PURE__ */ new N(), St = class extends K {
  /**
   * Constructs a new clear pass.
   *
   * @param {Boolean} [color=true] - Determines whether the color buffer should be cleared.
   * @param {Boolean} [depth=true] - Determines whether the depth buffer should be cleared.
   * @param {Boolean} [stencil=false] - Determines whether the stencil buffer should be cleared.
   */
  constructor(t = !0, e = !0, r = !1) {
    super("ClearPass", null, null), this.needsSwap = !1, this.color = t, this.depth = e, this.stencil = r, this.overrideClearColor = null, this.overrideClearAlpha = -1;
  }
  /**
   * Sets the clear flags.
   *
   * @param {Boolean} color - Whether the color buffer should be cleared.
   * @param {Boolean} depth - Whether the depth buffer should be cleared.
   * @param {Boolean} stencil - Whether the stencil buffer should be cleared.
   */
  setClearFlags(t, e, r) {
    this.color = t, this.depth = e, this.stencil = r;
  }
  /**
   * Returns the override clear color. Default is null.
   *
   * @deprecated Use overrideClearColor instead.
   * @return {Color} The clear color.
   */
  getOverrideClearColor() {
    return this.overrideClearColor;
  }
  /**
   * Sets the override clear color.
   *
   * @deprecated Use overrideClearColor instead.
   * @param {Color} value - The clear color.
   */
  setOverrideClearColor(t) {
    this.overrideClearColor = t;
  }
  /**
   * Returns the override clear alpha. Default is -1.
   *
   * @deprecated Use overrideClearAlpha instead.
   * @return {Number} The clear alpha.
   */
  getOverrideClearAlpha() {
    return this.overrideClearAlpha;
  }
  /**
   * Sets the override clear alpha.
   *
   * @deprecated Use overrideClearAlpha instead.
   * @param {Number} value - The clear alpha.
   */
  setOverrideClearAlpha(t) {
    this.overrideClearAlpha = t;
  }
  /**
   * Clears the input buffer or the screen.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {WebGLRenderTarget} outputBuffer - A frame buffer that serves as the output render target unless this pass renders to screen.
   * @param {Number} [deltaTime] - The time between the last frame and the current one in seconds.
   * @param {Boolean} [stencilTest] - Indicates whether a stencil mask is active.
   */
  render(t, e, r, n, i) {
    const o = this.overrideClearColor, s = this.overrideClearAlpha, a = t.getClearAlpha(), c = o !== null, u = s >= 0;
    c ? (t.getClearColor(qt), t.setClearColor(o, u ? s : a)) : u && t.setClearAlpha(s), t.setRenderTarget(this.renderToScreen ? null : e), t.clear(this.color, this.depth, this.stencil), c ? t.setClearColor(qt, a) : u && t.setClearAlpha(a);
  }
}, Ji = class extends K {
  /**
   * Constructs a new mask pass.
   *
   * @param {Scene} scene - The scene to render.
   * @param {Camera} camera - The camera to use.
   */
  constructor(t, e) {
    super("MaskPass", t, e), this.needsSwap = !1, this.clearPass = new St(!1, !1, !0), this.inverse = !1;
  }
  set mainScene(t) {
    this.scene = t;
  }
  set mainCamera(t) {
    this.camera = t;
  }
  /**
   * Indicates whether the mask should be inverted.
   *
   * @type {Boolean}
   */
  get inverted() {
    return this.inverse;
  }
  set inverted(t) {
    this.inverse = t;
  }
  /**
   * Indicates whether this pass should clear the stencil buffer.
   *
   * @type {Boolean}
   * @deprecated Use clearPass.enabled instead.
   */
  get clear() {
    return this.clearPass.enabled;
  }
  set clear(t) {
    this.clearPass.enabled = t;
  }
  /**
   * Returns the internal clear pass.
   *
   * @deprecated Use clearPass.enabled instead.
   * @return {ClearPass} The clear pass.
   */
  getClearPass() {
    return this.clearPass;
  }
  /**
   * Indicates whether the mask is inverted.
   *
   * @deprecated Use inverted instead.
   * @return {Boolean} Whether the mask is inverted.
   */
  isInverted() {
    return this.inverted;
  }
  /**
   * Enables or disable mask inversion.
   *
   * @deprecated Use inverted instead.
   * @param {Boolean} value - Whether the mask should be inverted.
   */
  setInverted(t) {
    this.inverted = t;
  }
  /**
   * Renders the effect.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {WebGLRenderTarget} outputBuffer - A frame buffer that serves as the output render target unless this pass renders to screen.
   * @param {Number} [deltaTime] - The time between the last frame and the current one in seconds.
   * @param {Boolean} [stencilTest] - Indicates whether a stencil mask is active.
   */
  render(t, e, r, n, i) {
    const o = t.getContext(), s = t.state.buffers, a = this.scene, c = this.camera, u = this.clearPass, l = this.inverted ? 0 : 1, f = 1 - l;
    s.color.setMask(!1), s.depth.setMask(!1), s.color.setLocked(!0), s.depth.setLocked(!0), s.stencil.setTest(!0), s.stencil.setOp(o.REPLACE, o.REPLACE, o.REPLACE), s.stencil.setFunc(o.ALWAYS, l, 4294967295), s.stencil.setClear(f), s.stencil.setLocked(!0), this.clearPass.enabled && (this.renderToScreen ? u.render(t, null) : (u.render(t, e), u.render(t, r))), this.renderToScreen ? (t.setRenderTarget(null), t.render(a, c)) : (t.setRenderTarget(e), t.render(a, c), t.setRenderTarget(r), t.render(a, c)), s.color.setLocked(!1), s.depth.setLocked(!1), s.stencil.setLocked(!1), s.stencil.setFunc(o.EQUAL, 1, 4294967295), s.stencil.setOp(o.KEEP, o.KEEP, o.KEEP), s.stencil.setLocked(!0);
  }
}, qi = class {
  /**
   * Constructs a new effect composer.
   *
   * @param {WebGLRenderer} renderer - The renderer that should be used.
   * @param {Object} [options] - The options.
   * @param {Boolean} [options.depthBuffer=true] - Whether the main render targets should have a depth buffer.
   * @param {Boolean} [options.stencilBuffer=false] - Whether the main render targets should have a stencil buffer.
   * @param {Boolean} [options.alpha] - Deprecated. Buffers are always RGBA since three r137.
   * @param {Number} [options.multisampling=0] - The number of samples used for multisample antialiasing. Requires WebGL 2.
   * @param {Number} [options.frameBufferType] - The type of the internal frame buffers. It's recommended to use HalfFloatType if possible.
   */
  constructor(t = null, {
    depthBuffer: e = !0,
    stencilBuffer: r = !1,
    multisampling: n = 0,
    frameBufferType: i
  } = {}) {
    this.renderer = null, this.inputBuffer = this.createBuffer(e, r, i, n), this.outputBuffer = this.inputBuffer.clone(), this.copyPass = new Ki(), this.depthTexture = null, this.passes = [], this.timer = new Qi(), this.autoRenderToScreen = !0, this.setRenderer(t);
  }
  /**
   * The current amount of samples used for multisample anti-aliasing.
   *
   * @type {Number}
   */
  get multisampling() {
    return this.inputBuffer.samples || 0;
  }
  /**
   * Sets the amount of MSAA samples.
   *
   * Requires WebGL 2. Set to zero to disable multisampling.
   *
   * @type {Number}
   */
  set multisampling(t) {
    const e = this.inputBuffer, r = this.multisampling;
    r > 0 && t > 0 ? (this.inputBuffer.samples = t, this.outputBuffer.samples = t, this.inputBuffer.dispose(), this.outputBuffer.dispose()) : r !== t && (this.inputBuffer.dispose(), this.outputBuffer.dispose(), this.inputBuffer = this.createBuffer(
      e.depthBuffer,
      e.stencilBuffer,
      e.texture.type,
      t
    ), this.inputBuffer.depthTexture = this.depthTexture, this.outputBuffer = this.inputBuffer.clone());
  }
  /**
   * Returns the internal timer.
   *
   * @return {Timer} The timer.
   */
  getTimer() {
    return this.timer;
  }
  /**
   * Returns the renderer.
   *
   * @return {WebGLRenderer} The renderer.
   */
  getRenderer() {
    return this.renderer;
  }
  /**
   * Sets the renderer.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  setRenderer(t) {
    if (this.renderer = t, t !== null) {
      const e = t.getSize(new F()), r = t.getContext().getContextAttributes().alpha, n = this.inputBuffer.texture.type;
      n === Se && t.outputColorSpace === z && (this.inputBuffer.texture.colorSpace = z, this.outputBuffer.texture.colorSpace = z, this.inputBuffer.dispose(), this.outputBuffer.dispose()), t.autoClear = !1, this.setSize(e.width, e.height);
      for (const i of this.passes)
        i.initialize(t, r, n);
    }
  }
  /**
   * Replaces the current renderer with the given one.
   *
   * The auto clear mechanism of the provided renderer will be disabled. If the new render size differs from the
   * previous one, all passes will be updated.
   *
   * By default, the DOM element of the current renderer will automatically be removed from its parent node and the DOM
   * element of the new renderer will take its place.
   *
   * @deprecated Use setRenderer instead.
   * @param {WebGLRenderer} renderer - The new renderer.
   * @param {Boolean} updateDOM - Indicates whether the old canvas should be replaced by the new one in the DOM.
   * @return {WebGLRenderer} The old renderer.
   */
  replaceRenderer(t, e = !0) {
    const r = this.renderer, n = r.domElement.parentNode;
    return this.setRenderer(t), e && n !== null && (n.removeChild(r.domElement), n.appendChild(t.domElement)), r;
  }
  /**
   * Creates a depth texture attachment that will be provided to all passes.
   *
   * Note: When a shader reads from a depth texture and writes to a render target that uses the same depth texture
   * attachment, the depth information will be lost. This happens even if `depthWrite` is disabled.
   *
   * @private
   * @return {DepthTexture} The depth texture.
   */
  createDepthTexture() {
    const t = this.depthTexture = new Cr();
    return this.inputBuffer.depthTexture = t, this.inputBuffer.dispose(), this.inputBuffer.stencilBuffer ? (t.format = En, t.type = Tn) : t.type = yn, t;
  }
  /**
   * Deletes the current depth texture.
   *
   * @private
   */
  deleteDepthTexture() {
    if (this.depthTexture !== null) {
      this.depthTexture.dispose(), this.depthTexture = null, this.inputBuffer.depthTexture = null, this.inputBuffer.dispose();
      for (const t of this.passes)
        t.setDepthTexture(null);
    }
  }
  /**
   * Creates a new render target.
   *
   * @deprecated Create buffers manually via WebGLRenderTarget instead.
   * @param {Boolean} depthBuffer - Whether the render target should have a depth buffer.
   * @param {Boolean} stencilBuffer - Whether the render target should have a stencil buffer.
   * @param {Number} type - The frame buffer type.
   * @param {Number} multisampling - The number of samples to use for antialiasing.
   * @return {WebGLRenderTarget} A new render target that equals the renderer's canvas.
   */
  createBuffer(t, e, r, n) {
    const i = this.renderer, o = i === null ? new F() : i.getDrawingBufferSize(new F()), s = {
      minFilter: Q,
      magFilter: Q,
      stencilBuffer: e,
      depthBuffer: t,
      type: r
    }, a = new te(o.width, o.height, s);
    return n > 0 && (a.ignoreDepthForMultisampleCopy = !1, a.samples = n), r === Se && i !== null && i.outputColorSpace === z && (a.texture.colorSpace = z), a.texture.name = "EffectComposer.Buffer", a.texture.generateMipmaps = !1, a;
  }
  /**
   * Can be used to change the main scene for all registered passes and effects.
   *
   * @param {Scene} scene - The scene.
   */
  setMainScene(t) {
    for (const e of this.passes)
      e.mainScene = t;
  }
  /**
   * Can be used to change the main camera for all registered passes and effects.
   *
   * @param {Camera} camera - The camera.
   */
  setMainCamera(t) {
    for (const e of this.passes)
      e.mainCamera = t;
  }
  /**
   * Adds a pass, optionally at a specific index.
   *
   * @param {Pass} pass - A new pass.
   * @param {Number} [index] - An index at which the pass should be inserted.
   */
  addPass(t, e) {
    const r = this.passes, n = this.renderer, i = n.getDrawingBufferSize(new F()), o = n.getContext().getContextAttributes().alpha, s = this.inputBuffer.texture.type;
    if (t.setRenderer(n), t.setSize(i.width, i.height), t.initialize(n, o, s), this.autoRenderToScreen && (r.length > 0 && (r[r.length - 1].renderToScreen = !1), t.renderToScreen && (this.autoRenderToScreen = !1)), e !== void 0 ? r.splice(e, 0, t) : r.push(t), this.autoRenderToScreen && (r[r.length - 1].renderToScreen = !0), t.needsDepthTexture || this.depthTexture !== null)
      if (this.depthTexture === null) {
        const a = this.createDepthTexture();
        for (t of r)
          t.setDepthTexture(a);
      } else
        t.setDepthTexture(this.depthTexture);
  }
  /**
   * Removes a pass.
   *
   * @param {Pass} pass - The pass.
   */
  removePass(t) {
    const e = this.passes, r = e.indexOf(t);
    if (r !== -1 && e.splice(r, 1).length > 0) {
      if (this.depthTexture !== null) {
        const o = (a, c) => a || c.needsDepthTexture;
        e.reduce(o, !1) || (t.getDepthTexture() === this.depthTexture && t.setDepthTexture(null), this.deleteDepthTexture());
      }
      this.autoRenderToScreen && r === e.length && (t.renderToScreen = !1, e.length > 0 && (e[e.length - 1].renderToScreen = !0));
    }
  }
  /**
   * Removes all passes.
   */
  removeAllPasses() {
    const t = this.passes;
    this.deleteDepthTexture(), t.length > 0 && (this.autoRenderToScreen && (t[t.length - 1].renderToScreen = !1), this.passes = []);
  }
  /**
   * Renders all enabled passes in the order in which they were added.
   *
   * @param {Number} [deltaTime] - The time since the last frame in seconds.
   */
  render(t) {
    const e = this.renderer, r = this.copyPass;
    let n = this.inputBuffer, i = this.outputBuffer, o = !1, s, a, c;
    t === void 0 && (this.timer.update(), t = this.timer.getDelta());
    for (const u of this.passes)
      u.enabled && (u.render(e, n, i, t, o), u.needsSwap && (o && (r.renderToScreen = u.renderToScreen, s = e.getContext(), a = e.state.buffers.stencil, a.setFunc(s.NOTEQUAL, 1, 4294967295), r.render(e, n, i, t, o), a.setFunc(s.EQUAL, 1, 4294967295)), c = n, n = i, i = c), u instanceof Ji ? o = !0 : u instanceof Yi && (o = !1));
  }
  /**
   * Sets the size of the buffers, passes and the renderer.
   *
   * @param {Number} width - The width.
   * @param {Number} height - The height.
   * @param {Boolean} [updateStyle] - Determines whether the style of the canvas should be updated.
   */
  setSize(t, e, r) {
    const n = this.renderer, i = n.getSize(new F());
    (t === void 0 || e === void 0) && (t = i.width, e = i.height), (i.width !== t || i.height !== e) && n.setSize(t, e, r);
    const o = n.getDrawingBufferSize(new F());
    this.inputBuffer.setSize(o.width, o.height), this.outputBuffer.setSize(o.width, o.height);
    for (const s of this.passes)
      s.setSize(o.width, o.height);
  }
  /**
   * Resets this composer by deleting all passes and creating new buffers.
   */
  reset() {
    this.dispose(), this.autoRenderToScreen = !0;
  }
  /**
   * Disposes this composer and all passes.
   */
  dispose() {
    for (const t of this.passes)
      t.dispose();
    this.passes = [], this.inputBuffer !== null && this.inputBuffer.dispose(), this.outputBuffer !== null && this.outputBuffer.dispose(), this.deleteDepthTexture(), this.copyPass.dispose(), this.timer.dispose(), K.fullscreenGeometry.dispose();
  }
}, V = {
  NONE: 0,
  DEPTH: 1,
  CONVOLUTION: 2
}, R = {
  FRAGMENT_HEAD: "FRAGMENT_HEAD",
  FRAGMENT_MAIN_UV: "FRAGMENT_MAIN_UV",
  FRAGMENT_MAIN_IMAGE: "FRAGMENT_MAIN_IMAGE",
  VERTEX_HEAD: "VERTEX_HEAD",
  VERTEX_MAIN_SUPPORT: "VERTEX_MAIN_SUPPORT"
}, Zi = class {
  /**
   * Constructs new shader data.
   */
  constructor() {
    this.shaderParts = /* @__PURE__ */ new Map([
      [R.FRAGMENT_HEAD, null],
      [R.FRAGMENT_MAIN_UV, null],
      [R.FRAGMENT_MAIN_IMAGE, null],
      [R.VERTEX_HEAD, null],
      [R.VERTEX_MAIN_SUPPORT, null]
    ]), this.defines = /* @__PURE__ */ new Map(), this.uniforms = /* @__PURE__ */ new Map(), this.blendModes = /* @__PURE__ */ new Map(), this.extensions = /* @__PURE__ */ new Set(), this.attributes = V.NONE, this.varyings = /* @__PURE__ */ new Set(), this.uvTransformation = !1, this.readDepth = !1, this.colorSpace = br;
  }
}, at = !1, Zt = class {
  /**
   * Constructs a new override material manager.
   *
   * @param {Material} [material=null] - An override material.
   */
  constructor(t = null) {
    this.originalMaterials = /* @__PURE__ */ new Map(), this.material = null, this.materials = null, this.materialsBackSide = null, this.materialsDoubleSide = null, this.materialsFlatShaded = null, this.materialsFlatShadedBackSide = null, this.materialsFlatShadedDoubleSide = null, this.setMaterial(t), this.meshCount = 0, this.replaceMaterial = (e) => {
      if (e.isMesh) {
        let r;
        if (e.material.flatShading)
          switch (e.material.side) {
            case be:
              r = this.materialsFlatShadedDoubleSide;
              break;
            case ee:
              r = this.materialsFlatShadedBackSide;
              break;
            default:
              r = this.materialsFlatShaded;
              break;
          }
        else
          switch (e.material.side) {
            case be:
              r = this.materialsDoubleSide;
              break;
            case ee:
              r = this.materialsBackSide;
              break;
            default:
              r = this.materials;
              break;
          }
        this.originalMaterials.set(e, e.material), e.isSkinnedMesh ? e.material = r[2] : e.isInstancedMesh ? e.material = r[1] : e.material = r[0], ++this.meshCount;
      }
    };
  }
  /**
   * Clones the given material.
   *
   * @private
   * @param {Material} material - The material.
   * @return {Material} The cloned material.
   */
  cloneMaterial(t) {
    if (!(t instanceof fe))
      return t.clone();
    const e = t.uniforms, r = /* @__PURE__ */ new Map();
    for (const i in e) {
      const o = e[i].value;
      o.isRenderTargetTexture && (e[i].value = null, r.set(i, o));
    }
    const n = t.clone();
    for (const i of r)
      e[i[0]].value = i[1], n.uniforms[i[0]].value = i[1];
    return n;
  }
  /**
   * Sets the override material.
   *
   * @param {Material} material - The material.
   */
  setMaterial(t) {
    if (this.disposeMaterials(), this.material = t, t !== null) {
      const e = this.materials = [
        this.cloneMaterial(t),
        this.cloneMaterial(t),
        this.cloneMaterial(t)
      ];
      for (const r of e)
        r.uniforms = Object.assign({}, t.uniforms), r.side = Qe;
      e[2].skinning = !0, this.materialsBackSide = e.map((r) => {
        const n = this.cloneMaterial(r);
        return n.uniforms = Object.assign({}, t.uniforms), n.side = ee, n;
      }), this.materialsDoubleSide = e.map((r) => {
        const n = this.cloneMaterial(r);
        return n.uniforms = Object.assign({}, t.uniforms), n.side = be, n;
      }), this.materialsFlatShaded = e.map((r) => {
        const n = this.cloneMaterial(r);
        return n.uniforms = Object.assign({}, t.uniforms), n.flatShading = !0, n;
      }), this.materialsFlatShadedBackSide = e.map((r) => {
        const n = this.cloneMaterial(r);
        return n.uniforms = Object.assign({}, t.uniforms), n.flatShading = !0, n.side = ee, n;
      }), this.materialsFlatShadedDoubleSide = e.map((r) => {
        const n = this.cloneMaterial(r);
        return n.uniforms = Object.assign({}, t.uniforms), n.flatShading = !0, n.side = be, n;
      });
    }
  }
  /**
   * Renders the scene with the override material.
   *
   * @private
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Scene} scene - A scene.
   * @param {Camera} camera - A camera.
   */
  render(t, e, r) {
    const n = t.shadowMap.enabled;
    if (t.shadowMap.enabled = !1, at) {
      const i = this.originalMaterials;
      this.meshCount = 0, e.traverse(this.replaceMaterial), t.render(e, r);
      for (const o of i)
        o[0].material = o[1];
      this.meshCount !== i.size && i.clear();
    } else {
      const i = e.overrideMaterial;
      e.overrideMaterial = this.material, t.render(e, r), e.overrideMaterial = i;
    }
    t.shadowMap.enabled = n;
  }
  /**
   * Deletes cloned override materials.
   *
   * @private
   */
  disposeMaterials() {
    if (this.material !== null) {
      const t = this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);
      for (const e of t)
        e.dispose();
    }
  }
  /**
   * Performs cleanup tasks.
   */
  dispose() {
    this.originalMaterials.clear(), this.disposeMaterials();
  }
  /**
   * Indicates whether the override material workaround is enabled.
   *
   * @type {Boolean}
   */
  static get workaroundEnabled() {
    return at;
  }
  /**
   * Enables or disables the override material workaround globally.
   *
   * This only affects post processing passes and effects.
   *
   * @type {Boolean}
   */
  static set workaroundEnabled(t) {
    at = t;
  }
}, B = {
  SKIP: 9,
  SET: 30,
  ADD: 0,
  ALPHA: 1,
  AVERAGE: 2,
  COLOR: 3,
  COLOR_BURN: 4,
  COLOR_DODGE: 5,
  DARKEN: 6,
  DIFFERENCE: 7,
  DIVIDE: 8,
  DST: 9,
  EXCLUSION: 10,
  HARD_LIGHT: 11,
  HARD_MIX: 12,
  HUE: 13,
  INVERT: 14,
  INVERT_RGB: 15,
  LIGHTEN: 16,
  LINEAR_BURN: 17,
  LINEAR_DODGE: 18,
  LINEAR_LIGHT: 19,
  LUMINOSITY: 20,
  MULTIPLY: 21,
  NEGATION: 22,
  NORMAL: 23,
  OVERLAY: 24,
  PIN_LIGHT: 25,
  REFLECT: 26,
  SATURATION: 27,
  SCREEN: 28,
  SOFT_LIGHT: 29,
  SRC: 30,
  SUBTRACT: 31,
  VIVID_LIGHT: 32
}, $i = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y,opacity);}", es = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,min(y.a,opacity));}", ts = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y)*0.5,opacity);}", rs = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.rg,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}", ns = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(step(0.0,y)*(1.0-min(vec4(1.0),(1.0-x)/y)),vec4(1.0),step(1.0,x));return mix(x,z,opacity);}", is = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=step(0.0,x)*mix(min(vec4(1.0),x/max(1.0-y,1e-9)),vec4(1.0),step(1.0,y));return mix(x,z,opacity);}", ss = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x,y),opacity);}", os = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,abs(x-y),opacity);}", as = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x/max(y,1e-12),opacity);}", cs = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y-2.0*x*y),opacity);}", ls = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 a=min(x,1.0),b=min(y,1.0);vec4 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,y));return mix(x,z,opacity);}", us = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,step(1.0,x+y),opacity);}", fs = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.r,xHSL.gb));return vec4(mix(x.rgb,z,opacity),y.a);}", ds = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-y,opacity);}", hs = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y*(1.0-x),opacity);}", gs = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x,y),opacity);}", ps = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(y+x-1.0,0.0,1.0),opacity);}", ms = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x+y,1.0),opacity);}", As = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(2.0*y+x-1.0,0.0,1.0),opacity);}", vs = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.rg,yHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}", ws = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x*y,opacity);}", xs = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-abs(1.0-x-y),opacity);}", Es = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}", Ts = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(2.0*y*x,1.0-2.0*(1.0-y)*(1.0-x),step(0.5,x));return mix(x,z,opacity);}", ys = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 z=mix(mix(y2,x,step(0.5*x,y)),max(vec4(0.0),y2-1.0),step(x,(y2-1.0)));return mix(x,z,opacity);}", Cs = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(min(x*x/max(1.0-y,1e-12),1.0),y,step(1.0,y));return mix(x,z,opacity);}", Ds = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.r,yHSL.g,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}", bs = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y-min(x*y,1.0),opacity);}", Bs = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 w=step(0.5,y);vec4 z=mix(x-(1.0-y2)*x*(1.0-x),mix(x+(y2-1.0)*(sqrt(x)-x),x+(y2-1.0)*x*((16.0*x-12.0)*x+3.0),w*(1.0-step(0.25,x))),w);return mix(x,z,opacity);}", Is = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}", Ss = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x+y-1.0,0.0),opacity);}", Rs = "vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(max(1.0-min((1.0-x)/(2.0*y),1.0),0.0),min(x/(2.0*(1.0-y)),1.0),step(0.5,y));return mix(x,z,opacity);}", Ms = /* @__PURE__ */ new Map([
  [B.ADD, $i],
  [B.ALPHA, es],
  [B.AVERAGE, ts],
  [B.COLOR, rs],
  [B.COLOR_BURN, ns],
  [B.COLOR_DODGE, is],
  [B.DARKEN, ss],
  [B.DIFFERENCE, os],
  [B.DIVIDE, as],
  [B.DST, null],
  [B.EXCLUSION, cs],
  [B.HARD_LIGHT, ls],
  [B.HARD_MIX, us],
  [B.HUE, fs],
  [B.INVERT, ds],
  [B.INVERT_RGB, hs],
  [B.LIGHTEN, gs],
  [B.LINEAR_BURN, ps],
  [B.LINEAR_DODGE, ms],
  [B.LINEAR_LIGHT, As],
  [B.LUMINOSITY, vs],
  [B.MULTIPLY, ws],
  [B.NEGATION, xs],
  [B.NORMAL, Es],
  [B.OVERLAY, Ts],
  [B.PIN_LIGHT, ys],
  [B.REFLECT, Cs],
  [B.SATURATION, Ds],
  [B.SCREEN, bs],
  [B.SOFT_LIGHT, Bs],
  [B.SRC, Is],
  [B.SUBTRACT, Ss],
  [B.VIVID_LIGHT, Rs]
]), Ps = class extends Br {
  /**
   * Constructs a new blend mode.
   *
   * @param {BlendFunction} blendFunction - The blend function.
   * @param {Number} opacity - The opacity of the color that will be blended with the base color.
   */
  constructor(t, e = 1) {
    super(), this._blendFunction = t, this.opacity = new _(e);
  }
  /**
   * Returns the opacity.
   *
   * @return {Number} The opacity.
   */
  getOpacity() {
    return this.opacity.value;
  }
  /**
   * Sets the opacity.
   *
   * @param {Number} value - The opacity.
   */
  setOpacity(t) {
    this.opacity.value = t;
  }
  /**
   * The blend function.
   *
   * @type {BlendFunction}
   */
  get blendFunction() {
    return this._blendFunction;
  }
  set blendFunction(t) {
    this._blendFunction = t, this.dispatchEvent({ type: "change" });
  }
  /**
   * Returns the blend function.
   *
   * @deprecated Use blendFunction instead.
   * @return {BlendFunction} The blend function.
   */
  getBlendFunction() {
    return this.blendFunction;
  }
  /**
   * Sets the blend function.
   *
   * @deprecated Use blendFunction instead.
   * @param {BlendFunction} value - The blend function.
   */
  setBlendFunction(t) {
    this.blendFunction = t;
  }
  /**
   * Returns the blend function shader code.
   *
   * @return {String} The blend function shader code.
   */
  getShaderCode() {
    return Ms.get(this.blendFunction);
  }
}, Yr = class extends Br {
  /**
   * Constructs a new effect.
   *
   * @param {String} name - The name of this effect. Doesn't have to be unique.
   * @param {String} fragmentShader - The fragment shader. This shader is required.
   * @param {Object} [options] - Additional options.
   * @param {EffectAttribute} [options.attributes=EffectAttribute.NONE] - The effect attributes that determine the execution priority and resource requirements.
   * @param {BlendFunction} [options.blendFunction=BlendFunction.NORMAL] - The blend function of this effect.
   * @param {Map<String, String>} [options.defines] - Custom preprocessor macro definitions. Keys are names and values are code.
   * @param {Map<String, Uniform>} [options.uniforms] - Custom shader uniforms. Keys are names and values are uniforms.
   * @param {Set<WebGLExtension>} [options.extensions] - WebGL extensions.
   * @param {String} [options.vertexShader=null] - The vertex shader. Most effects don't need one.
   */
  constructor(t, e, {
    attributes: r = V.NONE,
    blendFunction: n = B.NORMAL,
    defines: i = /* @__PURE__ */ new Map(),
    uniforms: o = /* @__PURE__ */ new Map(),
    extensions: s = null,
    vertexShader: a = null
  } = {}) {
    super(), this.name = t, this.renderer = null, this.attributes = r, this.fragmentShader = e, this.vertexShader = a, this.defines = i, this.uniforms = o, this.extensions = s, this.blendMode = new Ps(n), this.blendMode.addEventListener("change", (c) => this.setChanged()), this._inputColorSpace = br, this._outputColorSpace = Dr;
  }
  /**
   * The input color space.
   *
   * @type {ColorSpace}
   * @experimental
   */
  get inputColorSpace() {
    return this._inputColorSpace;
  }
  /**
   * @type {ColorSpace}
   * @protected
   * @experimental
   */
  set inputColorSpace(t) {
    this._inputColorSpace = t, this.setChanged();
  }
  /**
   * The output color space.
   *
   * Should only be changed if this effect converts the input colors to a different color space.
   *
   * @type {ColorSpace}
   * @experimental
   */
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  /**
   * @type {ColorSpace}
   * @protected
   * @experimental
   */
  set outputColorSpace(t) {
    this._outputColorSpace = t, this.setChanged();
  }
  /**
   * Sets the main scene.
   *
   * @type {Scene}
   */
  set mainScene(t) {
  }
  /**
   * Sets the main camera.
   *
   * @type {Camera}
   */
  set mainCamera(t) {
  }
  /**
   * Returns the name of this effect.
   *
   * @deprecated Use name instead.
   * @return {String} The name.
   */
  getName() {
    return this.name;
  }
  /**
   * Sets the renderer.
   *
   * @deprecated
   * @param {WebGLRenderer} renderer - The renderer.
   */
  setRenderer(t) {
    this.renderer = t;
  }
  /**
   * Returns the preprocessor macro definitions.
   *
   * @deprecated Use defines instead.
   * @return {Map<String, String>} The extensions.
   */
  getDefines() {
    return this.defines;
  }
  /**
   * Returns the uniforms of this effect.
   *
   * @deprecated Use uniforms instead.
   * @return {Map<String, Uniform>} The extensions.
   */
  getUniforms() {
    return this.uniforms;
  }
  /**
   * Returns the WebGL extensions that are required by this effect.
   *
   * @deprecated Use extensions instead.
   * @return {Set<WebGLExtension>} The extensions.
   */
  getExtensions() {
    return this.extensions;
  }
  /**
   * Returns the blend mode.
   *
   * The result of this effect will be blended with the result of the previous effect using this blend mode.
   *
   * @deprecated Use blendMode instead.
   * @return {BlendMode} The blend mode.
   */
  getBlendMode() {
    return this.blendMode;
  }
  /**
   * Returns the effect attributes.
   *
   * @return {EffectAttribute} The attributes.
   */
  getAttributes() {
    return this.attributes;
  }
  /**
   * Sets the effect attributes.
   *
   * Effects that have the same attributes will be executed in the order in which they were registered. Some attributes
   * imply a higher priority.
   *
   * @protected
   * @param {EffectAttribute} attributes - The attributes.
   */
  setAttributes(t) {
    this.attributes = t, this.setChanged();
  }
  /**
   * Returns the fragment shader.
   *
   * @return {String} The fragment shader.
   */
  getFragmentShader() {
    return this.fragmentShader;
  }
  /**
   * Sets the fragment shader.
   *
   * @protected
   * @param {String} fragmentShader - The fragment shader.
   */
  setFragmentShader(t) {
    this.fragmentShader = t, this.setChanged();
  }
  /**
   * Returns the vertex shader.
   *
   * @return {String} The vertex shader.
   */
  getVertexShader() {
    return this.vertexShader;
  }
  /**
   * Sets the vertex shader.
   *
   * @protected
   * @param {String} vertexShader - The vertex shader.
   */
  setVertexShader(t) {
    this.vertexShader = t, this.setChanged();
  }
  /**
   * Informs the associated {@link EffectPass} that this effect requires a shader recompilation.
   *
   * Should be called after changing macros or extensions and after adding/removing uniforms.
   *
   * @protected
   */
  setChanged() {
    this.dispatchEvent({ type: "change" });
  }
  /**
   * Sets the depth texture.
   *
   * You may override this method if your effect requires direct access to the depth texture that is bound to the
   * associated {@link EffectPass}.
   *
   * @param {Texture} depthTexture - A depth texture.
   * @param {DepthPackingStrategies} [depthPacking=BasicDepthPacking] - The depth packing.
   */
  setDepthTexture(t, e = xe) {
  }
  /**
   * Updates this effect by performing supporting operations.
   *
   * This method is called by the {@link EffectPass} right before the main fullscreen render operation, even if the
   * blend function is set to `SKIP`.
   *
   * You may override this method if you need to update custom uniforms or render additional off-screen textures.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {Number} [deltaTime] - The time between the last frame and the current one in seconds.
   */
  update(t, e, r) {
  }
  /**
   * Updates the size of this effect.
   *
   * You may override this method if you want to be informed about the size of the backbuffer/canvas.
   * This method is called before {@link initialize} and every time the size of the {@link EffectComposer} changes.
   *
   * @param {Number} width - The width.
   * @param {Number} height - The height.
   */
  setSize(t, e) {
  }
  /**
   * Performs initialization tasks.
   *
   * This method is called when the associated {@link EffectPass} is added to an {@link EffectComposer}.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Boolean} alpha - Whether the renderer uses the alpha channel or not.
   * @param {Number} frameBufferType - The type of the main frame buffers.
   * @example if(!alpha && frameBufferType === UnsignedByteType) { this.myRenderTarget.texture.format = RGBFormat; }
   */
  initialize(t, e, r) {
  }
  /**
   * Performs a shallow search for properties that define a dispose method and deletes them.
   *
   * The {@link EffectComposer} calls this method when it is being destroyed.
   */
  dispose() {
    for (const t of Object.keys(this)) {
      const e = this[t];
      (e instanceof te || e instanceof ae || e instanceof ce || e instanceof K) && this[t].dispose();
    }
  }
}, $t = class extends K {
  /**
   * Constructs a new shader pass.
   *
   * @param {ShaderMaterial} material - A shader material.
   * @param {String} [input="inputBuffer"] - The name of the input buffer uniform.
   */
  constructor(t, e = "inputBuffer") {
    super("ShaderPass"), this.fullscreenMaterial = t, this.input = e;
  }
  /**
   * Sets the name of the input buffer uniform.
   *
   * @param {String} input - The name of the input buffer uniform.
   * @deprecated Use input instead.
   */
  setInput(t) {
    this.input = t;
  }
  /**
   * Renders the effect.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {WebGLRenderTarget} outputBuffer - A frame buffer that serves as the output render target unless this pass renders to screen.
   * @param {Number} [deltaTime] - The time between the last frame and the current one in seconds.
   * @param {Boolean} [stencilTest] - Indicates whether a stencil mask is active.
   */
  render(t, e, r, n, i) {
    const o = this.fullscreenMaterial.uniforms;
    e !== null && o !== void 0 && o[this.input] !== void 0 && (o[this.input].value = e.texture), t.setRenderTarget(this.renderToScreen ? null : r), t.render(this.scene, this.camera);
  }
  /**
   * Performs initialization tasks.
   *
   * @param {WebGLRenderer} renderer - A renderer.
   * @param {Boolean} alpha - Whether the renderer uses the alpha channel.
   * @param {Number} frameBufferType - The type of the main frame buffers.
   */
  initialize(t, e, r) {
    r !== void 0 && r !== Se && (this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1");
  }
}, _s = `#define QUALITY(q) ((q) < 5 ? 1.0 : ((q) > 5 ? ((q) < 10 ? 2.0 : ((q) < 11 ? 4.0 : 8.0)) : 1.5))
#define ONE_OVER_TWELVE 0.08333333333333333
varying vec2 vUvDown;varying vec2 vUvUp;varying vec2 vUvLeft;varying vec2 vUvRight;varying vec2 vUvDownLeft;varying vec2 vUvUpRight;varying vec2 vUvUpLeft;varying vec2 vUvDownRight;vec4 fxaa(const in vec4 inputColor,const in vec2 uv){float lumaCenter=luminance(inputColor.rgb);float lumaDown=luminance(texture2D(inputBuffer,vUvDown).rgb);float lumaUp=luminance(texture2D(inputBuffer,vUvUp).rgb);float lumaLeft=luminance(texture2D(inputBuffer,vUvLeft).rgb);float lumaRight=luminance(texture2D(inputBuffer,vUvRight).rgb);float lumaMin=min(lumaCenter,min(min(lumaDown,lumaUp),min(lumaLeft,lumaRight)));float lumaMax=max(lumaCenter,max(max(lumaDown,lumaUp),max(lumaLeft,lumaRight)));float lumaRange=lumaMax-lumaMin;if(lumaRange<max(EDGE_THRESHOLD_MIN,lumaMax*EDGE_THRESHOLD_MAX)){return inputColor;}float lumaDownLeft=luminance(texture2D(inputBuffer,vUvDownLeft).rgb);float lumaUpRight=luminance(texture2D(inputBuffer,vUvUpRight).rgb);float lumaUpLeft=luminance(texture2D(inputBuffer,vUvUpLeft).rgb);float lumaDownRight=luminance(texture2D(inputBuffer,vUvDownRight).rgb);float lumaDownUp=lumaDown+lumaUp;float lumaLeftRight=lumaLeft+lumaRight;float lumaLeftCorners=lumaDownLeft+lumaUpLeft;float lumaDownCorners=lumaDownLeft+lumaDownRight;float lumaRightCorners=lumaDownRight+lumaUpRight;float lumaUpCorners=lumaUpRight+lumaUpLeft;float edgeHorizontal=(abs(-2.0*lumaLeft+lumaLeftCorners)+abs(-2.0*lumaCenter+lumaDownUp)*2.0+abs(-2.0*lumaRight+lumaRightCorners));float edgeVertical=(abs(-2.0*lumaUp+lumaUpCorners)+abs(-2.0*lumaCenter+lumaLeftRight)*2.0+abs(-2.0*lumaDown+lumaDownCorners));bool isHorizontal=(edgeHorizontal>=edgeVertical);float stepLength=isHorizontal?texelSize.y:texelSize.x;float luma1=isHorizontal?lumaDown:lumaLeft;float luma2=isHorizontal?lumaUp:lumaRight;float gradient1=abs(luma1-lumaCenter);float gradient2=abs(luma2-lumaCenter);bool is1Steepest=gradient1>=gradient2;float gradientScaled=0.25*max(gradient1,gradient2);float lumaLocalAverage=0.0;if(is1Steepest){stepLength=-stepLength;lumaLocalAverage=0.5*(luma1+lumaCenter);}else{lumaLocalAverage=0.5*(luma2+lumaCenter);}vec2 currentUv=uv;if(isHorizontal){currentUv.y+=stepLength*0.5;}else{currentUv.x+=stepLength*0.5;}vec2 offset=isHorizontal?vec2(texelSize.x,0.0):vec2(0.0,texelSize.y);vec2 uv1=currentUv-offset*QUALITY(0);vec2 uv2=currentUv+offset*QUALITY(0);float lumaEnd1=luminance(texture2D(inputBuffer,uv1).rgb);float lumaEnd2=luminance(texture2D(inputBuffer,uv2).rgb);lumaEnd1-=lumaLocalAverage;lumaEnd2-=lumaLocalAverage;bool reached1=abs(lumaEnd1)>=gradientScaled;bool reached2=abs(lumaEnd2)>=gradientScaled;bool reachedBoth=reached1&&reached2;if(!reached1){uv1-=offset*QUALITY(1);}if(!reached2){uv2+=offset*QUALITY(1);}if(!reachedBoth){for(int i=2;i<SAMPLES;++i){if(!reached1){lumaEnd1=luminance(texture2D(inputBuffer,uv1).rgb);lumaEnd1=lumaEnd1-lumaLocalAverage;}if(!reached2){lumaEnd2=luminance(texture2D(inputBuffer,uv2).rgb);lumaEnd2=lumaEnd2-lumaLocalAverage;}reached1=abs(lumaEnd1)>=gradientScaled;reached2=abs(lumaEnd2)>=gradientScaled;reachedBoth=reached1&&reached2;if(!reached1){uv1-=offset*QUALITY(i);}if(!reached2){uv2+=offset*QUALITY(i);}if(reachedBoth){break;}}}float distance1=isHorizontal?(uv.x-uv1.x):(uv.y-uv1.y);float distance2=isHorizontal?(uv2.x-uv.x):(uv2.y-uv.y);bool isDirection1=distance1<distance2;float distanceFinal=min(distance1,distance2);float edgeThickness=(distance1+distance2);bool isLumaCenterSmaller=lumaCenter<lumaLocalAverage;bool correctVariation1=(lumaEnd1<0.0)!=isLumaCenterSmaller;bool correctVariation2=(lumaEnd2<0.0)!=isLumaCenterSmaller;bool correctVariation=isDirection1?correctVariation1:correctVariation2;float pixelOffset=-distanceFinal/edgeThickness+0.5;float finalOffset=correctVariation?pixelOffset:0.0;float lumaAverage=ONE_OVER_TWELVE*(2.0*(lumaDownUp+lumaLeftRight)+lumaLeftCorners+lumaRightCorners);float subPixelOffset1=clamp(abs(lumaAverage-lumaCenter)/lumaRange,0.0,1.0);float subPixelOffset2=(-2.0*subPixelOffset1+3.0)*subPixelOffset1*subPixelOffset1;float subPixelOffsetFinal=subPixelOffset2*subPixelOffset2*SUBPIXEL_QUALITY;finalOffset=max(finalOffset,subPixelOffsetFinal);vec2 finalUv=uv;if(isHorizontal){finalUv.y+=finalOffset*stepLength;}else{finalUv.x+=finalOffset*stepLength;}return texture2D(inputBuffer,finalUv);}void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=fxaa(inputColor,uv);}`, Ls = "varying vec2 vUvDown;varying vec2 vUvUp;varying vec2 vUvLeft;varying vec2 vUvRight;varying vec2 vUvDownLeft;varying vec2 vUvUpRight;varying vec2 vUvUpLeft;varying vec2 vUvDownRight;void mainSupport(const in vec2 uv){vUvDown=uv+vec2(0.0,-1.0)*texelSize;vUvUp=uv+vec2(0.0,1.0)*texelSize;vUvRight=uv+vec2(1.0,0.0)*texelSize;vUvLeft=uv+vec2(-1.0,0.0)*texelSize;vUvDownLeft=uv+vec2(-1.0,-1.0)*texelSize;vUvUpRight=uv+vec2(1.0,1.0)*texelSize;vUvUpLeft=uv+vec2(-1.0,1.0)*texelSize;vUvDownRight=uv+vec2(1.0,-1.0)*texelSize;}", Os = class extends Yr {
  /**
   * Constructs a new FXAA effect.
   *
   * @param {Object} [options] - The options.
   * @param {BlendFunction} [options.blendFunction=BlendFunction.SRC] - The blend function of this effect.
   */
  constructor({ blendFunction: t = B.SRC } = {}) {
    super("FXAAEffect", _s, {
      vertexShader: Ls,
      blendFunction: t,
      defines: /* @__PURE__ */ new Map([
        ["EDGE_THRESHOLD_MIN", "0.0312"],
        ["EDGE_THRESHOLD_MAX", "0.125"],
        ["SUBPIXEL_QUALITY", "0.75"],
        ["SAMPLES", "12"]
      ])
    });
  }
  /**
   * The minimum edge detection threshold. Range is [0.0, 1.0].
   *
   * @type {Number}
   */
  get minEdgeThreshold() {
    return Number(this.defines.get("EDGE_THRESHOLD_MIN"));
  }
  set minEdgeThreshold(t) {
    this.defines.set("EDGE_THRESHOLD_MIN", t.toFixed(12)), this.setChanged();
  }
  /**
   * The maximum edge detection threshold. Range is [0.0, 1.0].
   *
   * @type {Number}
   */
  get maxEdgeThreshold() {
    return Number(this.defines.get("EDGE_THRESHOLD_MAX"));
  }
  set maxEdgeThreshold(t) {
    this.defines.set("EDGE_THRESHOLD_MAX", t.toFixed(12)), this.setChanged();
  }
  /**
   * The subpixel blend quality. Range is [0.0, 1.0].
   *
   * @type {Number}
   */
  get subpixelQuality() {
    return Number(this.defines.get("SUBPIXEL_QUALITY"));
  }
  set subpixelQuality(t) {
    this.defines.set("SUBPIXEL_QUALITY", t.toFixed(12)), this.setChanged();
  }
  /**
   * The maximum amount of edge detection samples.
   *
   * @type {Number}
   */
  get samples() {
    return Number(this.defines.get("SAMPLES"));
  }
  set samples(t) {
    this.defines.set("SAMPLES", t.toFixed(0)), this.setChanged();
  }
}, ks = class extends K {
  /**
   * Constructs a new render pass.
   *
   * @param {Scene} scene - The scene to render.
   * @param {Camera} camera - The camera to use to render the scene.
   * @param {Material} [overrideMaterial=null] - An override material.
   */
  constructor(t, e, r = null) {
    super("RenderPass", t, e), this.needsSwap = !1, this.clearPass = new St(), this.overrideMaterialManager = r === null ? null : new Zt(r), this.ignoreBackground = !1, this.skipShadowMapUpdate = !1, this.selection = null;
  }
  set mainScene(t) {
    this.scene = t;
  }
  set mainCamera(t) {
    this.camera = t;
  }
  get renderToScreen() {
    return super.renderToScreen;
  }
  set renderToScreen(t) {
    super.renderToScreen = t, this.clearPass.renderToScreen = t;
  }
  /**
   * The current override material.
   *
   * @type {Material}
   */
  get overrideMaterial() {
    const t = this.overrideMaterialManager;
    return t !== null ? t.material : null;
  }
  set overrideMaterial(t) {
    const e = this.overrideMaterialManager;
    t !== null ? e !== null ? e.setMaterial(t) : this.overrideMaterialManager = new Zt(t) : e !== null && (e.dispose(), this.overrideMaterialManager = null);
  }
  /**
   * Returns the current override material.
   *
   * @deprecated Use overrideMaterial instead.
   * @return {Material} The material.
   */
  getOverrideMaterial() {
    return this.overrideMaterial;
  }
  /**
   * Sets the override material.
   *
   * @deprecated Use overrideMaterial instead.
   * @return {Material} value - The material.
   */
  setOverrideMaterial(t) {
    this.overrideMaterial = t;
  }
  /**
   * Indicates whether the target buffer should be cleared before rendering.
   *
   * @type {Boolean}
   * @deprecated Use clearPass.enabled instead.
   */
  get clear() {
    return this.clearPass.enabled;
  }
  set clear(t) {
    this.clearPass.enabled = t;
  }
  /**
   * Returns the selection. Default is `null` (no restriction).
   *
   * @deprecated Use selection instead.
   * @return {Selection} The selection.
   */
  getSelection() {
    return this.selection;
  }
  /**
   * Sets the selection. Set to `null` to disable.
   *
   * @deprecated Use selection instead.
   * @param {Selection} value - The selection.
   */
  setSelection(t) {
    this.selection = t;
  }
  /**
   * Indicates whether the scene background is disabled.
   *
   * @deprecated Use ignoreBackground instead.
   * @return {Boolean} Whether the scene background is disabled.
   */
  isBackgroundDisabled() {
    return this.ignoreBackground;
  }
  /**
   * Enables or disables the scene background.
   *
   * @deprecated Use ignoreBackground instead.
   * @param {Boolean} value - Whether the scene background should be disabled.
   */
  setBackgroundDisabled(t) {
    this.ignoreBackground = t;
  }
  /**
   * Indicates whether the shadow map auto update is disabled.
   *
   * @deprecated Use skipShadowMapUpdate instead.
   * @return {Boolean} Whether the shadow map update is disabled.
   */
  isShadowMapDisabled() {
    return this.skipShadowMapUpdate;
  }
  /**
   * Enables or disables the shadow map auto update.
   *
   * @deprecated Use skipShadowMapUpdate instead.
   * @param {Boolean} value - Whether the shadow map auto update should be disabled.
   */
  setShadowMapDisabled(t) {
    this.skipShadowMapUpdate = t;
  }
  /**
   * Returns the clear pass.
   *
   * @deprecated Use clearPass.enabled instead.
   * @return {ClearPass} The clear pass.
   */
  getClearPass() {
    return this.clearPass;
  }
  /**
   * Renders the scene.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {WebGLRenderTarget} outputBuffer - A frame buffer that serves as the output render target unless this pass renders to screen.
   * @param {Number} [deltaTime] - The time between the last frame and the current one in seconds.
   * @param {Boolean} [stencilTest] - Indicates whether a stencil mask is active.
   */
  render(t, e, r, n, i) {
    const o = this.scene, s = this.camera, a = this.selection, c = s.layers.mask, u = o.background, l = t.shadowMap.autoUpdate, f = this.renderToScreen ? null : e;
    a !== null && s.layers.set(a.getLayer()), this.skipShadowMapUpdate && (t.shadowMap.autoUpdate = !1), (this.ignoreBackground || this.clearPass.overrideClearColor !== null) && (o.background = null), this.clearPass.enabled && this.clearPass.render(t, e), t.setRenderTarget(f), this.overrideMaterialManager !== null ? this.overrideMaterialManager.render(t, o, s) : t.render(o, s), s.layers.mask = c, o.background = u, t.shadowMap.autoUpdate = l;
  }
}, Rt = {
  DEPTH: 0,
  LUMA: 1,
  COLOR: 2
}, Fs = {
  DISABLED: 0,
  DEPTH: 1,
  CUSTOM: 2
}, ye = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
  ULTRA: 3
}, Ns = `varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;
#if EDGE_DETECTION_MODE != 0
varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;
#endif
#if EDGE_DETECTION_MODE == 1
#include <common>
#endif
#if EDGE_DETECTION_MODE == 0 || PREDICATION_MODE == 1
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}vec3 gatherNeighbors(){float p=readDepth(vUv);float pLeft=readDepth(vUv0);float pTop=readDepth(vUv1);return vec3(p,pLeft,pTop);}
#elif PREDICATION_MODE == 2
uniform sampler2D predicationBuffer;vec3 gatherNeighbors(){float p=texture2D(predicationBuffer,vUv).r;float pLeft=texture2D(predicationBuffer,vUv0).r;float pTop=texture2D(predicationBuffer,vUv1).r;return vec3(p,pLeft,pTop);}
#endif
#if PREDICATION_MODE != 0
vec2 calculatePredicatedThreshold(){vec3 neighbours=gatherNeighbors();vec2 delta=abs(neighbours.xx-neighbours.yz);vec2 edges=step(PREDICATION_THRESHOLD,delta);return PREDICATION_SCALE*EDGE_THRESHOLD*(1.0-PREDICATION_STRENGTH*edges);}
#endif
#if EDGE_DETECTION_MODE != 0
uniform sampler2D inputBuffer;
#endif
void main(){
#if EDGE_DETECTION_MODE == 0
const vec2 threshold=vec2(DEPTH_THRESHOLD);
#elif PREDICATION_MODE != 0
vec2 threshold=calculatePredicatedThreshold();
#else
const vec2 threshold=vec2(EDGE_THRESHOLD);
#endif
#if EDGE_DETECTION_MODE == 0
vec3 neighbors=gatherNeighbors();vec2 delta=abs(neighbors.xx-vec2(neighbors.y,neighbors.z));vec2 edges=step(threshold,delta);if(dot(edges,vec2(1.0))==0.0){discard;}gl_FragColor=vec4(edges,0.0,1.0);
#elif EDGE_DETECTION_MODE == 1
float l=luminance(texture2D(inputBuffer,vUv).rgb);float lLeft=luminance(texture2D(inputBuffer,vUv0).rgb);float lTop=luminance(texture2D(inputBuffer,vUv1).rgb);vec4 delta;delta.xy=abs(l-vec2(lLeft,lTop));vec2 edges=step(threshold,delta.xy);if(dot(edges,vec2(1.0))==0.0){discard;}float lRight=luminance(texture2D(inputBuffer,vUv2).rgb);float lBottom=luminance(texture2D(inputBuffer,vUv3).rgb);delta.zw=abs(l-vec2(lRight,lBottom));vec2 maxDelta=max(delta.xy,delta.zw);float lLeftLeft=luminance(texture2D(inputBuffer,vUv4).rgb);float lTopTop=luminance(texture2D(inputBuffer,vUv5).rgb);delta.zw=abs(vec2(lLeft,lTop)-vec2(lLeftLeft,lTopTop));maxDelta=max(maxDelta.xy,delta.zw);float finalDelta=max(maxDelta.x,maxDelta.y);edges.xy*=step(finalDelta,LOCAL_CONTRAST_ADAPTATION_FACTOR*delta.xy);gl_FragColor=vec4(edges,0.0,1.0);
#elif EDGE_DETECTION_MODE == 2
vec4 delta;vec3 c=texture2D(inputBuffer,vUv).rgb;vec3 cLeft=texture2D(inputBuffer,vUv0).rgb;vec3 t=abs(c-cLeft);delta.x=max(max(t.r,t.g),t.b);vec3 cTop=texture2D(inputBuffer,vUv1).rgb;t=abs(c-cTop);delta.y=max(max(t.r,t.g),t.b);vec2 edges=step(threshold,delta.xy);if(dot(edges,vec2(1.0))==0.0){discard;}vec3 cRight=texture2D(inputBuffer,vUv2).rgb;t=abs(c-cRight);delta.z=max(max(t.r,t.g),t.b);vec3 cBottom=texture2D(inputBuffer,vUv3).rgb;t=abs(c-cBottom);delta.w=max(max(t.r,t.g),t.b);vec2 maxDelta=max(delta.xy,delta.zw);vec3 cLeftLeft=texture2D(inputBuffer,vUv4).rgb;t=abs(c-cLeftLeft);delta.z=max(max(t.r,t.g),t.b);vec3 cTopTop=texture2D(inputBuffer,vUv5).rgb;t=abs(c-cTopTop);delta.w=max(max(t.r,t.g),t.b);maxDelta=max(maxDelta.xy,delta.zw);float finalDelta=max(maxDelta.x,maxDelta.y);edges*=step(finalDelta,LOCAL_CONTRAST_ADAPTATION_FACTOR*delta.xy);gl_FragColor=vec4(edges,0.0,1.0);
#endif
}`, Hs = `uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;
#if EDGE_DETECTION_MODE != 0
varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;
#endif
void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,0.0);vUv1=vUv+texelSize*vec2(0.0,-1.0);
#if EDGE_DETECTION_MODE != 0
vUv2=vUv+texelSize*vec2(1.0,0.0);vUv3=vUv+texelSize*vec2(0.0,1.0);vUv4=vUv+texelSize*vec2(-2.0,0.0);vUv5=vUv+texelSize*vec2(0.0,-2.0);
#endif
gl_Position=vec4(position.xy,1.0,1.0);}`, Gs = class extends fe {
  /**
   * Constructs a new edge detection material.
   *
   * TODO Remove parameters.
   * @param {Vector2} [texelSize] - The screen texel size.
   * @param {EdgeDetectionMode} [mode=EdgeDetectionMode.COLOR] - The edge detection mode.
   */
  constructor(t = new F(), e = Rt.COLOR) {
    super({
      name: "EdgeDetectionMaterial",
      defines: {
        THREE_REVISION: Ue.replace(/\D+/g, ""),
        LOCAL_CONTRAST_ADAPTATION_FACTOR: "2.0",
        EDGE_THRESHOLD: "0.1",
        DEPTH_THRESHOLD: "0.01",
        PREDICATION_MODE: "0",
        PREDICATION_THRESHOLD: "0.01",
        PREDICATION_SCALE: "2.0",
        PREDICATION_STRENGTH: "1.0",
        DEPTH_PACKING: "0"
      },
      uniforms: {
        inputBuffer: new _(null),
        depthBuffer: new _(null),
        predicationBuffer: new _(null),
        texelSize: new _(t)
      },
      blending: ze,
      toneMapped: !1,
      depthWrite: !1,
      depthTest: !1,
      fragmentShader: Ns,
      vertexShader: Hs
    }), this.edgeDetectionMode = e;
  }
  /**
   * The depth buffer.
   *
   * @type {Texture}
   */
  set depthBuffer(t) {
    this.uniforms.depthBuffer.value = t;
  }
  /**
   * The depth packing strategy.
   *
   * @type {DepthPackingStrategies}
   */
  set depthPacking(t) {
    this.defines.DEPTH_PACKING = t.toFixed(0), this.needsUpdate = !0;
  }
  /**
   * Sets the depth buffer.
   *
   * @deprecated Use depthBuffer and depthPacking instead.
   * @param {Texture} buffer - The depth texture.
   * @param {DepthPackingStrategies} [depthPacking=BasicDepthPacking] - The depth packing strategy.
   */
  setDepthBuffer(t, e = xe) {
    this.depthBuffer = t, this.depthPacking = e;
  }
  /**
   * The edge detection mode.
   *
   * @type {EdgeDetectionMode}
   */
  get edgeDetectionMode() {
    return Number(this.defines.EDGE_DETECTION_MODE);
  }
  set edgeDetectionMode(t) {
    this.defines.EDGE_DETECTION_MODE = t.toFixed(0), this.needsUpdate = !0;
  }
  /**
   * Returns the edge detection mode.
   *
   * @deprecated Use edgeDetectionMode instead.
   * @return {EdgeDetectionMode} The mode.
   */
  getEdgeDetectionMode() {
    return this.edgeDetectionMode;
  }
  /**
   * Sets the edge detection mode.
   *
   * @deprecated Use edgeDetectionMode instead.
   * @param {EdgeDetectionMode} value - The edge detection mode.
   */
  setEdgeDetectionMode(t) {
    this.edgeDetectionMode = t;
  }
  /**
   * The local contrast adaptation factor. Has no effect if the edge detection mode is set to DEPTH. Default is 2.0.
   *
   * If a neighbor edge has _factor_ times bigger contrast than the current edge, the edge will be discarded.
   *
   * This allows to eliminate spurious crossing edges and is based on the fact that if there is too much contrast in a
   * direction, the perceptual contrast in the other neighbors will be hidden.
   *
   * @type {Number}
   */
  get localContrastAdaptationFactor() {
    return Number(this.defines.LOCAL_CONTRAST_ADAPTATION_FACTOR);
  }
  set localContrastAdaptationFactor(t) {
    this.defines.LOCAL_CONTRAST_ADAPTATION_FACTOR = t.toFixed("6"), this.needsUpdate = !0;
  }
  /**
   * Returns the local contrast adaptation factor.
   *
   * @deprecated Use localContrastAdaptationFactor instead.
   * @return {Number} The factor.
   */
  getLocalContrastAdaptationFactor() {
    return this.localContrastAdaptationFactor;
  }
  /**
   * Sets the local contrast adaptation factor. Has no effect if the edge detection mode is set to DEPTH.
   *
   * @deprecated Use localContrastAdaptationFactor instead.
   * @param {Number} value - The local contrast adaptation factor. Default is 2.0.
   */
  setLocalContrastAdaptationFactor(t) {
    this.localContrastAdaptationFactor = t;
  }
  /**
   * The edge detection threshold. Range: [0.0, 0.5].
   *
   * A lower value results in more edges being detected at the expense of performance.
   *
   * For luma- and chroma-based edge detection, 0.1 is a reasonable value and allows to catch most visible edges. 0.05
   * is a rather overkill value that allows to catch 'em all. Darker scenes may require an even lower threshold.
   *
   * If depth-based edge detection is used, the threshold will depend on the scene depth.
   *
   * @type {Number}
   */
  get edgeDetectionThreshold() {
    return Number(this.defines.EDGE_THRESHOLD);
  }
  set edgeDetectionThreshold(t) {
    this.defines.EDGE_THRESHOLD = t.toFixed("6"), this.defines.DEPTH_THRESHOLD = (t * 0.1).toFixed("6"), this.needsUpdate = !0;
  }
  /**
   * Returns the edge detection threshold.
   *
   * @deprecated Use edgeDetectionThreshold instead.
   * @return {Number} The threshold.
   */
  getEdgeDetectionThreshold() {
    return this.edgeDetectionThreshold;
  }
  /**
   * Sets the edge detection threshold.
   *
   * @deprecated Use edgeDetectionThreshold instead.
   * @param {Number} value - The edge detection threshold. Range: [0.0, 0.5].
   */
  setEdgeDetectionThreshold(t) {
    this.edgeDetectionThreshold = t;
  }
  /**
   * The predication mode.
   *
   * Predicated thresholding allows to better preserve texture details and to improve edge detection using an additional
   * buffer such as a light accumulation or depth buffer.
   *
   * @type {PredicationMode}
   */
  get predicationMode() {
    return Number(this.defines.PREDICATION_MODE);
  }
  set predicationMode(t) {
    this.defines.PREDICATION_MODE = t.toFixed(0), this.needsUpdate = !0;
  }
  /**
   * Returns the predication mode.
   *
   * @deprecated Use predicationMode instead.
   * @return {PredicationMode} The mode.
   */
  getPredicationMode() {
    return this.predicationMode;
  }
  /**
   * Sets the predication mode.
   *
   * @deprecated Use predicationMode instead.
   * @param {PredicationMode} value - The predication mode.
   */
  setPredicationMode(t) {
    this.predicationMode = t;
  }
  /**
   * The predication buffer.
   *
   * @type {Texture}
   */
  set predicationBuffer(t) {
    this.uniforms.predicationBuffer.value = t;
  }
  /**
   * Sets a custom predication buffer.
   *
   * @deprecated Use predicationBuffer instead.
   * @param {Texture} value - The predication buffer.
   */
  setPredicationBuffer(t) {
    this.uniforms.predicationBuffer.value = t;
  }
  /**
   * The predication threshold.
   *
   * @type {Number}
   */
  get predicationThreshold() {
    return Number(this.defines.PREDICATION_THRESHOLD);
  }
  set predicationThreshold(t) {
    this.defines.PREDICATION_THRESHOLD = t.toFixed("6"), this.needsUpdate = !0;
  }
  /**
   * Returns the predication threshold.
   *
   * @deprecated Use predicationThreshold instead.
   * @return {Number} The threshold.
   */
  getPredicationThreshold() {
    return this.predicationThreshold;
  }
  /**
   * Sets the predication threshold.
   *
   * @deprecated Use predicationThreshold instead.
   * @param {Number} value - The threshold.
   */
  setPredicationThreshold(t) {
    this.predicationThreshold = t;
  }
  /**
   * The predication scale. Range: [1.0, 5.0].
   *
   * Determines how much the edge detection threshold should be scaled when using predication.
   *
   * @type {Boolean|Texture|Number}
   */
  get predicationScale() {
    return Number(this.defines.PREDICATION_SCALE);
  }
  set predicationScale(t) {
    this.defines.PREDICATION_SCALE = t.toFixed("6"), this.needsUpdate = !0;
  }
  /**
   * Returns the predication scale.
   *
   * @deprecated Use predicationScale instead.
   * @return {Number} The scale.
   */
  getPredicationScale() {
    return this.predicationScale;
  }
  /**
   * Sets the predication scale.
   *
   * @deprecated Use predicationScale instead.
   * @param {Number} value - The scale. Range: [1.0, 5.0].
   */
  setPredicationScale(t) {
    this.predicationScale = t;
  }
  /**
   * The predication strength. Range: [0.0, 1.0].
   *
   * Determines how much the edge detection threshold should be decreased locally when using predication.
   *
   * @type {Number}
   */
  get predicationStrength() {
    return Number(this.defines.PREDICATION_STRENGTH);
  }
  set predicationStrength(t) {
    this.defines.PREDICATION_STRENGTH = t.toFixed("6"), this.needsUpdate = !0;
  }
  /**
   * Returns the predication strength.
   *
   * @deprecated Use predicationStrength instead.
   * @return {Number} The strength.
   */
  getPredicationStrength() {
    return this.predicationStrength;
  }
  /**
   * Sets the predication strength.
   *
   * @deprecated Use predicationStrength instead.
   * @param {Number} value - The strength. Range: [0.0, 1.0].
   */
  setPredicationStrength(t) {
    this.predicationStrength = t;
  }
  /**
   * Sets the size of this object.
   *
   * @param {Number} width - The width.
   * @param {Number} height - The height.
   */
  setSize(t, e) {
    this.uniforms.texelSize.value.set(1 / t, 1 / e);
  }
}, Us = `#define sampleLevelZeroOffset(t, coord, offset) texture2D(t, coord + offset * texelSize)
#if __VERSION__ < 300
#define round(v) floor(v + 0.5)
#endif
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform lowp sampler2D areaTexture;uniform lowp sampler2D searchTexture;uniform vec2 texelSize;uniform vec2 resolution;varying vec2 vUv;varying vec4 vOffset[3];varying vec2 vPixCoord;void movec(const in bvec2 c,inout vec2 variable,const in vec2 value){if(c.x){variable.x=value.x;}if(c.y){variable.y=value.y;}}void movec(const in bvec4 c,inout vec4 variable,const in vec4 value){movec(c.xy,variable.xy,value.xy);movec(c.zw,variable.zw,value.zw);}vec2 decodeDiagBilinearAccess(in vec2 e){e.r=e.r*abs(5.0*e.r-5.0*0.75);return round(e);}vec4 decodeDiagBilinearAccess(in vec4 e){e.rb=e.rb*abs(5.0*e.rb-5.0*0.75);return round(e);}vec2 searchDiag1(const in vec2 texCoord,const in vec2 dir,out vec2 e){vec4 coord=vec4(texCoord,-1.0,1.0);vec3 t=vec3(texelSize,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(coord.z<float(MAX_SEARCH_STEPS_DIAG_INT-1)&&coord.w>0.9)){break;}coord.xyz=t*vec3(dir,1.0)+coord.xyz;e=texture2D(inputBuffer,coord.xy).rg;coord.w=dot(e,vec2(0.5));}return coord.zw;}vec2 searchDiag2(const in vec2 texCoord,const in vec2 dir,out vec2 e){vec4 coord=vec4(texCoord,-1.0,1.0);coord.x+=0.25*texelSize.x;vec3 t=vec3(texelSize,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(coord.z<float(MAX_SEARCH_STEPS_DIAG_INT-1)&&coord.w>0.9)){break;}coord.xyz=t*vec3(dir,1.0)+coord.xyz;e=texture2D(inputBuffer,coord.xy).rg;e=decodeDiagBilinearAccess(e);coord.w=dot(e,vec2(0.5));}return coord.zw;}vec2 areaDiag(const in vec2 dist,const in vec2 e,const in float offset){vec2 texCoord=vec2(AREATEX_MAX_DISTANCE_DIAG,AREATEX_MAX_DISTANCE_DIAG)*e+dist;texCoord=AREATEX_PIXEL_SIZE*texCoord+0.5*AREATEX_PIXEL_SIZE;texCoord.x+=0.5;texCoord.y+=AREATEX_SUBTEX_SIZE*offset;return texture2D(areaTexture,texCoord).rg;}vec2 calculateDiagWeights(const in vec2 texCoord,const in vec2 e,const in vec4 subsampleIndices){vec2 weights=vec2(0.0);vec4 d;vec2 end;if(e.r>0.0){d.xz=searchDiag1(texCoord,vec2(-1.0,1.0),end);d.x+=float(end.y>0.9);}else{d.xz=vec2(0.0);}d.yw=searchDiag1(texCoord,vec2(1.0,-1.0),end);if(d.x+d.y>2.0){vec4 coords=vec4(-d.x+0.25,d.x,d.y,-d.y-0.25)*texelSize.xyxy+texCoord.xyxy;vec4 c;c.xy=sampleLevelZeroOffset(inputBuffer,coords.xy,vec2(-1,0)).rg;c.zw=sampleLevelZeroOffset(inputBuffer,coords.zw,vec2(1,0)).rg;c.yxwz=decodeDiagBilinearAccess(c.xyzw);vec2 cc=vec2(2.0)*c.xz+c.yw;movec(bvec2(step(0.9,d.zw)),cc,vec2(0.0));weights+=areaDiag(d.xy,cc,subsampleIndices.z);}d.xz=searchDiag2(texCoord,vec2(-1.0,-1.0),end);if(sampleLevelZeroOffset(inputBuffer,texCoord,vec2(1,0)).r>0.0){d.yw=searchDiag2(texCoord,vec2(1.0),end);d.y+=float(end.y>0.9);}else{d.yw=vec2(0.0);}if(d.x+d.y>2.0){vec4 coords=vec4(-d.x,-d.x,d.y,d.y)*texelSize.xyxy+texCoord.xyxy;vec4 c;c.x=sampleLevelZeroOffset(inputBuffer,coords.xy,vec2(-1,0)).g;c.y=sampleLevelZeroOffset(inputBuffer,coords.xy,vec2(0,-1)).r;c.zw=sampleLevelZeroOffset(inputBuffer,coords.zw,vec2(1,0)).gr;vec2 cc=vec2(2.0)*c.xz+c.yw;movec(bvec2(step(0.9,d.zw)),cc,vec2(0.0));weights+=areaDiag(d.xy,cc,subsampleIndices.w).gr;}return weights;}float searchLength(const in vec2 e,const in float offset){vec2 scale=SEARCHTEX_SIZE*vec2(0.5,-1.0);vec2 bias=SEARCHTEX_SIZE*vec2(offset,1.0);scale+=vec2(-1.0,1.0);bias+=vec2(0.5,-0.5);scale*=1.0/SEARCHTEX_PACKED_SIZE;bias*=1.0/SEARCHTEX_PACKED_SIZE;return texture2D(searchTexture,scale*e+bias).r;}float searchXLeft(in vec2 texCoord,const in float end){vec2 e=vec2(0.0,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(texCoord.x>end&&e.g>0.8281&&e.r==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=vec2(-2.0,0.0)*texelSize+texCoord;}float offset=-(255.0/127.0)*searchLength(e,0.0)+3.25;return texelSize.x*offset+texCoord.x;}float searchXRight(vec2 texCoord,const in float end){vec2 e=vec2(0.0,1.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(texCoord.x<end&&e.g>0.8281&&e.r==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=vec2(2.0,0.0)*texelSize.xy+texCoord;}float offset=-(255.0/127.0)*searchLength(e,0.5)+3.25;return-texelSize.x*offset+texCoord.x;}float searchYUp(vec2 texCoord,const in float end){vec2 e=vec2(1.0,0.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;++i){if(!(texCoord.y>end&&e.r>0.8281&&e.g==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=-vec2(0.0,2.0)*texelSize.xy+texCoord;}float offset=-(255.0/127.0)*searchLength(e.gr,0.0)+3.25;return texelSize.y*offset+texCoord.y;}float searchYDown(vec2 texCoord,const in float end){vec2 e=vec2(1.0,0.0);for(int i=0;i<MAX_SEARCH_STEPS_INT;i++){if(!(texCoord.y<end&&e.r>0.8281&&e.g==0.0)){break;}e=texture2D(inputBuffer,texCoord).rg;texCoord=vec2(0.0,2.0)*texelSize.xy+texCoord;}float offset=-(255.0/127.0)*searchLength(e.gr,0.5)+3.25;return-texelSize.y*offset+texCoord.y;}vec2 area(const in vec2 dist,const in float e1,const in float e2,const in float offset){vec2 texCoord=vec2(AREATEX_MAX_DISTANCE)*round(4.0*vec2(e1,e2))+dist;texCoord=AREATEX_PIXEL_SIZE*texCoord+0.5*AREATEX_PIXEL_SIZE;texCoord.y=AREATEX_SUBTEX_SIZE*offset+texCoord.y;return texture2D(areaTexture,texCoord).rg;}void detectHorizontalCornerPattern(inout vec2 weights,const in vec4 texCoord,const in vec2 d){
#if !defined(DISABLE_CORNER_DETECTION)
vec2 leftRight=step(d.xy,d.yx);vec2 rounding=(1.0-CORNER_ROUNDING_NORM)*leftRight;rounding/=leftRight.x+leftRight.y;vec2 factor=vec2(1.0);factor.x-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(0,1)).r;factor.x-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(1,1)).r;factor.y-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(0,-2)).r;factor.y-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(1,-2)).r;weights*=clamp(factor,0.0,1.0);
#endif
}void detectVerticalCornerPattern(inout vec2 weights,const in vec4 texCoord,const in vec2 d){
#if !defined(DISABLE_CORNER_DETECTION)
vec2 leftRight=step(d.xy,d.yx);vec2 rounding=(1.0-CORNER_ROUNDING_NORM)*leftRight;rounding/=leftRight.x+leftRight.y;vec2 factor=vec2(1.0);factor.x-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(1,0)).g;factor.x-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(1,1)).g;factor.y-=rounding.x*sampleLevelZeroOffset(inputBuffer,texCoord.xy,vec2(-2,0)).g;factor.y-=rounding.y*sampleLevelZeroOffset(inputBuffer,texCoord.zw,vec2(-2,1)).g;weights*=clamp(factor,0.0,1.0);
#endif
}void main(){vec4 weights=vec4(0.0);vec4 subsampleIndices=vec4(0.0);vec2 e=texture2D(inputBuffer,vUv).rg;if(e.g>0.0){
#if !defined(DISABLE_DIAG_DETECTION)
weights.rg=calculateDiagWeights(vUv,e,subsampleIndices);if(weights.r==-weights.g){
#endif
vec2 d;vec3 coords;coords.x=searchXLeft(vOffset[0].xy,vOffset[2].x);coords.y=vOffset[1].y;d.x=coords.x;float e1=texture2D(inputBuffer,coords.xy).r;coords.z=searchXRight(vOffset[0].zw,vOffset[2].y);d.y=coords.z;d=round(resolution.xx*d+-vPixCoord.xx);vec2 sqrtD=sqrt(abs(d));float e2=sampleLevelZeroOffset(inputBuffer,coords.zy,vec2(1,0)).r;weights.rg=area(sqrtD,e1,e2,subsampleIndices.y);coords.y=vUv.y;detectHorizontalCornerPattern(weights.rg,coords.xyzy,d);
#if !defined(DISABLE_DIAG_DETECTION)
}else{e.r=0.0;}
#endif
}if(e.r>0.0){vec2 d;vec3 coords;coords.y=searchYUp(vOffset[1].xy,vOffset[2].z);coords.x=vOffset[0].x;d.x=coords.y;float e1=texture2D(inputBuffer,coords.xy).g;coords.z=searchYDown(vOffset[1].zw,vOffset[2].w);d.y=coords.z;d=round(resolution.yy*d-vPixCoord.yy);vec2 sqrtD=sqrt(abs(d));float e2=sampleLevelZeroOffset(inputBuffer,coords.xz,vec2(0,1)).g;weights.ba=area(sqrtD,e1,e2,subsampleIndices.x);coords.x=vUv.x;detectVerticalCornerPattern(weights.ba,coords.xyxz,d);}gl_FragColor=weights;}`, zs = "uniform vec2 texelSize;uniform vec2 resolution;varying vec2 vUv;varying vec4 vOffset[3];varying vec2 vPixCoord;void main(){vUv=position.xy*0.5+0.5;vPixCoord=vUv*resolution;vOffset[0]=vUv.xyxy+texelSize.xyxy*vec4(-0.25,-0.125,1.25,-0.125);vOffset[1]=vUv.xyxy+texelSize.xyxy*vec4(-0.125,-0.25,-0.125,1.25);vOffset[2]=vec4(vOffset[0].xz,vOffset[1].yw)+vec4(-2.0,2.0,-2.0,2.0)*texelSize.xxyy*MAX_SEARCH_STEPS_FLOAT;gl_Position=vec4(position.xy,1.0,1.0);}", Qs = class extends fe {
  /**
   * Constructs a new SMAA weights material.
   *
   * @param {Vector2} [texelSize] - The absolute screen texel size.
   * @param {Vector2} [resolution] - The resolution.
   */
  constructor(t = new F(), e = new F()) {
    super({
      name: "SMAAWeightsMaterial",
      defines: {
        // Configurable settings:
        MAX_SEARCH_STEPS_INT: "16",
        MAX_SEARCH_STEPS_FLOAT: "16.0",
        MAX_SEARCH_STEPS_DIAG_INT: "8",
        MAX_SEARCH_STEPS_DIAG_FLOAT: "8.0",
        CORNER_ROUNDING: "25",
        CORNER_ROUNDING_NORM: "0.25",
        // Non-configurable settings:
        AREATEX_MAX_DISTANCE: "16.0",
        AREATEX_MAX_DISTANCE_DIAG: "20.0",
        AREATEX_PIXEL_SIZE: "(1.0 / vec2(160.0, 560.0))",
        AREATEX_SUBTEX_SIZE: "(1.0 / 7.0)",
        SEARCHTEX_SIZE: "vec2(66.0, 33.0)",
        SEARCHTEX_PACKED_SIZE: "vec2(64.0, 16.0)"
      },
      uniforms: {
        inputBuffer: new _(null),
        searchTexture: new _(null),
        areaTexture: new _(null),
        resolution: new _(e),
        texelSize: new _(t)
      },
      blending: ze,
      toneMapped: !1,
      depthWrite: !1,
      depthTest: !1,
      fragmentShader: Us,
      vertexShader: zs
    });
  }
  /**
   * The input buffer.
   *
   * @type {Texture}
   */
  set inputBuffer(t) {
    this.uniforms.inputBuffer.value = t;
  }
  /**
   * Sets the input buffer.
   *
   * @deprecated Use inputBuffer instead.
   * @param {Texture} value - The input buffer.
   */
  setInputBuffer(t) {
    this.uniforms.inputBuffer.value = t;
  }
  /**
   * The search lookup texture.
   *
   * @type {Texture}
   */
  get searchTexture() {
    return this.uniforms.searchTexture.value;
  }
  set searchTexture(t) {
    this.uniforms.searchTexture.value = t;
  }
  /**
   * The area lookup texture.
   *
   * @type {Texture}
   */
  get areaTexture() {
    return this.uniforms.areaTexture.value;
  }
  set areaTexture(t) {
    this.uniforms.areaTexture.value = t;
  }
  /**
   * Sets the search and area lookup textures.
   *
   * @deprecated Use searchTexture and areaTexture instead.
   * @param {Texture} search - The search lookup texture.
   * @param {Texture} area - The area lookup texture.
   */
  setLookupTextures(t, e) {
    this.searchTexture = t, this.areaTexture = e;
  }
  /**
   * The maximum amount of steps performed in the horizontal/vertical pattern searches, at each side of the pixel.
   * Range: [0, 112].
   *
   * In number of pixels, it's actually the double. So the maximum line length perfectly handled by, for example 16, is
   * 64 (perfectly means that longer lines won't look as good, but are still antialiased).
   *
   * @type {Number}
   */
  get orthogonalSearchSteps() {
    return Number(this.defines.MAX_SEARCH_STEPS_INT);
  }
  set orthogonalSearchSteps(t) {
    const e = Math.min(Math.max(t, 0), 112);
    this.defines.MAX_SEARCH_STEPS_INT = e.toFixed("0"), this.defines.MAX_SEARCH_STEPS_FLOAT = e.toFixed("1"), this.needsUpdate = !0;
  }
  /**
   * Sets the maximum amount of steps performed in the horizontal/vertical pattern searches, at each side of the pixel.
   *
   * @deprecated Use orthogonalSearchSteps instead.
   * @param {Number} value - The search steps. Range: [0, 112].
   */
  setOrthogonalSearchSteps(t) {
    this.orthogonalSearchSteps = t;
  }
  /**
   * The maximum steps performed in the diagonal pattern searches, at each side of the pixel. This search
   * jumps one pixel at a time. Range: [0, 20].
   *
   * On high-end machines this search is cheap (between 0.8x and 0.9x slower for 16 steps), but it can have a
   * significant impact on older machines.
   *
   * @type {Number}
   */
  get diagonalSearchSteps() {
    return Number(this.defines.MAX_SEARCH_STEPS_DIAG_INT);
  }
  set diagonalSearchSteps(t) {
    const e = Math.min(Math.max(t, 0), 20);
    this.defines.MAX_SEARCH_STEPS_DIAG_INT = e.toFixed("0"), this.defines.MAX_SEARCH_STEPS_DIAG_FLOAT = e.toFixed("1"), this.needsUpdate = !0;
  }
  /**
   * Specifies the maximum steps performed in the diagonal pattern searches, at each side of the pixel.
   *
   * @deprecated Use diagonalSearchSteps instead.
   * @param {Number} value - The search steps. Range: [0, 20].
   */
  setDiagonalSearchSteps(t) {
    this.diagonalSearchSteps = t;
  }
  /**
   * Indicates whether diagonal pattern detection is enabled.
   *
   * @type {Boolean}
   */
  get diagonalDetection() {
    return this.defines.DISABLE_DIAG_DETECTION === void 0;
  }
  set diagonalDetection(t) {
    t ? delete this.defines.DISABLE_DIAG_DETECTION : this.defines.DISABLE_DIAG_DETECTION = "1", this.needsUpdate = !0;
  }
  /**
   * Indicates whether diagonal pattern detection is enabled.
   *
   * @deprecated Use diagonalDetection instead.
   * @return {Boolean} Whether diagonal pattern detection is enabled.
   */
  isDiagonalDetectionEnabled() {
    return this.diagonalDetection;
  }
  /**
   * Enables or disables diagonal pattern detection.
   *
   * @deprecated Use diagonalDetection instead.
   * @param {Boolean} value - Whether diagonal pattern detection should be enabled.
   */
  setDiagonalDetectionEnabled(t) {
    this.diagonalDetection = t;
  }
  /**
   * Specifies how much sharp corners will be rounded. Range: [0, 100].
   *
   * @type {Number}
   */
  get cornerRounding() {
    return Number(this.defines.CORNER_ROUNDING);
  }
  set cornerRounding(t) {
    const e = Math.min(Math.max(t, 0), 100);
    this.defines.CORNER_ROUNDING = e.toFixed("4"), this.defines.CORNER_ROUNDING_NORM = (e / 100).toFixed("4"), this.needsUpdate = !0;
  }
  /**
   * Specifies how much sharp corners will be rounded.
   *
   * @deprecated Use cornerRounding instead.
   * @param {Number} value - The corner rounding amount. Range: [0, 100].
   */
  setCornerRounding(t) {
    this.cornerRounding = t;
  }
  /**
   * Indicates whether corner detection is enabled.
   *
   * @type {Number}
   */
  get cornerDetection() {
    return this.defines.DISABLE_CORNER_DETECTION === void 0;
  }
  set cornerDetection(t) {
    t ? delete this.defines.DISABLE_CORNER_DETECTION : this.defines.DISABLE_CORNER_DETECTION = "1", this.needsUpdate = !0;
  }
  /**
   * Indicates whether corner rounding is enabled.
   *
   * @deprecated Use cornerDetection instead.
   * @return {Boolean} Whether corner rounding is enabled.
   */
  isCornerRoundingEnabled() {
    return this.cornerDetection;
  }
  /**
   * Enables or disables corner rounding.
   *
   * @deprecated Use cornerDetection instead.
   * @param {Boolean} value - Whether corner rounding should be enabled.
   */
  setCornerRoundingEnabled(t) {
    this.cornerDetection = t;
  }
  /**
   * Sets the size of this object.
   *
   * @param {Number} width - The width.
   * @param {Number} height - The height.
   */
  setSize(t, e) {
    const r = this.uniforms;
    r.texelSize.value.set(1 / t, 1 / e), r.resolution.value.set(t, e);
  }
}, er = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAACm53kpAAAAeElEQVRYR+2XSwqAMAxEJ168ePEqwRSKhIIiuHjJqiU0gWE+1CQdApcVAMUAuARaMGCX1MIL/Ow13++9lW2s3mW9MWvsnWc/2fvGygwPAN4E8QzAA4CXAB6AHjG4JTHYI1ey3pcx6FHnEfhLDOIBKAmUBK6/ANUDTlROXAHd9EC1AAAAAElFTkSuQmCC", tr = "data:image/png;base64,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", Ws = "uniform sampler2D weightMap;varying vec2 vOffset0;varying vec2 vOffset1;void movec(const in bvec2 c,inout vec2 variable,const in vec2 value){if(c.x){variable.x=value.x;}if(c.y){variable.y=value.y;}}void movec(const in bvec4 c,inout vec4 variable,const in vec4 value){movec(c.xy,variable.xy,value.xy);movec(c.zw,variable.zw,value.zw);}void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 a;a.x=texture2D(weightMap,vOffset0).a;a.y=texture2D(weightMap,vOffset1).g;a.wz=texture2D(weightMap,uv).rb;vec4 color=inputColor;if(dot(a,vec4(1.0))>=1e-5){bool h=max(a.x,a.z)>max(a.y,a.w);vec4 blendingOffset=vec4(0.0,a.y,0.0,a.w);vec2 blendingWeight=a.yw;movec(bvec4(h),blendingOffset,vec4(a.x,0.0,a.z,0.0));movec(bvec2(h),blendingWeight,a.xz);blendingWeight/=dot(blendingWeight,vec2(1.0));vec4 blendingCoord=blendingOffset*vec4(texelSize,-texelSize)+uv.xyxy;color=blendingWeight.x*texture2D(inputBuffer,blendingCoord.xy);color+=blendingWeight.y*texture2D(inputBuffer,blendingCoord.zw);}outputColor=color;}", Ys = "varying vec2 vOffset0;varying vec2 vOffset1;void mainSupport(const in vec2 uv){vOffset0=uv+texelSize*vec2(1.0,0.0);vOffset1=uv+texelSize*vec2(0.0,1.0);}", Vs = class extends Yr {
  /**
   * Constructs a new SMAA effect.
   *
   * @param {Object} [options] - The options.
   * @param {BlendFunction} [options.blendFunction=BlendFunction.SRC] - The blend function of this effect.
   * @param {SMAAPreset} [options.preset=SMAAPreset.MEDIUM] - The quality preset.
   * @param {EdgeDetectionMode} [options.edgeDetectionMode=EdgeDetectionMode.COLOR] - The edge detection mode.
   * @param {PredicationMode} [options.predicationMode=PredicationMode.DISABLED] - The predication mode.
   */
  constructor({
    blendFunction: t = B.SRC,
    preset: e = ye.MEDIUM,
    edgeDetectionMode: r = Rt.COLOR,
    predicationMode: n = Fs.DISABLED
  } = {}) {
    super("SMAAEffect", Ws, {
      vertexShader: Ys,
      blendFunction: t,
      attributes: V.CONVOLUTION | V.DEPTH,
      uniforms: /* @__PURE__ */ new Map([
        ["weightMap", new _(null)]
      ])
    });
    let i, o;
    arguments.length > 1 && (i = arguments[0], o = arguments[1], arguments.length > 2 && (e = arguments[2]), arguments.length > 3 && (r = arguments[3])), this.renderTargetEdges = new te(1, 1, { depthBuffer: !1 }), this.renderTargetEdges.texture.name = "SMAA.Edges", this.renderTargetWeights = this.renderTargetEdges.clone(), this.renderTargetWeights.texture.name = "SMAA.Weights", this.uniforms.get("weightMap").value = this.renderTargetWeights.texture, this.clearPass = new St(!0, !1, !1), this.clearPass.overrideClearColor = new N(0), this.clearPass.overrideClearAlpha = 1, this.edgeDetectionPass = new $t(new Gs()), this.edgeDetectionMaterial.edgeDetectionMode = r, this.edgeDetectionMaterial.predicationMode = n, this.weightsPass = new $t(new Qs());
    const s = new Dn();
    s.onLoad = () => {
      const a = new ce(i);
      a.name = "SMAA.Search", a.magFilter = Re, a.minFilter = Re, a.generateMipmaps = !1, a.needsUpdate = !0, a.flipY = !0, this.weightsMaterial.searchTexture = a;
      const c = new ce(o);
      c.name = "SMAA.Area", c.magFilter = Q, c.minFilter = Q, c.generateMipmaps = !1, c.needsUpdate = !0, c.flipY = !1, this.weightsMaterial.areaTexture = c, this.dispatchEvent({ type: "load" });
    }, s.itemStart("search"), s.itemStart("area"), i !== void 0 && o !== void 0 ? (s.itemEnd("search"), s.itemEnd("area")) : typeof Image < "u" && (i = new Image(), o = new Image(), i.addEventListener("load", () => s.itemEnd("search")), o.addEventListener("load", () => s.itemEnd("area")), i.src = er, o.src = tr), this.applyPreset(e);
  }
  /**
   * The edges texture.
   *
   * @type {Texture}
   */
  get edgesTexture() {
    return this.renderTargetEdges.texture;
  }
  /**
   * Returns the edges texture.
   *
   * @deprecated Use edgesTexture instead.
   * @return {Texture} The texture.
   */
  getEdgesTexture() {
    return this.edgesTexture;
  }
  /**
   * The edge weights texture.
   *
   * @type {Texture}
   */
  get weightsTexture() {
    return this.renderTargetWeights.texture;
  }
  /**
   * Returns the edge weights texture.
   *
   * @deprecated Use weightsTexture instead.
   * @return {Texture} The texture.
   */
  getWeightsTexture() {
    return this.weightsTexture;
  }
  /**
   * The edge detection material.
   *
   * @type {EdgeDetectionMaterial}
   */
  get edgeDetectionMaterial() {
    return this.edgeDetectionPass.fullscreenMaterial;
  }
  /**
   * The edge detection material.
   *
   * @type {EdgeDetectionMaterial}
   * @deprecated Use edgeDetectionMaterial instead.
   */
  get colorEdgesMaterial() {
    return this.edgeDetectionMaterial;
  }
  /**
   * Returns the edge detection material.
   *
   * @deprecated Use edgeDetectionMaterial instead.
   * @return {EdgeDetectionMaterial} The material.
   */
  getEdgeDetectionMaterial() {
    return this.edgeDetectionMaterial;
  }
  /**
   * The edge weights material.
   *
   * @type {SMAAWeightsMaterial}
   */
  get weightsMaterial() {
    return this.weightsPass.fullscreenMaterial;
  }
  /**
   * Returns the edge weights material.
   *
   * @deprecated Use weightsMaterial instead.
   * @return {SMAAWeightsMaterial} The material.
   */
  getWeightsMaterial() {
    return this.weightsMaterial;
  }
  /**
   * Sets the edge detection sensitivity.
   *
   * See {@link EdgeDetectionMaterial#setEdgeDetectionThreshold} for more details.
   *
   * @deprecated Use edgeDetectionMaterial instead.
   * @param {Number} threshold - The edge detection sensitivity. Range: [0.05, 0.5].
   */
  setEdgeDetectionThreshold(t) {
    this.edgeDetectionMaterial.edgeDetectionThreshold = t;
  }
  /**
   * Sets the maximum amount of horizontal/vertical search steps.
   *
   * See {@link SMAAWeightsMaterial#setOrthogonalSearchSteps} for more details.
   *
   * @deprecated Use weightsMaterial instead.
   * @param {Number} steps - The search steps. Range: [0, 112].
   */
  setOrthogonalSearchSteps(t) {
    this.weightsMaterial.orthogonalSearchSteps = t;
  }
  /**
   * Applies the given quality preset.
   *
   * @param {SMAAPreset} preset - The preset.
   */
  applyPreset(t) {
    const e = this.edgeDetectionMaterial, r = this.weightsMaterial;
    switch (t) {
      case ye.LOW:
        e.edgeDetectionThreshold = 0.15, r.orthogonalSearchSteps = 4, r.diagonalDetection = !1, r.cornerDetection = !1;
        break;
      case ye.MEDIUM:
        e.edgeDetectionThreshold = 0.1, r.orthogonalSearchSteps = 8, r.diagonalDetection = !1, r.cornerDetection = !1;
        break;
      case ye.HIGH:
        e.edgeDetectionThreshold = 0.1, r.orthogonalSearchSteps = 16, r.diagonalSearchSteps = 8, r.cornerRounding = 25, r.diagonalDetection = !0, r.cornerDetection = !0;
        break;
      case ye.ULTRA:
        e.edgeDetectionThreshold = 0.05, r.orthogonalSearchSteps = 32, r.diagonalSearchSteps = 16, r.cornerRounding = 25, r.diagonalDetection = !0, r.cornerDetection = !0;
        break;
    }
  }
  /**
   * Sets the depth texture.
   *
   * @param {Texture} depthTexture - A depth texture.
   * @param {DepthPackingStrategies} [depthPacking=BasicDepthPacking] - The depth packing.
   */
  setDepthTexture(t, e = xe) {
    this.edgeDetectionMaterial.depthBuffer = t, this.edgeDetectionMaterial.depthPacking = e;
  }
  /**
   * Updates this effect.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {Number} [deltaTime] - The time between the last frame and the current one in seconds.
   */
  update(t, e, r) {
    this.clearPass.render(t, this.renderTargetEdges), this.edgeDetectionPass.render(t, e, this.renderTargetEdges), this.weightsPass.render(t, this.renderTargetEdges, this.renderTargetWeights);
  }
  /**
   * Updates the size of internal render targets.
   *
   * @param {Number} width - The width.
   * @param {Number} height - The height.
   */
  setSize(t, e) {
    this.edgeDetectionMaterial.setSize(t, e), this.weightsMaterial.setSize(t, e), this.renderTargetEdges.setSize(t, e), this.renderTargetWeights.setSize(t, e);
  }
  /**
   * Deletes internal render targets and textures.
   */
  dispose() {
    const { searchTexture: t, areaTexture: e } = this.weightsMaterial;
    t !== null && e !== null && (t.dispose(), e.dispose()), super.dispose();
  }
  /**
   * The SMAA search image, encoded as a base64 data URL.
   *
   * @type {String}
   * @deprecated
   */
  static get searchImageDataURL() {
    return er;
  }
  /**
   * The SMAA area image, encoded as a base64 data URL.
   *
   * @type {String}
   * @deprecated
   */
  static get areaImageDataURL() {
    return tr;
  }
}, Xs = `#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`, js = "uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}", Ks = class extends fe {
  /**
   * Constructs a new effect material.
   *
   * @param {Map<String, String>} [shaderParts] - Deprecated. Use setShaderData instead.
   * @param {Map<String, String>} [defines] - Deprecated. Use setShaderData instead.
   * @param {Map<String, Uniform>} [uniforms] - Deprecated. Use setShaderData instead.
   * @param {Camera} [camera] - A camera.
   * @param {Boolean} [dithering=false] - Deprecated.
   */
  constructor(t, e, r, n, i = !1) {
    super({
      name: "EffectMaterial",
      defines: {
        THREE_REVISION: Ue.replace(/\D+/g, ""),
        DEPTH_PACKING: "0",
        ENCODE_OUTPUT: "1"
      },
      uniforms: {
        inputBuffer: new _(null),
        depthBuffer: new _(null),
        resolution: new _(new F()),
        texelSize: new _(new F()),
        cameraNear: new _(0.3),
        cameraFar: new _(1e3),
        aspect: new _(1),
        time: new _(0)
      },
      blending: ze,
      toneMapped: !1,
      depthWrite: !1,
      depthTest: !1,
      dithering: i
    }), t && this.setShaderParts(t), e && this.setDefines(e), r && this.setUniforms(r), this.copyCameraSettings(n);
  }
  /**
   * The input buffer.
   *
   * @type {Texture}
   */
  set inputBuffer(t) {
    this.uniforms.inputBuffer.value = t;
  }
  /**
   * Sets the input buffer.
   *
   * @deprecated Use inputBuffer instead.
   * @param {Texture} value - The input buffer.
   */
  setInputBuffer(t) {
    this.uniforms.inputBuffer.value = t;
  }
  /**
   * The depth buffer.
   *
   * @type {Texture}
   */
  get depthBuffer() {
    return this.uniforms.depthBuffer.value;
  }
  set depthBuffer(t) {
    this.uniforms.depthBuffer.value = t;
  }
  /**
   * The depth packing strategy.
   *
   * @type {DepthPackingStrategies}
   */
  get depthPacking() {
    return Number(this.defines.DEPTH_PACKING);
  }
  set depthPacking(t) {
    this.defines.DEPTH_PACKING = t.toFixed(0), this.needsUpdate = !0;
  }
  /**
   * Sets the depth buffer.
   *
   * @deprecated Use depthBuffer and depthPacking instead.
   * @param {Texture} buffer - The depth texture.
   * @param {DepthPackingStrategies} [depthPacking=BasicDepthPacking] - The depth packing strategy.
   */
  setDepthBuffer(t, e = xe) {
    this.depthBuffer = t, this.depthPacking = e;
  }
  /**
   * Sets the shader data.
   *
   * @param {EffectShaderData} data - The shader data.
   * @return {EffectMaterial} This material.
   */
  setShaderData(t) {
    this.setShaderParts(t.shaderParts), this.setDefines(t.defines), this.setUniforms(t.uniforms), this.setExtensions(t.extensions);
  }
  /**
   * Sets the shader parts.
   *
   * @deprecated Use setShaderData instead.
   * @param {Map<String, String>} shaderParts - A collection of shader snippets. See {@link EffectShaderSection}.
   * @return {EffectMaterial} This material.
   */
  setShaderParts(t) {
    return this.fragmentShader = Xs.replace(R.FRAGMENT_HEAD, t.get(R.FRAGMENT_HEAD) || "").replace(R.FRAGMENT_MAIN_UV, t.get(R.FRAGMENT_MAIN_UV) || "").replace(R.FRAGMENT_MAIN_IMAGE, t.get(R.FRAGMENT_MAIN_IMAGE) || ""), this.vertexShader = js.replace(R.VERTEX_HEAD, t.get(R.VERTEX_HEAD) || "").replace(R.VERTEX_MAIN_SUPPORT, t.get(R.VERTEX_MAIN_SUPPORT) || ""), this.needsUpdate = !0, this;
  }
  /**
   * Sets the shader macros.
   *
   * @deprecated Use setShaderData instead.
   * @param {Map<String, String>} defines - A collection of preprocessor macro definitions.
   * @return {EffectMaterial} This material.
   */
  setDefines(t) {
    for (const e of t.entries())
      this.defines[e[0]] = e[1];
    return this.needsUpdate = !0, this;
  }
  /**
   * Sets the shader uniforms.
   *
   * @deprecated Use setShaderData instead.
   * @param {Map<String, Uniform>} uniforms - A collection of uniforms.
   * @return {EffectMaterial} This material.
   */
  setUniforms(t) {
    for (const e of t.entries())
      this.uniforms[e[0]] = e[1];
    return this;
  }
  /**
   * Sets the required shader extensions.
   *
   * @deprecated Use setShaderData instead.
   * @param {Set<WebGLExtension>} extensions - A collection of extensions.
   * @return {EffectMaterial} This material.
   */
  setExtensions(t) {
    this.extensions = {};
    for (const e of t)
      this.extensions[e] = !0;
    return this;
  }
  /**
   * Indicates whether output encoding is enabled.
   *
   * @type {Boolean}
   */
  get encodeOutput() {
    return this.defines.ENCODE_OUTPUT !== void 0;
  }
  set encodeOutput(t) {
    this.encodeOutput !== t && (t ? this.defines.ENCODE_OUTPUT = "1" : delete this.defines.ENCODE_OUTPUT, this.needsUpdate = !0);
  }
  /**
   * Indicates whether output encoding is enabled.
   *
   * @deprecated Use encodeOutput instead.
   * @return {Boolean} Whether output encoding is enabled.
   */
  isOutputEncodingEnabled(t) {
    return this.encodeOutput;
  }
  /**
   * Enables or disables output encoding.
   *
   * @deprecated Use encodeOutput instead.
   * @param {Boolean} value - Whether output encoding should be enabled.
   */
  setOutputEncodingEnabled(t) {
    this.encodeOutput = t;
  }
  /**
   * The time in seconds.
   *
   * @type {Number}
   */
  get time() {
    return this.uniforms.time.value;
  }
  set time(t) {
    this.uniforms.time.value = t;
  }
  /**
   * Sets the delta time.
   *
   * @deprecated Use time instead.
   * @param {Number} value - The delta time in seconds.
   */
  setDeltaTime(t) {
    this.uniforms.time.value += t;
  }
  /**
   * Copies the settings of the given camera.
   *
   * @deprecated Use copyCameraSettings instead.
   * @param {Camera} camera - A camera.
   */
  adoptCameraSettings(t) {
    this.copyCameraSettings(t);
  }
  /**
   * Copies the settings of the given camera.
   *
   * @param {Camera} camera - A camera.
   */
  copyCameraSettings(t) {
    t && (this.uniforms.cameraNear.value = t.near, this.uniforms.cameraFar.value = t.far, t instanceof Et ? this.defines.PERSPECTIVE_CAMERA = "1" : delete this.defines.PERSPECTIVE_CAMERA, this.needsUpdate = !0);
  }
  /**
   * Sets the resolution.
   *
   * @param {Number} width - The width.
   * @param {Number} height - The height.
   */
  setSize(t, e) {
    const r = this.uniforms;
    r.resolution.value.set(t, e), r.texelSize.value.set(1 / t, 1 / e), r.aspect.value = t / e;
  }
  /**
   * An enumeration of shader code placeholders.
   *
   * @deprecated Use EffectShaderSection instead.
   * @type {Object}
   */
  static get Section() {
    return R;
  }
};
Number(Ue.replace(/\D+/g, ""));
function rr(t, e, r) {
  for (const n of e) {
    const i = "$1" + t + n.charAt(0).toUpperCase() + n.slice(1), o = new RegExp("([^\\.])(\\b" + n + "\\b)", "g");
    for (const s of r.entries())
      s[1] !== null && r.set(s[0], s[1].replace(o, i));
  }
}
function Js(t, e, r) {
  let n = e.getFragmentShader(), i = e.getVertexShader();
  const o = n !== void 0 && /mainImage/.test(n), s = n !== void 0 && /mainUv/.test(n);
  if (r.attributes |= e.getAttributes(), n === void 0)
    throw new Error(`Missing fragment shader (${e.name})`);
  if (s && r.attributes & V.CONVOLUTION)
    throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);
  if (!o && !s)
    throw new Error(`Could not find mainImage or mainUv function (${e.name})`);
  {
    const a = /\w+\s+(\w+)\([\w\s,]*\)\s*{/g, c = r.shaderParts;
    let u = c.get(R.FRAGMENT_HEAD) || "", l = c.get(R.FRAGMENT_MAIN_UV) || "", f = c.get(R.FRAGMENT_MAIN_IMAGE) || "", h = c.get(R.VERTEX_HEAD) || "", d = c.get(R.VERTEX_MAIN_SUPPORT) || "";
    const g = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set();
    if (s && (l += `	${t}MainUv(UV);
`, r.uvTransformation = !0), i !== null && /mainSupport/.test(i)) {
      const x = /mainSupport *\([\w\s]*?uv\s*?\)/.test(i);
      d += `	${t}MainSupport(`, d += x ? `vUv);
` : `);
`;
      for (const y of i.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))
        for (const w of y[1].split(/\s*,\s*/))
          r.varyings.add(w), g.add(w), p.add(w);
      for (const y of i.matchAll(a))
        p.add(y[1]);
    }
    for (const x of n.matchAll(a))
      p.add(x[1]);
    for (const x of e.defines.keys())
      p.add(x.replace(/\([\w\s,]*\)/g, ""));
    for (const x of e.uniforms.keys())
      p.add(x);
    p.delete("while"), p.delete("for"), p.delete("if"), e.uniforms.forEach((x, y) => r.uniforms.set(t + y.charAt(0).toUpperCase() + y.slice(1), x)), e.defines.forEach((x, y) => r.defines.set(t + y.charAt(0).toUpperCase() + y.slice(1), x));
    const v = /* @__PURE__ */ new Map([["fragment", n], ["vertex", i]]);
    rr(t, p, r.defines), rr(t, p, v), n = v.get("fragment"), i = v.get("vertex");
    const m = e.blendMode;
    if (r.blendModes.set(m.blendFunction, m), o) {
      e.inputColorSpace !== null && e.inputColorSpace !== r.colorSpace && (f += e.inputColorSpace === z ? `color0 = sRGBTransferOETF(color0);
	` : `color0 = sRGBToLinear(color0);
	`), e.outputColorSpace !== Dr ? r.colorSpace = e.outputColorSpace : e.inputColorSpace !== null && (r.colorSpace = e.inputColorSpace);
      const x = /MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;
      f += `${t}MainImage(color0, UV, `, r.attributes & V.DEPTH && x.test(n) && (f += "depth, ", r.readDepth = !0), f += `color1);
	`;
      const y = t + "BlendOpacity";
      r.uniforms.set(y, m.opacity), f += `color0 = blend${m.blendFunction}(color0, color1, ${y});

	`, u += `uniform float ${y};

`;
    }
    if (u += n + `
`, i !== null && (h += i + `
`), c.set(R.FRAGMENT_HEAD, u), c.set(R.FRAGMENT_MAIN_UV, l), c.set(R.FRAGMENT_MAIN_IMAGE, f), c.set(R.VERTEX_HEAD, h), c.set(R.VERTEX_MAIN_SUPPORT, d), e.extensions !== null)
      for (const x of e.extensions)
        r.extensions.add(x);
  }
}
var qs = class extends K {
  /**
   * Constructs a new effect pass.
   *
   * @param {Camera} camera - The main camera.
   * @param {...Effect} effects - The effects that will be rendered by this pass.
   */
  constructor(t, ...e) {
    super("EffectPass"), this.fullscreenMaterial = new Ks(null, null, null, t), this.listener = (r) => this.handleEvent(r), this.effects = [], this.setEffects(e), this.skipRendering = !1, this.minTime = 1, this.maxTime = Number.POSITIVE_INFINITY, this.timeScale = 1;
  }
  set mainScene(t) {
    for (const e of this.effects)
      e.mainScene = t;
  }
  set mainCamera(t) {
    this.fullscreenMaterial.copyCameraSettings(t);
    for (const e of this.effects)
      e.mainCamera = t;
  }
  /**
   * Indicates whether this pass encodes its output when rendering to screen.
   *
   * @type {Boolean}
   * @deprecated Use fullscreenMaterial.encodeOutput instead.
   */
  get encodeOutput() {
    return this.fullscreenMaterial.encodeOutput;
  }
  set encodeOutput(t) {
    this.fullscreenMaterial.encodeOutput = t;
  }
  /**
   * Indicates whether dithering is enabled.
   *
   * @type {Boolean}
   */
  get dithering() {
    return this.fullscreenMaterial.dithering;
  }
  set dithering(t) {
    const e = this.fullscreenMaterial;
    e.dithering = t, e.needsUpdate = !0;
  }
  /**
   * Sets the effects.
   *
   * @param {Effect[]} effects - The effects.
   * @protected
   */
  setEffects(t) {
    for (const e of this.effects)
      e.removeEventListener("change", this.listener);
    this.effects = t.sort((e, r) => r.attributes - e.attributes);
    for (const e of this.effects)
      e.addEventListener("change", this.listener);
  }
  /**
   * Updates the compound shader material.
   *
   * @protected
   */
  updateMaterial() {
    const t = new Zi();
    let e = 0;
    for (const s of this.effects)
      if (s.blendMode.blendFunction === B.DST)
        t.attributes |= s.getAttributes() & V.DEPTH;
      else {
        if (t.attributes & s.getAttributes() & V.CONVOLUTION)
          throw new Error(`Convolution effects cannot be merged (${s.name})`);
        Js("e" + e++, s, t);
      }
    let r = t.shaderParts.get(R.FRAGMENT_HEAD), n = t.shaderParts.get(R.FRAGMENT_MAIN_IMAGE), i = t.shaderParts.get(R.FRAGMENT_MAIN_UV);
    const o = /\bblend\b/g;
    for (const s of t.blendModes.values())
      r += s.getShaderCode().replace(o, `blend${s.blendFunction}`) + `
`;
    t.attributes & V.DEPTH ? (t.readDepth && (n = `float depth = readDepth(UV);

	` + n), this.needsDepthTexture = this.getDepthTexture() === null) : this.needsDepthTexture = !1, t.colorSpace === z && (n += `color0 = sRGBToLinear(color0);
	`), t.uvTransformation ? (i = `vec2 transformedUv = vUv;
` + i, t.defines.set("UV", "transformedUv")) : t.defines.set("UV", "vUv"), t.shaderParts.set(R.FRAGMENT_HEAD, r), t.shaderParts.set(R.FRAGMENT_MAIN_IMAGE, n), t.shaderParts.set(R.FRAGMENT_MAIN_UV, i);
    for (const [s, a] of t.shaderParts)
      a !== null && t.shaderParts.set(s, a.trim().replace(/^#/, `
#`));
    this.skipRendering = e === 0, this.needsSwap = !this.skipRendering, this.fullscreenMaterial.setShaderData(t);
  }
  /**
   * Rebuilds the shader material.
   */
  recompile() {
    this.updateMaterial();
  }
  /**
   * Returns the current depth texture.
   *
   * @return {Texture} The current depth texture, or null if there is none.
   */
  getDepthTexture() {
    return this.fullscreenMaterial.depthBuffer;
  }
  /**
   * Sets the depth texture.
   *
   * @param {Texture} depthTexture - A depth texture.
   * @param {DepthPackingStrategies} [depthPacking=BasicDepthPacking] - The depth packing.
   */
  setDepthTexture(t, e = xe) {
    this.fullscreenMaterial.depthBuffer = t, this.fullscreenMaterial.depthPacking = e;
    for (const r of this.effects)
      r.setDepthTexture(t, e);
  }
  /**
   * Renders the effect.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {WebGLRenderTarget} outputBuffer - A frame buffer that serves as the output render target unless this pass renders to screen.
   * @param {Number} [deltaTime] - The time between the last frame and the current one in seconds.
   * @param {Boolean} [stencilTest] - Indicates whether a stencil mask is active.
   */
  render(t, e, r, n, i) {
    for (const o of this.effects)
      o.update(t, e, n);
    if (!this.skipRendering || this.renderToScreen) {
      const o = this.fullscreenMaterial;
      o.inputBuffer = e.texture, o.time += n * this.timeScale, t.setRenderTarget(this.renderToScreen ? null : r), t.render(this.scene, this.camera);
    }
  }
  /**
   * Updates the size of this pass.
   *
   * @param {Number} width - The width.
   * @param {Number} height - The height.
   */
  setSize(t, e) {
    this.fullscreenMaterial.setSize(t, e);
    for (const r of this.effects)
      r.setSize(t, e);
  }
  /**
   * Performs initialization tasks.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Boolean} alpha - Whether the renderer uses the alpha channel or not.
   * @param {Number} frameBufferType - The type of the main frame buffers.
   */
  initialize(t, e, r) {
    this.renderer = t;
    for (const n of this.effects)
      n.initialize(t, e, r);
    this.updateMaterial(), r !== void 0 && r !== Se && (this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH = "1");
  }
  /**
   * Deletes disposable objects.
   */
  dispose() {
    super.dispose();
    for (const t of this.effects)
      t.removeEventListener("change", this.listener), t.dispose();
  }
  /**
   * Handles events.
   *
   * @param {Event} event - An event.
   */
  handleEvent(t) {
    switch (t.type) {
      case "change":
        this.recompile();
        break;
    }
  }
}, Zs = process.env.NODE_ENV === "production", nr = "Invariant failed";
function ir(t, e) {
  if (!t) {
    if (Zs)
      throw new Error(nr);
    var r = nr;
    throw new Error(r);
  }
}
const $s = {
  enabled: !0,
  effect: "smaa"
}, eo = (t) => {
  if (!(t != null && t.enabled))
    return;
  switch (t.effect ?? $s.effect) {
    case "fxaa":
      return new Os();
    case "smaa":
      return new Vs({ edgeDetectionMode: Rt.DEPTH });
  }
}, Vr = Math.max(navigator.hardwareConcurrency, 1), Mt = Math.max(
  Math.floor(Vr / 3),
  1
), to = Math.max(
  Vr - Mt,
  1
);
function Ee(t, e, r) {
  return Ui(t, e, r);
}
function ro(t, e) {
  return Ee("getImageDataFromImageBitmap", [t, e], {
    transfer: [t, e]
  });
}
function Xr(t) {
  const e = "material" in t ? t.material : void 0;
  if (e && !Array.isArray(e) && "map" in e && e.map) {
    const r = e.map;
    if (e.map) {
      const n = r.image.height / r.image.width;
      t.scale.y *= n;
    }
  }
}
var jr = `uniform float nvr_uBatchId;

uniform float nvr_uPickable;`, no = `float nvr_branchFreeTernary(bool comparison, float a, float b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}

/**
 * Branchless ternary operator to be used when it's inexpensive to explicitly
 * evaluate both possibilities for a vec2 expression.
 *
 * @name nvr_branchFreeTernary
 * @glslFunction
 *
 * @param {bool} comparison A comparison statement
 * @param {vec2} a Value to return if the comparison is true.
 * @param {vec2} b Value to return if the comparison is false.
 *
 * @returns {vec2} equivalent of comparison ? a : b
 */
vec2 nvr_branchFreeTernary(bool comparison, vec2 a, vec2 b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}

/**
 * Branchless ternary operator to be used when it's inexpensive to explicitly
 * evaluate both possibilities for a vec3 expression.
 *
 * @name nvr_branchFreeTernary
 * @glslFunction
 *
 * @param {bool} comparison A comparison statement
 * @param {vec3} a Value to return if the comparison is true.
 * @param {vec3} b Value to return if the comparison is false.
 *
 * @returns {vec3} equivalent of comparison ? a : b
 */
vec3 nvr_branchFreeTernary(bool comparison, vec3 a, vec3 b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}

/**
 * Branchless ternary operator to be used when it's inexpensive to explicitly
 * evaluate both possibilities for a vec4 expression.
 *
 * @name nvr_branchFreeTernary
 * @glslFunction
 *
 * @param {bool} comparison A comparison statement
 * @param {vec3} a Value to return if the comparison is true.
 * @param {vec3} b Value to return if the comparison is false.
 *
 * @returns {vec3} equivalent of comparison ? a : b
 */
vec4 nvr_branchFreeTernary(bool comparison, vec4 a, vec4 b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}`, Ve = `vec3 nvr_batchIdToColor(float batchId) {
    float r = floor(batchId / 65536.0);
    float g = floor(mod(batchId / 256.0, 256.0));
    float b = floor(mod(batchId, 256.0));

    return vec3(r/255.0, g/255.0, b/255.0);
}`, io = `float nvr_planeDistance(vec4 plane, vec3 point) {
    return (dot(plane.xyz, point) + plane.w);
}

/**
 * Computes distance from a point to a plane.
 *
 * @name nvr_planeDistance
 * @glslFunction
 *
 * param {vec3} planeNormal Normal for a plane in Hessian Normal Form. See Plane.js
 * param {float} planeDistance Distance for a plane in Hessian Normal form. See Plane.js
 * param {vec3} point A point in the same space as the plane.
 * returns {float} The distance from the point to the plane.
 */
float nvr_planeDistance(vec3 planeNormal, float planeDistance, vec3 point) {
    return (dot(planeNormal, point) + planeDistance);
}
vec4 nvr_screenToEyeCoordinates(vec4 screenCoordinate, vec4 frustumRatio, vec2 frustumNearFar)
{
    
    float x = 2.0 * screenCoordinate.x - 1.0;
    float y = 2.0 * screenCoordinate.y - 1.0;
    
    float z = 2.0 * screenCoordinate.z - 1.0;
    vec4 q = vec4(x, y, z, 1.0);

    
    q /= screenCoordinate.w;

    
    float top = frustumRatio.x;
    float bottom = frustumRatio.y;
    float right = frustumRatio.z;
    float left = frustumRatio.w;

    float near = frustumNearFar.x;
    float far = frustumNearFar.y;

    q.x = (q.x * (right - left) + left + right) * 0.5;
    q.y = (q.y * (top - bottom) + bottom + top) * 0.5;
    q.z = (q.z * (near - far) - near - far) * 0.5;
    q.w = 1.0;

    return q;
}

vec4 nvr_windowToEyeCoordinates(vec4 fragmentCoordinate, vec3 viewportAndPixelRatio, vec4 frustumRatio, vec2 frustumNearFar)
{
    vec2 screenCoordXY = fragmentCoordinate.xy / viewportAndPixelRatio.xy;
    return nvr_screenToEyeCoordinates(vec4(screenCoordXY, fragmentCoordinate.zw), frustumRatio, frustumNearFar);
}
float nvr_metersPerPixel(vec4 positionEC, vec3 viewportAndPixelRatio, vec2 frustumNearFar, vec4 frustumRatio)
{
    float width = viewportAndPixelRatio.x * viewportAndPixelRatio.z;
    float height = viewportAndPixelRatio.y * viewportAndPixelRatio.z;
    float pixelWidth;
    float pixelHeight;

    float top = frustumRatio.x;
    float bottom = frustumRatio.y;
    float right = frustumRatio.z;
    float left = frustumRatio.w;

    
    
    
    
    
    
    
    
    
    
        float distanceToPixel = -positionEC.z;
        float inverseNear = 1.0 / frustumNearFar.x;
        float tanTheta = top * inverseNear;
        pixelHeight = 2.0 * distanceToPixel * tanTheta / height;
        tanTheta = right * inverseNear;
        pixelWidth = 2.0 * distanceToPixel * tanTheta / width;
    

    float pixelRatio = viewportAndPixelRatio.z;

    return max(pixelWidth, pixelHeight) * pixelRatio;
}
vec3 nvr_batchIdToColor(float batchId) {
    float r = floor(batchId / 65536.0);
    float g = floor(mod(batchId / 256.0, 256.0));
    float b = floor(mod(batchId, 256.0));

    return vec3(r/255.0, g/255.0, b/255.0);
}

#include <common>
#include <packing>

#include <lights_pars_begin>
#include <lights_lambert_pars_fragment>

in vec4 v_startPlaneNormalEcAndHalfWidth;
in vec3 v_endPlaneNormalEc;
in vec4 v_rightPlaneEC; 
in vec4 v_endEcAndStartEcX;
in vec4 v_texcoordNormalizationAndStartEcYZ;
in float nvr_vBatchId;
in float nvr_vIsPicked;

uniform vec3 color;
uniform vec3 viewportAndPixelRatio;
uniform sampler2D tGlobeDepth;
uniform sampler2D uGlobeNormal;
uniform bool useGroundNormals;
uniform vec2 frustumNearFar;
uniform vec4 frustumRatio;
uniform float logDepthBufFC;
uniform mat4 inverseProjectionMatrix;
uniform float nvr_uPickable;
uniform vec3 nvr_uHighlightColor;

float readDepth(sampler2D depthSampler, vec2 coord) {
    float fragCoordZ = texture( depthSampler, coord ).r;
    return fragCoordZ;
}

void main() {
    vec2 viewport = (viewportAndPixelRatio.xy * viewportAndPixelRatio.z);
    float logDepthOrDepth = readDepth(tGlobeDepth, gl_FragCoord.xy / viewport.xy);

    
    if (logDepthOrDepth == 1.0) {
        discard;
    }
    
    vec3 ecStart = vec3(v_endEcAndStartEcX.w, v_texcoordNormalizationAndStartEcYZ.zw);

    float near = frustumNearFar.x;
    float far = frustumNearFar.y;
    float linearDepth = exp2(logDepthOrDepth / (logDepthBufFC * 0.5)) - 1.0;
    float depthFromCamera = linearDepth + near;
    float z_ndc = -1. * depthFromCamera;

    
    vec4 clipCoords = vec4(
        (gl_FragCoord.xy / viewport) * 2.0 - 1.0,
        z_ndc,
        1.0
    );
    
    vec4 eyeCoordinate = inverseProjectionMatrix * clipCoords;
    eyeCoordinate.w = 1.0 / depthFromCamera;
    eyeCoordinate /= eyeCoordinate.w;

    float halfMaxWidth = v_startPlaneNormalEcAndHalfWidth.w * nvr_metersPerPixel(eyeCoordinate, viewportAndPixelRatio, frustumNearFar, frustumRatio);
    
    float widthwiseDistance = nvr_planeDistance(v_rightPlaneEC, eyeCoordinate.xyz);

    
    float distanceFromStart = nvr_planeDistance(v_startPlaneNormalEcAndHalfWidth.xyz, -dot(ecStart, v_startPlaneNormalEcAndHalfWidth.xyz), eyeCoordinate.xyz);
    float distanceFromEnd = nvr_planeDistance(v_endPlaneNormalEc.xyz, -dot(v_endEcAndStartEcX.xyz, v_endPlaneNormalEc.xyz), eyeCoordinate.xyz);

    if (abs(widthwiseDistance) > halfMaxWidth || distanceFromStart <= 0.0 || distanceFromEnd <= 0.0) {
        discard;
    }

    if(nvr_uPickable > 0.0) {
        vec3 pickColor = nvr_batchIdToColor(nvr_vBatchId);
        gl_FragColor = vec4(pickColor.xyz, 1.0);
        return;
    }

    vec4 diffuseColor = vec4( color, 1. );

    if(nvr_vIsPicked > 0.0) {
        diffuseColor = vec4(nvr_uHighlightColor.xyz, 1.0);
    }

    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = vec3(1.);

    #include <color_fragment>
    #include <specularmap_fragment>
    #include <emissivemap_fragment>

    vec2 uv = gl_FragCoord.xy / vec2(textureSize(uGlobeNormal, 0));
    vec3 mapN = unpackRGBToNormal(texture2D( uGlobeNormal, uv ).xyz);
    
    
    vec3 normal = normalize( mapN );

    
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

    vec3 outgoingLight; 
    if(!useGroundNormals) {
        
        outgoingLight = diffuseColor.xyz;
    } else {
        outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
    }

    #include <opaque_fragment>
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`, so = `float nvr_circle_alpha(vec2 uv) {
    float border = 0.01;
    float radius = 0.5;

    float dist = radius - length(uv);

    float t = 0.0;
    if (dist > border)
      t = 1.0;
    else if (dist > 0.0)
      t = dist / border;
    
    return mix(0., 1., t);
}`, oo = `vec3 nvr_batchIdToColor(float batchId) {
    float r = floor(batchId / 65536.0);
    float g = floor(mod(batchId / 256.0, 256.0));
    float b = floor(mod(batchId, 256.0));

    return vec3(r/255.0, g/255.0, b/255.0);
}

uniform vec3 color;
uniform float nvr_uPickable;
uniform vec3 nvr_uHighlightColor;

in float nvr_vBatchId;
in float nvr_vIsPicked;

void main() {
    gl_FragColor = vec4(color, 1.);

    if(nvr_uPickable > 0.0) {
        vec3 pickColor = nvr_batchIdToColor(nvr_vBatchId);
        gl_FragColor = vec4(pickColor.xyz, 1.0);
    }

    if(v_IsPicked > 0.0) {
        gl_FragColor = vec4(nvr_uHighlightColor.xyz, 1.0);
    }
}`, ao = `float nvr_branchFreeTernary(bool comparison, float a, float b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}

/**
 * Branchless ternary operator to be used when it's inexpensive to explicitly
 * evaluate both possibilities for a vec2 expression.
 *
 * @name nvr_branchFreeTernary
 * @glslFunction
 *
 * @param {bool} comparison A comparison statement
 * @param {vec2} a Value to return if the comparison is true.
 * @param {vec2} b Value to return if the comparison is false.
 *
 * @returns {vec2} equivalent of comparison ? a : b
 */
vec2 nvr_branchFreeTernary(bool comparison, vec2 a, vec2 b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}

/**
 * Branchless ternary operator to be used when it's inexpensive to explicitly
 * evaluate both possibilities for a vec3 expression.
 *
 * @name nvr_branchFreeTernary
 * @glslFunction
 *
 * @param {bool} comparison A comparison statement
 * @param {vec3} a Value to return if the comparison is true.
 * @param {vec3} b Value to return if the comparison is false.
 *
 * @returns {vec3} equivalent of comparison ? a : b
 */
vec3 nvr_branchFreeTernary(bool comparison, vec3 a, vec3 b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}

/**
 * Branchless ternary operator to be used when it's inexpensive to explicitly
 * evaluate both possibilities for a vec4 expression.
 *
 * @name nvr_branchFreeTernary
 * @glslFunction
 *
 * @param {bool} comparison A comparison statement
 * @param {vec3} a Value to return if the comparison is true.
 * @param {vec3} b Value to return if the comparison is false.
 *
 * @returns {vec3} equivalent of comparison ? a : b
 */
vec4 nvr_branchFreeTernary(bool comparison, vec4 a, vec4 b) {
    float useA = float(comparison);
    return a * useA + b * (1.0 - useA);
}
float nvr_planeDistance(vec4 plane, vec3 point) {
    return (dot(plane.xyz, point) + plane.w);
}

/**
 * Computes distance from a point to a plane.
 *
 * @name nvr_planeDistance
 * @glslFunction
 *
 * param {vec3} planeNormal Normal for a plane in Hessian Normal Form. See Plane.js
 * param {float} planeDistance Distance for a plane in Hessian Normal form. See Plane.js
 * param {vec3} point A point in the same space as the plane.
 * returns {float} The distance from the point to the plane.
 */
float nvr_planeDistance(vec3 planeNormal, float planeDistance, vec3 point) {
    return (dot(planeNormal, point) + planeDistance);
}
float nvr_metersPerPixel(vec4 positionEC, vec3 viewportAndPixelRatio, vec2 frustumNearFar, vec4 frustumRatio)
{
    float width = viewportAndPixelRatio.x * viewportAndPixelRatio.z;
    float height = viewportAndPixelRatio.y * viewportAndPixelRatio.z;
    float pixelWidth;
    float pixelHeight;

    float top = frustumRatio.x;
    float bottom = frustumRatio.y;
    float right = frustumRatio.z;
    float left = frustumRatio.w;

    
    
    
    
    
    
    
    
    
    
        float distanceToPixel = -positionEC.z;
        float inverseNear = 1.0 / frustumNearFar.x;
        float tanTheta = top * inverseNear;
        pixelHeight = 2.0 * distanceToPixel * tanTheta / height;
        tanTheta = right * inverseNear;
        pixelWidth = 2.0 * distanceToPixel * tanTheta / width;
    

    float pixelRatio = viewportAndPixelRatio.z;

    return max(pixelWidth, pixelHeight) * pixelRatio;
}

attribute float batchId;
attribute float isPicked;

in vec3 start;
in vec3 forward_offset;
in vec3 start_normal;
in vec4 end_normal_and_texture_coordinate_normalization_x;
in vec4 right_normal_and_texture_coordinate_normalization_y;

uniform vec3 minMaxHeightAndWidth;
uniform vec3 viewportAndPixelRatio;
uniform vec2 frustumNearFar;
uniform vec4 frustumRatio;

out vec4 v_startPlaneNormalEcAndHalfWidth;
out vec3 v_endPlaneNormalEc;
out vec4 v_rightPlaneEC;
out vec4 v_endEcAndStartEcX;
out vec4 v_texcoordNormalizationAndStartEcYZ;
out vec3 vViewPosition;
out float nvr_vBatchId;
out float nvr_vIsPicked;

void main() {
    vec3 ecStart = (modelViewMatrix * vec4(start, 1.0)).xyz;
    vec3 offset = normalMatrix * forward_offset;
    vec3 ecEnd = ecStart + offset;

    nvr_vBatchId = batchId;
    nvr_vIsPicked = isPicked;

    vec3 forwardDirectionEC = normalize(offset);

    
    vec4 startPlaneEC;
    startPlaneEC.xyz = normalMatrix * start_normal;
    startPlaneEC.w = -dot(startPlaneEC.xyz, ecStart);

    
    vec4 endPlaneEC;
    endPlaneEC.xyz = normalMatrix * end_normal_and_texture_coordinate_normalization_x.xyz;
    endPlaneEC.w = -dot(endPlaneEC.xyz, ecEnd);

    
    v_rightPlaneEC.xyz = normalMatrix * right_normal_and_texture_coordinate_normalization_y.xyz;
    v_rightPlaneEC.w = -dot(v_rightPlaneEC.xyz, ecStart);

    v_texcoordNormalizationAndStartEcYZ.x = abs(end_normal_and_texture_coordinate_normalization_x.w);
    v_texcoordNormalizationAndStartEcYZ.y = right_normal_and_texture_coordinate_normalization_y.w;

    v_endEcAndStartEcX.xyz = ecEnd;
    v_endEcAndStartEcX.w = ecStart.x;
    v_texcoordNormalizationAndStartEcYZ.zw = ecStart.yz;

    vec4 positionEC = modelViewMatrix * vec4(position, 1.0);

    float absStartPlaneDistance = abs(nvr_planeDistance(startPlaneEC, positionEC.xyz));
    float absEndPlaneDistance = abs(nvr_planeDistance(endPlaneEC, positionEC.xyz));
    vec3 planeDirection = nvr_branchFreeTernary(absStartPlaneDistance < absEndPlaneDistance, startPlaneEC.xyz, endPlaneEC.xyz);
    vec3 upOrDown = normalize(cross(v_rightPlaneEC.xyz, planeDirection)); 
    vec3 normalEC = normalize(cross(planeDirection, upOrDown));           

    
    vec3 heightNormal = normalize(nvr_branchFreeTernary(absStartPlaneDistance < absEndPlaneDistance, cross(v_rightPlaneEC.xyz, startPlaneEC.xyz), cross(endPlaneEC.xyz, v_rightPlaneEC.xyz)));
    vec3 cur_point = nvr_branchFreeTernary(absStartPlaneDistance < absEndPlaneDistance, start, start + forward_offset);
    vec3 diff = normalize(position - cur_point);
    vec3 height = heightNormal * nvr_branchFreeTernary(dot(diff, heightNormal) > 0., minMaxHeightAndWidth.y, minMaxHeightAndWidth.x);
    positionEC.xyz += height;

    
    
    
 
    v_texcoordNormalizationAndStartEcYZ.y = nvr_branchFreeTernary(v_texcoordNormalizationAndStartEcYZ.y > 1.0, 0.0, abs(v_texcoordNormalizationAndStartEcYZ.y));

    float lineWidth = minMaxHeightAndWidth.z;

    v_startPlaneNormalEcAndHalfWidth.xyz = startPlaneEC.xyz;
    v_startPlaneNormalEcAndHalfWidth.w = lineWidth * 0.5;

    v_endPlaneNormalEc.xyz = endPlaneEC.xyz;

    lineWidth = lineWidth * max(0.0, nvr_metersPerPixel(positionEC, viewportAndPixelRatio, frustumNearFar, frustumRatio)); 
    lineWidth = lineWidth / dot(normalEC, v_rightPlaneEC.xyz); 

    normalEC *= sign(end_normal_and_texture_coordinate_normalization_x.w);

    positionEC.xyz += lineWidth * normalEC;
    gl_Position = projectionMatrix * positionEC;
    vViewPosition = -positionEC.xyz;
}`, co = typeof global == "object" && global && global.Object === Object && global, lo = typeof self == "object" && self && self.Object === Object && self, Pt = co || lo || Function("return this")(), re = Pt.Symbol, Kr = Object.prototype, uo = Kr.hasOwnProperty, fo = Kr.toString, Ce = re ? re.toStringTag : void 0;
function ho(t) {
  var e = uo.call(t, Ce), r = t[Ce];
  try {
    t[Ce] = void 0;
    var n = !0;
  } catch {
  }
  var i = fo.call(t);
  return n && (e ? t[Ce] = r : delete t[Ce]), i;
}
var go = Object.prototype, po = go.toString;
function mo(t) {
  return po.call(t);
}
var Ao = "[object Null]", vo = "[object Undefined]", sr = re ? re.toStringTag : void 0;
function Xe(t) {
  return t == null ? t === void 0 ? vo : Ao : sr && sr in Object(t) ? ho(t) : mo(t);
}
function je(t) {
  return t != null && typeof t == "object";
}
var wo = "[object Symbol]";
function _t(t) {
  return typeof t == "symbol" || je(t) && Xe(t) == wo;
}
function xo(t, e) {
  for (var r = -1, n = t == null ? 0 : t.length, i = Array(n); ++r < n; )
    i[r] = e(t[r], r, t);
  return i;
}
var Pe = Array.isArray, Eo = 1 / 0, or = re ? re.prototype : void 0, ar = or ? or.toString : void 0;
function Jr(t) {
  if (typeof t == "string")
    return t;
  if (Pe(t))
    return xo(t, Jr) + "";
  if (_t(t))
    return ar ? ar.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -Eo ? "-0" : e;
}
function Fe(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
function To(t) {
  return t;
}
var yo = "[object AsyncFunction]", Co = "[object Function]", Do = "[object GeneratorFunction]", bo = "[object Proxy]";
function Bo(t) {
  if (!Fe(t))
    return !1;
  var e = Xe(t);
  return e == Co || e == Do || e == yo || e == bo;
}
var ct = Pt["__core-js_shared__"], cr = function() {
  var t = /[^.]+$/.exec(ct && ct.keys && ct.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Io(t) {
  return !!cr && cr in t;
}
var So = Function.prototype, Ro = So.toString;
function Mo(t) {
  if (t != null) {
    try {
      return Ro.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Po = /[\\^$.*+?()[\]{}|]/g, _o = /^\[object .+?Constructor\]$/, Lo = Function.prototype, Oo = Object.prototype, ko = Lo.toString, Fo = Oo.hasOwnProperty, No = RegExp(
  "^" + ko.call(Fo).replace(Po, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ho(t) {
  if (!Fe(t) || Io(t))
    return !1;
  var e = Bo(t) ? No : _o;
  return e.test(Mo(t));
}
function Go(t, e) {
  return t == null ? void 0 : t[e];
}
function Lt(t, e) {
  var r = Go(t, e);
  return Ho(r) ? r : void 0;
}
function Uo(t, e, r) {
  switch (r.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, r[0]);
    case 2:
      return t.call(e, r[0], r[1]);
    case 3:
      return t.call(e, r[0], r[1], r[2]);
  }
  return t.apply(e, r);
}
var zo = 800, Qo = 16, Wo = Date.now;
function Yo(t) {
  var e = 0, r = 0;
  return function() {
    var n = Wo(), i = Qo - (n - r);
    if (r = n, i > 0) {
      if (++e >= zo)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
function Vo(t) {
  return function() {
    return t;
  };
}
var Ne = function() {
  try {
    var t = Lt(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), Xo = Ne ? function(t, e) {
  return Ne(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Vo(e),
    writable: !0
  });
} : To, jo = Yo(Xo), Ko = 9007199254740991, Jo = /^(?:0|[1-9]\d*)$/;
function qr(t, e) {
  var r = typeof t;
  return e = e ?? Ko, !!e && (r == "number" || r != "symbol" && Jo.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function qo(t, e, r) {
  e == "__proto__" && Ne ? Ne(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function Zr(t, e) {
  return t === e || t !== t && e !== e;
}
var Zo = Object.prototype, $o = Zo.hasOwnProperty;
function ea(t, e, r) {
  var n = t[e];
  (!($o.call(t, e) && Zr(n, r)) || r === void 0 && !(e in t)) && qo(t, e, r);
}
var lr = Math.max;
function ta(t, e, r) {
  return e = lr(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, i = -1, o = lr(n.length - e, 0), s = Array(o); ++i < o; )
      s[i] = n[e + i];
    i = -1;
    for (var a = Array(e + 1); ++i < e; )
      a[i] = n[i];
    return a[e] = r(s), Uo(t, this, a);
  };
}
var ra = 9007199254740991;
function na(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= ra;
}
var ia = "[object Arguments]";
function ur(t) {
  return je(t) && Xe(t) == ia;
}
var $r = Object.prototype, sa = $r.hasOwnProperty, oa = $r.propertyIsEnumerable, en = ur(/* @__PURE__ */ function() {
  return arguments;
}()) ? ur : function(t) {
  return je(t) && sa.call(t, "callee") && !oa.call(t, "callee");
}, aa = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ca = /^\w*$/;
function la(t, e) {
  if (Pe(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || _t(t) ? !0 : ca.test(t) || !aa.test(t) || e != null && t in Object(e);
}
var Me = Lt(Object, "create");
function ua() {
  this.__data__ = Me ? Me(null) : {}, this.size = 0;
}
function fa(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var da = "__lodash_hash_undefined__", ha = Object.prototype, ga = ha.hasOwnProperty;
function pa(t) {
  var e = this.__data__;
  if (Me) {
    var r = e[t];
    return r === da ? void 0 : r;
  }
  return ga.call(e, t) ? e[t] : void 0;
}
var ma = Object.prototype, Aa = ma.hasOwnProperty;
function va(t) {
  var e = this.__data__;
  return Me ? e[t] !== void 0 : Aa.call(e, t);
}
var wa = "__lodash_hash_undefined__";
function xa(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = Me && e === void 0 ? wa : e, this;
}
function ue(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
ue.prototype.clear = ua;
ue.prototype.delete = fa;
ue.prototype.get = pa;
ue.prototype.has = va;
ue.prototype.set = xa;
function Ea() {
  this.__data__ = [], this.size = 0;
}
function Ke(t, e) {
  for (var r = t.length; r--; )
    if (Zr(t[r][0], e))
      return r;
  return -1;
}
var Ta = Array.prototype, ya = Ta.splice;
function Ca(t) {
  var e = this.__data__, r = Ke(e, t);
  if (r < 0)
    return !1;
  var n = e.length - 1;
  return r == n ? e.pop() : ya.call(e, r, 1), --this.size, !0;
}
function Da(t) {
  var e = this.__data__, r = Ke(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function ba(t) {
  return Ke(this.__data__, t) > -1;
}
function Ba(t, e) {
  var r = this.__data__, n = Ke(r, t);
  return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this;
}
function Te(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
Te.prototype.clear = Ea;
Te.prototype.delete = Ca;
Te.prototype.get = Da;
Te.prototype.has = ba;
Te.prototype.set = Ba;
var Ia = Lt(Pt, "Map");
function Sa() {
  this.size = 0, this.__data__ = {
    hash: new ue(),
    map: new (Ia || Te)(),
    string: new ue()
  };
}
function Ra(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function Je(t, e) {
  var r = t.__data__;
  return Ra(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function Ma(t) {
  var e = Je(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function Pa(t) {
  return Je(this, t).get(t);
}
function _a(t) {
  return Je(this, t).has(t);
}
function La(t, e) {
  var r = Je(this, t), n = r.size;
  return r.set(t, e), this.size += r.size == n ? 0 : 1, this;
}
function he(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var n = t[e];
    this.set(n[0], n[1]);
  }
}
he.prototype.clear = Sa;
he.prototype.delete = Ma;
he.prototype.get = Pa;
he.prototype.has = _a;
he.prototype.set = La;
var Oa = "Expected a function";
function Ot(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Oa);
  var r = function() {
    var n = arguments, i = e ? e.apply(this, n) : n[0], o = r.cache;
    if (o.has(i))
      return o.get(i);
    var s = t.apply(this, n);
    return r.cache = o.set(i, s) || o, s;
  };
  return r.cache = new (Ot.Cache || he)(), r;
}
Ot.Cache = he;
var ka = 500;
function Fa(t) {
  var e = Ot(t, function(n) {
    return r.size === ka && r.clear(), n;
  }), r = e.cache;
  return e;
}
var Na = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ha = /\\(\\)?/g, Ga = Fa(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(Na, function(r, n, i, o) {
    e.push(i ? o.replace(Ha, "$1") : n || r);
  }), e;
});
function Ua(t) {
  return t == null ? "" : Jr(t);
}
function qe(t, e) {
  return Pe(t) ? t : la(t, e) ? [t] : Ga(Ua(t));
}
var za = 1 / 0;
function kt(t) {
  if (typeof t == "string" || _t(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -za ? "-0" : e;
}
function Qa(t, e) {
  e = qe(e, t);
  for (var r = 0, n = e.length; t != null && r < n; )
    t = t[kt(e[r++])];
  return r && r == n ? t : void 0;
}
function Wa(t, e) {
  for (var r = -1, n = e.length, i = t.length; ++r < n; )
    t[i + r] = e[r];
  return t;
}
var fr = re ? re.isConcatSpreadable : void 0;
function Ya(t) {
  return Pe(t) || en(t) || !!(fr && t && t[fr]);
}
function Va(t, e, r, n, i) {
  var o = -1, s = t.length;
  for (r || (r = Ya), i || (i = []); ++o < s; ) {
    var a = t[o];
    r(a) ? Wa(i, a) : i[i.length] = a;
  }
  return i;
}
function Xa(t) {
  var e = t == null ? 0 : t.length;
  return e ? Va(t) : [];
}
function ja(t) {
  return jo(ta(t, void 0, Xa), t + "");
}
function Ka(t, e) {
  return t != null && e in Object(t);
}
function Ja(t, e, r) {
  e = qe(e, t);
  for (var n = -1, i = e.length, o = !1; ++n < i; ) {
    var s = kt(e[n]);
    if (!(o = t != null && r(t, s)))
      break;
    t = t[s];
  }
  return o || ++n != i ? o : (i = t == null ? 0 : t.length, !!i && na(i) && qr(s, i) && (Pe(t) || en(t)));
}
function qa(t, e) {
  return t != null && Ja(t, e, Ka);
}
var Za = "[object Number]";
function $a(t) {
  return typeof t == "number" || je(t) && Xe(t) == Za;
}
function ec(t, e, r, n) {
  if (!Fe(t))
    return t;
  e = qe(e, t);
  for (var i = -1, o = e.length, s = o - 1, a = t; a != null && ++i < o; ) {
    var c = kt(e[i]), u = r;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return t;
    if (i != s) {
      var l = a[c];
      u = void 0, u === void 0 && (u = Fe(l) ? l : qr(e[i + 1]) ? [] : {});
    }
    ea(a, c, u), a = a[c];
  }
  return t;
}
function tc(t, e, r) {
  for (var n = -1, i = e.length, o = {}; ++n < i; ) {
    var s = e[n], a = Qa(t, s);
    r(a, s) && ec(o, qe(s, t), a);
  }
  return o;
}
function rc(t, e) {
  return tc(t, e, function(r, n) {
    return qa(t, n);
  });
}
var nc = ja(function(t, e) {
  return t == null ? {} : rc(t, e);
});
const ic = parseInt(Ue.replace(/\D+/g, ""));
function dr(t, e) {
  if (e === bn)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), t;
  if (e === gt || e === Ir) {
    let r = t.getIndex();
    if (r === null) {
      const s = [], a = t.getAttribute("position");
      if (a !== void 0) {
        for (let c = 0; c < a.count; c++)
          s.push(c);
        t.setIndex(s), r = t.getIndex();
      } else
        return console.error(
          "THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."
        ), t;
    }
    const n = r.count - 2, i = [];
    if (r)
      if (e === gt)
        for (let s = 1; s <= n; s++)
          i.push(r.getX(0)), i.push(r.getX(s)), i.push(r.getX(s + 1));
      else
        for (let s = 0; s < n; s++)
          s % 2 === 0 ? (i.push(r.getX(s)), i.push(r.getX(s + 1)), i.push(r.getX(s + 2))) : (i.push(r.getX(s + 2)), i.push(r.getX(s + 1)), i.push(r.getX(s)));
    i.length / 3 !== n && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const o = t.clone();
    return o.setIndex(i), o.clearGroups(), o;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), t;
}
function He(t) {
  if (typeof TextDecoder < "u")
    return new TextDecoder().decode(t);
  let e = "";
  for (let r = 0, n = t.length; r < n; r++)
    e += String.fromCharCode(t[r]);
  try {
    return decodeURIComponent(escape(e));
  } catch {
    return e;
  }
}
const oe = "srgb", X = "srgb-linear", hr = 3001, sc = 3e3;
class oc extends We {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(r) {
      return new fc(r);
    }), this.register(function(r) {
      return new dc(r);
    }), this.register(function(r) {
      return new Ec(r);
    }), this.register(function(r) {
      return new Tc(r);
    }), this.register(function(r) {
      return new yc(r);
    }), this.register(function(r) {
      return new gc(r);
    }), this.register(function(r) {
      return new pc(r);
    }), this.register(function(r) {
      return new mc(r);
    }), this.register(function(r) {
      return new Ac(r);
    }), this.register(function(r) {
      return new uc(r);
    }), this.register(function(r) {
      return new vc(r);
    }), this.register(function(r) {
      return new hc(r);
    }), this.register(function(r) {
      return new xc(r);
    }), this.register(function(r) {
      return new wc(r);
    }), this.register(function(r) {
      return new cc(r);
    }), this.register(function(r) {
      return new Cc(r);
    }), this.register(function(r) {
      return new Dc(r);
    });
  }
  load(e, r, n, i) {
    const o = this;
    let s;
    if (this.resourcePath !== "")
      s = this.resourcePath;
    else if (this.path !== "") {
      const u = Be.extractUrlBase(e);
      s = Be.resolveURL(u, this.path);
    } else
      s = Be.extractUrlBase(e);
    this.manager.itemStart(e);
    const a = function(u) {
      i ? i(u) : console.error(u), o.manager.itemError(e), o.manager.itemEnd(e);
    }, c = new Le(this.manager);
    c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(
      e,
      function(u) {
        try {
          o.parse(
            u,
            s,
            function(l) {
              r(l), o.manager.itemEnd(e);
            },
            a
          );
        } catch (l) {
          a(l);
        }
      },
      n,
      a
    );
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setDDSLoader() {
    throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".');
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, r, n, i) {
    let o;
    const s = {}, a = {};
    if (typeof e == "string")
      o = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (He(new Uint8Array(e.slice(0, 4))) === tn) {
        try {
          s[I.KHR_BINARY_GLTF] = new bc(e);
        } catch (l) {
          i && i(l);
          return;
        }
        o = JSON.parse(s[I.KHR_BINARY_GLTF].content);
      } else
        o = JSON.parse(He(new Uint8Array(e)));
    else
      o = e;
    if (o.asset === void 0 || o.asset.version[0] < 2) {
      i && i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new Hc(o, {
      path: r || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let u = 0; u < this.pluginCallbacks.length; u++) {
      const l = this.pluginCallbacks[u](c);
      l.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[l.name] = l, s[l.name] = !0;
    }
    if (o.extensionsUsed)
      for (let u = 0; u < o.extensionsUsed.length; ++u) {
        const l = o.extensionsUsed[u], f = o.extensionsRequired || [];
        switch (l) {
          case I.KHR_MATERIALS_UNLIT:
            s[l] = new lc();
            break;
          case I.KHR_DRACO_MESH_COMPRESSION:
            s[l] = new Bc(o, this.dracoLoader);
            break;
          case I.KHR_TEXTURE_TRANSFORM:
            s[l] = new Ic();
            break;
          case I.KHR_MESH_QUANTIZATION:
            s[l] = new Sc();
            break;
          default:
            f.indexOf(l) >= 0 && a[l] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + l + '".');
        }
      }
    c.setExtensions(s), c.setPlugins(a), c.parse(n, i);
  }
  parseAsync(e, r) {
    const n = this;
    return new Promise(function(i, o) {
      n.parse(e, r, i, o);
    });
  }
}
function ac() {
  let t = {};
  return {
    get: function(e) {
      return t[e];
    },
    add: function(e, r) {
      t[e] = r;
    },
    remove: function(e) {
      delete t[e];
    },
    removeAll: function() {
      t = {};
    }
  };
}
const I = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class cc {
  constructor(e) {
    this.parser = e, this.name = I.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, r = this.parser.json.nodes || [];
    for (let n = 0, i = r.length; n < i; n++) {
      const o = r[n];
      o.extensions && o.extensions[this.name] && o.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, o.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const r = this.parser, n = "light:" + e;
    let i = r.cache.get(n);
    if (i)
      return i;
    const o = r.json, c = ((o.extensions && o.extensions[this.name] || {}).lights || [])[e];
    let u;
    const l = new N(16777215);
    c.color !== void 0 && l.setRGB(c.color[0], c.color[1], c.color[2], X);
    const f = c.range !== void 0 ? c.range : 0;
    switch (c.type) {
      case "directional":
        u = new Sr(l), u.target.position.set(0, 0, -1), u.add(u.target);
        break;
      case "point":
        u = new In(l), u.distance = f;
        break;
      case "spot":
        u = new Bn(l), u.distance = f, c.spot = c.spot || {}, c.spot.innerConeAngle = c.spot.innerConeAngle !== void 0 ? c.spot.innerConeAngle : 0, c.spot.outerConeAngle = c.spot.outerConeAngle !== void 0 ? c.spot.outerConeAngle : Math.PI / 4, u.angle = c.spot.outerConeAngle, u.penumbra = 1 - c.spot.innerConeAngle / c.spot.outerConeAngle, u.target.position.set(0, 0, -1), u.add(u.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + c.type);
    }
    return u.position.set(0, 0, 0), u.decay = 2, Y(u, c), c.intensity !== void 0 && (u.intensity = c.intensity), u.name = r.createUniqueName(c.name || "light_" + e), i = Promise.resolve(u), r.cache.add(n, i), i;
  }
  getDependency(e, r) {
    if (e === "light")
      return this._loadLight(r);
  }
  createNodeAttachment(e) {
    const r = this, n = this.parser, o = n.json.nodes[e], a = (o.extensions && o.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(c) {
      return n._getNodeRef(r.cache, a, c);
    });
  }
}
class lc {
  constructor() {
    this.name = I.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return se;
  }
  extendParams(e, r, n) {
    const i = [];
    e.color = new N(1, 1, 1), e.opacity = 1;
    const o = r.pbrMetallicRoughness;
    if (o) {
      if (Array.isArray(o.baseColorFactor)) {
        const s = o.baseColorFactor;
        e.color.setRGB(s[0], s[1], s[2], X), e.opacity = s[3];
      }
      o.baseColorTexture !== void 0 && i.push(n.assignTexture(e, "map", o.baseColorTexture, oe));
    }
    return Promise.all(i);
  }
}
class uc {
  constructor(e) {
    this.parser = e, this.name = I.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, r) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const o = i.extensions[this.name].emissiveStrength;
    return o !== void 0 && (r.emissiveIntensity = o), Promise.resolve();
  }
}
class fc {
  constructor(e) {
    this.parser = e, this.name = I.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : W;
  }
  extendMaterialParams(e, r) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const o = [], s = i.extensions[this.name];
    if (s.clearcoatFactor !== void 0 && (r.clearcoat = s.clearcoatFactor), s.clearcoatTexture !== void 0 && o.push(n.assignTexture(r, "clearcoatMap", s.clearcoatTexture)), s.clearcoatRoughnessFactor !== void 0 && (r.clearcoatRoughness = s.clearcoatRoughnessFactor), s.clearcoatRoughnessTexture !== void 0 && o.push(n.assignTexture(r, "clearcoatRoughnessMap", s.clearcoatRoughnessTexture)), s.clearcoatNormalTexture !== void 0 && (o.push(n.assignTexture(r, "clearcoatNormalMap", s.clearcoatNormalTexture)), s.clearcoatNormalTexture.scale !== void 0)) {
      const a = s.clearcoatNormalTexture.scale;
      r.clearcoatNormalScale = new F(a, a);
    }
    return Promise.all(o);
  }
}
class dc {
  constructor(e) {
    this.parser = e, this.name = I.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : W;
  }
  extendMaterialParams(e, r) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const o = i.extensions[this.name];
    return r.dispersion = o.dispersion !== void 0 ? o.dispersion : 0, Promise.resolve();
  }
}
class hc {
  constructor(e) {
    this.parser = e, this.name = I.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : W;
  }
  extendMaterialParams(e, r) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const o = [], s = i.extensions[this.name];
    return s.iridescenceFactor !== void 0 && (r.iridescence = s.iridescenceFactor), s.iridescenceTexture !== void 0 && o.push(n.assignTexture(r, "iridescenceMap", s.iridescenceTexture)), s.iridescenceIor !== void 0 && (r.iridescenceIOR = s.iridescenceIor), r.iridescenceThicknessRange === void 0 && (r.iridescenceThicknessRange = [100, 400]), s.iridescenceThicknessMinimum !== void 0 && (r.iridescenceThicknessRange[0] = s.iridescenceThicknessMinimum), s.iridescenceThicknessMaximum !== void 0 && (r.iridescenceThicknessRange[1] = s.iridescenceThicknessMaximum), s.iridescenceThicknessTexture !== void 0 && o.push(
      n.assignTexture(r, "iridescenceThicknessMap", s.iridescenceThicknessTexture)
    ), Promise.all(o);
  }
}
class gc {
  constructor(e) {
    this.parser = e, this.name = I.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : W;
  }
  extendMaterialParams(e, r) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const o = [];
    r.sheenColor = new N(0, 0, 0), r.sheenRoughness = 0, r.sheen = 1;
    const s = i.extensions[this.name];
    if (s.sheenColorFactor !== void 0) {
      const a = s.sheenColorFactor;
      r.sheenColor.setRGB(a[0], a[1], a[2], X);
    }
    return s.sheenRoughnessFactor !== void 0 && (r.sheenRoughness = s.sheenRoughnessFactor), s.sheenColorTexture !== void 0 && o.push(n.assignTexture(r, "sheenColorMap", s.sheenColorTexture, oe)), s.sheenRoughnessTexture !== void 0 && o.push(n.assignTexture(r, "sheenRoughnessMap", s.sheenRoughnessTexture)), Promise.all(o);
  }
}
class pc {
  constructor(e) {
    this.parser = e, this.name = I.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : W;
  }
  extendMaterialParams(e, r) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const o = [], s = i.extensions[this.name];
    return s.transmissionFactor !== void 0 && (r.transmission = s.transmissionFactor), s.transmissionTexture !== void 0 && o.push(n.assignTexture(r, "transmissionMap", s.transmissionTexture)), Promise.all(o);
  }
}
class mc {
  constructor(e) {
    this.parser = e, this.name = I.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : W;
  }
  extendMaterialParams(e, r) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const o = [], s = i.extensions[this.name];
    r.thickness = s.thicknessFactor !== void 0 ? s.thicknessFactor : 0, s.thicknessTexture !== void 0 && o.push(n.assignTexture(r, "thicknessMap", s.thicknessTexture)), r.attenuationDistance = s.attenuationDistance || 1 / 0;
    const a = s.attenuationColor || [1, 1, 1];
    return r.attenuationColor = new N().setRGB(
      a[0],
      a[1],
      a[2],
      X
    ), Promise.all(o);
  }
}
class Ac {
  constructor(e) {
    this.parser = e, this.name = I.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : W;
  }
  extendMaterialParams(e, r) {
    const i = this.parser.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const o = i.extensions[this.name];
    return r.ior = o.ior !== void 0 ? o.ior : 1.5, Promise.resolve();
  }
}
class vc {
  constructor(e) {
    this.parser = e, this.name = I.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : W;
  }
  extendMaterialParams(e, r) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const o = [], s = i.extensions[this.name];
    r.specularIntensity = s.specularFactor !== void 0 ? s.specularFactor : 1, s.specularTexture !== void 0 && o.push(n.assignTexture(r, "specularIntensityMap", s.specularTexture));
    const a = s.specularColorFactor || [1, 1, 1];
    return r.specularColor = new N().setRGB(a[0], a[1], a[2], X), s.specularColorTexture !== void 0 && o.push(
      n.assignTexture(r, "specularColorMap", s.specularColorTexture, oe)
    ), Promise.all(o);
  }
}
class wc {
  constructor(e) {
    this.parser = e, this.name = I.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : W;
  }
  extendMaterialParams(e, r) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const o = [], s = i.extensions[this.name];
    return r.bumpScale = s.bumpFactor !== void 0 ? s.bumpFactor : 1, s.bumpTexture !== void 0 && o.push(n.assignTexture(r, "bumpMap", s.bumpTexture)), Promise.all(o);
  }
}
class xc {
  constructor(e) {
    this.parser = e, this.name = I.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : W;
  }
  extendMaterialParams(e, r) {
    const n = this.parser, i = n.json.materials[e];
    if (!i.extensions || !i.extensions[this.name])
      return Promise.resolve();
    const o = [], s = i.extensions[this.name];
    return s.anisotropyStrength !== void 0 && (r.anisotropy = s.anisotropyStrength), s.anisotropyRotation !== void 0 && (r.anisotropyRotation = s.anisotropyRotation), s.anisotropyTexture !== void 0 && o.push(n.assignTexture(r, "anisotropyMap", s.anisotropyTexture)), Promise.all(o);
  }
}
class Ec {
  constructor(e) {
    this.parser = e, this.name = I.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const r = this.parser, n = r.json, i = n.textures[e];
    if (!i.extensions || !i.extensions[this.name])
      return null;
    const o = i.extensions[this.name], s = r.options.ktx2Loader;
    if (!s) {
      if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return r.loadTextureImage(e, o.source, s);
  }
}
class Tc {
  constructor(e) {
    this.parser = e, this.name = I.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const r = this.name, n = this.parser, i = n.json, o = i.textures[e];
    if (!o.extensions || !o.extensions[r])
      return null;
    const s = o.extensions[r], a = i.images[s.source];
    let c = n.textureLoader;
    if (a.uri) {
      const u = n.options.manager.getHandler(a.uri);
      u !== null && (c = u);
    }
    return this.detectSupport().then(function(u) {
      if (u)
        return n.loadTextureImage(e, s.source, c);
      if (i.extensionsRequired && i.extensionsRequired.indexOf(r) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return n.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const r = new Image();
      r.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", r.onload = r.onerror = function() {
        e(r.height === 1);
      };
    })), this.isSupported;
  }
}
class yc {
  constructor(e) {
    this.parser = e, this.name = I.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(e) {
    const r = this.name, n = this.parser, i = n.json, o = i.textures[e];
    if (!o.extensions || !o.extensions[r])
      return null;
    const s = o.extensions[r], a = i.images[s.source];
    let c = n.textureLoader;
    if (a.uri) {
      const u = n.options.manager.getHandler(a.uri);
      u !== null && (c = u);
    }
    return this.detectSupport().then(function(u) {
      if (u)
        return n.loadTextureImage(e, s.source, c);
      if (i.extensionsRequired && i.extensionsRequired.indexOf(r) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return n.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const r = new Image();
      r.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", r.onload = r.onerror = function() {
        e(r.height === 1);
      };
    })), this.isSupported;
  }
}
class Cc {
  constructor(e) {
    this.name = I.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const r = this.parser.json, n = r.bufferViews[e];
    if (n.extensions && n.extensions[this.name]) {
      const i = n.extensions[this.name], o = this.parser.getDependency("buffer", i.buffer), s = this.parser.options.meshoptDecoder;
      if (!s || !s.supported) {
        if (r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return o.then(function(a) {
        const c = i.byteOffset || 0, u = i.byteLength || 0, l = i.count, f = i.byteStride, h = new Uint8Array(a, c, u);
        return s.decodeGltfBufferAsync ? s.decodeGltfBufferAsync(l, f, h, i.mode, i.filter).then(function(d) {
          return d.buffer;
        }) : s.ready.then(function() {
          const d = new ArrayBuffer(l * f);
          return s.decodeGltfBuffer(
            new Uint8Array(d),
            l,
            f,
            h,
            i.mode,
            i.filter
          ), d;
        });
      });
    } else
      return null;
  }
}
class Dc {
  constructor(e) {
    this.name = I.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const r = this.parser.json, n = r.nodes[e];
    if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0)
      return null;
    const i = r.meshes[n.mesh];
    for (const u of i.primitives)
      if (u.mode !== G.TRIANGLES && u.mode !== G.TRIANGLE_STRIP && u.mode !== G.TRIANGLE_FAN && u.mode !== void 0)
        return null;
    const s = n.extensions[this.name].attributes, a = [], c = {};
    for (const u in s)
      a.push(
        this.parser.getDependency("accessor", s[u]).then((l) => (c[u] = l, c[u]))
      );
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((u) => {
      const l = u.pop(), f = l.isGroup ? l.children : [l], h = u[0].count, d = [];
      for (const g of f) {
        const p = new Oe(), v = new pe(), m = new Rr(), x = new pe(1, 1, 1), y = new Sn(g.geometry, g.material, h);
        for (let w = 0; w < h; w++)
          c.TRANSLATION && v.fromBufferAttribute(c.TRANSLATION, w), c.ROTATION && m.fromBufferAttribute(c.ROTATION, w), c.SCALE && x.fromBufferAttribute(c.SCALE, w), y.setMatrixAt(w, p.compose(v, m, x));
        for (const w in c)
          if (w === "_COLOR_0") {
            const C = c[w];
            y.instanceColor = new Rn(C.array, C.itemSize, C.normalized);
          } else w !== "TRANSLATION" && w !== "ROTATION" && w !== "SCALE" && g.geometry.setAttribute(w, c[w]);
        Tt.prototype.copy.call(y, g), this.parser.assignFinalMaterial(y), d.push(y);
      }
      return l.isGroup ? (l.clear(), l.add(...d), l) : d[0];
    }));
  }
}
const tn = "glTF", De = 12, gr = { JSON: 1313821514, BIN: 5130562 };
class bc {
  constructor(e) {
    this.name = I.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const r = new DataView(e, 0, De);
    if (this.header = {
      magic: He(new Uint8Array(e.slice(0, 4))),
      version: r.getUint32(4, !0),
      length: r.getUint32(8, !0)
    }, this.header.magic !== tn)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const n = this.header.length - De, i = new DataView(e, De);
    let o = 0;
    for (; o < n; ) {
      const s = i.getUint32(o, !0);
      o += 4;
      const a = i.getUint32(o, !0);
      if (o += 4, a === gr.JSON) {
        const c = new Uint8Array(e, De + o, s);
        this.content = He(c);
      } else if (a === gr.BIN) {
        const c = De + o;
        this.body = e.slice(c, c + s);
      }
      o += s;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Bc {
  constructor(e, r) {
    if (!r)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = I.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = r, this.dracoLoader.preload();
  }
  decodePrimitive(e, r) {
    const n = this.json, i = this.dracoLoader, o = e.extensions[this.name].bufferView, s = e.extensions[this.name].attributes, a = {}, c = {}, u = {};
    for (const l in s) {
      const f = wt[l] || l.toLowerCase();
      a[f] = s[l];
    }
    for (const l in e.attributes) {
      const f = wt[l] || l.toLowerCase();
      if (s[l] !== void 0) {
        const h = n.accessors[e.attributes[l]], d = we[h.componentType];
        u[f] = d.name, c[f] = h.normalized === !0;
      }
    }
    return r.getDependency("bufferView", o).then(function(l) {
      return new Promise(function(f, h) {
        i.decodeDracoFile(
          l,
          function(d) {
            for (const g in d.attributes) {
              const p = d.attributes[g], v = c[g];
              v !== void 0 && (p.normalized = v);
            }
            f(d);
          },
          a,
          u,
          X,
          h
        );
      });
    });
  }
}
class Ic {
  constructor() {
    this.name = I.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, r) {
    return (r.texCoord === void 0 || r.texCoord === e.channel) && r.offset === void 0 && r.rotation === void 0 && r.scale === void 0 || (e = e.clone(), r.texCoord !== void 0 && (e.channel = r.texCoord), r.offset !== void 0 && e.offset.fromArray(r.offset), r.rotation !== void 0 && (e.rotation = r.rotation), r.scale !== void 0 && e.repeat.fromArray(r.scale), e.needsUpdate = !0), e;
  }
}
class Sc {
  constructor() {
    this.name = I.KHR_MESH_QUANTIZATION;
  }
}
class rn extends ti {
  constructor(e, r, n, i) {
    super(e, r, n, i);
  }
  copySampleValue_(e) {
    const r = this.resultBuffer, n = this.sampleValues, i = this.valueSize, o = e * i * 3 + i;
    for (let s = 0; s !== i; s++)
      r[s] = n[o + s];
    return r;
  }
  interpolate_(e, r, n, i) {
    const o = this.resultBuffer, s = this.sampleValues, a = this.valueSize, c = a * 2, u = a * 3, l = i - r, f = (n - r) / l, h = f * f, d = h * f, g = e * u, p = g - u, v = -2 * d + 3 * h, m = d - h, x = 1 - v, y = m - h + f;
    for (let w = 0; w !== a; w++) {
      const C = s[p + w + a], E = s[p + w + c] * l, T = s[g + w + a], D = s[g + w] * l;
      o[w] = x * C + y * E + v * T + m * D;
    }
    return o;
  }
}
const Rc = new Rr();
class Mc extends rn {
  interpolate_(e, r, n, i) {
    const o = super.interpolate_(e, r, n, i);
    return Rc.fromArray(o).normalize().toArray(o), o;
  }
}
const G = {
  FLOAT: 5126,
  //FLOAT_MAT2: 35674,
  FLOAT_MAT3: 35675,
  FLOAT_MAT4: 35676,
  FLOAT_VEC2: 35664,
  FLOAT_VEC3: 35665,
  FLOAT_VEC4: 35666,
  LINEAR: 9729,
  REPEAT: 10497,
  SAMPLER_2D: 35678,
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
  UNSIGNED_BYTE: 5121,
  UNSIGNED_SHORT: 5123
}, we = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, pr = {
  9728: Re,
  9729: Q,
  9984: Xn,
  9985: jn,
  9986: Kn,
  9987: Pr
}, mr = {
  33071: Jn,
  33648: qn,
  10497: pt
}, lt = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, wt = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  // uv => uv1, 4 uv channels
  // https://github.com/mrdoob/three.js/pull/25943
  // https://github.com/mrdoob/three.js/pull/25788
  ...ic >= 152 ? {
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv1",
    TEXCOORD_2: "uv2",
    TEXCOORD_3: "uv3"
  } : {
    TEXCOORD_0: "uv",
    TEXCOORD_1: "uv2"
  },
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, Z = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, Pc = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Lr,
  STEP: Zn
}, ut = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function _c(t) {
  return t.DefaultMaterial === void 0 && (t.DefaultMaterial = new _r({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: Qe
  })), t.DefaultMaterial;
}
function ne(t, e, r) {
  for (const n in r.extensions)
    t[n] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[n] = r.extensions[n]);
}
function Y(t, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(t.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Lc(t, e, r) {
  let n = !1, i = !1, o = !1;
  for (let u = 0, l = e.length; u < l; u++) {
    const f = e[u];
    if (f.POSITION !== void 0 && (n = !0), f.NORMAL !== void 0 && (i = !0), f.COLOR_0 !== void 0 && (o = !0), n && i && o)
      break;
  }
  if (!n && !i && !o)
    return Promise.resolve(t);
  const s = [], a = [], c = [];
  for (let u = 0, l = e.length; u < l; u++) {
    const f = e[u];
    if (n) {
      const h = f.POSITION !== void 0 ? r.getDependency("accessor", f.POSITION) : t.attributes.position;
      s.push(h);
    }
    if (i) {
      const h = f.NORMAL !== void 0 ? r.getDependency("accessor", f.NORMAL) : t.attributes.normal;
      a.push(h);
    }
    if (o) {
      const h = f.COLOR_0 !== void 0 ? r.getDependency("accessor", f.COLOR_0) : t.attributes.color;
      c.push(h);
    }
  }
  return Promise.all([
    Promise.all(s),
    Promise.all(a),
    Promise.all(c)
  ]).then(function(u) {
    const l = u[0], f = u[1], h = u[2];
    return n && (t.morphAttributes.position = l), i && (t.morphAttributes.normal = f), o && (t.morphAttributes.color = h), t.morphTargetsRelative = !0, t;
  });
}
function Oc(t, e) {
  if (t.updateMorphTargets(), e.weights !== void 0)
    for (let r = 0, n = e.weights.length; r < n; r++)
      t.morphTargetInfluences[r] = e.weights[r];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const r = e.extras.targetNames;
    if (t.morphTargetInfluences.length === r.length) {
      t.morphTargetDictionary = {};
      for (let n = 0, i = r.length; n < i; n++)
        t.morphTargetDictionary[r[n]] = n;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function kc(t) {
  let e;
  const r = t.extensions && t.extensions[I.KHR_DRACO_MESH_COMPRESSION];
  if (r ? e = "draco:" + r.bufferView + ":" + r.indices + ":" + ft(r.attributes) : e = t.indices + ":" + ft(t.attributes) + ":" + t.mode, t.targets !== void 0)
    for (let n = 0, i = t.targets.length; n < i; n++)
      e += ":" + ft(t.targets[n]);
  return e;
}
function ft(t) {
  let e = "";
  const r = Object.keys(t).sort();
  for (let n = 0, i = r.length; n < i; n++)
    e += r[n] + ":" + t[r[n]] + ";";
  return e;
}
function xt(t) {
  switch (t) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function Fc(t) {
  return t.search(/\.jpe?g($|\?)/i) > 0 || t.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : t.search(/\.webp($|\?)/i) > 0 || t.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const Nc = new Oe();
class Hc {
  constructor(e = {}, r = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = r, this.cache = new ac(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1, i = !1, o = -1;
    typeof navigator < "u" && typeof navigator.userAgent < "u" && (n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0, i = navigator.userAgent.indexOf("Firefox") > -1, o = i ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), typeof createImageBitmap > "u" || n || i && o < 98 ? this.textureLoader = new Mr(this.options.manager) : this.textureLoader = new Mn(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Le(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, r) {
    const n = this, i = this.json, o = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(s) {
      return s._markDefs && s._markDefs();
    }), Promise.all(
      this._invokeAll(function(s) {
        return s.beforeRoot && s.beforeRoot();
      })
    ).then(function() {
      return Promise.all([
        n.getDependencies("scene"),
        n.getDependencies("animation"),
        n.getDependencies("camera")
      ]);
    }).then(function(s) {
      const a = {
        scene: s[0][i.scene || 0],
        scenes: s[0],
        animations: s[1],
        cameras: s[2],
        asset: i.asset,
        parser: n,
        userData: {}
      };
      return ne(o, a, i), Y(a, i), Promise.all(
        n._invokeAll(function(c) {
          return c.afterRoot && c.afterRoot(a);
        })
      ).then(function() {
        for (const c of a.scenes)
          c.updateMatrixWorld();
        e(a);
      });
    }).catch(r);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const e = this.json.nodes || [], r = this.json.skins || [], n = this.json.meshes || [];
    for (let i = 0, o = r.length; i < o; i++) {
      const s = r[i].joints;
      for (let a = 0, c = s.length; a < c; a++)
        e[s[a]].isBone = !0;
    }
    for (let i = 0, o = e.length; i < o; i++) {
      const s = e[i];
      s.mesh !== void 0 && (this._addNodeRef(this.meshCache, s.mesh), s.skin !== void 0 && (n[s.mesh].isSkinnedMesh = !0)), s.camera !== void 0 && this._addNodeRef(this.cameraCache, s.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(e, r) {
    r !== void 0 && (e.refs[r] === void 0 && (e.refs[r] = e.uses[r] = 0), e.refs[r]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(e, r, n) {
    if (e.refs[r] <= 1)
      return n;
    const i = n.clone(), o = (s, a) => {
      const c = this.associations.get(s);
      c != null && this.associations.set(a, c);
      for (const [u, l] of s.children.entries())
        o(l, a.children[u]);
    };
    return o(n, i), i.name += "_instance_" + e.uses[r]++, i;
  }
  _invokeOne(e) {
    const r = Object.values(this.plugins);
    r.push(this);
    for (let n = 0; n < r.length; n++) {
      const i = e(r[n]);
      if (i)
        return i;
    }
    return null;
  }
  _invokeAll(e) {
    const r = Object.values(this.plugins);
    r.unshift(this);
    const n = [];
    for (let i = 0; i < r.length; i++) {
      const o = e(r[i]);
      o && n.push(o);
    }
    return n;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(e, r) {
    const n = e + ":" + r;
    let i = this.cache.get(n);
    if (!i) {
      switch (e) {
        case "scene":
          i = this.loadScene(r);
          break;
        case "node":
          i = this._invokeOne(function(o) {
            return o.loadNode && o.loadNode(r);
          });
          break;
        case "mesh":
          i = this._invokeOne(function(o) {
            return o.loadMesh && o.loadMesh(r);
          });
          break;
        case "accessor":
          i = this.loadAccessor(r);
          break;
        case "bufferView":
          i = this._invokeOne(function(o) {
            return o.loadBufferView && o.loadBufferView(r);
          });
          break;
        case "buffer":
          i = this.loadBuffer(r);
          break;
        case "material":
          i = this._invokeOne(function(o) {
            return o.loadMaterial && o.loadMaterial(r);
          });
          break;
        case "texture":
          i = this._invokeOne(function(o) {
            return o.loadTexture && o.loadTexture(r);
          });
          break;
        case "skin":
          i = this.loadSkin(r);
          break;
        case "animation":
          i = this._invokeOne(function(o) {
            return o.loadAnimation && o.loadAnimation(r);
          });
          break;
        case "camera":
          i = this.loadCamera(r);
          break;
        default:
          if (i = this._invokeOne(function(o) {
            return o != this && o.getDependency && o.getDependency(e, r);
          }), !i)
            throw new Error("Unknown type: " + e);
          break;
      }
      this.cache.add(n, i);
    }
    return i;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(e) {
    let r = this.cache.get(e);
    if (!r) {
      const n = this, i = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      r = Promise.all(
        i.map(function(o, s) {
          return n.getDependency(e, s);
        })
      ), this.cache.add(e, r);
    }
    return r;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(e) {
    const r = this.json.buffers[e], n = this.fileLoader;
    if (r.type && r.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + r.type + " buffer type is not supported.");
    if (r.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[I.KHR_BINARY_GLTF].body);
    const i = this.options;
    return new Promise(function(o, s) {
      n.load(Be.resolveURL(r.uri, i.path), o, void 0, function() {
        s(new Error('THREE.GLTFLoader: Failed to load buffer "' + r.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(e) {
    const r = this.json.bufferViews[e];
    return this.getDependency("buffer", r.buffer).then(function(n) {
      const i = r.byteLength || 0, o = r.byteOffset || 0;
      return n.slice(o, o + i);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(e) {
    const r = this, n = this.json, i = this.json.accessors[e];
    if (i.bufferView === void 0 && i.sparse === void 0) {
      const s = lt[i.type], a = we[i.componentType], c = i.normalized === !0, u = new a(i.count * s);
      return Promise.resolve(new P(u, s, c));
    }
    const o = [];
    return i.bufferView !== void 0 ? o.push(this.getDependency("bufferView", i.bufferView)) : o.push(null), i.sparse !== void 0 && (o.push(this.getDependency("bufferView", i.sparse.indices.bufferView)), o.push(this.getDependency("bufferView", i.sparse.values.bufferView))), Promise.all(o).then(function(s) {
      const a = s[0], c = lt[i.type], u = we[i.componentType], l = u.BYTES_PER_ELEMENT, f = l * c, h = i.byteOffset || 0, d = i.bufferView !== void 0 ? n.bufferViews[i.bufferView].byteStride : void 0, g = i.normalized === !0;
      let p, v;
      if (d && d !== f) {
        const m = Math.floor(h / d), x = "InterleavedBuffer:" + i.bufferView + ":" + i.componentType + ":" + m + ":" + i.count;
        let y = r.cache.get(x);
        y || (p = new u(a, m * d, i.count * d / l), y = new Pn(p, d / l), r.cache.add(x, y)), v = new _n(
          y,
          c,
          h % d / l,
          g
        );
      } else
        a === null ? p = new u(i.count * c) : p = new u(a, h, i.count * c), v = new P(p, c, g);
      if (i.sparse !== void 0) {
        const m = lt.SCALAR, x = we[i.sparse.indices.componentType], y = i.sparse.indices.byteOffset || 0, w = i.sparse.values.byteOffset || 0, C = new x(
          s[1],
          y,
          i.sparse.count * m
        ), E = new u(s[2], w, i.sparse.count * c);
        a !== null && (v = new P(
          v.array.slice(),
          v.itemSize,
          v.normalized
        ));
        for (let T = 0, D = C.length; T < D; T++) {
          const b = C[T];
          if (v.setX(b, E[T * c]), c >= 2 && v.setY(b, E[T * c + 1]), c >= 3 && v.setZ(b, E[T * c + 2]), c >= 4 && v.setW(b, E[T * c + 3]), c >= 5)
            throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
      }
      return v;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(e) {
    const r = this.json, n = this.options, o = r.textures[e].source, s = r.images[o];
    let a = this.textureLoader;
    if (s.uri) {
      const c = n.manager.getHandler(s.uri);
      c !== null && (a = c);
    }
    return this.loadTextureImage(e, o, a);
  }
  loadTextureImage(e, r, n) {
    const i = this, o = this.json, s = o.textures[e], a = o.images[r], c = (a.uri || a.bufferView) + ":" + s.sampler;
    if (this.textureCache[c])
      return this.textureCache[c];
    const u = this.loadImageSource(r, n).then(function(l) {
      l.flipY = !1, l.name = s.name || a.name || "", l.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (l.name = a.uri);
      const h = (o.samplers || {})[s.sampler] || {};
      return l.magFilter = pr[h.magFilter] || Q, l.minFilter = pr[h.minFilter] || Pr, l.wrapS = mr[h.wrapS] || pt, l.wrapT = mr[h.wrapT] || pt, i.associations.set(l, { textures: e }), l;
    }).catch(function() {
      return null;
    });
    return this.textureCache[c] = u, u;
  }
  loadImageSource(e, r) {
    const n = this, i = this.json, o = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((f) => f.clone());
    const s = i.images[e], a = self.URL || self.webkitURL;
    let c = s.uri || "", u = !1;
    if (s.bufferView !== void 0)
      c = n.getDependency("bufferView", s.bufferView).then(function(f) {
        u = !0;
        const h = new Blob([f], { type: s.mimeType });
        return c = a.createObjectURL(h), c;
      });
    else if (s.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const l = Promise.resolve(c).then(function(f) {
      return new Promise(function(h, d) {
        let g = h;
        r.isImageBitmapLoader === !0 && (g = function(p) {
          const v = new ce(p);
          v.needsUpdate = !0, h(v);
        }), r.load(Be.resolveURL(f, o.path), g, void 0, d);
      });
    }).then(function(f) {
      return u === !0 && a.revokeObjectURL(c), Y(f, s), f.userData.mimeType = s.mimeType || Fc(s.uri), f;
    }).catch(function(f) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", c), f;
    });
    return this.sourceCache[e] = l, l;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(e, r, n, i) {
    const o = this;
    return this.getDependency("texture", n.index).then(function(s) {
      if (!s)
        return null;
      if (n.texCoord !== void 0 && n.texCoord > 0 && (s = s.clone(), s.channel = n.texCoord), o.extensions[I.KHR_TEXTURE_TRANSFORM]) {
        const a = n.extensions !== void 0 ? n.extensions[I.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const c = o.associations.get(s);
          s = o.extensions[I.KHR_TEXTURE_TRANSFORM].extendTexture(s, a), o.associations.set(s, c);
        }
      }
      return i !== void 0 && (typeof i == "number" && (i = i === hr ? oe : X), "colorSpace" in s ? s.colorSpace = i : s.encoding = i === oe ? hr : sc), e[r] = s, s;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(e) {
    const r = e.geometry;
    let n = e.material;
    const i = r.attributes.tangent === void 0, o = r.attributes.color !== void 0, s = r.attributes.normal === void 0;
    if (e.isPoints) {
      const a = "PointsMaterial:" + n.uuid;
      let c = this.cache.get(a);
      c || (c = new Ln(), ae.prototype.copy.call(c, n), c.color.copy(n.color), c.map = n.map, c.sizeAttenuation = !1, this.cache.add(a, c)), n = c;
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + n.uuid;
      let c = this.cache.get(a);
      c || (c = new On(), ae.prototype.copy.call(c, n), c.color.copy(n.color), c.map = n.map, this.cache.add(a, c)), n = c;
    }
    if (i || o || s) {
      let a = "ClonedMaterial:" + n.uuid + ":";
      i && (a += "derivative-tangents:"), o && (a += "vertex-colors:"), s && (a += "flat-shading:");
      let c = this.cache.get(a);
      c || (c = n.clone(), o && (c.vertexColors = !0), s && (c.flatShading = !0), i && (c.normalScale && (c.normalScale.y *= -1), c.clearcoatNormalScale && (c.clearcoatNormalScale.y *= -1)), this.cache.add(a, c), this.associations.set(c, this.associations.get(n))), n = c;
    }
    e.material = n;
  }
  getMaterialType() {
    return _r;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const r = this, n = this.json, i = this.extensions, o = n.materials[e];
    let s;
    const a = {}, c = o.extensions || {}, u = [];
    if (c[I.KHR_MATERIALS_UNLIT]) {
      const f = i[I.KHR_MATERIALS_UNLIT];
      s = f.getMaterialType(), u.push(f.extendParams(a, o, r));
    } else {
      const f = o.pbrMetallicRoughness || {};
      if (a.color = new N(1, 1, 1), a.opacity = 1, Array.isArray(f.baseColorFactor)) {
        const h = f.baseColorFactor;
        a.color.setRGB(h[0], h[1], h[2], X), a.opacity = h[3];
      }
      f.baseColorTexture !== void 0 && u.push(r.assignTexture(a, "map", f.baseColorTexture, oe)), a.metalness = f.metallicFactor !== void 0 ? f.metallicFactor : 1, a.roughness = f.roughnessFactor !== void 0 ? f.roughnessFactor : 1, f.metallicRoughnessTexture !== void 0 && (u.push(r.assignTexture(a, "metalnessMap", f.metallicRoughnessTexture)), u.push(r.assignTexture(a, "roughnessMap", f.metallicRoughnessTexture))), s = this._invokeOne(function(h) {
        return h.getMaterialType && h.getMaterialType(e);
      }), u.push(
        Promise.all(
          this._invokeAll(function(h) {
            return h.extendMaterialParams && h.extendMaterialParams(e, a);
          })
        )
      );
    }
    o.doubleSided === !0 && (a.side = be);
    const l = o.alphaMode || ut.OPAQUE;
    if (l === ut.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, l === ut.MASK && (a.alphaTest = o.alphaCutoff !== void 0 ? o.alphaCutoff : 0.5)), o.normalTexture !== void 0 && s !== se && (u.push(r.assignTexture(a, "normalMap", o.normalTexture)), a.normalScale = new F(1, 1), o.normalTexture.scale !== void 0)) {
      const f = o.normalTexture.scale;
      a.normalScale.set(f, f);
    }
    if (o.occlusionTexture !== void 0 && s !== se && (u.push(r.assignTexture(a, "aoMap", o.occlusionTexture)), o.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = o.occlusionTexture.strength)), o.emissiveFactor !== void 0 && s !== se) {
      const f = o.emissiveFactor;
      a.emissive = new N().setRGB(
        f[0],
        f[1],
        f[2],
        X
      );
    }
    return o.emissiveTexture !== void 0 && s !== se && u.push(r.assignTexture(a, "emissiveMap", o.emissiveTexture, oe)), Promise.all(u).then(function() {
      const f = new s(a);
      return o.name && (f.name = o.name), Y(f, o), r.associations.set(f, { materials: e }), o.extensions && ne(i, f, o), f;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(e) {
    const r = kn.sanitizeNodeName(e || "");
    return r in this.nodeNamesUsed ? r + "_" + ++this.nodeNamesUsed[r] : (this.nodeNamesUsed[r] = 0, r);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(e) {
    const r = this, n = this.extensions, i = this.primitiveCache;
    function o(a) {
      return n[I.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, r).then(function(c) {
        return Ar(c, a, r);
      });
    }
    const s = [];
    for (let a = 0, c = e.length; a < c; a++) {
      const u = e[a], l = kc(u), f = i[l];
      if (f)
        s.push(f.promise);
      else {
        let h;
        u.extensions && u.extensions[I.KHR_DRACO_MESH_COMPRESSION] ? h = o(u) : h = Ar(new de(), u, r), i[l] = { primitive: u, promise: h }, s.push(h);
      }
    }
    return Promise.all(s);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(e) {
    const r = this, n = this.json, i = this.extensions, o = n.meshes[e], s = o.primitives, a = [];
    for (let c = 0, u = s.length; c < u; c++) {
      const l = s[c].material === void 0 ? _c(this.cache) : this.getDependency("material", s[c].material);
      a.push(l);
    }
    return a.push(r.loadGeometries(s)), Promise.all(a).then(function(c) {
      const u = c.slice(0, c.length - 1), l = c[c.length - 1], f = [];
      for (let d = 0, g = l.length; d < g; d++) {
        const p = l[d], v = s[d];
        let m;
        const x = u[d];
        if (v.mode === G.TRIANGLES || v.mode === G.TRIANGLE_STRIP || v.mode === G.TRIANGLE_FAN || v.mode === void 0)
          m = o.isSkinnedMesh === !0 ? new Fn(p, x) : new k(p, x), m.isSkinnedMesh === !0 && m.normalizeSkinWeights(), v.mode === G.TRIANGLE_STRIP ? m.geometry = dr(m.geometry, Ir) : v.mode === G.TRIANGLE_FAN && (m.geometry = dr(m.geometry, gt));
        else if (v.mode === G.LINES)
          m = new Nn(p, x);
        else if (v.mode === G.LINE_STRIP)
          m = new Hn(p, x);
        else if (v.mode === G.LINE_LOOP)
          m = new Gn(p, x);
        else if (v.mode === G.POINTS)
          m = new Un(p, x);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + v.mode);
        Object.keys(m.geometry.morphAttributes).length > 0 && Oc(m, o), m.name = r.createUniqueName(o.name || "mesh_" + e), Y(m, o), v.extensions && ne(i, m, v), r.assignFinalMaterial(m), f.push(m);
      }
      for (let d = 0, g = f.length; d < g; d++)
        r.associations.set(f[d], {
          meshes: e,
          primitives: d
        });
      if (f.length === 1)
        return o.extensions && ne(i, f[0], o), f[0];
      const h = new me();
      o.extensions && ne(i, h, o), r.associations.set(h, { meshes: e });
      for (let d = 0, g = f.length; d < g; d++)
        h.add(f[d]);
      return h;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(e) {
    let r;
    const n = this.json.cameras[e], i = n[n.type];
    if (!i) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return n.type === "perspective" ? r = new Et(
      zn.radToDeg(i.yfov),
      i.aspectRatio || 1,
      i.znear || 1,
      i.zfar || 2e6
    ) : n.type === "orthographic" && (r = new Qn(-i.xmag, i.xmag, i.ymag, -i.ymag, i.znear, i.zfar)), n.name && (r.name = this.createUniqueName(n.name)), Y(r, n), Promise.resolve(r);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const r = this.json.skins[e], n = [];
    for (let i = 0, o = r.joints.length; i < o; i++)
      n.push(this._loadNodeShallow(r.joints[i]));
    return r.inverseBindMatrices !== void 0 ? n.push(this.getDependency("accessor", r.inverseBindMatrices)) : n.push(null), Promise.all(n).then(function(i) {
      const o = i.pop(), s = i, a = [], c = [];
      for (let u = 0, l = s.length; u < l; u++) {
        const f = s[u];
        if (f) {
          a.push(f);
          const h = new Oe();
          o !== null && h.fromArray(o.array, u * 16), c.push(h);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', r.joints[u]);
      }
      return new Wn(a, c);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const r = this.json, n = this, i = r.animations[e], o = i.name ? i.name : "animation_" + e, s = [], a = [], c = [], u = [], l = [];
    for (let f = 0, h = i.channels.length; f < h; f++) {
      const d = i.channels[f], g = i.samplers[d.sampler], p = d.target, v = p.node, m = i.parameters !== void 0 ? i.parameters[g.input] : g.input, x = i.parameters !== void 0 ? i.parameters[g.output] : g.output;
      p.node !== void 0 && (s.push(this.getDependency("node", v)), a.push(this.getDependency("accessor", m)), c.push(this.getDependency("accessor", x)), u.push(g), l.push(p));
    }
    return Promise.all([
      Promise.all(s),
      Promise.all(a),
      Promise.all(c),
      Promise.all(u),
      Promise.all(l)
    ]).then(function(f) {
      const h = f[0], d = f[1], g = f[2], p = f[3], v = f[4], m = [];
      for (let x = 0, y = h.length; x < y; x++) {
        const w = h[x], C = d[x], E = g[x], T = p[x], D = v[x];
        if (w === void 0)
          continue;
        w.updateMatrix && w.updateMatrix();
        const b = n._createAnimationTracks(w, C, E, T, D);
        if (b)
          for (let M = 0; M < b.length; M++)
            m.push(b[M]);
      }
      return new Yn(o, void 0, m);
    });
  }
  createNodeMesh(e) {
    const r = this.json, n = this, i = r.nodes[e];
    return i.mesh === void 0 ? null : n.getDependency("mesh", i.mesh).then(function(o) {
      const s = n._getNodeRef(n.meshCache, i.mesh, o);
      return i.weights !== void 0 && s.traverse(function(a) {
        if (a.isMesh)
          for (let c = 0, u = i.weights.length; c < u; c++)
            a.morphTargetInfluences[c] = i.weights[c];
      }), s;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(e) {
    const r = this.json, n = this, i = r.nodes[e], o = n._loadNodeShallow(e), s = [], a = i.children || [];
    for (let u = 0, l = a.length; u < l; u++)
      s.push(n.getDependency("node", a[u]));
    const c = i.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", i.skin);
    return Promise.all([o, Promise.all(s), c]).then(function(u) {
      const l = u[0], f = u[1], h = u[2];
      h !== null && l.traverse(function(d) {
        d.isSkinnedMesh && d.bind(h, Nc);
      });
      for (let d = 0, g = f.length; d < g; d++)
        l.add(f[d]);
      return l;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const r = this.json, n = this.extensions, i = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const o = r.nodes[e], s = o.name ? i.createUniqueName(o.name) : "", a = [], c = i._invokeOne(function(u) {
      return u.createNodeMesh && u.createNodeMesh(e);
    });
    return c && a.push(c), o.camera !== void 0 && a.push(
      i.getDependency("camera", o.camera).then(function(u) {
        return i._getNodeRef(i.cameraCache, o.camera, u);
      })
    ), i._invokeAll(function(u) {
      return u.createNodeAttachment && u.createNodeAttachment(e);
    }).forEach(function(u) {
      a.push(u);
    }), this.nodeCache[e] = Promise.all(a).then(function(u) {
      let l;
      if (o.isBone === !0 ? l = new Vn() : u.length > 1 ? l = new me() : u.length === 1 ? l = u[0] : l = new Tt(), l !== u[0])
        for (let f = 0, h = u.length; f < h; f++)
          l.add(u[f]);
      if (o.name && (l.userData.name = o.name, l.name = s), Y(l, o), o.extensions && ne(n, l, o), o.matrix !== void 0) {
        const f = new Oe();
        f.fromArray(o.matrix), l.applyMatrix4(f);
      } else
        o.translation !== void 0 && l.position.fromArray(o.translation), o.rotation !== void 0 && l.quaternion.fromArray(o.rotation), o.scale !== void 0 && l.scale.fromArray(o.scale);
      return i.associations.has(l) || i.associations.set(l, {}), i.associations.get(l).nodes = e, l;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const r = this.extensions, n = this.json.scenes[e], i = this, o = new me();
    n.name && (o.name = i.createUniqueName(n.name)), Y(o, n), n.extensions && ne(r, o, n);
    const s = n.nodes || [], a = [];
    for (let c = 0, u = s.length; c < u; c++)
      a.push(i.getDependency("node", s[c]));
    return Promise.all(a).then(function(c) {
      for (let l = 0, f = c.length; l < f; l++)
        o.add(c[l]);
      const u = (l) => {
        const f = /* @__PURE__ */ new Map();
        for (const [h, d] of i.associations)
          (h instanceof ae || h instanceof ce) && f.set(h, d);
        return l.traverse((h) => {
          const d = i.associations.get(h);
          d != null && f.set(h, d);
        }), f;
      };
      return i.associations = u(o), o;
    });
  }
  _createAnimationTracks(e, r, n, i, o) {
    const s = [], a = e.name ? e.name : e.uuid, c = [];
    Z[o.path] === Z.weights ? e.traverse(function(h) {
      h.morphTargetInfluences && c.push(h.name ? h.name : h.uuid);
    }) : c.push(a);
    let u;
    switch (Z[o.path]) {
      case Z.weights:
        u = Ht;
        break;
      case Z.rotation:
        u = Gt;
        break;
      case Z.position:
      case Z.scale:
        u = Nt;
        break;
      default:
        switch (n.itemSize) {
          case 1:
            u = Ht;
            break;
          case 2:
          case 3:
          default:
            u = Nt;
            break;
        }
        break;
    }
    const l = i.interpolation !== void 0 ? Pc[i.interpolation] : Lr, f = this._getArrayFromAccessor(n);
    for (let h = 0, d = c.length; h < d; h++) {
      const g = new u(
        c[h] + "." + Z[o.path],
        r.array,
        f,
        l
      );
      i.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(g), s.push(g);
    }
    return s;
  }
  _getArrayFromAccessor(e) {
    let r = e.array;
    if (e.normalized) {
      const n = xt(r.constructor), i = new Float32Array(r.length);
      for (let o = 0, s = r.length; o < s; o++)
        i[o] = r[o] * n;
      r = i;
    }
    return r;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(n) {
      const i = this instanceof Gt ? Mc : rn;
      return new i(this.times, this.values, this.getValueSize() / 3, n);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function Gc(t, e, r) {
  const n = e.attributes, i = new $n();
  if (n.POSITION !== void 0) {
    const a = r.json.accessors[n.POSITION], c = a.min, u = a.max;
    if (c !== void 0 && u !== void 0) {
      if (i.set(new pe(c[0], c[1], c[2]), new pe(u[0], u[1], u[2])), a.normalized) {
        const l = xt(we[a.componentType]);
        i.min.multiplyScalar(l), i.max.multiplyScalar(l);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const o = e.targets;
  if (o !== void 0) {
    const a = new pe(), c = new pe();
    for (let u = 0, l = o.length; u < l; u++) {
      const f = o[u];
      if (f.POSITION !== void 0) {
        const h = r.json.accessors[f.POSITION], d = h.min, g = h.max;
        if (d !== void 0 && g !== void 0) {
          if (c.setX(Math.max(Math.abs(d[0]), Math.abs(g[0]))), c.setY(Math.max(Math.abs(d[1]), Math.abs(g[1]))), c.setZ(Math.max(Math.abs(d[2]), Math.abs(g[2]))), h.normalized) {
            const p = xt(we[h.componentType]);
            c.multiplyScalar(p);
          }
          a.max(c);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    i.expandByVector(a);
  }
  t.boundingBox = i;
  const s = new ei();
  i.getCenter(s.center), s.radius = i.min.distanceTo(i.max) / 2, t.boundingSphere = s;
}
function Ar(t, e, r) {
  const n = e.attributes, i = [];
  function o(s, a) {
    return r.getDependency("accessor", s).then(function(c) {
      t.setAttribute(a, c);
    });
  }
  for (const s in n) {
    const a = wt[s] || s.toLowerCase();
    a in t.attributes || i.push(o(n[s], a));
  }
  if (e.indices !== void 0 && !t.index) {
    const s = r.getDependency("accessor", e.indices).then(function(a) {
      t.setIndex(a);
    });
    i.push(s);
  }
  return Y(t, e), Gc(t, e, r), Promise.all(i).then(function() {
    return e.targets !== void 0 ? Lc(t, e.targets, r) : t;
  });
}
const dt = /* @__PURE__ */ new WeakMap();
class Uc extends We {
  constructor(e) {
    super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
      position: "POSITION",
      normal: "NORMAL",
      color: "COLOR",
      uv: "TEX_COORD"
    }, this.defaultAttributeTypes = {
      position: "Float32Array",
      normal: "Float32Array",
      color: "Float32Array",
      uv: "Float32Array"
    };
  }
  setDecoderPath(e) {
    return this.decoderPath = e, this;
  }
  setDecoderConfig(e) {
    return this.decoderConfig = e, this;
  }
  setWorkerLimit(e) {
    return this.workerLimit = e, this;
  }
  load(e, r, n, i) {
    const o = new Le(this.manager);
    o.setPath(this.path), o.setResponseType("arraybuffer"), o.setRequestHeader(this.requestHeader), o.setWithCredentials(this.withCredentials), o.load(
      e,
      (s) => {
        const a = {
          attributeIDs: this.defaultAttributeIDs,
          attributeTypes: this.defaultAttributeTypes,
          useUniqueIDs: !1
        };
        this.decodeGeometry(s, a).then(r).catch(i);
      },
      n,
      i
    );
  }
  /** @deprecated Kept for backward-compatibility with previous DRACOLoader versions. */
  decodeDracoFile(e, r, n, i) {
    const o = {
      attributeIDs: n || this.defaultAttributeIDs,
      attributeTypes: i || this.defaultAttributeTypes,
      useUniqueIDs: !!n
    };
    this.decodeGeometry(e, o).then(r);
  }
  decodeGeometry(e, r) {
    for (const c in r.attributeTypes) {
      const u = r.attributeTypes[c];
      u.BYTES_PER_ELEMENT !== void 0 && (r.attributeTypes[c] = u.name);
    }
    const n = JSON.stringify(r);
    if (dt.has(e)) {
      const c = dt.get(e);
      if (c.key === n)
        return c.promise;
      if (e.byteLength === 0)
        throw new Error(
          "THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred."
        );
    }
    let i;
    const o = this.workerNextTaskID++, s = e.byteLength, a = this._getWorker(o, s).then((c) => (i = c, new Promise((u, l) => {
      i._callbacks[o] = { resolve: u, reject: l }, i.postMessage({ type: "decode", id: o, taskConfig: r, buffer: e }, [e]);
    }))).then((c) => this._createGeometry(c.geometry));
    return a.catch(() => !0).then(() => {
      i && o && this._releaseTask(i, o);
    }), dt.set(e, {
      key: n,
      promise: a
    }), a;
  }
  _createGeometry(e) {
    const r = new de();
    e.index && r.setIndex(new P(e.index.array, 1));
    for (let n = 0; n < e.attributes.length; n++) {
      const i = e.attributes[n], o = i.name, s = i.array, a = i.itemSize;
      r.setAttribute(o, new P(s, a));
    }
    return r;
  }
  _loadLibrary(e, r) {
    const n = new Le(this.manager);
    return n.setPath(this.decoderPath), n.setResponseType(r), n.setWithCredentials(this.withCredentials), new Promise((i, o) => {
      n.load(e, i, void 0, o);
    });
  }
  preload() {
    return this._initDecoder(), this;
  }
  _initDecoder() {
    if (this.decoderPending)
      return this.decoderPending;
    const e = typeof WebAssembly != "object" || this.decoderConfig.type === "js", r = [];
    return e ? r.push(this._loadLibrary("draco_decoder.js", "text")) : (r.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), r.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(r).then((n) => {
      const i = n[0];
      e || (this.decoderConfig.wasmBinary = n[1]);
      const o = zc.toString(), s = [
        "/* draco decoder */",
        i,
        "",
        "/* worker */",
        o.substring(o.indexOf("{") + 1, o.lastIndexOf("}"))
      ].join(`
`);
      this.workerSourceURL = URL.createObjectURL(new Blob([s]));
    }), this.decoderPending;
  }
  _getWorker(e, r) {
    return this._initDecoder().then(() => {
      if (this.workerPool.length < this.workerLimit) {
        const i = new Worker(this.workerSourceURL);
        i._callbacks = {}, i._taskCosts = {}, i._taskLoad = 0, i.postMessage({ type: "init", decoderConfig: this.decoderConfig }), i.onmessage = function(o) {
          const s = o.data;
          switch (s.type) {
            case "decode":
              i._callbacks[s.id].resolve(s);
              break;
            case "error":
              i._callbacks[s.id].reject(s);
              break;
            default:
              console.error('THREE.DRACOLoader: Unexpected message, "' + s.type + '"');
          }
        }, this.workerPool.push(i);
      } else
        this.workerPool.sort(function(i, o) {
          return i._taskLoad > o._taskLoad ? -1 : 1;
        });
      const n = this.workerPool[this.workerPool.length - 1];
      return n._taskCosts[e] = r, n._taskLoad += r, n;
    });
  }
  _releaseTask(e, r) {
    e._taskLoad -= e._taskCosts[r], delete e._callbacks[r], delete e._taskCosts[r];
  }
  debug() {
    console.log(
      "Task load: ",
      this.workerPool.map((e) => e._taskLoad)
    );
  }
  dispose() {
    for (let e = 0; e < this.workerPool.length; ++e)
      this.workerPool[e].terminate();
    return this.workerPool.length = 0, this;
  }
}
function zc() {
  let t, e;
  onmessage = function(s) {
    const a = s.data;
    switch (a.type) {
      case "init":
        t = a.decoderConfig, e = new Promise(function(l) {
          t.onModuleLoaded = function(f) {
            l({ draco: f });
          }, DracoDecoderModule(t);
        });
        break;
      case "decode":
        const c = a.buffer, u = a.taskConfig;
        e.then((l) => {
          const f = l.draco, h = new f.Decoder(), d = new f.DecoderBuffer();
          d.Init(new Int8Array(c), c.byteLength);
          try {
            const g = r(f, h, d, u), p = g.attributes.map((v) => v.array.buffer);
            g.index && p.push(g.index.array.buffer), self.postMessage({ type: "decode", id: a.id, geometry: g }, p);
          } catch (g) {
            console.error(g), self.postMessage({ type: "error", id: a.id, error: g.message });
          } finally {
            f.destroy(d), f.destroy(h);
          }
        });
        break;
    }
  };
  function r(s, a, c, u) {
    const l = u.attributeIDs, f = u.attributeTypes;
    let h, d;
    const g = a.GetEncodedGeometryType(c);
    if (g === s.TRIANGULAR_MESH)
      h = new s.Mesh(), d = a.DecodeBufferToMesh(c, h);
    else if (g === s.POINT_CLOUD)
      h = new s.PointCloud(), d = a.DecodeBufferToPointCloud(c, h);
    else
      throw new Error("THREE.DRACOLoader: Unexpected geometry type.");
    if (!d.ok() || h.ptr === 0)
      throw new Error("THREE.DRACOLoader: Decoding failed: " + d.error_msg());
    const p = { index: null, attributes: [] };
    for (const v in l) {
      const m = self[f[v]];
      let x, y;
      if (u.useUniqueIDs)
        y = l[v], x = a.GetAttributeByUniqueId(h, y);
      else {
        if (y = a.GetAttributeId(h, s[l[v]]), y === -1)
          continue;
        x = a.GetAttribute(h, y);
      }
      p.attributes.push(i(s, a, h, v, m, x));
    }
    return g === s.TRIANGULAR_MESH && (p.index = n(s, a, h)), s.destroy(h), p;
  }
  function n(s, a, c) {
    const l = c.num_faces() * 3, f = l * 4, h = s._malloc(f);
    a.GetTrianglesUInt32Array(c, f, h);
    const d = new Uint32Array(s.HEAPF32.buffer, h, l).slice();
    return s._free(h), { array: d, itemSize: 1 };
  }
  function i(s, a, c, u, l, f) {
    const h = f.num_components(), g = c.num_points() * h, p = g * l.BYTES_PER_ELEMENT, v = o(s, l), m = s._malloc(p);
    a.GetAttributeDataArrayForAllPoints(c, f, v, p, m);
    const x = new l(s.HEAPF32.buffer, m, g).slice();
    return s._free(m), {
      name: u,
      array: x,
      itemSize: h
    };
  }
  function o(s, a) {
    switch (a) {
      case Float32Array:
        return s.DT_FLOAT32;
      case Int8Array:
        return s.DT_INT8;
      case Int16Array:
        return s.DT_INT16;
      case Int32Array:
        return s.DT_INT32;
      case Uint8Array:
        return s.DT_UINT8;
      case Uint16Array:
        return s.DT_UINT16;
      case Uint32Array:
        return s.DT_UINT32;
    }
  }
}
function Qc(t) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", t);
}
class nn extends We {
  loadAsyncWithAbort(e, r, n) {
    const i = this;
    return new Promise(function(o, s) {
      i.load(e, o, n, s, r);
    });
  }
  load(e, r, n, i, o, s = 5e3) {
    this.path !== void 0 && (e = this.path + e);
    const a = this, c = Ut.get(e);
    if (c !== void 0)
      return a.manager.itemStart(e), setTimeout(function() {
        r && r(c), a.manager.itemEnd(e);
      }, 0), c;
    const u = window.setTimeout(() => {
      o == null || o.abort(), d(new Error("TimeoutError"));
    }, s), l = Qc("img");
    function f() {
      h(), Ut.add(e, this), r && r(this), a.manager.itemEnd(e);
    }
    function h() {
      l.removeEventListener("load", f, !1), l.removeEventListener("error", d, !1), o == null || o.signal.removeEventListener("abort", g, !1), window.clearTimeout(u);
    }
    function d(p, v) {
      h(), i && i(p, v), a.manager.itemError(e), a.manager.itemEnd(e);
    }
    function g() {
      l.src = "", l.remove();
    }
    return o && (o.signal.onabort = g), fetch(e, { signal: o == null ? void 0 : o.signal }).then((p) => p.blob()).then((p) => {
      o != null && o.signal.aborted || (l.addEventListener("load", f, !1), l.addEventListener("error", d, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (l.crossOrigin = this.crossOrigin), a.manager.itemStart(e), l.src = window.URL.createObjectURL(p));
    }).catch((p) => {
      d(p, !p.name || p.name === "AbortError"), h();
    }), l;
  }
}
class Wc extends We {
  loadAsyncWithAbort(e, r, n) {
    const i = this;
    return new Promise(function(o, s) {
      i.load(e, o, n, s, r);
    });
  }
  load(e, r, n, i, o) {
    const s = new ce(), a = new nn(this.manager);
    return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(
      e,
      function(c) {
        s.image = c, s.needsUpdate = !0, r !== void 0 && r(s);
      },
      n,
      i,
      o
    ), s;
  }
}
const Yc = new Mr(), Vc = new Wc();
new ri();
const Xc = new nn(), jc = /* @__PURE__ */ (() => {
  let t;
  return () => {
    if (t) return t;
    t = new oc();
    const e = new Uc();
    return e.setWorkerLimit(Mt), e.setDecoderPath(
      "https://unpkg.com/three@0.170.0/examples/jsm/libs/draco/gltf/"
    ), t.setDRACOLoader(e), t;
  };
})();
function Kc(t, e, r) {
  if (t.point)
    return Jc(t.point);
  if (t.billboard)
    return qc(t.billboard);
  if (t.model)
    return Zc(t.model, e);
  if (t.polyline)
    return $c(t.polyline, e, r);
  if (t.polygon)
    return el(t.polygon, e, r);
}
async function Jc(t) {
  const e = new Or({
    color: t.material.color,
    depthTest: t.material.depth_test,
    sizeAttenuation: !t.material.scale_by_distance,
    visible: t.material.show
  });
  e.userData.uPickable = {
    value: 0
  };
  const r = t.geometry.batch_id ?? 0;
  e.onBeforeCompile = (i) => {
    i.uniforms.nvr_uBatchId = { value: r }, i.uniforms.nvr_uPickable = e.userData.uPickable, i.vertexShader = i.vertexShader.replace(
      "uniform vec2 center;",
      `
uniform vec2 center;
out vec2 sprite_uv;
`
    ).replace(
      "gl_Position = projectionMatrix * mvPosition;",
      `
gl_Position = projectionMatrix * mvPosition;
sprite_uv = position.xy;
`
    ), i.fragmentShader = i.fragmentShader.replace(
      "uniform float opacity;",
      `
uniform float opacity;
${jr}
in vec2 sprite_uv;
${so}
${Ve}
`
    ).replace(
      "#include <fog_fragment>",
      `
#include <fog_fragment>
float alpha = nvr_circle_alpha(sprite_uv);
if (alpha == 0.) {
  discard;
}

gl_FragColor.a = alpha;

if (nvr_uPickable > 0.0 && alpha > 0.0) {
  vec3 pickColor = nvr_batchIdToColor(nvr_uBatchId);
  gl_FragColor = vec4(pickColor.xyz, 1.0);
}
`
    );
  };
  const n = new le(e);
  return t.material.center && n.center.set(t.material.center.x, t.material.center.y), n.userData.batchId = r, n.userData.isPicked = !1, n.userData.orgColor = t.material.color, n;
}
async function qc(t) {
  if (!t.material.url) return;
  const e = await Yc.loadAsync(t.material.url), r = new Or({
    map: e,
    color: t.material.color,
    sizeAttenuation: !t.material.scale_by_distance,
    depthTest: t.material.depth_test,
    visible: t.material.show
  }), n = t.geometry.batch_id ?? 0;
  r.userData.uPickable = {
    value: 0
  }, r.onBeforeCompile = (o) => {
    o.uniforms.nvr_uBatchId = { value: n }, o.uniforms.nvr_uPickable = r.userData.uPickable, o.fragmentShader = o.fragmentShader.replace(
      "#include <clipping_planes_pars_fragment>",
      `
        #include <clipping_planes_pars_fragment>
        ${jr}
        ${Ve}
      `
    ).replace(
      "#include <fog_fragment>",
      `
        #include <fog_fragment>
        if (nvr_uPickable > 0.0 && sampledDiffuseColor.a > 0.0) {
          vec3 pickColor = nvr_batchIdToColor(nvr_uBatchId);
          gl_FragColor = vec4(pickColor.xyz, 1.0);
        }
        `
    );
  };
  const i = new le(r);
  return t.material.center && i.center.set(t.material.center.x, t.material.center.y), i.userData.batchId = n, i.userData.isPicked = !1, i.userData.orgColor = t.material.color, i;
}
async function Zc(t, e) {
  const r = jc(), n = await (async () => {
    if (t.bin) {
      const o = e.u8(t.bin);
      if (!o)
        return;
      const s = await r.parseAsync(o.buffer, "");
      return o.set([]), s.scene;
    } else
      return t.material.url ? (await r.loadAsync(t.material.url)).scene : void 0;
  })();
  if (!n)
    return;
  n.userData.batchId = 0, $a(t.geometry.global_batch_ids) && (n.userData.batchId = e.u32(t.geometry.global_batch_ids));
  let i = t.geometry.global_batch_ids ? e.u32(t.geometry.global_batch_ids) : void 0;
  if (i = i ?? new Uint32Array(1), n.userData.batchId) {
    const o = function(s) {
      var a, c, u, l;
      if (s instanceof k) {
        const f = (c = (a = s.geometry.attributes) == null ? void 0 : a.position) == null ? void 0 : c.count, h = new Float32Array(f).fill(0), d = new Float32Array(f).fill(i[0]), g = (l = (u = s.geometry.attributes) == null ? void 0 : u._batchid) == null ? void 0 : l.array;
        if (g)
          for (let p = 0; p < g.length; p++) {
            const v = g[p];
            d[p] = i[v] ?? 0;
          }
        s.geometry.setAttribute(
          "batchId",
          new P(d, 1)
        ), s.geometry.setAttribute(
          "isPicked",
          new P(h, 1)
        ), s.material.userData.uPickable = {
          value: 0
        }, s.material.userData.uHighlightColor = {
          value: new N(0)
        }, s.material.onBeforeCompile = (p) => {
          p.uniforms.nvr_uHighlightColor = s.material.userData.uHighlightColor, p.uniforms.nvr_uPickable = s.material.userData.uPickable, p.vertexShader = p.vertexShader.replace(
            "void main() {",
            `
              attribute float isPicked;
              attribute float batchId;
              out float nvr_vBatchId;
              out float nvr_vIsPicked;
              void main() {
              nvr_vIsPicked = isPicked;
              nvr_vBatchId = batchId;
              `
          ), p.fragmentShader = p.fragmentShader.replace(
            "void main() {",
            `
              uniform vec3 nvr_uHighlightColor;
              uniform float nvr_uPickable;
              in float nvr_vIsPicked;
              in float nvr_vBatchId;
              ${Ve}
              void main() {
              `
          ).replace(
            "vec4 diffuseColor = vec4( diffuse, opacity );",
            `
              vec4 diffuseColor = vec4( diffuse, opacity );
              if(nvr_vIsPicked > 0.0) {
                diffuseColor = vec4(nvr_uHighlightColor.xyz, 1.0);
              }
              `
          ).replace(
            "#include <dithering_fragment>",
            `
              #include <dithering_fragment>

              if (nvr_uPickable > 0.0 && diffuseColor.a > 0.0) {
                vec3 pickColor = nvr_batchIdToColor(nvr_vBatchId);
                gl_FragColor = vec4(pickColor.xyz, 1.0);
              }
              `
          );
        };
      }
      Array.isArray(s.children) && s.children.length > 0 && s.children.forEach((f) => {
        o(f);
      });
    };
    o(n);
  }
  return n.visible = t.material.show ?? !0, n;
}
async function $c(t, e, r) {
  var C;
  const n = t.geometry, i = e.f32(n.position.data), o = e.f32(n.start.data), s = e.f32(n.forward_offset.data), a = e.f32(n.start_normals.data), c = e.f32(
    n.end_normal_and_texture_coordinate_normalization_x.data
  ), u = e.f32(
    n.right_normal_and_texture_coordinate_normalization_y.data
  ), l = e.u32(n.indices), f = n.batch_id ? e.f32(n.batch_id.data) : void 0, h = n.batch_id ? n.batch_id.size : 1;
  if (!i || !o || !s || !a || !c || !u || !l || !f)
    return;
  const d = new de();
  d.setAttribute(
    "position",
    new P(i, n.position.size)
  ), d.setAttribute("start", new P(o, n.start.size)), d.setAttribute(
    "forward_offset",
    new P(s, n.forward_offset.size)
  ), d.setAttribute(
    "start_normal",
    new P(a, n.start_normals.size)
  ), d.setAttribute(
    "end_normal_and_texture_coordinate_normalization_x",
    new P(
      c,
      n.end_normal_and_texture_coordinate_normalization_x.size
    )
  ), d.setAttribute(
    "right_normal_and_texture_coordinate_normalization_y",
    new P(
      u,
      n.right_normal_and_texture_coordinate_normalization_y.size
    )
  );
  const g = new Float32Array(i.length / n.position.size).fill(0);
  d.setAttribute("isPicked", new P(g, 1)), d.setAttribute("batchId", new P(f, h)), d.setIndex(new P(l, 1));
  const [p, v] = ((C = t.material.__internal__) == null ? void 0 : C.min_max_heights) ?? [0, 0], m = {
    value: 0
  }, x = {
    value: new N(0)
  }, y = new fe({
    uniforms: {
      ...ni.lights,
      minMaxHeightAndWidth: {
        value: [p, v, t.material.width]
      },
      color: { value: new N(t.material.color) },
      useGroundNormals: { value: !!t.material.use_ground_normals },
      viewportAndPixelRatio: r.viewportAndPixelRatio,
      frustumNearFar: r.frustumNearFar,
      frustumRatio: r.frustumRatio,
      tGlobeDepth: r.tGlobeDepth,
      uGlobeNormal: r.tGlobeNormal,
      inverseProjectionMatrix: r.inverseProjectionMatrix,
      nvr_uPickable: m,
      nvr_uHighlightColor: x
    },
    vertexShader: ao,
    fragmentShader: t.material.clamp_to_ground ? io : oo,
    // fragmentShader: PolylineFragShader,
    depthTest: !1,
    visible: t.material.show,
    lights: !0
  });
  y.userData.uPickable = m, y.userData.uHighlightColor = x;
  const w = new k(d, y);
  return w.userData.batchId = f, w.userData.batchIdSize = h, w;
}
async function el(t, e, r) {
  var v;
  const n = t.geometry, i = e.f32(n.position.data), o = n.normal ? e.f32(n.normal.data) : void 0, s = n.scale_normal_and_cap ? e.f32(n.scale_normal_and_cap.data) : void 0, a = e.u32(n.indices), c = n.batch_id ? e.f32(n.batch_id.data) : void 0, u = n.batch_id ? n.batch_id.size : 1;
  if (!i || !a || !c) return;
  const l = new de();
  l.setAttribute(
    "position",
    new P(i, n.position.size)
  ), n.normal && o && l.setAttribute("normal", new P(o, n.normal.size)), n.scale_normal_and_cap && s && l.setAttribute(
    "scaleNormalAndCap",
    new P(s, n.scale_normal_and_cap.size)
  );
  const f = new Float32Array(i.length / n.position.size).fill(0);
  l.setAttribute("isPicked", new P(f, 1)), l.setAttribute("batchId", new P(c, u)), l.setIndex(new P(a, 1));
  const h = t.material.clamp_to_ground, d = new yt({
    color: t.material.color,
    wireframe: t.material.wireframe,
    stencilWrite: !1,
    colorWrite: !h,
    depthWrite: !h,
    depthTest: !h,
    reflectivity: 0
  }), g = (v = t.material.__internal__) == null ? void 0 : v.min_max_heights;
  d.userData.uMinMaxHeight = {
    value: g
  }, d.userData.uClampToGround = {
    value: h
  }, d.userData.useGroundNormals = {
    value: !!t.material.use_ground_normals
  }, d.userData.uPickable = {
    value: 0
  }, d.userData.uHighlightColor = {
    value: new N(0)
  }, d.onBeforeCompile = (m) => {
    m.uniforms.uGlobeNormal = r.tGlobeNormal, m.uniforms.nvr_uPickable = d.userData.uPickable, m.uniforms.useGroundNormals = d.userData.useGroundNormals, d.userData.uMinMaxHeight.value && (m.uniforms.uMinMaxHeight = d.userData.uMinMaxHeight), d.userData.uClampToGround.value != null && (m.uniforms.uClampToGround = d.userData.uClampToGround), m.uniforms.nvr_uHighlightColor = d.userData.uHighlightColor, m.vertexShader = m.vertexShader.replace(
      "#include <common>",
      `
#include <common>
attribute float isPicked;
attribute float batchId;
in vec4 scaleNormalAndCap;

uniform vec2 uMinMaxHeight;
out float nvr_vBatchId;
out float nvr_vIsPicked;

${no}
`
    ).replace(
      "#include <begin_vertex>",
      `
#include <begin_vertex>
transformed.xyz += scaleNormalAndCap.xyz * nvr_branchFreeTernary(scaleNormalAndCap.w == 0.0, uMinMaxHeight.x, uMinMaxHeight.y);
nvr_vIsPicked = isPicked;
nvr_vBatchId = batchId;
`
    ), m.fragmentShader = m.fragmentShader.replace(
      "uniform vec3 diffuse;",
      `
uniform vec3 diffuse;
uniform bool uClampToGround;
uniform bool useGroundNormals;
uniform sampler2D uGlobeNormal;
uniform vec3 nvr_uHighlightColor;
uniform float nvr_uPickable;
in float nvr_vIsPicked;
in float nvr_vBatchId;
${Ve}
`
    ).replace(
      "#include <normal_fragment_maps>",
      `
if(uClampToGround) {
  vec2 uv = gl_FragCoord.xy / vec2(textureSize(uGlobeNormal, 0));
  vec3 mapN = unpackRGBToNormal(texture2D( uGlobeNormal, uv ).xyz);
  // TODO: Support scaling normal. It's used to emphasis the shadow.
  // mapN.xy *= scaledNormal;
  normal = normalize( mapN );
} else {
 #include <normal_fragment_maps>
}
`
    ).replace(
      "vec4 diffuseColor = vec4( diffuse, opacity );",
      `
vec4 diffuseColor = vec4( diffuse, opacity );
if(nvr_vIsPicked > 0.0) {
  diffuseColor.xyz = nvr_uHighlightColor.xyz;
}
`
    ).replace(
      "vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;",
      `
vec3 outgoingLight;
if(uClampToGround && !useGroundNormals) {
  // Without lighting
  outgoingLight = diffuseColor.xyz;
} else {
  outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
}
`
    ).replace(
      "#include <dithering_fragment>",
      `
#include <dithering_fragment>
if (nvr_uPickable > 0.0 && diffuseColor.a > 0.0) {
  vec3 pickColor = nvr_batchIdToColor(nvr_vBatchId);
  gl_FragColor = vec4(pickColor.xyz, 1.0);
}
`
    );
  };
  const p = new k(l, d);
  return p.userData.draped = h, p.userData.batchId = c, p.userData.batchIdSize = u, p;
}
var tl = `precision highp float;
precision highp int;

layout(location = 0) out vec4 gNormal;

uniform sampler2D tDiffuse;
uniform vec2 repeat;
uniform float logDepthBufFC;

in vec3 vNormal;
in float vDepth;

#include <packing>

void main() {
    
    gNormal = vec4(packNormalToRGB(normalize(vNormal)), 0.0 );

    
    gl_FragDepth = log2( vDepth ) * logDepthBufFC * 0.5;
}`, rl = `in vec3 position;
in vec3 normal;

out vec3 vNormal;
out float vDepth;
out vec4 vPosition;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    vec3 transformedNormal = normalMatrix * normal;
    vNormal = normalize(transformedNormal);

    gl_Position = projectionMatrix * mvPosition;

    vPosition = gl_Position;

    vDepth = 1.0 + gl_Position.w;
}`;
function nl(t) {
  var e;
  return [
    nc(t, ["attributes", "index", "boundingBox", "boundingSphere"]),
    [
      ...Object.values(t.attributes).map(
        (r) => r.array.buffer
      ),
      (e = t.index) == null ? void 0 : e.array.buffer
    ].filter(hi)
  ];
}
function il(t, e = new de()) {
  for (const [r, n] of Object.entries(t.attributes))
    e.setAttribute(
      r,
      new P(
        n.array,
        n.itemSize,
        n.normalized
      )
    );
  return e.index = t.index != null ? new P(
    t.index.array,
    t.index.itemSize,
    t.index.normalized
  ) : null, e.boundingBox = t.boundingBox, e.boundingSphere = t.boundingSphere, e;
}
async function sl(t, e) {
  const [r, n] = nl(t), i = await Ee(
    "toCreasedNormals",
    [r, e],
    { transfer: n }
  );
  return il(i, t);
}
async function ol(t, e, r, n, i, o) {
  await cl(
    t,
    e,
    n,
    i,
    L(r),
    r.mesh,
    r.material,
    r.transform,
    o
  );
}
function al(t, e) {
  const r = L(e), n = t.get(Ct(r)), i = t.get(Dt(r));
  !n || !i || !(n instanceof k) || !(i instanceof k) || !(n.material instanceof ae) || !(i.material instanceof ae) || (n.visible = !!e.material.show && e.mesh.active, i.visible = !!e.material.show && e.mesh.active);
}
async function cl(t, e, r, n, i, o, s, a, c) {
  let u = r.f32(o.vertices), l = r.u32(o.indices);
  if (!u || !l) return;
  let f = new de();
  f.setAttribute("position", new P(u, 3)), u.set([]), u = null;
  let h = r.f32(o.uvs);
  h && (f.setAttribute("uv", new P(h, 2)), h.set([]), h = null), f.setIndex(new P(l, 1)), l.set([]), l = null, s.should_compute_normal_from_vertex && (f = await sl(f, Math.PI / 3));
  const d = ul(s, n, c), g = new k(f, d);
  g.visible = !1, g.renderOrder = o.render_order, g.name = `tile_${i}`, a && ll(g, a), t.globe.add(g), e.set(Ct(i), g);
  const p = new ii({
    vertexShader: rl,
    fragmentShader: tl,
    glslVersion: si
  }), v = new k(f, p);
  return v.visible = !1, t.globeGBuffer.add(v), e.set(Dt(i), v), g;
}
function ll(t, e) {
  const { tx: r, ty: n, tz: i, qx: o, qy: s, qz: a, qw: c, sx: u, sy: l, sz: f } = e;
  t.position.set(r, n, i), t.quaternion.set(o, s, a, c), t.scale.set(u, l, f);
}
function ul(t, e, r) {
  var o;
  const n = t.opacity != null && t.opacity !== 1;
  if (t.wireframe)
    return new se({
      color: t.color,
      opacity: t.opacity,
      transparent: n,
      wireframe: !0,
      stencilWrite: !1
    });
  const i = t.should_compute_normal_from_vertex ? new yt({
    color: t.color,
    stencilWrite: !1,
    opacity: t.opacity,
    transparent: n
  }) : new se({
    color: t.color,
    opacity: t.opacity,
    transparent: n,
    stencilWrite: !1
  });
  if ((o = t.__internal__) != null && o.texture_fragment) {
    const s = L(
      t.__internal__.texture_fragment
    ), a = e.get(s);
    a && (a.colorSpace = z, a.minFilter = r.minFilter, a.magFilter = r.magFilter, a.anisotropy = r.maxAnisotropy, a.generateMipmaps = r.useMipmaps, a.needsUpdate = !0, i.map = a);
  }
  return i;
}
function fl(t, e) {
  return Ee(
    "constructPolygonBatchedFeature",
    [t, e],
    {
      transfer: [
        t.batch_ids.buffer,
        t.expected_winding_orders.buffer,
        t.holes.buffer,
        t.holes_boundaries.buffer,
        t.holes_sizes.buffer,
        t.holes_total_sizes.buffer,
        t.outer_ring.buffer,
        t.outer_ring_sizes.buffer
      ]
    }
  );
}
function dl(t, e) {
  return Ee(
    "constructPolylineBatchedFeature",
    [t, e],
    {
      transfer: [
        t.points.buffer,
        t.points_sizes.buffer,
        t.batch_ids.buffer
      ]
    }
  );
}
function hl(t, e, r, n) {
  return Ee(
    "constructTerrainMesh",
    [t, e, r, n],
    { transfer: [t.buffer, n.coords.buffer] }
  );
}
function gl(t, e, r, n) {
  return Ee(
    "upsampleTerrainMesh",
    [t, e, r, n],
    {
      transfer: [
        n.uvs.buffer,
        n.heights.buffer,
        n.indices.buffer
      ]
    }
  );
}
async function pl(t, e, r, n, i, o) {
  const s = L(t);
  if (t.task.construct_terrain_mesh)
    return await ml(
      s,
      t.bits,
      t.task.construct_terrain_mesh,
      t.task.delegator_id,
      e,
      r,
      i,
      o
    );
  if (t.task.upsample_terrain_mesh)
    return await Al(
      s,
      t.bits,
      t.task.upsample_terrain_mesh,
      t.task.delegator_id,
      e,
      r,
      i,
      o
    );
  if (t.task.construct_polygon_batched_feature)
    return await vl(
      s,
      t.bits,
      t.task.construct_polygon_batched_feature,
      t.task.delegator_id,
      e,
      n,
      i,
      o
    );
  if (t.task.construct_polyline_batched_feature)
    return await wl(
      s,
      t.bits,
      t.task.construct_polyline_batched_feature,
      t.task.delegator_id,
      e,
      n,
      i,
      o
    );
}
async function vr(t, e) {
  const r = L(t), n = e.get(r);
  n && (await n.cancel(), e.delete(r));
}
async function ml(t, e, r, n, i, o, s, a) {
  const c = i.u8(r.bytes_handle);
  if (!c)
    return;
  const u = (() => {
    const C = o.getMartini(r.martini_id);
    if (!C) return;
    const E = new Bt(
      C.transfer_coords(),
      C.size
    );
    return C.free(), E;
  })();
  if (!u)
    return;
  const l = o.getTile(r.tile_handle);
  if (!l)
    return;
  const f = o.getTileElevationDecoder(
    r.tile_handle
  );
  if (!f)
    return;
  const h = hl(
    c,
    new mt(l),
    new Gr(f),
    u
  );
  a.set(t, h);
  const { result: d } = await h;
  if (a.delete(t), !s.hasWorkerTask(n[0])) return;
  const g = i.newF32(d.vertices), p = i.newF32(d.uvs), v = i.newU32(d.indices), m = i.newF32(d.heights);
  if (!g || !p || !v || !m)
    return;
  const x = new Er(g, p, v), y = new ln(
    x,
    m,
    d.min_height,
    d.max_height
  ), w = Ge.withConstructTerrainMesh(
    n,
    y
  );
  s.triggerWorkerTaskCompleted(e, w);
}
async function Al(t, e, r, n, i, o, s, a) {
  const c = o.getTile(r.tile_handle);
  if (!c)
    return;
  const u = o.getParentTile(r.tile_handle);
  if (!u)
    return;
  const l = u.cached_mesh_handle;
  if (!l || !l.heights)
    return;
  const f = i.f32(l.uvs), h = i.u32(l.indices), d = i.f32(l.heights);
  if (!f || !h || !d)
    return;
  const g = o.getTileElevationDecoder(
    r.tile_handle
  );
  if (!g)
    return;
  const p = new mi(
    f,
    h,
    d
  ), v = gl(
    new mt(c),
    new mt(u),
    new Gr(g),
    p
  );
  a.set(t, v);
  const m = await v;
  if (a.delete(t), !s.hasWorkerTask(n[0])) return;
  const x = i.newF32(m.vertices), y = i.newF32(m.uvs), w = i.newU32(m.indices), C = i.newF32(m.heights);
  if (!x || !y || !w || !C)
    return;
  const E = new Er(x, y, w), T = new un(
    E,
    C,
    m.min_height,
    m.max_height
  ), D = Ge.withUpsampleTerrainMesh(
    n,
    T
  );
  s.triggerWorkerTaskCompleted(e, D);
}
async function vl(t, e, r, n, i, o, s, a) {
  const c = o.getTransferablePolygonBatchedFeature(
    r.batched_feature[0]
  );
  if (!c) return;
  const u = fl(
    new vi(c),
    new wi(c.material)
  );
  a.set(t, u);
  const l = await u;
  if (a.delete(t), !l || !l.batch_id || !l.scale_normal_and_cap || !s.hasWorkerTask(n[0])) return;
  const f = i.newF32(l.batch_id), h = l.normal ? i.newF32(l.normal) : void 0, d = i.newF32(l.position), g = i.newF32(l.scale_normal_and_cap), p = i.newU32(l.indices);
  if (!f || !d || !g || !p)
    return;
  const v = new U(
    f,
    l.batch_id_size ?? 0
  ), m = h ? new U(h, l.normal_size ?? 0) : void 0, x = new U(
    d,
    l.position_size
  ), y = new U(
    g,
    l.scale_normal_and_cap_size ?? 0
  ), w = new fn(
    x,
    m,
    y,
    v,
    p
  ), C = new dn(
    w,
    new Tr(
      l.extent.west,
      l.extent.south,
      l.extent.east,
      l.extent.north
    )
  ), E = Ge.withConstructPolygonBatchedFeature(
    n,
    C
  );
  s.triggerWorkerTaskCompleted(e, E);
}
async function wl(t, e, r, n, i, o, s, a) {
  const c = o.getTransferablePolylineBatchedFeature(
    r.batched_feature[0]
  );
  if (!c) return;
  const u = dl(
    new xi(c),
    new Ei(c.material)
  );
  a.set(t, u);
  const l = await u;
  if (a.delete(t), c.free(), !l || !l.batch_id || !s.hasWorkerTask(n[0])) return;
  const f = i.newF32(l.position), h = i.newF32(l.start), d = i.newF32(l.start_normals), g = i.newF32(l.forward_offset), p = i.newF32(
    l.end_normal_and_texture_coordinate_normalization_x
  ), v = i.newF32(
    l.right_normal_and_texture_coordinate_normalization_y
  ), m = i.newF32(l.batch_id), x = i.newU32(l.indices);
  if (!m || !f || !h || !d || !g || !p || !v || !x)
    return;
  const y = new U(
    m,
    l.batch_id_size ?? 0
  ), w = new U(
    f,
    l.position_size
  ), C = new U(
    h,
    l.start_size
  ), E = new U(
    d,
    l.start_normals_size
  ), T = new U(
    g,
    l.forward_offset_size
  ), D = new U(
    p,
    l.end_normal_and_texture_coordinate_normalization_x_size
  ), b = new U(
    v,
    l.right_normal_and_texture_coordinate_normalization_y_size
  ), M = new hn(
    w,
    C,
    T,
    E,
    D,
    b,
    y,
    x
  ), S = new gn(
    M,
    new Tr(
      l.extent.west,
      l.extent.south,
      l.extent.east,
      l.extent.north
    )
  ), H = Ge.withConstructPolylineBatchedFeature(
    n,
    S
  );
  s.triggerWorkerTaskCompleted(e, H);
}
function xl(t, e, r, n, i, o, s, a, c, u, l, f, h, d, g, p, v) {
  t.pushEvents(d), t.forEachStack(
    "camera_transform_updated",
    (m) => El(r, m)
  ), t.forEachStack(
    "object_transform_updated",
    (m) => Tl(n, m)
  ), t.processTransactionEvents(
    "meshEvent",
    {
      add: {
        key: "mesh_added"
      },
      remove: {
        key: "mesh_removed",
        // This process is not heavy for now, so we can process it infinitely.
        max: 1 / 0
      },
      change: {
        key: "mesh_updated",
        // This process is not heavy for now, so we can process it infinitely.
        max: 1 / 0
      }
    },
    async ({ type: m, event: x }) => {
      switch (m) {
        case "add":
          await ol(
            e,
            n,
            x,
            o,
            f,
            v
          ), u.setTileMeshPrepared(x.tile_handle);
          break;
        case "remove":
          ht(e.globe, n, x, Ct), ht(
            e.globeGBuffer,
            n,
            x,
            Dt
          );
          break;
        case "change":
          al(n, x);
          break;
      }
    },
    {
      shouldProcess: ({ type: m }) => {
        switch (m) {
          case "add":
            return st();
          case "remove":
            return !0;
          case "change":
            return !0;
        }
      }
    }
  ), t.processTransactionEvents(
    "workerTaskEvent",
    {
      add: {
        key: "worker_task_delegated"
      },
      remove: {
        key: "worker_task_removed",
        max: 1 / 0
      }
    },
    async ({ type: m, event: x }) => {
      switch (m) {
        case "add":
          await pl(
            x,
            o,
            a,
            l,
            c,
            h
          );
          break;
        case "remove":
          await vr(x, h);
          break;
      }
    },
    {
      shouldProcess: ({ type: m }) => {
        switch (m) {
          case "add":
            return st();
          case "remove":
            return !0;
          case "change":
            return !0;
        }
      },
      onAbort: async (m) => {
        await vr(m, h);
      }
    }
  ), t.processTransactionEvents(
    "renderableFeatureEvent",
    {
      add: {
        key: "renderable_feature_added",
        max: Mt
      },
      remove: {
        key: "renderable_feature_removed",
        // This process is not heavy for now, so we can process it infinitely.
        max: 1 / 0
      },
      change: {
        key: "renderable_feature_changed",
        // This process is not heavy for now, so we can process it infinitely.
        max: 1 / 0
      }
    },
    async ({ type: m, event: x }) => {
      switch (m) {
        case "add":
          await bl(
            x,
            e,
            n,
            o,
            g,
            p,
            l
          );
          break;
        case "remove":
          ht(
            e.main,
            n,
            x,
            void 0,
            p
          );
          break;
        case "change":
          Bl(
            x,
            n,
            p
          );
          break;
      }
    },
    {
      shouldProcess: ({ type: m, event: x }) => {
        switch (m) {
          case "add":
            return !0;
          case "remove":
            return !0;
          case "change":
            if (Ie(x)) {
              const y = L(x);
              return n.has(y);
            }
            return !0;
        }
      }
    }
  ), t.processTransactionEvents(
    "textureFragmentEvent",
    {
      add: {
        key: "texture_fragment_requested"
      },
      remove: {
        key: "texture_fragment_removed",
        // This process is not heavy for now, so we can process it infinitely.
        max: 1 / 0
      }
    },
    async ({ type: m, event: x }) => {
      switch (m) {
        case "add":
          await Dl(
            x,
            s,
            Vc,
            f,
            i
          );
          break;
        case "remove":
          xr(x, f, i);
          break;
      }
    },
    {
      onAbort: (m) => {
        xr(m, f, i);
      }
    }
  ), t.processTransactionEvents(
    "dataRequesterEvent",
    {
      add: {
        key: "data_requested"
      },
      remove: {
        key: "data_requester_removed",
        // This process is not heavy for now, so we can process it infinitely.
        max: 1 / 0
      }
    },
    async ({ type: m, event: x }) => {
      switch (m) {
        case "add":
          await Cl(x, o, i);
          break;
        case "remove":
          wr(x, o, i);
          break;
      }
    },
    {
      shouldProcess: ({ type: m }) => {
        switch (m) {
          case "add":
            return st();
          default:
            return !0;
        }
      },
      onAbort: (m) => {
        wr(m, o, i);
      }
    }
  );
}
function El(t, e) {
  e && Ze(t, e);
}
function Tl(t, e) {
  const r = L(e), n = t.get(r);
  n && Ze(n, e.transform);
}
function ht(t, e, r, n, i) {
  let o = L(r);
  n && (o = n(o)), i && i.delete(o);
  const s = e.get(o);
  s && (e.delete(o), s instanceof Tt && yl(s), s.clear(), t.remove(s));
}
function yl(t) {
  t.traverse((e) => {
    if (e instanceof k) {
      const r = e;
      r.geometry && (r.geometry.dispose(), r.geometry.deleteAttribute("position"), r.geometry.deleteAttribute("uv"), r.geometry.deleteAttribute("normal"), r.geometry.index = null), r.material && (Array.isArray(r.material) ? r.material.forEach((n) => {
        n.dispose();
      }) : r.material.dispose());
    } else if (e instanceof le) {
      const r = e;
      r.material && (Array.isArray(r.material) ? r.material.forEach((n) => {
        n.dispose();
      }) : r.material.dispose());
    }
  });
}
async function Cl(t, e, r) {
  const n = L(t), i = (() => {
    const o = r.get(n);
    if (o)
      return o;
    {
      const s = new AbortController();
      return r.set(n, s), s;
    }
  })();
  if (Ti.includes(t.extension)) {
    await Xc.loadAsyncWithAbort(t.url, i).then(async (o) => {
      const s = document.createElement("canvas");
      s.height = o.height, s.width = o.width;
      const a = await ro(
        await createImageBitmap(o),
        s.transferControlToOffscreen()
      );
      if (i.signal.aborted)
        return;
      let c = new Uint8Array(a);
      e.setU8(t.handle, t.bits, c), c.set([]), c = null, a.set([]), o.remove(), s.remove();
    }).catch(() => {
      e.triggerDataRequesterFailed(t.bits);
    }).finally(() => {
      r.delete(n);
    });
    return;
  }
  await fetch(t.url, { signal: i.signal }).then((o) => {
    if (!o.ok) throw new Error();
    return o.arrayBuffer();
  }).then((o) => {
    if (i.signal.aborted)
      return;
    const s = new Uint8Array(o);
    e.setU8(t.handle, t.bits, s), s.set([]);
  }).catch(() => {
    e.triggerDataRequesterFailed(t.bits);
  }).finally(() => {
    r.delete(n);
  });
}
function wr(t, e, r) {
  const n = L(t), i = r.get(n);
  e.remove(t.handle), i == null || i.abort();
}
async function Dl(t, e, r, n, i) {
  const o = L(t);
  if (n.has(o)) return;
  const s = (() => {
    const a = i.get(o);
    if (a)
      return a;
    {
      const c = new AbortController();
      return i.set(o, c), c;
    }
  })();
  await r.loadAsyncWithAbort(t.url, s).then((a) => {
    n.set(o, a), e.triggerTextureFragmentLoaded(
      t.bits,
      Ft.Success
    );
  }).catch(() => {
    e.triggerTextureFragmentLoaded(
      t.bits,
      Ft.Fail
    );
  }).finally(() => {
    i.delete(o);
  });
}
function xr(t, e, r) {
  var o;
  const n = L(t), i = r.get(n);
  (o = e.get(n)) == null || o.dispose(), e.delete(n), i == null || i.abort();
}
async function bl(t, e, r, n, i, o, s) {
  var m;
  const a = L(t), c = await ((m = Kc(t.feature, n, i)) == null ? void 0 : m.then((x) => {
    const y = t.feature, w = (() => {
      if (y.point || y.billboard) return "point";
      if (y.model) return "model";
      if (y.polyline) return "polyline";
      if (y.polygon) return "polygon";
    })();
    return w && s.markFeatureIsRendered(w, t.bits), x;
  }));
  if (!c) return;
  const { point: u, billboard: l, polyline: f, polygon: h, model: d } = t.feature, g = u ?? l ?? f ?? h ?? d, p = g == null ? void 0 : g.transform;
  p && Ze(c, p), Xr(c), c.renderOrder = 1;
  const v = g == null ? void 0 : g.material;
  c.visible = ((v == null ? void 0 : v.show) ?? !0) && !!(g != null && g.active), c.userData.draped || e.main.add(c), r.set(a, c), c.userData.draped && c instanceof k && o.set(a, c.material);
}
function Bl(t, e, r) {
  var d, g, p;
  const n = L(t), i = e.get(n);
  if (!i) return;
  const { point: o, billboard: s, polyline: a, polygon: c, model: u } = t.feature, l = (d = o ?? s ?? a ?? c ?? u) == null ? void 0 : d.transform;
  l && Ze(i, l);
  const f = (g = o ?? s ?? a ?? c ?? u) == null ? void 0 : g.material, h = ((p = o ?? s ?? a ?? c ?? u) == null ? void 0 : p.active) ?? !0;
  f && (i instanceof le && f instanceof pn && Il(i, f, h), i instanceof le && f instanceof mn && Sl(i, f, h), i instanceof me && f instanceof An && Rl(i, f, h), i instanceof k && f instanceof vn && Ml(i, f, h), i instanceof k && f instanceof wn && Pl(i, f, h), i instanceof k && i.userData.draped != null && (i.userData.draped ? r.has(n) || (i.material.stencilWrite = !1, i.material.depthWrite = !1, i.material.depthTest = !1, i.material.colorWrite = !1, r.set(n, i.material)) : (i.material.depthWrite = !0, i.material.depthTest = !0, i.material.stencilWrite = !1, i.material.colorWrite = !0, r.delete(n)))), Xr(i), i.updateMatrix();
}
function Il(t, e, r) {
  t.userData.orgColor = e.color, t.userData.isPicked || t.material.color.set(e.color ?? 0), t.visible = (e.show ?? !0) && r, t.material.sizeAttenuation = !e.scale_by_distance, t.material.needsUpdate = !0;
}
function Sl(t, e, r) {
  t.userData.orgColor = e.color, t.userData.isPicked || t.material.color.set(e.color ?? 0), t.visible = (e.show ?? !0) && r, t.material.sizeAttenuation = !e.scale_by_distance, t.material.needsUpdate = !0;
}
function Rl(t, e, r) {
  t.visible = (e.show ?? !0) && r;
}
function Ml(t, e, r) {
  var n;
  if (t.material instanceof fe) {
    t.material.uniforms.color.value.set(e.color), t.material.uniforms.useGroundNormals.value = !!e.use_ground_normals;
    const [i, o] = ((n = e.__internal__) == null ? void 0 : n.min_max_heights) ?? [
      0,
      0
    ];
    t.material.uniforms.minMaxHeightAndWidth.value = [
      i,
      o,
      e.width
    ], t.visible = (e.show ?? !0) && r;
  }
}
function Pl(t, e, r) {
  var n;
  t.material instanceof yt && (t.material.color.set(e.color ?? 0), t.visible = (e.show ?? !0) && r, t.material.wireframe = e.wireframe ?? !1, t.material.userData.uMinMaxHeight.value = (n = e.__internal__) == null ? void 0 : n.min_max_heights, t.material.userData.useGroundNormals.value = !!e.use_ground_normals, t.material.userData.uClampToGround.value !== e.clamp_to_ground && (t.material.userData.uClampToGround.value = e.clamp_to_ground), t.userData.draped = e.clamp_to_ground);
}
function Ze(t, e) {
  const { tx: r, ty: n, tz: i, qx: o, qy: s, qz: a, qw: c, sx: u, sy: l, sz: f } = e;
  t.position.set(r, n, i), t.quaternion.set(o, s, a, c), t.scale.set(u, l, f);
}
function _l(t, e) {
  const r = (c) => {
    t.input({
      type: "mousedown",
      button: c.button
    });
  }, n = (c) => {
    t.input({
      type: "mouseup",
      button: c.button
    });
  }, i = (c) => {
    const u = e.clientWidth, l = e.clientHeight;
    t.input({
      type: "mousemove",
      x: c.clientX / u,
      y: c.clientY / l
    });
  }, o = (c) => {
    t.input({
      type: "wheel",
      x: c.deltaX,
      y: c.deltaY
    });
  }, s = (c) => {
    t.input({
      type: "keydown",
      key_code: c.code,
      key: c.key
    });
  }, a = (c) => {
    t.input({
      type: "keyup",
      key_code: c.code,
      key: c.key
    });
  };
  return e.addEventListener("mousedown", r), e.addEventListener("mouseup", n), e.addEventListener("mousemove", i), e.addEventListener("wheel", o), document.addEventListener("keydown", s), document.addEventListener("keyup", a), () => {
    e.removeEventListener("mousedown", r), e.removeEventListener("mouseup", n), e.removeEventListener("mousemove", i), e.removeEventListener("wheel", o), document.removeEventListener("keydown", s), document.removeEventListener("keyup", a);
  };
}
class Ll {
  constructor(e, r, n, i, o, s, a, c, u) {
    A(this, "element");
    A(this, "pickingTexture");
    A(this, "pixelBuffer");
    A(this, "renderer");
    A(this, "camera");
    A(this, "scenes");
    A(this, "meshes");
    A(this, "drapedFeatureMaterials");
    A(this, "globeGBufferRenderTarget");
    A(this, "highlightColor");
    A(this, "onPickCallback");
    A(this, "mouseMoved");
    A(this, "mouseDownHandler");
    A(this, "mouseMoveHandler");
    A(this, "mouseUpHandler");
    this.element = e, this.pickingTexture = new te(1, 1, {
      format: zt,
      depthBuffer: !0,
      stencilBuffer: !0
    }), this.pixelBuffer = new Uint8Array(4), this.renderer = r, this.camera = n, this.scenes = i, this.meshes = o, this.drapedFeatureMaterials = s, this.globeGBufferRenderTarget = a, this.highlightColor = c, this.onPickCallback = u, this.mouseMoved = !1, this.mouseDownHandler = (l) => this.onMouseDown(l), this.mouseMoveHandler = (l) => this.onMouseMove(l), this.mouseUpHandler = (l) => this.onMouseUp(l);
  }
  onMouseDown(e) {
    this.mouseMoved = !1;
  }
  onMouseMove(e) {
    this.mouseMoved = !0;
  }
  onMouseUp(e) {
    this.mouseMoved || this.onMouseClick(e);
  }
  enablePick(e) {
    e ? (this.element.addEventListener("mousedown", this.mouseDownHandler), this.element.addEventListener("mousemove", this.mouseMoveHandler), this.element.addEventListener("mouseup", this.mouseUpHandler)) : (this.element.removeEventListener("mousedown", this.mouseDownHandler), this.element.removeEventListener("mousemove", this.mouseMoveHandler), this.element.removeEventListener("mouseup", this.mouseUpHandler));
  }
  traverseModel(e, r) {
    e instanceof k && r(e), Array.isArray(e.children) && e.children.length > 0 && e.children.forEach((n) => {
      this.traverseModel(n, r);
    });
  }
  togglePickable(e) {
    for (const [r, n] of this.meshes)
      n instanceof le && (n.material.userData.uPickable.value = e, n.frustumCulled = e < 0.5), n instanceof k && "uPickable" in n.material.userData && (n.material.userData.uPickable.value = e), n instanceof me && this.traverseModel(n, (i) => {
        "userData" in i.material && (i.material.userData.uPickable.value = e);
      });
  }
  // TODO: Commonize this function with `renderPass.ts`, this class should be extended by `CustomRenderPass`.
  renderDrapedMesh() {
    if (this.drapedFeatureMaterials.size !== 0) {
      const e = this.scenes.drapedFeatures;
      this.drapedFeatureMaterials.forEach((r, n) => {
        r.stencilFunc = kr, r.stencilFail = ke, r.stencilZPass = ke, r.stencilZFail = Fr, r.side = ee, r.colorWrite = !1, r.depthWrite = !1, r.stencilWrite = !0, r.depthTest = !0;
        const i = this.meshes.get(n);
        i && (e.add(i), this.renderer.render(e, this.camera), r.side = Qe, r.stencilZFail = Nr, this.renderer.render(e, this.camera), r.stencilFunc = Hr, r.stencilFail = Ae, r.stencilZFail = Ae, r.stencilZPass = Ae, r.side = ee, r.colorWrite = !0, r.depthTest = !1, this.renderer.render(e, this.camera), e.remove(i), r.colorWrite = !1, r.depthWrite = !1, r.depthTest = !1, r.stencilWrite = !1);
      });
    }
  }
  pickSprite(e, r) {
    const n = r.userData.batchId;
    let i = !1;
    for (let o = 0; o < e.length; o++)
      if (e[o] === n) {
        i = !0, e.splice(o, 1);
        break;
      }
    r.userData.isPicked !== i && (r.userData.isPicked = i, i ? r.material.color.set(this.highlightColor) : r.material.color.setHex(r.userData.orgColor));
  }
  pickModel(e, r) {
    const n = r.userData.batchId;
    if (!(!n || n.length < 1)) {
      this.traverseModel(r, (i) => {
        var s, a;
        const o = (a = (s = i.geometry.attributes) == null ? void 0 : s.isPicked) == null ? void 0 : a.array;
        o && (o.fill(0), i.geometry.attributes.isPicked.needsUpdate = !0), "userData" in i.material && (i.material.userData.uHighlightColor.value = this.highlightColor);
      });
      for (let i = 0; i < e.length; ) {
        let o = !1;
        this.traverseModel(r, (s) => {
          var u, l, f, h;
          const a = (l = (u = s.geometry.attributes) == null ? void 0 : u._batchid) == null ? void 0 : l.array, c = (h = (f = s.geometry.attributes) == null ? void 0 : f.isPicked) == null ? void 0 : h.array;
          if (c) {
            if (a)
              for (let d = 0; d < a.length; d++)
                n[a[d]] === e[i] && (c[d] = 1, o = !0);
            else
              n[0] === e[i] && (c.fill(1), o = !0);
            s.geometry.attributes.isPicked.needsUpdate = !0;
          }
        }), o ? e.splice(i, 1) : i++;
      }
    }
  }
  pickMesh(e, r) {
    const n = r.userData.batchId, i = r.geometry.attributes.isPicked.array;
    i.fill(0), "userData" in r.material && (r.material.userData.uHighlightColor.value = this.highlightColor);
    for (let o = 0; o < e.length; ) {
      let s = !1;
      for (let a = 0; a < n.length; a++)
        n[a] === e[o] && (i[a] = 1, s = !0);
      s ? e.splice(o, 1) : o++;
    }
    r.geometry.attributes.isPicked.needsUpdate = !0;
  }
  toggleHighlight(e) {
    const r = e.slice();
    for (const [n, i] of this.meshes)
      i instanceof le && this.pickSprite(r, i), i instanceof me && i.userData.batchId && this.pickModel(r, i), i instanceof k && i.userData.batchId && this.pickMesh(r, i);
  }
  renderDebugScreen() {
    this.togglePickable(1), this.renderer.setRenderTarget(this.globeGBufferRenderTarget), this.renderer.clear(), this.renderer.render(this.scenes.globeGBuffer, this.camera), this.renderer.setRenderTarget(null), this.renderer.clear(), this.renderer.render(this.scenes.globe, this.camera), this.renderDrapedMesh(), this.renderer.render(this.scenes.main, this.camera), this.togglePickable(0);
  }
  renderDebugFile() {
    const e = this.renderer.getContext().drawingBufferWidth, r = this.renderer.getContext().drawingBufferHeight, n = new te(e, r, {
      format: zt,
      depthBuffer: !0,
      stencilBuffer: !0
    });
    this.camera.setViewOffset(e, r, 0, 0, e, r), this.togglePickable(1), this.renderer.setRenderTarget(this.globeGBufferRenderTarget), this.renderer.clear(), this.renderer.render(this.scenes.globeGBuffer, this.camera), this.renderer.setRenderTarget(n), this.renderer.clear(), this.renderer.render(this.scenes.globe, this.camera), this.renderDrapedMesh(), this.renderer.render(this.scenes.main, this.camera), this.togglePickable(0);
    const i = new Uint8Array(e * r * 4);
    this.renderer.readRenderTargetPixels(
      n,
      0,
      0,
      e,
      r,
      i
    );
    const o = document.createElement("canvas");
    o.width = e, o.height = r;
    const s = o.getContext("2d");
    if (!s) return;
    const a = s.createImageData(e, r);
    a.data.set(i);
    const c = document.createElement("canvas");
    c.width = e, c.height = r;
    const u = c.getContext("2d");
    if (!u) return;
    u.putImageData(a, 0, 0), s.translate(0, o.height), s.scale(1, -1), s.drawImage(c, 0, 0, o.width, o.height);
    const l = o.toDataURL("image/png"), f = document.createElement("a");
    f.href = l, f.download = "render.png", f.click(), n.dispose();
  }
  onMouseClick(e) {
    const r = e.clientX, n = e.clientY, i = this.renderer.getPixelRatio();
    this.camera.setViewOffset(
      this.renderer.getContext().drawingBufferWidth,
      // full width
      this.renderer.getContext().drawingBufferHeight,
      // full top
      r * i | 0,
      // rect x
      n * i | 0,
      // rect y
      1,
      // rect width
      1
      // rect height
    ), this.togglePickable(1), this.renderer.setRenderTarget(this.globeGBufferRenderTarget), this.renderer.clear(), this.renderer.render(this.scenes.globeGBuffer, this.camera), this.renderer.setRenderTarget(this.pickingTexture), this.renderer.clear(), this.renderer.render(this.scenes.globe, this.camera), this.renderDrapedMesh(), this.renderer.render(this.scenes.main, this.camera), this.togglePickable(0), this.renderer.readRenderTargetPixels(
      this.pickingTexture,
      0,
      // x
      0,
      // y
      1,
      // width
      1,
      // height
      this.pixelBuffer
    ), this.renderer.setRenderTarget(null), this.camera.clearViewOffset();
    const o = (this.pixelBuffer[0] << 16) + (this.pixelBuffer[1] << 8) + this.pixelBuffer[2], s = o > 0 ? [o] : [];
    this.toggleHighlight(s), this.onPickCallback(s);
  }
  dispose() {
    this.enablePick(!1);
  }
}
class Ol extends ks {
  constructor(r, n, i, o, s) {
    super();
    A(this, "_camera");
    A(this, "_scenes");
    A(this, "_drapedFeatureMaterials");
    A(this, "_globeGBufferRenderTarget");
    A(this, "_meshes");
    this.clearPass.setClearFlags(!0, !0, !0), this._scenes = r, this._camera = n, this._meshes = i, this._globeGBufferRenderTarget = o, this._drapedFeatureMaterials = s;
  }
  // Render the scene with world scene that includes user setting object like a light.
  _renderWithWorld(r, n) {
    n.add(this._scenes.world), r.render(n, this._camera), n.remove(this._scenes.world);
  }
  render(r, n, i) {
    const o = this._drapedFeatureMaterials.size !== 0;
    r.setRenderTarget(this._globeGBufferRenderTarget), r.clear(), r.render(this._scenes.globeGBuffer, this._camera), r.setRenderTarget(this.renderToScreen ? null : n), this.clearPass.enabled && this.clearPass.render(r, n, i), this._renderWithWorld(r, this._scenes.globe), o && this._renderDrapedMesh(r), this._renderWithWorld(r, this._scenes.main);
  }
  // Drape a feature on the terrain by stencil test.
  // Refs
  // - https://www.isprs.org/proceedings/XXXVII/congress/2_pdf/5_WG-II-5/06.pdf
  // - http://wscg.zcu.cz/WSCG2007/Papers_2007/journal/B17-full.pdf
  _renderDrapedMesh(r) {
    var i;
    const n = this._scenes.drapedFeatures;
    for (const [o, s] of this._drapedFeatureMaterials) {
      if (((i = this._meshes.get(o)) == null ? void 0 : i.visible) === !1 || !s.visible) continue;
      s.stencilFunc = kr, s.stencilFail = ke, s.stencilZPass = ke, s.stencilZFail = Fr, s.side = ee, s.colorWrite = !1, s.depthWrite = !1, s.stencilWrite = !0, s.depthTest = !0;
      const a = this._meshes.get(o);
      if (!a) return;
      n.add(a), this._renderWithWorld(r, n), s.side = Qe, s.stencilZFail = Nr, this._renderWithWorld(r, n), s.stencilFunc = Hr, s.stencilFail = Ae, s.stencilZFail = Ae, s.stencilZPass = Ae, s.side = ee, s.colorWrite = !0, s.depthTest = !1, this._renderWithWorld(r, n), n.remove(a), s.colorWrite = !1, s.depthWrite = !1, s.depthTest = !1, s.stencilWrite = !1;
    }
  }
}
var sn = { exports: {} };
(function(t, e) {
  (function(r, n) {
    t.exports = n();
  })(yi, function() {
    var r = function() {
      function n(d) {
        return s.appendChild(d.dom), d;
      }
      function i(d) {
        for (var g = 0; g < s.children.length; g++) s.children[g].style.display = g === d ? "block" : "none";
        o = d;
      }
      var o = 0, s = document.createElement("div");
      s.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", s.addEventListener("click", function(d) {
        d.preventDefault(), i(++o % s.children.length);
      }, !1);
      var a = (performance || Date).now(), c = a, u = 0, l = n(new r.Panel("FPS", "#0ff", "#002")), f = n(new r.Panel("MS", "#0f0", "#020"));
      if (self.performance && self.performance.memory) var h = n(new r.Panel("MB", "#f08", "#201"));
      return i(0), { REVISION: 16, dom: s, addPanel: n, showPanel: i, begin: function() {
        a = (performance || Date).now();
      }, end: function() {
        u++;
        var d = (performance || Date).now();
        if (f.update(d - a, 200), d > c + 1e3 && (l.update(1e3 * u / (d - c), 100), c = d, u = 0, h)) {
          var g = performance.memory;
          h.update(g.usedJSHeapSize / 1048576, g.jsHeapSizeLimit / 1048576);
        }
        return d;
      }, update: function() {
        a = this.end();
      }, domElement: s, setMode: i };
    };
    return r.Panel = function(n, i, o) {
      var s = 1 / 0, a = 0, c = Math.round, u = c(window.devicePixelRatio || 1), l = 80 * u, f = 48 * u, h = 3 * u, d = 2 * u, g = 3 * u, p = 15 * u, v = 74 * u, m = 30 * u, x = document.createElement("canvas");
      x.width = l, x.height = f, x.style.cssText = "width:80px;height:48px";
      var y = x.getContext("2d");
      return y.font = "bold " + 9 * u + "px Helvetica,Arial,sans-serif", y.textBaseline = "top", y.fillStyle = o, y.fillRect(0, 0, l, f), y.fillStyle = i, y.fillText(n, h, d), y.fillRect(g, p, v, m), y.fillStyle = o, y.globalAlpha = 0.9, y.fillRect(g, p, v, m), { dom: x, update: function(w, C) {
        s = Math.min(s, w), a = Math.max(a, w), y.fillStyle = o, y.globalAlpha = 1, y.fillRect(0, 0, l, p), y.fillStyle = i, y.fillText(c(w) + " " + n + " (" + c(s) + "-" + c(a) + ")", h, d), y.drawImage(x, g + u, p, v - u, m, g, p, v - u, m), y.fillRect(g + v - u, p, u, m), y.fillStyle = o, y.globalAlpha = 0.9, y.fillRect(g + v - u, p, u, c((1 - w / C) * m));
      } };
    }, r;
  });
})(sn);
var kl = sn.exports;
const _e = /* @__PURE__ */ Ci(kl);
class Fl {
  constructor(e) {
    A(this, "stats");
    A(this, "renderer");
    A(this, "drawCalls");
    A(this, "numTriangles");
    A(this, "memGeometries");
    this.stats = new _e(), this.renderer = e, this.drawCalls = this.stats.addPanel(
      new _e.Panel("Draws", "#0ff", "#002")
    ), this.numTriangles = this.stats.addPanel(
      new _e.Panel("Triangles", "#0fff57", "#013a12")
    ), this.memGeometries = this.stats.addPanel(
      new _e.Panel("Geometries", "#ffa100", "#301e00")
    ), this.stats.showPanel(0);
  }
  begin() {
    this.renderer.beginRender(), this.stats.begin();
  }
  end() {
    const e = this.renderer.endRender();
    e.calls && this.drawCalls.update(e.calls, 500), e.triangles && this.numTriangles.update(e.triangles, 500), e.memGeometries && this.memGeometries.update(e.memGeometries, 500), this.stats.end();
  }
  get dom() {
    return this.stats.dom;
  }
}
function $() {
  return typeof self < "u" && self.document === void 0;
}
const Nl = "" + new URL("assets/index-DATcG3XH.js", import.meta.url).href, Wl = () => yr.japanGSI(), Yl = () => yr.mapbox();
class Vl {
  constructor(e) {
    A(this, "camera");
    A(this, "renderer");
    A(this, "control");
    A(this, "_scenes");
    A(this, "_effectComposer");
    A(this, "_renderPass");
    A(this, "_globeGBufferRenderTarget");
    // Store draped feature's materials
    A(this, "_drapedFeatureMaterials", /* @__PURE__ */ new Map());
    A(this, "_core");
    A(this, "_options");
    A(this, "_stats");
    A(this, "_eventDisposer");
    A(this, "_disposed", !1);
    A(this, "_picked", !1);
    A(this, "_events", {});
    A(this, "_uniforms");
    A(this, "_meshes", /* @__PURE__ */ new Map());
    A(this, "_abortControllers", /* @__PURE__ */ new Map());
    A(this, "_workerPoolPromises", /* @__PURE__ */ new Map());
    A(this, "_loadedTexs", /* @__PURE__ */ new Map());
    A(this, "_buf", {
      u8: (e) => {
        var n;
        return ((n = this._core) == null ? void 0 : n.getBufferU8(e)) ?? null;
      },
      f32: (e) => {
        var n;
        return ((n = this._core) == null ? void 0 : n.getBufferF32(e)) ?? null;
      },
      u32: (e) => {
        var n;
        return ((n = this._core) == null ? void 0 : n.getBufferU32(e)) ?? null;
      },
      setU8: (e, r, n) => {
        var i, o;
        (i = this._core) != null && i.hasDataRequester(r) && ((o = this._core) == null || o.setBufferU8(e, r, n.length, (s) => {
          s.set(n);
        }));
      },
      newU8: (e) => {
        var r;
        return (r = this._core) == null ? void 0 : r.newBufferU8(e.length, (n) => {
          n.set(e);
        });
      },
      newU32: (e) => {
        var r;
        return (r = this._core) == null ? void 0 : r.newBufferU32(e.length, (n) => {
          n.set(e);
        });
      },
      newF32: (e) => {
        var r;
        return (r = this._core) == null ? void 0 : r.newBufferF32(e.length, (n) => {
          n.set(e);
        });
      },
      remove: (e) => {
        var r;
        (r = this._core) == null || r.removeBuffer(e);
      },
      triggerDataRequesterFailed: (e) => {
        var r;
        (r = this._core) == null || r.triggerDataRequesterFailed(e);
      }
    });
    A(this, "_texFragment", {
      triggerTextureFragmentLoaded: (e, r) => {
        var n;
        (n = this._core) == null || n.triggerTextureFragmentLoaded(e, r);
      }
    });
    A(this, "_tileHandler", {
      getMartini: (e) => {
        var r;
        return (r = this._core) == null ? void 0 : r.getMartini(e);
      },
      getTile: (e) => {
        var r;
        return (r = this._core) == null ? void 0 : r.getTile(e);
      },
      getParentTile: (e) => {
        var r;
        return (r = this._core) == null ? void 0 : r.getParentTile(e);
      },
      getTileElevationDecoder: (e) => {
        var r;
        return (r = this._core) == null ? void 0 : r.getTileElevationDecoder(e);
      }
    });
    A(this, "_workerTaskHandler", {
      triggerWorkerTaskCompleted: (e, r) => {
        var n;
        (n = this._core) == null || n.triggerWorkerTaskCompleted(e, r);
      },
      hasWorkerTask: (e) => {
        var r;
        return !!((r = this._core) != null && r.hasWorkerTask(e));
      }
    });
    A(this, "_featureHandler", {
      getTransferablePolygonBatchedFeature: (e) => {
        var r;
        return (r = this._core) == null ? void 0 : r.getTransferablePolygonBatchedFeature(e);
      },
      getTransferablePolylineBatchedFeature: (e) => {
        var r;
        return (r = this._core) == null ? void 0 : r.getTransferablePolylineBatchedFeature(e);
      },
      markFeatureIsRendered: (e, r) => {
        var n;
        (n = this._core) == null || n.markFeatureIsRendered(e, r);
      }
    });
    A(this, "_meshHandler", {
      setTileMeshPrepared: (e) => {
        var r;
        (r = this._core) == null || r.setTileMeshPrepared(e);
      }
    });
    A(this, "_eventManager", new di());
    A(this, "_pickHelper");
    A(this, "_defaultTextureOptions");
    A(this, "resize", (e, r, n) => {
      var a;
      if (this._disposed) return;
      const i = this._getCanvasSize(), o = typeof e == "number" ? e : i == null ? void 0 : i.width, s = typeof r == "number" ? r : i == null ? void 0 : i.height;
      typeof o != "number" || typeof s != "number" || (this.camera.aspect = o / s, this.camera.updateProjectionMatrix(), this.renderer.setSize(o, s, !$()), this._effectComposer.setSize(o, s), this._globeGBufferRenderTarget.setSize(
        o * (n ?? 1),
        s * (n ?? 1)
      ), n && this.renderer.setPixelRatio(n), (a = this._core) == null || a.resize(o, s, n ?? 1), this._emit("resize"));
    });
    A(this, "_handleResize", () => {
      const { width: e, height: r } = this._getCanvasSize() ?? {};
      if (!e || !r) return;
      const n = $() ? this._options.initialPixelRatio ?? 1 : window.devicePixelRatio;
      this.resize(e, r, n);
    });
    var p, v, m, x, y, w, C, E;
    if (!e.canvas) {
      const T = document.createElement("div");
      T.id = "root", T.style.width = "100vw", T.style.height = "100vh", e.canvas = document.createElement("canvas"), e.canvas.id = "canvas", e.canvas.style.width = "100%", e.canvas.style.height = "100%", T.appendChild(e.canvas), document.body.appendChild(T);
    }
    if (this._options = e, (p = e.canvas) == null || p.addEventListener("contextmenu", (T) => {
      T.preventDefault();
    }), e.renderer)
      this.renderer = e.renderer;
    else {
      const T = new oi({
        // If it's true, some noise will happen. So use other AA algorithm instead.
        antialias: !1,
        logarithmicDepthBuffer: !0,
        canvas: e.canvas,
        stencil: !0
      });
      T.info.autoReset = !1, T.autoClearStencil = !1, T.autoClearColor = !1, T.autoClearDepth = !1, this.renderer = T;
      const { width: D = e.initialWidth, height: b = e.initialHeight } = this._getCanvasSize() ?? {};
      if (ir(D && b), typeof (e == null ? void 0 : e.initialPixelRatio) == "number" || !$()) {
        const M = $() ? 1 : window.devicePixelRatio;
        T.setPixelRatio(e.initialPixelRatio ?? M);
      }
      T.setSize(D, b, !$()), e.container && e.container.appendChild(T.domElement);
    }
    const { width: r = e.initialWidth, height: n = e.initialHeight } = this._getCanvasSize() ?? {};
    ir(r && n);
    const i = this.renderer.getPixelRatio(), o = r * i, s = n * i;
    this._globeGBufferRenderTarget = new te(
      o,
      s,
      {
        count: 1
      }
    ), this._globeGBufferRenderTarget.depthTexture = new Cr(
      o,
      s
    );
    const a = this._globeGBufferRenderTarget.textures[0];
    a.magFilter = Re, a.minFilter = Re, a.type = ai;
    let c;
    e.scene ? c = e.scene : c = new ie();
    let u;
    e.globeScene ? u = e.globeScene : u = new ie();
    const l = new ie(), f = new ie(), h = new ie();
    if (this._scenes = {
      world: c,
      main: l,
      globe: u,
      globeGBuffer: h,
      drapedFeatures: f
    }, e.camera)
      this.camera = e.camera;
    else {
      const { width: T = e.initialWidth, height: D = e.initialHeight } = this._getCanvasSize() ?? {};
      if (typeof T != "number" || typeof D != "number")
        throw new Error("Must provide initialWidth and initialHeight");
      const b = new Et(50, T / D);
      b.far = 1e8, b.near = 1, b.position.set(0, 0, 6371e3 * 3), b.up.set(0, 0, 1), b.lookAt(0, 0, 0), this.camera = b;
    }
    this._effectComposer = new qi(this.renderer, {
      stencilBuffer: !0,
      frameBufferType: e.halfFloat ? ci : void 0,
      multisampling: e.multisampling
    }), this._effectComposer.setSize(r, n), this._renderPass = new Ol(
      this._scenes,
      this.camera,
      this._meshes,
      this._globeGBufferRenderTarget,
      this._drapedFeatureMaterials
    ), this._effectComposer.addPass(this._renderPass);
    const d = eo(e.antialias);
    if (d) {
      const T = new qs(this.camera, d);
      this._effectComposer.addPass(T);
    }
    const g = e.light;
    if (((v = g == null ? void 0 : g.ambient) == null ? void 0 : v.enabled) ?? !0) {
      const T = new li(
        ((m = g == null ? void 0 : g.ambient) == null ? void 0 : m.color) ?? 16777215,
        ((x = g == null ? void 0 : g.ambient) == null ? void 0 : x.intensity) ?? 1
      );
      this.scene.add(T);
    }
    if (((y = g == null ? void 0 : g.sun) == null ? void 0 : y.enabled) ?? !0) {
      const T = new Sr(
        ((w = g == null ? void 0 : g.sun) == null ? void 0 : w.color) ?? 16777215,
        ((C = g == null ? void 0 : g.sun) == null ? void 0 : C.intensity) ?? 3
      );
      T.position.set(
        ...(E = g == null ? void 0 : g.sun) != null && E.position ? g.sun.position.toArray() : [1, 5, 3]
      ), this.scene.add(T);
    }
    if (this.renderer.setClearColor(e.backgroundColor ?? 657935), !e.disableAutoResize && !$() && (window.addEventListener("resize", this._handleResize), window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener("change", this._handleResize)), e.debug) {
      const T = e.container || this.renderer.domElement.parentElement;
      T && (this._stats = new Fl({
        beginRender: () => this.renderer.info.reset(),
        endRender: () => ({
          ...this.renderer.info.render,
          memGeometries: this.renderer.info.memory.geometries
        })
      }), T.appendChild(this._stats.dom));
    }
    this._uniforms = {
      viewportAndPixelRatio: { value: null },
      frustumNearFar: { value: null },
      frustumRatio: { value: null },
      tGlobeDepth: { value: null },
      tGlobeNormal: { value: null },
      inverseProjectionMatrix: { value: null }
    }, this._defaultTextureOptions = {
      maxAnisotropy: this.renderer.capabilities.getMaxAnisotropy(),
      magFilter: Q,
      minFilter: Q,
      useMipmaps: !0
    };
  }
  get scene() {
    return this._scenes.world;
  }
  async init() {
    var r, n;
    if (this._core) return;
    Gi(Nl, to), await cn(), this._core = new xn(Hl()), this._core.start(), $() || (this._eventDisposer = _l(
      this._core,
      this.renderer.domElement
    ), this._pickHelper = new Ll(
      this.renderer.domElement,
      this.renderer,
      this.camera,
      this._scenes,
      this._meshes,
      this._drapedFeatureMaterials,
      this._globeGBufferRenderTarget,
      ((r = this._options.picking) == null ? void 0 : r.highlightColor) ?? new N(65535),
      this.onPick.bind(this)
    ), this._pickHelper.enablePick(((n = this._options.picking) == null ? void 0 : n.enable) ?? !0)), this._startMainLoop();
    const e = new F();
    this.renderer.getSize(e), this.resize(e.width, e.height, this.renderer.getPixelRatio());
  }
  dispose() {
    this._disposed = !0, $() || window.removeEventListener("resize", this._handleResize), this._eventDisposer && (this._eventDisposer(), this._eventDisposer = void 0), this._pickHelper && this._pickHelper.dispose(), this._globeGBufferRenderTarget.dispose(), this.renderer.setAnimationLoop(null), "dispose" in this.renderer && typeof this.renderer.dispose == "function" && this.renderer.dispose();
  }
  _updateUniforms() {
    const e = this._getCanvasSize(), r = this.renderer.getPixelRatio(), i = this.camera.near * Math.tan(0.5 * 1), o = -i, s = this.camera.aspect * i, a = -s;
    this._uniforms.viewportAndPixelRatio.value = [
      (e == null ? void 0 : e.width) ?? 0,
      (e == null ? void 0 : e.height) ?? 0,
      r
    ], this._uniforms.frustumNearFar.value = [this.camera.near, this.camera.far], this._uniforms.frustumRatio.value = [i, o, s, a], this._uniforms.tGlobeDepth.value = this._globeGBufferRenderTarget.depthTexture, this._uniforms.tGlobeNormal.value = this._globeGBufferRenderTarget.textures[0], this._uniforms.inverseProjectionMatrix.value = this.camera.projectionMatrixInverse;
  }
  /** Returns true if the scene was updated and needs to be rendered. */
  _update(e) {
    var n, i, o;
    (n = this._core) == null || n.update(e);
    const r = (i = this._core) == null ? void 0 : i.readEvents();
    return !r && !this._eventManager.needsUpdate() || !this._core ? !1 : (this._updateUniforms(), xl(
      this._eventManager,
      this._scenes,
      this.camera,
      this._meshes,
      this._abortControllers,
      this._buf,
      this._texFragment,
      this._tileHandler,
      this._workerTaskHandler,
      this._meshHandler,
      this._featureHandler,
      this._loadedTexs,
      this._workerPoolPromises,
      r,
      this._uniforms,
      this._drapedFeatureMaterials,
      this._defaultTextureOptions
    ), r == null || r.free(), (o = this.control) == null || o.update(), this.camera.updateMatrixWorld(), !0);
  }
  _render() {
    this._effectComposer.render();
  }
  // TODO: Handle event from user.
  on(e, r) {
    var n;
    this._events[e] || (this._events[e] = []), (n = this._events[e]) == null || n.push(r);
  }
  off(e, r) {
    var n;
    this._events[e] = (n = this._events[e]) == null ? void 0 : n.filter((i) => i !== r);
  }
  addLayer(e) {
    var n;
    return (n = this._core) == null ? void 0 : n.addLayer(e);
  }
  updateLayer(e, r) {
    var n;
    (n = this._core) == null || n.updateLayer(e, r);
  }
  deleteLayer(e) {
    var r;
    (r = this._core) == null || r.deleteLayer(e);
  }
  _emit(e, ...r) {
    var n;
    (n = this._events[e]) == null || n.forEach(
      (i) => i(...r)
    );
  }
  _startMainLoop() {
    const e = (r) => {
      var n, i;
      this._disposed || ((n = this._stats) == null || n.begin(), (this._update(r) || this._picked) && this._render(), this._picked = !1, (i = this._stats) == null || i.end());
    };
    this.renderer.setAnimationLoop(e);
  }
  _getCanvasSize() {
    var i;
    const e = this._options.container ?? ((i = this.renderer.domElement) == null ? void 0 : i.parentElement) ?? this.renderer.domElement;
    if (!e) return;
    const r = e.offsetWidth, n = e.offsetHeight;
    if (!(typeof r != "number" && typeof n != "number"))
      return { width: r, height: n };
  }
  onPick(e) {
    var r;
    if (e.length > 0) {
      const n = (r = this._core) == null ? void 0 : r.getBatchProp(e[0]);
      n && console.log(JSON.parse(n));
    }
    this._picked = !0;
  }
}
function Hl() {
  return Math.random().toString(36).slice(2);
}
export {
  $s as DEFAULT_ANTIALIAS,
  Wl as JAPAN_GSI_ELEVATION_DECODER,
  Yl as MAPBOX_ELEVATION_DECODER,
  Vl as default,
  eo as selectAntialiasEffect
};
