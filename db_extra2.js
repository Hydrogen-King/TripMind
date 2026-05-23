(function(){
const EXT2={
// ── JAPAN MORE ──
다카마쓰:{kr:'다카마쓰',en:'Takamatsu',country:'일본 🇯🇵',iata:'TAK',airport:'TAK',flight:'약 2시간',bc:'Takamatsu, Japan',ab:'Takamatsu--Japan',na:'ICN-TAK',
  costs:{flight:[240000,370000,660000],hotel:[40000,80000,138000,275000],food:[22000,48000,96000],tr:10000,act:26000},
  spots:{default:[{n:'리쓰린 공원',d:'일본 최고 정원 중 하나',p:'오전'},{n:'나오시마 예술의 섬',d:'세계적 현대미술 야외 전시',p:'종일'},{n:'우동 식당',d:'사누키 우동 원산지',p:'점심'},{n:'고토히라 신사 (콘피라상)',d:'1368계단 신사',p:'오전'},{n:'마루가메 마을',d:'우동 골목 탐방',p:'오전'}]}},
마쓰야마:{kr:'마쓰야마',en:'Matsuyama',country:'일본 🇯🇵',iata:'MYJ',airport:'MYJ',flight:'약 2시간',bc:'Matsuyama, Japan',ab:'Matsuyama--Japan',na:'ICN-MYJ',
  costs:{flight:[240000,370000,660000],hotel:[38000,78000,132000,265000],food:[21000,46000,93000],tr:9000,act:24000},
  spots:{default:[{n:'마쓰야마 성',d:'완전한 모습의 일본 성 12선',p:'오전'},{n:'도고 온천 (도고 온천 본관)',d:'일본 최고(最古) 온천',p:'오후'},{n:'이요카스리 직물',d:'마쓰야마 전통 직물',p:'오전'},{n:'반스이소',d:'도고 온천 명소',p:'오후'},{n:'보탄우리 온천 료칸',d:'정통 온천 료칸 체험',p:'저녁'}]}},
아키타:{kr:'아키타',en:'Akita',country:'일본 🇯🇵',iata:'AXT',airport:'AXT',flight:'약 2시간',bc:'Akita, Japan',ab:'Akita--Japan',na:'ICN-AXT',
  costs:{flight:[250000,380000,670000],hotel:[38000,78000,132000,265000],food:[22000,48000,97000],tr:10000,act:25000},
  spots:{default:[{n:'가쿠노다테 무사 마을',d:'에도 시대 사무라이 거리',p:'오전'},{n:'다자와 호수',d:'일본 최심 칼데라 호수',p:'오전'},{n:'아키타 마쓰리',d:'네부타 축제 전시관',p:'오전'},{n:'아키타 세이코엔 동물원',d:'아키타개 보호구역',p:'오전'},{n:'나마하게 박물관',d:'아키타 전통 도깨비 문화',p:'오전'}]}},
나가노:{kr:'나가노',en:'Nagano',country:'일본 🇯🇵',iata:'NGO',airport:'NGO',flight:'약 2.5시간',bc:'Nagano, Japan',ab:'Nagano--Japan',na:'ICN-NGO',
  costs:{flight:[250000,380000,680000],hotel:[50000,100000,170000,340000],food:[25000,55000,112000],tr:14000,act:50000},
  spots:{default:[{n:'나가노 올림픽 스키장',d:'1998 동계올림픽 스키 리조트',p:'종일'},{n:'젠코지 사원',d:'나가노 최대 불교 사원',p:'오전'},{n:'마쓰모토 성',d:'일본 국보 검은 성',p:'오전'},{n:'가루이자와 별장 지구',d:'일본 최고 여름 휴양지',p:'오후'},{n:'시가 고원 스키',d:'일본 최대 규모 스키장',p:'종일'}]}},
// 나트랑, 다낭, 발리, 싱가포르 — 기존 DB 유지
// ── CHINA MORE ──
충칭:{kr:'충칭',en:'Chongqing',country:'중국 🇨🇳',iata:'CKG',airport:'CKG',flight:'약 3.5시간',bc:'Chongqing, China',ab:'Chongqing--China',na:'ICN-CKG',
  costs:{flight:[310000,465000,825000],hotel:[40000,85000,150000,305000],food:[15000,38000,92000],tr:8000,act:35000},
  spots:{default:[{n:'충칭 훠궈 골목',d:'충칭 명물 마라 샤브샤브',p:'저녁'},{n:'홍야동 야경',d:'충칭 강변 야경 명소',p:'저녁'},{n:'자링강 케이블카',d:'강을 가로지르는 케이블카',p:'오전'},{n:'양쯔강 싼샤 크루즈',d:'장강 협곡 유람 출발지',p:'종일'},{n:'다주 석각',d:'유네스코 불교 조각',p:'오전'}]}},
쿤밍:{kr:'쿤밍',en:'Kunming',country:'중국 🇨🇳',iata:'KMG',airport:'KMG',flight:'약 4시간',bc:'Kunming, China',ab:'Kunming--China',na:'ICN-KMG',
  costs:{flight:[310000,465000,825000],hotel:[35000,80000,145000,295000],food:[13000,32000,82000],tr:8000,act:32000},
  spots:{default:[{n:'석림 (돌의 숲)',d:'2억7000만년 석회암 기둥군',p:'종일'},{n:'뎬치 호수',d:'쿤밍 고원 호수 자전거',p:'오전'},{n:'취탄 사원',d:'쿤밍 최대 불교 사원',p:'오전'},{n:'윈난성 박물관',d:'소수민족 문화 박물관',p:'오전'},{n:'윈난 요리 탐방',d:'과교미선 등 윈난 특색 요리',p:'점심'}]}},
리장:{kr:'리장',en:'Lijiang',country:'중국 🇨🇳',iata:'LJG',airport:'LJG',flight:'약 4시간',bc:'Lijiang, China',ab:'Lijiang--China',na:'ICN-LJG',
  costs:{flight:[320000,480000,850000],hotel:[40000,85000,150000,305000],food:[14000,35000,88000],tr:10000,act:35000},
  spots:{default:[{n:'리장 고성 (다옌)',d:'유네스코 나시족 고대 마을',p:'오전'},{n:'위룽쉐산 설산',d:'해발 5596m 옥룡설산',p:'오전'},{n:'블랙 드래곤 풀 공원',d:'설산 반영 호수',p:'오전'},{n:'동파 문화 체험',d:'나시족 상형문자 문화',p:'오후'},{n:'호도협 트래킹',d:'세계 최대 협곡 트래킹',p:'종일'}]}},
하얼빈:{kr:'하얼빈',en:'Harbin',country:'중국 🇨🇳',iata:'HRB',airport:'HRB',flight:'약 3시간',bc:'Harbin, China',ab:'Harbin--China',na:'ICN-HRB',
  costs:{flight:[295000,445000,790000],hotel:[40000,85000,150000,305000],food:[14000,35000,88000],tr:8000,act:40000},
  spots:{default:[{n:'빙설 대세계',d:'세계 최대 얼음 조각 축제',p:'저녁'},{n:'소피아 러시아 정교회',d:'하얼빈 상징 러시아 성당',p:'오전'},{n:'중앙 보행거리',d:'하얼빈 대표 쇼핑 거리',p:'오후'},{n:'쑹화강 겨울 축제',d:'얼음낚시·썰매 체험',p:'오전'},{n:'731 부대 유적',d:'일제 침략 역사 박물관',p:'오전'}]}},
난징:{kr:'난징',en:'Nanjing',country:'중국 🇨🇳',iata:'NKG',airport:'NKG',flight:'약 2시간',bc:'Nanjing, China',ab:'Nanjing--China',na:'ICN-NKG',
  costs:{flight:[290000,440000,780000],hotel:[50000,100000,175000,350000],food:[17000,42000,105000],tr:10000,act:35000},
  spots:{default:[{n:'중산릉 (쑨원 묘)',d:'중국 혁명 영웅 능',p:'오전'},{n:'명나라 성벽',d:'세계 최장 고대 도성 성벽',p:'오전'},{n:'친화이강 유람',d:'난징 전통 수변 거리',p:'저녁'},{n:'난징 대학살 기념관',d:'2차대전 역사 기념관',p:'오전'},{n:'총통부 역사',d:'중화민국 정부 청사',p:'오전'}]}},
우한:{kr:'우한',en:'Wuhan',country:'중국 🇨🇳',iata:'WUH',airport:'WUH',flight:'약 3시간',bc:'Wuhan, China',ab:'Wuhan--China',na:'ICN-WUH',
  costs:{flight:[295000,445000,792000],hotel:[42000,88000,155000,315000],food:[15000,38000,95000],tr:8000,act:32000},
  spots:{default:[{n:'황학루',d:'양쯔강 건너편 전망 누각',p:'오전'},{n:'동후 (동호) 유람',d:'중국 최대 도심 호수',p:'오전'},{n:'우한 대학 벚꽃',d:'중국 최고 벚꽃 명소',p:'오전'},{n:'신해혁명 박물관',d:'중국 혁명 발원지 역사',p:'오전'},{n:'호북성 박물관',d:'증후을 편경 등 국보급 유물',p:'오전'}]}},
// ── SOUTHEAST ASIA MORE ──
바간:{kr:'바간',en:'Bagan',country:'미얀마 🇲🇲',iata:'NYU',airport:'NYU',flight:'약 7시간',bc:'Bagan, Myanmar',ab:'Bagan--Myanmar',na:'ICN-NYU',
  costs:{flight:[400000,600000,1050000],hotel:[22000,55000,100000,225000],food:[8000,20000,52000],tr:10000,act:30000},
  spots:{default:[{n:'바간 사원군 일출',d:'3000개 불탑 지평선 일출',p:'새벽'},{n:'열기구 투어',d:'바간 사원군 열기구 조망',p:'새벽'},{n:'아난다 사원',d:'바간 최고 불교 건축',p:'오전'},{n:'쉐지곤 파고다',d:'황금빛 대형 파고다',p:'오전'},{n:'냐웅우 시장',d:'로컬 재래시장',p:'오전'}]}},
비엔티안:{kr:'비엔티안',en:'Vientiane',country:'라오스 🇱🇦',iata:'VTE',airport:'VTE',flight:'약 7시간',bc:'Vientiane, Laos',ab:'Vientiane--Laos',na:'ICN-VTE',
  costs:{flight:[370000,550000,950000],hotel:[18000,45000,85000,190000],food:[6000,16000,45000],tr:7000,act:20000},
  spots:{default:[{n:'탓루앙 (황금 불탑)',d:'라오스 국가 상징 황금 탑',p:'오전'},{n:'빠뚜싸이 승전 기념문',d:'라오스판 개선문',p:'오전'},{n:'왓 씨싸켓',d:'비엔티안 최고(最古) 사원',p:'오전'},{n:'부다 파크',d:'독특한 힌두·불교 조각 공원',p:'오전'},{n:'메콩 강변 야시장',d:'석양 강변 야시장',p:'저녁'}]}},
양곤:{kr:'양곤',en:'Yangon',country:'미얀마 🇲🇲',iata:'RGN',airport:'RGN',flight:'약 6.5시간',bc:'Yangon, Myanmar',ab:'Yangon--Myanmar',na:'ICN-RGN',
  costs:{flight:[380000,560000,970000],hotel:[22000,55000,100000,225000],food:[8000,20000,52000],tr:8000,act:25000},
  spots:{default:[{n:'쉐다곤 파야',d:'세계 최고 황금 불탑',p:'저녁'},{n:'쥬빌리 공원',d:'양곤 최대 공원',p:'오전'},{n:'보타타웅 파야',d:'양곤 강변 황금 사원',p:'오전'},{n:'스코라 뢰 마켓',d:'양곤 전통 재래시장',p:'오전'},{n:'식민지 건축 투어',d:'영국 식민지 역사 건물',p:'오전'}]}},
// 세부 — 기존 DB 유지
// ── INDIA MORE ──
고아:{kr:'고아',en:'Goa',country:'인도 🇮🇳',iata:'GOI',airport:'GOI',flight:'약 8.5시간',bc:'Goa, India',ab:'Goa--India',na:'ICN-GOI',
  costs:{flight:[450000,680000,1150000],hotel:[25000,60000,120000,275000],food:[10000,25000,68000],tr:10000,act:32000},
  spots:{default:[{n:'바가 & 칼랑구테 비치',d:'고아 대표 파티 해변',p:'오전'},{n:'아고다 비치',d:'조용한 고아 북쪽 해변',p:'오전'},{n:'올드 고아 대성당',d:'유네스코 포르투갈 성당',p:'오전'},{n:'팔렘 비치',d:'고아 최고 숨겨진 해변',p:'오전'},{n:'고아 나이트 마켓',d:'아르포라 야시장',p:'저녁'}]}},
우다이푸르:{kr:'우다이푸르',en:'Udaipur',country:'인도 🇮🇳',iata:'UDR',airport:'UDR',flight:'약 8.5시간',bc:'Udaipur, India',ab:'Udaipur--India',na:'ICN-UDR',
  costs:{flight:[460000,700000,1150000],hotel:[25000,60000,120000,275000],food:[8000,20000,58000],tr:8000,act:28000},
  spots:{default:[{n:'시티 팰리스 & 피촐라 호수',d:'호수 위 왕궁 복합단지',p:'오전'},{n:'레이크 팰리스 보트 투어',d:'호수 위 궁전 호텔 조망',p:'오전'},{n:'사헬리온 키 바리',d:'왕비의 정원',p:'오전'},{n:'자그만디르 아일랜드',d:'피촐라 호수 섬 궁전',p:'오후'},{n:'우다이푸르 석양 디너',d:'호수 뷰 루프탑 레스토랑',p:'저녁'}]}},
콜카타:{kr:'콜카타',en:'Kolkata',country:'인도 🇮🇳',iata:'CCU',airport:'CCU',flight:'약 8시간',bc:'Kolkata, India',ab:'Kolkata--India',na:'ICN-CCU',
  costs:{flight:[450000,680000,1130000],hotel:[25000,58000,115000,260000],food:[7000,18000,50000],tr:7000,act:25000},
  spots:{default:[{n:'빅토리아 메모리얼',d:'영국 식민지 대리석 궁전',p:'오전'},{n:'하우라 브릿지',d:'갠지스강 지류 철교',p:'오전'},{n:'칼리 사원',d:'힌두교 칼리 여신 성지',p:'오전'},{n:'인도 박물관',d:'인도 최대 박물관',p:'오전'},{n:'쿠마르투리 도공 마을',d:'힌두 신상 제작 마을',p:'오후'}]}},
// ── SRI LANKA MORE ──
캔디:{kr:'캔디',en:'Kandy',country:'스리랑카 🇱🇰',iata:'CMB',airport:'CMB',flight:'약 8시간',bc:'Kandy, Sri Lanka',ab:'Kandy--Sri-Lanka',na:'ICN-CMB',
  costs:{flight:[420000,640000,1080000],hotel:[22000,52000,105000,235000],food:[7000,18000,50000],tr:8000,act:26000},
  spots:{default:[{n:'불치사 (달라다 말리가와)',d:'부처님 치아 사리 사원',p:'오전'},{n:'캔디 호수 산책',d:'캔디 중심 호수 산책',p:'오전'},{n:'왕립 식물원',d:'열대 식물원',p:'오전'},{n:'시기리야 사자 요새',d:'유네스코 암벽 궁전 (1.5h)',p:'종일'},{n:'캔디 페라헤라 축제',d:'불교 전통 행렬 의식',p:'저녁'}]}},
// ── CENTRAL ASIA / CAUCASUS ──
울란바토르:{kr:'울란바토르',en:'Ulaanbaatar',country:'몽골 🇲🇳',iata:'ULN',airport:'ULN',flight:'약 4시간',bc:'Ulaanbaatar, Mongolia',ab:'Ulaanbaatar--Mongolia',na:'ICN-ULN',
  costs:{flight:[340000,510000,880000],hotel:[22000,55000,100000,225000],food:[10000,25000,65000],tr:8000,act:45000},
  spots:{default:[{n:'고비 사막 낙타 투어',d:'고비 사막 게르 캠핑',p:'종일'},{n:'간단 사원',d:'울란바토르 최대 불교 사원',p:'오전'},{n:'테를지 국립공원',d:'초원·암석 국립공원 승마',p:'종일'},{n:'자이승 기념탑',d:'울란바토르 전경 전망',p:'오전'},{n:'나담 축제',d:'몽골 전통 3대 스포츠 축제',p:'종일'}]}},
// ── EUROPE MORE ──
보르도:{kr:'보르도',en:'Bordeaux',country:'프랑스 🇫🇷',iata:'BOD',airport:'BOD',flight:'약 14시간',bc:'Bordeaux, France',ab:'Bordeaux--France',na:'ICN-BOD',
  costs:{flight:[670000,1040000,2080000],hotel:[85000,155000,275000,550000],food:[36000,75000,170000],tr:14000,act:42000},
  spots:{default:[{n:'생테밀리옹 와이너리',d:'유네스코 세계유산 와인 마을',p:'종일'},{n:'라 시테 뒤 뱅 와인 박물관',d:'보르도 최대 와인 박물관',p:'오전'},{n:'보르도 구시가 (생 피에르)',d:'유네스코 역사 지구',p:'오전'},{n:'대수 거울 광장',d:'얕은 물 반영 도심 광장',p:'오전'},{n:'메독 와이너리 투어',d:'보르도 그랑크뤼 와이너리',p:'오후'}]}},
스트라스부르:{kr:'스트라스부르',en:'Strasbourg',country:'프랑스 🇫🇷',iata:'SXB',airport:'SXB',flight:'약 13시간',bc:'Strasbourg, France',ab:'Strasbourg--France',na:'ICN-SXB',
  costs:{flight:[660000,1020000,2040000],hotel:[80000,150000,265000,530000],food:[35000,72000,165000],tr:14000,act:40000},
  spots:{default:[{n:'스트라스부르 대성당',d:'중세 고딕 대성당',p:'오전'},{n:'쁘띠 프랑스',d:'운하·목조 가옥 골목',p:'오전'},{n:'알자스 요리 탐방',d:'플람쿠헨·슈크루트',p:'점심'},{n:'크리스마스 마켓',d:'유럽 최고 크리스마스 마켓',p:'저녁'},{n:'유럽 의회',d:'EU 의회 견학',p:'오전'}]}},
빌바오:{kr:'빌바오',en:'Bilbao',country:'스페인 🇪🇸',iata:'BIO',airport:'BIO',flight:'약 14시간',bc:'Bilbao, Spain',ab:'Bilbao--Spain',na:'ICN-BIO',
  costs:{flight:[660000,1020000,2040000],hotel:[70000,135000,240000,480000],food:[32000,68000,155000],tr:13000,act:40000},
  spots:{default:[{n:'구겐하임 빌바오 미술관',d:'세계 최고 현대 건축',p:'오전'},{n:'카스코 비에호 구시가',d:'빌바오 구시가 핀초스 거리',p:'저녁'},{n:'핀초스 바 투어',d:'바스크 요리 핀초스',p:'저녁'},{n:'푸니쿨라 전망대',d:'빌바오 전경 조망',p:'오후'},{n:'아스쿠나 센트로아',d:'독특한 문화 쇼핑센터',p:'오후'}]}},
함부르크:{kr:'함부르크',en:'Hamburg',country:'독일 🇩🇪',iata:'HAM',airport:'HAM',flight:'약 13시간',bc:'Hamburg, Germany',ab:'Hamburg--Germany',na:'ICN-HAM',
  costs:{flight:[650000,1000000,2000000],hotel:[95000,175000,310000,620000],food:[38000,80000,182000],tr:18000,act:45000},
  spots:{default:[{n:'함부르크 항구 & 창고 지구',d:'유네스코 항구 창고 지구',p:'오전'},{n:'엘브필하모니 콘서트홀',d:'세계 최고 현대 건축 공연장',p:'오후'},{n:'알스터 호수 유람',d:'함부르크 도심 호수',p:'오전'},{n:'레퍼반 & 상파울리',d:'함부르크 최대 유흥 거리',p:'저녁'},{n:'미니어처 원더랜드',d:'세계 최대 미니 철도 박물관',p:'오전'}]}},
쾰른:{kr:'쾰른',en:'Cologne',country:'독일 🇩🇪',iata:'CGN',airport:'CGN',flight:'약 13시간',bc:'Cologne, Germany',ab:'Cologne--Germany',na:'ICN-CGN',
  costs:{flight:[640000,990000,1980000],hotel:[90000,165000,295000,590000],food:[36000,76000,175000],tr:17000,act:42000},
  spots:{default:[{n:'쾰른 대성당',d:'유네스코 고딕 걸작 대성당',p:'오전'},{n:'라인강 크루즈',d:'쾰른 강변 크루즈',p:'오전'},{n:'발라프 리하르츠 미술관',d:'중세 독일 회화 컬렉션',p:'오전'},{n:'쾰른 비어하우스',d:'쾰쉬 맥주 현지 비어홀',p:'저녁'},{n:'쾰른 크리스마스 마켓',d:'대성당 앞 크리스마스 마켓',p:'저녁'}]}},
드레스덴:{kr:'드레스덴',en:'Dresden',country:'독일 🇩🇪',iata:'DRS',airport:'DRS',flight:'약 13시간',bc:'Dresden, Germany',ab:'Dresden--Germany',na:'ICN-DRS',
  costs:{flight:[640000,990000,1980000],hotel:[80000,150000,265000,530000],food:[34000,72000,165000],tr:16000,act:40000},
  spots:{default:[{n:'츠빙어 궁전 & 박물관',d:'바로크 양식 왕궁 복합단지',p:'오전'},{n:'젬퍼 오페라 하우스',d:'세계 최고 오페라 하우스',p:'저녁'},{n:'브륄의 테라스 산책',d:'엘베강 전망 유럽의 발코니',p:'오전'},{n:'그린 볼트 보물관',d:'유럽 최고 보물 컬렉션',p:'오전'},{n:'프라우엔키르헤 교회',d:'전후 재건 바로크 교회',p:'오전'}]}},
프랑크푸르트:{kr:'프랑크푸르트',en:'Frankfurt',country:'독일 🇩🇪',iata:'FRA',airport:'FRA',flight:'약 12.5시간',bc:'Frankfurt, Germany',ab:'Frankfurt--Germany',na:'ICN-FRA',
  costs:{flight:[630000,970000,1940000],hotel:[100000,185000,330000,660000],food:[40000,84000,195000],tr:20000,act:45000},
  spots:{default:[{n:'뢰머 광장 & 구시가',d:'프랑크푸르트 구시가 중심',p:'오전'},{n:'유럽중앙은행 & 마천루',d:'유럽 금융 도시 스카이라인',p:'오후'},{n:'슈테델 미술관',d:'베르메르·모네 유럽 명화',p:'오전'},{n:'자일가세 쇼핑',d:'프랑크푸르트 쇼핑 거리',p:'오후'},{n:'아이제르너 슈테그 다리',d:'마인강 자물쇠 다리',p:'오전'}]}},
체스키크룸로프:{kr:'체스키크룸로프',en:'Český Krumlov',country:'체코 🇨🇿',iata:'PRG',airport:'PRG',flight:'약 13시간',bc:'Český Krumlov, Czech Republic',ab:'Cesky-Krumlov--Czech-Republic',na:'ICN-PRG',
  costs:{flight:[630000,970000,1940000],hotel:[65000,120000,215000,430000],food:[25000,52000,120000],tr:14000,act:35000},
  spots:{default:[{n:'체스키크룸로프 성',d:'유네스코 중세 성 & 마을',p:'오전'},{n:'구시가 메인 광장',d:'중세 동화마을 광장',p:'오전'},{n:'블타바강 래프팅',d:'마을 둘러싼 강 래프팅',p:'오전'},{n:'바르카 야외극장',d:'유럽 유일 바로크 회전 무대',p:'저녁'},{n:'성 비투스 성당',d:'마을 상징 교회',p:'오전'}]}},
브로츠와프:{kr:'브로츠와프',en:'Wrocław',country:'폴란드 🇵🇱',iata:'WRO',airport:'WRO',flight:'약 12시간',bc:'Wrocław, Poland',ab:'Wroclaw--Poland',na:'ICN-WRO',
  costs:{flight:[600000,920000,1840000],hotel:[50000,95000,168000,338000],food:[22000,48000,110000],tr:12000,act:32000},
  spots:{default:[{n:'구시가 시장광장',d:'폴란드 최고 아름다운 광장',p:'오전'},{n:'오스트루프 툼스키 대성당',d:'브로츠와프 주교좌 성당',p:'오전'},{n:'200개 난쟁이 조각상',d:'도시 곳곳 숨겨진 난쟁이',p:'오전'},{n:'엘바 강변 산책',d:'브로츠와프 강변 산책',p:'오후'},{n:'백년기념관',d:'유네스코 콘서트홀',p:'오전'}]}},
류블랴나:{kr:'류블랴나',en:'Ljubljana',country:'슬로베니아 🇸🇮',iata:'LJU',airport:'LJU',flight:'약 13시간',bc:'Ljubljana, Slovenia',ab:'Ljubljana--Slovenia',na:'ICN-LJU',
  costs:{flight:[640000,990000,1980000],hotel:[70000,130000,235000,470000],food:[30000,62000,142000],tr:14000,act:38000},
  spots:{default:[{n:'류블랴나 성',d:'도심 언덕 위 중세 성',p:'오전'},{n:'트리플 브릿지 & 구시가',d:'류블랴나 상징 3개 다리',p:'오전'},{n:'포스토이나 종유굴',d:'세계 2위 종유동굴 (1h)',p:'종일'},{n:'블레드 호수',d:'동화 같은 섬 호수',p:'오전'},{n:'공개시장 & 카페 거리',d:'류블랴나 로컬 마켓',p:'오전'}]}},
코토르:{kr:'코토르',en:'Kotor',country:'몬테네그로 🇲🇪',iata:'TIV',airport:'TIV',flight:'약 14시간',bc:'Kotor, Montenegro',ab:'Kotor--Montenegro',na:'ICN-TIV',
  costs:{flight:[670000,1030000,2060000],hotel:[55000,105000,190000,385000],food:[26000,55000,128000],tr:12000,act:35000},
  spots:{default:[{n:'코토르 성벽 하이킹',d:'아드리아해 전경 중세 성벽',p:'오전'},{n:'코토르 구시가 탐방',d:'유네스코 베네치아 양식 구시가',p:'오전'},{n:'보카 코토르스카 만 유람',d:'피오르드 만 보트 투어',p:'오전'},{n:'성 트리폰 대성당',d:'코토르 상징 12세기 성당',p:'오전'},{n:'두브로브니크 당일치기',d:'크로아티아 두브로브니크 (2h)',p:'종일'}]}},
스플리트:{kr:'스플리트',en:'Split',country:'크로아티아 🇭🇷',iata:'SPU',airport:'SPU',flight:'약 14시간',bc:'Split, Croatia',ab:'Split--Croatia',na:'ICN-SPU',
  costs:{flight:[670000,1030000,2060000],hotel:[70000,130000,235000,470000],food:[28000,58000,135000],tr:13000,act:40000},
  spots:{default:[{n:'디오클레티아누스 궁전',d:'유네스코 로마 황제 궁전',p:'오전'},{n:'마리얀 언덕 전망',d:'스플리트 최고 전망 공원',p:'오전'},{n:'흐바르 섬',d:'스플리트 근해 파티 섬',p:'종일'},{n:'그레고리 주교 동상',d:'스플리트 상징 포토스팟',p:'오전'},{n:'페리스타일 광장',d:'로마 시대 광장',p:'오전'}]}},
탈린:{kr:'탈린',en:'Tallinn',country:'에스토니아 🇪🇪',iata:'TLL',airport:'TLL',flight:'약 12시간',bc:'Tallinn, Estonia',ab:'Tallinn--Estonia',na:'ICN-TLL',
  costs:{flight:[600000,920000,1840000],hotel:[70000,130000,235000,470000],food:[28000,58000,135000],tr:14000,act:38000},
  spots:{default:[{n:'톰페아 성 & 전망대',d:'에스토니아 의회 중세 성',p:'오전'},{n:'구시가 시청 광장',d:'유네스코 중세 구시가',p:'오전'},{n:'카드리오르크 궁전',d:'표트르 대제 여름 궁전',p:'오전'},{n:'텔레그라프 & 원올드타운',d:'탈린 역사 카페 거리',p:'오후'},{n:'비루 게이트 & 시장',d:'구시가 입구 성문',p:'오전'}]}},
베르겐:{kr:'베르겐',en:'Bergen',country:'노르웨이 🇳🇴',iata:'BGO',airport:'BGO',flight:'약 11시간',bc:'Bergen, Norway',ab:'Bergen--Norway',na:'ICN-BGO',
  costs:{flight:[580000,900000,1800000],hotel:[110000,205000,360000,720000],food:[48000,100000,230000],tr:22000,act:55000},
  spots:{default:[{n:'브뤼겐 목조 항구',d:'유네스코 한자동맹 목조 건물',p:'오전'},{n:'플뢰이엔 전망대',d:'베르겐 피오르드 전망',p:'오전'},{n:'피오르드 크루즈',d:'송네 피오르드 유람선',p:'종일'},{n:'피쉬 마켓',d:'노르웨이 신선 연어 시장',p:'오전'},{n:'베르겐 철도 (브레겐반)',d:'세계 최고 경치 철도',p:'종일'}]}},
로바니에미:{kr:'로바니에미',en:'Rovaniemi',country:'핀란드 🇫🇮',iata:'RVN',airport:'RVN',flight:'약 11시간',bc:'Rovaniemi, Finland',ab:'Rovaniemi--Finland',na:'ICN-RVN',
  costs:{flight:[580000,900000,1800000],hotel:[90000,175000,320000,650000],food:[42000,88000,205000],tr:18000,act:80000},
  spots:{default:[{n:'산타클로스 빌리지',d:'북극권 산타클로스 공식 마을',p:'오전'},{n:'오로라 사파리',d:'북극광 스노모빌 투어',p:'저녁'},{n:'순록 썰매',d:'라플란드 순록 썰매',p:'오전'},{n:'아르테크틱 동물원',d:'핀란드 북극 동물 체험',p:'오전'},{n:'아이스 피싱',d:'얼음 낚시 체험',p:'오전'}]}},
안탈리아:{kr:'안탈리아',en:'Antalya',country:'터키 🇹🇷',iata:'AYT',airport:'AYT',flight:'약 11시간',bc:'Antalya, Turkey',ab:'Antalya--Turkey',na:'ICN-AYT',
  costs:{flight:[560000,860000,1720000],hotel:[40000,90000,180000,400000],food:[18000,42000,108000],tr:12000,act:45000},
  spots:{default:[{n:'칼레이치 구시가',d:'로마 시대 항구 구시가',p:'오전'},{n:'두덴 폭포',d:'지중해로 떨어지는 폭포',p:'오전'},{n:'퍼지 비치',d:'안탈리아 대표 리조트 해변',p:'오전'},{n:'아스펜도스 원형극장',d:'로마 시대 완벽한 원형극장',p:'오전'},{n:'올드 바자르',d:'안탈리아 전통 시장',p:'오후'}]}},
// ── MIDDLE EAST MORE ──
암만:{kr:'암만',en:'Amman',country:'요르단 🇯🇴',iata:'AMM',airport:'AMM',flight:'약 10시간',bc:'Amman, Jordan',ab:'Amman--Jordan',na:'ICN-AMM',
  costs:{flight:[530000,800000,1400000],hotel:[40000,88000,165000,355000],food:[16000,38000,98000],tr:12000,act:35000},
  spots:{default:[{n:'로마 원형극장',d:'암만 중심 로마 시대 원형극장',p:'오전'},{n:'자발 알 칼라 성채',d:'암만 상징 언덕 성채',p:'오전'},{n:'사해 수영',d:'세계 최저 지점 부유 체험',p:'오전'},{n:'와디럼 지프 투어',d:'붉은 사막 영화 촬영지',p:'종일'},{n:'우마이야 궁전 유적',d:'이슬람 초기 건축 유적',p:'오전'}]}},
무스카트:{kr:'무스카트',en:'Muscat',country:'오만 🇴🇲',iata:'MCT',airport:'MCT',flight:'약 9.5시간',bc:'Muscat, Oman',ab:'Muscat--Oman',na:'ICN-MCT',
  costs:{flight:[510000,780000,1360000],hotel:[55000,115000,220000,500000],food:[20000,48000,125000],tr:12000,act:40000},
  spots:{default:[{n:'술탄 카부스 대모스크',d:'오만 최대 이슬람 사원',p:'오전'},{n:'무트라 수크',d:'무스카트 전통 향신료 시장',p:'오전'},{n:'무트라 콘니쉬',d:'무스카트 항구 산책로',p:'저녁'},{n:'알 알람 궁전',d:'술탄 오만 궁전',p:'오전'},{n:'와디 샤브 트래킹',d:'오만 최고 계곡 트래킹',p:'오전'}]}},
도하:{kr:'도하',en:'Doha',country:'카타르 🇶🇦',iata:'DOH',airport:'DOH',flight:'약 10시간',bc:'Doha, Qatar',ab:'Doha--Qatar',na:'ICN-DOH',
  costs:{flight:[520000,790000,1380000],hotel:[80000,170000,340000,780000],food:[28000,65000,170000],tr:15000,act:50000},
  spots:{default:[{n:'수크 와킵 재래시장',d:'전통 카타르 재래시장',p:'오전'},{n:'무세움 오브 이슬라믹아트',d:'세계 최고 이슬람 미술관',p:'오전'},{n:'더 펄 인공 섬',d:'카타르 최고 럭셔리 지구',p:'오후'},{n:'루세일 스타디움',d:'2022 월드컵 결승 경기장',p:'오전'},{n:'사막 사파리',d:'카타르 사막 스타보드',p:'저녁'}]}},
// ── AFRICA MORE ──
나이로비:{kr:'나이로비',en:'Nairobi',country:'케냐 🇰🇪',iata:'NBO',airport:'NBO',flight:'약 16시간',bc:'Nairobi, Kenya',ab:'Nairobi--Kenya',na:'ICN-NBO',
  costs:{flight:[760000,1170000,2100000],hotel:[35000,85000,175000,400000],food:[12000,30000,82000],tr:12000,act:80000},
  spots:{default:[{n:'마사이마라 사파리',d:'세계 최고 야생동물 사파리',p:'종일'},{n:'나이로비 국립공원',d:'도심 근처 야생동물 공원',p:'오전'},{n:'데이비드 쉘드릭 야생동물 재단',d:'코끼리 고아원',p:'오전'},{n:'기린 센터',d:'로스차일드 기린 먹이 주기',p:'오전'},{n:'아프리카 전통시장',d:'마사이 공예품 시장',p:'오후'}]}},
쉐프샤우엔:{kr:'쉐프샤우엔',en:'Chefchaouen',country:'모로코 🇲🇦',iata:'CMN',airport:'CMN',flight:'약 14시간',bc:'Chefchaouen, Morocco',ab:'Chefchaouen--Morocco',na:'ICN-CMN',
  costs:{flight:[680000,1040000,2080000],hotel:[20000,48000,100000,230000],food:[9000,22000,62000],tr:8000,act:22000},
  spots:{default:[{n:'파란 메디나 탐방',d:'온통 파란 골목 미로 마을',p:'오전'},{n:'카스바 광장',d:'쉐프샤우엔 중심 광장',p:'오전'},{n:'자우이아 무스타파 사원',d:'쉐프샤우엔 대표 모스크',p:'오전'},{n:'라스 엘마 폭포',d:'마을 근교 폭포 트래킹',p:'오전'},{n:'옥상 카페 석양',d:'파란 마을 석양 뷰',p:'저녁'}]}},
아디스아바바:{kr:'아디스아바바',en:'Addis Ababa',country:'에티오피아 🇪🇹',iata:'ADD',airport:'ADD',flight:'약 16시간',bc:'Addis Ababa, Ethiopia',ab:'Addis-Ababa--Ethiopia',na:'ICN-ADD',
  costs:{flight:[750000,1150000,2060000],hotel:[22000,55000,110000,250000],food:[6000,16000,45000],tr:6000,act:30000},
  spots:{default:[{n:'국립박물관 (루시)',d:'320만년 전 인류 조상 루시 화석',p:'오전'},{n:'메르카토 시장',d:'아프리카 최대 야외 시장',p:'오전'},{n:'에티오피아 정교회',d:'이국적 콥트 정교회 문화',p:'오전'},{n:'아부 살탄 호수',d:'에티오피아 전통 코팅 호수',p:'오전'},{n:'에티오피아 커피 세레모니',d:'커피 원산지 전통 의식',p:'오후'}]}},
// ── AMERICAS MORE ──
보스턴:{kr:'보스턴',en:'Boston',country:'미국 🇺🇸',iata:'BOS',airport:'BOS',flight:'약 14시간',bc:'Boston, USA',ab:'Boston--United-States',na:'ICN-BOS',
  costs:{flight:[680000,1050000,2100000],hotel:[130000,245000,440000,880000],food:[45000,94000,220000],tr:24000,act:55000},
  spots:{default:[{n:'프리덤 트레일',d:'미국 독립 역사 탐방로',p:'오전'},{n:'하버드 대학 캠퍼스',d:'세계 최고 대학 캠퍼스',p:'오전'},{n:'퀸시 마켓',d:'보스턴 최고 먹거리 마켓',p:'오전'},{n:'패뉴일 홀',d:'미국 독립 발상지 홀',p:'오전'},{n:'보스턴 레드삭스 야구',d:'펜웨이 파크 야구 관람',p:'저녁'}]}},
워싱턴DC:{kr:'워싱턴DC',en:'Washington D.C.',country:'미국 🇺🇸',iata:'IAD',airport:'IAD',flight:'약 14시간',bc:'Washington D.C., USA',ab:'Washington-DC--United-States',na:'ICN-IAD',
  costs:{flight:[670000,1030000,2060000],hotel:[120000,230000,415000,830000],food:[42000,88000,210000],tr:22000,act:50000},
  spots:{default:[{n:'국회의사당',d:'미국 민주주의 상징',p:'오전'},{n:'스미소니언 박물관',d:'세계 최대 무료 박물관 군',p:'오전'},{n:'링컨 기념관',d:'내셔널 몰 링컨 동상',p:'오전'},{n:'백악관 주변 투어',d:'미국 대통령 관저',p:'오전'},{n:'내셔널 갤러리',d:'다빈치·모네·피카소 명화',p:'오전'}]}},
올랜도:{kr:'올랜도',en:'Orlando',country:'미국 🇺🇸',iata:'MCO',airport:'MCO',flight:'약 16시간',bc:'Orlando, USA',ab:'Orlando--United-States',na:'ICN-MCO',
  costs:{flight:[700000,1080000,2160000],hotel:[70000,145000,290000,640000],food:[38000,80000,190000],tr:18000,act:120000},
  spots:{default:[{n:'유니버설 스튜디오',d:'해리포터 & 슈퍼히어로 테마파크',p:'종일'},{n:'월트 디즈니 월드',d:'세계 최대 디즈니 파크',p:'종일'},{n:'에버글레이즈 에어보트',d:'악어 서식 습지 투어',p:'오전'},{n:'시원드 & 부시가든',d:'동물 & 어트랙션 테마파크',p:'종일'},{n:'올랜도 이치 프리믹스',d:'쇼핑·다이닝 복합 지구',p:'오후'}]}},
몬트리올:{kr:'몬트리올',en:'Montreal',country:'캐나다 🇨🇦',iata:'YUL',airport:'YUL',flight:'약 13시간',bc:'Montreal, Canada',ab:'Montreal--Canada',na:'ICN-YUL',
  costs:{flight:[650000,1000000,2000000],hotel:[110000,205000,365000,730000],food:[40000,84000,195000],tr:22000,act:50000},
  spots:{default:[{n:'올드 몬트리올 구시가',d:'유럽 분위기 프랑스 구시가',p:'오전'},{n:'몽 루아얄 공원',d:'몬트리올 전경 공원',p:'오전'},{n:'노트르담 바실리카',d:'몬트리올 상징 고딕 성당',p:'오전'},{n:'장-탈롱 마켓',d:'몬트리올 최대 로컬 마켓',p:'오전'},{n:'몬트리올 재즈 축제',d:'세계 최대 재즈 페스티벌',p:'저녁'}]}},
쿠스코:{kr:'쿠스코',en:'Cusco',country:'페루 🇵🇪',iata:'CUZ',airport:'CUZ',flight:'약 23시간',bc:'Cusco, Peru',ab:'Cusco--Peru',na:'ICN-CUZ',
  costs:{flight:[860000,1320000,2640000],hotel:[25000,58000,120000,280000],food:[8000,20000,58000],tr:8000,act:50000},
  spots:{default:[{n:'마추픽추',d:'잉카 공중 도시 세계 7대 불가사의',p:'종일'},{n:'아르마스 광장',d:'쿠스코 중심 잉카-스페인 광장',p:'오전'},{n:'삭사이와만 잉카 요새',d:'쿠스코 근교 잉카 석벽',p:'오전'},{n:'인디오 시장',d:'쿠스코 전통 재래시장',p:'오전'},{n:'레인보우 마운틴',d:'7색 줄무늬 산 트래킹',p:'종일'}]}},
산티아고:{kr:'산티아고',en:'Santiago',country:'칠레 🇨🇱',iata:'SCL',airport:'SCL',flight:'약 23시간',bc:'Santiago, Chile',ab:'Santiago--Chile',na:'ICN-SCL',
  costs:{flight:[900000,1380000,2760000],hotel:[45000,98000,195000,435000],food:[14000,35000,95000],tr:10000,act:40000},
  spots:{default:[{n:'산타루시아 언덕',d:'산티아고 전경 언덕 공원',p:'오전'},{n:'팔라시오 드 라 모네다',d:'칠레 대통령 궁전',p:'오전'},{n:'벨라비스타 예술 지구',d:'산티아고 힙한 예술 거리',p:'오후'},{n:'발파라이소 당일치기',d:'유네스코 항구 벽화 마을',p:'종일'},{n:'안데스 스키 리조트',d:'포르티요 스키장',p:'종일'}]}},
보고타:{kr:'보고타',en:'Bogota',country:'콜롬비아 🇨🇴',iata:'BOG',airport:'BOG',flight:'약 22시간',bc:'Bogota, Colombia',ab:'Bogota--Colombia',na:'ICN-BOG',
  costs:{flight:[850000,1300000,2600000],hotel:[30000,70000,145000,335000],food:[10000,25000,72000],tr:8000,act:35000},
  spots:{default:[{n:'라 칸델라리아 구시가',d:'보고타 식민지 역사 구시가',p:'오전'},{n:'황금 박물관',d:'콜롬비아 황금 유물 컬렉션',p:'오전'},{n:'몬세라테 케이블카',d:'3152m 전망대 성소',p:'오전'},{n:'코카 콜라 빌라',d:'보고타 거리 예술 투어',p:'오후'},{n:'안데스 커피 농장',d:'콜롬비아 커피 투어',p:'종일'}]}},
// ── OCEANIA MORE ──
// 멜버른, 케언즈 — 기존 DB 유지
오클랜드:{kr:'오클랜드',en:'Auckland',country:'뉴질랜드 🇳🇿',iata:'AKL',airport:'AKL',flight:'약 12시간',bc:'Auckland, New Zealand',ab:'Auckland--New-Zealand',na:'ICN-AKL',
  costs:{flight:[630000,980000,1960000],hotel:[95000,180000,325000,650000],food:[40000,84000,198000],tr:20000,act:65000},
  spots:{default:[{n:'스카이 타워',d:'뉴질랜드 최고층 전망·번지',p:'오전'},{n:'와이테마타 항구 크루즈',d:'오클랜드 항구 요트 크루즈',p:'오전'},{n:'와이헤케 섬 와이너리',d:'페리로 가는 와인 섬',p:'오전'},{n:'하버 브릿지 번지',d:'오클랜드 항구 다리 번지',p:'오전'},{n:'켈리 타론 수족관',d:'뉴질랜드 최대 수족관',p:'오전'}]}},
};

// HIER extensions part 2
const HIER_NEW2={
  '아시아·태평양':{
    '🇯🇵 일본':['다카마쓰','마쓰야마','아키타','나가노'],
    '🇨🇳 중국':['충칭','쿤밍','리장','하얼빈','난징','우한'],
    '🇲🇲 미얀마':['바간','양곤'],
    '🇱🇦 라오스':['비엔티안'],
    '🇮🇳 인도':['고아','우다이푸르','콜카타'],
    '🇱🇰 스리랑카':['캔디'],
    '🇲🇳 몽골':['울란바토르']
  },
  '유럽':{
    '🇫🇷 프랑스':['보르도','스트라스부르'],
    '🇪🇸 스페인':['빌바오'],
    '🇩🇪 독일':['함부르크','쾰른','드레스덴','프랑크푸르트'],
    '🇨🇿 체코':['체스키크룸로프'],
    '🇵🇱 폴란드':['브로츠와프'],
    '🇸🇮 슬로베니아':['류블랴나'],
    '🇲🇪 몬테네그로':['코토르'],
    '🇭🇷 크로아티아':['스플리트'],
    '🇪🇪 에스토니아':['탈린'],
    '🇳🇴 노르웨이':['베르겐'],
    '🇫🇮 핀란드':['로바니에미'],
    '🇹🇷 터키':['안탈리아']
  },
  '중동·아프리카':{
    '🇯🇴 요르단':['암만'],
    '🇴🇲 오만':['무스카트'],
    '🇶🇦 카타르':['도하'],
    '🇰🇪 케냐':['나이로비'],
    '🇲🇦 모로코':['쉐프샤우엔'],
    '🇪🇹 에티오피아':['아디스아바바']
  },
  '아메리카':{
    '🇺🇸 미국':['보스턴','워싱턴DC','올랜도'],
    '🇨🇦 캐나다':['몬트리올'],
    '🇵🇪 페루':['쿠스코'],
    '🇨🇱 칠레':['산티아고'],
    '🇨🇴 콜롬비아':['보고타']
  },
  '오세아니아':{
    '🇳🇿 뉴질랜드':['오클랜드']
  }
};

// ALIAS part 2
const ALIAS_NEW2={
  'takamatsu':'다카마쓰','matsuyama':'마쓰야마','akita':'아키타','nagano':'나가노',
  'nhatrang':'나트랑','bali':'발리','singapore':'싱가포르',
  'chongqing':'충칭','kunming':'쿤밍','lijiang':'리장','harbin':'하얼빈','nanjing':'난징','wuhan':'우한',
  'bagan':'바간','yangon':'양곤','vientiane':'비엔티안',
  'goa':'고아','udaipur':'우다이푸르','kolkata':'콜카타','kandy':'캔디','ulaanbaatar':'울란바토르',
  'bordeaux':'보르도','strasbourg':'스트라스부르','bilbao':'빌바오',
  'hamburg':'함부르크','cologne':'쾰른','koeln':'쾰른','dresden':'드레스덴','frankfurt':'프랑크푸르트',
  'ceskykrumlov':'체스키크룸로프','wroclaw':'브로츠와프','ljubljana':'류블랴나',
  'kotor':'코토르','split':'스플리트','tallinn':'탈린',
  'bergen':'베르겐','rovaniemi':'로바니에미','antalya':'안탈리아',
  'amman':'암만','muscat':'무스카트','doha':'도하',
  'nairobi':'나이로비','chefchaouen':'쉐프샤우엔','addisababa':'아디스아바바',
  'boston':'보스턴','washington':'워싱턴DC','orlando':'올랜도',
  'montreal':'몬트리올','cusco':'쿠스코','santiago':'산티아고','bogota':'보고타',
  'melbourne':'멜버른','cairns':'케언즈','auckland':'오클랜드','cebu':'세부'
};

// Merge (기존 항목 보호)
for(const[k,v] of Object.entries(EXT2)) if(!DB[k]) DB[k]=v;

Object.keys(HIER_NEW2).forEach(cont=>{
  if(!HIER[cont]) HIER[cont]={};
  Object.keys(HIER_NEW2[cont]).forEach(country=>{
    if(!HIER[cont][country]) HIER[cont][country]=[];
    HIER_NEW2[cont][country].forEach(city=>{
      if(!HIER[cont][country].includes(city)) HIER[cont][country].push(city);
    });
  });
});

Object.assign(ALIAS, ALIAS_NEW2);

// Rebuild CMAP
for(const key of Object.keys(CMAP)) delete CMAP[key];
for(const[c,countries] of Object.entries(HIER))
  for(const cities of Object.values(countries))
    cities.forEach(city=>CMAP[city]=c);

console.log('TripMind DB (after ext2):', Object.keys(DB).length, 'destinations');
})();
