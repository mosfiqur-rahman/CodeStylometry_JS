"use strict";
var scopeId_0 = 0;
var scopeCounter = 1;
var rts = require("rts.js");
var log = function (exprId,result) { return rts.logResult(scopeId_0,exprId,result);};
var input =
        rts.bytesFromString("46\n2\n2 2\n3\n3 2 2\n3\n1 1 2\n3\n2 3 1\n3\n2 3 2\n3\n2 2 3\n3\n4 4 1\n3\n3 4 2\n3\n1 4 4\n2\n1 1\n3\n1 3 2\n3\n4 1 3\n3\n3 1 3\n3\n3 1 4\n2\n3 3\n3\n4 2 3\n3\n1 4 3\n3\n2 3 3\n3\n4 3 2\n3\n3 3 1\n3\n2 1 3\n3\n3 1 2\n3\n3 3 2\n3\n3 3 3\n3\n4 3 1\n3\n2 2 4\n3\n1 2 2\n3\n2 4 2\n3\n1 3 3\n3\n4 1 4\n3\n4 2 2\n3\n3 2 3\n3\n3 4 1\n3\n2 1 1\n3\n1 2 3\n3\n3 2 1\n3\n2 2 2\n3\n1 1 1\n3\n2 4 3\n3\n3 2 4\n3\n1 2 1\n2\n4 4\n3\n2 3 4\n3\n2 2 1\n3\n1 3 4\n3\n2 1 2\n");
