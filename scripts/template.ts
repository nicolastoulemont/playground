function templateFn() {
  console.log('template')
}

export const template = {
  fn: () => {
    templateFn()
  },
}
