const {app,BrowserWindow}=require("electron");

var _win;

function main()
{
    _win=new BrowserWindow({width:800,height:600,useContentSize:true});

    _win.loadURL(`${__dirname}/index.html`);
}

app.on("ready",main);