// --- 5.1 Методы у примитивов ---
// Как вы думаете, это сработает? Что выведется на экран?
// let str = "Привет";

// str.test = 5;

// alert(str.test);
/* Ответ: Не сработает, выводит undefined.
Строка str – примитив, который имеет свой собственный «объект-обёртку".
В момент обращения к свойству примитива, создаётся специальный объект, который знает значение строки.
После получения свойства test специальный объект удаляется, оставляя только примитив str.

В строгом режиме, попытка изменения этого объекта выдаёт ошибку.
 */

// --- 5.2 Числа ---
// Создайте скрипт, который запрашивает ввод двух чисел (используйте prompt) и после показывает их сумму.
let num1 = +prompt("Введите первое число", "");
let num2 = +prompt("Введите второе число", "");

alert(num1 + num2);
// --------------------------------------------------------------------------------------------
/*Создайте функцию readNumber, которая будет запрашивать ввод числового значения до тех пор,
пока посетитель его не введёт.
Функция должна возвращать числовое значение.
Также надо разрешить пользователю остановить процесс ввода, отправив пустую строку или нажав «Отмена».
В этом случае функция должна вернуть null.*/
function readNumber() {
    let num;
    do {
        num = prompt("Введите число", "");
    }
    while (!isFinite(num));

    if (num === null || num === "") return null;

    return +num;
}

alert(`Полученное число: ${readNumber()}`);


// --- 5.3 Строки ---
// Напишите функцию ucFirst(str), возвращающую строку str с заглавным первым символом.
function ucFirst(str) {
    if (str) {
        return str[0].toUpperCase() + str.slice(1);

    }
    return str;
}

alert(`Имя: ${ucFirst("алина")}`);
// --------------------------------------------------------------------------------------------
/*Напишите функцию checkSpam(str), возвращающую true, если str содержит 'viagra' или 'XXX', а иначе false.
Функция должна быть нечувствительна к регистру*/
function checkSpam(str) {
    let lowerStr = str.toLowerCase();

    return lowerStr.includes('viagra') || lowerStr.includes('xxx');
}

alert(checkSpam('buy ViAgRA now'));
alert(checkSpam('free xxxxx'));
alert(checkSpam("innocent rabbit"));
// --------------------------------------------------------------------------------------------
/*Создайте функцию truncate(str, maxlength), которая проверяет длину строки str и,
если она превосходит maxlength, заменяет конец str на "…", так, чтобы её длина стала равна maxlength.
Результатом функции должна быть та же строка, если усечение не требуется,
либо, если необходимо, усечённая строка.*/
function truncate(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength - 1) + '…'
    }
    return str;
}
alert(truncate("Вот, что мне хотелось бы сказать на эту тему:", 20));
alert(truncate("Всем привет!", 20));

// --- 5.4 Массивы ---
// Давайте произведём 5 операций с массивом.
// Создайте массив styles с элементами «Джаз» и «Блюз».
let styles = ["Джаз", "Блюз"];
alert(styles);

//Добавьте «Рок-н-ролл» в конец.
styles.push("Рок-н-ролл");
alert(styles);

// Замените значение в середине на «Классика». Ваш код для поиска значения в середине должен работать для массивов с любой длиной.
styles[Math.floor((styles.length - 1) / 2)] = "Классика";
alert(styles);

// Удалите первый элемент массива и покажите его.
alert(styles.shift());
alert(styles);

// Вставьте «Рэп» и «Регги» в начало массива.
styles.unshift("Рэп", "Регги");
alert(styles);
// --------------------------------------------------------------------------------------------
// Каков результат? Почему?
let arr = ["a", "b"];

arr.push(function () {
    alert(this);
})

arr[2](); // вызов функции arr[2] как метода объекта => выводит массив из 3 элементов ("a","b", function)


// --- 5.5 Методы массивов ---
/*Напишите функцию camelize(str), которая преобразует строки вида «my-short-string» в «myShortString».
То есть дефисы удаляются, а все слова после них получают заглавную букву.*/
function camelize(str) {
    str = str.split("-");
    str = str.map((item, index) => index == 0 ? item : item[0].toUpperCase() + item.slice(1));
    str = str.join("");
    return str;
}
alert(camelize("background-color"));
alert(camelize("list-style-image"));
alert(camelize("-webkit-transition"));
// --------------------------------------------------------------------------------------------
// Скопировать и отсортировать массив
/*У нас есть массив строк arr. Нужно получить отсортированную копию, но оставить arr неизменённым.

Создайте функцию copySorted(arr), которая будет возвращать такую копию.*/
function copySorted(arr) {
    return arr.slice().sort();
}

