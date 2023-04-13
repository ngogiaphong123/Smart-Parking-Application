export default class ResponseBody {
    constructor(
        public status: string,
        public message: string,
        public data: any
    ) {}
}