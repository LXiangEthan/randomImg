/**
        * @ author ethan
        * @ date  2024年06月05日 上午10:38
        * @ description  写下注释时请使用@变量名/方法名 描述
**/
const http = require("http")
const https = require("https")
const fs = require("fs")
let server = http.createServer()

server.on("request",(req,res)=>{
    let myUrl = new URL(req.url,"http://localhost:3000")
    res.writeHead(200, {
        "Content-Type": "image/webp"
    })

    switch(myUrl.pathname){
        case '/anime':
            httpGet(res)
            break
        default:
            res.end("404")
    }
})

server.listen(3000,()=>{
    console.log("server start")
})

function httpGet(response){
    let data = ""
    let page = Math.ceil(Math.random() * 190)
    try {
        console.log(page)
        https.get(`https://api.codelife.cc/wallpaper/wallhaven?lang=cn&page=${page}&size=20&q=id:5`, (res) => {
            res.on("data", (chunk) => {
                data += chunk
            })
            res.on("end", () => {
                let id = Math.floor(Math.random() * (JSON.parse(data)).data.length)
                let randomId = (JSON.parse(data)).data[id].raw
                https.get(randomId, (ress) => {
                    ress.setEncoding("binary")
                    let datas = ""
                    ress.on("data", (chunk) => {
                        datas += chunk
                    })

                    ress.on("end", () => {
                        const binaryData = Buffer.from(datas, 'binary');
                        response.end(binaryData);
                    })
                })
            })
        })
    }catch{
        response.end("error")
    }
}
