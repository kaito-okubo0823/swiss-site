# スイスサイト (swiss-site)

スイスの飲食店向け 月額制ウェブサイト テンプレート

## 概要

- **対象**: スイスのレストラン・カフェ・バー
- **価格**: 月額 CHF 149〜249
- **デモ店舗**: Alpine Kitchen（チューリッヒ）

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- next-intl (多言語: DE / FR / IT / EN)
- microCMS / Newt (CMS · Phase 3)
- Resend (メール送信 · Phase 3)
- Vercel (ホスティング)

## 開発

```bash
npm install
npm run dev
```

http://localhost:3000 にアクセス（自動で `/de` にリダイレクト）

## ビルド

```bash
npm run build
npm run start
```

## ディレクトリ

```
src/
├── app/[locale]/        # 多言語対応の各ページ
├── components/          # 共通コンポーネント
├── i18n/                # next-intl 設定
└── middleware.ts        # ロケールルーティング

messages/                # 翻訳ファイル (de/fr/it/en)
```

## 進捗

- [x] Phase 1: プロジェクト基盤
- [ ] Phase 2: 全8ページ実装
- [ ] Phase 3: CMS・予約・チャットBot
- [ ] Phase 4: SEO・パフォーマンス・法的ページ
