import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StorageConfigModule, getMongooseOptions  } from '@project/storage-config';
import { FileUploaderModule } from '@project/file-uploader';

@Module({
  imports: [
    StorageConfigModule,
    FileUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
