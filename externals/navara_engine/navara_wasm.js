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

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
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

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

export function start() {
    wasm.start();
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
    const mem = getDataViewMemory0();
    for (let i = 0; i < array.length; i++) {
        mem.setUint32(ptr + 4 * i, addToExternrefTable0(array[i]), true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
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
 * @enum {0 | 1 | 2}
 */
export const TextureFragmentStatus = Object.freeze({
    Success: 0, "0": "Success",
    Fail: 1, "1": "Fail",
    Pending: 2, "2": "Pending",
});

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
     * @param {string | undefined} [arg0]
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
     * @param {string | undefined} [arg0]
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
     * @param {ModelMaterial | undefined} [arg0]
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
     * @param {boolean | undefined} [arg0]
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
     * @param {number | undefined} [arg0]
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
     * @param {number | undefined} [arg0]
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
     * @param {Vec2 | undefined} [arg0]
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
     * @param {number | undefined} [arg0]
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
     * @param {string | undefined} [arg0]
     */
    set url(arg0) {
        var ptr0 = isLikeNone(arg0) ? 0 : passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_billboardmaterial_url(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get scale_by_distance() {
        const ret = wasm.__wbg_get_billboardmaterial_scale_by_distance(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set scale_by_distance(arg0) {
        wasm.__wbg_set_billboardmaterial_scale_by_distance(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get clamp_to_ground() {
        const ret = wasm.__wbg_get_billboardmaterial_clamp_to_ground(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set clamp_to_ground(arg0) {
        wasm.__wbg_set_billboardmaterial_clamp_to_ground(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get depth_test() {
        const ret = wasm.__wbg_get_billboardmaterial_depth_test(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set depth_test(arg0) {
        wasm.__wbg_set_billboardmaterial_depth_test(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
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
     * @returns {TransferableSingleGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_billboardmesh_geometry(this.__wbg_ptr);
        return TransferableSingleGeometry.__wrap(ret);
    }
    /**
     * @param {TransferableSingleGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferableSingleGeometry);
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
     * @param {number | undefined} [arg0]
     */
    set heights(arg0) {
        wasm.__wbg_set_cachedmeshhandle_heights(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @param {number} vertices
     * @param {number} indices
     * @param {number} uvs
     * @param {number | undefined} [heights]
     */
    constructor(vertices, indices, uvs, heights) {
        const ret = wasm.cachedmeshhandle_new(vertices, indices, uvs, isLikeNone(heights) ? 0x100000001 : (heights) >> 0);
        this.__wbg_ptr = ret >>> 0;
        CachedMeshHandleFinalization.register(this, this.__wbg_ptr, this);
        return this;
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
     * @param {string | undefined} [arg0]
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
     * @param {string | undefined} [arg0]
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
     * @param {ModelMaterial | undefined} [arg0]
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
     * @returns {ExtentRadianF32}
     */
    get extent() {
        const ret = wasm.__wbg_get_constructpolygonbatchedfeatureresult_extent(this.__wbg_ptr);
        return ExtentRadianF32.__wrap(ret);
    }
    /**
     * @param {ExtentRadianF32} arg0
     */
    set extent(arg0) {
        _assertClass(arg0, ExtentRadianF32);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructpolygonbatchedfeatureresult_extent(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferablePolygonGeometry} geometry
     * @param {ExtentRadianF32} extent
     */
    constructor(geometry, extent) {
        _assertClass(geometry, TransferablePolygonGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        _assertClass(extent, ExtentRadianF32);
        var ptr1 = extent.__destroy_into_raw();
        const ret = wasm.constructpolygonbatchedfeatureresult_new(ptr0, ptr1);
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
     * @returns {ExtentRadianF32}
     */
    get extent() {
        const ret = wasm.__wbg_get_constructpolylinebatchedfeatureresult_extent(this.__wbg_ptr);
        return ExtentRadianF32.__wrap(ret);
    }
    /**
     * @param {ExtentRadianF32} arg0
     */
    set extent(arg0) {
        _assertClass(arg0, ExtentRadianF32);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructpolylinebatchedfeatureresult_extent(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {TransferablePolylineGeometry} geometry
     * @param {ExtentRadianF32} extent
     */
    constructor(geometry, extent) {
        _assertClass(geometry, TransferablePolylineGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        _assertClass(extent, ExtentRadianF32);
        var ptr1 = extent.__destroy_into_raw();
        const ret = wasm.constructpolylinebatchedfeatureresult_new(ptr0, ptr1);
        this.__wbg_ptr = ret >>> 0;
        ConstructPolylineBatchedFeatureResultFinalization.register(this, this.__wbg_ptr, this);
        return this;
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
     * @returns {ReconstructableEntity}
     */
    get martini_id() {
        const ret = wasm.__wbg_get_constructterrainmeshparameters_martini_id(this.__wbg_ptr);
        return ReconstructableEntity.__wrap(ret);
    }
    /**
     * @param {ReconstructableEntity} arg0
     */
    set martini_id(arg0) {
        _assertClass(arg0, ReconstructableEntity);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructterrainmeshparameters_martini_id(this.__wbg_ptr, ptr0);
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
     * @param {TransferableGeometry} geometry
     * @param {number} heights
     * @param {number} min_height
     * @param {number} max_height
     */
    constructor(geometry, heights, min_height, max_height) {
        _assertClass(geometry, TransferableGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        const ret = wasm.constructterrainmeshresult_new(ptr0, heights, min_height, max_height);
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
     * @returns {ExtentRadianF32}
     */
    get extent() {
        const ret = wasm.__wbg_get_constructedpolygongeometry_extent(this.__wbg_ptr);
        return ExtentRadianF32.__wrap(ret);
    }
    /**
     * @param {ExtentRadianF32} arg0
     */
    set extent(arg0) {
        _assertClass(arg0, ExtentRadianF32);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructedpolygongeometry_extent(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Float32Array}
     */
    position() {
        const ret = wasm.constructedpolygongeometry_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    position_size() {
        const ret = wasm.constructedpolygongeometry_position_size(this.__wbg_ptr);
        return ret;
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
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.constructedpolygongeometry_indices(this.__wbg_ptr);
        return ret;
    }
    drop() {
        const ptr = this.__destroy_into_raw();
        wasm.constructedpolygongeometry_drop(ptr);
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
     * @returns {ExtentRadianF32}
     */
    get extent() {
        const ret = wasm.__wbg_get_constructedpolylinegeometry_extent(this.__wbg_ptr);
        return ExtentRadianF32.__wrap(ret);
    }
    /**
     * @param {ExtentRadianF32} arg0
     */
    set extent(arg0) {
        _assertClass(arg0, ExtentRadianF32);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_constructedpolylinegeometry_extent(this.__wbg_ptr, ptr0);
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
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.constructedpolylinegeometry_indices(this.__wbg_ptr);
        return ret;
    }
    drop() {
        const ptr = this.__destroy_into_raw();
        wasm.constructedpolylinegeometry_drop(ptr);
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
     * @returns {string}
     */
    getBatchProp(batch_id) {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.core_getBatchProp(this.__wbg_ptr, batch_id);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
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
     * @param {ConstructTerrainMeshParameters | undefined} [arg0]
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
     * @param {UpsampleTerrainMeshParameters | undefined} [arg0]
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
     * @param {ConstructPolygonBatchedFeatureParameters | undefined} [arg0]
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
     * @param {ConstructPolylineBatchedFeatureParameters | undefined} [arg0]
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
     * @param {ConstructTerrainMeshResult | undefined} [arg0]
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
     * @param {UpsampleTerrainMeshResult | undefined} [arg0]
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
     * @param {ConstructPolygonBatchedFeatureResult | undefined} [arg0]
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
     * @param {ConstructPolylineBatchedFeatureResult | undefined} [arg0]
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
     * @param {ConstructTerrainMeshResult | undefined} [construct_terrain_mesh]
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
     * @param {UpsampleTerrainMeshResult | undefined} [upsample_terrain_mesh]
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
     * @param {ConstructPolygonBatchedFeatureResult | undefined} [construct_polygon_batched_feature]
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
     * @param {ConstructPolylineBatchedFeatureResult | undefined} [construct_polyline_batched_feature]
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
     * @param {Transform | undefined} [arg0]
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
     * @returns {(ObjectTransformEvent)[]}
     */
    get object_transform_updated() {
        const ret = wasm.__wbg_get_events_object_transform_updated(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(ObjectTransformEvent)[]} arg0
     */
    set object_transform_updated(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_object_transform_updated(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(EntityEvent)[]}
     */
    get mesh_removed() {
        const ret = wasm.__wbg_get_events_mesh_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(EntityEvent)[]} arg0
     */
    set mesh_removed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_mesh_removed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(MeshAdded)[]}
     */
    get mesh_added() {
        const ret = wasm.__wbg_get_events_mesh_added(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(MeshAdded)[]} arg0
     */
    set mesh_added(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_mesh_added(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(MeshChanged)[]}
     */
    get mesh_updated() {
        const ret = wasm.__wbg_get_events_mesh_updated(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(MeshChanged)[]} arg0
     */
    set mesh_updated(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_mesh_updated(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(DataRequestEvent)[]}
     */
    get data_requested() {
        const ret = wasm.__wbg_get_events_data_requested(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(DataRequestEvent)[]} arg0
     */
    set data_requested(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_data_requested(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(DataRequesterRemovedEvent)[]}
     */
    get data_requester_removed() {
        const ret = wasm.__wbg_get_events_data_requester_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(DataRequesterRemovedEvent)[]} arg0
     */
    set data_requester_removed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_data_requester_removed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(TextureFragmentRequestedEvent)[]}
     */
    get texture_fragment_requested() {
        const ret = wasm.__wbg_get_events_texture_fragment_requested(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(TextureFragmentRequestedEvent)[]} arg0
     */
    set texture_fragment_requested(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_texture_fragment_requested(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(EntityEvent)[]}
     */
    get texture_fragment_removed() {
        const ret = wasm.__wbg_get_events_texture_fragment_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(EntityEvent)[]} arg0
     */
    set texture_fragment_removed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_texture_fragment_removed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(WorkerTaskDelegatedEvent)[]}
     */
    get worker_task_delegated() {
        const ret = wasm.__wbg_get_events_worker_task_delegated(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(WorkerTaskDelegatedEvent)[]} arg0
     */
    set worker_task_delegated(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_worker_task_delegated(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(EntityEvent)[]}
     */
    get worker_task_removed() {
        const ret = wasm.__wbg_get_events_worker_task_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(EntityEvent)[]} arg0
     */
    set worker_task_removed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_worker_task_removed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(RenderableFeatureAddedEvent)[]}
     */
    get renderable_feature_added() {
        const ret = wasm.__wbg_get_events_renderable_feature_added(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(RenderableFeatureAddedEvent)[]} arg0
     */
    set renderable_feature_added(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_renderable_feature_added(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(RenderableFeatureChangedEvent)[]}
     */
    get renderable_feature_changed() {
        const ret = wasm.__wbg_get_events_renderable_feature_changed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(RenderableFeatureChangedEvent)[]} arg0
     */
    set renderable_feature_changed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_renderable_feature_changed(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {(EntityEvent)[]}
     */
    get renderable_feature_removed() {
        const ret = wasm.__wbg_get_events_renderable_feature_removed(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {(EntityEvent)[]} arg0
     */
    set renderable_feature_removed(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_events_renderable_feature_removed(this.__wbg_ptr, ptr0, len0);
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
     * @param {string | undefined} [arg0]
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
     * @param {string | undefined} [arg0]
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
     * @param {PointMaterial | undefined} [arg0]
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
     * @param {BillboardMaterial | undefined} [arg0]
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
     * @returns {PolylineMaterial | undefined}
     */
    get polyline() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_polyline(this.__wbg_ptr);
        return ret === 0 ? undefined : PolylineMaterial.__wrap(ret);
    }
    /**
     * @param {PolylineMaterial | undefined} [arg0]
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
     * @param {PolygonMaterial | undefined} [arg0]
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
     * @param {ModelMaterial | undefined} [arg0]
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
    drop() {
        const ptr = this.__destroy_into_raw();
        wasm.geometry_drop(ptr);
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
     * @param {string | undefined} [arg0]
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
        const ret = wasm.__wbg_get_entityevent_ind(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set vertices(arg0) {
        wasm.__wbg_set_entityevent_ind(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get uvs() {
        const ret = wasm.__wbg_get_entityevent_gen(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set uvs(arg0) {
        wasm.__wbg_set_entityevent_gen(this.__wbg_ptr, arg0);
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
     * @returns {RasterTileMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_meshadded_material(this.__wbg_ptr);
        return RasterTileMaterial.__wrap(ret);
    }
    /**
     * @param {RasterTileMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, RasterTileMaterial);
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
     * @returns {Mesh}
     */
    get mesh() {
        const ret = wasm.__wbg_get_meshchanged_mesh(this.__wbg_ptr);
        return Mesh.__wrap(ret);
    }
    /**
     * @param {Mesh} arg0
     */
    set mesh(arg0) {
        _assertClass(arg0, Mesh);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshchanged_mesh(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {RasterTileMaterial}
     */
    get material() {
        const ret = wasm.__wbg_get_meshchanged_material(this.__wbg_ptr);
        return RasterTileMaterial.__wrap(ret);
    }
    /**
     * @param {RasterTileMaterial} arg0
     */
    set material(arg0) {
        _assertClass(arg0, RasterTileMaterial);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_meshchanged_material(this.__wbg_ptr, ptr0);
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
     * @param {boolean | undefined} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_modelmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
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
     * @param {string | undefined} [arg0]
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
        const ret = wasm.__wbg_get_billboardmaterial_size(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set size(arg0) {
        wasm.__wbg_set_billboardmaterial_size(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_modelmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_modelmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get max_sse() {
        const ret = wasm.__wbg_get_modelmaterial_max_sse(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set max_sse(arg0) {
        wasm.__wbg_set_modelmaterial_max_sse(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get clamp_to_ground() {
        const ret = wasm.__wbg_get_modelmaterial_clamp_to_ground(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set clamp_to_ground(arg0) {
        wasm.__wbg_set_modelmaterial_clamp_to_ground(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get should_rotate_in_default() {
        const ret = wasm.__wbg_get_modelmaterial_should_rotate_in_default(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set should_rotate_in_default(arg0) {
        wasm.__wbg_set_modelmaterial_should_rotate_in_default(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
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
     * @param {number | undefined} [arg0]
     */
    set bin(arg0) {
        wasm.__wbg_set_modelmesh_bin(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
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
     * @param {string | undefined} [arg0]
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
     * @param {string | undefined} [arg0]
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
     * @param {PointMaterial | undefined} [arg0]
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
     * @param {BillboardMaterial | undefined} [arg0]
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
     * @returns {PolylineMaterial | undefined}
     */
    get polyline() {
        const ret = wasm.__wbg_get_geojsonlayerdescription_polyline(this.__wbg_ptr);
        return ret === 0 ? undefined : PolylineMaterial.__wrap(ret);
    }
    /**
     * @param {PolylineMaterial | undefined} [arg0]
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
     * @param {PolygonMaterial | undefined} [arg0]
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
     * @returns {VectorTileMaterial | undefined}
     */
    get vector_tile() {
        const ret = wasm.__wbg_get_mvtlayerdescription_vector_tile(this.__wbg_ptr);
        return ret === 0 ? undefined : VectorTileMaterial.__wrap(ret);
    }
    /**
     * @param {VectorTileMaterial | undefined} [arg0]
     */
    set vector_tile(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, VectorTileMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_mvtlayerdescription_vector_tile(this.__wbg_ptr, ptr0);
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
        const ret = wasm.__wbg_get_datarequestevent_gen(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set ind(arg0) {
        wasm.__wbg_set_datarequestevent_gen(this.__wbg_ptr, arg0);
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
        const ret = wasm.__wbg_get_modelmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_modelmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get size() {
        const ret = wasm.__wbg_get_billboardmaterial_size(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
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
     * @param {number | undefined} [arg0]
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
     * @param {Vec2 | undefined} [arg0]
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
     * @param {number | undefined} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_billboardmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get scale_by_distance() {
        const ret = wasm.__wbg_get_modelmaterial_clamp_to_ground(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set scale_by_distance(arg0) {
        wasm.__wbg_set_modelmaterial_clamp_to_ground(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get clamp_to_ground() {
        const ret = wasm.__wbg_get_modelmaterial_should_rotate_in_default(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set clamp_to_ground(arg0) {
        wasm.__wbg_set_modelmaterial_should_rotate_in_default(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get depth_test() {
        const ret = wasm.__wbg_get_pointmaterial_depth_test(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set depth_test(arg0) {
        wasm.__wbg_set_pointmaterial_depth_test(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
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
     * @returns {TransferableSingleGeometry}
     */
    get geometry() {
        const ret = wasm.__wbg_get_pointmesh_geometry(this.__wbg_ptr);
        return TransferableSingleGeometry.__wrap(ret);
    }
    /**
     * @param {TransferableSingleGeometry} arg0
     */
    set geometry(arg0) {
        _assertClass(arg0, TransferableSingleGeometry);
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
     * @returns {Float32Array}
     */
    position() {
        const ret = wasm.polygongeometry_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    position_size() {
        const ret = wasm.constructedpolygongeometry_position_size(this.__wbg_ptr);
        return ret;
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
        const ret = wasm.constructedpolygongeometry_normal_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolygongeometry_scale_normal_and_cap_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolygongeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.polygongeometry_indices(this.__wbg_ptr);
        return ret;
    }
    drop() {
        const ptr = this.__destroy_into_raw();
        wasm.polygongeometry_drop(ptr);
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
     * @returns {Float32Array}
     */
    transfer_position() {
        const ret = wasm.polygongeometryattributes_transfer_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    transfer_position_size() {
        const ret = wasm.constructedpolygongeometry_position_size(this.__wbg_ptr);
        return ret;
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
        const ret = wasm.constructedpolygongeometry_normal_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolygongeometry_scale_normal_and_cap_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolygongeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    drop() {
        const ptr = this.__destroy_into_raw();
        wasm.polygongeometryattributes_drop(ptr);
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
     * @returns {Float32Array}
     */
    get min_max_heights() {
        const ret = wasm.__wbg_get_polygoninternalmaterial_min_max_heights(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {Float32Array} arg0
     */
    set min_max_heights(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polygoninternalmaterial_min_max_heights(this.__wbg_ptr, ptr0, len0);
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
        const ret = wasm.__wbg_get_modelmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_modelmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_polygonmaterial_color(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_polygonmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get clamp_to_ground() {
        const ret = wasm.__wbg_get_modelmaterial_clamp_to_ground(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set clamp_to_ground(arg0) {
        wasm.__wbg_set_modelmaterial_clamp_to_ground(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get use_ground_normals() {
        const ret = wasm.__wbg_get_modelmaterial_should_rotate_in_default(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set use_ground_normals(arg0) {
        wasm.__wbg_set_modelmaterial_should_rotate_in_default(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_modelmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_modelmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get extruded_height() {
        const ret = wasm.__wbg_get_modelmaterial_max_sse(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set extruded_height(arg0) {
        wasm.__wbg_set_modelmaterial_max_sse(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get wireframe() {
        const ret = wasm.__wbg_get_pointmaterial_depth_test(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set wireframe(arg0) {
        wasm.__wbg_set_pointmaterial_depth_test(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {PolygonInternalMaterial | undefined}
     */
    get __internal__() {
        const ret = wasm.__wbg_get_polygonmaterial___internal__(this.__wbg_ptr);
        return ret === 0 ? undefined : PolygonInternalMaterial.__wrap(ret);
    }
    /**
     * @param {PolygonInternalMaterial | undefined} [arg0]
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
     * @param {boolean | undefined} [show]
     * @param {number | undefined} [color]
     * @param {boolean | undefined} [clamp_to_ground]
     * @param {boolean | undefined} [use_ground_normals]
     * @param {number | undefined} [height]
     * @param {number | undefined} [extruded_height]
     * @param {boolean | undefined} [wireframe]
     * @param {PolygonInternalMaterial | undefined} [__internal__]
     */
    constructor(show, color, clamp_to_ground, use_ground_normals, height, extruded_height, wireframe, __internal__) {
        let ptr0 = 0;
        if (!isLikeNone(__internal__)) {
            _assertClass(__internal__, PolygonInternalMaterial);
            ptr0 = __internal__.__destroy_into_raw();
        }
        const ret = wasm.polygonmaterial_new(isLikeNone(show) ? 0xFFFFFF : show ? 1 : 0, isLikeNone(color) ? 0x100000001 : (color) >>> 0, isLikeNone(clamp_to_ground) ? 0xFFFFFF : clamp_to_ground ? 1 : 0, isLikeNone(use_ground_normals) ? 0xFFFFFF : use_ground_normals ? 1 : 0, isLikeNone(height) ? 0x100000001 : Math.fround(height), isLikeNone(extruded_height) ? 0x100000001 : Math.fround(extruded_height), isLikeNone(wireframe) ? 0xFFFFFF : wireframe ? 1 : 0, ptr0);
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
        const ret = wasm.constructedpolylinegeometry_position_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_start_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_forward_offset_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_start_normals_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_end_normal_and_texture_coordinate_normalization_x_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_right_normal_and_texture_coordinate_normalization_y_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    /**
     * @returns {Uint32Array}
     */
    indices() {
        const ret = wasm.polylinegeometry_indices(this.__wbg_ptr);
        return ret;
    }
    drop() {
        const ptr = this.__destroy_into_raw();
        wasm.polylinegeometry_drop(ptr);
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
        const ret = wasm.constructedpolylinegeometry_position_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_start_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_forward_offset_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_start_normals_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_end_normal_and_texture_coordinate_normalization_x_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_right_normal_and_texture_coordinate_normalization_y_size(this.__wbg_ptr);
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
        const ret = wasm.constructedpolylinegeometry_batch_id_size(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret;
    }
    drop() {
        const ptr = this.__destroy_into_raw();
        wasm.polylinegeometryattributes_drop(ptr);
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
     * @returns {Float32Array}
     */
    get min_max_heights() {
        const ret = wasm.__wbg_get_polylineinternalmaterial_min_max_heights(this.__wbg_ptr);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {Float32Array} arg0
     */
    set min_max_heights(arg0) {
        const ptr0 = passArrayF32ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_polygoninternalmaterial_min_max_heights(this.__wbg_ptr, ptr0, len0);
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
        const ret = wasm.__wbg_get_modelmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_modelmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_polygonmaterial_color(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_polygonmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get width() {
        const ret = wasm.__wbg_get_modelmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set width(arg0) {
        wasm.__wbg_set_modelmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get clamp_to_ground() {
        const ret = wasm.__wbg_get_modelmaterial_clamp_to_ground(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set clamp_to_ground(arg0) {
        wasm.__wbg_set_modelmaterial_clamp_to_ground(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get use_ground_normals() {
        const ret = wasm.__wbg_get_modelmaterial_should_rotate_in_default(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set use_ground_normals(arg0) {
        wasm.__wbg_set_modelmaterial_should_rotate_in_default(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get height() {
        const ret = wasm.__wbg_get_modelmaterial_max_sse(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set height(arg0) {
        wasm.__wbg_set_modelmaterial_max_sse(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {PolylineInternalMaterial | undefined}
     */
    get __internal__() {
        const ret = wasm.__wbg_get_polygonmaterial___internal__(this.__wbg_ptr);
        return ret === 0 ? undefined : PolylineInternalMaterial.__wrap(ret);
    }
    /**
     * @param {PolylineInternalMaterial | undefined} [arg0]
     */
    set __internal__(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, PolylineInternalMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_polygonmaterial___internal__(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {boolean | undefined} [show]
     * @param {number | undefined} [color]
     * @param {boolean | undefined} [clamp_to_ground]
     * @param {boolean | undefined} [use_ground_normals]
     * @param {number | undefined} [height]
     * @param {number | undefined} [width]
     * @param {PolylineInternalMaterial | undefined} [__internal__]
     */
    constructor(show, color, clamp_to_ground, use_ground_normals, height, width, __internal__) {
        let ptr0 = 0;
        if (!isLikeNone(__internal__)) {
            _assertClass(__internal__, PolylineInternalMaterial);
            ptr0 = __internal__.__destroy_into_raw();
        }
        const ret = wasm.polylinematerial_new(isLikeNone(show) ? 0xFFFFFF : show ? 1 : 0, isLikeNone(color) ? 0x100000001 : (color) >>> 0, isLikeNone(clamp_to_ground) ? 0xFFFFFF : clamp_to_ground ? 1 : 0, isLikeNone(use_ground_normals) ? 0xFFFFFF : use_ground_normals ? 1 : 0, isLikeNone(height) ? 0x100000001 : Math.fround(height), isLikeNone(width) ? 0x100000001 : Math.fround(width), ptr0);
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
        const ret = wasm.__wbg_get_rasterterrainmaterial_show(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get segments() {
        const ret = wasm.__wbg_get_polygonmaterial_color(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set segments(arg0) {
        wasm.__wbg_set_polygonmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get max_zoom() {
        const ret = wasm.__wbg_get_billboardmaterial_color(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set max_zoom(arg0) {
        wasm.__wbg_set_billboardmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get min_zoom() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_min_zoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set min_zoom(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_min_zoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get wireframe() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_wireframe(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set wireframe(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_wireframe(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {ElevationDecoder | undefined}
     */
    get elevation_decoder() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_elevation_decoder(this.__wbg_ptr);
        return ret === 0 ? undefined : ElevationDecoder.__wrap(ret);
    }
    /**
     * @param {ElevationDecoder | undefined} [arg0]
     */
    set elevation_decoder(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ElevationDecoder);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_rasterterrainmaterial_elevation_decoder(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {number | undefined}
     */
    get tile_size() {
        const ret = wasm.__wbg_get_rasterterrainmaterial_tile_size(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set tile_size(arg0) {
        wasm.__wbg_set_rasterterrainmaterial_tile_size(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
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
     * @returns {TextureFragment | undefined}
     */
    get texture_fragment() {
        const ret = wasm.__wbg_get_rastertileinternalmaterial_texture_fragment(this.__wbg_ptr);
        return ret === 0 ? undefined : TextureFragment.__wrap(ret);
    }
    /**
     * @param {TextureFragment | undefined} [arg0]
     */
    set texture_fragment(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TextureFragment);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_rastertileinternalmaterial_texture_fragment(this.__wbg_ptr, ptr0);
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
     * @param {boolean | undefined} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_rastertilematerial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get segments() {
        const ret = wasm.__wbg_get_polygonmaterial_color(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set segments(arg0) {
        wasm.__wbg_set_polygonmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get color() {
        const ret = wasm.__wbg_get_billboardmaterial_color(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set color(arg0) {
        wasm.__wbg_set_billboardmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get opacity() {
        const ret = wasm.__wbg_get_modelmaterial_max_sse(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set opacity(arg0) {
        wasm.__wbg_set_modelmaterial_max_sse(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {number | undefined}
     */
    get max_zoom() {
        const ret = wasm.__wbg_get_rastertilematerial_max_zoom(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set max_zoom(arg0) {
        wasm.__wbg_set_rastertilematerial_max_zoom(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get max_sse() {
        const ret = wasm.__wbg_get_rastertilematerial_max_sse(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set max_sse(arg0) {
        wasm.__wbg_set_rastertilematerial_max_sse(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
    }
    /**
     * @returns {boolean | undefined}
     */
    get wireframe() {
        const ret = wasm.__wbg_get_rastertilematerial_wireframe(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set wireframe(arg0) {
        wasm.__wbg_set_rastertilematerial_wireframe(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {boolean | undefined}
     */
    get should_compute_normal_from_vertex() {
        const ret = wasm.__wbg_get_rastertilematerial_should_compute_normal_from_vertex(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * @param {boolean | undefined} [arg0]
     */
    set should_compute_normal_from_vertex(arg0) {
        wasm.__wbg_set_rastertilematerial_should_compute_normal_from_vertex(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {RasterTileInternalMaterial | undefined}
     */
    get __internal__() {
        const ret = wasm.__wbg_get_rastertilematerial___internal__(this.__wbg_ptr);
        return ret === 0 ? undefined : RasterTileInternalMaterial.__wrap(ret);
    }
    /**
     * @param {RasterTileInternalMaterial | undefined} [arg0]
     */
    set __internal__(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, RasterTileInternalMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_rastertilematerial___internal__(this.__wbg_ptr, ptr0);
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
        const ret = wasm.__wbg_get_reconstructableentity_0(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * @param {bigint} arg0
     */
    set 0(arg0) {
        wasm.__wbg_set_reconstructableentity_0(this.__wbg_ptr, arg0);
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
     * @param {PointMesh | undefined} [arg0]
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
     * @param {BillboardMesh | undefined} [arg0]
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
     * @returns {PolylineMesh | undefined}
     */
    get polyline() {
        const ret = wasm.__wbg_get_renderablefeature_polyline(this.__wbg_ptr);
        return ret === 0 ? undefined : PolylineMesh.__wrap(ret);
    }
    /**
     * @param {PolylineMesh | undefined} [arg0]
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
     * @param {PolygonMesh | undefined} [arg0]
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
     * @param {ModelMesh | undefined} [arg0]
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
     * @param {Geometry} geometry
     * @param {number} max_height
     * @param {number} min_height
     * @param {Float32Array} heights
     */
    constructor(geometry, max_height, min_height, heights) {
        _assertClass(geometry, Geometry);
        var ptr0 = geometry.__destroy_into_raw();
        const ptr1 = passArrayF32ToWasm0(heights, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.returnedconstructedterrainmesh_new(ptr0, max_height, min_height, ptr1, len1);
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
    drop() {
        const ptr = this.__destroy_into_raw();
        wasm.returnedconstructedterrainmesh_drop(ptr);
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
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.returnedtransferablepolygonbatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
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
     * @returns {Float32Array}
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
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.returnedtransferablepolylinebatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
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
    get raster_terrain() {
        const ret = wasm.__wbg_get_terrainlayerdescription_raster_terrain(this.__wbg_ptr);
        return ret === 0 ? undefined : RasterTerrainMaterial.__wrap(ret);
    }
    /**
     * @param {RasterTerrainMaterial | undefined} [arg0]
     */
    set raster_terrain(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, RasterTerrainMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_terrainlayerdescription_raster_terrain(this.__wbg_ptr, ptr0);
    }
    /**
     * Compute normals from vertices if the model doesn't have a normal.
     * @returns {boolean | undefined}
     */
    get should_compute_normal_from_vertex() {
        const ret = wasm.__wbg_get_terrainlayerdescription_should_compute_normal_from_vertex(this.__wbg_ptr);
        return ret === 0xFFFFFF ? undefined : ret !== 0;
    }
    /**
     * Compute normals from vertices if the model doesn't have a normal.
     * @param {boolean | undefined} [arg0]
     */
    set should_compute_normal_from_vertex(arg0) {
        wasm.__wbg_set_terrainlayerdescription_should_compute_normal_from_vertex(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
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
     * @returns {string}
     */
    get type() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_tilelayerdescription_type(this.__wbg_ptr);
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
    get raster_tile() {
        const ret = wasm.__wbg_get_tilelayerdescription_raster_tile(this.__wbg_ptr);
        return ret === 0 ? undefined : RasterTileMaterial.__wrap(ret);
    }
    /**
     * @param {RasterTileMaterial | undefined} [arg0]
     */
    set raster_tile(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, RasterTileMaterial);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_tilelayerdescription_raster_tile(this.__wbg_ptr, ptr0);
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
     * @returns {number | undefined}
     */
    get global_batch_ids() {
        const ret = wasm.__wbg_get_transferablemodelgeometry_global_batch_ids(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set global_batch_ids(arg0) {
        wasm.__wbg_set_transferablemodelgeometry_global_batch_ids(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
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
    setExpectedWindingOrders(byte_length, f) {
        wasm.transferablepolygonbatchedfeature_setExpectedWindingOrders(this.__wbg_ptr, byte_length, f);
    }
    drop() {
        const ptr = this.__destroy_into_raw();
        wasm.transferablepolygonbatchedfeature_drop(ptr);
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.transferablepolygonbatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
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
     * @returns {Float32Array}
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
     * @returns {TransferableFloatAttribute}
     */
    get position() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_position(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set position(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepolygongeometry_position(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TransferableFloatAttribute | undefined}
     */
    get normal() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_normal(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | undefined} [arg0]
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
     * @param {TransferableFloatAttribute | undefined} [arg0]
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
    get batch_id() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_batch_id(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | undefined} [arg0]
     */
    set batch_id(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_batch_id(this.__wbg_ptr, ptr0);
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
     * @param {TransferableFloatAttribute} position
     * @param {TransferableFloatAttribute | undefined} normal
     * @param {TransferableFloatAttribute | undefined} scale_normal_and_cap
     * @param {TransferableFloatAttribute | undefined} batch_id
     * @param {number} indices
     */
    constructor(position, normal, scale_normal_and_cap, batch_id, indices) {
        _assertClass(position, TransferableFloatAttribute);
        var ptr0 = position.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(normal)) {
            _assertClass(normal, TransferableFloatAttribute);
            ptr1 = normal.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(scale_normal_and_cap)) {
            _assertClass(scale_normal_and_cap, TransferableFloatAttribute);
            ptr2 = scale_normal_and_cap.__destroy_into_raw();
        }
        let ptr3 = 0;
        if (!isLikeNone(batch_id)) {
            _assertClass(batch_id, TransferableFloatAttribute);
            ptr3 = batch_id.__destroy_into_raw();
        }
        const ret = wasm.transferablepolygongeometry_new(ptr0, ptr1, ptr2, ptr3, indices);
        this.__wbg_ptr = ret >>> 0;
        TransferablePolygonGeometryFinalization.register(this, this.__wbg_ptr, this);
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
    drop() {
        const ptr = this.__destroy_into_raw();
        wasm.transferablepolylinebatchedfeature_drop(ptr);
    }
    /**
     * @returns {Uint32Array}
     */
    transferBatchIds() {
        const ret = wasm.transferablepolylinebatchedfeature_transferBatchIds(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Float32Array}
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
     * @returns {TransferableFloatAttribute}
     */
    get start_normals() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_position(this.__wbg_ptr);
        return TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute} arg0
     */
    set start_normals(arg0) {
        _assertClass(arg0, TransferableFloatAttribute);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_transferablepolygongeometry_position(this.__wbg_ptr, ptr0);
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
    get batch_id() {
        const ret = wasm.__wbg_get_transferablepolygongeometry_normal(this.__wbg_ptr);
        return ret === 0 ? undefined : TransferableFloatAttribute.__wrap(ret);
    }
    /**
     * @param {TransferableFloatAttribute | undefined} [arg0]
     */
    set batch_id(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, TransferableFloatAttribute);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_transferablepolygongeometry_normal(this.__wbg_ptr, ptr0);
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
     * @param {TransferableFloatAttribute} start
     * @param {TransferableFloatAttribute} forward_offset
     * @param {TransferableFloatAttribute} start_normals
     * @param {TransferableFloatAttribute} end_normal_and_texture_coordinate_normalization_x
     * @param {TransferableFloatAttribute} right_normal_and_texture_coordinate_normalization_y
     * @param {TransferableFloatAttribute | undefined} batch_id
     * @param {number} indices
     */
    constructor(position, start, forward_offset, start_normals, end_normal_and_texture_coordinate_normalization_x, right_normal_and_texture_coordinate_normalization_y, batch_id, indices) {
        _assertClass(position, TransferableFloatAttribute);
        var ptr0 = position.__destroy_into_raw();
        _assertClass(start, TransferableFloatAttribute);
        var ptr1 = start.__destroy_into_raw();
        _assertClass(forward_offset, TransferableFloatAttribute);
        var ptr2 = forward_offset.__destroy_into_raw();
        _assertClass(start_normals, TransferableFloatAttribute);
        var ptr3 = start_normals.__destroy_into_raw();
        _assertClass(end_normal_and_texture_coordinate_normalization_x, TransferableFloatAttribute);
        var ptr4 = end_normal_and_texture_coordinate_normalization_x.__destroy_into_raw();
        _assertClass(right_normal_and_texture_coordinate_normalization_y, TransferableFloatAttribute);
        var ptr5 = right_normal_and_texture_coordinate_normalization_y.__destroy_into_raw();
        let ptr6 = 0;
        if (!isLikeNone(batch_id)) {
            _assertClass(batch_id, TransferableFloatAttribute);
            ptr6 = batch_id.__destroy_into_raw();
        }
        const ret = wasm.transferablepolylinegeometry_new(ptr0, ptr1, ptr2, ptr3, ptr4, ptr5, ptr6, indices);
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

const TransferableSingleGeometryFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transferablesinglegeometry_free(ptr >>> 0, 1));

export class TransferableSingleGeometry {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TransferableSingleGeometry.prototype);
        obj.__wbg_ptr = ptr;
        TransferableSingleGeometryFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransferableSingleGeometryFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transferablesinglegeometry_free(ptr, 0);
    }
    /**
     * @returns {number | undefined}
     */
    get batch_id() {
        const ret = wasm.__wbg_get_transferablesinglegeometry_batch_id(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set batch_id(arg0) {
        wasm.__wbg_set_transferablesinglegeometry_batch_id(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
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
     * @returns {CachedMeshHandle | undefined}
     */
    get cached_mesh_handle() {
        const ret = wasm.__wbg_get_transferabletile_cached_mesh_handle(this.__wbg_ptr);
        return ret === 0 ? undefined : CachedMeshHandle.__wrap(ret);
    }
    /**
     * @param {CachedMeshHandle | undefined} [arg0]
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
     * @param {CachedMeshHandle | undefined} [cached_mesh_handle]
     */
    constructor(coords, max_height, cached_mesh_handle) {
        _assertClass(coords, TileXYZ);
        var ptr0 = coords.__destroy_into_raw();
        let ptr1 = 0;
        if (!isLikeNone(cached_mesh_handle)) {
            _assertClass(cached_mesh_handle, CachedMeshHandle);
            ptr1 = cached_mesh_handle.__destroy_into_raw();
        }
        const ret = wasm.transferabletile_new(ptr0, max_height, ptr1);
        this.__wbg_ptr = ret >>> 0;
        TransferableTileFinalization.register(this, this.__wbg_ptr, this);
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
        const ret = wasm.__wbg_get_transform_tx(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set tx(arg0) {
        wasm.__wbg_set_transform_tx(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get ty() {
        const ret = wasm.__wbg_get_transform_ty(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set ty(arg0) {
        wasm.__wbg_set_transform_ty(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get tz() {
        const ret = wasm.__wbg_get_transform_tz(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set tz(arg0) {
        wasm.__wbg_set_transform_tz(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get qx() {
        const ret = wasm.__wbg_get_transform_qx(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set qx(arg0) {
        wasm.__wbg_set_transform_qx(this.__wbg_ptr, arg0);
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
     * @param {bigint} tile_handle
     */
    constructor(tile_handle) {
        const ret = wasm.upsampleterrainmeshparameters_new(tile_handle);
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
     * @param {TransferableGeometry} geometry
     * @param {number} heights
     * @param {number} min_height
     * @param {number} max_height
     */
    constructor(geometry, heights, min_height, max_height) {
        _assertClass(geometry, TransferableGeometry);
        var ptr0 = geometry.__destroy_into_raw();
        const ret = wasm.upsampleterrainmeshresult_new(ptr0, heights, min_height, max_height);
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
}

const Vec3Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vec3_free(ptr >>> 0, 1));

export class Vec3 {

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
     * @param {boolean | undefined} [arg0]
     */
    set show(arg0) {
        wasm.__wbg_set_vectortilematerial_show(this.__wbg_ptr, isLikeNone(arg0) ? 0xFFFFFF : arg0 ? 1 : 0);
    }
    /**
     * @returns {number | undefined}
     */
    get max_zoom() {
        const ret = wasm.__wbg_get_polygonmaterial_color(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set max_zoom(arg0) {
        wasm.__wbg_set_polygonmaterial_color(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {number | undefined}
     */
    get max_sse() {
        const ret = wasm.__wbg_get_modelmaterial_height(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | undefined} [arg0]
     */
    set max_sse(arg0) {
        wasm.__wbg_set_modelmaterial_height(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : Math.fround(arg0));
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

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
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
    imports.wbg.__wbg_buffer_71667b1101df19da = function(arg0) {
        const ret = arg0.buffer;
        return ret;
    };
    imports.wbg.__wbg_call_75b89300dd530ca6 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.call(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_d68488931693e6ee = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_crypto_ed58b8e10a292839 = function(arg0) {
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
    imports.wbg.__wbg_done_3ca5b09e8598078d = function(arg0) {
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
    imports.wbg.__wbg_entries_d873dde863e50b8c = function(arg0) {
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
    imports.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function() { return handleError(function (arg0, arg1) {
        arg0.getRandomValues(arg1);
    }, arguments) };
    imports.wbg.__wbg_get_c122b1d576cf1fdb = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_get_ddd82e34e6366fb9 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
        const ret = arg0[arg1];
        return ret;
    };
    imports.wbg.__wbg_globalThis_59c7794d9413986f = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_global_04c81bad83a72129 = function() { return handleError(function () {
        const ret = global.global;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_ArrayBuffer_36214dbc6ea8dd3d = function(arg0) {
        let result;
        try {
            result = arg0 instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_0d898f7981fe0a2d = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_isArray_435f9cb9abc7eccc = function(arg0) {
        const ret = Array.isArray(arg0);
        return ret;
    };
    imports.wbg.__wbg_isSafeInteger_2817b2c8ebdd29d2 = function(arg0) {
        const ret = Number.isSafeInteger(arg0);
        return ret;
    };
    imports.wbg.__wbg_iterator_2a6b115668862130 = function() {
        const ret = Symbol.iterator;
        return ret;
    };
    imports.wbg.__wbg_length_6b89ee6b5044157b = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_86ef1ccfc4a0e86b = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_b52c3d528b88468e = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_e9123d1e4db12534 = function(arg0) {
        const ret = arg0.length;
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
    imports.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function(arg0) {
        const ret = arg0.msCrypto;
        return ret;
    };
    imports.wbg.__wbg_new_0a4e88e0a61a08a4 = function(arg0) {
        const ret = new Float32Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_new_682ca77cd9fbeb43 = function(arg0) {
        const ret = new Uint32Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
        const ret = new Error();
        return ret;
    };
    imports.wbg.__wbg_new_9ed4506807911440 = function(arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_newnoargs_fe7e106c48aadd7e = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_36e1fc5a21bc60fe = function(arg0, arg1, arg2) {
        const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_844a36aae280cdbe = function(arg0, arg1, arg2) {
        const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_a51b517eb0e8fbf4 = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_newwithlength_3212948a458000db = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_next_86c8f7dfb19a94eb = function() { return handleError(function (arg0) {
        const ret = arg0.next();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_next_b39104aeda52ac60 = function(arg0) {
        const ret = arg0.next;
        return ret;
    };
    imports.wbg.__wbg_node_02999533c4ea02e3 = function(arg0) {
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
    imports.wbg.__wbg_process_5c1d670bc53614b8 = function(arg0) {
        const ret = arg0.process;
        return ret;
    };
    imports.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function() { return handleError(function (arg0, arg1) {
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
    imports.wbg.__wbg_require_79b1e9274cde3c87 = function() { return handleError(function () {
        const ret = module.require;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_self_c9a63b952bd22cbd = function() { return handleError(function () {
        const ret = self.self;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_523160187cb8db9d = function(arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_set_d903a346c0145c62 = function(arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_set_e8d9380e866a1e41 = function(arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_stringify_af61cb825a8f0ce6 = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_361dcbbb6f7ce587 = function(arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
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
    imports.wbg.__wbg_value_f82ca5432417c8ff = function(arg0) {
        const ret = arg0.value;
        return ret;
    };
    imports.wbg.__wbg_versions_c71aa1626a93e0a1 = function(arg0) {
        const ret = arg0.versions;
        return ret;
    };
    imports.wbg.__wbg_window_81304a10d2638125 = function() { return handleError(function () {
        const ret = window.window;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_workertaskdelegatedevent_new = function(arg0) {
        const ret = WorkerTaskDelegatedEvent.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_workertaskdelegatedevent_unwrap = function(arg0) {
        const ret = WorkerTaskDelegatedEvent.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbindgen_as_number = function(arg0) {
        const ret = +arg0;
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
        const ret = BigInt.asUintN(64, arg0);
        return ret;
    };
    imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
        const v = arg1;
        const ret = typeof(v) === 'bigint' ? v : undefined;
        getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = arg0;
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = arg0 in arg1;
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
    imports.wbg.__wbindgen_is_bigint = function(arg0) {
        const ret = typeof(arg0) === 'bigint';
        return ret;
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(arg0) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_is_null = function(arg0) {
        const ret = arg0 === null;
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = arg0;
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(arg0) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        const ret = arg0 === arg1;
        return ret;
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = arg0 == arg1;
        return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
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
