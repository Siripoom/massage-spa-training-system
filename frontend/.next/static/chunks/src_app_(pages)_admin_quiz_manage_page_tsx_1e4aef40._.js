(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/(pages)/admin/quiz/manage/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ManageQuizPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$v5$2d$patch$2d$for$2d$react$2d$19$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/v5-patch-for-react-19/es/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/form/index.js [app-client] (ecmascript) <export default as Form>"); // Added Breadcrumb, Select, Modal
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/input/index.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/button/index.js [app-client] (ecmascript) <locals> <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/space/index.js [app-client] (ecmascript) <locals> <export default as Space>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/card/index.js [app-client] (ecmascript) <export default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/typography/index.js [app-client] (ecmascript) <export default as Typography>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/message/index.js [app-client] (ecmascript) <export default as message>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$radio$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/radio/index.js [app-client] (ecmascript) <locals> <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$popconfirm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popconfirm$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/popconfirm/index.js [app-client] (ecmascript) <export default as Popconfirm>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/row/index.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/col/index.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$breadcrumb$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Breadcrumb$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/breadcrumb/index.js [app-client] (ecmascript) <export default as Breadcrumb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/select/index.js [app-client] (ecmascript) <export default as Select>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__ = __turbopack_context__.i("[project]/node_modules/antd/es/modal/index.js [app-client] (ecmascript) <export default as Modal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlusOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/PlusOutlined.js [app-client] (ecmascript) <export default as PlusOutlined>"); // Added HomeOutlined, FileTextOutlined, AppstoreOutlined
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/DeleteOutlined.js [app-client] (ecmascript) <export default as DeleteOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/SaveOutlined.js [app-client] (ecmascript) <export default as SaveOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ArrowLeftOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/ArrowLeftOutlined.js [app-client] (ecmascript) <export default as ArrowLeftOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/EditOutlined.js [app-client] (ecmascript) <export default as EditOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HomeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/HomeOutlined.js [app-client] (ecmascript) <export default as HomeOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$FileTextOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileTextOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/FileTextOutlined.js [app-client] (ecmascript) <export default as FileTextOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AppstoreOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AppstoreOutlined$3e$__ = __turbopack_context__.i("[project]/node_modules/@ant-design/icons/es/icons/AppstoreOutlined.js [app-client] (ecmascript) <export default as AppstoreOutlined>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>"); // สำหรับสร้าง unique ID
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dayjs/dayjs.min.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].locale('th'); // Set dayjs locale to Thai
const { Title: AntdTitle, Text } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$typography$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Typography$3e$__["Typography"];
const { TextArea } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"];
const { Option } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$select$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Select$3e$__["Select"]; // Added Option for Select component in Modal
function ManageQuizPage() {
    _s();
    const [form] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const quizId = searchParams.get('id');
    const [quiz, setQuiz] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isEditMode, setIsEditMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Track if we are editing an existing quiz
    const [editingQuestionIndex, setEditingQuestionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentQuestionForm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm();
    const [isQuestionModalVisible, setIsQuestionModalVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // State for question modal
    // Use Form.useWatch to get real-time options from the form
    // Type it as an array of objects that match the Form.List structure
    const currentOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useWatch('options', currentQuestionForm);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ManageQuizPage.useEffect": ()=>{
            const initializeQuiz = {
                "ManageQuizPage.useEffect.initializeQuiz": ()=>{
                    if (quizId) {
                        setIsEditMode(true);
                        const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
                        const foundQuiz = storedQuizzes.find({
                            "ManageQuizPage.useEffect.initializeQuiz.foundQuiz": (q)=>q.id === quizId
                        }["ManageQuizPage.useEffect.initializeQuiz.foundQuiz"]);
                        if (foundQuiz) {
                            setQuiz(foundQuiz);
                            form.setFieldsValue({
                                title: foundQuiz.title,
                                description: foundQuiz.description,
                                course: foundQuiz.course
                            });
                        } else {
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('ไม่พบข้อสอบที่ต้องการแก้ไข');
                            router.push('/admin/quiz');
                        }
                    } else {
                        setIsEditMode(false);
                        const newQuiz = {
                            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                            title: '',
                            description: '',
                            course: '',
                            numQuestions: 0,
                            status: 'draft',
                            questions: [],
                            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().toISOString(),
                            updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().toISOString()
                        };
                        setQuiz(newQuiz);
                        form.setFieldsValue({
                            title: newQuiz.title,
                            description: newQuiz.description,
                            course: newQuiz.course
                        });
                    }
                    setLoading(false);
                }
            }["ManageQuizPage.useEffect.initializeQuiz"];
            initializeQuiz();
        }
    }["ManageQuizPage.useEffect"], [
        quizId,
        form,
        router
    ]);
    const handleQuizFormChange = (changedValues, allValues)=>{
        if (quiz) {
            setQuiz((prev)=>{
                if (!prev) return null;
                return {
                    ...prev,
                    title: allValues.title,
                    description: allValues.description,
                    course: allValues.course,
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().toISOString()
                };
            });
        }
    };
    const handleAddQuestion = ()=>{
        setEditingQuestionIndex(null);
        currentQuestionForm.resetFields();
        const initialOptions = [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                text: ''
            },
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                text: ''
            }
        ];
        currentQuestionForm.setFieldsValue({
            questionText: '',
            options: initialOptions,
            correctOptionId: ''
        });
        setIsQuestionModalVisible(true); // Open modal for adding question
    };
    const handleEditQuestion = (index)=>{
        setEditingQuestionIndex(index);
        if (quiz) {
            const questionToEdit = quiz.questions[index];
            currentQuestionForm.setFieldsValue(questionToEdit);
        }
        setIsQuestionModalVisible(true); // Open modal for editing question
    };
    const handleSaveQuestion = async ()=>{
        try {
            const values = await currentQuestionForm.validateFields();
            // Ensure that all options have an ID before checking selectedOptionExists
            const optionsWithIds = values.options.map((opt)=>({
                    id: opt.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                    text: opt.text
                }));
            const selectedOptionExists = optionsWithIds.some((opt)=>opt.id === values.correctOptionId);
            if (!selectedOptionExists) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('กรุณาเลือกคำตอบที่ถูกต้องสำหรับคำถามนี้!');
                currentQuestionForm.setFields([
                    {
                        name: 'correctOptionId',
                        errors: [
                            'กรุณาเลือกคำตอบที่ถูกต้อง!'
                        ]
                    }
                ]);
                return;
            }
            const newQuestion = {
                id: values.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                questionText: values.questionText,
                options: optionsWithIds,
                correctOptionId: values.correctOptionId
            };
            setQuiz((prev)=>{
                if (!prev) return null;
                const updatedQuestions = [
                    ...prev.questions
                ];
                if (editingQuestionIndex !== null) {
                    updatedQuestions[editingQuestionIndex] = newQuestion;
                } else {
                    updatedQuestions.push(newQuestion);
                }
                return {
                    ...prev,
                    questions: updatedQuestions,
                    numQuestions: updatedQuestions.length,
                    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().toISOString()
                };
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('บันทึกคำถามเรียบร้อย!');
            currentQuestionForm.resetFields();
            setEditingQuestionIndex(null);
            setIsQuestionModalVisible(false); // Close modal after saving
        } catch (error) {
            console.error('Failed to save question (validation error):', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('กรุณากรอกข้อมูลคำถามให้ครบถ้วนและถูกต้อง');
        }
    };
    const handleCancelQuestionEdit = ()=>{
        currentQuestionForm.resetFields();
        setEditingQuestionIndex(null);
        setIsQuestionModalVisible(false); // Close modal on cancel
    };
    const handleRemoveQuestion = (index)=>{
        setQuiz((prev)=>{
            if (!prev) return null;
            const updatedQuestions = prev.questions.filter((_, i)=>i !== index);
            return {
                ...prev,
                questions: updatedQuestions,
                numQuestions: updatedQuestions.length,
                updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().toISOString()
            };
        });
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('ลบคำถามเรียบร้อย!');
        if (editingQuestionIndex === index) {
            currentQuestionForm.resetFields();
            setEditingQuestionIndex(null);
            setIsQuestionModalVisible(false); // Close modal if current editing question is deleted
        } else if (editingQuestionIndex !== null && editingQuestionIndex > index) {
            setEditingQuestionIndex(editingQuestionIndex - 1);
        }
    };
    const handleSaveQuiz = (status)=>{
        form.validateFields().then((values)=>{
            if (!quiz) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('ข้อสอบยังไม่ถูกโหลดหรือสร้างขึ้น');
                return;
            }
            if (quiz.questions.length === 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('กรุณาเพิ่มคำถามอย่างน้อย 1 ข้อ');
                return;
            }
            // Validate that correctOptionId is one of the available options for each question
            const invalidQuestions = quiz.questions.filter((q)=>!q.options.some((opt)=>opt.id === q.correctOptionId));
            if (invalidQuestions.length > 0) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('คำถามบางข้อมีตัวเลือกที่ถูกต้องไม่ถูกต้อง กรุณาแก้ไข');
                return;
            }
            const now = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dayjs$2f$dayjs$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])().toISOString();
            const finalQuiz = {
                ...quiz,
                ...values,
                numQuestions: quiz.questions.length,
                status: status,
                createdAt: isEditMode ? quiz.createdAt : now,
                updatedAt: now
            };
            const storedQuizzes = JSON.parse(localStorage.getItem('quizzes') || '[]');
            let updatedQuizzes;
            if (isEditMode) {
                updatedQuizzes = storedQuizzes.map((q)=>q.id === finalQuiz.id ? finalQuiz : q);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('แก้ไขข้อสอบเรียบร้อย!');
            } else {
                updatedQuizzes = [
                    ...storedQuizzes,
                    finalQuiz
                ];
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].success('สร้างข้อสอบเรียบร้อย!');
            }
            localStorage.setItem('quizzes', JSON.stringify(updatedQuizzes));
            router.push('/admin/quiz'); // Redirect back to quiz list
        }).catch((info)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$message$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__message$3e$__["message"].error('กรุณากรอกข้อมูลข้อสอบให้ครบถ้วน');
            console.log('Validate Failed:', info);
        });
    };
    const handleCancel = ()=>{
        router.push('/admin/quiz');
    };
    // Breadcrumb items
    const breadcrumbItems = [
        {
            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/admin/dashboard",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$HomeOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HomeOutlined$3e$__["HomeOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                        lineNumber: 297,
                        columnNumber: 41
                    }, this),
                    " หน้าหลัก"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                lineNumber: 297,
                columnNumber: 14
            }, this)
        },
        {
            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/admin/quiz",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$FileTextOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileTextOutlined$3e$__["FileTextOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                        lineNumber: 300,
                        columnNumber: 36
                    }, this),
                    " แบบทดสอบ"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                lineNumber: 300,
                columnNumber: 14
            }, this)
        },
        {
            title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/admin/quiz?tab=quiz-management",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$AppstoreOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AppstoreOutlined$3e$__["AppstoreOutlined"], {}, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                        lineNumber: 303,
                        columnNumber: 56
                    }, this),
                    " จัดการข้อสอบ"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                lineNumber: 303,
                columnNumber: 14
            }, this)
        },
        {
            title: quizId ? 'แก้ไขข้อสอบ' : 'สร้างข้อสอบใหม่'
        }
    ];
    if (loading || !quiz) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center items-center h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                children: "กำลังโหลด..."
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                lineNumber: 313,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
            lineNumber: 312,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$breadcrumb$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Breadcrumb$3e$__["Breadcrumb"], {
                className: "mb-6",
                items: breadcrumbItems
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                lineNumber: 320,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AntdTitle, {
                level: 1,
                className: "text-3xl font-bold mb-8 text-gray-800",
                children: quizId ? 'แก้ไขข้อสอบ' : 'สร้างข้อสอบใหม่'
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$row$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                gutter: [
                    0,
                    24
                ],
                children: [
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        span: 24,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            className: "rounded-xl shadow-custom-light p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AntdTitle, {
                                    level: 4,
                                    className: "text-gray-700 mb-6",
                                    children: "ข้อมูลข้อสอบ"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 330,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
                                    form: form,
                                    layout: "vertical",
                                    onValuesChange: handleQuizFormChange,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                            name: "title",
                                            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-gray-700",
                                                children: "ชื่อข้อสอบ"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                lineNumber: 338,
                                                columnNumber: 24
                                            }, void 0),
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'กรุณากรอกชื่อข้อสอบ!'
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                placeholder: "เช่น ข้อสอบนวดแผนไทยเบื้องต้น",
                                                className: "rounded-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                lineNumber: 341,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                            lineNumber: 336,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                            name: "course",
                                            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-gray-700",
                                                children: "หลักสูตร"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                lineNumber: 345,
                                                columnNumber: 24
                                            }, void 0),
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'กรุณากรอกหลักสูตรที่เกี่ยวข้อง!'
                                                }
                                            ],
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                placeholder: "เช่น นวดแผนไทยเบื้องต้น",
                                                className: "rounded-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                lineNumber: 348,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                            name: "description",
                                            label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-gray-700",
                                                children: "คำอธิบาย"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                lineNumber: 352,
                                                columnNumber: 24
                                            }, void 0),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextArea, {
                                                rows: 3,
                                                placeholder: "คำอธิบายข้อสอบ (ไม่บังคับ)",
                                                className: "rounded-lg"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                lineNumber: 354,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                            lineNumber: 350,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 331,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                            lineNumber: 329,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        span: 24,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                            className: "rounded-xl shadow-custom-light p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AntdTitle, {
                                    level: 4,
                                    className: "text-gray-700 mb-6",
                                    children: "รายการคำถาม"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this),
                                quiz.questions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center text-gray-500 mb-4",
                                    children: "ยังไม่มีคำถามในข้อสอบนี้"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 364,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                    direction: "vertical",
                                    className: "w-full",
                                    size: "middle",
                                    children: quiz.questions.map((q, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$card$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Card$3e$__["Card"], {
                                            size: "small",
                                            className: "rounded-lg border border-gray-200",
                                            extra: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                        type: "text",
                                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$EditOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EditOutlined$3e$__["EditOutlined"], {}, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                            lineNumber: 376,
                                                            columnNumber: 31
                                                        }, void 0),
                                                        onClick: ()=>handleEditQuestion(index),
                                                        className: "text-blue-500 hover:text-blue-700"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                        lineNumber: 374,
                                                        columnNumber: 23
                                                    }, void 0),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$popconfirm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Popconfirm$3e$__["Popconfirm"], {
                                                        title: "ลบคำถาม",
                                                        description: "คุณแน่ใจหรือไม่ที่จะลบคำถามนี้?",
                                                        onConfirm: ()=>handleRemoveQuestion(index),
                                                        okText: "ใช่",
                                                        cancelText: "ไม่",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                            type: "text",
                                                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__["DeleteOutlined"], {}, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                                lineNumber: 389,
                                                                columnNumber: 33
                                                            }, void 0),
                                                            danger: true,
                                                            className: "text-red-500 hover:text-red-700"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                            lineNumber: 387,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 23
                                                    }, void 0)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                lineNumber: 373,
                                                columnNumber: 21
                                            }, void 0),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                    strong: true,
                                                    children: [
                                                        index + 1,
                                                        ". ",
                                                        q.questionText
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                    lineNumber: 397,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$radio$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Radio$3e$__["Radio"].Group, {
                                                    value: q.correctOptionId,
                                                    className: "w-full mt-2",
                                                    children: q.options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center mb-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$radio$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                                                    value: opt.id,
                                                                    disabled: true,
                                                                    className: "mr-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                                    lineNumber: 401,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Text, {
                                                                    className: opt.id === q.correctOptionId ? 'font-bold text-green-600' : '',
                                                                    children: opt.text
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                                    lineNumber: 402,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, opt.id, true, {
                                                            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                            lineNumber: 400,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                    lineNumber: 398,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, q.id, true, {
                                            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                            lineNumber: 368,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 366,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "dashed",
                                    onClick: handleAddQuestion,
                                    block: true,
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlusOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusOutlined$3e$__["PlusOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                        lineNumber: 415,
                                        columnNumber: 21
                                    }, void 0),
                                    className: "mt-6 rounded-lg text-blue-500 border-blue-500 hover:text-blue-700 hover:border-blue-700",
                                    children: "เพิ่มคำถามใหม่"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 411,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                            lineNumber: 361,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                        lineNumber: 360,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$modal$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Modal$3e$__["Modal"], {
                        title: editingQuestionIndex !== null ? 'แก้ไขคำถาม' : 'เพิ่มคำถาม',
                        open: isQuestionModalVisible,
                        onOk: handleSaveQuestion,
                        onCancel: handleCancelQuestionEdit,
                        className: "rounded-xl",
                        centered: true,
                        width: 700,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
                            form: currentQuestionForm,
                            layout: "vertical",
                            className: "p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    name: "id",
                                    hidden: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {}, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                        lineNumber: 435,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 434,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    name: "questionText",
                                    label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-gray-700",
                                        children: "คำถาม"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                        lineNumber: 439,
                                        columnNumber: 22
                                    }, void 0),
                                    rules: [
                                        {
                                            required: true,
                                            message: 'กรุณากรอกคำถาม!'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TextArea, {
                                        rows: 2,
                                        placeholder: "เช่น ข้อใดคือน้ำมันนวดที่นิยมใช้ในสปา?",
                                        className: "rounded-lg"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                        lineNumber: 442,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 437,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].List, {
                                    name: "options",
                                    children: (fields, { add, remove })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AntdTitle, {
                                                    level: 5,
                                                    className: "text-gray-700 mb-4",
                                                    children: "ตัวเลือก"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 19
                                                }, this),
                                                fields.map(({ key, name })=>{
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                                                        style: {
                                                            display: 'flex',
                                                            marginBottom: 8
                                                        },
                                                        align: "baseline",
                                                        className: "w-full",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                                name: [
                                                                    name,
                                                                    'id'
                                                                ],
                                                                hidden: true,
                                                                noStyle: true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {}, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                                    lineNumber: 459,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                                lineNumber: 454,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                                                name: [
                                                                    name,
                                                                    'text'
                                                                ],
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: 'กรุณากรอกตัวเลือก!'
                                                                    }
                                                                ],
                                                                className: "flex-grow",
                                                                noStyle: true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$input$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                                                                    placeholder: `ตัวเลือก ${name + 1}`,
                                                                    className: "rounded-lg"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                                    lineNumber: 469,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                                lineNumber: 463,
                                                                columnNumber: 25
                                                            }, this),
                                                            fields.length > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                                type: "text",
                                                                danger: true,
                                                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$DeleteOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__DeleteOutlined$3e$__["DeleteOutlined"], {}, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                                    lineNumber: 479,
                                                                    columnNumber: 35
                                                                }, void 0),
                                                                onClick: ()=>remove(name),
                                                                className: "text-red-500 hover:text-red-700 ml-2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                                lineNumber: 476,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, key, true, {
                                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                        lineNumber: 452,
                                                        columnNumber: 23
                                                    }, this);
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                                    type: "dashed",
                                                    onClick: ()=>add({
                                                            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                                                            text: ''
                                                        }),
                                                    block: true,
                                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$PlusOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusOutlined$3e$__["PlusOutlined"], {}, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 27
                                                    }, void 0),
                                                    className: "mt-4 rounded-lg text-green-500 border-green-500 hover:text-green-700 hover:border-green-700",
                                                    children: "เพิ่มตัวเลือก"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                    lineNumber: 487,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 446,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].Item, {
                                    name: "correctOptionId",
                                    label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-gray-700 mt-4",
                                        children: "เลือกคำตอบที่ถูกต้อง"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                        lineNumber: 504,
                                        columnNumber: 22
                                    }, void 0),
                                    rules: [
                                        {
                                            required: true,
                                            message: 'กรุณาเลือกคำตอบที่ถูกต้อง!'
                                        }
                                    ],
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$radio$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Radio$3e$__["Radio"].Group, {
                                        className: "w-full",
                                        children: currentOptions && currentOptions.map((option, index)=>{
                                            // Ensure option.id is a string for key and value props
                                            const radioValue = option.id || `temp-${index}`; // Fallback to a temporary string if ID is undefined
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$radio$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Radio$3e$__["Radio"], {
                                                value: radioValue,
                                                className: "block mb-2",
                                                children: option.text || `ตัวเลือก ${index + 1}`
                                            }, radioValue, false, {
                                                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                                lineNumber: 513,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                        lineNumber: 507,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 502,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                            lineNumber: 433,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                        lineNumber: 424,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$col$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                        span: 24,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$space$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Space$3e$__["Space"], {
                            className: "w-full justify-end",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$ArrowLeftOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftOutlined$3e$__["ArrowLeftOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                        lineNumber: 528,
                                        columnNumber: 21
                                    }, void 0),
                                    onClick: handleCancel,
                                    className: "rounded-lg shadow-md px-6 py-3 text-base",
                                    children: "กลับ"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 527,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__["SaveOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                        lineNumber: 536,
                                        columnNumber: 21
                                    }, void 0),
                                    onClick: ()=>handleSaveQuiz('draft'),
                                    className: "bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md px-6 py-3 text-base",
                                    children: "บันทึกฉบับร่าง"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 534,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$button$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__$3c$export__default__as__Button$3e$__["Button"], {
                                    type: "primary",
                                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ant$2d$design$2f$icons$2f$es$2f$icons$2f$SaveOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SaveOutlined$3e$__["SaveOutlined"], {}, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                        lineNumber: 544,
                                        columnNumber: 21
                                    }, void 0),
                                    onClick: ()=>handleSaveQuiz('published'),
                                    className: "bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md px-6 py-3 text-base",
                                    children: "เผยแพร่ข้อสอบ"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                                    lineNumber: 542,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                            lineNumber: 526,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                        lineNumber: 525,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(pages)/admin/quiz/manage/page.tsx",
        lineNumber: 319,
        columnNumber: 5
    }, this);
}
_s(ManageQuizPage, "KW5NbyyFNMGfJhF4/RoR/+Woevo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useForm,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$antd$2f$es$2f$form$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"].useWatch
    ];
});
_c = ManageQuizPage;
var _c;
__turbopack_context__.k.register(_c, "ManageQuizPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_%28pages%29_admin_quiz_manage_page_tsx_1e4aef40._.js.map