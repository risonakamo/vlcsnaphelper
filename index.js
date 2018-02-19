const {ipcRenderer}=require("electron");

window.onload=main;

class imgViewer
{
    constructor()
    {
        this.imgWrap=document.querySelector(".img-wrap");
        this.mainImg=this.imgWrap.children[0];

        this.currentPos=0;

        window.addEventListener("resize",(e)=>{
            this.fitImage();
        });

        this.fitImage();
        this.keybinds();
    }

    //resize current image to view area
    fitImage()
    {
        if (this.imgWrap.offsetWidth/this.imgWrap.offsetHeight<=this.mainImg.naturalWidth/this.mainImg.naturalHeight)
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

    loadImages(data)
    {
        this.images=data;
        this.navImage(0);
    }

    navImage(pos)
    {
        if (pos>=this.images.length || pos<0)
        {
            return;
        }

        this.mainImg.src=this.images[pos];
        this.currentPos=pos;
        this.fitImage();
    }

    keybinds()
    {
        document.addEventListener("keydown",(e)=>{
            if (e.key=="ArrowRight")
            {
                this.navImage(this.currentPos+1);
            }

            else if (e.key=="ArrowLeft")
            {
                this.navImage(this.currentPos-1);
            }
        });
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
        imgviewer.loadImages(res);
    });
}