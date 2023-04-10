export default class Servo {
    // recordId    String @id @map("_id") @db.ObjectId
    // unit        String
    // timestamp   DateTime
    // createdAt   DateTime @default(now())
    // updatedAt   DateTime @updatedAt
    // temperature Float
    
    public _id: string;
    public timestamp: Date;
    public status: string;

    constructor(_id: string, timestamp: Date, status: string) {
        this._id = _id;
        this.timestamp = timestamp;
        this.status = status;
    }
}