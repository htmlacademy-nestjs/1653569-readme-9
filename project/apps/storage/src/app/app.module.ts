import { Module } from '@nestjs/common';

import { StorageConfigModule, getMongooseOptions  } from '@project/storage-config';
import { FileUploaderModule } from '@project/file-uploader';
import { MongooseModule } from '@nestjs/mongoose';

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
