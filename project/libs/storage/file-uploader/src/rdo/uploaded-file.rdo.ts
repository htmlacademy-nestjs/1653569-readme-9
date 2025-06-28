import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { FileUploaderApiProperty } from '../file-uploader-module/file-uploader.property'

export class UploadedFileRDO {
  @ApiProperty(FileUploaderApiProperty.Id)
  @Expose()
  public id!: string;

  @ApiProperty(FileUploaderApiProperty.OriginalName)
  @Expose()
  public originalName!: string;

  @ApiProperty(FileUploaderApiProperty.HashName)
  @Expose()
  public hashName!: string;

  @ApiProperty(FileUploaderApiProperty.SubDirectory)
  @Expose()
  public subDirectory!: string;

  @ApiProperty(FileUploaderApiProperty.Mimetype)
  @Expose()
  public mimetype!: string;

  @ApiProperty(FileUploaderApiProperty.Size)
  @Expose()
  public size!: number;
}
