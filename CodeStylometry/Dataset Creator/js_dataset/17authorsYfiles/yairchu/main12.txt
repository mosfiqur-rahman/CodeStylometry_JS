"use strict";
var scopeId_0 = 0;
var scopeCounter = 1;
var rts = require("rts.js");
var log = function (exprId,result) { return rts.logResult(scopeId_0,exprId,result);};
var input =
        rts.bytesFromString("100\n1 1 1 10\n1 2 3 2\n1 1 3 2\n1 2 3 1\n1 1 2 8\n2 2 2 5\n2 3 3 10\n1 1 2 6\n1 1 3 10\n3 3 3 1\n2 3 3 2\n3 3 3 3\n1 3 3 7\n2 2 2 1\n2 2 3 7\n2 2 2 6\n1 1 2 10\n2 2 3 5\n1 1 2 9\n1 3 3 10\n1 2 2 5\n1 1 1 8\n1 3 3 2\n1 1 1 2\n1 1 3 5\n1 1 1 5\n1 2 2 3\n2 2 2 4\n1 2 2 6\n1 2 3 7\n2 2 2 2\n2 2 2 7\n1 1 1 4\n1 1 3 4\n1 1 3 1\n1 1 1 1\n2 2 3 3\n2 2 2 3\n1 1 3 8\n3 3 3 2\n2 2 3 1\n1 2 3 4\n2 3 3 7\n1 3 3 1\n1 1 1 7\n3 3 3 4\n3 3 3 9\n1 2 3 8\n1 2 2 7\n1 2 3 5\n2 2 3 4\n1 1 1 3\n1 2 3 9\n1 2 2 8\n1 2 2 4\n1 2 2 9\n3 3 3 10\n1 1 2 3\n1 1 3 9\n1 1 2 4\n3 3 3 5\n1 3 3 5\n2 3 3 5\n2 2 3 9\n1 2 2 2\n2 2 2 10\n1 3 3 9\n2 3 3 1\n1 3 3 4\n1 1 2 5\n1 1 2 2\n1 3 3 6\n1 3 3 8\n1 1 2 7\n1 2 3 6\n1 2 3 3\n3 3 3 7\n2 2 3 2\n2 2 3 10\n3 3 3 8\n1 1 2 1\n2 3 3 4\n2 3 3 3\n1 1 3 3\n1 1 1 6\n1 2 2 1\n2 3 3 8\n1 2 2 10\n3 3 3 6\n2 3 3 6\n2 2 3 6\n2 2 2 8\n1 1 1 9\n1 2 3 10\n1 1 3 6\n2 2 3 8\n2 3 3 9\n1 1 3 7\n2 2 2 9\n1 3 3 3\n");
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
var _7c__7c_ = function (local_19) {
           var x = local_19.l;
           switch (x.tag)
           {
             case "False":
               return local_19.r1(x.data);
             case "True":
               var local_20 = x.data;
               return {tag: "True",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var skipASpace = function (local_15) {
           var fin1 = function (local_16) { return {state: local_15,val: {}};};
           var x = local_15;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_17 = x.data;
               var x = _7c__7c_({l: _3d__3d_({infixl: local_17.head,infixr: 10.0})
                                ,r1: function (local_18) {
                                   return _3d__3d_({infixl: local_17.head,infixr: 32.0});
                                }});
               switch (x.tag)
               {
                 case "False":
                   return fin1(x.data);
                 case "True":
                   var local_21 = x.data;
                   return {state: local_17.tail({}),val: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               return fin1(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var min = function (local_25) {
           var x = _3c__3d_({infixl: local_25.__x1,infixr: local_25.y});
           switch (x.tag)
           {
             case "False":
               var local_26 = x.data;
               return local_25.y;
             case "True":
               var local_27 = x.data;
               return local_25.__x1;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _25_ = rts.builtins.Prelude["mod"];
var _2f__2f_ = rts.builtins.Prelude["div"];
var _23_ = function (local_32) {
           return {tag: "NonEmpty",data: {head: local_32.head,tail: local_32.tail}};
        };
var littleEndian = function (local_29) {
           var x = _3d__3d_({infixl: local_29.number,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_30 = x.data;
               return _23_({head: _25_({infixl: local_29.number,infixr: local_29.base})
                           ,tail: function (local_31) {
                              return littleEndian({base: local_29.base
                                                  ,number: _2f__2f_({infixl: local_29.number
                                                                    ,infixr: local_29.base})});
                           }});
             case "True":
               var local_33 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var fold = function (local_36) {
           var x = local_36.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_37 = x.data;
               return fold({stream1: local_37.tail({})
                           ,initial: local_36.binop({acc: local_36.initial
                                                    ,item: local_37.head})
                           ,binop: local_36.binop});
             case "Empty":
               var local_38 = x.data;
               return local_36.initial;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var reverse = function (stream) {
           return fold({stream1: stream
                       ,initial: {tag: "Empty",data: {}}
                       ,binop: function (local_34) {
                          return {tag: "NonEmpty"
                                 ,data: {head: local_34.item
                                        ,tail: function (local_35) {
                                           return local_34.acc;
                                        }}};
                       }});
        };
var foldLazy = function (local_43) {
           var x = local_43.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_44 = x.data;
               return local_43.binop({rest: function (local_45) {
                                        var dummy = _3d__3d_({infixl: local_45
                                                             ,infixr: {}});
                                        return foldLazy({stream1: local_44.tail({})
                                                        ,initial: local_43.initial
                                                        ,binop: local_43.binop});
                                     }
                                     ,item: local_44.head});
             case "Empty":
               return local_43.initial(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var map = function (local_40) {
           return foldLazy({stream1: local_40.stream1
                           ,initial: function (local_41) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_42) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_40.mapping(local_42.item)
                                            ,tail: local_42.rest}};
                           }});
        };
var toBytes = rts.builtins.Bytes["fromStream"];
var showPosInt = function (num) {
           var x = _3d__3d_({infixl: num,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_28 = x.data;
               return toBytes(map({stream1: reverse(littleEndian({base: 10.0
                                                                 ,number: num}))
                                  ,mapping: function (local_39) {
                                     return _2b_({infixl: local_39,infixr: 48.0});
                                  }}));
             case "True":
               var local_46 = x.data;
               return rts.bytesFromString("0");
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2e__2e_1 = function (local_49) {
           var x = _3e__3d_({infixl: local_49.start,infixr: local_49.stop});
           switch (x.tag)
           {
             case "False":
               var local_50 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_49.start
                             ,tail: function (local_51) {
                                return _2e__2e_1({step: local_49.step
                                                 ,start: _2b_({infixl: local_49.start
                                                              ,infixr: local_49.step})
                                                 ,stop: local_49.stop});
                             }}};
             case "True":
               var local_52 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2e__2e_ = function (local_48) {
           return _2e__2e_1({step: 1.0,start: local_48.start,stop: local_48.stop});
        };
var _2b__2b_ = function (local_68) {
           return foldLazy({stream1: local_68.l
                           ,initial: local_68.r1
                           ,binop: function (local_69) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_69.item,tail: local_69.rest}};
                           }});
        };
var concat = function (stream2) {
           return foldLazy({stream1: stream2
                           ,initial: function (local_66) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_67) {
                              return _2b__2b_({l: local_67.item,r1: local_67.rest});
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
var length = rts.builtins.Bytes["length"];
var byteAt = rts.builtins.Bytes["byteAt"];
var fromBytes = function (bytes) {
           var len = length(bytes);
           return map({stream1: _2e__2e_({start: 0.0,stop: len})
                      ,mapping: function (local_73) {
                         return byteAt({index: local_73,object: bytes});
                      }});
        };
var concat2 = function (stream4) {
           return toBytes(concat(map({stream1: stream4
                                     ,mapping: function (local_72) {
                                        return fromBytes(local_72);
                                     }})));
        };
var concat1 = function (stream3) {
           return concat2(map({stream1: stream3
                              ,mapping: function (local_71) {
                                 return local_71;
                              }}));
        };
var join = function (local_59) {
           return concat1(intersperse({stream1: local_59.texts,item: local_59.sep}));
        };
var __return = function (local_74) {
           return function (local_75) {
                  return {state: local_75,val: local_74};
               };
        };
var _3b_ = function (local_76) {
           return function (local_77) {
                  var local_78 = local_76.infixl(local_77);
                  return local_76.infixr(local_78.val)(local_78.state);
               };
        };
var __break = function (local_80) {
           var x = local_80.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_81 = x.data;
               var x = local_80.where(local_81.head);
               switch (x.tag)
               {
                 case "False":
                   var local_82 = x.data;
                   var local_83 = __break({stream1: local_81.tail({})
                                          ,where: local_80.where});
                   var x = local_83;
                   switch (x.tag)
                   {
                     case "NotFound":
                       var local_84 = x.data;
                       return {tag: "NotFound",data: {}};
                     case "Found":
                       var local_85 = x.data;
                       return {tag: "Found"
                              ,data: {pre: _23_({head: local_81.head
                                                ,tail: function (local_86) {
                                                   return local_85.pre;
                                                }})
                                     ,post: local_85.post
                                     ,item: local_85.item}};
                     default:
                       throw "Unhandled case? This is a type error!";
                   }
                 case "True":
                   var local_87 = x.data;
                   return {tag: "Found"
                          ,data: {pre: {tag: "Empty",data: {}}
                                 ,post: local_81.tail
                                 ,item: local_81.head}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_88 = x.data;
               return {tag: "NotFound",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parse = function (local_91) {
           var res = local_91.parser(fromBytes(local_91.text));
           var check = function () {
                      var x = res.state;
                      switch (x.tag)
                      {
                        case "NonEmpty":
                          var local_92 = x.data;
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
           return function (s2) {
                  var x = __break({stream1: s2
                                  ,where: function (local_79) {
                                     return _3d__3d_({infixl: local_79,infixr: 10.0});
                                  }});
                  switch (x.tag)
                  {
                    case "NotFound":
                      var local_89 = x.data;
                      return p(s2);
                    case "Found":
                      var local_90 = x.data;
                      var local_93 = parse({text: toBytes(local_90.pre),parser: p});
                      return {state: local_90.post({}),val: local_93};
                    default:
                      throw "Unhandled case? This is a type error!";
                  }
               };
        };
var sequence = function (s3) {
           return foldLazy({stream1: s3
                           ,initial: function (local_99) {
                              return __return({tag: "Empty",data: {}});
                           }
                           ,binop: function (local_100) {
                              return _3b_({infixl: local_100.item
                                          ,infixr: function (local_101) {
                                             return _3b_({infixl: local_100.rest({})
                                                         ,infixr: function (local_102) {
                                                            return __return(_23_({head: local_101
                                                                                 ,tail: function (local_103) {
                                                                                    return local_102;
                                                                                 }}));
                                                         }});
                                          }});
                           }});
        };
var codeJam = function (local_94) {
           return join({texts: parse({text: input
                                     ,parser: _3b_({infixl: parseLine(parsePosInt)
                                                   ,infixr: function (numCases) {
                                                      return sequence(map({stream1: _2e__2e_({start: 1.0
                                                                                             ,stop: _2b_({infixl: numCases
                                                                                                         ,infixr: 1.0})})
                                                                          ,mapping: function (caseId) {
                                                                             return _3b_({infixl: local_94.solve
                                                                                         ,infixr: function (result) {
                                                                                            return __return(join({texts: _23_({head: rts.bytesFromString("Case #")
                                                                                                                              ,tail: function (local_95) {
                                                                                                                                 return _23_({head: showPosInt(caseId)
                                                                                                                                             ,tail: function (local_96) {
                                                                                                                                                return _23_({head: rts.bytesFromString(": ")
                                                                                                                                                            ,tail: function (local_97) {
                                                                                                                                                               return _23_({head: result
                                                                                                                                                                           ,tail: function (local_98) {
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
                                           ,infixr: function (a) {
                                              return _3b_({infixl: skipASpace
                                                          ,infixr: function (local_22) {
                                                             return _3b_({infixl: parsePosInt
                                                                         ,infixr: function (b) {
                                                                            return _3b_({infixl: skipASpace
                                                                                        ,infixr: function (local_23) {
                                                                                           return _3b_({infixl: parsePosInt
                                                                                                       ,infixr: function (c) {
                                                                                                          return _3b_({infixl: skipASpace
                                                                                                                      ,infixr: function (local_24) {
                                                                                                                         return _3b_({infixl: parsePosInt
                                                                                                                                     ,infixr: function (s1) {
                                                                                                                                        return __return(join({texts: _23_({head: showPosInt(_2a_({infixl: _2a_({infixl: a
                                                                                                                                                                                                               ,infixr: b})
                                                                                                                                                                                                 ,infixr: min({y: c
                                                                                                                                                                                                              ,__x1: s1})}))
                                                                                                                                                                          ,tail: function (local_47) {
                                                                                                                                                                             return concat(map({stream1: _2e__2e_({start: 0.0
                                                                                                                                                                                                                  ,stop: a})
                                                                                                                                                                                               ,mapping: function (local_53) {
                                                                                                                                                                                                  return concat(map({stream1: _2e__2e_({start: 0.0
                                                                                                                                                                                                                                       ,stop: b})
                                                                                                                                                                                                                    ,mapping: function (local_54) {
                                                                                                                                                                                                                       return map({stream1: _2e__2e_({start: 0.0
                                                                                                                                                                                                                                                     ,stop: min({y: c
                                                                                                                                                                                                                                                                ,__x1: s1})})
                                                                                                                                                                                                                                  ,mapping: function (local_55) {
                                                                                                                                                                                                                                     return join({texts: _23_({head: showPosInt(_2b_({infixl: local_53
                                                                                                                                                                                                                                                                                     ,infixr: 1.0}))
                                                                                                                                                                                                                                                              ,tail: function (local_56) {
                                                                                                                                                                                                                                                                 return _23_({head: showPosInt(_2b_({infixl: local_54
                                                                                                                                                                                                                                                                                                    ,infixr: 1.0}))
                                                                                                                                                                                                                                                                             ,tail: function (local_57) {
                                                                                                                                                                                                                                                                                return _23_({head: showPosInt(_2b_({infixl: _25_({infixl: _2b_({infixl: _2b_({infixl: local_53
                                                                                                                                                                                                                                                                                                                                                             ,infixr: local_54})
                                                                                                                                                                                                                                                                                                                                               ,infixr: local_55})
                                                                                                                                                                                                                                                                                                                                 ,infixr: c})
                                                                                                                                                                                                                                                                                                                   ,infixr: 1.0}))
                                                                                                                                                                                                                                                                                            ,tail: function (local_58) {
                                                                                                                                                                                                                                                                                               return {tag: "Empty"
                                                                                                                                                                                                                                                                                                      ,data: {}};
                                                                                                                                                                                                                                                                                            }});
                                                                                                                                                                                                                                                                             }});
                                                                                                                                                                                                                                                              }})
                                                                                                                                                                                                                                                 ,sep: rts.bytesFromString(" ")});
                                                                                                                                                                                                                                  }});
                                                                                                                                                                                                                    }}));
                                                                                                                                                                                               }}));
                                                                                                                                                                          }})
                                                                                                                                                             ,sep: rts.bytesFromString("\n")}));
                                                                                                                                     }});
                                                                                                                      }});
                                                                                                       }});
                                                                                        }});
                                                                         }});
                                                          }});
                                           }}))}));
