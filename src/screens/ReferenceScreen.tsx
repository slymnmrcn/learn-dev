import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { Container as ThemedContainer, Text, ScreenHeader, Badge } from '../components/Themed';
import { MetricGrid, PressableCard, SectionHeader } from '../components/StudyUI';
import { theme as AppTheme } from '../theme';

const REFERENCE_DATA = [
  {
    id: 'git',
    title: 'Git In-Depth',
    icon: '⎇',
    color: AppTheme.colors.primary,
    summary: 'Commit geçmişi, branch stratejileri, bisect ve inceleme akışı için ileri seviye komutlar.',
    items: [
      { cmd: 'git log --graph --decorate --oneline --all', desc: 'Tüm branch yapısını kompakt bir grafikte incele' },
      { cmd: 'git reflog show --date=iso', desc: 'HEAD hareketlerinin tam izini zaman damgasıyla gör' },
      { cmd: 'git stash push -m "wip: refactor"', desc: 'Çalışma alanını etiketli şekilde geçici olarak sakla' },
      { cmd: 'git rebase -i --rebase-merges HEAD~5', desc: 'Commit serisini merge yapısını koruyarak düzenle' },
      { cmd: 'git bisect start && git bisect bad && git bisect good <sha>', desc: "Hatalı commit'i ikili aramayla daralt" },
      { cmd: 'git show --stat --summary <sha>', desc: "Bir commit'in dosya ve değişim özetini oku" },
    ],
  },
  {
    id: 'shell',
    title: 'Shell ve Unix',
    icon: '⌘',
    color: AppTheme.colors.secondary,
    summary: 'Process, pipe, redirection, text processing ve debugging akışı için günlük kullanım araçları.',
    items: [
      { cmd: 'ps aux --sort=-%mem | head', desc: 'Bellek tüketen process’leri hızlıca bul' },
      { cmd: 'lsof -iTCP -sTCP:LISTEN -n -P', desc: 'Dinleyen TCP portlarını process adıyla birlikte listele' },
      { cmd: 'find . -type f -name "*.ts" -mtime -2', desc: 'Son iki günde değişen TypeScript dosyalarını tara' },
      { cmd: 'xargs -0 -n 1', desc: 'Null-safe input ile güvenli toplu işlem yap' },
      { cmd: 'journalctl -u <service> -f -o cat', desc: 'Servis logunu ham çıktı halinde canlı izle' },
      { cmd: 'awk \'{print $1, $NF}\' file.txt', desc: 'Metin akışını kolon bazında dönüştür' },
      { cmd: 'sed -n "1,120p" file.txt', desc: 'Dosyanın belirli aralığını satır bazında göster' },
      { cmd: 'ripgrep "pattern" .', desc: 'Repo içinde hızlı ve recursive arama yap' },
    ],
  },
  {
    id: 'networking',
    title: 'Ağ ve HTTP',
    icon: '⇄',
    color: '#70b8ff',
    summary: 'DNS, TCP, TLS, HTTP/2 ve header seviyesinde teşhis için pratik komutlar.',
    items: [
      { cmd: 'dig +trace example.com', desc: 'DNS çözümleme zincirini kökten başlayarak izle' },
      { cmd: 'curl -I --http2 https://example.com', desc: 'HTTP/2 başlıklarını hızlıca doğrula' },
      { cmd: 'openssl s_client -connect example.com:443 -servername example.com', desc: 'TLS el sıkışmasını ve sertifikayı incele' },
      { cmd: 'tcpdump -i any port 443 -nn', desc: 'Canlı ağ trafiğini ham paket seviyesinde izle' },
      { cmd: 'ss -tulpn', desc: 'Açık socket ve portların süzülmüş görünümünü al' },
      { cmd: 'traceroute example.com', desc: 'Paketin rotasını hop hop izle' },
      { cmd: 'curl -v --resolve example.com:443:93.184.216.34 https://example.com', desc: 'DNS bypass ederek hedef IP ile isteği test et' },
      { cmd: 'nghttp -nv https://example.com', desc: 'HTTP/2 frame seviyesinde konuşmayı incele' },
    ],
  },
  {
    id: 'containers',
    title: 'Docker ve Runtime',
    icon: '⎔',
    color: '#34d399',
    summary: 'Container yaşam döngüsü, kaynak kontrolü, image debug ve runtime teşhisi için kısa komut seti.',
    items: [
      { cmd: 'docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"', desc: 'Container durumunu okunur tabloyla gör' },
      { cmd: 'docker logs -f --since=10m <container>', desc: 'Son on dakikayı canlı takip et' },
      { cmd: 'docker exec -it <container> sh', desc: 'Çalışan container içine interaktif gir' },
      { cmd: 'docker inspect <container> | jq ".[0].NetworkSettings"', desc: 'Ağ ayarlarını yapılandırma seviyesinde incele' },
      { cmd: 'docker system df', desc: 'Image, container ve volume tüketimini ölç' },
      { cmd: 'docker stats --no-stream', desc: 'Anlık CPU ve bellek kullanımını gör' },
      { cmd: 'docker history <image>', desc: 'Image katman geçmişini incele' },
      { cmd: 'docker compose logs -f', desc: 'Compose stack loglarını tek yerden izle' },
    ],
  },
  {
    id: 'go',
    title: 'Go Debugging',
    icon: '◈',
    color: '#a78bfa',
    summary: 'Derleme, profil alma, race detection, tracing ve runtime inceleme için Go araçları.',
    items: [
      { cmd: 'go test ./... -run TestName -v', desc: 'Tek test davranışını ayrıntılı izle' },
      { cmd: 'go test -race ./...', desc: 'Data race ve eşzamanlı erişim problemlerini yakala' },
      { cmd: 'go test -coverprofile=cover.out ./...', desc: 'Kapsama raporu üret ve analiz et' },
      { cmd: 'go tool pprof -http=:8080 cpu.prof', desc: 'CPU profilini görsel olarak aç' },
      { cmd: 'GODEBUG=gctrace=1 ./app', desc: 'GC davranışını runtime seviyesinde logla' },
      { cmd: 'go vet ./...', desc: 'Statik analiz ile bariz hata desenlerini tara' },
      { cmd: 'go test -run TestName -count=1 ./...', desc: 'Cache kullanmadan testi yeniden çalıştır' },
      { cmd: 'go test -json ./... | jq -r \'.Action, .Package\'', desc: 'Test akışını makine okunur şekilde işle' },
    ],
  },
  {
    id: 'sql',
    title: 'SQL ve Veritabanı',
    icon: '◫',
    color: '#f59e0b',
    summary: 'Sorgu okuma, indeks mantığı ve transaction davranışı için temel araçlar.',
    items: [
      { cmd: 'EXPLAIN ANALYZE SELECT ...', desc: 'Sorgu planını ve gerçek çalışma süresini incele' },
      { cmd: 'SELECT * FROM pg_stat_activity;', desc: 'Aktif oturum ve kilitleri izle' },
      { cmd: 'CREATE INDEX CONCURRENTLY idx_name ON table_name(column);', desc: 'Tabloyu kilitlemeden indeks oluştur' },
      { cmd: 'BEGIN; ... COMMIT;', desc: 'Transaction sınırlarını açık tut' },
      { cmd: 'SELECT pg_cancel_backend(pid);', desc: 'Uzun süren bir sorguyu güvenle iptal et' },
      { cmd: 'VACUUM (ANALYZE) table_name;', desc: 'İstatistikleri güncelle ve planner’ı besle' },
    ],
  },
  {
    id: 'observability',
    title: 'Gözlemlenebilirlik',
    icon: '◎',
    color: '#22c55e',
    summary: 'Log, metric ve trace üzerinden sistem davranışını hızlı okumak için araçlar.',
    items: [
      { cmd: 'tail -f app.log | grep ERROR', desc: 'Hata akışını canlı filtrele' },
      { cmd: 'kubectl logs deploy/app -f', desc: 'Kubernetes pod loglarını izle' },
      { cmd: 'promtool check rules rules.yml', desc: 'Prometheus rule set doğruluğunu kontrol et' },
      { cmd: 'curl localhost:9090/metrics', desc: 'Prometheus metrik endpoint’ini incele' },
      { cmd: 'jq \'.level, .msg\' app.json.log', desc: 'JSON loglardan gerekli alanları ayıkla' },
      { cmd: 'otel-cli span --name request', desc: 'Trace span akışını el ile üret' },
    ],
  },
];

