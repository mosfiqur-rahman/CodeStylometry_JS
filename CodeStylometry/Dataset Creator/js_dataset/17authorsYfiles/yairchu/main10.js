"use strict";
var scopeId_0 = 0;
var scopeCounter = 1;
var rts = require("rts.js");
var log = function (exprId,result) { return rts.logResult(scopeId_0,exprId,result);};
var _3d_3d = rts.builtins.Prelude["=="];
var _2b = rts.builtins.Prelude["+"];
var negate = rts.builtins.Prelude["negate"];
var length = rts.builtins.Bytes["length"];
var byteAt = rts.builtins.Bytes["byteAt"];
var _3e_3d = rts.builtins.Prelude[">="];
var _2e_2e1 = function (local_11) {
           var x = _3e_3d({infixl: local_11.start,infixr: local_11.stop});
           switch (x.tag)
           {
             case "False":
               var local_12 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_11.start
                             ,tail: function (local_13) {
                                return _2e_2e1({step: local_11.step
                                               ,start: _2b({infixl: local_11.start
                                                           ,infixr: local_11.step})
                                               ,stop: local_11.stop});
                             }}};
             case "True":
               var local_14 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2e_2e = function (local_10) {
           return _2e_2e1({step: 1.0,start: local_10.start,stop: local_10.stop});
        };
var foldLazy = function (local_18) {
           var x = local_18.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_19 = x.data;
               return local_18.binop({rest: function (local_20) {
                                        var dummy = _3d_3d({infixl: local_20,infixr: {}});
                                        return foldLazy({stream1: local_19.tail({})
                                                        ,initial: local_18.initial
                                                        ,binop: local_18.binop});
                                     }
                                     ,item: local_19.head});
             case "Empty":
               return local_18.initial(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var map = function (local_15) {
           return foldLazy({stream1: local_15.stream
                           ,initial: function (local_16) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_17) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_15.mapping(local_17.item)
                                            ,tail: local_17.rest}};
                           }});
        };
var fromBytes = function (bytes) {
           var len = length(bytes);
           return map({mapping: function (local_9) {
                         return byteAt({index: local_9,object: bytes});
                      }
                      ,stream: _2e_2e({start: 0.0,stop: len})});
        };
