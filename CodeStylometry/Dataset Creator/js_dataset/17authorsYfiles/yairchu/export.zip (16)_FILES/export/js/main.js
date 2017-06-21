"use strict";
var scopeId_0 = 0;
var scopeCounter = 1;
var rts = require("rts.js");
var log = function (exprId,result) { return rts.logResult(scopeId_0,exprId,result);};
var length = rts.builtins.Bytes["length"];
var byteAt = rts.builtins.Bytes["byteAt"];
var _3e_3d = rts.builtins.Prelude[">="];
var _2b = rts.builtins.Prelude["+"];
var _2e_2e1 = function (local_4) {
           var x = _3e_3d({infixl: local_4.start,infixr: local_4.stop});
           switch (x.tag)
           {
             case "False":
               var local_5 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_4.start
                             ,tail: function (local_6) {
                                return _2e_2e1({step: local_4.step
                                               ,start: _2b({infixl: local_4.start
                                                           ,infixr: local_4.step})
                                               ,stop: local_4.stop});
                             }}};
             case "True":
               var local_7 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2e_2e = function (local_3) {
           return _2e_2e1({step: 1.0,start: local_3.start,stop: local_3.stop});
        };
var _3d_3d = rts.builtins.Prelude["=="];
var foldLazy = function (local_11) {
           var x = local_11.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_12 = x.data;
               return local_11.binop({rest: function (local_13) {
                                        var dummy = _3d_3d({infixl: local_13,infixr: {}});
                                        return foldLazy({stream1: local_12.tail({})
                                                        ,initial: local_11.initial
                                                        ,binop: local_11.binop});
                                     }
                                     ,item: local_12.head});
             case "Empty":
               return local_11.initial(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var map = function (local_8) {
           return foldLazy({stream1: local_8.stream
                           ,initial: function (local_9) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_10) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_8.mapping(local_10.item)
                                            ,tail: local_10.rest}};
                           }});
        };
var fromBytes = function (bytes) {
           var len = length(bytes);
           return map({mapping: function (local_2) {
                         return byteAt({index: local_2,object: bytes});
                      }
                      ,stream: _2e_2e({start: 0.0,stop: len})});
        };
