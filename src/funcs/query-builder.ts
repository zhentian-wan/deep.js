/*
Example
const query = new QueryBuilder()
  .select("name", "email")
  .from("users")
  .where("id", "1")
  .where("email", "example@a.com")
  .build()

console.log(query) // "SELECT name, email FROM users WHERE id = 1 AND email = example@a.com" 
*/
export default class QueryBuilder {
  private fields: string[] = []
  private wheres: Record<string, string> = {}
  private table: string = ""

  select(...columns: string[]) {
    this.fields = columns
    return this
  }

  from (table: string) {
    this.table = table
    return this
  }

  where(column: string, value: string) {
    this.wheres[column] = value
    return this
  }

  build() {
    return `SELECT ${this.fields.join(", ")} FROM ${this.table} WHERE ${Object.entries(this.wheres).map(([k, v]) => `${k} = ${v}`).join(" AND ")}`
  }
}

