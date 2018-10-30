const ImageControl=require("../imagecontrol.js");

window.onload=main;

var _imageControl;

function main()
{
    _imageControl=new ImageControl((data)=>{
        console.log(data);
        ReactDOM.render(React.createElement(DisplayMain,{data}),document.querySelector(".wrap"));
    });
}
