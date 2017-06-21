"use strict";
var scopeId_0 = 0;
var scopeCounter = 1;
var rts = require("rts.js");
var log = function (exprId,result) { return rts.logResult(scopeId_0,exprId,result);};
var input =
        rts.bytesFromString("200\n1? 2?\n?2? ??3\n? ?\n?5 ?0\n?4? ?9?\n?0 ??\n??2 ?89\n40? ???\n0?? 1??\n?6? ?0?\n1?8 ?9?\n99 ??\n42? 165\n?? ?5\n?29 ???\n9 ?\n??? 642\n??? ???\n?9 9?\n?0 9?\n?5 10\n?98 ??3\n5 ?\n9? ?0\n99 0?\n?45 97?\n?5? ?9?\n??1 ??4\n0? ?0\n??? ?64\n?5 0?\n0?? 9?9\n?5 9?\n??3 ?98\n?7? 435\n3?7 76?\n?? ??\n??? ?3?\n3?8 ?10\n89? 1?1\n2?1 ???\n0? 99\n173 0?7\n?2? ??9\n?0? ?4?\n9?9 ??0\n?9 ?5\n? 5\n?2? ?7?\n?8 93\n8?? ?4?\n?5? ?0?\n80? 6??\n?3? 792\n?8? ?3?\n?7? ?3?\n9? ??\n?9? ??1\n?5 ??\n? 0\n1?? 321\n?99 1??\n?87 28?\n9? 99\n?2? ?6?\n?9 ?0\n264 7?4\n634 ?76\n? 9\n9? 0?\n?59 1?1\n5?3 ???\n??0 9?9\n?1? 7?2\n?1? ???\n?0 99\n3?5 820\n432 ???\n2?0 ?6?\n0 ?\n?3? 727\n99 9?\n733 95?\n??? 53?\n?5 ?9\n96? ???\n?9 ??\n?6? ?2?\n?5? 05?\n?0? ?6?\n?0? ?5?\n?? 0?\n??? 148\n038 79?\n?63 2?2\n5?2 ??3\n518 6?7\n728 ?0?\n99 ?0\n9?9 ???\n??? ??5\n?9 99\n?8? ?4?\n?6? 4??\n?5? ?98\n?4? ?8?\n?0? 99?\n?0 ?5\n??8 ??1\n14? 5?9\n??9 6?1\n??? ?1?\n292 ???\n5?2 2?3\n?5 99\n10? ??8\n9?8 ?92\n??? ??2\n?8? ?2?\n?92 ??3\n?5? 008\n?3? ?9?\n?6? ?1?\n?0 0?\n?1? ?5?\n1?? ?14\n2?? 46?\n??? 22?\n131 ?05\n03? 4??\n99 ?9\n?1? ?6?\n?85 ???\n??8 13?\n??0 ?99\n?4? ?0?\n??? ?34\n?8? ?7?\n?92 9?8\n826 15?\n??5 598\n9? ?5\n42? ??8\n?1? ?7?\n?7? ?1?\n?1? ?2?\n?9 0?\n??? ?0?\n??7 4?1\n?9? ?5?\n?? ?9\n99 ?5\n10 ?5\n?21 67?\n?1? ?65\n?2? ?8?\n?72 ???\n?? 99\n2?5 ??2\n??? 85?\n1?? 696\n?? ?0\n9? ?9\n?5? ?1?\n??7 5?0\n4?4 ?3?\n?7? ?2?\n?3? ?8?\n??? 073\n8?7 ??0\n?99 ??0\n?3? ?7?\n?93 9?8\n0? ??\n??? 662\n93 ?8\n99? ?0?\n?9? ?3?\n1?? 9??\n02? ???\n?0 ?9\n?47 ??3\n0? 9?\n??2 ?98\n9?8 ?93\n30? 2?7\n??9 09?\n??7 ?01\n0? ?9\n??0 ??9\n?? 9?\n?60 18?\n??3 2??\n0? ?5\n??? 352\n43? 7?3\n270 ?4?\n?9? ?4?\n2?? 6??\n??? 7?1\n");
