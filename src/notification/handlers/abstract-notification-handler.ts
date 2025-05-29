import { Inject, Injectable, Logger } from '@nestjs/common';
import { NotificationService } from '../notification.service';
import { NotificationType } from '../enums/notification-type.enum';

@Injectable()
export abstract class AbstractNotificationHandler {
  protected abstract logger: Logger;

  protected abstract type: NotificationType;

  @Inject()
  protected readonly notificationService: NotificationService;

  abstract handle(data: unknown): Promise<void>;

  onModuleInit() {
    this.notificationService.registerHandler(this.type, this);
  }
}
