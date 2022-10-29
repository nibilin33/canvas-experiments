const docEl = document.documentElement;
const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
function reCaculate() {
    const clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
}
window.addEventListener(resizeEvt, reCaculate, false);
document.addEventListener('DOMContentLoaded', reCaculate, false)


window.onload = function () {
    // 获取上传按钮和进度条
    const uploadButton = document.querySelector(".button");
    const progressBar = document.querySelector(".button .progress-bar");
    // 进度条完成时的宽度
    const width = uploadButton.getBoundingClientRect().width;
    // 假定上传时间为5s
    const uploadTime = 5000;

    uploadButton.addEventListener("click", () => {
        let start = null;
        function grow(timestamp) {
            if (!start) start = timestamp;
            // 距离开始时已经过的时间戳
            let progress = timestamp - start;
            progressBar.style.width = `${Math.min(
                width * (progress / uploadTime),
                width
            )}px`;

            // 如果上传未完成
            if (progress < uploadTime) {
                window.requestAnimationFrame(grow);
            }else{
                const result = document.querySelector('.result');
                const glass = document.querySelector('.glass');
                glass.classList.add('glass-transform');
                result.classList.add('result-transform');
            }
        }
        window.requestAnimationFrame(grow);
    });
}

