import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserGender } from '../dto/create-user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  //@Prop({ auto: true })
  id?: number;
  _id?: number;

  @Prop()
  fname: string;

  @Prop()
  lname: string;

  @Prop()
  email: string;

  @Prop({ min: 8 })
  password: string;

  @Prop(UserGender)
  gender: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
