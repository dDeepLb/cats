// ==UserScript==
// @name         CATS Loader
// @namespace    http://tampermonkey.net/
// @version      0.1test
// @description  Chat Auto Translator Addon
// @author       Ciber, dDeepLb and Chastity
// @match        https://bondage-europe.com/*
// @match        https://www.bondageprojects.elementfx.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bondage-europe.com
// @grant        none
// ==/UserScript==

var SDK = function () { "use strict"; const e = "1.1.0"; function o(e) { alert("Mod ERROR:\n" + e); const o = new Error(e); throw console.error(o), o } const t = new TextEncoder; function n(e) { return !!e && "object" == typeof e && !Array.isArray(e) } function r(e) { const o = new Set; return e.filter((e => !o.has(e) && o.add(e))) } const i = new Map, a = new Set; function d(e) { a.has(e) || (a.add(e), console.warn(e)) } function s(e) { const o = [], t = new Map, n = new Set; for (const r of p.values()) { const i = r.patching.get(e.name); if (i) { o.push(...i.hooks); for (const [o, a] of i.patches.entries()) t.has(o) && t.get(o) !== a && d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o) || ""}\nPatch2:\n${a}`), t.set(o, a), n.add(r.name) } } o.sort(((e, o) => o.priority - e.priority)); const r = function (e, o) { if (0 === o.size) return e; let t = e.toString().replaceAll("\r\n", "\n"); for (const [n, r] of o.entries()) t.includes(n) || d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`), t = t.replaceAll(n, r); return (0, eval)(`(${t})`) }(e.original, t); let i = function (o) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookChainExit) || void 0 === i ? void 0 : i.call(t, e.name, n), d = r.apply(this, o); return null == a || a(), d }; for (let t = o.length - 1; t >= 0; t--) { const n = o[t], r = i; i = function (o) { var t, i; const a = null === (i = (t = m.errorReporterHooks).hookEnter) || void 0 === i ? void 0 : i.call(t, e.name, n.mod), d = n.hook.apply(this, [o, e => { if (1 !== arguments.length || !Array.isArray(o)) throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`); return r.call(this, e) }]); return null == a || a(), d } } return { hooks: o, patches: t, patchesSources: n, enter: i, final: r } } function c(e, o = !1) { let r = i.get(e); if (r) o && (r.precomputed = s(r)); else { let o = window; const a = e.split("."); for (let t = 0; t < a.length - 1; t++)if (o = o[a[t]], !n(o)) throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0, t + 1).join(".")} is not object`); const d = o[a[a.length - 1]]; if ("function" != typeof d) throw new Error(`ModSDK: Function ${e} to be patched not found`); const c = function (e) { let o = -1; for (const n of t.encode(e)) { let e = 255 & (o ^ n); for (let o = 0; o < 8; o++)e = 1 & e ? -306674912 ^ e >>> 1 : e >>> 1; o = o >>> 8 ^ e } return ((-1 ^ o) >>> 0).toString(16).padStart(8, "0").toUpperCase() }(d.toString().replaceAll("\r\n", "\n")), l = { name: e, original: d, originalHash: c }; r = Object.assign(Object.assign({}, l), { precomputed: s(l), router: () => { }, context: o, contextProperty: a[a.length - 1] }), r.router = function (e) { return function (...o) { return e.precomputed.enter.apply(this, [o]) } }(r), i.set(e, r), o[r.contextProperty] = r.router } return r } function l() { const e = new Set; for (const o of p.values()) for (const t of o.patching.keys()) e.add(t); for (const o of i.keys()) e.add(o); for (const o of e) c(o, !0) } function f() { const e = new Map; for (const [o, t] of i) e.set(o, { name: o, original: t.original, originalHash: t.originalHash, sdkEntrypoint: t.router, currentEntrypoint: t.context[t.contextProperty], hookedByMods: r(t.precomputed.hooks.map((e => e.mod))), patchedByMods: Array.from(t.precomputed.patchesSources) }); return e } const p = new Map; function u(e) { p.get(e.name) !== e && o(`Failed to unload mod '${e.name}': Not registered`), p.delete(e.name), e.loaded = !1, l() } function g(e, t, r) { "string" == typeof e && "string" == typeof t && (alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`), e = { name: e, fullName: e, version: t }, t = { allowReplace: !0 === r }), e && "object" == typeof e || o("Failed to register mod: Expected info object, got " + typeof e), "string" == typeof e.name && e.name || o("Failed to register mod: Expected name to be non-empty string, got " + typeof e.name); let i = `'${e.name}'`; "string" == typeof e.fullName && e.fullName || o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`), i = `'${e.fullName} (${e.name})'`, "string" != typeof e.version && o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`), e.repository || (e.repository = void 0), void 0 !== e.repository && "string" != typeof e.repository && o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`), null == t && (t = {}), t && "object" == typeof t || o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`); const a = !0 === t.allowReplace, d = p.get(e.name); d && (d.allowReplace && a || o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`), u(d)); const s = e => { "string" == typeof e && e || o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`); let t = g.patching.get(e); return t || (t = { hooks: [], patches: new Map }, g.patching.set(e, t)), t }, f = { unload: () => u(g), hookFunction: (e, t, n) => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); const r = s(e); "number" != typeof t && o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`), "function" != typeof n && o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`); const a = { mod: g.name, priority: t, hook: n }; return r.hooks.push(a), l(), () => { const e = r.hooks.indexOf(a); e >= 0 && (r.hooks.splice(e, 1), l()) } }, patchFunction: (e, t) => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); const r = s(e); n(t) || o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`); for (const [n, a] of Object.entries(t)) "string" == typeof a ? r.patches.set(n, a) : null === a ? r.patches.delete(n) : o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`); l() }, removePatches: e => { g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`); s(e).patches.clear(), l() }, callOriginal: (e, t, n) => (g.loaded || o(`Mod ${i} attempted to call SDK function after being unloaded`), "string" == typeof e && e || o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`), Array.isArray(t) || o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`), function (e, o, t = window) { return c(e).original.apply(t, o) }(e, t, n)), getOriginalHash: e => ("string" == typeof e && e || o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`), c(e).originalHash) }, g = { name: e.name, fullName: e.fullName, version: e.version, repository: e.repository, allowReplace: a, api: f, loaded: !0, patching: new Map }; return p.set(e.name, g), Object.freeze(f) } function h() { const e = []; for (const o of p.values()) e.push({ name: o.name, fullName: o.fullName, version: o.version, repository: o.repository }); return e } let m; const y = function () { if (void 0 === window.bcModSdk) return window.bcModSdk = function () { const o = { version: e, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: f, errorReporterHooks: Object.seal({ hookEnter: null, hookChainExit: null }) }; return m = o, Object.freeze(o) }(); if (n(window.bcModSdk) || o("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== e && (alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk.version.startsWith("1.0.") && void 0 === window.bcModSdk._shim10register)) { const e = window.bcModSdk, o = Object.freeze(Object.assign(Object.assign({}, e), { registerMod: (o, t, n) => o && "object" == typeof o && "string" == typeof o.name && "string" == typeof o.version ? e.registerMod(o.name, o.version, "object" == typeof t && !!t && !0 === t.allowReplace) : e.registerMod(o, t, n), _shim10register: !0 })); window.bcModSdk = o } return window.bcModSdk }(); return "undefined" != typeof exports && (Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = y), y }();

var CATS = SDK.registerMod({
    name: "CATS",
    fullName: "Chat Auto Translator Script",
    version: "1.0",
    repository: "https://github.com/ciberweaboo/cats"
});

async function translate(message, sl, tl) {
    const response = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sl + "&tl=" + tl + "&dt=t&q=" + encodeURI(message));
    const json_response = await response.json();
    return json_response[0][0][0];
}

function waitInit() {
    CATS.hookFunction("LoginResponse", 0, (args, next) => {
        next(args);
        init();
    })
}

function init() {
    if (!Player?.OnlineSettings?.CATS) {
        Player.OnlineSettings.CATS = {
            sourceLang: "auto",
            targetLang: "en",
            enabled: false
        };
        ServerAccountUpdate.QueueData({
            OnlineSettings: Player.OnlineSettings
        });
    }



    CATS.hookFunction("ChatRoomMessage", 0, async (args, next) => {
        var message = args[0];

        if (message.Type === "Chat" && message.Sender !== Player.MemberNumber && Player.OnlineSettings.CATS.enabled) {
            var sourceMessage = message.Content;
            var finalMessage = await translate(sourceMessage, Player.OnlineSettings.CATS.sourceLang, Player.OnlineSettings.CATS.targetLang);
            message.Content = finalMessage;
            return next([message]);
        } else {
            return next(args);
        }
    })



    CommandCombine([
        {
            Tag: "ttoggle",
            Action: () => {
                if (!Player.OnlineSettings.CATS.enabled) {
                    Player.OnlineSettings.CATS.enabled = true;
                    ServerAccountUpdate.QueueData({
                        OnlineSettings: Player.OnlineSettings
                    });
                    ChatRoomSendLocal("Chat Translator is now ON", 3000);
                } else {
                    Player.OnlineSettings.CATS.enabled = false;
                    ServerAccountUpdate.QueueData({
                        OnlineSettings: Player.OnlineSettings
                    });
                    ChatRoomSendLocal("Chat Translator is now OFF", 3000);
                }
            }
        },
        {
            Tag: "tlang",
            Action: (targetLang) => {
                if (targetLang) {
                    if (["af","ay","sq","de","am","ar","hy","as","az","bm","bn","bho","be","my","bs","bg","km","kn","ca","ceb","cs","ny","zh-cn","zh-tw","si","ko","co","ht","hr","da","dv","doi","sk","sl","es","eo","et","eu","ee","fi","fr","fy","gd","cy","gl","ka","el","gn","gu","ha","haw","iw","hi","hmn","hu","ig","ilo","id","en","ga","is","it","ja","jw","kk","rw","ky","gom","kri","ku","ckb","lo","la","lv","ln","lt","lg","lb","mk","mai","ml","ms","mg","mt","mi","mr","mni-mtei","lus","mn","nl","ne","no","or","om","pa","ps","fa","pl","pt","qu","ro","ru","sm","sa","nso","sr","st","sn","sd","so","sw","sv","su","tl","th","ta","tt","tg","te","ti","ts","tr","tk","ak","uk","ug","ur","uz","vi","xh","yi","yo","zu"].includes(targetLang)) {
                        Player.OnlineSettings.CATS.targetLang = targetLang;
                        ServerAccountUpdate.QueueData({
                            OnlineSettings: Player.OnlineSettings
                        });
                        ChatRoomSendLocal(`Target language set to ${targetLang}`, 3000);
                    } else {
                        ChatRoomSendLocal(`Target language ${targetLang} is not available.`, 10000);
                        ChatRoomSendLocal("Supported languages: af,ay,sq,de,am,ar,hy,as,az,bm,bn,bho,be,my,bs,bg,km,kn,ca,ceb,cs,ny,zh-CN,zh-TW,si,ko,co,ht,hr,da,dv,doi,sk,sl,es,eo,et,eu,ee,fi,fr,fy,gd,cy,gl,ka,el,gn,gu,ha,haw,iw,hi,hmn,hu,ig,ilo,id,en,ga,is,it,ja,jw,kk,rw,ky,gom,kri,ku,ckb,lo,la,lv,ln,lt,lg,lb,mk,mai,ml,ms,mg,mt,mi,mr,mni-Mtei,lus,mn,nl,ne,no,or,om,pa,ps,fa,pl,pt,qu,ro,ru,sm,sa,nso,sr,st,sn,sd,so,sw,sv,su,tl,th,ta,tt,tg,te,ti,ts,tr,tk,ak,uk,ug,ur,uz,vi,xh,yi,yo,zu", 10000);
                    }
                } else {
                    ChatRoomSendLocal("No target lang provided", 3000);
                }
            }
        }
    ])
}

waitInit();
