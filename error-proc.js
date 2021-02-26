// --- 10.1 Обработка ошибок, "try..catch" ---
// Сравните два фрагмента кода.
// Первый использует finally для выполнения кода после try..catch:
try {
    // начать работу
    // работать
} catch (e) {
    // обработать ошибку
} finally {
    // очистить рабочее пространство
}

// Второй фрагмент просто ставит очистку после try..catch:
try {
    //   начать работу
    //   работать
} catch (e) {
    //   обработать ошибку
}

// очистить рабочее пространство

/* Нам определённо нужна очистка после работы, неважно возникли ошибки или нет.

Есть ли здесь преимущество в использовании finally или оба фрагмента кода одинаковы? 
Если такое преимущество есть, то дайте пример, когда оно проявляется.

Ответ: у finally есть преимущство, так как он всегда выполнится после выхода из try-catch;
даже в случаях использования return и throw finally получает управление до того,
как контроль возвращается во внешний код.*/
// Пример:
function f() {
    try {
        return 25;
    } catch (e) { }
    finally {
        alert("Очистка рабочего пространства");
    }
}
alert( f() ); // сначала срабатывает alert из finally, а затем этот код


//--- 10.2 Пользовательские ошибки, расширение Error ---
// Создайте класс FormatError, который наследует от встроенного класса SyntaxError.
// Класс должен поддерживать свойства message, name и stack.
class FormatError extends SyntaxError {
    constructor(message) {
        super(message);
        this.name = "FormatError";
    }
}

let err = new FormatError("ошибка форматирования");

alert(err.message); // ошибка форматирования
alert(err.name); // FormatError
alert(err.stack); // stack

alert(err instanceof FormatError); // true
alert(err instanceof SyntaxError); // true (потому что наследует от SyntaxError)
