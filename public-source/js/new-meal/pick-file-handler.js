import elementTransform, { newMealElement } from '../elements';
import actOn from './act-on';
import checkFileTypeSlashExtension from '../../../shared/check-file-typeSlashExtension';
import dataURLtoFile from '../../../shared/data-url-to-file';
import reduceImageResolution from './reduce-image-resolution';
import convertToJpg from './convert-png-to-jpg';
import conformToMaxImgSize from './conform-to-max-img-size';
import state from '../state';

/// FILE UPLOAD HANDLER - TRIGGERED BY THE FILE PICKER INPUT'S 'CHANGE' EVENT
export default function handleFilePicked(event) {

  // maintenance: remove the "added: example meal" message from view
  elementTransform.show(newMealElement.newMealAddedMessage, false);

  // retrieve the user-picked file
  const pickedFile = event.target.files[0];

  //. file has just been selected in the file picker
  if (pickedFile) {

    const reader = new FileReader();
    reader.readAsDataURL(pickedFile);
    reader.onload = handleOnload(pickedFile);

    function handleOnload(theFile) {
      return function (readerEvent) {
        // if the file has a type/extension that does not match image/jpg, etc.
        if (!checkFileTypeSlashExtension(pickedFile.type)) {
          actOn.unacceptableFile("invalid image extension", "");
          return;
        }

        // this object stores the image data used for upload
        state.uploadableImage = {
          name: theFile.name,
          type: theFile.type,
          width: null,
          height: null,
          maxRes: 640, // max allowed output image width or height in px
          maxSize: 100000, // max allowed output image size in bytes
          jpgQuality: 0.9, // reduce jpg quality to this if image size is over maxSize
          isReadyForUpload: false, // if image is valid and ready for upload
          sizeOfOutputFile: dataURLtoFile(readerEvent.target.result, theFile.name).size, // in kb
          // point to the file in dateURL format
          _contentAsDataURL: readerEvent.target.result,
          getContentAsDataURL: function () { return this._contentAsDataURL; },
          setContentAsDataURL: function (dataURLContent) {
            this._contentAsDataURL = dataURLContent;
            this.sizeOfOutputFile = dataURLtoFile(dataURLContent, this.name).size;
          }
        }

        // callbacks
        const cbs = [
          convertToJpg,
          conformToMaxImgSize,
          showImgPreview, // defined below in this module
          checkImgPreview // defined below in this module
        ];
        // process the image: async 'Image.onload' inside
        reduceImageResolution(state.uploadableImage, cbs);

        // show the image preview (of the unmodified user-picked image )
        function showImgPreview(uploadableImage, cbs) {

          newMealElement.imagePreview.innerHTML = [
            '<img src="',
            uploadableImage.getContentAsDataURL(),
            '" title="',
            uploadableImage.name,
            '" width="100%" />'
          ].join('');
          elementTransform.show(newMealElement.imagePreview);
          // allow the imagePreview to update first before you check its height
          setTimeout(() => cbs[0](), 1);
        }

        function checkImgPreview() {

          // the image preview must have at least minHeight
          const minHeight = 100 // px
          if (newMealElement.imagePreview.clientHeight >= minHeight) {
            actOn.acceptableFile();
          }
          // the image is too small or does not display correctly
          else {
            const clientError = "image preview failed";
            actOn.unacceptableFile(clientError, "");
          };
        }
      };
    }
  }

  //. no file has just been selected in the file picker (via cancel button or escape)
  else { return; }
}
