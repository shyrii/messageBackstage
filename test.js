// setTimeout(() => {
//     console.log('这就是个最简单的回调函数，这里产生了异步')
// }, 1000);


// function someHeavyWork(callback) {
//     // 这里用setTimeout来替代繁重的运算工作或者网络请求
//     const result = 1
//     network.get("www.baidu.com")
//     callback(result)
//     // setTimeout(() => {
//     //     callback(result)
//     // },1000)
// }

// function someHeavyWorkPromise() {
//     return new Promise((resolve, reject) => {
//         const result =  2
//         setTimeout(() => {
//             resolve(result)
//         }, 2000)
//     })
// }

// someHeavyWork((v) => {
//     console.log("result: " + v)
// })

// someHeavyWorkPromise().then((v) => {
//     console.log("result: " + v)
// })

// console.log('没有等待setTimeout的执行就执行到这里了，所以没有阻塞主进程')

// (async () => {
//     const v = await someHeavyWorkPromise()
//     console.log("await:" + v)
// })()



function findCount(name, callback) {
    db.all("select * from user where name = $name", {
        name: name
    }, function (result) {
        const myResult = result.length
        callback(myResult)
    })
}


function findCounPromise(name) {
    return new Promise((resolve, reject) => {
        db.all("select * from user where name = $name", {
            name: name
        }, function (err, result) {
            if (err) {
                reject(err)
            }
            const myResult = result.length
            resolve(myResult)
        })
    })

}


// 回调函数
findCount("Delbert", (r) => {
    findCount("Shyrii", (r2) => {
        findCount("Shyrii", (r3) => {
            console.log(r + r2 + r3)
        })
    })
})

// Promise
let a = 0;
findCounPromise("Delbert").then(v => {
    a += v
    return findCounPromise("Shyrii")
}).then(v => {
    a += v
    return findCounPromise("Shyrii")
}).then(v => {
    a += v
}).catch(err => {

})

// async-await
async function doSome() {
    try {
        const r1 = await findCounPromise("Delbert")
        console(2)
        const r2 = await findCounPromise("Shryii")
        const r3 = await findCounPromise("Shyrii")
    }
    catch (err) {

    }
}

const a  = doSome() // 不行
console.log(1)
await doSome()
console.log(3)

findCounPromise("Delbert").then(v => {
    r1 = v
    console.log(2)
})
console(1)
findCounPromise("Shryii").then(v => { r2 = v })
findCounPromise("Shryii").then(v => { r3 = v })


a = 0
a = r1 + r2 + r3