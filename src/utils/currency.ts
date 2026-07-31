/**
 * Financial OS — Currency Utility (JPY Primary)
 * 日本円（JPY）をメイン通貨として使用
 */

export type Currency = 'JPY' | 'USD' | 'EUR';

/**
 * 金額を日本円表記にフォーマット
 * isPrivate が true の場合は金額をマスク
 */
export function formatJPY(amount: number, isPrivate = false): string {
  if (isPrivate) return '¥ ••••••';
  return `¥ ${amount.toLocaleString('ja-JP')}`;
}

/**
 * 億円・万円単位の短縮表記
 * 例: 50,000,000 → "5,000万円"
 */
export function formatJPYShort(amount: number, isPrivate = false): string {
  if (isPrivate) return '¥ ••••';
  if (amount >= 100000000) {
    return `${(amount / 100000000).toFixed(2)}億円`;
  }
  if (amount >= 10000) {
    return `${Math.round(amount / 10000).toLocaleString('ja-JP')}万円`;
  }
  return `¥${amount.toLocaleString('ja-JP')}`;
}

/**
 * チャート表示用 (万円単位)
 */
export function toManYen(amount: number): number {
  return Number((amount / 10000).toFixed(1));
}
