class imgViewer
{
    imgViewer();

    element imgWrap; //container for image for scaling
    element mainImg; //display image element

    element timeCode; //time code display element
    element fname; //name display element

    int currentPos; //position in image array

    //this will have to be dynamically updated when folder loading is added!!!!!!!!!
    string currentDir;
    int currDirNameLen;

    void fitImage();
    void loadImages(array data);
    void navImage(int pos);

    void keybinds();
}