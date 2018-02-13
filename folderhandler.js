const fs=require("fs-extra");
const {ipcMain}=require("electron");

class folderHandler
{
    constructor()
    {
        var filepath=`C:/Users/khang/Desktop/videos/memes`;

        var allfiles=fs.readdirSync(filepath);
        this.files=[];

        var fullFilename;
        for (var x=0,l=allfiles.length;x<l;x++)
        {
            fullFilename=`${filepath}/${allfiles[x]}`;
            if (!fs.lstatSync(fullFilename).isDirectory())
            {
                this.files.push(fullFilename);
            }
        }

        ipcMain.on("requestFilelist",(e,res)=>{
            e.sender.send("filelist",this.files);
        });
    }

    sendFileList(targetwindow)
    {
        targetwindow.webContents.send("filelist",this.files);
        console.log(this.files);
    }
}

module.exports=new folderHandler();