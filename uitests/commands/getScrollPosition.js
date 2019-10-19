exports.command = function() {
    return Math.round(document.getElementsByClassName('page-container')[0].scrollTop);
}