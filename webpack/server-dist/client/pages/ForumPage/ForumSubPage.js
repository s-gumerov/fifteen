"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumSubPage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const Comment_1 = require("./components/Comment/Comment");
const styles = require('./styles.module.scss');
const ForumSubPage = () => {
    const topicInfo = {
        id: '1',
        topic_name: 'Заметки стримерам',
        description: 'Правила стримеру: 1. Ответственность за контент несет стример. Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли Аккуратно выбирайто то что стриммите 2. Рекомендуется проводить стрими на игровую тематику, в случае большой доли',
        info: {
            avatar: 'https://static.1tv.ru/uploads/photo/image/2/huge/4062_huge_876c41f50e.jpg',
            owner: 'Super_man',
            date: '01 января 2022 в 10:10',
            comments_count: 1520,
        },
    };
    const topicComments = [
        {
            id: '1',
            username: 'Super_man',
            avatar: 'https://s1.1zoom.ru/big3/888/Eyes_Owls_Bubo_502568.jpg',
            date: '01 января 2022 в 10:10',
            message: 'Авата́р, авата́ра (просторечн. авата́рка, а́ва, ава́, от англ. avatar), а также юзерпик (англ. userpic, сокр. от англ. users picture — «картинка пользователя»)— графическое представление пользователя, его альтер-эго, игрового интернет-персонажа. Аватар может быть',
        },
        {
            id: '2',
            username: 'Super_man',
            avatar: 'https://s1.1zoom.ru/big3/888/Eyes_Owls_Bubo_502568.jpg',
            date: '01 января 2022 в 10:10',
            message: 'Авата́р, авата́ра (просторечн. авата́рка, а́ва, ава́, от англ. avatar), а также юзерпик (англ. userpic, сокр. от англ. users picture — «картинка пользователя»)— графическое представление пользователя, его альтер-эго, игрового интернет-персонажа. Аватар может быть',
        },
        {
            id: '3',
            username: 'Super_man',
            avatar: 'https://s1.1zoom.ru/big3/888/Eyes_Owls_Bubo_502568.jpg',
            date: '01 января 2022 в 10:10',
            message: 'Авата́р, авата́ра (просторечн. авата́рка, а́ва, ава́, от англ. avatar), а также юзерпик (англ. userpic, сокр. от англ. users picture — «картинка пользователя»)— графическое представление пользователя, его альтер-эго, игрового интернет-персонажа. Аватар может быть',
        }
    ];
    const comments = topicComments.map(comment => (0, jsx_runtime_1.jsx)(Comment_1.Comment, Object.assign({}, comment), comment.id));
    const onKeyUpHandler = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            const message = e.currentTarget.value;
            e.currentTarget.value = '';
            console.log(message);
        }
        ;
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: styles.wrapper }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.forumSubPage }, { children: [(0, jsx_runtime_1.jsxs)("h1", Object.assign({ className: styles.forum__title }, { children: ["\u0424\u043E\u0440\u0443\u043C ", '> ', (0, jsx_runtime_1.jsx)("span", Object.assign({ className: styles.forumSubPage__title_underline }, { children: topicInfo.topic_name }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: styles.forumSubPage__topicDescription }, { children: topicInfo.description })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.info }, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.default, { alt: topicInfo.info.owner, src: topicInfo.info.avatar, variant: "square", sx: { width: 55, height: 55 } }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.info__owner }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: styles.username }, { children: topicInfo.info.owner })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: styles.date }, { children: topicInfo.info.date }))] }))] })), (0, jsx_runtime_1.jsx)("div", { className: styles.forumSubPage__line }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: styles.comments }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: styles.comments__header }, { children: (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: styles.msgCount }, { children: [topicInfo.info.comments_count, " \u041A\u041E\u041C\u041C\u0415\u041D\u0422\u0410\u0420\u0418\u0415\u0412"] })) })), comments] })), (0, jsx_runtime_1.jsx)("input", { type: 'text', id: 'forum_subPage_input', name: 'forum_subPage_input', className: styles.forumSubPage__inputMsg, placeholder: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439', onKeyUp: onKeyUpHandler })] })) })));
};
exports.ForumSubPage = ForumSubPage;
