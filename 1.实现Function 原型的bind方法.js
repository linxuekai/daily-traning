/*
 * 考察点:
 * 1. 原型继承
 * 2. this 指向
 * -------------------- */
// eslint-disable-next-line no-extend-native
Function.prototype.bind = function bindFn (argThis, ...argsOuter) {
  const _this = this
  function ChildClass (...argsInner) {
    _this.apply(this, argsOuter.concat(argsInner))
    return this
  }

  function __ () { this.constructor = ChildClass }
  __.prototype = this.prototype
  ChildClass.prototype = new __()

  return ChildClass
}

/*
 * 实现以下打印 success
 * -------------------- */

function Animal (name, color) {
  this.name = name
  this.color = color
}
Animal.prototype.say = function () {
  return `I'm a ${this.color} ${this.name}`
}
const Cat = Animal.bind(null, 'cat')
const cat = new Cat('white')
if (cat.say() === "I'm a white cat" && cat instanceof Cat && cat instanceof Animal) {
  console.log('success')
}
