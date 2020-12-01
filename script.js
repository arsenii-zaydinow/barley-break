// Получили эелемнт поля
let field = document.getElementsByClassName('field')[0];
let i;

//Функция дл генерации массива чисел от 1 до 15
let gen_array = () => {
  let arr = [];
  for (i = 0; i < 15; i++) {
    arr.push(i+1);
  }
  return arr;
}

//Создали массив с помощью функции выше
let arr = gen_array();

// Создаём клеточки и помещаем их на поле
for (i = 0; i < 15; i++) {
  //Создание элемента клеточки
  let cell = document.createElement('div');
  cell.className = 'cell';
  //Генерация случайного индекса
  let index = Math.floor(Math.random() * arr.length);
  //Выбор текста для клеточки со случайным индексом
  cell.innerText = arr[index];
  //Помещение клеточки на поле
  field.append(cell);
  //Удаление из массива числа клеточки, которую уже поместили на поле
  arr.splice(index, 1);
}

//Создание пустой клетки
let cell = document.createElement('div');
cell.className = 'cell';
//Помещение пустой клеточки на поле
field.append(cell);

//Получение массива клеточек
let cells = document.getElementsByClassName('cell');

let check_empty = (cell) => {

  let around_cells = [
    cell - 4, 
    cell - 1,
    cell + 1,
    cell + 4
  ]

  console.log(around_cells);

  let count= 0;
  for (i = 0; i < 4; i++) {
    if ((around_cells[count] < 0 || around_cells[count] > 15) ||
    (Math.abs(around_cells[count] - cell == 1 && 
    Math.ceil((around_cells[count] + 1) / 4) != Math.ceil((cell + 1)/4)) )){
      
      around_cells.splice(count, 1);
    }
    else {
      count++;
    }
  }

  console.log(around_cells);

  // if (cells[cell+4].innerText == '') {
  //   console.log('Пусто!');
  // }
  // else {
  //   console.log(cells[cell+4].innerText);
  // }
  
}

for (i = 0; i < cells.length; i++) {
  let cell = i;
  cells[i].addEventListener('click', () => { check_empty(cell); });
}


