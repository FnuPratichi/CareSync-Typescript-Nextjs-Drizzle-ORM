CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" varchar DEFAULT 'patient' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar(8) NOT NULL,
	"age" integer,
	"createdAt" timestamp DEFAULT now(),
	"roleid" integer
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_roleid_roles_id_fk" FOREIGN KEY ("roleid") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;