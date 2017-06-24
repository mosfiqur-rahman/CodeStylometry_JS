"use strict";
var scopeId_0 = 0;
var scopeCounter = 1;
var rts = require("rts.js");
var log = function (exprId,result) { return rts.logResult(scopeId_0,exprId,result);};
var input =
        rts.bytesFromString("25\n1 1 1 0\n1 2 0 0\n2 1 1 2\n2 2 0 2\n2 2 1 1\n1 0 1 1\n3 3 3 2\n2 1 0 3\n3 0 8 0\n2 1 2 1\n2 1 3 0\n2 4 0 0\n3 2 2 4\n2 0 4 0\n3 2 3 3\n3 8 0 0\n1 1 0 1\n2 0 1 3\n3 1 3 4\n3 2 0 6\n3 3 2 3\n3 2 4 2\n2 0 3 1\n3 4 2 2\n1 0 0 2\n");
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
var skipASpace = function (s1) {
           var x = s1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_15 = x.data;
               var x = _3d__3d_({infixl: local_15.head,infixr: 32.0});
               switch (x.tag)
               {
                 case "False":
                   var local_16 = x.data;
                   throw "Reached hole!";
                 case "True":
                   var local_17 = x.data;
                   return {state: local_15.tail({}),val: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_18 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var byteAt = rts.builtins.Bytes["byteAt"];
var ord = function (txt) { return byteAt({index: 0.0,object: txt});};
var length = rts.builtins.Bytes["length"];
var _2e__2e_1 = function (local_23) {
           var x = _3e__3d_({infixl: local_23.start1,infixr: local_23.stop});
           switch (x.tag)
           {
             case "False":
               var local_24 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_23.start1
                             ,tail: function (local_25) {
                                return _2e__2e_1({step: local_23.step
                                                 ,start1: _2b_({infixl: local_23.start1
                                                               ,infixr: local_23.step})
                                                 ,stop: local_23.stop});
                             }}};
             case "True":
               var local_26 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2e__2e_ = function (local_22) {
           return _2e__2e_1({step: 1.0,start1: local_22.start1,stop: local_22.stop});
        };
var foldLazy = function (local_31) {
           var x = local_31.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_32 = x.data;
               return local_31.binop({rest: function (local_33) {
                                        var dummy = _3d__3d_({infixl: local_33
                                                             ,infixr: {}});
                                        return foldLazy({stream: local_32.tail({})
                                                        ,initial: local_31.initial
                                                        ,binop: local_31.binop});
                                     }
                                     ,item: local_32.head});
             case "Empty":
               return local_31.initial(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var map = function (local_28) {
           return foldLazy({stream: local_28.stream
                           ,initial: function (local_29) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_30) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_28.mapping(local_30.item)
                                            ,tail: local_30.rest}};
                           }});
        };
var fromBytes = function (bytes) {
           var len = length(bytes);
           return map({stream: _2e__2e_({start1: 0.0,stop: len})
                      ,mapping: function (local_27) {
                         return byteAt({index: local_27,object: bytes});
                      }});
        };
var _2b__2b_ = function (local_48) {
           return foldLazy({stream: local_48.l
                           ,initial: local_48.r1
                           ,binop: function (local_49) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_49.item,tail: local_49.rest}};
                           }});
        };
var concat = function (stream1) {
           return foldLazy({stream: stream1
                           ,initial: function (local_46) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_47) {
                              return _2b__2b_({l: local_47.item,r1: local_47.rest});
                           }});
        };
var intersperse = function (local_40) {
           var x = local_40.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_41 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_41.head
                             ,tail: function (local_42) {
                                return concat(map({stream: local_41.tail({})
                                                  ,mapping: function (local_43) {
                                                     return {tag: "NonEmpty"
                                                            ,data: {head: local_40.item
                                                                   ,tail: function (local_44) {
                                                                      return {tag: "NonEmpty"
                                                                             ,data: {head: local_43
                                                                                    ,tail: function (local_45) {
                                                                                       return {tag: "Empty"
                                                                                              ,data: {}};
                                                                                    }}};
                                                                   }}};
                                                  }}));
                             }}};
             case "Empty":
               var local_50 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var toBytes = rts.builtins.Bytes["fromStream"];
