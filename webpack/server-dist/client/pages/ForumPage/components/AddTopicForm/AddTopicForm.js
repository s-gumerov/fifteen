"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTopicForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const TextFieldMultiline_1 = require("../../../../components/ui/TextFieldMultiline");
const styles = require('./styles.module.scss');
const AddTopicForm = ({ closeForm }) => {
    const submitHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { topic_name, topic_description } = e.target;
        const data = {
            topic_name: topic_name.value,
            topic_description: topic_description.value
        };
        console.log(data);
        closeForm();
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: styles.wrapper, onClick: (e) => {
            if (e.target === e.currentTarget) {
                /* закрываем модальное окно если клик не по форме */
                closeForm();
            }
            ;
        } }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: styles.form, onSubmit: submitHandler }, { children: [(0, jsx_runtime_1.jsx)("h3", Object.assign({ className: styles.form__title }, { children: "\u0421\u041E\u0417\u0414\u0410\u0422\u042C \u0422\u0415\u041C\u0423" })), (0, jsx_runtime_1.jsx)("div", { className: styles.form__line }), (0, jsx_runtime_1.jsx)(TextFieldMultiline_1.TextFieldMultiline, { label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u043E\u043F\u0438\u043A\u0430", rows: 1, id: 'topic_name', name: 'topic_name' }), (0, jsx_runtime_1.jsx)(TextFieldMultiline_1.TextFieldMultiline, { label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", rows: 10, id: 'topic_description', name: 'topic_description' }), (0, jsx_runtime_1.jsx)(material_1.Button, Object.assign({ type: 'submit', variant: "outlined", size: "large", sx: { mt: 5, mb: 2, width: '80%' } }, { children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" }))] })) })));
};
exports.AddTopicForm = AddTopicForm;
