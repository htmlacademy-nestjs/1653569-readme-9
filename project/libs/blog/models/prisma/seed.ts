import { PostStatus, PostType, PrismaClient } from '@prisma/client';

const UserId = {
  First: '658170cbb954e9f5b905ccf4',
  Second: '5381762309c030b503e30512',
} as const

const PostTypeId = {
  Video: 'f95fe6f4-9f5f-45f2-9a26-2b2740e76224',
  Link: 'ffd0658c-75c7-4003-9f60-64565f5e0b5c',
  Quote: '9e2124e8-3d21-49c2-a64f-412aaa6cfd8a',
  Photo: '162adc80-724f-4995-9bd9-edd6f7083940',
  Text: '677b10e7-a284-4d8c-8716-6dc9945c4948',
} as const

const PostId = {
  First: 'e3bf7830-78a4-4ba7-bfaa-2977f116051b',
  Second: '9aedac08-472e-4ed5-866d-2c16cf5d164d',
  Third: '393c91ae-81a1-49fb-96d8-76639aade35e',
  Fourth: 'b69728c1-5af8-4444-ad0b-a5606d0393a6',
  Fifth: '63045e16-9426-48e5-8f2b-f46c65527995',
} as const

function getPosts() {
  return [
    {
      id: PostId.First,
      type: PostType.video,
      status: PostStatus.published,
      userId: UserId.First,
      comments: [
        {
          text: 'Some comment from First user',
          userId: UserId.First,
        },
        {
          text: 'Some comment from Second user',
          userId: UserId.Second,
        }
      ],
      tags: {
        connectOrCreate: [
          {
            create: { title: 'one'},
            where: { title: 'one' }
          },
          {
            create: { title: 'two'},
            where: { title: 'two' }
          }
        ]
      },
      likes: [
        { userId: UserId.Second }
      ],
      video: {
        create: getVideoPost()
      }
    },
    {
      id: PostId.Second,
      type: PostType.link,
      userId: UserId.First,
      tags: {
        connectOrCreate: [
          {
            create: { title: 'one' },
            where: { title: 'one' }
          }
        ]
      },
      link: {
        create: getLinkPost()
      }
    },
    {
      id: PostId.Third,
      type: PostType.quote,
      userId: UserId.Second,
      tags: {
        connectOrCreate: [
          {
            create: {title: 'one'},
            where: { title: 'one' }
          }
        ]
      },
      likes: [
        { userId: UserId.First }
      ],
      quote: {
        create: getQuotePost()
      }
    },
    {
      id: PostId.Fourth,
      type: PostType.photo,
      userId: UserId.Second,
      tags: {
        connectOrCreate: [
          {
            create: {title: 'one'},
            where: { title: 'one' }
          }
        ]
      },
      photo: {
        create: getPhotoPost()
      }
    },
    {
      id: PostId.Fifth,
      type: PostType.text,
      userId: UserId.First,
      tags: {
        connectOrCreate: [
          {
            create: { title: 'four' },
            where: { title: 'four'}
          }
        ]
      },
      text: {
        create: getTextPost()
      }
    }
  ]
}

function getVideoPost() {
  return {
      id: PostTypeId.Video,
      title: 'Video title',
      url: 'https://www.youtube.com/video/',
    }
}

function getLinkPost() {
  return {
      id: PostTypeId.Link,
      url: 'https://www.prisma.io/docs/',
      description: 'Prisma documentation'
    }
}

function getQuotePost() {
  return {
      id: PostTypeId.Quote,
      text: 'Learning is a treasure that will follow its owner everywhere.',
      author: 'Chinese Proverb'
    }
}

function getPhotoPost() {
  return {
      id: PostTypeId.Photo,
      path: 'photo.jpg'
    }
}

function getTextPost() {
  return {
      id: PostTypeId.Text,
      title: 'Get Ready to Groove!',
      announcement: 'We аre excited to announce our upcoming Summer Music Festival!',
      text: 'Join us on July 5th at 7 PM at Central Park for an evening of live music, delicious food, and good vibes. ',
    }
}

async function seedDb(prismaClient: PrismaClient) {
  const posts = getPosts();
  for(const post of posts) {
    await prismaClient.post.upsert({
      where: {id: post.id},
      update: {},
      create: {
        id: post.id,
        type: post.type,
        status: post.status,
        userId: post.userId,
        commentCount: post.comments?.length ?? 0,
        likeCount: post.likes?.length ?? 0,
        tags: post.tags,
        comments: post.comments && post.comments.length ? { create: post.comments } : undefined,
        likes: post.likes?.length ? { create: post.likes }: undefined,
        video: post.video ?? undefined,
        photo: post.photo ?? undefined,
        quote: post.quote ?? undefined,
        text: post.text ?? undefined,
        link: post.link ?? undefined,
      }
    })
  }
  console.info('🚀 Database was filled')
}


async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch(error: unknown) {
    console.error(error);
    globalThis.process.exit(1)
  } finally {
    await prismaClient.$disconnect;
    console.log('Prisma client disconnected')
  }
}

bootstrap();
