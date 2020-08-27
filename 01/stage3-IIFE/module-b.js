(function () {
  var name = "module-b";

  function method1() {
    console.log(name + "#method1");
  }

  window.moduleB = {
    method1: method1,
  };
})();

// 这种方式带来了私有成员的概念，私有成员只能在模块成员内通过闭包的形式访问，这就解决了前面所提到的全局作用域污染和命名冲突的问题。