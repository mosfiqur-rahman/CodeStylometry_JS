"use strict";
var scopeId_0 = 0;
var scopeCounter = 1;
var rts = require("rts.js");
var log = function (exprId,result) { return rts.logResult(scopeId_0,exprId,result);};
var _2a = rts.builtins.Prelude["*"];
var _3e = rts.builtins.Prelude[">"];
var _25 = rts.builtins.Prelude["mod"];
var _3d_3d = rts.builtins.Prelude["=="];
var _2b = rts.builtins.Prelude["+"];
var _2f = rts.builtins.Prelude["/"];
var factorsH = function (local_4) {
           var x = _3e({infixl: _2a({infixl: local_4.minDiv,infixr: local_4.minDiv})
                       ,infixr: local_4.number});
           switch (x.tag)
           {
             case "False":
               var local_5 = x.data;
               var x = _3d_3d({infixl: _25({infixl: local_4.number
                                           ,infixr: local_4.minDiv})
                              ,infixr: 0.0});
               switch (x.tag)
               {
                 case "False":
                   var local_6 = x.data;
                   return factorsH({minDiv: _2b({infixl: local_4.minDiv,infixr: 1.0})
                                   ,number: local_4.number});
                 case "True":
                   var local_7 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_4.minDiv
                                 ,tail: function (local_8) {
                                    return factorsH({minDiv: local_4.minDiv
                                                    ,number: _2f({infixl: local_4.number
                                                                 ,infixr: local_4.minDiv})});
                                 }}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "True":
               var local_9 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_4.number
                             ,tail: function (local_10) {
                                return {tag: "Empty",data: {}};
                             }}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var factors = function (local_3) { return factorsH({minDiv: 2.0,number: local_3});};
var _3e_3d = rts.builtins.Prelude[">="];
var _2e_2e1 = function (local_14) {
           var x = _3e_3d({infixl: local_14.start,infixr: local_14.stop});
           switch (x.tag)
           {
             case "False":
               var local_15 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_14.start
                             ,tail: function (local_16) {
                                return _2e_2e1({step: local_14.step
                                               ,start: _2b({infixl: local_14.start
                                                           ,infixr: local_14.step})
                                               ,stop: local_14.stop});
                             }}};
             case "True":
               var local_17 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2e_2e = function (local_13) {
           return _2e_2e1({step: 1.0,start: local_13.start,stop: local_13.stop});
        };
var foldLazy = function (local_21) {
           var x = local_21.stream1;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_22 = x.data;
               return local_21.binop({rest: function (local_23) {
                                        var dummy = _3d_3d({infixl: local_23,infixr: {}});
                                        return foldLazy({stream1: local_22.tail({})
                                                        ,initial: local_21.initial
                                                        ,binop: local_21.binop});
                                     }
                                     ,item: local_22.head});
             case "Empty":
               return local_21.initial(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var map = function (local_18) {
           return foldLazy({stream1: local_18.stream
                           ,initial: function (local_19) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_20) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_18.mapping(local_20.item)
                                            ,tail: local_20.rest}};
                           }});
        };
var negate = rts.builtins.Prelude["negate"];
var repeat = function (item1) {
           return {head: item1,tail: function (local_28) { return repeat(item1);}};
        };
var fromInfStream = function (infStream) {
           return {tag: "NonEmpty"
                  ,data: {head: infStream.head
                         ,tail: function (local_29) {
                            return fromInfStream(infStream.tail({}));
                         }}};
        };
var _2b_2b = function (local_32) {
           return foldLazy({stream1: local_32.l
                           ,initial: local_32.r
                           ,binop: function (local_33) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_33.item,tail: local_33.rest}};
                           }});
        };
var concat = function (stream2) {
           return foldLazy({stream1: stream2
                           ,initial: function (local_30) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_31) {
                              return _2b_2b({r: local_31.rest,l: local_31.item});
                           }});
        };
