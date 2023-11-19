
import { relations, sql } from "drizzle-orm";
import { serial, timestamp, varchar, text, boolean, int, primaryKey, index } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const article = mySqlTable("article", {
  id: serial("id").primaryKey(),
  articleId: int("article_id").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  image: varchar("image", { length: 512 }).notNull(),
  thumbnail: varchar("thumbnail", { length: 512 }).notNull(),
  sourceUrl: varchar("source_url", { length: 512 }).notNull(),
  hidden: boolean("hidden").default(true).notNull(),
  original: boolean("original").default(false).notNull(),
  lang: varchar("lang", { length: 2 }).notNull(),
  lf: varchar("lang_framework", { length: 256 }).notNull(),
  lf_level: varchar("lf_level", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
  deletedAt: timestamp("deleted_at"),
}, (table) => ({
  articleId: index("article_id_idx").on(table.articleId)
}));

export const articleRelations = relations(article, ({ many, one }) => ({
  articleToTags: many(articleTag),
  lang: one(language, { fields: [article.lang], references: [language.code] }),
  lf: one(languageFramework, { fields: [article.lf], references: [languageFramework.name] }),
  lf_level: one(lf_level, { fields: [article.lf_level, article.lf], references: [lf_level.name, lf_level.languageFramework] })
}))

export const tag = mySqlTable("tag", {
  name: varchar("name", { length: 256 }).notNull().primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
  deletedAt: timestamp("deleted_at"),
});

export const tagRelation = relations(tag, ({ many }) => ({
  tagToArticles: many(articleTag)
}))

export const articleTag = mySqlTable('article_tags', ({
  article: int("article").notNull().references(() => article.articleId),
  tag: varchar("tag", { length: 256 }).notNull().references(() => tag.name),
}))

export const language = mySqlTable("language", {
  code: varchar("code", { length: 2 }).notNull().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
});

export const languageFramework = mySqlTable("language_framework", {
  name: varchar("name", { length: 256 }).notNull().primaryKey(),
  country: varchar("country", { length: 2 }).notNull(), // some lfs don't belong to a single contry - e.g. english 
  lang: varchar("lang", { length: 2 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
  deletedAt: timestamp("deleted_at"),
});

export const lfLang = relations(languageFramework, ({ one }) => ({
  language: one(language, { fields: [languageFramework.lang], references: [language.code] }),
}));

export const lf_level = mySqlTable("lf_level", {
  name: varchar("name", { length: 256 }).notNull(),
  languageFramework: varchar("language_framework", { length: 256 }).notNull().references(() => languageFramework.name),
  order: int("order").notNull()
},
  (lf_level) => ({
    compoundKey: primaryKey(lf_level.name, lf_level.languageFramework)
  }));


export const articleVariantRaw = mySqlTable("article_variant_raw", {
  article: serial("article"),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  processedAt: timestamp("processed_at"),
  log: text("log"),
});

export const avrArtcle = relations(articleVariantRaw, ({ one }) => ({
  article: one(article, { fields: [articleVariantRaw.article], references: [article.id] })
}))

