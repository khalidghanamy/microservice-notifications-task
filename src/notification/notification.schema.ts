import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { NotificationType } from './enums/notification-type.enum';

export type NotificationDocument = HydratedDocument<Notification>;

// @Schema()
// export class Notification {

//     @Prop({ required: true })
//     userId: string;

//     @Prop({ required: true })
//     email: string;
//     @Prop({ required: true })
//     username: string;

//     @Prop({ default: 'pending', enum: ['pending', 'sent', 'failed', 'delivered'] })
//     status: string;

//     @Prop({ default: Date.now })
//     timestamp: Date;
// }

@Schema({ timestamps: true })
export class Notification {
  _id?: string;

  @Prop()
  type: NotificationType;

  @Prop({ type: MongooseSchema.Types.Mixed })
  data: unknown;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
