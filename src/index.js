module.exports = function solveSudoku(matrix) {
  function Cell(name, num) {
    this.name = name;
    this.num = num;
  }
  ////////////////////////////////////////////////////////////////////////////
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
  function update(x, y, array) {
    let count = 0, n;
    for(let i = 0; i < 9; i++) {
      if(array[x][y].num[i] != 0) {
        count++;
        n = array[x][y].num[i];
      }
    }
    if(count == 1) {
      array[x][y].name = n;
      array[x][y].num = [];
    }
    return array;
  }
  function rowAnalize(x, y, array) {
    for(let i = 0; i < 9; i++) {
      if(array[x][y].num[i] != 0) {
        //////////////////////////////////////////////////////////////////////
        let y1=undefined, y2=undefined, count = 0;
        let w = 0, wc = 3;
        if(y != 0) {
          w=y-y%3;
          wc=w+3;
        }
        while(w < wc) {
          if((w != y) && (array[x][w].name == 0) && (array[x][w].num[i]==array[x][y].num[i])) {
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
            if(array[r][t] != array[x][y]) {
              if((y1 == undefined) || (array[r][t] != array[x][y1])) {
                if((y2 == undefined) || (array[r][t] != array[x][y2])) {
                  if(array[r][t].num[i] == array[x][y].num[i]) key = 1;
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
            if((e != y) && (array[x][e].num[i] == array[x][y].num[i])) {
              if((y1 == undefined) || (e != y1)) {
                if((y2 == undefined) || (e != y2)) {
                  array[x][e].num[i] = 0;
                }
              }
            }
          }
        }

        //////////////////////////////////////////////////////////////////////
        w = 0; wc = 3; y1 = undefined; y2 = undefined; count = 0;
        if(y != 0) {
          w=y-y%3;
          wc=w+3;
        }

        while(w < wc) {
          if((w != y) && (array[x][w] == 0) && (array[x][w].num[i] == array[x][y].num[i])) {
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
                if(array[x][z].num[i] == array[x][y].num[i]) key = 1;
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
              if(array[r][t] != array[x][y]) {
                if((y1 == undefined) || (array[r][t] != array[x][y1])) {
                  if((y2 == undefined) || (array[r][t] != array[x][y2])) {
                    if(array[r][t].num[i] == array[x][y].num[i]) array[r][t].num[i] = 0;
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
    return array;
  }
  ////////////////////////////////////////////////////////////////////////////
  function columnAnalize(x, y, array) {
    for(let i = 0; i < 9; i++) {
      if(array[x][y].num[i] != 0) {
        //////////////////////////////////////////////////////////////////////
        let x1=undefined, x2=undefined, count = 0;
        let q = 0, qc = 3;
        if(x != 0) {
          q=x-x%3;
          qc=q+3;
        }
        while(q < qc) {
          if((q != y) && (array[q][y].name == 0) && (array[q][y].num[i]==array[x][y].num[i])) {
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
            if(array[r][t] != array[x][y]) {
              if((x1 == undefined) || (array[r][t] != array[x1][y])) {
                if((x2 == undefined) || (array[r][t] != array[x2][y])) {
                  if(array[r][t].num[i] == array[x][y].num[i]) key = 1;
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
            if((e != y) && (array[e][y].num[i] == array[x][y].num[i])) {
              if((x1 == undefined) || (e != x1)) {
                if((x2 == undefined) || (e != x2)) {
                  array[e][y].num[i] = 0;
                }
              }
            }
          }
        }

        //////////////////////////////////////////////////////////////////////
        q = 0; qc = 3; x1 = undefined; x2 = undefined; count = 0;
        if(x != 0) {
          q=x-x%3;
          qc=q+3;
        }

        while(q < qc) {
          if((q != x) && (array[q][y] == 0) && (array[q][y].num[i] == array[x][y].num[i])) {
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
                if(array[z][y].num[i] == array[x][y].num[i]) key = 1;
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
              if(array[r][t] != array[x][y]) {
                if((x1 == undefined) || (array[r][t] != array[x1][y])) {
                  if((x2 == undefined) || (array[r][t] != array[x2][y])) {
                    if(array[r][t].num[i] == array[x][y].num[i]) array[r][t].num[i] = 0;
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
    return array;
  }
  ////////////////////////////////////////////////////////////////////////////
  function oneInPozition(x, y, array) {
    for(let i = 0; i < 9; i++) {
      if(array[x][y].num[i] != 0) {
        let key = 0;
        for(let z = 0; z < 9; z++) {
          if((z != y) && (array[x][z].name == 0)) {
            if(array[x][z].num[i] == array[x][y].num[i]) {
              key = 1;
              break;
            }
          }
        }
        if(key == 0) {
          array[x][y].name = array[x][y].num[i];
          array[x][y].num = [];
          break;
        }
        else key = 0;
        for(let z = 0; z < 9; z++) {
          if((z != x) && (array[z][y].name == 0)) {
            if(array[z][y].num[i] == array[x][y].num[i]) {
              key = 1;
              break;
            }
          }
        }
        if(key == 0) {
          array[x][y].name = array[x][y].num[i];
          array[x][y].num = [];
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
            if((array[q][w] != array[x][y]) && (array[q][w].name == 0)) {
              if(array[q][w].num[i] == array[x][y].num[i]) {
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
          array[x][y].name = array[x][y].num[i];
          array[x][y].num = [];
          break;
        }
      }
    }
    return array;
  }
  ////////////////////////////////////////////////////////////////////////////
  function postAnalize(x, y, array) {
    for(let z = 0; z < 9; z++) {
      if((array[x][z] != array[x][y]) && (array[z][y] != array[x][y])) {
        if(array[x][z].num[array[x][y].name - 1] == array[x][y].name) {
          array[x][z].num[array[x][y].name - 1] = 0;
        }
        if(array[z][y].num[array[x][y].name - 1] == array[x][y].name) {
          array[z][y].num[array[x][y].name - 1] = 0;
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
        if(array[q][w] != array[x][y]) {
          if(array[q][w].num[array[x][y].name - 1] == array[x][y].name) {
            array[q][w].num[array[x][y].name - 1] = 0;
          }
        }
        w++;
      }
      q++;
      w-=3;
    }
    return array;
  }
  ////////////////////////////////////////////////////////////////////////////
  function recursion(array) {
    let key;
    let bomba = array;
    let count = 0, zero = 0;
    for(let q= 0; q < 9; q++) {
      for(let i= 1; i < 10; i++) {
        count = 0;
        for(let w = 0; w < 9; w++) {
          if(bomba[q][w].name == i) count++;
          if(bomba[q][w].name == 0) zero++;
        }
        if(count > 1) break;
        if(zero > 0) break;
      }
      if(count > 1) break;
      if(zero > 0) break;
    }
    if((count == 1) && (zero == 0)) {
      for(let w= 0; w < 9; w++) {
        for(let i= 1; i < 10; i++) {
          count = 0;
          for(let q = 0; q < 9; q++) {
            if(bomba[w][q].name == i) count++;
            if(bomba[w][q].name == 0) zero++;
          }
          if(count > 1) break;
          if(zero > 0) break;
        }
        if(count > 1) break;
        if(zero > 0) break;
      }
    }
    if(zero > 0) {
      for(let q = 0; q < 9; q++) {
        for(let w = 0; w < 9; w++) {
          if(bomba[q][w].name == 0) {
            bomba = analize(q, w, bomba);
            bomba = rowAnalize(q, w, bomba);
            bomba = columnAnalize(q, w, bomba);
            bomba = oneInPozition(q, w, bomba);
            if(bomba[q][w].name == 0) {
              for(let i = 0; i < 9; i++) {
                if(bomba[q][w].num[i] != 0) {
                  bomba[q][w].name = bomba[q][w].num[i];
                  bomba[q][w].num = [];
                  bomba = postAnalize(q, w, bomba);
                  key = recursion(bomba);
                  if((typeof key) != undefined) {
                    return bomba;
                  }
                  ///////////////////////////////////////////////////////////
                  let rout = 0;
                  for(let x= 0; x < 9; x++) {
                    for(let z= 1; z < 10; z++) {
                      rout = 0;
                      for(let y = 0; y < 9; y++) {
                        if(bomba[x][y].name == z) rout++;
                      }
                      if(rout > 1) break;
                    }
                    if(rout > 1) break;
                  }
                  if((rout == 1) && (zero == 0)) {
                    for(let y= 0; y < 9; y++) {
                      for(let z= 1; z < 10; z++) {
                        rout = 0;
                        for(let x = 0; x < 9; x++) {
                          if(bomba[y][x].name == z) rout++;
                        }
                        if(rout > 1) break;
                      }
                      if(rout > 1) break;
                    }
                  }
                  if(rout > 1) {
                    bomba = array;
                  }
                  else console.log("Надеюсь вы это не увидите!");
                  ////////////////////////////////////////
                }
              }
            }
            else if(bomba[q][w].name != 0) {
              bomba = postAnalize(q, w, bomba);
              q = 0;
              w = 0;
            }
          }
        }
      }
    }
    if((count == 1) && (zero == 0)) {
      return bomba;
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
        matrix = analize(x,y,matrix);
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
        matrix = analize(x,y,matrix);
        matrix = rowAnalize(x,y,matrix);
        matrix = columnAnalize(x,y,matrix);
        matrix = oneInPozition(x,y,matrix);
        if(matrix[x][y].name == 0) {
          update(x,y,matrix);
        }
        if(matrix[x][y].name != 0) {
          matrix = postAnalize(x,y,matrix);
          x = 0;
          y = 0;
        }
      }
    }
  }
  for(let x= 0; x < 9; x++) {
    for(let y= 0; y < 9; y++) {
      if(matrix[x][y].name == 0) {
        matrix = analize(x,y,matrix);
        matrix = rowAnalize(x,y,matrix);
        matrix = columnAnalize(x,y,matrix);
        matrix = oneInPozition(x,y,matrix);
        if(matrix[x][y].name == 0) {
          update(x,y,matrix);
        }
        if(matrix[x][y].name != 0) {
          matrix = postAnalize(x,y,matrix);
          x = 0;
          y = 0;
        }
      }
    }
  }
  let count = 0;
  for(let x= 0; x < 9; x++) {
    for(let y= 0; y < 9; y++) {
      if(matrix[x][y].name == 0) {
        count++;
      }
    }
  }
  if(count != 0) {
    matrix = recursion(matrix);
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