var zipWith = function (local_34) {
           var x = local_34.streamA;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_35 = x.data;
               var x = local_34.streamB;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_36 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_34.combineAB({b: local_36.head
                                                           ,a: local_35.head})
                                 ,tail: function (local_37) {
                                    return zipWith({combineAB: local_34.combineAB
                                                   ,streamB: local_36.tail({})
                                                   ,streamA: local_35.tail({})});
                                 }}};
                 case "Empty":
                   var local_38 = x.data;
                   return {tag: "Empty",data: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_39 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var fold = function (local_41) {
           var x = local_41.stream4;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_42 = x.data;
               return fold({initial1: local_41.binop1({item2: local_42.head
                                                      ,acc: local_41.initial1})
                           ,binop1: local_41.binop1
                           ,stream4: local_42.tail({})});
             case "Empty":
               var local_43 = x.data;
               return local_41.initial1;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var sum = function (stream3) {
           return fold({initial1: 0.0
                       ,binop1: function (local_40) {
                          return _2b({infixl: local_40.item2,infixr: local_40.acc});
                       }
                       ,stream4: stream3});
        };
var _2d = rts.builtins.Prelude["-"];
var prependToAll = function (local_49) {
           return map({mapping: function (local_50) {
                         return {tag: "NonEmpty"
                                ,data: {head: local_49.digit
                                       ,tail: function (local_51) {
                                          return local_50;
                                       }}};
                      }
                      ,stream: local_49.options});
        };
var iterate = function (local_53) {
           return {head: local_53.initial2
                  ,tail: function (local_54) {
                     return iterate({next: local_53.next
                                    ,initial2: local_53.next(local_53.initial2)});
                  }};
        };
var drop = function (local_55) {
           var x = _3d_3d({infixl: local_55.count1,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_56 = x.data;
               return drop({count1: _2d({infixl: local_55.count1,infixr: 1.0})
                           ,infStream1: local_55.infStream1.tail({})});
             case "True":
               var local_57 = x.data;
               return local_55.infStream1;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var applyNTimes = function (local_52) {
           return drop({count1: local_52.count
                       ,infStream1: iterate({next: local_52.step1
                                            ,initial2: local_52.init})}).head;
        };
var coinJamOptionsSimple = function (local_44) {
           return prependToAll({options: applyNTimes({init: {tag: "NonEmpty"
                                                            ,data: {head: {tag: "NonEmpty"
                                                                          ,data: {head: 1.0
                                                                                 ,tail: function (local_45) {
                                                                                    return {tag: "Empty"
                                                                                           ,data: {}};
                                                                                 }}}
                                                                   ,tail: function (local_46) {
                                                                      return {tag: "Empty"
                                                                             ,data: {}};
                                                                   }}}
                                                     ,count: _2d({infixl: local_44
                                                                 ,infixr: 2.0})
                                                     ,step1: function (local_47) {
                                                        return _2b_2b({r: function (local_48) {
                                                                         return prependToAll({options: local_47
                                                                                             ,digit: 1.0});
                                                                      }
                                                                      ,l: prependToAll({options: local_47
                                                                                       ,digit: 0.0})});
                                                     }})
                               ,digit: 1.0});
        };
var filter = function (local_58) {
           var x = local_58.stream5;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_59 = x.data;
               var rest1 = function (local_60) {
                          return filter({keep: local_58.keep,stream5: local_59.tail({})});
                       };
               var x = local_58.keep(local_59.head);
               switch (x.tag)
               {
                 case "False":
                   var local_61 = x.data;
                   return rest1({});
                 case "True":
                   var local_62 = x.data;
                   return {tag: "NonEmpty",data: {head: local_59.head,tail: rest1}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_63 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _3c_3d = rts.builtins.Prelude["<="];
var take = function (local_64) {
           var x = _3c_3d({infixl: local_64.count2,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_65 = x.data;
               var x = local_64.stream6;
               switch (x.tag)
               {
                 case "NonEmpty":
                   var local_66 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_66.head
                                 ,tail: function (local_67) {
                                    return take({stream6: local_66.tail({})
                                                ,count2: _2d({infixl: local_64.count2
                                                             ,infixr: 1.0})});
                                 }}};
                 case "Empty":
                   var local_68 = x.data;
                   return {tag: "Empty",data: {}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "True":
               var local_69 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var length = rts.builtins.Bytes["length"];
var byteAt = rts.builtins.Bytes["byteAt"];
var fromBytes = function (bytes) {
           var len = length(bytes);
           return map({mapping: function (local_70) {
                         return byteAt({index: local_70,object: bytes});
                      }
                      ,stream: _2e_2e({start: 0.0,stop: len})});
        };
var _3c = rts.builtins.Prelude["<"];
var _26_26 = function (local_73) {
           var x = local_73.l1;
           switch (x.tag)
           {
             case "False":
               var local_74 = x.data;
               return {tag: "False",data: {}};
             case "True":
               return local_73.r2(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var asciiDigit = function (__x) {
           var r1 = _2d({infixl: __x,infixr: 48.0});
           var x = _26_26({l1: _3e_3d({infixl: r1,infixr: 0.0})
                          ,r2: function (local_72) {
                             return _3c({infixl: r1,infixr: 10.0});
                          }});
           switch (x.tag)
           {
             case "False":
               var local_75 = x.data;
               return {tag: "Nothing",data: {}};
             case "True":
               var local_76 = x.data;
               return {tag: "Just",data: r1};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parsePosIntH = function (state) {
           var x = state.remain;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_78 = x.data;
               var x = asciiDigit(local_78.head);
               switch (x.tag)
               {
                 case "Just":
                   var local_79 = x.data;
                   return parsePosIntH({remain: local_78.tail({})
                                       ,result: _2b({infixl: _2a({infixl: 10.0
                                                                 ,infixr: state.result})
                                                    ,infixr: local_79})});
                 case "Nothing":
                   var local_80 = x.data;
                   return state;
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_81 = x.data;
               return state;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parsePosInt = function (stream7) {
           var x = stream7;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_71 = x.data;
               var x = asciiDigit(local_71.head);
               switch (x.tag)
               {
                 case "Just":
                   var local_77 = x.data;
                   return parsePosIntH({remain: local_71.tail({}),result: local_77});
                 case "Nothing":
                   var local_82 = x.data;
                   throw "Reached hole!";
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_83 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var drop1 = function (local_85) {
           var x = local_85.stream9;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_86 = x.data;
               var x = local_85.__while(local_86.head);
               switch (x.tag)
               {
                 case "False":
                   var local_87 = x.data;
                   return {tag: "NonEmpty"
                          ,data: {head: local_86.head
                                 ,tail: function (local_88) {
                                    return local_86.tail({});
                                 }}};
                 case "True":
                   var local_89 = x.data;
                   return drop1({__while: local_85.__while,stream9: local_86.tail({})});
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_90 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var dropSpaces = function (stream8) {
           return drop1({__while: function (local_84) {
                           return _3d_3d({infixl: local_84,infixr: 32.0});
                        }
                        ,stream9: stream8});
        };
var toBytes = rts.builtins.Bytes["fromStream"];
var _2f_2f = rts.builtins.Prelude["div"];
var littleEndianDigits = function (local_99) {
           var x = _3d_3d({infixl: local_99.num,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_100 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: _25({infixl: local_99.num,infixr: local_99.base})
                             ,tail: function (local_101) {
                                return littleEndianDigits({base: local_99.base
                                                          ,num: _2f_2f({infixl: local_99.num
                                                                       ,infixr: local_99.base})});
                             }}};
             case "True":
               var local_102 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var toArray = rts.builtins.Array["fromStream"];
var length1 = rts.builtins.Array["length"];
var item3 = rts.builtins.Array["item"];
var reverse = function (src) {
           var arr = toArray(src);
           var len1 = length1(arr);
           return map({mapping: function (i) {
                         return item3({index: _2d({infixl: _2d({infixl: len1,infixr: 1.0})
                                                  ,infixr: i})
                                      ,object: arr});
                      }
                      ,stream: _2e_2e({start: 0.0,stop: len1})});
        };
var showPosInt = function (local_96) {
           var x = _3d_3d({infixl: local_96,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_97 = x.data;
               return toBytes(map({mapping: function (local_98) {
                                     return _2b({infixl: local_98,infixr: 48.0});
                                  }
                                  ,stream: reverse(littleEndianDigits({base: 10.0
                                                                      ,num: local_96}))}));
             case "True":
               var local_103 = x.data;
               return rts.bytesFromString("0");
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var intersperse = function (local_105) {
           var x = local_105.stream10;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_106 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_106.head
                             ,tail: function (local_107) {
                                return concat(map({mapping: function (local_108) {
                                                     return {tag: "NonEmpty"
                                                            ,data: {head: local_105.item4
                                                                   ,tail: function (local_109) {
                                                                      return {tag: "NonEmpty"
                                                                             ,data: {head: local_108
                                                                                    ,tail: function (local_110) {
                                                                                       return {tag: "Empty"
                                                                                              ,data: {}};
                                                                                    }}};
                                                                   }}};
                                                  }
                                                  ,stream: local_106.tail({})}));
                             }}};
             case "Empty":
               var local_111 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var concat2 = function (stream12) {
           return toBytes(concat(map({mapping: function (local_113) {
                                        return fromBytes(local_113);
                                     }
                                     ,stream: stream12})));
        };
var concat1 = function (stream11) {
           return concat2(map({mapping: function (local_112) {
                                 return local_112;
                              }
                              ,stream: stream11}));
        };
var join = function (local_104) {
           return concat1(intersperse({stream10: local_104.texts,item4: local_104.sep}));
        };
var unwords = function (words) {
           return join({texts: words,sep: rts.bytesFromString(" ")});
        };
var unlines = function (stream13) {
           return join({texts: stream13
                       ,sep: toBytes({tag: "NonEmpty"
                                     ,data: {head: 10.0
                                            ,tail: function (local_114) {
                                               return {tag: "Empty",data: {}};
                                            }}})});
        };
var coinJamFormatResults = function (local_91) {
           return unlines({tag: "NonEmpty"
                          ,data: {head: rts.bytesFromString("")
                                 ,tail: function (local_92) {
                                    return map({mapping: function (local_93) {
                                                  return unwords({tag: "NonEmpty"
                                                                 ,data: {head: toBytes(map({mapping: function (local_94) {
                                                                                              return _2b({infixl: 48.0
                                                                                                         ,infixr: local_94});
                                                                                           }
                                                                                           ,stream: local_93.digits}))
                                                                        ,tail: function (local_95) {
                                                                           return map({mapping: showPosInt
                                                                                      ,stream: local_93.divs});
                                                                        }}});
                                               }
                                               ,stream: local_91});
                                 }}});
        };
var parseOneLine = function (local_115) {
           var x = local_115.stream14;
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
var input = rts.bytesFromString("1\n16 50");
var slice = rts.builtins.Bytes["slice"];
var recursively = function (f1) {
           return f1(function (local_133) {
                  var dummy1 = _3d_3d({infixl: local_133,infixr: {}});
                  return recursively(f1);
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
           return loop({str: local_127.stream15,index1: 0.0});
        };
var split = function (local_125) {
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
                         ,stream15: _2e_2e({start: 0.0
                                           ,stop: _2d({infixl: length(bytes1)
                                                      ,infixr: sepLen})})});
           switch (x.tag)
           {
             case "Just":
               var sepIndex = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: slice({object: bytes1,start: 0.0,stop: sepIndex})
                             ,tail: function (local_134) {
                                return split({text1: slice({object: bytes1
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
           return split({text1: text,seperator: rts.bytesFromString("\n")});
        };
var id = function (__x1) { return __x1;};
var __while1 = function (local_146) {
           var x = local_146.iter(local_146.init1);
           switch (x.tag)
           {
             case "Continue":
               var local_147 = x.data;
               return __while1({iter: local_146.iter,init1: local_147});
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
                           ,init1: {remain: ln0.tail({})
                                   ,result: {tag: "Empty",data: {}}
                                   ,numCases: numCasesParse.result}});
        };
var codeJam = function (local_118) {
           return unlines(zipWith({combineAB: function (local_119) {
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
                                  ,streamB: codeJamParse({caseParse: local_118.func
                                                         ,input2: local_118.input1})
                                  ,streamA: fromInfStream(iterate({next: function (local_148) {
                                                                     return _2b({infixl: local_148
                                                                                ,infixr: 1.0});
                                                                  }
                                                                  ,initial2: 1.0}))}));
        };
rts.logRepl(codeJam({func: function (local_1) {
                       var fixedDivs = map({mapping: function (local_2) {
                                              var x = factors(local_2);
                                              switch (x.tag)
                                              {
                                                case "NonEmpty":
                                                  var local_11 = x.data;
                                                  return local_11.head;
                                                case "Empty":
                                                  var local_12 = x.data;
                                                  throw "Reached hole!";
                                                default:
                                                  throw "Unhandled case? This is a type error!";
                                              }
                                           }
                                           ,stream: _2e_2e({start: 3.0,stop: 12.0})});
                       return parseOneLine({stream14: local_1
                                           ,parser: function (line) {
                                              var f = function (local_24) {
                                                         return map({mapping: function (digs) {
                                                                       return {divs: fixedDivs
                                                                              ,digits: digs};
                                                                    }
                                                                    ,stream: take({stream6: filter({keep: function (opt) {
                                                                                                      return _3d_3d({infixl: sum(zipWith({combineAB: function (local_25) {
                                                                                                                                            return _2a({infixl: local_25.a
                                                                                                                                                       ,infixr: local_25.b});
                                                                                                                                         }
                                                                                                                                         ,streamB: opt
                                                                                                                                         ,streamA: concat(fromInfStream(repeat({tag: "NonEmpty"
                                                                                                                                                                               ,data: {head: 1.0
                                                                                                                                                                                      ,tail: function (local_26) {
                                                                                                                                                                                         return {tag: "NonEmpty"
                                                                                                                                                                                                ,data: {head: negate(1.0)
                                                                                                                                                                                                       ,tail: function (local_27) {
                                                                                                                                                                                                          return {tag: "Empty"
                                                                                                                                                                                                                 ,data: {}};
                                                                                                                                                                                                       }}};
                                                                                                                                                                                      }}})))}))
                                                                                                                    ,infixr: 0.0});
                                                                                                   }
                                                                                                   ,stream5: coinJamOptionsSimple(local_24.n)})
                                                                                  ,count2: local_24.j})});
                                                      };
                                              var nP = parsePosInt(fromBytes(line));
                                              return coinJamFormatResults(f({n: nP.result
                                                                            ,j: parsePosInt(dropSpaces(nP.remain)).result}));
                                           }});
                    }
                    ,input1: input}));
