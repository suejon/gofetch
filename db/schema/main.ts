import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const article = sqliteTable(
  "article",
  {
    id: integer("id").notNull().primaryKey(),
    articleId: integer("article_id").notNull(),
    title: text("title", { length: 256 }).notNull(),
    content: text("content").notNull(),
    image: text("image", { length: 512 }).notNull(),
    thumbnail: text("thumbnail", { length: 512 }).notNull(),
    sourceUrl: text("source_url", { length: 512 }).notNull(),
    hidden: integer("hidden", { mode: "boolean" }).default(true).notNull(),
    original: integer("original", { mode: "boolean" }).default(false).notNull(),
    lang: text("lang", { length: 2 }).notNull(),
    langFramework: text("lang_framework", { length: 256 }).notNull(),
    lfLevel: text("lf_level", { length: 256 }).notNull(),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text("updated_at"),
    deletedAt: text("deleted_at"),
    author: text("author", { length: 255 }),
    processed: integer("processed", { mode: "boolean" })
      .default(false)
      .notNull(),
  },
  (table) => {
    return {
      articleIdIdx: index("article_id_idx").on(table.articleId),
    };
  },
);

export const articleMorpheme = sqliteTable(
  "article_morpheme",
  {
    article: integer("article").notNull(),
    morpheme: text("morpheme", { length: 255 }).notNull(),
    offset: integer("offset").notNull(),
  },
  (table) => {
    return {
      articleMorphemeArticleMorphemeOffsetPk: primaryKey({
        columns: [table.article, table.morpheme, table.offset],
        name: "article_morpheme_article_morpheme_offset_pk",
      }),
    };
  },
);

export const articleSentence = sqliteTable(
  "article_sentence",
  {
    articleId: integer("article_id").notNull(),
    sourceText: text("source_text").notNull(),
    position: integer("position").notNull(),
  },
  (table) => {
    return {
      articleSentenceArticleIdPositionPk: primaryKey({
        columns: [table.articleId, table.position],
        name: "article_sentence_article_id_position_pk",
      }),
    };
  },
);

export const articleVariantRaw = sqliteTable("article_variant_raw", {
  article: integer("article").notNull(),
  title: text("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  processedAt: text("processed_at"),
  log: text("log"),
});

export const entry = sqliteTable(
  "entry",
  {
    morpheme: text("morpheme", { length: 255 }).notNull(),
    type: text("type", { length: 25 }).notNull(),
    value: text("value"),
  },
  (table) => {
    return {
      entryMorphemeTypePk: primaryKey({
        columns: [table.morpheme, table.type],
        name: "entry_morpheme_type_pk",
      }),
    };
  },
);

export const language = sqliteTable(
  "language",
  {
    code: text("code", { length: 2 }).notNull(),
    name: text("name", { length: 256 }).notNull(),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      languageCodePk: primaryKey({
        columns: [table.code],
        name: "language_code_pk",
      }),
    };
  },
);

export const languageFramework = sqliteTable(
  "language_framework",
  {
    name: text("name", { length: 256 }).notNull(),
    country: text("country", { length: 2 }).notNull(),
    lang: text("lang", { length: 2 }).notNull(),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text("updated_at"),
    deletedAt: text("deleted_at"),
  },
  (table) => {
    return {
      languageFrameworkNamePk: primaryKey({
        columns: [table.name],
        name: "language_framework_name_pk",
      }),
    };
  },
);

export const lfLevel = sqliteTable(
  "lf_level",
  {
    name: text("name", { length: 256 }).notNull(),
    languageFramework: text("language_framework", { length: 256 }).notNull(),
    order: integer("order").notNull(),
  },
  (table) => {
    return {
      lfLevelNameLanguageFrameworkPk: primaryKey({
        columns: [table.name, table.languageFramework],
        name: "lf_level_name_language_framework_pk",
      }),
    };
  },
);

export const morpheme = sqliteTable(
  "morpheme",
  {
    name: text("name", { length: 255 }).notNull(),
    root: text("root", { length: 30 }),
    lang: text("lang", { length: 2 }).notNull(),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      nameIdx: index("name_idx").on(table.name),
      morphemeNamePk: primaryKey({
        columns: [table.name],
        name: "morpheme_name_pk",
      }),
    };
  },
);

export const sentenceTranslation = sqliteTable(
  "sentence_translation",
  {
    source: integer("source").notNull(),
    content: text("content").notNull(),
    srcLang: text("src_lang", { length: 2 }).notNull(),
    trgLang: text("trg_lang", { length: 2 }).notNull(),
    position: integer("position").notNull(),
  },
  (table) => {
    return {
      sentenceTranslationSourceTrgLangPositionPk: primaryKey({
        columns: [table.source, table.trgLang, table.position],
        name: "sentence_translation_source_trg_lang_position_pk",
      }),
    };
  },
);

export const session = sqliteTable(
  "session",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull(),
    userId: text("userId", { length: 255 }).notNull(),
    expires: text("expires").notNull(),
  },
  (table) => {
    return {
      userIdIdx: index("userId_idx").on(table.userId),
      sessionSessionTokenPk: primaryKey({
        columns: [table.sessionToken],
        name: "session_sessionToken_pk",
      }),
    };
  },
);

export const tag = sqliteTable(
  "tag",
  {
    name: text("name", { length: 256 }).notNull(),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text("updated_at"),
    deletedAt: text("deleted_at"),
  },
  (table) => {
    return {
      tagNamePk: primaryKey({ columns: [table.name], name: "tag_name_pk" }),
    };
  },
);

/**
 * Relations
 */
export const articleRelations = relations(article, ({ many, one }) => ({
  articleToTags: many(articleTag),
  lang: one(language, { fields: [article.lang], references: [language.code] }),
  lf: one(languageFramework, {
    fields: [article.langFramework],
    references: [languageFramework.name],
  }),
  lf_level: one(lfLevel, {
    fields: [article.lfLevel, article.langFramework],
    references: [lfLevel.name, lfLevel.languageFramework],
  }),
  sentences: many(articleSentence),
  words: many(articleMorpheme),
}));

export const tagRelation = relations(tag, ({ many }) => ({
  tagToArticles: many(articleTag),
}));

export const articleTag = sqliteTable("article_tags", {
  article: integer("article").notNull(),
  // .references(() => article.articleId),
  tag: text("tag", { length: 256 }).notNull(),
  // .references(() => tag.name),
});

export const lfLang = relations(languageFramework, ({ one }) => ({
  language: one(language, {
    fields: [languageFramework.lang],
    references: [language.code],
  }),
}));

export const avrArtcle = relations(articleVariantRaw, ({ one }) => ({
  article: one(article, {
    fields: [articleVariantRaw.article],
    references: [article.id],
  }),
}));

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

export const morphemeRelations = relations(morpheme, ({ many, one }) => {
  return {
    entries: many(entry),
    lang: one(language),
  };
});

export const entryRelations = relations(entry, ({ one }) => ({
  morpheme: one(morpheme),
}));
