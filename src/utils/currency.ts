/**
 * 통화 및 수치 포맷팅 유틸리티 (일본 엔화 JPY ￥ 기준)
 */

/**
 * 금액을 일본 엔화 ￥ 표기로 포맷팅
 * isPrivate가 true인 경우 마스킹 처리
 */
export const formatJPY = (amount: number): string => {
  return `￥ ${Math.round(amount).toLocaleString('ko-KR')}`;
};

/**
 * 억 엔 / 만 엔 단위 축약 표기
 * 예: 50,000,000 -> "5,000만 엔"
 * 예: 150,000,000 -> "1.5억 엔"
 */
export const formatJPYShort = (amount: number): string => {
  if (Math.abs(amount) >= 100000000) {
    return `${(amount / 100000000).toFixed(2)}억 엔`;
  }
  if (Math.abs(amount) >= 10000) {
    return `${Math.round(amount / 10000).toLocaleString('ko-KR')}만 엔`;
  }
  return `￥ ${Math.round(amount).toLocaleString('ko-KR')}`;
};

/**
 * 시각화 차트 축 표기용 (만 엔 / 억 엔 단위)
 */
export const formatChartAxisJPY = (amount: number): string => {
  if (Math.abs(amount) >= 100000000) {
    return `${(amount / 100000000).toFixed(1)}억 엔`;
  }
  return `${Math.round(amount / 10000)}만 엔`;
};
