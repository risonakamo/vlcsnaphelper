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
    //quick way because im not feeling like it
    //0: enter, 1: k, 2: space
    var keyDownAlready = [0, 0, 0];
    window.addEventListener("keydown", e => {
      if (!this.state.data.length) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
          this.changeImage(1);
          break;

        case "ArrowLeft":
          this.changeImage(-1);
          break;

        case "Enter":
          if (keyDownAlready[0]) {
            return;
          }

          keyDownAlready[0] = 1;
          this.removeImage(this.state.currentImage, 0);
          break;

        case " ":
          if (keyDownAlready[2]) {
            return;
          }

          keyDownAlready[2] = 1;

          _imageControl.openVLC(this.state.data[this.state.currentImage]);

          break;

        case "k":
        case "K":
          if (keyDownAlready[1]) {
            return;
          }

          keyDownAlready[1] = 1;
          this.removeImage(this.state.currentImage, 1);
          break;
      }
    });
    window.addEventListener("keyup", e => {
      switch (e.key) {
        case "Enter":
          keyDownAlready[0] = 0;
          break;

        case " ":
          keyDownAlready[2] = 0;
          break;

        case "k":
        case "K":
          keyDownAlready[1] = 0;
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
    if (!this.state.data.length) {
      return;
    }

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
    var currentImage = null;
    var statuses = {
      time: "no more images",
      fullfile: ""
    };

    if (this.state.data.length) {
      currentImage = this.state.data[this.state.currentImage];
      statuses.time = currentImage.time;
      statuses.fullfile = currentImage.fullfile;
    }

    return React.createElement(React.Fragment, null, React.createElement(ImgDisplay, {
      data: currentImage
    }), React.createElement("div", {
      className: "menu"
    }, React.createElement("div", {
      className: "statuses"
    }, React.createElement("h1", null, statuses.time), React.createElement("div", {
      className: "button"
    }, "DONE"), React.createElement("div", {
      className: "button"
    }, "KEEP"), React.createElement("div", {
      className: "button"
    }, "LINK"), React.createElement("div", {
      className: "button half"
    }, "\uD83E\uDC38"), React.createElement("div", {
      className: "button half"
    }, "\uD83E\uDC3A")), React.createElement("div", {
      className: "footer"
    }, React.createElement("p", null, statuses.fullfile))));
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
    if (!this.props.data) {
      return null;
    }

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