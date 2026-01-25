/**
 * TodoItem.jsx - 個別のTodoアイテムを表示するコンポーネント
 *
 * このコンポーネントは、1つのTodoアイテムの表示と操作を担当します。
 * ステータスの変更、編集、削除機能を提供します。
 */

import { useState } from 'react';
import './TodoItem.css';

/**
 * TodoItemコンポーネント
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Object} props.todo - Todoオブジェクト
 * @param {Function} props.onStatusChange - ステータス変更時に呼ばれる関数
 * @param {Function} props.onEdit - 編集時に呼ばれる関数
 * @param {Function} props.onDelete - 削除時に呼ばれる関数
 */
const TodoItem = ({ todo, onStatusChange, onEdit, onDelete }) => {
  // --- 状態管理 ---

  // isEditing: 編集モードかどうかを管理
  const [isEditing, setIsEditing] = useState(false);

  // editText: 編集中のテキストを管理
  const [editText, setEditText] = useState(todo.text);

  // 📍 編集モードでは期限も編集できるようにする
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  
  // --- ステータス設定 ---

  // 各ステータスの定義（値、表示名、色）
  const statusOptions = [
    { value: 'not-started', label: '未完了', color: '#6c757d' },
    { value: 'in-progress', label: '進行中', color: '#0d6efd' },
    { value: 'completed', label: '完了', color: '#198754' },
    { value: 'on-hold', label: '保留中', color: '#ffc107' },
  ];

  // 現在のステータスの情報を取得
  const currentStatus = statusOptions.find((s) => s.value === todo.status);

  // --- イベントハンドラー ---

  /**
   * ステータス変更のハンドラー
   * @param {Event} e - イベントオブジェクト
   */
  const handleStatusChange = (e) => {
    // selectボックスで選択された新しいステータスを親コンポーネントに通知
    onStatusChange(todo.id, e.target.value);
  };

  /**
   * 編集開始のハンドラー
   */
  const handleEditStart = () => {
    // 編集モードに切り替え
    setIsEditing(true);
    // 編集テキストを現在のTodoのテキストに設定
    setEditText(todo.text);
  };

  /**
   * 編集キャンセルのハンドラー
   */
  const handleEditCancel = () => {
    // 編集モードを終了
    setIsEditing(false);
    // 編集テキストを元に戻す
    setEditText(todo.text);
  };

  /**
   * 編集保存のハンドラー
   */
  const handleEditSave = () => {
    // 空白のみの場合は保存しない
    if (editText.trim()) {
      // 親コンポーネントに編集内容を通知
      onEdit(todo.id, editText, editDueDate || null);  // ← 期限も渡す
      // 編集モードを終了
      setIsEditing(false);
    }
  };

  /**
   * Enterキー押下時のハンドラー
   * @param {KeyboardEvent} e - キーボードイベント
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Enterキーが押されたら保存
      handleEditSave();
    } else if (e.key === 'Escape') {
      // Escapeキーが押されたらキャンセル
      handleEditCancel();
    }
  };

  /**
   * 削除ボタンのハンドラー
   */
  const handleDelete = () => {
    // 確認ダイアログを表示
    if (window.confirm('このTodoを削除しますか？')) {
      // 親コンポーネントに削除を通知
      onDelete(todo.id);
    }
  };

  // --- レンダリング ---

  return (
    <div className="todo-item" data-status={todo.status}>
      {/* ステータス選択セレクトボックス */}
      <select
        className="status-select"
        value={todo.status}
        onChange={handleStatusChange}
        style={{ borderColor: currentStatus?.color }}
        aria-label="ステータスを選択"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Todo内容表示エリア */}
      <div className="todo-content">
        {isEditing ? (
          // 編集モード：入力フィールドを表示
          <div className="edit-mode">
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus // 自動的にフォーカス
              aria-label="Todoテキストを編集"
            />
            <input
              type="date"
              className="date-input"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
            <div className="edit-buttons">
              <button
                className="btn btn-save"
                onClick={handleEditSave}
                aria-label="保存"
              >
                保存
              </button>
              <button
                className="btn btn-cancel"
                onClick={handleEditCancel}
                aria-label="キャンセル"
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          // 表示モード：Todoのテキストとボタンを表示
          <>
            <div className="todo-text-wrapper">
              {/* Todoのテキスト（完了の場合は取り消し線） */}
              <span
                className={`todo-text ${
                  todo.status === 'completed' ? 'completed' : ''
                }`}
              >
                {todo.text}
              </span>
              {/* ← 期限表示を追加 */}
              {todo.dueDate && (
                <span className="due-date">
                  📅 {new Date(todo.dueDate).toLocaleDateString('ja-JP')}
                </span>
              )}
              {/* ステータスバッジ */}
              <span
                className="status-badge"
                style={{ backgroundColor: currentStatus?.color }}
              >
                {currentStatus?.label}
              </span>
            </div>

            {/* アクションボタン */}
            <div className="todo-actions">
              <button
                className="btn btn-edit"
                onClick={handleEditStart}
                aria-label="編集"
              >
                ✏️ 編集
              </button>
              <button
                className="btn btn-delete"
                onClick={handleDelete}
                aria-label="削除"
              >
                🗑️ 削除
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