var concat2 = function (stream3) {
           return toBytes(concat(map({stream: stream3
                                     ,mapping: function (local_52) {
                                        return fromBytes(local_52);
                                     }})));
        };
var concat1 = function (stream2) {
           return concat2(map({stream: stream2
                              ,mapping: function (local_51) {
                                 return local_51;
                              }}));
        };
var join = function (local_39) {
           return concat1(intersperse({stream: local_39.texts,item: local_39.sep}));
        };
var rpsStep = function (cur) {
           var r3 = ord(rts.bytesFromString("R"));
           var p1 = ord(rts.bytesFromString("P"));
           return join({texts: map({stream: fromBytes(cur)
                                   ,mapping: function (local_34) {
                                      var x = _3d__3d_({infixl: local_34,infixr: r3});
                                      switch (x.tag)
                                      {
                                        case "False":
                                          var local_35 = x.data;
                                          var x = _3d__3d_({infixl: local_34,infixr: p1});
                                          switch (x.tag)
                                          {
                                            case "False":
                                              var local_36 = x.data;
                                              return rts.bytesFromString("SR");
                                            case "True":
                                              var local_37 = x.data;
                                              return rts.bytesFromString("PS");
                                            default:
                                              throw "Unhandled case? This is a type error!";
                                          }
                                        case "True":
                                          var local_38 = x.data;
                                          return rts.bytesFromString("RP");
                                        default:
                                          throw "Unhandled case? This is a type error!";
                                      }
                                   }})
                       ,sep: rts.bytesFromString("")});
        };
var iterate = function (local_53) {
           return {tag: "NonEmpty"
                  ,data: {head: local_53.initial
                         ,tail: function (local_54) {
                            return iterate({initial: local_53.next(local_53.initial)
                                           ,next: local_53.next});
                         }}};
        };
