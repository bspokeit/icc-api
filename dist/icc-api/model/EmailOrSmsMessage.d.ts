/**
 * iCure Cloud API Documentation
 * Spring shop sample application
 *
 * OpenAPI spec version: v0.0.1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { MimeAttachment } from "./MimeAttachment"
export declare class EmailOrSmsMessage {
  constructor(json: JSON | any)
  attachments?: Array<MimeAttachment>
  destination?: string
  destinationIsNotPatient?: boolean
  destinationName?: string
  sendCopyToSender?: boolean
  senderName?: string
  replyToEmail?: string
  content?: string
  messageId?: string
  patientId?: string
  senderId?: string
  subject?: string
  type?: EmailOrSmsMessage.TypeEnum
}
export declare namespace EmailOrSmsMessage {
  type TypeEnum = "EMAIL" | "SMS"
  const TypeEnum: {
    EMAIL: TypeEnum
    SMS: TypeEnum
  }
}
