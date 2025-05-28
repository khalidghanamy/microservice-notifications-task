
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {

    @Prop({ required: true })
    userId: string;
    
    @Prop({ required: true })
    email: string;
    
    @Prop({ required: true })
    username: string;

    @Prop({ required: true, enum: ['email', 'sms', 'push', 'in-app'] })
    type: string;

    @Prop({ required: true })
    message: string;

    @Prop({ default: 'pending', enum: ['pending', 'sent', 'failed', 'delivered'] })
    status: string;

    @Prop({ default: 0 })
    retryAttempts: number;
    
    @Prop({ default: Date.now })
    timestamp: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
