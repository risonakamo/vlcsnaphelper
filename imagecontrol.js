const fs=require("fs");

/*ImageControl(function completeCallback(object-array data))
-completeCallback: callback function to be called with array of
    image data objects when completed
    image data object:
    {
        time: string, the time string
        filename: string, the video filename
        fullfile: string, the full file name
    }

-make sure the imageDir is set
*/
class ImageControl
{
    constructor(completeCallback)
    {
        this.completeCallback=completeCallback;
        this.imageDir="/Users/khang/Desktop/videos/memes";

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
                    filename:rmatch[4],
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
}

var a=new ImageControl((data)=>{
    console.log(data.length);
});