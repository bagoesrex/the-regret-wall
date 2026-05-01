CREATE TABLE "regrets" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "regrets_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" text NOT NULL,
	"canvas" jsonb,
	"message" text,
	"color" text DEFAULT '#ccc',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"views" integer DEFAULT 0
);
