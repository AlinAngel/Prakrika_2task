// --- 6.1 Рекурсия и стек ---
// Вычислить сумму чисел до данного
// Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.
/*Сделайте три варианта решения:

С использованием цикла.*/
// function sumTo(n) {
//     let sum = 0;
//     for (let i = 0; i <= n; i++) {
//         sum += i;
//     }
//     return sum;
// }

// alert(sumTo(100)); // 5050

// // Через рекурсию, т.к. sumTo(n) = n + sumTo(n-1) for n > 1.
// function sumTo(n) {
//     if (n == 1) return 1;
//     return n + sumTo(n - 1);
// }

// alert(sumTo(100));

// // С использованием формулы арифметической прогрессии.
// function sumTo(n) {
//     return n * (n + 1) / 2;
// }

// alert(sumTo(100));

// /*P.S. Какой вариант решения самый быстрый? Самый медленный? Почему?
// Ответ: Вариант с использованием формулы самый быстрый, т.к. использует всего три операции для любого n
// Вариант с рекурсией самый медленный из-за вложенности вызовов.
// P.P.S. Можно ли при помощи рекурсии посчитать sumTo(100000)?
// Ответ: Можно, если максимальный размер стека это допускает*/
// // --------------------------------------------------------------------------------------------
// // Числа Фибоначчи
// // Напишите функцию fib(n) которая возвращает n-е число Фибоначчи.
// function fib(n) {
//     if (n >= 2) {
//         return fib(n - 1) + fib(n - 2);
//     }
//     else return n;
// }

// alert(fib(3)); // 2
// alert(fib(7)); // 13
// // alert(fib(45)); // 1134903170
// // --------------------------------------------------------------------------------------------
// // Вывод односвязного списка
// /* Напишите функцию printList(list), которая выводит элементы списка по одному.
// Сделайте два варианта решения: используя цикл и через рекурсию.
// Как лучше: с рекурсией или без?*/
// let list = {
//     value: 1,
//     next: {
//         value: 2,
//         next: {
//             value: 3,
//             next: {
//                 value: 4,
//                 next: null
//             }
//         }
//     }
// };

// // Цикл
// function printList(list) {
//     let tmp = list;
//     while (tmp) {
//         alert(tmp.value);
//         tmp = tmp.next;
//     }
// }
// printList(list);

// // Рекурсия
// function printList(list) {
//     alert(list.value);

//     if (list.next) printList(list.next);
// }
// printList(list);
// // --------------------------------------------------------------------------------------------
// // Вывод односвязного списка в обратном порядке
// // Цикл
// function printReverseList(list) {
//     let tmp = list;
//     let arr_tmp = [];
//     while (tmp) {
//         arr_tmp.push(tmp.value);
//         tmp = tmp.next;
//     }

//     for (let i = arr_tmp.length - 1; i >= 0; i--) {
//         alert(arr_tmp[i]);
//     }
// }
// printReverseList(list);

// // Рекурсия
// function printReverseList(list) {
//     if (list.next) printReverseList(list.next);

//     alert(list.value);
// }
// printReverseList(list);


// // --- 6.3 Замыкание ---
// // Независимы ли счётчики?
// /*Здесь мы делаем два счётчика: counter и counter2, используя одну и ту же функцию makeCounter.
// Они независимы? Что покажет второй счётчик? 0,1 или 2,3 или что-то ещё?*/
// function makeCounter() {
//     let count = 0;

//     return function () {
//         return count++;
//     };
// }

// let counter = makeCounter();
// let counter2 = makeCounter();

// alert(counter()); // 0
// alert(counter()); // 1

// alert(counter2()); // ? Ответ: 0
// alert(counter2()); // ? Ответ: 1
// // Ответ: счетчики являются независимыми, т.к. созданы разными вызовами makeCounter (независимые внешние лексические окружения)
// // --------------------------------------------------------------------------------------------
// //Объект счётчика
// /*Здесь объект счётчика создан с помощью функции-конструктора.
// Будет ли он работать? Что покажет?*/

// function Counter() {
//     let count = 0;

//     this.up = function () {
//         return ++count;
//     };
//     this.down = function () {
//         return --count;
//     };
// }

// let counter = new Counter();

