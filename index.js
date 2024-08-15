/**
 * @ author ethan
 * @ date  2024年06月05日 上午10:38
 * @ description  写下注释时请使用@变量名/方法名 描述
 **/
const http = require("http")
const https = require("https")
let server = http.createServer()

server.on("request",(req,res)=>{
    try {
    let myUrl = new URL(req.url,"http://localhost:9000")
    res.writeHead(200, {
        "Content-Type": "image/webp"
        })

    switch(myUrl.pathname){
        case '/anime':
            console.log("来自"+req.socket.remoteAddress+"的使用者:")
            httpGet(res)
            break
        default:
            res.end("404")
        }
    }
    catch{
        response.end("error")
    }
})

server.listen(9000,()=>{
    console.log("server start")
})

function httpGet(response){

    let data = ""
    let page = Math.ceil(Math.random() * 190)
        let address = `https://api.codelife.cc/wallpaper/wallhaven?lang=cn&page=${page}&size=24&q=id:5`
        https.get(address, (res) => {
            res.on("data", (chunk) => {
                data += chunk
            })
            res.on("end", () => {
                if((JSON.parse(data))?.data?.length === 0){
                    let defaultUrl = "https://files.codelife.cc/wallhaven/full/9m/wallhaven-9mqqq8.png?x-oss-process=image/resize,limit_0,m_fill,w_2560,h_1440/quality,Q_92/format,webp"
                    https.get(defaultUrl, (ress) => {
                        console.log("默认请求地址-->"+defaultUrl)
                        ress.pipe(response)
                    })
                }
                else{
                let id = Math.floor(Math.random() * ((JSON.parse(data))?.data?.length))
                let randomId = (JSON.parse(data))?.data[id]?.raw
                https.get(randomId, (ress) => {
                    console.log("请求地址-->"+randomId)
                    ress.pipe(response)
                })
            }
            })
        })
}