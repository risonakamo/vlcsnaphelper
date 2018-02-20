class imgViewer
{
    constructor()
    {
        var doc=document;
        this.imgWrap=doc.querySelector(".img-wrap");
        this.mainImg=this.imgWrap.children[0];

        this.menuBar=doc.querySelector(".menu-bar");
        this.innerMenu=this.menuBar.querySelector(".menu");
        this.timeCode=this.menuBar.querySelector(".time-code");
        this.fname=this.menuBar.querySelector(".name-info");

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

    fitText()
    {
        this.menuBar.style.flexBasis=this.innerMenu.offsetHeight+"px";
    }

    loadImages(folderdata)
    {
        var data=folderdata.files;

        var currDirNameLen=folderdata.folder.length+1;

        this.images=[];
        var fileMatch=/\d\d_\d\d_\d\d/;
        var timestring;

        for (var x=0,l=data.length;x<l;x++)
        {
            timestring=fileMatch.exec(data[x]);
            if (timestring)
            {
                timestring=timestring[0].replace(/_/g,":");
            }

            else
            {
                timestring="??:??:??";
            }

            this.images.push({
                fullPath:data[x],
                filename:data[x].slice(currDirNameLen),
                timeString:timestring
            });
        }

        this.navImage(0);
    }

    navImage(pos)
    {
        if (pos>=this.images.length || pos<0)
        {
            return;
        }

        this.mainImg.src=this.images[pos].fullPath;
        this.fname.innerText=this.images[pos].filename;
        this.timeCode.innerText=this.images[pos].timeString;

        this.currentPos=pos;

        setTimeout(()=>{
            this.fitText();

            setTimeout(()=>{
                this.fitImage();
            },3);
        },3);
    }

    keybinds()
    {
        document.addEventListener("keydown",(e)=>{
            switch (e.key)
            {
                case "ArrowRight":
                this.navImage(this.currentPos+1);
                break;

                case "ArrowLeft":
                this.navImage(this.currentPos-1);
                break;

                case "Enter":
                this.doneImage();
            }
        });
    }

    doneImage()
    {
        ipcRenderer.send("filemove",{
            fullFile:this.images[this.currentPos].fullPath,
            filename:this.images[this.currentPos].filename,
            folder:"done"
        });

        this.images.splice(this.currentPos,1);
        this.navImage(this.currentPos);
    }
}