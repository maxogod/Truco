import { getEventName } from "../utils/pusherNames"

class TestEvent {
    public static eventName = getEventName("testEvent")
    message: string
    username: string
    constructor (message: string, username: string) {
        this.message = message
        this.username = username
    }

    public static fromRaw(raw: any): TestEvent {
        return new TestEvent(raw.message, raw.username)
    }

    public getMessage(): string {
        return this.message
    }

    public greetUser(): string {
        return `Hello ${this.username}`
    }
    
}


export default TestEvent