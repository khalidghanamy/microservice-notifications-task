import { Injectable, Logger } from '@nestjs/common';
import { Notification } from './notification.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
export interface NotificationData {
  userId: string;
  email: string;
  username: string;
  status?: string; // Optional, default can be 'pending'
}

export interface UserRegisteredEvent {
  userId: string;
  email: string;
  username: string;
}

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<Notification>,
  ) { }
  private readonly logger = new Logger(NotificationService.name);

  async createNotification(notificationData: NotificationData): Promise<Notification> {
    const notification = new this.notificationModel(notificationData);
    return notification.save();
  };

  async findAllNotifications(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  };

  async handleUserRegistered(userData: UserRegisteredEvent): Promise<void> {
    // create a new notification
    const notificationData: NotificationData = {
      userId: userData.userId,
      email: userData.email,
      username: userData.username,
    };
    const notification = await this.createNotification(notificationData);
    await this.sendNotification(notificationData);
  }

  private async sendNotification(notificationData: NotificationData): Promise<void> {
    try {
      //Log the notification
      this.logger.log(`Sending notification to ${notificationData.email}...`);
      console.log('📧 Notification sent:', {
        timestamp: new Date().toISOString(),
        userId: notificationData.userId,
        email: notificationData.email,
        username: notificationData.username,
      });
      this.logger.log(`✅ Welcome notification sent successfully to ${notificationData.email}`);

      // update the notification status to 'sent'
      // await this.updateNotificationStatus(notificationId, 'sent');
    } catch (error) {
      this.logger.error(`Failed to send notification to ${notificationData.email}`, error);
      throw error;
    }
  }


  async getNotificationById(id: string): Promise<Notification | null> {
    return this.notificationModel.findById(id).exec();
  };
  // async updateNotificationStatus(id: string, status: string): Promise<Notification | null> {
  //   return this.notificationModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  // };


}