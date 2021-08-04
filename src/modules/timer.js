function timer(id, deadLine) {
    function getTimeRemaning(endTime) {
        const t = new Date();
        const leftTime = Date.parse(endTime) - Date.parse(t),
            days = Math.floor(leftTime / (1000 * 60 * 60 * 24)),
            hours = Math.floor((leftTime / (1000 * 60 * 60)) % 24),
            min = Math.floor((leftTime / (1000 * 60)) % 60),
            sec = Math.floor((leftTime / 1000) % 60);

        return {
            total: leftTime,
            days,
            hours,
            min,
            sec
        };
    }

    function addZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            min = timer.querySelector('#minutes'),
            sec = timer.querySelector('#seconds'),
            timInterval = setInterval(upDateCLock, 1000);

        function upDateCLock() {
            const t = getTimeRemaning(endTime);
            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            min.innerHTML = addZero(t.min);
            sec.innerHTML = addZero(t.sec);

            if (t.total <= 0) {
                clearInterval(timInterval);
            }
        }
        upDateCLock();

    }

    setClock(id, deadLine);
}


export default timer;

