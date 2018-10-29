//DisplayMain(object-array data)
class DisplayMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      currentImage: 0
    };
    this.keyControl();
  } //global window keyboard operations


  keyControl() {
    window.addEventListener("keydown", e => {
      if (e.key == "ArrowRight") {
        this.changeImage(1);
      } else if (e.key == "ArrowLeft") {
        this.changeImage(-1);
      }
    });
  } //increment current image index in specified direction


  changeImage(add) {
    var nextImage = this.state.currentImage + add;

    if (nextImage < 0 || nextImage >= this.state.data.length) {
      return;
    }

    this.setState({
      currentImage: nextImage
    });
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement(ImgDisplay, {
      data: this.state.data[this.state.currentImage]
    }), React.createElement("div", {
      className: "menu"
    }, React.createElement("div", {
      className: "statuses"
    }, React.createElement("h1", null, this.state.data[this.state.currentImage].time), React.createElement("p", null, this.state.data[this.state.currentImage].fullfile)), React.createElement("div", {
      className: "control"
    })));
  }

} //ImgDisplay(object data)
//data: imageData object


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
      src: this.props.data.imagepath,
      ref: this.theImg,
      onLoad: this.fitImg
    }));
  }

}