var _2d_ = rts.builtins.Prelude["-"];
var _3e__3d_ = rts.builtins.Prelude[">="];
var _3c__3d_ = rts.builtins.Prelude["<="];
var _26__26_ = function (local_3) {
           var x = local_3.l;
           switch (x.tag)
           {
             case "False":
               var local_4 = x.data;
               return {tag: "False",data: {}};
             case "True":
               return local_3.r1(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2a_ = rts.builtins.Prelude["*"];
var _2b_ = rts.builtins.Prelude["+"];
var id = function (__x) { return __x;};
var __while = function (local_11) {
           var x = local_11.iter(local_11.init);
           switch (x.tag)
           {
             case "Continue":
               var local_12 = x.data;
               return __while({iter: local_11.iter,init: local_12});
             case "Done":
               return id(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parsePosInt = function (s) {
           var x = s;
           switch (x.tag)
           {
             case "NonEmpty":
               var first = x.data;
               var toDigit = function (local_1) {
                          var r = _2d_({infixl: local_1,infixr: 48.0});
                          var x = _26__26_({l: _3e__3d_({infixl: r,infixr: 0.0})
                                           ,r1: function (local_2) {
                                              return _3c__3d_({infixl: r,infixr: 9.0});
                                           }});
                          switch (x.tag)
                          {
                            case "False":
                              var local_5 = x.data;
                              return {tag: "Nothing",data: {}};
                            case "True":
                              var local_6 = x.data;
                              return {tag: "Just",data: r};
                            default:
                              throw "Unhandled case? This is a type error!";
                          }
                       };
               var local_13 = __while({iter: function (local_7) {
                                         var fin = function (local_8) {
                                                    return {tag: "Done"
                                                           ,data: {state: local_7.state
                                                                  ,val: local_7.val}};
                                                 };
                                         var x = local_7.state;
                                         switch (x.tag)
                                         {
                                           case "NonEmpty":
                                             var local_9 = x.data;
                                             var x = toDigit(local_9.head);
                                             switch (x.tag)
                                             {
                                               case "Just":
                                                 var d = x.data;
                                                 return {tag: "Continue"
                                                        ,data: {state: local_9.tail({})
                                                               ,val: _2b_({infixl: _2a_({infixl: 10.0
                                                                                        ,infixr: local_7.val})
                                                                          ,infixr: d})}};
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
                                      ,init: {state: first.tail({})
                                             ,val: function () {
                                                var x = toDigit(first.head);
                                                switch (x.tag)
                                                {
                                                  case "Just":
                                                    return id(x.data);
                                                  case "Nothing":
                                                    var local_10 = x.data;
                                                    throw "Reached hole!";
                                                  default:
                                                    throw "Unhandled case? This is a type error!";
                                                }
                                             }()}});
               return local_13;
             case "Empty":
               var local_14 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _3d__3d_ = rts.builtins.Prelude["=="];
var _23_ = function (local_23) {
           return {tag: "NonEmpty",data: {head: local_23.head,tail: local_23.tail}};
        };
var __break = function (local_16) {
           var x = local_16.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_17 = x.data;
               var x = local_16.where(local_17.head);
               switch (x.tag)
               {
                 case "False":
                   var local_18 = x.data;
                   var local_19 = __break({stream: local_17.tail({})
                                          ,where: local_16.where});
                   var x = local_19;
                   switch (x.tag)
                   {
                     case "NotFound":
                       var local_20 = x.data;
                       return {tag: "NotFound",data: {}};
                     case "Found":
                       var local_21 = x.data;
                       return {tag: "Found"
                              ,data: {pre: _23_({head: local_17.head
                                                ,tail: function (local_22) {
                                                   return local_21.pre;
                                                }})
                                     ,post: local_21.post
                                     ,item: local_21.item}};
                     default:
                       throw "Unhandled case? This is a type error!";
                   }
                 case "True":
                   var local_24 = x.data;
                   return {tag: "Found"
                          ,data: {pre: {tag: "Empty",data: {}}
                                 ,post: local_17.tail
                                 ,item: local_17.head}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_25 = x.data;
               return {tag: "NotFound",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var toBytes = rts.builtins.Bytes["fromStream"];
var length = rts.builtins.Bytes["length"];
var _2e__2e_1 = function (local_30) {
           var x = _3e__3d_({infixl: local_30.start,infixr: local_30.stop});
           switch (x.tag)
           {
             case "False":
               var local_31 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_30.start
                             ,tail: function (local_32) {
                                return _2e__2e_1({step: local_30.step
                                                 ,start: _2b_({infixl: local_30.start
                                                              ,infixr: local_30.step})
                                                 ,stop: local_30.stop});
                             }}};
             case "True":
               var local_33 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2e__2e_ = function (local_29) {
           return _2e__2e_1({step: 1.0,start: local_29.start,stop: local_29.stop});
        };
var byteAt = rts.builtins.Bytes["byteAt"];
var foldLazy = function (local_38) {
           var x = local_38.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_39 = x.data;
               return local_38.binop({rest: function (local_40) {
                                        var dummy = _3d__3d_({infixl: local_40
                                                             ,infixr: {}});
                                        return foldLazy({stream: local_39.tail({})
                                                        ,initial: local_38.initial
                                                        ,binop: local_38.binop});
                                     }
                                     ,item: local_39.head});
             case "Empty":
               return local_38.initial(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var map = function (local_35) {
           return foldLazy({stream: local_35.stream
                           ,initial: function (local_36) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_37) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_35.mapping(local_37.item)
                                            ,tail: local_37.rest}};
                           }});
        };
var fromBytes = function (bytes) {
           var len = length(bytes);
           return map({stream: _2e__2e_({start: 0.0,stop: len})
                      ,mapping: function (local_34) {
                         return byteAt({index: local_34,object: bytes});
                      }});
        };
var parse = function (local_28) {
           var res = local_28.parser(fromBytes(local_28.text));
           var check = function () {
                      var x = res.state;
                      switch (x.tag)
                      {
                        case "NonEmpty":
                          var local_41 = x.data;
                          throw "Reached hole!";
                        case "Empty":
                          return id(x.data);
                        default:
                          throw "Unhandled case? This is a type error!";
                      }
                   }();
           return res.val;
        };
var parseLine = function (p) {
           return function (s1) {
                  var x = __break({stream: s1
                                  ,where: function (local_15) {
                                     return _3d__3d_({infixl: local_15,infixr: 10.0});
                                  }});
                  switch (x.tag)
                  {
                    case "NotFound":
                      var local_26 = x.data;
                      return p(s1);
                    case "Found":
                      var local_27 = x.data;
                      var local_42 = parse({text: toBytes(local_27.pre),parser: p});
                      return {state: local_27.post({}),val: local_42};
                    default:
                      throw "Unhandled case? This is a type error!";
                  }
               };
        };
var _7c__7c_ = function (local_48) {
           var x = local_48.l;
           switch (x.tag)
           {
             case "False":
               return local_48.r1(x.data);
             case "True":
               var local_49 = x.data;
               return {tag: "True",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var skipASpace = function (local_44) {
           var fin1 = function (local_45) { return {state: local_44,val: {}};};
           var x = local_44;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_46 = x.data;
               var x = _7c__7c_({l: _3d__3d_({infixl: local_46.head,infixr: 10.0})
                                ,r1: function (local_47) {
                                   return _3d__3d_({infixl: local_46.head,infixr: 32.0});
                                }});
               switch (x.tag)
               {
                 case "False":
                   return fin1(x.data);
                 case "True":
                   var local_50 = x.data;
                   return {state: local_46.tail({}),val: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               return fin1(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var __return = function (local_52) {
           return function (local_53) {
                  return {state: local_53,val: local_52};
               };
        };
var _3b_ = function (local_54) {
           return function (local_55) {
                  var local_56 = local_54.infixl(local_55);
                  return local_54.infixr(local_56.val)(local_56.state);
               };
        };
var replicate = function (local_57) {
           var x = _3c__3d_({infixl: local_57.count,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_58 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_57.item
                             ,tail: function (local_59) {
                                return replicate({count: _2d_({infixl: local_57.count
                                                              ,infixr: 1.0})
                                                 ,item: local_57.item});
                             }}};
             case "True":
               var local_60 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var sequence = function (s2) {
           return foldLazy({stream: s2
                           ,initial: function (local_61) {
                              return __return({tag: "Empty",data: {}});
                           }
                           ,binop: function (local_62) {
                              return _3b_({infixl: local_62.item
                                          ,infixr: function (local_63) {
                                             return _3b_({infixl: local_62.rest({})
                                                         ,infixr: function (local_64) {
                                                            return __return(_23_({head: local_63
                                                                                 ,tail: function (local_65) {
                                                                                    return local_64;
                                                                                 }}));
                                                         }});
                                          }});
                           }});
        };
var fold = function (local_70) {
           var x = local_70.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_71 = x.data;
               return fold({stream: local_71.tail({})
                           ,initial: local_70.binop({acc: local_70.initial
                                                    ,item: local_71.head})
                           ,binop: local_70.binop});
             case "Empty":
               var local_72 = x.data;
               return local_70.initial;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var length1 = function (stream1) {
           return fold({stream: stream1
                       ,initial: 0.0
                       ,binop: function (local_69) {
                          return _2b_({infixl: local_69.acc,infixr: 1.0});
                       }});
        };
var _3e_ = rts.builtins.Prelude[">"];
var filter = function (local_77) {
           var x = local_77.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_78 = x.data;
               var rest1 = function (local_79) {
                          return filter({stream: local_78.tail({}),keep: local_77.keep});
                       };
               var x = local_77.keep(local_78.head);
               switch (x.tag)
               {
                 case "False":
                   var local_80 = x.data;
                   return rest1({});
                 case "True":
                   var local_81 = x.data;
                   return {tag: "NonEmpty",data: {head: local_78.head,tail: rest1}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_82 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2b__2b_ = function (local_92) {
           return foldLazy({stream: local_92.l
                           ,initial: local_92.r1
                           ,binop: function (local_93) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_93.item,tail: local_93.rest}};
                           }});
        };
var concat = function (stream2) {
           return foldLazy({stream: stream2
                           ,initial: function (local_103) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_104) {
                              return _2b__2b_({l: local_104.item,r1: local_104.rest});
                           }});
        };
var intersperse = function (local_97) {
           var x = local_97.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_98 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_98.head
                             ,tail: function (local_99) {
                                return concat(map({stream: local_98.tail({})
                                                  ,mapping: function (local_100) {
                                                     return {tag: "NonEmpty"
                                                            ,data: {head: local_97.item
                                                                   ,tail: function (local_101) {
                                                                      return {tag: "NonEmpty"
                                                                             ,data: {head: local_100
                                                                                    ,tail: function (local_102) {
                                                                                       return {tag: "Empty"
                                                                                              ,data: {}};
                                                                                    }}};
                                                                   }}};
                                                  }}));
                             }}};
             case "Empty":
               var local_105 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var concat2 = function (stream4) {
           return toBytes(concat(map({stream: stream4
                                     ,mapping: function (local_107) {
                                        return fromBytes(local_107);
                                     }})));
        };
var concat1 = function (stream3) {
           return concat2(map({stream: stream3
                              ,mapping: function (local_106) {
                                 return local_106;
                              }}));
        };
var join = function (local_96) {
           return concat1(intersperse({stream: local_96.texts,item: local_96.sep}));
        };
var reverse = function (stream5) {
           return fold({stream: stream5
                       ,initial: {tag: "Empty",data: {}}
                       ,binop: function (local_113) {
                          return {tag: "NonEmpty"
                                 ,data: {head: local_113.item
                                        ,tail: function (local_114) {
                                           return local_113.acc;
                                        }}};
                       }});
        };
var zipWith = function (local_118) {
           var x = local_118.streamA;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_119 = x.data;
               var x = local_118.streamB;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_120 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_118.combineAB({a: local_119.head
                                                            ,b: local_120.head})
                                 ,tail: function (local_121) {
                                    return zipWith({combineAB: local_118.combineAB
                                                   ,streamB: local_120.tail({})
                                                   ,streamA: local_119.tail({})});
                                 }}};
                 case "Empty":
                   var local_122 = x.data;
                   return {tag: "Empty",data: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_123 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var negate = rts.builtins.Prelude["negate"];
var _3c_ = rts.builtins.Prelude["<"];
var partition = function (local_128) {
           return foldLazy({stream: local_128.stream
                           ,initial: function (local_129) {
                              return {False: {tag: "Empty",data: {}}
                                     ,True: {tag: "Empty",data: {}}};
                           }
                           ,binop: function (local_130) {
                              var r2 = local_130.rest({});
                              var x = local_128.by(local_130.item);
                              switch (x.tag)
                              {
                                case "False":
                                  var local_131 = x.data;
                                  return {False: _23_({head: local_130.item
                                                      ,tail: function (local_132) {
                                                         return r2.False;
                                                      }})
                                         ,True: r2.True};
                                case "True":
                                  var local_133 = x.data;
                                  return {False: r2.False
                                         ,True: _23_({head: local_130.item
                                                     ,tail: function (local_134) {
                                                        return r2.True;
                                                     }})};
                                default:
                                  throw "Unhandled case? This is a type error!";
                              }
                           }});
        };
var sort = function (local_125) {
           var x = local_125.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_126 = x.data;
               var cur = local_125.on(local_126.head);
               var parts = partition({stream: local_126.tail({})
                                     ,by: function (local_127) {
                                        return _3c_({infixl: local_125.on(local_127)
                                                    ,infixr: cur});
                                     }});
               return _2b__2b_({l: sort({stream: parts.True,on: local_125.on})
                               ,r1: function (local_135) {
                                  return _23_({head: local_126.head
                                              ,tail: function (local_136) {
                                                 return sort({stream: parts.False
                                                             ,on: local_125.on});
                                              }});
                               }});
             case "Empty":
               var local_137 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var toArray = rts.builtins.Array["fromStream"];
var length2 = rts.builtins.Array["length"];
var item1 = rts.builtins.Array["item"];
var fromArray = function (array) {
           var len1 = length2(array);
           return map({stream: _2e__2e_({start: 0.0,stop: len1})
                      ,mapping: function (local_138) {
                         return item1({index: local_138,object: array});
                      }});
        };
var solve__2016__1C__A = function (local_66) {
           return __while({iter: function (local_67) {
                             var x = local_67.remain;
                             switch (x.tag)
                             {
                               case "NonEmpty":
                                 var c0 = x.data;
                                 var x = c0.tail({});
                                 switch (x.tag)
                                 {
                                   case "NonEmpty":
                                     var c1 = x.data;
                                     var x =
                                             _26__26_({l: _3d__3d_({infixl: c0.head.senators
                                                                   ,infixr: 1.0})
                                                      ,r1: function (local_68) {
                                                         return _3d__3d_({infixl: length1(c1.tail({}))
                                                                         ,infixr: 1.0});
                                                      }});
                                     switch (x.tag)
                                     {
                                       case "False":
                                         var local_73 = x.data;
                                         return {tag: "Continue"
                                                ,data: {remain: foldLazy({stream: c1.tail({})
                                                                         ,initial: function (local_83) {
                                                                            return id;
                                                                         }
                                                                         ,binop: function (local_84) {
                                                                            return function (local_85) {
                                                                                   var notHere =
                                                                                           function (local_86) {
                                                                                              return _23_({head: local_84.item
                                                                                                          ,tail: function (local_87) {
                                                                                                             return local_84.rest({})(local_85);
                                                                                                          }});
                                                                                           };
                                                                                   var x =
                                                                                           local_85;
                                                                                   switch (x.tag)
                                                                                   {
                                                                                     case "NonEmpty":
                                                                                       var local_88 =
                                                                                               x.data;
                                                                                       var x =
                                                                                               _3e_({infixl: local_88.head.senators
                                                                                                    ,infixr: local_84.item.senators});
                                                                                       switch (x.tag)
                                                                                       {
                                                                                         case "False":
                                                                                           return notHere(x.data);
                                                                                         case "True":
                                                                                           var local_89 =
                                                                                                   x.data;
                                                                                           return _2b__2b_({l: local_85
                                                                                                           ,r1: function (local_90) {
                                                                                                              return _23_({head: local_84.item
                                                                                                                          ,tail: function (local_91) {
                                                                                                                             return local_84.rest({})({tag: "Empty"
                                                                                                                                                      ,data: {}});
                                                                                                                          }});
                                                                                                           }});
                                                                                         default:
                                                                                           throw "Unhandled case? This is a type error!";
                                                                                       }
                                                                                     case "Empty":
                                                                                       return notHere(x.data);
                                                                                     default:
                                                                                       throw "Unhandled case? This is a type error!";
                                                                                   }
                                                                                };
                                                                         }})(filter({stream: _23_({head: {senators: _2d_({infixl: c0.head.senators
                                                                                                                         ,infixr: 1.0})
                                                                                                         ,party: c0.head.party}
                                                                                                  ,tail: function (local_74) {
                                                                                                     return _23_({head: {senators: _2d_({infixl: c1.head.senators
                                                                                                                                        ,infixr: 1.0})
                                                                                                                        ,party: c1.head.party}
                                                                                                                 ,tail: function (local_75) {
                                                                                                                    return {tag: "Empty"
                                                                                                                           ,data: {}};
                                                                                                                 }});
                                                                                                  }})
                                                                                    ,keep: function (local_76) {
                                                                                       return _3e_({infixl: local_76.senators
                                                                                                   ,infixr: 0.0});
                                                                                    }}))
                                                       ,soFar: _23_({head: join({texts: _23_({head: c0.head.party
                                                                                             ,tail: function (local_94) {
                                                                                                return _23_({head: c1.head.party
                                                                                                            ,tail: function (local_95) {
                                                                                                               return {tag: "Empty"
                                                                                                                      ,data: {}};
                                                                                                            }});
                                                                                             }})
                                                                                ,sep: rts.bytesFromString("")})
                                                                    ,tail: function (local_108) {
                                                                       return local_67.soFar;
                                                                    }})}};
                                       case "True":
                                         var local_109 = x.data;
                                         return {tag: "Continue"
                                                ,data: {remain: c0.tail({})
                                                       ,soFar: _23_({head: c0.head.party
                                                                    ,tail: function (local_110) {
                                                                       return local_67.soFar;
                                                                    }})}};
                                       default:
                                         throw "Unhandled case? This is a type error!";
                                     }
                                   case "Empty":
                                     var local_111 = x.data;
                                     throw "Reached hole!";
                                   default:
                                     throw "Unhandled case? This is a type error!";
                                 }
                               case "Empty":
                                 var local_112 = x.data;
                                 return {tag: "Done"
                                        ,data: join({texts: reverse(local_67.soFar)
                                                    ,sep: rts.bytesFromString(" ")})};
                               default:
                                 throw "Unhandled case? This is a type error!";
                             }
                          }
                          ,init: {remain: fromArray(toArray(sort({stream: zipWith({combineAB: function (local_115) {
                                                                                     return {senators: local_115.a
                                                                                            ,party: local_115.b};
                                                                                  }
                                                                                  ,streamB: map({stream: _2e__2e_({start: 0.0
                                                                                                                  ,stop: length1(local_66)})
                                                                                                ,mapping: function (local_116) {
                                                                                                   return toBytes(_23_({head: _2b_({infixl: local_116
                                                                                                                                   ,infixr: 65.0})
                                                                                                                       ,tail: function (local_117) {
                                                                                                                          return {tag: "Empty"
                                                                                                                                 ,data: {}};
                                                                                                                       }}));
                                                                                                }})
                                                                                  ,streamA: local_66})
                                                                 ,on: function (local_124) {
                                                                    return negate(local_124.senators);
                                                                 }})))
                                 ,soFar: {tag: "Empty",data: {}}}});
        };
var _25_ = rts.builtins.Prelude["mod"];
var _2f__2f_ = rts.builtins.Prelude["div"];
var littleEndian = function (local_142) {
           var x = _3d__3d_({infixl: local_142.number,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_143 = x.data;
               return _23_({head: _25_({infixl: local_142.number,infixr: local_142.base})
                           ,tail: function (local_144) {
                              return littleEndian({base: local_142.base
                                                  ,number: _2f__2f_({infixl: local_142.number
                                                                    ,infixr: local_142.base})});
                           }});
             case "True":
               var local_145 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var showPosInt = function (num) {
           var x = _3d__3d_({infixl: num,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_141 = x.data;
               return toBytes(map({stream: reverse(littleEndian({base: 10.0,number: num}))
                                  ,mapping: function (local_146) {
                                     return _2b_({infixl: local_146,infixr: 48.0});
                                  }}));
             case "True":
               var local_147 = x.data;
               return rts.bytesFromString("0");
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var codeJam = function (local_139) {
           return join({texts: parse({text: input
                                     ,parser: _3b_({infixl: parseLine(parsePosInt)
                                                   ,infixr: function (numCases) {
                                                      return sequence(map({stream: _2e__2e_({start: 1.0
                                                                                            ,stop: _2b_({infixl: numCases
                                                                                                        ,infixr: 1.0})})
                                                                          ,mapping: function (caseId) {
                                                                             return _3b_({infixl: local_139.solve
                                                                                         ,infixr: function (result) {
                                                                                            return __return(join({texts: _23_({head: rts.bytesFromString("Case #")
                                                                                                                              ,tail: function (local_140) {
                                                                                                                                 return _23_({head: showPosInt(caseId)
                                                                                                                                             ,tail: function (local_148) {
                                                                                                                                                return _23_({head: rts.bytesFromString(": ")
                                                                                                                                                            ,tail: function (local_149) {
                                                                                                                                                               return _23_({head: result
                                                                                                                                                                           ,tail: function (local_150) {
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
rts.logRepl(codeJam({input2: input
                    ,solve: _3b_({infixl: parseLine(parsePosInt)
                                 ,infixr: function (n) {
                                    return _3b_({infixl: sequence(replicate({count: n
                                                                            ,item: _3b_({infixl: parsePosInt
                                                                                        ,infixr: function (local_43) {
                                                                                           return _3b_({infixl: skipASpace
                                                                                                       ,infixr: function (local_51) {
                                                                                                          return __return(local_43);
                                                                                                       }});
                                                                                        }})}))
                                                ,infixr: function (input1) {
                                                   return __return(solve__2016__1C__A(input1));
                                                }});
                                 }})}));
