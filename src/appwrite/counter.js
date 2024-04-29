import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class CounterService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async createCounter({
    slug,
    counterDefaultValue,
    counterResetValue,
    counterName,
    countLimit,
    status,
    createdOn,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          slug,
          name: counterName,
          value: counterDefaultValue,
          resetValue: counterResetValue,
          hasCountLimit: countLimit.hasCountLimit,
          minimumValue: countLimit.minimumValue,
          maximumValue: countLimit.maximumValue,
          status,
          createdOn: createdOn,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service Error: " + error);
    }
  }

  async updateCounter(
    slug,
    { resetCountValue, CounterName, countLimit, status }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          resetCountValue,
          name: CounterName,
          hasCountLimit: countLimit.hasLimit,
          maximumCountValue: countLimit.maximumValue,
          minimumCountValue: countLimit.minimumValue,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: UpdateCounter :: Error ::" + error);
    }
  }

  async deleteCounter(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      return true;
    } catch (error) {
      log("Appwrite Service :: DeleteCounter :: Error ::" + error);
      return false;
    }
  }

  async getCounter(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      log("Appwrite Service :: GetCounter :: Error ::", error);
      return false;
    }
  }

  async getCounters(queries = [Query.equal("status", "published")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      log("Appwrite Service :: GetCounter :: Error", error);
    }
  }
}

const counter = new CounterService();
export default counter;
