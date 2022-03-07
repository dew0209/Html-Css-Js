window.addEventListener('load',function () {
    var arrowL = document.querySelector('.arrow-l');
    var arrowR = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseenter',function () {
        console.log(1);
        arrowL.style.display = 'block';
        arrowR.style.display = 'block';
        clearInterval(timer);
    })
    focus.addEventListener('mouseleave',function () {
        arrowL.style.display = 'none';
        arrowR.style.display = 'none';
        timer = setInterval(function () {
            arrowR.click();
        },2000);
    })
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    var length = ul.children.length;

    for(var i = 0;i < length;i++){
        var li = document.createElement('li');
        li.setAttribute('index',i);
        li.addEventListener('click',function () {
            for(var j = 0;j < ol.children.length;j++){
                ol.children[j].className = '';
            }
            this.className = 'current';
            var focusWidth = focus.offsetWidth;
            var index = this.getAttribute('index');
            circle = index;
            num = index;
            console.log(-index * focusWidth);
            animate(ul,-index * focusWidth);
        })
        if(i == 0)li.className = 'current';
        ol.appendChild(li);
    }
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    //控制小圆圈
    var circle = 0;
    var flag = true;
    arrowR.addEventListener('click',function () {
        if(flag){
            flag = false;
            /* 无缝滚动 */
            if (num == ul.children.length - 1){
                ul.style.left = 0;
                num = 0;
            }
            //console.log(1);
            num++;
            animate(ul,-num *focusWidth,function () {
                flag = true;
            });
            circle++;
            for(var i = 0;i < ol.children.length;i++){
                ol.children[i].className = '';
            }
            ol.children[((circle % ol.children.length) + ol.children.length) % ol.children.length].className = 'current';
        }
    })
    arrowL.addEventListener('click',function () {
        if(flag){
            flag = false;
            /* 无缝滚动 */
            if (num == 0){
                ul.style.left = -(ul.children.length - 1) * focusWidth + 'px';
                num = ul.children.length - 1;
            }
            //console.log(1);
            num--;
            animate(ul,-num *focusWidth,function () {
                flag = true;
            });
            circle--;
            for(var i = 0;i < ol.children.length;i++){
                ol.children[i].className = '';
            }
            //console.log(((circle % ol.children.length) + ol.children.length) % ol.children.length);
            ol.children[((circle % ol.children.length) + ol.children.length) % ol.children.length].className = 'current';
        }
    })
    var timer = setInterval(function () {
        arrowR.click();
    },2000)
})