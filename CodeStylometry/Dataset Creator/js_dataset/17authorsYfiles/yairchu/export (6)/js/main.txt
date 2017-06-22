"use strict";
var scopeId_0 = 0;
var scopeCounter = 1;
var rts = require("rts.js");
var log = function (exprId,result) { return rts.logResult(scopeId_0,exprId,result);};
var input =
        rts.bytesFromString("100\nOZONETOWER\nWEIGHFOXTOURIST\nOURNEONFOE\nETHER\nNEWEOSTNTOEEOOOENVWN\nNEOVTESVWENSEIFEV\nGEHFTEVIEHRTEI\nTWO\nVIFNROEEEENXOUVSSSNE\nTWOWOTWTOWTOOOTWTW\nFROU\nOZERREZO\nNENINVEOSENEESENV\nIVFE\nOTOWWONETWTTOWOTOW\nESFNEEOINNVNEIVE\nIXSENNOXISOE\nENNIENVNOENESEO\nEOEOWENOOEVTNITFVWIF\nINVFEEXESVINENIS\nEGIHT\nXIIGTHSIXVEISFREUFO\nNENOEEENIXOISZRRETH\nEHTNEUROTFEIGHROE\nOOEXINEENSNNI\nNEONRNIOUFE\nUOERNWHITEGTNIFO\nTEIHG\nEOENSIEVEVNF\nOOOEOENNNOOTENNEEW\nSIHEEGIFTENTVEOVW\nISX\nIEHEENETNIRGETHNIN\nNENENNONEEEONNOII\nERUXIONVESSF\nTEEOTNOOWWOENTNWOO\nUONNRIFE\nHNIROEUTOFEG\nTNNUOEESEWOOFVR\nISFIVXE\nTOXIUSFIHREG\nHEERT\nREWNIFTONOU\nTNOXEIRHSEE\nXIIVFSE\nNOWTONEENOOOOWTEEN\nOUNEIFRN\nOEN\nTTWWITEHROEEOFV\nEEVNSENNOENESEVO\nVEOIFTETUHWIOGRF\nFERFFIUVUROO\nEINVSEESVSENX\nUNFIRNONSEEEV\nXZOISWEEEOTOORZRN\nGWNEHSRTTIIXTONEEIHE\nNEEEEOONNOIONNEN\nWNTWOTTEOOONOEWTWO\nTTIGEREEHH\nNNRFEEENZIOROUO\nINNNNEINNNENIINEENEI\nONOSNXIEE\nOENZOER\nRHETE\nINOIZNEVESERNEFNVOEE\nEEENRHEEONNETOWSINTV\nZREO\nEIETONHG\nOEEOEHHGNIENTTIG\nGTIIHNEEN\nEOZR\nFNSINNVOOEEEERUN\nNIINENEONNE\nIVENINXISEF\nNONONENEEOEOENO\nEON\nNNEEINNONEIINENNEIN\nOENEEOERTORTHWZ\nIEEHREFEVOINVTFE\nTERNETOEWHEVS\nXIVUIFTWSORFEOISX\nTORXSIFOUW\nIISNSXINXEIXS\nHTEIOUGRF\nEOORZZEZREOEOROZENR\nINEN\nNNNONNOIIEEENENNIE\nIENN\nEUNSFXOFIVESERVI\nNEENEOVONSETWIN\nNNNNNEOEEEOEOONEOO\nRRZOEEOZ\nTEIHFRVEE\nRRFUFOUO\nHTZEOERER\nEESNVIEENNNINEON\nOXOXFESESFIRUIVIRZ\nNNONIOWETE\nORERREZOROOEEZZOERZZ\nNNHEIUINRETRNOEEF\n");
