(function() {
  var App, Input;

  Input = Input = (function() {

    function Input() {
      window.addEventListener('keyup', this.keyPress, false);
    }

    Input.prototype.keyPress = function(event) {
      var increment;
      increment = 1;
      if (event.keyCode === 37) increment = -1;
      return window.app.move(increment);
    };

    return Input;

  })();

  App = App = (function() {

    function App() {
      var input;
      input = new Input;
      this.slides = document.getElementsByTagName("section");
      this.header = document.getElementsByTagName("header")[0];
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
      this.slides[this.currentSlide].className = "active";
      return this.header.style.backgroundColor = "rgba(" + (this.roundom(255)) + "," + (this.roundom(255)) + "," + (this.roundom(255)) + ",0.3)";
    };

    App.prototype.move = function(increment) {
      this.currentSlide += increment;
      if (this.currentSlide < 0) this.currentSlide = this.slides.length - 1;
      if (this.currentSlide === this.slides.length) this.currentSlide = 0;
      return this.setSlide();
    };

    App.prototype.roundom = function(int) {
      return Math.ceil(Math.random() * int);
    };

    return App;

  })();

  window.addEventListener("load", function() {
    return window.app = new App;
  }, false);

}).call(this);
