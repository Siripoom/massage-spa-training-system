(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$v5$2d$patch$2d$for$2d$react$2d$19$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/v5-patch-for-react-19/es/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonva$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-konva/es/ReactKonva.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-konva/es/ReactKonvaCore.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// Base dimensions for the certificate design (A4 landscape ratio)
const DESIGN_WIDTH = 720;
const DESIGN_HEIGHT = 508.5;
const CertificateCanvas = ({ certificateData, onPositionChange, stageRef, scale = 1 })=>{
    _s();
    const [logoKonvaImage, setLogoKonvaImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Determine if dragging should be enabled (only if onPositionChange is not the no-op function)
    const isDraggable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CertificateCanvas.useCallback[isDraggable]": ()=>{
            // Check if onPositionChange is a function and not the exact no-op reference
            // This is a common pattern to enable/disable features based on prop existence/value
            return typeof onPositionChange === 'function' && onPositionChange.toString() !== ({
                "CertificateCanvas.useCallback[isDraggable]": ()=>{}
            })["CertificateCanvas.useCallback[isDraggable]"].toString();
        }
    }["CertificateCanvas.useCallback[isDraggable]"], [
        onPositionChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CertificateCanvas.useEffect": ()=>{
            if (certificateData.logoUrl) {
                const img = new window.Image();
                img.src = certificateData.logoUrl;
                img.crossOrigin = 'Anonymous'; // Important for CORS if image is external
                img.onload = ({
                    "CertificateCanvas.useEffect": ()=>{
                        setLogoKonvaImage(img);
                    }
                })["CertificateCanvas.useEffect"];
                img.onerror = ({
                    "CertificateCanvas.useEffect": ()=>{
                        console.error("Failed to load logo image for Konva:", certificateData.logoUrl);
                        setLogoKonvaImage(null);
                    }
                })["CertificateCanvas.useEffect"];
            } else {
                setLogoKonvaImage(null);
            }
        }
    }["CertificateCanvas.useEffect"], [
        certificateData.logoUrl
    ]);
    // Function to handle drag end for elements
    const handleDragEnd = (e, elementName)=>{
        const node = e.target;
        // Pass unscaled new positions back to the parent
        const newPosX = node.x() / scale;
        const newPosY = node.y() / scale;
        onPositionChange(elementName, {
            x: newPosX,
            y: newPosY
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: `${DESIGN_WIDTH * scale}px`,
            height: `${DESIGN_HEIGHT * scale}px`,
            position: 'relative'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stage"], {
            width: DESIGN_WIDTH * scale,
            height: DESIGN_HEIGHT * scale,
            ref: stageRef,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"], {
                        x: 0,
                        y: 0,
                        width: DESIGN_WIDTH * scale,
                        height: DESIGN_HEIGHT * scale,
                        fill: certificateData.backgroundColor,
                        stroke: certificateData.mainBorderColor,
                        strokeWidth: certificateData.mainBorderWidth * scale,
                        cornerRadius: certificateData.mainBorderRadius * scale,
                        dash: certificateData.mainBorderStyle === 'dashed' ? [
                            certificateData.mainBorderDashLength * scale,
                            certificateData.mainBorderDashGap * scale
                        ] : undefined
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"], {
                        x: 20 * scale,
                        y: 20 * scale,
                        width: DESIGN_WIDTH * scale - 40 * scale,
                        height: DESIGN_HEIGHT * scale - 40 * scale,
                        stroke: certificateData.innerBorder1Color,
                        strokeWidth: certificateData.innerBorder1Width * scale,
                        cornerRadius: 6 * scale,
                        dash: [
                            certificateData.innerBorder1DashLength * scale,
                            certificateData.innerBorder1DashGap * scale
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"], {
                        x: 25 * scale,
                        y: 25 * scale,
                        width: DESIGN_WIDTH * scale - 50 * scale,
                        height: DESIGN_HEIGHT * scale - 50 * scale,
                        stroke: certificateData.innerBorder2Color,
                        strokeWidth: certificateData.innerBorder2Width * scale,
                        cornerRadius: 5 * scale
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 134,
                        columnNumber: 11
                    }, this),
                    logoKonvaImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
                        image: logoKonvaImage,
                        x: 20 * scale,
                        y: 20 * scale,
                        width: 100 * scale,
                        height: 100 * scale,
                        draggable: isDraggable(),
                        onDragEnd: (e)=>handleDragEnd(e, 'logo')
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 146,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: certificateData.titleText,
                        x: 0,
                        y: certificateData.titlePosY * scale,
                        fontSize: (certificateData.fontSize + 10) * scale,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "center",
                        width: DESIGN_WIDTH * scale,
                        draggable: isDraggable(),
                        onDragEnd: (e)=>handleDragEnd(e, 'title')
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: "มอบให้แก่",
                        x: 0,
                        y: DESIGN_HEIGHT * 0.30 * scale,
                        fontSize: certificateData.fontSize * scale,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "center",
                        width: DESIGN_WIDTH * scale
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: certificateData.studentNamePlaceholder,
                        x: 0,
                        y: certificateData.studentNamePosY * scale,
                        fontSize: (certificateData.fontSize + 6) * scale,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "center",
                        width: DESIGN_WIDTH * scale,
                        draggable: isDraggable(),
                        onDragEnd: (e)=>handleDragEnd(e, 'studentName')
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: "เพื่อแสดงว่าได้สำเร็จหลักสูตร",
                        x: 0,
                        y: DESIGN_HEIGHT * 0.55 * scale,
                        fontSize: certificateData.fontSize * scale,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "center",
                        width: DESIGN_WIDTH * scale
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 198,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: certificateData.courseNamePlaceholder,
                        x: 0,
                        y: certificateData.courseNamePosY * scale,
                        fontSize: (certificateData.fontSize + 6) * scale,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "center",
                        width: DESIGN_WIDTH * scale,
                        draggable: isDraggable(),
                        onDragEnd: (e)=>handleDragEnd(e, 'courseName')
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: "ณ วันที่",
                        x: certificateData.issueDateTextPosX * scale,
                        y: certificateData.issueDateTextPosY * scale,
                        fontSize: (certificateData.fontSize - 8) * scale,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "left",
                        draggable: isDraggable(),
                        onDragEnd: (e)=>handleDragEnd(e, 'issueDateText')
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: certificateData.issueDatePlaceholder || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().format('DD MMMM YYYY'),
                        x: certificateData.issueDateValuePosX * scale,
                        y: certificateData.issueDateValuePosY * scale,
                        fontSize: (certificateData.fontSize - 8) * scale,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "left",
                        draggable: isDraggable(),
                        onDragEnd: (e)=>handleDragEnd(e, 'issueDateValue')
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 237,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: `(_________________________)\n\n${certificateData.signatureText}\n${certificateData.signatureLine2}`,
                        x: certificateData.signatureBlockPosX * scale,
                        y: certificateData.signatureBlockPosY * scale,
                        fontSize: (certificateData.fontSize - 12) * scale,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "right",
                        width: 200 * scale,
                        draggable: isDraggable(),
                        onDragEnd: (e)=>handleDragEnd(e, 'signatureBlock')
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
            lineNumber: 106,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
};
_s(CertificateCanvas, "OAN/UZ3FllcLdqE7QoAnC62TBkk=");
_c = CertificateCanvas;
const __TURBOPACK__default__export__ = CertificateCanvas;
var _c;
__turbopack_context__.k.register(_c, "CertificateCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=src_app_%28pages%29_admin_certificate_manage_certificateCanvas_tsx_e174a918._.js.map