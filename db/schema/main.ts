import {
  mysqlTable,
  index,
  primaryKey,
  varchar,
  int,
  text,
  unique,
  serial,
  tinyint,
  timestamp,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";

export const account = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refreshToken: varchar("refresh_token", { length: 255 }),
    accessToken: varchar("access_token", { length: 255 }),
    expiresAt: int("expires_at"),
    tokenType: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    idToken: text("id_token"),
    sessionState: varchar("session_state", { length: 255 }),
  },
  (table) => {
    return {
      userIdIdx: index("userId_idx").on(table.userId),
      accountProviderProviderAccountIdPk: primaryKey({
        columns: [table.provider, table.providerAccountId],
        name: "account_provider_providerAccountId_pk",
      }),
    };
  },
);

export const article = mysqlTable(
  "article",
  {
    id: serial("id").notNull().primaryKey(),
    articleId: int("article_id").notNull(),
    title: varchar("title", { length: 256 }).notNull(),
    content: text("content").notNull(),
    image: varchar("image", { length: 512 }).notNull(),
    thumbnail: varchar("thumbnail", { length: 512 }).notNull(),
    sourceUrl: varchar("source_url", { length: 512 }).notNull(),
    hidden: tinyint("hidden").default(1).notNull(),
    original: tinyint("original").default(0).notNull(),
    lang: varchar("lang", { length: 2 }).notNull(),
    langFramework: varchar("lang_framework", { length: 256 }).notNull(),
    lfLevel: varchar("lf_level", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).onUpdateNow(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
    author: varchar("author", { length: 255 }),
    processed: tinyint("processed").default(0).notNull(),
  },
  (table) => {
    return {
      articleIdIdx: index("article_id_idx").on(table.articleId),
    };
  },
);

export const articleMorpheme = mysqlTable(
  "article_morpheme",
  {
    article: int("article").notNull(),
    morpheme: varchar("morpheme", { length: 255 }).notNull(),
    offset: int("offset").notNull(),
  },
  (table) => {
    return {
      articleMorpheme: index("article_morpheme").on(table.article),
      articleMorphemeArticleMorphemeOffsetPk: primaryKey({
        columns: [table.article, table.morpheme, table.offset],
        name: "article_morpheme_article_morpheme_offset_pk",
      }),
    };
  },
);

export const articleSentence = mysqlTable(
  "article_sentence",
  {
    articleId: int("article_id").notNull(),
    sourceText: text("source_text").notNull(),
    position: int("position").notNull(),
  },
  (table) => {
    return {
      articleIdIdx: index("article_id_idx").on(table.articleId),
      articleSentenceArticleIdPositionPk: primaryKey({
        columns: [table.articleId, table.position],
        name: "article_sentence_article_id_position_pk",
      }),
    };
  },
);

export const articleVariantRaw = mysqlTable("article_variant_raw", {
  article: serial("article").notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  processedAt: timestamp("processed_at", { mode: "string" }),
  log: text("log"),
});

export const entry = mysqlTable(
  "entry",
  {
    morpheme: varchar("morpheme", { length: 255 }).notNull(),
    type: varchar("type", { length: 25 }).notNull(),
    value: text("value"),
  },
  (table) => {
    return {
      entry: index("entry").on(table.morpheme, table.type),
      entryMorphemeTypePk: primaryKey({
        columns: [table.morpheme, table.type],
        name: "entry_morpheme_type_pk",
      }),
    };
  },
);

export const language = mysqlTable(
  "language",
  {
    code: varchar("code", { length: 2 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
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

export const languageFramework = mysqlTable(
  "language_framework",
  {
    name: varchar("name", { length: 256 }).notNull(),
    country: varchar("country", { length: 2 }).notNull(),
    lang: varchar("lang", { length: 2 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).onUpdateNow(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
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

export const lfLevel = mysqlTable(
  "lf_level",
  {
    name: varchar("name", { length: 256 }).notNull(),
    languageFramework: varchar("language_framework", { length: 256 }).notNull(),
    order: int("order").notNull(),
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

export const morpheme = mysqlTable(
  "morpheme",
  {
    name: varchar("name", { length: 255 }).notNull(),
    root: varchar("root", { length: 30 }),
    lang: varchar("lang", { length: 2 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
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

export const sentenceTranslation = mysqlTable(
  "sentence_translation",
  {
    source: int("source").notNull(),
    content: text("content").notNull(),
    srcLang: varchar("src_lang", { length: 2 }).notNull(),
    trgLang: varchar("trg_lang", { length: 2 }).notNull(),
    position: int("position").notNull(),
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

export const session = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "string" }).notNull(),
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

export const tag = mysqlTable(
  "tag",
  {
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).onUpdateNow(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => {
    return {
      tagNamePk: primaryKey({ columns: [table.name], name: "tag_name_pk" }),
    };
  },
);

export const user = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified", {
      fsp: 3,
      mode: "string",
    }).default(sql`CURRENT_TIMESTAMP(3)`),
    image: varchar("image", { length: 255 }),
  },
  (table) => {
    return {
      userIdPk: primaryKey({ columns: [table.id], name: "user_id_pk" }),
    };
  },
);

export const verificationToken = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      verificationTokenIdentifierTokenPk: primaryKey({
        columns: [table.identifier, table.token],
        name: "verificationToken_identifier_token_pk",
      }),
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

export const articleTag = mysqlTable("article_tags", {
  article: int("article").notNull(),
  // .references(() => article.articleId),
  tag: varchar("tag", { length: 256 }).notNull(),
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
