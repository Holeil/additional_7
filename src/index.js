module.exports = function solveSudoku(matrix) {
  function Cell(name, num) {
    this.name = name;
    this.num = num;
  }
  //////////////////////////////////////////////////////////////////////////////
  function analize(x, y, array) {
    for(let i = 0; i < 9; i++) {
      for(let z = 0; z < 9; z++) {
        if((array[z][y].name == array[x][y].num[i]) ||
        (array[x][z].name == array[x][y].num[i])) array[x][y].num[i] = 0;
      }
      let q = 0, qc = 3, w = 0, wc = 3;
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
          if((array[q][w].name != 0) &&
          (array[q][w].name == array[x][y].num[i])) array[x][y].num[i] = 0;
          w++;
        }
        q++;
        w-=3;
      }
    }
    return array;
  }
  ////////////////////////////////////////////////////////////////////////////
  function recursion(x, y) {
    if(y > 8) {
      y = 0;
      x++;
    }
    if(x > 8) {
      return matrix;
    }
    if(matrix[x][y].name == 0) {
      for(let i = 0; i < 9; i++) {
        if(matrix[x][y].num[i] != 0) {
          matrix[x][y].name = matrix[x][y].num[i];
          let key = 1;
          for (let z = 0; z < 9; z++) {
            if ((matrix[x][z].name == matrix[x][y].name) && (z != y)) {
              key = 0;
            }
          }
          for (let z = 0; z < 9; z++) {
            if ((matrix[z][y].name == matrix[x][y].name) && (z != x)) {
              key = 0;
            }
          }
          let q = 0, qc = 3, w = 0, wc = 3;
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
              if((matrix[q][w].name == matrix[x][y].name) && (matrix[q][w] != matrix[x][y])) {
                key = 0;
              }
              w++;
            }
            q++;
            w-=3;
          }
          if(key == 1) {
            if(recursion(x, y+1)) {
              return matrix;
            }
          }
        }
      }
      matrix[x][y].name = 0;
    }
    else return recursion(x, y+1);
  }
  ////////////////////////////////////////////////////////////////////////////
  for(let x= 0; x < 9; x++) {
    for(let y= 0; y < 9; y++) {
      if(matrix[x][y] == 0) {
        matrix[x][y] = new Cell(0, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
      }
      else matrix[x][y] = new Cell(matrix[x][y], []);
    }
  }
  for(let x= 0; x < 9; x++) {
    for(let y= 0; y < 9; y++) {
      if(matrix[x][y].name == 0) {
        matrix = analize(x,y,matrix);
        if(matrix[x][y].name != 0) {
          x = 0;
          y = 0;
        }
      }
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  for(let x= 0; x < 9; x++) {
    for(let y= 0; y < 9; y++) {
      if(matrix[x][y].name == 0) {
        matrix = recursion(x, y);
      }
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  for(let x= 0; x < 9; x++) {
    for(let y= 0; y < 9; y++) {
      matrix[x][y] = matrix[x][y].name;
    }
  }
  ////////////////////////////////////////////////////////////////////////////
  return matrix;
}
/*
for(let x= 0; x < 9; x++) {
  for(let y= 0; y < 9; y++) {
    matrix[x][y] = matrix[x][y].name;
  }
}
*/
