"use strict";
var scopeId_0 = 0;
var scopeCounter = 1;
var rts = require("rts.js");
var log = function (exprId,result) { return rts.logResult(scopeId_0,exprId,result);};
var _3d_3d = rts.builtins.Prelude["=="];
var _25 = rts.builtins.Prelude["mod"];
var _2f_2f = rts.builtins.Prelude["div"];
var littleEndianDigits = function (local_4) {
           var x = _3d_3d({infixl: local_4.num,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_5 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: _25({infixl: local_4.num,infixr: local_4.base})
                             ,tail: function (local_6) {
                                return littleEndianDigits({base: local_4.base
                                                          ,num: _2f_2f({infixl: local_4.num
                                                                       ,infixr: local_4.base})});
                             }}};
             case "True":
               var local_7 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var toArray = rts.builtins.Array["fromStream"];
var length = rts.builtins.Array["length"];
var item = rts.builtins.Array["item"];
var _3e_3d = rts.builtins.Prelude[">="];
var _2b = rts.builtins.Prelude["+"];
var _2e_2e1 = function (local_10) {
           var x = _3e_3d({infixl: local_10.start,infixr: local_10.stop});
           switch (x.tag)
           {
             case "False":
               var local_11 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_10.start
                             ,tail: function (local_12) {
                                return _2e_2e1({step: local_10.step
                                               ,start: _2b({infixl: local_10.start
                                                           ,infixr: local_10.step})
                                               ,stop: local_10.stop});
                             }}};
             case "True":
               var local_13 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2e_2e = function (local_9) {
           return _2e_2e1({step: 1.0,start: local_9.start,stop: local_9.stop});
        };
var foldLazy = function (local_17) {
           var x = local_17.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_18 = x.data;
               return local_17.binop({rest: function (local_19) {
                                        var dummy = _3d_3d({infixl: local_19,infixr: {}});
                                        return foldLazy({stream1: local_18.tail({})
                                                        ,initial: local_17.initial
                                                        ,binop: local_17.binop});
                                     }
                                     ,item1: local_18.head});
             case "Empty":
               return local_17.initial(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var map = function (local_14) {
           return foldLazy({stream1: local_14.stream
                           ,initial: function (local_15) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_16) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_14.mapping(local_16.item1)
                                            ,tail: local_16.rest}};
                           }});
        };
var fromArray = function (array) {
           var len = length(array);
           return map({mapping: function (local_8) {
                         return item({index: local_8,object: array});
                      }
                      ,stream: _2e_2e({start: 0.0,stop: len})});
        };
