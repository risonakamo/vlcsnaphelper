class imgViewer
{
    constructor()
    {
        var doc=document;
        this.imgWrap=doc.querySelector(".img-wrap");
        this.mainImg=this.imgWrap.children[0];

        this.menuBar=doc.querySelector(".menu-bar");
        this.innerMenu=this.menuBar.querySelector(".menu");
        this.timeCode=this.innerMenu.querySelector(".time-code");
        this.fname=this.innerMenu.querySelector(".name-info");
        this.controlButtons=this.innerMenu.querySelectorAll(".control-button");

        this.currentPos=0;
        this.enterDown=0;

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
            timestring=fileMatch.exec(data[x][0]);
            if (timestring)
            {
                timestring=timestring[0].replace(/_/g,":");
            }

            else
            {
                timestring="??:??:??";
            }

            this.images.push({
                fullPath:data[x][0],
                filename:data[x][0].slice(currDirNameLen),
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
                case "d":
                case "ArrowRight":
                this.navImage(this.currentPos+1);
                break;

                case "a":
                case "ArrowLeft":
                this.navImage(this.currentPos-1);
                break;

                case "Enter":
                if (!this.enterDown)
                {
                    this.enterDown=1;
                    this.controlButtons[1].classList.remove("pressed");

                    setTimeout(()=>{
                        this.controlButtons[1].classList.add("pressed");
                    },1);
                }
                break;
            }
        });

        document.addEventListener("keyup",(e)=>{
            if (e.key=="Enter")
            {
                this.enterDown=0;
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