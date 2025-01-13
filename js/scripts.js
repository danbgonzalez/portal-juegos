window.addEventListener('load', function () {
    setTimeout(function () {
        var loaderPage = document.querySelector('.loader-page');
        if (loaderPage) {
            loaderPage.style.visibility = 'hidden';
            loaderPage.style.opacity = '0';
        }
    }, 2000);
});
