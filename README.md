# localMock


Analog backend interface to help front-end development .     // nodejs


### Install

    //bash
    git clone git@github.com:sumnow/localMock.git

    cd localMock && npm install

    node index.js

### Dependencies

[tracer](https://github.com/baryon/tracer)

A powerful and customizable logging library for node.js

    // node
    tracer ^0.8.10 

### Example

You can use the link to open the browser to view

[http://localhost:9000/int?message=$m.rint(1,3)](http://localhost:9000/int?message=$m.rint(1,3))
    
[http://localhost:9000/object?message=$m.obj({name: $m.cstr(1,4)})](http://localhost:9000/object?message=$m.obj({name: $m.cstr(1,4)}))

[http://localhost:9000/array?message=$m.arr(4,5,'str_upp',1,3)](http://localhost:9000/array?message=$m.arr(4,5,'str_upp',1,3))

[http://localhost:9000/arrinobj?message=$m.obj({hello:$m.arr(3,4,'str_low',1,3)})](http://localhost:9000/arrinobj?message=$m.obj({hello:$m.arr(3,4,'str_low',1,3)}))

[http://localhost:9000/objinarr?message=[$m.obj({hello:$m.arr(3,4,'str_low',1,3)})]](http://localhost:9000/objinarr?message=[$m.obj({hello:$m.arr(3,4,'str_low',1,3)})])

terminal show 

    input >>> output

![terminal](https://github.com/sumnow/mdPhotos/blob/master/localMock_01.png)