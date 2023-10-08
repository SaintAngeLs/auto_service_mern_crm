/**
 * @file dbConnection.ts
 * Generates the connection string for MongoDB DataBase using configurations from dbConfig module.
 * This module assembles the MongoDB driver connection string based on provided credentials.
 * @module dbConnection
 * 
 * @requires ./dbConfig
 * 
 * @property {string} mongoDBDriverConnectionString: the MongoDB connection string.
 */

import { DBUSER, PASSWORD } from "./dbConfig";

export const mongoDBDriverConnectionString: string = 
    `mongodb+srv://${DBUSER}:${PASSWORD}@cluster0.qwf5jx1.mongodb.net/?retryWrites=true&w=majority`;
