(function(){
const EXT={
// ── JAPAN NEW ──
히로시마:{kr:'히로시마',en:'Hiroshima',country:'일본 🇯🇵',iata:'HIJ',airport:'HIJ',flight:'약 2시간',bc:'Hiroshima, Japan',ab:'Hiroshima--Japan',na:'ICN-HIJ',
  costs:{flight:[230000,360000,640000],hotel:[40000,80000,135000,270000],food:[22000,48000,95000],tr:10000,act:25000},
  spots:{default:[{n:'원폭 돔',d:'유네스코 원폭 유산',p:'오전'},{n:'평화기념관',d:'원폭 역사 박물관',p:'오전'},{n:'이쓰쿠시마 신사',d:'물 위 도리이 세계문화유산',p:'오전'},{n:'미야지마 섬 산책',d:'신성한 섬 탐방',p:'오후'},{n:'오코노미야키 거리',d:'히로시마 명물 요리',p:'점심'}]}},
나가사키:{kr:'나가사키',en:'Nagasaki',country:'일본 🇯🇵',iata:'NGS',airport:'NGS',flight:'약 2시간',bc:'Nagasaki, Japan',ab:'Nagasaki--Japan',na:'ICN-NGS',
  costs:{flight:[240000,370000,660000],hotel:[38000,78000,130000,260000],food:[22000,47000,93000],tr:10000,act:24000},
  spots:{default:[{n:'글로버 가든',d:'서양식 정원, 나가사키 야경',p:'오전'},{n:'원폭 자료관',d:'나가사키 원폭 역사',p:'오전'},{n:'하우스텐보스',d:'네덜란드 테마파크',p:'종일'},{n:'차이나타운',d:'일본 최대 중화거리',p:'점심'},{n:'나가사키 짬뽕',d:'나가사키 명물 요리',p:'점심'}]}},
요코하마:{kr:'요코하마',en:'Yokohama',country:'일본 🇯🇵',iata:'TYO',airport:'HND',flight:'약 2시간',bc:'Yokohama, Japan',ab:'Yokohama--Japan',na:'ICN-HND',
  costs:{flight:[220000,350000,620000],hotel:[55000,105000,175000,340000],food:[25000,55000,110000],tr:12000,act:30000},
  spots:{default:[{n:'미나토미라이 21',d:'요코하마 현대 항구 지구',p:'오후'},{n:'차이나타운',d:'일본 최대 요코하마 중화거리',p:'점심'},{n:'야마시타 공원',d:'항구 산책로',p:'오전'},{n:'요코하마 코스모월드',d:'항구 야경과 관람차',p:'저녁'},{n:'산케이엔 정원',d:'전통 일본식 정원',p:'오전'}]}},
고베:{kr:'고베',en:'Kobe',country:'일본 🇯🇵',iata:'KIX',airport:'KIX',flight:'약 2시간',bc:'Kobe, Japan',ab:'Kobe--Japan',na:'ICN-KIX',
  costs:{flight:[230000,360000,640000],hotel:[50000,95000,160000,315000],food:[25000,55000,115000],tr:11000,act:28000},
  spots:{default:[{n:'기타노 이진칸',d:'외국인 거류지 서양관',p:'오전'},{n:'고베 하버랜드',d:'항구 쇼핑·야경',p:'저녁'},{n:'고베 비프 레스토랑',d:'세계 최고 와규 고베 소고기',p:'저녁'},{n:'아리마 온천',d:'일본 3대 명천 온천',p:'오후'},{n:'메리켄파크',d:'항구 공원과 고베 타워',p:'오전'}]}},
하코네:{kr:'하코네',en:'Hakone',country:'일본 🇯🇵',iata:'TYO',airport:'HND',flight:'약 2시간',bc:'Hakone, Japan',ab:'Hakone--Japan',na:'ICN-HND',
  costs:{flight:[220000,350000,620000],hotel:[60000,120000,200000,420000],food:[28000,60000,130000],tr:18000,act:35000},
  spots:{default:[{n:'후지산 조망',d:'하코네에서 보는 후지산',p:'오전'},{n:'아시노코 호수 유람선',d:'후지산 배경 유람선',p:'오전'},{n:'하코네 유모토 온천',d:'하코네 대표 온천 마을',p:'오후'},{n:'조각의 숲 미술관',d:'야외 조각 공원',p:'오전'},{n:'오와쿠다니 유황 계곡',d:'흑달걀·화산 지형',p:'오전'}]}},
가마쿠라:{kr:'가마쿠라',en:'Kamakura',country:'일본 🇯🇵',iata:'TYO',airport:'HND',flight:'약 2시간',bc:'Kamakura, Japan',ab:'Kamakura--Japan',na:'ICN-HND',
  costs:{flight:[220000,350000,620000],hotel:[50000,95000,160000,310000],food:[24000,52000,105000],tr:12000,act:26000},
  spots:{default:[{n:'고토쿠인 대불',d:'가마쿠라 상징 청동 대불',p:'오전'},{n:'쓰루가오카하치만궁',d:'가마쿠라 최대 신사',p:'오전'},{n:'하세데라 사원',d:'해안 절벽 사원',p:'오전'},{n:'가마쿠라 코코마에 해변',d:'서핑 성지 해변',p:'오후'},{n:'소원성취 에노시마 섬',d:'섬 신사와 동굴',p:'오후'}]}},
벳푸:{kr:'벳푸',en:'Beppu',country:'일본 🇯🇵',iata:'OIT',airport:'OIT',flight:'약 2시간',bc:'Beppu, Japan',ab:'Beppu--Japan',na:'ICN-OIT',
  costs:{flight:[240000,370000,660000],hotel:[35000,75000,130000,260000],food:[22000,48000,96000],tr:10000,act:30000},
  spots:{default:[{n:'지옥 순례 온천',d:'8개 색깔 지옥 온천 투어',p:'오전'},{n:'벳푸 료칸 온천',d:'일본 전통 숙소 온천',p:'오후'},{n:'유후인 마을',d:'동화 같은 온천 마을',p:'오전'},{n:'타케가와라 온천',d:'메이지 시대 모래 온천',p:'오전'},{n:'벳푸 타워 전망',d:'벳푸 전경 조망',p:'저녁'}]}},
가나자와:{kr:'가나자와',en:'Kanazawa',country:'일본 🇯🇵',iata:'KMQ',airport:'KMQ',flight:'약 2시간',bc:'Kanazawa, Japan',ab:'Kanazawa--Japan',na:'ICN-KMQ',
  costs:{flight:[250000,380000,680000],hotel:[45000,88000,150000,300000],food:[25000,55000,115000],tr:11000,act:30000},
  spots:{default:[{n:'겐로쿠엔 정원',d:'일본 3대 정원',p:'오전'},{n:'히가시 차야 거리',d:'에도 시대 게이샤 거리',p:'오후'},{n:'가나자와 성',d:'가나자와 상징 성',p:'오전'},{n:'오미초 시장',d:'신선한 해산물 시장',p:'오전'},{n:'21세기 현대미술관',d:'독특한 현대 예술 공간',p:'오후'}]}},
닛코:{kr:'닛코',en:'Nikko',country:'일본 🇯🇵',iata:'TYO',airport:'HND',flight:'약 2시간',bc:'Nikko, Japan',ab:'Nikko--Japan',na:'ICN-HND',
  costs:{flight:[220000,350000,620000],hotel:[50000,95000,160000,320000],food:[24000,52000,105000],tr:14000,act:28000},
  spots:{default:[{n:'도쇼구 신사',d:'도쿠가와 이에야스 화려한 신사',p:'오전'},{n:'링노지 절',d:'닛코 유네스코 유산',p:'오전'},{n:'게곤 폭포',d:'높이 97m 장관 폭포',p:'오전'},{n:'주젠지 호수',d:'닛코 고원 호수',p:'오후'},{n:'신교 다리',d:'닛코 상징 붉은 다리',p:'오전'}]}},
// ── THAILAND NEW ──
크라비:{kr:'크라비',en:'Krabi',country:'태국 🇹🇭',iata:'KBV',airport:'KBV',flight:'약 7시간',bc:'Krabi, Thailand',ab:'Krabi--Thailand',na:'ICN-KBV',
  costs:{flight:[360000,530000,900000],hotel:[28000,65000,120000,260000],food:[10000,25000,65000],tr:12000,act:42000},
  spots:{default:[{n:'라이레이 비치',d:'절벽으로 둘러싸인 절경 해변',p:'오전'},{n:'피피 섬 투어',d:'에메랄드빛 섬 스노클링',p:'종일'},{n:'타이거 케이브 사원',d:'1237계단 꼭대기 전망',p:'오전'},{n:'아오낭 비치',d:'크라비 대표 해변',p:'오후'},{n:'포낭 동굴',d:'수중 동굴 카약',p:'오전'}]}},
코사무이:{kr:'코사무이',en:'Koh Samui',country:'태국 🇹🇭',iata:'USM',airport:'USM',flight:'약 7시간',bc:'Koh Samui, Thailand',ab:'Koh-Samui--Thailand',na:'ICN-USM',
  costs:{flight:[380000,560000,950000],hotel:[35000,80000,160000,380000],food:[12000,30000,78000],tr:14000,act:45000},
  spots:{default:[{n:'빅 부다 사원',d:'코사무이 상징 대불',p:'오전'},{n:'촉사무이 마차노 폭포',d:'열대 우림 폭포',p:'오전'},{n:'차웡 비치',d:'코사무이 최대 해변',p:'오후'},{n:'무불섬 스노클링',d:'코사무이 근해 스노클링',p:'오전'},{n:'나통 야시장',d:'코사무이 먹거리 야시장',p:'저녁'}]}},
아유타야:{kr:'아유타야',en:'Ayutthaya',country:'태국 🇹🇭',iata:'BKK',airport:'BKK',flight:'약 6시간',bc:'Ayutthaya, Thailand',ab:'Ayutthaya--Thailand',na:'ICN-BKK',
  costs:{flight:[330000,490000,850000],hotel:[20000,50000,90000,190000],food:[8000,20000,50000],tr:8000,act:22000},
  spots:{default:[{n:'왓 마하탓',d:'나무뿌리 속 불두상',p:'오전'},{n:'왓 프라 씨 산펫',d:'아유타야 왕실 사원 3탑',p:'오전'},{n:'왓 차이 왓타나람',d:'앙코르 스타일 크메르 사원',p:'오전'},{n:'왓 로까야 수타',d:'초대형 와불상',p:'오전'},{n:'아유타야 야간 유람선',d:'야경 강변 유람',p:'저녁'}]}},
치앙라이:{kr:'치앙라이',en:'Chiang Rai',country:'태국 🇹🇭',iata:'CEI',airport:'CEI',flight:'약 6시간',bc:'Chiang Rai, Thailand',ab:'Chiang-Rai--Thailand',na:'ICN-CEI',
  costs:{flight:[340000,500000,870000],hotel:[22000,55000,100000,230000],food:[8000,20000,55000],tr:8000,act:28000},
  spots:{default:[{n:'왓 롱쿤 (화이트 템플)',d:'전신 흰색 유리 사원',p:'오전'},{n:'왓 롱쑤어텐 (블루 템플)',d:'짙은 파란 색채의 사원',p:'오전'},{n:'블랙하우스 (반담)',d:'다크 아트 미술관',p:'오후'},{n:'골든 트라이앵글',d:'태국·라오스·미얀마 접경지',p:'오전'},{n:'야시장 & 나이트 바자',d:'치앙라이 쇼핑 야시장',p:'저녁'}]}},
// ── VIETNAM NEW ──
푸꾸옥:{kr:'푸꾸옥',en:'Phu Quoc',country:'베트남 🇻🇳',iata:'PQC',airport:'PQC',flight:'약 6시간',bc:'Phu Quoc, Vietnam',ab:'Phu-Quoc--Vietnam',na:'ICN-PQC',
  costs:{flight:[330000,490000,850000],hotel:[30000,70000,130000,300000],food:[10000,25000,65000],tr:12000,act:38000},
  spots:{default:[{n:'사오 비치',d:'푸꾸옥 최고 백사장',p:'오전'},{n:'빈펄 사파리',d:'동남아 최대 사파리',p:'오전'},{n:'안터이 군도 스노클링',d:'투명 바다 스노클링',p:'오전'},{n:'딩까우 마을 야시장',d:'해산물 야시장',p:'저녁'},{n:'선셋 타운',d:'지중해 감성 마을',p:'저녁'}]}},
후에:{kr:'후에',en:'Hue',country:'베트남 🇻🇳',iata:'HUI',airport:'HUI',flight:'약 5.5시간',bc:'Hue, Vietnam',ab:'Hue--Vietnam',na:'ICN-HUI',
  costs:{flight:[310000,460000,800000],hotel:[20000,50000,90000,200000],food:[8000,20000,52000],tr:8000,act:22000},
  spots:{default:[{n:'후에 황성 (Citadel)',d:'응우옌 왕조 황궁 유네스코',p:'오전'},{n:'카이딘 황릉',d:'프랑스-베트남 양식 황제 능',p:'오전'},{n:'민망 황릉',d:'웅장한 응우옌 왕조 황릉',p:'오전'},{n:'티엔무 사원',d:'향강 옆 7층 탑 사원',p:'오전'},{n:'향강 드래곤 보트 투어',d:'베트남 향강 유람',p:'오후'}]}},
달랏:{kr:'달랏',en:'Da Lat',country:'베트남 🇻🇳',iata:'DLI',airport:'DLI',flight:'약 6시간',bc:'Da Lat, Vietnam',ab:'Da-Lat--Vietnam',na:'ICN-DLI',
  costs:{flight:[320000,480000,830000],hotel:[18000,45000,85000,190000],food:[8000,20000,50000],tr:8000,act:25000},
  spots:{default:[{n:'쑤언흐엉 호수',d:'달랏 중심 낭만 호수',p:'오전'},{n:'달랏 야시장',d:'달기와 채소 야시장',p:'저녁'},{n:'랑비앙 산 트래킹',d:'달랏 고원 화산 트래킹',p:'오전'},{n:'크레이지 하우스',d:'독특한 건축물 게스트하우스',p:'오전'},{n:'달랏 꽃 공원',d:'달랏 상징 꽃 정원',p:'오전'}]}},
하롱:{kr:'하롱',en:'Ha Long',country:'베트남 🇻🇳',iata:'HAN',airport:'HAN',flight:'약 5시간',bc:'Ha Long Bay, Vietnam',ab:'Ha-Long--Vietnam',na:'ICN-HAN',
  costs:{flight:[310000,460000,800000],hotel:[30000,70000,130000,280000],food:[12000,28000,70000],tr:15000,act:40000},
  spots:{default:[{n:'하롱베이 크루즈',d:'유네스코 세계유산 크루즈',p:'종일'},{n:'숭솟 동굴',d:'하롱 최대 석회동굴',p:'오전'},{n:'카약 투어',d:'석회암 절벽 카약',p:'오전'},{n:'티톱 섬 전망대',d:'하롱베이 전경 조망',p:'오전'},{n:'해산물 선상 저녁',d:'신선한 해산물 식사',p:'저녁'}]}},
// ── PHILIPPINES NEW ──
팔라완:{kr:'팔라완',en:'Palawan',country:'필리핀 🇵🇭',iata:'PPS',airport:'PPS',flight:'약 5시간',bc:'Puerto Princesa, Philippines',ab:'Puerto-Princesa--Philippines',na:'ICN-PPS',
  costs:{flight:[330000,490000,850000],hotel:[25000,60000,120000,270000],food:[10000,25000,65000],tr:15000,act:45000},
  spots:{default:[{n:'엘니도 섬 호핑',d:'세계 최고 아일랜드 호핑',p:'종일'},{n:'지하강 국립공원',d:'유네스코 세계자연유산',p:'오전'},{n:'코론 호수 다이빙',d:'이중 칼데라 다이빙',p:'오전'},{n:'혼다만 석양',d:'팔라완 최고 석양 명소',p:'저녁'},{n:'현지 해산물 레스토랑',d:'팔라완 신선 해산물',p:'저녁'}]}},
보홀:{kr:'보홀',en:'Bohol',country:'필리핀 🇵🇭',iata:'TAG',airport:'TAG',flight:'약 4.5시간',bc:'Bohol, Philippines',ab:'Bohol--Philippines',na:'ICN-TAG',
  costs:{flight:[310000,460000,820000],hotel:[25000,58000,115000,260000],food:[10000,25000,62000],tr:12000,act:40000},
  spots:{default:[{n:'초콜릿 힐스',d:'1,268개 원뿔형 구릉 지형',p:'오전'},{n:'안경원숭이 보호구역',d:'세계 최소 영장류 안경원숭이',p:'오전'},{n:'알로나 비치',d:'보홀 최고 스노클링 해변',p:'오후'},{n:'로복 강 크루즈',d:'보홀 강 정글 유람',p:'오전'},{n:'발리카삭 아일랜드',d:'산호초 다이빙 명소',p:'오전'}]}},
// ── INDONESIA NEW ──
족자카르타:{kr:'족자카르타',en:'Yogyakarta',country:'인도네시아 🇮🇩',iata:'JOG',airport:'JOG',flight:'약 7시간',bc:'Yogyakarta, Indonesia',ab:'Yogyakarta--Indonesia',na:'ICN-JOG',
  costs:{flight:[380000,560000,960000],hotel:[18000,45000,90000,200000],food:[8000,20000,55000],tr:8000,act:28000},
  spots:{default:[{n:'보로부두르 사원',d:'세계 최대 불교 사원 유네스코',p:'새벽'},{n:'프람바난 힌두 사원',d:'자바 최대 힌두 사원',p:'오전'},{n:'크라톤 왕궁',d:'족자카르타 술탄 왕궁',p:'오전'},{n:'말리오보로 거리 쇼핑',d:'족자카르타 대표 쇼핑 거리',p:'오후'},{n:'므라피 화산 투어',d:'활화산 지프 투어',p:'오전'}]}},
// ── MALAYSIA NEW ──
랑카위:{kr:'랑카위',en:'Langkawi',country:'말레이시아 🇲🇾',iata:'LGK',airport:'LGK',flight:'약 7시간',bc:'Langkawi, Malaysia',ab:'Langkawi--Malaysia',na:'ICN-LGK',
  costs:{flight:[370000,550000,930000],hotel:[30000,70000,140000,320000],food:[10000,26000,68000],tr:12000,act:38000},
  spots:{default:[{n:'랑카위 스카이브리지',d:'100m 절벽 현수교',p:'오전'},{n:'판타이 체낭 비치',d:'랑카위 최고 해변',p:'오전'},{n:'망그로브 카약 투어',d:'열대 우림 카약',p:'오전'},{n:'두리안 버흥 폭포',d:'랑카위 최대 폭포',p:'오전'},{n:'이글 스퀘어 이글 상',d:'랑카위 상징 독수리 조각',p:'오후'}]}},
말라카:{kr:'말라카',en:'Malacca',country:'말레이시아 🇲🇾',iata:'KUL',airport:'KUL',flight:'약 7시간',bc:'Malacca, Malaysia',ab:'Malacca--Malaysia',na:'ICN-KUL',
  costs:{flight:[360000,530000,900000],hotel:[25000,60000,110000,240000],food:[10000,25000,62000],tr:8000,act:22000},
  spots:{default:[{n:'조나커 거리 & 차이나타운',d:'유네스코 역사 지구',p:'오전'},{n:'세인트폴 언덕',d:'포르투갈 교회 유적',p:'오전'},{n:'파모사 요새',d:'16세기 포르투갈 성채',p:'오전'},{n:'말라카 강변 야경',d:'야경 보트 투어',p:'저녁'},{n:'조나커 야시장',d:'매주 금-일 야시장',p:'저녁'}]}},
// ── TAIWAN NEW ──
지우펀:{kr:'지우펀',en:'Jiufen',country:'대만 🇹🇼',iata:'TPE',airport:'TPE',flight:'약 2.5시간',bc:'Jiufen, Taiwan',ab:'Jiufen--Taiwan',na:'ICN-TPE',
  costs:{flight:[240000,360000,650000],hotel:[40000,80000,140000,270000],food:[18000,40000,80000],tr:12000,act:20000},
  spots:{default:[{n:'지우펀 홍등 골목',d:'센과 치히로 배경 홍등 거리',p:'저녁'},{n:'아메이 찻집',d:'전통 대만 찻집',p:'오후'},{n:'기산제 전망대',d:'지우펀 최고 전망 포인트',p:'오전'},{n:'수치루 계단',d:'영화 속 붉은 계단',p:'오전'},{n:'예류 지질공원',d:'기암괴석 자연 경관',p:'오전'}]}},
화롄:{kr:'화롄',en:'Hualien',country:'대만 🇹🇼',iata:'HUN',airport:'HUN',flight:'약 2.5시간',bc:'Hualien, Taiwan',ab:'Hualien--Taiwan',na:'ICN-HUN',
  costs:{flight:[240000,360000,650000],hotel:[35000,75000,130000,260000],food:[15000,35000,75000],tr:14000,act:30000},
  spots:{default:[{n:'타이루거 국립공원',d:'웅장한 대리석 협곡 트래킹',p:'오전'},{n:'치싱탄 비치',d:'대만 동해안 조약돌 해변',p:'오전'},{n:'리위탄 호수',d:'빙하 침식 호수 풍경',p:'오전'},{n:'소림 폭포',d:'타이루거 계곡 폭포',p:'오전'},{n:'화롄 시장 간식',d:'지단 볶음·연어 덮밥',p:'점심'}]}},
타이중:{kr:'타이중',en:'Taichung',country:'대만 🇹🇼',iata:'RMQ',airport:'RMQ',flight:'약 2.5시간',bc:'Taichung, Taiwan',ab:'Taichung--Taiwan',na:'ICN-RMQ',
  costs:{flight:[240000,360000,650000],hotel:[40000,80000,140000,270000],food:[18000,40000,85000],tr:10000,act:22000},
  spots:{default:[{n:'레인보우 빌리지',d:'무지개 색채 군인 마을',p:'오전'},{n:'펑지아 야시장',d:'대만 최대 대학가 야시장',p:'저녁'},{n:'국립 자연과학박물관',d:'대만 최대 과학 박물관',p:'오전'},{n:'타이중 공원 호수',d:'도심 호수 공원',p:'오후'},{n:'가오메이 습지',d:'석양 반사 습지 풍경',p:'저녁'}]}},
// ── CHINA NEW ──
시안:{kr:'시안',en:'Xi\'an',country:'중국 🇨🇳',iata:'XIY',airport:'XIY',flight:'약 3시간',bc:'Xi\'an, China',ab:'Xi\'an--China',na:'ICN-XIY',
  costs:{flight:[300000,450000,800000],hotel:[40000,85000,155000,300000],food:[15000,38000,90000],tr:8000,act:40000},
  spots:{default:[{n:'병마용 (진시황릉)',d:'세계 8대 불가사의 병마용 갱',p:'종일'},{n:'시안 성벽',d:'명나라 시대 완전한 성벽',p:'오전'},{n:'회민 거리 이슬람 음식',d:'시안 이슬람 요리 골목',p:'저녁'},{n:'대안탑',d:'당나라 고승 현장 번역 사원',p:'오전'},{n:'화산 트래킹',d:'중국 5대 명산 화산',p:'종일'}]}},
항저우:{kr:'항저우',en:'Hangzhou',country:'중국 🇨🇳',iata:'HGH',airport:'HGH',flight:'약 2시간',bc:'Hangzhou, China',ab:'Hangzhou--China',na:'ICN-HGH',
  costs:{flight:[290000,440000,790000],hotel:[50000,100000,175000,350000],food:[18000,45000,108000],tr:10000,act:35000},
  spots:{default:[{n:'서호 유람',d:'중국 10대 절경 서호 보트',p:'오전'},{n:'링인사 사원',d:'항저우 최대 불교 사원',p:'오전'},{n:'서호 자전거 투어',d:'서호 주변 경치 자전거',p:'오후'},{n:'중국 차 박물관',d:'항저우 용정 녹차 체험',p:'오전'},{n:'우전 수향 마을',d:'물의 마을 고건축',p:'종일'}]}},
구이린:{kr:'구이린',en:'Guilin',country:'중국 🇨🇳',iata:'KWL',airport:'KWL',flight:'약 3시간',bc:'Guilin, China',ab:'Guilin--China',na:'ICN-KWL',
  costs:{flight:[300000,450000,800000],hotel:[35000,75000,135000,270000],food:[14000,35000,85000],tr:10000,act:38000},
  spots:{default:[{n:'리장 뱃놀이',d:'세계 최고 산수화 강',p:'종일'},{n:'양삭 자전거',d:'카르스트 지형 자전거 투어',p:'오전'},{n:'루디암 종유굴',d:'중국 최대 종유동굴',p:'오전'},{n:'룽지 계단식 논',d:'용의 등처럼 펼쳐진 계단식 논',p:'오전'},{n:'리강 유람선',d:'83km 리강 경관 유람',p:'종일'}]}},
장자제:{kr:'장자제',en:'Zhangjiajie',country:'중국 🇨🇳',iata:'DYG',airport:'DYG',flight:'약 3시간',bc:'Zhangjiajie, China',ab:'Zhangjiajie--China',na:'ICN-DYG',
  costs:{flight:[310000,460000,820000],hotel:[35000,75000,135000,270000],food:[14000,35000,85000],tr:12000,act:45000},
  spots:{default:[{n:'아바타 할렐루야 산',d:'아바타 영화 배경 모델 기둥산',p:'오전'},{n:'텐문산 케이블카',d:'세계 최장 케이블카',p:'오전'},{n:'유리 잔도 트래킹',d:'절벽 투명 유리 잔도',p:'오전'},{n:'황룡 동굴',d:'세계 최대 수심 종유동굴',p:'오전'},{n:'바지에 트래킹',d:'원시 자연 숲 트래킹',p:'오후'}]}},
// ── OTHER ASIA ──
루앙프라방:{kr:'루앙프라방',en:'Luang Prabang',country:'라오스 🇱🇦',iata:'LPQ',airport:'LPQ',flight:'약 7시간',bc:'Luang Prabang, Laos',ab:'Luang-Prabang--Laos',na:'ICN-LPQ',
  costs:{flight:[380000,560000,960000],hotel:[18000,45000,85000,190000],food:[7000,18000,48000],tr:8000,act:25000},
  spots:{default:[{n:'왓 씨엥통 사원',d:'루앙프라방 최고 사원',p:'오전'},{n:'탁발 행렬',d:'새벽 스님 탁발 의식',p:'새벽'},{n:'꽝씨 폭포',d:'다층 에메랄드 폭포',p:'오전'},{n:'푸씨 산 전망대',d:'루앙프라방 전경 일몰',p:'저녁'},{n:'야시장 수공예',d:'라오스 야시장 수공예품',p:'저녁'}]}},
프놈펜:{kr:'프놈펜',en:'Phnom Penh',country:'캄보디아 🇰🇭',iata:'PNH',airport:'PNH',flight:'약 6시간',bc:'Phnom Penh, Cambodia',ab:'Phnom-Penh--Cambodia',na:'ICN-PNH',
  costs:{flight:[340000,510000,880000],hotel:[18000,45000,85000,190000],food:[7000,18000,48000],tr:8000,act:22000},
  spots:{default:[{n:'왕궁 & 실버 파고다',d:'캄보디아 왕실 궁전',p:'오전'},{n:'킬링필드 (청앙에크)',d:'크메르 루주 대학살 역사',p:'오전'},{n:'뚜얼슬렝 박물관',d:'킬링필드 수용소 역사관',p:'오전'},{n:'러시안 마켓',d:'프놈펜 대표 재래시장',p:'오후'},{n:'메콩·바삭강 선셋 크루즈',d:'두 강 합류 석양 크루즈',p:'저녁'}]}},
트빌리시:{kr:'트빌리시',en:'Tbilisi',country:'조지아 🇬🇪',iata:'TBS',airport:'TBS',flight:'약 10시간',bc:'Tbilisi, Georgia',ab:'Tbilisi--Georgia',na:'ICN-TBS',
  costs:{flight:[520000,790000,1350000],hotel:[25000,55000,100000,220000],food:[12000,28000,72000],tr:8000,act:25000},
  spots:{default:[{n:'나리칼라 요새',d:'트빌리시 상징 고대 요새',p:'오전'},{n:'올드 트빌리시 구시가',d:'유황 온천·발코니 건물',p:'오전'},{n:'므츠헤타 대성당',d:'조지아 정교회 성지',p:'오전'},{n:'카즈베기 산악 마을',d:'코카서스 산맥 트래킹',p:'종일'},{n:'와인 & 차차 시음',d:'세계 최고(最古) 와인 문화',p:'저녁'}]}},
자이푸르:{kr:'자이푸르',en:'Jaipur',country:'인도 🇮🇳',iata:'JAI',airport:'JAI',flight:'약 8.5시간',bc:'Jaipur, India',ab:'Jaipur--India',na:'ICN-JAI',
  costs:{flight:[460000,700000,1150000],hotel:[25000,60000,120000,280000],food:[8000,20000,58000],tr:8000,act:30000},
  spots:{default:[{n:'암베르 요새',d:'핑크시티 대표 힌두 요새',p:'오전'},{n:'하와 마할 (바람의 궁전)',d:'953개 창문 5층 궁전',p:'오전'},{n:'시티 팰리스',d:'자이푸르 왕실 궁전 박물관',p:'오전'},{n:'잔타르 만타르',d:'유네스코 천문 관측소',p:'오전'},{n:'바자르 쇼핑',d:'핑크시티 전통 시장',p:'오후'}]}},
바라나시:{kr:'바라나시',en:'Varanasi',country:'인도 🇮🇳',iata:'VNS',airport:'VNS',flight:'약 8.5시간',bc:'Varanasi, India',ab:'Varanasi--India',na:'ICN-VNS',
  costs:{flight:[450000,680000,1120000],hotel:[18000,45000,90000,200000],food:[6000,16000,45000],tr:7000,act:22000},
  spots:{default:[{n:'갠지스강 가트 새벽 의식',d:'힌두교 성스러운 강변 의식',p:'새벽'},{n:'갠지스 보트 투어',d:'새벽 강 위 보트 유람',p:'새벽'},{n:'화장 가트 (마니카르니카)',d:'힌두교 성지 화장 의식',p:'오전'},{n:'다사스와메다 가트 푸자',d:'저녁 불꽃 의식',p:'저녁'},{n:'사르나트 불교 유적',d:'부처님 첫 설법 성지',p:'오전'}]}},
콜롬보:{kr:'콜롬보',en:'Colombo',country:'스리랑카 🇱🇰',iata:'CMB',airport:'CMB',flight:'약 8시간',bc:'Colombo, Sri Lanka',ab:'Colombo--Sri-Lanka',na:'ICN-CMB',
  costs:{flight:[430000,650000,1100000],hotel:[22000,55000,105000,240000],food:[8000,20000,55000],tr:8000,act:28000},
  spots:{default:[{n:'갈 페이스 그린',d:'콜롬보 해안 산책로',p:'저녁'},{n:'간가라마야 사원',d:'콜롬보 대표 불교 사원',p:'오전'},{n:'페타 시장',d:'콜롬보 전통 재래시장',p:'오전'},{n:'시기리야 (사자바위)',d:'유네스코 암벽 요새 (3h)',p:'종일'},{n:'캔디 불치사',d:'부처 치아 사리 사원',p:'오전'}]}},
포카라:{kr:'포카라',en:'Pokhara',country:'네팔 🇳🇵',iata:'PKR',airport:'PKR',flight:'약 6.5시간',bc:'Pokhara, Nepal',ab:'Pokhara--Nepal',na:'ICN-PKR',
  costs:{flight:[400000,600000,1000000],hotel:[18000,45000,88000,190000],food:[7000,16000,45000],tr:7000,act:45000},
  spots:{default:[{n:'안나푸르나 트래킹',d:'세계 최고 트래킹 코스',p:'종일'},{n:'페와 호수 보트 투어',d:'마차푸차레 반영 호수',p:'오전'},{n:'사랑코트 일출 전망',d:'히말라야 일출 조망',p:'새벽'},{n:'데비스 폴스 폭포',d:'지하로 사라지는 폭포',p:'오전'},{n:'패러글라이딩',d:'안나푸르나 배경 패러글라이딩',p:'오전'}]}},
// ── EUROPE NEW ──
리옹:{kr:'리옹',en:'Lyon',country:'프랑스 🇫🇷',iata:'LYS',airport:'LYS',flight:'약 13시간',bc:'Lyon, France',ab:'Lyon--France',na:'ICN-LYS',
  costs:{flight:[670000,1040000,2080000],hotel:[85000,155000,270000,540000],food:[36000,72000,162000],tr:15000,act:40000},
  spots:{default:[{n:'푸르비에르 대성당',d:'리옹 언덕 위 황금 성모상',p:'오전'},{n:'비유 리옹 구시가',d:'유네스코 르네상스 구시가',p:'오전'},{n:'레 알 폴 보퀴즈 시장',d:'리옹 최고 미식 시장',p:'오전'},{n:'뷔샹 레스토랑',d:'리옹 명물 전통 음식점',p:'저녁'},{n:'벨쿠르 광장',d:'유럽 최대 광장 중 하나',p:'오후'}]}},
세비야:{kr:'세비야',en:'Seville',country:'스페인 🇪🇸',iata:'SVQ',airport:'SVQ',flight:'약 13시간',bc:'Seville, Spain',ab:'Seville--Spain',na:'ICN-SVQ',
  costs:{flight:[660000,1020000,2050000],hotel:[70000,135000,240000,480000],food:[32000,65000,148000],tr:14000,act:40000},
  spots:{default:[{n:'알카사르 왕궁',d:'유네스코 무데하르 왕궁',p:'오전'},{n:'세비야 대성당 & 히랄다 탑',d:'세계 최대 고딕 성당',p:'오전'},{n:'스페인 광장',d:'영화 스타워즈 촬영지',p:'오후'},{n:'플라멩코 공연',d:'세비야 정통 플라멩코',p:'저녁'},{n:'트리아나 강변 타파스',d:'과달키비르강 타파스 거리',p:'저녁'}]}},
그라나다:{kr:'그라나다',en:'Granada',country:'스페인 🇪🇸',iata:'GRX',airport:'GRX',flight:'약 14시간',bc:'Granada, Spain',ab:'Granada--Spain',na:'ICN-GRX',
  costs:{flight:[670000,1040000,2080000],hotel:[65000,125000,225000,450000],food:[30000,62000,142000],tr:12000,act:35000},
  spots:{default:[{n:'알함브라 궁전',d:'세계 최고 이슬람 건축 유네스코',p:'오전'},{n:'헤네랄리페 정원',d:'알함브라 왕의 정원',p:'오전'},{n:'알바이신 지구',d:'이슬람 구시가 전망대',p:'오후'},{n:'플라멩코 동굴 공연',d:'집시 동굴 플라멩코',p:'저녁'},{n:'그라나다 타파스 바',d:'무료 타파스 문화',p:'저녁'}]}},
발렌시아:{kr:'발렌시아',en:'Valencia',country:'스페인 🇪🇸',iata:'VLC',airport:'VLC',flight:'약 14시간',bc:'Valencia, Spain',ab:'Valencia--Spain',na:'ICN-VLC',
  costs:{flight:[660000,1020000,2050000],hotel:[65000,125000,225000,450000],food:[30000,62000,142000],tr:12000,act:35000},
  spots:{default:[{n:'예술 과학 도시',d:'미래형 건축 복합 문화 공간',p:'오전'},{n:'발렌시아 대성당',d:'성배 보관 고딕 성당',p:'오전'},{n:'말바로사 비치',d:'발렌시아 대표 해변',p:'오후'},{n:'메르카도 센트랄',d:'유럽 최대 식품 시장',p:'오전'},{n:'파에야 레스토랑',d:'파에야 원산지 정통 요리',p:'점심'}]}},
나폴리:{kr:'나폴리',en:'Naples',country:'이탈리아 🇮🇹',iata:'NAP',airport:'NAP',flight:'약 13시간',bc:'Naples, Italy',ab:'Naples--Italy',na:'ICN-NAP',
  costs:{flight:[660000,1020000,2050000],hotel:[70000,130000,235000,470000],food:[32000,68000,155000],tr:14000,act:38000},
  spots:{default:[{n:'폼페이 유적',d:'베수비우스 화산 매몰 도시',p:'종일'},{n:'나폴리 피자',d:'마르게리타 피자 원산지',p:'점심'},{n:'카포디몬테 미술관',d:'카라바조·티치아노 명화',p:'오전'},{n:'베수비우스 화산 등반',d:'폼페이를 묻은 화산',p:'오전'},{n:'알레아 마에스트라 항구',d:'나폴리 항구 야경',p:'저녁'}]}},
아말피:{kr:'아말피',en:'Amalfi',country:'이탈리아 🇮🇹',iata:'NAP',airport:'NAP',flight:'약 13시간',bc:'Amalfi, Italy',ab:'Amalfi--Italy',na:'ICN-NAP',
  costs:{flight:[660000,1020000,2050000],hotel:[90000,170000,320000,640000],food:[38000,80000,180000],tr:18000,act:45000},
  spots:{default:[{n:'아말피 해안 드라이브',d:'세계 최고 해안 절벽 도로',p:'오전'},{n:'포지타노 마을',d:'절벽에 매달린 파스텔 마을',p:'오전'},{n:'아말피 대성당',d:'아랍-노르만 양식 성당',p:'오전'},{n:'라벨로 빌라 루폴로',d:'절벽 위 정원 전망',p:'오후'},{n:'보트 투어 & 해수욕',d:'아말피 코스트 보트',p:'오전'}]}},
베로나:{kr:'베로나',en:'Verona',country:'이탈리아 🇮🇹',iata:'VRN',airport:'VRN',flight:'약 13시간',bc:'Verona, Italy',ab:'Verona--Italy',na:'ICN-VRN',
  costs:{flight:[660000,1020000,2050000],hotel:[80000,150000,265000,530000],food:[36000,74000,168000],tr:14000,act:40000},
  spots:{default:[{n:'아레나 디 베로나 원형극장',d:'로마 시대 원형 경기장',p:'오전'},{n:'줄리엣의 집',d:'로미오와 줄리엣 배경지',p:'오전'},{n:'람베르티 탑 전망대',d:'베로나 구시가 전경',p:'오전'},{n:'에르베 광장',d:'베로나 중심 광장',p:'오후'},{n:'아디제 강변 야경',d:'베로나 강변 야경 산책',p:'저녁'}]}},
잘츠부르크:{kr:'잘츠부르크',en:'Salzburg',country:'오스트리아 🇦🇹',iata:'SZG',airport:'SZG',flight:'약 13시간',bc:'Salzburg, Austria',ab:'Salzburg--Austria',na:'ICN-SZG',
  costs:{flight:[650000,1000000,2000000],hotel:[90000,165000,290000,580000],food:[38000,78000,176000],tr:16000,act:45000},
  spots:{default:[{n:'호엔잘츠부르크 성',d:'유럽 최대 완전 중세 요새',p:'오전'},{n:'모차르트 생가',d:'모차르트 탄생지 박물관',p:'오전'},{n:'미라벨 정원',d:'사운드 오브 뮤직 촬영지',p:'오전'},{n:'구시가 게트라이데 거리',d:'유네스코 구시가 상점 거리',p:'오후'},{n:'잘츠카머구트 호수',d:'알프스 호수 당일치기',p:'종일'}]}},
할슈타트:{kr:'할슈타트',en:'Hallstatt',country:'오스트리아 🇦🇹',iata:'VIE',airport:'VIE',flight:'약 13시간',bc:'Hallstatt, Austria',ab:'Hallstatt--Austria',na:'ICN-VIE',
  costs:{flight:[640000,990000,1980000],hotel:[85000,160000,280000,560000],food:[36000,74000,168000],tr:18000,act:40000},
  spots:{default:[{n:'할슈타트 마을 전망',d:'세계에서 가장 아름다운 호수 마을',p:'오전'},{n:'다흐슈타인 소금광산',d:'7000년 역사 소금 광산',p:'오전'},{n:'할슈타트 호수 보트',d:'알프스 호수 보트 유람',p:'오전'},{n:'스카이워크 전망대',d:'360도 할슈타트 전망',p:'오전'},{n:'마을 교회 묘지',d:'세계적으로 유명한 납골당',p:'오전'}]}},
취리히:{kr:'취리히',en:'Zurich',country:'스위스 🇨🇭',iata:'ZRH',airport:'ZRH',flight:'약 13시간',bc:'Zurich, Switzerland',ab:'Zurich--Switzerland',na:'ICN-ZRH',
  costs:{flight:[680000,1050000,2100000],hotel:[130000,240000,420000,840000],food:[50000,105000,240000],tr:25000,act:55000},
  spots:{default:[{n:'반호프슈트라세 쇼핑',d:'세계 최고 명품 쇼핑 거리',p:'오후'},{n:'구시가 (알트슈타트)',d:'중세 골목 & 성 페터 교회',p:'오전'},{n:'취리히 호수 유람',d:'알프스 배경 호수 유람',p:'오전'},{n:'쿤스트하우스 미술관',d:'스위스 최대 미술관',p:'오전'},{n:'린덴호프 전망대',d:'취리히 구시가 전경',p:'오후'}]}},
체르마트:{kr:'체르마트',en:'Zermatt',country:'스위스 🇨🇭',iata:'ZRH',airport:'ZRH',flight:'약 13시간',bc:'Zermatt, Switzerland',ab:'Zermatt--Switzerland',na:'ICN-ZRH',
  costs:{flight:[680000,1050000,2100000],hotel:[120000,240000,430000,860000],food:[48000,100000,230000],tr:80000,act:90000},
  spots:{default:[{n:'마터호른 조망',d:'알프스 상징 피라미드형 설산',p:'오전'},{n:'고르너그라트 철도',d:'해발 3089m 전망대 기차',p:'오전'},{n:'스키 & 스노보드',d:'유럽 최고 스키 리조트',p:'종일'},{n:'체르마트 마을 산책',d:'차없는 알프스 마을',p:'오후'},{n:'마터호른 박물관',d:'체르마트 등반 역사',p:'오전'}]}},
바르샤바:{kr:'바르샤바',en:'Warsaw',country:'폴란드 🇵🇱',iata:'WAW',airport:'WAW',flight:'약 12시간',bc:'Warsaw, Poland',ab:'Warsaw--Poland',na:'ICN-WAW',
  costs:{flight:[600000,920000,1840000],hotel:[55000,105000,185000,370000],food:[25000,52000,120000],tr:14000,act:35000},
  spots:{default:[{n:'바르샤바 구시가 (유네스코)',d:'전쟁 후 재건된 구시가',p:'오전'},{n:'왕궁 & 성 요한 대성당',d:'폴란드 왕실 궁전',p:'오전'},{n:'쇼팽 박물관',d:'쇼팽 탄생지 음악 박물관',p:'오전'},{n:'바르샤바 봉기 박물관',d:'2차대전 역사 박물관',p:'오후'},{n:'와지엔키 공원',d:'쇼팽 동상·여름 콘서트',p:'오후'}]}},
브뤼셀:{kr:'브뤼셀',en:'Brussels',country:'벨기에 🇧🇪',iata:'BRU',airport:'BRU',flight:'약 13시간',bc:'Brussels, Belgium',ab:'Brussels--Belgium',na:'ICN-BRU',
  costs:{flight:[650000,1000000,2000000],hotel:[90000,165000,290000,580000],food:[38000,78000,178000],tr:16000,act:42000},
  spots:{default:[{n:'그랑 플라스',d:'세계 최고 아름다운 광장 유네스코',p:'오전'},{n:'오줌 누는 동상 (마네켄 피스)',d:'브뤼셀 상징 작은 동상',p:'오전'},{n:'벨기에 왕립 박물관',d:'루벤스·마그리트 명화',p:'오전'},{n:'초콜릿·와플 쇼핑',d:'벨기에 초콜릿 전문점',p:'오후'},{n:'생 튀베르 쇼핑 아케이드',d:'19세기 유리 지붕 아케이드',p:'오후'}]}},
브뤼헤:{kr:'브뤼헤',en:'Bruges',country:'벨기에 🇧🇪',iata:'BRU',airport:'BRU',flight:'약 13시간',bc:'Bruges, Belgium',ab:'Bruges--Belgium',na:'ICN-BRU',
  costs:{flight:[650000,1000000,2000000],hotel:[85000,160000,280000,560000],food:[36000,74000,170000],tr:16000,act:40000},
  spots:{default:[{n:'마르크트 광장',d:'브뤼헤 중심 광장·종루',p:'오전'},{n:'운하 보트 투어',d:'중세 수로 보트',p:'오전'},{n:'그로닌헤 미술관',d:'플랑드르 원시파 명화',p:'오전'},{n:'초콜릿 박물관',d:'벨기에 초콜릿 역사',p:'오후'},{n:'브뤼헤 맥주 체험',d:'벨기에 수도원 맥주',p:'저녁'}]}},
포르투:{kr:'포르투',en:'Porto',country:'포르투갈 🇵🇹',iata:'OPO',airport:'OPO',flight:'약 14시간',bc:'Porto, Portugal',ab:'Porto--Portugal',na:'ICN-OPO',
  costs:{flight:[660000,1020000,2040000],hotel:[70000,130000,230000,460000],food:[30000,62000,142000],tr:13000,act:38000},
  spots:{default:[{n:'히베이라 강변 지구',d:'유네스코 도우루강 강변',p:'오전'},{n:'렐루 서점',d:'세계 3대 서점 고딕 계단',p:'오전'},{n:'포트와인 셀러 투어',d:'빌라 노바 드 가이아 와이너리',p:'오후'},{n:'클레리구스 탑 전망',d:'포르투 전경 종루 탑',p:'오전'},{n:'아줄레주 타일 건물',d:'포르투 전통 파란 타일',p:'오전'}]}},
미코노스:{kr:'미코노스',en:'Mykonos',country:'그리스 🇬🇷',iata:'JMK',airport:'JMK',flight:'약 13시간',bc:'Mykonos, Greece',ab:'Mykonos--Greece',na:'ICN-JMK',
  costs:{flight:[680000,1050000,2100000],hotel:[100000,200000,380000,780000],food:[42000,88000,200000],tr:16000,act:55000},
  spots:{default:[{n:'리틀 베니스',d:'바다 위 풍차·바 거리',p:'저녁'},{n:'미코노스 타운 골목',d:'새하얀 미로 골목 탐방',p:'오전'},{n:'파라다이스 비치',d:'파티 & 수영 해변',p:'오후'},{n:'델로스 섬',d:'아폴론 신전 고대 유적',p:'오전'},{n:'일몰 칵테일 바',d:'에게해 석양 칵테일',p:'저녁'}]}},
레이캬비크:{kr:'레이캬비크',en:'Reykjavik',country:'아이슬란드 🇮🇸',iata:'KEF',airport:'KEF',flight:'약 16시간',bc:'Reykjavik, Iceland',ab:'Reykjavik--Iceland',na:'ICN-KEF',
  costs:{flight:[780000,1200000,2400000],hotel:[110000,210000,380000,760000],food:[50000,105000,240000],tr:20000,act:70000},
  spots:{default:[{n:'오로라 북극광 투어',d:'아이슬란드 오로라 감상',p:'저녁'},{n:'골든 서클 투어',d:'게이시르·굴포스·싱벨리르',p:'종일'},{n:'블루 라군 온천',d:'지열 온천 스파',p:'오전'},{n:'할그림스키르캬 교회',d:'아이슬란드 상징 교회',p:'오전'},{n:'레이캬네스 화산 투어',d:'최근 활화산 지형',p:'오전'}]}},
헬싱키:{kr:'헬싱키',en:'Helsinki',country:'핀란드 🇫🇮',iata:'HEL',airport:'HEL',flight:'약 10시간',bc:'Helsinki, Finland',ab:'Helsinki--Finland',na:'ICN-HEL',
  costs:{flight:[560000,860000,1720000],hotel:[100000,185000,325000,650000],food:[45000,92000,210000],tr:20000,act:50000},
  spots:{default:[{n:'헬싱키 대성당 원로원 광장',d:'핀란드 상징 신고전 성당',p:'오전'},{n:'수오멘린나 요새',d:'유네스코 세계유산 해상 요새',p:'오전'},{n:'핀란드 사우나 체험',d:'핀란드 국민 문화 사우나',p:'오후'},{n:'우스펜스키 성당',d:'북유럽 최대 정교회',p:'오전'},{n:'에스플라나디 공원 시장',d:'핀란드 수공예 마켓',p:'오전'}]}},
오슬로:{kr:'오슬로',en:'Oslo',country:'노르웨이 🇳🇴',iata:'OSL',airport:'OSL',flight:'약 11시간',bc:'Oslo, Norway',ab:'Oslo--Norway',na:'ICN-OSL',
  costs:{flight:[590000,910000,1820000],hotel:[110000,205000,360000,720000],food:[50000,105000,240000],tr:22000,act:55000},
  spots:{default:[{n:'뭉크 박물관',d:'절규 등 뭉크 대표작',p:'오전'},{n:'비겔란 조각 공원',d:'200여 나체 조각상 공원',p:'오전'},{n:'아케르스후스 요새',d:'오슬로 피오르 전망 요새',p:'오전'},{n:'프람 박물관',d:'극지 탐험선 박물관',p:'오전'},{n:'쇠렝가 피오르 수영',d:'도심 속 피오르 야외 수영',p:'오후'}]}},
카파도키아:{kr:'카파도키아',en:'Cappadocia',country:'터키 🇹🇷',iata:'ASR',airport:'ASR',flight:'약 11시간',bc:'Cappadocia, Turkey',ab:'Cappadocia--Turkey',na:'ICN-ASR',
  costs:{flight:[580000,890000,1780000],hotel:[50000,100000,190000,420000],food:[22000,48000,115000],tr:14000,act:65000},
  spots:{default:[{n:'열기구 투어',d:'일출 카파도키아 열기구',p:'새벽'},{n:'괴레메 야외 박물관',d:'유네스코 암굴 교회',p:'오전'},{n:'우치히사르 성채',d:'카파도키아 전경 조망',p:'오전'},{n:'데린쿠유 지하 도시',d:'수만 명 수용 지하 도시',p:'오전'},{n:'ATV 카파도키아 투어',d:'기암 계곡 ATV 드라이브',p:'오후'}]}},
더블린:{kr:'더블린',en:'Dublin',country:'아일랜드 🇮🇪',iata:'DUB',airport:'DUB',flight:'약 13시간',bc:'Dublin, Ireland',ab:'Dublin--Ireland',na:'ICN-DUB',
  costs:{flight:[660000,1020000,2040000],hotel:[100000,185000,325000,650000],food:[45000,92000,210000],tr:20000,act:48000},
  spots:{default:[{n:'기네스 스토어하우스',d:'기네스 맥주 박물관',p:'오전'},{n:'트리니티 칼리지 켈스 복음서',d:'800년 역사 필사본',p:'오전'},{n:'템플 바 골목',d:'더블린 문화·술집 거리',p:'저녁'},{n:'더블린 성',d:'아일랜드 권력의 상징',p:'오전'},{n:'클리프스 오브 모허',d:'절벽 위 아이리시해 절경',p:'종일'}]}},
// ── MIDDLE EAST / AFRICA ──
// 두바이 — 기존 DB 유지
페트라:{kr:'페트라',en:'Petra',country:'요르단 🇯🇴',iata:'AMM',airport:'AMM',flight:'약 10시간',bc:'Petra, Jordan',ab:'Petra--Jordan',na:'ICN-AMM',
  costs:{flight:[530000,800000,1400000],hotel:[40000,90000,170000,360000],food:[18000,42000,105000],tr:14000,act:50000},
  spots:{default:[{n:'시크 협곡 & 트레저리',d:'세계 7대 불가사의 장밋빛 사원',p:'오전'},{n:'페트라 야간 투어',d:'촛불로 밝히는 트레저리',p:'저녁'},{n:'모나스터리',d:'페트라 최대 건축물',p:'오전'},{n:'하이 플레이스 트래킹',d:'고원 제단 전망 트래킹',p:'오전'},{n:'와디럼 사막 캠핑',d:'붉은 사막 베두인 캠핑',p:'저녁'}]}},
// 카이로 — 기존 DB 유지
// 마라케시, 잔지바르, 케이프타운 — 기존 DB 유지
// ── AMERICAS ──
// 뉴욕, 하와이, 라스베이거스 — 기존 DB 유지
마이애미:{kr:'마이애미',en:'Miami',country:'미국 🇺🇸',iata:'MIA',airport:'MIA',flight:'약 15시간',bc:'Miami, USA',ab:'Miami--United-States',na:'ICN-MIA',
  costs:{flight:[700000,1080000,2160000],hotel:[120000,230000,420000,850000],food:[42000,88000,210000],tr:22000,act:60000},
  spots:{default:[{n:'사우스 비치',d:'아르데코 건물·유명 해변',p:'오전'},{n:'에버글레이즈 국립공원',d:'악어 서식 습지 에어보트',p:'오전'},{n:'아트 바젤 & 윈우드',d:'세계적 아트 거리',p:'오후'},{n:'리틀 아바나 쿠바 문화',d:'쿠바 이민자 문화 거리',p:'오전'},{n:'마이애미 항구 유람',d:'요트·마리나 야경',p:'저녁'}]}},
시카고:{kr:'시카고',en:'Chicago',country:'미국 🇺🇸',iata:'ORD',airport:'ORD',flight:'약 13시간',bc:'Chicago, USA',ab:'Chicago--United-States',na:'ICN-ORD',
  costs:{flight:[650000,1000000,2000000],hotel:[120000,225000,400000,800000],food:[40000,84000,195000],tr:22000,act:55000},
  spots:{default:[{n:'밀레니엄 파크 & 클라우드 게이트',d:'시카고 상징 콩 조각상',p:'오전'},{n:'시카고 미술관',d:'쇠라·그랜트 우드 명화',p:'오전'},{n:'시카고 강 건축 투어',d:'보트로 보는 현대 건축',p:'오전'},{n:'네이비 피어',d:'미시간 호수 관람차·공원',p:'오후'},{n:'딥 디쉬 피자',d:'시카고 명물 두꺼운 피자',p:'점심'}]}},
샌프란시스코:{kr:'샌프란시스코',en:'San Francisco',country:'미국 🇺🇸',iata:'SFO',airport:'SFO',flight:'약 11시간',bc:'San Francisco, USA',ab:'San-Francisco--United-States',na:'ICN-SFO',
  costs:{flight:[620000,960000,1920000],hotel:[130000,250000,450000,900000],food:[42000,88000,210000],tr:25000,act:58000},
  spots:{default:[{n:'골든 게이트 브릿지',d:'세계 최고 현수교',p:'오전'},{n:'알카트래즈 아일랜드',d:'악명 높은 섬 감옥 투어',p:'오전'},{n:'피셔맨스 워프',d:'씨푸드·해산물 항구',p:'점심'},{n:'케이블카 라이드',d:'샌프란시스코 명물 케이블카',p:'오전'},{n:'차이나타운',d:'미국 최고(最古) 차이나타운',p:'오후'}]}},
// 밴쿠버, 칸쿤 — 기존 DB 유지
부에노스아이레스:{kr:'부에노스아이레스',en:'Buenos Aires',country:'아르헨티나 🇦🇷',iata:'EZE',airport:'EZE',flight:'약 25시간',bc:'Buenos Aires, Argentina',ab:'Buenos-Aires--Argentina',na:'ICN-EZE',
  costs:{flight:[900000,1380000,2760000],hotel:[35000,80000,165000,380000],food:[12000,30000,85000],tr:8000,act:38000},
  spots:{default:[{n:'라 보카 카미니토',d:'탱고 발상지 색깔 골목',p:'오전'},{n:'레콜레타 공동묘지',d:'에비타 페론 무덤',p:'오전'},{n:'탱고 공연 & 디너쇼',d:'부에노스아이레스 정통 탱고',p:'저녁'},{n:'플로리다 거리 쇼핑',d:'부에노스아이레스 쇼핑 거리',p:'오후'},{n:'팔레르모 와인 바',d:'아르헨티나 말벡 와인',p:'저녁'}]}},
리마:{kr:'리마',en:'Lima',country:'페루 🇵🇪',iata:'LIM',airport:'LIM',flight:'약 22시간',bc:'Lima, Peru',ab:'Lima--Peru',na:'ICN-LIM',
  costs:{flight:[850000,1300000,2600000],hotel:[35000,80000,165000,380000],food:[12000,28000,80000],tr:10000,act:38000},
  spots:{default:[{n:'마추픽추 투어',d:'잉카 공중 도시 유네스코',p:'종일'},{n:'역사지구 (미라플로레스)',d:'리마 현대 해안 지구',p:'오전'},{n:'세비체 미식 투어',d:'페루 국민 요리 세비체',p:'점심'},{n:'우아카 푸클야나 유적',d:'도심 속 어도비 피라미드',p:'오후'},{n:'이카 사막 오아시스',d:'와카치나 사막 샌드보딩',p:'종일'}]}},
리우데자네이루:{kr:'리우데자네이루',en:'Rio de Janeiro',country:'브라질 🇧🇷',iata:'GIG',airport:'GIG',flight:'약 26시간',bc:'Rio de Janeiro, Brazil',ab:'Rio-de-Janeiro--Brazil',na:'ICN-GIG',
  costs:{flight:[920000,1400000,2800000],hotel:[50000,110000,230000,520000],food:[15000,38000,105000],tr:10000,act:45000},
  spots:{default:[{n:'크리스토 레덴토르 (예수상)',d:'세계 7대 불가사의 리우 예수상',p:'오전'},{n:'이파네마 & 코파카바나 비치',d:'세계 최고 해변',p:'오전'},{n:'팡 드 아수카르 케이블카',d:'슈가 로프 산 전망',p:'오후'},{n:'카니발 삼바 공연',d:'리우 카니발 체험',p:'저녁'},{n:'산타 테레사 & 라파 아치',d:'예술인 마을 & 보사노바',p:'저녁'}]}},
// ── OCEANIA ──
// 시드니, 골드코스트, 퀸스타운 — 기존 DB 유지
피지:{kr:'피지',en:'Fiji',country:'피지 🇫🇯',iata:'NAN',airport:'NAN',flight:'약 12시간',bc:'Nadi, Fiji',ab:'Fiji--Fiji',na:'ICN-NAN',
  costs:{flight:[650000,1000000,2000000],hotel:[45000,110000,230000,550000],food:[18000,42000,110000],tr:18000,act:60000},
  spots:{default:[{n:'야사와 섬 스노클링',d:'피지 최고 에메랄드 섬',p:'오전'},{n:'마나 아일랜드',d:'마나 섬 리조트 스테이',p:'종일'},{n:'수바 전통 카바 의식',d:'피지 전통 음료 의식',p:'오후'},{n:'시가토카 샌드 듄',d:'피지 사막 사구 투어',p:'오전'},{n:'피지 피싱 & 스쿠버',d:'투명한 피지 바다 다이빙',p:'오전'}]}}
};

// HIER extensions
const HIER_NEW={
  '아시아·태평양':{
    '🇯🇵 일본':['히로시마','나가사키','요코하마','고베','하코네','가마쿠라','벳푸','가나자와','닛코'],
    '🇹🇭 태국':['크라비','코사무이','아유타야','치앙라이'],
    '🇻🇳 베트남':['푸꾸옥','후에','달랏','하롱'],
    '🇵🇭 필리핀':['팔라완','보홀'],
    '🇮🇩 인도네시아':['족자카르타'],
    '🇲🇾 말레이시아':['랑카위','말라카'],
    '🇹🇼 대만':['지우펀','화롄','타이중'],
    '🇨🇳 중국':['시안','항저우','구이린','장자제'],
    '🇱🇦 라오스':['루앙프라방'],
    '🇰🇭 캄보디아':['프놈펜'],
    '🇬🇪 조지아':['트빌리시'],
    '🇮🇳 인도':['자이푸르','바라나시'],
    '🇱🇰 스리랑카':['콜롬보'],
    '🇳🇵 네팔':['포카라']
  },
  '유럽':{
    '🇫🇷 프랑스':['리옹'],
    '🇪🇸 스페인':['세비야','그라나다','발렌시아'],
    '🇮🇹 이탈리아':['나폴리','아말피','베로나'],
    '🇦🇹 오스트리아':['잘츠부르크','할슈타트'],
    '🇨🇭 스위스':['취리히','체르마트'],
    '🇵🇱 폴란드':['바르샤바'],
    '🇧🇪 벨기에':['브뤼셀','브뤼헤'],
    '🇵🇹 포르투갈':['포르투'],
    '🇬🇷 그리스':['미코노스'],
    '🇮🇸 아이슬란드':['레이캬비크'],
    '🇫🇮 핀란드':['헬싱키'],
    '🇳🇴 노르웨이':['오슬로'],
    '🇹🇷 터키':['카파도키아'],
    '🇮🇪 아일랜드':['더블린']
  },
  '중동·아프리카':{
    '🇯🇴 요르단':['페트라']
  },
  '아메리카':{
    '🇺🇸 미국':['마이애미','시카고','샌프란시스코'],
    '🇦🇷 아르헨티나':['부에노스아이레스'],
    '🇵🇪 페루':['리마'],
    '🇧🇷 브라질':['리우데자네이루']
  },
  '오세아니아':{
    '🇫🇯 피지':['피지']
  }
};

// ALIAS extensions
const ALIAS_NEW={
  'hiroshima':'히로시마','nagasaki':'나가사키','yokohama':'요코하마','kobe':'고베',
  'hakone':'하코네','kamakura':'가마쿠라','beppu':'벳푸','kanazawa':'가나자와','nikko':'닛코',
  'krabi':'크라비','kohsamui':'코사무이','ayutthaya':'아유타야','chiangrai':'치앙라이',
  'phuquoc':'푸꾸옥','hue':'후에','dalat':'달랏','halong':'하롱',
  'palawan':'팔라완','bohol':'보홀','yogyakarta':'족자카르타',
  'langkawi':'랑카위','malacca':'말라카','melaka':'말라카',
  'jiufen':'지우펀','hualien':'화롄','taichung':'타이중',
  'xian':'시안','hangzhou':'항저우','guilin':'구이린','zhangjiajie':'장자제',
  'luangprabang':'루앙프라방','phnompenh':'프놈펜','tbilisi':'트빌리시',
  'jaipur':'자이푸르','varanasi':'바라나시','colombo':'콜롬보','pokhara':'포카라',
  'lyon':'리옹','seville':'세비야','sevilla':'세비야','granada':'그라나다',
  'valencia':'발렌시아','naples':'나폴리','amalfi':'아말피','verona':'베로나',
  'salzburg':'잘츠부르크','hallstatt':'할슈타트','zurich':'취리히','zermatt':'체르마트',
  'warsaw':'바르샤바','brussels':'브뤼셀','bruges':'브뤼헤','porto':'포르투',
  'mykonos':'미코노스','reykjavik':'레이캬비크','helsinki':'헬싱키',
  'oslo':'오슬로','cappadocia':'카파도키아','dublin':'더블린',
  'dubai':'두바이','petra':'페트라','cairo':'카이로','marrakech':'마라케시',
  'zanzibar':'잔지바르','capetown':'케이프타운',
  'newyork':'뉴욕','hawaii':'하와이','lasvegas':'라스베이거스','miami':'마이애미',
  'chicago':'시카고','sanfrancisco':'샌프란시스코','vancouver':'밴쿠버',
  'cancun':'칸쿤','buenosaires':'부에노스아이레스','lima':'리마','rio':'리우데자네이루',
  'sydney':'시드니','goldcoast':'골드코스트','queenstown':'퀸스타운','fiji':'피지'
};

// Merge into global DB (기존 항목 보호)
for(const[k,v] of Object.entries(EXT)) if(!DB[k]) DB[k]=v;

// Merge HIER
Object.keys(HIER_NEW).forEach(cont=>{
  if(!HIER[cont]) HIER[cont]={};
  Object.keys(HIER_NEW[cont]).forEach(country=>{
    if(!HIER[cont][country]) HIER[cont][country]=[];
    HIER_NEW[cont][country].forEach(city=>{
      if(!HIER[cont][country].includes(city)) HIER[cont][country].push(city);
    });
  });
});

// Merge ALIAS
Object.assign(ALIAS, ALIAS_NEW);

// Rebuild CMAP
for(const key of Object.keys(CMAP)) delete CMAP[key];
for(const[c,countries] of Object.entries(HIER))
  for(const cities of Object.values(countries))
    cities.forEach(city=>CMAP[city]=c);

console.log('TripMind DB extended:', Object.keys(DB).length, 'destinations');
})();
