import R from 'ramda'
const getUserInfo = (id) => new Promise((resolve, reject) => {
  if (id > 0) {
    setTimeout(function() {
      resolve({
        username: 'lisiur',
        age: 23
      })
    }, 1500)
  } else {
    setTimeout(function() {
      reject(new Error('can\'t find the user!'))
    }, 1500)
  }
})

function _isEmpty(val) {
  return val === null || val === undefined
}
function _safeProp (specify, formatProps, obj) {
  if (_isEmpty(obj)) return specify
  if (formatProps === '') return obj
  const props = formatProps.split('.')
  return _safeProp(specify, props.slice(1).join('.'), obj[props[0]])
}
const safeProp = R.curry(_safeProp)

export { 
  getUserInfo, 
  safeProp
}