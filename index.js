const {ipcRenderer}=require("electron");

window.onload=main;

var imgviewer;

function main()
{
    imgviewer=new imgViewer();
    msgRecievers();

    ipcRenderer.send("requestFilelist");
}

function msgRecievers()
{
    ipcRenderer.on("filelist",(err,res)=>{
        imgviewer.loadImages(res);
    });
}