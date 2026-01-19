/**
 * App.jsx - メインアプリケーションコンポーネント
 *
 * このコンポーネントは、Todoアプリケーション全体を統括します。
 * 各子コンポーネントを配置し、状態管理フック（useTodos）を使用して
 * アプリケーションの状態を管理します。
 */

import { useTodos } from './hooks/useTodos';
import AddTodo from './components/AddTodo';
import Filter from './components/Filter';
import TodoList from './components/TodoList';
import './App.css';

/**
 * Appコンポーネント（アプリケーションのルートコンポーネント）
 */
function App() {
  // --- カスタムフックからTodo関連の状態と関数を取得 ---

  // useTodosフックから、Todoの状態と操作関数を全て取得
  const {
    todos, // フィルタリングされたTodo配列
    filter, // 現在のフィルター設定
    stats, // 統計情報（各ステータスの件数など）
    addTodo, // Todo追加関数
    updateTodoStatus, // ステータス更新関数
    editTodo, // Todo編集関数
    deleteTodo, // Todo削除関数
    clearCompleted, // 完了済みTodo削除関数
    setFilter, // フィルター設定関数
  } = useTodos();

  // --- レンダリング ---

  return (
    <div className="app">
      {/* ヘッダー */}
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">
            <span className="title-icon">✨</span>
            React Todoアプリ
            <span className="title-icon">✨</span>
          </h1>
          <p className="app-subtitle">
            効率的にタスクを管理しましょう！
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="app-main">
        <div className="container">
          {/* Todo追加フォーム */}
          <AddTodo onAdd={addTodo} />

          {/* フィルターと統計情報 */}
          <Filter
            currentFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
            onClearCompleted={clearCompleted}
          />

          {/* Todoリスト */}
          <TodoList
            todos={todos}
            onStatusChange={updateTodoStatus}
            onEdit={editTodo}
            onDelete={deleteTodo}
            currentFilter={filter}
          />
        </div>
      </main>

      {/* フッター */}
      <footer className="app-footer">
        <div className="container">
          <p>
            Made with <span className="heart">❤️</span> using React
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
