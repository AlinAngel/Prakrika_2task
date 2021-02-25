// --- 8.1 Прототипное наследование ---
// В приведённом ниже коде создаются и изменяются два объекта.
// Какие значения показываются в процессе выполнения кода?
let animal = {
    jumps: null
};
let rabbit = {
    __proto__: animal,
    jumps: true
};

alert(rabbit.jumps); // Ответ: true (берётся из rabbit)

delete rabbit.jumps;

alert(rabbit.jumps); // Ответ: null (берётся из animal)

delete animal.jumps;

alert(rabbit.jumps); // Ответ: undefined (свойство jumps больше не существует)
// --------------------------------------------------------------------------------------------
// Задача состоит из двух частей.
// У нас есть объекты:
// let head = {
//     glasses: 1
// };

// let table = {
//     pen: 3
// };

// let bed = {
//     sheet: 1,
//     pillow: 2
// };

// let pockets = {
//     money: 2000
// };

/* 1. С помощью свойства __proto__ задайте прототипы так, чтобы поиск любого свойства 
выполнялся по следующему пути: pockets → bed → table → head. 
Например, pockets.pen должно возвращать значение 3 (найденное в table), 
а bed.glasses – значение 1 (найденное в head).*/
let head = {
    glasses: 1
};

let table = {
    pen: 3,
    __proto__: head
};

let bed = {
    sheet: 1,
    pillow: 2,
    __proto__: table
};

let pockets = {
    money: 2000,
    __proto__: bed
};

alert(pockets.pen); // 3
alert(bed.glasses); // 1

/*2. Ответьте на вопрос: как быстрее получить значение glasses – через pockets.glasses или через head.glasses? 
При необходимости составьте цепочки поиска и сравните их.
Ответ: через head.glasses можно быстрее всего получить значение, однако для современных движков с точки зрения
производительности никакой разницы нет*/
// --------------------------------------------------------------------------------------------
// Объект rabbit наследует от объекта animal.
// Какой объект получит свойство full при вызове rabbit.eat(): animal или rabbit?
let animal = {
    eat() {
        this.full = true;
    }
};

let rabbit = {
    __proto__: animal
};

rabbit.eat();
// Ответ: rabbit, т.к. именно он стоит перед точкой и он же вызывает метод eat()
// --------------------------------------------------------------------------------------------
// У нас есть два хомяка: шустрый (speedy) и ленивый (lazy); оба наследуют от общего объекта hamster.
// Когда мы кормим одного хомяка, второй тоже наедается. Почему? Как это исправить?
let hamster = {
    stomach: [],

    eat(food) {
        this.stomach.push(food);
    }
};

let speedy = {
    __proto__: hamster
};

let lazy = {
    __proto__: hamster
};

// Этот хомяк нашёл еду
speedy.eat("apple");
alert(speedy.stomach); // apple

// У этого хомяка тоже есть еда. Почему? Исправьте
alert(lazy.stomach); // apple

/* Ответ: так происходит, потому что для каждого хомячка свойство stomach
берётся из прототипа (т.к. его нет в самом объекте) и тем самым все изменения происходят в общем объекте.*/

// Исправленный вариант (добавим каждому хомячку собственный живот)
let hamster = {
    stomach: [],

    eat(food) {
        this.stomach.push(food);
    }
};

let speedy = {
    stomach: [],
    __proto__: hamster
};

let lazy = {
    stomach: [],
    __proto__: hamster
};

// Этот хомяк нашёл еду
speedy.eat("apple");
alert(speedy.stomach); // apple

alert(lazy.stomach); // пусто


// --- 8.2 F.prototype ---
// Изменяем "prototype"
// - 1 -
function Rabbit() { }
Rabbit.prototype = {
    eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype = {}; // добавленная строка.  Что вызов alert покажет нам сейчас?

alert(rabbit.eats); // Ответ: true, т.к. новое значение свойства Rabbit.prototype не влияет на прототип уже существуютх объектов
// - 2 -
function Rabbit() { }
Rabbit.prototype = {
    eats: true
};

let rabbit = new Rabbit();

Rabbit.prototype.eats = false; // измененная строка. 

alert(rabbit.eats); // Ответ: false, т.к. изменения объекта видны по всем указывающим на него ссылкам
// - 3 -
function Rabbit() { }
Rabbit.prototype = {
    eats: true
};

let rabbit = new Rabbit();

delete rabbit.eats; // измененная строка. 

alert(rabbit.eats); // Ответ: true; в объекте rabbit нет свойства eats => нечему удаляться
// - 4 -
function Rabbit() { }
Rabbit.prototype = {
    eats: true
};

let rabbit = new Rabbit();

delete Rabbit.prototype.eats; // измененная строка. 

alert(rabbit.eats); // Ответ: undefined; свойство eats было удалено из прототипа, его больше не существует
// --------------------------------------------------------------------------------------------
// Создайте новый объект с помощью уже существующего
/*Представьте, что у нас имеется некий объект obj, созданный функцией-конструктором
– мы не знаем какой именно, но хотелось бы создать ещё один объект такого же типа.

Можем ли мы сделать так?
let obj2 = new obj.constructor(); 
// Ответ: можем, если уверены в корректности значения свойства "constructor" существующего объекта

Приведите пример функции-конструктора для объекта obj, с которой такой вызов корректно сработает.*/
function Fox(name) {
    this.name = name;
}

let fox = new Fox("Mr. Fox");

let fox2 = new fox.constructor("Nick Wilde");

alert(fox.name); // Mr. Fox
alert(fox2.name); // Nick Wilde
/*И пример функции-конструктора, с которой такой код поведёт себя неправильно.*/
function Fox(name) {
    this.name = name;
}
Fox.prototype = {};

let fox = new Fox("Mr. Fox");

let fox2 = new fox.constructor("Nick Wilde");

alert(fox2.name); // undefined


// --- 8.3 Встроенные прототипы ---
// Добавить функциям метод "f.defer(ms)"
// Добавьте всем функциям в прототип метод defer(ms), который вызывает функции через ms миллисекунд.
Function.prototype.defer = function (ms) {
    setTimeout(this, ms);
};

function f() {
    alert("Hello!");
}

f.defer(1000); // выведет "Hello!" через 1 секунду


// --- 8.4 Методы прототипов, объекты без свойства __proto__ ---
// Добавьте toString в словарь
/*Имеется объект dictionary, созданный с помощью Object.create(null) для хранения любых пар ключ/значение.

Добавьте ему метод dictionary.toString(), который должен возвращать список ключей, разделённых запятой.
Ваш toString не должен выводиться при итерации объекта с помощью цикла for..in.*/
let dictionary = Object.create(null);

Object.defineProperty(dictionary, "toString", {
    value: function () {
        return `${Object.keys(this)}`;
    },
});

// добавляем немного данных
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // здесь __proto__ -- это обычный ключ

// только apple и __proto__ выведены в цикле
for (let key in dictionary) {
    alert(key); // "apple", затем "__proto__"
}

// ваш метод toString в действии
alert(dictionary); // "apple,__proto__"
// --------------------------------------------------------------------------------------------
// Разница между вызовами
// Давайте создадим новый объект rabbit:
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Rabbit");

/* Все эти вызовы делают одно и тоже или нет?  
Ответ: нет, для первого вызова this == rabbit, 
во всех остальных this равен Rabbit.prototype (объект перед точкой).*/
rabbit.sayHi();                        // Rabbit
Rabbit.prototype.sayHi();              // undefined
Object.getPrototypeOf(rabbit).sayHi(); // undefined
rabbit.__proto__.sayHi();              // undefined
