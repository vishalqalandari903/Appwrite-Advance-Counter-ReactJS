import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("661f342f7d4c38844237");

export const account = new Account(client);
export { ID } from "appwrite";
export const databases = new Databases(client, "661f34bbb5d1a230d246");
