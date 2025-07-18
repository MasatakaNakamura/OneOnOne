"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/goals/route";
exports.ids = ["app/api/goals/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fgoals%2Froute&page=%2Fapi%2Fgoals%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgoals%2Froute.ts&appDir=%2Fhome%2Fm-nakamura%2Fgithub%2FOneOnOne%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fm-nakamura%2Fgithub%2FOneOnOne&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fgoals%2Froute&page=%2Fapi%2Fgoals%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgoals%2Froute.ts&appDir=%2Fhome%2Fm-nakamura%2Fgithub%2FOneOnOne%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fm-nakamura%2Fgithub%2FOneOnOne&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_m_nakamura_github_OneOnOne_src_app_api_goals_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/goals/route.ts */ \"(rsc)/./src/app/api/goals/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/goals/route\",\n        pathname: \"/api/goals\",\n        filename: \"route\",\n        bundlePath: \"app/api/goals/route\"\n    },\n    resolvedPagePath: \"/home/m-nakamura/github/OneOnOne/src/app/api/goals/route.ts\",\n    nextConfigOutput,\n    userland: _home_m_nakamura_github_OneOnOne_src_app_api_goals_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/goals/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZnb2FscyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGZ29hbHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZnb2FscyUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGbS1uYWthbXVyYSUyRmdpdGh1YiUyRk9uZU9uT25lJTJGc3JjJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGbS1uYWthbXVyYSUyRmdpdGh1YiUyRk9uZU9uT25lJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNXO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb25lLW9uLW9uZS1hcHAvPzVlYTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL2hvbWUvbS1uYWthbXVyYS9naXRodWIvT25lT25PbmUvc3JjL2FwcC9hcGkvZ29hbHMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2dvYWxzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZ29hbHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2dvYWxzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvbS1uYWthbXVyYS9naXRodWIvT25lT25PbmUvc3JjL2FwcC9hcGkvZ29hbHMvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2dvYWxzL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fgoals%2Froute&page=%2Fapi%2Fgoals%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgoals%2Froute.ts&appDir=%2Fhome%2Fm-nakamura%2Fgithub%2FOneOnOne%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fm-nakamura%2Fgithub%2FOneOnOne&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/goals/route.ts":
/*!************************************!*\
  !*** ./src/app/api/goals/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\n\n\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"認証が必要です\"\n            }, {\n                status: 401\n            });\n        }\n        const { searchParams } = new URL(request.url);\n        const status = searchParams.get(\"status\");\n        const userId = searchParams.get(\"userId\");\n        // 基本的には自分の目標のみを取得\n        let whereClause = {\n            userId: userId || session.user.id\n        };\n        // ステータスでフィルタリング\n        if (status) {\n            whereClause.status = status;\n        }\n        // 上司の場合は部下の目標も取得可能\n        if (userId && userId !== session.user.id) {\n            // TODO: 権限チェック - 上司が部下の目標を見れるかチェック\n            // 今回は簡単にするため、MANAGERレベル以上なら他人の目標も見れることとする\n            const userRole = session.user.role;\n            if (![\n                \"MANAGER\",\n                \"DIRECTOR\",\n                \"EXECUTIVE\"\n            ].includes(userRole)) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    error: \"アクセス権限がありません\"\n                }, {\n                    status: 403\n                });\n            }\n        }\n        const goals = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.goal.findMany({\n            where: whereClause,\n            include: {\n                keyResults: true,\n                user: {\n                    select: {\n                        id: true,\n                        name: true,\n                        email: true,\n                        role: true\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(goals);\n    } catch (error) {\n        console.error(\"Error fetching goals:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"目標の取得に失敗しました\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"認証が必要です\"\n            }, {\n                status: 401\n            });\n        }\n        const { title, description, startDate, endDate, status, keyResults } = await request.json();\n        if (!title || !description || !startDate || !endDate) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"必要な情報が入力されていません\"\n            }, {\n                status: 400\n            });\n        }\n        // 目標を作成\n        const goal = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.goal.create({\n            data: {\n                title,\n                description,\n                startDate: new Date(startDate),\n                endDate: new Date(endDate),\n                status: status || \"DRAFT\",\n                userId: session.user.id\n            }\n        });\n        // Key Results を作成\n        if (keyResults && keyResults.length > 0) {\n            await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.keyResult.createMany({\n                data: keyResults.map((kr)=>({\n                        goalId: goal.id,\n                        title: kr.title,\n                        targetValue: kr.targetValue,\n                        currentValue: kr.currentValue || 0,\n                        unit: kr.unit\n                    }))\n            });\n        }\n        // 作成した目標を Key Results と一緒に取得\n        const createdGoal = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.goal.findUnique({\n            where: {\n                id: goal.id\n            },\n            include: {\n                keyResults: true,\n                user: {\n                    select: {\n                        id: true,\n                        name: true,\n                        email: true,\n                        role: true\n                    }\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(createdGoal, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Error creating goal:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"目標の作成に失敗しました\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFBVTtnQkFDbEJLLFFBQVFSLFFBQVFVLElBQUksQ0FBQ0MsRUFBRTtZQUN6QjtRQUNGO1FBRUEsa0JBQWtCO1FBQ2xCLElBQUlTLGNBQWNBLFdBQVdlLE1BQU0sR0FBRyxHQUFHO1lBQ3ZDLE1BQU10QywrQ0FBTUEsQ0FBQ3VDLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDO2dCQUNoQ0osTUFBTWIsV0FBV2tCLEdBQUcsQ0FBQyxDQUFDQyxLQUFhO3dCQUNqQ0MsUUFBUXhCLEtBQUtMLEVBQUU7d0JBQ2ZpQixPQUFPVyxHQUFHWCxLQUFLO3dCQUNmYSxhQUFhRixHQUFHRSxXQUFXO3dCQUMzQkMsY0FBY0gsR0FBR0csWUFBWSxJQUFJO3dCQUNqQ0MsTUFBTUosR0FBR0ksSUFBSTtvQkFDZjtZQUNGO1FBQ0Y7UUFFQSw2QkFBNkI7UUFDN0IsTUFBTUMsY0FBYyxNQUFNL0MsK0NBQU1BLENBQUNtQixJQUFJLENBQUM2QixVQUFVLENBQUM7WUFDL0MzQixPQUFPO2dCQUFFUCxJQUFJSyxLQUFLTCxFQUFFO1lBQUM7WUFDckJRLFNBQVM7Z0JBQ1BDLFlBQVk7Z0JBQ1pWLE1BQU07b0JBQ0pXLFFBQVE7d0JBQ05WLElBQUk7d0JBQ0pXLE1BQU07d0JBQ05DLE9BQU87d0JBQ1BWLE1BQU07b0JBQ1I7Z0JBQ0Y7WUFDRjtRQUNGO1FBRUEsT0FBT25CLHFEQUFZQSxDQUFDTyxJQUFJLENBQUMyQyxhQUFhO1lBQUV6QyxRQUFRO1FBQUk7SUFDdEQsRUFBRSxPQUFPRCxPQUFPO1FBQ2R3QixRQUFReEIsS0FBSyxDQUFDLHdCQUF3QkE7UUFDdEMsT0FBT1IscURBQVlBLENBQUNPLElBQUksQ0FDdEI7WUFBRUMsT0FBTztRQUFlLEdBQ3hCO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb25lLW9uLW9uZS1hcHAvLi9zcmMvYXBwL2FwaS9nb2Fscy9yb3V0ZS50cz80NTljIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG4gICAgXG4gICAgaWYgKCFzZXNzaW9uKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IFwi6KqN6Ki844GM5b+F6KaB44Gn44GZXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcXVlc3QudXJsKTtcbiAgICBjb25zdCBzdGF0dXMgPSBzZWFyY2hQYXJhbXMuZ2V0KFwic3RhdHVzXCIpO1xuICAgIGNvbnN0IHVzZXJJZCA9IHNlYXJjaFBhcmFtcy5nZXQoXCJ1c2VySWRcIik7XG5cbiAgICAvLyDln7rmnKznmoTjgavjga/oh6rliIbjga7nm67mqJnjga7jgb/jgpLlj5blvpdcbiAgICBsZXQgd2hlcmVDbGF1c2U6IGFueSA9IHtcbiAgICAgIHVzZXJJZDogdXNlcklkIHx8IHNlc3Npb24udXNlci5pZCxcbiAgICB9O1xuXG4gICAgLy8g44K544OG44O844K/44K544Gn44OV44Kj44Or44K/44Oq44Oz44KwXG4gICAgaWYgKHN0YXR1cykge1xuICAgICAgd2hlcmVDbGF1c2Uuc3RhdHVzID0gc3RhdHVzO1xuICAgIH1cblxuICAgIC8vIOS4iuWPuOOBruWgtOWQiOOBr+mDqOS4i+OBruebruaomeOCguWPluW+l+WPr+iDvVxuICAgIGlmICh1c2VySWQgJiYgdXNlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgIC8vIFRPRE86IOaoqemZkOODgeOCp+ODg+OCryAtIOS4iuWPuOOBjOmDqOS4i+OBruebruaomeOCkuimi+OCjOOCi+OBi+ODgeOCp+ODg+OCr1xuICAgICAgLy8g5LuK5Zue44Gv57Ch5Y2Y44Gr44GZ44KL44Gf44KB44CBTUFOQUdFUuODrOODmeODq+S7peS4iuOBquOCieS7luS6uuOBruebruaomeOCguimi+OCjOOCi+OBk+OBqOOBqOOBmeOCi1xuICAgICAgY29uc3QgdXNlclJvbGUgPSBzZXNzaW9uLnVzZXIucm9sZTtcbiAgICAgIGlmICghWydNQU5BR0VSJywgJ0RJUkVDVE9SJywgJ0VYRUNVVElWRSddLmluY2x1ZGVzKHVzZXJSb2xlKSkge1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgICAgeyBlcnJvcjogXCLjgqLjgq/jgrvjgrnmqKnpmZDjgYzjgYLjgorjgb7jgZvjgpNcIiB9LFxuICAgICAgICAgIHsgc3RhdHVzOiA0MDMgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdvYWxzID0gYXdhaXQgcHJpc21hLmdvYWwuZmluZE1hbnkoe1xuICAgICAgd2hlcmU6IHdoZXJlQ2xhdXNlLFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICBrZXlSZXN1bHRzOiB0cnVlLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgICAgIHJvbGU6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihnb2Fscyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGdvYWxzOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogXCLnm67mqJnjga7lj5blvpfjgavlpLHmlZfjgZfjgb7jgZfjgZ9cIiB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcbiAgICBcbiAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogXCLoqo3oqLzjgYzlv4XopoHjgafjgZlcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgeyB0aXRsZSwgZGVzY3JpcHRpb24sIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgc3RhdHVzLCBrZXlSZXN1bHRzIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcblxuICAgIGlmICghdGl0bGUgfHwgIWRlc2NyaXB0aW9uIHx8ICFzdGFydERhdGUgfHwgIWVuZERhdGUpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogXCLlv4XopoHjgarmg4XloLHjgYzlhaXlipvjgZXjgozjgabjgYTjgb7jgZvjgpNcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8g55uu5qiZ44KS5L2c5oiQXG4gICAgY29uc3QgZ29hbCA9IGF3YWl0IHByaXNtYS5nb2FsLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgc3RhcnREYXRlOiBuZXcgRGF0ZShzdGFydERhdGUpLFxuICAgICAgICBlbmREYXRlOiBuZXcgRGF0ZShlbmREYXRlKSxcbiAgICAgICAgc3RhdHVzOiBzdGF0dXMgfHwgXCJEUkFGVFwiLFxuICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBLZXkgUmVzdWx0cyDjgpLkvZzmiJBcbiAgICBpZiAoa2V5UmVzdWx0cyAmJiBrZXlSZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGF3YWl0IHByaXNtYS5rZXlSZXN1bHQuY3JlYXRlTWFueSh7XG4gICAgICAgIGRhdGE6IGtleVJlc3VsdHMubWFwKChrcjogYW55KSA9PiAoe1xuICAgICAgICAgIGdvYWxJZDogZ29hbC5pZCxcbiAgICAgICAgICB0aXRsZToga3IudGl0bGUsXG4gICAgICAgICAgdGFyZ2V0VmFsdWU6IGtyLnRhcmdldFZhbHVlLFxuICAgICAgICAgIGN1cnJlbnRWYWx1ZToga3IuY3VycmVudFZhbHVlIHx8IDAsXG4gICAgICAgICAgdW5pdDoga3IudW5pdCxcbiAgICAgICAgfSkpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8g5L2c5oiQ44GX44Gf55uu5qiZ44KSIEtleSBSZXN1bHRzIOOBqOS4gOe3kuOBq+WPluW+l1xuICAgIGNvbnN0IGNyZWF0ZWRHb2FsID0gYXdhaXQgcHJpc21hLmdvYWwuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogZ29hbC5pZCB9LFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICBrZXlSZXN1bHRzOiB0cnVlLFxuICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICBpZDogdHJ1ZSxcbiAgICAgICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgICAgIHJvbGU6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oY3JlYXRlZEdvYWwsIHsgc3RhdHVzOiAyMDEgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNyZWF0aW5nIGdvYWw6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiBcIuebruaomeOBruS9nOaIkOOBq+WkseaVl+OBl+OBvuOBl+OBn1wiIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsInByaXNtYSIsIkdFVCIsInJlcXVlc3QiLCJzZXNzaW9uIiwianNvbiIsImVycm9yIiwic3RhdHVzIiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwiZ2V0IiwidXNlcklkIiwid2hlcmVDbGF1c2UiLCJ1c2VyIiwiaWQiLCJ1c2VyUm9sZSIsInJvbGUiLCJpbmNsdWRlcyIsImdvYWxzIiwiZ29hbCIsImZpbmRNYW55Iiwid2hlcmUiLCJpbmNsdWRlIiwia2V5UmVzdWx0cyIsInNlbGVjdCIsIm5hbWUiLCJlbWFpbCIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJjb25zb2xlIiwiUE9TVCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJzdGFydERhdGUiLCJlbmREYXRlIiwiY3JlYXRlIiwiZGF0YSIsIkRhdGUiLCJsZW5ndGgiLCJrZXlSZXN1bHQiLCJjcmVhdGVNYW55IiwibWFwIiwia3IiLCJnb2FsSWQiLCJ0YXJnZXRWYWx1ZSIsImN1cnJlbnRWYWx1ZSIsInVuaXQiLCJjcmVhdGVkR29hbCIsImZpbmRVbmlxdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/goals/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\n\n\n\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__.PrismaAdapter)(_prisma__WEBPACK_IMPORTED_MODULE_4__.prisma),\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        }),\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = await _prisma__WEBPACK_IMPORTED_MODULE_4__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user || !user.passwordHash) {\n                    return null;\n                }\n                const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"].compare(credentials.password, user.passwordHash);\n                if (!isPasswordValid) {\n                    return null;\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role,\n                    departmentId: user.departmentId,\n                    clientCompanyName: user.clientCompanyName\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n                token.departmentId = user.departmentId;\n                token.clientCompanyName = user.clientCompanyName;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.departmentId = token.departmentId;\n                session.user.clientCompanyName = token.clientCompanyName;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/auth/signin\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ3FEO0FBQ0c7QUFDVTtBQUNwQztBQUNJO0FBRTNCLE1BQU1LLGNBQStCO0lBQzFDQyxTQUFTTixtRUFBYUEsQ0FBQ0ksMkNBQU1BO0lBQzdCRyxXQUFXO1FBQ1ROLHNFQUFjQSxDQUFDO1lBQ2JPLFVBQVVDLFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCO1lBQ3RDQyxjQUFjSCxRQUFRQyxHQUFHLENBQUNHLG9CQUFvQjtRQUNoRDtRQUNBWCwyRUFBbUJBLENBQUM7WUFDbEJZLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsT0FBTztvQkFBRUMsT0FBTztvQkFBU0MsTUFBTTtnQkFBUTtnQkFDdkNDLFVBQVU7b0JBQUVGLE9BQU87b0JBQVlDLE1BQU07Z0JBQVc7WUFDbEQ7WUFDQSxNQUFNRSxXQUFVTCxXQUFXO2dCQUN6QixJQUFJLENBQUNBLGFBQWFDLFNBQVMsQ0FBQ0QsYUFBYUksVUFBVTtvQkFDakQsT0FBTztnQkFDVDtnQkFFQSxNQUFNRSxPQUFPLE1BQU1qQiwyQ0FBTUEsQ0FBQ2lCLElBQUksQ0FBQ0MsVUFBVSxDQUFDO29CQUN4Q0MsT0FBTzt3QkFDTFAsT0FBT0QsWUFBWUMsS0FBSztvQkFDMUI7Z0JBQ0Y7Z0JBRUEsSUFBSSxDQUFDSyxRQUFRLENBQUNBLEtBQUtHLFlBQVksRUFBRTtvQkFDL0IsT0FBTztnQkFDVDtnQkFFQSxNQUFNQyxrQkFBa0IsTUFBTXRCLHdEQUFjLENBQzFDWSxZQUFZSSxRQUFRLEVBQ3BCRSxLQUFLRyxZQUFZO2dCQUduQixJQUFJLENBQUNDLGlCQUFpQjtvQkFDcEIsT0FBTztnQkFDVDtnQkFFQSxPQUFPO29CQUNMRSxJQUFJTixLQUFLTSxFQUFFO29CQUNYWCxPQUFPSyxLQUFLTCxLQUFLO29CQUNqQkYsTUFBTU8sS0FBS1AsSUFBSTtvQkFDZmMsTUFBTVAsS0FBS08sSUFBSTtvQkFDZkMsY0FBY1IsS0FBS1EsWUFBWTtvQkFDL0JDLG1CQUFtQlQsS0FBS1MsaUJBQWlCO2dCQUMzQztZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxTQUFTO1FBQ1BDLFVBQVU7SUFDWjtJQUNBQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVkLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSYyxNQUFNUixFQUFFLEdBQUdOLEtBQUtNLEVBQUU7Z0JBQ2xCUSxNQUFNUCxJQUFJLEdBQUdQLEtBQUtPLElBQUk7Z0JBQ3RCTyxNQUFNTixZQUFZLEdBQUdSLEtBQUtRLFlBQVk7Z0JBQ3RDTSxNQUFNTCxpQkFBaUIsR0FBR1QsS0FBS1MsaUJBQWlCO1lBQ2xEO1lBQ0EsT0FBT0s7UUFDVDtRQUNBLE1BQU1KLFNBQVEsRUFBRUEsT0FBTyxFQUFFSSxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsT0FBTztnQkFDVEosUUFBUVYsSUFBSSxDQUFDTSxFQUFFLEdBQUdRLE1BQU1SLEVBQUU7Z0JBQzFCSSxRQUFRVixJQUFJLENBQUNPLElBQUksR0FBR08sTUFBTVAsSUFBSTtnQkFDOUJHLFFBQVFWLElBQUksQ0FBQ1EsWUFBWSxHQUFHTSxNQUFNTixZQUFZO2dCQUM5Q0UsUUFBUVYsSUFBSSxDQUFDUyxpQkFBaUIsR0FBR0ssTUFBTUwsaUJBQWlCO1lBQzFEO1lBQ0EsT0FBT0M7UUFDVDtJQUNGO0lBQ0FLLE9BQU87UUFDTEMsUUFBUTtJQUNWO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL29uZS1vbi1vbmUtYXBwLy4vc3JjL2xpYi9hdXRoLnRzPzY2OTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gXCJAYXV0aC9wcmlzbWEtYWRhcHRlclwiO1xuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiLi9wcmlzbWFcIjtcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSBhcyBhbnksXG4gIHByb3ZpZGVyczogW1xuICAgIEdvb2dsZVByb3ZpZGVyKHtcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEISxcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQhLFxuICAgIH0pLFxuICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xuICAgICAgbmFtZTogXCJjcmVkZW50aWFsc1wiLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXVzZXIgfHwgIXVzZXIucGFzc3dvcmRIYXNoKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShcbiAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkSGFzaFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgZGVwYXJ0bWVudElkOiB1c2VyLmRlcGFydG1lbnRJZCxcbiAgICAgICAgICBjbGllbnRDb21wYW55TmFtZTogdXNlci5jbGllbnRDb21wYW55TmFtZSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gIH0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcbiAgICAgICAgdG9rZW4ucm9sZSA9IHVzZXIucm9sZTtcbiAgICAgICAgdG9rZW4uZGVwYXJ0bWVudElkID0gdXNlci5kZXBhcnRtZW50SWQ7XG4gICAgICAgIHRva2VuLmNsaWVudENvbXBhbnlOYW1lID0gdXNlci5jbGllbnRDb21wYW55TmFtZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nO1xuICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGUgYXMgYW55O1xuICAgICAgICBzZXNzaW9uLnVzZXIuZGVwYXJ0bWVudElkID0gdG9rZW4uZGVwYXJ0bWVudElkIGFzIHN0cmluZztcbiAgICAgICAgc2Vzc2lvbi51c2VyLmNsaWVudENvbXBhbnlOYW1lID0gdG9rZW4uY2xpZW50Q29tcGFueU5hbWUgYXMgc3RyaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46IFwiL2F1dGgvc2lnbmluXCIsXG4gIH0sXG59OyJdLCJuYW1lcyI6WyJQcmlzbWFBZGFwdGVyIiwiR29vZ2xlUHJvdmlkZXIiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiYmNyeXB0IiwicHJpc21hIiwiYXV0aE9wdGlvbnMiLCJhZGFwdGVyIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJwYXNzd29yZEhhc2giLCJpc1Bhc3N3b3JkVmFsaWQiLCJjb21wYXJlIiwiaWQiLCJyb2xlIiwiZGVwYXJ0bWVudElkIiwiY2xpZW50Q29tcGFueU5hbWUiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInBhZ2VzIiwic2lnbkluIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUlqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSSxJQUFJSCx3REFBWUEsR0FBRztBQUVuRSxJQUFJSSxJQUFxQyxFQUFFSCxnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vbmUtb24tb25lLWFwcC8uL3NyYy9saWIvcHJpc21hLnRzPzAxZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hOyJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/cookie","vendor-chunks/@auth","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fgoals%2Froute&page=%2Fapi%2Fgoals%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgoals%2Froute.ts&appDir=%2Fhome%2Fm-nakamura%2Fgithub%2FOneOnOne%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fm-nakamura%2Fgithub%2FOneOnOne&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();