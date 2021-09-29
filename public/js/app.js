window.onload = function() {

    const errorContainer = document.querySelector('.error');
    const urlParams = new URLSearchParams(location.search);
    errorContainer.textContent = urlParams.get("error");
}