// alert(counter.up()); // ?   Ответ: 1
// alert(counter.up()); // ?   Ответ: 2
// alert(counter.down()); // ? Ответ: 1
// // Ответ: будет работать, т.к. для обеих вложенных функций одинаково внешнее лексическое окружение 
// // --------------------------------------------------------------------------------------------
// // Фильтрация с помощью функции
// /*У нас есть встроенный метод arr.filter(f) для массивов. Он фильтрует все элементы с помощью функции f.
// Если она возвращает true, то элемент добавится в возвращаемый массив.

// Сделайте набор «готовых к употреблению» фильтров:

// inBetween(a, b) – между a и b (включительно).
// inArray([...]) – находится в данном массиве.
// Они должны использоваться таким образом:

// arr.filter(inBetween(3,6)) – выбирает только значения между 3 и 6 (включительно).
// arr.filter(inArray([1,2,3])) – выбирает только элементы, совпадающие с одним из элементов массива
// */
// function inBetween(a, b) {
//     return function (num) {
//         if (num >= a && num <= b) {
//             return num;
//         }
//     }
// }

// function inArray(arr) {
//     return function (elem) {
//         return arr.includes(elem);
//     }
// }

// let arr = [1, 2, 3, 4, 5, 6, 7];

// alert(arr.filter(inBetween(3, 6))); // 3,4,5,6

// alert(arr.filter(inArray([1, 2, 10]))); // 1,2
// // --------------------------------------------------------------------------------------------
// // Сортировать по полю
// /* У нас есть массив объектов, который нужно отсортировать (users)
// Обычный способ был бы таким:

// // по имени (Ann, John, Pete)
// users.sort((a, b) => a.name > b.name ? 1 : -1);

// // по возрасту (Pete, Ann, John)
// users.sort((a, b) => a.age > b.age ? 1 : -1);
// Можем ли мы сделать его короче? То есть, чтобы вместо функции, мы просто писали byField(fieldName).

// Напишите функцию byField, которая может быть использована для этого.*/
// function byField(fieldName) {
//     return function (a, b) {
//         return a[fieldName] > b[fieldName] ? 1 : -1
//     };

// }

// let users = [
//     { name: "John", age: 20, surname: "Johnson" },
//     { name: "Pete", age: 18, surname: "Peterson" },
//     { name: "Ann", age: 19, surname: "Hathaway" }
// ];

// users.sort(byField('name'));
// users.forEach(user => alert(user.name));  // Ann, John, Pete
// users.sort(byField('age'));
// users.forEach(user => alert(user.name)); // Pete, Ann, John
// --------------------------------------------------------------------------------------------
// Армия функций
/*Следующий код создаёт массив из стрелков (shooters).
Каждая функция предназначена выводить их порядковые номера. Но что-то пошло не так…
function makeArmy() {
  let shooters = [];
  
  let i = 0;
  while (i < 10) {
      let shooter = function() { // функция shooter
        alert( i ); // должна выводить порядковый номер
    };
    shooters.push(shooter);
    i++;
}

return shooters;
}

let army = makeArmy();

army[0](); // у 0-го стрелка будет номер 10
army[5](); // и у 5-го стрелка тоже будет номер 10
// ... у всех стрелков будет номер 10, вместо 0, 1, 2, 3...
Почему у всех стрелков одинаковые номера? Почините код, чтобы он работал как задумано.
Ответ: внутри функций shooter нет локальной переменной i, поэтому при вызове army[5]() функция makeArmy() уже завершилась
и значение i (10) берётся по окончании цикла while).*/
// Исправленный код:
// function makeArmy() {
//     let shooters = [];

//     for (let i = 0; i < 10; i++) {
//         let shooter = function () { // функция shooter
//             alert(i); // должна выводить порядковый номер
//         };
//         shooters.push(shooter);
//     }

//     return shooters;
// }

// let army = makeArmy();

// army[0](); // 0
// army[5](); // 5


// --- 6.6 Объект функции, NFE ---
// Установка и уменьшение значения счётчика
/*Измените код makeCounter() так, чтобы счётчик мог увеличивать и устанавливать значение:

counter() должен возвращать следующее значение (как и раньше).
counter.set(value) должен устанавливать счётчику значение value.
counter.decrease() должен уменьшать значение счётчика на 1.
Посмотрите код из песочницы с полным примером использования.

P.S. Для того, чтобы сохранить текущее значение счётчика, можно воспользоваться как замыканием,
так и свойством функции. Или сделать два варианта решения: и так, и так.*/
// function makeCounter() {
//     let count = 0;

