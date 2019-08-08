//数据加载完毕后执行
window.onload = function () {
    var bscroll_leftY = new BScroll('.left_menu-wrap', {
        scrollY: true,
        click:true,
    })
    var bscroll_rightX = new BScroll('.right-top_menu-wrap', {
        scrollX: true,
        click:true,
    });
    var bscroll_rightY = new BScroll('.right_bottom_wrap', {
        scrollY: true,
        click:true,
        probeType:3 
    })

    //获取数据节点
    //左边
    section_left_ul=document.getElementById('section_left_ul');
    //右上
    content=document.getElementById('content');
    //右下
    right_bottom_content=document.getElementById('right_bottom_content');
    //footer
    footerNode=document.getElementById('footerNode')
    //定义变量
    var currIndex=0;
    var right_bottom_h2=null;
    var shopCar = {
        length:0,
    };
    var offgetTop=[];
//section_left数据渲染
function section_left(data,site,callBack){
    var html='';
    for(var i=0;i<data.length;i++){
        html+=`<li class="${i===0? 'active':''}" data-ind=${i}>${lMenuData[i].name}</li>`
    }
    site.innerHTML=html
    callBack&&callBack()
}
//调用函数
section_left(lMenuData,section_left_ul,function(){
    bscroll_leftY.refresh()
    section_left_ul.onclick=function(e){
        var event=e||window.event;
        var tag=event.target||event.srcElement;
        if(tag.nodeName==='LI'){
            for(var j=0;j<section_left_ul.children.length;j++){
                section_left_ul.children[j].classList.remove('active');
            }
            tag.classList.add('active');
            currIndex=tag.dataset.ind;
            right_top(rConData[currIndex].menuInfo,content,function(){
                addEvent_right_top()
            
            })
            right_bottom(rConData[currIndex].cellList,right_bottom_content,function(){
                addEvent_right_bottom()
            })
            bscroll_rightX.scrollTo(0,0,1000);
            bscroll_rightY.scrollTo(0,0,1000);
        }
    }
})
//section_left end

//section_right-top start
function right_top(data,site,callBack){
    var html='';
    for(var i=0;i<data.length;i++){
        html+=`<span class="${i===0? 'active':''}" data-ind=${i}>${data[i].name}</span>`
    }
    site.innerHTML=html
    callBack&&callBack()
}
right_top(rConData[currIndex].menuInfo,content,function(){
    addEvent_right_top()

})
function addEvent_right_top(){
    bscroll_rightX.refresh();
    content.onclick=function(e){
        var event=e||window.event;
        var tag=event.target||event.srcElement;
        if(tag.nodeName==='SPAN'){
            for(var j=0;j<content.children.length;j++){
                content.children[j].classList.remove('active');
            }
            tag.classList.add('active');
            bscroll_rightY.scrollToElement(right_bottom_h2[tag.dataset.ind], 1000);
        } 
    }
}


//section_right-top end


//section_right_bottom start
function right_bottom(data,site,callBack){
    var html='';
    for(var i=0;i<data.length;i++){
        html+=`<div class="item_container">
                <div class="item_menu">
                    <h2>${data[i].title}</h2></div>` 
    for(var j=0;j<data[i].list.length;j++){
        var temp = data[i].list[i];
        html+=`<div class="shop_list" >
                <div class="shop_list_img">
                    <img src=${data[i].src} alt="">
                </div>
                <div class="referral">
                    <h3>${data[i].list[j].subtitle}</h3>
                    <p>${data[i].list[j].name}</p>
                    <div class="price_img">
                        <div class="price">
                            <dl>
                                <dt>￥${data[i].list[j].vip.price}</dt>
                                <dd>￥${data[i].list[j].noVip.price}</dd>
                            </dl>
                        </div>
                        <div class="shopCar">
                            <div class="shopCar_img active"  data-par="${i}" data-self="${j}">
                                <img src="./images/gouwu_03.gif">
                            </div>
                            <div class="shopCar_btn ">
                                <span class="count_btn"  data-par="${i}" data-self="${j}" data-id="${temp.pId}">-</span>
                                <b class="b">${data[i].list[j].productNum}</b>
                                <span class="add_btn"  data-par="${i}" data-self="${j}">+</span>
                            </div>
                       
                    
                </div>
            </div>
            </div>
        </div>`
        }
        html+=`</div></div>`         
        }
    site.innerHTML=html
    callBack&&callBack()
}
right_bottom(rConData[currIndex].cellList,right_bottom_content,function(){
    addEvent_right_bottom()
})
function addEvent_right_bottom(){
    right_bottom_h2=document.querySelectorAll('.item_menu h2');
    bscroll_rightX.refresh()
    var shopCar_img=document.getElementsByClassName('shopCar_img');
    var shopCar_btn=document.getElementsByClassName('shopCar_btn');
    var shopCars=document.getElementsByClassName('shopCar');
    var add_btns=document.getElementsByClassName('add_btn');
    var count_btns=document.getElementsByClassName('count_btn');
    var b_texts=document.getElementsByClassName('b');

// console.log(shopCar_img,shopCar_btn,add_btns,count_btns)
for(var i=0;i<shopCar_img.length;i++){
    (function(idx){
        shopCar_img[idx].onclick=function(){
            shopCar_img[idx].classList.remove('active');
            shopCar_btn[idx].classList.add('active');
            var parIndex = this.dataset.par;
            var selfIndex = this.dataset.self;
            var pId = rConData[currIndex].cellList[parIndex].list[selfIndex].pId;
            // 将产品id作为键 将商品的对象存入购物车对象中
            shopCar[pId] = rConData[currIndex].cellList[parIndex].list[selfIndex];
            // 购物车款数
            shopCar.length++;
            //fo0ter 显示种类数
            shopcarNumTip.style.display = 'block';
            shopcarNumTip.innerText = shopCar.length;
            // 存储至本地
             localStorage.setItem('shopcarData', JSON.stringify(shopCar));
        }
        add_btns[idx].onclick=function(){
            b_texts[idx].innerText++
        }
        count_btns[idx].onclick=function(){
            b_texts[idx].innerText--
            var parIndex = this.dataset.par;
            var selfIndex = this.dataset.self;
            var pId = rConData[currIndex].cellList[parIndex].list[selfIndex].pId;
            if(b_texts[idx].innerText<=0){
                b_texts[idx].innerText=1;
                shopCar_btn[idx].classList.remove('active');
                shopCar_img[idx].classList.add('active');
                delete shopCar[pId];
                shopCar.length--;
                shopcarNumTip.innerText = shopCar.length;
                if(shopCar.length===0){
                    shopcarNumTip.style.display = 'none';
                }
            }else{
                shopCar[pId].productNum--;
            }
        }
    })(i)
}
}
 
//section_right_bottom end
//footer 渲染
function initFooter(data, site, callBack) {
    var html = ''
    for (var  i = 0; i < data.length; i++) {
        html += `
            <div>
                <div class="${i === 1 ? 'active' : ''}">
                    <img src="${data[i].src}" alt="">
                    <img src="${data[i].checkSrc}" alt="">
                </div>
                <span>${data[i].name} </span>
                ${ data[i].name === '购物车' ? '<b id="shopcar-num-tip"></b>' : ''}
            </div>`;
    }

    site.innerHTML = html;
    callBack && callBack();
}

initFooter(footerData, footerNode, function () {
    shopcarNumTip = document.getElementById('shopcar-num-tip')
});
// footer 渲染end
//判断滑动时的区域
for (var i = 0; i < right_bottom_h2.length; i++) {
    offgetTop.push(right_bottom_h2[i].offsetTop);
}
console.log(offgetTop)
var timer=null;
bscroll_rightY.on('scroll', function (e){
    // if (timer) {
    //     clearTimeout(timer);
    //     timer = null;
    // }


    // timer = setTimeout(function () {
    //     changeFontSize();
    //     clearTimeout(timer);
    //     timer = null;


    // }, 300);






        var y = -e.y;
        console.log(y)
        if (y <= 0) {
                y = 0;
        targetIndex=0;
            }
        if (y >= offgetTop[offgetTop.length - 1]) {
                y = offgetTop[offgetTop.length - 1];
            }
        var targetIndex = offgetTop.filter(function (item) {
            // 判定条件 滚动的距离要 大于或者等于 item
            return item/1.5 <= y;
        }).length-1;
        console.log(targetIndex)
        // 去掉所有标题样式
        for(var j=0;j<content.children.length;j++){
            content.children[j].classList.remove('active');
        }
        // 给指定标题的加上样式
        content.children[targetIndex].classList.add('active');
        // 让指定的标题滚动到居中的位置
        bscroll_rightX.scrollToElement(content.children[targetIndex], 550, true,);

    })
}
