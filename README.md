# CoreDev App

Expo tabanlı React Native öğrenme uygulaması. İçerik modeli programlama, sistem, ağ, veritabanı, güvenlik, test, web ve donanım modüllerini JSON kaynaklarından okur; uygulama tarafı bu kaynakları dashboard, konu, ders, algoritma, timeline ve teknik kılavuz ekranlarına taşır.

## Stack

- Expo 54
- React Native 0.81
- React 19
- TypeScript strict mode
- React Navigation v7

## Kurulum

```bash
npm install
npm run start
```

Platform hedefleri:

```bash
npm run ios
npm run android
npm run web
```

## Kontroller

```bash
npm run typecheck
npm run lint
npm run format:check
```

## Mimari

- `src/data/modules/*.json`: öğrenme modülleri için ana kaynak.
- `src/data/algorithms.json`: algoritma kısa başvuru verisi.
- `src/data/timeline.json`: teknoloji tarihi timeline verisi.
- `src/data/reference.json`: teknik kılavuz komut setleri.
- `src/screens/*`: navigation ekranları.
- `src/components/*`: ortak görsel primitives.
- `src/theme/*`: renk, tipografi ve spacing tokenları.
- `src/types.ts`: veri modeli ve navigation param tipleri.

## İçerik Ekleme

Yeni modül eklerken `src/data/modules/` altına aynı şemayı izleyen bir JSON dosyası ekle ve `src/data/index.ts` içindeki `allModules` listesine dahil et. Ekranlar JSON'u kaynak kabul eder; aynı içeriğin ikinci bir TypeScript sabitinde tutulmaması gerekir.

## Screenshot

Screenshot alanı bilinçli olarak boş bırakıldı. Uygulama gerçek cihaz ya da simulator üzerinde açıldıktan sonra dashboard, konu detayı ve ders ekranı görüntüleri buraya eklenebilir.
