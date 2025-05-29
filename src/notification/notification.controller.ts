import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';

import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notification.service';
import { NotificationType } from './enums/notification-type.enum';
import { UserRegisteredDto } from './dto/user-registered.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('logs')
  async getLogs() {
    return this.notificationService.findAllNotifications();
  }

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @EventPattern(NotificationType.UserRegistered)
  async handleUserRegistered(@Payload() data: UserRegisteredDto) {
    await this.notificationService.handleNotification(
      NotificationType.UserRegistered,
      data,
    );
  }
}
