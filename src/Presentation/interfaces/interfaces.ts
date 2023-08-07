export interface IColumnsDataTable {
  field: string;
  headerName: string;
  width?: number;
}

export interface IFileData {
  file: File | null;
  url: string | null;
}

export interface IFileName {
  file1: string;
  file2: string;
  file3: string;
}

export interface IFilesState {
  file1: IFileData | null;
  file2: IFileData | null;
  file3: IFileData | null;
}