let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert(sorted); // CSS, HTML, JavaScript
alert(arr); // HTML, JavaScript, CSS (без изменений)
// --------------------------------------------------------------------------------------------
// Создать расширяемый калькулятор
/* Создайте функцию конструктор Calculator, которая создаёт «расширяемые» объекты калькулятора.
-- 1 --
Во-первых, реализуйте метод calculate(str), который принимает строку типа "1 + 2" в формате
«ЧИСЛО оператор ЧИСЛО» (разделено пробелами) и возвращает результат. Метод должен понимать плюс + и минус -.
 -- 2 --
Затем добавьте метод addMethod(name, func), который добавляет в калькулятор новые операции.
Он принимает оператор name и функцию с двумя аргументами func(a,b), которая описывает его.

Например, давайте добавим умножение *, деление / и возведение в степень **:*/
function Calculator() {

    this.methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b
    };

    this.calculate = function (str) {

        let split = str.split(' '),
            a = +split[0],
            operator = split[1],
            b = +split[2]

        if (!this.methods[operator] || isNaN(a) || isNaN(b)) {
            return NaN;
        }

        return this.methods[operator](a, b);
    }

    this.addMethod = function (name, func) {
        this.methods[name] = func;
    };
}

let calc = new Calculator;
alert(calc.calculate("3 + 7")); // 10

let powerCalc = new Calculator;
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("2 ** 3");
alert(result); // 8
// --------------------------------------------------------------------------------------------
// Трансформировать в массив имён
/*У вас есть массив объектов user, и в каждом из них есть user.name. 
Напишите код, который преобразует их в массив имён.*/
let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let users = [vasya, petya, masha];

let names = users.map(item => item.name);

alert(names); // Вася, Петя, Маша
// --------------------------------------------------------------------------------------------
/* У вас есть массив объектов user, и у каждого из объектов есть name, surname и id.

Напишите код, который создаст ещё один массив объектов с параметрами id и fullName,
где fullName – состоит из name и surname*/
let vasya = { name: "Вася", surname: "Пупкин", id: 1 };
let petya = { name: "Петя", surname: "Иванов", id: 2 };
let masha = { name: "Маша", surname: "Петрова", id: 3 };

let users = [vasya, petya, masha];

let usersMapped = users.map(user => ({
    fullName: `${user.name} ${user.surname}`,
    id: user.id
}));

/*
usersMapped = [
  { fullName: "Вася Пупкин", id: 1 },
  { fullName: "Петя Иванов", id: 2 },
  { fullName: "Маша Петрова", id: 3 }
]
*/

alert(usersMapped[0].id) // 1
alert(usersMapped[0].fullName) // Вася Пупкин
// --------------------------------------------------------------------------------------------
// Отсортировать пользователей по возрасту
// Напишите функцию sortByAge(users), которая принимает массив объектов со свойством age и сортирует их по нему.
function sortByAge(arr) {
    arr.sort((user1, user2) => user1.age > user2.age ? 1 : -1);
}

let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let arr = [vasya, petya, masha];

sortByAge(arr);

// теперь: [vasya, masha, petya]
alert(arr[0].name); // Вася
alert(arr[1].name); // Маша
alert(arr[2].name); // Петя