var drop = function (local_55) {
           var x = _3c__3d_({infixl: local_55.count,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_56 = x.data;
               var x = local_55.stream;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_57 = x.data;
                   return drop({stream: local_57.tail({})
                               ,count: _2d_({infixl: local_55.count,infixr: 1.0})});
                 case "Empty":
                   var local_58 = x.data;
                   return {tag: "Empty",data: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "True":
               var local_59 = x.data;
               return local_55.stream;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var filter = function (local_63) {
           var x = local_63.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_64 = x.data;
               var rest1 = function (local_65) {
                          return filter({stream: local_64.tail({}),keep: local_63.keep});
                       };
               var x = local_63.keep(local_64.head);
               switch (x.tag)
               {
                 case "False":
                   var local_66 = x.data;
                   return rest1({});
                 case "True":
                   var local_67 = x.data;
                   return {tag: "NonEmpty",data: {head: local_64.head,tail: rest1}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_68 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
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
var length1 = function (stream4) {
           return fold({stream: stream4
                       ,initial: 0.0
                       ,binop: function (local_69) {
                          return _2b_({infixl: local_69.acc,infixr: 1.0});
                       }});
        };
var _2f_ = rts.builtins.Prelude["/"];
var slice = rts.builtins.Bytes["slice"];
var _23_ = function (local_82) {
           return {tag: "NonEmpty",data: {head: local_82.head,tail: local_82.tail}};
        };
var rpsOrder = function (res) {
           var len1 = length(res);
           var x = _3d__3d_({infixl: len1,infixr: 1.0});
           switch (x.tag)
           {
             case "False":
               var local_78 = x.data;
               var a = rpsOrder(slice({object: res
                                      ,start1: 0.0
                                      ,stop: _2f_({infixl: len1,infixr: 2.0})}));
               var b = rpsOrder(slice({object: res
                                      ,start1: _2f_({infixl: len1,infixr: 2.0})
                                      ,stop: len1}));
               var x = _3c__3d_({infixl: a,infixr: b});
               switch (x.tag)
               {
                 case "False":
                   var local_79 = x.data;
                   return join({texts: _23_({head: b
                                            ,tail: function (local_80) {
                                               return _23_({head: a
                                                           ,tail: function (local_81) {
                                                              return {tag: "Empty"
                                                                     ,data: {}};
                                                           }});
                                            }})
                               ,sep: rts.bytesFromString("")});
                 case "True":
                   var local_83 = x.data;
                   return join({texts: _23_({head: a
                                            ,tail: function (local_84) {
                                               return _23_({head: b
                                                           ,tail: function (local_85) {
                                                              return {tag: "Empty"
                                                                     ,data: {}};
                                                           }});
                                            }})
                               ,sep: rts.bytesFromString("")});
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "True":
               var local_86 = x.data;
               return res;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var __return = function (local_91) {
           return function (local_92) {
                  return {state: local_92,val: local_91};
               };
        };
var _3b_ = function (local_93) {
           return function (local_94) {
                  var local_95 = local_93.infixl(local_94);
                  return local_93.infixr(local_95.val)(local_95.state);
               };
        };
var __break = function (local_97) {
           var x = local_97.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_98 = x.data;
               var x = local_97.where(local_98.head);
               switch (x.tag)
               {
                 case "False":
                   var local_99 = x.data;
                   var local_100 = __break({stream: local_98.tail({})
                                           ,where: local_97.where});
                   var x = local_100;
                   switch (x.tag)
                   {
                     case "NotFound":
                       var local_101 = x.data;
                       return {tag: "NotFound",data: {}};
                     case "Found":
                       var local_102 = x.data;
                       return {tag: "Found"
                              ,data: {pre: _23_({head: local_98.head
                                                ,tail: function (local_103) {
                                                   return local_102.pre;
                                                }})
                                     ,post: local_102.post
                                     ,item: local_102.item}};
                     default:
                       throw "Unhandled case? This is a type error!";
                   }
                 case "True":
                   var local_104 = x.data;
                   return {tag: "Found"
                          ,data: {pre: {tag: "Empty",data: {}}
                                 ,post: local_98.tail
                                 ,item: local_98.head}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_105 = x.data;
               return {tag: "NotFound",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parse = function (local_108) {
           var res1 = local_108.parser(fromBytes(local_108.text));
           var check = function () {
                      var x = res1.state;
                      switch (x.tag)
                      {
                        case "NonEmpty":
                          var local_109 = x.data;
                          throw "Reached hole!";
                        case "Empty":
                          return id(x.data);
                        default:
                          throw "Unhandled case? This is a type error!";
                      }
                   }();
           return res1.val;
        };
var parseLine = function (p2) {
           return function (s3) {
                  var x = __break({stream: s3
                                  ,where: function (local_96) {
                                     return _3d__3d_({infixl: local_96,infixr: 10.0});
                                  }});
                  switch (x.tag)
                  {
                    case "NotFound":
                      var local_106 = x.data;
                      return p2(s3);
                    case "Found":
                      var local_107 = x.data;
                      var local_110 = parse({text: toBytes(local_107.pre),parser: p2});
                      return {state: local_107.post({}),val: local_110};
                    default:
                      throw "Unhandled case? This is a type error!";
                  }
               };
        };
var _25_ = rts.builtins.Prelude["mod"];
var _2f__2f_ = rts.builtins.Prelude["div"];
var littleEndian = function (local_114) {
           var x = _3d__3d_({infixl: local_114.number,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_115 = x.data;
               return _23_({head: _25_({infixl: local_114.number,infixr: local_114.base})
                           ,tail: function (local_116) {
                              return littleEndian({base: local_114.base
                                                  ,number: _2f__2f_({infixl: local_114.number
                                                                    ,infixr: local_114.base})});
                           }});
             case "True":
               var local_117 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var reverse = function (stream5) {
           return fold({stream: stream5
                       ,initial: {tag: "Empty",data: {}}
                       ,binop: function (local_118) {
                          return {tag: "NonEmpty"
                                 ,data: {head: local_118.item
                                        ,tail: function (local_119) {
                                           return local_118.acc;
                                        }}};
                       }});
        };
var showPosInt = function (num) {
           var x = _3d__3d_({infixl: num,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_113 = x.data;
               return toBytes(map({stream: reverse(littleEndian({base: 10.0,number: num}))
                                  ,mapping: function (local_120) {
                                     return _2b_({infixl: local_120,infixr: 48.0});
                                  }}));
             case "True":
               var local_121 = x.data;
               return rts.bytesFromString("0");
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var sequence = function (s4) {
           return foldLazy({stream: s4
                           ,initial: function (local_125) {
                              return __return({tag: "Empty",data: {}});
                           }
                           ,binop: function (local_126) {
                              return _3b_({infixl: local_126.item
                                          ,infixr: function (local_127) {
                                             return _3b_({infixl: local_126.rest({})
                                                         ,infixr: function (local_128) {
                                                            return __return(_23_({head: local_127
                                                                                 ,tail: function (local_129) {
                                                                                    return local_128;
                                                                                 }}));
                                                         }});
                                          }});
                           }});
        };
var codeJam = function (local_111) {
           return join({texts: parse({text: input
                                     ,parser: _3b_({infixl: parseLine(parsePosInt)
                                                   ,infixr: function (numCases) {
                                                      return sequence(map({stream: _2e__2e_({start1: 1.0
                                                                                            ,stop: _2b_({infixl: numCases
                                                                                                        ,infixr: 1.0})})
                                                                          ,mapping: function (caseId) {
                                                                             return _3b_({infixl: local_111.solve
                                                                                         ,infixr: function (result) {
                                                                                            return __return(join({texts: _23_({head: rts.bytesFromString("Case #")
                                                                                                                              ,tail: function (local_112) {
                                                                                                                                 return _23_({head: showPosInt(caseId)
                                                                                                                                             ,tail: function (local_122) {
                                                                                                                                                return _23_({head: rts.bytesFromString(": ")
                                                                                                                                                            ,tail: function (local_123) {
                                                                                                                                                               return _23_({head: result
                                                                                                                                                                           ,tail: function (local_124) {
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
                    ,solve: parseLine(_3b_({infixl: parsePosInt
                                           ,infixr: function (n) {
                                              return _3b_({infixl: skipASpace
                                                          ,infixr: function (local_19) {
                                                             return _3b_({infixl: parsePosInt
                                                                         ,infixr: function (r2) {
                                                                            return _3b_({infixl: skipASpace
                                                                                        ,infixr: function (local_20) {
                                                                                           return _3b_({infixl: parsePosInt
                                                                                                       ,infixr: function (p) {
                                                                                                          return _3b_({infixl: skipASpace
                                                                                                                      ,infixr: function (local_21) {
                                                                                                                         return _3b_({infixl: parsePosInt
                                                                                                                                     ,infixr: function (s2) {
                                                                                                                                        var __try =
                                                                                                                                                function (start) {
                                                                                                                                                   var x =
                                                                                                                                                           drop({stream: iterate({initial: start
                                                                                                                                                                                 ,next: rpsStep})
                                                                                                                                                                ,count: n});
                                                                                                                                                   switch (x.tag)
                                                                                                                                                   {
                                                                                                                                                     case "NonEmpty":
                                                                                                                                                       var local_60 =
                                                                                                                                                               x.data;
                                                                                                                                                       var local_73 =
                                                                                                                                                               function (local_61) {
                                                                                                                                                                  return length1(filter({stream: fromBytes(local_60.head)
                                                                                                                                                                                        ,keep: function (local_62) {
                                                                                                                                                                                           return _3d__3d_({infixl: local_62
                                                                                                                                                                                                           ,infixr: local_61});
                                                                                                                                                                                        }}));
                                                                                                                                                               };
                                                                                                                                                       var x =
                                                                                                                                                               _26__26_({l: _3d__3d_({infixl: local_73(ord(rts.bytesFromString("R")))
                                                                                                                                                                                     ,infixr: r2})
                                                                                                                                                                        ,r1: function (local_74) {
                                                                                                                                                                           return _26__26_({l: _3d__3d_({infixl: local_73(ord(rts.bytesFromString("P")))
                                                                                                                                                                                                        ,infixr: p})
                                                                                                                                                                                           ,r1: function (local_75) {
                                                                                                                                                                                              return _3d__3d_({infixl: local_73(ord(rts.bytesFromString("S")))
                                                                                                                                                                                                              ,infixr: s2});
                                                                                                                                                                                           }});
                                                                                                                                                                        }});
                                                                                                                                                       switch (x.tag)
                                                                                                                                                       {
                                                                                                                                                         case "False":
                                                                                                                                                           var local_76 =
                                                                                                                                                                   x.data;
                                                                                                                                                           return {tag: "Nothing"
                                                                                                                                                                  ,data: {}};
                                                                                                                                                         case "True":
                                                                                                                                                           var local_77 =
                                                                                                                                                                   x.data;
                                                                                                                                                           return {tag: "Just"
                                                                                                                                                                  ,data: rpsOrder(local_60.head)};
                                                                                                                                                         default:
                                                                                                                                                           throw "Unhandled case? This is a type error!";
                                                                                                                                                       }
                                                                                                                                                     case "Empty":
                                                                                                                                                       var local_87 =
                                                                                                                                                               x.data;
                                                                                                                                                       throw "Reached hole!";
                                                                                                                                                     default:
                                                                                                                                                       throw "Unhandled case? This is a type error!";
                                                                                                                                                   }
                                                                                                                                                };
                                                                                                                                        return __return(function () {
                                                                                                                                               var x =
                                                                                                                                                       __try(rts.bytesFromString("R"));
                                                                                                                                               switch (x.tag)
                                                                                                                                               {
                                                                                                                                                 case "Just":
                                                                                                                                                   return id(x.data);
                                                                                                                                                 case "Nothing":
                                                                                                                                                   var local_88 =
                                                                                                                                                           x.data;
                                                                                                                                                   var x =
                                                                                                                                                           __try(rts.bytesFromString("P"));
                                                                                                                                                   switch (x.tag)
                                                                                                                                                   {
                                                                                                                                                     case "Just":
                                                                                                                                                       return id(x.data);
                                                                                                                                                     case "Nothing":
                                                                                                                                                       var local_89 =
                                                                                                                                                               x.data;
                                                                                                                                                       var x =
                                                                                                                                                               __try(rts.bytesFromString("S"));
                                                                                                                                                       switch (x.tag)
                                                                                                                                                       {
                                                                                                                                                         case "Just":
                                                                                                                                                           return id(x.data);
                                                                                                                                                         case "Nothing":
                                                                                                                                                           var local_90 =
                                                                                                                                                                   x.data;
                                                                                                                                                           return rts.bytesFromString("IMPOSSIBLE");
                                                                                                                                                         default:
                                                                                                                                                           throw "Unhandled case? This is a type error!";
                                                                                                                                                       }
                                                                                                                                                     default:
                                                                                                                                                       throw "Unhandled case? This is a type error!";
                                                                                                                                                   }
                                                                                                                                                 default:
                                                                                                                                                   throw "Unhandled case? This is a type error!";
                                                                                                                                               }
                                                                                                                                            }());
                                                                                                                                     }});
                                                                                                                      }});
                                                                                                       }});
                                                                                        }});
                                                                         }});
                                                          }});
                                           }}))}));
