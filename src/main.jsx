/**
 * main.jsx - アプリケーションのエントリーポイント
 *
 * このファイルは、Reactアプリケーションを起動し、
 * ルートコンポーネント（App）をDOMにマウントします。
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * アプリケーションの初期化
 *
 * 1. DOMからroot要素を取得
 * 2. createRootでReactのルートを作成
 * 3. StrictModeでラップしてAppコンポーネントをレンダリング
 *
 * StrictMode: 開発時に潜在的な問題を検出するためのツール
 * - 非推奨のAPIの使用を警告
 * - 副作用のチェックのために、コンポーネントを二重レンダリング
 * - 本番ビルドでは影響なし
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
