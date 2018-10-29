//DisplayMain()
class DisplayMain extends React.Component
{
  render()
  {
    return (<>
      <ImgDisplay/>

      <div className="menu">
        <div className="statuses">
          <h1>00:22:03</h1>
          <p>00_18_24_[HorribleSubs] Sora to Umi no Aida - 04 [1080p].mkv_00001.png</p>
        </div>

        <div className="control">

        </div>
      </div>
    </>);
  }
}

//ImgDisplay()
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
        <img className={imgFitClass} src="test.png" ref={this.theImg} onLoad={this.fitImg}/>
      </div>
    );
  }
}