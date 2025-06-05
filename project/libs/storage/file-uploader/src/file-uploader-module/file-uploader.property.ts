export const FileUploaderApiProperty = {
  Id: {
    description: 'Unique file ID',
    example: '37f97oifwe79foi983fwef89'
  },
  OriginalName: {
    description: 'Original filename',
    example: 'filename.txt'
  },
  HashName: {
    description: 'Filename hash',
    example: '37f97oifwe79foi983fwef89.txt'
  },
  SubDirectory: {
    description: 'Subdirectory',
    example: 'password'
  },
  Mimetype: {
    description: 'Mimetype',
    example: 'plain/text'
  },
  Size: {
    description: 'File size',
    example: '100'
  }
} as const;
