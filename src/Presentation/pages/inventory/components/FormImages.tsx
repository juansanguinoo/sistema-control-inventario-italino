import { MdCloudUpload, MdDelete } from "react-icons/md";
import { useState, useRef, ChangeEvent, RefObject, useEffect } from "react";
import { IFileName, IFilesState } from "../../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useParams } from "react-router-dom";

interface IFormImagesProps {
  handleFileDataChange: (fileKey: string, fileData: any) => void; // eslint-disable-line
  isEdit?: boolean;
}

export const FormImagesInventory = ({
  handleFileDataChange,
  isEdit = false,
}: IFormImagesProps) => {
  const params = useParams();
  const [fileData, setFileData] = useState<IFilesState>({
    file1: null,
    file2: null,
    file3: null,
  });
  const [fileName, setFileName] = useState<IFileName>({
    file1: "No selected file",
    file2: "No selected file",
    file3: "No selected file",
  });

  const inventories = useSelector(
    (state: RootState) => state.inventoryReducer.inventories
  );

  const fileInputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const handleFileInputClick = (ref: RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleClickFileInput = (index: number) => {
    handleFileInputClick(fileInputRefs[index]);
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fileKey: string
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileData = {
        file,
        url: URL.createObjectURL(file),
      };

      const fileName = {
        file:
          file.name.length > 15
            ? file.name.substring(0, 15) + "..."
            : file.name,
      };

      handleFileDataChange(fileKey, fileData);

      setFileData((prevFiles: IFilesState) => ({
        ...prevFiles,
        [fileKey]: fileData,
      }));

      setFileName((prevFiles: IFileName) => ({
        ...prevFiles,
        [fileKey]: fileName.file,
      }));
    } else {
      handleFileDataChange(fileKey, null);

      setFileData((prevFiles: IFilesState) => ({
        ...prevFiles,
        [fileKey]: null,
      }));

      setFileName((prevFiles: IFileName) => ({
        ...prevFiles,
        [fileKey]: "No selected file",
      }));
    }
  };

  useEffect(() => {
    if (params.id) {
      if (isEdit) {
        const inventory = inventories.find(
          (inventory) => inventory.id === Number(params.id)
        );
        if (inventory) {
          const images = inventory.imageInventory?.split(", ");
          if (images) {
            images.forEach((image, index) => {
              const fileData = {
                file: null,
                url: image,
              };

              const fileName = {
                file: image.substring(0, 15) + "...",
              };

              setFileData((prevFiles: IFilesState) => ({
                ...prevFiles,
                [`file${index + 1}`]: fileData,
              }));

              setFileName((prevFiles: IFileName) => ({
                ...prevFiles,
                [`file${index + 1}`]: fileName.file,
              }));
            });
          }
        }
      }
    }
  }, [isEdit, inventories, params]);

  return (
    <div className="image-column">
      <div className="image-group-1" onClick={() => handleClickFileInput(0)}>
        <input
          type="file"
          ref={fileInputRefs[0]}
          id="mainImage"
          accept="image/*"
          className="input-field"
          onChange={(e) => handleFileChange(e, "file1")}
          hidden
        />

        {fileData.file1 ? (
          <img src={fileData.file1.url} width={300} height={300} alt="file-1" />
        ) : (
          <>
            <MdCloudUpload color="#5570f1" size={60} />
            <p>Explorar archivos para cargar</p>
          </>
        )}
      </div>
      <section className="uploaded-row">
        <span className="upload-content">
          {fileName.file1}
          <MdDelete
            color="#5570f1"
            size={20}
            onClick={() => {
              handleFileDataChange("file1", null);
              setFileData((prevFiles: IFilesState) => ({
                ...prevFiles,
                file1: null,
              }));
              setFileName((prevFiles: IFileName) => ({
                ...prevFiles,
                file1: "No selected file",
              }));
            }}
          />
        </span>
      </section>
      <div className="small-images">
        <div className="small-images-container">
          <div
            className="image-group-2"
            onClick={() => handleClickFileInput(1)}
          >
            <input
              type="file"
              ref={fileInputRefs[1]}
              id="mainImage"
              accept="image/*"
              className="input-field"
              onChange={(e) => handleFileChange(e, "file2")}
              hidden
            />

            {fileData.file2 ? (
              <img
                src={fileData.file2.url}
                width={200}
                height={200}
                alt="file-2"
              />
            ) : (
              <>
                <MdCloudUpload color="#5570f1" size={40} />
                <p style={{ fontSize: "12px" }}>
                  Explorar archivos para cargar
                </p>
              </>
            )}
          </div>
          <section className="uploaded-row">
            <span className="upload-content">
              {fileName.file2}
              <MdDelete
                color="#5570f1"
                size={20}
                onClick={() => {
                  handleFileDataChange("file2", null);
                  setFileData((prevFiles: IFilesState) => ({
                    ...prevFiles,
                    file2: null,
                  }));
                  setFileName((prevFiles: IFileName) => ({
                    ...prevFiles,
                    file2: "No selected file",
                  }));
                }}
              />
            </span>
          </section>
        </div>
        <div className="small-images-container">
          <div
            className="image-group-2"
            onClick={() => handleClickFileInput(2)}
          >
            <input
              type="file"
              ref={fileInputRefs[2]}
              id="mainImage"
              accept="image/*"
              className="input-field"
              onChange={(e) => handleFileChange(e, "file3")}
              hidden
            />

            {fileData.file3 ? (
              <img
                src={fileData.file3.url}
                width={200}
                height={200}
                alt="file-3"
              />
            ) : (
              <>
                <MdCloudUpload color="#5570f1" size={40} />
                <p style={{ fontSize: "12px" }}>
                  Explorar archivos para cargar
                </p>
              </>
            )}
          </div>
          <section className="uploaded-row">
            <span className="upload-content">
              {fileName.file3}
              <MdDelete
                color="#5570f1"
                size={20}
                onClick={() => {
                  handleFileDataChange("file3", null);
                  setFileData((prevFiles: IFilesState) => ({
                    ...prevFiles,
                    file3: null,
                  }));
                  setFileName((prevFiles: IFileName) => ({
                    ...prevFiles,
                    file3: "No selected file",
                  }));
                }}
              />
            </span>
          </section>
        </div>
      </div>
    </div>
  );
};
