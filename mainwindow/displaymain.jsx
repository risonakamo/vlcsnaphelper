//DisplayMain(object-array data)
class DisplayMain extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      data:this.props.data,
      currentImage:0
    }

    this.keyControl();
  }

  //global window keyboard operations
  keyControl()
  {
    window.addEventListener("keydown",(e)=>{
      switch (e.key)
      {
        case "ArrowRight":
        this.changeImage(1);
        break;

        case "ArrowLeft":
        this.changeImage(-1);
        break;

        case "Enter":
        this.removeImage(this.state.currentImage);
        break;
      }
    });
  }

  //increment current image index in specified direction
  changeImage(add)
  {
    var nextImage=this.state.currentImage+add;

    if (nextImage<0 || nextImage>=this.state.data.length)
    {
      return;
    }

    this.setState({currentImage:nextImage});
  }

  //remove the image at the specified index in the images array
  removeImage(index)
  {
    _imageControl.relocateFile(this.state.data[this.state.currentImage],0);

    this.state.data.splice(index,1);

    var changeData={data:this.state.data};

    if (this.state.currentImage>=this.state.data.length)
    {
      changeData.currentImage=this.state.currentImage-1;
    }

    this.setState(changeData);
  }

  render()
  {
    return (<>
      <ImgDisplay data={this.state.data[this.state.currentImage]}/>

      <div className="menu">
        <div className="statuses">
          <h1>{this.state.data[this.state.currentImage].time}</h1>
          <p>{this.state.data[this.state.currentImage].fullfile}</p>
        </div>

        <div className="control">

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