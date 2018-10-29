const {ipcRenderer}=require("electron");

window.onload=main;

function main()
{
    ipcRenderer.on("imgdata",(e,data)=>{
        ReactDOM.render(React.createElement(DisplayMain,{data}),document.querySelector(".wrap"));
    });
}
