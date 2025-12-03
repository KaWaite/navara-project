let wasm;

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

let cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedFloat64ArrayMemory0 = null;

function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}
/**
 * @returns {number}
 */
export function getWGS84SemiMajorAxis() {
    const ret = wasm.getWGS84SemiMajorAxis();
    return ret;
}

/**
 * @returns {number}
 */
export function getWGS84SemiMinorAxis() {
    const ret = wasm.getWGS84SemiMinorAxis();
    return ret;
}

/**
 * @returns {number}
 */
export function getWGS84EccentricitySquared() {
    const ret = wasm.getWGS84EccentricitySquared();
    return ret;
}

/**
 * @returns {number}
 */
export function getWGS84Flattening() {
    const ret = wasm.getWGS84Flattening();
    return ret;
}

/**
 * @returns {number}
 */
export function getWGS84Eccentricity() {
    const ret = wasm.getWGS84Eccentricity();
    return ret;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}
/**
 * @param {Vec3} point
 * @param {Vec3} normal
 * @returns {Plane}
 */
export function getPlaneFromPointNormal(point, normal) {
    _assertClass(point, Vec3);
    var ptr0 = point.__destroy_into_raw();
    _assertClass(normal, Vec3);
    var ptr1 = normal.__destroy_into_raw();
    const ret = wasm.getPlaneFromPointNormal(ptr0, ptr1);
    return Plane.__wrap(ret);
}

/**
 * @param {Window} window
 * @param {Transform} transform
 * @param {CameraFrustum} frustum
 * @param {Vec2} screen_pos
 * @returns {Ray}
 */
export function getPickRay(window, transform, frustum, screen_pos) {
    _assertClass(window, Window);
    var ptr0 = window.__destroy_into_raw();
    _assertClass(transform, Transform);
    var ptr1 = transform.__destroy_into_raw();
    _assertClass(frustum, CameraFrustum);
    var ptr2 = frustum.__destroy_into_raw();
    _assertClass(screen_pos, Vec2);
    var ptr3 = screen_pos.__destroy_into_raw();
    const ret = wasm.getPickRay(ptr0, ptr1, ptr2, ptr3);
    return Ray.__wrap(ret);
}

/**
 * @param {Ray} ray
 * @param {Plane} plane
 * @returns {Vec3 | undefined}
 */
export function getRayPlaneIntersection(ray, plane) {
    _assertClass(ray, Ray);
    var ptr0 = ray.__destroy_into_raw();
    _assertClass(plane, Plane);
    var ptr1 = plane.__destroy_into_raw();
    const ret = wasm.getRayPlaneIntersection(ptr0, ptr1);
    return ret === 0 ? undefined : Vec3.__wrap(ret);
}

/**
 * @param {Vec3} point
 * @returns {number}
 */
export function getHeightFromEllipsoid(point) {
    _assertClass(point, Vec3);
    var ptr0 = point.__destroy_into_raw();
    const ret = wasm.getHeightFromEllipsoid(ptr0);
    return ret;
}

/**
 * Encode a camera position into RTE high/low components
 *
 * Takes camera position in f64 ECEF coordinates and returns
 * an EncodedCamera with separate high and low f32 components
 * for each axis, enabling GPU RTE rendering.
 *
 * # Arguments
 * * `x` - Camera X position in ECEF coordinates (meters)
 * * `y` - Camera Y position in ECEF coordinates (meters)
 * * `z` - Camera Z position in ECEF coordinates (meters)
 *
 * # Example
 * ```ignore
 * // In JavaScript/TypeScript:
 * const camera = encodeCamera(6371000.0, 0.0, 0.0);
 * // Use camera.high_x, camera.low_x, etc. in shaders
 * ```
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {EncodedVec3}
 */
export function encode_camera(x, y, z) {
    const ret = wasm.encode_camera(x, y, z);
    return EncodedVec3.__wrap(ret);
}

/**
 * @param {LLE} lle
 * @returns {Vec3}
 */
export function geodeticToXyz(lle) {
    _assertClass(lle, LLE);
    var ptr0 = lle.__destroy_into_raw();
    const ret = wasm.geodeticToXyz(ptr0);
    return Vec3.__wrap(ret);
}

/**
 * @param {Vec3} vec3
 * @returns {LLE}
 */
export function xyzToGeodetic(vec3) {
    _assertClass(vec3, Vec3);
    var ptr0 = vec3.__destroy_into_raw();
    const ret = wasm.xyzToGeodetic(ptr0);
    return LLE.__wrap(ret);
}

/**
 * @param {number} degree
 * @returns {number}
 */
export function angleToRadian(degree) {
    const ret = wasm.angleToRadian(degree);
    return ret;
}

/**
 * @param {number} radian
 * @returns {number}
 */
export function angleToDegree(radian) {
    const ret = wasm.angleToDegree(radian);
    return ret;
}

/**
 * @param {Window} window
 * @param {Transform} transform
 * @param {CameraFrustum} frustum
 * @param {Vec2} screen_pos
 * @returns {Vec3 | undefined}
 */
export function screenToWorld(window, transform, frustum, screen_pos) {
    _assertClass(window, Window);
    var ptr0 = window.__destroy_into_raw();
    _assertClass(transform, Transform);
    var ptr1 = transform.__destroy_into_raw();
    _assertClass(frustum, CameraFrustum);
    var ptr2 = frustum.__destroy_into_raw();
    _assertClass(screen_pos, Vec2);
    var ptr3 = screen_pos.__destroy_into_raw();
    const ret = wasm.screenToWorld(ptr0, ptr1, ptr2, ptr3);
    return ret === 0 ? undefined : Vec3.__wrap(ret);
}

/**
 * @param {LLE} lle
 * @returns {Vec3}
 */
export function geodeticSurfaceNormal(lle) {
    _assertClass(lle, LLE);
    var ptr0 = lle.__destroy_into_raw();
    const ret = wasm.geodeticSurfaceNormal(ptr0);
    return Vec3.__wrap(ret);
}

/**
 * @param {Vec3} origin
 * @returns {Float64Array}
 */
export function eastNorthUpToFixedFrame(origin) {
    _assertClass(origin, Vec3);
    var ptr0 = origin.__destroy_into_raw();
    const ret = wasm.eastNorthUpToFixedFrame(ptr0);
    var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v2;
}

/**
 * @param {Vec3} origin
 * @returns {Float64Array}
 */
export function northEastDownToFixedFrame(origin) {
    _assertClass(origin, Vec3);
    var ptr0 = origin.__destroy_into_raw();
    const ret = wasm.northEastDownToFixedFrame(ptr0);
    var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v2;
}

/**
 * @param {Vec3} origin
 * @returns {Float64Array}
 */
export function northUpEastToFixedFrame(origin) {
    _assertClass(origin, Vec3);
    var ptr0 = origin.__destroy_into_raw();
    const ret = wasm.northUpEastToFixedFrame(ptr0);
    var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v2;
}

/**
 * @param {Vec3} origin
 * @returns {Float64Array}
 */
export function northWestUpToFixedFrame(origin) {
    _assertClass(origin, Vec3);
    var ptr0 = origin.__destroy_into_raw();
    const ret = wasm.northWestUpToFixedFrame(ptr0);
    var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
    return v2;
}

/**
 * @param {Window} window
 * @param {Transform} transform
 * @param {CameraFrustum} frustum
 * @param {Vec3} world_pos
 * @returns {Vec2 | undefined}
 */
export function worldToScreen(window, transform, frustum, world_pos) {
    _assertClass(window, Window);
    var ptr0 = window.__destroy_into_raw();
    _assertClass(transform, Transform);
    var ptr1 = transform.__destroy_into_raw();
    _assertClass(frustum, CameraFrustum);
    var ptr2 = frustum.__destroy_into_raw();
    _assertClass(world_pos, Vec3);
    var ptr3 = world_pos.__destroy_into_raw();
    const ret = wasm.worldToScreen(ptr0, ptr1, ptr2, ptr3);
    return ret === 0 ? undefined : Vec2.__wrap(ret);
}

export function start() {
    wasm.start();
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_2.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
/**
 * Coordinate reference system
 * @enum {0 | 1}
 */
export const CRS = Object.freeze({
    /**
     * EPSG:4326
     */
    Geographic: 0, "0": "Geographic",
    /**
     * EPSG:4978
     */
    Geocentric: 1, "1": "Geocentric",
});
/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5}
 */
export const CameraDirection = Object.freeze({
    Forward: 0, "0": "Forward",
    Backward: 1, "1": "Backward",
    Left: 2, "2": "Left",
    Right: 3, "3": "Right",
    Up: 4, "4": "Up",
    Down: 5, "5": "Down",
});
/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5}
 */
export const CameraStatusType = Object.freeze({
    Change: 0, "0": "Change",
    LookAt: 1, "1": "LookAt",
    Rotate: 2, "2": "Rotate",
    MoveStart: 3, "3": "MoveStart",
    Moving: 4, "4": "Moving",
    MoveEnd: 5, "5": "MoveEnd",
});

const AabbFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_aabb_free(ptr >>> 0, 1));

