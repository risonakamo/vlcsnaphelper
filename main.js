const {app,BrowserWindow,ipcMain}=require("electron");
const ImageControl=require("./imagecontrol.js");

var _win;

function main()
{
    _win=new BrowserWindow({width:850,height:550,useContentSize:true,webPreferences:{webSecurity:false},show:false});

    _win.on("ready-to-show",()=>{
        var imgControl=new ImageControl((data)=>{
            _win.webContents.send("imgdata",data);
        });

        _win.show();
    });

    _win.loadURL(`${__dirname}/mainwindow/mainwindow.html`);
}

app.on("ready",main);