var _2d = rts.builtins.Prelude["-"];
var _3c = rts.builtins.Prelude["<"];
var _26_26 = function (local_16) {
           var x = local_16.l;
           switch (x.tag)
           {
             case "False":
               var local_17 = x.data;
               return {tag: "False",data: {}};
             case "True":
               return local_16.r1(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var asciiDigit = function (__x) {
           var r = _2d({infixl: __x,infixr: 48.0});
           var x = _26_26({l: _3e_3d({infixl: r,infixr: 0.0})
                          ,r1: function (local_15) {
                             return _3c({infixl: r,infixr: 10.0});
                          }});
           switch (x.tag)
           {
             case "False":
               var local_18 = x.data;
               return {tag: "Nothing",data: {}};
             case "True":
               var local_19 = x.data;
               return {tag: "Just",data: r};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2a = rts.builtins.Prelude["*"];
var parsePosIntH = function (state) {
           var x = state.remain;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_21 = x.data;
               var x = asciiDigit(local_21.head);
               switch (x.tag)
               {
                 case "Just":
                   var local_22 = x.data;
                   return parsePosIntH({remain: local_21.tail({})
                                       ,result: _2b({infixl: _2a({infixl: 10.0
                                                                 ,infixr: state.result})
                                                    ,infixr: local_22})});
                 case "Nothing":
                   var local_23 = x.data;
                   return state;
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_24 = x.data;
               return state;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parsePosInt = function (stream2) {
           var x = stream2;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_14 = x.data;
               var x = asciiDigit(local_14.head);
               switch (x.tag)
               {
                 case "Just":
                   var local_20 = x.data;
                   return parsePosIntH({remain: local_14.tail({}),result: local_20});
                 case "Nothing":
                   var local_25 = x.data;
                   throw "Reached hole!";
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_26 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var drop = function (local_28) {
           var x = local_28.stream4;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_29 = x.data;
               var x = local_28.__while(local_29.head);
               switch (x.tag)
               {
                 case "False":
                   var local_30 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_29.head
                                 ,tail: function (local_31) {
                                    return local_29.tail({});
                                 }}};
                 case "True":
                   var local_32 = x.data;
                   return drop({__while: local_28.__while,stream4: local_29.tail({})});
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_33 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var dropSpaces = function (stream3) {
           return drop({__while: function (local_27) {
                          return _3d_3d({infixl: local_27,infixr: 32.0});
                       }
                       ,stream4: stream3});
        };
var _25 = rts.builtins.Prelude["mod"];
var _2f_2f = rts.builtins.Prelude["div"];
var bigMultByDigit = function (local_37) {
           return foldLazy({stream1: local_37.bigNum
                           ,initial: function (local_38) {
                              return function (carry) {
                                     var x = _3d_3d({infixl: carry,infixr: 0.0});
                                     switch (x.tag)
                                     {
                                       case "False":
                                         var local_39 = x.data;
                                         return {tag: "NonEmpty"
                                                ,data: {head: carry
                                                       ,tail: function (local_40) {
                                                          return {tag: "Empty",data: {}};
                                                       }}};
                                       case "True":
                                         var local_41 = x.data;
                                         return {tag: "Empty",data: {}};
                                       default:
                                         throw "Unhandled case? This is a type error!";
                                     }
                                  };
                           }
                           ,binop: function (local_42) {
                              return function (carry1) {
                                     var cur = _2b({infixl: _2a({infixl: local_42.item
                                                                ,infixr: local_37.digitMult})
                                                   ,infixr: carry1});
                                     return {tag: "NonEmpty"
                                            ,data: {head: _25({infixl: cur
                                                              ,infixr: local_37.base})
                                                   ,tail: function (local_43) {
                                                      return local_42.rest({})(_2f_2f({infixl: cur
                                                                                      ,infixr: local_37.base}));
                                                   }}};
                                  };
                           }})(0.0);
        };
var zipWith = function (local_46) {
           var x = local_46.streamA;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_47 = x.data;
               var x = local_46.streamB;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_48 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_46.func({b: local_48.head,a: local_47.head})
                                 ,tail: function (local_49) {
                                    return zipWith({streamB: local_48.tail({})
                                                   ,streamA: local_47.tail({})
                                                   ,__default: local_46.__default
                                                   ,func: local_46.func});
                                 }}};
                 case "Empty":
                   var local_50 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_46.func({b: local_46.__default
                                                      ,a: local_47.head})
                                 ,tail: function (local_51) {
                                    return zipWith({streamB: {tag: "Empty",data: {}}
                                                   ,streamA: local_47.tail({})
                                                   ,__default: local_46.__default
                                                   ,func: local_46.func});
                                 }}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_52 = x.data;
               var x = local_46.streamB;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_53 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_46.func({b: local_53.head
                                                      ,a: local_46.__default})
                                 ,tail: function (local_54) {
                                    return zipWith({streamB: local_53.tail({})
                                                   ,streamA: {tag: "Empty",data: {}}
                                                   ,__default: local_46.__default
                                                   ,func: local_46.func});
                                 }}};
                 case "Empty":
                   var local_55 = x.data;
                   return {tag: "Empty",data: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var bigAdd = function (local_44) {
           return foldLazy({stream1: zipWith({streamB: local_44.y
                                             ,streamA: local_44.__x1
                                             ,__default: 0.0
                                             ,func: function (local_45) {
                                                return _2b({infixl: local_45.a
                                                           ,infixr: local_45.b});
                                             }})
                           ,initial: function (local_56) {
                              return function (carry2) {
                                     var x = _3d_3d({infixl: carry2,infixr: 0.0});
                                     switch (x.tag)
                                     {
                                       case "False":
                                         var local_57 = x.data;
                                         return {tag: "NonEmpty"
                                                ,data: {head: carry2
                                                       ,tail: function (local_58) {
                                                          return {tag: "Empty",data: {}};
                                                       }}};
                                       case "True":
                                         var local_59 = x.data;
                                         return {tag: "Empty",data: {}};
                                       default:
                                         throw "Unhandled case? This is a type error!";
                                     }
                                  };
                           }
                           ,binop: function (local_60) {
                              return function (carry3) {
                                     var cur1 = _2b({infixl: local_60.item
                                                    ,infixr: carry3});
                                     return {tag: "NonEmpty"
                                            ,data: {head: _25({infixl: cur1
                                                              ,infixr: local_44.base1})
                                                   ,tail: function (local_61) {
                                                      return local_60.rest({})(_2f_2f({infixl: cur1
                                                                                      ,infixr: local_44.base1}));
                                                   }}};
                                  };
                           }})(0.0);
        };
var fold = function (local_62) {
           var x = local_62.stream5;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_63 = x.data;
               return fold({initial1: local_62.binop1({item1: local_63.head
                                                      ,acc: local_62.initial1})
                           ,binop1: local_62.binop1
                           ,stream5: local_63.tail({})});
             case "Empty":
               var local_64 = x.data;
               return local_62.initial1;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var toArray = rts.builtins.Array["fromStream"];
var length1 = rts.builtins.Array["length"];
var item2 = rts.builtins.Array["item"];
var reverse = function (src) {
           var arr = toArray(src);
           var len1 = length1(arr);
           return map({mapping: function (i) {
                         return item2({index: _2d({infixl: _2d({infixl: len1,infixr: 1.0})
                                                  ,infixr: i})
                                      ,object: arr});
                      }
                      ,stream: _2e_2e({start: 0.0,stop: len1})});
        };
var littleEndianDigits = function (local_70) {
           var x = _3d_3d({infixl: local_70.num,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_71 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: _25({infixl: local_70.num,infixr: local_70.base2})
                             ,tail: function (local_72) {
                                return littleEndianDigits({base2: local_70.base2
                                                          ,num: _2f_2f({infixl: local_70.num
                                                                       ,infixr: local_70.base2})});
                             }}};
             case "True":
               var local_73 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var toBytes = rts.builtins.Bytes["fromStream"];
var showPosInt = function (local_67) {
           var x = _3d_3d({infixl: local_67,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_68 = x.data;
               return toBytes(map({mapping: function (local_69) {
                                     return _2b({infixl: local_69,infixr: 48.0});
                                  }
                                  ,stream: reverse(littleEndianDigits({base2: 10.0
                                                                      ,num: local_67}))}));
             case "True":
               var local_74 = x.data;
               return rts.bytesFromString("0");
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _3c_3d = rts.builtins.Prelude["<="];
var replicate = function (local_77) {
           var x = _3c_3d({infixl: local_77.count,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_78 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_77.item3
                             ,tail: function (local_79) {
                                return replicate({item3: local_77.item3
                                                 ,count: _2d({infixl: local_77.count
                                                             ,infixr: 1.0})});
                             }}};
             case "True":
               var local_80 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2b_2b2 = function (local_84) {
           return foldLazy({stream1: local_84.l1
                           ,initial: local_84.r2
                           ,binop: function (local_85) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_85.item,tail: local_85.rest}};
                           }});
        };
var _2b_2b1 = function (local_82) {
           return toBytes(_2b_2b2({r2: function (local_83) {
                                     return fromBytes(local_82.b2);
                                  }
                                  ,l1: fromBytes(local_82.a2)}));
        };
var _2b_2b = function (local_81) { return _2b_2b1({a2: local_81.a1,b2: local_81.b1});};
var concat = function (stream7) {
           return foldLazy({stream1: stream7
                           ,initial: function (local_93) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_94) {
                              return _2b_2b2({r2: local_94.rest,l1: local_94.item});
                           }});
        };
var intersperse = function (local_87) {
           var x = local_87.stream6;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_88 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_88.head
                             ,tail: function (local_89) {
                                return concat(map({mapping: function (local_90) {
                                                     return {tag: "NonEmpty"
                                                            ,data: {head: local_87.item4
                                                                   ,tail: function (local_91) {
                                                                      return {tag: "NonEmpty"
                                                                             ,data: {head: local_90
                                                                                    ,tail: function (local_92) {
                                                                                       return {tag: "Empty"
                                                                                              ,data: {}};
                                                                                    }}};
                                                                   }}};
                                                  }
                                                  ,stream: local_88.tail({})}));
                             }}};
             case "Empty":
               var local_95 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var concat2 = function (stream9) {
           return toBytes(concat(map({mapping: function (local_97) {
                                        return fromBytes(local_97);
                                     }
                                     ,stream: stream9})));
        };
var concat1 = function (stream8) {
           return concat2(map({mapping: function (local_96) {
                                 return local_96;
                              }
                              ,stream: stream8}));
        };
var join = function (local_86) {
           return concat1(intersperse({stream6: local_86.texts,item4: local_86.sep}));
        };
var bigShow = function (local_65) {
           var x = reverse(local_65.number);
           switch (x.tag)
           {
             case "NonEmpty":
               var local_66 = x.data;
               return join({texts: {tag: "NonEmpty"
                                   ,data: {head: showPosInt(local_66.head)
                                          ,tail: function (local_75) {
                                             return map({mapping: function (local_76) {
                                                           var t = showPosInt(local_76);
                                                           return _2b_2b({a1: toBytes(replicate({item3: 48.0
                                                                                                ,count: _2d({infixl: local_65.baseLog10
                                                                                                            ,infixr: length(t)})}))
                                                                         ,b1: t});
                                                        }
                                                        ,stream: local_66.tail({})});
                                          }}}
                           ,sep: rts.bytesFromString("")});
             case "Empty":
               var local_98 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var __null = function (stream11) {
           var x = stream11;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_100 = x.data;
               return {tag: "False",data: {}};
             case "Empty":
               var local_101 = x.data;
               return {tag: "True",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var split = function (local_103) {
           var x = _3d_3d({infixl: local_103.at,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_104 = x.data;
               var x = local_103.stream12;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_105 = x.data;
                   var r3 = split({stream12: local_105.tail({})
                                  ,at: _2d({infixl: local_103.at,infixr: 1.0})});
                   return {pre: {tag: "NonEmpty"
                                ,data: {head: local_105.head
                                       ,tail: function (local_106) {
                                          return r3.pre;
                                       }}}
                          ,post: r3.post};
                 case "Empty":
                   var local_107 = x.data;
                   return {pre: {tag: "Empty",data: {}},post: {tag: "Empty",data: {}}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "True":
               var local_108 = x.data;
               return {pre: {tag: "Empty",data: {}},post: local_103.stream12};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var chunks = function (local_99) {
           var x = __null(local_99.stream10);
           switch (x.tag)
           {
             case "False":
               var local_102 = x.data;
               var local_109 = split({stream12: local_99.stream10,at: local_99.len2});
               return {tag: "NonEmpty"
                      ,data: {head: local_109.pre
                             ,tail: function (local_110) {
                                return chunks({len2: local_99.len2
                                              ,stream10: local_109.post});
                             }}};
             case "True":
               var local_111 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var fromArray = function (array) {
           var len3 = length1(array);
           return map({mapping: function (local_113) {
                         return item2({index: local_113,object: array});
                      }
                      ,stream: _2e_2e({start: 0.0,stop: len3})});
        };
var unwords = function (words) {
           return join({texts: words,sep: rts.bytesFromString(" ")});
        };
var parseOneLine = function (local_115) {
           var x = local_115.stream13;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_116 = x.data;
               return {remain: local_116.tail({})
                      ,result: local_115.parser(local_116.head)};
             case "Empty":
               var local_117 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var input =
        rts.bytesFromString("100\n2 3 2\n1 1 1\n2 1 1\n2 1 2\n3 2 3\n65 8 19\n3 37 1\n47 8 20\n27 3 5\n1 67 1\n4 2 2\n100 9 12\n100 1 99\n80 4 17\n10 18 1\n3 1 3\n41 5 11\n15 7 15\n1 100 1\n2 3 1\n14 7 1\n1 4 1\n100 2 50\n83 8 71\n4 29 1\n99 7 43\n3 2 2\n6 1 4\n21 13 1\n7 9 5\n1 2 1\n99 9 46\n100 9 11\n98 4 12\n46 10 5\n16 9 1\n1 76 1\n41 9 32\n72 8 26\n1 3 1\n97 8 12\n4 28 4\n2 59 1\n4 1 4\n3 3 1\n46 10 4\n14 7 2\n10 5 1\n3 4 1\n21 1 20\n16 14 3\n80 2 6\n1 24 1\n30 3 29\n100 2 49\n2 55 1\n100 3 34\n45 6 17\n80 8 9\n45 6 31\n4 3 2\n2 57 1\n4 3 1\n4 1 3\n21 1 21\n10 5 2\n40 9 27\n3 1 2\n22 1 5\n100 3 33\n46 1 46\n1 12 1\n80 8 10\n4 2 1\n52 6 34\n100 1 100\n2 4 1\n27 7 26\n100 4 24\n5 14 1\n46 1 45\n3 2 1\n52 10 40\n2 15 2\n80 4 73\n97 8 13\n100 1 1\n21 13 2\n100 4 25\n99 3 77\n33 5 10\n59 10 43\n4 4 1\n2 12 2\n56 4 52\n5 22 5\n10 10 7\n2 2 1\n59 9 21\n82 1 59");
var slice = rts.builtins.Bytes["slice"];
var recursively = function (f) {
           return f(function (local_133) {
                  var dummy1 = _3d_3d({infixl: local_133,infixr: {}});
                  return recursively(f);
               });
        };
var first = function (local_127) {
           var loop = recursively(function (recurse) {
                      return function (local_128) {
                             var x = local_128.str;
                             switch (x.tag)
                             {
                               case "NonEmpty":
                                 var local_129 = x.data;
                                 var x = local_127.that(local_129.head);
                                 switch (x.tag)
                                 {
                                   case "False":
                                     var local_130 = x.data;
                                     return recurse({})({str: local_129.tail({})
                                                        ,index1: _2b({infixl: local_128.index1
                                                                     ,infixr: 1.0})});
                                   case "True":
                                     var local_131 = x.data;
                                     return {tag: "Just",data: local_128.index1};
                                   default:
                                     throw "Unhandled case? This is a type error!";
                                 }
                               case "Empty":
                                 var local_132 = x.data;
                                 return {tag: "Nothing",data: {}};
                               default:
                                 throw "Unhandled case? This is a type error!";
                             }
                          };
                   });
           return loop({str: local_127.stream14,index1: 0.0});
        };
var split1 = function (local_125) {
           var bytes1 = local_125.text1;
           var sepLen = length(local_125.seperator);
           var bytesAt = function (i1) {
                      return slice({object: bytes1
                                   ,start: i1
                                   ,stop: _2b({infixl: i1,infixr: sepLen})});
                   };
           var x = first({that: function (local_126) {
                            return _3d_3d({infixl: bytesAt(local_126)
                                          ,infixr: local_125.seperator});
                         }
                         ,stream14: _2e_2e({start: 0.0
                                           ,stop: _2d({infixl: length(bytes1)
                                                      ,infixr: sepLen})})});
           switch (x.tag)
           {
             case "Just":
               var sepIndex = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: slice({object: bytes1,start: 0.0,stop: sepIndex})
                             ,tail: function (local_134) {
                                return split1({text1: slice({object: bytes1
                                                            ,start: _2b({infixl: sepIndex
                                                                        ,infixr: sepLen})
                                                            ,stop: length(bytes1)})
                                              ,seperator: local_125.seperator});
                             }}};
             case "Nothing":
               var local_135 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_125.text1
                             ,tail: function (local_136) {
                                return {tag: "Empty",data: {}};
                             }}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var lines = function (text) {
           return split1({text1: text,seperator: rts.bytesFromString("\n")});
        };
var id = function (__x2) { return __x2;};
var __while1 = function (local_146) {
           var x = local_146.iter(local_146.init);
           switch (x.tag)
           {
             case "Continue":
               var local_147 = x.data;
               return __while1({iter: local_146.iter,init: local_147});
             case "Done":
               return id(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var codeJamParse = function (local_124) {
           var ln0 = function () {
                      var x = lines(local_124.input2);
                      switch (x.tag)
                      {
                        case "NonEmpty":
                          return id(x.data);
                        case "Empty":
                          var local_137 = x.data;
                          throw "Reached hole!";
                        default:
                          throw "Unhandled case? This is a type error!";
                      }
                   }();
           var numCasesParse = parsePosInt(fromBytes(ln0.head));
           var local_138 = function () {
                      var x = numCasesParse.remain;
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
           return __while1({iter: function (local_139) {
                              var x = _3d_3d({infixl: local_139.numCases,infixr: 0.0});
                              switch (x.tag)
                              {
                                case "False":
                                  var local_140 = x.data;
                                  var local_141 = local_124.caseParse(local_139.remain);
                                  return {tag: "Continue"
                                         ,data: {remain: local_141.remain
                                                ,result: {tag: "NonEmpty"
                                                         ,data: {head: local_141.result
                                                                ,tail: function (local_142) {
                                                                   return local_139.result;
                                                                }}}
                                                ,numCases: _2d({infixl: local_139.numCases
                                                               ,infixr: 1.0})}};
                                case "True":
                                  var local_143 = x.data;
                                  var x = local_139.remain;
                                  switch (x.tag)
                                  {
                                    case "NonEmpty":
                                      var local_144 = x.data;
                                      throw "Reached hole!";
                                    case "Empty":
                                      var local_145 = x.data;
                                      return {tag: "Done"
                                             ,data: reverse(local_139.result)};
                                    default:
                                      throw "Unhandled case? This is a type error!";
                                  }
                                default:
                                  throw "Unhandled case? This is a type error!";
                              }
                           }
                           ,init: {remain: ln0.tail({})
                                  ,result: {tag: "Empty",data: {}}
                                  ,numCases: numCasesParse.result}});
        };
var iterate = function (local_149) {
           return {head: local_149.initial2
                  ,tail: function (local_150) {
                     return iterate({next: local_149.next
                                    ,initial2: local_149.next(local_149.initial2)});
                  }};
        };
var fromInfStream = function (infStream) {
           return {tag: "NonEmpty"
                  ,data: {head: infStream.head
                         ,tail: function (local_151) {
                            return fromInfStream(infStream.tail({}));
                         }}};
        };
var zipWith1 = function (local_152) {
           var x = local_152.streamA1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_153 = x.data;
               var x = local_152.streamB1;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_154 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_152.combineAB({b: local_154.head
                                                            ,a: local_153.head})
                                 ,tail: function (local_155) {
                                    return zipWith1({combineAB: local_152.combineAB
                                                    ,streamB1: local_154.tail({})
                                                    ,streamA1: local_153.tail({})});
                                 }}};
                 case "Empty":
                   var local_156 = x.data;
                   return {tag: "Empty",data: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_157 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var unlines = function (stream15) {
           return join({texts: stream15
                       ,sep: toBytes({tag: "NonEmpty"
                                     ,data: {head: 10.0
                                            ,tail: function (local_158) {
                                               return {tag: "Empty",data: {}};
                                            }}})});
        };
var codeJam = function (local_118) {
           return unlines(zipWith1({combineAB: function (local_119) {
                                      return join({texts: {tag: "NonEmpty"
                                                          ,data: {head: rts.bytesFromString("Case #")
                                                                 ,tail: function (local_120) {
                                                                    return {tag: "NonEmpty"
                                                                           ,data: {head: showPosInt(local_119.a)
                                                                                  ,tail: function (local_121) {
                                                                                     return {tag: "NonEmpty"
                                                                                            ,data: {head: rts.bytesFromString(": ")
                                                                                                   ,tail: function (local_122) {
                                                                                                      return {tag: "NonEmpty"
                                                                                                             ,data: {head: local_119.b
                                                                                                                    ,tail: function (local_123) {
                                                                                                                       return {tag: "Empty"
                                                                                                                              ,data: {}};
                                                                                                                    }}};
                                                                                                   }}};
                                                                                  }}};
                                                                 }}}
                                                  ,sep: rts.bytesFromString("")});
                                   }
                                   ,streamB1: codeJamParse({caseParse: local_118.func1
                                                           ,input2: local_118.input1})
                                   ,streamA1: fromInfStream(iterate({next: function (local_148) {
                                                                       return _2b({infixl: local_148
                                                                                  ,infixr: 1.0});
                                                                    }
                                                                    ,initial2: 1.0}))}));
        };
rts.logRepl(codeJam({func1: function (local_1) {
                       return parseOneLine({stream13: local_1
                                           ,parser: function (line) {
                                              var kP = parsePosInt(fromBytes(line));
                                              var cP = parsePosInt(dropSpaces(kP.remain));
                                              var sP = parsePosInt(dropSpaces(cP.remain));
                                              var k = kP.result;
                                              var c = cP.result;
                                              var s = sP.result;
                                              var places =
                                                      toArray(map({mapping: function (m) {
                                                                     return bigShow({number: bigAdd({base1: 1000.0
                                                                                                    ,y: {tag: "NonEmpty"
                                                                                                        ,data: {head: 1.0
                                                                                                               ,tail: function (local_34) {
                                                                                                                  return {tag: "Empty"
                                                                                                                         ,data: {}};
                                                                                                               }}}
                                                                                                    ,__x1: fold({initial1: {tag: "Empty"
                                                                                                                           ,data: {}}
                                                                                                                ,binop1: function (local_35) {
                                                                                                                   return bigAdd({base1: 1000.0
                                                                                                                                 ,y: {tag: "NonEmpty"
                                                                                                                                     ,data: {head: local_35.item1
                                                                                                                                            ,tail: function (local_36) {
                                                                                                                                               return {tag: "Empty"
                                                                                                                                                      ,data: {}};
                                                                                                                                            }}}
                                                                                                                                 ,__x1: bigMultByDigit({base: 1000.0
                                                                                                                                                       ,digitMult: k
                                                                                                                                                       ,bigNum: local_35.acc})});
                                                                                                                }
                                                                                                                ,stream5: m})})
                                                                                    ,baseLog10: 3.0});
                                                                  }
                                                                  ,stream: chunks({len2: c
                                                                                  ,stream10: _2e_2e({start: 0.0
                                                                                                    ,stop: k})})}));
                                              var x = _3c({infixl: s
                                                          ,infixr: length1(places)});
                                              switch (x.tag)
                                              {
                                                case "False":
                                                  var local_112 = x.data;
                                                  return unwords(fromArray(places));
                                                case "True":
                                                  var local_114 = x.data;
                                                  return rts.bytesFromString("IMPOSSIBLE");
                                                default:
                                                  throw "Unhandled case? This is a type error!";
                                              }
                                           }});
                    }
                    ,input1: input}));
