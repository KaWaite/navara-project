let wasm;

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

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
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

function isLikeNone(x) {
    return x === undefined || x === null;
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

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
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

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_2.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64ArrayMemory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
 * @returns {string}
 */
export function generateId() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.generateId();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

export function start() {
    wasm.start();
}

/**
 * @param {bigint} child
 * @param {bigint} parent
 * @returns {OrthoCamTransform}
 */
export function orthoCameraTransform(child, parent) {
    const ret = wasm.orthoCameraTransform(child, parent);
    return OrthoCamTransform.__wrap(ret);
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
/**
 * @enum {0 | 1 | 2}
 */
export const TextureFragmentStatus = Object.freeze({
    Success: 0, "0": "Success",
    Fail: 1, "1": "Fail",
    Pending: 2, "2": "Pending",
});

const AabbFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_aabb_free(ptr >>> 0, 1));

export class Aabb {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Aabb.prototype);
        obj.__wbg_ptr = ptr;
        AabbFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

const B3dmLayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_b3dmlayerdescription_free(ptr >>> 0, 1));

export class B3dmLayerDescription {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        B3dmLayerDescriptionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_b3dmlayerdescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_b3dmlayerdescription_type(this.__wbg_ptr);
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
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_b3dmlayerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string | undefined}
     */
    get crs() {
        const ret = wasm.__wbg_get_b3dmlayerdescription_crs(this.__wbg_ptr);
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
    set crs(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_b3dmlayerdescription_crs(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {any}
     */
    get data() {
        const ret = wasm.__wbg_get_b3dmlayerdescription_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_b3dmlayerdescription_data(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {ModelMaterial | undefined}
     */
    get model() {
        const ret = wasm.__wbg_get_b3dmlayerdescription_model(this.__wbg_ptr);
        return ret === 0 ? undefined : ModelMaterial.__wrap(ret);
    }
    /**
     * @param {ModelMaterial | null} [arg0]
     */
    set model(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ModelMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_b3dmlayerdescription_model(this.__wbg_ptr, ptr0);
    }
}

const BatchPropResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_batchpropresult_free(ptr >>> 0, 1));

export class BatchPropResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BatchPropResult.prototype);
        obj.__wbg_ptr = ptr;
        BatchPropResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BillboardMaterial.prototype);
        obj.__wbg_ptr = ptr;
        BillboardMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
     * Avoid overlapping with the globe surface.
     * @returns {boolean | undefined}
     */
    get offsetDepth() {
        const ret = wasm.__wbg_get_billboardmaterial_offsetDepth(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Avoid overlapping with the globe surface.
     * @param {boolean | null} [arg0]
     */
    set offsetDepth(arg0) {
        wasm.__wbg_set_billboardmaterial_offsetDepth(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
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
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @returns {string[] | undefined}
     */
    get effectIds() {
        const ret = wasm.__wbg_get_billboardmaterial_effectIds(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @param {string[] | null} [arg0]
     */
    set effectIds(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_billboardmaterial_effectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Depth behavior for selective effect mask passes: "normal" or "silhouette"
     * @returns {string | undefined}
     */
    get selectiveEffectOcclusion() {
        const ret = wasm.__wbg_get_billboardmaterial_selectiveEffectOcclusion(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Depth behavior for selective effect mask passes: "normal" or "silhouette"
     * @param {string | null} [arg0]
     */
    set selectiveEffectOcclusion(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_billboardmaterial_selectiveEffectOcclusion(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Emissive glow intensity (default: 0.3 when Bloom enabled)
     * @returns {number | undefined}
     */
    get emissiveIntensity() {
        const ret = wasm.__wbg_get_billboardmaterial_emissiveIntensity(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Emissive glow intensity (default: 0.3 when Bloom enabled)
     * @param {number | null} [arg0]
     */
    set emissiveIntensity(arg0) {
        wasm.__wbg_set_billboardmaterial_emissiveIntensity(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @returns {number | undefined}
     */
    get emissiveColor() {
        const ret = wasm.__wbg_get_billboardmaterial_emissiveColor(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @param {number | null} [arg0]
     */
    set emissiveColor(arg0) {
        wasm.__wbg_set_billboardmaterial_emissiveColor(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
}

const BillboardMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_billboardmesh_free(ptr >>> 0, 1));

export class BillboardMesh {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BillboardMesh.prototype);
        obj.__wbg_ptr = ptr;
        BillboardMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BillboardMeshFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_billboardmesh_free(ptr, 0);
    }
    /**
     * @returns {BillboardMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_billboardmesh_material(this.__wbg_ptr);
        return BillboardMaterial.__wrap(ret);
    }
    /**
     * @param {BillboardMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, BillboardMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_billboardmesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_billboardmesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_billboardmesh_transform(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferablePointGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_billboardmesh_geometry(this.__wbg_ptr);
        return TransferablePointGeometry.__wrap(ret);
    }
    /**
     * @param {TransferablePointGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePointGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_billboardmesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_billboardmesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_billboardmesh_active(this.__wbg_ptr, arg0);
    }
}

const BoundingSphereFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boundingsphere_free(ptr >>> 0, 1));

export class BoundingSphere {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BoundingSphere.prototype);
        obj.__wbg_ptr = ptr;
        BoundingSphereFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CachedMeshHandle.prototype);
        obj.__wbg_ptr = ptr;
        CachedMeshHandleFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CameraFrustum.prototype);
        obj.__wbg_ptr = ptr;
        CameraFrustumFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CameraOrientation.prototype);
        obj.__wbg_ptr = ptr;
        CameraOrientationFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CameraStatus.prototype);
        obj.__wbg_ptr = ptr;
        CameraStatusFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

const Cesium3dTilesLayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cesium3dtileslayerdescription_free(ptr >>> 0, 1));

export class Cesium3dTilesLayerDescription {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Cesium3dTilesLayerDescriptionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cesium3dtileslayerdescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_cesium3dtileslayerdescription_type(this.__wbg_ptr);
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
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_b3dmlayerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string | undefined}
     */
    get crs() {
        const ret = wasm.__wbg_get_cesium3dtileslayerdescription_crs(this.__wbg_ptr);
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
    set crs(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_b3dmlayerdescription_crs(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {any}
     */
    get data() {
        const ret = wasm.__wbg_get_cesium3dtileslayerdescription_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_cesium3dtileslayerdescription_data(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {ModelMaterial | undefined}
     */
    get model() {
        const ret = wasm.__wbg_get_b3dmlayerdescription_model(this.__wbg_ptr);
        return ret === 0 ? undefined : ModelMaterial.__wrap(ret);
    }
    /**
     * @param {ModelMaterial | null} [arg0]
     */
    set model(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ModelMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_b3dmlayerdescription_model(this.__wbg_ptr, ptr0);
    }
}

const ConstructPolygonBatchedFeatureParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructpolygonbatchedfeatureparameters_free(ptr >>> 0, 1));

export class ConstructPolygonBatchedFeatureParameters {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ConstructPolygonBatchedFeatureParameters.prototype);
        obj.__wbg_ptr = ptr;
        ConstructPolygonBatchedFeatureParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructPolygonBatchedFeatureParametersFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructpolygonbatchedfeatureparameters_free(ptr, 0);
    }
    /**
     * @returns {ReconstructableEntity}
     */
    get batched_feature() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureparameters_batched_feature(this.__wbg_ptr);
        return ReconstructableEntity.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} arg0
     */
    set batched_feature(arg0) {
        _assertClass(arg0, ReconstructableEntity);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructpolygonbatchedfeatureparameters_batched_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {boolean}
     */
    get flat() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureparameters_flat(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set flat(arg0) {
        wasm.__wbg_set_constructpolygonbatchedfeatureparameters_flat(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get tile_extent() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureparameters_tile_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
    /**
     * @param {ExtentRadianF32 | null} [arg0]
     */
    set tile_extent(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ExtentRadianF32);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_constructpolygonbatchedfeatureparameters_tile_extent(this.__wbg_ptr, ptr0);
    }
}

const ConstructPolygonBatchedFeatureResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructpolygonbatchedfeatureresult_free(ptr >>> 0, 1));

export class ConstructPolygonBatchedFeatureResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ConstructPolygonBatchedFeatureResult.prototype);
        obj.__wbg_ptr = ptr;
        ConstructPolygonBatchedFeatureResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructPolygonBatchedFeatureResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructpolygonbatchedfeatureresult_free(ptr, 0);
    }
    /**
     * @returns {TransferablePolygonGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureresult_geometry(this.__wbg_ptr);
        return TransferablePolygonGeometry.__wrap(ret);
    }
    /**
     * @param {TransferablePolygonGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePolygonGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructpolygonbatchedfeatureresult_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get extent() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureresult_extent(this.__wbg_ptr);
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
        wasm.__wbg_set_constructpolygonbatchedfeatureresult_extent(this.__wbg_ptr, ptr0);
    }
    /**
     * RTC (Relative-To-Center) translation vector
     * @returns {Vec3 | undefined}
     */
    get rtc_translation() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureresult_rtc_translation(this.__wbg_ptr);
        return ret === 0 ? undefined : Vec3.__wrap(ret);
    }
    /**
     * RTC (Relative-To-Center) translation vector
     * @param {Vec3 | null} [arg0]
     */
    set rtc_translation(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Vec3);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_constructpolygonbatchedfeatureresult_rtc_translation(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferablePolygonGeometry} geometry
     * @param {ExtentRadianF32 | null} [extent]
     * @param {Vec3 | null} [rtc_translation]
     */
    constructor(geometry, extent, rtc_translation) {
        _assertClass(geometry, TransferablePolygonGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(extent)) {
            _assertClass(extent, ExtentRadianF32);
            ptr1 = extent.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(rtc_translation)) {
            _assertClass(rtc_translation, Vec3);
            ptr2 = rtc_translation.__destroy_into_raw();
        }
        const ret = wasm.constructpolygonbatchedfeatureresult_new(ptr0, ptr1, ptr2);
        this.__wbg_ptr = ret >>> 0;
        ConstructPolygonBatchedFeatureResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const ConstructPolylineBatchedFeatureParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructpolylinebatchedfeatureparameters_free(ptr >>> 0, 1));

export class ConstructPolylineBatchedFeatureParameters {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ConstructPolylineBatchedFeatureParameters.prototype);
        obj.__wbg_ptr = ptr;
        ConstructPolylineBatchedFeatureParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructPolylineBatchedFeatureParametersFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructpolylinebatchedfeatureparameters_free(ptr, 0);
    }
    /**
     * @returns {ReconstructableEntity}
     */
    get batched_feature() {
        const ret = wasm.__wbg_get_constructpolylinebatchedfeatureparameters_batched_feature(this.__wbg_ptr);
        return ReconstructableEntity.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} arg0
     */
    set batched_feature(arg0) {
        _assertClass(arg0, ReconstructableEntity);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructpolylinebatchedfeatureparameters_batched_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {boolean}
     */
    get flat() {
        const ret = wasm.__wbg_get_constructpolylinebatchedfeatureparameters_flat(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set flat(arg0) {
        wasm.__wbg_set_constructpolylinebatchedfeatureparameters_flat(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get tile_extent() {
        const ret = wasm.constructpolylinebatchedfeatureparameters_tile_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
}

const ConstructPolylineBatchedFeatureResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructpolylinebatchedfeatureresult_free(ptr >>> 0, 1));

export class ConstructPolylineBatchedFeatureResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ConstructPolylineBatchedFeatureResult.prototype);
        obj.__wbg_ptr = ptr;
        ConstructPolylineBatchedFeatureResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructPolylineBatchedFeatureResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructpolylinebatchedfeatureresult_free(ptr, 0);
    }
    /**
     * @returns {TransferablePolylineGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_constructpolylinebatchedfeatureresult_geometry(this.__wbg_ptr);
        return TransferablePolylineGeometry.__wrap(ret);
    }
    /**
     * @param {TransferablePolylineGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePolylineGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructpolylinebatchedfeatureresult_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferablePolylineGeometry} geometry
     * @param {ExtentRadianF32 | null} [extent]
     */
    constructor(geometry, extent) {
        _assertClass(geometry, TransferablePolylineGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(extent)) {
            _assertClass(extent, ExtentRadianF32);
            ptr1 = extent.__destroy_into_raw();
        }
        const ret = wasm.constructpolylinebatchedfeatureresult_new(ptr0, ptr1);
        this.__wbg_ptr = ret >>> 0;
        ConstructPolylineBatchedFeatureResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {ExtentRadianF32 | undefined}
     */
    get extent() {
        const ret = wasm.constructpolylinebatchedfeatureresult_extent(this.__wbg_ptr);
        return ret === 0 ? undefined : ExtentRadianF32.__wrap(ret);
    }
}

const ConstructTerrainMeshParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructterrainmeshparameters_free(ptr >>> 0, 1));

export class ConstructTerrainMeshParameters {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ConstructTerrainMeshParameters.prototype);
        obj.__wbg_ptr = ptr;
        ConstructTerrainMeshParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructTerrainMeshParametersFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructterrainmeshparameters_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get tile_size() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_tile_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set tile_size(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_tile_size(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get bytes_handle() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_bytes_handle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set bytes_handle(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_bytes_handle(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint}
     */
    get tile_handle() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_tile_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set tile_handle(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_tile_handle(this.__wbg_ptr, arg0);
    }
    /**
     * Whether to render skirts along tile boundaries.
     * @returns {boolean}
     */
    get skirt() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_skirt(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether to render skirts along tile boundaries.
     * @param {boolean} arg0
     */
    set skirt(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_skirt(this.__wbg_ptr, arg0);
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * @returns {number}
     */
    get skirtExaggeration() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_skirtExaggeration(this.__wbg_ptr);
        return ret;
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * @param {number} arg0
     */
    set skirtExaggeration(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_skirtExaggeration(this.__wbg_ptr, arg0);
    }
}

const ConstructTerrainMeshResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constructterrainmeshresult_free(ptr >>> 0, 1));

export class ConstructTerrainMeshResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ConstructTerrainMeshResult.prototype);
        obj.__wbg_ptr = ptr;
        ConstructTerrainMeshResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstructTerrainMeshResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constructterrainmeshresult_free(ptr, 0);
    }
    /**
     * @returns {TransferableGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_constructterrainmeshresult_geometry(this.__wbg_ptr);
        return TransferableGeometry.__wrap(ret);
    }
    /**
     * @param {TransferableGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferableGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructterrainmeshresult_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number}
     */
    get heights() {
        const ret = wasm.__wbg_get_constructterrainmeshresult_heights(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set heights(arg0) {
        wasm.__wbg_set_constructterrainmeshresult_heights(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get min_height() {
        const ret = wasm.__wbg_get_constructterrainmeshresult_min_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set min_height(arg0) {
        wasm.__wbg_set_constructterrainmeshresult_min_height(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get max_height() {
        const ret = wasm.__wbg_get_constructterrainmeshresult_max_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set max_height(arg0) {
        wasm.__wbg_set_constructterrainmeshresult_max_height(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {Vec3 | undefined}
     */
    get rtc_translation() {
        const ret = wasm.__wbg_get_constructterrainmeshresult_rtc_translation(this.__wbg_ptr);
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
        wasm.__wbg_set_constructpolygonbatchedfeatureresult_rtc_translation(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableGeometry} geometry
     * @param {number} heights
     * @param {number} min_height
     * @param {number} max_height
     * @param {Vec3 | null} [rtc_translation]
     */
    constructor(geometry, heights, min_height, max_height, rtc_translation) {
        _assertClass(geometry, TransferableGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(rtc_translation)) {
            _assertClass(rtc_translation, Vec3);
            ptr1 = rtc_translation.__destroy_into_raw();
        }
        const ret = wasm.constructterrainmeshresult_new(ptr0, heights, min_height, max_height, ptr1);
        this.__wbg_ptr = ret >>> 0;
        ConstructTerrainMeshResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
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
     * @returns {Float32Array | undefined}
     */
    position_high() {
        const ret = wasm.constructedpolylinegeometry_position_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_high_size() {
        const ret = wasm.constructedpolylinegeometry_position_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_low() {
        const ret = wasm.constructedpolylinegeometry_position_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_low_size() {
        const ret = wasm.constructedpolylinegeometry_position_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
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
     * @returns {Float32Array | undefined}
     */
    start_high() {
        const ret = wasm.constructedpolylinegeometry_start_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_high_size() {
        const ret = wasm.constructedpolylinegeometry_start_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    start_low() {
        const ret = wasm.constructedpolylinegeometry_start_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_low_size() {
        const ret = wasm.constructedpolylinegeometry_start_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
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
     * @returns {Float32Array | undefined}
     */
    end_high() {
        const ret = wasm.constructedpolylinegeometry_end_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    end_high_size() {
        const ret = wasm.constructedpolylinegeometry_end_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    end_low() {
        const ret = wasm.constructedpolylinegeometry_end_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    end_low_size() {
        const ret = wasm.constructedpolylinegeometry_end_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
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

const CoreFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_core_free(ptr >>> 0, 1));

export class Core {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CoreFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_core_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_core_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set id(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_core_id(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {string} id
     */
    constructor(id) {
        const ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_new(ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        CoreFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    start() {
        wasm.core_start(this.__wbg_ptr);
    }
    /**
     * @param {number} updated_at
     */
    update(updated_at) {
        wasm.core_update(this.__wbg_ptr, updated_at);
    }
    /**
     * @returns {Events | undefined}
     */
    readEvents() {
        const ret = wasm.core_readEvents(this.__wbg_ptr);
        return ret === 0 ? undefined : Events.__wrap(ret);
    }
    /**
     * @param {any} input
     */
    input(input) {
        wasm.core_input(this.__wbg_ptr, input);
    }
    /**
     * @param {number} handle
     * @returns {Uint8Array | undefined}
     */
    getBufferU8(handle) {
        const ret = wasm.core_getBufferU8(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Uint32Array | undefined}
     */
    getBufferU32(handle) {
        const ret = wasm.core_getBufferU32(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Float32Array | undefined}
     */
    getBufferF32(handle) {
        const ret = wasm.core_getBufferF32(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Float64Array | undefined}
     */
    getBufferF64(handle) {
        const ret = wasm.core_getBufferF64(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @param {bigint} bits
     * @param {number} byte_length
     * @param {Function} f
     */
    setBufferU8(handle, bits, byte_length, f) {
        wasm.core_setBufferU8(this.__wbg_ptr, handle, bits, byte_length, f);
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     * @returns {number | undefined}
     */
    newBufferU8(byte_length, f) {
        const ret = wasm.core_newBufferU8(this.__wbg_ptr, byte_length, f);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     * @returns {number | undefined}
     */
    newBufferU32(byte_length, f) {
        const ret = wasm.core_newBufferU32(this.__wbg_ptr, byte_length, f);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     * @returns {number | undefined}
     */
    newBufferF32(byte_length, f) {
        const ret = wasm.core_newBufferF32(this.__wbg_ptr, byte_length, f);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number} byte_length
     * @param {Function} f
     * @returns {number | undefined}
     */
    newBufferF64(byte_length, f) {
        const ret = wasm.core_newBufferF64(this.__wbg_ptr, byte_length, f);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {Uint8Array} data
     * @returns {number | undefined}
     */
    newBufferU8Cloned(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_newBufferU8Cloned(this.__wbg_ptr, ptr0, len0);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {Uint32Array} data
     * @returns {number | undefined}
     */
    newBufferU32Cloned(data) {
        const ptr0 = passArray32ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_newBufferU32Cloned(this.__wbg_ptr, ptr0, len0);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {Float32Array} data
     * @returns {number | undefined}
     */
    newBufferF32Cloned(data) {
        const ptr0 = passArrayF32ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.core_newBufferF32Cloned(this.__wbg_ptr, ptr0, len0);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number} handle
     */
    removeBuffer(handle) {
        wasm.core_removeBuffer(this.__wbg_ptr, handle);
    }
    /**
     * @param {number} handle
     * @returns {Uint8Array | undefined}
     */
    removeBufferU8(handle) {
        const ret = wasm.core_removeBufferU8(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Uint32Array | undefined}
     */
    removeBufferU32(handle) {
        const ret = wasm.core_removeBufferU32(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Float32Array | undefined}
     */
    removeBufferF32(handle) {
        const ret = wasm.core_removeBufferF32(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {number} handle
     * @returns {Float64Array | undefined}
     */
    removeBufferF64(handle) {
        const ret = wasm.core_removeBufferF64(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * @param {bigint} bits
     */
    triggerDataRequesterFailed(bits) {
        wasm.core_triggerDataRequesterFailed(this.__wbg_ptr, bits);
    }
    /**
     * @param {number} width
     * @param {number} height
     * @param {number} pixel_ratio
     */
    resize(width, height, pixel_ratio) {
        wasm.core_resize(this.__wbg_ptr, width, height, pixel_ratio);
    }
    /**
     * @param {any} layer
     * @returns {string}
     */
    addLayer(layer) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.core_addLayer(this.__wbg_ptr, layer);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} layer_id
     * @param {any} layer
     */
    updateLayer(layer_id, layer) {
        const ptr0 = passStringToWasm0(layer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.core_updateLayer(this.__wbg_ptr, ptr0, len0, layer);
    }
    /**
     * @param {string} layer_id
     */
    deleteLayer(layer_id) {
        const ptr0 = passStringToWasm0(layer_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.core_deleteLayer(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @param {bigint} bits
     * @param {TextureFragmentStatus} status
     */
    triggerTextureFragmentLoaded(bits, status) {
        wasm.core_triggerTextureFragmentLoaded(this.__wbg_ptr, bits, status);
    }
    /**
     * @param {bigint} handle
     */
    setTileMeshPrepared(handle) {
        wasm.core_setTileMeshPrepared(this.__wbg_ptr, handle);
    }
    /**
     * @param {string} feature_type
     * @param {bigint} bits
     */
    markFeatureIsRendered(feature_type, bits) {
        const ptr0 = passStringToWasm0(feature_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.core_markFeatureIsRendered(this.__wbg_ptr, ptr0, len0, bits);
    }
    /**
     * @param {bigint} bits
     * @param {DelegatedWorkerTasksResult} result
     */
    triggerWorkerTaskCompleted(bits, result) {
        _assertClass(result, DelegatedWorkerTasksResult);
        var ptr0 = result.__destroy_into_raw();
        wasm.core_triggerWorkerTaskCompleted(this.__wbg_ptr, bits, ptr0);
    }
    /**
     * @param {ReconstructableEntity} martini_id
     * @returns {TransferableMartini | undefined}
     */
    getMartini(martini_id) {
        _assertClass(martini_id, ReconstructableEntity);
        var ptr0 = martini_id.__destroy_into_raw();
        const ret = wasm.core_getMartini(this.__wbg_ptr, ptr0);
        return ret === 0 ? undefined : TransferableMartini.__wrap(ret);
    }
    /**
     * @param {bigint} id
     * @returns {boolean}
     */
    hasDataRequester(id) {
        const ret = wasm.core_hasDataRequester(this.__wbg_ptr, id);
        return ret !== 0;
    }
    /**
     * @param {bigint} id
     * @returns {boolean}
     */
    hasWorkerTask(id) {
        const ret = wasm.core_hasWorkerTask(this.__wbg_ptr, id);
        return ret !== 0;
    }
    /**
     * @param {bigint} handle
     * @returns {TransferableTile | undefined}
     */
    getTile(handle) {
        const ret = wasm.core_getTile(this.__wbg_ptr, handle);
        return ret === 0 ? undefined : TransferableTile.__wrap(ret);
    }
    /**
     * @param {bigint} handle
     * @returns {TransferableTile | undefined}
     */
    getParentTile(handle) {
        const ret = wasm.core_getParentTile(this.__wbg_ptr, handle);
        return ret === 0 ? undefined : TransferableTile.__wrap(ret);
    }
    /**
     * @param {bigint} handle
     * @returns {VectorTileState[]}
     */
    getVectorTileStates(handle) {
        const ret = wasm.core_getVectorTileStates(this.__wbg_ptr, handle);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {bigint} handle
     * @returns {ElevationDecoder | undefined}
     */
    getTileElevationDecoder(handle) {
        const ret = wasm.core_getTileElevationDecoder(this.__wbg_ptr, handle);
        return ret === 0 ? undefined : ElevationDecoder.__wrap(ret);
    }
    /**
     * @param {bigint} batched_feature_id
     * @returns {ReturnedTransferablePolygonBatchedFeature | undefined}
     */
    getTransferablePolygonBatchedFeature(batched_feature_id) {
        const ret = wasm.core_getTransferablePolygonBatchedFeature(this.__wbg_ptr, batched_feature_id);
        return ret === 0 ? undefined : ReturnedTransferablePolygonBatchedFeature.__wrap(ret);
    }
    /**
     * @param {bigint} batched_feature_id
     * @returns {ReturnedTransferablePolylineBatchedFeature | undefined}
     */
    getTransferablePolylineBatchedFeature(batched_feature_id) {
        const ret = wasm.core_getTransferablePolylineBatchedFeature(this.__wbg_ptr, batched_feature_id);
        return ret === 0 ? undefined : ReturnedTransferablePolylineBatchedFeature.__wrap(ret);
    }
    /**
     * @param {number} batch_id
     * @returns {BatchPropResult}
     */
    getBatchProp(batch_id) {
        const ret = wasm.core_getBatchProp(this.__wbg_ptr, batch_id);
        return BatchPropResult.__wrap(ret);
    }
    /**
     * @param {bigint} renderable_feature_bits
     * @param {Function} callback
     */
    readPropertiesFromFeature(renderable_feature_bits, callback) {
        const ret = wasm.core_readPropertiesFromFeature(this.__wbg_ptr, renderable_feature_bits, callback);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * @param {Float64Array | null} [position]
     * @param {number | null} [pitch]
     * @param {number | null} [heading]
     * @param {number | null} [roll]
     */
    changeCamera(position, pitch, heading, roll) {
        var ptr0 = isLikeNone(position) ? 0 : passArrayF64ToWasm0(position, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.core_changeCamera(this.__wbg_ptr, ptr0, len0, !isLikeNone(pitch), isLikeNone(pitch) ? 0 : pitch, !isLikeNone(heading), isLikeNone(heading) ? 0 : heading, !isLikeNone(roll), isLikeNone(roll) ? 0 : roll);
    }
    /**
     * @param {CameraDirection} direction
     * @param {number} amount
     */
    moveCamera(direction, amount) {
        wasm.core_moveCamera(this.__wbg_ptr, direction, amount);
    }
    /**
     * @param {Float64Array} direction
     * @param {number} amount
     */
    moveCameraWithDirection(direction, amount) {
        const ptr0 = passArrayF64ToWasm0(direction, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.core_moveCameraWithDirection(this.__wbg_ptr, ptr0, len0, amount);
    }
    /**
     * @param {Float64Array | null} [position]
     * @param {number | null} [pitch]
     * @param {number | null} [heading]
     * @param {number | null} [roll]
     * @param {number | null} [duration]
     * @param {number | null} [max_height]
     */
    flyTo(position, pitch, heading, roll, duration, max_height) {
        var ptr0 = isLikeNone(position) ? 0 : passArrayF64ToWasm0(position, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.core_flyTo(this.__wbg_ptr, ptr0, len0, !isLikeNone(pitch), isLikeNone(pitch) ? 0 : pitch, !isLikeNone(heading), isLikeNone(heading) ? 0 : heading, !isLikeNone(roll), isLikeNone(roll) ? 0 : roll, !isLikeNone(duration), isLikeNone(duration) ? 0 : duration, !isLikeNone(max_height), isLikeNone(max_height) ? 0 : max_height);
    }
    /**
     * @param {Float64Array} target
     * @param {Float64Array} offset
     */
    lookAt(target, offset) {
        const ptr0 = passArrayF64ToWasm0(target, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF64ToWasm0(offset, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.core_lookAt(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * @param {boolean} enabled
     * @param {Float64Array | null} [target]
     * @param {Float64Array | null} [offset]
     */
    cameraFollow(enabled, target, offset) {
        var ptr0 = isLikeNone(target) ? 0 : passArrayF64ToWasm0(target, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = isLikeNone(offset) ? 0 : passArrayF64ToWasm0(offset, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.core_cameraFollow(this.__wbg_ptr, enabled, ptr0, len0, ptr1, len1);
    }
    /**
     * @returns {CameraStatus | undefined}
     */
    getCameraStatus() {
        const ret = wasm.core_getCameraStatus(this.__wbg_ptr);
        return ret === 0 ? undefined : CameraStatus.__wrap(ret);
    }
    /**
     * @returns {Float64Array | undefined}
     */
    getCameraPositionLLE() {
        const ret = wasm.core_getCameraPositionLLE(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        }
        return v1;
    }
    /**
     * @returns {Float64Array | undefined}
     */
    getCameraPositionECEF() {
        const ret = wasm.core_getCameraPositionECEF(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        }
        return v1;
    }
    /**
     * @returns {CameraOrientation | undefined}
     */
    getCameraOrientation() {
        const ret = wasm.core_getCameraOrientation(this.__wbg_ptr);
        return ret === 0 ? undefined : CameraOrientation.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    getCameraFOVY() {
        const ret = wasm.core_getCameraFOVY(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @param {Float64Array | null | undefined} axis
     * @param {number} angle
     */
    rotateAroundAxis(axis, angle) {
        var ptr0 = isLikeNone(axis) ? 0 : passArrayF64ToWasm0(axis, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.core_rotateAroundAxis(this.__wbg_ptr, ptr0, len0, angle);
    }
    /**
     * @param {LLE} lle
     * @returns {number | undefined}
     */
    sampleTerrainHeight(lle) {
        _assertClass(lle, LLE);
        var ptr0 = lle.__destroy_into_raw();
        const ret = wasm.core_sampleTerrainHeight(this.__wbg_ptr, ptr0);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @param {LLE} lle
     * @returns {bigint}
     */
    registerSampleTerrainHeightEvent(lle) {
        _assertClass(lle, LLE);
        var ptr0 = lle.__destroy_into_raw();
        const ret = wasm.core_registerSampleTerrainHeightEvent(this.__wbg_ptr, ptr0);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} bits
     */
    unregisterSampleTerrainHeightEvent(bits) {
        wasm.core_unregisterSampleTerrainHeightEvent(this.__wbg_ptr, bits);
    }
    /**
     * @param {number | null} [fov]
     * @param {number | null} [near]
     * @param {number | null} [far]
     */
    setFrustum(fov, near, far) {
        wasm.core_setFrustum(this.__wbg_ptr, !isLikeNone(fov), isLikeNone(fov) ? 0 : fov, !isLikeNone(near), isLikeNone(near) ? 0 : near, !isLikeNone(far), isLikeNone(far) ? 0 : far);
    }
    /**
     * @param {CameraControlUpdateEvent} event
     */
    setCameraControl(event) {
        _assertClass(event, CameraControlUpdateEvent);
        var ptr0 = event.__destroy_into_raw();
        wasm.core_setCameraControl(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Globe | undefined}
     */
    getGlobe() {
        const ret = wasm.core_getGlobe(this.__wbg_ptr);
        return ret === 0 ? undefined : Globe.__wrap(ret);
    }
    /**
     * @returns {boolean | undefined}
     */
    getGlobeTransparent() {
        const ret = wasm.core_getGlobeTransparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    getGlobeMaxSse() {
        const ret = wasm.core_getGlobeMaxSse(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    getGlobeSegments() {
        const ret = wasm.core_getGlobeSegments(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {number | undefined}
     */
    getGlobeColor() {
        const ret = wasm.core_getGlobeColor(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    getGlobeHideUnderground() {
        const ret = wasm.core_getGlobeHideUnderground(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {boolean | undefined}
     */
    getGlobeShouldComputeNormalFromVertex() {
        const ret = wasm.core_getGlobeShouldComputeNormalFromVertex(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {number | undefined}
     */
    getGlobeOpacity() {
        const ret = wasm.core_getGlobeOpacity(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean | undefined}
     */
    getGlobeWireframe() {
        const ret = wasm.core_getGlobeWireframe(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    getGlobeElevationColormap() {
        const ret = wasm.core_getGlobeElevationColormap(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * @param {boolean} value
     */
    setGlobeTransparent(value) {
        wasm.core_setGlobeTransparent(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    setGlobeMaxSse(value) {
        wasm.core_setGlobeMaxSse(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    setGlobeSegments(value) {
        wasm.core_setGlobeSegments(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    setGlobeColor(value) {
        wasm.core_setGlobeColor(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    setGlobeHideUnderground(value) {
        wasm.core_setGlobeHideUnderground(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    setGlobeShouldComputeNormalFromVertex(value) {
        wasm.core_setGlobeShouldComputeNormalFromVertex(this.__wbg_ptr, value);
    }
    /**
     * @param {number} value
     */
    setGlobeOpacity(value) {
        wasm.core_setGlobeOpacity(this.__wbg_ptr, value);
    }
    /**
     * @param {boolean} value
     */
    setGlobeWireframe(value) {
        wasm.core_setGlobeWireframe(this.__wbg_ptr, value);
    }
    /**
     * @param {Float32Array} value
     */
    setGlobeElevationColormap(value) {
        const ptr0 = passArrayF32ToWasm0(value, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.core_setGlobeElevationColormap(this.__wbg_ptr, ptr0, len0);
    }
}

const DataRequestEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_datarequestevent_free(ptr >>> 0, 1));

export class DataRequestEvent {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DataRequestEvent.prototype);
        obj.__wbg_ptr = ptr;
        DataRequestEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof DataRequestEvent)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DataRequestEventFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_datarequestevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_datarequestevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_datarequestevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_datarequestevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_datarequestevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_datarequesterremovedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_datarequesterremovedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get handle() {
        const ret = wasm.__wbg_get_datarequestevent_handle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set handle(arg0) {
        wasm.__wbg_set_datarequestevent_handle(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {string}
     */
    get extension() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_datarequestevent_extension(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set extension(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_datarequestevent_extension(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get url() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_datarequestevent_url(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set url(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_datarequestevent_url(this.__wbg_ptr, ptr0, len0);
    }
}

const DataRequesterRemovedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_datarequesterremovedevent_free(ptr >>> 0, 1));

export class DataRequesterRemovedEvent {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DataRequesterRemovedEvent.prototype);
        obj.__wbg_ptr = ptr;
        DataRequesterRemovedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof DataRequesterRemovedEvent)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DataRequesterRemovedEventFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_datarequesterremovedevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_datarequesterremovedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_datarequesterremovedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_datarequesterremovedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_datarequesterremovedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_datarequesterremovedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_datarequesterremovedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get handle() {
        const ret = wasm.__wbg_get_datarequesterremovedevent_handle(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set handle(arg0) {
        wasm.__wbg_set_datarequesterremovedevent_handle(this.__wbg_ptr, arg0);
    }
}

const DelegatedWorkerTasksParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_delegatedworkertasksparameters_free(ptr >>> 0, 1));

export class DelegatedWorkerTasksParameters {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DelegatedWorkerTasksParameters.prototype);
        obj.__wbg_ptr = ptr;
        DelegatedWorkerTasksParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DelegatedWorkerTasksParametersFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_delegatedworkertasksparameters_free(ptr, 0);
    }
    /**
     * @returns {ReconstructableEntity}
     */
    get delegator_id() {
        const ret = wasm.__wbg_get_delegatedworkertasksparameters_delegator_id(this.__wbg_ptr);
        return ReconstructableEntity.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} arg0
     */
    set delegator_id(arg0) {
        _assertClass(arg0, ReconstructableEntity);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_delegatedworkertasksparameters_delegator_id(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ConstructTerrainMeshParameters | undefined}
     */
    get construct_terrain_mesh() {
        const ret = wasm.__wbg_get_delegatedworkertasksparameters_construct_terrain_mesh(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructTerrainMeshParameters.__wrap(ret);
    }
    /**
     * @param {ConstructTerrainMeshParameters | null} [arg0]
     */
    set construct_terrain_mesh(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructTerrainMeshParameters);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksparameters_construct_terrain_mesh(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {UpsampleTerrainMeshParameters | undefined}
     */
    get upsample_terrain_mesh() {
        const ret = wasm.__wbg_get_delegatedworkertasksparameters_upsample_terrain_mesh(this.__wbg_ptr);
        return ret === 0 ? undefined : UpsampleTerrainMeshParameters.__wrap(ret);
    }
    /**
     * @param {UpsampleTerrainMeshParameters | null} [arg0]
     */
    set upsample_terrain_mesh(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, UpsampleTerrainMeshParameters);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksparameters_upsample_terrain_mesh(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ConstructPolygonBatchedFeatureParameters | undefined}
     */
    get construct_polygon_batched_feature() {
        const ret = wasm.__wbg_get_delegatedworkertasksparameters_construct_polygon_batched_feature(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructPolygonBatchedFeatureParameters.__wrap(ret);
    }
    /**
     * @param {ConstructPolygonBatchedFeatureParameters | null} [arg0]
     */
    set construct_polygon_batched_feature(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructPolygonBatchedFeatureParameters);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksparameters_construct_polygon_batched_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ConstructPolylineBatchedFeatureParameters | undefined}
     */
    get construct_polyline_batched_feature() {
        const ret = wasm.__wbg_get_delegatedworkertasksparameters_construct_polyline_batched_feature(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructPolylineBatchedFeatureParameters.__wrap(ret);
    }
    /**
     * @param {ConstructPolylineBatchedFeatureParameters | null} [arg0]
     */
    set construct_polyline_batched_feature(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructPolylineBatchedFeatureParameters);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksparameters_construct_polyline_batched_feature(this.__wbg_ptr, ptr0);
    }
}

const DelegatedWorkerTasksResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_delegatedworkertasksresult_free(ptr >>> 0, 1));

export class DelegatedWorkerTasksResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(DelegatedWorkerTasksResult.prototype);
        obj.__wbg_ptr = ptr;
        DelegatedWorkerTasksResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DelegatedWorkerTasksResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_delegatedworkertasksresult_free(ptr, 0);
    }
    /**
     * @returns {ReconstructableEntity}
     */
    get delegator_id() {
        const ret = wasm.__wbg_get_delegatedworkertasksresult_delegator_id(this.__wbg_ptr);
        return ReconstructableEntity.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} arg0
     */
    set delegator_id(arg0) {
        _assertClass(arg0, ReconstructableEntity);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_delegatedworkertasksresult_delegator_id(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ConstructTerrainMeshResult | undefined}
     */
    get construct_terrain_mesh() {
        const ret = wasm.__wbg_get_delegatedworkertasksresult_construct_terrain_mesh(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructTerrainMeshResult.__wrap(ret);
    }
    /**
     * @param {ConstructTerrainMeshResult | null} [arg0]
     */
    set construct_terrain_mesh(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructTerrainMeshResult);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksresult_construct_terrain_mesh(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {UpsampleTerrainMeshResult | undefined}
     */
    get upsample_terrain_mesh() {
        const ret = wasm.__wbg_get_delegatedworkertasksresult_upsample_terrain_mesh(this.__wbg_ptr);
        return ret === 0 ? undefined : UpsampleTerrainMeshResult.__wrap(ret);
    }
    /**
     * @param {UpsampleTerrainMeshResult | null} [arg0]
     */
    set upsample_terrain_mesh(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, UpsampleTerrainMeshResult);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksresult_upsample_terrain_mesh(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ConstructPolygonBatchedFeatureResult | undefined}
     */
    get construct_polygon_batched_feature() {
        const ret = wasm.__wbg_get_delegatedworkertasksresult_construct_polygon_batched_feature(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructPolygonBatchedFeatureResult.__wrap(ret);
    }
    /**
     * @param {ConstructPolygonBatchedFeatureResult | null} [arg0]
     */
    set construct_polygon_batched_feature(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructPolygonBatchedFeatureResult);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksresult_construct_polygon_batched_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ConstructPolylineBatchedFeatureResult | undefined}
     */
    get construct_polyline_batched_feature() {
        const ret = wasm.__wbg_get_delegatedworkertasksresult_construct_polyline_batched_feature(this.__wbg_ptr);
        return ret === 0 ? undefined : ConstructPolylineBatchedFeatureResult.__wrap(ret);
    }
    /**
     * @param {ConstructPolylineBatchedFeatureResult | null} [arg0]
     */
    set construct_polyline_batched_feature(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ConstructPolylineBatchedFeatureResult);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_delegatedworkertasksresult_construct_polyline_batched_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ReconstructableEntity} delegator_id
     * @param {ConstructTerrainMeshResult | null} [construct_terrain_mesh]
     * @returns {DelegatedWorkerTasksResult}
     */
    static withConstructTerrainMesh(delegator_id, construct_terrain_mesh) {
        _assertClass(delegator_id, ReconstructableEntity);
        var ptr0 = delegator_id.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(construct_terrain_mesh)) {
            _assertClass(construct_terrain_mesh, ConstructTerrainMeshResult);
            ptr1 = construct_terrain_mesh.__destroy_into_raw();
        }
        const ret = wasm.delegatedworkertasksresult_withConstructTerrainMesh(ptr0, ptr1);
        return DelegatedWorkerTasksResult.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} delegator_id
     * @param {UpsampleTerrainMeshResult | null} [upsample_terrain_mesh]
     * @returns {DelegatedWorkerTasksResult}
     */
    static withUpsampleTerrainMesh(delegator_id, upsample_terrain_mesh) {
        _assertClass(delegator_id, ReconstructableEntity);
        var ptr0 = delegator_id.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(upsample_terrain_mesh)) {
            _assertClass(upsample_terrain_mesh, UpsampleTerrainMeshResult);
            ptr1 = upsample_terrain_mesh.__destroy_into_raw();
        }
        const ret = wasm.delegatedworkertasksresult_withUpsampleTerrainMesh(ptr0, ptr1);
        return DelegatedWorkerTasksResult.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} delegator_id
     * @param {ConstructPolygonBatchedFeatureResult | null} [construct_polygon_batched_feature]
     * @returns {DelegatedWorkerTasksResult}
     */
    static withConstructPolygonBatchedFeature(delegator_id, construct_polygon_batched_feature) {
        _assertClass(delegator_id, ReconstructableEntity);
        var ptr0 = delegator_id.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(construct_polygon_batched_feature)) {
            _assertClass(construct_polygon_batched_feature, ConstructPolygonBatchedFeatureResult);
            ptr1 = construct_polygon_batched_feature.__destroy_into_raw();
        }
        const ret = wasm.delegatedworkertasksresult_withConstructPolygonBatchedFeature(ptr0, ptr1);
        return DelegatedWorkerTasksResult.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} delegator_id
     * @param {ConstructPolylineBatchedFeatureResult | null} [construct_polyline_batched_feature]
     * @returns {DelegatedWorkerTasksResult}
     */
    static withConstructPolylineBatchedFeature(delegator_id, construct_polyline_batched_feature) {
        _assertClass(delegator_id, ReconstructableEntity);
        var ptr0 = delegator_id.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(construct_polyline_batched_feature)) {
            _assertClass(construct_polyline_batched_feature, ConstructPolylineBatchedFeatureResult);
            ptr1 = construct_polyline_batched_feature.__destroy_into_raw();
        }
        const ret = wasm.delegatedworkertasksresult_withConstructPolylineBatchedFeature(ptr0, ptr1);
        return DelegatedWorkerTasksResult.__wrap(ret);
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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ElevationHeatmapMaterial.prototype);
        obj.__wbg_ptr = ptr;
        ElevationHeatmapMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EllipsoidTerrainMaterial.prototype);
        obj.__wbg_ptr = ptr;
        EllipsoidTerrainMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
        const ret = wasm.__wbg_get_aabb_center(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set high(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_aabb_center(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Vec3}
     */
    get low() {
        const ret = wasm.__wbg_get_aabb_extent(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
     * @param {Vec3} arg0
     */
    set low(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_aabb_extent(this.__wbg_ptr, ptr0);
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

const EntityEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_entityevent_free(ptr >>> 0, 1));

export class EntityEvent {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(EntityEvent.prototype);
        obj.__wbg_ptr = ptr;
        EntityEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof EntityEvent)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EntityEventFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_entityevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_entityevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_entityevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_entityevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_entityevent_gen(this.__wbg_ptr, arg0);
    }
}

const EventsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_events_free(ptr >>> 0, 1));

export class Events {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Events.prototype);
        obj.__wbg_ptr = ptr;
        EventsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EventsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_events_free(ptr, 0);
    }
    /**
     * @returns {Transform | undefined}
     */
    get camera_transform_updated() {
        const ret = wasm.__wbg_get_events_camera_transform_updated(this.__wbg_ptr);
        return ret === 0 ? undefined : Transform.__wrap(ret);
    }
    /**
     * @param {Transform | null} [arg0]
     */
    set camera_transform_updated(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, Transform);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_events_camera_transform_updated(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {CameraFrustum | undefined}
     */
    get camera_frustum_updated() {
        const ret = wasm.__wbg_get_events_camera_frustum_updated(this.__wbg_ptr);
        return ret === 0 ? undefined : CameraFrustum.__wrap(ret);
    }
    /**
     * @param {CameraFrustum | null} [arg0]
     */
    set camera_frustum_updated(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, CameraFrustum);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_events_camera_frustum_updated(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ObjectTransformEvent[]}
     */
    get object_transform_updated() {
        const ret = wasm.__wbg_get_events_object_transform_updated(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {ObjectTransformEvent[]} arg0
     */
    set object_transform_updated(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_object_transform_updated(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {EntityEvent[]}
     */
    get mesh_removed() {
        const ret = wasm.__wbg_get_events_mesh_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {EntityEvent[]} arg0
     */
    set mesh_removed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_mesh_removed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {MeshAdded[]}
     */
    get mesh_added() {
        const ret = wasm.__wbg_get_events_mesh_added(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {MeshAdded[]} arg0
     */
    set mesh_added(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_mesh_added(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {MeshChanged[]}
     */
    get mesh_updated() {
        const ret = wasm.__wbg_get_events_mesh_updated(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {MeshChanged[]} arg0
     */
    set mesh_updated(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_mesh_updated(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {DataRequestEvent[]}
     */
    get data_requested() {
        const ret = wasm.__wbg_get_events_data_requested(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {DataRequestEvent[]} arg0
     */
    set data_requested(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_data_requested(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {DataRequesterRemovedEvent[]}
     */
    get data_requester_removed() {
        const ret = wasm.__wbg_get_events_data_requester_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {DataRequesterRemovedEvent[]} arg0
     */
    set data_requester_removed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_data_requester_removed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {TextureFragmentRequestedEvent[]}
     */
    get texture_fragment_requested() {
        const ret = wasm.__wbg_get_events_texture_fragment_requested(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {TextureFragmentRequestedEvent[]} arg0
     */
    set texture_fragment_requested(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_texture_fragment_requested(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {EntityEvent[]}
     */
    get texture_fragment_removed() {
        const ret = wasm.__wbg_get_events_texture_fragment_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {EntityEvent[]} arg0
     */
    set texture_fragment_removed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_texture_fragment_removed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {WorkerTaskDelegatedEvent[]}
     */
    get worker_task_delegated() {
        const ret = wasm.__wbg_get_events_worker_task_delegated(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {WorkerTaskDelegatedEvent[]} arg0
     */
    set worker_task_delegated(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_worker_task_delegated(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {EntityEvent[]}
     */
    get worker_task_removed() {
        const ret = wasm.__wbg_get_events_worker_task_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {EntityEvent[]} arg0
     */
    set worker_task_removed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_worker_task_removed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {RenderableFeatureAddedEvent[]}
     */
    get renderable_feature_added() {
        const ret = wasm.__wbg_get_events_renderable_feature_added(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {RenderableFeatureAddedEvent[]} arg0
     */
    set renderable_feature_added(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_renderable_feature_added(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {RenderableFeatureChangedEvent[]}
     */
    get renderable_feature_changed() {
        const ret = wasm.__wbg_get_events_renderable_feature_changed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {RenderableFeatureChangedEvent[]} arg0
     */
    set renderable_feature_changed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_renderable_feature_changed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {RenderableFeatureRemovedEvent[]}
     */
    get renderable_feature_removed() {
        const ret = wasm.__wbg_get_events_renderable_feature_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {RenderableFeatureRemovedEvent[]} arg0
     */
    set renderable_feature_removed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_renderable_feature_removed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {TerrainHeightUpdatedEvent[]}
     */
    get update_sample_terrain_height() {
        const ret = wasm.__wbg_get_events_update_sample_terrain_height(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {TerrainHeightUpdatedEvent[]} arg0
     */
    set update_sample_terrain_height(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_update_sample_terrain_height(this.__wbg_ptr, ptr0, len0);
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

const GeoJsonLayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_geojsonlayerdescription_free(ptr >>> 0, 1));

export class GeoJsonLayerDescription {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        GeoJsonLayerDescriptionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_geojsonlayerdescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_type(this.__wbg_ptr);
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
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geojsonlayerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string | undefined}
     */
    get crs() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_crs(this.__wbg_ptr);
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
    set crs(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_geojsonlayerdescription_crs(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {any}
     */
    get data() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_geojsonlayerdescription_data(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {PointMaterial | undefined}
     */
    get point() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_point(this.__wbg_ptr);
        return ret === 0 ? undefined : PointMaterial.__wrap(ret);
    }
    /**
     * @param {PointMaterial | null} [arg0]
     */
    set point(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PointMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geojsonlayerdescription_point(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {BillboardMaterial | undefined}
     */
    get billboard() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_billboard(this.__wbg_ptr);
        return ret === 0 ? undefined : BillboardMaterial.__wrap(ret);
    }
    /**
     * @param {BillboardMaterial | null} [arg0]
     */
    set billboard(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BillboardMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geojsonlayerdescription_billboard(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TextMaterial | undefined}
     */
    get text() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_text(this.__wbg_ptr);
        return ret === 0 ? undefined : TextMaterial.__wrap(ret);
    }
    /**
     * @param {TextMaterial | null} [arg0]
     */
    set text(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TextMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geojsonlayerdescription_text(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {PolylineMaterial | undefined}
     */
    get polyline() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_polyline(this.__wbg_ptr);
        return ret === 0 ? undefined : PolylineMaterial.__wrap(ret);
    }
    /**
     * @param {PolylineMaterial | null} [arg0]
     */
    set polyline(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolylineMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geojsonlayerdescription_polyline(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {PolygonMaterial | undefined}
     */
    get polygon() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_polygon(this.__wbg_ptr);
        return ret === 0 ? undefined : PolygonMaterial.__wrap(ret);
    }
    /**
     * @param {PolygonMaterial | null} [arg0]
     */
    set polygon(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolygonMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geojsonlayerdescription_polygon(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ModelMaterial | undefined}
     */
    get model() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_model(this.__wbg_ptr);
        return ret === 0 ? undefined : ModelMaterial.__wrap(ret);
    }
    /**
     * @param {ModelMaterial | null} [arg0]
     */
    set model(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ModelMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geojsonlayerdescription_model(this.__wbg_ptr, ptr0);
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
    /**
     * @returns {Float32Array | undefined}
     */
    transferSkirtVertices() {
        const ret = wasm.geometry_transferSkirtVertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transferSkirtUvs() {
        const ret = wasm.geometry_transferSkirtUvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    transferSkirtIndices() {
        const ret = wasm.geometry_transferSkirtIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    transferSkirtIndicesToEdge() {
        const ret = wasm.geometry_transferSkirtIndicesToEdge(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    hasSkirt() {
        const ret = wasm.geometry_hasSkirt(this.__wbg_ptr);
        return ret !== 0;
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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Globe.prototype);
        obj.__wbg_ptr = ptr;
        GlobeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
        const ret = wasm.__wbg_get_boundingsphere_center_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set lat(arg0) {
        wasm.__wbg_set_boundingsphere_center_x(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get lng() {
        const ret = wasm.__wbg_get_boundingsphere_center_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set lng(arg0) {
        wasm.__wbg_set_boundingsphere_center_y(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get height() {
        const ret = wasm.__wbg_get_boundingsphere_center_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set height(arg0) {
        wasm.__wbg_set_boundingsphere_center_z(this.__wbg_ptr, arg0);
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

const LayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_layerdescription_free(ptr >>> 0, 1));

export class LayerDescription {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LayerDescriptionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_layerdescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_layerdescription_type(this.__wbg_ptr);
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
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_layerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
}

const LayerDescriptionDataFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_layerdescriptiondata_free(ptr >>> 0, 1));

export class LayerDescriptionData {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LayerDescriptionDataFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_layerdescriptiondata_free(ptr, 0);
    }
    /**
     * @returns {any}
     */
    get data() {
        const ret = wasm.__wbg_get_layerdescriptiondata_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_layerdescriptiondata_data(this.__wbg_ptr, arg0);
    }
}

const LayerDescriptionUrlFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_layerdescriptionurl_free(ptr >>> 0, 1));

export class LayerDescriptionUrl {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LayerDescriptionUrlFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_layerdescriptionurl_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get url() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_layerdescriptionurl_url(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set url(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_layerdescriptionurl_url(this.__wbg_ptr, ptr0, len0);
    }
}

const MeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_mesh_free(ptr >>> 0, 1));

export class Mesh {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Mesh.prototype);
        obj.__wbg_ptr = ptr;
        MeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MeshFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mesh_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get vertices() {
        const ret = wasm.__wbg_get_mesh_vertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set vertices(arg0) {
        wasm.__wbg_set_mesh_vertices(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get uvs() {
        const ret = wasm.__wbg_get_mesh_uvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set uvs(arg0) {
        wasm.__wbg_set_mesh_uvs(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get indices() {
        const ret = wasm.__wbg_get_mesh_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set indices(arg0) {
        wasm.__wbg_set_mesh_indices(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_mesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_mesh_active(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get render_order() {
        const ret = wasm.__wbg_get_mesh_render_order(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set render_order(arg0) {
        wasm.__wbg_set_mesh_render_order(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {TileUvTransform}
     */
    get uv_transform() {
        const ret = wasm.__wbg_get_mesh_uv_transform(this.__wbg_ptr);
        return TileUvTransform.__wrap(ret);
    }
    /**
     * @param {TileUvTransform} arg0
     */
    set uv_transform(arg0) {
        _assertClass(arg0, TileUvTransform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_mesh_uv_transform(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Aabb}
     */
    get aabb() {
        const ret = wasm.__wbg_get_mesh_aabb(this.__wbg_ptr);
        return Aabb.__wrap(ret);
    }
    /**
     * @param {Aabb} arg0
     */
    set aabb(arg0) {
        _assertClass(arg0, Aabb);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_mesh_aabb(this.__wbg_ptr, ptr0);
    }
    /**
     * Skirt vertices handle (separate from main geometry for shadow/normal handling).
     * @returns {number | undefined}
     */
    get skirt_vertices() {
        const ret = wasm.__wbg_get_mesh_skirt_vertices(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Skirt vertices handle (separate from main geometry for shadow/normal handling).
     * @param {number | null} [arg0]
     */
    set skirt_vertices(arg0) {
        wasm.__wbg_set_mesh_skirt_vertices(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * Skirt UVs handle.
     * @returns {number | undefined}
     */
    get skirt_uvs() {
        const ret = wasm.__wbg_get_mesh_skirt_uvs(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Skirt UVs handle.
     * @param {number | null} [arg0]
     */
    set skirt_uvs(arg0) {
        wasm.__wbg_set_mesh_skirt_uvs(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * Skirt indices handle.
     * @returns {number | undefined}
     */
    get skirt_indices() {
        const ret = wasm.__wbg_get_mesh_skirt_indices(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Skirt indices handle.
     * @param {number | null} [arg0]
     */
    set skirt_indices(arg0) {
        wasm.__wbg_set_mesh_skirt_indices(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * Mapping from skirt vertex index to edge vertex index in main geometry.
     * @returns {number | undefined}
     */
    get skirt_indices_to_edge() {
        const ret = wasm.__wbg_get_mesh_skirt_indices_to_edge(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Mapping from skirt vertex index to edge vertex index in main geometry.
     * @param {number | null} [arg0]
     */
    set skirt_indices_to_edge(arg0) {
        wasm.__wbg_set_mesh_skirt_indices_to_edge(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
}

const MeshAddedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_meshadded_free(ptr >>> 0, 1));

export class MeshAdded {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MeshAdded.prototype);
        obj.__wbg_ptr = ptr;
        MeshAddedFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof MeshAdded)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MeshAddedFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_meshadded_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_meshadded_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_meshadded_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_meshadded_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_meshadded_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint}
     */
    get tile_handle() {
        const ret = wasm.__wbg_get_meshadded_tile_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set tile_handle(arg0) {
        wasm.__wbg_set_meshadded_tile_handle(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint | undefined}
     */
    get ready_parent_tile_handle() {
        const ret = wasm.__wbg_get_meshadded_ready_parent_tile_handle(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : BigInt.asUintN(64, ret[1]);
    }
    /**
     * @param {bigint | null} [arg0]
     */
    set ready_parent_tile_handle(arg0) {
        wasm.__wbg_set_meshadded_ready_parent_tile_handle(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? BigInt(0) : arg0);
    }
    /**
     * @returns {Mesh}
     */
    get mesh() {
        const ret = wasm.__wbg_get_meshadded_mesh(this.__wbg_ptr);
        return Mesh.__wrap(ret);
    }
    /**
     * @param {Mesh} arg0
     */
    set mesh(arg0) {
        _assertClass(arg0, Mesh);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshadded_mesh(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {RasterTileInternalMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_meshadded_material(this.__wbg_ptr);
        return RasterTileInternalMaterial.__wrap(ret);
    }
    /**
     * @param {RasterTileInternalMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, RasterTileInternalMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshadded_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_meshadded_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshadded_transform(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Globe}
     */
    get globe() {
        const ret = wasm.__wbg_get_meshadded_globe(this.__wbg_ptr);
        return Globe.__wrap(ret);
    }
    /**
     * @param {Globe} arg0
     */
    set globe(arg0) {
        _assertClass(arg0, Globe);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshadded_globe(this.__wbg_ptr, ptr0);
    }
}

const MeshChangedFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_meshchanged_free(ptr >>> 0, 1));

export class MeshChanged {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MeshChanged.prototype);
        obj.__wbg_ptr = ptr;
        MeshChangedFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof MeshChanged)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MeshChangedFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_meshchanged_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_meshchanged_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_meshchanged_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_meshchanged_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_meshchanged_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint | undefined}
     */
    get ready_parent_tile_handle() {
        const ret = wasm.__wbg_get_meshchanged_ready_parent_tile_handle(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : BigInt.asUintN(64, ret[1]);
    }
    /**
     * @param {bigint | null} [arg0]
     */
    set ready_parent_tile_handle(arg0) {
        wasm.__wbg_set_meshadded_ready_parent_tile_handle(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? BigInt(0) : arg0);
    }
    /**
     * @returns {Mesh}
     */
    get mesh() {
        const ret = wasm.__wbg_get_meshadded_mesh(this.__wbg_ptr);
        return Mesh.__wrap(ret);
    }
    /**
     * @param {Mesh} arg0
     */
    set mesh(arg0) {
        _assertClass(arg0, Mesh);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshadded_mesh(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {RasterTileInternalMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_meshadded_material(this.__wbg_ptr);
        return RasterTileInternalMaterial.__wrap(ret);
    }
    /**
     * @param {RasterTileInternalMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, RasterTileInternalMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshadded_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Globe}
     */
    get globe() {
        const ret = wasm.__wbg_get_meshadded_globe(this.__wbg_ptr);
        return Globe.__wrap(ret);
    }
    /**
     * @param {Globe} arg0
     */
    set globe(arg0) {
        _assertClass(arg0, Globe);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshadded_globe(this.__wbg_ptr, ptr0);
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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ModelMaterial.prototype);
        obj.__wbg_ptr = ptr;
        ModelMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
     * Scale water normal. Decreasing this value will make the water surface rough.
     * @returns {number | undefined}
     */
    get waterScaleNormal() {
        const ret = wasm.__wbg_get_billboardmaterial_emissiveIntensity(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Scale water normal. Decreasing this value will make the water surface rough.
     * @param {number | null} [arg0]
     */
    set waterScaleNormal(arg0) {
        wasm.__wbg_set_billboardmaterial_emissiveIntensity(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
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
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @returns {string[] | undefined}
     */
    get effectIds() {
        const ret = wasm.__wbg_get_modelmaterial_effectIds(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @param {string[] | null} [arg0]
     */
    set effectIds(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_modelmaterial_effectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Depth behavior for selective effect mask passes: "normal" or "silhouette"
     * @returns {string | undefined}
     */
    get selectiveEffectOcclusion() {
        const ret = wasm.__wbg_get_modelmaterial_selectiveEffectOcclusion(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Depth behavior for selective effect mask passes: "normal" or "silhouette"
     * @param {string | null} [arg0]
     */
    set selectiveEffectOcclusion(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_modelmaterial_selectiveEffectOcclusion(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Emissive glow intensity (default: 0.3 when Bloom enabled)
     * @returns {number | undefined}
     */
    get emissiveIntensity() {
        const ret = wasm.__wbg_get_modelmaterial_emissiveIntensity(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Emissive glow intensity (default: 0.3 when Bloom enabled)
     * @param {number | null} [arg0]
     */
    set emissiveIntensity(arg0) {
        wasm.__wbg_set_modelmaterial_emissiveIntensity(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @returns {number | undefined}
     */
    get emissiveColor() {
        const ret = wasm.__wbg_get_modelmaterial_emissiveColor(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @param {number | null} [arg0]
     */
    set emissiveColor(arg0) {
        wasm.__wbg_set_modelmaterial_emissiveColor(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
}

const ModelMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_modelmesh_free(ptr >>> 0, 1));

export class ModelMesh {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ModelMesh.prototype);
        obj.__wbg_ptr = ptr;
        ModelMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ModelMeshFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_modelmesh_free(ptr, 0);
    }
    /**
     * @returns {ModelMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_modelmesh_material(this.__wbg_ptr);
        return ModelMaterial.__wrap(ret);
    }
    /**
     * @param {ModelMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, ModelMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_modelmesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_modelmesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_modelmesh_transform(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number | undefined}
     */
    get bin() {
        const ret = wasm.__wbg_get_modelmesh_bin(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set bin(arg0) {
        wasm.__wbg_set_modelmesh_bin(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @returns {Aabb}
     */
    get aabb() {
        const ret = wasm.__wbg_get_modelmesh_aabb(this.__wbg_ptr);
        return Aabb.__wrap(ret);
    }
    /**
     * @param {Aabb} arg0
     */
    set aabb(arg0) {
        _assertClass(arg0, Aabb);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_modelmesh_aabb(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableModelGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_modelmesh_geometry(this.__wbg_ptr);
        return TransferableModelGeometry.__wrap(ret);
    }
    /**
     * @param {TransferableModelGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferableModelGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_modelmesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_modelmesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_modelmesh_active(this.__wbg_ptr, arg0);
    }
}

const MvtLayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_mvtlayerdescription_free(ptr >>> 0, 1));

export class MvtLayerDescription {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MvtLayerDescriptionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_mvtlayerdescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_mvtlayerdescription_type(this.__wbg_ptr);
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
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_mvtlayerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string | undefined}
     */
    get crs() {
        const ret = wasm.__wbg_get_mvtlayerdescription_crs(this.__wbg_ptr);
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
    set crs(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_mvtlayerdescription_crs(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {any}
     */
    get data() {
        const ret = wasm.__wbg_get_mvtlayerdescription_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_mvtlayerdescription_data(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {PointMaterial | undefined}
     */
    get point() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_point(this.__wbg_ptr);
        return ret === 0 ? undefined : PointMaterial.__wrap(ret);
    }
    /**
     * @param {PointMaterial | null} [arg0]
     */
    set point(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PointMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geojsonlayerdescription_point(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {BillboardMaterial | undefined}
     */
    get billboard() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_billboard(this.__wbg_ptr);
        return ret === 0 ? undefined : BillboardMaterial.__wrap(ret);
    }
    /**
     * @param {BillboardMaterial | null} [arg0]
     */
    set billboard(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BillboardMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geojsonlayerdescription_billboard(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TextMaterial | undefined}
     */
    get text() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_text(this.__wbg_ptr);
        return ret === 0 ? undefined : TextMaterial.__wrap(ret);
    }
    /**
     * @param {TextMaterial | null} [arg0]
     */
    set text(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TextMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_geojsonlayerdescription_text(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {PolylineMaterial | undefined}
     */
    get polyline() {
        const ret = wasm.__wbg_get_mvtlayerdescription_polyline(this.__wbg_ptr);
        return ret === 0 ? undefined : PolylineMaterial.__wrap(ret);
    }
    /**
     * @param {PolylineMaterial | null} [arg0]
     */
    set polyline(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolylineMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_mvtlayerdescription_polyline(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {PolygonMaterial | undefined}
     */
    get polygon() {
        const ret = wasm.__wbg_get_mvtlayerdescription_polygon(this.__wbg_ptr);
        return ret === 0 ? undefined : PolygonMaterial.__wrap(ret);
    }
    /**
     * @param {PolygonMaterial | null} [arg0]
     */
    set polygon(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolygonMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_mvtlayerdescription_polygon(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {VectorTileMaterial | undefined}
     */
    get vectorTile() {
        const ret = wasm.__wbg_get_mvtlayerdescription_vectorTile(this.__wbg_ptr);
        return ret === 0 ? undefined : VectorTileMaterial.__wrap(ret);
    }
    /**
     * @param {VectorTileMaterial | null} [arg0]
     */
    set vectorTile(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, VectorTileMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_mvtlayerdescription_vectorTile(this.__wbg_ptr, ptr0);
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

const ObjectTransformEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_objecttransformevent_free(ptr >>> 0, 1));

export class ObjectTransformEvent {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ObjectTransformEvent.prototype);
        obj.__wbg_ptr = ptr;
        ObjectTransformEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof ObjectTransformEvent)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ObjectTransformEventFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_objecttransformevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_objecttransformevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_objecttransformevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_objecttransformevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_objecttransformevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_objecttransformevent_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_objecttransformevent_transform(this.__wbg_ptr, ptr0);
    }
}

const OrthoCamTransformFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_orthocamtransform_free(ptr >>> 0, 1));

export class OrthoCamTransform {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(OrthoCamTransform.prototype);
        obj.__wbg_ptr = ptr;
        OrthoCamTransformFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OrthoCamTransformFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_orthocamtransform_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get left() {
        const ret = wasm.__wbg_get_orthocamtransform_left(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set left(arg0) {
        wasm.__wbg_set_orthocamtransform_left(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get right() {
        const ret = wasm.__wbg_get_orthocamtransform_right(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set right(arg0) {
        wasm.__wbg_set_orthocamtransform_right(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get top() {
        const ret = wasm.__wbg_get_orthocamtransform_top(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set top(arg0) {
        wasm.__wbg_set_orthocamtransform_top(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get bottom() {
        const ret = wasm.__wbg_get_orthocamtransform_bottom(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set bottom(arg0) {
        wasm.__wbg_set_orthocamtransform_bottom(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} left
     * @param {number} right
     * @param {number} top
     * @param {number} bottom
     */
    constructor(left, right, top, bottom) {
        const ret = wasm.orthocamtransform_new(left, right, top, bottom);
        this.__wbg_ptr = ret >>> 0;
        OrthoCamTransformFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const OverscaledTileHandleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_overscaledtilehandle_free(ptr >>> 0, 1));

export class OverscaledTileHandle {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(OverscaledTileHandle.prototype);
        obj.__wbg_ptr = ptr;
        OverscaledTileHandleFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

const PntsLayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pntslayerdescription_free(ptr >>> 0, 1));

export class PntsLayerDescription {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PntsLayerDescriptionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pntslayerdescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_pntslayerdescription_type(this.__wbg_ptr);
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
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_b3dmlayerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string | undefined}
     */
    get crs() {
        const ret = wasm.__wbg_get_pntslayerdescription_crs(this.__wbg_ptr);
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
    set crs(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_b3dmlayerdescription_crs(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {any}
     */
    get data() {
        const ret = wasm.__wbg_get_pntslayerdescription_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_pntslayerdescription_data(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {ModelMaterial | undefined}
     */
    get model() {
        const ret = wasm.__wbg_get_b3dmlayerdescription_model(this.__wbg_ptr);
        return ret === 0 ? undefined : ModelMaterial.__wrap(ret);
    }
    /**
     * @param {ModelMaterial | null} [arg0]
     */
    set model(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ModelMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_b3dmlayerdescription_model(this.__wbg_ptr, ptr0);
    }
}

const PointMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pointmaterial_free(ptr >>> 0, 1));

export class PointMaterial {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PointMaterial.prototype);
        obj.__wbg_ptr = ptr;
        PointMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
     * Avoid overlapping with the globe surface.
     * @returns {boolean | undefined}
     */
    get offsetDepth() {
        const ret = wasm.__wbg_get_pointmaterial_offsetDepth(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Avoid overlapping with the globe surface.
     * @param {boolean | null} [arg0]
     */
    set offsetDepth(arg0) {
        wasm.__wbg_set_pointmaterial_offsetDepth(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
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
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @returns {string[] | undefined}
     */
    get effectIds() {
        const ret = wasm.__wbg_get_pointmaterial_effectIds(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @param {string[] | null} [arg0]
     */
    set effectIds(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_pointmaterial_effectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Depth behavior for selective effect mask passes: "normal" or "silhouette"
     * @returns {string | undefined}
     */
    get selectiveEffectOcclusion() {
        const ret = wasm.__wbg_get_pointmaterial_selectiveEffectOcclusion(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Depth behavior for selective effect mask passes: "normal" or "silhouette"
     * @param {string | null} [arg0]
     */
    set selectiveEffectOcclusion(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_pointmaterial_selectiveEffectOcclusion(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Emissive glow intensity (default: 0.3 when Bloom enabled)
     * @returns {number | undefined}
     */
    get emissiveIntensity() {
        const ret = wasm.__wbg_get_billboardmaterial_alphaTest(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Emissive glow intensity (default: 0.3 when Bloom enabled)
     * @param {number | null} [arg0]
     */
    set emissiveIntensity(arg0) {
        wasm.__wbg_set_billboardmaterial_alphaTest(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @returns {number | undefined}
     */
    get emissiveColor() {
        const ret = wasm.__wbg_get_pointmaterial_emissiveColor(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @param {number | null} [arg0]
     */
    set emissiveColor(arg0) {
        wasm.__wbg_set_pointmaterial_emissiveColor(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
}

const PointMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pointmesh_free(ptr >>> 0, 1));

export class PointMesh {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PointMesh.prototype);
        obj.__wbg_ptr = ptr;
        PointMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PointMeshFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pointmesh_free(ptr, 0);
    }
    /**
     * @returns {PointMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_pointmesh_material(this.__wbg_ptr);
        return PointMaterial.__wrap(ret);
    }
    /**
     * @param {PointMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, PointMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_pointmesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_pointmesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_pointmesh_transform(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferablePointGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_pointmesh_geometry(this.__wbg_ptr);
        return TransferablePointGeometry.__wrap(ret);
    }
    /**
     * @param {TransferablePointGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePointGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_pointmesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_pointmesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_pointmesh_active(this.__wbg_ptr, arg0);
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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PolygonMaterial.prototype);
        obj.__wbg_ptr = ptr;
        PolygonMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @returns {string[] | undefined}
     */
    get effectIds() {
        const ret = wasm.__wbg_get_polygonmaterial_effectIds(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @param {string[] | null} [arg0]
     */
    set effectIds(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polygonmaterial_effectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Depth behavior for selective effect mask passes: "normal" or "silhouette"
     * @returns {string | undefined}
     */
    get selectiveEffectOcclusion() {
        const ret = wasm.__wbg_get_polygonmaterial_selectiveEffectOcclusion(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Depth behavior for selective effect mask passes: "normal" or "silhouette"
     * @param {string | null} [arg0]
     */
    set selectiveEffectOcclusion(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polygonmaterial_selectiveEffectOcclusion(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Emissive glow intensity (default: 0.3 when Bloom enabled)
     * @returns {number | undefined}
     */
    get emissiveIntensity() {
        const ret = wasm.__wbg_get_polygonmaterial_emissiveIntensity(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Emissive glow intensity (default: 0.3 when Bloom enabled)
     * @param {number | null} [arg0]
     */
    set emissiveIntensity(arg0) {
        wasm.__wbg_set_polygonmaterial_emissiveIntensity(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @returns {number | undefined}
     */
    get emissiveColor() {
        const ret = wasm.__wbg_get_polygonmaterial_emissiveColor(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @param {number | null} [arg0]
     */
    set emissiveColor(arg0) {
        wasm.__wbg_set_polygonmaterial_emissiveColor(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
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

const PolygonMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polygonmesh_free(ptr >>> 0, 1));

export class PolygonMesh {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PolygonMesh.prototype);
        obj.__wbg_ptr = ptr;
        PolygonMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolygonMeshFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polygonmesh_free(ptr, 0);
    }
    /**
     * @returns {PolygonMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_polygonmesh_material(this.__wbg_ptr);
        return PolygonMaterial.__wrap(ret);
    }
    /**
     * @param {PolygonMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, PolygonMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polygonmesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferablePolygonGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_polygonmesh_geometry(this.__wbg_ptr);
        return TransferablePolygonGeometry.__wrap(ret);
    }
    /**
     * @param {TransferablePolygonGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePolygonGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polygonmesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferablePolygonOutlineGeometry | undefined}
     */
    get outline_geometry() {
        const ret = wasm.__wbg_get_polygonmesh_outline_geometry(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferablePolygonOutlineGeometry.__wrap(ret);
    }
    /**
     * @param {TransferablePolygonOutlineGeometry | null} [arg0]
     */
    set outline_geometry(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferablePolygonOutlineGeometry);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_polygonmesh_outline_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_polygonmesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polygonmesh_transform(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_polygonmesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_polygonmesh_active(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {BoundingSphere | undefined}
     */
    get bounding_sphere() {
        const ret = wasm.__wbg_get_polygonmesh_bounding_sphere(this.__wbg_ptr);
        return ret === 0 ? undefined : BoundingSphere.__wrap(ret);
    }
    /**
     * @param {BoundingSphere | null} [arg0]
     */
    set bounding_sphere(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BoundingSphere);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_polygonmesh_bounding_sphere(this.__wbg_ptr, ptr0);
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
     * @returns {Float32Array | undefined}
     */
    position_high() {
        const ret = wasm.polylinegeometry_position_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_high_size() {
        const ret = wasm.polylinegeometry_position_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    position_low() {
        const ret = wasm.polylinegeometry_position_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    position_low_size() {
        const ret = wasm.polylinegeometry_position_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
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
     * @returns {Float32Array | undefined}
     */
    start_high() {
        const ret = wasm.polylinegeometry_start_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_high_size() {
        const ret = wasm.polylinegeometry_start_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    start_low() {
        const ret = wasm.polylinegeometry_start_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    start_low_size() {
        const ret = wasm.polylinegeometry_start_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
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
     * @returns {Float32Array | undefined}
     */
    end_high() {
        const ret = wasm.polylinegeometry_end_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    end_high_size() {
        const ret = wasm.polylinegeometry_end_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    end_low() {
        const ret = wasm.polylinegeometry_end_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    end_low_size() {
        const ret = wasm.polylinegeometry_end_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
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
        const ret = wasm.polylinegeometryattributes_transfer_position_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_position_high() {
        const ret = wasm.polylinegeometryattributes_transfer_position_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_position_high_size() {
        const ret = wasm.polylinegeometryattributes_transfer_position_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_position_low() {
        const ret = wasm.polylinegeometryattributes_transfer_position_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_position_low_size() {
        const ret = wasm.polylinegeometryattributes_transfer_position_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
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
        const ret = wasm.polylinegeometryattributes_transfer_start_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_start_high() {
        const ret = wasm.polylinegeometryattributes_transfer_start_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_start_high_size() {
        const ret = wasm.polylinegeometryattributes_transfer_start_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_start_low() {
        const ret = wasm.polylinegeometryattributes_transfer_start_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_start_low_size() {
        const ret = wasm.polylinegeometryattributes_transfer_start_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
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
        const ret = wasm.polylinegeometryattributes_transfer_forward_offset_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_end_high() {
        const ret = wasm.polylinegeometryattributes_transfer_end_high(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_end_high_size() {
        const ret = wasm.polylinegeometryattributes_transfer_end_high_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transfer_end_low() {
        const ret = wasm.polylinegeometryattributes_transfer_end_low(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number | undefined}
     */
    transfer_end_low_size() {
        const ret = wasm.polylinegeometryattributes_transfer_end_low_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
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
        const ret = wasm.polylinegeometryattributes_transfer_start_normals_size(this.__wbg_ptr);
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
        const ret = wasm.polylinegeometryattributes_transfer_end_normal_and_texture_coordinate_normalization_x_size(this.__wbg_ptr);
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
        const ret = wasm.polylinegeometryattributes_transfer_right_normal_and_texture_coordinate_normalization_y_size(this.__wbg_ptr);
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
        const ret = wasm.polylinegeometryattributes_transfer_batch_id_size(this.__wbg_ptr);
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
        const ret = wasm.polylinegeometryattributes_transfer_batch_index_size(this.__wbg_ptr);
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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PolylineMaterial.prototype);
        obj.__wbg_ptr = ptr;
        PolylineMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @returns {string[] | undefined}
     */
    get effectIds() {
        const ret = wasm.__wbg_get_polylinematerial_effectIds(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        }
        return v1;
    }
    /**
     * IDs of selective effects to apply (e.g., "bloom", "outline")
     * @param {string[] | null} [arg0]
     */
    set effectIds(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polylinematerial_effectIds(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Depth behavior for selective effect mask passes: "normal" or "silhouette"
     * @returns {string | undefined}
     */
    get selectiveEffectOcclusion() {
        const ret = wasm.__wbg_get_polylinematerial_selectiveEffectOcclusion(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Depth behavior for selective effect mask passes: "normal" or "silhouette"
     * @param {string | null} [arg0]
     */
    set selectiveEffectOcclusion(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polylinematerial_selectiveEffectOcclusion(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Emissive glow intensity (default: 0.3 when Bloom enabled)
     * @returns {number | undefined}
     */
    get emissiveIntensity() {
        const ret = wasm.__wbg_get_polygonmaterial_reflectivity(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Emissive glow intensity (default: 0.3 when Bloom enabled)
     * @param {number | null} [arg0]
     */
    set emissiveIntensity(arg0) {
        wasm.__wbg_set_polygonmaterial_reflectivity(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @returns {number | undefined}
     */
    get emissiveColor() {
        const ret = wasm.__wbg_get_polylinematerial_emissiveColor(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Emissive glow color in 0xRRGGBB format
     * @param {number | null} [arg0]
     */
    set emissiveColor(arg0) {
        wasm.__wbg_set_polylinematerial_emissiveColor(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
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

const PolylineMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_polylinemesh_free(ptr >>> 0, 1));

export class PolylineMesh {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PolylineMesh.prototype);
        obj.__wbg_ptr = ptr;
        PolylineMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolylineMeshFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_polylinemesh_free(ptr, 0);
    }
    /**
     * @returns {PolylineMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_polylinemesh_material(this.__wbg_ptr);
        return PolylineMaterial.__wrap(ret);
    }
    /**
     * @param {PolylineMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, PolylineMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polylinemesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferablePolylineGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_polylinemesh_geometry(this.__wbg_ptr);
        return TransferablePolylineGeometry.__wrap(ret);
    }
    /**
     * @param {TransferablePolylineGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePolylineGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polylinemesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_polylinemesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_polylinemesh_transform(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_polylinemesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_polylinemesh_active(this.__wbg_ptr, arg0);
    }
    /**
     * Whether the polyline should be rendered as a texturized draped feature
     * @returns {boolean}
     */
    get should_be_texturized() {
        const ret = wasm.__wbg_get_polylinemesh_should_be_texturized(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether the polyline should be rendered as a texturized draped feature
     * @param {boolean} arg0
     */
    set should_be_texturized(arg0) {
        wasm.__wbg_set_polylinemesh_should_be_texturized(this.__wbg_ptr, arg0);
    }
}

const RasterTerrainMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rasterterrainmaterial_free(ptr >>> 0, 1));

export class RasterTerrainMaterial {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RasterTerrainMaterial.prototype);
        obj.__wbg_ptr = ptr;
        RasterTerrainMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
        const ret = wasm.__wbg_get_billboardmaterial_offsetDepth(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_billboardmaterial_offsetDepth(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_billboardmaterial_transparent(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_billboardmaterial_transparent(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
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
    /**
     * Whether to render skirts along tile boundaries to hide gaps.
     * You should disable `skirt` if you want to visualize an underground model.
     * @returns {boolean | undefined}
     */
    get skirt() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_skirt(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Whether to render skirts along tile boundaries to hide gaps.
     * You should disable `skirt` if you want to visualize an underground model.
     * @param {boolean | null} [arg0]
     */
    set skirt(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_skirt(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * A value of 1.0 uses the default calculated height.
     * @returns {number | undefined}
     */
    get skirtExaggeration() {
        const ret = wasm.__wbg_get_modelmaterial_pointSize(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * A value of 1.0 uses the default calculated height.
     * @param {number | null} [arg0]
     */
    set skirtExaggeration(arg0) {
        wasm.__wbg_set_modelmaterial_pointSize(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
}

const RasterTileInternalMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_rastertileinternalmaterial_free(ptr >>> 0, 1));

export class RasterTileInternalMaterial {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RasterTileInternalMaterial.prototype);
        obj.__wbg_ptr = ptr;
        RasterTileInternalMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RasterTileMaterial.prototype);
        obj.__wbg_ptr = ptr;
        RasterTileMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

const ReconstructableEntityFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_reconstructableentity_free(ptr >>> 0, 1));
/**
 * This is used to share the entity id between WASM and client.
 * You can reconstruct Bevy Entity by `Entity:from_bits`.
 */
export class ReconstructableEntity {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ReconstructableEntity.prototype);
        obj.__wbg_ptr = ptr;
        ReconstructableEntityFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ReconstructableEntityFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_reconstructableentity_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get 0() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_tile_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set 0(arg0) {
        wasm.__wbg_set_constructterrainmeshparameters_tile_handle(this.__wbg_ptr, arg0);
    }
}

const RenderableFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_renderablefeature_free(ptr >>> 0, 1));

export class RenderableFeature {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RenderableFeature.prototype);
        obj.__wbg_ptr = ptr;
        RenderableFeatureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RenderableFeatureFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_renderablefeature_free(ptr, 0);
    }
    /**
     * @returns {PointMesh | undefined}
     */
    get point() {
        const ret = wasm.__wbg_get_renderablefeature_point(this.__wbg_ptr);
        return ret === 0 ? undefined : PointMesh.__wrap(ret);
    }
    /**
     * @param {PointMesh | null} [arg0]
     */
    set point(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PointMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_point(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {BillboardMesh | undefined}
     */
    get billboard() {
        const ret = wasm.__wbg_get_renderablefeature_billboard(this.__wbg_ptr);
        return ret === 0 ? undefined : BillboardMesh.__wrap(ret);
    }
    /**
     * @param {BillboardMesh | null} [arg0]
     */
    set billboard(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, BillboardMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_billboard(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TextMesh | undefined}
     */
    get text() {
        const ret = wasm.__wbg_get_renderablefeature_text(this.__wbg_ptr);
        return ret === 0 ? undefined : TextMesh.__wrap(ret);
    }
    /**
     * @param {TextMesh | null} [arg0]
     */
    set text(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TextMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_text(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {PolylineMesh | undefined}
     */
    get polyline() {
        const ret = wasm.__wbg_get_renderablefeature_polyline(this.__wbg_ptr);
        return ret === 0 ? undefined : PolylineMesh.__wrap(ret);
    }
    /**
     * @param {PolylineMesh | null} [arg0]
     */
    set polyline(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolylineMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_polyline(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {PolygonMesh | undefined}
     */
    get polygon() {
        const ret = wasm.__wbg_get_renderablefeature_polygon(this.__wbg_ptr);
        return ret === 0 ? undefined : PolygonMesh.__wrap(ret);
    }
    /**
     * @param {PolygonMesh | null} [arg0]
     */
    set polygon(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolygonMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_polygon(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ModelMesh | undefined}
     */
    get model() {
        const ret = wasm.__wbg_get_renderablefeature_model(this.__wbg_ptr);
        return ret === 0 ? undefined : ModelMesh.__wrap(ret);
    }
    /**
     * @param {ModelMesh | null} [arg0]
     */
    set model(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ModelMesh);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeature_model(this.__wbg_ptr, ptr0);
    }
}

const RenderableFeatureAddedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_renderablefeatureaddedevent_free(ptr >>> 0, 1));

export class RenderableFeatureAddedEvent {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RenderableFeatureAddedEvent.prototype);
        obj.__wbg_ptr = ptr;
        RenderableFeatureAddedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof RenderableFeatureAddedEvent)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RenderableFeatureAddedEventFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_renderablefeatureaddedevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_renderablefeatureaddedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_renderablefeatureaddedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_renderablefeatureaddedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {RenderableFeature}
     */
    get feature() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_feature(this.__wbg_ptr);
        return RenderableFeature.__wrap(ret);
    }
    /**
     * @param {RenderableFeature} arg0
     */
    set feature(arg0) {
        _assertClass(arg0, RenderableFeature);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_renderablefeatureaddedevent_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {string}
     */
    get layer_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_renderablefeatureaddedevent_layer_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set layer_id(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_renderablefeatureaddedevent_layer_id(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {OverscaledTileHandle | undefined}
     */
    get overscaled_tile_handle() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_overscaled_tile_handle(this.__wbg_ptr);
        return ret === 0 ? undefined : OverscaledTileHandle.__wrap(ret);
    }
    /**
     * @param {OverscaledTileHandle | null} [arg0]
     */
    set overscaled_tile_handle(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, OverscaledTileHandle);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeatureaddedevent_overscaled_tile_handle(this.__wbg_ptr, ptr0);
    }
}

const RenderableFeatureChangedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_renderablefeaturechangedevent_free(ptr >>> 0, 1));

export class RenderableFeatureChangedEvent {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RenderableFeatureChangedEvent.prototype);
        obj.__wbg_ptr = ptr;
        RenderableFeatureChangedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof RenderableFeatureChangedEvent)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RenderableFeatureChangedEventFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_renderablefeaturechangedevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_renderablefeatureaddedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_renderablefeatureaddedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_renderablefeatureaddedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {RenderableFeature}
     */
    get feature() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_feature(this.__wbg_ptr);
        return RenderableFeature.__wrap(ret);
    }
    /**
     * @param {RenderableFeature} arg0
     */
    set feature(arg0) {
        _assertClass(arg0, RenderableFeature);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_renderablefeatureaddedevent_feature(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {string}
     */
    get layer_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_renderablefeaturechangedevent_layer_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set layer_id(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_renderablefeatureaddedevent_layer_id(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {OverscaledTileHandle | undefined}
     */
    get overscaled_tile_handle() {
        const ret = wasm.__wbg_get_renderablefeatureaddedevent_overscaled_tile_handle(this.__wbg_ptr);
        return ret === 0 ? undefined : OverscaledTileHandle.__wrap(ret);
    }
    /**
     * @param {OverscaledTileHandle | null} [arg0]
     */
    set overscaled_tile_handle(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, OverscaledTileHandle);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_renderablefeatureaddedevent_overscaled_tile_handle(this.__wbg_ptr, ptr0);
    }
}

const RenderableFeatureRemovedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_renderablefeatureremovedevent_free(ptr >>> 0, 1));

export class RenderableFeatureRemovedEvent {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RenderableFeatureRemovedEvent.prototype);
        obj.__wbg_ptr = ptr;
        RenderableFeatureRemovedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof RenderableFeatureRemovedEvent)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RenderableFeatureRemovedEventFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_renderablefeatureremovedevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_renderablefeatureremovedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_renderablefeatureremovedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_renderablefeatureremovedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_renderablefeatureremovedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_renderablefeatureremovedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_renderablefeatureremovedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {string}
     */
    get layer_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_renderablefeatureremovedevent_layer_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set layer_id(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_renderablefeatureremovedevent_layer_id(this.__wbg_ptr, ptr0, len0);
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
    /**
     * @returns {Float32Array | undefined}
     */
    transferSkirtVertices() {
        const ret = wasm.returnedconstructedterrainmesh_transferSkirtVertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array | undefined}
     */
    transferSkirtUvs() {
        const ret = wasm.returnedconstructedterrainmesh_transferSkirtUvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    transferSkirtIndices() {
        const ret = wasm.returnedconstructedterrainmesh_transferSkirtIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array | undefined}
     */
    transferSkirtIndicesToEdge() {
        const ret = wasm.returnedconstructedterrainmesh_transferSkirtIndicesToEdge(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    hasSkirt() {
        const ret = wasm.returnedconstructedterrainmesh_hasSkirt(this.__wbg_ptr);
        return ret !== 0;
    }
}

const ReturnedTransferablePolygonBatchedFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_returnedtransferablepolygonbatchedfeature_free(ptr >>> 0, 1));

export class ReturnedTransferablePolygonBatchedFeature {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ReturnedTransferablePolygonBatchedFeature.prototype);
        obj.__wbg_ptr = ptr;
        ReturnedTransferablePolygonBatchedFeatureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ReturnedTransferablePolygonBatchedFeatureFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_returnedtransferablepolygonbatchedfeature_free(ptr, 0);
    }
    /**
     * @returns {PolygonMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_returnedtransferablepolygonbatchedfeature_material(this.__wbg_ptr);
        return PolygonMaterial.__wrap(ret);
    }
    /**
     * @param {PolygonMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, PolygonMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_returnedtransferablepolygonbatchedfeature_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIndices() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferBatchIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferOuterRing() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferOuterRing(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferOuterRingSizes() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferOuterRingSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferHoles() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferHoles(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesBoundaries() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferHolesBoundaries(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesSizes() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferHolesSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferHolesTotalSizes() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferHolesTotalSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint8Array}
     */
    transferExpectedWindingOrders() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferExpectedWindingOrders(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {CRS}
     */
    crs() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_crs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    length() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_length(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const ReturnedTransferablePolylineBatchedFeatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_returnedtransferablepolylinebatchedfeature_free(ptr >>> 0, 1));

export class ReturnedTransferablePolylineBatchedFeature {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ReturnedTransferablePolylineBatchedFeature.prototype);
        obj.__wbg_ptr = ptr;
        ReturnedTransferablePolylineBatchedFeatureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ReturnedTransferablePolylineBatchedFeatureFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_returnedtransferablepolylinebatchedfeature_free(ptr, 0);
    }
    /**
     * @returns {PolylineMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_returnedtransferablepolylinebatchedfeature_material(this.__wbg_ptr);
        return PolylineMaterial.__wrap(ret);
    }
    /**
     * @param {PolylineMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, PolylineMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_returnedtransferablepolylinebatchedfeature_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIndices() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_transferBatchIndices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float64Array}
     */
    transferPoints() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_transferPoints(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Uint32Array}
     */
    transferPointsSizes() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_transferPointsSizes(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {CRS}
     */
    crs() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_crs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    length() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_length(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const TerrainHeightUpdatedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_terrainheightupdatedevent_free(ptr >>> 0, 1));

export class TerrainHeightUpdatedEvent {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TerrainHeightUpdatedEvent.prototype);
        obj.__wbg_ptr = ptr;
        TerrainHeightUpdatedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof TerrainHeightUpdatedEvent)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TerrainHeightUpdatedEventFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_terrainheightupdatedevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_terrainheightupdatedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_terrainheightupdatedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_terrainheightupdatedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_terrainheightupdatedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_terrainheightupdatedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_terrainheightupdatedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {LLE}
     */
    get lle() {
        const ret = wasm.__wbg_get_terrainheightupdatedevent_lle(this.__wbg_ptr);
        return LLE.__wrap(ret);
    }
    /**
     * @param {LLE} arg0
     */
    set lle(arg0) {
        _assertClass(arg0, LLE);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_terrainheightupdatedevent_lle(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_terrainheightupdatedevent_height(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : ret[1];
    }
    /**
     * @param {number | null} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_terrainheightupdatedevent_height(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0);
    }
}

const TerrainLayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_terrainlayerdescription_free(ptr >>> 0, 1));

export class TerrainLayerDescription {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TerrainLayerDescriptionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_terrainlayerdescription_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get type() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_terrainlayerdescription_type(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set type(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_terrainlayerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {any}
     */
    get data() {
        const ret = wasm.__wbg_get_terrainlayerdescription_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_terrainlayerdescription_data(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {RasterTerrainMaterial | undefined}
     */
    get rasterTerrain() {
        const ret = wasm.__wbg_get_terrainlayerdescription_rasterTerrain(this.__wbg_ptr);
        return ret === 0 ? undefined : RasterTerrainMaterial.__wrap(ret);
    }
    /**
     * @param {RasterTerrainMaterial | null} [arg0]
     */
    set rasterTerrain(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, RasterTerrainMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_terrainlayerdescription_rasterTerrain(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {EllipsoidTerrainMaterial | undefined}
     */
    get ellipsoid() {
        const ret = wasm.__wbg_get_terrainlayerdescription_ellipsoid(this.__wbg_ptr);
        return ret === 0 ? undefined : EllipsoidTerrainMaterial.__wrap(ret);
    }
    /**
     * @param {EllipsoidTerrainMaterial | null} [arg0]
     */
    set ellipsoid(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, EllipsoidTerrainMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_terrainlayerdescription_ellipsoid(this.__wbg_ptr, ptr0);
    }
}

const TextMaterialFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_textmaterial_free(ptr >>> 0, 1));

export class TextMaterial {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TextMaterial.prototype);
        obj.__wbg_ptr = ptr;
        TextMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
        const ret = wasm.__wbg_get_textmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_textmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
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
        const ret = wasm.__wbg_get_textmaterial_scaleByDistance(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set scaleByDistance(arg0) {
        wasm.__wbg_set_textmaterial_scaleByDistance(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get clampToGround() {
        const ret = wasm.__wbg_get_textmaterial_clampToGround(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set clampToGround(arg0) {
        wasm.__wbg_set_textmaterial_clampToGround(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get depthTest() {
        const ret = wasm.__wbg_get_textmaterial_depthTest(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set depthTest(arg0) {
        wasm.__wbg_set_textmaterial_depthTest(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * Avoid overlapping with the globe surface.
     * @returns {boolean | undefined}
     */
    get offsetDepth() {
        const ret = wasm.__wbg_get_textmaterial_offsetDepth(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Avoid overlapping with the globe surface.
     * @param {boolean | null} [arg0]
     */
    set offsetDepth(arg0) {
        wasm.__wbg_set_textmaterial_offsetDepth(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
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
        wasm.__wbg_set_modelmaterial_url(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * **Experimental*:
     * Specify URL for font file. Supported files are ttf, otf and woff. Default is `Roboto`.
     * Please note that this API might be replaced with another API in the future, since it loads a large font file at once.
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
     * **Experimental*:
     * Specify URL for font file. Supported files are ttf, otf and woff. Default is `Roboto`.
     * Please note that this API might be replaced with another API in the future, since it loads a large font file at once.
     * @param {string | null} [arg0]
     */
    set font(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_modelmaterial_animationActiveClip(this.__wbg_ptr, ptr0, len0);
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
        const ret = wasm.__wbg_get_modelmaterial_emissiveIntensity(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set borderWidth(arg0) {
        wasm.__wbg_set_modelmaterial_emissiveIntensity(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
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
    /**
     * Language code for text shaping (e.g., "en", "ja", "ar"). Used for proper text rendering.
     * @returns {string | undefined}
     */
    get lang() {
        const ret = wasm.__wbg_get_textmaterial_lang(this.__wbg_ptr);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * Language code for text shaping (e.g., "en", "ja", "ar"). Used for proper text rendering.
     * @param {string | null} [arg0]
     */
    set lang(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_textmaterial_lang(this.__wbg_ptr, ptr0, len0);
    }
}

const TextMeshFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_textmesh_free(ptr >>> 0, 1));

export class TextMesh {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TextMesh.prototype);
        obj.__wbg_ptr = ptr;
        TextMeshFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextMeshFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_textmesh_free(ptr, 0);
    }
    /**
     * @returns {TextMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_textmesh_material(this.__wbg_ptr);
        return TextMaterial.__wrap(ret);
    }
    /**
     * @param {TextMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, TextMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_textmesh_material(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Transform}
     */
    get transform() {
        const ret = wasm.__wbg_get_textmesh_transform(this.__wbg_ptr);
        return Transform.__wrap(ret);
    }
    /**
     * @param {Transform} arg0
     */
    set transform(arg0) {
        _assertClass(arg0, Transform);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_textmesh_transform(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferablePointGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_textmesh_geometry(this.__wbg_ptr);
        return TransferablePointGeometry.__wrap(ret);
    }
    /**
     * @param {TransferablePointGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferablePointGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_textmesh_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_textmesh_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_textmesh_active(this.__wbg_ptr, arg0);
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

const TextureFragmentRequestedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_texturefragmentrequestedevent_free(ptr >>> 0, 1));

export class TextureFragmentRequestedEvent {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TextureFragmentRequestedEvent.prototype);
        obj.__wbg_ptr = ptr;
        TextureFragmentRequestedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof TextureFragmentRequestedEvent)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TextureFragmentRequestedEventFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_texturefragmentrequestedevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_texturefragmentrequestedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_texturefragmentrequestedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_texturefragmentrequestedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_texturefragmentrequestedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_datarequesterremovedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_datarequesterremovedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {string}
     */
    get url() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_texturefragmentrequestedevent_url(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set url(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_datarequestevent_extension(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {TextureFragmentStatus}
     */
    get status() {
        const ret = wasm.__wbg_get_texturefragmentrequestedevent_status(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {TextureFragmentStatus} arg0
     */
    set status(arg0) {
        wasm.__wbg_set_texturefragmentrequestedevent_status(this.__wbg_ptr, arg0);
    }
}

const TileLayerDescriptionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tilelayerdescription_free(ptr >>> 0, 1));

export class TileLayerDescription {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TileLayerDescriptionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tilelayerdescription_free(ptr, 0);
    }
    /**
     * @returns {string | undefined}
     */
    get type() {
        const ret = wasm.__wbg_get_tilelayerdescription_type(this.__wbg_ptr);
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
    set type(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_tilelayerdescription_type(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {any}
     */
    get data() {
        const ret = wasm.__wbg_get_tilelayerdescription_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {any} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_tilelayerdescription_data(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {RasterTileMaterial | undefined}
     */
    get rasterTile() {
        const ret = wasm.__wbg_get_tilelayerdescription_rasterTile(this.__wbg_ptr);
        return ret === 0 ? undefined : RasterTileMaterial.__wrap(ret);
    }
    /**
     * @param {RasterTileMaterial | null} [arg0]
     */
    set rasterTile(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, RasterTileMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_tilelayerdescription_rasterTile(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ElevationHeatmapMaterial | undefined}
     */
    get elevationHeatmap() {
        const ret = wasm.__wbg_get_tilelayerdescription_elevationHeatmap(this.__wbg_ptr);
        return ret === 0 ? undefined : ElevationHeatmapMaterial.__wrap(ret);
    }
    /**
     * @param {ElevationHeatmapMaterial | null} [arg0]
     */
    set elevationHeatmap(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ElevationHeatmapMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_tilelayerdescription_elevationHeatmap(this.__wbg_ptr, ptr0);
    }
}

const TileUvTransformFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tileuvtransform_free(ptr >>> 0, 1));

export class TileUvTransform {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TileUvTransform.prototype);
        obj.__wbg_ptr = ptr;
        TileUvTransformFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TileUvTransformFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tileuvtransform_free(ptr, 0);
    }
    /**
     * @returns {Vec2}
     */
    get offset() {
        const ret = wasm.__wbg_get_tileuvtransform_offset(this.__wbg_ptr);
        return Vec2.__wrap(ret);
    }
    /**
     * @param {Vec2} arg0
     */
    set offset(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_tileuvtransform_offset(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Vec2}
     */
    get scale() {
        const ret = wasm.__wbg_get_tileuvtransform_scale(this.__wbg_ptr);
        return Vec2.__wrap(ret);
    }
    /**
     * @param {Vec2} arg0
     */
    set scale(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_tileuvtransform_scale(this.__wbg_ptr, ptr0);
    }
}

const TileXYZFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tilexyz_free(ptr >>> 0, 1));

export class TileXYZ {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TileXYZ.prototype);
        obj.__wbg_ptr = ptr;
        TileXYZFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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

const TransferableFloatAttributeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablefloatattribute_free(ptr >>> 0, 1));

export class TransferableFloatAttribute {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferableFloatAttribute.prototype);
        obj.__wbg_ptr = ptr;
        TransferableFloatAttributeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableFloatAttributeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablefloatattribute_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get data() {
        const ret = wasm.__wbg_get_transferablefloatattribute_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_transferablefloatattribute_data(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.__wbg_get_transferablefloatattribute_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set size(arg0) {
        wasm.__wbg_set_transferablefloatattribute_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} data
     * @param {number} size
     */
    constructor(data, size) {
        const ret = wasm.transferablefloatattribute_new(data, size);
        this.__wbg_ptr = ret >>> 0;
        TransferableFloatAttributeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const TransferableGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablegeometry_free(ptr >>> 0, 1));

export class TransferableGeometry {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferableGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferableGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablegeometry_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get vertices() {
        const ret = wasm.__wbg_get_transferablegeometry_vertices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set vertices(arg0) {
        wasm.__wbg_set_transferablegeometry_vertices(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get uvs() {
        const ret = wasm.__wbg_get_transferablegeometry_uvs(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set uvs(arg0) {
        wasm.__wbg_set_transferablegeometry_uvs(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get indices() {
        const ret = wasm.__wbg_get_transferablegeometry_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set indices(arg0) {
        wasm.__wbg_set_transferablegeometry_indices(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number | undefined}
     */
    get skirt_vertices() {
        const ret = wasm.__wbg_get_transferablegeometry_skirt_vertices(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set skirt_vertices(arg0) {
        wasm.__wbg_set_transferablegeometry_skirt_vertices(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get skirt_uvs() {
        const ret = wasm.__wbg_get_transferablegeometry_skirt_uvs(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set skirt_uvs(arg0) {
        wasm.__wbg_set_transferablegeometry_skirt_uvs(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get skirt_indices() {
        const ret = wasm.__wbg_get_transferablegeometry_skirt_indices(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set skirt_indices(arg0) {
        wasm.__wbg_set_transferablegeometry_skirt_indices(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get skirt_indices_to_edge() {
        const ret = wasm.__wbg_get_transferablegeometry_skirt_indices_to_edge(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set skirt_indices_to_edge(arg0) {
        wasm.__wbg_set_transferablegeometry_skirt_indices_to_edge(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @param {number} vertices
     * @param {number} uvs
     * @param {number} indices
     */
    constructor(vertices, uvs, indices) {
        const ret = wasm.transferablegeometry_new(vertices, uvs, indices);
        this.__wbg_ptr = ret >>> 0;
        TransferableGeometryFinalization.register(this, this.__wbg_ptr, this);
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

const TransferableMartiniFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablemartini_free(ptr >>> 0, 1));

export class TransferableMartini {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferableMartini.prototype);
        obj.__wbg_ptr = ptr;
        TransferableMartiniFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableMartiniFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablemartini_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.__wbg_get_transferablemartini_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set size(arg0) {
        wasm.__wbg_set_transferablemartini_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} size
     * @param {Uint32Array} coords
     */
    constructor(size, coords) {
        const ptr0 = passArray32ToWasm0(coords, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transferablemartini_new(size, ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        TransferableMartiniFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Uint32Array}
     */
    transfer_coords() {
        const ret = wasm.transferablemartini_transfer_coords(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} size
     * @returns {TransferableMartini}
     */
    static fromSize(size) {
        const ret = wasm.transferablemartini_fromSize(size);
        return TransferableMartini.__wrap(ret);
    }
}

const TransferableModelGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablemodelgeometry_free(ptr >>> 0, 1));

export class TransferableModelGeometry {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferableModelGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferableModelGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableModelGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablemodelgeometry_free(ptr, 0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get batch_ids() {
        const ret = wasm.__wbg_get_transferablemodelgeometry_batch_ids(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set batch_ids(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablemodelgeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
}

const TransferablePointGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepointgeometry_free(ptr >>> 0, 1));

export class TransferablePointGeometry {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferablePointGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferablePointGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePointGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepointgeometry_free(ptr, 0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position() {
        const ret = wasm.__wbg_get_transferablemodelgeometry_batch_ids(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablemodelgeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_3d_high() {
        const ret = wasm.__wbg_get_transferablepointgeometry_position_3d_high(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_3d_high(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepointgeometry_position_3d_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_3d_low() {
        const ret = wasm.__wbg_get_transferablepointgeometry_position_3d_low(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_3d_low(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepointgeometry_position_3d_low(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute}
     */
    get batch_ids() {
        const ret = wasm.__wbg_get_transferablepointgeometry_batch_ids(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set batch_ids(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepointgeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableUintAttribute}
     */
    get batch_index() {
        const ret = wasm.__wbg_get_transferablepointgeometry_batch_index(this.__wbg_ptr);
        return TransferableUintAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableUintAttribute} arg0
     */
    set batch_index(arg0) {
        _assertClass(arg0, TransferableUintAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepointgeometry_batch_index(this.__wbg_ptr, ptr0);
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

const TransferablePolygonGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolygongeometry_free(ptr >>> 0, 1));

export class TransferablePolygonGeometry {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferablePolygonGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferablePolygonGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePolygonGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepolygongeometry_free(ptr, 0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position() {
        const ret = wasm.__wbg_get_transferablemodelgeometry_batch_ids(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablemodelgeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_3d_high() {
        const ret = wasm.__wbg_get_transferablepointgeometry_position_3d_high(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_3d_high(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepointgeometry_position_3d_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_3d_low() {
        const ret = wasm.__wbg_get_transferablepointgeometry_position_3d_low(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_3d_low(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepointgeometry_position_3d_low(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get normal() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_normal(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set normal(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_normal(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get scale_normal_and_cap() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_scale_normal_and_cap(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set scale_normal_and_cap(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_scale_normal_and_cap(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get batch_ids() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_batch_ids(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set batch_ids(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableUintAttribute | undefined}
     */
    get batch_index() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_batch_index(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableUintAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableUintAttribute | null} [arg0]
     */
    set batch_index(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableUintAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_batch_index(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number}
     */
    get indices() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set indices(arg0) {
        wasm.__wbg_set_transferablepolygongeometry_indices(this.__wbg_ptr, arg0);
    }
    /**
     * @param {TransferableFloatAttribute | null | undefined} position
     * @param {TransferableFloatAttribute | null | undefined} position_3d_high
     * @param {TransferableFloatAttribute | null | undefined} position_3d_low
     * @param {TransferableFloatAttribute | null | undefined} normal
     * @param {TransferableFloatAttribute | null | undefined} scale_normal_and_cap
     * @param {TransferableFloatAttribute | null | undefined} batch_ids
     * @param {TransferableUintAttribute | null | undefined} batch_index
     * @param {number} indices
     */
    constructor(position, position_3d_high, position_3d_low, normal, scale_normal_and_cap, batch_ids, batch_index, indices) {
        let ptr0 = 0;
        if (!isLikeNone(position)) {
            _assertClass(position, TransferableFloatAttribute);
            ptr0 = position.__destroy_into_raw();
        }
        let ptr1 = 0;
        if (!isLikeNone(position_3d_high)) {
            _assertClass(position_3d_high, TransferableFloatAttribute);
            ptr1 = position_3d_high.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(position_3d_low)) {
            _assertClass(position_3d_low, TransferableFloatAttribute);
            ptr2 = position_3d_low.__destroy_into_raw();
        }
        let ptr3 = 0;
        if (!isLikeNone(normal)) {
            _assertClass(normal, TransferableFloatAttribute);
            ptr3 = normal.__destroy_into_raw();
        }
        let ptr4 = 0;
        if (!isLikeNone(scale_normal_and_cap)) {
            _assertClass(scale_normal_and_cap, TransferableFloatAttribute);
            ptr4 = scale_normal_and_cap.__destroy_into_raw();
        }
        let ptr5 = 0;
        if (!isLikeNone(batch_ids)) {
            _assertClass(batch_ids, TransferableFloatAttribute);
            ptr5 = batch_ids.__destroy_into_raw();
        }
        let ptr6 = 0;
        if (!isLikeNone(batch_index)) {
            _assertClass(batch_index, TransferableUintAttribute);
            ptr6 = batch_index.__destroy_into_raw();
        }
        const ret = wasm.transferablepolygongeometry_new(ptr0, ptr1, ptr2, ptr3, ptr4, ptr5, ptr6, indices);
        this.__wbg_ptr = ret >>> 0;
        TransferablePolygonGeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const TransferablePolygonOutlineGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolygonoutlinegeometry_free(ptr >>> 0, 1));

export class TransferablePolygonOutlineGeometry {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferablePolygonOutlineGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferablePolygonOutlineGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePolygonOutlineGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepolygonoutlinegeometry_free(ptr, 0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position() {
        const ret = wasm.__wbg_get_transferablemodelgeometry_batch_ids(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablemodelgeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get scale_normal_and_cap() {
        const ret = wasm.__wbg_get_transferablepointgeometry_position_3d_high(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set scale_normal_and_cap(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepointgeometry_position_3d_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number | undefined}
     */
    get skip_indices() {
        const ret = wasm.__wbg_get_transferablepolygonoutlinegeometry_skip_indices(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set skip_indices(arg0) {
        wasm.__wbg_set_transferablegeometry_skirt_indices_to_edge(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @param {TransferableFloatAttribute | null} [position]
     * @param {TransferableFloatAttribute | null} [scale_normal_and_cap]
     * @param {number | null} [skip_indices]
     */
    constructor(position, scale_normal_and_cap, skip_indices) {
        let ptr0 = 0;
        if (!isLikeNone(position)) {
            _assertClass(position, TransferableFloatAttribute);
            ptr0 = position.__destroy_into_raw();
        }
        let ptr1 = 0;
        if (!isLikeNone(scale_normal_and_cap)) {
            _assertClass(scale_normal_and_cap, TransferableFloatAttribute);
            ptr1 = scale_normal_and_cap.__destroy_into_raw();
        }
        const ret = wasm.transferablepolygonoutlinegeometry_new(ptr0, ptr1, isLikeNone(skip_indices) ? 0x100000001 : (skip_indices) >> 0);
        this.__wbg_ptr = ret >>> 0;
        TransferablePolygonOutlineGeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
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

const TransferablePolylineGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablepolylinegeometry_free(ptr >>> 0, 1));

export class TransferablePolylineGeometry {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferablePolylineGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferablePolylineGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferablePolylineGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablepolylinegeometry_free(ptr, 0);
    }
    /**
     * @returns {TransferableFloatAttribute}
     */
    get position() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_position(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set position(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepolylinegeometry_position(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_high() {
        const ret = wasm.__wbg_get_transferablemodelgeometry_batch_ids(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_high(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablemodelgeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get position_low() {
        const ret = wasm.__wbg_get_transferablepointgeometry_position_3d_high(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set position_low(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepointgeometry_position_3d_high(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute}
     */
    get start() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_start(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set start(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepolylinegeometry_start(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get start_high() {
        const ret = wasm.__wbg_get_transferablepointgeometry_position_3d_low(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set start_high(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepointgeometry_position_3d_low(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get start_low() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_normal(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set start_low(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_normal(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute}
     */
    get forward_offset() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_forward_offset(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set forward_offset(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepolylinegeometry_forward_offset(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get end_high() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_scale_normal_and_cap(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set end_high(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_scale_normal_and_cap(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get end_low() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_batch_ids(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set end_low(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute}
     */
    get start_normals() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_start_normals(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set start_normals(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepolylinegeometry_start_normals(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute}
     */
    get end_normal_and_texture_coordinate_normalization_x() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_end_normal_and_texture_coordinate_normalization_x(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set end_normal_and_texture_coordinate_normalization_x(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepolylinegeometry_end_normal_and_texture_coordinate_normalization_x(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute}
     */
    get right_normal_and_texture_coordinate_normalization_y() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_right_normal_and_texture_coordinate_normalization_y(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set right_normal_and_texture_coordinate_normalization_y(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepolylinegeometry_right_normal_and_texture_coordinate_normalization_y(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get batch_ids() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_batch_ids(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | null} [arg0]
     */
    set batch_ids(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_batch_ids(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableUintAttribute | undefined}
     */
    get batch_index() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_batch_index(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableUintAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableUintAttribute | null} [arg0]
     */
    set batch_index(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableUintAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolylinegeometry_batch_index(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number}
     */
    get indices() {
        const ret = wasm.__wbg_get_transferablepolylinegeometry_indices(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set indices(arg0) {
        wasm.__wbg_set_transferablepolylinegeometry_indices(this.__wbg_ptr, arg0);
    }
    /**
     * @param {TransferableFloatAttribute} position
     * @param {TransferableFloatAttribute | null | undefined} position_high
     * @param {TransferableFloatAttribute | null | undefined} position_low
     * @param {TransferableFloatAttribute} start
     * @param {TransferableFloatAttribute | null | undefined} start_high
     * @param {TransferableFloatAttribute | null | undefined} start_low
     * @param {TransferableFloatAttribute} forward_offset
     * @param {TransferableFloatAttribute | null | undefined} end_high
     * @param {TransferableFloatAttribute | null | undefined} end_low
     * @param {TransferableFloatAttribute} start_normals
     * @param {TransferableFloatAttribute} end_normal_and_texture_coordinate_normalization_x
     * @param {TransferableFloatAttribute} right_normal_and_texture_coordinate_normalization_y
     * @param {TransferableFloatAttribute | null | undefined} batch_ids
     * @param {TransferableUintAttribute | null | undefined} batch_index
     * @param {number} indices
     */
    constructor(position, position_high, position_low, start, start_high, start_low, forward_offset, end_high, end_low, start_normals, end_normal_and_texture_coordinate_normalization_x, right_normal_and_texture_coordinate_normalization_y, batch_ids, batch_index, indices) {
        _assertClass(position, TransferableFloatAttribute);
        var ptr0 = position.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(position_high)) {
            _assertClass(position_high, TransferableFloatAttribute);
            ptr1 = position_high.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(position_low)) {
            _assertClass(position_low, TransferableFloatAttribute);
            ptr2 = position_low.__destroy_into_raw();
        }
        _assertClass(start, TransferableFloatAttribute);
        var ptr3 = start.__destroy_into_raw();
        let ptr4 = 0;
        if (!isLikeNone(start_high)) {
            _assertClass(start_high, TransferableFloatAttribute);
            ptr4 = start_high.__destroy_into_raw();
        }
        let ptr5 = 0;
        if (!isLikeNone(start_low)) {
            _assertClass(start_low, TransferableFloatAttribute);
            ptr5 = start_low.__destroy_into_raw();
        }
        _assertClass(forward_offset, TransferableFloatAttribute);
        var ptr6 = forward_offset.__destroy_into_raw();
        let ptr7 = 0;
        if (!isLikeNone(end_high)) {
            _assertClass(end_high, TransferableFloatAttribute);
            ptr7 = end_high.__destroy_into_raw();
        }
        let ptr8 = 0;
        if (!isLikeNone(end_low)) {
            _assertClass(end_low, TransferableFloatAttribute);
            ptr8 = end_low.__destroy_into_raw();
        }
        _assertClass(start_normals, TransferableFloatAttribute);
        var ptr9 = start_normals.__destroy_into_raw();
        _assertClass(end_normal_and_texture_coordinate_normalization_x, TransferableFloatAttribute);
        var ptr10 = end_normal_and_texture_coordinate_normalization_x.__destroy_into_raw();
        _assertClass(right_normal_and_texture_coordinate_normalization_y, TransferableFloatAttribute);
        var ptr11 = right_normal_and_texture_coordinate_normalization_y.__destroy_into_raw();
        let ptr12 = 0;
        if (!isLikeNone(batch_ids)) {
            _assertClass(batch_ids, TransferableFloatAttribute);
            ptr12 = batch_ids.__destroy_into_raw();
        }
        let ptr13 = 0;
        if (!isLikeNone(batch_index)) {
            _assertClass(batch_index, TransferableUintAttribute);
            ptr13 = batch_index.__destroy_into_raw();
        }
        const ret = wasm.transferablepolylinegeometry_new(ptr0, ptr1, ptr2, ptr3, ptr4, ptr5, ptr6, ptr7, ptr8, ptr9, ptr10, ptr11, ptr12, ptr13, indices);
        this.__wbg_ptr = ret >>> 0;
        TransferablePolylineGeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const TransferableRasterDEMDataFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablerasterdemdata_free(ptr >>> 0, 1));

export class TransferableRasterDEMData {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableRasterDEMDataFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablerasterdemdata_free(ptr, 0);
    }
    /**
     * @returns {ElevationDecoder}
     */
    get decoder() {
        const ret = wasm.__wbg_get_transferablerasterdemdata_decoder(this.__wbg_ptr);
        return ElevationDecoder.__wrap(ret);
    }
    /**
     * @param {ElevationDecoder} arg0
     */
    set decoder(arg0) {
        _assertClass(arg0, ElevationDecoder);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablerasterdemdata_decoder(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {ElevationDecoder} decoder
     */
    constructor(decoder) {
        _assertClass(decoder, ElevationDecoder);
        var ptr0 = decoder.__destroy_into_raw();
        const ret = wasm.transferablerasterdemdata_new(ptr0);
        this.__wbg_ptr = ret >>> 0;
        TransferableRasterDEMDataFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const TransferableTileFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferabletile_free(ptr >>> 0, 1));

export class TransferableTile {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferableTile.prototype);
        obj.__wbg_ptr = ptr;
        TransferableTileFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableTileFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferabletile_free(ptr, 0);
    }
    /**
     * @returns {TileXYZ}
     */
    get coords() {
        const ret = wasm.__wbg_get_transferabletile_coords(this.__wbg_ptr);
        return TileXYZ.__wrap(ret);
    }
    /**
     * @param {TileXYZ} arg0
     */
    set coords(arg0) {
        _assertClass(arg0, TileXYZ);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferabletile_coords(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number}
     */
    get max_height() {
        const ret = wasm.__wbg_get_transferabletile_max_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set max_height(arg0) {
        wasm.__wbg_set_transferabletile_max_height(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get min_height() {
        const ret = wasm.__wbg_get_transferabletile_min_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set min_height(arg0) {
        wasm.__wbg_set_transferabletile_min_height(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {CachedMeshHandle | undefined}
     */
    get cached_mesh_handle() {
        const ret = wasm.__wbg_get_transferabletile_cached_mesh_handle(this.__wbg_ptr);
        return ret === 0 ? undefined : CachedMeshHandle.__wrap(ret);
    }
    /**
     * @param {CachedMeshHandle | null} [arg0]
     */
    set cached_mesh_handle(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, CachedMeshHandle);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferabletile_cached_mesh_handle(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TileXYZ} coords
     * @param {number} max_height
     * @param {number} min_height
     * @param {CachedMeshHandle | null} [cached_mesh_handle]
     */
    constructor(coords, max_height, min_height, cached_mesh_handle) {
        _assertClass(coords, TileXYZ);
        var ptr0 = coords.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(cached_mesh_handle)) {
            _assertClass(cached_mesh_handle, CachedMeshHandle);
            ptr1 = cached_mesh_handle.__destroy_into_raw();
        }
        const ret = wasm.transferabletile_new(ptr0, max_height, min_height, ptr1);
        this.__wbg_ptr = ret >>> 0;
        TransferableTileFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const TransferableUintAttributeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferableuintattribute_free(ptr >>> 0, 1));

export class TransferableUintAttribute {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferableUintAttribute.prototype);
        obj.__wbg_ptr = ptr;
        TransferableUintAttributeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableUintAttributeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferableuintattribute_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get data() {
        const ret = wasm.__wbg_get_transferablefloatattribute_data(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set data(arg0) {
        wasm.__wbg_set_transferablefloatattribute_data(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get size() {
        const ret = wasm.__wbg_get_transferablefloatattribute_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set size(arg0) {
        wasm.__wbg_set_transferablefloatattribute_size(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} data
     * @param {number} size
     */
    constructor(data, size) {
        const ret = wasm.transferableuintattribute_new(data, size);
        this.__wbg_ptr = ret >>> 0;
        TransferableUintAttributeFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const TransformFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transform_free(ptr >>> 0, 1));

export class Transform {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Transform.prototype);
        obj.__wbg_ptr = ptr;
        TransformFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
        const ret = wasm.uintattribute_new(ptr0, len0, size);
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
        const ret = wasm.upsamplableterraingeometry_new(ptr0, len0, ptr1, len1, ptr2, len2);
        this.__wbg_ptr = ret >>> 0;
        UpsamplableTerrainGeometryFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const UpsampleTerrainMeshParametersFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_upsampleterrainmeshparameters_free(ptr >>> 0, 1));

export class UpsampleTerrainMeshParameters {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(UpsampleTerrainMeshParameters.prototype);
        obj.__wbg_ptr = ptr;
        UpsampleTerrainMeshParametersFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UpsampleTerrainMeshParametersFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_upsampleterrainmeshparameters_free(ptr, 0);
    }
    /**
     * @returns {bigint}
     */
    get tile_handle() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_tile_handle(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set tile_handle(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_tile_handle(this.__wbg_ptr, arg0);
    }
    /**
     * Whether to render skirts along tile boundaries.
     * @returns {boolean}
     */
    get skirt() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_skirt(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Whether to render skirts along tile boundaries.
     * @param {boolean} arg0
     */
    set skirt(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_skirt(this.__wbg_ptr, arg0);
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * @returns {number}
     */
    get skirtExaggeration() {
        const ret = wasm.__wbg_get_upsampleterrainmeshparameters_skirtExaggeration(this.__wbg_ptr);
        return ret;
    }
    /**
     * Multiplier for the automatically calculated skirt height.
     * @param {number} arg0
     */
    set skirtExaggeration(arg0) {
        wasm.__wbg_set_upsampleterrainmeshparameters_skirtExaggeration(this.__wbg_ptr, arg0);
    }
    /**
     * @param {bigint} tile_handle
     * @param {boolean} skirt
     * @param {number} skirt_exaggeration
     */
    constructor(tile_handle, skirt, skirt_exaggeration) {
        const ret = wasm.upsampleterrainmeshparameters_new(tile_handle, skirt, skirt_exaggeration);
        this.__wbg_ptr = ret >>> 0;
        UpsampleTerrainMeshParametersFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const UpsampleTerrainMeshResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_upsampleterrainmeshresult_free(ptr >>> 0, 1));

export class UpsampleTerrainMeshResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(UpsampleTerrainMeshResult.prototype);
        obj.__wbg_ptr = ptr;
        UpsampleTerrainMeshResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UpsampleTerrainMeshResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_upsampleterrainmeshresult_free(ptr, 0);
    }
    /**
     * @returns {TransferableGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_upsampleterrainmeshresult_geometry(this.__wbg_ptr);
        return TransferableGeometry.__wrap(ret);
    }
    /**
     * @param {TransferableGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferableGeometry);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_upsampleterrainmeshresult_geometry(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number}
     */
    get heights() {
        const ret = wasm.__wbg_get_upsampleterrainmeshresult_heights(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set heights(arg0) {
        wasm.__wbg_set_upsampleterrainmeshresult_heights(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get min_height() {
        const ret = wasm.__wbg_get_upsampleterrainmeshresult_min_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set min_height(arg0) {
        wasm.__wbg_set_upsampleterrainmeshresult_min_height(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get max_height() {
        const ret = wasm.__wbg_get_upsampleterrainmeshresult_max_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set max_height(arg0) {
        wasm.__wbg_set_upsampleterrainmeshresult_max_height(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {Vec3 | undefined}
     */
    get rtc_translation() {
        const ret = wasm.__wbg_get_upsampleterrainmeshresult_rtc_translation(this.__wbg_ptr);
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
        wasm.__wbg_set_upsampleterrainmeshresult_rtc_translation(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferableGeometry} geometry
     * @param {number} heights
     * @param {number} min_height
     * @param {number} max_height
     * @param {Vec3 | null} [rtc_translation]
     */
    constructor(geometry, heights, min_height, max_height, rtc_translation) {
        _assertClass(geometry, TransferableGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(rtc_translation)) {
            _assertClass(rtc_translation, Vec3);
            ptr1 = rtc_translation.__destroy_into_raw();
        }
        const ret = wasm.upsampleterrainmeshresult_new(ptr0, heights, min_height, max_height, ptr1);
        this.__wbg_ptr = ret >>> 0;
        UpsampleTerrainMeshResultFinalization.register(this, this.__wbg_ptr, this);
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
        const ret = wasm.__wbg_get_boundingsphere_center_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_boundingsphere_center_x(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_boundingsphere_center_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_boundingsphere_center_y(this.__wbg_ptr, arg0);
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
        const ret = wasm.__wbg_get_boundingsphere_center_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_boundingsphere_center_x(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_boundingsphere_center_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_boundingsphere_center_y(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get z() {
        const ret = wasm.__wbg_get_boundingsphere_center_z(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set z(arg0) {
        wasm.__wbg_set_boundingsphere_center_z(this.__wbg_ptr, arg0);
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

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VectorTileMaterial.prototype);
        obj.__wbg_ptr = ptr;
        VectorTileMaterialFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

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
        const ret = wasm.__wbg_get_vectortilematerial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_vectortilematerial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get castShadow() {
        const ret = wasm.__wbg_get_vectortilematerial_castShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set castShadow(arg0) {
        wasm.__wbg_set_vectortilematerial_castShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get receiveShadow() {
        const ret = wasm.__wbg_get_vectortilematerial_receiveShadow(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | null} [arg0]
     */
    set receiveShadow(arg0) {
        wasm.__wbg_set_vectortilematerial_receiveShadow(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
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

const VectorTileStateFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vectortilestate_free(ptr >>> 0, 1));

export class VectorTileState {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VectorTileState.prototype);
        obj.__wbg_ptr = ptr;
        VectorTileStateFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VectorTileStateFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vectortilestate_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get layer_id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_vectortilestate_layer_id(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set layer_id(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_vectortilestate_layer_id(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {bigint | undefined}
     */
    get ready_parent_tile_handle() {
        const ret = wasm.__wbg_get_vectortilestate_ready_parent_tile_handle(this.__wbg_ptr);
        return ret[0] === 0 ? undefined : BigInt.asUintN(64, ret[1]);
    }
    /**
     * @param {bigint | null} [arg0]
     */
    set ready_parent_tile_handle(arg0) {
        wasm.__wbg_set_vectortilestate_ready_parent_tile_handle(this.__wbg_ptr, !isLikeNone(arg0), isLikeNone(arg0) ? BigInt(0) : arg0);
    }
    /**
     * @returns {boolean}
     */
    get is_rendered() {
        const ret = wasm.__wbg_get_constructpolylinebatchedfeatureparameters_flat(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set is_rendered(arg0) {
        wasm.__wbg_set_constructpolylinebatchedfeatureparameters_flat(this.__wbg_ptr, arg0);
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
        const ret = wasm.__wbg_get_camerafrustum_near(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set width(arg0) {
        wasm.__wbg_set_camerafrustum_near(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get height() {
        const ret = wasm.__wbg_get_camerafrustum_far(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set height(arg0) {
        wasm.__wbg_set_camerafrustum_far(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get pixelRatio() {
        const ret = wasm.__wbg_get_camerafrustum_fov(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set pixelRatio(arg0) {
        wasm.__wbg_set_camerafrustum_fov(this.__wbg_ptr, arg0);
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

const WorkerTaskDelegatedEventFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_workertaskdelegatedevent_free(ptr >>> 0, 1));

export class WorkerTaskDelegatedEvent {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WorkerTaskDelegatedEvent.prototype);
        obj.__wbg_ptr = ptr;
        WorkerTaskDelegatedEventFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof WorkerTaskDelegatedEvent)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WorkerTaskDelegatedEventFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_workertaskdelegatedevent_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get ind() {
        const ret = wasm.__wbg_get_workertaskdelegatedevent_ind(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_workertaskdelegatedevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get gen() {
        const ret = wasm.__wbg_get_workertaskdelegatedevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set gen(arg0) {
        wasm.__wbg_set_workertaskdelegatedevent_gen(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {bigint}
     */
    get bits() {
        const ret = wasm.__wbg_get_workertaskdelegatedevent_bits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set bits(arg0) {
        wasm.__wbg_set_workertaskdelegatedevent_bits(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {DelegatedWorkerTasksParameters}
     */
    get task() {
        const ret = wasm.__wbg_get_workertaskdelegatedevent_task(this.__wbg_ptr);
        return DelegatedWorkerTasksParameters.__wrap(ret);
    }
    /**
     * @param {DelegatedWorkerTasksParameters} arg0
     */
    set task(arg0) {
        _assertClass(arg0, DelegatedWorkerTasksParameters);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_workertaskdelegatedevent_task(this.__wbg_ptr, ptr0);
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
    imports.wbg.__wbg_Error_90f14b053b2af32f = function(arg0, arg1) {
        const ret = Error(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_Number_d61e9549dcb95df6 = function(arg0) {
        const ret = Number(arg0);
        return ret;
    };
    imports.wbg.__wbg_call_0ba5f27818746ea4 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.call(arg1, arg2, arg3, arg4);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_52af042a326d9b3a = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.call(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_53657fec28b4db96 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.call(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_90bf4b9978d51034 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_crypto_574e78ad8b13b65f = function(arg0) {
        const ret = arg0.crypto;
        return ret;
    };
    imports.wbg.__wbg_datarequesterremovedevent_new = function(arg0) {
        const ret = DataRequesterRemovedEvent.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_datarequesterremovedevent_unwrap = function(arg0) {
        const ret = DataRequesterRemovedEvent.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_datarequestevent_new = function(arg0) {
        const ret = DataRequestEvent.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_datarequestevent_unwrap = function(arg0) {
        const ret = DataRequestEvent.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_done_73bb10bcf6e0c339 = function(arg0) {
        const ret = arg0.done;
        return ret;
    };
    imports.wbg.__wbg_entityevent_new = function(arg0) {
        const ret = EntityEvent.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_entityevent_unwrap = function(arg0) {
        const ret = EntityEvent.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_entries_4f3de4ccde51d587 = function(arg0) {
        const ret = Object.entries(arg0);
        return ret;
    };
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
    imports.wbg.__wbg_getRandomValues_1c61fac11405ffdc = function() { return handleError(function (arg0, arg1) {
        globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_b8f5dbd5f3995a9e = function() { return handleError(function (arg0, arg1) {
        arg0.getRandomValues(arg1);
    }, arguments) };
    imports.wbg.__wbg_get_6e64f6b3af0c61a2 = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_get_bb21663672334172 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
        const ret = arg0[arg1];
        return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_625e762023eb35cf = function(arg0) {
        let result;
        try {
            result = arg0 instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_6935b7b95ef40080 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_isArray_fe31d4a8d77ae781 = function(arg0) {
        const ret = Array.isArray(arg0);
        return ret;
    };
    imports.wbg.__wbg_isSafeInteger_342db8cae87edb4e = function(arg0) {
        const ret = Number.isSafeInteger(arg0);
        return ret;
    };
    imports.wbg.__wbg_iterator_fe047a6b04943f88 = function() {
        const ret = Symbol.iterator;
        return ret;
    };
    imports.wbg.__wbg_length_09646ad20ebb8534 = function(arg0) {
        const ret = arg0.length;
        return ret;
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
    imports.wbg.__wbg_log_e8edbae88eece6db = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_meshadded_new = function(arg0) {
        const ret = MeshAdded.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_meshadded_unwrap = function(arg0) {
        const ret = MeshAdded.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_meshchanged_new = function(arg0) {
        const ret = MeshChanged.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_meshchanged_unwrap = function(arg0) {
        const ret = MeshChanged.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_msCrypto_a61aeb35a24c1329 = function(arg0) {
        const ret = arg0.msCrypto;
        return ret;
    };
    imports.wbg.__wbg_new_150ca8a92d65de92 = function(arg0) {
        const ret = new Float64Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_new_1b925e0c0e1d30ba = function() {
        const ret = new Object();
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
    imports.wbg.__wbg_new_d8a154d0939e6bb4 = function() {
        const ret = new Array();
        return ret;
    };
    imports.wbg.__wbg_new_e3b71d7fa00cd4a9 = function(arg0) {
        const ret = new Float32Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_newnoargs_863941679b1933bb = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_newwithlength_79dd8226b146df94 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_next_59846e169128a0ea = function(arg0) {
        const ret = arg0.next;
        return ret;
    };
    imports.wbg.__wbg_next_c782e76a0400870a = function() { return handleError(function (arg0) {
        const ret = arg0.next();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_node_905d3e251edff8a2 = function(arg0) {
        const ret = arg0.node;
        return ret;
    };
    imports.wbg.__wbg_objecttransformevent_new = function(arg0) {
        const ret = ObjectTransformEvent.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_objecttransformevent_unwrap = function(arg0) {
        const ret = ObjectTransformEvent.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_process_dc0fbacc7c1c06f7 = function(arg0) {
        const ret = arg0.process;
        return ret;
    };
    imports.wbg.__wbg_prototypesetcall_a81ac58a5b6e988c = function(arg0, arg1, arg2) {
        Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
    };
    imports.wbg.__wbg_push_a625ffb414ba40f2 = function(arg0, arg1) {
        const ret = arg0.push(arg1);
        return ret;
    };
    imports.wbg.__wbg_randomFillSync_ac0988aba3254290 = function() { return handleError(function (arg0, arg1) {
        arg0.randomFillSync(arg1);
    }, arguments) };
    imports.wbg.__wbg_renderablefeatureaddedevent_new = function(arg0) {
        const ret = RenderableFeatureAddedEvent.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_renderablefeatureaddedevent_unwrap = function(arg0) {
        const ret = RenderableFeatureAddedEvent.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_renderablefeaturechangedevent_new = function(arg0) {
        const ret = RenderableFeatureChangedEvent.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_renderablefeaturechangedevent_unwrap = function(arg0) {
        const ret = RenderableFeatureChangedEvent.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_renderablefeatureremovedevent_new = function(arg0) {
        const ret = RenderableFeatureRemovedEvent.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_renderablefeatureremovedevent_unwrap = function(arg0) {
        const ret = RenderableFeatureRemovedEvent.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_require_60cc747a6bc5215a = function() { return handleError(function () {
        const ret = module.require;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_121d1cf09325841e = function(arg0, arg1, arg2) {
        arg0.set(getArrayF32FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_set_57c4e2f8700b6eac = function(arg0, arg1, arg2) {
        arg0.set(getArrayF64FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_set_c0069f6bbe6b852b = function(arg0, arg1, arg2) {
        arg0.set(getArrayU32FromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_set_d66063c1f1a1157e = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        return ret;
    }, arguments) };
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
    imports.wbg.__wbg_static_accessor_GLOBAL_656a564fb01c5b63 = function() {
        const ret = typeof global === 'undefined' ? null : global;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_THIS_09a6cc4b9571ef65 = function() {
        const ret = typeof globalThis === 'undefined' ? null : globalThis;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_SELF_36742aea97854d74 = function() {
        const ret = typeof self === 'undefined' ? null : self;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_WINDOW_0ce0d90b0830e7e6 = function() {
        const ret = typeof window === 'undefined' ? null : window;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_stringify_61d42b7d144137e4 = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_07c7c2b284d2102d = function(arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_terrainheightupdatedevent_new = function(arg0) {
        const ret = TerrainHeightUpdatedEvent.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_terrainheightupdatedevent_unwrap = function(arg0) {
        const ret = TerrainHeightUpdatedEvent.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_texturefragment_new = function(arg0) {
        const ret = TextureFragment.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_texturefragmentrequestedevent_new = function(arg0) {
        const ret = TextureFragmentRequestedEvent.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_texturefragmentrequestedevent_unwrap = function(arg0) {
        const ret = TextureFragmentRequestedEvent.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_value_4ae21701b6f5c482 = function(arg0) {
        const ret = arg0.value;
        return ret;
    };
    imports.wbg.__wbg_vectortilestate_new = function(arg0) {
        const ret = VectorTileState.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_versions_c01dfd4722a88165 = function(arg0) {
        const ret = arg0.versions;
        return ret;
    };
    imports.wbg.__wbg_wbindgenbigintgetasi64_d3d568a64e846827 = function(arg0, arg1) {
        const v = arg1;
        const ret = typeof(v) === 'bigint' ? v : undefined;
        getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbg_wbindgenbooleanget_527bfac1bf7c06df = function(arg0) {
        const v = arg0;
        const ret = typeof(v) === 'boolean' ? v : undefined;
        return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
    };
    imports.wbg.__wbg_wbindgendebugstring_0c28a61befa1f3ce = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_wbindgenin_ed944d66e9a43ef2 = function(arg0, arg1) {
        const ret = arg0 in arg1;
        return ret;
    };
    imports.wbg.__wbg_wbindgenisbigint_1a3fbe7ad37b3968 = function(arg0) {
        const ret = typeof(arg0) === 'bigint';
        return ret;
    };
    imports.wbg.__wbg_wbindgenisfunction_27a5c72d80bbdf07 = function(arg0) {
        const ret = typeof(arg0) === 'function';
        return ret;
    };
    imports.wbg.__wbg_wbindgenisnull_060b7d23e7f07622 = function(arg0) {
        const ret = arg0 === null;
        return ret;
    };
    imports.wbg.__wbg_wbindgenisobject_bdb9aa7f2dd707ef = function(arg0) {
        const val = arg0;
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_wbindgenisstring_55b63daa584dc807 = function(arg0) {
        const ret = typeof(arg0) === 'string';
        return ret;
    };
    imports.wbg.__wbg_wbindgenisundefined_2e902cd900cf5927 = function(arg0) {
        const ret = arg0 === undefined;
        return ret;
    };
    imports.wbg.__wbg_wbindgenjsvaleq_af67af1ed6574f4f = function(arg0, arg1) {
        const ret = arg0 === arg1;
        return ret;
    };
    imports.wbg.__wbg_wbindgenjsvallooseeq_4f1ced8136023b79 = function(arg0, arg1) {
        const ret = arg0 == arg1;
        return ret;
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
    imports.wbg.__wbg_workertaskdelegatedevent_new = function(arg0) {
        const ret = WorkerTaskDelegatedEvent.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_workertaskdelegatedevent_unwrap = function(arg0) {
        const ret = WorkerTaskDelegatedEvent.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(arg0, arg1) {
        // Cast intrinsic for `Ref(String) -> Externref`.
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_cast_4625c577ab2ec9ee = function(arg0) {
        // Cast intrinsic for `U64 -> Externref`.
        const ret = BigInt.asUintN(64, arg0);
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
    imports.wbg.__wbindgen_cast_cd07b1914aa3d62c = function(arg0, arg1) {
        // Cast intrinsic for `Ref(Slice(F32)) -> NamedExternref("Float32Array")`.
        const ret = getArrayF32FromWasm0(arg0, arg1);
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
        module_or_path = new URL('navara_wasm_bg.wasm', import.meta.url);
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
