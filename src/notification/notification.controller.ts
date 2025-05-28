import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';

import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService, UserRegisteredEvent } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Controller("notifications")
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) { }

  @Get('logs')
  async getLogs() {
    return this.notificationService.findAllNotifications();
  };

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @EventPattern('userRegistered')
  async handleUserRegistered(@Payload() data: CreateNotificationDto) {
    console.log('🎉Received userRegistered event:', data);
    await this.notificationService.handleUserRegistered(data);
  }

}