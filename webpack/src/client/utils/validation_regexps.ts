export const loginRegexp = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
export const displayNameRegexp = /^[A-Z][a-zA-Z._-]+$/;
export const nameRegexp = /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ-]+$/;
export const phoneRegexp = /^\+*\d{10,15}$/;
export const passwordRegexp = /(?<!\S)(?=\S{8,20}(?!\S))\S*(\d\S*[A-ZА-ЯЁ]|[A-ZА-ЯЁ]\S*\d)\S*/;
