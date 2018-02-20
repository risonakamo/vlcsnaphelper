const fs=require("fs-extra");
const {ipcMain}=require("electron");

class folderHandler
{
    constructor()
    {
        this.filepath=`C:/Users/khang/Desktop/videos/memes/`;

        var allfiles=fs.readdirSync(this.filepath);
        this.files=[];

        var fullFilename;
        for (var x=0,l=allfiles.length;x<l;x++)
        {
            fullFilename=`${this.filepath}/${allfiles[x]}`;
            if (!fs.lstatSync(fullFilename).isDirectory())
            {
                this.files.push(fullFilename);
            }
        }

        ipcMain.on("requestFilelist",(e,res)=>{
            e.sender.send("filelist",{files:this.files,folder:this.filepath});
        });
    }
}

module.exports=new folderHandler();