var length = rts.builtins.Bytes["length"];
var _2b_ = rts.builtins.Prelude["+"];
var slice = rts.builtins.Bytes["slice"];
var _3d__3d_ = rts.builtins.Prelude["=="];
var _2d_ = rts.builtins.Prelude["-"];
var _3e__3d_ = rts.builtins.Prelude[">="];
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
var recursively = function (f) {
           return f(function (local_14) {
                  var dummy = _3d__3d_({infixl: local_14,infixr: {}});
                  return recursively(f);
               });
        };
var first = function (local_8) {
           var loop = recursively(function (recurse) {
                      return function (local_9) {
                             var x = local_9.str;
                             switch (x.tag)
                             {
                               case "NonEmpty":
                                 var local_10 = x.data;
                                 var x = local_8.that(local_10.head);
                                 switch (x.tag)
                                 {
                                   case "False":
                                     var local_11 = x.data;
                                     return recurse({})({str: local_10.tail({})
                                                        ,index: _2b_({infixl: local_9.index
                                                                     ,infixr: 1.0})});
                                   case "True":
                                     var local_12 = x.data;
                                     return {tag: "Just",data: local_9.index};
                                   default:
                                     throw "Unhandled case? This is a type error!";
                                 }
                               case "Empty":
                                 var local_13 = x.data;
                                 return {tag: "Nothing",data: {}};
                               default:
                                 throw "Unhandled case? This is a type error!";
                             }
                          };
                   });
           return loop({str: local_8.stream,index: 0.0});
        };
var split = function (local_1) {
           var bytes = local_1.text;
           var sepLen = length(local_1.seperator);
           var bytesAt = function (i) {
                      return slice({object: bytes
                                   ,start: i
                                   ,stop: _2b_({infixl: i,infixr: sepLen})});
                   };
           var x = first({that: function (local_2) {
                            return _3d__3d_({infixl: bytesAt(local_2)
                                            ,infixr: local_1.seperator});
                         }
                         ,stream: _2e__2e_({start: 0.0
                                           ,stop: _2d_({infixl: length(bytes)
                                                       ,infixr: sepLen})})});
           switch (x.tag)
           {
             case "Just":
               var sepIndex = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: slice({object: bytes,start: 0.0,stop: sepIndex})
                             ,tail: function (local_15) {
                                return split({text: slice({object: bytes
                                                          ,start: _2b_({infixl: sepIndex
                                                                       ,infixr: sepLen})
                                                          ,stop: length(bytes)})
                                             ,seperator: local_1.seperator});
                             }}};
             case "Nothing":
               var local_16 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_1.text
                             ,tail: function (local_17) {
                                return {tag: "Empty",data: {}};
                             }}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var toArray = rts.builtins.Array["fromStream"];
var _3a_ = function (local_28) {
           return {tag: "NonEmpty",data: {head: local_28.head,tail: local_28.tail}};
        };
var _3c__3d_ = rts.builtins.Prelude["<="];
var replicate = function (local_30) {
           var x = _3c__3d_({infixl: local_30.count,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_31 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_30.item
                             ,tail: function (local_32) {
                                return replicate({count: _2d_({infixl: local_30.count
                                                              ,infixr: 1.0})
                                                 ,item: local_30.item});
                             }}};
             case "True":
               var local_33 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var newMutArray = rts.builtins.Mut.Array["fromStream"];
var readMutArray = rts.builtins.Mut.Array["read"];
var writeMutArray = rts.builtins.Mut.Array["write"];
var _3b_ = rts.builtins.Mut["bind"];
var foldLazy = function (local_39) {
           var x = local_39.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_40 = x.data;
               return local_39.binop({rest: function (local_41) {
                                        var dummy1 = _3d__3d_({infixl: local_41
                                                              ,infixr: {}});
                                        return foldLazy({stream: local_40.tail({})
                                                        ,initial: local_39.initial
                                                        ,binop: local_39.binop});
                                     }
                                     ,item: local_40.head});
             case "Empty":
               return local_39.initial(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var map = function (local_36) {
           return foldLazy({stream: local_36.stream
                           ,initial: function (local_37) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_38) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_36.mapping(local_38.item)
                                            ,tail: local_38.rest}};
                           }});
        };
