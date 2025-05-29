import { Injectable, Logger } from '@nestjs/common';
import { NotificationType } from '../enums/notification-type.enum';
import { UserRegisteredDto } from '../dto/user-registered.dto';
import { AbstractNotificationHandler } from './abstract-notification-handler';

@Injectable()
export class UserRegisteredHandler extends AbstractNotificationHandler {
  protected logger = new Logger(UserRegisteredHandler.name);

  protected type = NotificationType.UserRegistered;

  async handle(data: UserRegisteredDto) {
    this.logger.log(
      `email sent successfully to ${data.email} with data: ${JSON.stringify(data)}`,
    );
  }
}
