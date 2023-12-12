export { Iterator, Fib }

const MyIterable = {
    [Symbol.iterator]: () => {
        let i = 0;
        return {
            next: () => ({value: i+=2, done: false})
        }
    }
};

const [a,b,c] = MyIterable;
console.log(a,b,c);
for(const x of MyIterable) {
    if(x < 90) continue;
    console.log(x);
    if (x > 100) break;
}


const Iterator = (startValue, whileFn, incrementFn) => {
    const next = () => {
        const proceed = whileFn(startValue);
        let   value = undefined;
        if (proceed) {
            value = startValue;
            startValue = incrementFn(startValue);
        }
        return { value: value, done: !proceed };
    };
    return {
        [Symbol.iterator]: () => ({ next })
    };
};


const Fib = n => {
    let prev = 1;
    return Iterator(0, i => i < n, i => {
        const result = prev + i;
        prev = i;
        return result;
    });
};
