/**
 * AddTodo.jsx - 新しいTodoを追加するためのコンポーネント
 *
 * このコンポーネントは、ユーザーが新しいTodoを入力して追加するための
 * フォームを提供します。
 */

import { useState } from 'react';
import './AddTodo.css';

/**
 * AddTodoコンポーネント
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Function} props.onAdd - Todo追加時に呼ばれる関数
 */
const AddTodo = ({ onAdd }) => {
  // --- 状態管理 ---

  // inputValue: 入力フィールドの値を管理
  const [inputValue, setInputValue] = useState('');

  // --- イベントハンドラー ---

  /**
   * フォーム送信のハンドラー
   * @param {Event} e - イベントオブジェクト
   */
  const handleSubmit = (e) => {
    // デフォルトのフォーム送信動作（ページリロード）を防ぐ
    e.preventDefault();

    // 入力値が空白のみでないかチェック
    if (inputValue.trim()) {
      // 親コンポーネントにTodo追加を通知
      onAdd(inputValue);

      // 入力フィールドをクリア
      setInputValue('');
    }
  };

  /**
   * 入力フィールド変更のハンドラー
   * @param {Event} e - イベントオブジェクト
   */
  const handleInputChange = (e) => {
    // 入力値を状態に反映
    setInputValue(e.target.value);
  };

  // --- レンダリング ---

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="form-title">📝 新しいTodoを追加</h2>
      </div>

      <div className="input-group">
        {/* Todo入力フィールド */}
        <input
          type="text"
          className="todo-input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="やることを入力してください..."
          aria-label="新しいTodoを入力"
          maxLength={200} // 最大文字数を制限
        />
        {/* 期限を追加 */}
        <input
          type="date"
          className="due-date-input"
          value={inputValue.dueDate || ''}
          aria-label="期限を選択"
        />

        {/* 追加ボタン */}
        <button
          type="submit"
          className="add-button"
          disabled={!inputValue.trim()} // 入力がない場合は無効化
          aria-label="Todoを追加"
        >
          ➕ 追加
        </button>
      </div>

      {/* 文字数カウンター */}
      <div className="character-count">
        {inputValue.length}/200文字
      </div>
    </form>
  );
};

export default AddTodo;
