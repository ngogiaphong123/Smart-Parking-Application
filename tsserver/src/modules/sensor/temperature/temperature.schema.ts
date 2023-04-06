export default class Temperature {
    // recordId    String @id @map("_id") @db.ObjectId
    // unit        String
    // timestamp   DateTime
    // createdAt   DateTime @default(now())
    // updatedAt   DateTime @updatedAt
    // temperature Float
    
    public _id: string;
    public unit: string;
    public timestamp: Date;
    public temperature: string;

constructor(_id: string, unit: string, timestamp: Date, temperature: string) {
        this._id = _id;
        this.unit = unit;
        this.timestamp = timestamp;
        this.temperature = temperature;
    }
}
