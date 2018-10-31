//DisplayMain(object-array data)
class DisplayMain extends React.Component
{
  constructor(props)
  {
    super(props);
    this.doneAction=this.doneAction.bind(this);
    this.keepAction=this.keepAction.bind(this);
    this.openVLCAction=this.openVLCAction.bind(this);
    this.changeImage=this.changeImage.bind(this);
    this.collectButtonRefs=this.collectButtonRefs.bind(this);

    this.state={
      data:this.props.data,
      currentImage:0
    }

    this.keyControl();
    this.mainButtons=[]; //refs of main buttons in order
  }

  //global window keyboard operations
  keyControl()
  {
    //quick way because im not feeling like it
    //0: enter, 1: k, 2: space
    this.keyDownAlready=[0,0,0];

    window.addEventListener("keydown",(e)=>{
      if (!this.state.data.length)
      {
        return;
      }

      switch (e.key)
      {
        case "ArrowRight":
        this.changeImage(1,1);
        break;

        case "ArrowLeft":
        this.changeImage(-1,1);
        break;

        case "Enter":
        if (this.keyDownAlready[0])
        {
          return;
        }

        this.keyDownAlready[0]=1;
        this.doneAction(null,1);
        break;

        case " ":
        if (this.keyDownAlready[2])
        {
          return;
        }

        this.keyDownAlready[2]=1;
        this.openVLCAction(null,1);
        break;

        case "k":
        case "K":
        if (this.keyDownAlready[1])
        {
          return;
        }

        this.keyDownAlready[1]=1;
        this.keepAction(null,1);
        break;
      }
    });

    window.addEventListener("keyup",(e)=>{
      switch (e.key)
      {
        case "Enter":
        this.keyDownAlready[0]=0;
        break;

        case " ":
        this.keyDownAlready[2]=0;
        break;

        case "k":
        case "K":
        this.keyDownAlready[1]=0;
        break;
      }
    });
  }

  //increment current image index in specified direction
  changeImage(add,playAnimation)
  {
    var nextImage=this.state.currentImage+add;

    if (nextImage<0 || nextImage>=this.state.data.length)
    {
      return;
    }

    this.setState({currentImage:nextImage});

    if (playAnimation)
    {
      if (add<0)
      {
        this.pressAnimation(3);
      }

      else
      {
        this.pressAnimation(4);
      }
    }
  }

  //remove the image at the specified index in the images array
  //and place in the specified moveDir index
  removeImage(index,moveDir)
  {
    if (!this.state.data.length)
    {
      return;
    }

    _imageControl.relocateFile(this.state.data[this.state.currentImage],moveDir);

    this.state.data.splice(index,1);

    var changeData={data:this.state.data};

    if (this.state.currentImage>=this.state.data.length)
    {
      changeData.currentImage=this.state.currentImage-1;
    }

    this.setState(changeData);
  }

  //the done action. put in a function for organisation
  //done the current image and remove it from the array
  doneAction(e,animate)
  {
    this.removeImage(this.state.currentImage,0);

    if (animate)
    {
      this.pressAnimation(0);
    }
  }

  //the keep action. put in a function for organisation
  //keep the current image and remove it from the array

  /*ok so it looks the same as done action. but why not
    merge it? well cause it wouldn't be intuative. these
    weren't even suppose to be in functions anyway.
    so whatever.*/
  keepAction(e,animate)
  {
    this.removeImage(this.state.currentImage,1);

    if (animate)
    {
      this.pressAnimation(1);
    }
  }

  //open vlc for the current image
  openVLCAction(e,animate)
  {
    _imageControl.openVLC(this.state.data[this.state.currentImage]);

    if (animate)
    {
      this.pressAnimation(2);
    }
  }

  //ref function for main buttons
  collectButtonRefs(ref)
  {
    this.mainButtons.push(ref);
  }

  //play the press animation of mainbutton at certain index
  pressAnimation(index)
  {
    //colour is @main-white-rgb in less
    this.mainButtons[index].animate([
      {backgroundColor:"rgba(185,194,197,0)"},
      {backgroundColor:"rgba(185,194,197,.25)",offset:.5},
      {backgroundColor:"rgba(185,194,197,0)"}
    ],200);
  }

  render()
  {
    var currentImage=null;
    var statuses={
      time:"no more images",
      fullfile:""
    };
    var imageCount=`(${this.state.currentImage+1}/${this.state.data.length})`;

    if (this.state.data.length)
    {
      currentImage=this.state.data[this.state.currentImage]
      statuses.time=currentImage.time;
      statuses.fullfile=currentImage.fullfile;
    }

    return (<>
      <ImgDisplay data={currentImage}/>

      <div className="menu">
        <div className="statuses">
          <h1>{statuses.time}</h1>

          <div className="button" onClick={this.doneAction} ref={this.collectButtonRefs}>
            <p>DONE</p>
            <p className="key">Enter</p>
          </div>
          <div className="button" onClick={this.keepAction} ref={this.collectButtonRefs}>
            <p>KEEP</p>
            <p className="key">K</p>
          </div>
          <div className="button" onClick={this.openVLCAction} ref={this.collectButtonRefs}>
            <p>LINK</p>
            <p className="key">Space</p>
          </div>
          <div className="button half" onClick={()=>{this.changeImage(-1)}} ref={this.collectButtonRefs}>🠸</div>
          <div className="button half" onClick={()=>{this.changeImage(1)}} ref={this.collectButtonRefs}>🠺</div>
        </div>

        <div className="footer">
          <p>{`${statuses.fullfile} ${imageCount}`}</p>
        </div>
      </div>
    </>);
  }
}

//ImgDisplay(object data)
//data: imageData object
class ImgDisplay extends React.Component
{
  constructor(props)
  {
    super(props);
    this.fitImg=this.fitImg.bind(this);

    this.state={
      tall:0
    };

    this.displayDiv=React.createRef();
    this.theImg=React.createRef();

    window.onresize=this.fitImg;
  }

  fitImg()
  {
    //if img resolution is less than window resolution, set tall fit
    if ((this.theImg.current.naturalWidth/this.theImg.current.naturalHeight)
        <(this.displayDiv.current.scrollWidth/this.displayDiv.current.scrollHeight))
    {
      this.setState({tall:1});
    }

    else
    {
      this.setState({tall:0});
    }
  }

  render()
  {
    if (!this.props.data)
    {
      return null;
    }

    var imgFitClass="";
    if (this.state.tall)
    {
      imgFitClass="tall";
    }

    return (
      <div className="img-display" ref={this.displayDiv}>
        <img className={imgFitClass} src={this.props.data.imagepath} ref={this.theImg} onLoad={this.fitImg}/>
      </div>
    );
  }
}