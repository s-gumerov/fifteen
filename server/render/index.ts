export default () => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('./hmr').default
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('./render').default;
  }
}
