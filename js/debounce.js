export function debounce(f, ms) {

    let isCooldown = false;
    let lastTimeOut = null;

    return function () {
        if (isCooldown) return;

        if (lastTimeOut) {
            window.clearTimeout(lastTimeOut);
        }

        f.apply(this, arguments);

        isCooldown = true;

        lastTimeOut = setTimeout(() => isCooldown = false, ms);
    };

};