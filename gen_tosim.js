var fs=require("fs");
var variants=fs.readFileSync("unihan-raw/Unihan_Variants.txt","utf8").split("\n");
var c=0;
var pat=/U\+([0-9A-F]+?)\tkSimplifiedVariant\tU\+([0-9A-F]+)/ ;
var fromCharCode=function(code) {
	if (code<0x10000) {
		return String.fromCharCode(code)
	} else{
		var H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
		var L = (code - 0x10000) % 0x400 + 0xDC00;
		return String.fromCharCode(H,L);
	}
}
var out=[];
var dump=function(line) {
	var m=line.match(pat);
	if (m) {
		var c1=fromCharCode(parseInt(m[1],16));
		var c2=fromCharCode(parseInt(m[2],16));
		out.push('"'+c1+'='+c2+'"');
	}
}
variants.map(dump);
fs.writeFileSync("tosim.json","["+out.join(",")+"]","utf8");