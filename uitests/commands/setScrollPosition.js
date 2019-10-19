exports.command = function(target) {
    return this.execute(`document.getElementsByClassName('page-container')[0].scrollTop = ${target}`);
}