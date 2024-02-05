! function() {
    var e = {
            294: function(e, r, t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.EthereumProviderError = r.EthereumRpcError = void 0;
                const n = t(445);
                class o extends Error {
                    constructor(e, r, t) {
                        if (!Number.isInteger(e))
                            throw new Error('"code" must be an integer.');
                        if (!r || "string" != typeof r)
                            throw new Error('"message" must be a nonempty string.');
                        super(r),
                            this.code = e,
                            void 0 !== t && (this.data = t)
                    }
                    serialize() {
                        const e = {
                            code: this.code,
                            message: this.message
                        };
                        return void 0 !== this.data && (e.data = this.data),
                            this.stack && (e.stack = this.stack),
                            e
                    }
                    toString() {
                        return n.default(this.serialize(), i, 2)
                    }
                }

                function i(e, r) {
                    if ("[Circular]" !== r)
                        return r
                }
                r.EthereumRpcError = o,
                    r.EthereumProviderError = class extends o {
                        constructor(e, r, t) {
                            if (! function(e) {
                                    return Number.isInteger(e) && e >= 1e3 && e <= 4999
                                }(e))
                                throw new Error('"code" must be an integer such that: 1000 <= code <= 4999');
                            super(e, r, t)
                        }
                    }
            },
            662: function(e, r) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.errorValues = r.errorCodes = void 0,
                    r.errorCodes = {
                        rpc: {
                            invalidInput: -32e3,
                            resourceNotFound: -32001,
                            resourceUnavailable: -32002,
                            transactionRejected: -32003,
                            methodNotSupported: -32004,
                            limitExceeded: -32005,
                            parse: -32700,
                            invalidRequest: -32600,
                            methodNotFound: -32601,
                            invalidParams: -32602,
                            internal: -32603
                        },
                        provider: {
                            userRejectedRequest: 4001,
                            unauthorized: 4100,
                            unsupportedMethod: 4200,
                            disconnected: 4900,
                            chainDisconnected: 4901
                        }
                    },
                    r.errorValues = {
                        "-32700": {
                            standard: "JSON RPC 2.0",
                            message: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
                        },
                        "-32600": {
                            standard: "JSON RPC 2.0",
                            message: "The JSON sent is not a valid Request object."
                        },
                        "-32601": {
                            standard: "JSON RPC 2.0",
                            message: "The method does not exist / is not available."
                        },
                        "-32602": {
                            standard: "JSON RPC 2.0",
                            message: "Invalid method parameter(s)."
                        },
                        "-32603": {
                            standard: "JSON RPC 2.0",
                            message: "Internal JSON-RPC error."
                        },
                        "-32000": {
                            standard: "EIP-1474",
                            message: "Invalid input."
                        },
                        "-32001": {
                            standard: "EIP-1474",
                            message: "Resource not found."
                        },
                        "-32002": {
                            standard: "EIP-1474",
                            message: "Resource unavailable."
                        },
                        "-32003": {
                            standard: "EIP-1474",
                            message: "Transaction rejected."
                        },
                        "-32004": {
                            standard: "EIP-1474",
                            message: "Method not supported."
                        },
                        "-32005": {
                            standard: "EIP-1474",
                            message: "Request limit exceeded."
                        },
                        4001: {
                            standard: "EIP-1193",
                            message: "User rejected the request."
                        },
                        4100: {
                            standard: "EIP-1193",
                            message: "The requested account and/or method has not been authorized by the user."
                        },
                        4200: {
                            standard: "EIP-1193",
                            message: "The requested method is not supported by this Ethereum provider."
                        },
                        4900: {
                            standard: "EIP-1193",
                            message: "The provider is disconnected from all chains."
                        },
                        4901: {
                            standard: "EIP-1193",
                            message: "The provider is disconnected from the specified chain."
                        }
                    }
            },
            797: function(e, r, t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.ethErrors = void 0;
                const n = t(294),
                    o = t(753),
                    i = t(662);

                function u(e, r) {
                    const [t, i] = c(r);
                    return new n.EthereumRpcError(e, t || o.getMessageFromCode(e), i)
                }

                function s(e, r) {
                    const [t, i] = c(r);
                    return new n.EthereumProviderError(e, t || o.getMessageFromCode(e), i)
                }

                function c(e) {
                    if (e) {
                        if ("string" == typeof e)
                            return [e];
                        if ("object" == typeof e && !Array.isArray(e)) {
                            const { message: r, data: t } = e;
                            if (r && "string" != typeof r)
                                throw new Error("Must specify string message.");
                            return [r || void 0, t]
                        }
                    }
                    return []
                }
                r.ethErrors = {
                    rpc: {
                        parse: e => u(i.errorCodes.rpc.parse, e),
                        invalidRequest: e => u(i.errorCodes.rpc.invalidRequest, e),
                        invalidParams: e => u(i.errorCodes.rpc.invalidParams, e),
                        methodNotFound: e => u(i.errorCodes.rpc.methodNotFound, e),
                        internal: e => u(i.errorCodes.rpc.internal, e),
                        server: e => {
                            if (!e || "object" != typeof e || Array.isArray(e))
                                throw new Error("Ethereum RPC Server errors must provide single object argument.");
                            const { code: r } = e;
                            if (!Number.isInteger(r) || r > -32005 || r < -32099)
                                throw new Error('"code" must be an integer such that: -32099 <= code <= -32005');
                            return u(r, e)
                        },
                        invalidInput: e => u(i.errorCodes.rpc.invalidInput, e),
                        resourceNotFound: e => u(i.errorCodes.rpc.resourceNotFound, e),
                        resourceUnavailable: e => u(i.errorCodes.rpc.resourceUnavailable, e),
                        transactionRejected: e => u(i.errorCodes.rpc.transactionRejected, e),
                        methodNotSupported: e => u(i.errorCodes.rpc.methodNotSupported, e),
                        limitExceeded: e => u(i.errorCodes.rpc.limitExceeded, e)
                    },
                    provider: {
                        userRejectedRequest: e => s(i.errorCodes.provider.userRejectedRequest, e),
                        unauthorized: e => s(i.errorCodes.provider.unauthorized, e),
                        unsupportedMethod: e => s(i.errorCodes.provider.unsupportedMethod, e),
                        disconnected: e => s(i.errorCodes.provider.disconnected, e),
                        chainDisconnected: e => s(i.errorCodes.provider.chainDisconnected, e),
                        custom: e => {
                            if (!e || "object" != typeof e || Array.isArray(e))
                                throw new Error("Ethereum Provider custom errors must provide single object argument.");
                            const { code: r, message: t, data: o } = e;
                            if (!t || "string" != typeof t)
                                throw new Error('"message" must be a nonempty string');
                            return new n.EthereumProviderError(r, t, o)
                        }
                    }
                }
            },
            826: function(e, r, t) {
                "use strict";
                r.Xy = r.Cg = r.Sy = r.Zk = void 0;
                const n = t(294);
                Object.defineProperty(r, "Cg", {
                    enumerable: !0,
                    get: function() {
                        return n.EthereumRpcError
                    }
                });
                const o = t(753);
                Object.defineProperty(r, "Xy", {
                    enumerable: !0,
                    get: function() {
                        return o.serializeError
                    }
                });
                const i = t(797);
                Object.defineProperty(r, "Sy", {
                    enumerable: !0,
                    get: function() {
                        return i.ethErrors
                    }
                });
                const u = t(662);
                Object.defineProperty(r, "Zk", {
                    enumerable: !0,
                    get: function() {
                        return u.errorCodes
                    }
                })
            },
            753: function(e, r, t) {
                "use strict";
                Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.serializeError = r.isValidCode = r.getMessageFromCode = r.JSON_RPC_SERVER_ERROR_MESSAGE = void 0;
                const n = t(662),
                    o = t(294),
                    i = n.errorCodes.rpc.internal,
                    u = {
                        code: i,
                        message: s(i)
                    };

                function s(e, t = "Unspecified error message. This is a bug, please report it.") {
                    if (Number.isInteger(e)) {
                        const t = e.toString();
                        if (f(n.errorValues, t))
                            return n.errorValues[t].message;
                        if (a(e))
                            return r.JSON_RPC_SERVER_ERROR_MESSAGE
                    }
                    return t
                }

                function c(e) {
                    if (!Number.isInteger(e))
                        return !1;
                    const r = e.toString();
                    return !!n.errorValues[r] || !!a(e)
                }

                function a(e) {
                    return e >= -32099 && e <= -32e3
                }

                function d(e) {
                    return e && "object" == typeof e && !Array.isArray(e) ? Object.assign({}, e) : e
                }

                function f(e, r) {
                    return Object.prototype.hasOwnProperty.call(e, r)
                }
                r.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error.",
                    r.getMessageFromCode = s,
                    r.isValidCode = c,
                    r.serializeError = function(e, { fallbackError: r = u, shouldIncludeStack: t = !1 } = {}) {
                        var n, i;
                        if (!r || !Number.isInteger(r.code) || "string" != typeof r.message)
                            throw new Error("Must provide fallback error with integer number code and string message.");
                        if (e instanceof o.EthereumRpcError)
                            return e.serialize();
                        const a = {};
                        if (e && "object" == typeof e && !Array.isArray(e) && f(e, "code") && c(e.code)) {
                            const r = e;
                            a.code = r.code,
                                r.message && "string" == typeof r.message ? (a.message = r.message,
                                    f(r, "data") && (a.data = r.data)) : (a.message = s(a.code),
                                    a.data = {
                                        originalError: d(e)
                                    })
                        } else {
                            a.code = r.code;
                            const t = null === (n = e) || void 0 === n ? void 0 : n.message;
                            a.message = t && "string" == typeof t ? t : r.message,
                                a.data = {
                                    originalError: d(e)
                                }
                        }
                        const l = null === (i = e) || void 0 === i ? void 0 : i.stack;
                        return t && e && l && "string" == typeof l && (a.stack = l),
                            a
                    }
            },
            445: function(e) {
                e.exports = u,
                    u.default = u,
                    u.stable = d,
                    u.stableStringify = d;
                var r = "[...]",
                    t = "[Circular]",
                    n = [],
                    o = [];

                function i() {
                    return {
                        depthLimit: Number.MAX_SAFE_INTEGER,
                        edgesLimit: Number.MAX_SAFE_INTEGER
                    }
                }

                function u(e, r, t, u) {
                    var s;
                    void 0 === u && (u = i()),
                        c(e, "", 0, [], void 0, 0, u);
                    try {
                        s = 0 === o.length ? JSON.stringify(e, r, t) : JSON.stringify(e, l(r), t)
                    } catch (e) {
                        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]")
                    } finally {
                        for (; 0 !== n.length;) {
                            var a = n.pop();
                            4 === a.length ? Object.defineProperty(a[0], a[1], a[3]) : a[0][a[1]] = a[2]
                        }
                    }
                    return s
                }

                function s(e, r, t, i) {
                    var u = Object.getOwnPropertyDescriptor(i, t);
                    void 0 !== u.get ? u.configurable ? (Object.defineProperty(i, t, {
                            value: e
                        }),
                        n.push([i, t, r, u])) : o.push([r, t, e]) : (i[t] = e,
                        n.push([i, t, r]))
                }

                function c(e, n, o, i, u, a, d) {
                    var f;
                    if (a += 1,
                        "object" == typeof e && null !== e) {
                        for (f = 0; f < i.length; f++)
                            if (i[f] === e)
                                return void s(t, e, n, u);
                        if (void 0 !== d.depthLimit && a > d.depthLimit)
                            return void s(r, e, n, u);
                        if (void 0 !== d.edgesLimit && o + 1 > d.edgesLimit)
                            return void s(r, e, n, u);
                        if (i.push(e),
                            Array.isArray(e))
                            for (f = 0; f < e.length; f++)
                                c(e[f], f, f, i, e, a, d);
                        else {
                            var l = Object.keys(e);
                            for (f = 0; f < l.length; f++) {
                                var v = l[f];
                                c(e[v], v, f, i, e, a, d)
                            }
                        }
                        i.pop()
                    }
                }

                function a(e, r) {
                    return e < r ? -1 : e > r ? 1 : 0
                }

                function d(e, r, t, u) {
                    void 0 === u && (u = i());
                    var s, c = f(e, "", 0, [], void 0, 0, u) || e;
                    try {
                        s = 0 === o.length ? JSON.stringify(c, r, t) : JSON.stringify(c, l(r), t)
                    } catch (e) {
                        return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]")
                    } finally {
                        for (; 0 !== n.length;) {
                            var a = n.pop();
                            4 === a.length ? Object.defineProperty(a[0], a[1], a[3]) : a[0][a[1]] = a[2]
                        }
                    }
                    return s
                }

                function f(e, o, i, u, c, d, l) {
                    var v;
                    if (d += 1,
                        "object" == typeof e && null !== e) {
                        for (v = 0; v < u.length; v++)
                            if (u[v] === e)
                                return void s(t, e, o, c);
                        try {
                            if ("function" == typeof e.toJSON)
                                return
                        } catch (e) {
                            return
                        }
                        if (void 0 !== l.depthLimit && d > l.depthLimit)
                            return void s(r, e, o, c);
                        if (void 0 !== l.edgesLimit && i + 1 > l.edgesLimit)
                            return void s(r, e, o, c);
                        if (u.push(e),
                            Array.isArray(e))
                            for (v = 0; v < e.length; v++)
                                f(e[v], v, v, u, e, d, l);
                        else {
                            var h = {},
                                p = Object.keys(e).sort(a);
                            for (v = 0; v < p.length; v++) {
                                var g = p[v];
                                f(e[g], g, v, u, e, d, l),
                                    h[g] = e[g]
                            }
                            if (void 0 === c)
                                return h;
                            n.push([c, o, e]),
                                c[o] = h
                        }
                        u.pop()
                    }
                }

                function l(e) {
                    return e = void 0 !== e ? e : function(e, r) {
                            return r
                        },
                        function(r, t) {
                            if (o.length > 0)
                                for (var n = 0; n < o.length; n++) {
                                    var i = o[n];
                                    if (i[1] === r && i[0] === t) {
                                        t = i[2],
                                            o.splice(n, 1);
                                        break
                                    }
                                }
                            return e.call(this, r, t)
                        }
                }
            },
            705: function(e, r, t) {
                var n = t(639).Symbol;
                e.exports = n
            },
            636: function(e, r, t) {
                var n = t(545),
                    o = t(694),
                    i = t(469),
                    u = t(144),
                    s = t(776),
                    c = t(719),
                    a = Object.prototype.hasOwnProperty;
                e.exports = function(e, r) {
                    var t = i(e),
                        d = !t && o(e),
                        f = !t && !d && u(e),
                        l = !t && !d && !f && c(e),
                        v = t || d || f || l,
                        h = v ? n(e.length, String) : [],
                        p = h.length;
                    for (var g in e)
                        !r && !a.call(e, g) || v && ("length" == g || f && ("offset" == g || "parent" == g) || l && ("buffer" == g || "byteLength" == g || "byteOffset" == g) || s(g, p)) || h.push(g);
                    return h
                }
            },
            483: function(e, r, t) {
                var n = t(63)();
                e.exports = n
            },
            816: function(e, r, t) {
                var n = t(483),
                    o = t(674);
                e.exports = function(e, r) {
                    return e && n(e, r, o)
                }
            },
            239: function(e, r, t) {
                var n = t(705),
                    o = t(607),
                    i = t(333),
                    u = n ? n.toStringTag : void 0;
                e.exports = function(e) {
                    return null == e ? void 0 === e ? "[object Undefined]" : "[object Null]" : u && u in Object(e) ? o(e) : i(e)
                }
            },
            975: function(e, r, t) {
                var n = t(816);
                e.exports = function(e, r, t, o) {
                    return n(e, (function(e, n, i) {
                            r(o, t(e), n, i)
                        })),
                        o
                }
            },
            454: function(e, r, t) {
                var n = t(239),
                    o = t(5);
                e.exports = function(e) {
                    return o(e) && "[object Arguments]" == n(e)
                }
            },
            749: function(e, r, t) {
                var n = t(239),
                    o = t(780),
                    i = t(5),
                    u = {};
                u["[object Float32Array]"] = u["[object Float64Array]"] = u["[object Int8Array]"] = u["[object Int16Array]"] = u["[object Int32Array]"] = u["[object Uint8Array]"] = u["[object Uint8ClampedArray]"] = u["[object Uint16Array]"] = u["[object Uint32Array]"] = !0,
                    u["[object Arguments]"] = u["[object Array]"] = u["[object ArrayBuffer]"] = u["[object Boolean]"] = u["[object DataView]"] = u["[object Date]"] = u["[object Error]"] = u["[object Function]"] = u["[object Map]"] = u["[object Number]"] = u["[object Object]"] = u["[object RegExp]"] = u["[object Set]"] = u["[object String]"] = u["[object WeakMap]"] = !1,
                    e.exports = function(e) {
                        return i(e) && o(e.length) && !!u[n(e)]
                    }
            },
            280: function(e, r, t) {
                var n = t(726),
                    o = t(916),
                    i = Object.prototype.hasOwnProperty;
                e.exports = function(e) {
                    if (!n(e))
                        return o(e);
                    var r = [];
                    for (var t in Object(e))
                        i.call(e, t) && "constructor" != t && r.push(t);
                    return r
                }
            },
            545: function(e) {
                e.exports = function(e, r) {
                    for (var t = -1, n = Array(e); ++t < e;)
                        n[t] = r(t);
                    return n
                }
            },
            518: function(e) {
                e.exports = function(e) {
                    return function(r) {
                        return e(r)
                    }
                }
            },
            63: function(e) {
                e.exports = function(e) {
                    return function(r, t, n) {
                        for (var o = -1, i = Object(r), u = n(r), s = u.length; s--;) {
                            var c = u[e ? s : ++o];
                            if (!1 === t(i[c], c, i))
                                break
                        }
                        return r
                    }
                }
            },
            779: function(e, r, t) {
                var n = t(975);
                e.exports = function(e, r) {
                    return function(t, o) {
                        return n(t, e, r(o), {})
                    }
                }
            },
            957: function(e, r, t) {
                var n = "object" == typeof t.g && t.g && t.g.Object === Object && t.g;
                e.exports = n
            },
            607: function(e, r, t) {
                var n = t(705),
                    o = Object.prototype,
                    i = o.hasOwnProperty,
                    u = o.toString,
                    s = n ? n.toStringTag : void 0;
                e.exports = function(e) {
                    var r = i.call(e, s),
                        t = e[s];
                    try {
                        e[s] = void 0;
                        var n = !0
                    } catch (e) {}
                    var o = u.call(e);
                    return n && (r ? e[s] = t : delete e[s]),
                        o
                }
            },
            776: function(e) {
                var r = /^(?:0|[1-9]\d*)$/;
                e.exports = function(e, t) {
                    var n = typeof e;
                    return !!(t = null == t ? 9007199254740991 : t) && ("number" == n || "symbol" != n && r.test(e)) && e > -1 && e % 1 == 0 && e < t
                }
            },
            726: function(e) {
                var r = Object.prototype;
                e.exports = function(e) {
                    var t = e && e.constructor;
                    return e === ("function" == typeof t && t.prototype || r)
                }
            },
            916: function(e, r, t) {
                var n = t(569)(Object.keys, Object);
                e.exports = n
            },
            167: function(e, r, t) {
                e = t.nmd(e);
                var n = t(957),
                    o = r && !r.nodeType && r,
                    i = o && e && !e.nodeType && e,
                    u = i && i.exports === o && n.process,
                    s = function() {
                        try {
                            return i && i.require && i.require("util").types || u && u.binding && u.binding("util")
                        } catch (e) {}
                    }();
                e.exports = s
            },
            333: function(e) {
                var r = Object.prototype.toString;
                e.exports = function(e) {
                    return r.call(e)
                }
            },
            569: function(e) {
                e.exports = function(e, r) {
                    return function(t) {
                        return e(r(t))
                    }
                }
            },
            639: function(e, r, t) {
                var n = t(957),
                    o = "object" == typeof self && self && self.Object === Object && self,
                    i = n || o || Function("return this")();
                e.exports = i
            },
            703: function(e) {
                e.exports = function(e) {
                    return function() {
                        return e
                    }
                }
            },
            557: function(e) {
                e.exports = function(e) {
                    return e
                }
            },
            137: function(e, r, t) {
                var n = t(703),
                    o = t(779),
                    i = t(557),
                    u = Object.prototype.toString,
                    s = o((function(e, r, t) {
                        null != r && "function" != typeof r.toString && (r = u.call(r)),
                            e[r] = t
                    }), n(i));
                e.exports = s
            },
            694: function(e, r, t) {
                var n = t(454),
                    o = t(5),
                    i = Object.prototype,
                    u = i.hasOwnProperty,
                    s = i.propertyIsEnumerable,
                    c = n(function() {
                        return arguments
                    }()) ? n : function(e) {
                        return o(e) && u.call(e, "callee") && !s.call(e, "callee")
                    };
                e.exports = c
            },
            469: function(e) {
                var r = Array.isArray;
                e.exports = r
            },
            612: function(e, r, t) {
                var n = t(560),
                    o = t(780);
                e.exports = function(e) {
                    return null != e && o(e.length) && !n(e)
                }
            },
            144: function(e, r, t) {
                e = t.nmd(e);
                var n = t(639),
                    o = t(62),
                    i = r && !r.nodeType && r,
                    u = i && e && !e.nodeType && e,
                    s = u && u.exports === i ? n.Buffer : void 0,
                    c = (s ? s.isBuffer : void 0) || o;
                e.exports = c
            },
            560: function(e, r, t) {
                var n = t(239),
                    o = t(218);
                e.exports = function(e) {
                    if (!o(e))
                        return !1;
                    var r = n(e);
                    return "[object Function]" == r || "[object GeneratorFunction]" == r || "[object AsyncFunction]" == r || "[object Proxy]" == r
                }
            },
            780: function(e) {
                e.exports = function(e) {
                    return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991
                }
            },
            218: function(e) {
                e.exports = function(e) {
                    var r = typeof e;
                    return null != e && ("object" == r || "function" == r)
                }
            },
            5: function(e) {
                e.exports = function(e) {
                    return null != e && "object" == typeof e
                }
            },
            719: function(e, r, t) {
                var n = t(749),
                    o = t(518),
                    i = t(167),
                    u = i && i.isTypedArray,
                    s = u ? o(u) : n;
                e.exports = s
            },
            674: function(e, r, t) {
                var n = t(636),
                    o = t(280),
                    i = t(612);
                e.exports = function(e) {
                    return i(e) ? n(e) : o(e)
                }
            },
            62: function(e) {
                e.exports = function() {
                    return !1
                }
            },
            571: function(e, r, t) {
                "use strict";
                var n = t(346);
                e.exports = u;
                var o = function() {
                        function e(e) {
                            return void 0 !== e && e
                        }
                        try {
                            return "undefined" != typeof globalThis || Object.defineProperty(Object.prototype, "globalThis", {
                                    get: function() {
                                        return delete Object.prototype.globalThis,
                                            this.globalThis = this
                                    },
                                    configurable: !0
                                }),
                                globalThis
                        } catch (r) {
                            return e(self) || e(window) || e(this) || {}
                        }
                    }().console || {},
                    i = {
                        mapHttpRequest: h,
                        mapHttpResponse: h,
                        wrapRequestSerializer: p,
                        wrapResponseSerializer: p,
                        wrapErrorSerializer: p,
                        req: h,
                        res: h,
                        err: function(e) {
                            var r = {
                                type: e.constructor.name,
                                msg: e.message,
                                stack: e.stack
                            };
                            for (var t in e)
                                void 0 === r[t] && (r[t] = e[t]);
                            return r
                        }
                    };

                function u(e) {
                    (e = e || {}).browser = e.browser || {};
                    var r = e.browser.transmit;
                    if (r && "function" != typeof r.send)
                        throw Error("pino: transmit option must have a send function");
                    var t = e.browser.write || o;
                    e.browser.write && (e.browser.asObject = !0);
                    var n = e.serializers || {},
                        i = Array.isArray(e.browser.serialize) ? e.browser.serialize.filter((function(e) {
                            return "!stdSerializers.err" !== e
                        })) : !0 === e.browser.serialize && Object.keys(n),
                        c = e.browser.serialize;
                    Array.isArray(e.browser.serialize) && e.browser.serialize.indexOf("!stdSerializers.err") > -1 && (c = !1),
                        "function" == typeof t && (t.error = t.fatal = t.warn = t.info = t.debug = t.trace = t), !1 === e.enabled && (e.level = "silent");
                    var f = e.level || "info",
                        h = Object.create(t);
                    h.log || (h.log = g),
                        Object.defineProperty(h, "levelVal", {
                            get: function() {
                                return "silent" === this.level ? 1 / 0 : this.levels.values[this.level]
                            }
                        }),
                        Object.defineProperty(h, "level", {
                            get: function() {
                                return this._level
                            },
                            set: function(e) {
                                if ("silent" !== e && !this.levels.values[e])
                                    throw Error("unknown level " + e);
                                this._level = e,
                                    s(p, h, "error", "log"),
                                    s(p, h, "fatal", "error"),
                                    s(p, h, "warn", "error"),
                                    s(p, h, "info", "log"),
                                    s(p, h, "debug", "log"),
                                    s(p, h, "trace", "log")
                            }
                        });
                    var p = {
                        transmit: r,
                        serialize: i,
                        asObject: e.browser.asObject,
                        levels: ["error", "fatal", "warn", "info", "debug", "trace"],
                        timestamp: v(e)
                    };
                    return h.levels = u.levels,
                        h.level = f,
                        h.setMaxListeners = h.getMaxListeners = h.emit = h.addListener = h.on = h.prependListener = h.once = h.prependOnceListener = h.removeListener = h.removeAllListeners = h.listeners = h.listenerCount = h.eventNames = h.write = h.flush = g,
                        h.serializers = n,
                        h._serialize = i,
                        h._stdErrSerialize = c,
                        h.child = function(t) {
                            if (!t)
                                throw new Error("missing bindings for child Pino");
                            var o = t.serializers;
                            if (i && o) {
                                var u = Object.assign({}, n, o),
                                    s = !0 === e.browser.serialize ? Object.keys(u) : i;
                                delete t.serializers,
                                    a([t], s, u, this._stdErrSerialize)
                            }

                            function c(e) {
                                this._childLevel = 1 + (0 | e._childLevel),
                                    this.error = d(e, t, "error"),
                                    this.fatal = d(e, t, "fatal"),
                                    this.warn = d(e, t, "warn"),
                                    this.info = d(e, t, "info"),
                                    this.debug = d(e, t, "debug"),
                                    this.trace = d(e, t, "trace"),
                                    u && (this.serializers = u,
                                        this._serialize = s),
                                    r && (this._logEvent = l([].concat(e._logEvent.bindings, t)))
                            }
                            return c.prototype = this,
                                new c(this)
                        },
                        r && (h._logEvent = l()),
                        h
                }

                function s(e, r, t, n) {
                    var i = Object.getPrototypeOf(r);
                    r[t] = r.levelVal > r.levels.values[t] ? g : i[t] ? i[t] : o[t] || o[n] || g,
                        function(e, r, t) {
                            var n;
                            (e.transmit || r[t] !== g) && (r[t] = (n = r[t],
                                function() {
                                    for (var i = e.timestamp(), s = new Array(arguments.length), d = Object.getPrototypeOf && Object.getPrototypeOf(this) === o ? o : this, l = 0; l < s.length; l++)
                                        s[l] = arguments[l];
                                    if (e.serialize && !e.asObject && a(s, this._serialize, this.serializers, this._stdErrSerialize),
                                        e.asObject ? n.call(d, c(this, t, s, i)) : n.apply(d, s),
                                        e.transmit) {
                                        var v = e.transmit.level || r.level,
                                            h = u.levels.values[v],
                                            p = u.levels.values[t];
                                        if (p < h)
                                            return;
                                        f(this, {
                                            ts: i,
                                            methodLevel: t,
                                            methodValue: p,
                                            transmitLevel: v,
                                            transmitValue: u.levels.values[e.transmit.level || r.level],
                                            send: e.transmit.send,
                                            val: r.levelVal
                                        }, s)
                                    }
                                }
                            ))
                        }(e, r, t)
                }

                function c(e, r, t, o) {
                    e._serialize && a(t, e._serialize, e.serializers, e._stdErrSerialize);
                    var i = t.slice(),
                        s = i[0],
                        c = {};
                    o && (c.time = o),
                        c.level = u.levels.values[r];
                    var d = 1 + (0 | e._childLevel);
                    if (d < 1 && (d = 1),
                        null !== s && "object" == typeof s) {
                        for (; d-- && "object" == typeof i[0];)
                            Object.assign(c, i.shift());
                        s = i.length ? n(i.shift(), i) : void 0
                    } else
                        "string" == typeof s && (s = n(i.shift(), i));
                    return void 0 !== s && (c.msg = s),
                        c
                }

                function a(e, r, t, n) {
                    for (var o in e)
                        if (n && e[o] instanceof Error)
                            e[o] = u.stdSerializers.err(e[o]);
                        else if ("object" == typeof e[o] && !Array.isArray(e[o]))
                        for (var i in e[o])
                            r && r.indexOf(i) > -1 && i in t && (e[o][i] = t[i](e[o][i]))
                }

                function d(e, r, t) {
                    return function() {
                        var n = new Array(1 + arguments.length);
                        n[0] = r;
                        for (var o = 1; o < n.length; o++)
                            n[o] = arguments[o - 1];
                        return e[t].apply(this, n)
                    }
                }

                function f(e, r, t) {
                    var n = r.send,
                        o = r.ts,
                        i = r.methodLevel,
                        u = r.methodValue,
                        s = r.val,
                        c = e._logEvent.bindings;
                    a(t, e._serialize || Object.keys(e.serializers), e.serializers, void 0 === e._stdErrSerialize || e._stdErrSerialize),
                        e._logEvent.ts = o,
                        e._logEvent.messages = t.filter((function(e) {
                            return -1 === c.indexOf(e)
                        })),
                        e._logEvent.level.label = i,
                        e._logEvent.level.value = u,
                        n(i, e._logEvent, s),
                        e._logEvent = l(c)
                }

                function l(e) {
                    return {
                        ts: 0,
                        messages: [],
                        bindings: e || [],
                        level: {
                            label: "",
                            value: 0
                        }
                    }
                }

                function v(e) {
                    return "function" == typeof e.timestamp ? e.timestamp : !1 === e.timestamp ? b : m
                }

                function h() {
                    return {}
                }

                function p(e) {
                    return e
                }

                function g() {}

                function b() {
                    return !1
                }

                function m() {
                    return Date.now()
                }
                u.levels = {
                        values: {
                            fatal: 60,
                            error: 50,
                            warn: 40,
                            info: 30,
                            debug: 20,
                            trace: 10
                        },
                        labels: {
                            10: "trace",
                            20: "debug",
                            30: "info",
                            40: "warn",
                            50: "error",
                            60: "fatal"
                        }
                    },
                    u.stdSerializers = i,
                    u.stdTimeFunctions = Object.assign({}, {
                        nullTime: b,
                        epochTime: m,
                        unixTime: function() {
                            return Math.round(Date.now() / 1e3)
                        },
                        isoTime: function() {
                            return new Date(Date.now()).toISOString()
                        }
                    })
            },
            346: function(e) {
                "use strict";

                function r(e) {
                    try {
                        return JSON.stringify(e)
                    } catch (e) {
                        return '"[Circular]"'
                    }
                }
                e.exports = function(e, t, n) {
                    var o = n && n.stringify || r;
                    if ("object" == typeof e && null !== e) {
                        var i = t.length + 1;
                        if (1 === i)
                            return e;
                        var u = new Array(i);
                        u[0] = o(e);
                        for (var s = 1; s < i; s++)
                            u[s] = o(t[s]);
                        return u.join(" ")
                    }
                    if ("string" != typeof e)
                        return e;
                    var c = t.length;
                    if (0 === c)
                        return e;
                    for (var a = "", d = 0, f = -1, l = e && e.length || 0, v = 0; v < l;) {
                        if (37 === e.charCodeAt(v) && v + 1 < l) {
                            switch (f = f > -1 ? f : 0,
                                e.charCodeAt(v + 1)) {
                                case 100:
                                    if (d >= c)
                                        break;
                                    if (f < v && (a += e.slice(f, v)),
                                        null == t[d])
                                        break;
                                    a += Number(t[d]),
                                        f = v += 2;
                                    break;
                                case 79:
                                case 111:
                                case 106:
                                    if (d >= c)
                                        break;
                                    if (f < v && (a += e.slice(f, v)),
                                        void 0 === t[d])
                                        break;
                                    var h = typeof t[d];
                                    if ("string" === h) {
                                        a += "'" + t[d] + "'",
                                            f = v + 2,
                                            v++;
                                        break
                                    }
                                    if ("function" === h) {
                                        a += t[d].name || "<anonymous>",
                                            f = v + 2,
                                            v++;
                                        break
                                    }
                                    a += o(t[d]),
                                        f = v + 2,
                                        v++;
                                    break;
                                case 115:
                                    if (d >= c)
                                        break;
                                    f < v && (a += e.slice(f, v)),
                                        a += String(t[d]),
                                        f = v + 2,
                                        v++;
                                    break;
                                case 37:
                                    f < v && (a += e.slice(f, v)),
                                        a += "%",
                                        f = v + 2,
                                        v++
                            }
                            ++d
                        }
                        ++v
                    }
                    return -1 === f ? e : (f < l && (a += e.slice(f)),
                        a)
                }
            }
        },
        r = {};

    function t(n) {
        var o = r[n];
        if (void 0 !== o)
            return o.exports;
        var i = r[n] = {
            id: n,
            loaded: !1,
            exports: {}
        };
        return e[n](i, i.exports, t),
            i.loaded = !0,
            i.exports
    }
    t.n = function(e) {
            var r = e && e.__esModule ? function() {
                    return e.default
                } :
                function() {
                    return e
                };
            return t.d(r, {
                    a: r
                }),
                r
        },
        t.d = function(e, r) {
            for (var n in r)
                t.o(r, n) && !t.o(e, n) && Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: r[n]
                })
        },
        t.g = function() {
            if ("object" == typeof globalThis)
                return globalThis;
            try {
                return this || new Function("return this")()
            } catch (e) {
                if ("object" == typeof window)
                    return window
            }
        }(),
        t.o = function(e, r) {
            return Object.prototype.hasOwnProperty.call(e, r)
        },
        t.nmd = function(e) {
            return e.paths = [],
                e.children || (e.children = []),
                e
        },
        function() {
            "use strict";
            var e = function() {
                return e = Object.assign || function(e) {
                        for (var r, t = 1, n = arguments.length; t < n; t++)
                            for (var o in r = arguments[t])
                                Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
                        return e
                    },
                    e.apply(this, arguments)
            };

            function r(e, r, t, n) {
                return new(t || (t = Promise))((function(o, i) {
                    function u(e) {
                        try {
                            c(n.next(e))
                        } catch (e) {
                            i(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(n.throw(e))
                        } catch (e) {
                            i(e)
                        }
                    }

                    function c(e) {
                        var r;
                        e.done ? o(e.value) : (r = e.value,
                            r instanceof t ? r : new t((function(e) {
                                e(r)
                            }))).then(u, s)
                    }
                    c((n = n.apply(e, r || [])).next())
                }))
            }

            function n(e, r) {
                var t, n, o, i, u = {
                    label: 0,
                    sent: function() {
                        if (1 & o[0])
                            throw o[1];
                        return o[1]
                    },
                    trys: [],
                    ops: []
                };
                return i = {
                        next: s(0),
                        throw: s(1),
                        return: s(2)
                    },
                    "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                        return this
                    }),
                    i;

                function s(i) {
                    return function(s) {
                        return function(i) {
                            if (t)
                                throw new TypeError("Generator is already executing.");
                            for (; u;)
                                try {
                                    if (t = 1,
                                        n && (o = 2 & i[0] ? n.return : i[0] ? n.throw || ((o = n.return) && o.call(n),
                                            0) : n.next) && !(o = o.call(n, i[1])).done)
                                        return o;
                                    switch (n = 0,
                                        o && (i = [2 & i[0], o.value]),
                                        i[0]) {
                                        case 0:
                                        case 1:
                                            o = i;
                                            break;
                                        case 4:
                                            return u.label++, {
                                                value: i[1],
                                                done: !1
                                            };
                                        case 5:
                                            u.label++,
                                                n = i[1],
                                                i = [0];
                                            continue;
                                        case 7:
                                            i = u.ops.pop(),
                                                u.trys.pop();
                                            continue;
                                        default:
                                            if (!((o = (o = u.trys).length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
                                                u = 0;
                                                continue
                                            }
                                            if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
                                                u.label = i[1];
                                                break
                                            }
                                            if (6 === i[0] && u.label < o[1]) {
                                                u.label = o[1],
                                                    o = i;
                                                break
                                            }
                                            if (o && u.label < o[2]) {
                                                u.label = o[2],
                                                    u.ops.push(i);
                                                break
                                            }
                                            o[2] && u.ops.pop(),
                                                u.trys.pop();
                                            continue
                                    }
                                    i = r.call(e, u)
                                } catch (e) {
                                    i = [6, e],
                                        n = 0
                                } finally {
                                    t = o = 0
                                }
                            if (5 & i[0])
                                throw i[1];
                            return {
                                value: i[0] ? i[1] : void 0,
                                done: !0
                            }
                        }([i, s])
                    }
                }
            }
            Object.create,
                Object.create;
            var o = t(826),
                i = t(571),
                u = t.n(i)()({
                    level: "info"
                }),
                s = function(e, r, t) {
                    var n = function(e) {
                        return r(JSON.parse(e.detail))
                    };
                    return window.addEventListener("binance-chain-" + e, n, t), {
                        remove: function() {
                            window.removeEventListener("binance-chain-" + e, n)
                        }
                    }
                },
                c = function(r, t) {
                    r.detail ? t ? window.dispatchEvent(new CustomEvent("binance-chain-" + r.type, {
                        detail: JSON.stringify(e(e({}, r.detail), {
                            uuid: t
                        }))
                    })) : window.dispatchEvent(new CustomEvent("binance-chain-" + r.type, {
                        detail: JSON.stringify(r.detail)
                    })) : window.dispatchEvent(new CustomEvent("binance-chain-" + r.type, {
                        detail: JSON.stringify({
                            uuid: t
                        })
                    }))
                },
                a = t(137),
                d = t.n(a),
                f = {
                    "bbc-mainnet": "Binance-Chain-Tigris",
                    "bbc-testnet": "Binance-Chain-Ganges",
                    "bsc-mainnet": "0x38",
                    "bsc-testnet": "0x61",
                    "eth-mainnet": "0x01",
                    "ropsten-testnet": "0x03"
                },
                l = function(e) {
                    var r = e.networkId;
                    return f[r]
                },
                v = function(e) {
                    var r = (0,
                        o.Xy)(e);
                    return r.stack && delete r.stack,
                        u.error("RPC Error: " + r.message, r),
                        r
                };

            function h(e) {
                return h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } :
                    function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    },
                    h(e)
            }
            var p = 4294967295,
                g = Math.floor(Math.random() * p);

            function b(e, r, t) {
                return new Promise((function(n, o) {
                    var i, u, a, d, f, l = g = (g + 1) % p;
                    t ? (i = e,
                        u = function(e) {
                            e.error ? o(v(e.error)) : n(e.message)
                        },
                        a = l,
                        d = {
                            once: !0
                        },
                        f = function(e) {
                            return u(JSON.parse(e.detail))
                        },
                        window.addEventListener("binance-chain-" + i + "-" + a, f, d),
                        c({
                            type: r,
                            detail: t
                        }, l)) : (s(e, (function(e) {
                            e.error ? o(v(e.error)) : n(e.message)
                        }), {
                            once: !0
                        }),
                        c({
                            type: r
                        }))
                }))
            }
            var m = function e(r, t) {
                    for (var n = 0, o = Object.getOwnPropertyNames(r); n < o.length; n++) {
                        var i = o[n],
                            u = r[i];
                        u && "object" === h(u) && e(u, i)
                    }
                    return Object.defineProperty(r, t, {
                        writable: !1,
                        configurable: !1
                    })
                },
                y = function() {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(e) {
                            return [2, b("provideChainId", "requestChainId")]
                        }))
                    }))
                },
                w = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideNativeCoinBalance", "requestNativeCoinBalance", e)]
                        }))
                    }))
                },
                S = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideTransactionReceipt", "requestTransactionReceipt", e)]
                        }))
                    }))
                },
                j = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideEthCallResult", "requestEthCall", e)]
                        }))
                    }))
                },
                O = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideEstimateGas", "requestEstimateGas", e)]
                        }))
                    }))
                },
                E = function(t) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, new Promise((function(r, n) {
                                var i = (new Date).toISOString(),
                                    u = s("requestSignSucceeded", (function(e) {
                                        e.eventId === i && (r(e.result),
                                            u(),
                                            a())
                                    })).remove,
                                    a = s("requestSignFailed", (function(e) {
                                        e.eventId === i && (n(new o.Cg(o.Zk.rpc.internal, e.error).serialize()),
                                            a(),
                                            u())
                                    })).remove;
                                c({
                                    type: "requestSign",
                                    detail: e(e({}, t), {
                                        eventId: i
                                    })
                                })
                            }))]
                        }))
                    }))
                },
                _ = function(t) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, new Promise((function(r, n) {
                                var i = (new Date).toISOString(),
                                    u = s("requestSignSucceeded", (function(e) {
                                        e.eventId === i && (r(e.result),
                                            u(),
                                            a())
                                    })).remove,
                                    a = s("requestSignFailed", (function(e) {
                                        e.eventId === i && (n(new o.Cg(o.Zk.rpc.internal, e.error).serialize()),
                                            a(),
                                            u())
                                    })).remove;
                                c({
                                    type: "requestSign",
                                    detail: e(e({}, t), {
                                        eventId: i
                                    })
                                })
                            }))]
                        }))
                    }))
                },
                I = function(t) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, new Promise((function(r, n) {
                                var o = (new Date).toISOString(),
                                    i = s("requestSucceeded", (function(e) {
                                        e.eventId === o && (r(e.transactionHash),
                                            i(),
                                            u())
                                    })).remove,
                                    u = s("requestFailed", (function(e) {
                                        e.eventId === o && (n(e),
                                            u(),
                                            i())
                                    })).remove;
                                c({
                                    type: "request",
                                    detail: e(e({}, t), {
                                        eventId: o
                                    })
                                })
                            }))]
                        }))
                    }))
                },
                C = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideStorageAt", "requestStorageAt", e)]
                        }))
                    }))
                },
                P = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideTransactionCount", "requestTransactionCount", e)]
                        }))
                    }))
                },
                k = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideBlockTransactionCountByHash", "requestBlockTransactionCountByHash", e)]
                        }))
                    }))
                },
                x = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideBlockTransactionCountByNumber", "requestBlockTransactionCountByNumber", e)]
                        }))
                    }))
                },
                N = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideCode", "requestCode", e)]
                        }))
                    }))
                },
                q = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideBlockByHash", "requestBlockByHash", e)]
                        }))
                    }))
                },
                A = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideBlockByNumber", "requestBlockByNumber", e)]
                        }))
                    }))
                },
                B = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideTransactionByHash", "requestTransactionByHash", e)]
                        }))
                    }))
                },
                T = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideTransactionByBlockHashAndIndex", "requestTransactionByBlockHashAndIndex", e)]
                        }))
                    }))
                },
                R = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideTransactionByBlockNumberAndIndex", "requestTransactionByBlockNumberAndIndex", e)]
                        }))
                    }))
                },
                z = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideLogs", "requestLogs", e)]
                        }))
                    }))
                },
                F = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideClientVersion", "requestClientVersion", e)]
                        }))
                    }))
                },
                L = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideSha3", "requestSha3", e)]
                        }))
                    }))
                },
                M = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("providePeerCount", "requestPeerCount", e)]
                        }))
                    }))
                },
                J = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideListening", "requestListening", e)]
                        }))
                    }))
                },
                V = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideNewFilter", "requestNewFilter", e)]
                        }))
                    }))
                },
                D = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideNewBlockFilter", "requestNewBlockFilter", e)]
                        }))
                    }))
                },
                H = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideNewPendingTransactionFilter", "requestNewPendingTransactionFilter", e)]
                        }))
                    }))
                },
                G = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideUninstallFilter", "requestUninstallFilter", e)]
                        }))
                    }))
                },
                U = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideFilterChanges", "requestFilterChanges", e)]
                        }))
                    }))
                },
                X = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideFilterLogs", "requestFilterLogs", e)]
                        }))
                    }))
                },
                Z = function(e) {
                    return r(void 0, void 0, void 0, (function() {
                        return n(this, (function(r) {
                            return [2, b("provideSubscribe", "requestSubscribe", e)]
                        }))
                    }))
                };
            u.debug("BNB Chain Wallet in-page script loaded");
            var W = l({
                networkId: "bsc-mainnet"
            });
            s("onNetworkChanged", (function(e) {
                var r = e.network;
                W = l({
                    networkId: r.id
                })
            }));
            var $ = !1,
                K = !1,
                Q = {
                    get autoRefreshOnNetworkChange() {
                        return $
                    },
                    set autoRefreshOnNetworkChange(e) {
                        $ = e
                    },
                    get __isProvider() {
                        return K
                    },
                    set __isProvider(e) {
                        K = e
                    },
                    get chainId() {
                        return W
                    },
                    isConnected: function() {
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(e) {
                                return [2, !0]
                            }))
                        }))
                    },
                    request: function(t) {
                        return r(void 0, void 0, void 0, (function() {
                            var i, u, a, l, h;
                            return n(this, (function(p) {
                                switch (p.label) {
                                    case 0:
                                        switch (t.method) {
                                            case "eth_accounts":
                                                return [3, 1];
                                            case "eth_blockNumber":
                                                return [3, 2];
                                            case "eth_call":
                                                return [3, 3];
                                            case "eth_chainId":
                                                return [3, 4];
                                            case "eth_estimateGas":
                                                return [3, 5];
                                            case "eth_gasPrice":
                                                return [3, 6];
                                            case "eth_getBalance":
                                                return [3, 7];
                                            case "eth_getBlockByHash":
                                                return [3, 8];
                                            case "eth_getBlockByNumber":
                                                return [3, 9];
                                            case "eth_getBlockTransactionCountByHash":
                                                return [3, 10];
                                            case "eth_getBlockTransactionCountByNumber":
                                                return [3, 11];
                                            case "eth_getCode":
                                                return [3, 12];
                                            case "eth_getFilterChanges":
                                                return [3, 13];
                                            case "eth_getFilterLogs":
                                                return [3, 14];
                                            case "eth_getLogs":
                                                return [3, 15];
                                            case "eth_getStorageAt":
                                                return [3, 16];
                                            case "eth_getTransactionByBlockHashAndIndex":
                                                return [3, 17];
                                            case "eth_getTransactionByBlockNumberAndIndex":
                                                return [3, 18];
                                            case "eth_getTransactionByHash":
                                                return [3, 19];
                                            case "eth_getTransactionCount":
                                                return [3, 20];
                                            case "eth_getTransactionReceipt":
                                                return [3, 21];
                                            case "eth_hashrate":
                                                return [3, 22];
                                            case "eth_mining":
                                                return [3, 23];
                                            case "eth_newBlockFilter":
                                                return [3, 24];
                                            case "eth_newFilter":
                                                return [3, 25];
                                            case "eth_newPendingTransactionFilter":
                                                return [3, 26];
                                            case "eth_protocolVersion":
                                                return [3, 27];
                                            case "eth_requestAccounts":
                                                return [3, 28];
                                            case "eth_sendTransaction":
                                                return [3, 29];
                                            case "eth_sign":
                                                return [3, 30];
                                            case "personal_sign":
                                                return [3, 31];
                                            case "eth_subscribe":
                                                return [3, 32];
                                            case "eth_syncing":
                                                return [3, 33];
                                            case "eth_uninstallFilter":
                                                return [3, 34];
                                            case "net_listening":
                                                return [3, 35];
                                            case "net_peerCount":
                                                return [3, 36];
                                            case "net_version":
                                                return [3, 37];
                                            case "web3_clientVersion":
                                                return [3, 39];
                                            case "web3_sha3":
                                                return [3, 40];
                                            case "wallet_addEthereumChain":
                                                return [3, 41]
                                        }
                                        return [3, 42];
                                    case 1:
                                    case 28:
                                        return [2, r(void 0, void 0, void 0, (function() {
                                            return n(this, (function(e) {
                                                return [2, new Promise((function(e, r) {
                                                    s("provideSelectedAddress", (function(t) {
                                                            t.error ? r(t.error) : e([t.message])
                                                        }), {
                                                            once: !0
                                                        }),
                                                        c({
                                                            type: "requestSelectedAddress"
                                                        })
                                                }))]
                                            }))
                                        }))];
                                    case 2:
                                        return [2, r(void 0, void 0, void 0, (function() {
                                            return n(this, (function(e) {
                                                return [2, b("provideBlockNumber", "requestBlockNumber")]
                                            }))
                                        }))];
                                    case 3:
                                        return [2, j(t)];
                                    case 4:
                                        return [2, y()];
                                    case 5:
                                        return [2, O(t)];
                                    case 6:
                                        return [2, r(void 0, void 0, void 0, (function() {
                                            return n(this, (function(e) {
                                                return [2, b("provideGasPrice", "requestGasPrice")]
                                            }))
                                        }))];
                                    case 7:
                                        return [2, w(t)];
                                    case 8:
                                        return [2, q(t)];
                                    case 9:
                                        return [2, A(t)];
                                    case 10:
                                        return [2, k(t)];
                                    case 11:
                                        return [2, x(t)];
                                    case 12:
                                        return [2, N(t)];
                                    case 13:
                                        return [2, U(t)];
                                    case 14:
                                        return [2, X(t)];
                                    case 15:
                                        return [2, z(t)];
                                    case 16:
                                        return [2, C(t)];
                                    case 17:
                                        return [2, T(t)];
                                    case 18:
                                        return [2, R(t)];
                                    case 19:
                                        return [2, B(t)];
                                    case 20:
                                        return [2, P(t)];
                                    case 21:
                                        return [2, S(t)];
                                    case 22:
                                        return [2, r(void 0, void 0, void 0, (function() {
                                            return n(this, (function(e) {
                                                return [2, b("provideHashrate", "requestHashrate")]
                                            }))
                                        }))];
                                    case 23:
                                        return [2, r(void 0, void 0, void 0, (function() {
                                            return n(this, (function(e) {
                                                return [2, b("provideMining", "requestMining")]
                                            }))
                                        }))];
                                    case 24:
                                        return [2, D(t)];
                                    case 25:
                                        return [2, V(t)];
                                    case 26:
                                        return [2, H(t)];
                                    case 27:
                                        return [2, r(void 0, void 0, void 0, (function() {
                                            return n(this, (function(e) {
                                                return [2, b("provideProtocolVersion", "requestProtocolVersion")]
                                            }))
                                        }))];
                                    case 29:
                                        return [2, I(t)];
                                    case 30:
                                        return [2, E(t)];
                                    case 31:
                                        return [2, _(t)];
                                    case 32:
                                        return [2, Z(t)];
                                    case 33:
                                        return [2, r(void 0, void 0, void 0, (function() {
                                            return n(this, (function(e) {
                                                return [2, b("provideSyncing", "requestSyncing")]
                                            }))
                                        }))];
                                    case 34:
                                        return [2, G(t)];
                                    case 35:
                                        return [2, J(t)];
                                    case 36:
                                        return [2, M(t)];
                                    case 37:
                                        return [4, y()];
                                    case 38:
                                        return i = p.sent(), [2, parseInt(+i, 10)];
                                    case 39:
                                        return [2, F(t)];
                                    case 40:
                                        return [2, L(t)];
                                    case 41:
                                        return g = t.params[0].chainId,
                                            u = d()(f)[g], [2, Q.switchNetwork(u)];
                                    case 42:
                                        return [4, b("provideSender", "requestSender")];
                                    case 43:
                                        throw a = p.sent(),
                                            l = a.id,
                                            h = a.tab,
                                            v(o.Sy.rpc.methodNotFound({
                                                message: "The method '" + t.method + "' is not supported.",
                                                data: e(e({}, t), {
                                                    id: l,
                                                    jsonrpc: "2.0",
                                                    origin: null == h ? void 0 : h.url,
                                                    tabId: null == h ? void 0 : h.id
                                                })
                                            }))
                                }
                                var g
                            }))
                        }))
                    },
                    on: function(e, t) {
                        switch (e) {
                            case "connect":
                                ! function(e) {
                                    ! function() {
                                        r(this, void 0, void 0, (function() {
                                            var t;
                                            return n(this, (function(o) {
                                                switch (o.label) {
                                                    case 0:
                                                        return [4, r(void 0, void 0, void 0, (function() {
                                                            return n(this, (function(e) {
                                                                return [2, new Promise((function(e, r) {
                                                                    s("provideNetworkId", (function(t) {
                                                                            t.error ? r(t.error) : e(t.message)
                                                                        }), {
                                                                            once: !0
                                                                        }),
                                                                        c({
                                                                            type: "requestNetworkId"
                                                                        })
                                                                }))]
                                                            }))
                                                        }))];
                                                    case 1:
                                                        return t = o.sent(),
                                                            e({
                                                                chainId: l({
                                                                    networkId: t
                                                                })
                                                            }), [2]
                                                }
                                            }))
                                        }))
                                    }()
                                }(t);
                                break;
                            case "disconnect":
                                break;
                            case "accountsChanged":
                                s("onAccountChanged", (function(e) {
                                    var r = e.address;
                                    t([r])
                                }));
                                break;
                            case "chainChanged":
                                s("onNetworkChanged", (function(e) {
                                    var r = e.network;
                                    t(l({
                                        networkId: r.id
                                    }))
                                }))
                        }
                    },
                    bnbSign: function(t, i) {
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(u) {
                                return [2, (a = {
                                        method: "bnb_sign",
                                        params: [t, i]
                                    },
                                    r(void 0, void 0, void 0, (function() {
                                        return n(this, (function(r) {
                                            return [2, new Promise((function(r, t) {
                                                var n = (new Date).toISOString(),
                                                    i = s("requestBnbSignSucceeded", (function(e) {
                                                        e.eventId === n && (r(e.result),
                                                            i(),
                                                            u())
                                                    })).remove,
                                                    u = s("requestSignFailed", (function(e) {
                                                        e.eventId === n && (t(new o.Cg(o.Zk.rpc.internal, e.error).serialize()),
                                                            u(),
                                                            i())
                                                    })).remove;
                                                c({
                                                    type: "requestSign",
                                                    detail: e(e({}, a), {
                                                        eventId: n
                                                    })
                                                })
                                            }))]
                                        }))
                                    })))];
                                var a
                            }))
                        }))
                    },
                    bbcSignTx: function(e) {
                        var t = e.tx,
                            o = e.signMsg;
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(e) {
                                return [2, new Promise((function(e, r) {
                                    var n = (new Date).toISOString(),
                                        i = s("signBbcTxSucceeded", (function(r) {
                                            r.eventId === n && (e(r),
                                                i(),
                                                u())
                                        })).remove,
                                        u = s("signBbcTxFailed", (function(e) {
                                            e.eventId === n && (r(e),
                                                u(),
                                                i())
                                        })).remove;
                                    c({
                                        type: "requestBbcSignTx",
                                        detail: {
                                            bbcTx: t,
                                            signMsg: o,
                                            eventId: n
                                        }
                                    })
                                }))]
                            }))
                        }))
                    },
                    switchNetwork: function(e) {
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(r) {
                                return [2, new Promise((function(r, t) {
                                    var n = (new Date).toISOString(),
                                        o = s("switchNetworkSucceeded", (function(e) {
                                            e.eventId === n && (r(e),
                                                o(),
                                                i())
                                        })).remove,
                                        i = s("switchNetworkFailed", (function(e) {
                                            e.eventId === n && (t(e),
                                                i(),
                                                o())
                                        })).remove;
                                    c({
                                        type: "switchNetwork",
                                        detail: {
                                            networkId: e,
                                            eventId: n
                                        }
                                    })
                                }))]
                            }))
                        }))
                    },
                    requestAccounts: function() {
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(e) {
                                return [2, b("provideAccounts", "requestAccounts")]
                            }))
                        }))
                    },
                    requestAddresses: function() {
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(e) {
                                return [2, b("provideAddresses", "requestAddresses")]
                            }))
                        }))
                    },
                    transfer: function(t) {
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(r) {
                                return [2, new Promise((function(r, n) {
                                    var o = (new Date).toISOString(),
                                        i = s("transferSucceeded", (function(e) {
                                            e.eventId === o && (r(e),
                                                i(),
                                                u())
                                        })).remove,
                                        u = s("transferFailed", (function(e) {
                                            e.eventId === o && (n(e),
                                                u(),
                                                i())
                                        })).remove;
                                    c({
                                        type: "transfer",
                                        detail: e(e({}, t), {
                                            eventId: o
                                        })
                                    })
                                }))]
                            }))
                        }))
                    },
                    delegate: function(t) {
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(r) {
                                return [2, new Promise((function(r, n) {
                                    var o = (new Date).toISOString(),
                                        i = s("delegationSucceeded", (function(e) {
                                            e.eventId === o && (r(e),
                                                i(),
                                                u())
                                        })).remove,
                                        u = s("delegationFailed", (function(e) {
                                            e.eventId === o && (n(e),
                                                u(),
                                                i())
                                        })).remove;
                                    c({
                                        type: "delegate",
                                        detail: e(e({}, t), {
                                            eventId: o
                                        })
                                    })
                                }))]
                            }))
                        }))
                    },
                    redelegate: function(t) {
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(r) {
                                return [2, new Promise((function(r, n) {
                                    var o = (new Date).toISOString(),
                                        i = s("redelegationSucceeded", (function(e) {
                                            e.eventId === o && (r(e),
                                                i(),
                                                u())
                                        })).remove,
                                        u = s("redelegationFailed", (function(e) {
                                            e.eventId === o && (n(e),
                                                u(),
                                                i())
                                        })).remove;
                                    c({
                                        type: "redelegate",
                                        detail: e(e({}, t), {
                                            eventId: o
                                        })
                                    })
                                }))]
                            }))
                        }))
                    },
                    undelegate: function(t) {
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(r) {
                                return [2, new Promise((function(r, n) {
                                    var o = (new Date).toISOString(),
                                        i = s("undelegationSucceeded", (function(e) {
                                            e.eventId === o && (r(e),
                                                i(),
                                                u())
                                        })).remove,
                                        u = s("undelegationFailed", (function(e) {
                                            e.eventId === o && (n(e),
                                                u(),
                                                i())
                                        })).remove;
                                    c({
                                        type: "undelegate",
                                        detail: e(e({}, t), {
                                            eventId: o
                                        })
                                    })
                                }))]
                            }))
                        }))
                    },
                    enable: function() {
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(e) {
                                return [2, Q.request({
                                    method: "eth_requestAccounts"
                                })]
                            }))
                        }))
                    },
                    send: function(e, t) {
                        return r(void 0, void 0, void 0, (function() {
                            return n(this, (function(o) {
                                return [2, new Promise((function(o, i) {
                                    return r(void 0, void 0, void 0, (function() {
                                        var r;
                                        return n(this, (function(n) {
                                            switch (n.label) {
                                                case 0:
                                                    return "string" == typeof e || "function" != typeof t ? [3, 2] : [4, Q.sendAsync(e, t)];
                                                case 1:
                                                    return [2, n.sent()];
                                                case 2:
                                                    if ("string" == typeof e && (Array.isArray(t) || !t))
                                                        return [2, Q.request({
                                                            method: e,
                                                            params: t
                                                        }).then((function(r) {
                                                            return new Promise((function() {
                                                                o({
                                                                    id: "",
                                                                    jsonrpc: "2.0",
                                                                    method: e,
                                                                    result: r
                                                                })
                                                            }))
                                                        }), (function(e) {
                                                            return new Promise((function() {
                                                                i(e)
                                                            }))
                                                        }))];
                                                    if ("string" != typeof e && !t) {
                                                        if ("eth_accounts" !== (r = e.method) && "net_version" !== r)
                                                            throw new Error("does not support this method " + r);
                                                        Q.request({
                                                            method: e.method,
                                                            params: e.params
                                                        }).then((function(e) {
                                                            return o(e)
                                                        }), (function(e) {
                                                            return i(e)
                                                        }))
                                                    }
                                                    n.label = 3;
                                                case 3:
                                                    return [2]
                                            }
                                        }))
                                    }))
                                }))]
                            }))
                        }))
                    },
                    sendAsync: function(e, t) {
                        return r(void 0, void 0, void 0, (function() {
                            var r, o, i, u, s;
                            return n(this, (function(n) {
                                switch (n.label) {
                                    case 0:
                                        r = Array.isArray(e),
                                            n.label = 1;
                                    case 1:
                                        return n.trys.push([1, 3, , 4]),
                                            o = r ? e : [e], [4, Promise.all(o.map((function(e) {
                                                return Q.request({
                                                    method: e.method,
                                                    params: e.params
                                                })
                                            })))];
                                    case 2:
                                        return i = n.sent(),
                                            r ? (t(null, i.map((function(e, r) {
                                                var t = o[r];
                                                return {
                                                    id: t.id,
                                                    jsonrpc: t.jsonrpc,
                                                    result: e
                                                }
                                            }))), [3, 4]) : (t(null, {
                                                id: (u = e).id,
                                                jsonrpc: u.jsonrpc,
                                                result: i[0]
                                            }), [2]);
                                    case 3:
                                        return s = n.sent(),
                                            t(s, e), [3, 4];
                                    case 4:
                                        return [2]
                                }
                            }))
                        }))
                    }
                },
                Y = ["autoRefreshOnNetworkChange", "chainId", "__isProvider"];
            s("provideSettings", (function(e) {
                    var r, t = null === (r = e.message) || void 0 === r ? void 0 : r.isDefaultWallet;
                    window.BinanceChain = Q,
                        Object.preventExtensions(window.BinanceChain);
                    for (var n = function(e) {
                            if (-1 !== Y.findIndex((function(r) {
                                    return r === e
                                })))
                                return "continue";
                            e.startsWith("_") || m(window.BinanceChain, e)
                        }, o = 0, i = Object.getOwnPropertyNames(window.BinanceChain); o < i.length; o++)
                        n(i[o]);
                    t && (window.originEthereum = window.ethereum,
                        window.ethereum = Q)
                }), {
                    once: !0
                }),
                s("provideChainId", (function(e) {
                    W = e.message,
                        c({
                            type: "requestSettings"
                        })
                }), {
                    once: !0
                }),
                c({
                    type: "requestChainId"
                })
        }()
}();
//# sourceURL=chrome-extension://fhbohimaelbohpjbbldcngcnapndodjp/inpage.js