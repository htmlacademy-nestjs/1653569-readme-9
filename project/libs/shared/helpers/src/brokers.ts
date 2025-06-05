import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from './common';

export function getRabbitMQOptions(optionSpace: string) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.exchange`) as string,
          type: 'direct'
        }
      ],
      uri:getRabbitMQConnectionString({
        username: config.get<string>(`${optionSpace}.user`) as string,
        password: config.get<string>(`${optionSpace}.password`) as string,
        host: config.get<string>(`${optionSpace}.host`) as string,
        port: config.get<number>(`${optionSpace}.port`) as number,
      }),
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }
}
