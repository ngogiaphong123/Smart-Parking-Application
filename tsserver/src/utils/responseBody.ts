export default class responseBody {
    constructor(
        public status: string,
        public message: string,
        public data: any
    ) {}
}