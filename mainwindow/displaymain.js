class DisplayMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      currentImage: 0
    };
    this.keyControl();
  }

  keyControl() {
    this.keyDownAlready = [0, 0, 0];
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
          this.doneAction();
          break;

        case " ":
          this.openVLCAction();
          break;

        case "k":
        case "K":
          this.keepAction();
          break;
      }
    });
    window.addEventListener("keyup", e => {
      switch (e.key) {
        case "Enter":
          this.keyDownAlready[0] = 0;
          break;

        case " ":
          this.keyDownAlready[2] = 0;
          break;

        case "k":
        case "K":
          this.keyDownAlready[1] = 0;
          break;
      }
    });
  }

  changeImage(add) {
    var nextImage = this.state.currentImage + add;

    if (nextImage < 0 || nextImage >= this.state.data.length) {
      return;
    }

    this.setState({
      currentImage: nextImage
    });
  }

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

  doneAction() {
    if (this.keyDownAlready[0]) {
      return;
    }

    this.keyDownAlready[0] = 1;
    this.removeImage(this.state.currentImage, 0);
  }

  keepAction() {
    if (this.keyDownAlready[1]) {
      return;
    }

    this.keyDownAlready[1] = 1;
    this.removeImage(this.state.currentImage, 1);
  }

  openVLCAction() {
    if (this.keyDownAlready[2]) {
      return;
    }

    this.keyDownAlready[2] = 1;

    _imageControl.openVLC(this.state.data[this.state.currentImage]);
  }

  render() {
    var currentImage = null;
    var statuses = {
      time: "no more images",
      fullfile: ""
    };
    var imageCount = `(${this.state.currentImage + 1}/${this.state.data.length})`;

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
      className: "button",
      onClick: this.doneAction
    }, "DONE"), React.createElement("div", {
      className: "button",
      onClick: this.keepAction
    }, "KEEP"), React.createElement("div", {
      className: "button",
      onClick: this.openVLCAction
    }, "LINK"), React.createElement("div", {
      className: "button half",
      onClick: () => {
        this.changeImage(-1);
      }
    }, "\uD83E\uDC38"), React.createElement("div", {
      className: "button half",
      onClick: () => {
        this.changeImage(1);
      }
    }, "\uD83E\uDC3A")), React.createElement("div", {
      className: "footer"
    }, React.createElement("p", null, `${statuses.fullfile} ${imageCount}`))));
  }

}

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