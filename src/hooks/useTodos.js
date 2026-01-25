/**
 * useTodos.js - Todo状態管理のためのカスタムReactフック
 *
 * このフックは、Todoの追加、更新、削除、フィルタリングなどの
 * すべてのTodo関連ロジックを管理します。
 */

import { useState, useEffect } from 'react';
import { loadTodos, saveTodos } from '../utils/storage';

/**
 * Todoの状態管理を行うカスタムフック
 * @returns {Object} Todo操作用の関数と状態
 */
export const useTodos = () => {
  // --- 状態管理 ---

  // todos: 全てのTodoアイテムを保持する配列
  const [todos, setTodos] = useState([]);

  // filter: 現在のフィルター設定（'all', 'not-started', 'in-progress', 'completed', 'on-hold'）
  const [filter, setFilter] = useState('all');

  // --- 初期化処理 ---

  // コンポーネントがマウントされた時に1回だけ実行される
  useEffect(() => {
    // localStorageからTodoデータを読み込む
    const loadedTodos = loadTodos();
    setTodos(loadedTodos);
  }, []); // 空の依存配列なので、初回レンダリング時のみ実行

  // --- Todoデータが変更された時の処理 ---

  // todosが変更されるたびにlocalStorageに保存する
  useEffect(() => {
    // 初回レンダリング時は保存しない（読み込んだ直後なので）
    if (todos.length > 0 || todos.length === 0) {
      saveTodos(todos);
    }
  }, [todos]); // todosが変更されるたびに実行

  // --- Todo操作関数 ---

  /**
   * 新しいTodoを追加する
   * @param {string} text - Todoのテキスト
   * @param {string} dueDate - Todoの期限
   */
  const addTodo = (text, dueDate) => {
    // 空白のみのテキストは追加しない
    if (!text.trim()) {
      return;
    }

    // 新しいTodoオブジェクトを作成
    const newTodo = {
      id: Date.now(), // 現在のタイムスタンプを一意のIDとして使用
      text: text.trim(), // 前後の空白を削除
      status: 'not-started', // 初期状態は「未完了」
      dueDate: dueDate,  // ← 期限を追加
      createdAt: new Date().toISOString(), // 作成日時（ISO形式）
      updatedAt: new Date().toISOString(), // 更新日時（ISO形式）
    };

    // 既存のTodo配列の先頭に新しいTodoを追加
    setTodos([newTodo, ...todos]);
  };

  /**
   * Todoのステータスを変更する
   * @param {number} id - 変更するTodoのID
   * @param {string} newStatus - 新しいステータス
   */
  const updateTodoStatus = (id, newStatus) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo, // 既存のプロパティをコピー
              status: newStatus, // ステータスを更新
              updatedAt: new Date().toISOString(), // 更新日時を現在時刻に
            }
          : todo // IDが一致しないTodoはそのまま
      )
    );
  };

  /**
   * Todoのテキストを編集する
   * @param {number} id - 編集するTodoのID
   * @param {string} newText - 新しいテキスト
   * @param {string} newDueDate - Todoの期限
   */
  const editTodo = (id, newText, newDueDate) => {
    // 空白のみのテキストには変更しない
    if (!newText.trim()) {
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              text: newText.trim(),
              dueDate: newDueDate, // 期限を更新
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  };

  /**
   * Todoを削除する
   * @param {number} id - 削除するTodoのID
   */
  const deleteTodo = (id) => {
    // 指定されたID以外のTodoだけを残す（フィルタリング）
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  /**
   * 完了したTodoをすべて削除する
   */
  const clearCompleted = () => {
    // ステータスが'completed'以外のTodoだけを残す
    setTodos(todos.filter((todo) => todo.status !== 'completed'));
  };

  /**
   * すべてのTodoを削除する
   */
  const clearAllTodos = () => {
    setTodos([]);
  };

  // --- フィルタリング処理 ---

  /**
   * 現在のフィルター設定に基づいてTodoをフィルタリング
   * @returns {Array} フィルタリングされたTodo配列
   */
  const getFilteredTodos = () => {
    // 'all'の場合はすべてのTodoを返す
    if (filter === 'all') {
      return todos;
    }

    // それ以外の場合は、ステータスが一致するTodoのみを返す
    return todos.filter((todo) => todo.status === filter);
  };

  // --- 統計情報 ---

  /**
   * ステータスごとのTodo数を計算
   * @returns {Object} 各ステータスのカウント
   */
  const getStats = () => {
    return {
      total: todos.length, // 全体数
      notStarted: todos.filter((t) => t.status === 'not-started').length, // 未完了
      inProgress: todos.filter((t) => t.status === 'in-progress').length, // 進行中
      completed: todos.filter((t) => t.status === 'completed').length, // 完了
      onHold: todos.filter((t) => t.status === 'on-hold').length, // 保留中
    };
  };

  // --- フックから返す値 ---

  // このフックを使用するコンポーネントは、これらの値と関数にアクセスできる
  return {
    // 状態
    todos: getFilteredTodos(), // フィルタリングされたTodo
    allTodos: todos, // フィルタリング前の全Todo
    filter, // 現在のフィルター設定
    stats: getStats(), // 統計情報

    // Todo操作関数
    addTodo,
    updateTodoStatus,
    editTodo,
    deleteTodo,
    clearCompleted,
    clearAllTodos,

    // フィルター操作関数
    setFilter,
  };
};
