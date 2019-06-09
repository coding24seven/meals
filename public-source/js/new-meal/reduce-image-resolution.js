/*
* reduce the image resolution if it exceeds max resolution. commit new image to state.
*/

export default function reduceImageResolution(uploadableImage, cbs) {
  const maxRes = uploadableImage.maxRes;

  const image = new Image();
  image.onload = function (imageEvent) {
    let w = image.width;
    let h = image.height;

    // check for the real-time width and height. step out if they are below or equal maxRes
    if (w <= maxRes && h <= maxRes) {
      cbs[0](uploadableImage, cbs[1]);
      return;
    }

    // if landscape
    if (w > h) {
      if (w > maxRes) {
        h *= maxRes / w;
        w = maxRes;
      }
    }
    // if portrait or square
    else {
      if (h > maxRes) {
        w *= maxRes / h;
        h = maxRes;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(image, 0, 0, w, h);

    // update the image object with new DataURL content
    uploadableImage.setContentAsDataURL(canvas.toDataURL(uploadableImage.type, 1.0));

    cbs[0](uploadableImage, cbs[1]);
  }
  image.src = uploadableImage.getContentAsDataURL();
}