var id = function (__x) { return __x;};
var __while = function (local_21) {
           var x = local_21.iter(local_21.init);
           switch (x.tag)
           {
             case "Continue":
               var local_22 = x.data;
               return __while({iter: local_21.iter,init: local_22});
             case "Done":
               return id(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _25 = rts.builtins.Prelude["mod"];
var _2f_2f = rts.builtins.Prelude["div"];
var littleEndianDigits = function (local_26) {
           var x = _3d_3d({infixl: local_26.num,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_27 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: _25({infixl: local_26.num,infixr: local_26.base})
                             ,tail: function (local_28) {
                                return littleEndianDigits({base: local_26.base
                                                          ,num: _2f_2f({infixl: local_26.num
                                                                       ,infixr: local_26.base})});
                             }}};
             case "True":
               var local_29 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var toArray = rts.builtins.Array["fromStream"];
var length1 = rts.builtins.Array["length"];
var _2d = rts.builtins.Prelude["-"];
var item1 = rts.builtins.Array["item"];
var reverse = function (src) {
           var arr = toArray(src);
           var len1 = length1(arr);
           return map({mapping: function (i) {
                         return item1({index: _2d({infixl: _2d({infixl: len1,infixr: 1.0})
                                                  ,infixr: i})
                                      ,object: arr});
                      }
                      ,stream: _2e_2e({start: 0.0,stop: len1})});
        };
var toBytes = rts.builtins.Bytes["fromStream"];
var showPosInt = function (local_23) {
           var x = _3d_3d({infixl: local_23,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_24 = x.data;
               return toBytes(map({mapping: function (local_25) {
                                     return _2b({infixl: local_25,infixr: 48.0});
                                  }
                                  ,stream: reverse(littleEndianDigits({base: 10.0
                                                                      ,num: local_23}))}));
             case "True":
               var local_30 = x.data;
               return rts.bytesFromString("0");
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parseOneLine = function (local_31) {
           var x = local_31.stream2;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_32 = x.data;
               return {remain1: local_32.tail({}),result: local_31.parser(local_32.head)};
             case "Empty":
               var local_33 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var input =
        rts.bytesFromString("100\n-\n-+\n+-\n+++\n--+-\n-+-+-+-+-+\n+---++---++++--+---+-+--+-+-++-++-----+++--+--++-++-+++-++--+-++-++++-------+---++-+++--+-++--+-+++-\n-++++++++-\n-+-+-+----++++--+-+-+-+++-++-+++-------++------+++--++-++-+-+--+-+-+--++++--+---+--++++-+++--+++-+--\n+-+-+-+-+-\n+--------------------------------------------------------------------------------------------------+\n-----+--+++-+-++---+--------+-++++-++-++---+\n-+-\n+--+++++--+++++--+++++----++---++-+-+-++---+-++-+--++----++-----+---+--++-+-+-+++-+++++++--++-+-++-+\n+--------+\n--++-+---+-++++-+--+-+-----+-+++-+++---+-\n++++--++--++--+-+--++-+-++---++++--+-++-++++++-+++----+-++++-++----+-+++-+---+++-+--+++--+------+-+-\n+--++--+----+--+\n-++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-\n+-++-+--++++++-++---+-+++++++----+--+-+---++-+--+-+++---+-+-+++----+-+++-++++---+\n++-+-+++-+----+-++-+-+-+--+---+--+++-++----+-+++-+-+---+-++-+++++--++++--++++-+++------+++-++--+--+-\n-+---+--+++---++--+-+-+---++++-+--+++-----+++--+++---+--+--+++++-------+---++++-+--+--++-+++-++-+---\n+-+-++--+++-++--++--++-+-++++---+-+\n+++++\n-+-++-+---+-++--++++-++---++--+-++---+----++-+-+-+---+--++--+----+++++++---+--+----++++--+---+-++--+\n+++++++------+-+--+-+-+--+++--+---++-+-----++-++----+--++----+-+-++-+-+-+--++-+---+++++\n++-+-+-+-+-++++---++--++--++--++----+-++-++-++-++-+--++-+--+-++-++-+--++---+-+--+------+--+--+++-++-\n-++-----++++-++++--++-++--+--++++--++++++++----+-++--++-+++---+-+-+++++++++-+-+---+--+++-+-+--+--++-\n++++++++++++++++++++++++++++++++++++++++++++++++++\n-+++++++--++++-+--+-+-++++-++++++----+-+++---+----++++-++----++---+++-++++---+++-+----++-++-++-++---\n++++-----+++-++--+-+-+---+-----+++-+--+-+++++++--+-++++-+++-+-+++---+---+----++-----+-+--+-+-++--+--\n----+---++----+-+-+----++----+++--+-----++-+++++++++++--++--+-+++-+--++--+---+--+--+-+-+--+-++-++--+\n-++++--+-+++-++++-+-++-++++++++---++---++-+--++---++-++-++-+-----------++-+---+-+-----+-+-+-+--++---\n+-+\n-++\n++--+--------++--+-+--+++-----++--+----+-++++-+++-++---++-+----+--+-++-+-++++-+++\n-++-+++-+---+----+---+-++++++-++-++-+-------++-++-++---+-+-++-++-+--+++-+--+---+-++-++--+-+-+-+--+-+\n---++-+---+-++----+++--+-----+-+++----+-+-++-++---+---++++----+-++++-+++-+--++-+--+-+--+-------++--+\n+-+----+++-++-------++--+-++++--+--++---+--+++--+++-++-+--++---++++--+++-+---+-+++--++++\n-++++--+-++-+++++-++++---+--++---++-++-+-+-------+++++++++--+++++-+--+-+--+-+--++++-----++-++-++----\n+--+++-+-+--++----+--+-+-+--+----+-++++---+--+-+++++++--++++++++-+-++--+-++----+-+-++--+-+---+-++--+\n+-+--+--+\n++-+--++-++++-+-\n+--\n-+-++---+++---+-++++--++++--++-++-++----+------+--++---+-+++++-+--+--++-+-----++++\n---+++-+-+-++--+-+++---++-++-+-+-+++-------+++--+--+-+-+++---+-+-++-++++++---+--++-++-+-+++--++++--+\n-+--+----+--+++--+-+++++-+++++++---+++-+-\n++-----+-+----+-+-----+-++--++-+-+++++--++----+--+-++--++-+--+----++++----+------+++++---+-----+---+\n-+-----++++-++--+--+++++-++-+-++-+-+--+-+++-++---+-------+++--++--+++---++-+-+-++---+-+-++---\n++---+--+++----+---+++-----+++-+--++-+----+++-++--+++-++-+++--+--+-+-+-+-++--+-----+-+-++++-+-+++++-\n++--++-++++-+-+--++++++++-+-++-++-++-+-++-----+++++--++---+-+++----+-+----+++++++-------+--+-++++++-\n-----\n+-++-++++-++--+--++++-+----+-++++----+-++-+----+-++----++---+-+-+--+-+-+++----+-+++---+-+-++---+--++\n+-+-++---+---+++++-++++-+++-++---+---++------++-+-+\n--++--------+++-++-+--+-+--+++-------+-+-++-+-+++++--++++++-++++++--+++--+-+-++--++--++-+-+++-------\n+--+--+----+-+-++----++---+--+++--++--++-++++-+----+-++++-++-+---\n-+-+--+---+-+-+---++---+---+++-+-++--++-----++--++++-+---+-+++++++---+-+-+----+--+-+++++++++-++-++--\n--+++-+++-+++++-+-----++--+++----+++-+++-------+-+-++-+++-++----+++--++++-+--+-----++----++-----+--+\n+-+++-++-+----+--++++-++++++--+---+++--+++--++------++++++-++---++--++--+--+--++-+++-+---+--+++++-++\n+-----+++---+-++-+--+++--++++-+++----+++-+--+++++--+++--+------+++---+++-+-+-+--+--+++-----+++++++-+\n-++++--++-+--+-++++-++++-+--+++---+-++-++++++---+++-+-++--+--+++-+--+-+-+--+--+++----+-++-++++++++-+\n++--+++--+-+++-++-+++-+-+-+--+++++++-------++--+--+++++--+--++---+-+-++++---++--+--+--++---+++++-+-+\n++\n+---+---++----+---+------++----+--+-------+--+--+--\n++--+++-+++---++---++---+++-++++-+--+++-++--++-++-+-+-+-++-+-+++-+++--+---+--++-+----+---+--+-+++--+\n-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n+--+++++----+--+--++++---++-+-----++----++++-++-++-+-----++++-+++---+---+++-+--++-++-++-+-+---+-++--\n--+-+++--++---+++---++---+--+--++---++----++++--+---++--+++--++---+--+++--+++---++-+-\n---\n--+--++----++++---+++-+-++-+--+++--+---+--++++++---+-++--+++-----+-++-+-++-++++---++++---++--++--+++\n++-+++--+++--+-----+-+--+--++++++-+-++---+++-++++++--+-++++-++++++-+++-+---++-+++----++-----++--+-++\n---+-++-+---++-+---++--++++---+--+++-+++--++--++++--++---+--+++-+-+-+-+-++--+-++---++-+-+-+-+--+----\n++++++--+--+-+--------++-+--+--+++++-+-+---+--+---++----++++++-----+-----+--++-----+++++--++--+-+-++\n++-\n-++++--++-----+-+-++----+--+++++++-+----+--+-+---+--++----+-++-+--++-+--+--+-+----+--+-+++-+-+++-++-\n-+++-+---+++++-+++-++---+-+-+---+++--+-+++-+-+--+-++--------++-+++++-+---+-++---++--++--+--+-++-+---\n+----+-++--+-+--++++-++-+--++++-+++------+-+++-+-+-+++---+-+--+-+++-+++---+-+-+-------++++---+------\n++++--+++--+---++++++-++++-+-+++++-+-+------+-++-+----++-+++--+----+++-+--+-+-+----+-++-+---++++----\n--++-++--+-++-+--+++----------+++---+++---+++-----------+-++---+-++--+-+++++++-+-+-+-+--+--+-++----+\n-++-++++--++---++-++++-+++--+----------+++-+----++++-++---++-----++-++-++---++-+++-+-++-+-+++---+--+\n+\n--+\n-+-----++--++++++--++++++++--+-+++---+---+++--+++-+-++-++++++--++-++-+-+--++--+-+-+--+----++-+-+++--\n--\n---++-+++-+-++----+-++++-++++--+-+-+-+--++++-+-++++--+-+-+-+-++--+++-----++--++-+--+---++---++-+-+++\n-++--+-++++++++-++----+++++---+-++++++-------++----+-+++-++--++-+++--+---+++-++---++-+++++--++-+-++-\n+++++-----+++--+++-++--++-++--+--+-+-+-----+-++-++-++++-+--++--+-+--+++-+--+-----++++-+-++-++-++-+-+\n+++++++-+++--+++++++++-+-+-+-+--++-+--+-----+++-+---+-+-++-++--+--++++++-+-+-+-+-++---++-+--++-++++-\n--------------------------------------------------\n++--+---++-++---+-++-+-++--++++----+-+-++-+++--++-++----+----+-+---+-----++---++--+---+-+-+++-+----+\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-\n+++-+-+-++++------++-+++++-++-+--++--+++--+---+-+-++---+--\n++--++---------+--++-++--++------+++++--------+-++--++++++--+++++++-++--++++-+----++--+--++-+-+---+-\n+---+-+-+++--++--+++-+++--++---+++--++-++-+-+-+++-++-+-++--+-+--+--+----++-----+++-++-+--+++++-++--+\n+-+-++--+--+++-+++--+-+---++---+--++-+-+++---++++-+-+-+++-++-+-+----++--+++++++----+--++++-+++++++--\n-+++--+------+--+----++-+-+++--++-+-+-+++-----+--+-++--+--+++-+-+--+-+----+--++++-+-+++-++++++++---+\n-+-++++--+-+++-++-+-+-+++-++++-+--+-++++----++++-----+++-+++---+--+----+---++++-+-++--+++++----++-+-\n+++--+--+++---+-++--------+-+++--+-++--++-+-+--++-++-++-+-+-++-+--++++++-++++++++-+--+--+++-----++-+\n+++-+-++-+--+---++--+++-+++-+-+--++-++-++--+--+-++-++++++-+\n----+-+-+-+-++-+--+++-----++++++---++++-----++--+--+---+--++-+--++-+++-++-----+--++");
var _2b_2b = function (local_49) {
           return foldLazy({stream1: local_49.l
                           ,initial: local_49.r
                           ,binop: function (local_50) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_50.item,tail: local_50.rest}};
                           }});
        };
var concat = function (stream4) {
           return foldLazy({stream1: stream4
                           ,initial: function (local_47) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_48) {
                              return _2b_2b({r: local_48.rest,l: local_48.item});
                           }});
        };
var intersperse = function (local_41) {
           var x = local_41.stream3;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_42 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_42.head
                             ,tail: function (local_43) {
                                return concat(map({mapping: function (local_44) {
                                                     return {tag: "NonEmpty"
                                                            ,data: {head: local_41.item2
                                                                   ,tail: function (local_45) {
                                                                      return {tag: "NonEmpty"
                                                                             ,data: {head: local_44
                                                                                    ,tail: function (local_46) {
                                                                                       return {tag: "Empty"
                                                                                              ,data: {}};
                                                                                    }}};
                                                                   }}};
                                                  }
                                                  ,stream: local_42.tail({})}));
                             }}};
             case "Empty":
               var local_51 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var concat2 = function (stream6) {
           return toBytes(concat(map({mapping: function (local_53) {
                                        return fromBytes(local_53);
                                     }
                                     ,stream: stream6})));
        };
var concat1 = function (stream5) {
           return concat2(map({mapping: function (local_52) {
                                 return local_52;
                              }
                              ,stream: stream5}));
        };
var join = function (local_40) {
           return concat1(intersperse({stream3: local_40.texts,item2: local_40.sep}));
        };
var slice = rts.builtins.Bytes["slice"];
var recursively = function (f) {
           return f(function (local_63) {
                  var dummy1 = _3d_3d({infixl: local_63,infixr: {}});
                  return recursively(f);
               });
        };
var first = function (local_57) {
           var loop = recursively(function (recurse) {
                      return function (local_58) {
                             var x = local_58.str;
                             switch (x.tag)
                             {
                               case "NonEmpty":
                                 var local_59 = x.data;
                                 var x = local_57.that(local_59.head);
                                 switch (x.tag)
                                 {
                                   case "False":
                                     var local_60 = x.data;
                                     return recurse({})({str: local_59.tail({})
                                                        ,index1: _2b({infixl: local_58.index1
                                                                     ,infixr: 1.0})});
                                   case "True":
                                     var local_61 = x.data;
                                     return {tag: "Just",data: local_58.index1};
                                   default:
                                     throw "Unhandled case? This is a type error!";
                                 }
                               case "Empty":
                                 var local_62 = x.data;
                                 return {tag: "Nothing",data: {}};
                               default:
                                 throw "Unhandled case? This is a type error!";
                             }
                          };
                   });
           return loop({str: local_57.stream7,index1: 0.0});
        };
var split = function (local_55) {
           var bytes1 = local_55.text1;
           var sepLen = length(local_55.seperator);
           var bytesAt = function (i1) {
                      return slice({object: bytes1
                                   ,start: i1
                                   ,stop: _2b({infixl: i1,infixr: sepLen})});
                   };
           var x = first({that: function (local_56) {
                            return _3d_3d({infixl: bytesAt(local_56)
                                          ,infixr: local_55.seperator});
                         }
                         ,stream7: _2e_2e({start: 0.0
                                          ,stop: _2d({infixl: length(bytes1)
                                                     ,infixr: sepLen})})});
           switch (x.tag)
           {
             case "Just":
               var sepIndex = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: slice({object: bytes1,start: 0.0,stop: sepIndex})
                             ,tail: function (local_64) {
                                return split({text1: slice({object: bytes1
                                                           ,start: _2b({infixl: sepIndex
                                                                       ,infixr: sepLen})
                                                           ,stop: length(bytes1)})
                                             ,seperator: local_55.seperator});
                             }}};
             case "Nothing":
               var local_65 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_55.text1
                             ,tail: function (local_66) {
                                return {tag: "Empty",data: {}};
                             }}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var lines = function (text) {
           return split({text1: text,seperator: rts.bytesFromString("\n")});
        };
var _3c = rts.builtins.Prelude["<"];
var _26_26 = function (local_70) {
           var x = local_70.l1;
           switch (x.tag)
           {
             case "False":
               var local_71 = x.data;
               return {tag: "False",data: {}};
             case "True":
               return local_70.r2(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var asciiDigit = function (__x1) {
           var r1 = _2d({infixl: __x1,infixr: 48.0});
           var x = _26_26({l1: _3e_3d({infixl: r1,infixr: 0.0})
                          ,r2: function (local_69) {
                             return _3c({infixl: r1,infixr: 10.0});
                          }});
           switch (x.tag)
           {
             case "False":
               var local_72 = x.data;
               return {tag: "Nothing",data: {}};
             case "True":
               var local_73 = x.data;
               return {tag: "Just",data: r1};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2a = rts.builtins.Prelude["*"];
var parsePosIntH = function (state) {
           var x = state.remain1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_75 = x.data;
               var x = asciiDigit(local_75.head);
               switch (x.tag)
               {
                 case "Just":
                   var local_76 = x.data;
                   return parsePosIntH({remain1: local_75.tail({})
                                       ,result: _2b({infixl: _2a({infixl: 10.0
                                                                 ,infixr: state.result})
                                                    ,infixr: local_76})});
                 case "Nothing":
                   var local_77 = x.data;
                   return state;
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_78 = x.data;
               return state;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parsePosInt = function (stream8) {
           var x = stream8;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_68 = x.data;
               var x = asciiDigit(local_68.head);
               switch (x.tag)
               {
                 case "Just":
                   var local_74 = x.data;
                   return parsePosIntH({remain1: local_68.tail({}),result: local_74});
                 case "Nothing":
                   var local_79 = x.data;
                   throw "Reached hole!";
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_80 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var codeJamParse = function (local_54) {
           var ln0 = function () {
                      var x = lines(local_54.input2);
                      switch (x.tag)
                      {
                        case "NonEmpty":
                          return id(x.data);
                        case "Empty":
                          var local_67 = x.data;
                          throw "Reached hole!";
                        default:
                          throw "Unhandled case? This is a type error!";
                      }
                   }();
           var numCasesParse = parsePosInt(fromBytes(ln0.head));
           var local_81 = function () {
                      var x = numCasesParse.remain1;
                      switch (x.tag)
                      {
                        case "NonEmpty":
                          return function () {
                                 throw "Reached hole!";
                              }()(x.data);
                        case "Empty":
                          return id(x.data);
                        default:
                          throw "Unhandled case? This is a type error!";
                      }
                   }();
           return __while({iter: function (local_82) {
                             var x = _3d_3d({infixl: local_82.numCases,infixr: 0.0});
                             switch (x.tag)
                             {
                               case "False":
                                 var local_83 = x.data;
                                 var local_84 = local_54.caseParse(local_82.remain1);
                                 return {tag: "Continue"
                                        ,data: {remain1: local_84.remain1
                                               ,result: {tag: "NonEmpty"
                                                        ,data: {head: local_84.result
                                                               ,tail: function (local_85) {
                                                                  return local_82.result;
                                                               }}}
                                               ,numCases: _2d({infixl: local_82.numCases
                                                              ,infixr: 1.0})}};
                               case "True":
                                 var local_86 = x.data;
                                 var x = local_82.remain1;
                                 switch (x.tag)
                                 {
                                   case "NonEmpty":
                                     var local_87 = x.data;
                                     throw "Reached hole!";
                                   case "Empty":
                                     var local_88 = x.data;
                                     return {tag: "Done",data: reverse(local_82.result)};
                                   default:
                                     throw "Unhandled case? This is a type error!";
                                 }
                               default:
                                 throw "Unhandled case? This is a type error!";
                             }
                          }
                          ,init: {remain1: ln0.tail({})
                                 ,result: {tag: "Empty",data: {}}
                                 ,numCases: numCasesParse.result}});
        };
var iterate = function (local_90) {
           return {head: local_90.initial1
                  ,tail: function (local_91) {
                     return iterate({next: local_90.next
                                    ,initial1: local_90.next(local_90.initial1)});
                  }};
        };
var fromInfStream = function (infStream) {
           return {tag: "NonEmpty"
                  ,data: {head: infStream.head
                         ,tail: function (local_92) {
                            return fromInfStream(infStream.tail({}));
                         }}};
        };
var zipWith = function (local_93) {
           var x = local_93.streamA;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_94 = x.data;
               var x = local_93.streamB;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_95 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_93.combineAB({b: local_95.head
                                                           ,a: local_94.head})
                                 ,tail: function (local_96) {
                                    return zipWith({combineAB: local_93.combineAB
                                                   ,streamB: local_95.tail({})
                                                   ,streamA: local_94.tail({})});
                                 }}};
                 case "Empty":
                   var local_97 = x.data;
                   return {tag: "Empty",data: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_98 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var unlines = function (stream9) {
           return join({texts: stream9
                       ,sep: toBytes({tag: "NonEmpty"
                                     ,data: {head: 10.0
                                            ,tail: function (local_99) {
                                               return {tag: "Empty",data: {}};
                                            }}})});
        };
var codeJam = function (local_34) {
           return unlines(zipWith({combineAB: function (local_35) {
                                     return join({texts: {tag: "NonEmpty"
                                                         ,data: {head: rts.bytesFromString("Case #")
                                                                ,tail: function (local_36) {
                                                                   return {tag: "NonEmpty"
                                                                          ,data: {head: showPosInt(local_35.a)
                                                                                 ,tail: function (local_37) {
                                                                                    return {tag: "NonEmpty"
                                                                                           ,data: {head: rts.bytesFromString(": ")
                                                                                                  ,tail: function (local_38) {
                                                                                                     return {tag: "NonEmpty"
                                                                                                            ,data: {head: local_35.b
                                                                                                                   ,tail: function (local_39) {
                                                                                                                      return {tag: "Empty"
                                                                                                                             ,data: {}};
                                                                                                                   }}};
                                                                                                  }}};
                                                                                 }}};
                                                                }}}
                                                 ,sep: rts.bytesFromString("")});
                                  }
                                  ,streamB: codeJamParse({caseParse: local_34.func
                                                         ,input2: local_34.input1})
                                  ,streamA: fromInfStream(iterate({next: function (local_89) {
                                                                     return _2b({infixl: local_89
                                                                                ,infixr: 1.0});
                                                                  }
                                                                  ,initial1: 1.0}))}));
        };
rts.logRepl(codeJam({func: function (local_1) {
                       return parseOneLine({stream2: local_1
                                           ,parser: function (line) {
                                              return showPosInt(__while({iter: function (local_2) {
                                                                           var x =
                                                                                   local_2.remain;
                                                                           switch (x.tag)
                                                                           {
                                                                             case "NonEmpty":
                                                                               var local_3 =
                                                                                       x.data;
                                                                               var cur =
                                                                                       local_3.head;
                                                                               return {tag: "Continue"
                                                                                      ,data: {soFar: function () {
                                                                                                var x =
                                                                                                        _3d_3d({infixl: cur
                                                                                                               ,infixr: local_2.last});
                                                                                                switch (x.tag)
                                                                                                {
                                                                                                  case "False":
                                                                                                    var local_4 =
                                                                                                            x.data;
                                                                                                    return _2b({infixl: local_2.soFar
                                                                                                               ,infixr: 1.0});
                                                                                                  case "True":
                                                                                                    var local_5 =
                                                                                                            x.data;
                                                                                                    return local_2.soFar;
                                                                                                  default:
                                                                                                    throw "Unhandled case? This is a type error!";
                                                                                                }
                                                                                             }()
                                                                                             ,remain: local_3.tail({})
                                                                                             ,last: cur}};
                                                                             case "Empty":
                                                                               var local_6 =
                                                                                       x.data;
                                                                               return {tag: "Done"
                                                                                      ,data: function () {
                                                                                         var x =
                                                                                                 _3d_3d({infixl: local_2.last
                                                                                                        ,infixr: 45.0});
                                                                                         switch (x.tag)
                                                                                         {
                                                                                           case "False":
                                                                                             var local_7 =
                                                                                                     x.data;
                                                                                             return local_2.soFar;
                                                                                           case "True":
                                                                                             var local_8 =
                                                                                                     x.data;
                                                                                             return _2b({infixl: local_2.soFar
                                                                                                        ,infixr: 1.0});
                                                                                           default:
                                                                                             throw "Unhandled case? This is a type error!";
                                                                                         }
                                                                                      }()};
                                                                             default:
                                                                               throw "Unhandled case? This is a type error!";
                                                                           }
                                                                        }
                                                                        ,init: {soFar: negate(1.0)
                                                                               ,remain: fromBytes(line)
                                                                               ,last: 0.0}}));
                                           }});
                    }
                    ,input1: input}));
