module.exports = function solveSudoku(matrix) {
  function Cell(name, num) {
    this.name = name;
    this.num = num;
  }
  //////////////////////////////////////////////////////////////////////////////
  function analize(x, y) {
    for(let i = 0; i < 9; i++) {
      for(let z = 0; z < 9; z++) {
        if((matrix[z][y].name == matrix[x][y].num[i]) ||
        (matrix[x][z].name == matrix[x][y].num[i])) matrix[x][y].num[i] = 0;
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
          if((matrix[q][w].name != 0) &&
          (matrix[q][w].name == matrix[x][y].num[i])) matrix[x][y].num[i] = 0;
          w++;
        }
        q++;
        w-=3;
      }
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  function update(x, y) {
    let count = 0, n;
    for(let i = 0; i < 9; i++) {
      if(matrix[x][y].num[i] != 0) {
        count++;
        n = matrix[x][y].num[i];
      }
    }
    if(count == 1) {
      matrix[x][y].name = n;
      matrix[x][y].num = [];
    }
  }
  function rowAnalize(x, y) {
    for(let i = 0; i < 9; i++) {
      if(matrix[x][y].num[i] != 0) {
        ////////////////////////////////////////////////////////////////////////
        let y1=undefined, y2=undefined, count = 0;
        let w = 0, wc = 3;
        if(y != 0) {
          w=y-y%3;
          wc=w+3;
        }
        while(w < wc) {
          if((w != y) && (matrix[x][w].name == 0) && (matrix[x][w].num[i]==matrix[x][y].num[i])) {
            if(count == 0) {
              y1 = w;
              count++;
            }
            if(count == 1) {
              y2 = w;
            }
          }
          w++;
        }
        let r = 0, rc = 3,  t= 0, tc = 3, key = 0;
        if(x != 0) {
          r=x-x%3;
          rc=r+3;
        }
        if(y != 0) {
          t=y-y%3;
          tc=t+3;
        }
        while(r < rc) {
          while(t < tc) {
            if(matrix[r][t] != matrix[x][y]) {
              if((y1 == undefined) || (matrix[r][t] != matrix[x][y1])) {
                if((y2 == undefined) || (matrix[r][t] != matrix[x][y2])) {
                  if(matrix[r][t].num[i] == matrix[x][y].num[i]) key = 1;
                }
              }
            }
            t++;
          }
          r++;
          t-=3;
        }
        if(key == 0) {
          for(var e = 0; e < 9; e++) {
            if((e != y) && (matrix[x][e].num[i] == matrix[x][y].num[i])) {
              if((y1 == undefined) || (e != y1)) {
                if((y2 == undefined) || (e != y2)) {
                  matrix[x][e].num[i] = 0;
                }
              }
            }
          }
        }

        ////////////////////////////////////////////////////////////////////////
        w = 0; wc = 3; y1 = undefined; y2 = undefined; count = 0;
        if(y != 0) {
          w=y-y%3;
          wc=w+3;
        }

        while(w < wc) {
          if((w != y) && (matrix[x][w] == 0) && (matrix[x][w].num[i] == matrix[x][y].num[i])) {
            if(count == 0) {
              y1 = w;
              count++;
            }
            if(count == 1) {
              y2 = w;
            }
          }
          w++;
        }
        key = 0;
        for(let z = 0; z < 9; z++) {
          if(z != y) {
            if((y1 == undefined) || (z != y1)) {
              if((y2 == undefined) || (z != y2)) {
                if(matrix[x][z].num[i] == matrix[x][y].num[i]) key = 1;
              }
            }
          }
        }
        if(key == 0) {
          let r = 0, rc = 3,  t= 0, tc = 3;
          if(x != 0) {
            r=x-x%3;
            rc=r+3;
          }
          if(y != 0) {
            t=y-y%3;
            tc=t+3;
          }
          while(r < rc) {
            while(t < tc) {
              if(matrix[r][t] != matrix[x][y]) {
                if((y1 == undefined) || (matrix[r][t] != matrix[x][y1])) {
                  if((y2 == undefined) || (matrix[r][t] != matrix[x][y2])) {
                    if(matrix[r][t].num[i] == matrix[x][y].num[i]) matrix[r][t].num[i] = 0;
                  }
                }
              }
              t++;
            }
            r++;
            t-=3;
          }
        }
      }
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  function columnAnalize(x, y) {
    for(let i = 0; i < 9; i++) {
      if(matrix[x][y].num[i] != 0) {
        ////////////////////////////////////////////////////////////////////////
        let x1=undefined, x2=undefined, count = 0;
        let q = 0, qc = 3;
        if(x != 0) {
          q=x-x%3;
          qc=q+3;
        }
        while(q < qc) {
          if((q != y) && (matrix[q][y].name == 0) && (matrix[q][y].num[i]==matrix[x][y].num[i])) {
            if(count == 0) {
              x1 = q;
              count++;
            }
            if(count == 1) {
              x2 = q;
            }
          }
          q++;
        }
        let r = 0, rc = 3,  t= 0, tc = 3, key = 0;
        if(x != 0) {
          r=x-x%3;
          rc=r+3;
        }
        if(y != 0) {
          t=y-y%3;
          tc=t+3;
        }
        while(r < rc) {
          while(t < tc) {
            if(matrix[r][t] != matrix[x][y]) {
              if((x1 == undefined) || (matrix[r][t] != matrix[x1][y])) {
                if((x2 == undefined) || (matrix[r][t] != matrix[x2][y])) {
                  if(matrix[r][t].num[i] == matrix[x][y].num[i]) key = 1;
                }
              }
            }
            t++;
          }
          r++;
          t-=3;
        }
        if(key == 0) {
          for(var e = 0; e < 9; e++) {
            if((e != y) && (matrix[e][y].num[i] == matrix[x][y].num[i])) {
              if((x1 == undefined) || (e != x1)) {
                if((x2 == undefined) || (e != x2)) {
                  matrix[e][y].num[i] = 0;
                }
              }
            }
          }
        }

        ////////////////////////////////////////////////////////////////////////
        q = 0; qc = 3; x1 = undefined; x2 = undefined; count = 0;
        if(x != 0) {
          q=x-x%3;
          qc=q+3;
        }

        while(q < qc) {
          if((q != x) && (matrix[q][y] == 0) && (matrix[q][y].num[i] == matrix[x][y].num[i])) {
            if(count == 0) {
              x1 = q;
              count++;
            }
            if(count == 1) {
              x2 = q;
            }
          }
          q++;
        }
        key = 0;
        for(let z = 0; z < 9; z++) {
          if(z != x) {
            if((x1 == undefined) || (z != x1)) {
              if((x2 == undefined) || (z != x2)) {
                if(matrix[z][y].num[i] == matrix[x][y].num[i]) key = 1;
              }
            }
          }
        }
        if(key == 0) {
          let r = 0, rc = 3,  t= 0, tc = 3;
          if(x != 0) {
            r=x-x%3;
            rc=r+3;
          }
          if(y != 0) {
            t=y-y%3;
            tc=t+3;
          }
          while(r < rc) {
            while(t < tc) {
              if(matrix[r][t] != matrix[x][y]) {
                if((x1 == undefined) || (matrix[r][t] != matrix[x1][y])) {
                  if((x2 == undefined) || (matrix[r][t] != matrix[x2][y])) {
                    if(matrix[r][t].num[i] == matrix[x][y].num[i]) matrix[r][t].num[i] = 0;
                  }
                }
              }
              t++;
            }
            r++;
            t-=3;
          }
        }
      }
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  function oneInPozition(x, y) {
    for(let i = 0; i < 9; i++) {
      if(matrix[x][y].num[i] != 0) {
        let key = 0;
        for(let z = 0; z < 9; z++) {
          if((z != y) && (matrix[x][z].name == 0)) {
            if(matrix[x][z].num[i] == matrix[x][y].num[i]) {
              key = 1;
              break;
            }
          }
        }
        if(key == 0) {
          matrix[x][y].name = matrix[x][y].num[i];
          matrix[x][y].num = [];
          break;
        }
        else key = 0;
        for(let z = 0; z < 9; z++) {
          if((z != x) && (matrix[z][y].name == 0)) {
            if(matrix[z][y].num[i] == matrix[x][y].num[i]) {
              key = 1;
              break;
            }
          }
        }
        if(key == 0) {
          matrix[x][y].name = matrix[x][y].num[i];
          matrix[x][y].num = [];
          break;
        }
        else key = 0;
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
            if((matrix[q][w] != matrix[x][y]) && (matrix[q][w].name == 0)) {
              if(matrix[q][w].num[i] == matrix[x][y].num[i]) {
                key = 1;
                break;
              }
            }
            w++;
          }
          if(key == 1) break;
          q++;
          w-=3;
        }
        if(key == 0) {
          matrix[x][y].name = matrix[x][y].num[i];
          matrix[x][y].num = [];
          break;
        }
      }
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  function postAnalize(x, y) {
    for(let z = 0; z < 9; z++) {
      if((matrix[x][z] != matrix[x][y]) && (matrix[z][y] != matrix[x][y])) {
        if(matrix[x][z].num[matrix[x][y].name - 1] == matrix[x][y].name) {
          matrix[x][z].num[matrix[x][y].name - 1] = 0;
        }
        if(matrix[z][y].num[matrix[x][y].name - 1] == matrix[x][y].name) {
          matrix[z][y].num[matrix[x][y].name - 1] = 0;
        }
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
        if(matrix[q][w] != matrix[x][y]) {
          if(matrix[q][w].num[matrix[x][y].name - 1] == matrix[x][y].name) {
            matrix[q][w].num[matrix[x][y].name - 1] = 0;
          }
        }
        w++;
      }
      q++;
      w-=3;
    }
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
        analize(x, y);
        if(matrix[x][y].name != 0) {
          x = 0;
          y = 0;
        }
      }
    }
  }
  for(let x= 0; x < 9; x++) {
    for(let y= 0; y < 9; y++) {
      if(matrix[x][y].name == 0) {
        analize(x,y);
        rowAnalize(x, y);
        columnAnalize(x, y);
        oneInPozition(x, y);
        if(matrix[x][y].name == 0) {
          update(x, y);
        }
        if(matrix[x][y].name != 0) {
          postAnalize(x,y);
          x = 0;
          y = 0;
        }
      }
    }
  }
  for(let x= 0; x < 9; x++) {
    for(let y= 0; y < 9; y++) {
      matrix[x][y] = matrix[x][y].name;
    }
  }
  return matrix;
}
/*
for(let x= 0; x < 9; x++) {
  for(let y= 0; y < 9; y++) {
    matrix[x][y] = matrix[x][y].name;
  }
}
*/
