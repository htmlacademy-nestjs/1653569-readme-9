import 'multer';
import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { MongoIdValidationPipe } from '@project/pipes';
import { fillDTO } from '@project/helpers';

import { FileUploaderService } from './file-uploader.service';
import { UploadedFileRDO } from '../rdo/uploaded-file.rdo';
import { FileIdApiParam, FileUploaderApiResponse, FileUploaderFileApiBody } from './file-uploader.constants';

@ApiTags('file-uploads')
@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService,
  ) {}

  @ApiResponse(FileUploaderApiResponse.FileUploaded)
  @ApiResponse(FileUploaderApiResponse.BadRequest)
  @ApiConsumes('multipart/form-data')
  @ApiBody(FileUploaderFileApiBody)
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDTO(UploadedFileRDO, fileEntity.toPOJO());
  }

  @ApiResponse(FileUploaderApiResponse.FileFound)
  @ApiResponse(FileUploaderApiResponse.FileNotFound)
  @ApiResponse(FileUploaderApiResponse.BadRequest)
  @ApiParam(FileIdApiParam)
  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDTO(UploadedFileRDO, existFile);
  }
}
