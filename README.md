# React Todoアプリ 📝

React で作成された、シンプルで使いやすいTodo管理アプリケーションです。

## 特徴 ✨

- **4つのステータス管理**: 未完了、進行中、完了、保留中
- **データ永続化**: localStorageを使用してブラウザにデータを保存
- **フィルタリング機能**: ステータスごとにTodoを絞り込み表示
- **進捗追跡**: 完了率を視覚的に表示
- **レスポンシブデザイン**: モバイルからデスクトップまで対応
- **直感的なUI**: 使いやすいインターフェース
- **詳細なコメント**: React初心者にも理解しやすいコード

## ステータスの種類 🎯

- **未完了** (not-started): まだ開始していないタスク
- **進行中** (in-progress): 現在作業中のタスク
- **完了** (completed): 完了したタスク
- **保留中** (on-hold): 一時的に保留されているタスク

## セットアップ 🚀

### 必要な環境

- Node.js 18以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/jin0622/react-todo-app.git

# ディレクトリに移動
cd react-todo-app

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

アプリケーションは http://localhost:5173 で起動します。

## 利用可能なスクリプト 📜

```bash
# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションビルドのプレビュー
npm run preview

# ESLintでコードチェック
npm run lint
```

## プロジェクト構造 📁

```
react-todo-app/
├── public/               # 静的アセット
│   └── vite.svg         # アイコン
├── src/                 # ソースコード
│   ├── components/      # Reactコンポーネント
│   │   ├── AddTodo.jsx      # Todo追加フォーム
│   │   ├── AddTodo.css
│   │   ├── Filter.jsx       # フィルターコントロール
│   │   ├── Filter.css
│   │   ├── TodoItem.jsx     # 個別のTodoアイテム
│   │   ├── TodoItem.css
│   │   ├── TodoList.jsx     # Todoリスト
│   │   └── TodoList.css
│   ├── hooks/           # カスタムReactフック
│   │   └── useTodos.js      # Todo状態管理
│   ├── utils/           # ユーティリティ関数
│   │   └── storage.js       # localStorage操作
│   ├── App.jsx          # メインアプリコンポーネント
│   ├── App.css
│   ├── main.jsx         # エントリーポイント
│   └── index.css        # グローバルスタイル
├── index.html           # HTMLテンプレート
├── package.json         # 依存関係とスクリプト
├── vite.config.js       # Vite設定
├── README.md           # このファイル
├── CLAUDE.md           # AIアシスタント向けガイド（英語）
└── CLAUDE_ja.md        # AIアシスタント向けガイド（日本語）
```

## 使い方 📖

### Todoの追加

1. 上部のフォームにタスクを入力
2. 「追加」ボタンをクリック
3. Todoが未完了ステータスで追加されます

### ステータスの変更

各Todoの左側にあるセレクトボックスから、好きなステータスを選択できます。

### Todoの編集

1. 「編集」ボタンをクリック
2. テキストを修正
3. 「保存」ボタンをクリック（またはEnterキーを押す）

### Todoの削除

「削除」ボタンをクリックすると確認ダイアログが表示され、削除できます。

### フィルタリング

フィルターセクションのボタンをクリックして、表示するTodoを絞り込めます：

- **すべて**: 全てのTodoを表示
- **未完了**: 未完了のTodoのみ表示
- **進行中**: 進行中のTodoのみ表示
- **完了**: 完了したTodoのみ表示
- **保留中**: 保留中のTodoのみ表示

### 完了済みTodoの一括削除

「完了済みを削除」ボタンをクリックすると、完了ステータスのTodoを全て削除できます。

## 技術スタック 🛠️

- **React 18.3**: UIライブラリ
- **Vite 6.0**: 高速なビルドツール
- **CSS3**: スタイリング
- **localStorage API**: データ永続化

## ブラウザサポート 🌐

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## ライセンス 📄

MIT License

## 開発者向け情報 👨‍💻

### コードのコメント

このプロジェクトは、React初心者でも理解できるように、すべてのファイルに詳細な日本語コメントが含まれています。各ファイルを読むことで、Reactの基本概念を学ぶことができます。

### AIアシスタント向けガイド

- `CLAUDE.md`: 英語版のガイド
- `CLAUDE_ja.md`: 日本語版のガイド

これらのファイルには、プロジェクト構造、開発ワークフロー、コーディング規約などが詳しく記載されています。

## 貢献 🤝

プルリクエストを歓迎します！大きな変更を加える場合は、まずissueを開いて変更内容を議論してください。

## サポート 💬

問題が発生した場合や質問がある場合は、GitHubのissueセクションで報告してください。

---
# netlifyでデプロイ

# Circle ciにてテスト、ビルド

Made with ❤️ using React
