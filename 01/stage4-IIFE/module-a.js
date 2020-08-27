
;(function ($) { // 通过参数明显表明这个模块的依赖
    var name = 'module-a'
  
    function method1 () {
      console.log(name + '#method1')
      $('body').animate({ margin: '200px' })
    }
  
    window.moduleA = {
      method1: method1
    }
  })(jQuery)