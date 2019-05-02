if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}

var timer = setInterval(function () {
    var today  = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = today.getMonth();

    var monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
        "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
    ];

    today.setHours(24,0,0,0);

    var now = new Date().getTime();
    var t = today - now;

    if (t >= 0) {
        var hours = Math.floor((t / 1000 / 60 / 60 ));
        var mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        var secs = Math.floor((t % (1000 * 60)) / 1000);

        document.getElementById("timer-hours").innerHTML = ("0" + hours).slice(-2);
        document.getElementById("timer-minutes").innerHTML = ("0" + mins).slice(-2);
        document.getElementById("timer-seconds").innerHTML = ("0" + secs).slice(-2);

        var decCache = [],
            decCases = [2, 0, 1, 1, 1, 2];

        function decOfNum(number, titles)
        {
            if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
            return titles[decCache[number]];
        }

        document.querySelector('.timer-block__hours > p').innerHTML = decOfNum(hours, ['час', 'часа', 'часов']);
        document.querySelector('.timer-block__minutes > p').innerHTML = decOfNum(mins, ['минута', 'минуты', 'минут']);
        document.querySelector('.timer-block__seconds > p').innerHTML = decOfNum(secs, ['секунда', 'секунды', 'секунд']);

        document.querySelector('.timer-ending-day').innerHTML = parseInt(dd) + 1;
        document.querySelector('.timer-ending-month').innerHTML = monthNames[mm];

    }
}, 1000);
