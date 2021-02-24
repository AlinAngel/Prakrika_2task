/*Функция. Принимает массив строк. Должна вернуть массив результатов проверки двух строк.
Если у одной строки с последующей первый и последний символы, то true. Например [“asd”, “afffd”, “cc”, “kk”].
Для такого массива функция должна вернуть [true, false, false]*/
function strComparison(arr) {
    let result = arr.slice().map(item => item.slice(0, 1) + item.slice(-1));
    let res_comparasion = [];

    for (let i = 1; i < result.length; i++) {
        if (result[0] == result[i]) {
            // let elem = result[0];
            // alert(`Совпадение c ${elem} есть`);

            res_comparasion.push("true");
        }
        else {
            // alert("Совпадений нет");
            res_comparasion.push("false");
        }
    }

    return res_comparasion;
}

let arr = ["asd", "afffd", "cc", "kk"];

alert(strComparison(arr));