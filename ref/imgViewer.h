class imgViewer
{
    imgViewer();

    element imgWrap; //container for image for scaling
    element mainImg; //display image element

    int currentPos; //position in image array

    void fitImage();
    void loadImages(array data);
    void loadImage(int pos);
}