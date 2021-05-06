export class SingleObjectResponse<T> {
    public element: T;
    public succeeded: boolean;
    public errors: string;
    public message: string;
    public errorCode: number;

    // Compiled JavaScript has all types erased, passing the type into the constructor as function to fix the problem.
    constructor(private Type: new () => T) {
        this.element = this.getNew();
        this.succeeded = false;
        this.errors = '';
        this.message = '';
        this.errorCode = 0;
    }

    getNew(): T {
        return new this.Type();
    }
}
