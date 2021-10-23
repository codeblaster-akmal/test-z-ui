import React from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { IoIosImages } from "react-icons/io";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const DropZoneContainer = styled.section`
  @media ${({ theme }) => theme.breakpoint.xtraLarge} {
    grid-template-columns: 0.5fr 4fr;
  }
  display: grid;
  column-gap: 0.5rem;
  align-items: flex-start;
  grid-template-columns: 1fr 4fr;
  .MuiDropzonePreviewList-imageContainer:hover
    .MuiDropzonePreviewList-removeButton {
    color: #39607f;
  }
  .MuiDropzoneArea-root {
    width: 70%;
  }
  .MuiDropzonePreviewList-root {
    width: 100%;
    margin: 0;
  }
  .MuiDropzonePreviewList-image {
    width: 100%;
  }
  .MuiDropzonePreviewList-removeButton {
    top: 10px;
    right: 12px;
  }

  .dropzone {
    padding: 2rem 0;
    cursor: pointer;
    text-align: center;
    border-radius: 0.1rem;
    border: 1px dashed ${({ theme }) => theme.themeColor.primary};
    background-color: ${({ theme }) => theme.themeColor.secondary};
    svg {
      width: 1.5em;
      height: 1.5em;
      fill: ${({ theme }) => theme.themeColor.primary};
    }
    p {
      margin: 0;
      color: ${({ theme }) => theme.themeColor.primary};
      font: ${({ theme }) => theme.fontAppearance.tablelist};
    }
  }
  .uploadImageClose {
    top: 0;
    right: 2px;
    z-index: 10;
    position: absolute;
    transform: scale(0);
    transition: ${({ theme }) => theme.smooth};
    border-radius: ${({ theme }) => theme.shape.rounded};
  }
  .matDeleteIcon {
    padding: 2px;
    color: ${({ theme }) => theme.themeColor.secondary};
    background-color: ${({ theme }) => theme.themeColor.primary};
  }
  .matDeleteIconSize {
    font-size: 15px;
  }
  .imageUploadHover {
    position: relative;
    &:hover {
      box-shadow: ${({ theme }) => theme.insetShadow};
      .uploadImageClose {
        transform: scale(1);
      }
      .overlay-content {
        bottom: 0;
        max-height: 55%;
      }
    }
    .overlay-content {
      left: 0;
      right: 0;
      width: 100%;
      max-height: 0;
      bottom: -0.5rem;
      padding: 0.3rem;
      position: absolute;
      backdrop-filter: blur(5px);
      background: rgba(57, 96, 127, 0.3);
      -webkit-backdrop-filter: blur(5px);
      transition: ${({ theme }) => theme.smooth};
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      color: ${({ theme }) => theme.themeColor.primary};
      .file-name {
        padding: 0.3rem 0;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        font: ${({ theme }) => theme.fontAppearance.errormessage};
      }
    }
  }
  /* input[type="radio"][id^="myCheckbox"] {
    display: none;
  } */
  label {
    padding: 0px;
    display: block;
    position: relative;
    margin: 0px;
    cursor: pointer;
    &:before {
      top: 3px;
      left: 3px;
      z-index: 1;
      width: 20px;
      color: #fff;
      content: " ";
      height: 20px;
      display: block;
      font-size: 0.8rem;
      border-radius: 50%;
      position: absolute;
      text-align: center;
      transform: scale(0);
      transition-duration: 0.4s;
      border: 1px solid ${({ theme }) => theme.themeColor.primary};
    }
  }
  img {
    height: 100px;
    width: 90px;
    transition-duration: 0.2s;
    transform-origin: 50% 50%;
  }
  input[type="radio"]:checked + label {
    border-color: ${({ theme }) => theme.themeColor.primary};
    &:before {
      content: "✓";
      transform: scale(1);
      background-color: ${({ theme }) => theme.themeColor.primary};
    }
    img {
      transform: scale(0.9);
      z-index: -1;
    }
  }
`;

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  columnGap: "0.5rem",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #000",
  marginBottom: "1rem",
  boxSizing: "border-box",
  position: "relative",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  cursor: "pointer",
};

const img = {
  display: "block",
};

const DropZone = (props) => {
  const {
    accept,
    files,
    deleteIcon,
    checkedIcon,
    handleDefaultCheck,
    onDeleteImage,
    onDrop,
    productImages,
    setFieldValue,
  } = props;

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, image/webp',
    onDrop,
  });

  const thumbs = files?.map((file, index) =>
    deleteIcon && checkedIcon ? (
      <div style={thumb} key={index}>
        <div className="imageUploadHover" style={thumbInner}>
          {console.log(`file.isDefault`, file.isDefault)}
          <input
            hidden
            type="radio"
            name="radioBtn"
            checked={file.isDefault}
            id={`myCheckbox${index}`}
            onChange={handleDefaultCheck(file, productImages, setFieldValue)}
          />
          <label htmlFor={`myCheckbox${index}`}>
            <img src={file.preview} style={img} alt="product" />
          </label>
          <div className="uploadImageClose">
            <IconButton
              aria-label="delete"
              className="matDeleteIcon"
              onClick={onDeleteImage(file, productImages, setFieldValue)}
            >
              <CloseRoundedIcon className="matDeleteIconSize" />
            </IconButton>
          </div>
          <div className="overlay-content">
            <div className="file-name">{file.name}</div>
          </div>
        </div>
      </div>
    ) : deleteIcon ? (
      <div style={thumb} key={index}>
        <div className="imageUploadHover" style={thumbInner}>
          <img src={file.preview} style={img} alt="product" />
          <div className="uploadImageClose">
            <IconButton aria-label="delete" className="matDeleteIcon">
              <CloseRoundedIcon className="matDeleteIconSize" />
            </IconButton>
          </div>
        </div>
      </div>
    ) : (
      <div style={thumb} key={index}>
        <div className="imageUploadHover" style={thumbInner}>
          <img src={file.preview} style={img} alt="product" />
        </div>
      </div>
    )
  );
  return (
    <DropZoneContainer>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} onDrop={onDrop} />
        <IoIosImages />
        <p>Upload</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </DropZoneContainer>
  );
};

export default DropZone;
