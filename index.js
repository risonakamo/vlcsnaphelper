const {ipcRenderer}=require("electron");

window.onload=main;

class imgViewer
{
    constructor()
    {
        this.imgWrap=document.querySelector(".img-wrap");
        this.mainImg=this.imgWrap.children[0];

        this.oImgRatio=16/9;

        window.addEventListener("resize",(e)=>{
            this.fitImage();
        });

        this.fitImage();
    }

    //resize current image to view area
    fitImage()
    {
        if (this.imgWrap.offsetWidth/this.imgWrap.offsetHeight<=this.oImgRatio)
        {
            this.mainImg.classList.add("wide");
            this.mainImg.style.marginTop=`${(this.imgWrap.offsetHeight-this.mainImg.offsetHeight)/2}px`;
        }

        else
        {
            this.mainImg.classList.remove("wide");
            this.mainImg.style.marginTop=0;
        }
    }
}

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
        console.log(res);
    });
}