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
      switch (e.key) {
        case "ArrowRight":
          this.changeImage(1);
          break;

        case "ArrowLeft":
          this.changeImage(-1);
          break;

        case "Enter":
          this.removeImage(this.state.currentImage, 0);
          break;

        case "Shift":
          this.removeImage(this.state.currentImage, 1);
          break;
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
  } //remove the image at the specified index in the images array
  //and place in the specified moveDir index


  removeImage(index, moveDir) {
    _imageControl.relocateFile(this.state.data[this.state.currentImage], moveDir);

    this.state.data.splice(index, 1);
    var changeData = {
      data: this.state.data
    };

    if (this.state.currentImage >= this.state.data.length) {
      changeData.currentImage = this.state.currentImage - 1;
    }

    this.setState(changeData);
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