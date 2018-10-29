const {app,BrowserWindow}=require("electron");

var _win;

function main()
{
    _win=new BrowserWindow({width:850,height:550,useContentSize:true});
    _win.loadURL(`${__dirname}/mainwindow/mainwindow.html`);
}

app.on("ready",main);