let localStorage;

if (typeof window !== 'undefined') {
  localStorage = window.localStorage;
} else {
  localStorage = {
    setItem() { return {} },
    getItem() { return {} },
  };
}

export default localStorage;