const ReferenceSectionCard = ({
  section,
  isOpen,
  onToggle,
}: {
  section: (typeof REFERENCE_DATA)[number];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const rotateAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen, rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={{ marginBottom: AppTheme.spacing.sm }}>
      <PressableCard
        onPress={onToggle}
        style={[
          styles.sectionHeader,
          isOpen && { borderColor: section.color },
        ]}
      >
        <View style={[styles.sectionIconBox, { borderColor: section.color }]}>
          <Text variant="mono" style={{ color: section.color, fontSize: 18 }}>
            {section.icon}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text variant="heading" style={{ fontSize: 15, marginBottom: 4, letterSpacing: 0.5 }}>
            {section.title}
          </Text>
          <Text color="textMuted" style={styles.sectionSummary}>
            {section.summary}
          </Text>
          <Badge label={`${section.items.length} komut`} color={section.color as any} />
        </View>

        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <View style={[styles.expandButton, { borderColor: section.color }]}>
            <Text style={{ color: section.color, fontSize: 14 }}>▼</Text>
          </View>
        </Animated.View>
      </PressableCard>

      {isOpen && (
        <View style={[styles.commandList, { borderColor: section.color }]}>
          {section.items.map((item, i) => (
            <View
              key={i}
              style={[
                styles.commandRow,
                i === section.items.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <View style={styles.commandHeader}>
                <View style={[styles.commandDot, { backgroundColor: section.color }]} />
                <Text variant="mono" style={[styles.cmd, { color: section.color }]}>
                  {item.cmd}
                </Text>
              </View>
              <Text color="textMuted" style={styles.cmdDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export const ReferenceScreen = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <ThemedContainer style={{ paddingHorizontal: AppTheme.spacing.md }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Teknik Kılavuz" subtitle="Hızlı başvuru" />

        <MetricGrid
          style={{ marginBottom: AppTheme.spacing.xl }}
          items={[
            {
              icon: '⌨️',
              label: 'KOMUT',
              value: REFERENCE_DATA.reduce((acc, s) => acc + s.items.length, 0),
              caption: 'toplam',
              color: 'primary',
            },
            {
              icon: '📦',
              label: 'KATEGORİ',
              value: REFERENCE_DATA.length,
              caption: 'grup',
              color: 'secondary',
            },
            {
              icon: '🧭',
              label: 'ODAK',
              value: 'debug',
              caption: 'akış',
              color: 'success',
            },
          ]}
        />

        <SectionHeader title="Araç Kutusu" subtitle="Günlük teşhis" />

        {REFERENCE_DATA.map((section) => (
          <ReferenceSectionCard
            key={section.id}
            section={section}
            isOpen={openSection === section.id}
            onToggle={() => setOpenSection(openSection === section.id ? null : section.id)}
          />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </ThemedContainer>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: AppTheme.spacing.md,
  },
  sectionIconBox: {
    width: 44,
    height: 44,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: AppTheme.spacing.md,
    backgroundColor: AppTheme.colors.background,
  },
  sectionSummary: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 8,
  },
  expandButton: {
    width: 32,
    height: 32,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppTheme.colors.background,
  },
  commandList: {
    borderWidth: 2,
    borderTopWidth: 0,
    backgroundColor: AppTheme.colors.background,
    ...AppTheme.shadows.md,
  },
  commandRow: {
    padding: AppTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppTheme.colors.border,
  },
  commandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  commandDot: {
    width: 4,
    height: 4,
    marginRight: 8,
  },
  cmd: {
    fontSize: 12,
    flex: 1,
  },
  cmdDesc: {
    fontSize: 13,
    lineHeight: 20,
    paddingLeft: 12,
  },
});
