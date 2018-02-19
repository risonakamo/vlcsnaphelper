const {ipcRenderer}=require("electron");

window.onload=main;

class imgViewer
{
    constructor()
    {
        var doc=document;
        this.imgWrap=doc.querySelector(".img-wrap");
        this.mainImg=this.imgWrap.children[0];

        this.timeCode=doc.querySelector(".time-code");
        this.fname=doc.querySelector(".name-info");

        this.currentPos=0;
        this.currentDir="C:/Users/khang/Desktop/videos/memes/";
        this.currDirNameLen=this.currentDir.length;

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
        this.images=[];
        var fileMatch=/\d\d_\d\d_\d\d/;
        var tempMatch;

        for (var x=0,l=data.length;x<l;x++)
        {
            tempMatch=fileMatch.exec(data[x]);
            if (tempMatch)
            {
                tempMatch=tempMatch[0].replace(/_/g,":");
            }

            else
            {
                tempMatch="??:??:??";
            }

            this.images.push([data[x],data[x].slice(this.currDirNameLen),tempMatch]);
        }

        this.navImage(0);
    }

    navImage(pos)
    {
        if (pos>=this.images.length || pos<0)
        {
            return;
        }

        this.mainImg.src=this.images[pos][0];
        this.fname.innerText=this.images[pos][1];
        this.timeCode.innerText=this.images[pos][2];

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