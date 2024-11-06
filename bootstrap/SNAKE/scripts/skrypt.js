$(document).ready(function(){
  
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();
  var jablko;
  var wynik;
  var level;
  var snake;
  var cw = 20;
  var d;
  
  function int()
  {
    d = "right";
    wynik = 0;
    level = 1;
    create_snake();
    create_jablko();
   
    
    if(typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(rys, 100);
  }
  int();
  
   function create_snake()
  {
    var length = 5;
    snake = [];
    for(var i = length-1; i>=0; i--)
      {
        snake.push({x:i, y:0});
      }
  }
  
    function create_jablko()
  {
    jablko = {
      x: Math.round(Math.random()*(w-cw)/cw),
      y: Math.round(Math.random()*(h-cw)/cw),
    };
  }
  
  function rys()
  {
     ctx.fillStyle = "#C0C0C0";
     ctx.fillRect(0, 0, w, h);
     ctx.strokeStyle = "black";
     ctx.strokeRect(0, 0, w, h);
    
    var head_x = snake[0].x;
    var head_y = snake[0].y;
    
    if(d == "right") head_x++;
    else if(d == "left") head_x--;
    else if(d == "up") head_y++;
    else if(d == "down") head_y--;
    
    if(head_x == -1 || head_x == w/cw || head_y == -1 || head_y == h/cw || kolizja(head_x, head_y, snake))
      {
        int();
        return;
      }
    
    if(head_x == jablko.x && head_y == jablko.y)
      {
        var tail = {x: head_x, y: head_y}
        wynik++;
        create_jablko();
      }
    else
      {
        var tail = snake.pop();
        tail.x = head_x; tail.y = head_y;
      }
      
    snake.unshift(tail);
    
    for(var i = 0; i < snake.length; i++)
      {
        var c = snake[i];
        rys_cell(c.x,c.y,"green");
      }
    
      rys_cell(jablko.x,jablko.y, "red");
    
    var wynik_text = "Wynik : " + wynik;
    var level_text = "Level : " + level;
    ctx.fillText(wynik_text,5,h-5);
    ctx.fillText(level_text,60,h-5);
  }
  
  function rys_cell(x,y,color)
  {
    ctx.fillStyle = color;
    ctx.fillRect(x*cw,y*cw,cw,cw);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*cw,y*cw,cw,cw);
  }
  
  function kolizja(x,y,array)
  {
    for(var i = 0; i < array.length; i++)
      {
        if(array[i].x == x && array[i].y == y)
          return true;
      }
    return false;
  }
  
  $(document).keydown(function(e)
  {
              var key = e.which;
              if(key == "37" && d != "right") d = "left";
              else if(key == "38" && d != "up") d = "down";
              else if(key == "39" && d != "left") d = "right";
              else if(key == "40" && d != "down") d = "up";
  })
})
