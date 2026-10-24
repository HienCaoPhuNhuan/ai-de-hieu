/* Set this only after the site owner has created a GoatCounter site.
   Example: https://YOUR-CODE.goatcounter.com/count
   This is a public endpoint, never an API key. Empty means no analytics. */
const ANALYTICS_ENDPOINT = 'https://taphuanai.goatcounter.com/count';
if (ANALYTICS_ENDPOINT && location.hostname === 'hiencaophunhuan.github.io') {
  try {
    const endpoint = new URL(ANALYTICS_ENDPOINT);
    if (!/^https:\/\/[a-z0-9-]+\.goatcounter\.com\/count$/.test(endpoint.href)) throw Error('Invalid analytics endpoint');
    window.goatcounter = {path: '/ai-de-hieu/', title: 'AI, nhìn là hiểu', referrer: ''};
    const trackingScript = document.createElement('script');
    trackingScript.async = true;
    trackingScript.dataset.goatcounter = endpoint.href;
    trackingScript.src = 'https://gc.zgo.at/count.js';
    document.head.append(trackingScript);
    document.getElementById('analyticsNotice').textContent = 'Website sử dụng GoatCounter để thống kê lượt xem. Không gửi nội dung biểu mẫu, ảnh thử nghiệm hoặc đường dẫn mô hình vào thống kê. Lượt xem không đồng nghĩa số người; trình chặn theo dõi có thể làm thiếu lượt.';
  } catch { /* A configuration error must not interrupt the lesson. */ }
}
