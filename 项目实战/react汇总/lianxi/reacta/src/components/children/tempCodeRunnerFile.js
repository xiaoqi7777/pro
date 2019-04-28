let obj = {
    "0":"a",
    "2":"b",
    length:0
}
Array.prototype.push.call(obj,1)
console.log(obj)
