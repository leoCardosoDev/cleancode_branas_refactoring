import pgp from "pg-promise";
import DatabaseConnection from "./database_connection";

export default class PgPromiseAdapter implements DatabaseConnection {
  private connection: any;
  
  constructor() {
    this.connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  }

  async query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  }

  async close(): Promise<void> {
    await this.connection.$pool.end();
  }
}
