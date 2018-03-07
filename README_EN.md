# localMock


Analog backend interface to help front-end development .     // nodejs


### Install

    //bash
    git clone https://github.com/sumnow/localMock.git

    cd localMock && npm install

    node index.js

### Dependencies

[tracer](https://github.com/baryon/tracer)

A powerful and customizable logging library for node.js

    // node
    tracer ^0.8.10 

### Example

You can use the link to open the browser to view

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