/**
 * Filter.jsx - Todoをフィルタリングするためのコンポーネント
 *
 * このコンポーネントは、ステータスごとにTodoをフィルタリングするための
 * ボタンと統計情報を表示します。
 */

import './Filter.css';

/**
 * Filterコンポーネント
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.currentFilter - 現在のフィルター設定
 * @param {Function} props.onFilterChange - フィルター変更時に呼ばれる関数
 * @param {Object} props.stats - 統計情報オブジェクト
 * @param {Function} props.onClearCompleted - 完了済みTodo削除時に呼ばれる関数
 */
const Filter = ({ currentFilter, onFilterChange, stats, onClearCompleted }) => {
  // --- フィルターボタンの定義 ---

  // 各フィルターの設定（値、表示名、色、アイコン）
  const filters = [
    {
      value: 'all',
      label: 'すべて',
      count: stats.total,
      color: '#6c757d',
      icon: '📋',
    },
    {
      value: 'not-started',
      label: '未完了',
      count: stats.notStarted,
      color: '#6c757d',
      icon: '⭕',
    },
    {
      value: 'in-progress',
      label: '進行中',
      count: stats.inProgress,
      color: '#0d6efd',
      icon: '🔄',
    },
    {
      value: 'completed',
      label: '完了',
      count: stats.completed,
      color: '#198754',
      icon: '✅',
    },
    {
      value: 'on-hold',
      label: '保留中',
      count: stats.onHold,
      color: '#ffc107',
      icon: '⏸️',
    },
  ];

  // --- イベントハンドラー ---

  /**
   * フィルターボタンクリックのハンドラー
   * @param {string} filterValue - 選択されたフィルターの値
   */
  const handleFilterClick = (filterValue) => {
    // 親コンポーネントにフィルター変更を通知
    onFilterChange(filterValue);
  };

  /**
   * 完了済みTodo削除ボタンのハンドラー
   */
  const handleClearCompleted = () => {
    // 完了済みTodoがない場合は何もしない
    if (stats.completed === 0) {
      return;
    }

    // 確認ダイアログを表示
    if (window.confirm(`完了済みのTodo ${stats.completed}件を削除しますか？`)) {
      // 親コンポーネントに削除を通知
      onClearCompleted();
    }
  };

  // --- レンダリング ---

  return (
    <div className="filter-container">
      {/* 統計情報ヘッダー */}
      <div className="filter-header">
        <h3 className="filter-title">フィルター</h3>
        <div className="total-count">
          合計: <strong>{stats.total}</strong>件
        </div>
      </div>

      {/* フィルターボタン群 */}
      <div className="filter-buttons">
        {filters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-button ${
              currentFilter === filter.value ? 'active' : ''
            }`}
            onClick={() => handleFilterClick(filter.value)}
            style={{
              // アクティブなボタンは対応する色を適用
              ...(currentFilter === filter.value && {
                backgroundColor: filter.color,
                borderColor: filter.color,
              }),
            }}
            aria-label={`${filter.label}のTodoを表示`}
            aria-pressed={currentFilter === filter.value}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
            <span className="filter-count">{filter.count}</span>
          </button>
        ))}
      </div>

      {/* アクションボタン */}
      <div className="filter-actions">
        <button
          className="clear-completed-button"
          onClick={handleClearCompleted}
          disabled={stats.completed === 0}
          aria-label="完了済みTodoを削除"
        >
          🗑️ 完了済みを削除 ({stats.completed})
        </button>
      </div>

      {/* 進捗バー */}
      {stats.total > 0 && (
        <div className="progress-section">
          <div className="progress-label">
            進捗状況: {Math.round((stats.completed / stats.total) * 100)}%
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(stats.completed / stats.total) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
