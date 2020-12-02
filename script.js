// Получение элементов, объявление переменных
const win_text = document.querySelector('.container h1');
const field = document.getElementsByClassName('field')[0];
const replay = document.getElementsByClassName('btn_replay')[0];
let cells;
let i = 0;
let count= 0;

// Генерация клеток
let generate = () => {

  // Очищаем поле
  field.innerHTML = '';

  // Создали массив чисел
  let arr = [];
  for (i = 0; i < 15; i++) {
    arr.push(i+1);
  }

  // Создаём клеточки и помещаем их на поле
  for (i = 0; i < 15; i++) {
    // Создание элемента клеточки
    let cell = document.createElement('div');
    cell.className = 'cell';
    // Генерация случайного индекса
    let index = Math.floor(Math.random() * arr.length);
    // Выбор текста для клеточки со случайным индексом
    cell.innerText = arr[index];
    // Помещение клеточки на поле
    field.append(cell);
    // Удаление из массива числа клеточки, которую уже поместили на поле
    arr.splice(index, 1);
  }

  // Создание пустой клетки
  let cell = document.createElement('div');
  cell.className = 'cell';
  // Помещение пустой клеточки на поле
  field.append(cell);

  cells = document.getElementsByClassName('cell');

  //Вешаем на клеточки обработчики
  for (i = 0; i < cells.length; i++) {
    let cell = i;
    cells[i].addEventListener('click', () => { replace_empty(cell); });
  }

  check_win();
}

// Функция проверки соседних клеточек и перемещения
let replace_empty = (cell) => {

  let around_cells = [
    cell - 4, 
    cell - 1,
    cell + 1,
    cell + 4
  ]

  count = 0;
  for (i = 0; i < 4; i++) {

    if ((around_cells[count] < 0 || around_cells[count] > 15) ||
    (Math.abs(around_cells[count] - cell) == 1 && 
    Math.ceil((around_cells[count] + 1) / 4) != Math.ceil((cell + 1)/4)) ){
      around_cells.splice(count, 1);
    }
    else {
      count++;
    }
  }

  for (i = 0; i < around_cells.length; i++) {

    if (cells[around_cells[i]].innerText == '') {
      let cell_text = cells[cell].innerText;
      cells[cell].innerText = cells[around_cells[i]].innerText;
      cells[around_cells[i]].innerText = cell_text;
    }
  }

  check_win();
  
}

// Проверяем победу
let check_win = () => {
  count = 0;
  for (i = 0; i < cells.length; i++) {
    if (cells[i].innerText == i+1) {
      cells[i].classList.remove('off-place');
      cells[i].classList.add('on-place');
      count++;
    }
    else {
      cells[i].classList.remove('on-place');
      cells[i].classList.add('off-place');
    }
  }
  
  if (count == 15) {
    win_text.classList.remove('invisible');
    replay.classList.remove('invisible');
    field.classList.add('no-click');
  }
}

// Вешаем обработчик для начала новой игры
replay.addEventListener('click', () => { 
  win_text.classList.add('invisible');
  replay.classList.add('invisible');
  field.classList.remove('no-click');
  generate();
});

generate();


