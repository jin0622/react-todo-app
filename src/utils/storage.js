/**
 * storage.js - localStorageを使用したデータ永続化ユーティリティ
 *
 * このファイルには、TodoデータをブラウザのlocalStorageに保存・読み込みするための
 * 関数が含まれています。
 */

// localStorageのキー名（このキーでTodoデータを保存します）
const STORAGE_KEY = 'react-todo-app-todos';

/**
 * localStorageからTodoリストを読み込む
 * @returns {Array} Todoオブジェクトの配列。エラーが発生した場合は空配列を返す
 */
export const loadTodos = () => {
  try {
    // localStorageからデータを取得
    const storedTodos = localStorage.getItem(STORAGE_KEY);

    // データが存在しない場合は空配列を返す
    if (!storedTodos) {
      return [];
    }

    // JSON文字列をJavaScriptオブジェクトに変換して返す
    return JSON.parse(storedTodos);
  } catch (error) {
    // エラーが発生した場合（JSONパースエラーなど）
    console.error('Todoの読み込みに失敗しました:', error);
    // エラー時は空配列を返す（アプリは正常に動作し続ける）
    return [];
  }
};

/**
 * TodoリストをlocalStorageに保存する
 * @param {Array} todos - 保存するTodoオブジェクトの配列
 * @returns {boolean} 保存が成功したかどうか
 */
export const saveTodos = (todos) => {
  try {
    // JavaScriptオブジェクトをJSON文字列に変換
    const todosJson = JSON.stringify(todos);

    // localStorageに保存
    localStorage.setItem(STORAGE_KEY, todosJson);

    return true; // 保存成功
  } catch (error) {
    // エラーが発生した場合（容量超過など）
    console.error('Todoの保存に失敗しました:', error);
    return false; // 保存失敗
  }
};

/**
 * localStorageからすべてのTodoデータを削除する
 * @returns {boolean} 削除が成功したかどうか
 */
export const clearTodos = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Todoのクリアに失敗しました:', error);
    return false;
  }
};
