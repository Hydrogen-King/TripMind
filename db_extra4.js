(function(){
const EXT4={
// ── JAPAN ──
히메지:{kr:'히메지',en:'Himeji',country:'일본 🇯🇵',iata:'KIX',airport:'KIX',flight:'약 2시간',bc:'Himeji, Japan',ab:'Himeji--Japan',na:'ICN-KIX',
  costs:{flight:[230000,360000,640000],hotel:[42000,82000,140000,280000],food:[22000,48000,96000],tr:10000,act:25000},
  spots:{default:[{n:'히메지성 (백로성)',d:'유네스코 세계문화유산 일본 최고 성',p:'오전'},{n:'고코엔 정원',d:'히메지성 앞 무료 일본 정원',p:'오전'},{n:'효고현립역사박물관',d:'히메지성 역사 전시',p:'오전'},{n:'야마사카마보코',d:'히메지 명물 어묵 공장 견학',p:'오전'},{n:'쇼샤잔 연기사',d:'히메지 근교 산 사원',p:'오전'}]}},
센다이:{kr:'센다이',en:'Sendai',country:'일본 🇯🇵',iata:'SDJ',airport:'SDJ',flight:'약 2.5시간',bc:'Sendai, Japan',ab:'Sendai--Japan',na:'ICN-SDJ',
  costs:{flight:[260000,395000,705000],hotel:[42000,84000,145000,290000],food:[24000,52000,105000],tr:10000,act:28000},
  spots:{default:[{n:'마쓰시마 만 유람',d:'일본 3대 경관 소나무 섬',p:'오전'},{n:'아오바성 유적',d:'다테 마사무네 성터',p:'오전'},{n:'서대문 탄코 거리',d:'센다이 최대 쇼핑 거리',p:'오후'},{n:'오슈 히에이잔 온천',d:'센다이 근교 온천',p:'오후'},{n:'규탄 (소 혀 구이)',d:'센다이 명물 소혀 구이',p:'점심'}]}},
구마모토:{kr:'구마모토',en:'Kumamoto',country:'일본 🇯🇵',iata:'KMJ',airport:'KMJ',flight:'약 2시간',bc:'Kumamoto, Japan',ab:'Kumamoto--Japan',na:'ICN-KMJ',
  costs:{flight:[240000,375000,668000],hotel:[40000,80000,138000,278000],food:[22000,48000,96000],tr:10000,act:26000},
  spots:{default:[{n:'구마모토 성',d:'일본 3대 명성 재건 중',p:'오전'},{n:'아소 화산',d:'세계 최대 칼데라 화산',p:'오전'},{n:'구마모토 라멘',d:'돈코쓰 라멘 원조',p:'점심'},{n:'스이젠지 정원',d:'에도 시대 규모 대형 정원',p:'오전'},{n:'구로카와 온천',d:'아소 근교 고급 온천 마을',p:'오후'}]}},
// ── MYANMAR ──
만달레이:{kr:'만달레이',en:'Mandalay',country:'미얀마 🇲🇲',iata:'MDL',airport:'MDL',flight:'약 6.5시간',bc:'Mandalay, Myanmar',ab:'Mandalay--Myanmar',na:'ICN-MDL',
  costs:{flight:[390000,585000,1000000],hotel:[20000,50000,95000,215000],food:[7000,18000,48000],tr:8000,act:25000},
  spots:{default:[{n:'마하무니 불상',d:'미얀마 4대 성불 중 하나',p:'오전'},{n:'우베인 목조 다리',d:'세계 최장 티크 목조 다리',p:'저녁'},{n:'만달레이 언덕 전망',d:'이라와디강 전경 일몰',p:'저녁'},{n:'민군 파야',d:'세계 최대 미완성 탑',p:'오전'},{n:'인와 고도 유적',d:'미얀마 고대 왕국 수도',p:'오전'}]}},
인레호수:{kr:'인레호수',en:'Inle Lake',country:'미얀마 🇲🇲',iata:'HEH',airport:'HEH',flight:'약 7시간',bc:'Inle Lake, Myanmar',ab:'Inle-Lake--Myanmar',na:'ICN-HEH',
  costs:{flight:[400000,600000,1050000],hotel:[22000,55000,105000,240000],food:[7000,18000,50000],tr:12000,act:35000},
  spots:{default:[{n:'인레 보트 투어',d:'외발 노 젓기 어부',p:'오전'},{n:'파웅도우 불상 사원',d:'황금 알 모양 불상',p:'오전'},{n:'수상 정원',d:'물 위 떠 있는 텃밭',p:'오전'},{n:'냐웅쉐 마을',d:'인레호수 게이트웨이 마을',p:'오전'},{n:'와이너리 레드마운틴',d:'미얀마 유일 와이너리',p:'오후'}]}},
// ── INDIA EXTRA ──
아그라:{kr:'아그라',en:'Agra',country:'인도 🇮🇳',iata:'AGR',airport:'AGR',flight:'약 8시간',bc:'Agra, India',ab:'Agra--India',na:'ICN-AGR',
  costs:{flight:[450000,680000,1140000],hotel:[22000,55000,110000,250000],food:[8000,20000,58000],tr:8000,act:30000},
  spots:{default:[{n:'타지마할 일출',d:'세계 7대 불가사의 대리석 능',p:'새벽'},{n:'아그라 요새',d:'유네스코 무굴 황실 요새',p:'오전'},{n:'파테푸르 시크리',d:'무굴 유네스코 유령 도시',p:'오전'},{n:'이타드-우드-다울라 묘',d:'작은 타지마할',p:'오전'},{n:'아그라 로컬 사리 직물',d:'아그라 전통 직물 쇼핑',p:'오후'}]}},
방갈로르:{kr:'방갈로르',en:'Bangalore',country:'인도 🇮🇳',iata:'BLR',airport:'BLR',flight:'약 8.5시간',bc:'Bangalore, India',ab:'Bangalore--India',na:'ICN-BLR',
  costs:{flight:[450000,680000,1140000],hotel:[30000,70000,145000,320000],food:[9000,22000,62000],tr:8000,act:28000},
  spots:{default:[{n:'큐 가든 & 식물원',d:'방갈로르 최고 정원',p:'오전'},{n:'방갈로르 팰리스',d:'19세기 왕실 궁전',p:'오전'},{n:'비드하나 사우다',d:'방갈로르 상징 정부 청사',p:'오전'},{n:'실크 보드 IT 단지',d:'인도 IT 허브 투어',p:'오전'},{n:'UB시티 쇼핑',d:'방갈로르 고급 쇼핑몰',p:'오후'}]}},
코치:{kr:'코치',en:'Kochi',country:'인도 🇮🇳',iata:'COK',airport:'COK',flight:'약 8.5시간',bc:'Kochi, India',ab:'Kochi--India',na:'ICN-COK',
  costs:{flight:[445000,675000,1130000],hotel:[22000,55000,110000,250000],food:[8000,20000,55000],tr:7000,act:28000},
  spots:{default:[{n:'포르트 코치 구시가',d:'포르투갈·유대 식민지 역사',p:'오전'},{n:'중국 어망 (Chinese Fishing Nets)',d:'중국식 전통 어망',p:'오전'},{n:'성 프란시스 성당',d:'인도 최고(最古) 유럽 성당',p:'오전'},{n:'케랄라 백워터 크루즈',d:'케랄라 수로 하우스보트',p:'종일'},{n:'코치 카타칼리 공연',d:'케랄라 전통 무용 공연',p:'저녁'}]}},
// ── CHINA EXTRA ──
황산:{kr:'황산',en:'Huangshan',country:'중국 🇨🇳',iata:'TXN',airport:'TXN',flight:'약 3시간',bc:'Huangshan, China',ab:'Huangshan--China',na:'ICN-TXN',
  costs:{flight:[300000,450000,800000],hotel:[38000,78000,140000,285000],food:[14000,35000,86000],tr:12000,act:45000},
  spots:{default:[{n:'황산 케이블카',d:'기이한 소나무·바위 명산',p:'오전'},{n:'후이저우 고촌 (홍촌)',d:'유네스코 전통 마을',p:'오전'},{n:'서해 대협곡',d:'황산 장관 협곡 트래킹',p:'오전'},{n:'운해 일출',d:'황산 구름 바다 일출',p:'새벽'},{n:'잉커 온천',d:'황산 자락 온천 스파',p:'오후'}]}},
쑤저우:{kr:'쑤저우',en:'Suzhou',country:'중국 🇨🇳',iata:'SHA',airport:'PVG',flight:'약 2시간',bc:'Suzhou, China',ab:'Suzhou--China',na:'ICN-PVG',
  costs:{flight:[290000,440000,780000],hotel:[50000,100000,175000,355000],food:[18000,45000,110000],tr:10000,act:35000},
  spots:{default:[{n:'졸정원 (졸政园)',d:'유네스코 중국 최고 정원',p:'오전'},{n:'유원 (留园)',d:'유네스코 명청 정원',p:'오전'},{n:'평강로 고거리',d:'수향 마을 수로 골목',p:'오전'},{n:'쑤저우 자수 박물관',d:'중국 최고 자수 문화',p:'오전'},{n:'수로 보트 투어',d:'동양의 베네치아 수로',p:'오전'}]}},
// ── SOUTHEAST ASIA EXTRA ──
씨아누크빌:{kr:'씨아누크빌',en:'Sihanoukville',country:'캄보디아 🇰🇭',iata:'KOS',airport:'KOS',flight:'약 6.5시간',bc:'Sihanoukville, Cambodia',ab:'Sihanoukville--Cambodia',na:'ICN-KOS',
  costs:{flight:[355000,530000,930000],hotel:[15000,38000,75000,175000],food:[7000,17000,47000],tr:8000,act:30000},
  spots:{default:[{n:'코롱 아일랜드 스노클링',d:'씨아누크빌 최고 섬',p:'오전'},{n:'오크체아트알 비치',d:'씨아누크빌 대표 해변',p:'오전'},{n:'카우포아 비치',d:'조용한 숨겨진 해변',p:'오전'},{n:'일몰 크루즈',d:'캄보디아 석양 선상',p:'저녁'},{n:'씨아누크빌 야시장',d:'해산물 로컬 야시장',p:'저녁'}]}},
사파:{kr:'사파',en:'Sapa',country:'베트남 🇻🇳',iata:'HAN',airport:'HAN',flight:'약 5시간',bc:'Sapa, Vietnam',ab:'Sapa--Vietnam',na:'ICN-HAN',
  costs:{flight:[305000,455000,795000],hotel:[18000,45000,88000,200000],food:[7000,17000,46000],tr:12000,act:30000},
  spots:{default:[{n:'판시판 산 케이블카',d:'인도차이나 최고봉 3143m',p:'오전'},{n:'계단식 논 트래킹',d:'소수민족 마을 계단논',p:'오전'},{n:'소수민족 마을 방문',d:'흐몽·자오족 문화 체험',p:'오전'},{n:'사파 마켓',d:'소수민족 수공예 시장',p:'오전'},{n:'무캉차이 계단논',d:'황금빛 계단식 논',p:'오전'}]}},
// ── AFRICA EXTRA ──
아크라:{kr:'아크라',en:'Accra',country:'가나 🇬🇭',iata:'ACC',airport:'ACC',flight:'약 17시간',bc:'Accra, Ghana',ab:'Accra--Ghana',na:'ICN-ACC',
  costs:{flight:[750000,1150000,2050000],hotel:[28000,65000,130000,295000],food:[8000,20000,55000],tr:8000,act:28000},
  spots:{default:[{n:'라바디 비치',d:'아크라 최고 해변',p:'오전'},{n:'독립 광장',d:'가나 독립 기념 광장',p:'오전'},{n:'케이프코스트 노예 요새',d:'유네스코 노예무역 역사',p:'오전'},{n:'마콜라 시장',d:'아크라 최대 전통 시장',p:'오전'},{n:'가나 국립박물관',d:'가나 역사 문화',p:'오전'}]}},
다르에스살람:{kr:'다르에스살람',en:'Dar es Salaam',country:'탄자니아 🇹🇿',iata:'DAR',airport:'DAR',flight:'약 17시간',bc:'Dar es Salaam, Tanzania',ab:'Dar-es-Salaam--Tanzania',na:'ICN-DAR',
  costs:{flight:[770000,1180000,2100000],hotel:[25000,60000,120000,278000],food:[8000,20000,55000],tr:8000,act:35000},
  spots:{default:[{n:'세렝게티 사파리',d:'세계 최고 야생동물 대이동',p:'종일'},{n:'킬리만자로 트래킹',d:'아프리카 최고봉 5895m',p:'종일'},{n:'보나이아 식물원',d:'다르에스살람 식물원',p:'오전'},{n:'아크라우 마켓',d:'다르에스살람 재래시장',p:'오전'},{n:'잔지바르 페리',d:'잔지바르 섬 당일치기',p:'종일'}]}},
빅토리아폭포:{kr:'빅토리아폭포',en:'Victoria Falls',country:'짐바브웨 🇿🇼',iata:'VFA',airport:'VFA',flight:'약 18시간',bc:'Victoria Falls, Zimbabwe',ab:'Victoria-Falls--Zimbabwe',na:'ICN-VFA',
  costs:{flight:[820000,1260000,2250000],hotel:[40000,95000,200000,460000],food:[14000,35000,96000],tr:12000,act:80000},
  spots:{default:[{n:'빅토리아 폭포',d:'세계 최대 폭포 유네스코',p:'오전'},{n:'데블스 풀 수영',d:'폭포 절벽 자연 수영장',p:'오전'},{n:'번지점프 & 짚라인',d:'빅토리아폭포 짜릿한 어드벤처',p:'오전'},{n:'짐바브웨 사파리',d:'코끼리·하마 강변 사파리',p:'오전'},{n:'선셋 크루즈',d:'잠베지강 석양 크루즈',p:'저녁'}]}},
// ── CAUCASUS / RUSSIA ──
바쿠:{kr:'바쿠',en:'Baku',country:'아제르바이잔 🇦🇿',iata:'GYD',airport:'GYD',flight:'약 8.5시간',bc:'Baku, Azerbaijan',ab:'Baku--Azerbaijan',na:'ICN-GYD',
  costs:{flight:[440000,665000,1165000],hotel:[35000,80000,158000,360000],food:[12000,30000,80000],tr:8000,act:28000},
  spots:{default:[{n:'이체리세헤르 구시가',d:'유네스코 중세 성벽 도시',p:'오전'},{n:'炎의 탑 (플레임 타워)',d:'바쿠 상징 3개 불꽃 빌딩',p:'저녁'},{n:'비비헤이벳 모스크',d:'카스피해 변 이슬람 사원',p:'오전'},{n:'야나르다그 불타는 산',d:'천연 가스 불타는 언덕',p:'저녁'},{n:'고부스탄 암각화',d:'유네스코 선사 암각화',p:'오전'}]}},
모스크바:{kr:'모스크바',en:'Moscow',country:'러시아 🇷🇺',iata:'SVO',airport:'SVO',flight:'약 10시간',bc:'Moscow, Russia',ab:'Moscow--Russia',na:'ICN-SVO',
  costs:{flight:[540000,820000,1460000],hotel:[60000,120000,230000,520000],food:[22000,52000,132000],tr:12000,act:42000},
  spots:{default:[{n:'붉은 광장 & 성 바실리 성당',d:'러시아 상징 광장',p:'오전'},{n:'크렘린 박물관',d:'러시아 황실 보물 궁전',p:'오전'},{n:'트레티야코프 미술관',d:'러시아 최고 회화 컬렉션',p:'오전'},{n:'아르바트 거리',d:'모스크바 전통 문화 거리',p:'오후'},{n:'지하철 투어',d:'세계 최고 아름다운 지하철',p:'오전'}]}},
상트페테르부르크:{kr:'상트페테르부르크',en:'St. Petersburg',country:'러시아 🇷🇺',iata:'LED',airport:'LED',flight:'약 10시간',bc:'St. Petersburg, Russia',ab:'St-Petersburg--Russia',na:'ICN-LED',
  costs:{flight:[540000,820000,1460000],hotel:[65000,130000,248000,560000],food:[24000,56000,142000],tr:14000,act:45000},
  spots:{default:[{n:'에르미타주 미술관',d:'세계 3대 미술관 300만 점',p:'오전'},{n:'페테르고프 황실 분수 궁전',d:'러시아 베르사유 금빛 분수',p:'오전'},{n:'표트르 바울 요새',d:'상트페테르부르크 창설 요새',p:'오전'},{n:'넵스키 대로',d:'상트페테르부르크 대표 거리',p:'오후'},{n:'백야 시즌',d:'한여름 밤의 태양 축제',p:'저녁'}]}},
// ── EUROPE EXTRA ──
트롬쇠:{kr:'트롬쇠',en:'Tromsø',country:'노르웨이 🇳🇴',iata:'TOS',airport:'TOS',flight:'약 12시간',bc:'Tromsø, Norway',ab:'Tromsoe--Norway',na:'ICN-TOS',
  costs:{flight:[600000,925000,1850000],hotel:[105000,198000,355000,710000],food:[48000,100000,232000],tr:18000,act:70000},
  spots:{default:[{n:'오로라 (북극광) 투어',d:'세계 최고 오로라 관측 명소',p:'저녁'},{n:'허스키 썰매 투어',d:'북극 개썰매 체험',p:'오전'},{n:'피오르드 크루즈',d:'트롬쇠 피오르드 유람',p:'오전'},{n:'케이블카 전망대',d:'트롬쇠 섬 전경 조망',p:'오전'},{n:'북극박물관',d:'북극 탐험 역사 박물관',p:'오전'}]}},
사라예보:{kr:'사라예보',en:'Sarajevo',country:'보스니아 🇧🇦',iata:'SJJ',airport:'SJJ',flight:'약 13시간',bc:'Sarajevo, Bosnia',ab:'Sarajevo--Bosnia-Herzegovina',na:'ICN-SJJ',
  costs:{flight:[630000,975000,1950000],hotel:[35000,75000,140000,305000],food:[15000,36000,88000],tr:8000,act:25000},
  spots:{default:[{n:'바슈차르시야 구시가',d:'오스만 제국 재래시장 거리',p:'오전'},{n:'라틴 브릿지',d:'1차대전 발발 암살 다리',p:'오전'},{n:'올드 타운 & 가지 후스레브 모스크',d:'발칸 최대 이슬람 사원',p:'오전'},{n:'터널 박물관',d:'보스니아 전쟁 역사 터널',p:'오전'},{n:'옐라빔 전망대',d:'사라예보 전경 야경',p:'저녁'}]}},
탈린:{kr:'탈린',en:'Tallinn',country:'에스토니아 🇪🇪',iata:'TLL',airport:'TLL',flight:'약 12시간',bc:'Tallinn, Estonia',ab:'Tallinn--Estonia',na:'ICN-TLL',
  costs:{flight:[600000,920000,1840000],hotel:[70000,130000,235000,470000],food:[28000,58000,135000],tr:14000,act:38000},
  spots:{default:[{n:'톰페아 성 & 전망대',d:'에스토니아 의회 중세 성',p:'오전'},{n:'구시가 시청 광장',d:'유네스코 중세 구시가',p:'오전'},{n:'카드리오르크 궁전',d:'표트르 대제 여름 궁전',p:'오전'},{n:'텔레그라프 카페 거리',d:'탈린 역사 카페 거리',p:'오후'},{n:'비루 게이트 & 시장',d:'구시가 입구 성문',p:'오전'}]}},
빌뉴스:{kr:'빌뉴스',en:'Vilnius',country:'리투아니아 🇱🇹',iata:'VNO',airport:'VNO',flight:'약 12시간',bc:'Vilnius, Lithuania',ab:'Vilnius--Lithuania',na:'ICN-VNO',
  costs:{flight:[600000,920000,1840000],hotel:[55000,105000,190000,382000],food:[22000,48000,112000],tr:12000,act:32000},
  spots:{default:[{n:'빌뉴스 구시가 (유네스코)',d:'바로크 건축 집합 구시가',p:'오전'},{n:'빌뉴스 성곽 언덕',d:'빌뉴스 전경 게디미나스 탑',p:'오전'},{n:'우지피스 예술 공화국',d:'독립 선언 예술인 마을',p:'오후'},{n:'트라카이 성',d:'빌뉴스 근교 섬 성',p:'오전'},{n:'안쾨르 박물관',d:'리투아니아 역사',p:'오전'}]}},
// ── MIDDLE EAST EXTRA ──
베이루트:{kr:'베이루트',en:'Beirut',country:'레바논 🇱🇧',iata:'BEY',airport:'BEY',flight:'약 10.5시간',bc:'Beirut, Lebanon',ab:'Beirut--Lebanon',na:'ICN-BEY',
  costs:{flight:[540000,820000,1440000],hotel:[35000,80000,160000,365000],food:[14000,34000,90000],tr:8000,act:28000},
  spots:{default:[{n:'다운타운 비르하산',d:'재건된 레바논 역사 지구',p:'오전'},{n:'국립 박물관',d:'레바논 고대 페니키아 유물',p:'오전'},{n:'피닉스 바',d:'베이루트 활기 야경',p:'저녁'},{n:'바알베크 신전',d:'로마 시대 최대 신전 유네스코',p:'오전'},{n:'제이타 종유굴',d:'세계 최장 석회동굴',p:'오전'}]}},
// ── AMERICAS EXTRA ──
시애틀:{kr:'시애틀',en:'Seattle',country:'미국 🇺🇸',iata:'SEA',airport:'SEA',flight:'약 11시간',bc:'Seattle, USA',ab:'Seattle--United-States',na:'ICN-SEA',
  costs:{flight:[620000,960000,1920000],hotel:[120000,228000,410000,820000],food:[40000,84000,198000],tr:22000,act:55000},
  spots:{default:[{n:'스페이스 니들 전망대',d:'시애틀 상징 UFO 전망탑',p:'오전'},{n:'파이크 플레이스 마켓',d:'생선 던지기 퍼포먼스 시장',p:'오전'},{n:'칙아워커 커피 박물관',d:'스타벅스 1호점',p:'오전'},{n:'마이크로소프트 & 아마존 캠퍼스',d:'IT 기업 캠퍼스 투어',p:'오후'},{n:'워싱턴 페리 크루즈',d:'퓨젓사운드 페리 야경',p:'저녁'}]}},
나이아가라폭포:{kr:'나이아가라폭포',en:'Niagara Falls',country:'캐나다 🇨🇦',iata:'YYZ',airport:'YYZ',flight:'약 13시간',bc:'Niagara Falls, Canada',ab:'Niagara-Falls--Canada',na:'ICN-YYZ',
  costs:{flight:[650000,1000000,2000000],hotel:[80000,160000,300000,630000],food:[38000,80000,190000],tr:18000,act:60000},
  spots:{default:[{n:'호스슈 폭포 뷰',d:'세계 3대 폭포 핵심 뷰',p:'오전'},{n:'보트 투어 (메이드 오브 더 미스트)',d:'폭포 접근 보트 체험',p:'오전'},{n:'나이아가라 오버행',d:'폭포 바로 뒤 걷기',p:'오전'},{n:'나이아가라 와이너리',d:'아이스 와인 생산지',p:'오후'},{n:'스카일런 전망대 야경',d:'나이아가라 야경 조망',p:'저녁'}]}},
오악사카:{kr:'오악사카',en:'Oaxaca',country:'멕시코 🇲🇽',iata:'OAX',airport:'OAX',flight:'약 18시간',bc:'Oaxaca, Mexico',ab:'Oaxaca--Mexico',na:'ICN-OAX',
  costs:{flight:[780000,1200000,2400000],hotel:[20000,50000,105000,245000],food:[8000,20000,58000],tr:8000,act:30000},
  spots:{default:[{n:'몬테 알반 유적',d:'유네스코 사포텍 고대 도시',p:'오전'},{n:'오악사카 구시가',d:'유네스코 식민지 역사 도시',p:'오전'},{n:'테오틀란 델 바예 직물',d:'사포텍 전통 직물 마을',p:'오전'},{n:'오악사카 식도락',d:'몰레·틀라유다 전통 요리',p:'점심'},{n:'죽은자의 날 축제',d:'멕시코 전통 해골 축제',p:'저녁'}]}},
포스두이구아수:{kr:'포스두이구아수',en:'Foz do Iguaçu',country:'브라질 🇧🇷',iata:'IGU',airport:'IGU',flight:'약 28시간',bc:'Foz do Iguaçu, Brazil',ab:'Foz-do-Iguacu--Brazil',na:'ICN-IGU',
  costs:{flight:[950000,1450000,2900000],hotel:[35000,80000,165000,380000],food:[12000,30000,85000],tr:12000,act:55000},
  spots:{default:[{n:'이구아수 폭포 (브라질)',d:'세계 3대 폭포 브라질 측',p:'오전'},{n:'이구아수 폭포 (아르헨티나)',d:'악마의 목구멍 코스',p:'오전'},{n:'이타이푸 수력발전소',d:'세계 최대 수력댐 견학',p:'오전'},{n:'버드 파크',d:'남미 최대 열대 조류 공원',p:'오전'},{n:'삼국 경계점',d:'브라질·아르헨·파라과이 접경',p:'오전'}]}},
라파스:{kr:'라파스',en:'La Paz',country:'볼리비아 🇧🇴',iata:'LPB',airport:'LPB',flight:'약 24시간',bc:'La Paz, Bolivia',ab:'La-Paz--Bolivia',na:'ICN-LPB',
  costs:{flight:[900000,1380000,2760000],hotel:[18000,45000,92000,215000],food:[6000,15000,45000],tr:6000,act:35000},
  spots:{default:[{n:'사막 소금사막 (우유니)',d:'세계 최대 소금사막',p:'종일'},{n:'달의 계곡',d:'라파스 근교 기이한 지형',p:'오전'},{n:'티티카카 호수',d:'세계 최고(最高) 항법 호수',p:'오전'},{n:'마녀 시장',d:'볼리비아 전통 마법 시장',p:'오전'},{n:'치폴라야 로프웨이',d:'라파스 케이블카',p:'오전'}]}},
// ── SOUTH KOREA (bonus) ──
서울:{kr:'서울',en:'Seoul',country:'한국 🇰🇷',iata:'ICN',airport:'ICN',flight:'약 0시간 (국내)',bc:'Seoul, South Korea',ab:'Seoul--South-Korea',na:'ICN',
  costs:{flight:[0,0,0],hotel:[50000,100000,180000,380000],food:[15000,35000,90000],tr:12000,act:35000},
  spots:{default:[{n:'경복궁 & 광화문',d:'조선 왕조 최고 궁전',p:'오전'},{n:'북촌 한옥마을',d:'전통 한옥 골목',p:'오전'},{n:'명동 쇼핑',d:'서울 대표 쇼핑 거리',p:'오후'},{n:'홍대 클럽·카페 거리',d:'서울 청춘 문화 거리',p:'저녁'},{n:'남산 N서울 타워',d:'서울 전경 타워',p:'저녁'}]}},
부산:{kr:'부산',en:'Busan',country:'한국 🇰🇷',iata:'PUS',airport:'PUS',flight:'약 1시간',bc:'Busan, South Korea',ab:'Busan--South-Korea',na:'GMP-PUS',
  costs:{flight:[50000,100000,200000],hotel:[40000,80000,145000,310000],food:[12000,28000,75000],tr:10000,act:25000},
  spots:{default:[{n:'해운대 해수욕장',d:'한국 최고 해변',p:'오전'},{n:'감천 문화마을',d:'무지개 색깔 산동네',p:'오전'},{n:'자갈치 시장',d:'부산 최대 수산시장',p:'오전'},{n:'광안리 & 광안대교',d:'부산 야경 명소',p:'저녁'},{n:'부산 국제영화제 (BIFF)',d:'아시아 최대 영화제',p:'저녁'}]}},
제주도:{kr:'제주도',en:'Jeju Island',country:'한국 🇰🇷',iata:'CJU',airport:'CJU',flight:'약 1.5시간',bc:'Jeju, South Korea',ab:'Jeju--South-Korea',na:'GMP-CJU',
  costs:{flight:[70000,140000,280000],hotel:[35000,75000,140000,310000],food:[12000,30000,78000],tr:14000,act:35000},
  spots:{default:[{n:'성산일출봉',d:'유네스코 세계자연유산',p:'새벽'},{n:'한라산 트래킹',d:'한국 최고봉 1950m',p:'오전'},{n:'용두암 & 제주 올레',d:'화산 용두암 해안 산책',p:'오전'},{n:'만장굴 용암동굴',d:'세계 최장 용암굴',p:'오전'},{n:'협재 해수욕장',d:'에메랄드빛 제주 해변',p:'오전'}]}},
경주:{kr:'경주',en:'Gyeongju',country:'한국 🇰🇷',iata:'PUS',airport:'PUS',flight:'약 1시간',bc:'Gyeongju, South Korea',ab:'Gyeongju--South-Korea',na:'GMP-PUS',
  costs:{flight:[50000,100000,200000],hotel:[35000,72000,130000,275000],food:[12000,28000,72000],tr:10000,act:25000},
  spots:{default:[{n:'불국사',d:'유네스코 신라 불교 사원',p:'오전'},{n:'석굴암',d:'유네스코 화강암 석굴 불상',p:'오전'},{n:'첨성대',d:'동양 최고(最古) 천문대',p:'오전'},{n:'국립경주박물관',d:'신라 금관 유물 컬렉션',p:'오전'},{n:'동궁과 월지 (안압지)',d:'신라 왕실 연못 야경',p:'저녁'}]}}
};

const HIER_NEW4={
  '아시아·태평양':{
    '🇯🇵 일본':['히메지','센다이','구마모토'],
    '🇲🇲 미얀마':['만달레이','인레호수'],
    '🇮🇳 인도':['아그라','방갈로르','코치'],
    '🇨🇳 중국':['황산','쑤저우'],
    '🇻🇳 베트남':['사파'],
    '🇰🇭 캄보디아':['씨아누크빌'],
    '🇰🇷 한국':['서울','부산','제주도','경주'],
    '🇦🇿 아제르바이잔':['바쿠']
  },
  '유럽':{
    '🇳🇴 노르웨이':['트롬쇠'],
    '🇧🇦 보스니아':['사라예보'],
    '🇱🇹 리투아니아':['빌뉴스'],
    '🇷🇺 러시아':['모스크바','상트페테르부르크']
  },
  '중동·아프리카':{
    '🇱🇧 레바논':['베이루트'],
    '🇬🇭 가나':['아크라'],
    '🇹🇿 탄자니아':['다르에스살람'],
    '🇿🇼 짐바브웨':['빅토리아폭포']
  },
  '아메리카':{
    '🇺🇸 미국':['시애틀','뉴올리언스','덴버'],
    '🇨🇦 캐나다':['나이아가라폭포'],
    '🇲🇽 멕시코':['오악사카'],
    '🇧🇷 브라질':['포스두이구아수'],
    '🇧🇴 볼리비아':['라파스']
  }
};

const ALIAS_NEW4={
  'himeji':'히메지','sendai':'센다이','kumamoto':'구마모토',
  'mandalay':'만달레이','inlelake':'인레호수',
  'agra':'아그라','bangalore':'방갈로르','bengaluru':'방갈로르','kochi':'코치','cochin':'코치',
  'huangshan':'황산','suzhou':'쑤저우',
  'sapa':'사파','sihanoukville':'씨아누크빌',
  'seoul':'서울','busan':'부산','jeju':'제주도','gyeongju':'경주',
  'baku':'바쿠','tromso':'트롬쇠','sarajevo':'사라예보','vilnius':'빌뉴스',
  'moscow':'모스크바','stpetersburg':'상트페테르부르크',
  'beirut':'베이루트','accra':'아크라','daressalaam':'다르에스살람','victoriafalls':'빅토리아폭포',
  'seattle':'시애틀','niagarafalls':'나이아가라폭포','oaxaca':'오악사카',
  'fozduiguacu':'포스두이구아수','lapaz':'라파스'
};

for(const[k,v] of Object.entries(EXT4)) if(!DB[k]) DB[k]=v;

Object.keys(HIER_NEW4).forEach(cont=>{
  if(!HIER[cont]) HIER[cont]={};
  Object.keys(HIER_NEW4[cont]).forEach(country=>{
    if(!HIER[cont][country]) HIER[cont][country]=[];
    HIER_NEW4[cont][country].forEach(city=>{
      if(!HIER[cont][country].includes(city)) HIER[cont][country].push(city);
    });
  });
});

Object.assign(ALIAS, ALIAS_NEW4);

for(const key of Object.keys(CMAP)) delete CMAP[key];
for(const[c,countries] of Object.entries(HIER))
  for(const cities of Object.values(countries))
    cities.forEach(city=>CMAP[city]=c);

console.log('TripMind DB (final):', Object.keys(DB).length, 'destinations');
})();
