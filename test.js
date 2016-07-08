var Waiter = function(){
    var dfd = [],
        doneArr = [],
        failArr = [],
        slice = [].slice,
        that = this;
    //监控对象
    var Promise = function(){
        this.resolved = false;
        this.rejected = false;
    }
    Promise.prototype = {
        resolve : function(){
            this.resolved = true;
            if(!dfd.length)
                return;
            for(var i = dfd.length-1;i>=0;i--){
                if(dfd[i]&&!dfd[i].resolved || dfd[i].rejected){
                    return;
                }
                dfd.slice(i,1);
            }
            _exec(doneArr);
        },
        reject : function(){
            this.rejected = true;
            if(!dfd.length)
                return;
            dfd.splice(0);
            _exec(failArr);
        }
    }
    that.Deferred = function(){
        return new Promise();
    }
    function _exec(arr){
        var i = 0,
            len = arr.length;
        for(;i<len;i++){
            try{
                arr[i]&&arr[i]();
            }catch(e){}
        }
    }
    that.when = function(){
        dfd = slice.call(arguments);
        var i = dfd.length;
        for(--i;i>=0;i--){
            if(!dfd[i]||dfd[i].resolved||dfd[i].rejected||!dfd[i] instanceof Promise){
                dfd.splice(i,1);
            }
        }
        return that;
    }
    that.done = function(){
        doneArr = doneArr.concat(slice.call(arguments));
        return that;
    }
    that.fail = function(){
        failArr = failArr.concat(slice.call(arguments));
        return that;
    }
}

//使用
var waiter = new Waiter();
var first = function(){
    var dtd = waiter.Deferred();
    setTimeout(function(){
        console.log('first finish');
        dtd.reject();
    },5000)
    return dtd;
}();
var second = function(){
    var dtd = waiter.Deferred();
    setTimeout(function(){
        console.log('second  finish');
        dtd.resolve();
    },10000)
    return dtd;
}();

waiter.when(first, second).done(function(){console.log('success')},function(){console.log('success again')}).fail(function(){console.log('fail')});

