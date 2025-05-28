import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NotificationModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/notification-service?authSource=admin',
      {
        
        retryAttempts: 5,
        retryDelay: 3000,

        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('✅ MongoDB connected successfully');
          });
          connection.on('disconnected', () => {
            console.log('❌ MongoDB disconnected');
          });
          connection.on('error', (error) => {
            console.error('🚨 MongoDB connection error:', error);
          });
          return connection;
        },
      },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}