function animate(obj,target,callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);
            callback();
            return;
        }
        var step = (target - obj.offsetLeft) / 10;
        if(step < 0)step = Math.floor(step);
        else {
            step = Math.ceil(step);
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    },30)
}