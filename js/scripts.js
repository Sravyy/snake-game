var PIXEL_SIZE = 5;    // matching with the css size of .snake
var BOARD_WIDTH = 80;   // container size(300)/PIXEL_SIZE(5)

function SnakePiece(container, parent) {
    var x=0, y=0;
    var vx = 1, vy = 0;    // vx is 1 to make it constantly move to the right
    var children = [];
    var snake = $("<div class = 'snake'/>");
    snake.appendTo(container);

    var self = {
      update: function () {

        //find new position based on current Velocity
        x += vx;
        y += vy;

        //keep snake with in the container
        if(x < 0) x = 0;                             //to stop snake when it hits the wall - top co-ordinates
        if(y < 0) y = 0;                             //to stop snake when it hits the wall - left co-ordinates
        if(x >= BOARD_WIDTH) x = BOARD_WIDTH - 1;    //bottom
        if(y >= BOARD_WIDTH) y = BOARD_WIDTH - 1;    //right
        this.moveSnake(x, y);
        this.render();
        //move the pixel on the screen

      },

      directSnake: function(_vx, _vy){
        vx = _vx;
        vy = _vy;                        //directing the snake in the given directions below(the arrow keys)
      },

      moveSnake: function(_x, _y){
        children.forEach(function(child) {child.moveSnake(x, y)});
        x = _x;
        y = _y;
        this.render();
      },

      render:function () {
        snake.css({
          left: x * PIXEL_SIZE,
          top : y * PIXEL_SIZE,
        });
      },

      addChild: function (child) {
        children.push(child);
      },
    };

    if(parent) parent.addChild(self);

    return self
};




$(function(){
  var container = $(".container");
  var head = SnakePiece(container);
  var pieces = [head];
  for(var i = 0; i < 80; i++){                                    //80 is the no. of pieces attached to the head
  pieces.push(SnakePiece(container, pieces[pieces.length - 1]));
} ;

  setInterval(function(){
    head.update();
  }, 50);  //updating snake every half second

  $(document.body).on("keydown", function(event){
    switch (event.which) {
      case 38: head.directSnake(0, -1); break; //up
      case 40: head.directSnake(0, +1); break; //down
      case 37: head.directSnake(-1, 0); break; //left
      case 39: head.directSnake(1, 0); break; //right
    }
  });

});
