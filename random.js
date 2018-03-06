//字符数组，正则\w [A-Za-z0-9_]
const _all = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwkyz0123456789_'
//随机数字
function rint(i, l) {
    if (!l) {
        return rint(i, i)
    }
    if (l >= i) {
        return Math.floor(Math.random() * (l - i + 1) + i)
    } else {
        return 1;
    }
}
//获取boolean
//todo : bool(i,l) 获取i/l几率为真的bool
function bool(i, l) {
    if (!l) {
        return bool(0, 1)
    }
    if (i >= 1 && l >= 1) {
        return rint(0, l) < i
    } else {
        return rint(0, 1) >= 0.5;
    }
}
//随机中文
function cstr(i, l) {
    if (!l) {
        return cstr(i, i)
    }
    let word = '';
    let max = rint(i, l);
    for (let i = 0; i < max; i++) {
        word = word + eval('"\\u' + (Math.round(Math.random() * 20901) + 19968).toString(16) + '"');
    }
    return word
}
//大写字母的数组
function _upp() {
    return _all.slice(0, 26);
}
//小写字母的数组
function _low() {
    return _all.slice(26, 52);
}
//数字字符的数组
function _str_num() {
    return _all.slice(52, 62);
}
//随机大写字母
function str_upp(i, l) {
    if (!l) {
        return str_upp(i, i)
    }
    let word = ''
    let max = rint(i, l);
    for (let i = 0; i < max; i++) {
        word = word + _upp()[rint(0, 25)]
    }
    return word;
}
//随机小写字母
function str_low(i, l) {
    if (!l) {
        return str_low(i, i)
    }
    let word = ''
    let max = rint(i, l);
    for (let i = 0; i < max; i++) {
        word = word + _low()[rint(0, 25)]
    }
    return word;
}
//随机字符数字
function str_num(i, l) {
    if (!l) {
        return str_num(i, i)
    }
    let word = ''
    let max = rint(i, l);
    for (let i = 0; i < max; i++) {
        word = word + _str_num()[rint(0, 9)]
    }
    return word;
}
//图片url
function str_img(w, d) {
    if (!d) {
        return str_img(w, w)
    }
    let url = '';
    if (!d) {
        url = `https://dummyimage.com/${w}`
    } else {
        url = `https://dummyimage.com/${w}x${d}`
    }
    return url;
}
//随机字符串
function str(i, l) {
    if (!l) {
        return str(i, i)
    }
    let word = '';
    let max = rint(i, l);
    for (let i = 0; i < max; i++) {
        var ml = (bool() ? str_low(1, 1) : str_upp(1, 1));
        word = word + ml;
    }
    return word;
}


//随机数组
//arr(4,5,'',1,3) //生成一个长度为4-5，每项为1-3长度的字符串.

// **todo**
// arr(1,4,{name:1,str:1}) //error 
// arr(1,4 {naem:"123"})
// 上面这种在传入一个对象，然后复制这个对象的情况下，只可以有一个属性，多属性会报错
// arr(1,4,"{name:$m.str(13)") //success
// 使用字符串解析可以解决

const arr = function (i, l, fun) {
    let max = rint(i, l);
    let arr = [];
    if (typeof fun === 'string') {
        for (let i = 0; i < max; i++) {
            let me = eval("("+fun+")")
            console.log(me)
            console.log('me')
            for (l in me) {
                me[l] = eval(me[l])
            }
            console.log(me)
            arr.push(me);
        }
    } else if (fun instanceof Object) {
        for (let i = 0; i < max; i++) {
            arr.push(fun);
        }
    }
    return arr
}

//随机对象
// obj({name: 'arr|1,2,`str`,3,4'})
function obj(o) {
    Object.keys(o).forEach((v) => {
        // let _obj = {};
        if (typeof (o[v]) === 'string' && o[v].includes('|')) {
            let osp = o[v].split('|');
            // // console.log(osp)
            // if (osp[0] == 'arr') {
            //     // console.log(osp[1]);
            //     var ospr = eval(`arr(${osp[1]})`);
            // } else {
            var ospr = eval(`${osp[0]}(${osp[1]})`);
            // }
            o[v] = ospr;
        }
    })
    return o;

}
// console.log(obj({ name: 'str|2,2' }))

const $m = {
    rint: rint,
    bool: bool,
    cstr: cstr,
    str_upp: str_upp,
    str_low: str_low,
    str_num: str_num,
    str: str,
    str_img: str_img,
    arr: arr,
    obj: obj
}

module.exports = $m;