import { relations, sql } from "drizzle-orm";
import {
  serial,
  timestamp,
  varchar,
  text,
  boolean,
  int,
  primaryKey,
  index,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const article = mySqlTable(
  "article",
  {
    id: serial("id").primaryKey(),
    articleId: int("article_id").notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    author: varchar("author", { length: 256 }),
    content: text("content").notNull(),
    image: varchar("image", { length: 512 }).notNull(),
    thumbnail: varchar("thumbnail", { length: 512 }).notNull(),
    sourceUrl: varchar("source_url", { length: 512 }).notNull(),
    hidden: boolean("hidden").default(true).notNull(), // NOTE: all articles will be hidden until marked available
    original: boolean("original").default(false).notNull(), // NOTE: an articleId will onnly have one original
    lang: varchar("lang", { length: 2 }).notNull(),
    lf: varchar("lang_framework", { length: 256 }).notNull(),
    lf_level: varchar("lf_level", { length: 256 }).notNull(),
    processed: boolean("processed").default(false).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    articleId: index("article_id_idx").on(table.articleId),
  }),
);

export const articleRelations = relations(article, ({ many, one }) => ({
  articleToTags: many(articleTag),
  lang: one(language, { fields: [article.lang], references: [language.code] }),
  lf: one(languageFramework, {
    fields: [article.lf],
    references: [languageFramework.name],
  }),
  lf_level: one(lf_level, {
    fields: [article.lf_level, article.lf],
    references: [lf_level.name, lf_level.languageFramework],
  }),
  sentences: many(articleSentence),
  words: many(articleMorpheme),
}));

export const tag = mySqlTable("tag", {
  name: varchar("name", { length: 256 }).notNull().primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
  deletedAt: timestamp("deleted_at"),
});

export const tagRelation = relations(tag, ({ many }) => ({
  tagToArticles: many(articleTag),
}));

export const articleTag = mySqlTable("article_tags", {
  article: int("article").notNull(),
  // .references(() => article.articleId),
  tag: varchar("tag", { length: 256 }).notNull(),
  // .references(() => tag.name),
});

export const language = mySqlTable("language", {
  code: varchar("code", { length: 2 }).notNull().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
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
  language: one(language, {
    fields: [languageFramework.lang],
    references: [language.code],
  }),
}));

export const lf_level = mySqlTable(
  "lf_level",
  {
    name: varchar("name", { length: 256 }).notNull(),
    languageFramework: varchar("language_framework", { length: 256 }).notNull(),
    // .references(() => languageFramework.name),
    order: int("order").notNull(),
  },
  (lf_level) => ({
    compoundKey: primaryKey({
      columns: [lf_level.name, lf_level.languageFramework],
    }),
  }),
);

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
  article: one(article, {
    fields: [articleVariantRaw.article],
    references: [article.id],
  }),
}));

export const articleSentence = mySqlTable(
  "article_sentence",
  {
    articleId: int("article_id").notNull(),
    source_text: text("source_text").notNull(),
    position: int("position").notNull(),
  },
  (table) => ({
    articleId: index("article_id_idx").on(table.articleId),
    compoundKey: primaryKey({
      columns: [table.articleId, table.position],
    }),
  }),
);

export const articleSentenceRelations = relations(
  articleSentence,
  ({ one, many }) => {
    return {
      article: one(article, {
        fields: [articleSentence.articleId],
        references: [article.id],
      }),
      translations: many(sentenceTranslation),
    };
  },
);

export const sentenceTranslation = mySqlTable(
  "sentence_translation",
  {
    source: int("source"),
    content: text("content").notNull(),
    srcLang: varchar("src_lang", { length: 2 }).notNull(),
    trgLang: varchar("trg_lang", { length: 2 }).notNull(),
    position: int("position").notNull(),
  },
  (table) => ({
    compoundKey: primaryKey({
      columns: [table.source, table.trgLang, table.position],
    }),
  }),
);

export const sentenceTranslationRelations = relations(
  sentenceTranslation,
  ({ one }) => {
    return {
      senetence: one(articleSentence),
      srcLang: one(language),
      trgLang: one(language),
    };
  },
);

export const morpheme = mySqlTable(
  "morpheme",
  {
    name: varchar("name", { length: 255 }).notNull().primaryKey(),
    root: varchar("root", { length: 30 }),
    size: int("size").notNull(),
    lang: varchar("lang", { length: 2 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    morphemeId: index("name_idx").on(table.name),
  }),
);

export const morphemeRelations = relations(morpheme, ({ many, one }) => {
  return {
    entries: many(entry),
    lang: one(language),
  };
});

export const entry = mySqlTable(
  "entry",
  {
    morpheme: varchar("morpheme", { length: 255 }).notNull(),
    type: varchar("type", { length: 25 }).notNull(),
    value: text("value"),
  },
  (table) => ({
    entry: index("entry").on(table.morpheme, table.type),
    compoundKey: primaryKey({
      columns: [table.morpheme, table.type],
    }),
  }),
);

export const entryRelations = relations(entry, ({ one }) => ({
  morpheme: one(morpheme),
}));

export const articleMorpheme = mySqlTable(
  "article_morpheme",
  {
    article: int("article").notNull(),
    morpeheme: varchar("morpheme", { length: 255 }).notNull(),
    offset: int("offset").notNull(),
  },
  (table) => ({
    article_morpheme: index("article_morpheme").on(table.article),
    compoundKey: primaryKey({
      columns: [table.article, table.morpeheme, table.offset],
    }),
  }),
);
