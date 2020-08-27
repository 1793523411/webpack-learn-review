(function () {
  var name = "module-a";

  function method1() {
    console.log(name + "#method1");
  }

  window.moduleA = {
    method1: method1,
  };
})();
