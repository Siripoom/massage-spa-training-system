(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/(pages)/admin/certificate/manage/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ManageCertificateTemplatePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/form/index.js [app-client] (ecmascript) <export default as Form>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$breadcrumb$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Breadcrumb$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/breadcrumb/index.js [app-client] (ecmascript) <export default as Breadcrumb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input-number/index.js [app-client] (ecmascript) <export default as InputNumber>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SaveOutlined.js [app-client] (ecmascript) <export default as SaveOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ArrowLeftOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ArrowLeftOutlined.js [app-client] (ecmascript) <export default as ArrowLeftOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HomeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/HomeOutlined.js [app-client] (ecmascript) <export default as HomeOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TrophyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrophyOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/TrophyOutlined.js [app-client] (ecmascript) <export default as TrophyOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AppstoreOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AppstoreOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/AppstoreOutlined.js [app-client] (ecmascript) <export default as AppstoreOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)"); // Ensure dynamic is imported
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].locale('th');
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"];
const { Text, Title: AntdTitle } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
const { TextArea } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
// Dynamically import CertificateCanvas to ensure it's client-side rendered
const DynamicCertificateCanvas = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx [app-client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i), {
    loadableGenerated: {
        modules: [
            "[project]/src/app/(pages)/admin/certificate/manage/certificateCanvas.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = DynamicCertificateCanvas;
// Base dimensions for the certificate design (A4 landscape ratio)
const DESIGN_WIDTH = 720;
const DESIGN_HEIGHT = 508.5;
// Predefined font options
const FONT_OPTIONS = [
    'Prompt',
    'Sarabun',
    'Thonburi',
    'Arial',
    'Times New Roman',
    'Inter',
    'Kanit',
    'Mitr',
    'Krub',
    'Anuphan',
    'IBM Plex Sans Thai'
];
// Default design elements for a Thai formal certificate template
const defaultDesignElements = {
    backgroundColor: '#F8F8F8',
    textColor: '#333333',
    fontFamily: 'Prompt',
    fontSize: 24,
    titleText: 'ประกาศนียบัตร',
    studentNamePlaceholder: 'นาย/นาง/นางสาว [ชื่อ-นามสกุล]',
    courseNamePlaceholder: 'หลักสูตร [ชื่อหลักสูตร]',
    issueDatePlaceholder: 'วันที่ [วันที่ออกเกียรติบัตร]',
    signatureText: 'ชื่อผู้บริหาร',
    signatureLine2: 'โรงเรียนนวดแผนไทย',
    logoUrl: 'https://placehold.co/100x50/cccccc/ffffff?text=Logo',
    // Default positions (relative to DESIGN_WIDTH/HEIGHT) - adjusted for a more formal Thai layout
    titlePosX: DESIGN_WIDTH / 2,
    titlePosY: DESIGN_HEIGHT * 0.15,
    studentNamePosX: DESIGN_WIDTH / 2,
    studentNamePosY: DESIGN_HEIGHT * 0.45,
    courseNamePosX: DESIGN_WIDTH / 2,
    courseNamePosY: DESIGN_HEIGHT * 0.65,
    issueDateTextPosX: DESIGN_WIDTH * 0.36,
    issueDateTextPosY: DESIGN_HEIGHT * 0.75,
    issueDateValuePosX: DESIGN_WIDTH * 0.44,
    issueDateValuePosY: DESIGN_HEIGHT * 0.75,
    signatureBlockPosX: DESIGN_WIDTH * 0.65,
    signatureBlockPosY: DESIGN_HEIGHT - 80,
    // Default border properties for a formal Thai look
    mainBorderWidth: 5,
    mainBorderColor: '#A52A2A',
    mainBorderRadius: 10,
    mainBorderStyle: 'solid',
    mainBorderDashLength: 0,
    mainBorderDashGap: 0,
    innerBorder1Width: 2,
    innerBorder1Color: '#8B4513',
    innerBorder1DashLength: 10,
    innerBorder1DashGap: 5,
    innerBorder2Width: 1,
    innerBorder2Color: '#CD853F'
};
// Initial template structure for SSR consistency
const initialTemplateState = {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
    templateName: '',
    description: '',
    status: 'Draft',
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().toISOString(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().toISOString(),
    designElements: defaultDesignElements
};
function ManageCertificateTemplatePage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const templateId = searchParams.get('id');
    const [form] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    const [certificateTemplate, setCertificateTemplate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTemplateState);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isEditMode, setIsEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const stageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // No longer using containerRef and currentScale for responsive scaling,
    // instead, we'll use overflow-x-auto for scrolling.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ManageCertificateTemplatePage.useEffect": ()=>{
            const initializeTemplate = {
                "ManageCertificateTemplatePage.useEffect.initializeTemplate": ()=>{
                    if (templateId) {
                        setIsEditMode(true);
                        try {
                            const storedTemplates = JSON.parse(localStorage.getItem('certificateTemplates') || '[]');
                            const foundTemplate = storedTemplates.find({
                                "ManageCertificateTemplatePage.useEffect.initializeTemplate.foundTemplate": (t)=>t.id === templateId
                            }["ManageCertificateTemplatePage.useEffect.initializeTemplate.foundTemplate"]);
                            if (foundTemplate) {
                                // Ensure designElements has all default properties if some are missing from old data
                                const mergedDesignElements = {
                                    ...defaultDesignElements,
                                    ...foundTemplate.designElements
                                };
                                setCertificateTemplate({
                                    ...foundTemplate,
                                    designElements: mergedDesignElements
                                });
                                form.setFieldsValue({
                                    ...foundTemplate,
                                    designElements: mergedDesignElements
                                });
                            } else {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('ไม่พบแม่แบบเกียรติบัตรที่ต้องการแก้ไข');
                                router.push('/admin/certificate');
                            }
                        } catch (error) {
                            console.error("Failed to parse certificateTemplates from localStorage", error);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('เกิดข้อผิดพลาดในการโหลดแม่แบบ');
                            router.push('/admin/certificate');
                        }
                    } else {
                        setIsEditMode(false);
                        form.setFieldsValue(initialTemplateState);
                    }
                    setLoading(false);
                }
            }["ManageCertificateTemplatePage.useEffect.initializeTemplate"];
            initializeTemplate();
        }
    }["ManageCertificateTemplatePage.useEffect"], [
        templateId,
        form,
        router
    ]);
    // This function is now called by draggable elements in CertificateCanvas
    const handlePositionChange = (elementName, newPos)=>{
        setCertificateTemplate((prev)=>{
            const updatedDesignElements = {
                ...prev.designElements
            };
            switch(elementName){
                case 'logo':
                    break;
                case 'title':
                    updatedDesignElements.titlePosX = newPos.x;
                    updatedDesignElements.titlePosY = newPos.y;
                    break;
                case 'studentName':
                    updatedDesignElements.studentNamePosX = newPos.x;
                    updatedDesignElements.studentNamePosY = newPos.y;
                    break;
                case 'courseName':
                    updatedDesignElements.courseNamePosX = newPos.x;
                    updatedDesignElements.courseNamePosY = newPos.y;
                    break;
                case 'issueDateText':
                    updatedDesignElements.issueDateTextPosX = newPos.x;
                    updatedDesignElements.issueDateTextPosY = newPos.y;
                    break;
                case 'issueDateValue':
                    updatedDesignElements.issueDateValuePosX = newPos.x;
                    updatedDesignElements.issueDateValuePosY = newPos.y;
                    break;
                case 'signatureBlock':
                    updatedDesignElements.signatureBlockPosX = newPos.x;
                    updatedDesignElements.signatureBlockPosY = newPos.y;
                    break;
            }
            form.setFieldsValue({
                designElements: updatedDesignElements
            });
            return {
                ...prev,
                designElements: updatedDesignElements,
                updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().toISOString()
            };
        });
    };
    const handleSaveTemplate = (status)=>{
        form.validateFields().then((values)=>{
            const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().toISOString();
            const finalTemplate = {
                ...certificateTemplate,
                templateName: values.templateName,
                description: values.description,
                status: status,
                designElements: values.designElements,
                createdAt: isEditMode ? certificateTemplate.createdAt : now,
                updatedAt: now
            };
            const storedTemplates = JSON.parse(localStorage.getItem('certificateTemplates') || '[]');
            let updatedTemplates;
            if (isEditMode) {
                updatedTemplates = storedTemplates.map((t)=>t.id === finalTemplate.id ? finalTemplate : t);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('อัปเดตแม่แบบเกียรติบัตรเรียบร้อย!');
            } else {
                updatedTemplates = [
                    ...storedTemplates,
                    finalTemplate
                ];
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('สร้างแม่แบบเกียรติบัตรใหม่เรียบร้อย!');
            }
            localStorage.setItem('certificateTemplates', JSON.stringify(updatedTemplates));
            router.push('/admin/certificate');
        }).catch((info)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('กรุณากรอกข้อมูลแม่แบบให้ครบถ้วน');
            console.log('Validate Failed:', info);
        });
    };
    const handleCancel = ()=>{
        router.push('/admin/certificate');
    };
    const breadcrumbItems = [
        {
            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/admin/dashboard",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HomeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeOutlined$3e$__["HomeOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                        lineNumber: 274,
                        columnNumber: 41
                    }, this),
                    " หน้าหลัก"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                lineNumber: 274,
                columnNumber: 14
            }, this)
        },
        {
            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/admin/certificate",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TrophyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrophyOutlined$3e$__["TrophyOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                        lineNumber: 277,
                        columnNumber: 43
                    }, this),
                    " เกียรติบัตร"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                lineNumber: 277,
                columnNumber: 14
            }, this)
        },
        {
            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/admin/certificate?tab=templates",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AppstoreOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AppstoreOutlined$3e$__["AppstoreOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                        lineNumber: 280,
                        columnNumber: 57
                    }, this),
                    " จัดการแม่แบบเกียรติบัตร"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                lineNumber: 280,
                columnNumber: 14
            }, this)
        },
        {
            title: templateId ? 'แก้ไขแม่แบบ' : 'สร้างแม่แบบใหม่'
        }
    ];
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                children: "กำลังโหลด..."
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                lineNumber: 290,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
            lineNumber: 289,
            columnNumber: 7
        }, this);
    }
    // Get current form values to check mainBorderStyle
    const currentFormValues = form.getFieldsValue();
    const currentMainBorderStyle = currentFormValues?.designElements?.mainBorderStyle;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$breadcrumb$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Breadcrumb$3e$__["Breadcrumb"], {
                className: "mb-6",
                items: breadcrumbItems
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                lineNumber: 302,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AntdTitle, {
                level: 1,
                className: "text-3xl font-bold mb-8 text-gray-800",
                children: templateId ? 'แก้ไขแม่แบบเกียรติบัตร' : 'สร้างแม่แบบเกียรติบัตรใหม่'
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                lineNumber: 304,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-10",
                children: [
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                        gutter: [
                            24,
                            24
                        ],
                        className: "h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                lg: 8,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                    className: "rounded-xl shadow-custom-light p-4 mb-8 h-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AntdTitle, {
                                            level: 4,
                                            className: "text-gray-700 mb-6",
                                            children: "ข้อมูลแม่แบบ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                            lineNumber: 312,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                maxHeight: 'calc(100vh - 250px)',
                                                overflowY: 'auto',
                                                paddingRight: '10px',
                                                paddingBottom: '20px'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
                                                form: form,
                                                layout: "vertical",
                                                name: "certificate_template_form",
                                                initialValues: certificateTemplate,
                                                onValuesChange: (_, allValues)=>{
                                                    setCertificateTemplate((prev)=>({
                                                            ...prev,
                                                            ...allValues,
                                                            designElements: {
                                                                ...prev.designElements,
                                                                ...allValues.designElements
                                                            },
                                                            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().toISOString()
                                                        }));
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: "templateName",
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ชื่อแม่แบบ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 334,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกชื่อแม่แบบ!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            placeholder: "เช่น ใบประกาศนวดแผนไทย",
                                                            className: "rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 337,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 332,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: "description",
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "คำอธิบาย"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 341,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextArea, {
                                                            rows: 3,
                                                            placeholder: "คำอธิบายแม่แบบเกียรติบัตร",
                                                            className: "rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AntdTitle, {
                                                        level: 5,
                                                        className: "text-gray-700 mt-6 mb-4",
                                                        children: "การออกแบบเกียรติบัตร"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 346,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'backgroundColor'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "สีพื้นหลัง"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 349,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกสีพื้นหลัง!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            type: "color",
                                                            className: "w-full h-10 rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 352,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'textColor'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "สีข้อความ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 356,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกสีข้อความ!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            type: "color",
                                                            className: "w-full h-10 rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'fontFamily'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "รูปแบบตัวอักษร"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกรูปแบบตัวอักษร!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                                            className: "rounded-lg",
                                                            placeholder: "เลือกรูปแบบตัวอักษร",
                                                            children: FONT_OPTIONS.map((font)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                                    value: font,
                                                                    children: font
                                                                }, font, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                                    lineNumber: 368,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'fontSize'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ขนาดตัวอักษรพื้นฐาน"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 374,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกขนาดตัวอักษร!',
                                                                type: 'number',
                                                                min: 10,
                                                                max: 72
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__["InputNumber"], {
                                                            min: 10,
                                                            max: 72,
                                                            className: "w-full rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 377,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'titleText'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ข้อความหัวเรื่อง"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 381,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกข้อความหัวเรื่อง!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            placeholder: "เช่น ประกาศนียบัตร",
                                                            className: "rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 384,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'studentNamePlaceholder'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ชื่อนักเรียน"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 388,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        tooltip: "ใช้สำหรับระบุตำแหน่งชื่อนักเรียนในเกียรติบัตร",
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอก Placeholder สำหรับชื่อนักเรียน!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            placeholder: "เช่น นายสมชาย ใจดี",
                                                            className: "rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 392,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 386,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'courseNamePlaceholder'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ชื่อหลักสูตร"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        tooltip: "ใช้สำหรับระบุตำแหน่งชื่อหลักสูตรในเกียรติบัตร",
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอก Placeholder สำหรับชื่อหลักสูตร!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            placeholder: "เช่น หลักสูตรนวดแผนไทยเบื้องต้น",
                                                            className: "rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 400,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'issueDatePlaceholder'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "วันที่ออก"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 404,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        tooltip: "ใช้สำหรับระบุตำแหน่งวันที่ออกเกียรติบัตร",
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอก Placeholder สำหรับวันที่ออก!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            placeholder: "เช่น 15 กรกฎาคม 2568",
                                                            className: "rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 408,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 402,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'signatureText'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ข้อความลายเซ็น 1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 412,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกข้อความลายเซ็น!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            placeholder: "เช่น ชื่อผู้บริหาร",
                                                            className: "rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 415,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 410,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'signatureLine2'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ข้อความลายเซ็น 2 (ไม่บังคับ)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 419,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            placeholder: "เช่น โรงเรียนนวดแผนไทย",
                                                            className: "rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 421,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'logoUrl'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "URL โลโก้ (ไม่บังคับ)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 425,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            placeholder: "URL รูปภาพโลโก้",
                                                            className: "rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 427,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 423,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AntdTitle, {
                                                        level: 5,
                                                        className: "text-gray-700 mt-6 mb-4",
                                                        children: "การตั้งค่ากรอบ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 430,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'mainBorderWidth'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ความหนาขอบนอก"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 433,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกความหนาขอบนอก!',
                                                                type: 'number',
                                                                min: 0
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__["InputNumber"], {
                                                            min: 0,
                                                            className: "w-full rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 436,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 431,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'mainBorderColor'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "สีขอบนอก"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 440,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกสีขอบนอก!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            type: "color",
                                                            className: "w-full h-10 rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 443,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 438,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'mainBorderRadius'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "รัศมีขอบนอก"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 447,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกรัศมีขอบนอก!',
                                                                type: 'number',
                                                                min: 0
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__["InputNumber"], {
                                                            min: 0,
                                                            className: "w-full rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 450,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'mainBorderStyle'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "รูปแบบขอบนอก"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 454,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกรูปแบบขอบนอก!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                                            className: "rounded-lg",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                                    value: "solid",
                                                                    children: "Solid"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                                    lineNumber: 458,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                                                    value: "dashed",
                                                                    children: "Dashed"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                                    lineNumber: 459,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 457,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 452,
                                                        columnNumber: 19
                                                    }, this),
                                                    currentMainBorderStyle === 'dashed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                                name: [
                                                                    'designElements',
                                                                    'mainBorderDashLength'
                                                                ],
                                                                label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-gray-700",
                                                                    children: "ความยาว Dash ขอบนอก"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                                    lineNumber: 466,
                                                                    columnNumber: 32
                                                                }, void 0),
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: 'กรุณากรอกความยาว Dash!',
                                                                        type: 'number',
                                                                        min: 0
                                                                    }
                                                                ],
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__["InputNumber"], {
                                                                    min: 0,
                                                                    className: "w-full rounded-lg"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                                    lineNumber: 469,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                                lineNumber: 464,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                                name: [
                                                                    'designElements',
                                                                    'mainBorderDashGap'
                                                                ],
                                                                label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-gray-700",
                                                                    children: "ช่องว่าง Dash ขอบนอก"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                                    lineNumber: 473,
                                                                    columnNumber: 32
                                                                }, void 0),
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: 'กรุณากรอกช่องว่าง Dash!',
                                                                        type: 'number',
                                                                        min: 0
                                                                    }
                                                                ],
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__["InputNumber"], {
                                                                    min: 0,
                                                                    className: "w-full rounded-lg"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                                    lineNumber: 476,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                                lineNumber: 471,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'innerBorder1Width'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ความหนาขอบใน 1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 483,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกความหนาขอบใน 1!',
                                                                type: 'number',
                                                                min: 0
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__["InputNumber"], {
                                                            min: 0,
                                                            className: "w-full rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 486,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 481,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'innerBorder1Color'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "สีขอบใน 1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 490,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกสีขอบใน 1!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            type: "color",
                                                            className: "w-full h-10 rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 493,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 488,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'innerBorder1DashLength'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ความยาว Dash ขอบใน 1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 497,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกความยาว Dash!',
                                                                type: 'number',
                                                                min: 0
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__["InputNumber"], {
                                                            min: 0,
                                                            className: "w-full rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 500,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 495,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'innerBorder1DashGap'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ช่องว่าง Dash ขอบใน 1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 504,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกช่องว่าง Dash!',
                                                                type: 'number',
                                                                min: 0
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__["InputNumber"], {
                                                            min: 0,
                                                            className: "w-full rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 507,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 502,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'innerBorder2Width'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "ความหนาขอบใน 2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 512,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณากรอกความหนาขอบใน 2!',
                                                                type: 'number',
                                                                min: 0
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2d$number$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__InputNumber$3e$__["InputNumber"], {
                                                            min: 0,
                                                            className: "w-full rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 515,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 510,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                        name: [
                                                            'designElements',
                                                            'innerBorder2Color'
                                                        ],
                                                        label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-gray-700",
                                                            children: "สีขอบใน 2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 519,
                                                            columnNumber: 28
                                                        }, void 0),
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกสีขอบใน 2!'
                                                            }
                                                        ],
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                            type: "color",
                                                            className: "w-full h-10 rounded-lg"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                            lineNumber: 522,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                        lineNumber: 517,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                lineNumber: 315,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                            lineNumber: 314,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                    lineNumber: 311,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                lg: 16,
                                className: "h-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                    className: "rounded-xl shadow-custom-light p-4 h-full flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AntdTitle, {
                                            level: 4,
                                            className: "text-gray-700 mb-6",
                                            children: "ตัวอย่างเกียรติบัตร"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                            lineNumber: 532,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-grow flex justify-center items-center min-h-[400px] w-full overflow-x-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DynamicCertificateCanvas, {
                                                certificateData: certificateTemplate.designElements,
                                                onPositionChange: handlePositionChange,
                                                stageRef: stageRef,
                                                scale: 0.95
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                                lineNumber: 535,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                            lineNumber: 534,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                    lineNumber: 531,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                lineNumber: 530,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                        justify: "end",
                        gutter: [
                            16,
                            16
                        ],
                        className: "mt-8 w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 8,
                                md: 6,
                                lg: 4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ArrowLeftOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftOutlined$3e$__["ArrowLeftOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                        lineNumber: 550,
                                        columnNumber: 21
                                    }, void 0),
                                    onClick: handleCancel,
                                    className: "rounded-lg shadow-md px-6 py-3 text-base w-full",
                                    children: "กลับ"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                    lineNumber: 549,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                lineNumber: 548,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 8,
                                md: 6,
                                lg: 4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__["SaveOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                        lineNumber: 560,
                                        columnNumber: 21
                                    }, void 0),
                                    onClick: ()=>handleSaveTemplate('Draft'),
                                    className: "bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base w-full",
                                    children: "บันทึกฉบับร่าง"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                    lineNumber: 558,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                lineNumber: 557,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                xs: 24,
                                sm: 8,
                                md: 6,
                                lg: 4,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__["SaveOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                        lineNumber: 570,
                                        columnNumber: 21
                                    }, void 0),
                                    onClick: ()=>handleSaveTemplate('Published'),
                                    className: "bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md px-6 py-3 text-base w-full",
                                    children: "เผยแพร่แม่แบบ"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                    lineNumber: 568,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                                lineNumber: 567,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                        lineNumber: 547,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(pages)/admin/certificate/manage/page.tsx",
        lineNumber: 301,
        columnNumber: 5
    }, this);
}
_s(ManageCertificateTemplatePage, "mykWv5M0V+xHZNCG4Ds8hgfdB30=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm
    ];
});
_c1 = ManageCertificateTemplatePage;
var _c, _c1;
__turbopack_context__.k.register(_c, "DynamicCertificateCanvas");
__turbopack_context__.k.register(_c1, "ManageCertificateTemplatePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_%28pages%29_admin_certificate_manage_page_tsx_4ccd8e5b._.js.map