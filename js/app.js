/*
 * Create a list that holds all of your cards
 */
var cards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf", "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*声明全局变量*/
var open, match, moveCounter, done, time;

var first = function() {
    /*这个函数是第一次载入页面的时候用来创建元素的，仅执行一次*/
    open = [];
    match = 0;
    moveCounter = 0;
    done = true;
    time = 0;
    window.setInterval(function(){time+=1},1000); /*开始计时*/
    /*创建newCards，li和i对象*/
    var newCards = shuffle(cards);
    var board = document.getElementById("board");
    var li, i;
    for (let j = 0; j <= 15; j++) {
        li = document.createElement("li");
        li.className = "card";
        i = document.createElement("i");
        i.className = newCards[j];
        li.appendChild(i);
        board.appendChild(li);
    };
    
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var refresh = function () {
    
    /*这个函数是用来刷新页面的，当玩家点击了重来按钮或者胜利之后点击Try Again按钮触发*/
    open = [];
    match = 0;
    moveCounter = 0;
    done = true;
    time = 0;
    var board = document.getElementById("board");
    var newCards = shuffle(cards);
    for (let i = 0; i <= 15; i++) {
        board.childNodes[i+1].className = "card";
        board.childNodes[i+1].style = "";
        board.childNodes[i+1].childNodes[0].className = newCards[i];
    }
    document.getElementById("move").innerHTML = moveCounter;
    document.getElementsByClassName("stars")[0] = stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
};

$(document).ready(function () {
    first();
    
    /*jQuery监听click事件*/
    $(".card").click(function () {
        if (done && this.className == "card") {
            pre = this;
            done = false;
            show(this);
            add(this);
            if (open.length == 2) {
                if (open[0].childNodes[0].className == open[1].childNodes[0].className) {
                    showSuccess();
                } else {
                    wrong();
                }
                adjust();
            } else {
                turn(this);
            }
        }
        if (match == 8) {
            win();
        }
    });
});

var adjust = function() {
    
    /*这个函数是用来实施调整moveCounter的值以及星星的数量*/
    
    moveCounter += 1;
    document.getElementById("move").innerHTML = moveCounter;
    stars = document.getElementsByClassName("stars")[0];

    switch(parseInt(moveCounter/15)) {
        case 0:
            stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>'; 
            break;
        case 1:
            stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>';
            break;
        case 2:
            stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>';
            break;
        default:
            stars.innerHTML = '<li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>';
            break;  
    }
};
    
var turn = function (self) {
    
    /*显示翻转动态效果*/
    
    $(self).css({
        "animation": "spin 0.5s"
    });
    done = true;
};

var show = function (self) { 
    $(self).removeClass("card");
    $(self).addClass("card open show");
};


var showSuccess = function () {
    
    /*猜测成功以后的动画效果*/
    
    $(open[0]).css({
        "background-color": "rgb(0, 205, 186)",
        "animation": "squeeze 0.5s"
    });
    $(open[1]).css({
        "background-color": "rgb(0, 205, 186)",
        "animation": "squeeze 0.5s"
    });
    open.length = 0;
    done = true;
    match += 1;
};



var wrong = function () {
    
    /*猜测错误以后执行的命令*/
    
    $(open[0]).css({
        "background-color": "rgb(249, 91, 60)",
        "transform-origin": "50% 250%",
        "animation": "sway 0.7s"
    });
    $(open[1]).css({
        "background-color": "rgb(249, 91, 60)",
        "transform-origin": "50% 250%",
        "animation": "sway 0.7s"
    });


    var after = function () {
        $(open[0]).removeClass("card open show");
        $(open[0]).addClass("card");
        $(open[1]).removeClass("card open show");
        $(open[1]).addClass("card");
        $(open[0]).css({
            "background-color": "",
            "transform-origin": "",
            "animation": "spin 0.5s"
        });
        $(open[1]).css({
            "background-color": "",
            "transform-origin": "",
            "animation": "spin 0.5s"
        });
    }

    var set = function () {
        $(open[0]).css({
            "animation": ""
        });
        $(open[1]).css({
            "animation": ""
        });
        done = true;
        open.length = 0;
    }
    setTimeout(after, 700);
    setTimeout(set, 1200);
};

var add = function (card) {
    open.push(card);
}

var win = function () {
    
    /*胜利以后执行的命令*/
    
    var star;
    switch(parseInt(moveCounter/15)) {
    case 0:
        star = 3;
        break;
    case 1:
        star = 2;
        break;
    case 2:
        star = 1;
        break;
    default:
       star = 0;
    }
    
    swal({
        
        /*sweetalert插件，动画效果*/
        
        title: 'Congratulations! You Won!',
        html: 'With ' + moveCounter + ' Moves and ' + star.toString() + ' Stars.<br>Time:' + time + 'seconds.<br>Woooooo!' ,
        type: 'success',
        confirmButtonText: 'Try Again'
    }).then(function(){
        refresh();
    })
};