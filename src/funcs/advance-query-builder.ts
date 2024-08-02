/*
Example
const q = new QueryBuilder<{user: {id: number; name: string}}>();
q.select("user.id", "user.name")
  .where("user.name", "andrew")
  .where("user.id", 3)
  .table<"widget", {widgetId: string, userId: number}>()
  .select("widget.widgetId", "widget.userId")
  .where("widget.widgetId", "12")
*/
type BaseTable = {
  [colName: string]: string | number | boolean;
}

type Columns<Tables extends { [tableName: string]: BaseTable }> = {
  [K in keyof Tables]: K extends string ? (keyof Tables[K] extends string ? `${K}.${keyof Tables[K]}`: never): never
}[keyof Tables]

type Flat<Tables extends {[tableName: string]: BaseTable}> = {
  [K in Columns<Tables>]: Tables[K extends `${infer T}.${infer _}` ? T: never][K extends `${infer _}.${infer C}` ? C : never]
}

class QueryBuilder<Tables extends { [tableName: string]: BaseTable }> {
  table<N extends string, T extends BaseTable>() {
    return new QueryBuilder<Tables & { [X in N]: T}>();
  }

  select(...columns: Columns<Tables>[]) {
    // implemenmt here
    return this
  }

  where<K extends Columns<Tables>>(col: K, value: Flat<Tables>[K]) {
    // implemenmt here
    return this
  }
}