var _7c_7c = function (local_23) {
           var x = local_23.l;
           switch (x.tag)
           {
             case "False":
               return local_23.r(x.data);
             case "True":
               var local_24 = x.data;
               return {tag: "True",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var elem = function (local_20) {
           var x = local_20.stream2;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_21 = x.data;
               return _7c_7c({l: _3d_3d({infixl: local_21.head,infixr: local_20.item2})
                             ,r: function (local_22) {
                                return elem({stream2: local_21.tail({})
                                            ,item2: local_20.item2});
                             }});
             case "Empty":
               var local_25 = x.data;
               return {tag: "False",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var not = function (local_26) {
           var x = local_26;
           switch (x.tag)
           {
             case "False":
               var local_27 = x.data;
               return {tag: "True",data: {}};
             case "True":
               var local_28 = x.data;
               return {tag: "False",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var filter = function (local_29) {
           var x = local_29.stream3;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_30 = x.data;
               var rest1 = function (local_31) {
                          return filter({keep: local_29.keep,stream3: local_30.tail({})});
                       };
               var x = local_29.keep(local_30.head);
               switch (x.tag)
               {
                 case "False":
                   var local_32 = x.data;
                   return rest1({});
                 case "True":
                   var local_33 = x.data;
                   return {tag: "NonEmpty",data: {head: local_30.head,tail: rest1}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_34 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2d = rts.builtins.Prelude["-"];
var reverse = function (src) {
           var arr = toArray(src);
           var len1 = length(arr);
           return map({mapping: function (i) {
                         return item({index: _2d({infixl: _2d({infixl: len1,infixr: 1.0})
                                                 ,infixr: i})
                                     ,object: arr});
                      }
                      ,stream: _2e_2e({start: 0.0,stop: len1})});
        };
var toBytes = rts.builtins.Bytes["fromStream"];
var showPosInt = function (local_37) {
           var x = _3d_3d({infixl: local_37,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_38 = x.data;
               return toBytes(map({mapping: function (local_39) {
                                     return _2b({infixl: local_39,infixr: 48.0});
                                  }
                                  ,stream: reverse(littleEndianDigits({base: 10.0
                                                                      ,num: local_37}))}));
             case "True":
               var local_40 = x.data;
               return rts.bytes([48]);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var id = function (__x) { return __x;};
var __while = function (local_41) {
           var x = local_41.iter(local_41.init);
           switch (x.tag)
           {
             case "Continue":
               var local_42 = x.data;
               return __while({iter: local_41.iter,init: local_42});
             case "Done":
               return id(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _3c = rts.builtins.Prelude["<"];
var _26_26 = function (local_48) {
           var x = local_48.l1;
           switch (x.tag)
           {
             case "False":
               var local_49 = x.data;
               return {tag: "False",data: {}};
             case "True":
               return local_48.r2(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var asciiDigit = function (__x1) {
           var r1 = _2d({infixl: __x1,infixr: 48.0});
           var x = _26_26({l1: _3e_3d({infixl: r1,infixr: 0.0})
                          ,r2: function (local_47) {
                             return _3c({infixl: r1,infixr: 10.0});
                          }});
           switch (x.tag)
           {
             case "False":
               var local_50 = x.data;
               return {tag: "Nothing",data: {}};
             case "True":
               var local_51 = x.data;
               return {tag: "Just",data: r1};
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
               var local_53 = x.data;
               var x = asciiDigit(local_53.head);
               switch (x.tag)
               {
                 case "Just":
                   var local_54 = x.data;
                   return parsePosIntH({remain: local_53.tail({})
                                       ,result: _2b({infixl: _2a({infixl: 10.0
                                                                 ,infixr: state.result})
                                                    ,infixr: local_54})});
                 case "Nothing":
                   var local_55 = x.data;
                   return state;
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_56 = x.data;
               return state;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parsePosInt = function (stream4) {
           var x = stream4;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_46 = x.data;
               var x = asciiDigit(local_46.head);
               switch (x.tag)
               {
                 case "Just":
                   var local_52 = x.data;
                   return parsePosIntH({remain: local_46.tail({}),result: local_52});
                 case "Nothing":
                   var local_57 = x.data;
                   throw "Reached hole!";
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_58 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var length1 = rts.builtins.Bytes["length"];
var byteAt = rts.builtins.Bytes["byteAt"];
var fromBytes = function (bytes) {
           var len2 = length1(bytes);
           return map({mapping: function (local_60) {
                         return byteAt({index: local_60,object: bytes});
                      }
                      ,stream: _2e_2e({start: 0.0,stop: len2})});
        };
var parseOne = function (local_59) {
           var local_61 = local_59.parser(fromBytes(local_59.text));
           var local_63 = function () {
                      var x = local_61.remain;
                      switch (x.tag)
                      {
                        case "NonEmpty":
                          var local_62 = x.data;
                          throw "Reached hole!";
                        case "Empty":
                          return id(x.data);
                        default:
                          throw "Unhandled case? This is a type error!";
                      }
                   }();
           return local_61.result;
        };
var parseOneLine = function (local_64) {
           var x = local_64.stream5;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_65 = x.data;
               return {remain: local_65.tail({}),result: local_64.parser1(local_65.head)};
             case "Empty":
               var local_66 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parseOneLinePosInt = function (local_44) {
           return parseOneLine({stream5: local_44
                               ,parser1: function (local_45) {
                                  return parseOne({text: local_45,parser: parsePosInt});
                               }});
        };
var mapResult = function (local_67) {
           return {remain: local_67.parse.remain
                  ,result: local_67.mapping1(local_67.parse.result)};
        };
var _2b_2b = function (local_83) {
           return foldLazy({stream1: local_83.l2
                           ,initial: local_83.r3
                           ,binop: function (local_84) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_84.item1,tail: local_84.rest}};
                           }});
        };
var concat = function (stream7) {
           return foldLazy({stream1: stream7
                           ,initial: function (local_81) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_82) {
                              return _2b_2b({r3: local_82.rest,l2: local_82.item1});
                           }});
        };
var intersperse = function (local_75) {
           var x = local_75.stream6;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_76 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_76.head
                             ,tail: function (local_77) {
                                return concat(map({mapping: function (local_78) {
                                                     return {tag: "NonEmpty"
                                                            ,data: {head: local_75.item3
                                                                   ,tail: function (local_79) {
                                                                      return {tag: "NonEmpty"
                                                                             ,data: {head: local_78
                                                                                    ,tail: function (local_80) {
                                                                                       return {tag: "Empty"
                                                                                              ,data: {}};
                                                                                    }}};
                                                                   }}};
                                                  }
                                                  ,stream: local_76.tail({})}));
                             }}};
             case "Empty":
               var local_85 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var concat2 = function (stream9) {
           return toBytes(concat(map({mapping: function (local_87) {
                                        return fromBytes(local_87);
                                     }
                                     ,stream: stream9})));
        };
var concat1 = function (stream8) {
           return concat2(map({mapping: function (local_86) {
                                 return local_86;
                              }
                              ,stream: stream8}));
        };
var join = function (local_74) {
           return concat1(intersperse({stream6: local_74.texts,item3: local_74.sep}));
        };
var slice = rts.builtins.Bytes["slice"];
var recursively = function (f) {
           return f(function (local_97) {
                  var dummy1 = _3d_3d({infixl: local_97,infixr: {}});
                  return recursively(f);
               });
        };
var first = function (local_91) {
           var loop = recursively(function (recurse) {
                      return function (local_92) {
                             var x = local_92.str;
                             switch (x.tag)
                             {
                               case "NonEmpty":
                                 var local_93 = x.data;
                                 var x = local_91.that(local_93.head);
                                 switch (x.tag)
                                 {
                                   case "False":
                                     var local_94 = x.data;
                                     return recurse({})({str: local_93.tail({})
                                                        ,index1: _2b({infixl: local_92.index1
                                                                     ,infixr: 1.0})});
                                   case "True":
                                     var local_95 = x.data;
                                     return {tag: "Just",data: local_92.index1};
                                   default:
                                     throw "Unhandled case? This is a type error!";
                                 }
                               case "Empty":
                                 var local_96 = x.data;
                                 return {tag: "Nothing",data: {}};
                               default:
                                 throw "Unhandled case? This is a type error!";
                             }
                          };
                   });
           return loop({str: local_91.stream10,index1: 0.0});
        };
var split = function (local_89) {
           var bytes1 = local_89.text2;
           var sepLen = length1(local_89.seperator);
           var bytesAt = function (i1) {
                      return slice({object: bytes1
                                   ,start: i1
                                   ,stop: _2b({infixl: i1,infixr: sepLen})});
                   };
           var x = first({that: function (local_90) {
                            return _3d_3d({infixl: bytesAt(local_90)
                                          ,infixr: local_89.seperator});
                         }
                         ,stream10: _2e_2e({start: 0.0
                                           ,stop: _2d({infixl: length1(bytes1)
                                                      ,infixr: sepLen})})});
           switch (x.tag)
           {
             case "Just":
               var sepIndex = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: slice({object: bytes1,start: 0.0,stop: sepIndex})
                             ,tail: function (local_98) {
                                return split({text2: slice({object: bytes1
                                                           ,start: _2b({infixl: sepIndex
                                                                       ,infixr: sepLen})
                                                           ,stop: length1(bytes1)})
                                             ,seperator: local_89.seperator});
                             }}};
             case "Nothing":
               var local_99 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_89.text2
                             ,tail: function (local_100) {
                                return {tag: "Empty",data: {}};
                             }}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var lines = function (text1) { return split({text2: text1,seperator: rts.bytes([10])});};
var codeJamParse = function (local_88) {
           var ln0 = function () {
                      var x = lines(local_88.input2);
                      switch (x.tag)
                      {
                        case "NonEmpty":
                          return id(x.data);
                        case "Empty":
                          var local_101 = x.data;
                          throw "Reached hole!";
                        default:
                          throw "Unhandled case? This is a type error!";
                      }
                   }();
           var numCasesParse = parsePosInt(fromBytes(ln0.head));
           var local_102 = function () {
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
           return __while({iter: function (local_103) {
                             var x = _3d_3d({infixl: local_103.numCases,infixr: 0.0});
                             switch (x.tag)
                             {
                               case "False":
                                 var local_104 = x.data;
                                 var local_105 = local_88.caseParse(local_103.remain);
                                 return {tag: "Continue"
                                        ,data: {remain: local_105.remain
                                               ,result: {tag: "NonEmpty"
                                                        ,data: {head: local_105.result
                                                               ,tail: function (local_106) {
                                                                  return local_103.result;
                                                               }}}
                                               ,numCases: _2d({infixl: local_103.numCases
                                                              ,infixr: 1.0})}};
                               case "True":
                                 var local_107 = x.data;
                                 var x = local_103.remain;
                                 switch (x.tag)
                                 {
                                   case "NonEmpty":
                                     var local_108 = x.data;
                                     throw "Reached hole!";
                                   case "Empty":
                                     var local_109 = x.data;
                                     return {tag: "Done",data: reverse(local_103.result)};
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
var iterate = function (local_111) {
           return {head: local_111.initial1
                  ,tail: function (local_112) {
                     return iterate({next: local_111.next
                                    ,initial1: local_111.next(local_111.initial1)});
                  }};
        };
var fromInfStream = function (infStream) {
           return {tag: "NonEmpty"
                  ,data: {head: infStream.head
                         ,tail: function (local_113) {
                            return fromInfStream(infStream.tail({}));
                         }}};
        };
var zipWith = function (local_114) {
           var x = local_114.streamA;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_115 = x.data;
               var x = local_114.streamB;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_116 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_114.combineAB({b: local_116.head
                                                            ,a: local_115.head})
                                 ,tail: function (local_117) {
                                    return zipWith({combineAB: local_114.combineAB
                                                   ,streamB: local_116.tail({})
                                                   ,streamA: local_115.tail({})});
                                 }}};
                 case "Empty":
                   var local_118 = x.data;
                   return {tag: "Empty",data: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_119 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var unlines = function (stream11) {
           return join({texts: stream11
                       ,sep: toBytes({tag: "NonEmpty"
                                     ,data: {head: 10.0
                                            ,tail: function (local_120) {
                                               return {tag: "Empty",data: {}};
                                            }}})});
        };
var codeJam = function (local_68) {
           return unlines(zipWith({combineAB: function (local_69) {
                                     return join({texts: {tag: "NonEmpty"
                                                         ,data: {head: rts.bytes([67
                                                                                 ,97
                                                                                 ,115
                                                                                 ,101
                                                                                 ,32
                                                                                 ,35])
                                                                ,tail: function (local_70) {
                                                                   return {tag: "NonEmpty"
                                                                          ,data: {head: showPosInt(local_69.a)
                                                                                 ,tail: function (local_71) {
                                                                                    return {tag: "NonEmpty"
                                                                                           ,data: {head: rts.bytes([58
                                                                                                                   ,32])
                                                                                                  ,tail: function (local_72) {
                                                                                                     return {tag: "NonEmpty"
                                                                                                            ,data: {head: local_69.b
                                                                                                                   ,tail: function (local_73) {
                                                                                                                      return {tag: "Empty"
                                                                                                                             ,data: {}};
                                                                                                                   }}};
                                                                                                  }}};
                                                                                 }}};
                                                                }}}
                                                 ,sep: rts.bytes([])});
                                  }
                                  ,streamB: codeJamParse({caseParse: local_68.func
                                                         ,input2: local_68.input1})
                                  ,streamA: fromInfStream(iterate({next: function (local_110) {
                                                                     return _2b({infixl: local_110
                                                                                ,infixr: 1.0});
                                                                  }
                                                                  ,initial1: 1.0}))}));
        };
rts.logRepl(codeJam({func: function (local_1) {
                       return mapResult({mapping1: function (input) {
                                           var x = _3d_3d({infixl: input,infixr: 0.0});
                                           switch (x.tag)
                                           {
                                             case "False":
                                               var local_2 = x.data;
                                               return __while({iter: function (local_3) {
                                                                 var numDigs =
                                                                         toArray(littleEndianDigits({base: 10.0
                                                                                                    ,num: local_3.cur}));
                                                                 var newDigits =
                                                                         filter({keep: function (dig) {
                                                                                   return not(elem({stream2: fromArray(numDigs)
                                                                                                   ,item2: dig}));
                                                                                }
                                                                                ,stream3: local_3.digits});
                                                                 var x = newDigits;
                                                                 switch (x.tag)
                                                                 {
                                                                   case "NonEmpty":
                                                                     var local_35 =
                                                                             x.data;
                                                                     return {tag: "Continue"
                                                                            ,data: {digits: newDigits
                                                                                   ,cur: _2b({infixl: local_3.cur
                                                                                             ,infixr: input})}};
                                                                   case "Empty":
                                                                     var local_36 =
                                                                             x.data;
                                                                     return {tag: "Done"
                                                                            ,data: showPosInt(local_3.cur)};
                                                                   default:
                                                                     throw "Unhandled case? This is a type error!";
                                                                 }
                                                              }
                                                              ,init: {digits: _2e_2e({start: 0.0
                                                                                     ,stop: 10.0})
                                                                     ,cur: input}});
                                             case "True":
                                               var local_43 = x.data;
                                               return rts.bytes([73
                                                                ,78
                                                                ,83
                                                                ,79
                                                                ,77
                                                                ,78
                                                                ,73
                                                                ,65]);
                                             default:
                                               throw "Unhandled case? This is a type error!";
                                           }
                                        }
                                        ,parse: parseOneLinePosInt(local_1)});
                    }
                    ,input1: rts.bytes([49
                                       ,48
                                       ,48
                                       ,10
                                       ,48
                                       ,10
                                       ,49
                                       ,10
                                       ,50
                                       ,10
                                       ,49
                                       ,49
                                       ,10
                                       ,49
                                       ,54
                                       ,57
                                       ,50
                                       ,10
                                       ,52
                                       ,48
                                       ,56
                                       ,48
                                       ,48
                                       ,52
                                       ,10
                                       ,51
                                       ,57
                                       ,57
                                       ,50
                                       ,51
                                       ,49
                                       ,10
                                       ,50
                                       ,49
                                       ,49
                                       ,54
                                       ,57
                                       ,53
                                       ,10
                                       ,56
                                       ,49
                                       ,55
                                       ,56
                                       ,55
                                       ,53
                                       ,10
                                       ,57
                                       ,52
                                       ,49
                                       ,56
                                       ,55
                                       ,48
                                       ,10
                                       ,55
                                       ,51
                                       ,53
                                       ,53
                                       ,52
                                       ,48
                                       ,10
                                       ,57
                                       ,10
                                       ,51
                                       ,52
                                       ,49
                                       ,53
                                       ,54
                                       ,51
                                       ,10
                                       ,50
                                       ,54
                                       ,50
                                       ,56
                                       ,51
                                       ,55
                                       ,10
                                       ,50
                                       ,52
                                       ,57
                                       ,49
                                       ,52
                                       ,55
                                       ,10
                                       ,49
                                       ,49
                                       ,55
                                       ,53
                                       ,57
                                       ,10
                                       ,49
                                       ,57
                                       ,55
                                       ,57
                                       ,52
                                       ,48
                                       ,10
                                       ,56
                                       ,52
                                       ,50
                                       ,54
                                       ,55
                                       ,10
                                       ,54
                                       ,50
                                       ,50
                                       ,54
                                       ,56
                                       ,49
                                       ,10
                                       ,49
                                       ,52
                                       ,52
                                       ,51
                                       ,55
                                       ,49
                                       ,10
                                       ,56
                                       ,56
                                       ,57
                                       ,55
                                       ,53
                                       ,54
                                       ,10
                                       ,52
                                       ,48
                                       ,52
                                       ,50
                                       ,53
                                       ,49
                                       ,10
                                       ,53
                                       ,50
                                       ,54
                                       ,57
                                       ,54
                                       ,57
                                       ,10
                                       ,51
                                       ,10
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,54
                                       ,10
                                       ,49
                                       ,54
                                       ,56
                                       ,57
                                       ,53
                                       ,48
                                       ,10
                                       ,49
                                       ,50
                                       ,53
                                       ,48
                                       ,48
                                       ,10
                                       ,49
                                       ,54
                                       ,54
                                       ,10
                                       ,55
                                       ,10
                                       ,51
                                       ,49
                                       ,48
                                       ,57
                                       ,49
                                       ,53
                                       ,10
                                       ,50
                                       ,48
                                       ,10
                                       ,52
                                       ,56
                                       ,50
                                       ,52
                                       ,49
                                       ,50
                                       ,10
                                       ,50
                                       ,48
                                       ,51
                                       ,49
                                       ,51
                                       ,52
                                       ,10
                                       ,52
                                       ,48
                                       ,10
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,49
                                       ,10
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,10
                                       ,50
                                       ,54
                                       ,52
                                       ,52
                                       ,55
                                       ,53
                                       ,10
                                       ,51
                                       ,52
                                       ,10
                                       ,55
                                       ,53
                                       ,56
                                       ,49
                                       ,48
                                       ,48
                                       ,10
                                       ,52
                                       ,49
                                       ,51
                                       ,56
                                       ,56
                                       ,55
                                       ,10
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,52
                                       ,10
                                       ,50
                                       ,56
                                       ,54
                                       ,56
                                       ,55
                                       ,50
                                       ,10
                                       ,49
                                       ,48
                                       ,57
                                       ,52
                                       ,48
                                       ,57
                                       ,10
                                       ,55
                                       ,49
                                       ,53
                                       ,53
                                       ,49
                                       ,52
                                       ,10
                                       ,54
                                       ,53
                                       ,51
                                       ,54
                                       ,54
                                       ,52
                                       ,10
                                       ,57
                                       ,51
                                       ,51
                                       ,54
                                       ,49
                                       ,53
                                       ,10
                                       ,55
                                       ,56
                                       ,54
                                       ,48
                                       ,53
                                       ,55
                                       ,10
                                       ,54
                                       ,52
                                       ,56
                                       ,52
                                       ,54
                                       ,51
                                       ,10
                                       ,49
                                       ,56
                                       ,50
                                       ,56
                                       ,52
                                       ,48
                                       ,10
                                       ,53
                                       ,56
                                       ,55
                                       ,50
                                       ,48
                                       ,55
                                       ,10
                                       ,55
                                       ,51
                                       ,52
                                       ,51
                                       ,56
                                       ,55
                                       ,10
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,50
                                       ,10
                                       ,53
                                       ,57
                                       ,52
                                       ,54
                                       ,49
                                       ,56
                                       ,10
                                       ,49
                                       ,52
                                       ,55
                                       ,50
                                       ,52
                                       ,56
                                       ,10
                                       ,56
                                       ,51
                                       ,52
                                       ,53
                                       ,10
                                       ,52
                                       ,52
                                       ,56
                                       ,50
                                       ,57
                                       ,53
                                       ,10
                                       ,49
                                       ,51
                                       ,54
                                       ,48
                                       ,53
                                       ,10
                                       ,53
                                       ,10
                                       ,56
                                       ,51
                                       ,49
                                       ,55
                                       ,48
                                       ,57
                                       ,10
                                       ,52
                                       ,51
                                       ,50
                                       ,48
                                       ,57
                                       ,49
                                       ,10
                                       ,49
                                       ,50
                                       ,53
                                       ,48
                                       ,48
                                       ,48
                                       ,10
                                       ,50
                                       ,53
                                       ,10
                                       ,54
                                       ,52
                                       ,55
                                       ,53
                                       ,50
                                       ,49
                                       ,10
                                       ,56
                                       ,52
                                       ,53
                                       ,52
                                       ,57
                                       ,56
                                       ,10
                                       ,50
                                       ,48
                                       ,55
                                       ,48
                                       ,55
                                       ,53
                                       ,10
                                       ,49
                                       ,49
                                       ,57
                                       ,52
                                       ,53
                                       ,53
                                       ,10
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,51
                                       ,10
                                       ,49
                                       ,48
                                       ,10
                                       ,50
                                       ,57
                                       ,57
                                       ,49
                                       ,49
                                       ,55
                                       ,10
                                       ,52
                                       ,48
                                       ,55
                                       ,57
                                       ,48
                                       ,57
                                       ,10
                                       ,51
                                       ,56
                                       ,52
                                       ,51
                                       ,52
                                       ,50
                                       ,10
                                       ,53
                                       ,48
                                       ,53
                                       ,56
                                       ,53
                                       ,57
                                       ,10
                                       ,52
                                       ,52
                                       ,55
                                       ,49
                                       ,50
                                       ,10
                                       ,53
                                       ,50
                                       ,51
                                       ,57
                                       ,50
                                       ,53
                                       ,10
                                       ,55
                                       ,49
                                       ,51
                                       ,48
                                       ,50
                                       ,56
                                       ,10
                                       ,49
                                       ,54
                                       ,50
                                       ,53
                                       ,51
                                       ,51
                                       ,10
                                       ,57
                                       ,52
                                       ,48
                                       ,55
                                       ,48
                                       ,57
                                       ,10
                                       ,49
                                       ,50
                                       ,53
                                       ,48
                                       ,10
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,53
                                       ,10
                                       ,50
                                       ,55
                                       ,53
                                       ,49
                                       ,54
                                       ,50
                                       ,10
                                       ,49
                                       ,51
                                       ,49
                                       ,54
                                       ,57
                                       ,49
                                       ,10
                                       ,52
                                       ,52
                                       ,53
                                       ,54
                                       ,56
                                       ,55
                                       ,10
                                       ,54
                                       ,10
                                       ,50
                                       ,51
                                       ,54
                                       ,48
                                       ,48
                                       ,48
                                       ,10
                                       ,51
                                       ,53
                                       ,56
                                       ,48
                                       ,56
                                       ,53
                                       ,10
                                       ,56
                                       ,52
                                       ,49
                                       ,56
                                       ,56
                                       ,56
                                       ,10
                                       ,56
                                       ,48
                                       ,48
                                       ,57
                                       ,56
                                       ,10
                                       ,57
                                       ,48
                                       ,53
                                       ,50
                                       ,49
                                       ,49
                                       ,10
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,55
                                       ,10
                                       ,54
                                       ,51
                                       ,48
                                       ,50
                                       ,52
                                       ,50
                                       ,10
                                       ,56
                                       ,10
                                       ,56
                                       ,48
                                       ,51
                                       ,53
                                       ,57
                                       ,53
                                       ,10
                                       ,52
                                       ,10
                                       ,49
                                       ,48
                                       ,48
                                       ,48
                                       ,48
                                       ,48
                                       ,48
                                       ,10
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,57
                                       ,56
                                       ,10
                                       ,49
                                       ,50
                                       ,53
                                       ,10
                                       ,53
                                       ,56
                                       ,55
                                       ,53
                                       ,48
                                       ,53
                                       ,10
                                       ,50
                                       ,48
                                       ,48
                                       ,10
                                       ,49
                                       ,50
                                       ,52
                                       ,10
                                       ,55
                                       ,50
                                       ,54
                                       ,57
                                       ,57
                                       ,55])}));