var length = rts.builtins.Bytes["length"];
var _5e_ = rts.builtins.Prelude["^"];
var _3e__3d_ = rts.builtins.Prelude[">="];
var _2b_ = rts.builtins.Prelude["+"];
var _2e__2e_1 = function (local_4) {
           var x = _3e__3d_({infixl: local_4.start,infixr: local_4.stop});
           switch (x.tag)
           {
             case "False":
               var local_5 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_4.start
                             ,tail: function (local_6) {
                                return _2e__2e_1({step: local_4.step
                                                 ,start: _2b_({infixl: local_4.start
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
var _2e__2e_ = function (local_3) {
           return _2e__2e_1({step: 1.0,start: local_3.start,stop: local_3.stop});
        };
var _3d__3d_ = rts.builtins.Prelude["=="];
var _25_ = rts.builtins.Prelude["mod"];
var _2f__2f_ = rts.builtins.Prelude["div"];
var _3a_ = function (local_11) {
           return {tag: "NonEmpty",data: {head: local_11.head,tail: local_11.tail}};
        };
var littleEndian = function (local_8) {
           var x = _3d__3d_({infixl: local_8.number,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_9 = x.data;
               return _3a_({head: _25_({infixl: local_8.number,infixr: local_8.base})
                           ,tail: function (local_10) {
                              return littleEndian({base: local_8.base
                                                  ,number: _2f__2f_({infixl: local_8.number
                                                                    ,infixr: local_8.base})});
                           }});
             case "True":
               var local_12 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _3c__3d_ = rts.builtins.Prelude["<="];
var _2d_ = rts.builtins.Prelude["-"];
var replicate = function (local_16) {
           var x = _3c__3d_({infixl: local_16.count,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_17 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_16.item
                             ,tail: function (local_18) {
                                return replicate({count: _2d_({infixl: local_16.count
                                                              ,infixr: 1.0})
                                                 ,item: local_16.item});
                             }}};
             case "True":
               var local_19 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var foldLazy = function (local_23) {
           var x = local_23.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_24 = x.data;
               return local_23.binop({rest: function (local_25) {
                                        var dummy = _3d__3d_({infixl: local_25
                                                             ,infixr: {}});
                                        return foldLazy({stream1: local_24.tail({})
                                                        ,initial: local_23.initial
                                                        ,binop: local_23.binop});
                                     }
                                     ,item: local_24.head});
             case "Empty":
               return local_23.initial(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var pad = function (local_13) {
           return foldLazy({stream1: local_13.stream
                           ,initial: function (local_14) {
                              return function (local_15) {
                                     return replicate({count: local_15
                                                      ,item: local_13.val});
                                  };
                           }
                           ,binop: function (local_20) {
                              return function (local_21) {
                                     return _3a_({head: local_20.item
                                                 ,tail: function (local_22) {
                                                    return local_20.rest({})(_2d_({infixl: local_21
                                                                                  ,infixr: 1.0}));
                                                 }});
                                  };
                           }})(local_13.len);
        };
var fold = function (local_28) {
           var x = local_28.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_29 = x.data;
               return fold({stream1: local_29.tail({})
                           ,initial: local_28.binop({acc: local_28.initial
                                                    ,item: local_29.head})
                           ,binop: local_28.binop});
             case "Empty":
               var local_30 = x.data;
               return local_28.initial;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var reverse = function (stream2) {
           return fold({stream1: stream2
                       ,initial: {tag: "Empty",data: {}}
                       ,binop: function (local_26) {
                          return {tag: "NonEmpty"
                                 ,data: {head: local_26.item
                                        ,tail: function (local_27) {
                                           return local_26.acc;
                                        }}};
                       }});
        };
var _7c__7c_ = function (local_33) {
           var x = local_33.l;
           switch (x.tag)
           {
             case "False":
               return local_33.r(x.data);
             case "True":
               var local_34 = x.data;
               return {tag: "True",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var byteAt = rts.builtins.Bytes["byteAt"];
var map = function (local_36) {
           return foldLazy({stream1: local_36.stream1
                           ,initial: function (local_37) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_38) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_36.mapping(local_38.item)
                                            ,tail: local_38.rest}};
                           }});
        };
var fromBytes = function (bytes) {
           var len1 = length(bytes);
           return map({stream1: _2e__2e_({start: 0.0,stop: len1})
                      ,mapping: function (local_35) {
                         return byteAt({index: local_35,object: bytes});
                      }});
        };
var zipWith = function (local_39) {
           var x = local_39.streamA;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_40 = x.data;
               var x = local_39.streamB;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_41 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_39.combineAB({a: local_40.head
                                                           ,b: local_41.head})
                                 ,tail: function (local_42) {
                                    return zipWith({combineAB: local_39.combineAB
                                                   ,streamB: local_41.tail({})
                                                   ,streamA: local_40.tail({})});
                                 }}};
                 case "Empty":
                   var local_43 = x.data;
                   return {tag: "Empty",data: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_44 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var id = function (__x) { return __x;};
var _26__26_ = function (local_48) {
           var x = local_48.l;
           switch (x.tag)
           {
             case "False":
               var local_49 = x.data;
               return {tag: "False",data: {}};
             case "True":
               return local_48.r(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var allOf = function (local_45) {
           return foldLazy({stream1: local_45.stream1
                           ,initial: function (local_46) {
                              return {tag: "True",data: {}};
                           }
                           ,binop: function (local_47) {
                              return _26__26_({l: local_45.satisfy(local_47.item)
                                              ,r: local_47.rest});
                           }});
        };
var filter = function (local_50) {
           var x = local_50.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_51 = x.data;
               var rest1 = function (local_52) {
                          return filter({stream1: local_51.tail({}),keep: local_50.keep});
                       };
               var x = local_50.keep(local_51.head);
               switch (x.tag)
               {
                 case "False":
                   var local_53 = x.data;
                   return rest1({});
                 case "True":
                   var local_54 = x.data;
                   return {tag: "NonEmpty",data: {head: local_51.head,tail: rest1}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_55 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var toBytes = rts.builtins.Bytes["fromStream"];
var _2b__2b_ = function (local_68) {
           return foldLazy({stream1: local_68.l
                           ,initial: local_68.r
                           ,binop: function (local_69) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_69.item,tail: local_69.rest}};
                           }});
        };
var concat = function (stream3) {
           return foldLazy({stream1: stream3
                           ,initial: function (local_66) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_67) {
                              return _2b__2b_({l: local_67.item,r: local_67.rest});
                           }});
        };
var intersperse = function (local_60) {
           var x = local_60.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_61 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_61.head
                             ,tail: function (local_62) {
                                return concat(map({stream1: local_61.tail({})
                                                  ,mapping: function (local_63) {
                                                     return {tag: "NonEmpty"
                                                            ,data: {head: local_60.item
                                                                   ,tail: function (local_64) {
                                                                      return {tag: "NonEmpty"
                                                                             ,data: {head: local_63
                                                                                    ,tail: function (local_65) {
                                                                                       return {tag: "Empty"
                                                                                              ,data: {}};
                                                                                    }}};
                                                                   }}};
                                                  }}));
                             }}};
             case "Empty":
               var local_70 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var concat2 = function (stream5) {
           return toBytes(concat(map({stream1: stream5
                                     ,mapping: function (local_72) {
                                        return fromBytes(local_72);
                                     }})));
        };
var concat1 = function (stream4) {
           return concat2(map({stream1: stream4
                              ,mapping: function (local_71) {
                                 return local_71;
                              }}));
        };
var join = function (local_59) {
           return concat1(intersperse({stream1: local_59.texts,item: local_59.sep}));
        };
var toArray = rts.builtins.Array["fromStream"];
var _3c_ = rts.builtins.Prelude["<"];
var negate = rts.builtins.Prelude["negate"];
var abs = function (__x1) {
           var x = _3c_({infixl: __x1,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_74 = x.data;
               return __x1;
             case "True":
               var local_75 = x.data;
               return negate(__x1);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2a_ = rts.builtins.Prelude["*"];
var length1 = rts.builtins.Array["length"];
var item1 = rts.builtins.Array["item"];
var fromArray = function (array) {
           var len2 = length1(array);
           return map({stream1: _2e__2e_({start: 0.0,stop: len2})
                      ,mapping: function (local_77) {
                         return item1({index: local_77,object: array});
                      }});
        };
var minimum = function (local_79) {
           var x = local_79.stream6;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_80 = x.data;
               return fold({stream1: local_80.tail({})
                           ,initial: local_80.head
                           ,binop: function (local_81) {
                              var x = _3c__3d_({infixl: local_79.on(local_81.acc)
                                               ,infixr: local_79.on(local_81.item)});
                              switch (x.tag)
                              {
                                case "False":
                                  var local_82 = x.data;
                                  return local_81.item;
                                case "True":
                                  var local_83 = x.data;
                                  return local_81.acc;
                                default:
                                  throw "Unhandled case? This is a type error!";
                              }
                           }});
             case "Empty":
               var local_84 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var showPosInt = function (num) {
           var x = _3d__3d_({infixl: num,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_86 = x.data;
               return toBytes(map({stream1: reverse(littleEndian({base: 10.0
                                                                 ,number: num}))
                                  ,mapping: function (local_87) {
                                     return _2b_({infixl: local_87,infixr: 48.0});
                                  }}));
             case "True":
               var local_88 = x.data;
               return rts.bytesFromString("0");
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var slice = rts.builtins.Bytes["slice"];
var recursively = function (f) {
           return f(function (local_100) {
                  var dummy1 = _3d__3d_({infixl: local_100,infixr: {}});
                  return recursively(f);
               });
        };
var first = function (local_94) {
           var loop = recursively(function (recurse) {
                      return function (local_95) {
                             var x = local_95.str;
                             switch (x.tag)
                             {
                               case "NonEmpty":
                                 var local_96 = x.data;
                                 var x = local_94.that(local_96.head);
                                 switch (x.tag)
                                 {
                                   case "False":
                                     var local_97 = x.data;
                                     return recurse({})({str: local_96.tail({})
                                                        ,index: _2b_({infixl: local_95.index
                                                                     ,infixr: 1.0})});
                                   case "True":
                                     var local_98 = x.data;
                                     return {tag: "Just",data: local_95.index};
                                   default:
                                     throw "Unhandled case? This is a type error!";
                                 }
                               case "Empty":
                                 var local_99 = x.data;
                                 return {tag: "Nothing",data: {}};
                               default:
                                 throw "Unhandled case? This is a type error!";
                             }
                          };
                   });
           return loop({str: local_94.stream1,index: 0.0});
        };
var split = function (local_92) {
           var bytes1 = local_92.text;
           var sepLen = length(local_92.seperator);
           var bytesAt = function (i) {
                      return slice({object: bytes1
                                   ,start: i
                                   ,stop: _2b_({infixl: i,infixr: sepLen})});
                   };
           var x = first({that: function (local_93) {
                            return _3d__3d_({infixl: bytesAt(local_93)
                                            ,infixr: local_92.seperator});
                         }
                         ,stream1: _2e__2e_({start: 0.0
                                            ,stop: _2d_({infixl: length(bytes1)
                                                        ,infixr: sepLen})})});
           switch (x.tag)
           {
             case "Just":
               var sepIndex = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: slice({object: bytes1,start: 0.0,stop: sepIndex})
                             ,tail: function (local_101) {
                                return split({text: slice({object: bytes1
                                                          ,start: _2b_({infixl: sepIndex
                                                                       ,infixr: sepLen})
                                                          ,stop: length(bytes1)})
                                             ,seperator: local_92.seperator});
                             }}};
             case "Nothing":
               var local_102 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_92.text
                             ,tail: function (local_103) {
                                return {tag: "Empty",data: {}};
                             }}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var closeMatch = function (local_2) {
           var opts = function (desc) {
                      return filter({stream1: _2e__2e_({start: 0.0
                                                       ,stop: _5e_({infixl: 10.0
                                                                   ,infixr: length(desc)})})
                                    ,keep: function (cur) {
                                       var d =
                                               reverse(pad({stream: littleEndian({base: 10.0
                                                                                 ,number: cur})
                                                           ,val: 0.0
                                                           ,len: length(desc)}));
                                       return allOf({stream1: zipWith({combineAB: function (local_31) {
                                                                         return _7c__7c_({l: _3d__3d_({infixl: local_31.b
                                                                                                      ,infixr: 63.0})
                                                                                         ,r: function (local_32) {
                                                                                            return _3d__3d_({infixl: _2b_({infixl: local_31.a
                                                                                                                          ,infixr: 48.0})
                                                                                                            ,infixr: local_31.b});
                                                                                         }});
                                                                      }
                                                                      ,streamB: fromBytes(desc)
                                                                      ,streamA: d})
                                                    ,satisfy: id});
                                    }});
                   };
           var local_91 = function (local_56) {
                      var pad1 = function (txt) {
                                 return join({texts: _3a_({head: toBytes(replicate({count: _2d_({infixl: length(local_56.a1)
                                                                                                ,infixr: length(txt)})
                                                                                   ,item: 48.0}))
                                                          ,tail: function (local_57) {
                                                             return _3a_({head: txt
                                                                         ,tail: function (local_58) {
                                                                            return {tag: "Empty"
                                                                                   ,data: {}};
                                                                         }});
                                                          }})
                                             ,sep: rts.bytesFromString("")});
                              };
                      var optsB = toArray(opts(local_56.b1));
                      var lim = _5e_({infixl: 10.0,infixr: length(local_56.a1)});
                      var local_85 = minimum({on: function (local_73) {
                                                return _2b_({infixl: _2a_({infixl: _2b_({infixl: _2a_({infixl: abs(_2d_({infixl: local_73.a2
                                                                                                                        ,infixr: local_73.b2}))
                                                                                                      ,infixr: lim})
                                                                                        ,infixr: local_73.a2})
                                                                          ,infixr: lim})
                                                            ,infixr: local_73.b2});
                                             }
                                             ,stream6: concat(map({stream1: opts(local_56.a1)
                                                                  ,mapping: function (local_76) {
                                                                     return map({stream1: fromArray(optsB)
                                                                                ,mapping: function (local_78) {
                                                                                   return {a2: local_76
                                                                                          ,b2: local_78};
                                                                                }});
                                                                  }}))});
                      return join({texts: _3a_({head: pad1(showPosInt(local_85.a2))
                                               ,tail: function (local_89) {
                                                  return _3a_({head: pad1(showPosInt(local_85.b2))
                                                              ,tail: function (local_90) {
                                                                 return {tag: "Empty"
                                                                        ,data: {}};
                                                              }});
                                               }})
                                  ,sep: rts.bytesFromString(" ")});
                   };
           var x = split({text: toBytes(local_2),seperator: rts.bytesFromString(" ")});
           switch (x.tag)
           {
             case "NonEmpty":
               var local_104 = x.data;
               var x = local_104.tail({});
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_105 = x.data;
                   var x = local_105.tail({});
                   switch (x.tag)
                   {
                     case "NonEmpty":
                       var local_106 = x.data;
                       throw "Reached hole!";
                     case "Empty":
                       var local_107 = x.data;
                       return local_91({a1: local_104.head,b1: local_105.head});
                     default:
                       throw "Unhandled case? This is a type error!";
                   }
                 case "Empty":
                   var local_108 = x.data;
                   throw "Reached hole!";
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_109 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var __break = function (local_111) {
           var x = local_111.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_112 = x.data;
               var x = local_111.where(local_112.head);
               switch (x.tag)
               {
                 case "False":
                   var local_113 = x.data;
                   var local_114 = __break({stream1: local_112.tail({})
                                           ,where: local_111.where});
                   var x = local_114;
                   switch (x.tag)
                   {
                     case "NotFound":
                       var local_115 = x.data;
                       return {tag: "NotFound",data: {}};
                     case "Found":
                       var local_116 = x.data;
                       return {tag: "Found"
                              ,data: {pre: _3a_({head: local_112.head
                                                ,tail: function (local_117) {
                                                   return local_116.pre;
                                                }})
                                     ,post: local_116.post
                                     ,item: local_116.item}};
                     default:
                       throw "Unhandled case? This is a type error!";
                   }
                 case "True":
                   var local_118 = x.data;
                   return {tag: "Found"
                          ,data: {pre: {tag: "Empty",data: {}}
                                 ,post: local_112.tail
                                 ,item: local_112.head}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_119 = x.data;
               return {tag: "NotFound",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parse = function (local_122) {
           var res = local_122.parser(fromBytes(local_122.text));
           var check = function () {
                      var x = res.state;
                      switch (x.tag)
                      {
                        case "NonEmpty":
                          var local_123 = x.data;
                          throw "Reached hole!";
                        case "Empty":
                          return id(x.data);
                        default:
                          throw "Unhandled case? This is a type error!";
                      }
                   }();
           return res.val1;
        };
var parseLine = function (p) {
           return function (s) {
                  var x = __break({stream1: s
                                  ,where: function (local_110) {
                                     return _3d__3d_({infixl: local_110,infixr: 10.0});
                                  }});
                  switch (x.tag)
                  {
                    case "NotFound":
                      var local_120 = x.data;
                      return p(s);
                    case "Found":
                      var local_121 = x.data;
                      var local_124 = parse({text: toBytes(local_121.pre),parser: p});
                      return {state: local_121.post({}),val1: local_124};
                    default:
                      throw "Unhandled case? This is a type error!";
                  }
               };
        };
var __while = function (local_134) {
           var x = local_134.iter(local_134.init);
           switch (x.tag)
           {
             case "Continue":
               var local_135 = x.data;
               return __while({iter: local_134.iter,init: local_135});
             case "Done":
               return id(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parsePosInt = function (s1) {
           var x = s1;
           switch (x.tag)
           {
             case "NonEmpty":
               var first1 = x.data;
               var toDigit = function (local_126) {
                          var r1 = _2d_({infixl: local_126,infixr: 48.0});
                          var x = _26__26_({l: _3e__3d_({infixl: r1,infixr: 0.0})
                                           ,r: function (local_127) {
                                              return _3c__3d_({infixl: r1,infixr: 9.0});
                                           }});
                          switch (x.tag)
                          {
                            case "False":
                              var local_128 = x.data;
                              return {tag: "Nothing",data: {}};
                            case "True":
                              var local_129 = x.data;
                              return {tag: "Just",data: r1};
                            default:
                              throw "Unhandled case? This is a type error!";
                          }
                       };
               var local_136 = __while({iter: function (local_130) {
                                          var fin = function (local_131) {
                                                     return {tag: "Done"
                                                            ,data: {state: local_130.state
                                                                   ,val1: local_130.val1}};
                                                  };
                                          var x = local_130.state;
                                          switch (x.tag)
                                          {
                                            case "NonEmpty":
                                              var local_132 = x.data;
                                              var x = toDigit(local_132.head);
                                              switch (x.tag)
                                              {
                                                case "Just":
                                                  var d1 = x.data;
                                                  return {tag: "Continue"
                                                         ,data: {state: local_132.tail({})
                                                                ,val1: _2b_({infixl: _2a_({infixl: 10.0
                                                                                          ,infixr: local_130.val1})
                                                                            ,infixr: d1})}};
                                                case "Nothing":
                                                  return fin(x.data);
                                                default:
                                                  throw "Unhandled case? This is a type error!";
                                              }
                                            case "Empty":
                                              return fin(x.data);
                                            default:
                                              throw "Unhandled case? This is a type error!";
                                          }
                                       }
                                       ,init: {state: first1.tail({})
                                              ,val1: function () {
                                                 var x = toDigit(first1.head);
                                                 switch (x.tag)
                                                 {
                                                   case "Just":
                                                     return id(x.data);
                                                   case "Nothing":
                                                     var local_133 = x.data;
                                                     throw "Reached hole!";
                                                   default:
                                                     throw "Unhandled case? This is a type error!";
                                                 }
                                              }()}});
               return local_136;
             case "Empty":
               var local_137 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var __return = function (local_142) {
           return function (local_143) {
                  return {state: local_143,val1: local_142};
               };
        };
var _3b_ = function (local_144) {
           return function (local_145) {
                  var local_146 = local_144.infixl(local_145);
                  return local_144.infixr(local_146.val1)(local_146.state);
               };
        };
var sequence = function (s2) {
           return foldLazy({stream1: s2
                           ,initial: function (local_147) {
                              return __return({tag: "Empty",data: {}});
                           }
                           ,binop: function (local_148) {
                              return _3b_({infixl: local_148.item
                                          ,infixr: function (local_149) {
                                             return _3b_({infixl: local_148.rest({})
                                                         ,infixr: function (local_150) {
                                                            return __return(_3a_({head: local_149
                                                                                 ,tail: function (local_151) {
                                                                                    return local_150;
                                                                                 }}));
                                                         }});
                                          }});
                           }});
        };
var codeJam = function (local_125) {
           return join({texts: parse({text: input
                                     ,parser: _3b_({infixl: parseLine(parsePosInt)
                                                   ,infixr: function (numCases) {
                                                      return sequence(map({stream1: _2e__2e_({start: 1.0
                                                                                             ,stop: _2b_({infixl: numCases
                                                                                                         ,infixr: 1.0})})
                                                                          ,mapping: function (caseId) {
                                                                             return _3b_({infixl: local_125.solve
                                                                                         ,infixr: function (result) {
                                                                                            return __return(join({texts: _3a_({head: rts.bytesFromString("Case #")
                                                                                                                              ,tail: function (local_138) {
                                                                                                                                 return _3a_({head: showPosInt(caseId)
                                                                                                                                             ,tail: function (local_139) {
                                                                                                                                                return _3a_({head: rts.bytesFromString(": ")
                                                                                                                                                            ,tail: function (local_140) {
                                                                                                                                                               return _3a_({head: result
                                                                                                                                                                           ,tail: function (local_141) {
                                                                                                                                                                              return {tag: "Empty"
                                                                                                                                                                                     ,data: {}};
                                                                                                                                                                           }});
                                                                                                                                                            }});
                                                                                                                                             }});
                                                                                                                              }})
                                                                                                                 ,sep: rts.bytesFromString("")}));
                                                                                         }});
                                                                          }}));
                                                   }})})
                       ,sep: rts.bytesFromString("\n")});
        };
rts.logRepl(codeJam({input1: input
                    ,solve: parseLine(function (local_1) {
                       return {state: {tag: "Empty",data: {}},val1: closeMatch(local_1)};
                    })}));
