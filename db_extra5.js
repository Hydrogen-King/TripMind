(function(){
const EXT5={
// ── MORE JAPAN ──
하카타:{kr:'하카타',en:'Hakata',country:'일본 🇯🇵',iata:'FUK',airport:'FUK',flight:'약 1.5시간',bc:'Hakata, Japan',ab:'Hakata--Japan',na:'ICN-FUK',
  costs:{flight:[190000,300000,535000],hotel:[42000,84000,145000,290000],food:[24000,52000,106000],tr:10000,act:28000},
  spots:{default:[{n:'후쿠오카 야타이 포장마차',d:'하카타 명물 야외 포장마차',p:'저녁'},{n:'캐널 시티 쇼핑몰',d:'후쿠오카 최대 쇼핑몰',p:'오후'},{n:'하카타 라멘 거리',d:'일본 최고 돼지뼈 라멘',p:'점심'},{n:'규슈 국립박물관',d:'아시아 고대 문화 교류',p:'오전'},{n:'하코자키 신사',d:'규슈 대표 신사',p:'오전'}]}},
나가사키현:{kr:'나가사키현',en:'Nagasaki Prefecture',country:'일본 🇯🇵',iata:'NGS',airport:'NGS',flight:'약 2시간',bc:'Nagasaki, Japan',ab:'Nagasaki--Japan',na:'ICN-NGS',
  costs:{flight:[240000,370000,660000],hotel:[38000,78000,132000,265000],food:[22000,47000,94000],tr:10000,act:26000},
  spots:{default:[{n:'하우스텐보스',d:'네덜란드 테마 파크',p:'종일'},{n:'나가사키 원폭 자료관',d:'원폭 역사 박물관',p:'오전'},{n:'운젠 온천',d:'규슈 화산 온천',p:'오후'},{n:'글로버 공원',d:'서양식 저택 항구 야경',p:'저녁'},{n:'데지마 역사 지구',d:'에도 시대 네덜란드 교역소',p:'오전'}]}},
오키나와현:{kr:'오키나와현',en:'Okinawa Main Island',country:'일본 🇯🇵',iata:'OKA',airport:'OKA',flight:'약 2.5시간',bc:'Naha, Okinawa, Japan',ab:'Naha--Okinawa--Japan',na:'ICN-OKA',
  costs:{flight:[250000,390000,695000],hotel:[35000,78000,140000,295000],food:[20000,44000,89000],tr:12000,act:38000},
  spots:{default:[{n:'슈리 성',d:'유네스코 류큐 왕국 성',p:'오전'},{n:'마에다 곶 스노클링',d:'오키나와 투명 바다',p:'오전'},{n:'추라우미 수족관',d:'세계 최고 수준 수족관',p:'오전'},{n:'국제 거리',d:'나하 최대 쇼핑·먹거리',p:'오후'},{n:'이시가키 섬 투어',d:'오키나와 외딴 섬 서핑',p:'오전'}]}},
// ── THAILAND ──
코창:{kr:'코창',en:'Koh Chang',country:'태국 🇹🇭',iata:'BKK',airport:'BKK',flight:'약 6.5시간',bc:'Koh Chang, Thailand',ab:'Koh-Chang--Thailand',na:'ICN-BKK',
  costs:{flight:[330000,490000,855000],hotel:[25000,60000,115000,258000],food:[10000,25000,64000],tr:14000,act:35000},
  spots:{default:[{n:'화이트 샌드 비치',d:'코창 최고 해변',p:'오전'},{n:'카이벡 폭포',d:'열대 우림 폭포',p:'오전'},{n:'코창 스노클링 투어',d:'근해 스노클링',p:'오전'},{n:'롱뷰 호텔 풀',d:'해변 리조트 수영',p:'오후'},{n:'레스토랑 선셋 뷰',d:'코창 석양 뷰 다이닝',p:'저녁'}]}},
코팡안:{kr:'코팡안',en:'Koh Phangan',country:'태국 🇹🇭',iata:'USM',airport:'USM',flight:'약 7시간',bc:'Koh Phangan, Thailand',ab:'Koh-Phangan--Thailand',na:'ICN-USM',
  costs:{flight:[375000,555000,945000],hotel:[20000,50000,105000,248000],food:[10000,25000,65000],tr:12000,act:40000},
  spots:{default:[{n:'풀문 파티',d:'매달 보름 세계 최대 비치 파티',p:'저녁'},{n:'하린 비치',d:'코팡안 최고 해변',p:'오전'},{n:'손크란 워터파이트',d:'태국 전통 물축제',p:'오전'},{n:'왓 카오 타이',d:'코팡안 최고 전망 사원',p:'오전'},{n:'통살라 야시장',d:'코팡안 나이트마켓',p:'저녁'}]}},
// ── MALAYSIA ──
코타키나발루현:{kr:'코타키나발루현',en:'Kota Kinabalu Extra',country:'말레이시아 🇲🇾',iata:'BKI',airport:'BKI',flight:'약 6시간',bc:'Kota Kinabalu, Malaysia',ab:'Kota-Kinabalu--Malaysia',na:'ICN-BKI',
  costs:{flight:[350000,522000,912000],hotel:[28000,65000,120000,270000],food:[10000,25000,65000],tr:10000,act:42000},
  spots:{default:[{n:'키나발루 산 트래킹',d:'동남아 최고봉 4095m',p:'종일'},{n:'툰쿠 압둘 라만 해양공원',d:'5개 섬 스노클링 다이빙',p:'오전'},{n:'술루 해 선셋 크루즈',d:'코타키나발루 최고 석양',p:'저녁'},{n:'필리피노 마켓',d:'로컬 재래시장 야시장',p:'저녁'},{n:'시피당 해변 다이빙',d:'세계 최고 다이빙 명소',p:'오전'}]}},
// ── NEPAL EXTRA ──
히말라야:{kr:'히말라야',en:'Himalaya Trek',country:'네팔 🇳🇵',iata:'KTM',airport:'KTM',flight:'약 6.5시간',bc:'Kathmandu, Nepal',ab:'Kathmandu--Nepal',na:'ICN-KTM',
  costs:{flight:[420000,630000,1050000],hotel:[15000,38000,80000,180000],food:[6000,15000,42000],tr:25000,act:80000},
  spots:{default:[{n:'에베레스트 베이스캠프 트래킹',d:'세계 최고봉 5364m 트래킹',p:'종일'},{n:'안나푸르나 서킷',d:'세계 최고 장거리 트래킹',p:'종일'},{n:'나가르코트 일출',d:'히말라야 일출 전망대',p:'새벽'},{n:'경비행기 에베레스트 조망',d:'에베레스트 항공 투어',p:'오전'},{n:'룸비니 부처 탄생지',d:'세계 불교 순례 성지',p:'오전'}]}},
// ── SRI LANKA EXTRA ──
갈레:{kr:'갈레',en:'Galle',country:'스리랑카 🇱🇰',iata:'CMB',airport:'CMB',flight:'약 8시간',bc:'Galle, Sri Lanka',ab:'Galle--Sri-Lanka',na:'ICN-CMB',
  costs:{flight:[420000,640000,1080000],hotel:[22000,55000,110000,250000],food:[7000,18000,50000],tr:8000,act:28000},
  spots:{default:[{n:'갈레 포트 성벽',d:'유네스코 포르투갈 성채',p:'오전'},{n:'미리사 서핑 & 고래',d:'고래 관찰 투어',p:'오전'},{n:'우나와투나 비치',d:'갈레 최고 해변',p:'오전'},{n:'달마세나 홈스테이',d:'스리랑카 전통 홈스테이',p:'오후'},{n:'히카두와 스노클링',d:'산호초 스노클링',p:'오전'}]}},
// ── CENTRAL ASIA ──
사마르칸트:{kr:'사마르칸트',en:'Samarkand',country:'우즈베키스탄 🇺🇿',iata:'SKD',airport:'SKD',flight:'약 7시간',bc:'Samarkand, Uzbekistan',ab:'Samarkand--Uzbekistan',na:'ICN-SKD',
  costs:{flight:[370000,558000,978000],hotel:[18000,45000,90000,205000],food:[6000,15000,44000],tr:6000,act:20000},
  spots:{default:[{n:'레기스탄 광장',d:'유네스코 세계 최고 이슬람 광장',p:'오전'},{n:'비비하눔 모스크',d:'티무르 왕조 대형 모스크',p:'오전'},{n:'아프로시아브 역사 박물관',d:'고대 소그드 문명',p:'오전'},{n:'샤이진다 묘역',d:'유네스코 아름다운 묘역',p:'오전'},{n:'사마르칸트 패이퍼 공방',d:'전통 종이 제작 체험',p:'오후'}]}},
// ── AFRICA EXTRA ──
카사블랑카:{kr:'카사블랑카',en:'Casablanca',country:'모로코 🇲🇦',iata:'CMN',airport:'CMN',flight:'약 14시간',bc:'Casablanca, Morocco',ab:'Casablanca--Morocco',na:'ICN-CMN',
  costs:{flight:[680000,1040000,2080000],hotel:[40000,85000,168000,380000],food:[12000,30000,82000],tr:9000,act:30000},
  spots:{default:[{n:'하산 2세 모스크',d:'세계 최대 모스크 바다 위 건축',p:'오전'},{n:'리카사블랑카 영화 역사',d:'험프리 보가트 카사블랑카',p:'오전'},{n:'메디나 구시가',d:'카사블랑카 전통 시장',p:'오전'},{n:'코르니슈 해안가',d:'대서양 해변 산책',p:'오후'},{n:'하부스 & 센트럴 마켓',d:'아르데코 시장 지구',p:'오전'}]}},
킬리만자로:{kr:'킬리만자로',en:'Kilimanjaro',country:'탄자니아 🇹🇿',iata:'JRO',airport:'JRO',flight:'약 17시간',bc:'Kilimanjaro, Tanzania',ab:'Kilimanjaro--Tanzania',na:'ICN-JRO',
  costs:{flight:[780000,1200000,2150000],hotel:[25000,60000,120000,280000],food:[10000,25000,70000],tr:12000,act:120000},
  spots:{default:[{n:'킬리만자로 트래킹',d:'아프리카 최고봉 5895m',p:'종일'},{n:'마라구 루트 정상 등반',d:'7일 마라구 정상 코스',p:'종일'},{n:'암보셀리 사파리',d:'킬리만자로 배경 코끼리',p:'종일'},{n:'마사이 마을 방문',d:'마사이 전통 문화 체험',p:'오전'},{n:'아루샤 국립공원',d:'킬리만자로 기슭 공원',p:'오전'}]}},
마다가스카르:{kr:'마다가스카르',en:'Madagascar',country:'마다가스카르 🇲🇬',iata:'TNR',airport:'TNR',flight:'약 18시간',bc:'Antananarivo, Madagascar',ab:'Madagascar',na:'ICN-TNR',
  costs:{flight:[800000,1230000,2200000],hotel:[22000,55000,110000,252000],food:[8000,20000,55000],tr:12000,act:50000},
  spots:{default:[{n:'이살로 국립공원',d:'마다가스카르 사막 협곡',p:'오전'},{n:'바오밥 나무 골목',d:'세계 최고(最古) 바오밥',p:'저녁'},{n:'노지 베 섬',d:'마다가스카르 최고 해변 섬',p:'종일'},{n:'안다시베 여우원숭이',d:'인드리 여우원숭이 보호구역',p:'오전'},{n:'안타나나리보 왕궁',d:'말라가시 왕국 역사 궁전',p:'오전'}]}},
// ── EUROPE EXTRA ──
뉘른베르크:{kr:'뉘른베르크',en:'Nuremberg',country:'독일 🇩🇪',iata:'NUE',airport:'NUE',flight:'약 13시간',bc:'Nuremberg, Germany',ab:'Nuremberg--Germany',na:'ICN-NUE',
  costs:{flight:[640000,990000,1980000],hotel:[75000,142000,255000,510000],food:[32000,68000,158000],tr:16000,act:38000},
  spots:{default:[{n:'뉘른베르크 성',d:'신성로마제국 황실 성',p:'오전'},{n:'독일 국립박물관',d:'독일 최대 역사 박물관',p:'오전'},{n:'중세 구시가',d:'유럽 최고 중세 도시',p:'오전'},{n:'나치 전당대회장 기념관',d:'2차대전 역사 기념관',p:'오전'},{n:'뉘른베르크 크리스마스 마켓',d:'독일 최고 전통 마켓',p:'저녁'}]}},
마르세유:{kr:'마르세유',en:'Marseille',country:'프랑스 🇫🇷',iata:'MRS',airport:'MRS',flight:'약 13시간',bc:'Marseille, France',ab:'Marseille--France',na:'ICN-MRS',
  costs:{flight:[660000,1020000,2040000],hotel:[80000,148000,265000,530000],food:[33000,70000,160000],tr:15000,act:40000},
  spots:{default:[{n:'노트르담 드 라 가르드',d:'마르세유 언덕 성모 교회',p:'오전'},{n:'구항구 (부이야베스)',d:'프로방스 해산물 요리',p:'점심'},{n:'이프 섬 (몽테크리스토 백작)',d:'알렉상드르 뒤마 소설 배경',p:'오전'},{n:'르 코르비지에 유니테',d:'르 코르비지에 유네스코 건축',p:'오전'},{n:'칼랑크 국립공원',d:'석회암 절벽 지중해 해안',p:'오전'}]}},
리가:{kr:'리가',en:'Riga',country:'라트비아 🇱🇻',iata:'RIX',airport:'RIX',flight:'약 12시간',bc:'Riga, Latvia',ab:'Riga--Latvia',na:'ICN-RIX',
  costs:{flight:[600000,920000,1840000],hotel:[55000,105000,190000,382000],food:[22000,48000,112000],tr:12000,act:32000},
  spots:{default:[{n:'리가 구시가 (유네스코)',d:'중세 한자동맹 무역 도시',p:'오전'},{n:'아르누보 건축 투어',d:'리가 특유 세기말 건축',p:'오전'},{n:'리가 중앙 시장',d:'유럽 최대 상설 시장',p:'오전'},{n:'유르말라 해변',d:'리가 근교 발트해 해변',p:'오전'},{n:'리가 항구 야경',d:'다우가바강 항구 야경',p:'저녁'}]}},
부쿠레슈티:{kr:'부쿠레슈티',en:'Bucharest',country:'루마니아 🇷🇴',iata:'OTP',airport:'OTP',flight:'약 13시간',bc:'Bucharest, Romania',ab:'Bucharest--Romania',na:'ICN-OTP',
  costs:{flight:[620000,960000,1920000],hotel:[42000,88000,162000,330000],food:[18000,40000,96000],tr:10000,act:30000},
  spots:{default:[{n:'인민 궁전 (의회궁)',d:'세계 2위 규모 건물',p:'오전'},{n:'구시가 (리피카니)',d:'부쿠레슈티 구시가 카페 거리',p:'오후'},{n:'조르주 에네스쿠 박물관',d:'빌라 유럽 최고 궁전 박물관',p:'오전'},{n:'코트로체니 궁전',d:'루마니아 왕실 궁전',p:'오전'},{n:'드라큘라 성 (브란)',d:'트란실바니아 흡혈귀 성',p:'종일'}]}},
포즈난:{kr:'포즈난',en:'Poznań',country:'폴란드 🇵🇱',iata:'POZ',airport:'POZ',flight:'약 12시간',bc:'Poznań, Poland',ab:'Poznan--Poland',na:'ICN-POZ',
  costs:{flight:[600000,920000,1840000],hotel:[42000,88000,160000,325000],food:[18000,40000,96000],tr:10000,act:28000},
  spots:{default:[{n:'스타리 리네크 광장',d:'유럽 최고 아름다운 광장',p:'오전'},{n:'이식 크라요와 박물관',d:'포즈난 역사 박물관',p:'오전'},{n:'성당 섬 & 대성당',d:'폴란드 최고(最古) 대성당',p:'오전'},{n:'포즈난 맥주 양조장',d:'폴란드 크래프트 비어',p:'저녁'},{n:'아치아나베 박물관',d:'포즈난 현대미술',p:'오전'}]}},
아테네현:{kr:'아테네현',en:'Attica',country:'그리스 🇬🇷',iata:'ATH',airport:'ATH',flight:'약 13시간',bc:'Athens, Greece',ab:'Athens--Greece',na:'ICN-ATH',
  costs:{flight:[650000,1000000,2000000],hotel:[75000,142000,255000,510000],food:[30000,62000,145000],tr:15000,act:42000},
  spots:{default:[{n:'케이프 수니온 & 포세이돈 신전',d:'아티카 반도 절벽 신전',p:'오전'},{n:'아이기나 섬 투어',d:'아테네 근해 해변 섬',p:'종일'},{n:'수니온 국립공원',d:'아테카 자연 탐방',p:'오전'},{n:'나프플리온 당일치기',d:'그리스 왕국 첫 수도',p:'종일'},{n:'코린토스 고대 유적',d:'고대 그리스 코린토스',p:'종일'}]}},
// ── AMERICAS EXTRA ──
애틀랜타:{kr:'애틀랜타',en:'Atlanta',country:'미국 🇺🇸',iata:'ATL',airport:'ATL',flight:'약 14시간',bc:'Atlanta, USA',ab:'Atlanta--United-States',na:'ICN-ATL',
  costs:{flight:[680000,1050000,2100000],hotel:[100000,190000,340000,680000],food:[38000,80000,190000],tr:20000,act:52000},
  spots:{default:[{n:'조지아 수족관',d:'세계 최대 수족관',p:'오전'},{n:'마틴 루터 킹 센터',d:'인권 운동 지도자 기념관',p:'오전'},{n:'CNN 스튜디오 투어',d:'세계 최대 뉴스 방송국',p:'오전'},{n:'세계 코카콜라 박물관',d:'코카콜라 발상지 박물관',p:'오전'},{n:'피치트리 거리 번화가',d:'애틀랜타 최대 번화가',p:'오후'}]}},
내슈빌:{kr:'내슈빌',en:'Nashville',country:'미국 🇺🇸',iata:'BNA',airport:'BNA',flight:'약 15시간',bc:'Nashville, USA',ab:'Nashville--United-States',na:'ICN-BNA',
  costs:{flight:[690000,1065000,2130000],hotel:[100000,190000,340000,680000],food:[38000,80000,190000],tr:18000,act:55000},
  spots:{default:[{n:'브로드웨이 컨트리 바',d:'라이브 컨트리 뮤직 바',p:'저녁'},{n:'그랜드 올 오프리',d:'미국 컨트리 음악 성지',p:'저녁'},{n:'컨트리 음악 명예의 전당',d:'컨트리 뮤직 박물관',p:'오전'},{n:'내슈빌 핫 치킨',d:'내슈빌 명물 매운 닭',p:'점심'},{n:'파르테논 복원 신전',d:'아테네 파르테논 실물 복원',p:'오전'}]}},
보라카이섬:{kr:'보라카이섬',en:'Boracay Beach Resort',country:'필리핀 🇵🇭',iata:'MPH',airport:'MPH',flight:'약 4.5시간',bc:'Boracay, Philippines',ab:'Boracay--Philippines',na:'ICN-MPH',
  costs:{flight:[320000,480000,830000],hotel:[28000,68000,128000,278000],food:[11000,28000,68000],tr:12000,act:42000},
  spots:{default:[{n:'화이트 비치 북쪽 (스테이션 1)',d:'보라카이 최고급 구역',p:'오전'},{n:'디니위드 비치',d:'보라카이 조용한 해변',p:'오전'},{n:'윈드서핑 클래스',d:'보라카이 대표 수상 스포츠',p:'오전'},{n:'아리엘스 포인트',d:'클리프 다이빙·스노클링',p:'오전'},{n:'다몬학 비치 석양',d:'보라카이 최고 석양',p:'저녁'}]}},
아순시온:{kr:'아순시온',en:'Asunción',country:'파라과이 🇵🇾',iata:'ASU',airport:'ASU',flight:'약 26시간',bc:'Asunción, Paraguay',ab:'Asuncion--Paraguay',na:'ICN-ASU',
  costs:{flight:[920000,1410000,2820000],hotel:[18000,45000,92000,215000],food:[6000,15000,44000],tr:6000,act:25000},
  spots:{default:[{n:'팔라시오 로페스',d:'파라과이 대통령 궁전',p:'오전'},{n:'메트로폴리타나 성당',d:'아순시온 대성당',p:'오전'},{n:'엘 칸도 야시장',d:'아순시온 야시장',p:'저녁'},{n:'이타이푸 탐방',d:'세계 최대 수력발전 댐 (2h)',p:'종일'},{n:'라 만시온 역사',d:'19세기 파라과이 역사',p:'오전'}]}},
// ── OCEANIA EXTRA ──
퍼스:{kr:'퍼스',en:'Perth',country:'호주 🇦🇺',iata:'PER',airport:'PER',flight:'약 10시간',bc:'Perth, Australia',ab:'Perth--Australia',na:'ICN-PER',
  costs:{flight:[560000,870000,1740000],hotel:[95000,182000,328000,660000],food:[38000,80000,192000],tr:20000,act:58000},
  spots:{default:[{n:'킹스 파크',d:'퍼스 최대 도심 공원',p:'오전'},{n:'코테슬로 비치',d:'퍼스 최고 해변',p:'오전'},{n:'로트네스트 섬 (쿼카)',d:'귀여운 쿼카 서식 섬',p:'종일'},{n:'프리맨틀 항구',d:'퍼스 역사 항구 도시',p:'오전'},{n:'피나클스 사막',d:'기이한 석회암 기둥 사막',p:'오전'}]}},
애들레이드:{kr:'애들레이드',en:'Adelaide',country:'호주 🇦🇺',iata:'ADL',airport:'ADL',flight:'약 11시간',bc:'Adelaide, Australia',ab:'Adelaide--Australia',na:'ICN-ADL',
  costs:{flight:[570000,880000,1760000],hotel:[90000,172000,310000,625000],food:[36000,76000,182000],tr:18000,act:52000},
  spots:{default:[{n:'바로사 밸리 와이너리',d:'호주 최고 와인 지대',p:'오전'},{n:'애들레이드 센트럴 마켓',d:'호주 최고 로컬 마켓',p:'오전'},{n:'캥거루 아일랜드',d:'캥거루·코알라·물개 서식지',p:'종일'},{n:'헨리 비치',d:'애들레이드 대표 해변',p:'오전'},{n:'플린더스 산맥',d:'남호주 최고 산악 공원',p:'종일'}]}},
크라이스트처치:{kr:'크라이스트처치',en:'Christchurch',country:'뉴질랜드 🇳🇿',iata:'CHC',airport:'CHC',flight:'약 12시간',bc:'Christchurch, New Zealand',ab:'Christchurch--New-Zealand',na:'ICN-CHC',
  costs:{flight:[630000,975000,1950000],hotel:[85000,162000,295000,595000],food:[36000,76000,180000],tr:18000,act:65000},
  spots:{default:[{n:'크라이스트처치 식물원',d:'에이번강 옆 대형 정원',p:'오전'},{n:'국제 남극 센터',d:'남극 탐험 체험관',p:'오전'},{n:'아오라키/마운트 쿡',d:'뉴질랜드 최고봉 3724m',p:'종일'},{n:'카이코우라 고래 관찰',d:'뉴질랜드 최고 고래 투어',p:'오전'},{n:'망각 피요르드',d:'협곡 카약 투어',p:'오전'}]}}
};

const HIER_NEW5={
  '아시아·태평양':{
    '🇯🇵 일본':['하카타','오키나와현'],
    '🇹🇭 태국':['코창','코팡안'],
    '🇲🇾 말레이시아':['코타키나발루현'],
    '🇳🇵 네팔':['히말라야'],
    '🇱🇰 스리랑카':['갈레'],
    '🇺🇿 우즈베키스탄':['사마르칸트']
  },
  '유럽':{
    '🇩🇪 독일':['뉘른베르크'],
    '🇫🇷 프랑스':['마르세유'],
    '🇱🇻 라트비아':['리가'],
    '🇷🇴 루마니아':['부쿠레슈티'],
    '🇵🇱 폴란드':['포즈난']
  },
  '중동·아프리카':{
    '🇲🇦 모로코':['카사블랑카'],
    '🇹🇿 탄자니아':['킬리만자로'],
    '🇲🇬 마다가스카르':['마다가스카르']
  },
  '아메리카':{
    '🇺🇸 미국':['애틀랜타','내슈빌'],
    '🇨🇦 캐나다':['나이아가라폭포'],
    '🇵🇾 파라과이':['아순시온']
  },
  '오세아니아':{
    '🇦🇺 호주':['퍼스','애들레이드'],
    '🇳🇿 뉴질랜드':['크라이스트처치']
  }
};

const ALIAS_NEW5={
  'hakata':'하카타','okinavya':'오키나와현',
  'kohchang':'코창','kohphangan':'코팡안',
  'himalaya':'히말라야','galle':'갈레','samarkand':'사마르칸트',
  'nuremberg':'뉘른베르크','nurnberg':'뉘른베르크','marseille':'마르세유','riga':'리가',
  'bucharest':'부쿠레슈티','poznan':'포즈난',
  'casablanca':'카사블랑카','kilimanjaro':'킬리만자로','madagascar':'마다가스카르',
  'atlanta':'애틀랜타','nashville':'내슈빌','niagara':'나이아가라폭포',
  'asuncion':'아순시온','perth':'퍼스','adelaide':'애들레이드','christchurch':'크라이스트처치'
};

for(const[k,v] of Object.entries(EXT5)) if(!DB[k]) DB[k]=v;

Object.keys(HIER_NEW5).forEach(cont=>{
  if(!HIER[cont]) HIER[cont]={};
  Object.keys(HIER_NEW5[cont]).forEach(country=>{
    if(!HIER[cont][country]) HIER[cont][country]=[];
    HIER_NEW5[cont][country].forEach(city=>{
      if(!HIER[cont][country].includes(city)) HIER[cont][country].push(city);
    });
  });
});

Object.assign(ALIAS, ALIAS_NEW5);

for(const key of Object.keys(CMAP)) delete CMAP[key];
for(const[c,countries] of Object.entries(HIER))
  for(const cities of Object.values(countries))
    cities.forEach(city=>CMAP[city]=c);

console.log('TripMind DB (v5):', Object.keys(DB).length, 'destinations');
})();
