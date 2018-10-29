const fs=require("fs-extra");

/*ImageControl(function completeCallback(object-array data))
-completeCallback: callback function to be called with array of
    image data objects when completed
    imageData object specs in dataspecs

-make sure the imageDir is set
*/
class ImageControl
{
    constructor(completeCallback)
    {
        this.completeCallback=completeCallback;

        //set to the directory with images
        this.imageDir="/Users/khang/Desktop/videos/memes/";

        //0: done directory, 1: keep directory
        this.moveDirs=["/Users/khang/Desktop/videos/memes/done","/Users/khang/Desktop/videos/memes/keep"];

        if (!fs.existsSync(this.imageDir))
        {
            console.log("image directory is missing!");
            return null;
        }

        this.files=fs.readdirSync(this.imageDir);
        this.fileCount=0;
        this.images=[];

        var rmatch;
        this.files.forEach((x)=>{
            fs.stat(`${this.imageDir}/${x}`,(err,stats)=>{
                if (err)
                {
                    console.log(`fs stat error: ${err}`);
                    this.completeCheck();
                    return;
                }

                else if (!stats.isFile())
                {
                    this.completeCheck();
                    return;
                }

                //extracting time,time,time,filename, with a check for png
                rmatch=x.match(/(\d{2})_(\d{2})_(\d{2})_(.*)\.png/);

                if (!rmatch)
                {
                    this.completeCheck();
                    return;
                }

                this.images.push({
                    time:`${rmatch[1]}:${rmatch[2]}:${rmatch[3]}`,
                    // filename:rmatch[4],
                    imagepath:`${this.imageDir}/${x}`,
                    fullfile:x
                });

                this.completeCheck();
            });
        });
    }

    completeCheck()
    {
        this.fileCount++;
        if (this.fileCount>=this.files.length)
        {
            this.completeCallback(this.images);
        }
    }

    //give an imageData object and an index corresponding
    //to moveDirs to move the file to
    relocateFile(fileData,moveDir)
    {
        fs.move(fileData.imagepath,`${this.moveDirs[moveDir]}/${fileData.fullfile}`);
    }
}

module.exports=ImageControl;