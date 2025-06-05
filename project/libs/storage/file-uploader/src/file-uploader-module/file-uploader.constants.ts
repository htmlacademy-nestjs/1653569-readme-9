import { HttpStatus } from '@nestjs/common';

import { UploadedFileRDO } from '../rdo/uploaded-file.rdo';
import { FileUploaderApiProperty } from './file-uploader.property';

export const FileIdApiParam = {
  name: 'fileId',
  schema: FileUploaderApiProperty.Id
} as const;

export const FileUploaderFileApiBody = {
  schema: {
    type: 'object',
    properties: {
      ['file']: {
        type: 'string',
        format: 'binary'
      }
    }
  }
};

export const FileUploaderApiResponse = {
  FileUploaded: {
    type: UploadedFileRDO,
    status: HttpStatus.CREATED,
    description: 'The new file was successfully upload'
  },
  FileFound: {
    type: UploadedFileRDO,
    status: HttpStatus.OK,
    description: 'File successfully found'
  },
  FileNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'File not found'
  },
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request'
  }
} as const;
