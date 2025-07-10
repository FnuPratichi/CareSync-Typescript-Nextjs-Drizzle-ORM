import {pgTable,varchar,timestamp,serial,integer} from "drizzle-orm/pg-core";

export const roles = pgTable("roles",{
    id:serial("id").primaryKey(),
    role:varchar("role").notNull().default("patient") 
})


export const users = pgTable("users",{
    id:serial("id").primaryKey(),
    username:varchar("username").notNull(),
    email:varchar("email").notNull(),
    password:varchar("password",{length:255}).notNull(),
    age:integer("age"),
    createdAt:timestamp("createdAt").defaultNow(),
    roleid:integer("roleid").references(()=>roles.id)
})

