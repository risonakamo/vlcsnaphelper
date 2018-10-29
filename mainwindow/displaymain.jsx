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
      if (e.key=="ArrowRight")
      {
        this.changeImage(1);
      }

      else if (e.key=="ArrowLeft")
      {
        this.changeImage(-1);
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