var __return = rts.builtins.Mut["return"];
var _3e__3e_ = function (local_44) {
           return _3b_({infixl: local_44.__x
                       ,infixr: function (local_45) {
                          return local_44.y;
                       }});
        };
var sequence__ = function (stream2) {
           return foldLazy({stream: stream2
                           ,initial: function (local_42) {
                              return __return({});
                           }
                           ,binop: function (local_43) {
                              return _3e__3e_({y: local_43.rest({}),__x: local_43.item});
                           }});
        };
var traverse__ = function (local_35) {
           return sequence__(map({stream: local_35.stream,mapping: local_35.action}));
        };
var runMutArray = rts.builtins.Mut.Array["run"];
var histogram = function (local_29) {
           return runMutArray(_3b_({infixl: newMutArray(replicate({count: local_29.size
                                                                  ,item: 0.0}))
                                   ,infixr: function (arr) {
                                      return _3b_({infixl: traverse__({stream: local_29.stream1
                                                                      ,action: function (i1) {
                                                                         return _3b_({infixl: readMutArray({index: i1
                                                                                                           ,object: arr})
                                                                                     ,infixr: function (local_34) {
                                                                                        return writeMutArray({index: i1
                                                                                                             ,object: arr
                                                                                                             ,val: _2b_({infixl: local_34
                                                                                                                        ,infixr: 1.0})});
                                                                                     }});
                                                                      }})
                                                  ,infixr: function (local_46) {
                                                     return __return(arr);
                                                  }});
                                   }}));
        };
var length1 = rts.builtins.Array["length"];
var item1 = rts.builtins.Array["item"];
var fromArray = function (array) {
           var len = length1(array);
           return map({stream: _2e__2e_({start: 0.0,stop: len})
                      ,mapping: function (local_47) {
                         return item1({index: local_47,object: array});
                      }});
        };
var byteAt = rts.builtins.Bytes["byteAt"];
var ord = function (txt) { return byteAt({index: 0.0,object: txt});};
var fromBytes = function (bytes1) {
           var len1 = length(bytes1);
           return map({stream: _2e__2e_({start: 0.0,stop: len1})
                      ,mapping: function (local_50) {
                         return byteAt({index: local_50,object: bytes1});
                      }});
        };
var sequence = function (stream3) {
           return foldLazy({stream: stream3
                           ,initial: function (local_54) {
                              return __return({tag: "Empty",data: {}});
                           }
                           ,binop: function (local_55) {
                              return _3b_({infixl: local_55.item
                                          ,infixr: function (local_56) {
                                             return _3b_({infixl: local_55.rest({})
                                                         ,infixr: function (local_57) {
                                                            return __return({tag: "NonEmpty"
                                                                            ,data: {head: local_56
                                                                                   ,tail: function (local_58) {
                                                                                      return local_57;
                                                                                   }}});
                                                         }});
                                          }});
                           }});
        };
var traverse = function (local_53) {
           return sequence(map({stream: local_53.stream,mapping: local_53.mapping}));
        };
var runMut = rts.builtins.Mut["run"];
var _2b__2b_ = function (local_61) {
           return foldLazy({stream: local_61.l1
                           ,initial: local_61.r
                           ,binop: function (local_62) {
                              return {tag: "NonEmpty"
                                     ,data: {head: local_62.item,tail: local_62.rest}};
                           }});
        };
var concat = function (stream4) {
           return foldLazy({stream: stream4
                           ,initial: function (local_59) {
                              return {tag: "Empty",data: {}};
                           }
                           ,binop: function (local_60) {
                              return _2b__2b_({l1: local_60.item,r: local_60.rest});
                           }});
        };