export class Aabb {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AabbFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_aabb_free(ptr, 0);
    }
    /**
     * @returns {Vec3}
     */
    get center() {
        const ret = wasm.__wbg_get_aabb_center(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set center(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_aabb_center(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Vec3}
     */
    get extent() {
        const ret = wasm.__wbg_get_aabb_extent(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set extent(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_aabb_extent(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Vec3} center
     * @param {Vec3} extent
     */
    constructor(center, extent) {
        _assertClass(center, Vec3);
        var ptr0 = center.__destroy_into_raw();
        _assertClass(extent, Vec3);
        var ptr1 = extent.__destroy_into_raw();
        const ret = wasm.aabb_new(ptr0, ptr1);
        this.__wbg_ptr = ret >>> 0;
        AabbFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const BatchPropResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_batchpropresult_free(ptr >>> 0, 1));

export class BatchPropResult {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BatchPropResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_batchpropresult_free(ptr, 0);
    }
    /**
     * @returns {any}
     */
    get properties() {
        const ret = wasm.__wbg_get_batchpropresult_properties(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} arg0
     */
    set properties(arg0) {
        wasm.__wbg_set_batchpropresult_properties(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {string | undefined}
     */
    get layerId() {
        const ret = wasm.__wbg_get_batchpropresult_layerId(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set layerId(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_batchpropresult_layerId(this.__wbg_ptr, ptr0, len0);
    }
}

const BillboardMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_billboardmaterial_free(ptr >>> 0, 1));

export class BillboardMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BillboardMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_billboardmaterial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_billboardmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_billboardmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get size() {
        const ret = wasm.__wbg_get_billboardmaterial_size(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set size(arg0) {
        wasm.__wbg_set_billboardmaterial_size(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_billboardmaterial_color(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_billboardmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {Vec2 | undefined}
     */
    get center() {
        const ret = wasm.__wbg_get_billboardmaterial_center(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec2.__wrap(ret);
    }
    /**
     * @param {Vec2 | null} [arg0]
     */
    set center(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec2);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_billboardmaterial_center(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_billboardmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_billboardmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {string | undefined}
     */
    get url() {
        const ret = wasm.__wbg_get_billboardmaterial_url(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set url(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_billboardmaterial_url(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get scaleByDistance() {
        const ret = wasm.__wbg_get_billboardmaterial_scaleByDistance(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set scaleByDistance(arg0) {
        wasm.__wbg_set_billboardmaterial_scaleByDistance(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_billboardmaterial_clampToGround(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_billboardmaterial_clampToGround(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get depthTest() {
        const ret = wasm.__wbg_get_billboardmaterial_depthTest(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set depthTest(arg0) {
        wasm.__wbg_set_billboardmaterial_depthTest(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get transparent() {
        const ret = wasm.__wbg_get_billboardmaterial_transparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set transparent(arg0) {
        wasm.__wbg_set_billboardmaterial_transparent(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get alphaTest() {
        const ret = wasm.__wbg_get_billboardmaterial_alphaTest(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set alphaTest(arg0) {
        wasm.__wbg_set_billboardmaterial_alphaTest(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
}

const BoundingSphereFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boundingsphere_free(ptr >>> 0, 1));

export class BoundingSphere {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BoundingSphereFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boundingsphere_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get center_x() {
        const ret = wasm.__wbg_get_boundingsphere_center_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set center_x(arg0) {
        wasm.__wbg_set_boundingsphere_center_x(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get center_y() {
        const ret = wasm.__wbg_get_boundingsphere_center_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set center_y(arg0) {
        wasm.__wbg_set_boundingsphere_center_y(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get center_z() {
        const ret = wasm.__wbg_get_boundingsphere_center_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set center_z(arg0) {
        wasm.__wbg_set_boundingsphere_center_z(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get radius() {
        const ret = wasm.__wbg_get_boundingsphere_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set radius(arg0) {
        wasm.__wbg_set_boundingsphere_radius(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} center_x
     * @param {number} center_y
     * @param {number} center_z
     * @param {number} radius
     */
    constructor(center_x, center_y, center_z, radius) {
        const ret = wasm.boundingsphere_new(center_x, center_y, center_z, radius);
        this.__wbg_ptr = ret >>> 0;
        BoundingSphereFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const CachedMeshHandleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cachedmeshhandle_free(ptr >>> 0, 1));

export class CachedMeshHandle {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CachedMeshHandleFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cachedmeshhandle_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get vertices() {
        const ret = wasm.__wbg_get_cachedmeshhandle_vertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set vertices(arg0) {
        wasm.__wbg_set_cachedmeshhandle_vertices(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get indices() {
        const ret = wasm.__wbg_get_cachedmeshhandle_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set indices(arg0) {
        wasm.__wbg_set_cachedmeshhandle_indices(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get uvs() {
        const ret = wasm.__wbg_get_cachedmeshhandle_uvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set uvs(arg0) {
        wasm.__wbg_set_cachedmeshhandle_uvs(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number | undefined}
     */
    get heights() {
        const ret = wasm.__wbg_get_cachedmeshhandle_heights(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set heights(arg0) {
        wasm.__wbg_set_cachedmeshhandle_heights(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @param {number} vertices
     * @param {number} indices
     * @param {number} uvs
     * @param {number | null} [heights]
     */
    constructor(vertices, indices, uvs, heights) {
        const ret = wasm.cachedmeshhandle_new(vertices, indices, uvs, isLikeNone(heights) ? 0x100000001 : (heights) >> 0);
        this.__wbg_ptr = ret >>> 0;
        CachedMeshHandleFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const CameraControlUpdateEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cameracontrolupdateevent_free(ptr >>> 0, 1));
/**
 * An event for updating camera controller settings at runtime.
 *
 * This event allows partial updates to the [`CameraController`](navara_camera::CameraController)
 * component. Only fields set to `Some` will be applied; `None` fields are ignored.
 */
export class CameraControlUpdateEvent {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CameraControlUpdateEventFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cameracontrolupdateevent_free(ptr, 0);
    }
    /**
     * Whether to automatically adjust near/far clipping planes based on camera distance
     * from the Earth surface. When enabled, the camera uses three zones:
     * - Near ground: near = 1.0, far = 1e6
     * - Mid altitude: near = 100.0, far = 1e8
     * - Far/Space: near = 1000.0, far = 1e9
     *
     * Default: `true`
     * @returns {boolean | undefined}
     */
    get autoAdjustNearFar() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_autoAdjustNearFar(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether to automatically adjust near/far clipping planes based on camera distance
     * from the Earth surface. When enabled, the camera uses three zones:
     * - Near ground: near = 1.0, far = 1e6
     * - Mid altitude: near = 100.0, far = 1e8
     * - Far/Space: near = 1000.0, far = 1e9
     *
     * Default: `true`
     * @param {boolean | null} [arg0]
     */
    set autoAdjustNearFar(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_autoAdjustNearFar(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * The minimum distance (in meters) the camera can zoom in to the Earth surface.
     *
     * Default: `WGS84_B_64` (Earth's semi-minor axis, ~6,356,752 meters)
     * @returns {number | undefined}
     */
    get minimumZoomDistance() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_minimumZoomDistance(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * The minimum distance (in meters) the camera can zoom in to the Earth surface.
     *
     * Default: `WGS84_B_64` (Earth's semi-minor axis, ~6,356,752 meters)
     * @param {number | null} [arg0]
     */
    set minimumZoomDistance(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_minimumZoomDistance(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * The maximum distance (in meters) the camera can zoom out from the Earth surface.
     *
     * Default: `WGS84_B_64 * 10.0` (~63,567,523 meters)
     * @returns {number | undefined}
     */
    get maximumZoomDistance() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_maximumZoomDistance(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * The maximum distance (in meters) the camera can zoom out from the Earth surface.
     *
     * Default: `WGS84_B_64 * 10.0` (~63,567,523 meters)
     * @param {number | null} [arg0]
     */
    set maximumZoomDistance(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_maximumZoomDistance(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * Multiplier for mouse drag rotation speed.
     *
     * Default: `2.0`
     * @returns {number | undefined}
     */
    get spinSpeed() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_spinSpeed(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * Multiplier for mouse drag rotation speed.
     *
     * Default: `2.0`
     * @param {number | null} [arg0]
     */
    set spinSpeed(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_spinSpeed(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * Multiplier for scroll wheel zoom speed.
     *
     * Default: `0.6`
     * @returns {number | undefined}
     */
    get zoomSpeed() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_zoomSpeed(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * Multiplier for scroll wheel zoom speed.
     *
     * Default: `0.6`
     * @param {number | null} [arg0]
     */
    set zoomSpeed(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_zoomSpeed(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * Duration (in milliseconds) for spin inertia animation after releasing mouse drag.
     *
     * Default: `500.0`
     * @returns {number | undefined}
     */
    get spinDuration() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_spinDuration(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Duration (in milliseconds) for spin inertia animation after releasing mouse drag.
     *
     * Default: `500.0`
     * @param {number | null} [arg0]
     */
    set spinDuration(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_spinDuration(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Duration (in milliseconds) for zoom inertia animation after scroll wheel input.
     *
     * Default: `100.0`
     * @returns {number | undefined}
     */
    get zoomDuration() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_zoomDuration(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Duration (in milliseconds) for zoom inertia animation after scroll wheel input.
     *
     * Default: `100.0`
     * @param {number | null} [arg0]
     */
    set zoomDuration(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_zoomDuration(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Duration (in milliseconds) for translation inertia animation.
     *
     * Default: `500.0`
     * @returns {number | undefined}
     */
    get translateDuration() {
        const ret = wasm.__wbg_get_cameracontrolupdateevent_translateDuration(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Duration (in milliseconds) for translation inertia animation.
     *
     * Default: `500.0`
     * @param {number | null} [arg0]
     */
    set translateDuration(arg0) {
        wasm.__wbg_set_cameracontrolupdateevent_translateDuration(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    constructor() {
        const ret = wasm.cameracontrolupdateevent_new();
        this.__wbg_ptr = ret >>> 0;
        CameraControlUpdateEventFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const CameraFrustumFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_camerafrustum_free(ptr >>> 0, 1));

export class CameraFrustum {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CameraFrustumFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_camerafrustum_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get near() {
        const ret = wasm.__wbg_get_camerafrustum_near(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set near(arg0) {
        wasm.__wbg_set_camerafrustum_near(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get far() {
        const ret = wasm.__wbg_get_camerafrustum_far(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set far(arg0) {
        wasm.__wbg_set_camerafrustum_far(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get fov() {
        const ret = wasm.__wbg_get_camerafrustum_fov(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set fov(arg0) {
        wasm.__wbg_set_camerafrustum_fov(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get aspect_ratio() {
        const ret = wasm.__wbg_get_camerafrustum_aspect_ratio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set aspect_ratio(arg0) {
        wasm.__wbg_set_camerafrustum_aspect_ratio(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} near
     * @param {number} far
     * @param {number} fov
     * @param {number} aspect_ratio
     */
    constructor(near, far, fov, aspect_ratio) {
        const ret = wasm.camerafrustum_new(near, far, fov, aspect_ratio);
        this.__wbg_ptr = ret >>> 0;
        CameraFrustumFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const CameraOrientationFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cameraorientation_free(ptr >>> 0, 1));

export class CameraOrientation {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CameraOrientationFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cameraorientation_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get heading() {
        const ret = wasm.__wbg_get_camerafrustum_near(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set heading(arg0) {
        wasm.__wbg_set_camerafrustum_near(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get pitch() {
        const ret = wasm.__wbg_get_camerafrustum_far(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set pitch(arg0) {
        wasm.__wbg_set_camerafrustum_far(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get roll() {
        const ret = wasm.__wbg_get_camerafrustum_fov(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set roll(arg0) {
        wasm.__wbg_set_camerafrustum_fov(this.__wbg_ptr, arg0);
    }
}

const CameraStatusFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_camerastatus_free(ptr >>> 0, 1));

export class CameraStatus {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CameraStatusFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_camerastatus_free(ptr, 0);
    }
    /**
     * @returns {any[]}
     */
    get status() {
        const ret = wasm.__wbg_get_camerastatus_status(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {any[]} arg0
     */
    set status(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_camerastatus_status(this.__wbg_ptr, ptr0, len0);
    }
}

const ConstructedPolygonGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructedpolygongeometry_free(ptr >>> 0, 1));

export class ConstructedPolygonGeometry {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructedPolygonGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructedpolygongeometry_free(ptr, 0);
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get extent() {
        const ret = wasm.__wbg_get_constructedpolygongeometry_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
    /**
     * @param {ExtentRadianF32 | null} [arg0]
     */
    set extent(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ExtentRadianF32);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_constructedpolygongeometry_extent(this.__wbg_ptr, ptr0);
    }
    /**
     * RTC (Relative-To-Center) translation vector
     * Contains the tile center in world-space ECEF coordinates
     * Used to position the mesh while keeping vertex positions in local space
     * @returns {Vec3 | undefined}
     */
    get rtc_translation() {
        const ret = wasm.__wbg_get_constructedpolygongeometry_rtc_translation(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec3.__wrap(ret);
    }
    /**
     * RTC (Relative-To-Center) translation vector
     * Contains the tile center in world-space ECEF coordinates
     * Used to position the mesh while keeping vertex positions in local space
     * @param {Vec3 | null} [arg0]
     */
    set rtc_translation(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec3);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_constructedpolygongeometry_rtc_translation(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_3d_high() {
        const ret = wasm.constructedpolygongeometry_position_3d_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_3d_high_size() {
        const ret = wasm.constructedpolygongeometry_position_3d_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_3d_low() {
        const ret = wasm.constructedpolygongeometry_position_3d_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_3d_low_size() {
        const ret = wasm.constructedpolygongeometry_position_3d_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position() {
        const ret = wasm.constructedpolygongeometry_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_size() {
        const ret = wasm.constructedpolygongeometry_position_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    normal() {
        const ret = wasm.constructedpolygongeometry_normal(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    normal_size() {
        const ret = wasm.constructedpolygongeometry_normal_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    scale_normal_and_cap() {
        const ret = wasm.constructedpolygongeometry_scale_normal_and_cap(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    scale_normal_and_cap_size() {
        const ret = wasm.constructedpolygongeometry_scale_normal_and_cap_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    batch_id() {
        const ret = wasm.constructedpolygongeometry_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_id_size() {
        const ret = wasm.constructedpolygongeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    batch_index() {
        const ret = wasm.constructedpolygongeometry_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_index_size() {
        const ret = wasm.constructedpolygongeometry_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.constructedpolygongeometry_indices(this.__wbg_ptr);
        return ret;
    }
}

const ConstructedPolylineGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructedpolylinegeometry_free(ptr >>> 0, 1));

export class ConstructedPolylineGeometry {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructedPolylineGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructedpolylinegeometry_free(ptr, 0);
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get extent() {
        const ret = wasm.constructedpolylinegeometry_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
    /**
     * @returns {Float32Array}
     */
    position() {
        const ret = wasm.constructedpolylinegeometry_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    position_size() {
        const ret = wasm.constructedpolylinegeometry_position_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    start() {
        const ret = wasm.constructedpolylinegeometry_start(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    start_size() {
        const ret = wasm.constructedpolylinegeometry_start_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    forward_offset() {
        const ret = wasm.constructedpolylinegeometry_forward_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    forward_offset_size() {
        const ret = wasm.constructedpolylinegeometry_forward_offset_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    start_normals() {
        const ret = wasm.constructedpolylinegeometry_start_normals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    start_normals_size() {
        const ret = wasm.constructedpolylinegeometry_start_normals_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    end_normal_and_texture_coordinate_normalization_x() {
        const ret = wasm.constructedpolylinegeometry_end_normal_and_texture_coordinate_normalization_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    end_normal_and_texture_coordinate_normalization_x_size() {
        const ret = wasm.constructedpolylinegeometry_end_normal_and_texture_coordinate_normalization_x_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    right_normal_and_texture_coordinate_normalization_y() {
        const ret = wasm.constructedpolylinegeometry_right_normal_and_texture_coordinate_normalization_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    right_normal_and_texture_coordinate_normalization_y_size() {
        const ret = wasm.constructedpolylinegeometry_right_normal_and_texture_coordinate_normalization_y_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    batch_id() {
        const ret = wasm.constructedpolylinegeometry_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_id_size() {
        const ret = wasm.constructedpolylinegeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    batch_index() {
        const ret = wasm.constructedpolylinegeometry_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_index_size() {
        const ret = wasm.constructedpolylinegeometry_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.constructedpolylinegeometry_indices(this.__wbg_ptr);
        return ret;
    }
}

const ElevationDecoderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_elevationdecoder_free(ptr >>> 0, 1));

export class ElevationDecoder {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ElevationDecoder.prototype);
        obj.__wbg_ptr = ptr;
        ElevationDecoderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ElevationDecoderFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_elevationdecoder_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get r_scaler() {
        const ret = wasm.__wbg_get_elevationdecoder_r_scaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set r_scaler(arg0) {
        wasm.__wbg_set_elevationdecoder_r_scaler(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get g_scaler() {
        const ret = wasm.__wbg_get_elevationdecoder_g_scaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set g_scaler(arg0) {
        wasm.__wbg_set_elevationdecoder_g_scaler(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get b_scaler() {
        const ret = wasm.__wbg_get_elevationdecoder_b_scaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set b_scaler(arg0) {
        wasm.__wbg_set_elevationdecoder_b_scaler(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get offset() {
        const ret = wasm.__wbg_get_elevationdecoder_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set offset(arg0) {
        wasm.__wbg_set_elevationdecoder_offset(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get max_offset() {
        const ret = wasm.__wbg_get_elevationdecoder_max_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set max_offset(arg0) {
        wasm.__wbg_set_elevationdecoder_max_offset(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get min_offset() {
        const ret = wasm.__wbg_get_elevationdecoder_min_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set min_offset(arg0) {
        wasm.__wbg_set_elevationdecoder_min_offset(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get boundary() {
        const ret = wasm.__wbg_get_elevationdecoder_boundary(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set boundary(arg0) {
        wasm.__wbg_set_elevationdecoder_boundary(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get epsilon() {
        const ret = wasm.__wbg_get_elevationdecoder_epsilon(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set epsilon(arg0) {
        wasm.__wbg_set_elevationdecoder_epsilon(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} r_scaler
     * @param {number} g_scaler
     * @param {number} b_scaler
     * @param {number} offset
     * @param {number} max_offset
     * @param {number} min_offset
     * @param {number} boundary
     * @param {number} epsilon
     */
    constructor(r_scaler, g_scaler, b_scaler, offset, max_offset, min_offset, boundary, epsilon) {
        const ret = wasm.elevationdecoder_new(r_scaler, g_scaler, b_scaler, offset, max_offset, min_offset, boundary, epsilon);
        this.__wbg_ptr = ret >>> 0;
        ElevationDecoderFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {ElevationDecoder}
     */
    static japanGSI() {
        const ret = wasm.elevationdecoder_japanGSI();
        return ElevationDecoder.__wrap(ret);
    }
    /**
     * @returns {ElevationDecoder}
     */
    static mapbox() {
        const ret = wasm.elevationdecoder_mapbox();
        return ElevationDecoder.__wrap(ret);
    }
    /**
     * @returns {ElevationDecoder}
     */
    static terrarium() {
        const ret = wasm.elevationdecoder_terrarium();
        return ElevationDecoder.__wrap(ret);
    }
}

const ElevationHeatmapMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_elevationheatmapmaterial_free(ptr >>> 0, 1));

export class ElevationHeatmapMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ElevationHeatmapMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_elevationheatmapmaterial_free(ptr, 0);
    }
    /**
     * @returns {number | undefined}
     */
    get maxHeight() {
        const ret = wasm.__wbg_get_elevationheatmapmaterial_maxHeight(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxHeight(arg0) {
        wasm.__wbg_set_elevationheatmapmaterial_maxHeight(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * @returns {number | undefined}
     */
    get minHeight() {
        const ret = wasm.__wbg_get_elevationheatmapmaterial_minHeight(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @param {number | null} [arg0]
     */
    set minHeight(arg0) {
        wasm.__wbg_set_elevationheatmapmaterial_minHeight(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
    /**
     * @returns {ElevationDecoder | undefined}
     */
    get elevationDecoder() {
        const ret = wasm.__wbg_get_elevationheatmapmaterial_elevationDecoder(this.__wbg_ptr);
        return ret === 0 ? undefined : ElevationDecoder.__wrap(ret);
    }
    /**
     * @param {ElevationDecoder | null} [arg0]
     */
    set elevationDecoder(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ElevationDecoder);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_elevationheatmapmaterial_elevationDecoder(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {boolean}
     */
    get logarithmic() {
        const ret = wasm.__wbg_get_elevationheatmapmaterial_logarithmic(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set logarithmic(arg0) {
        wasm.__wbg_set_elevationheatmapmaterial_logarithmic(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get logBoundary() {
        const ret = wasm.__wbg_get_elevationheatmapmaterial_logBoundary(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set logBoundary(arg0) {
        wasm.__wbg_set_elevationheatmapmaterial_logBoundary(this.__wbg_ptr, arg0);
    }
}

const EllipsoidGeodesicFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_ellipsoidgeodesic_free(ptr >>> 0, 1));

export class EllipsoidGeodesic {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EllipsoidGeodesicFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ellipsoidgeodesic_free(ptr, 0);
    }
    /**
     * @returns {LLE}
     */
    get start() {
        const ret = wasm.__wbg_get_ellipsoidgeodesic_start(this.__wbg_ptr);
        return LLE.__wrap(ret);
    }
    /**
     * @param {LLE} arg0
     */
    set start(arg0) {
        _assertClass(arg0, LLE);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_ellipsoidgeodesic_start(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {LLE}
     */
    get end() {
        const ret = wasm.__wbg_get_ellipsoidgeodesic_end(this.__wbg_ptr);
        return LLE.__wrap(ret);
    }
    /**
     * @param {LLE} arg0
     */
    set end(arg0) {
        _assertClass(arg0, LLE);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_ellipsoidgeodesic_end(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number}
     */
    get distance() {
        const ret = wasm.__wbg_get_ellipsoidgeodesic_distance(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set distance(arg0) {
        wasm.__wbg_set_ellipsoidgeodesic_distance(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get start_heading() {
        const ret = wasm.__wbg_get_ellipsoidgeodesic_start_heading(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set start_heading(arg0) {
        wasm.__wbg_set_ellipsoidgeodesic_start_heading(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get end_heading() {
        const ret = wasm.__wbg_get_ellipsoidgeodesic_end_heading(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set end_heading(arg0) {
        wasm.__wbg_set_ellipsoidgeodesic_end_heading(this.__wbg_ptr, arg0);
    }
    /**
     * @param {LLE} start
     * @param {LLE} end
     */
    constructor(start, end) {
        _assertClass(start, LLE);
        var ptr0 = start.__destroy_into_raw();
        _assertClass(end, LLE);
        var ptr1 = end.__destroy_into_raw();
        const ret = wasm.ellipsoidgeodesic_new(ptr0, ptr1);
        this.__wbg_ptr = ret >>> 0;
        EllipsoidGeodesicFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number | null} [granularity]
     * @returns {LLE[]}
     */
    interpolateGeodeticPoints(granularity) {
        const ret = wasm.ellipsoidgeodesic_interpolateGeodeticPoints(this.__wbg_ptr, !isLikeNone(granularity), isLikeNone(granularity) ? 0 : granularity);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {number} distance
     * @returns {LLE}
     */
    interpolateDistance(distance) {
        const ret = wasm.ellipsoidgeodesic_interpolateDistance(this.__wbg_ptr, distance);
        return LLE.__wrap(ret);
    }
}

const EllipsoidTerrainMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_ellipsoidterrainmaterial_free(ptr >>> 0, 1));

export class EllipsoidTerrainMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EllipsoidTerrainMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ellipsoidterrainmaterial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_ellipsoidterrainmaterial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_ellipsoidterrainmaterial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_ellipsoidterrainmaterial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_ellipsoidterrainmaterial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get showBoundingBox() {
        const ret = wasm.__wbg_get_ellipsoidterrainmaterial_showBoundingBox(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set showBoundingBox(arg0) {
        wasm.__wbg_set_ellipsoidterrainmaterial_showBoundingBox(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get maxZoom() {
        const ret = wasm.__wbg_get_ellipsoidterrainmaterial_maxZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxZoom(arg0) {
        wasm.__wbg_set_ellipsoidterrainmaterial_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get minZoom() {
        const ret = wasm.__wbg_get_ellipsoidterrainmaterial_minZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set minZoom(arg0) {
        wasm.__wbg_set_ellipsoidterrainmaterial_minZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
}

const EncodedVec3Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_encodedvec3_free(ptr >>> 0, 1));

export class EncodedVec3 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EncodedVec3.prototype);
        obj.__wbg_ptr = ptr;
        EncodedVec3Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EncodedVec3Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_encodedvec3_free(ptr, 0);
    }
    /**
     * @returns {Vec3}
     */
    get high() {
        const ret = wasm.__wbg_get_encodedvec3_high(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set high(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_encodedvec3_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Vec3}
     */
    get low() {
        const ret = wasm.__wbg_get_encodedvec3_low(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set low(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_encodedvec3_low(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Vec3} high
     * @param {Vec3} low
     */
    constructor(high, low) {
        _assertClass(high, Vec3);
        var ptr0 = high.__destroy_into_raw();
        _assertClass(low, Vec3);
        var ptr1 = low.__destroy_into_raw();
        const ret = wasm.encodedvec3_new(ptr0, ptr1);
        this.__wbg_ptr = ret >>> 0;
        EncodedVec3Finalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const ExtentRadianF32Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_extentradianf32_free(ptr >>> 0, 1));

export class ExtentRadianF32 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ExtentRadianF32.prototype);
        obj.__wbg_ptr = ptr;
        ExtentRadianF32Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ExtentRadianF32Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_extentradianf32_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get west() {
        const ret = wasm.__wbg_get_extentradianf32_west(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set west(arg0) {
        wasm.__wbg_set_extentradianf32_west(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get south() {
        const ret = wasm.__wbg_get_extentradianf32_south(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set south(arg0) {
        wasm.__wbg_set_extentradianf32_south(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get east() {
        const ret = wasm.__wbg_get_extentradianf32_east(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set east(arg0) {
        wasm.__wbg_set_extentradianf32_east(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get north() {
        const ret = wasm.__wbg_get_extentradianf32_north(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set north(arg0) {
        wasm.__wbg_set_extentradianf32_north(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} west
     * @param {number} south
     * @param {number} east
     * @param {number} north
     */
    constructor(west, south, east, north) {
        const ret = wasm.extentradianf32_new(west, south, east, north);
        this.__wbg_ptr = ret >>> 0;
        ExtentRadianF32Finalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const FloatAttributeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_floatattribute_free(ptr >>> 0, 1));

export class FloatAttribute {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FloatAttributeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_floatattribute_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.__wbg_get_floatattribute_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set size(arg0) {
        wasm.__wbg_set_floatattribute_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Float32Array} data
     * @param {number} size
     */
    constructor(data, size) {
        const ptr0 = passArrayF32ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.floatattribute_new(ptr0, len0, size);
        this.__wbg_ptr = ret >>> 0;
        FloatAttributeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Float32Array}
     */
    transferData() {
        const ret = wasm.floatattribute_transferData(this.__wbg_ptr);
        return ret;
    }
}

const GeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geometry_free(ptr >>> 0, 1));

export class Geometry {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geometry_free(ptr, 0);
    }
    /**
     * @param {Float32Array} vertices
     * @param {Uint32Array} indices
     * @param {Float32Array} uvs
     */
    constructor(vertices, indices, uvs) {
        const ptr0 = passArrayF32ToWasm0(vertices, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArrayF32ToWasm0(uvs, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.geometry_new(ptr0, len0, ptr1, len1, ptr2, len2);
        this.__wbg_ptr = ret >>> 0;
        GeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Float32Array}
     */
    transferVertices() {
        const ret = wasm.geometry_transferVertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transferUvs() {
        const ret = wasm.geometry_transferUvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferIndices() {
        const ret = wasm.geometry_transferIndices(this.__wbg_ptr);
        return ret;
    }
}

const GlobeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_globe_free(ptr >>> 0, 1));
/**
 * WASM wrapper for Globe resource.
 *
 * This provides a JavaScript-friendly interface for accessing and modifying
 * globe configuration properties.
 */
export class Globe {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GlobeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_globe_free(ptr, 0);
    }
    /**
     * Screen-space error threshold for level of detail (LOD) calculations. Initialization only.
     * @returns {number}
     */
    get maxSse() {
        const ret = wasm.__wbg_get_globe_maxSse(this.__wbg_ptr);
        return ret;
    }
    /**
     * Screen-space error threshold for level of detail (LOD) calculations. Initialization only.
     * @param {number} arg0
     */
    set maxSse(arg0) {
        wasm.__wbg_set_globe_maxSse(this.__wbg_ptr, arg0);
    }
    /**
     * Number of segments for mesh tessellation. Initialization only.
     * @returns {number}
     */
    get segments() {
        const ret = wasm.__wbg_get_globe_segments(this.__wbg_ptr);
        return ret;
    }
    /**
     * Number of segments for mesh tessellation. Initialization only.
     * @param {number} arg0
     */
    set segments(arg0) {
        wasm.__wbg_set_globe_segments(this.__wbg_ptr, arg0);
    }
    /**
     * Base color for the globe surface (RGB as u32).
     * @returns {number}
     */
    get color() {
        const ret = wasm.__wbg_get_globe_color(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Base color for the globe surface (RGB as u32).
     * @param {number} arg0
     */
    set color(arg0) {
        wasm.__wbg_set_globe_color(this.__wbg_ptr, arg0);
    }
    /**
     * Whether to hide underground geometry. Disabling this value might cause unexpected behavior when using effect layer.
     * @returns {boolean}
     */
    get hideUnderground() {
        const ret = wasm.__wbg_get_globe_hideUnderground(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether to hide underground geometry. Disabling this value might cause unexpected behavior when using effect layer.
     * @param {boolean} arg0
     */
    set hideUnderground(arg0) {
        wasm.__wbg_set_globe_hideUnderground(this.__wbg_ptr, arg0);
    }
    /**
     * Whether to compute normals from vertex positions. Initialization only.
     * @returns {boolean}
     */
    get shouldComputeNormalFromVertex() {
        const ret = wasm.__wbg_get_globe_shouldComputeNormalFromVertex(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether to compute normals from vertex positions. Initialization only.
     * @param {boolean} arg0
     */
    set shouldComputeNormalFromVertex(arg0) {
        wasm.__wbg_set_globe_shouldComputeNormalFromVertex(this.__wbg_ptr, arg0);
    }
    /**
     * Whether materials should be transparent.
     * Note that blending works only for resource layer.
     * @returns {boolean}
     */
    get transparent() {
        const ret = wasm.__wbg_get_globe_transparent(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether materials should be transparent.
     * Note that blending works only for resource layer.
     * @param {boolean} arg0
     */
    set transparent(arg0) {
        wasm.__wbg_set_globe_transparent(this.__wbg_ptr, arg0);
    }
    /**
     * Global opacity for materials (0.0 to 1.0).
     * @returns {number}
     */
    get opacity() {
        const ret = wasm.__wbg_get_globe_opacity(this.__wbg_ptr);
        return ret;
    }
    /**
     * Global opacity for materials (0.0 to 1.0).
     * @param {number} arg0
     */
    set opacity(arg0) {
        wasm.__wbg_set_globe_opacity(this.__wbg_ptr, arg0);
    }
    /**
     * Whether to render materials in wireframe mode.
     * @returns {boolean}
     */
    get wireframe() {
        const ret = wasm.__wbg_get_globe_wireframe(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether to render materials in wireframe mode.
     * @param {boolean} arg0
     */
    set wireframe(arg0) {
        wasm.__wbg_set_globe_wireframe(this.__wbg_ptr, arg0);
    }
    /**
     * Color map lookup table for elevation heatmap rendering.
     * Flattened RGB array: [r0,g0,b0, r1,g1,b1, ...].
     * @returns {Float32Array}
     */
    get elevationColormap() {
        const ret = wasm.__wbg_get_globe_elevationColormap(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Color map lookup table for elevation heatmap rendering.
     * Flattened RGB array: [r0,g0,b0, r1,g1,b1, ...].
     * @param {Float32Array} arg0
     */
    set elevationColormap(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_globe_elevationColormap(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {number} max_sse
     * @param {number} segments
     * @param {number} color
     * @param {boolean} hide_underground
     * @param {boolean} should_compute_normal_from_vertex
     * @param {boolean} transparent
     * @param {number} opacity
     * @param {boolean} wireframe
     * @param {Float32Array} elevation_colormap
     */
    constructor(max_sse, segments, color, hide_underground, should_compute_normal_from_vertex, transparent, opacity, wireframe, elevation_colormap) {
        const ptr0 = passArrayF32ToWasm0(elevation_colormap, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.globe_new(max_sse, segments, color, hide_underground, should_compute_normal_from_vertex, transparent, opacity, wireframe, ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        GlobeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const LLEFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_lle_free(ptr >>> 0, 1));

export class LLE {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(LLE.prototype);
        obj.__wbg_ptr = ptr;
        LLEFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LLEFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_lle_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get lat() {
        const ret = wasm.__wbg_get_lle_lat(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set lat(arg0) {
        wasm.__wbg_set_lle_lat(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get lng() {
        const ret = wasm.__wbg_get_lle_lng(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set lng(arg0) {
        wasm.__wbg_set_lle_lng(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get height() {
        const ret = wasm.__wbg_get_lle_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set height(arg0) {
        wasm.__wbg_set_lle_height(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} lat
     * @param {number} lng
     * @param {number} height
     */
    constructor(lat, lng, height) {
        const ret = wasm.lle_new(lat, lng, height);
        this.__wbg_ptr = ret >>> 0;
        LLEFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const ModelInternalMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_modelinternalmaterial_free(ptr >>> 0, 1));

export class ModelInternalMaterial {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ModelInternalMaterial.prototype);
        obj.__wbg_ptr = ptr;
        ModelInternalMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ModelInternalMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_modelinternalmaterial_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get pointCloud() {
        const ret = wasm.__wbg_get_modelinternalmaterial_pointCloud(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set pointCloud(arg0) {
        wasm.__wbg_set_modelinternalmaterial_pointCloud(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get dracoCompressed() {
        const ret = wasm.__wbg_get_modelinternalmaterial_dracoCompressed(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set dracoCompressed(arg0) {
        wasm.__wbg_set_modelinternalmaterial_dracoCompressed(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {Vec3}
     */
    get pointCloudGeodeticNormal() {
        const ret = wasm.__wbg_get_modelinternalmaterial_pointCloudGeodeticNormal(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set pointCloudGeodeticNormal(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_modelinternalmaterial_pointCloudGeodeticNormal(this.__wbg_ptr, ptr0);
    }
}

const ModelMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_modelmaterial_free(ptr >>> 0, 1));

export class ModelMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ModelMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_modelmaterial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_modelmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_modelmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_modelmaterial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_modelmaterial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_modelmaterial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_modelmaterial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {string | undefined}
     */
    get url() {
        const ret = wasm.__wbg_get_modelmaterial_url(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set url(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_modelmaterial_url(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number | undefined}
     */
    get size() {
        const ret = wasm.__wbg_get_modelmaterial_size(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set size(arg0) {
        wasm.__wbg_set_modelmaterial_size(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_modelmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_modelmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get maxSse() {
        const ret = wasm.__wbg_get_modelmaterial_maxSse(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxSse(arg0) {
        wasm.__wbg_set_modelmaterial_maxSse(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_modelmaterial_clampToGround(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_modelmaterial_clampToGround(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get shouldRotateInDefault() {
        const ret = wasm.__wbg_get_modelmaterial_shouldRotateInDefault(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set shouldRotateInDefault(arg0) {
        wasm.__wbg_set_modelmaterial_shouldRotateInDefault(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_modelmaterial_color(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_modelmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get metalness() {
        const ret = wasm.__wbg_get_modelmaterial_metalness(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set metalness(arg0) {
        wasm.__wbg_set_modelmaterial_metalness(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Reflectivity for post-process.
     * @returns {number | undefined}
     */
    get roughness() {
        const ret = wasm.__wbg_get_billboardmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Reflectivity for post-process.
     * @param {number | null} [arg0]
     */
    set roughness(arg0) {
        wasm.__wbg_set_billboardmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Reflectivity for post-process or env map.
     * @returns {number | undefined}
     */
    get reflectivity() {
        const ret = wasm.__wbg_get_billboardmaterial_alphaTest(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Reflectivity for post-process or env map.
     * @param {number | null} [arg0]
     */
    set reflectivity(arg0) {
        wasm.__wbg_set_billboardmaterial_alphaTest(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     * @returns {boolean | undefined}
     */
    get water() {
        const ret = wasm.__wbg_get_modelmaterial_water(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     * @param {boolean | null} [arg0]
     */
    set water(arg0) {
        wasm.__wbg_set_modelmaterial_water(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {string | undefined}
     */
    get waterNormalUrl() {
        const ret = wasm.__wbg_get_modelmaterial_waterNormalUrl(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set waterNormalUrl(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_modelmaterial_waterNormalUrl(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     * @returns {number | undefined}
     */
    get waterScaleNormal() {
        const ret = wasm.__wbg_get_modelmaterial_waterScaleNormal(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     * @param {number | null} [arg0]
     */
    set waterScaleNormal(arg0) {
        wasm.__wbg_set_modelmaterial_waterScaleNormal(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Water wave speed.
     * @returns {number | undefined}
     */
    get waterSpeed() {
        const ret = wasm.__wbg_get_modelmaterial_waterSpeed(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Water wave speed.
     * @param {number | null} [arg0]
     */
    set waterSpeed(arg0) {
        wasm.__wbg_set_modelmaterial_waterSpeed(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get shininess() {
        const ret = wasm.__wbg_get_modelmaterial_shininess(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set shininess(arg0) {
        wasm.__wbg_set_modelmaterial_shininess(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get specularStrength() {
        const ret = wasm.__wbg_get_modelmaterial_specularStrength(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set specularStrength(arg0) {
        wasm.__wbg_set_modelmaterial_specularStrength(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get applyWaterNormal() {
        const ret = wasm.__wbg_get_modelmaterial_applyWaterNormal(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set applyWaterNormal(arg0) {
        wasm.__wbg_set_modelmaterial_applyWaterNormal(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     * @returns {boolean | undefined}
     */
    get specular() {
        const ret = wasm.__wbg_get_modelmaterial_specular(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     * @param {boolean | null} [arg0]
     */
    set specular(arg0) {
        wasm.__wbg_set_modelmaterial_specular(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get ior() {
        const ret = wasm.__wbg_get_modelmaterial_ior(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set ior(arg0) {
        wasm.__wbg_set_modelmaterial_ior(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {string | undefined}
     */
    get animationActiveClip() {
        const ret = wasm.__wbg_get_modelmaterial_animationActiveClip(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set animationActiveClip(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_modelmaterial_animationActiveClip(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number | undefined}
     */
    get animationSpeed() {
        const ret = wasm.__wbg_get_modelmaterial_animationSpeed(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set animationSpeed(arg0) {
        wasm.__wbg_set_modelmaterial_animationSpeed(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get pointSize() {
        const ret = wasm.__wbg_get_modelmaterial_pointSize(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set pointSize(arg0) {
        wasm.__wbg_set_modelmaterial_pointSize(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get showBoundingBox() {
        const ret = wasm.__wbg_get_modelmaterial_showBoundingBox(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set showBoundingBox(arg0) {
        wasm.__wbg_set_modelmaterial_showBoundingBox(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {ModelInternalMaterial | undefined}
     */
    get __internal__() {
        const ret = wasm.__wbg_get_modelmaterial___internal__(this.__wbg_ptr);
        return ret === 0 ? undefined : ModelInternalMaterial.__wrap(ret);
    }
    /**
     * @param {ModelInternalMaterial | null} [arg0]
     */
    set __internal__(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ModelInternalMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_modelmaterial___internal__(this.__wbg_ptr, ptr0);
    }
}

const NearFarFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_nearfar_free(ptr >>> 0, 1));

export class NearFar {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        NearFarFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_nearfar_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get near() {
        const ret = wasm.__wbg_get_nearfar_near(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set near(arg0) {
        wasm.__wbg_set_nearfar_near(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get far() {
        const ret = wasm.__wbg_get_nearfar_far(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set far(arg0) {
        wasm.__wbg_set_nearfar_far(this.__wbg_ptr, arg0);
    }
}

const OverscaledTileHandleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_overscaledtilehandle_free(ptr >>> 0, 1));

export class OverscaledTileHandle {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OverscaledTileHandleFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_overscaledtilehandle_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get handle() {
        const ret = wasm.__wbg_get_overscaledtilehandle_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set handle(arg0) {
        wasm.__wbg_set_overscaledtilehandle_handle(this.__wbg_ptr, arg0);
    }
}

const PlaneFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_plane_free(ptr >>> 0, 1));

export class Plane {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Plane.prototype);
        obj.__wbg_ptr = ptr;
        PlaneFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PlaneFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_plane_free(ptr, 0);
    }
    /**
     * @returns {Vec3}
     */
    get normal() {
        const ret = wasm.__wbg_get_plane_normal(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set normal(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_plane_normal(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number}
     */
    get distance() {
        const ret = wasm.__wbg_get_plane_distance(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set distance(arg0) {
        wasm.__wbg_set_plane_distance(this.__wbg_ptr, arg0);
    }
}

const PointMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pointmaterial_free(ptr >>> 0, 1));

export class PointMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PointMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pointmaterial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_pointmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_pointmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get size() {
        const ret = wasm.__wbg_get_billboardmaterial_size(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set size(arg0) {
        wasm.__wbg_set_billboardmaterial_size(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_billboardmaterial_color(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_billboardmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {Vec2 | undefined}
     */
    get center() {
        const ret = wasm.__wbg_get_billboardmaterial_center(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec2.__wrap(ret);
    }
    /**
     * @param {Vec2 | null} [arg0]
     */
    set center(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec2);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_billboardmaterial_center(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_billboardmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_billboardmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get scaleByDistance() {
        const ret = wasm.__wbg_get_pointmaterial_scaleByDistance(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set scaleByDistance(arg0) {
        wasm.__wbg_set_pointmaterial_scaleByDistance(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_pointmaterial_clampToGround(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_pointmaterial_clampToGround(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get depthTest() {
        const ret = wasm.__wbg_get_pointmaterial_depthTest(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set depthTest(arg0) {
        wasm.__wbg_set_pointmaterial_depthTest(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get transparent() {
        const ret = wasm.__wbg_get_pointmaterial_transparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set transparent(arg0) {
        wasm.__wbg_set_pointmaterial_transparent(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
}

const PolygonGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polygongeometry_free(ptr >>> 0, 1));

export class PolygonGeometry {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolygonGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polygongeometry_free(ptr, 0);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_3d_high() {
        const ret = wasm.polygongeometry_position_3d_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_3d_high_size() {
        const ret = wasm.polygongeometry_position_3d_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_3d_low() {
        const ret = wasm.polygongeometry_position_3d_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_3d_low_size() {
        const ret = wasm.polygongeometry_position_3d_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position() {
        const ret = wasm.polygongeometry_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_size() {
        const ret = wasm.polygongeometry_position_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    normal() {
        const ret = wasm.polygongeometry_normal(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    normal_size() {
        const ret = wasm.polygongeometry_normal_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    scale_normal_and_cap() {
        const ret = wasm.polygongeometry_scale_normal_and_cap(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    scale_normal_and_cap_size() {
        const ret = wasm.polygongeometry_scale_normal_and_cap_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    batch_id() {
        const ret = wasm.polygongeometry_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_id_size() {
        const ret = wasm.polygongeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    batch_index() {
        const ret = wasm.polygongeometry_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_index_size() {
        const ret = wasm.polygongeometry_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.polygongeometry_indices(this.__wbg_ptr);
        return ret;
    }
}

const PolygonGeometryAttributesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polygongeometryattributes_free(ptr >>> 0, 1));

export class PolygonGeometryAttributes {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolygonGeometryAttributesFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polygongeometryattributes_free(ptr, 0);
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_position_3d_high() {
        const ret = wasm.polygongeometryattributes_transfer_position_3d_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_position_3d_high_size() {
        const ret = wasm.polygongeometryattributes_transfer_position_3d_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_position_3d_low() {
        const ret = wasm.polygongeometryattributes_transfer_position_3d_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_position_3d_low_size() {
        const ret = wasm.polygongeometryattributes_transfer_position_3d_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_position() {
        const ret = wasm.polygongeometryattributes_transfer_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_position_size() {
        const ret = wasm.polygongeometryattributes_transfer_position_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_normal() {
        const ret = wasm.polygongeometryattributes_transfer_normal(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_normal_size() {
        const ret = wasm.polygongeometryattributes_transfer_normal_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_scale_normal_and_cap() {
        const ret = wasm.polygongeometryattributes_transfer_scale_normal_and_cap(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_scale_normal_and_cap_size() {
        const ret = wasm.polygongeometryattributes_transfer_scale_normal_and_cap_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_batch_id() {
        const ret = wasm.polygongeometryattributes_transfer_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_batch_id_size() {
        const ret = wasm.polygongeometryattributes_transfer_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    transfer_batch_index() {
        const ret = wasm.polygongeometryattributes_transfer_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_batch_index_size() {
        const ret = wasm.polygongeometryattributes_transfer_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
}

const PolygonInternalMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polygoninternalmaterial_free(ptr >>> 0, 1));

export class PolygonInternalMaterial {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PolygonInternalMaterial.prototype);
        obj.__wbg_ptr = ptr;
        PolygonInternalMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolygonInternalMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polygoninternalmaterial_free(ptr, 0);
    }
    /**
     * @returns {Float64Array}
     */
    get minMaxHeights() {
        const ret = wasm.__wbg_get_polygoninternalmaterial_minMaxHeights(this.__wbg_ptr);
        var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        return v1;
    }
    /**
     * @param {Float64Array} arg0
     */
    set minMaxHeights(arg0) {
        const ptr0 = passArrayF64ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polygoninternalmaterial_minMaxHeights(this.__wbg_ptr, ptr0, len0);
    }
}

const PolygonMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polygonmaterial_free(ptr >>> 0, 1));

export class PolygonMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolygonMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polygonmaterial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_polygonmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_polygonmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_polygonmaterial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_polygonmaterial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_polygonmaterial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_polygonmaterial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_ellipsoidterrainmaterial_maxZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_ellipsoidterrainmaterial_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_polygonmaterial_clampToGround(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_polygonmaterial_clampToGround(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get useGroundNormals() {
        const ret = wasm.__wbg_get_polygonmaterial_useGroundNormals(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set useGroundNormals(arg0) {
        wasm.__wbg_set_polygonmaterial_useGroundNormals(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_polygonmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_polygonmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get extrudedHeight() {
        const ret = wasm.__wbg_get_polygonmaterial_extrudedHeight(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set extrudedHeight(arg0) {
        wasm.__wbg_set_polygonmaterial_extrudedHeight(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get wireframe() {
        const ret = wasm.__wbg_get_polygonmaterial_wireframe(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set wireframe(arg0) {
        wasm.__wbg_set_polygonmaterial_wireframe(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Reflectivity for post-process or env map.
     * @returns {number | undefined}
     */
    get reflectivity() {
        const ret = wasm.__wbg_get_polygonmaterial_reflectivity(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Reflectivity for post-process or env map.
     * @param {number | null} [arg0]
     */
    set reflectivity(arg0) {
        wasm.__wbg_set_polygonmaterial_reflectivity(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Reflectivity for post-process.
     * @returns {number | undefined}
     */
    get roughness() {
        const ret = wasm.__wbg_get_polygonmaterial_roughness(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Reflectivity for post-process.
     * @param {number | null} [arg0]
     */
    set roughness(arg0) {
        wasm.__wbg_set_polygonmaterial_roughness(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {PolygonInternalMaterial | undefined}
     */
    get __internal__() {
        const ret = wasm.__wbg_get_polygonmaterial___internal__(this.__wbg_ptr);
        return ret === 0 ? undefined : PolygonInternalMaterial.__wrap(ret);
    }
    /**
     * @param {PolygonInternalMaterial | null} [arg0]
     */
    set __internal__(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolygonInternalMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_polygonmaterial___internal__(this.__wbg_ptr, ptr0);
    }
    /**
     * Whether or not the height is obtained from the data. If false, the height is constant.
     * @returns {boolean | undefined}
     */
    get perPositionHeight() {
        const ret = wasm.__wbg_get_polygonmaterial_perPositionHeight(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether or not the height is obtained from the data. If false, the height is constant.
     * @param {boolean | null} [arg0]
     */
    set perPositionHeight(arg0) {
        wasm.__wbg_set_polygonmaterial_perPositionHeight(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Need to enable `transparent`.
     * @returns {number | undefined}
     */
    get opacity() {
        const ret = wasm.__wbg_get_polygonmaterial_opacity(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Need to enable `transparent`.
     * @param {number | null} [arg0]
     */
    set opacity(arg0) {
        wasm.__wbg_set_polygonmaterial_opacity(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Enable `opacity`. It might cause unexpected behavior when you use an effect layer.
     * @returns {boolean | undefined}
     */
    get transparent() {
        const ret = wasm.__wbg_get_polygonmaterial_transparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Enable `opacity`. It might cause unexpected behavior when you use an effect layer.
     * @param {boolean | null} [arg0]
     */
    set transparent(arg0) {
        wasm.__wbg_set_polygonmaterial_transparent(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @returns {boolean | undefined}
     */
    get surfaceShow() {
        const ret = wasm.__wbg_get_polygonmaterial_surfaceShow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @param {boolean | null} [arg0]
     */
    set surfaceShow(arg0) {
        wasm.__wbg_set_polygonmaterial_surfaceShow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @returns {boolean | undefined}
     */
    get outlineShow() {
        const ret = wasm.__wbg_get_polygonmaterial_outlineShow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @param {boolean | null} [arg0]
     */
    set outlineShow(arg0) {
        wasm.__wbg_set_polygonmaterial_outlineShow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @returns {number | undefined}
     */
    get outlineColor() {
        const ret = wasm.__wbg_get_polygonmaterial_outlineColor(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @param {number | null} [arg0]
     */
    set outlineColor(arg0) {
        wasm.__wbg_set_polygonmaterial_outlineColor(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @returns {number | undefined}
     */
    get outlineWidth() {
        const ret = wasm.__wbg_get_polygonmaterial_outlineWidth(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Currently, this property is supported only in GeoJSON.
     * @param {number | null} [arg0]
     */
    set outlineWidth(arg0) {
        wasm.__wbg_set_polygonmaterial_outlineWidth(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     * @returns {boolean | undefined}
     */
    get water() {
        const ret = wasm.__wbg_get_polygonmaterial_water(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Apply a water material on the polygon. It might slow down the loading of the mesh.
     * @param {boolean | null} [arg0]
     */
    set water(arg0) {
        wasm.__wbg_set_polygonmaterial_water(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {string | undefined}
     */
    get waterNormalUrl() {
        const ret = wasm.__wbg_get_polygonmaterial_waterNormalUrl(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set waterNormalUrl(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polygonmaterial_waterNormalUrl(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     * @returns {number | undefined}
     */
    get waterScaleNormal() {
        const ret = wasm.__wbg_get_polygonmaterial_waterScaleNormal(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     * @param {number | null} [arg0]
     */
    set waterScaleNormal(arg0) {
        wasm.__wbg_set_polygonmaterial_waterScaleNormal(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Water wave speed.
     * @returns {number | undefined}
     */
    get waterSpeed() {
        const ret = wasm.__wbg_get_polygonmaterial_waterSpeed(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Water wave speed.
     * @param {number | null} [arg0]
     */
    set waterSpeed(arg0) {
        wasm.__wbg_set_polygonmaterial_waterSpeed(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get shininess() {
        const ret = wasm.__wbg_get_polygonmaterial_shininess(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set shininess(arg0) {
        wasm.__wbg_set_polygonmaterial_shininess(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get specularStrength() {
        const ret = wasm.__wbg_get_polygonmaterial_specularStrength(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set specularStrength(arg0) {
        wasm.__wbg_set_polygonmaterial_specularStrength(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get applyWaterNormal() {
        const ret = wasm.__wbg_get_polygonmaterial_applyWaterNormal(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set applyWaterNormal(arg0) {
        wasm.__wbg_set_polygonmaterial_applyWaterNormal(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     * @returns {boolean | undefined}
     */
    get specular() {
        const ret = wasm.__wbg_get_polygonmaterial_specular(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Enabling this value allows using `shininess` and `specular_strength`.
     * @param {boolean | null} [arg0]
     */
    set specular(arg0) {
        wasm.__wbg_set_polygonmaterial_specular(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get ior() {
        const ret = wasm.__wbg_get_polygonmaterial_ior(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set ior(arg0) {
        wasm.__wbg_set_polygonmaterial_ior(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @param {boolean | null} [show]
     * @param {boolean | null} [cast_shadow]
     * @param {boolean | null} [receive_shadow]
     * @param {number | null} [color]
     * @param {boolean | null} [clamp_to_ground]
     * @param {boolean | null} [use_ground_normals]
     * @param {number | null} [height]
     * @param {number | null} [extruded_height]
     * @param {boolean | null} [wireframe]
     * @param {boolean | null} [per_position_height]
     * @param {PolygonInternalMaterial | null} [__internal__]
     */
    constructor(show, cast_shadow, receive_shadow, color, clamp_to_ground, use_ground_normals, height, extruded_height, wireframe, per_position_height, __internal__) {
        let ptr0 = 0;
        if (!isLikeNone(__internal__)) {
            _assertClass(__internal__, PolygonInternalMaterial);
            ptr0 = __internal__.__destroy_into_raw();
        }
        const ret = wasm.polygonmaterial_new(isLikeNone(show) ? 0xFFFFFF : show ? 1 : 0, isLikeNone(cast_shadow) ? 0xFFFFFF : cast_shadow ? 1 : 0, isLikeNone(receive_shadow) ? 0xFFFFFF : receive_shadow ? 1 : 0, isLikeNone(color) ? 0x100000001 : (color) >>> 0, isLikeNone(clamp_to_ground) ? 0xFFFFFF : clamp_to_ground ? 1 : 0, isLikeNone(use_ground_normals) ? 0xFFFFFF : use_ground_normals ? 1 : 0, isLikeNone(height) ? 0x100000001 : Math.fround(height), isLikeNone(extruded_height) ? 0x100000001 : Math.fround(extruded_height), isLikeNone(wireframe) ? 0xFFFFFF : wireframe ? 1 : 0, isLikeNone(per_position_height) ? 0xFFFFFF : per_position_height ? 1 : 0, ptr0);
        this.__wbg_ptr = ret >>> 0;
        PolygonMaterialFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const PolylineGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polylinegeometry_free(ptr >>> 0, 1));

export class PolylineGeometry {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolylineGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polylinegeometry_free(ptr, 0);
    }
    /**
     * @returns {Float32Array}
     */
    position() {
        const ret = wasm.polylinegeometry_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    position_size() {
        const ret = wasm.polylinegeometry_position_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    start() {
        const ret = wasm.polylinegeometry_start(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    start_size() {
        const ret = wasm.polylinegeometry_start_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    forward_offset() {
        const ret = wasm.polylinegeometry_forward_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    forward_offset_size() {
        const ret = wasm.polylinegeometry_forward_offset_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    start_normals() {
        const ret = wasm.polylinegeometry_start_normals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    start_normals_size() {
        const ret = wasm.polylinegeometry_start_normals_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    end_normal_and_texture_coordinate_normalization_x() {
        const ret = wasm.polylinegeometry_end_normal_and_texture_coordinate_normalization_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    end_normal_and_texture_coordinate_normalization_x_size() {
        const ret = wasm.polylinegeometry_end_normal_and_texture_coordinate_normalization_x_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    right_normal_and_texture_coordinate_normalization_y() {
        const ret = wasm.polylinegeometry_right_normal_and_texture_coordinate_normalization_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    right_normal_and_texture_coordinate_normalization_y_size() {
        const ret = wasm.polylinegeometry_right_normal_and_texture_coordinate_normalization_y_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    batch_id() {
        const ret = wasm.polylinegeometry_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_id_size() {
        const ret = wasm.polylinegeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    batch_index() {
        const ret = wasm.polylinegeometry_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    batch_index_size() {
        const ret = wasm.polylinegeometry_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.polylinegeometry_indices(this.__wbg_ptr);
        return ret;
    }
}

const PolylineGeometryAttributesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polylinegeometryattributes_free(ptr >>> 0, 1));

export class PolylineGeometryAttributes {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolylineGeometryAttributesFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polylinegeometryattributes_free(ptr, 0);
    }
    /**
     * @returns {Float32Array}
     */
    transfer_position() {
        const ret = wasm.polylinegeometryattributes_transfer_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    transfer_position_size() {
        const ret = wasm.polylinegeometry_position_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transfer_start() {
        const ret = wasm.polylinegeometryattributes_transfer_start(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    transfer_start_size() {
        const ret = wasm.polylinegeometry_start_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transfer_forward_offset() {
        const ret = wasm.polylinegeometryattributes_transfer_forward_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    transfer_forward_offset_size() {
        const ret = wasm.polylinegeometry_forward_offset_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transfer_start_normals() {
        const ret = wasm.polylinegeometryattributes_transfer_start_normals(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    transfer_start_normals_size() {
        const ret = wasm.polylinegeometry_start_normals_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transfer_end_normal_and_texture_coordinate_normalization_x() {
        const ret = wasm.polylinegeometryattributes_transfer_end_normal_and_texture_coordinate_normalization_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    transfer_end_normal_and_texture_coordinate_normalization_x_size() {
        const ret = wasm.polylinegeometry_end_normal_and_texture_coordinate_normalization_x_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transfer_right_normal_and_texture_coordinate_normalization_y() {
        const ret = wasm.polylinegeometryattributes_transfer_right_normal_and_texture_coordinate_normalization_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    transfer_right_normal_and_texture_coordinate_normalization_y_size() {
        const ret = wasm.polylinegeometry_right_normal_and_texture_coordinate_normalization_y_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_batch_id() {
        const ret = wasm.polylinegeometryattributes_transfer_batch_id(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_batch_id_size() {
        const ret = wasm.polylinegeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    transfer_batch_index() {
        const ret = wasm.polylinegeometryattributes_transfer_batch_index(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_batch_index_size() {
        const ret = wasm.polylinegeometry_batch_index_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
}

const PolylineInternalMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polylineinternalmaterial_free(ptr >>> 0, 1));

export class PolylineInternalMaterial {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PolylineInternalMaterial.prototype);
        obj.__wbg_ptr = ptr;
        PolylineInternalMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolylineInternalMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polylineinternalmaterial_free(ptr, 0);
    }
    /**
     * @returns {Float64Array}
     */
    get minMaxHeights() {
        const ret = wasm.__wbg_get_polylineinternalmaterial_minMaxHeights(this.__wbg_ptr);
        var v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        return v1;
    }
    /**
     * @param {Float64Array} arg0
     */
    set minMaxHeights(arg0) {
        const ptr0 = passArrayF64ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polygoninternalmaterial_minMaxHeights(this.__wbg_ptr, ptr0, len0);
    }
}

const PolylineMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polylinematerial_free(ptr >>> 0, 1));

export class PolylineMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolylineMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polylinematerial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_polylinematerial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_polylinematerial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_polylinematerial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_polylinematerial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_polylinematerial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_polylinematerial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_ellipsoidterrainmaterial_maxZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_ellipsoidterrainmaterial_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get width() {
        const ret = wasm.__wbg_get_polygonmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set width(arg0) {
        wasm.__wbg_set_polygonmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_polylinematerial_clampToGround(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_polylinematerial_clampToGround(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get useGroundNormals() {
        const ret = wasm.__wbg_get_polylinematerial_useGroundNormals(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set useGroundNormals(arg0) {
        wasm.__wbg_set_polylinematerial_useGroundNormals(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_polygonmaterial_extrudedHeight(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_polygonmaterial_extrudedHeight(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {PolylineInternalMaterial | undefined}
     */
    get __internal__() {
        const ret = wasm.__wbg_get_polylinematerial___internal__(this.__wbg_ptr);
        return ret === 0 ? undefined : PolylineInternalMaterial.__wrap(ret);
    }
    /**
     * @param {PolylineInternalMaterial | null} [arg0]
     */
    set __internal__(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolylineInternalMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_polylinematerial___internal__(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean | null} [show]
     * @param {boolean | null} [cast_shadow]
     * @param {boolean | null} [receive_shadow]
     * @param {number | null} [color]
     * @param {boolean | null} [clamp_to_ground]
     * @param {boolean | null} [use_ground_normals]
     * @param {number | null} [height]
     * @param {number | null} [width]
     * @param {PolylineInternalMaterial | null} [__internal__]
     */
    constructor(show, cast_shadow, receive_shadow, color, clamp_to_ground, use_ground_normals, height, width, __internal__) {
        let ptr0 = 0;
        if (!isLikeNone(__internal__)) {
            _assertClass(__internal__, PolylineInternalMaterial);
            ptr0 = __internal__.__destroy_into_raw();
        }
        const ret = wasm.polylinematerial_new(isLikeNone(show) ? 0xFFFFFF : show ? 1 : 0, isLikeNone(cast_shadow) ? 0xFFFFFF : cast_shadow ? 1 : 0, isLikeNone(receive_shadow) ? 0xFFFFFF : receive_shadow ? 1 : 0, isLikeNone(color) ? 0x100000001 : (color) >>> 0, isLikeNone(clamp_to_ground) ? 0xFFFFFF : clamp_to_ground ? 1 : 0, isLikeNone(use_ground_normals) ? 0xFFFFFF : use_ground_normals ? 1 : 0, isLikeNone(height) ? 0x100000001 : Math.fround(height), isLikeNone(width) ? 0x100000001 : Math.fround(width), ptr0);
        this.__wbg_ptr = ret >>> 0;
        PolylineMaterialFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const RasterTerrainMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rasterterrainmaterial_free(ptr >>> 0, 1));

export class RasterTerrainMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RasterTerrainMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rasterterrainmaterial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get showBoundingBox() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_showBoundingBox(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set showBoundingBox(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_showBoundingBox(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get maxZoom() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_maxZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxZoom(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * The terrain is upsampled until it reaches `overscaled_max_zoom`.
     * @returns {number | undefined}
     */
    get overscaledMaxZoom() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_overscaledMaxZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * The terrain is upsampled until it reaches `overscaled_max_zoom`.
     * @param {number | null} [arg0]
     */
    set overscaledMaxZoom(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_overscaledMaxZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get minZoom() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_minZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set minZoom(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_minZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {ElevationDecoder | undefined}
     */
    get elevationDecoder() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_elevationDecoder(this.__wbg_ptr);
        return ret === 0 ? undefined : ElevationDecoder.__wrap(ret);
    }
    /**
     * @param {ElevationDecoder | null} [arg0]
     */
    set elevationDecoder(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ElevationDecoder);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_rasterterrainmaterial_elevationDecoder(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number | undefined}
     */
    get tileSize() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_tileSize(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set tileSize(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_tileSize(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
}

const RasterTileInternalMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rastertileinternalmaterial_free(ptr >>> 0, 1));

export class RasterTileInternalMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RasterTileInternalMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rastertileinternalmaterial_free(ptr, 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get shows() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_shows(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {Uint8Array} arg0
     */
    set shows(arg0) {
        const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertileinternalmaterial_shows(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {Uint32Array}
     */
    get colors() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_colors(this.__wbg_ptr);
        var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {Uint32Array} arg0
     */
    set colors(arg0) {
        const ptr0 = passArray32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertileinternalmaterial_colors(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {Float32Array}
     */
    get opacities() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_opacities(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {Float32Array} arg0
     */
    set opacities(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertileinternalmaterial_opacities(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get showBoundingBox() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_showBoundingBox(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set showBoundingBox(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_showBoundingBox(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {Uint8Array}
     */
    get isElevationHeatmaps() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_isElevationHeatmaps(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {Uint8Array} arg0
     */
    set isElevationHeatmaps(arg0) {
        const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_rastertileinternalmaterial_isElevationHeatmaps(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number}
     */
    get elevationMinHeight() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationMinHeight(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set elevationMinHeight(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationMinHeight(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get elevationMaxHeight() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationMaxHeight(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set elevationMaxHeight(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationMaxHeight(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get elevationRScaler() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationRScaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set elevationRScaler(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationRScaler(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get elevationGScaler() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationGScaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set elevationGScaler(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationGScaler(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get elevationBScaler() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationBScaler(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set elevationBScaler(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationBScaler(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get elevationBoundary() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationBoundary(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set elevationBoundary(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationBoundary(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get elevationMaxOffset() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationMaxOffset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set elevationMaxOffset(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationMaxOffset(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get elevationMinOffset() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationMinOffset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set elevationMinOffset(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationMinOffset(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get elevationEpsilon() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationEpsilon(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set elevationEpsilon(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationEpsilon(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get elevationOffset() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_elevationOffset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set elevationOffset(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_elevationOffset(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get logarithmic() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_logarithmic(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set logarithmic(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_logarithmic(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get logBoundary() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_logBoundary(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set logBoundary(arg0) {
        wasm.__wbg_set_rastertileinternalmaterial_logBoundary(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {any[] | undefined}
     */
    texture_fragments() {
        const ret = wasm.rastertileinternalmaterial_texture_fragments(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
}

const RasterTileMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rastertilematerial_free(ptr >>> 0, 1));

export class RasterTileMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RasterTileMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_rastertilematerial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_rastertilematerial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_rastertilematerial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_ellipsoidterrainmaterial_maxZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_ellipsoidterrainmaterial_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get opacity() {
        const ret = wasm.__wbg_get_polygonmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set opacity(arg0) {
        wasm.__wbg_set_polygonmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get maxZoom() {
        const ret = wasm.__wbg_get_rastertilematerial_maxZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxZoom(arg0) {
        wasm.__wbg_set_rastertilematerial_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get minZoom() {
        const ret = wasm.__wbg_get_rastertilematerial_minZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set minZoom(arg0) {
        wasm.__wbg_set_rastertilematerial_minZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get tms() {
        const ret = wasm.__wbg_get_rastertilematerial_tms(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set tms(arg0) {
        wasm.__wbg_set_rastertilematerial_tms(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get showBoundingBox() {
        const ret = wasm.__wbg_get_rastertilematerial_showBoundingBox(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set showBoundingBox(arg0) {
        wasm.__wbg_set_rastertilematerial_showBoundingBox(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
}

const RayFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_ray_free(ptr >>> 0, 1));

export class Ray {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Ray.prototype);
        obj.__wbg_ptr = ptr;
        RayFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RayFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ray_free(ptr, 0);
    }
    /**
     * @returns {Vec3}
     */
    get origin() {
        const ret = wasm.__wbg_get_ray_origin(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set origin(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_ray_origin(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Vec3}
     */
    get direction() {
        const ret = wasm.__wbg_get_ray_direction(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set direction(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_ray_direction(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Vec3} origin
     * @param {Vec3} direction
     */
    constructor(origin, direction) {
        _assertClass(origin, Vec3);
        var ptr0 = origin.__destroy_into_raw();
        _assertClass(direction, Vec3);
        var ptr1 = direction.__destroy_into_raw();
        const ret = wasm.ray_new(ptr0, ptr1);
        this.__wbg_ptr = ret >>> 0;
        RayFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} t
     * @returns {Vec3}
     */
    getPoint(t) {
        const ret = wasm.ray_getPoint(this.__wbg_ptr, t);
        return Vec3.__wrap(ret);
    }
}

const ReturnedConstructedTerrainMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_returnedconstructedterrainmesh_free(ptr >>> 0, 1));

export class ReturnedConstructedTerrainMesh {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ReturnedConstructedTerrainMeshFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_returnedconstructedterrainmesh_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get max_height() {
        const ret = wasm.__wbg_get_returnedconstructedterrainmesh_max_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set max_height(arg0) {
        wasm.__wbg_set_returnedconstructedterrainmesh_max_height(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get min_height() {
        const ret = wasm.__wbg_get_returnedconstructedterrainmesh_min_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set min_height(arg0) {
        wasm.__wbg_set_returnedconstructedterrainmesh_min_height(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {Vec3 | undefined}
     */
    get rtc_translation() {
        const ret = wasm.__wbg_get_returnedconstructedterrainmesh_rtc_translation(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3 | null} [arg0]
     */
    set rtc_translation(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec3);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_returnedconstructedterrainmesh_rtc_translation(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Geometry} geometry
     * @param {number} max_height
     * @param {number} min_height
     * @param {Float32Array} heights
     * @param {Vec3 | null} [rtc_translation]
     */
    constructor(geometry, max_height, min_height, heights, rtc_translation) {
        _assertClass(geometry, Geometry);
        var ptr0 = geometry.__destroy_into_raw();
        const ptr1 = passArrayF32ToWasm0(heights, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        let ptr2 = 0;
        if (!isLikeNone(rtc_translation)) {
            _assertClass(rtc_translation, Vec3);
            ptr2 = rtc_translation.__destroy_into_raw();
        }
        const ret = wasm.returnedconstructedterrainmesh_new(ptr0, max_height, min_height, ptr1, len1, ptr2);
        this.__wbg_ptr = ret >>> 0;
        ReturnedConstructedTerrainMeshFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Float32Array}
     */
    transferVertices() {
        const ret = wasm.returnedconstructedterrainmesh_transferVertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transferUvs() {
        const ret = wasm.returnedconstructedterrainmesh_transferUvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferIndices() {
        const ret = wasm.returnedconstructedterrainmesh_transferIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
     */
    transferHeights() {
        const ret = wasm.returnedconstructedterrainmesh_transferHeights(this.__wbg_ptr);
        return ret;
    }
}

const TextMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_textmaterial_free(ptr >>> 0, 1));

export class TextMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_textmaterial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_modelmaterial_shouldRotateInDefault(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_modelmaterial_shouldRotateInDefault(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get size() {
        const ret = wasm.__wbg_get_modelmaterial_shininess(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set size(arg0) {
        wasm.__wbg_set_modelmaterial_shininess(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_overscaledMaxZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_overscaledMaxZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {Vec2 | undefined}
     */
    get center() {
        const ret = wasm.__wbg_get_billboardmaterial_center(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec2.__wrap(ret);
    }
    /**
     * @param {Vec2 | null} [arg0]
     */
    set center(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec2);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_billboardmaterial_center(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_modelmaterial_ior(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_modelmaterial_ior(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get scaleByDistance() {
        const ret = wasm.__wbg_get_modelmaterial_water(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set scaleByDistance(arg0) {
        wasm.__wbg_set_modelmaterial_water(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_modelmaterial_applyWaterNormal(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_modelmaterial_applyWaterNormal(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get depthTest() {
        const ret = wasm.__wbg_get_modelmaterial_specular(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set depthTest(arg0) {
        wasm.__wbg_set_modelmaterial_specular(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {string | undefined}
     */
    get text() {
        const ret = wasm.__wbg_get_textmaterial_text(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string | null} [arg0]
     */
    set text(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_textmaterial_text(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Specify URL for font file. Supported files are ttf, otf and woff. Default is `Roboto`.
     * @returns {string | undefined}
     */
    get font() {
        const ret = wasm.__wbg_get_textmaterial_font(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Specify URL for font file. Supported files are ttf, otf and woff. Default is `Roboto`.
     * @param {string | null} [arg0]
     */
    set font(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_textmaterial_font(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number | undefined}
     */
    get backgroundColor() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_tileSize(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set backgroundColor(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_tileSize(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get borderColor() {
        const ret = wasm.__wbg_get_textmaterial_borderColor(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set borderColor(arg0) {
        wasm.__wbg_set_textmaterial_borderColor(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get borderWidth() {
        const ret = wasm.__wbg_get_textmaterial_borderWidth(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set borderWidth(arg0) {
        wasm.__wbg_set_textmaterial_borderWidth(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get cornerRadius() {
        const ret = wasm.__wbg_get_textmaterial_cornerRadius(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set cornerRadius(arg0) {
        wasm.__wbg_set_textmaterial_cornerRadius(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {Vec2 | undefined}
     */
    get padding() {
        const ret = wasm.__wbg_get_textmaterial_padding(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec2.__wrap(ret);
    }
    /**
     * @param {Vec2 | null} [arg0]
     */
    set padding(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec2);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_textmaterial_padding(this.__wbg_ptr, ptr0);
    }
    /**
     * Outline blur radius in CSS pixels. Defaults to `0.0`.
     * @returns {number | undefined}
     */
    get outlineBlur() {
        const ret = wasm.__wbg_get_textmaterial_outlineBlur(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Outline blur radius in CSS pixels. Defaults to `0.0`.
     * @param {number | null} [arg0]
     */
    set outlineBlur(arg0) {
        wasm.__wbg_set_textmaterial_outlineBlur(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get outlineColor() {
        const ret = wasm.__wbg_get_textmaterial_outlineColor(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set outlineColor(arg0) {
        wasm.__wbg_set_textmaterial_outlineColor(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * Pixel offset `[x, y]` in CSS pixels. Defaults to `(0.0, 0.0)`.
     * @returns {Vec2 | undefined}
     */
    get outlineOffset() {
        const ret = wasm.__wbg_get_textmaterial_outlineOffset(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec2.__wrap(ret);
    }
    /**
     * Pixel offset `[x, y]` in CSS pixels. Defaults to `(0.0, 0.0)`.
     * @param {Vec2 | null} [arg0]
     */
    set outlineOffset(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec2);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_textmaterial_outlineOffset(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number | undefined}
     */
    get outlineOpacity() {
        const ret = wasm.__wbg_get_textmaterial_outlineOpacity(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set outlineOpacity(arg0) {
        wasm.__wbg_set_textmaterial_outlineOpacity(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Outline thickness measured in CSS pixels. Defaults to `0.0`.
     * @returns {number | undefined}
     */
    get outlineWidth() {
        const ret = wasm.__wbg_get_textmaterial_outlineWidth(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Outline thickness measured in CSS pixels. Defaults to `0.0`.
     * @param {number | null} [arg0]
     */
    set outlineWidth(arg0) {
        wasm.__wbg_set_textmaterial_outlineWidth(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
}

const TextureFragmentFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_texturefragment_free(ptr >>> 0, 1));

export class TextureFragment {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TextureFragment.prototype);
        obj.__wbg_ptr = ptr;
        TextureFragmentFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextureFragmentFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_texturefragment_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_texturefragment_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_texturefragment_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_texturefragment_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_texturefragment_gen(this.__wbg_ptr, arg0);
    }
}

const TileXYZFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tilexyz_free(ptr >>> 0, 1));

export class TileXYZ {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TileXYZFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tilexyz_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_tilexyz_x(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_tilexyz_x(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_tilexyz_y(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_tilexyz_y(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get z() {
        const ret = wasm.__wbg_get_tilexyz_z(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set z(arg0) {
        wasm.__wbg_set_tilexyz_z(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        const ret = wasm.tilexyz_new(x, y, z);
        this.__wbg_ptr = ret >>> 0;
        TileXYZFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const TransferableHierarchyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablehierarchy_free(ptr >>> 0, 1));

export class TransferableHierarchy {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableHierarchyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablehierarchy_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get expected_winding_order() {
        const ret = wasm.__wbg_get_transferablehierarchy_expected_winding_order(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set expected_winding_order(arg0) {
        wasm.__wbg_set_transferablehierarchy_expected_winding_order(this.__wbg_ptr, arg0);
    }
}

const TransferableHolesFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferableholes_free(ptr >>> 0, 1));
/**
 * To transfer the hierarchy efficiently, the holes are managed as one-dimensional array.
 */
export class TransferableHoles {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableHolesFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferableholes_free(ptr, 0);
    }
}

const TransferablePolygonBatchedFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolygonbatchedfeature_free(ptr >>> 0, 1));
/**
 * To transfer the batched feature efficiently, the all feature's properties are managed as one-dimensional array.
 */
export class TransferablePolygonBatchedFeature {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePolygonBatchedFeatureFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepolygonbatchedfeature_free(ptr, 0);
    }
    /**
     * @returns {CRS}
     */
    get crs() {
        const ret = wasm.__wbg_get_transferablepolygonbatchedfeature_crs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {CRS} arg0
     */
    set crs(arg0) {
        wasm.__wbg_set_transferablepolygonbatchedfeature_crs(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.__wbg_get_transferablepolygonbatchedfeature_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set length(arg0) {
        wasm.__wbg_set_transferablepolygonbatchedfeature_length(this.__wbg_ptr, arg0);
    }
    /**
     * @param {CRS} crs
     * @param {number} length
     */
    constructor(crs, length) {
        const ret = wasm.transferablepolygonbatchedfeature_constructor(crs, length);
        this.__wbg_ptr = ret >>> 0;
        TransferablePolygonBatchedFeatureFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setOuterRing(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setOuterRing(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setOuterRingSizes(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setOuterRingSizes(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setHoles(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setHoles(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setHolesSizes(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setHolesSizes(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setHolesTotalSizes(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setHolesTotalSizes(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setHolesBoundaries(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setHolesBoundaries(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setBatchIds(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setBatchIds(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setBatchIndices(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setBatchIndices(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setExpectedWindingOrders(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setExpectedWindingOrders(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.transferablepolygonbatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIndices() {
        const ret = wasm.transferablepolygonbatchedfeature_transferBatchIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferOuterRing() {
        const ret = wasm.transferablepolygonbatchedfeature_transferOuterRing(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferOuterRingSizes() {
        const ret = wasm.transferablepolygonbatchedfeature_transferOuterRingSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferHoles() {
        const ret = wasm.transferablepolygonbatchedfeature_transferHoles(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesBoundaries() {
        const ret = wasm.transferablepolygonbatchedfeature_transferHolesBoundaries(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesSizes() {
        const ret = wasm.transferablepolygonbatchedfeature_transferHolesSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesTotalSizes() {
        const ret = wasm.transferablepolygonbatchedfeature_transferHolesTotalSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array}
     */
    transferExpectedWindingOrders() {
        const ret = wasm.transferablepolygonbatchedfeature_transferExpectedWindingOrders(this.__wbg_ptr);
        return ret;
    }
}

const TransferablePolylineBatchedFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolylinebatchedfeature_free(ptr >>> 0, 1));
/**
 * To transfer the batched feature efficiently, the all feature's properties are managed as one-dimensional array.
 */
export class TransferablePolylineBatchedFeature {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePolylineBatchedFeatureFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepolylinebatchedfeature_free(ptr, 0);
    }
    /**
     * @returns {CRS}
     */
    get crs() {
        const ret = wasm.__wbg_get_transferablepolylinebatchedfeature_crs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {CRS} arg0
     */
    set crs(arg0) {
        wasm.__wbg_set_transferablepolylinebatchedfeature_crs(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get length() {
        const ret = wasm.__wbg_get_transferablepolylinebatchedfeature_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set length(arg0) {
        wasm.__wbg_set_transferablepolylinebatchedfeature_length(this.__wbg_ptr, arg0);
    }
    /**
     * @param {CRS} crs
     * @param {number} length
     */
    constructor(crs, length) {
        const ret = wasm.transferablepolylinebatchedfeature_constructor(crs, length);
        this.__wbg_ptr = ret >>> 0;
        TransferablePolylineBatchedFeatureFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setBatchIds(byte_length, f) {
        wasm.transferablepolylinebatchedfeature_setBatchIds(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setBatchIndices(byte_length, f) {
        wasm.transferablepolylinebatchedfeature_setBatchIndices(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setPoints(byte_length, f) {
        wasm.transferablepolylinebatchedfeature_setPoints(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     */
    setPointsSizes(byte_length, f) {
        wasm.transferablepolylinebatchedfeature_setPointsSizes(this.__wbg_ptr, byte_length, f);
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.transferablepolylinebatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIndices() {
        const ret = wasm.transferablepolylinebatchedfeature_transferBatchIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferPoints() {
        const ret = wasm.transferablepolylinebatchedfeature_transferPoints(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferPointsSizes() {
        const ret = wasm.transferablepolylinebatchedfeature_transferPointsSizes(this.__wbg_ptr);
        return ret;
    }
}

const TransformFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transform_free(ptr >>> 0, 1));

export class Transform {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransformFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transform_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get tx() {
        const ret = wasm.__wbg_get_camerafrustum_near(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set tx(arg0) {
        wasm.__wbg_set_camerafrustum_near(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get ty() {
        const ret = wasm.__wbg_get_camerafrustum_far(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set ty(arg0) {
        wasm.__wbg_set_camerafrustum_far(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get tz() {
        const ret = wasm.__wbg_get_camerafrustum_fov(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set tz(arg0) {
        wasm.__wbg_set_camerafrustum_fov(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get qx() {
        const ret = wasm.__wbg_get_camerafrustum_aspect_ratio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set qx(arg0) {
        wasm.__wbg_set_camerafrustum_aspect_ratio(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get qy() {
        const ret = wasm.__wbg_get_transform_qy(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set qy(arg0) {
        wasm.__wbg_set_transform_qy(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get qz() {
        const ret = wasm.__wbg_get_transform_qz(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set qz(arg0) {
        wasm.__wbg_set_transform_qz(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get qw() {
        const ret = wasm.__wbg_get_transform_qw(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set qw(arg0) {
        wasm.__wbg_set_transform_qw(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get sx() {
        const ret = wasm.__wbg_get_transform_sx(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set sx(arg0) {
        wasm.__wbg_set_transform_sx(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get sy() {
        const ret = wasm.__wbg_get_transform_sy(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set sy(arg0) {
        wasm.__wbg_set_transform_sy(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get sz() {
        const ret = wasm.__wbg_get_transform_sz(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set sz(arg0) {
        wasm.__wbg_set_transform_sz(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} tx
     * @param {number} ty
     * @param {number} tz
     * @param {number} qx
     * @param {number} qy
     * @param {number} qz
     * @param {number} qw
     * @param {number} sx
     * @param {number} sy
     * @param {number} sz
     */
    constructor(tx, ty, tz, qx, qy, qz, qw, sx, sy, sz) {
        const ret = wasm.transform_new(tx, ty, tz, qx, qy, qz, qw, sx, sy, sz);
        this.__wbg_ptr = ret >>> 0;
        TransformFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const UintAttributeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_uintattribute_free(ptr >>> 0, 1));

export class UintAttribute {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UintAttributeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_uintattribute_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.__wbg_get_floatattribute_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set size(arg0) {
        wasm.__wbg_set_floatattribute_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Uint32Array} data
     * @param {number} size
     */
    constructor(data, size) {
        const ptr0 = passArray32ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.floatattribute_new(ptr0, len0, size);
        this.__wbg_ptr = ret >>> 0;
        UintAttributeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Uint32Array}
     */
    transferData() {
        const ret = wasm.uintattribute_transferData(this.__wbg_ptr);
        return ret;
    }
}

const UpsamplableTerrainGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_upsamplableterraingeometry_free(ptr >>> 0, 1));

export class UpsamplableTerrainGeometry {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UpsamplableTerrainGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_upsamplableterraingeometry_free(ptr, 0);
    }
    /**
     * @param {Float32Array} uvs
     * @param {Uint32Array} indices
     * @param {Float32Array} heights
     */
    constructor(uvs, indices, heights) {
        const ptr0 = passArrayF32ToWasm0(uvs, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray32ToWasm0(indices, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArrayF32ToWasm0(heights, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.geometry_new(ptr0, len0, ptr1, len1, ptr2, len2);
        this.__wbg_ptr = ret >>> 0;
        UpsamplableTerrainGeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const Vec2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vec2_free(ptr >>> 0, 1));

export class Vec2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vec2.prototype);
        obj.__wbg_ptr = ptr;
        Vec2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Vec2Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vec2_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_vec2_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_vec2_x(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_vec2_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_vec2_y(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        const ret = wasm.vec2_new(x, y);
        this.__wbg_ptr = ret >>> 0;
        Vec2Finalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const Vec3Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vec3_free(ptr >>> 0, 1));

export class Vec3 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vec3.prototype);
        obj.__wbg_ptr = ptr;
        Vec3Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Vec3Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vec3_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_vec2_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_vec2_x(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_vec2_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_vec2_y(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get z() {
        const ret = wasm.__wbg_get_vec3_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set z(arg0) {
        wasm.__wbg_set_vec3_z(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(x, y, z) {
        const ret = wasm.vec3_new(x, y, z);
        this.__wbg_ptr = ret >>> 0;
        Vec3Finalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const VectorTileMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vectortilematerial_free(ptr >>> 0, 1));

export class VectorTileMaterial {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VectorTileMaterialFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vectortilematerial_free(ptr, 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get show() {
        const ret = wasm.__wbg_get_polylinematerial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_polylinematerial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_polylinematerial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_polylinematerial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_polylinematerial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_polylinematerial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get maxZoom() {
        const ret = wasm.__wbg_get_ellipsoidterrainmaterial_maxZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set maxZoom(arg0) {
        wasm.__wbg_set_ellipsoidterrainmaterial_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * `Globe.max_sse` would be used to a material that uses `clamp_to_ground`.
     * @returns {number | undefined}
     */
    get maxSse() {
        const ret = wasm.__wbg_get_polygonmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * `Globe.max_sse` would be used to a material that uses `clamp_to_ground`.
     * @param {number | null} [arg0]
     */
    set maxSse(arg0) {
        wasm.__wbg_set_polygonmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {string[] | undefined}
     */
    get layers() {
        const ret = wasm.__wbg_get_vectortilematerial_layers(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * @param {string[] | null} [arg0]
     */
    set layers(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectortilematerial_layers(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number | undefined}
     */
    get overscaledMaxZoom() {
        const ret = wasm.__wbg_get_rastertilematerial_maxZoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set overscaledMaxZoom(arg0) {
        wasm.__wbg_set_rastertilematerial_maxZoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
}

const WindingOrderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_windingorder_free(ptr >>> 0, 1));

export class WindingOrder {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WindingOrderFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_windingorder_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get 0() {
        const ret = wasm.__wbg_get_windingorder_0(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set 0(arg0) {
        wasm.__wbg_set_windingorder_0(this.__wbg_ptr, arg0);
    }
}

const WindowFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_window_free(ptr >>> 0, 1));

export class Window {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WindowFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_window_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get width() {
        const ret = wasm.__wbg_get_window_width(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set width(arg0) {
        wasm.__wbg_set_window_width(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get height() {
        const ret = wasm.__wbg_get_window_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set height(arg0) {
        wasm.__wbg_set_window_height(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get pixel_ratio() {
        const ret = wasm.__wbg_get_window_pixel_ratio(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set pixel_ratio(arg0) {
        wasm.__wbg_set_window_pixel_ratio(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} width
     * @param {number} height
     * @param {number} pixel_ratio
     */
    constructor(width, height, pixel_ratio) {
        const ret = wasm.window_new(width, height, pixel_ratio);
        this.__wbg_ptr = ret >>> 0;
        WindowFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const EXPECTED_RESPONSE_TYPES = new Set(['basic', 'cors', 'default']);

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                const validResponse = module.ok && EXPECTED_RESPONSE_TYPES.has(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_call_52af042a326d9b3a = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.call(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_length_537fa63a6103cbdb = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_b629bdd1d149e69b = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_b753ba46952ff27d = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_fbfce9fe1d38dbe8 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_lle_new = function(arg0) {
        const ret = LLE.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_log_7917aaf91fc08d0e = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_new_150ca8a92d65de92 = function(arg0) {
        const ret = new Float64Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_new_2ceb09627c4a49af = function(arg0) {
        const ret = new Uint32Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
        const ret = new Error();
        return ret;
    };
    imports.wbg.__wbg_new_d6b08dae7359cebb = function(arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_new_e3b71d7fa00cd4a9 = function(arg0) {
        const ret = new Float32Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_set_121d1cf09325841e = function(arg0, arg1, arg2) {
        arg0.set(getArrayF32FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_set_57c4e2f8700b6eac = function(arg0, arg1, arg2) {
        arg0.set(getArrayF64FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_set_c0069f6bbe6b852b = function(arg0, arg1, arg2) {
        arg0.set(getArrayU32FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_set_f59709bcbf07327f = function(arg0, arg1, arg2) {
        arg0.set(getArrayU8FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_texturefragment_new = function(arg0) {
        const ret = TextureFragment.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_wbindgendebugstring_0c28a61befa1f3ce = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_wbindgennumberget_41a5988c9fc46eeb = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbg_wbindgenstringget_c45e0c672ada3c64 = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_wbindgenthrow_681185b504fabc8e = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_wbindgentryintonumber_8d9141e67b6d43ff = function(arg0) {
        let result;
        try { result = +arg0 } catch (e) { result = e }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(arg0, arg1) {
        // Cast intrinsic for `Ref(String) -> Externref`.
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_cast_4af8e60a922bcf35 = function(arg0, arg1) {
        // Cast intrinsic for `Ref(Slice(F64)) -> NamedExternref("Float64Array")`.
        const ret = getArrayF64FromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_cast_7c316abdc43840a3 = function(arg0, arg1) {
        // Cast intrinsic for `Ref(Slice(U32)) -> NamedExternref("Uint32Array")`.
        const ret = getArrayU32FromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_cast_cb9088102bce6b30 = function(arg0, arg1) {
        // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
        const ret = getArrayU8FromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_cast_d6cd19b81560fd6e = function(arg0) {
        // Cast intrinsic for `F64 -> Externref`.
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_2;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('navara_wasm_api_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
