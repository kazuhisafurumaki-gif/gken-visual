// G検定ビジュアル教材 Service Worker（オフライン対応）
const CACHE = 'gken-visual-v18';
const ASSETS = [
  './',
  './00_目次.html',
  './学習ノート.html',
  './01_畳み込み出力サイズ.html',
  './02_線形回帰.html',
  './03_ロジスティック回帰.html',
  './04_直線で分類する失敗例.html',
  './05_SVMマージン最大化.html',
  './06_決定木.html',
  './07_ランダムフォレスト.html',
  './08_勾配ブースティング.html',
  './09_kNN.html',
  './10_評価指標.html',
  './11_ROC曲線とAUC.html',
  './12_AUCの大きさ.html',
  './13_画像タスクの粒度.html',
  './14_物体検出2段階vs1段階.html',
  './15_DilatedConvolution.html',
  './16_SelectiveSearch.html',
  './17_BERTvsGPT.html',
  './18_強化学習グリッドワールド.html',
  './19_NN学習サイクル.html',
  './20_AI年表とブーム.html',
  './21_正則化L1L2.html',
  './22_正規化4種.html',
  './23_セグメンテーション3種.html',
  './24_機械学習の地図.html',
  './marked.min.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// キャッシュ優先（オフラインでも動く）。無ければネットから取得してキャッシュ。
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return resp;
    }).catch(() => r))
  );
});
