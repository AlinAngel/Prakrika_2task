// --- 9.1 Класс: базовый синтаксис ---
// Перепишите класс
/* Класс Clock написан в функциональном стиле. 
Перепишите его, используя современный синтаксис классов.
P.S. Часики тикают в консоли. Откройте её, чтобы посмотреть.*/
class Clock {
    constructor({ template }) {
        this.template = template;
    }

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    }

    stop() {
        clearInterval(this.timer);
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}


let clock = new Clock({ template: 'h:m:s' });
clock.start();


// --- 9.2 Наследование классов ---
// Ошибка создания экземпляра класса
// В коде ниже класс Rabbit наследует Animal.
// К сожалению, объект класса Rabbit не создаётся.
// Что не так? Исправьте ошибку.
class Animal {

    constructor(name) {
        this.name = name;
    }

}

class Rabbit extends Animal {
    constructor(name) {
        // this.name = name; // ошибка!
        super(name); // ошибка исправлена
        this.created = Date.now();
    }
}

let rabbit = new Rabbit("Белый кролик"); // Error: this is not defined
alert(rabbit.name);
// Ошибка состоит в том, что мы не вызываем super (объект для this не создается).
// Поэтому при создании собственного конструктора мы должны вызвать super.
// --------------------------------------------------------------------------------------------
// Улучшенные часы
/* У нас есть класс Clock. Сейчас он выводит время каждую секунду
class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

Создайте новый класс ExtendedClock, который будет наследоваться от Clock
и добавьте параметр precision – количество миллисекунд между «тиками».
Установите значение в 1000 (1 секунда) по умолчанию.*/
class ExtendedClock extends Clock {
    constructor(options) {
        super(options);
        let { precision = 1000 } = options;
        this.precision = precision;
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), this.precision);
    }
};


// --- 9.3 Статические свойства и методы ---
// Класс расширяет объект?
/* Как мы уже знаем, все объекты наследуют от Object.prototype
и имеют доступ к «общим» методам объекта, например hasOwnProperty.*/
class Rabbit {
    constructor(name) {
        this.name = name;
    }
}

let rabbit = new Rabbit("Rab");

// метод hasOwnProperty от Object.prototype
alert(rabbit.hasOwnProperty('name')); // true

/* Но что если мы явно напишем "class Rabbit extends Object"
– тогда результат будет отличаться от обычного "class Rabbit"?
В чем разница?
Ниже пример кода с таким наследованием (почему он не работает? исправьте его)*/
class Rabbit extends Object {
    constructor(name) {
        this.name = name;
    }
}

let rabbit = new Rabbit("Кроль");

alert(rabbit.hasOwnProperty('name')); // Ошибка
// Ответ: при наследовании нужно вызывать конструктор родителя (super()), иначе this будет неопределён.

// Исправленный код:
class Rabbit extends Object {
    constructor(name) {
        super();
        this.name = name;
    }
}

let rabbit = new Rabbit("Кроль");

alert(rabbit.hasOwnProperty('name')); // true


// --- 9.6 Проверка класса: "instanceof" ---
// Странный instanceof
// Почему instanceof в примере ниже возвращает true?
// Мы же видим, что a не создан с помощью B().
function A() { }
function B() { }

A.prototype = B.prototype = {};

let a = new A();

alert(a instanceof B); // true

/* Ответ: instanceof возвращает true, потому что ему не важна сама функция. 
Он смотрит на её prototype и сверяет его с цепочкой __proto__ объекта.*/