var intersperse = function (local_66) {
           var x = local_66.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_67 = x.data;
               return {tag: "NonEmpty"
                      ,data: {head: local_67.head
                             ,tail: function (local_68) {
                                return concat(map({stream: local_67.tail({})
                                                  ,mapping: function (local_69) {
                                                     return {tag: "NonEmpty"
                                                            ,data: {head: local_66.item
                                                                   ,tail: function (local_70) {
                                                                      return {tag: "NonEmpty"
                                                                             ,data: {head: local_69
                                                                                    ,tail: function (local_71) {
                                                                                       return {tag: "Empty"
                                                                                              ,data: {}};
                                                                                    }}};
                                                                   }}};
                                                  }}));
                             }}};
             case "Empty":
               var local_72 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var toBytes = rts.builtins.Bytes["fromStream"];
var concat2 = function (stream6) {
           return toBytes(concat(map({stream: stream6
                                     ,mapping: function (local_74) {
                                        return fromBytes(local_74);
                                     }})));
        };
var concat1 = function (stream5) {
           return concat2(map({stream: stream5
                              ,mapping: function (local_73) {
                                 return local_73;
                              }}));
        };
var join = function (local_65) {
           return concat1(intersperse({stream: local_65.texts,item: local_65.sep}));
        };
var id = function (__x1) { return __x1;};
var _3c_ = rts.builtins.Prelude["<"];
var partition = function (local_79) {
           return foldLazy({stream: local_79.stream
                           ,initial: function (local_80) {
                              return {False: {tag: "Empty",data: {}}
                                     ,True: {tag: "Empty",data: {}}};
                           }
                           ,binop: function (local_81) {
                              var r1 = local_81.rest({});
                              var x = local_79.by(local_81.item);
                              switch (x.tag)
                              {
                                case "False":
                                  var local_82 = x.data;
                                  return {False: _3a_({head: local_81.item
                                                      ,tail: function (local_83) {
                                                         return r1.False;
                                                      }})
                                         ,True: r1.True};
                                case "True":
                                  var local_84 = x.data;
                                  return {False: r1.False
                                         ,True: _3a_({head: local_81.item
                                                     ,tail: function (local_85) {
                                                        return r1.True;
                                                     }})};
                                default:
                                  throw "Unhandled case? This is a type error!";
                              }
                           }});
        };
var sort = function (local_76) {
           var x = local_76.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_77 = x.data;
               var cur = local_76.on(local_77.head);
               var parts = partition({stream: local_77.tail({})
                                     ,by: function (local_78) {
                                        return _3c_({infixl: local_76.on(local_78)
                                                    ,infixr: cur});
                                     }});
               return _2b__2b_({l1: sort({stream: parts.True,on: local_76.on})
                               ,r: function (local_86) {
                                  return _3a_({head: local_77.head
                                              ,tail: function (local_87) {
                                                 return sort({stream: parts.False
                                                             ,on: local_76.on});
                                              }});
                               }});
             case "Empty":
               var local_88 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var solveDigits = function (line1) {
           var names =
                   toArray(split({text: rts.bytesFromString("ZERO ONE TWO THREE FOUR FIVE SIX SEVEN EIGHT NINE")
                                 ,seperator: rts.bytesFromString(" ")}));
           var order = _3a_({head: {digit: 0.0,letter: rts.bytesFromString("Z")}
                            ,tail: function (local_18) {
                               return _3a_({head: {digit: 2.0
                                                  ,letter: rts.bytesFromString("W")}
                                           ,tail: function (local_19) {
                                              return _3a_({head: {digit: 4.0
                                                                 ,letter: rts.bytesFromString("U")}
                                                          ,tail: function (local_20) {
                                                             return _3a_({head: {digit: 1.0
                                                                                ,letter: rts.bytesFromString("O")}
                                                                         ,tail: function (local_21) {
                                                                            return _3a_({head: {digit: 6.0
                                                                                               ,letter: rts.bytesFromString("X")}
                                                                                        ,tail: function (local_22) {
                                                                                           return _3a_({head: {digit: 7.0
                                                                                                              ,letter: rts.bytesFromString("S")}
                                                                                                       ,tail: function (local_23) {
                                                                                                          return _3a_({head: {digit: 3.0
                                                                                                                             ,letter: rts.bytesFromString("R")}
                                                                                                                      ,tail: function (local_24) {
                                                                                                                         return _3a_({head: {digit: 5.0
                                                                                                                                            ,letter: rts.bytesFromString("V")}
                                                                                                                                     ,tail: function (local_25) {
                                                                                                                                        return _3a_({head: {digit: 8.0
                                                                                                                                                           ,letter: rts.bytesFromString("G")}
                                                                                                                                                    ,tail: function (local_26) {
                                                                                                                                                       return _3a_({head: {digit: 9.0
                                                                                                                                                                          ,letter: rts.bytesFromString("I")}
                                                                                                                                                                   ,tail: function (local_27) {
                                                                                                                                                                      return {tag: "Empty"
                                                                                                                                                                             ,data: {}};
                                                                                                                                                                   }});
                                                                                                                                                    }});
                                                                                                                                     }});
                                                                                                                      }});
                                                                                                       }});
                                                                                        }});
                                                                         }});
                                                          }});
                                           }});
                            }});
           var result =
                   concat(runMut(_3b_({infixl: newMutArray(fromArray(histogram({stream1: line1
                                                                               ,size: 256.0})))
                                      ,infixr: function (hist) {
                                         return traverse({stream: order
                                                         ,mapping: function (local_48) {
                                                            return _3b_({infixl: readMutArray({index: ord(local_48.letter)
                                                                                              ,object: hist})
                                                                        ,infixr: function (local_49) {
                                                                           return _3b_({infixl: traverse__({stream: fromBytes(item1({index: local_48.digit
                                                                                                                                    ,object: names}))
                                                                                                           ,action: function (l) {
                                                                                                              return _3b_({infixl: readMutArray({index: l
                                                                                                                                                ,object: hist})
                                                                                                                          ,infixr: function (local_51) {
                                                                                                                             return writeMutArray({index: l
                                                                                                                                                  ,object: hist
                                                                                                                                                  ,val: _2d_({infixl: local_51
                                                                                                                                                             ,infixr: local_49})});
                                                                                                                          }});
                                                                                                           }})
                                                                                       ,infixr: function (local_52) {
                                                                                          return __return(replicate({count: local_49
                                                                                                                    ,item: local_48.digit}));
                                                                                       }});
                                                                        }});
                                                         }});
                                      }})));
           var check = function (local_63) {
                      var x =
                              _3d__3d_({infixl: histogram({stream1: fromBytes(join({texts: map({stream: result
                                                                                               ,mapping: function (local_64) {
                                                                                                  return item1({index: local_64
                                                                                                               ,object: names});
                                                                                               }})
                                                                                   ,sep: rts.bytesFromString("")}))
                                                          ,size: 256.0})
                                       ,infixr: histogram({stream1: line1,size: 256.0})});
                      switch (x.tag)
                      {
                        case "False":
                          var local_75 = x.data;
                          throw "Reached hole!";
                        case "True":
                          return id(x.data);
                        default:
                          throw "Unhandled case? This is a type error!";
                      }
                   };
           return toBytes(map({stream: sort({stream: result,on: id})
                              ,mapping: function (local_89) {
                                 return _2b_({infixl: local_89,infixr: 48.0});
                              }}));
        };
var __break = function (local_91) {
           var x = local_91.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_92 = x.data;
               var x = local_91.where(local_92.head);
               switch (x.tag)
               {
                 case "False":
                   var local_93 = x.data;
                   var local_94 = __break({stream: local_92.tail({})
                                          ,where: local_91.where});
                   var x = local_94;
                   switch (x.tag)
                   {
                     case "NotFound":
                       var local_95 = x.data;
                       return {tag: "NotFound",data: {}};
                     case "Found":
                       var local_96 = x.data;
                       return {tag: "Found"
                              ,data: {pre: _3a_({head: local_92.head
                                                ,tail: function (local_97) {
                                                   return local_96.pre;
                                                }})
                                     ,post: local_96.post
                                     ,item: local_96.item}};
                     default:
                       throw "Unhandled case? This is a type error!";
                   }
                 case "True":
                   var local_98 = x.data;
                   return {tag: "Found"
                          ,data: {pre: {tag: "Empty",data: {}}
                                 ,post: local_92.tail
                                 ,item: local_92.head}};
                 default:
                   throw "Unhandled case? This is a type error!";
               }
             case "Empty":
               var local_99 = x.data;
               return {tag: "NotFound",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var parse = function (local_102) {
           var res = local_102.parser(fromBytes(local_102.text));
           var check1 = function () {
                      var x = res.state;
                      switch (x.tag)
                      {
                        case "NonEmpty":
                          var local_103 = x.data;
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
           return function (s) {
                  var x = __break({stream: s
                                  ,where: function (local_90) {
                                     return _3d__3d_({infixl: local_90,infixr: 10.0});
                                  }});
                  switch (x.tag)
                  {
                    case "NotFound":
                      var local_100 = x.data;
                      return p(s);
                    case "Found":
                      var local_101 = x.data;
                      var local_104 = parse({text: toBytes(local_101.pre),parser: p});
                      return {state: local_101.post({}),val: local_104};
                    default:
                      throw "Unhandled case? This is a type error!";
                  }
               };
        };
var _26__26_ = function (local_108) {
           var x = local_108.l1;
           switch (x.tag)
           {
             case "False":
               var local_109 = x.data;
               return {tag: "False",data: {}};
             case "True":
               return local_108.r(x.data);
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _2a_ = rts.builtins.Prelude["*"];
var __while = function (local_116) {
           var x = local_116.iter(local_116.init);
           switch (x.tag)
           {
             case "Continue":
               var local_117 = x.data;
               return __while({iter: local_116.iter,init: local_117});
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
               var toDigit = function (local_106) {
                          var r2 = _2d_({infixl: local_106,infixr: 48.0});
                          var x = _26__26_({l1: _3e__3d_({infixl: r2,infixr: 0.0})
                                           ,r: function (local_107) {
                                              return _3c__3d_({infixl: r2,infixr: 9.0});
                                           }});
                          switch (x.tag)
                          {
                            case "False":
                              var local_110 = x.data;
                              return {tag: "Nothing",data: {}};
                            case "True":
                              var local_111 = x.data;
                              return {tag: "Just",data: r2};
                            default:
                              throw "Unhandled case? This is a type error!";
                          }
                       };
               var local_118 = __while({iter: function (local_112) {
                                          var fin = function (local_113) {
                                                     return {tag: "Done"
                                                            ,data: {state: local_112.state
                                                                   ,val: local_112.val}};
                                                  };
                                          var x = local_112.state;
                                          switch (x.tag)
                                          {
                                            case "NonEmpty":
                                              var local_114 = x.data;
                                              var x = toDigit(local_114.head);
                                              switch (x.tag)
                                              {
                                                case "Just":
                                                  var d = x.data;
                                                  return {tag: "Continue"
                                                         ,data: {state: local_114.tail({})
                                                                ,val: _2b_({infixl: _2a_({infixl: 10.0
                                                                                         ,infixr: local_112.val})
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
                                       ,init: {state: first1.tail({})
                                              ,val: function () {
                                                 var x = toDigit(first1.head);
                                                 switch (x.tag)
                                                 {
                                                   case "Just":
                                                     return id(x.data);
                                                   case "Nothing":
                                                     var local_115 = x.data;
                                                     throw "Reached hole!";
                                                   default:
                                                     throw "Unhandled case? This is a type error!";
                                                 }
                                              }()}});
               return local_118;
             case "Empty":
               var local_119 = x.data;
               throw "Reached hole!";
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var _25_ = rts.builtins.Prelude["mod"];
var _2f__2f_ = rts.builtins.Prelude["div"];
var littleEndian = function (local_122) {
           var x = _3d__3d_({infixl: local_122.number,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_123 = x.data;
               return _3a_({head: _25_({infixl: local_122.number,infixr: local_122.base})
                           ,tail: function (local_124) {
                              return littleEndian({base: local_122.base
                                                  ,number: _2f__2f_({infixl: local_122.number
                                                                    ,infixr: local_122.base})});
                           }});
             case "True":
               var local_125 = x.data;
               return {tag: "Empty",data: {}};
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var fold = function (local_128) {
           var x = local_128.stream;
           switch (x.tag)
           {
             case "NonEmpty":
               var local_129 = x.data;
               return fold({stream: local_129.tail({})
                           ,initial: local_128.binop({acc: local_128.initial
                                                     ,item: local_129.head})
                           ,binop: local_128.binop});
             case "Empty":
               var local_130 = x.data;
               return local_128.initial;
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var reverse = function (stream7) {
           return fold({stream: stream7
                       ,initial: {tag: "Empty",data: {}}
                       ,binop: function (local_126) {
                          return {tag: "NonEmpty"
                                 ,data: {head: local_126.item
                                        ,tail: function (local_127) {
                                           return local_126.acc;
                                        }}};
                       }});
        };
var showPosInt = function (num) {
           var x = _3d__3d_({infixl: num,infixr: 0.0});
           switch (x.tag)
           {
             case "False":
               var local_121 = x.data;
               return toBytes(map({stream: reverse(littleEndian({base: 10.0,number: num}))
                                  ,mapping: function (local_131) {
                                     return _2b_({infixl: local_131,infixr: 48.0});
                                  }}));
             case "True":
               var local_132 = x.data;
               return rts.bytesFromString("0");
             default:
               throw "Unhandled case? This is a type error!";
           }
        };
var __return1 = function (local_136) {
           return function (local_137) {
                  return {state: local_137,val: local_136};
               };
        };
var _3b_1 = function (local_138) {
           return function (local_139) {
                  var local_140 = local_138.infixl(local_139);
                  return local_138.infixr(local_140.val)(local_140.state);
               };
        };
var sequence1 = function (s2) {
           return foldLazy({stream: s2
                           ,initial: function (local_141) {
                              return __return1({tag: "Empty",data: {}});
                           }
                           ,binop: function (local_142) {
                              return _3b_1({infixl: local_142.item
                                           ,infixr: function (local_143) {
                                              return _3b_1({infixl: local_142.rest({})
                                                           ,infixr: function (local_144) {
                                                              return __return1(_3a_({head: local_143
                                                                                    ,tail: function (local_145) {
                                                                                       return local_144;
                                                                                    }}));
                                                           }});
                                           }});
                           }});
        };
var codeJam = function (local_105) {
           return join({texts: parse({text: input
                                     ,parser: _3b_1({infixl: parseLine(parsePosInt)
                                                    ,infixr: function (numCases) {
                                                       return sequence1(map({stream: _2e__2e_({start: 1.0
                                                                                              ,stop: _2b_({infixl: numCases
                                                                                                          ,infixr: 1.0})})
                                                                            ,mapping: function (caseId) {
                                                                               return _3b_1({infixl: local_105.solve
                                                                                            ,infixr: function (result1) {
                                                                                               return __return1(join({texts: _3a_({head: rts.bytesFromString("Case #")
                                                                                                                                  ,tail: function (local_120) {
                                                                                                                                     return _3a_({head: showPosInt(caseId)
                                                                                                                                                 ,tail: function (local_133) {
                                                                                                                                                    return _3a_({head: rts.bytesFromString(": ")
                                                                                                                                                                ,tail: function (local_134) {
                                                                                                                                                                   return _3a_({head: result1
                                                                                                                                                                               ,tail: function (local_135) {
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
                    ,solve: parseLine(function (line) {
                       return {state: {tag: "Empty",data: {}},val: solveDigits(line)};
                    })}));
