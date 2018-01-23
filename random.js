//字符数组，正则\w [A-Za-z0-9_]
const _all = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwkyz0123456789_'
//随机数字
function rint(i, l) {
    if (l >= i) {
        return Math.floor(Math.random() * (l - i + 1) + i)
    } else {
        return 1;
    }
}
//获取boolean
//todo : bool(i,l) 获取i/l几率为真的bool
function bool(i, l) {
    if (i >= 1 && l >= 1) {
        return rint(0, l) > i
    } else {
        return rint(0, 1) === 0;
    }
}
//随机中文
function cstr(i, l) {
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
    let word = ''
    let max = rint(i, l);
    for (let i = 0; i < max; i++) {
        word = word + _upp()[rint(0, 25)]
    }
    return word;
}
//随机小写字母
function str_low(i, l) {
    let word = ''
    let max = rint(i, l);
    for (let i = 0; i < max; i++) {
        word = word + _low()[rint(0, 25)]
    }
    return word;
}
//随机字符数字
function str_num(i, l) {
    let word = ''
    let max = rint(i, l);
    for (let i = 0; i < max; i++) {
        word = word + _str_num()[rint(0, 9)]
    }
    return word;
}
//图片url
function str_img(w, d) {
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
    let word = '';
    let max = rint(i, l);
    for (let i = 0; i < max; i++) {
        var ml = (bool() ? str_low(1, 1) : str_upp(1, 1));
        word = word + ml;
    }
    return word;
}


//随机数组
//arr(4,5,'str',1,3) //生成一个长度为4-5，每项为1-3长度的字符串.
const arr = function (i, l, fun, m, n) {
    let max = rint(i, l);
    let arr = [];
    if (n) {
        for (let i = 0; i < max; i++) {
            let le = eval(`${fun}(${m},${n})`)
            arr.push(le);
        }
    } else {
        for (let i = 0; i < max; i++) {
            let le = eval(`${fun}(${m})`)
            arr.push(le);
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



var x = {
    body: {
        key: $m.arr(1,3,'str',1,3),
        value: $m.rint(1,3),
        value2: $m.cstr(1,3),
        aa: [{ name: 1 }, { name: 2 }, { name: 4 }, { name: 6 }, { name: 8 }]

    },
    body2: {
        key: $m.arr(1,3,'str',1,3),
        value: 1,
        value2: 2,
        aa: [{ name: 1 }, { name: 2 }, { name: 4 }, { name: 6 }, { name: 8 }]
    }

}

