/**
 * Created by vestnik on 27/03/16.
 */

const ucfirst = (str) => {
  return str.replace(/\w/, (ss) => { return ss.toUpperCase() })
}

const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
  }).replace(/\s+/g, '')
}

export {
  ucfirst,
  camelize
}
