class imgViewer
{
    imgViewer();

    element imgWrap; //container for image for scaling
    element mainImg; //display image element

    element menuBar;
    element innerMenu;
    element timeCode; //time code display element
    element fname; //name display element

    int currentPos; //position in image array

    void fitImage();
    void fitText();

    void loadImages(array data);

    void navImage(int pos);

    void keybinds();
}