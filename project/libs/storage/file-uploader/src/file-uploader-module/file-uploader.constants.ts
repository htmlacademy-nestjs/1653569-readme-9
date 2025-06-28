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

export const FileUploaderApiOperation = {
  Upload: { summary: "Upload file" },
  Get: { summary: "Get file" },
} as const;

export const FileSizeLimit = {
  Avatar: 1 * 500 * 1024,
  Image: 1 * 1024 * 1024,
} as const;

export const FileUploaderMessage = {
  Avatar: {
    LargeSize: 'File is too large. Maximum size is 500KB.',
  },
  Image: {
    LargeSize: 'File is too large. Maximum size is 1MB.',
  }
} as const

export const FileUploaderApiResponse = {
  FileUploaded: {
    status: HttpStatus.CREATED,
    description: 'The new file was successfully upload',
    type: UploadedFileRDO,
  },
  FileFound: {
    status: HttpStatus.OK,
    description: 'File successfully found',
    type: UploadedFileRDO,
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
