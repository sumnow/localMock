# localMock

### 简述

 提高前端生产力，独立前端的后台测试接口，以 `node` 实现的后端接口

 [ENGLISH]()

### 安装

    //bash
    git clone https://github.com/sumnow/localMock.git

    cd localMock && npm install

    node index.js

### 依赖

默认没有依赖，如果需要记录打印接口的记录，可以在index.js中修改needLog为true,并安装依赖。

[tracer](https://github.com/baryon/tracer)

    // node
    tracer ^0.8.10 

### 使用

localMock需要在每次的请求参数中额外传递一个参数 `$m_message` ，这个参数是用来声明这个接口返回的数据。

例如，定义一个请求分数数据的接口，传入参数为学号id，`http://api.address/scores?id=52`

返回为一个对象

    {
        name: '小明',
        age: 18,
        scores: [{
            course: 'Art',
            score: 92
        },{
            course: 'PE',
            score: 80
        }],
    }

那么ajax请求应该为

    const host = 'http://api.address'
    const testHost = 'http://localhost:9000'
    
    ajax({
        url: testHost + '/scores',
        method: 'GET',
        params: {
            id: 52,
            $m_message: `$m.obj({
                name: $m.cstr(2,4),
                age: $m.rint(10,30),
                scores: $m.arr(2,2,"{course: 'str(3,10)',score: 'rint(1,100)' }")
            })`
        },
        success: function (res) {
            console.log(res)
            // {"name":"牧鸾","age":26,"scores":[{"course":"pzny","score":93},{"course":"GGwMNVS","score":21}]}
        }
    })

> 注意：需要修改请求地址为testHost ,且只能为 `GET` 方法来获取数据。可以在请求方法中添加一层拦截。

你还可以参考这个[项目](https://github.com/sumnow/vue-templates)

这是一个集成了localMock的vue-cli模板，拦截方法为 `services/handledatas`

### 例子

例如以下的链接

    // 1  
    // 3
    http://localhost:9000/int?$m_message=$m.rint(1,3)
    
    // '想完'
    // '鞍山西站'
    http://localhost:9000/object?$m_message=$m.obj({name: $m.cstr(1,4)})



    // ['USD','S','OL','XP']
    // ['LOU','OUT','U','OI','PK']
    http://localhost:9000/array?$m_message=$m.arr(4,5,'str_upp(1,3)')

    //{data: [{name: 3, fis: 'avx'}]}
    http://localhost:9000/array?$m_message=$m.obj({data:$m.arr(1,1,"{name:'rint(1,3)',fis:'str(1,4)'}")})


terminal show 

    input >>> output

![terminal](https://github.com/sumnow/mdPhotos/blob/master/localMock_01.png)