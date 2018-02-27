module.exports = function solveSudoku(matrix) {
  function Inf(name, num) {
    this.name = name;
    this.num = num;
    this.active = "false";
  }
  function analize(x, y) {
    var i = 0;
    while(i < 9) {
      var z = 0;
      while(z < 9) {
        if((matrix[z][y].name == matrix[x][y].num[i]) ||
        (matrix[x][z].name == matrix[x][y].num[i])) matrix[x][y].num[i] = 0;
        z++;
      }
      var q = 0, qc = 3, w = 0, wc = 3;
      if(x != 0) {
        q=x-x%3;
        qc=q+3;
      }
      if(y != 0) {
        w=y-y%3;
        wc=w+3;
      }
      while(q < qc) {
        while(w < wc) {
          if((matrix[q][w].name != 0) &&
          (matrix[q][w].name == matrix[x][y].num[i])) matrix[x][y].num[i] = 0;
          w++;
        }
        q++;
        w-=3;
      }
      i++;
    }
    return matrix[x][y].num;
  }
  /////////////////////////////////
  function deepAnalize(x,  y) {
    matrix[x][y].active = "true";
    var i = 0;
    while(i < 9) {
      if(matrix[x][y].num[i] != 0) {
        var z = 0, count = 0;
        while(z < 9) {
          if((z != x) && (matrix[z][y].name == 0))
            if(matrix[z][y].num[i] == matrix[x][y].num[i]) count++;
          if((z != y) && (matrix[x][z].name == 0))
            if(matrix[x][z].num[i] == matrix[x][y].num[i]) count++;
          z++;
        }
        if(count == 0) {
          for(var k in matrix[x][y].num) {
            if(matrix[x][y].num[k] != matrix[x][y].num[i]) matrix[x][y].num[k] = 0;
          }
          i++;
          continue;
        }
        else count = 0;
        var q = 0, qc = 3, w = 0, wc = 3;
        if(x != 0) {
          q=x-x%3;
          qc=q+3;
        }
        if(y != 0) {
          w=y-y%3;
          wc=w+3;
        }
        while(q < qc) {
          while(w < wc) {
            if((matrix[q][w].name == 0) && (matrix[q][w].active != matrix[x][y].active) &&
            (matrix[q][w].num[i] == matrix[x][y].num[i])) count++;
            w++;
          }
          q++;
          w-=3;
        }
        if(count == 0) {
          for(var k in matrix[x][y].num) {
            if(matrix[x][y].num[k] != matrix[x][y].num[i]) matrix[x][y].num[k] = 0;
          }
        }
      }
      i++;
    }
    matrix[x][y].active = "false";
    return matrix[x][y].num;
  }
  function postAnalize(x, y) {
    matrix[x][y].active = "true";
    var z = 0;
    while(z < 9) {
      if(matrix[z][y].name == 0)
        if(matrix[z][y].num[matrix[x][y].name - 1] == matrix[x][y].name) matrix[z][y].num[matrix[x][y].name - 1] = 0;
      if(matrix[x][z].name == 0)
        if(matrix[z][y].num[matrix[x][y].name - 1] == matrix[x][y].name) matrix[x][z].num[matrix[x][y].name - 1] = 0;
      z++;
    }
    var q = 0, qc = 3, w = 0, wc = 3;
    if(x != 0) {
      q=x-x%3;
      qc=q+3;
    }
    if(y != 0) {
      w=y-y%3;
      wc=w+3;
    }
    while(q < qc) {
      while(w < wc) {
        if(matrix[q][w].name == 0)
          if(matrix[q][w].num[matrix[x][y].name - 1] == matrix[x][y].name) matrix[q][w].num[matrix[x][y].name - 1] = 0;
        w++;
      }
      q++;
      w-=3;
    }
    matrix[x][y].active = "false";
  }
  //////////////////////////////////////
  function update(x, y) {
    var k = 0, name = 0;
    for(var i in matrix[x][y].num) {
      if(matrix[x][y].num[i] != 0) {
        k++;
        name = matrix[x][y].num[i];
      }
    }
    if(k == 1)  {
      matrix[x][y].num = [];
      return name;
    }
    else if(k > 1) return 0;
    else "Что то пошло не так!";
  }
  function nakedCouples(x, y, array) {
    matrix[x][y].active = "true";
    count = 0;
    for(var i in array) {
      if(array[i] != 0) count++;
    }
    if(count == 2) {
      ////////////////////По строке
      var z = 0, n = 0, q = 0, w = 0;
      while(z < 9) {
        if((matrix[x][z].name == 0) && (matrix[x][z].active != matrix[x][y].active)) {
          for(var i = 0; i < array.length; i++) {
            if(array[i] != matrix[x][z].num[i]) {
              n = 1;
              break;
            }
            if(n == 0) {
              q = x;
              w = z;
              n = 2;
            }
          }
        }
        if(n == 2) break;
        z++;
      }
      if(n == 2) {
        var z =0;
        while(z < 9) {
          if((matrix[x][z].name == 0) && (matrix[x][z].active != matrix[x][y].active) && (z != w)) {
            var i = 0;
            while(i < 9) {
              if(matrix[x][z].num[i] == array[i]) matrix[x][z].num[i] = 0;
              i++;
            }
          }
          z++;
        }
      }
      ////////////////По столбцу
      var z = 0, n = 0, q = 0, w = 0;
      while(z < 9) {
        if((matrix[z][y].name == 0) && (matrix[z][y].active != matrix[x][y].active)) {
          for(var i = 0; i < array.length; i++) {
            if(array[i] != matrix[z][y].num[i]) {
              n = 1;
              break;
            }
            if(n == 0) {
              q = x;
              w = z;
              n = 2;
            }
          }
        }
        if(n == 2) break;
        z++;
      }
      if(n == 2) {
        var z = 0;
        while(z < 9) {
          if((matrix[z][y].name == 0) && (matrix[z][y].active != matrix[x][y].active) && (z != q)) {
            var i = 0;
            while(i < 9) {
              if(matrix[z][y].num[i] == array[i]) matrix[z][y].num[i] = 0;
              i++;
            }
          }
          z++;
        }
      }
      //////////////////По секции
    }
    matrix[x][y].active = "false";
  }
  for(var x= 0; x < 9; x++) {
    for(var y= 0; y < 9; y++) {
      if(matrix[x][y] == 0) {
        matrix[x][y] = new Inf(0, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
      else matrix[x][y] = new Inf(matrix[x][y], []);
    }
  }
  for(var x= 0; x < 9; x++) {
    for(var y= 0; y < 9; y++) {
      if(matrix[x][y].name == 0) {
        matrix[x][y].num = analize(x, y);
        matrix[x][y].name = update(x, y);
        if(matrix[x][y].name != 0) {
          postAnalize(x, y);
          x = 0;
          y = 0;
        }
      }
    }
  }
  for(var x= 0; x < 9; x++) {
    for(var y= 0; y < 9; y++) {
      if(matrix[x][y].name == 0) {
        matrix[x][y].num = deepAnalize(x, y);
        nakedCouples(x, y, matrix);
        matrix[x][y].name = update(x, y);
        matrix[x][y].num = analize(x, y);
        if(matrix[x][y].name != 0) {
          postAnalize(x, y);
          x = 0;
          y = 0;
        }
      }
    }
  }
  for(var x= 0; x < 9; x++) {
    for(var y= 0; y < 9; y++) {
      matrix[x][y] = matrix[x][y].name
    }
  }
  return matrix;
}
