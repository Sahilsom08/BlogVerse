import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  dataBase;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.APPWRITE_URL)
      .setProject(conf.APPWRITE_PROJECT_ID);

    this.dataBase = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featureImg, status, userId }) {
    try {
      return await this.dataBase.createDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          status,
          userId,
          featureImg,
        }
      );
    } catch (error) {
      console.log("Apppwrite :: service:: createPost :: error ", error);
    }
  }

  async updatePost(slug, { title, content, featureImg, status }) {
    try {
      return await this.dataBase.updateDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featureImg,
          status,
        }
      );
    } catch (error) {
      console.log("Apppwrite :: service:: updatePost :: error ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.dataBase.deleteDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Apppwrite :: service:: deletePost :: error ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.dataBase.getDocument(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        slug
      );
    } catch (error) {
      console.log("Apppwrite :: service:: getPost :: error ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.dataBase.listDocuments(
        conf.APPWRITE_DATABASE_ID,
        conf.APPWRITE_COLLECTION_ID,
        queries
      );
    } catch (error) {
      console.log("Apppwrite :: service:: getPosts :: error ", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Apppwrite :: service:: uploadFile :: error ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.APPWRITE_BUCKET_ID, fileId);
      return true;
    } catch (error) {
      console.log("Apppwrite :: service:: deleteFile :: error ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.APPWRITE_BUCKET_ID, fileId);
  }
}

const serviceObj = new Service();
export default serviceObj;
