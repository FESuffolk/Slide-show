Input = class Input

  constructor: ->
    window.addEventListener 'keyup', @keyPress, false

  keyPress : (event)->
    increment = 1
    increment = -1 if event.keyCode is 37
    window.app.move increment

App = class App
  constructor: ->
    input = new Input
    @slides = document.getElementsByTagName "section"
    @currentSlide = 0
    @setSlide()

  setSlide: ->
    slide.className = "" for slide in @slides
    @slides[@currentSlide].className = "active"

  move: (increment)->
    @currentSlide += increment;
    @currentSlide = @slides.length-1 if @currentSlide < 0
    @currentSlide = 0 if @currentSlide is @slides.length
    @setSlide()

window.onload = ->
  window.app = new App