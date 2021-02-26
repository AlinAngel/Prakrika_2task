/*Жадность - это игра в кости с пятью шестигранными кубиками. Ваша миссия, если вы решите ее принять, состоит в
том,чтобы выполнить бросок в соответствии с этими правилами. 
Вам всегда будет предоставлен массив с пятью значениями шестигранных игральных костей.
Один кубик может быть засчитан только один раз за каждый бросок. Например, данная цифра «5» может считаться 
только как часть тройки (вклад в 500 очков) или как отдельные 50 очков, но не оба в одном броске.
 Three 1's => 1000 points
 Three 6's => 600 points
 Three 5's => 500 points
 Three 4's => 400 points
 Three 3's => 300 points
 Three 2's => 200 points
 One  1  => 100 points
 One  5  =>  50 point
 Написать функцию которая будем принимать массив из чисел от 1 до 6 и возвращать количество очков.
 Example:
 Throw      Score
 ---------  ------------------
 5 1 3 4 1  250: 50 (for the 5) + 2 * 100 (for the 1s)
 1 1 1 3 1  1100: 1000 (for three 1s) + 100 (for the other 1)
 2 4 4 5 4  450: 400 (for three 4s) + 50 (for the 5)*/

function totalScore(arr) {
    let countNum = new Array(6).fill(0);

    for (let num of arr) {
        countNum[num - 1]++;
    }

    let score = 0;
    for (let i = 0; i < 6; i++) {

        switch (i) {
            case 0: // для 1
                if (countNum[i] >= 3) {
                    score += 1000;

                    if ((countNum[i] - 3) > 0) {
                        score += (countNum[i] - 3) * 100;
                    }
                } else {
                    score += countNum[i] * 100;
                };

                break;

            case 1: // для 2
                if (countNum[i] == 3) score += 200;

                break;

            case 2: // для 3
                if (countNum[i] == 3) score += 300;

                break;

            case 3: // для 4
                if (countNum[i] == 3) score += 400;

                break;

            case 4: // для 5
                if (countNum[i] >= 3) {
                    score += 500;

                    if ((countNum[i] - 3) > 0) {
                        score += (countNum[i] - 3) * 50;
                    }
                } else {
                    score += countNum[i] * 50;
                };

                break;

            case 5: // для 6
                if (countNum[i] == 3) score += 600;

                break;
        }
    }

    return score;
}

let arr1 = [5, 1, 3, 4, 1];
let arr2 = [1, 1, 1, 3, 1];
let arr3 = [2, 4, 4, 5, 4];
alert(totalScore(arr1)); // 250
alert(totalScore(arr2)); // 1100
alert(totalScore(arr3)); // 450