//     function counter() {
//         return count++;
//     };

//     counter.set = value => count = value;

//     counter.decrease = () => count--;

//     return counter;

// }

// let counter = makeCounter();

// alert(counter()); // 0
// alert(counter()); // 1

// counter.set(10); // установить новое значение счётчика
// alert(counter()); // 10

// counter.decrease(); // уменьшить значение счётчика на 1
// alert(counter()); // 10 (вместо 11)


// --- 6.8 Планирование: setTimeout и setInterval ---
// Вывод каждую секунду
/*Напишите функцию printNumbers(from, to), которая выводит число каждую секунду, начиная от from и заканчивая to.

Сделайте два варианта решения.*/
// Используя setInterval.
// function printNumbers(from, to) {
//     let start = from;
//     let end = to;

//     let timerId = setInterval(function () {
//         if (start <= end) {
//             alert(start);
//             start++;
//         }
//         else clearInterval(timerId);
//     }, 1000);
// }
// printNumbers(2, 5);

// Используя рекурсивный setTimeout.
// function printNumbersT(from, to) {
//     let start = from;
//     let end = to;

//     setTimeout(function go() {
//         alert(start);
//         if (start < end) {
//             setTimeout(go, 1000);
//         }
//         start++;
//     }, 1000);
// }
// printNumbersT(4, 9);
// --------------------------------------------------------------------------------------------
/*Что покажет setTimeout?
В приведённом ниже коде запланирован вызов setTimeout, а затем выполняется сложное вычисление,
для завершения которого требуется более 100 мс.

Когда будет выполнена запланированная функция?

После цикла. (правильный вариант ответа, т.к. любой вызов setTimeout будет выполнен только после того, как текущий код завершится.)
Перед циклом.
В начале цикла.

Что покажет alert?  Ответ: i будет 100000000

let i = 0;

setTimeout(() => alert(i), 100); // ?

// предположим, что время выполнения этой функции >100 мс
for(let j = 0; j < 100000000; j++) {
  i++;
}*/


// --- 6.9 Декораторы и переадресация вызова, call/apply ---
// Декоратор-шпион
/*Создайте декоратор spy(func), который должен возвращать обёртку, 
которая сохраняет все вызовы функции в своём свойстве calls.

Каждый вызов должен сохраняться как массив аргументов.*/
// function spy(func) {
//     function wrapper(...args) {
//         wrapper.calls.push(args);
//         return func.apply(this, arguments);
//     }

//     wrapper.calls = [];

//     return wrapper;
// }

// function work(a, b) {
//     alert(a + b); // произвольная функция или метод
// }

// work = spy(work);

// work(1, 2); // 3
// work(4, 5); // 9

// for (let args of work.calls) {
//     alert('call:' + args.join()); // "call:1,2", "call:4,5"
// }
// --------------------------------------------------------------------------------------------
// Задерживающий декоратор
// Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд.
// function delay(f, ms) {
//     return function () {
//         setTimeout(() => f.apply(this, arguments), ms);
//     };
// }

// function f(x) {
//     alert(x);
// }

// // создаём обёртки
// let f1000 = delay(f, 1000);
// let f1500 = delay(f, 1500);

// f1000("test"); // показывает "test" после 1000 мс
// f1500("test"); // показывает "test" после 1500 мс
// --------------------------------------------------------------------------------------------
// Декоратор debounce
/*Результатом декоратора debounce(f, ms) должна быть обёртка, которая передаёт вызов f не более одного раза
в ms миллисекунд. Другими словами, когда мы вызываем debounce, это гарантирует, 
что все остальные вызовы будут игнорироваться в течение ms.*/
// function debounce(f, ms) {
//     let isWait = false;

//     return function () {
//         if (isWait) return;

//         f.apply(this, arguments);

//         isWait = true;

//         setTimeout(() => isWait = false, ms);
//     };
// }


// let f = debounce(alert, 1000);

// f(1); // выполняется немедленно
// f(2); // проигнорирован

// setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout(() => f(4), 1100); // выполняется
// setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
// --------------------------------------------------------------------------------------------
// Тормозящий (throttling) декоратор
/*Создайте «тормозящий» декоратор throttle(f, ms), который возвращает обёртку, передавая вызов в f
не более одного раза в ms миллисекунд. Те вызовы, которые попадают в период «торможения», игнорируются.*/
// function throttle(f, ms) {
//     function throttle(func, ms) {

//         let isThrottled = false;
//         let savedArgs;
//         let savedThis;

//         function wrapper() {
//             if (isThrottled) {
//                 savedArgs = arguments;
//                 savedThis = this;
//                 return;
//             }

//             func.apply(this, arguments);

//             isThrottled = true;

//             setTimeout(function () {
//                 isThrottled = false;
//                 if (savedArgs) {
//                     wrapper.apply(savedThis, savedArgs);
//                     savedArgs = savedThis = null;
//                 }
//             }, ms);
//         }

//         return wrapper;
//     }
// }

// function f(a) {
//     console.log(a)
// }

// // f1000 передаёт вызовы f максимум раз в 1000 мс
// let f1000 = throttle(f, 1000);

// f1000(1); // показывает 1
// f1000(2); // (ограничение, 1000 мс ещё нет)
// f1000(3); // (ограничение, 1000 мс ещё нет)

//   // когда 1000 мс истекли ...
//   // ...выводим 3, промежуточное значение 2 было проигнорировано


// --- 6.10 Привязка контекста к функции ---
// Связанная функция как метод
// Что выведет функция?
// function f() {
//     alert(this); // Ответ: null, т.к исходная функция вызывается с this = null
// }

// let user = {
//     g: f.bind(null)
// };

// user.g();
// // --------------------------------------------------------------------------------------------
// // Повторный bind
// // Можем ли мы изменить this дополнительным связыванием?

// // Что выведет этот код? || Ответ: Вася, т.к. нельзя изменить существующую привязку
// function f() {
//   alert(this.name);
// }

// f = f.bind( {name: "Вася"} ).bind( {name: "Петя" } );

// f();
// // --------------------------------------------------------------------------------------------
// // Свойство функции после bind
// // В свойство функции записано значение. Изменится ли оно после применения bind? Обоснуйте ответ.
// function sayHi() {
//   alert( this.name );
// }
// sayHi.test = 5;

// let bound = sayHi.bind({
//   name: "Вася"
// });

// alert( bound.test ); // что выведет? почему?
// Ответ: underfined, потому что из-за привязки свойства test уже нет
// --------------------------------------------------------------------------------------------
// Исправьте функцию, теряющую "this"
/* Вызов askPassword() в приведённом ниже коде должен проверить пароль и 
затем вызвать user.loginOk/loginFail в зависимости от ответа.

Однако, его вызов приводит к ошибке. Почему? 
Ответ: Ошибка появляется из-за того, что у вызываемых функций нет контекста

Исправьте выделенную строку, чтобы всё работало (других строк изменять не надо).*/
// function askPassword(ok, fail) {
//   let password = prompt("Password?", '');
//   if (password == "rockstar") ok();
//   else fail();
// }

// let user = {
//   name: 'Вася',

//   loginOk() {
//     alert(`${this.name} logged in`);
//   },

//   loginFail() {
//     alert(`${this.name} failed to log in`);
//   },

// };

// askPassword(user.loginOk, user.loginFail); // неверная строка
// askPassword(user.loginOk.bind(user), user.loginFail.bind(user)) // исправленная строка
// --------------------------------------------------------------------------------------------
/*Использование частично применённой функции для логина
Это задание является немного усложнённым вариантом одного из предыдущих – Исправьте функцию, теряющую "this".

Объект user был изменён. Теперь вместо двух функций loginOk/loginFail 
у него есть только одна – user.login(true/false).

Что нужно передать в вызов функции askPassword в коде ниже, 
чтобы она могла вызывать функцию user.login(true) как ok и функцию user.login(false) как fail?
*/
// function askPassword(ok, fail) {
//   let password = prompt("Password?", '');
//   if (password == "rockstar") ok();
//   else fail();
// }

// let user = {
//   name: 'John',

//   login(result) {
//     alert( this.name + (result ? ' logged in' : ' failed to log in') );
//   }
// };

// // askPassword(?, ?);
// askPassword(user.login.bind(user, true), user.login.bind(user, false));
