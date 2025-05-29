import { Injectable, Logger } from '@nestjs/common';
import { Notification } from './notification.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractNotificationHandler } from './handlers/abstract-notification-handler';
import { NotificationType } from './enums/notification-type.enum';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  private notificationHandlers: Record<string, AbstractNotificationHandler> =
    {};

  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}

  registerHandler(type: string, handler: AbstractNotificationHandler) {
    this.notificationHandlers[type] = handler;
  }

  async createNotification(notification: Notification): Promise<Notification> {
    const newNotification = new this.notificationModel(notification);
    return newNotification.save();
  }

  async findAllNotifications(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }

  async getNotificationById(id: string): Promise<Notification | null> {
    return this.notificationModel.findById(id).exec();
  }

  async handleNotification(type: NotificationType, data: unknown) {
    try {
      this.logger.log(
        `received new notification of type ${type} with data: ${JSON.stringify(data)}`,
      );
      await this.notificationHandlers[type].handle(data);
      this.logger.log(`notification has handled successfully`);
      const notification = await this.createNotification({ type, data });
      this.logger.log(
        `notification stored successfully wit id: ${notification._id}`,
      );
    } catch (error) {
      this.logger.log(
        `something went wrong will processing notification of type ${type} with data: ${JSON.stringify(data)} - error: ${error.message}`,
      );
      throw error;
    }
  }
}
