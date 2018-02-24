class imgViewer
{
    imgViewer();

    element imgWrap; //container for image for scaling
    element mainImg; //display image element

    /*-- menu bar elements --*/
    element menuBar;
    element innerMenu;
    /*-- menu info elements --*/
    element timeCode; //time code display element
    element fname; //name display element
    /*-- menu control elements --*/
    element[2] controlButtons; //[keep button,done button]

    int currentPos; //position in image array

    int enterDown; //set to 1 while enter is down, suppresses multiple enter key

    void fitImage();
    void fitText();

    void loadImages(array data); //given array of image data, loads the viewer

    void navImage(int pos);

    void keybinds();

    void doneImage();
}