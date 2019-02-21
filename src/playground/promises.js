const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        reject('Something went wrong');
        //If multiple values need to be passed, then use object
        resolve({
            name: "hyun",
            age: 30
        });
        //two resolve won't work
        resolve('This is my other resolved data');
        //two arguments won't work
        resolve('a', 'b')
    }, 5000);
});

console.log('before')

promise.then((data)=>{
    console.log('1', data)
}).catch((error)=>{
    console.log("error:", error)
});

//There are multiple ways to catch error, the below is alternative
//by using the second argument
// promise.then((data)=>{
//     console.log('1', data)
// }, (error)=>{
//     console.log('error:', error)
// })

console.log('after')