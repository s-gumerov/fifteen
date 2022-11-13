"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const Topic_1 = require("./components/Topic/Topic");
const AddTopicForm_1 = require("./components/AddTopicForm/AddTopicForm");
const styles = require('./styles.module.scss');
const ForumPage = () => {
    const [showAddTopicForm, setShowAddTopicForm] = (0, react_1.useState)(false);
    const testData = [
        {
            id: '1',
            title: 'Заметки и правила стримерам',
            description: 'Правила стримеру: 1. Ответственность за контент несет стример. Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли',
            comments_count: 1520,
            date: '01 января 2022 в 10:10',
            owner: 'Super_man',
            last_message: {
                author: 'Spider_man',
                date: '01 октября 2022 в 14:35',
            },
        },
        {
            id: '2',
            title: 'Заметки и правила стримерам',
            description: 'Правила стримеру: 1. Ответственность за контент несет стример. Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли',
            comments_count: 1520,
            date: '01 января 2022 в 10:10',
            owner: 'Super_man',
            last_message: {
                author: 'Spider_man',
                date: '01 октября 2022 в 14:35',
            },
        },
        {
            id: '3',
            title: 'Заметки и правила стримерам',
            description: 'Правила стримеру: 1. Ответственность за контент несет стример. Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли',
            comments_count: 1520,
            date: '01 января 2022 в 10:10',
            owner: 'Super_man',
            last_message: {
                author: 'Spider_man',
                date: '01 октября 2022 в 14:35',
            },
        },
    ];
    const topics = testData.map(topic => (0, jsx_runtime_1.jsx)(Topic_1.Topic, Object.assign({}, topic), topic.id));
    const closeForm = () => setShowAddTopicForm(false);
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.wrapper }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.forum }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: styles.forum__title }, { children: "\u0424\u043E\u0440\u0443\u043C" })), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ variant: "outlined", size: "large", sx: { mt: 4, mb: 2, width: '290px', color: '#ffffff' }, onClick: () => setShowAddTopicForm(true) }, { children: "\u0421\u041E\u0417\u0414\u0410\u0422\u042C \u0422\u0415\u041C\u0423" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: styles.forum__content }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.forum__topics }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.forum__header }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: `${styles.forum__text} ${styles.topicText}` }, { children: "\u0422\u0435\u043C\u0430" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: `${styles.forum__text} ${styles.lastMsgText}` }, { children: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: styles.forum__content }, { children: topics }))] })) }))] })), showAddTopicForm && (0, jsx_runtime_1.jsx)(AddTopicForm_1.AddTopicForm, { closeForm: closeForm })] })));
};
exports.ForumPage = ForumPage;
