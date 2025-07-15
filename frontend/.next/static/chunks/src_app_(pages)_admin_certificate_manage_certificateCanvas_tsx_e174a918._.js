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
const CertificateCanvas = ({ certificateData, stageRef })=>{
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [stageWidth, setStageWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DESIGN_WIDTH);
    const [stageHeight, setStageHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DESIGN_HEIGHT);
    const [scale, setScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [logoKonvaImage, setLogoKonvaImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CertificateCanvas.useEffect": ()=>{
            if (certificateData.logoUrl) {
                const img = new window.Image();
                img.src = certificateData.logoUrl;
                img.crossOrigin = 'Anonymous';
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
    // Function to render text with common properties (no dragging)
    const renderTextElement = (text, x, y, fontSize, align = 'center', width // Optional width for alignment
    )=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
            text: text,
            x: x * scale,
            y: y * scale,
            fontSize: fontSize * scale,
            fontFamily: certificateData.fontFamily,
            fill: certificateData.textColor,
            align: align,
            width: width ? width * scale : undefined
        }, void 0, false, {
            fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
            lineNumber: 113,
            columnNumber: 5
        }, this);
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
                        fill: certificateData.backgroundColor,
                        stroke: certificateData.mainBorderColor,
                        strokeWidth: certificateData.mainBorderWidth,
                        cornerRadius: certificateData.mainBorderRadius,
                        dash: certificateData.mainBorderStyle === 'dashed' ? [
                            certificateData.mainBorderDashLength,
                            certificateData.mainBorderDashGap
                        ] : undefined
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"], {
                        x: 20 * scale,
                        y: 20 * scale,
                        width: DESIGN_WIDTH * scale - 40 * scale,
                        height: DESIGN_HEIGHT * scale - 40 * scale,
                        stroke: certificateData.innerBorder1Color,
                        strokeWidth: certificateData.innerBorder1Width,
                        cornerRadius: 6 * scale,
                        dash: [
                            certificateData.innerBorder1DashLength,
                            certificateData.innerBorder1DashGap
                        ]
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Rect"], {
                        x: 25 * scale,
                        y: 25 * scale,
                        width: DESIGN_WIDTH * scale - 50 * scale,
                        height: DESIGN_HEIGHT * scale - 50 * scale,
                        stroke: certificateData.innerBorder2Color,
                        strokeWidth: certificateData.innerBorder2Width,
                        cornerRadius: 5 * scale
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    logoKonvaImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$konva$2f$es$2f$ReactKonvaCore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
                        image: logoKonvaImage,
                        x: 20 * scale,
                        y: 20 * scale,
                        width: 100 * scale,
                        height: 100 * scale
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                        lineNumber: 171,
                        columnNumber: 13
                    }, this),
                    renderTextElement(certificateData.titleText, 0, certificateData.titlePosY, certificateData.fontSize + 10, 'center', DESIGN_WIDTH // Ensure width is DESIGN_WIDTH for center alignment
                    ),
                    renderTextElement("มอบให้แก่", 0, DESIGN_HEIGHT * 0.30, certificateData.fontSize, 'center', DESIGN_WIDTH // Ensure width is DESIGN_WIDTH for center alignment
                    ),
                    renderTextElement(certificateData.studentNamePlaceholder, 0, certificateData.studentNamePosY, certificateData.fontSize + 6, 'center', DESIGN_WIDTH // Ensure width is DESIGN_WIDTH for center alignment
                    ),
                    renderTextElement("เพื่อแสดงว่าได้สำเร็จหลักสูตร", 0, DESIGN_HEIGHT * 0.55, certificateData.fontSize, 'center', DESIGN_WIDTH // Ensure width is DESIGN_WIDTH for center alignment
                    ),
                    renderTextElement(certificateData.courseNamePlaceholder, 0, certificateData.courseNamePosY, certificateData.fontSize + 6, 'center', DESIGN_WIDTH // Ensure width is DESIGN_WIDTH for center alignment
                    ),
                    renderTextElement("ณ วันที่", certificateData.issueDateTextPosX, certificateData.issueDateTextPosY, certificateData.fontSize - 8, 'left'),
                    renderTextElement(certificateData.issueDatePlaceholder || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().format('DD MMMM YYYY'), certificateData.issueDateValuePosX, certificateData.issueDateValuePosY, certificateData.fontSize - 8, 'left'),
                    renderTextElement(`(_________________________)\n\n${certificateData.signatureText}\n${certificateData.signatureLine2}`, certificateData.signatureBlockPosX, certificateData.signatureBlockPosY, certificateData.fontSize - 12, 'right', 200 // Fixed width for signature block
                    )
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
};
_s(CertificateCanvas, "uFQOhJBMnPk8Y/M4o5iz69tnyAk=");
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