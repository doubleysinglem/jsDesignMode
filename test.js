var Conf=(function(){
        var conf={
            MAX_NUM:100,
            MAX_NUM2:200,
            MAX_NUM3:300
        };
        return {
            get:function(name){
                return conf[name]?conf[name]:null;
            }
        }
    })()


    console.log(Conf.get('MAX_NUM'))
 var Conf2=(function(){
        var conf={
            MAX_NUM:100,
            MAX_NUM2:200,
            MAX_NUM3:300
        };
        function Single(){
             return {
                get:function(name){
                   return  conf[name]?conf[name]:null;
                }
             }
        }
        return function(){
            return Single();
        }
    })()

 console.log(Conf2().get('MAX_NUM'))



var Vistor = (function(){
  return {
    splice : function(){
      var args = Array.prototype.splice.call(arguments,1);
      return Array.prototype.splice.apply(arguments[0], args);
    },
    push : function(){
      var len = arguments[0].length || 0;
      var args = this.splice(arguments,1);
      arguments[0].length = len + arguments.length -1;

      return Array.prototype.push.apply(arguments[0],args);
    },
    pop : function(){
      return Array.prototype.pop.apply(arguments[0]);
    }
  }
})()

var a ={};
console.log(Vistor.push(a,1,2,3,4));
console.log(a);
