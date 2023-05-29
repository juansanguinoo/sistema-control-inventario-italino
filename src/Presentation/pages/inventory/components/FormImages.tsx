import { MdCloudUpload, MdDelete } from "react-icons/md";
import { useState, useRef, ChangeEvent, RefObject } from "react";

interface IFileData {
  file1: { File: File; url: string } | null;
  file2: { File: File; url: string } | null;
  file3: { File: File; url: string } | null;
}

interface IFileName {
  file1: string;
  file2: string;
  file3: string;
}

export const FormImagesInventory = () => {
  const [fileName, setFileName] = useState<IFileName>({
    file1: "No selected file",
    file2: "No selected file",
    file3: "No selected file",
  });

  const [fileData, setFileData] = useState<IFileData>({
    file1: null,
    file2: null,
    file3: null,
  });

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
    const file = (e.target as HTMLInputElement).files?.[0];

    if (file) {
      setFileData((prevState) => ({
        ...prevState,
        [fileKey]: {
          file: file,
          url: URL.createObjectURL(file as Blob),
        },
      }));

      setFileName((prevState) => ({
        ...prevState,
        [fileKey]:
          file.name.length > 15
            ? file.name.substring(0, 15) + "..."
            : file.name,
      }));
    } else {
      setFileData((prevState) => ({
        ...prevState,
        [fileKey]: null,
      }));

      setFileName((prevState) => ({
        ...prevState,
        [fileKey]: "No selected file",
      }));
    }
  };

  const { file1, file2, file3 } = fileData;
  console.log(fileData);

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

        {file1 ? (
          <img src={file1.url} width={300} height={300} alt="file-1" />
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
              setFileName((prevState) => ({
                ...prevState,
                file1: "No selected file",
              }));
              setFileData((prevState) => ({
                ...prevState,
                file1: null,
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

            {file2 ? (
              <img src={file2.url} width={200} height={200} alt="file-2" />
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
                  setFileName((prevState) => ({
                    ...prevState,
                    file2: "No selected file",
                  }));
                  setFileData((prevState) => ({
                    ...prevState,
                    file2: null,
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

            {file3 ? (
              <img src={file3.url} width={200} height={200} alt="file-3" />
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
                  setFileName((prevState) => ({
                    ...prevState,
                    file3: "No selected file",
                  }));
                  setFileData((prevState) => ({
                    ...prevState,
                    file3: null,
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
