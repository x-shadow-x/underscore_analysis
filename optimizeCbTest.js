/**
 * 测试optimizeCb的优化操作是否带来性能提升
 */
var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
        case 1:
            return function(value) {
                return func.call(context, value);
            };
        case 2:
            return function(value, other) {
                return func.call(context, value, other);
            };
        case 3:
            return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
        case 4:
            return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
    }
    return function() {
        return func.apply(context, arguments);
    };
};

var non_optimizeCb = function(func, context, argCount) {
    return function() {
        return func.apply(context, arguments);
    };
};

function add(x, y, z) {
    return this + x + y + z
}

var iterations = 1000000;
console.time('#optimizeCb');
for (var i = 0; i < iterations; i++) {
    optimizeCb(add, 1, 3)(1, 2, 3);
};
console.timeEnd('#optimizeCb')

console.time('#non_optimizeCb');
for (var j = 0; j < iterations; j++) {
    non_optimizeCb(add, 1, 3)(1, 2, 3);
};
console.timeEnd('#non_optimizeCb')

console.time('#native_bind');
for (var k = 0; k < iterations; k++) {
    add.bind(1)(1, 2, 3);
};
console.timeEnd('#native_bind')
