import 'multer';
import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { MongoIdValidationPipe } from '@project/pipes';
import { fillDTO } from '@project/helpers';

import { FileUploaderService } from './file-uploader.service';
import { UploadedFileRDO } from '../rdo/uploaded-file.rdo';
import { FileIdApiParam, FileUploaderApiOperation, FileUploaderApiResponse, FileUploaderFileApiBody } from './file-uploader.constants';

@ApiTags('File uploads')
@Controller('files')
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService,
  ) {}

  @ApiOperation(FileUploaderApiOperation.Upload)
  @ApiCreatedResponse(FileUploaderApiResponse.FileUploaded)
  @ApiBadRequestResponse(FileUploaderApiResponse.BadRequest)
  @ApiConsumes('multipart/form-data')
  @ApiBody(FileUploaderFileApiBody)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload')
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDTO(UploadedFileRDO, fileEntity.toPOJO());
  }

  @ApiOperation(FileUploaderApiOperation.Get)
  @ApiOkResponse(FileUploaderApiResponse.FileFound)
  @ApiNotFoundResponse(FileUploaderApiResponse.FileNotFound)
  @ApiBadRequestResponse(FileUploaderApiResponse.BadRequest)
  @ApiParam(FileIdApiParam)
  @Get('/:fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDTO(UploadedFileRDO, existFile.toPOJO());
  }
}
