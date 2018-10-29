//DisplayMain()
class DisplayMain extends React.Component {
  render() {
    return React.createElement(React.Fragment, null, React.createElement(ImgDisplay, null), React.createElement("div", {
      className: "menu"
    }, React.createElement("div", {
      className: "statuses"
    }, React.createElement("h1", null, "00:22:03"), React.createElement("p", null, "00_18_24_[HorribleSubs] Sora to Umi no Aida - 04 [1080p].mkv_00001.png")), React.createElement("div", {
      className: "control"
    })));
  }

} //ImgDisplay()


class ImgDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.fitImg = this.fitImg.bind(this);
    this.state = {
      tall: 0
    };
    this.displayDiv = React.createRef();
    this.theImg = React.createRef();
    window.onresize = this.fitImg;
  }

  fitImg() {
    //if img resolution is less than window resolution, set tall fit
    if (this.theImg.current.naturalWidth / this.theImg.current.naturalHeight < this.displayDiv.current.scrollWidth / this.displayDiv.current.scrollHeight) {
      this.setState({
        tall: 1
      });
    } else {
      this.setState({
        tall: 0
      });
    }
  }

  render() {
    var imgFitClass = "";

    if (this.state.tall) {
      imgFitClass = "tall";
    }

    return React.createElement("div", {
      className: "img-display",
      ref: this.displayDiv
    }, React.createElement("img", {
      className: imgFitClass,
      src: "test.png",
      ref: this.theImg,
      onLoad: this.fitImg
    }));
  }

}