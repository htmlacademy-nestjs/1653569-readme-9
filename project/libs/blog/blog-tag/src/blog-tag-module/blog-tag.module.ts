import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/models';
import { BlogTagRepository } from './blog-tag.repository';
import { BlogTagService } from './blog-tag.service';
import { BlogTagFactory } from './blog-tag.factory';
import { BlogTagController } from './blog-tag.controller';

@Module({
	imports: [PrismaClientModule],
	providers: [BlogTagRepository, BlogTagService, BlogTagFactory],
	controllers: [BlogTagController],
	exports: [BlogTagService],
})
export class BlogTagModule {}
