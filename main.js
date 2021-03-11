# main.js
    var ws = null;
    var isBusy = false;

    function connect(){
        if(isBusy) return;
        if(ws) return $("#status").css({ transform: 'rotate(-90deg)' }, 1000); 
        $("#status").attr("src","loading.gif");

        isBusy = true;
        ws = new WebSocket("ws://{Host IP Addr}:11111/ws"); // 書き換え
        ws.onopen = ()=>{ //接続できたとき
            isBusy = false;
            $("#status").attr("src","niko.jpg");
            alert("接続しました👼");
        }
        
        ws.onerror = (e)=>{ 
            isBusy = false;
            ws = null;
            $("#status").attr("src","pien.png");
            alert("接続失敗しました(´；ω；`)\n"+e)
        }

        ws.onclose = ()=>{
            isBusy = false;
            ws = null;
        }

        ws.addEventListener('close', function (event) {
            $("#status").attr("src","pien.png");
        });
        
        ws.onmessage = (event) => {
            console.log(event)
        }
    }

    function disconnect(){
        ws.close()
    }

    var KEY_SET = {
        37:"L",
        38:"U", //up
        39:"R",
        40:"D",
        65:"2", // a key
        90:"1", // z key
        81:"m" // q key
    }
    var activeKey = {};
    
    
    $(".btn").on("touchstart",function(){
        console.log("pushed")
        const key = $(this).attr("key");
        $(this).addClass("active");
        if(ws) ws.send(JSON.stringify({uid : "none",type:"push",key:key}))
    });

    $(".btn").on("touchend",function(){
        console.log("pulled")
        const key = $(this).attr("key");
        $(this).removeClass("active");
        if(ws) ws.send(JSON.stringify({uid : "none",type:"pull",key:key}))
    });

    $("#status").click(()=>{
        connect();
    })