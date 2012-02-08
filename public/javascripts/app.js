(function() {
  var App, Input;
  Input = Input = (function() {
    function Input() {
      window.addEventListener('keyup', this.keyPress, false);
    }
    Input.prototype.keyPress = function(event) {
      var increment;
      increment = 1;
      if (event.keyCode === 37) {
        increment = -1;
      }
      return window.app.move(increment);
    };
    return Input;
  })();
  App = App = (function() {
    function App() {
      var input;
      input = new Input;
      this.slides = document.getElementsByTagName("section");
      this.currentSlide = 0;
      this.setSlide();
    }
    App.prototype.setSlide = function() {
      var slide, _i, _len, _ref;
      _ref = this.slides;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        slide = _ref[_i];
        slide.className = "";
      }
      return this.slides[this.currentSlide].className = "active";
    };
    App.prototype.move = function(increment) {
      this.currentSlide += increment;
      if (this.currentSlide < 0) {
        this.currentSlide = this.slides.length - 1;
      }
      if (this.currentSlide === this.slides.length) {
        this.currentSlide = 0;
      }
      return this.setSlide();
    };
    return App;
  })();
  window.onload = function() {
    return window.app = new App;
  };
}).call(this);