// --- 2.7 Map и Set ---
// Фильтрация уникальных элементов массива
/* Допустим, у нас есть массив arr.
Создайте функцию unique(arr), которая вернёт массив уникальных, не повторяющихся значений массива arr.*/
function unique(arr) {
    let set = new Set(arr);
    set = Array.from(set);
    return set;
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert(unique(values)); // Hare,Krishna,:-O
// --------------------------------------------------------------------------------------------
// Перебираемые ключи
/* Мы хотели бы получить массив ключей map.keys() в переменную и далее работать с ними,
например, применить метод .push.
Но это не выходит:*/

// let map = new Map();

// map.set("name", "John");

// let keys = map.keys();

// // Error: keys.push is not a function
// // Ошибка: keys.push -- это не функция
// keys.push("more");
// Почему? Что нужно поправить в коде, чтобы вызов keys.push сработал?
/* Ответ: map.keys() – возвращает итерируемый объект по ключам, а не массив, поэтому следует
воспользоваться Array.from() для конвертации в массив*/
let map = new Map();
map.set("name", "John");

let keys = Array.from(map.keys());

keys.push("more");
alert(keys);


// --- 5.8 WeakMap и WeakSet --- 
// Хранение отметок "не прочитано"
/* Есть массив сообщений:

let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
У вас есть к ним доступ, но управление этим массивом происходит где-то ещё.
Добавляются новые сообщения и удаляются старые, и вы не знаете в какой момент это может произойти.

Имея такую вводную информацию, решите, какую структуру данных вы могли бы использовать для ответа на вопрос
«было ли сообщение прочитано?». Структура должна быть подходящей, чтобы можно было однозначно сказать,
было ли прочитано это сообщение для каждого объекта сообщения.*/

/* Ответ: WeakSet -- используемая структура данных (хранит только объекты и удаляет их,
как только они становятся недостижимыми иными путями.*/
let messages = [
    { text: "Hello", from: "John" },
    { text: "How goes?", from: "John" },
    { text: "See you soon", from: "Alice" }
];

let readMsg = new WeakSet();
readMsg.add(messages[0]);
readMsg.add(messages[2]);

alert(`Сообщение 2 было прочитано? (${readMsg.has(messages[2])})`);
// --------------------------------------------------------------------------------------------
// Хранение времени прочтения
/*Есть массив сообщений такой же, как и в предыдущем задании.

Теперь вопрос стоит так: какую структуру данных вы бы предложили использовать 
для хранения информации о том, когда сообщение было прочитано?
В предыдущем задании нам нужно было сохранить только факт прочтения «да или нет». 
Теперь же нам нужно сохранить дату, и она должна исчезнуть из памяти при удалении «сборщиком мусора» сообщения*/

/*Ответ: WeakMap -- используемая структура данных (использует в качестве ключей только объекты, и автоматически
удаляет их вместе с соответствующими значениями, как только они становятся недостижимыми иными путями.)*/
let messages2 = [
    { text: "Hello", from: "John" },
    { text: "How goes?", from: "John" },
    { text: "See you soon", from: "Alice" }
];

let readMsgDate = new WeakMap();

readMsgDate.set(messages2[0], new Date(2021, 1, 22));


// --- 5.9 Object.keys, values, entries ---
//Сумма свойств объекта
/* Есть объект salaries с произвольным количеством свойств, содержащих заработные платы.

Напишите функцию sumSalaries(salaries), которая возвращает сумму всех зарплат 
с помощью метода Object.values и цикла for..of.

Если объект salaries пуст, то результат должен быть 0.*/
function sumSalaries(salaries) {
    let sum = 0;
    for (let value of Object.values(salaries)) {
        sum += value;
    }
    return sum;
}

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

alert(sumSalaries(salaries)); // 650
// --------------------------------------------------------------------------------------------
// Подсчёт количества свойств объекта
/*Напишите функцию count(obj), которая возвращает количество свойств объекта:
Постарайтесь сделать код как можно короче.*/
function count(user) {
    return Object.keys(user).length;
}

let user = {
    name: 'John',
    age: 30
};

alert(count(user)); // 2

// --- 5.10 Деструктурирующее присваивание ---
// Деструктурирующее присваивание
/*Напишите деструктурирующее присваивание, которое:

свойство name присвоит в переменную name.
свойство years присвоит в переменную age.
свойство isAdmin присвоит в переменную isAdmin (false, если нет такого свойства)*/

let user = { name: "John", years: 30 };

let { name, years: age, isAdmin = false } = user;

alert(name); // John
alert(age); // 30
alert(isAdmin); // false
// --------------------------------------------------------------------------------------------
// Максимальная зарплата
/* У нас есть объект salaries с зарплатами:
Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника.

Если объект salaries пустой, то нужно вернуть null.
Если несколько высокооплачиваемых сотрудников, можно вернуть любого из них. */
function topSalary(salaries) {
    top_worker = null;
    max_salary = 0;
    for (let [name, value] of Object.entries(salaries)) {
        if (value > max_salary) {
            max_salary = value;
            top_worker = name;
        }
    }
    return top_worker;
}

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

alert(topSalary(salaries));


// --- 5.11 Дата и время ---
// Создайте дату
// Создайте объект Date для даты: 20 февраля 2012 года, 3 часа 12 минут. Временная зона – местная.
let date = new Date(2012, 1, 20, 3, 12);
alert(date);
// --------------------------------------------------------------------------------------------
// Покажите день недели
/* Напишите функцию getWeekDay(date), показывающую день недели в коротком формате:
«ПН», «ВТ», «СР», «ЧТ», «ПТ», «СБ», «ВС».*/
function getWeekDay(date) {
    let days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    return days[date.getDay()];
}

let date = new Date(2012, 0, 3);  // 3 января 2012 года
alert(getWeekDay(date));        // нужно вывести "ВТ"
// --------------------------------------------------------------------------------------------
// День недели в европейской нумерации
/*В Европейских странах неделя начинается с понедельника (день номер 1), затем идёт вторник (номер 2)
и так до воскресенья (номер 7). Напишите функцию getLocalDay(date), 
которая возвращает «европейский» день недели для даты date.*/
function getLocalDay(date) {
    let days = [7, 1, 2, 3, 4, 5, 6];

    return days[date.getDay()];
}


let date = new Date(2012, 0, 3);  // 3 января 2012 года
alert(getLocalDay(date));       // вторник, нужно показать 2
// --------------------------------------------------------------------------------------------
// Последнее число месяца?
/*Напишите функцию getLastDayOfMonth(year, month), возвращающую последнее число месяца.
Иногда это 30, 31 или даже февральские 28/29.
Параметры: year – год из четырёх цифр, например, 2012. month – месяц от 0 до 11.*/
function getLastDayOfMonth(year, month) {
    let lastDay = new Date(year, month + 1, 0);
    return lastDay.getDate();
}

alert(getLastDayOfMonth(2012, 1));  //29 (високосный год, февраль).
alert(getLastDayOfMonth(2021, 1));  //28 
// --------------------------------------------------------------------------------------------
// Сколько сегодня прошло секунд?
/*Напишите функцию getSecondsToday(), возвращающую количество секунд с начала сегодняшнего дня.*/
function getSecondsToday() {
    let dateToday = new Date();
    return dateToday.getHours() * 3600 + dateToday.getMinutes() * 60 + dateToday.getSeconds();
}

alert(getSecondsToday());
// --------------------------------------------------------------------------------------------
// Сколько секунд осталось до завтра?
// Создайте функцию getSecondsToTomorrow(), возвращающую количество секунд до завтрашней даты.
function getSecondsToTomorrow() {
    let today = new Date();
    let maxSecondsInADay = 86400;
    today = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();

    tomorrowDate = maxSecondsInADay - today;
    return tomorrowDate;
}

alert(getSecondsToTomorrow());


// --- 5.12 Формат JSON, метод toJSON ---
// Преобразуйте user в JSON, затем прочитайте этот JSON в другую переменную.
let user = {
    name: "Василий Иванович",
    age: 35
};

alert(JSON.stringify(user));
let newUser = JSON.parse(JSON.stringify(user));
alert(newUser);
// --------------------------------------------------------------------------------------------
// Исключить обратные ссылки
/* В простых случаях циклических ссылок мы можем исключить свойство,
из-за которого они возникают, из сериализации по его имени.
Но иногда мы не можем использовать имя, так как могут быть и другие, нужные,
свойства с этим именем во вложенных объектах. Поэтому можно проверять свойство по значению.

Напишите функцию replacer для JSON-преобразования, которая удалит свойства, ссылающиеся на meetup:*/
let room = {
  number: 23
};

let meetup = {
  title: "Совещание",
  occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
  place: room
};

// цикличные ссылки
room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
    return (key != "" && value == meetup) ? undefined : value;
}));

/* в результате должно быть:
{
  "title":"Совещание",
  "occupiedBy":[{"name":"Иванов"},{"name":"Петров"}],
  "place":{"number":23}
}
*/