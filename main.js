/*
Правила:
в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь;
если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить;
в противном случае, если соседей меньше двух или больше трёх,
клетка умирает («от одиночества» или «от перенаселённости»)
*/

// исходные данные
var count = 15;
var gameArray = [];

// DOM elements
var make = document.querySelector('.make');
var play = document.querySelector('.play');
var oneTable = document.querySelector('.one-table');

// создание массива со случайными числами 1 и 0
function createMatrix(count, random) {
    var array = new Array(count);

    for ( var i = 0; i < count; i++ ) {
        array[i] = new Array(count);

        for ( var j = 0; j < count; j++ ) {
            array[i][j] = random ? Math.round( Math.random() ) : 0;
        }
    }

    return array;
}

// создание таблицы
function makeMatrixTable(array, element) {
    var table = document.createElement('table');

    for ( var i = 0; i < count; i++ ) {
        var tr = document.createElement('tr');

        for ( var j = 0; j < count; j++ ) {
            var td = document.createElement('td');
            td.textContent = array[i][j];

            if ( array[i][j] > 0 ) {
                td.classList.add('td-black');
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    element.innerHTML = '';
    element.appendChild(table);
}

// создание таблицы
make.addEventListener('click', function() {
    console.clear();
    gameArray = createMatrix(count, true);
    makeMatrixTable(gameArray, oneTable);
});

// Играть
play.addEventListener('click', function() {
    console.clear();
    var newArray = createMatrix(count, false);

    // пробегаемся по массиву
    for ( var i = 0; i < count; i++ ) {
        // пробегаемся по внутреннему массиву
        for ( var j = 0; j < count; j++ ) {
            var newValue = gameArray[i][j];
            var amount = 0;

            for (var n = -1; n <= 1; n++) {
                for (var m = -1; m <= 1; m++) {
                    if ((m != 0 || n != 0) && 0 <= i + n && i + n < count && 0 <= j + m && j + m < count) {
                        amount += gameArray[i + n][j + m];
                    }
                }
            }

            if (amount < 2 || amount > 3) {
                newValue = 0;
            }
            if (amount === 3) {
                newValue = 1;
            }
            newArray[i][j] = newValue;
        }
    }
    gameArray = newArray;
    makeMatrixTable(gameArray, oneTable);
});

