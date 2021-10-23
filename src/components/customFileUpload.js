import React from "react";
import Button from "./button";
import { Avatar } from "@material-ui/core";
import { IoIosImages } from "react-icons/io";
import SubHeaderLabel from "./subheaderlabel";
import styled, { css } from "styled-components";
import clsx from "clsx";

const FileUploadStyleWrapper = styled.div`
  .contained-button-file {
    cursor: pointer;
    text-align: center;
    border-radius: 0.1rem;
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
    .MuiAvatar-root {
      border: 1px dashed ${({ theme }) => theme.themeColor.primary};
      ${({ isImage }) =>
        isImage &&
        css`
          border: none;
        `};

      width: 11em;
      height: 10em;
      .MuiAvatar-img {
        object-fit: contain;
      }
    }
    .MuiAvatar-colorDefault {
      background-color: ${({ theme }) => theme.themeColor.lightGrey};
    }
  }
  .fileName-btn {
    ${({ theme }) =>
      theme.gridLayout.grid({
        rows: 1,
        rHeight: "0vh",
        minCol: "50px",
        alignItems: "center",
      })}
    .fileName-label {
      color: ${({ theme }) => theme.themeColor.primary};
      grid-column: 1 / span 2;
    }
    .remove-btn {
      justify-self: flex-end;
    }
  }
`;

const CustomFileUpload = ({
  isImage,
  onChange,
  fileName,
  onRemove,
  fileIndex,
  errorText,
  previewUrl,
  uploadType,
  ...props
}) => {
  return (
    <FileUploadStyleWrapper isImage={isImage}>
      <input
        hidden
        multiple
        type="file"
        accept="image/*"
        onChange={onChange}
        id={`contained-button-file-${fileIndex}`}
        {...props}
      />
      <label
        htmlFor={`contained-button-file-${fileIndex}`}
        className="contained-button-file"
      >
        <Avatar variant="rounded" alt="Product Image" src={previewUrl}>
          <IoIosImages />
          <p>Upload {uploadType}</p>
        </Avatar>
      </label>
      <div className="fileName-btn">
        <SubHeaderLabel
          className={clsx({
            "fileName-label": fileName,
            "error-text": errorText,
          })}
          margin
        >
          {fileName || errorText}
        </SubHeaderLabel>
        {fileName && (
          <Button
            className="remove-btn"
            size="small"
            variant="outlined"
            textButton
            onClick={onRemove}
          >
            Remove
          </Button>
        )}
      </div>
    </FileUploadStyleWrapper>
  );
};

export default CustomFileUpload;
