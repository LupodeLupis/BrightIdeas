export class Credentials{
    id: number;
    userName: string;
    password: string;
    previousPasswords: string; // I think this should be a an array of string, but in the documentation is says varchar with 500 length
}