import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";



export const GlobalClientModule = ClientsModule.registerAsync([
    // @Inject('USERS_SERVICE') private client: ClientProxy,
    {
        name: 'USERS_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            transport: Transport.TCP,
            options: {
                host: configService.get<string>('USERS_HOST'),
                port: configService.get<number>('USERS_PORT'),
            },
        }),
        inject: [ConfigService],
    },
]);
