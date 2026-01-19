/**
 * TodoList.jsx - Todoリストを表示するコンポーネント
 *
 * このコンポーネントは、複数のTodoItemコンポーネントをリスト形式で表示します。
 * Todoがない場合は適切なメッセージを表示します。
 */

import TodoItem from './TodoItem';
import './TodoList.css';

/**
 * TodoListコンポーネント
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.todos - 表示するTodo配列
 * @param {Function} props.onStatusChange - ステータス変更時に呼ばれる関数
 * @param {Function} props.onEdit - 編集時に呼ばれる関数
 * @param {Function} props.onDelete - 削除時に呼ばれる関数
 * @param {string} props.currentFilter - 現在のフィルター設定
 */
const TodoList = ({
  todos,
  onStatusChange,
  onEdit,
  onDelete,
  currentFilter,
}) => {
  // --- フィルター名の取得 ---

  // フィルター値に対応する日本語名を取得
  const getFilterName = () => {
    const filterNames = {
      all: 'すべて',
      'not-started': '未完了',
      'in-progress': '進行中',
      completed: '完了',
      'on-hold': '保留中',
    };
    return filterNames[currentFilter] || 'すべて';
  };

  // --- 空の状態の判定 ---

  // Todoが1つもない場合
  if (todos.length === 0) {
    return (
      <div className="todo-list-container">
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3 className="empty-title">Todoがありません</h3>
          <p className="empty-message">
            {currentFilter === 'all'
              ? '上のフォームから新しいTodoを追加してみましょう！'
              : `「${getFilterName()}」のTodoはありません`}
          </p>
        </div>
      </div>
    );
  }

  // --- レンダリング ---

  return (
    <div className="todo-list-container">
      {/* リストヘッダー */}
      <div className="list-header">
        <h3 className="list-title">
          {getFilterName()}のTodo ({todos.length}件)
        </h3>
      </div>

      {/* Todoリスト */}
      <div className="todo-list" role="list">
        {todos.map((todo) => (
          // 各Todoアイテムをレンダリング
          // keyプロパティは、Reactがリストアイテムを効率的に更新するために必要
          <TodoItem
            key={todo.id}
            todo={todo}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
