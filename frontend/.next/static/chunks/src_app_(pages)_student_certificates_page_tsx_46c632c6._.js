(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/(pages)/student/certificates/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// src/app/(pages)/student/certificates/page.tsx
__turbopack_context__.s({
    "default": (()=>StudentCertificatesPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$empty$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Empty$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/empty/index.js [app-client] (ecmascript) <export default as Empty>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/badge/index.js [app-client] (ecmascript) <export default as Badge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/tag/index.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/divider/index.js [app-client] (ecmascript) <export default as Divider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TrophyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrophyOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/TrophyOutlined.js [app-client] (ecmascript) <export default as TrophyOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DownloadOutlined.js [app-client] (ecmascript) <export default as DownloadOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SearchOutlined.js [app-client] (ecmascript) <export default as SearchOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$FilterOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FilterOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/FilterOutlined.js [app-client] (ecmascript) <export default as FilterOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EyeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EyeOutlined.js [app-client] (ecmascript) <export default as EyeOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/CalendarOutlined.js [app-client] (ecmascript) <export default as CalendarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$StarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StarOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/StarOutlined.js [app-client] (ecmascript) <export default as StarOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ShareAltOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShareAltOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ShareAltOutlined.js [app-client] (ecmascript) <export default as ShareAltOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PrinterOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PrinterOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PrinterOutlined.js [app-client] (ecmascript) <export default as PrinterOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ClockCircleOutlined.js [app-client] (ecmascript) <export default as ClockCircleOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const { Title, Text } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
const { Search } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"];
// Mock data
const mockCertificates = [
    {
        id: 'cert-001',
        courseName: 'หลักสูตรการนวดแผนไทยพื้นฐาน',
        courseId: 'course-1',
        studentName: 'นักเรียน ทดสอบ',
        instructorName: 'อาจารย์สมศรี ใจดี',
        issueDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(1, 'month').toISOString(),
        completionDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(1, 'month').subtract(3, 'day').toISOString(),
        certificateNumber: 'MT-2024-001',
        grade: 'ดีเยี่ยม',
        hours: 30,
        skills: [
            'การนวดแผนไทย',
            'การใช้แรงกด',
            'การดูแลสุขภาพ'
        ],
        status: 'active',
        template: 'traditional',
        verificationCode: 'VER-2024-001'
    },
    {
        id: 'cert-002',
        courseName: 'หลักสูตรการนวดอโรม่า',
        courseId: 'course-2',
        studentName: 'นักเรียน ทดสอบ',
        instructorName: 'อาจารย์วิไล สวยงาม',
        issueDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(2, 'week').toISOString(),
        completionDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(2, 'week').subtract(2, 'day').toISOString(),
        certificateNumber: 'AR-2024-002',
        grade: 'ดี',
        hours: 25,
        skills: [
            'การนวดอโรม่า',
            'การผสมน้ำมันหอมระเหย',
            'การบำบัดด้วยกลิ่น'
        ],
        status: 'active',
        template: 'spa',
        verificationCode: 'VER-2024-002'
    },
    {
        id: 'cert-003',
        courseName: 'หลักสูตรการนวดเพื่อสุขภาพ',
        courseId: 'course-3',
        studentName: 'นักเรียน ทดสอบ',
        instructorName: 'อาจารย์ดร.สุธี เก่งมาก',
        issueDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(6, 'month').toISOString(),
        completionDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().subtract(6, 'month').subtract(5, 'day').toISOString(),
        certificateNumber: 'HM-2023-045',
        grade: 'ดีมาก',
        hours: 40,
        skills: [
            'การนวดบำบัด',
            'การดูแลผู้ป่วย',
            'การประเมินอาการ'
        ],
        status: 'active',
        template: 'modern',
        verificationCode: 'VER-2023-045'
    }
];
function StudentCertificatesPage() {
    _s();
    const [certificates, setCertificates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredCertificates, setFilteredCertificates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedCertificate, setSelectedCertificate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalVisible, setIsModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentCertificatesPage.useEffect": ()=>{
            // Simulate loading data
            setCertificates(mockCertificates);
        }
    }["StudentCertificatesPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StudentCertificatesPage.useEffect": ()=>{
            // Filter certificates based on search term and status
            let filtered = certificates;
            if (searchTerm) {
                filtered = filtered.filter({
                    "StudentCertificatesPage.useEffect": (cert)=>cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) || cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
                }["StudentCertificatesPage.useEffect"]);
            }
            if (statusFilter !== 'all') {
                filtered = filtered.filter({
                    "StudentCertificatesPage.useEffect": (cert)=>cert.status === statusFilter
                }["StudentCertificatesPage.useEffect"]);
            }
            setFilteredCertificates(filtered);
        }
    }["StudentCertificatesPage.useEffect"], [
        certificates,
        searchTerm,
        statusFilter
    ]);
    const handleViewCertificate = (certificate)=>{
        setSelectedCertificate(certificate);
        setIsModalVisible(true);
    };
    const handleDownloadCertificate = (certificate)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success(`กำลังดาวน์โหลดเกียรติบัตร: ${certificate.courseName}`);
        console.log('Download certificate:', certificate.id);
    };
    const handleShareCertificate = (certificate)=>{
        // Copy verification link to clipboard
        const verificationLink = `https://lms.example.com/verify/${certificate.verificationCode}`;
        navigator.clipboard.writeText(verificationLink);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('คัดลอกลิงก์สำหรับยืนยันเกียรติบัตรแล้ว');
    };
    const handlePrintCertificate = (certificate)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].info(`กำลังเตรียมพิมพ์เกียรติบัตร: ${certificate.courseName}`);
        console.log('Print certificate:', certificate.id);
    };
    const getStatusColor = (status)=>{
        switch(status){
            case 'active':
                return 'success';
            case 'expired':
                return 'warning';
            case 'revoked':
                return 'error';
            default:
                return 'default';
        }
    };
    const getStatusText = (status)=>{
        switch(status){
            case 'active':
                return 'ใช้งานได้';
            case 'expired':
                return 'หมดอายุ';
            case 'revoked':
                return 'ยกเลิก';
            default:
                return 'ไม่ทราบสถานะ';
        }
    };
    const getGradeColor = (grade)=>{
        switch(grade){
            case 'ดีเยี่ยม':
                return '#52c41a';
            case 'ดีมาก':
                return '#1890ff';
            case 'ดี':
                return '#faad14';
            case 'พอใช้':
                return '#fa8c16';
            default:
                return '#666';
        }
    };
    const renderCertificateCard = (certificate)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
            className: "content-card",
            style: {
                height: '100%'
            },
            cover: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 180,
                    background: `linear-gradient(135deg, ${certificate.template === 'traditional' ? '#8bc34a, #4caf50' : certificate.template === 'spa' ? '#2196f3, #03a9f4' : '#ff9800, #ffc107'})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    position: 'relative',
                    borderRadius: '8px 8px 0 0'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TrophyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrophyOutlined$3e$__["TrophyOutlined"], {
                        style: {
                            fontSize: 48,
                            opacity: 0.8
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 194,
                        columnNumber: 11
                    }, void 0),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: 12,
                            right: 12
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                            status: getStatusColor(certificate.status),
                            text: getStatusText(certificate.status),
                            style: {
                                background: 'rgba(255,255,255,0.95)',
                                padding: '4px 8px',
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 500
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, void 0)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                lineNumber: 182,
                columnNumber: 9
            }, void 0),
            actions: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                    type: "text",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EyeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOutlined$3e$__["EyeOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 214,
                        columnNumber: 17
                    }, void 0),
                    onClick: ()=>handleViewCertificate(certificate),
                    style: {
                        width: '100%'
                    },
                    children: "ดูรายละเอียด"
                }, "view", false, {
                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                    lineNumber: 211,
                    columnNumber: 9
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                    type: "text",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__["DownloadOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 223,
                        columnNumber: 17
                    }, void 0),
                    onClick: ()=>handleDownloadCertificate(certificate),
                    style: {
                        width: '100%'
                    },
                    children: "ดาวน์โหลด"
                }, "download", false, {
                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, void 0),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                    type: "text",
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ShareAltOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShareAltOutlined$3e$__["ShareAltOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 232,
                        columnNumber: 17
                    }, void 0),
                    onClick: ()=>handleShareCertificate(certificate),
                    style: {
                        width: '100%'
                    },
                    children: "แชร์"
                }, "share", false, {
                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                    lineNumber: 229,
                    columnNumber: 9
                }, void 0)
            ],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"].Meta, {
                title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: 8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                            level: 5,
                            style: {
                                margin: 0,
                                color: '#5d4037',
                                lineHeight: 1.3
                            },
                            children: certificate.courseName
                        }, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 243,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                            type: "secondary",
                            style: {
                                fontSize: 12
                            },
                            children: [
                                "เลขที่: ",
                                certificate.certificateNumber
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 246,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                    lineNumber: 242,
                    columnNumber: 11
                }, void 0),
                description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                        direction: "vertical",
                        size: "middle",
                        style: {
                            width: '100%'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                        strong: true,
                                        style: {
                                            color: '#5d4037'
                                        },
                                        children: "ผู้สอน: "
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 255,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                        children: certificate.instructorName
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 256,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                lineNumber: 254,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$CalendarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarOutlined$3e$__["CalendarOutlined"], {
                                                style: {
                                                    marginRight: 6,
                                                    color: '#666'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 261,
                                                columnNumber: 19
                                            }, void 0),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                type: "secondary",
                                                style: {
                                                    fontSize: 13
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(certificate.issueDate).format('DD MMM YYYY')
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 262,
                                                columnNumber: 19
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                        color: getGradeColor(certificate.grade),
                                        style: {
                                            margin: 0
                                        },
                                        children: certificate.grade || 'ผ่าน'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 266,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                lineNumber: 259,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                        type: "secondary",
                                        style: {
                                            fontSize: 13
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ClockCircleOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClockCircleOutlined$3e$__["ClockCircleOutlined"], {
                                                style: {
                                                    marginRight: 4
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 273,
                                                columnNumber: 19
                                            }, void 0),
                                            certificate.hours,
                                            " ชั่วโมง"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 272,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                        type: "secondary",
                                        style: {
                                            fontSize: 12
                                        },
                                        children: certificate.template === 'traditional' ? '🏛️ แบบดั้งเดิม' : certificate.template === 'spa' ? '🌸 แบบสปา' : '✨ แบบโมเดิร์น'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 276,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                lineNumber: 271,
                                columnNumber: 15
                            }, void 0),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                        strong: true,
                                        style: {
                                            fontSize: 12,
                                            color: '#5d4037'
                                        },
                                        children: "ทักษะที่ได้รับ:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 283,
                                        columnNumber: 17
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 6
                                        },
                                        children: [
                                            certificate.skills.slice(0, 2).map((skill, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                    style: {
                                                        fontSize: 11,
                                                        marginBottom: 4,
                                                        marginRight: 4
                                                    },
                                                    children: skill
                                                }, index, false, {
                                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 21
                                                }, void 0)),
                                            certificate.skills.length > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                style: {
                                                    fontSize: 11,
                                                    background: '#f0f0f0',
                                                    border: 'dashed 1px #d9d9d9'
                                                },
                                                children: [
                                                    "+",
                                                    certificate.skills.length - 2,
                                                    " เพิ่มเติม"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 291,
                                                columnNumber: 21
                                            }, void 0)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 17
                                    }, void 0)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                lineNumber: 282,
                                columnNumber: 15
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 253,
                        columnNumber: 13
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                    lineNumber: 252,
                    columnNumber: 11
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this)
        }, certificate.id, false, {
            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
            lineNumber: 177,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "dashboard-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "dashboard-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "dashboard-title",
                                children: "เกียรติบัตรของฉัน"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "dashboard-subtitle",
                                children: "จัดการและดาวน์โหลดเกียรติบัตรที่ได้รับจากการเรียนหลักสูตร"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$badge$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"], {
                            count: certificates.filter((c)=>c.status === 'active').length,
                            showZero: true,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TrophyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrophyOutlined$3e$__["TrophyOutlined"], {
                                style: {
                                    fontSize: 24,
                                    color: '#5d4037'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 315,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                className: "content-card",
                style: {
                    marginBottom: 24
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                    gutter: [
                        16,
                        16
                    ],
                    align: "middle",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                            xs: 24,
                            md: 16,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Search, {
                                placeholder: "ค้นหาเกียรติบัตรจากชื่อหลักสูตรหรือเลขที่...",
                                allowClear: true,
                                enterButton: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SearchOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchOutlined$3e$__["SearchOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 328,
                                    columnNumber: 28
                                }, void 0),
                                size: "large",
                                value: searchTerm,
                                onChange: (e)=>setSearchTerm(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 324,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                            xs: 24,
                            md: 8,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"], {
                                placeholder: "สถานะ",
                                size: "large",
                                style: {
                                    width: '100%'
                                },
                                value: statusFilter,
                                onChange: setStatusFilter,
                                suffixIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$FilterOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FilterOutlined$3e$__["FilterOutlined"], {}, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 341,
                                    columnNumber: 27
                                }, void 0),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                        value: "all",
                                        children: "ทั้งหมด"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                        value: "active",
                                        children: "ใช้งานได้"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 344,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                        value: "expired",
                                        children: "หมดอายุ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 345,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Option, {
                                        value: "revoked",
                                        children: "ยกเลิก"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 346,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                lineNumber: 335,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 334,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                    lineNumber: 323,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            filteredCertificates.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                gutter: [
                    24,
                    24
                ],
                children: filteredCertificates.map((certificate)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        xs: 24,
                        sm: 12,
                        lg: 8,
                        xl: 6,
                        children: renderCertificateCard(certificate)
                    }, certificate.id, false, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 356,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                lineNumber: 354,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                className: "content-card",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$empty$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Empty$3e$__["Empty"], {
                    image: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TrophyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrophyOutlined$3e$__["TrophyOutlined"], {
                        style: {
                            fontSize: 64,
                            color: '#d9d9d9'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 364,
                        columnNumber: 20
                    }, void 0),
                    description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            padding: '32px 0'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                                level: 4,
                                style: {
                                    color: '#999',
                                    marginBottom: 8
                                },
                                children: searchTerm ? 'ไม่พบเกียรติบัตรที่ค้นหา' : 'ยังไม่มีเกียรติบัตร'
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                lineNumber: 367,
                                columnNumber: 17
                            }, void 0),
                            !searchTerm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                type: "secondary",
                                children: "เรียนจบหลักสูตรเพื่อรับเกียรติบัตร"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                lineNumber: 371,
                                columnNumber: 19
                            }, void 0)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 366,
                        columnNumber: 15
                    }, void 0)
                }, void 0, false, {
                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                    lineNumber: 363,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                lineNumber: 362,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TrophyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrophyOutlined$3e$__["TrophyOutlined"], {
                            style: {
                                color: '#faad14',
                                fontSize: 20
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 385,
                            columnNumber: 13
                        }, void 0),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: 18,
                                fontWeight: 600
                            },
                            children: "รายละเอียดเกียรติบัตร"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 386,
                            columnNumber: 13
                        }, void 0)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                    lineNumber: 384,
                    columnNumber: 11
                }, void 0),
                open: isModalVisible,
                onCancel: ()=>setIsModalVisible(false),
                width: 700,
                footer: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PrinterOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PrinterOutlined$3e$__["PrinterOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 395,
                            columnNumber: 19
                        }, void 0),
                        onClick: ()=>selectedCertificate && handlePrintCertificate(selectedCertificate),
                        size: "large",
                        children: "พิมพ์"
                    }, "print", false, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 393,
                        columnNumber: 11
                    }, void 0),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                        type: "primary",
                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DownloadOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DownloadOutlined$3e$__["DownloadOutlined"], {}, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 404,
                            columnNumber: 19
                        }, void 0),
                        onClick: ()=>selectedCertificate && handleDownloadCertificate(selectedCertificate),
                        size: "large",
                        children: "ดาวน์โหลด"
                    }, "download", false, {
                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                        lineNumber: 401,
                        columnNumber: 11
                    }, void 0)
                ],
                children: selectedCertificate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                marginBottom: 32
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        height: 140,
                                        background: `linear-gradient(135deg, ${selectedCertificate.template === 'traditional' ? '#8bc34a, #4caf50' : selectedCertificate.template === 'spa' ? '#2196f3, #03a9f4' : '#ff9800, #ffc107'})`,
                                        borderRadius: 12,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        marginBottom: 20,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$TrophyOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrophyOutlined$3e$__["TrophyOutlined"], {
                                        style: {
                                            fontSize: 48
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 428,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 415,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title, {
                                    level: 3,
                                    style: {
                                        color: '#5d4037',
                                        marginBottom: 8
                                    },
                                    children: selectedCertificate.courseName
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 430,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                    strong: true,
                                    style: {
                                        fontSize: 16,
                                        color: '#666'
                                    },
                                    children: [
                                        "เลขที่: ",
                                        selectedCertificate.certificateNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 433,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 414,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                            style: {
                                margin: '24px 0'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 438,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                            gutter: [
                                24,
                                16
                            ],
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                style: {
                                                    color: '#5d4037',
                                                    display: 'block',
                                                    marginBottom: 4
                                                },
                                                children: "ชื่อผู้รับ:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 443,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                style: {
                                                    fontSize: 15
                                                },
                                                children: selectedCertificate.studentName
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 446,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 442,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 441,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                style: {
                                                    color: '#5d4037',
                                                    display: 'block',
                                                    marginBottom: 4
                                                },
                                                children: "ผู้สอน:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 451,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                style: {
                                                    fontSize: 15
                                                },
                                                children: selectedCertificate.instructorName
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 454,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 450,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 449,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                style: {
                                                    color: '#5d4037',
                                                    display: 'block',
                                                    marginBottom: 4
                                                },
                                                children: "วันที่เรียนจบ:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 459,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                style: {
                                                    fontSize: 15
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(selectedCertificate.completionDate).format('DD MMMM YYYY')
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 462,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 458,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 457,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                style: {
                                                    color: '#5d4037',
                                                    display: 'block',
                                                    marginBottom: 4
                                                },
                                                children: "วันที่ออกเกียรติบัตร:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 469,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                style: {
                                                    fontSize: 15
                                                },
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(selectedCertificate.issueDate).format('DD MMMM YYYY')
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 472,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 468,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 467,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                style: {
                                                    color: '#5d4037',
                                                    display: 'block',
                                                    marginBottom: 4
                                                },
                                                children: "ระยะเวลาเรียน:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 479,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                style: {
                                                    fontSize: 15
                                                },
                                                children: [
                                                    selectedCertificate.hours,
                                                    " ชั่วโมง"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 482,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 478,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 477,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                    span: 12,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                strong: true,
                                                style: {
                                                    color: '#5d4037',
                                                    display: 'block',
                                                    marginBottom: 4
                                                },
                                                children: "เกรด:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 487,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                color: getGradeColor(selectedCertificate.grade),
                                                style: {
                                                    fontSize: 14,
                                                    padding: '4px 12px'
                                                },
                                                children: selectedCertificate.grade
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 490,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                        lineNumber: 486,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 485,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 440,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                            style: {
                                margin: '24px 0'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 497,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 24
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                    strong: true,
                                    style: {
                                        color: '#5d4037',
                                        display: 'block',
                                        marginBottom: 12,
                                        fontSize: 16
                                    },
                                    children: "ทักษะที่ได้รับ:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 500,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: selectedCertificate.skills.map((skill, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$tag$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$StarOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StarOutlined$3e$__["StarOutlined"], {}, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                                lineNumber: 507,
                                                columnNumber: 27
                                            }, void 0),
                                            style: {
                                                marginBottom: 8,
                                                marginRight: 8,
                                                fontSize: 13,
                                                padding: '4px 12px',
                                                borderRadius: 6
                                            },
                                            children: skill
                                        }, index, false, {
                                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                            lineNumber: 505,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 503,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 499,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$divider$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Divider$3e$__["Divider"], {
                            style: {
                                margin: '24px 0'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 522,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                textAlign: 'center',
                                background: 'linear-gradient(135deg, #f5f5f5, #fafafa)',
                                padding: 20,
                                borderRadius: 12,
                                border: '1px solid #e8e8e8'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                    strong: true,
                                    style: {
                                        fontSize: 14,
                                        color: '#5d4037',
                                        display: 'block',
                                        marginBottom: 8
                                    },
                                    children: "รหัสยืนยันความถูกต้อง"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 531,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                    style: {
                                        fontSize: 16,
                                        fontFamily: 'monospace',
                                        background: '#fff',
                                        padding: '8px 16px',
                                        borderRadius: 6,
                                        border: '1px solid #d9d9d9',
                                        display: 'inline-block',
                                        marginBottom: 8
                                    },
                                    children: selectedCertificate.verificationCode
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 534,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                    type: "secondary",
                                    style: {
                                        fontSize: 12,
                                        display: 'block'
                                    },
                                    children: "สามารถใช้รหัสนี้ในการยืนยันความถูกต้องของเกียรติบัตร"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                                    lineNumber: 548,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                            lineNumber: 524,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                    lineNumber: 413,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(pages)/student/certificates/page.tsx",
        lineNumber: 305,
        columnNumber: 5
    }, this);
}
_s(StudentCertificatesPage, "BnTQAaHlFzZO4EdRxr+HkkZt+xQ=");
_c = StudentCertificatesPage;
var _c;
__turbopack_context__.k.register(_c, "StudentCertificatesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_%28pages%29_student_certificates_page_tsx_46c632c6._.js.map