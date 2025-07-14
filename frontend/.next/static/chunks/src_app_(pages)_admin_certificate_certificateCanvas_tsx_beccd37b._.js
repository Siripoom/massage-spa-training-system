(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/app/admin/certificate/CertificateCanvas.tsx
// Component สำหรับแสดงผลและออกแบบใบประกาศด้วย Konva.js
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// import { Stage, Layer, Text, Image as KonvaImage, Rect } from 'react-konva';
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonva$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-konva/es/ReactKonva.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-konva/es/ReactKonvaCore.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// Base dimensions for the certificate design (A4 landscape ratio)
const DESIGN_WIDTH = 720;
const DESIGN_HEIGHT = 508.5;
const CertificateCanvas = ({ certificateData, onPositionChange, stageRef })=>{
    _s();
    // const [logoImage] = useImage(certificateData.schoolLogoUrl); 
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [stageWidth, setStageWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DESIGN_WIDTH);
    const [stageHeight, setStageHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DESIGN_HEIGHT);
    const [scale, setScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // Function to calculate stage size based on container
    const checkSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CertificateCanvas.useCallback[checkSize]": ()=>{
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                const newScale = containerWidth / DESIGN_WIDTH;
                setStageWidth(containerWidth);
                setStageHeight(DESIGN_HEIGHT * newScale);
                setScale(newScale);
            }
        }
    }["CertificateCanvas.useCallback[checkSize]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CertificateCanvas.useEffect": ()=>{
            checkSize();
            window.addEventListener('resize', checkSize);
            // Initial check in case component mounts when window is already resized
            // This is important for Next.js client-side rendering
            const timeoutId = setTimeout(checkSize, 0);
            return ({
                "CertificateCanvas.useEffect": ()=>{
                    window.removeEventListener('resize', checkSize);
                    clearTimeout(timeoutId);
                }
            })["CertificateCanvas.useEffect"];
        }
    }["CertificateCanvas.useEffect"], [
        checkSize
    ]);
    // Handler for all draggable elements (text) drag end
    const handleDragEnd = (e, elementName)=>{
        // Konva's x, y for Text are top-left. We store top-left in certificateData.
        // For draggable text, we want to store the center X and top Y.
        const newX = (e.target.x() + e.target.width() / 2) / scale;
        const newY = e.target.y() / scale;
        onPositionChange(elementName, {
            x: newX,
            y: newY
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        style: {
            width: '100%',
            aspectRatio: `${DESIGN_WIDTH} / ${DESIGN_HEIGHT}`,
            position: 'relative'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stage"], {
            width: stageWidth,
            height: stageHeight,
            ref: stageRef,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Layer"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"], {
                        x: 0,
                        y: 0,
                        width: DESIGN_WIDTH,
                        height: DESIGN_HEIGHT,
                        fill: certificateData.bgColor,
                        stroke: certificateData.mainBorderColor,
                        strokeWidth: certificateData.mainBorderWidth,
                        cornerRadius: certificateData.mainBorderRadius,
                        dash: certificateData.mainBorderStyle === 'dashed' ? [
                            certificateData.mainBorderDashLength,
                            certificateData.mainBorderDashGap
                        ] : undefined
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"], {
                        x: 20,
                        y: 20,
                        width: DESIGN_WIDTH - 40,
                        height: DESIGN_HEIGHT - 40,
                        stroke: certificateData.innerBorder1Color,
                        strokeWidth: certificateData.innerBorder1Width,
                        cornerRadius: 6,
                        dash: [
                            certificateData.innerBorder1DashLength,
                            certificateData.innerBorder1DashGap
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"], {
                        x: 25,
                        y: 25,
                        width: DESIGN_WIDTH - 50,
                        height: DESIGN_HEIGHT - 50,
                        stroke: certificateData.innerBorder2Color,
                        strokeWidth: certificateData.innerBorder2Width,
                        cornerRadius: 5
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: certificateData.title,
                        x: certificateData.titlePos.x,
                        y: certificateData.titlePos.y,
                        fontSize: certificateData.fontSize + 10,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "center",
                        width: DESIGN_WIDTH,
                        draggable: true,
                        onDragEnd: (e)=>handleDragEnd(e, 'title'),
                        offsetX: DESIGN_WIDTH / 2
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: "มอบให้แก่",
                        x: DESIGN_WIDTH / 2,
                        y: DESIGN_HEIGHT * 0.30,
                        fontSize: certificateData.fontSize,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "center",
                        width: DESIGN_WIDTH,
                        offsetX: DESIGN_WIDTH / 2
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: certificateData.studentName,
                        x: certificateData.studentNamePos.x,
                        y: certificateData.studentNamePos.y,
                        fontSize: certificateData.fontSize + 6,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "center",
                        width: DESIGN_WIDTH,
                        draggable: true,
                        onDragEnd: (e)=>handleDragEnd(e, 'studentName'),
                        offsetX: DESIGN_WIDTH / 2
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: "เพื่อแสดงว่าได้สำเร็จหลักสูตร",
                        x: DESIGN_WIDTH / 2,
                        y: DESIGN_HEIGHT * 0.55,
                        fontSize: certificateData.fontSize,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "center",
                        width: DESIGN_WIDTH,
                        offsetX: DESIGN_WIDTH / 2
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: certificateData.courseName,
                        x: certificateData.courseNamePos.x,
                        y: certificateData.courseNamePos.y,
                        fontSize: certificateData.fontSize + 6,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "center",
                        width: DESIGN_WIDTH,
                        draggable: true,
                        onDragEnd: (e)=>handleDragEnd(e, 'courseName'),
                        offsetX: DESIGN_WIDTH / 2
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: `ณ วันที่ ${certificateData.issueDate ? certificateData.issueDate.format('DD MMMM YYYY') : 'วันที่ออก'}`,
                        x: DESIGN_WIDTH / 2,
                        y: DESIGN_HEIGHT * 0.70,
                        fontSize: certificateData.fontSize - 4,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "center",
                        width: DESIGN_WIDTH,
                        offsetX: DESIGN_WIDTH / 2
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                        text: `(_________________________)\n${certificateData.signatureLine1}\n${certificateData.signatureLine2}`,
                        x: DESIGN_WIDTH - 250,
                        y: DESIGN_HEIGHT - 100,
                        fontSize: certificateData.fontSize - 4,
                        fontFamily: certificateData.fontFamily,
                        fill: certificateData.textColor,
                        align: "right",
                        width: 200
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
                        lineNumber: 238,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
            lineNumber: 100,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
};
_s(CertificateCanvas, "OQwIoJt2rqWy7x7IBuQ0+qLmBzQ=");
_c = CertificateCanvas;
const __TURBOPACK__default__export__ = CertificateCanvas;
var _c;
__turbopack_context__.k.register(_c, "CertificateCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(pages)/admin/certificate/certificateCanvas.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=src_app_%28pages%29_admin_certificate_certificateCanvas_tsx_beccd37b._.js.map