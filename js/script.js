// Vissimart – Language switcher + Gallery modal

document.addEventListener('DOMContentLoaded', () => {
  // ===== Language Switcher =====
  const langButtons = document.querySelectorAll('.lang-btn');
  const savedLang = localStorage.getItem('vissimart-lang') || 'sk';

  function setLanguage(lang) {
    document.body.classList.remove('lang-sk', 'lang-en');
    document.body.classList.add(`lang-${lang}`);
    localStorage.setItem('vissimart-lang', lang);

    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-set-lang') === lang);
    });
  }

  setLanguage(savedLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const next = btn.getAttribute('data-set-lang');
      if (next === 'sk' || next === 'en') setLanguage(next);
    });
  });

  // ===== Mobile menu =====
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // ===== Gallery Modal =====
  const modalOverlay = document.getElementById('art-modal');
  const modalClose = document.querySelector('.modal-close');
  const artCards = document.querySelectorAll('[data-art-id]');

  // Artwork data (bilingual)
  const artworks = {
    'kamenicka': {
      sk: {
        title: 'Kamenická zlatá hodinka',
        size: '50 × 50 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Jadro tohto obrazu tvorí majestátna zrúcanina Kamenického hradu, ktorú priamo osvetľujú teplé lúče zapadajúceho slnka. Panorámu dotvára presný geografický kontext – v pozadí sa črtá silueta Levočských vrchov, pred ktorými sa do priestoru týči známy masív Balažky. Vďaka modelovacej 3D paste hrad a skaly doslova vystupujú z plátna. Keď na obraz dopadne prirodzené alebo bočné svetlo, reliéf ožije a vytvára úžasnú dynamiku.',
        price: '290 €',
        available: true
      },
      en: {
        title: 'Kamenica Golden Hour',
        size: '50 × 50 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'The heart of this painting is the majestic ruin of Kamenica Castle, bathed in the warm rays of the setting sun. The panorama is completed by the precise geographical context – the silhouette of the Levoča Mountains in the background and the distinctive Balažka massif. Thanks to modeling 3D paste, the castle and rocks literally rise from the canvas. When natural or side light hits the painting, the relief comes alive and creates wonderful dynamism.',
        price: '290 €',
        available: true
      }
    },
    'vysoka': {
      sk: {
        title: 'Kráľovná Tatier – Vysoká',
        size: '45 × 55 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Obraz venovaný jednému z najikonickejších štítov – Vysokej, prezývanej Kráľovná Tatier. Zachytáva pohľad zo Zlomiskovej doliny nad Dračím hrebeňom. 3D pasta dala skalám a masívu reálnu hmatateľnú štruktúru. Reliéf vrhá skutočné tiene a prináša do interiéru autentickú atmosféru vysokohorskej prírody.',
        price: '280 €',
        available: true
      },
      en: {
        title: 'Queen of the Tatras – Vysoká',
        size: '45 × 55 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'Dedicated to one of the most iconic peaks – Vysoká, known as the Queen of the Tatras. Captures the view from Zlomisková Valley above the Dragon Ridge. 3D paste gave the rocks and massif a real tactile structure. The relief casts real shadows and brings the authentic atmosphere of high mountain nature into the interior.',
        price: '280 €',
        available: true
      }
    },
    'orava': {
      sk: {
        title: 'Letný večer na Orave',
        size: '50 × 70 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Oravský hrad počas tichého letného podvečera. Obloha sa sfarbuje do sýtych odtieňov ružovej, fialovej a teplej oranžovej. 3D pasta dala hradným múrom a skalnému bralu hmatateľnú podobu, ktorá vystupuje z plátna a ožíva so svetlom.',
        price: '395 €',
        available: true
      },
      en: {
        title: 'Summer Evening in Orava',
        size: '50 × 70 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'Orava Castle during a quiet summer evening. The sky turns into rich shades of pink, purple and warm orange. 3D paste gave the castle walls and rocky cliff a tangible form that rises from the canvas and comes alive with light.',
        price: '395 €',
        available: true
      }
    },
    'belianska': {
      sk: {
        title: 'Belianska purpurová noc',
        size: '55 × 100 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Veľkoformátový panoramatický obraz zimnej noci v Belianskych Tatrách. Dominantou sú zasnežené masívy Ždiarskej vidly a Havrana osvetlené ružovkastými odtieňmi polárnej žiary. 3D pasta vytvorila reálnu štruktúru vápencových hrebeňov.',
        price: '490 €',
        available: true
      },
      en: {
        title: 'Belianske Purple Night',
        size: '55 × 100 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'Large panoramic painting of a winter night in the Belianske Tatras. Dominated by the snow-covered massifs of Ždiarska Vidla and Havran lit by the pinkish hues of the polar light. 3D paste created a real structure of the limestone ridges.',
        price: '490 €',
        available: true
      }
    },
    'dumbier': {
      sk: {
        title: 'Ku hviezdam (Ďumbier)',
        size: '60 × 70 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Pohľad na najvyšší vrchol Nízkych Tatier – Ďumbier – pri prechode dňa do noci. Teplé odtiene na horizonte a detailne vykreslená Mliečna dráha so súhvezdiami. 3D pasta na skaly a terén vytvára hmatateľnú hĺbku.',
        price: '420 €',
        available: true
      },
      en: {
        title: 'To the Stars (Ďumbier)',
        size: '60 × 70 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'View of the highest peak of the Low Tatras – Ďumbier – at the transition from day to night. Warm tones on the horizon and a detailed Milky Way with constellations. 3D paste on the rocks and terrain creates tangible depth.',
        price: '420 €',
        available: true
      }
    },
    'beckov': {
      sk: {
        title: 'Po búrke (Hrad Beckov)',
        size: '50 × 70 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Dramatická atmosféra tesne po silnej letnej búrke. Hrad Beckov na vápencovom brale, temné mračná a žiarivá dúha. Detail dažďových kvapiek v popredí. 3D pasta na skaly a múry vytvára silný reliéf.',
        price: '390 €',
        available: true
      },
      en: {
        title: 'After the Storm (Beckov Castle)',
        size: '50 × 70 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'Dramatic atmosphere right after a strong summer storm. Beckov Castle on a limestone cliff, dark clouds and a radiant rainbow. Detail of raindrops in the foreground. 3D paste on rocks and walls creates a strong relief.',
        price: '390 €',
        available: true
      }
    },
    'vlkolinec': {
      sk: {
        title: 'Živé dedičstvo (Vlkolínec)',
        size: '50 × 70 cm',
        technique: 'Klasická akrylová maľba na maliarskom plátne (bez 3D)',
        desc: 'UNESCO osada Vlkolínec v srdci Liptova. Tradičné zrubové domčeky so šindľovými strechami v horskom prostredí. Klasická hladká maľba s dôrazom na svetlo, tiene a textúru dreva. Obraz prináša pocit domova a úcty k našim koreňom.',
        price: '330 €',
        available: true
      },
      en: {
        title: 'Living Heritage (Vlkolínec)',
        size: '50 × 70 cm',
        technique: 'Classical acrylic painting on canvas (no 3D)',
        desc: 'UNESCO village Vlkolínec in the heart of Liptov. Traditional log houses with shingle roofs in a mountain setting. Classical smooth painting focusing on light, shadow and wood texture. The painting brings a sense of home and respect for our roots.',
        price: '330 €',
        available: true
      }
    },
    'lubovna': {
      sk: {
        title: 'Strážca severu (Ľubovniansky hrad)',
        size: '50 × 70 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Ľubovniansky hrad ako strážca severu na vápencovom brale. Kontrast pokojnej zelenej krajiny s dramatickou zasneženou hradbou Vysokých Tatier v pozadí. 3D pasta na múry a skaly.',
        price: '395 €',
        available: true
      },
      en: {
        title: 'Guardian of the North (Ľubovňa Castle)',
        size: '50 × 70 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'Ľubovňa Castle as the guardian of the north on a limestone cliff. Contrast of peaceful green landscape with the dramatic snow-covered barrier of the High Tatras in the background. 3D paste on walls and rocks.',
        price: '395 €',
        available: true
      }
    },
    'skalisko': {
      sk: {
        title: 'Skalisko v mraze (Volovské vrchy)',
        size: '50 × 70 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Ikonické Skalisko (Volovec) v mrazivom zimnom podvečeri. Zlato-oranžové lúče zapadajúceho slnka a drsný georeliéf s turistickým krížom a slovenskou vlajkou. Silný 3D reliéf.',
        price: '380 €',
        available: true
      },
      en: {
        title: 'Skalisko in Frost (Volovské Mountains)',
        size: '50 × 70 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'Iconic Skalisko (Volovec) on a frosty winter evening. Golden-orange rays of the setting sun and rough terrain with a tourist cross and Slovak flag. Strong 3D relief.',
        price: '380 €',
        available: true
      }
    },
    'rozsutec': {
      sk: {
        title: 'Jar pod Rozsutcom',
        size: '60 × 60 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Skorá jar v Malej Fatre pod Veľkým Rozsutcom. Fialové kvety šafranu v popredí, svieža zeleň a dramatická ružovo-fialová obloha. 3D pasta na skalnú korunu Rozsutca.',
        price: '380 €',
        available: true
      },
      en: {
        title: 'Spring under Rozsutec',
        size: '60 × 60 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'Early spring in Malá Fatra under Veľký Rozsutec. Purple crocus flowers in the foreground, fresh greenery and dramatic pink-purple sky. 3D paste on the rocky crown of Rozsutec.',
        price: '380 €',
        available: true
      }
    },
    'trojkoruny': {
      sk: {
        title: 'Opar pod Troma korunami',
        size: '60 × 60 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Ranná scenéria v Pieninách pri Trom korunách. Hustá nízka hmla a opar, cez ktorý presvitajú teplé lúče. Vodná hladina v popredí. 3D pasta na vápencové štíty.',
        price: '390 €',
        available: true
      },
      en: {
        title: 'Mist under Three Crowns',
        size: '60 × 60 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'Morning scenery in the Pieniny near the Three Crowns. Dense low fog and mist through which warm rays shine. Water surface in the foreground. 3D paste on the limestone peaks.',
        price: '390 €',
        available: true
      }
    },
    'spis': {
      sk: {
        title: 'Zrodený z hmly (Spišský hrad)',
        size: '55 × 65 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Spišský hrad vynárajúci sa z tmavej valivej hmly. Kontrast jasnej modrej oblohy, éterického oparu a tmavých ihličnatých stromov. 3D pasta na historické múry.',
        price: '380 €',
        available: true
      },
      en: {
        title: 'Born from the Fog (Spiš Castle)',
        size: '55 × 65 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'Spiš Castle emerging from dark rolling fog. Contrast of clear blue sky, ethereal mist and dark coniferous trees. 3D paste on the historic walls.',
        price: '380 €',
        available: true
      }
    },
    'krivan': {
      sk: {
        title: 'Nočný Kriváň',
        size: '40 × 50 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Prvé dielo zo série „Dotkni sa Slovenska“. Majestátny Kriváň v nočnej scenérii s mesiacom v splne a hviezdnou oblohou. Silný 3D reliéf svahov.',
        price: '150 €',
        available: true
      },
      en: {
        title: 'Night Kriváň',
        size: '40 × 50 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'First work from the series “Touch Slovakia”. Majestic Kriváň in a night scene with a full moon and starry sky. Strong 3D relief of the slopes.',
        price: '150 €',
        available: true
      }
    },
    'telgart': {
      sk: {
        title: 'Večer v Telgárte',
        size: '60 × 60 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Tento obraz zachytáva jednu z najfotogenickejších technických pamiatok Slovenska – ikonický Chmarošský viadukt v Telgárte, zasadený do čarovnej, upokojujúcej večernej atmosféry. Ústredným motívom sú monumentálne kamenné oblúky, ktoré sa hrdo týčia nad horskou lúkou, zatiaľ čo obloha hrá nádhernými pastelovými odtieňmi ružovej a fialovej pri zapadajúcom slnku. V popredí dynamicky preteká horský potok, ktorý je lemovaný bohatou zeleňou a veľkými listami lopúchov. Pri tomto diele som modelovaciu 3D pastu použila výlučne na stvárnenie samotného viaduktu. Vďaka tomu jeho hrubá, kamenná štruktúra reálne a hmatateľne vystupuje z plátna, čím vytvára úžasný priestorový kontrast k jemnej, hladkej klasickej maľbe okolitej prírody, lúky a tečúcej vody.',
        price: '395 €',
        available: true
      },
      en: {
        title: 'Evening in Telgárt',
        size: '60 × 60 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'This painting captures one of Slovakia’s most photogenic technical monuments – the iconic Chmarošský viaduct in Telgárt, set in a magical, calming evening atmosphere. The central motif is the monumental stone arches rising proudly above a mountain meadow, while the sky plays in beautiful pastel pinks and violets at sunset. In the foreground a mountain stream flows dynamically, lined with lush greenery and large burdock leaves. Modeling 3D paste was used exclusively for the viaduct itself, so its rough stone structure rises from the canvas and contrasts with the smooth classical painting of the surrounding nature, meadow and water.',
        price: '395 €',
        available: true
      }
    },
    'ostrva': {
      sk: {
        title: 'Pod masívom Ostrvy',
        size: '50 × 70 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Tento obraz zachytáva úchvatnú tatranskú scenériu priamo zo sedla pod Ostrvou, s výhľadom do celej Mengusovskej doliny, kde dominuje farebná hladina Popradského plesa, na brehu usadená Chata pri Popradskom plese a presný detail tiahnucej sa Tatranskej magistrály. Atmosféru diela určuje jesenná nálada. Výrazným prvkom maľby je hmatateľná hĺbka, ktorú som dosiahla použitím modelovacej 3D pasty. Drsná štruktúra žulových stien a skalných blokov fyzicky vystupuje z plátna. Pri dobrom dennom svetle alebo bočnom osvetlení z lampy v miestnosti začnú tieto vystupujúce časti vrhať skutočné tiene, vďaka čomu obraz pod vplyvom svetla mení svoju dynamiku a prináša do interiéru autentickú, surovú atmosféru jesennej tatranskej prírody.',
        price: '320 €',
        available: true
      },
      en: {
        title: 'Below the Ostrva Massif',
        size: '50 × 70 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'This painting captures a breathtaking Tatra scene from the saddle below Ostrva, looking into the whole Mengusovská Valley, dominated by the colourful surface of Popradské pleso, the mountain chalet on the shore and the precise line of the Tatranská magistrála trail. The mood is autumn. A distinctive element is tactile depth from modeling 3D paste. The rough structure of granite walls and rock blocks physically rises from the canvas. In good daylight or side lamp light these raised parts cast real shadows, so the painting changes with the light and brings an authentic, raw atmosphere of autumn Tatra nature into the interior.',
        price: '320 €',
        available: true
      }
    },
    'drazovce': {
      sk: {
        title: 'Nitriansky maják v búrke (Drážovský kostolík)',
        size: '60 × 60 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Tento obraz zachytáva jeden z najfotogenickejších a najemotívnejších symbolov Slovenska – románsky Kostol svätého Michala Archanjela v Drážovciach, známy ako Drážovský kostolík. Malebná stavba osamotene sa tiahnuca na kopci nad Nitrou pôsobí v scenérii zapadajúceho slnka ako skutočný maják v rozbúrenom oceáne. Oblohe dominujú dramatické mračná, ktoré pretína blesk, a silný kontrast podvečerných tieňov s teplým svetlom vyžarujúcim z kostolíka. Na stvárnenie samotných historických múrov kostolíka som využila modelovaciu 3D pastu, vďaka ktorej reliéf fyzicky vystupuje z plátna. Keď si obraz zavesíte do interiéru a dopadne naň prirodzené denné svetlo alebo večerné bočné osvetlenie z lampy, táto 3D štruktúra ožije. Reliéf začne vrhať jemné tiene, čím obraz získava jedinečnú priestorovú hĺbku a prináša do miestnosti silnú, tajuplnú a ochrannú atmosféru tohto historického miesta.',
        price: 'Vypredané',
        available: false
      },
      en: {
        title: 'Nitra Lighthouse in the Storm (Drážovce Church)',
        size: '60 × 60 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'This painting captures one of Slovakia’s most photogenic and emotional symbols – the Romanesque Church of St Michael the Archangel in Drážovce, known as Drážovský kostolík. The small building standing alone on the hill above Nitra at sunset looks like a true lighthouse in a stormy ocean. The sky is dominated by dramatic clouds cut by lightning, and a strong contrast of evening shadows with warm light radiating from the church. Modeling 3D paste was used on the historic walls so the relief physically rises from the canvas. In daylight or evening side light the 3D structure comes alive, casts gentle shadows, and brings a mysterious, protective atmosphere of this historic place into the room.',
        price: 'Sold',
        available: false
      }
    },
    'parohac': {
      sk: {
        title: 'Tatranský paroháč',
        size: '50 × 50 cm',
        technique: 'Akryl a modelovacia 3D pasta na maliarskom plátne',
        desc: 'Tento obraz zachytáva divokú a tichú krásu Vysokých Tatier počas mrazivého dňa, kedy zasneženú scenériu a štíty hôr jemne zohrievajú teplé lúče zapadajúceho slnka. Ústredným motívom je majestátny jeleň stojaci v hlbokom snehu pri drevenom plote, ktorý dokonale dotvára atmosféru. Pozadiu dominuje impozantná a ostrá vysokohorská panoráma, v ktorej pozorné oko rozozná charakteristické siluety dvoch našich významných štítov – Končistej a Gerlachovského štítu. Na stvárnenie masívnych zasnežených štítov v pozadí a mrazivého terénu som vo veľkej miere využila modelovaciu 3D pastu. Hrebene a snehové záveje tak získali reálnu, hmatateľnú štruktúru, ktorá fyzicky vystupuje z plátna.',
        price: 'Vypredané',
        available: false
      },
      en: {
        title: 'Tatra Stag',
        size: '50 × 50 cm',
        technique: 'Acrylic and modeling 3D paste on canvas',
        desc: 'This painting captures the wild, quiet beauty of the High Tatras on a freezing day, when the snowy scenery and mountain peaks are gently warmed by the last rays of sunset. The central motif is a majestic stag standing in deep snow by a wooden fence. The background is a sharp high-mountain panorama where the silhouettes of Končistá and Gerlachovský štít can be recognised. Modeling 3D paste was used extensively on the massive snow-covered peaks and frozen terrain, so ridges and snowdrifts have a real, tactile structure that physically rises from the canvas.',
        price: 'Sold',
        available: false
      }
    },
    'lev': {
      sk: {
        title: 'Neohrozený pohľad',
        size: '40 × 50 cm',
        technique: 'Klasická akrylová maľba (bez 3D)',
        desc: 'Detailný portrét leva – kráľa zvierat. Absolútny pokoj a odhodlanie v očiach. Monochromatická tvár s bohatou hrivou a zlatými prasklinami v pozadí.',
        price: '230 €',
        available: true
      },
      en: {
        title: 'Unflinching Gaze',
        size: '40 × 50 cm',
        technique: 'Classical acrylic painting (no 3D)',
        desc: 'Detailed portrait of a lion – the king of animals. Absolute calm and determination in the eyes. Monochromatic face with rich mane and golden cracks in the background.',
        price: '230 €',
        available: true
      }
    }
  };

  let currentArtId = null;
  let currentPhoto = 0;

  function photoList(id) {
    return [
      'images/' + id + '.jpg',
      'images/' + id + '-d2.jpg',
      'images/' + id + '-d3.jpg',
      'images/' + id + '-d4.jpg',
      'images/' + id + '-d5.jpg',
    ];
  }

  function setModalPhoto(index) {
    if (!currentArtId) return;
    const photos = photoList(currentArtId);
    currentPhoto = (index + photos.length) % photos.length;
    const photo = document.getElementById('modal-photo');
    const count = document.getElementById('modal-count');
    if (photo) photo.src = photos[currentPhoto];
    if (count) count.textContent = (currentPhoto + 1) + ' / ' + photos.length;
    document.querySelectorAll('#modal-thumbs img').forEach((img, i) => {
      img.classList.toggle('active', i === currentPhoto);
    });
  }

  function openModal(id) {
    const lang = document.body.classList.contains('lang-en') ? 'en' : 'sk';
    const art = artworks[id];
    if (!art) return;

    const data = art[lang];
    currentArtId = id;
    currentPhoto = 0;

    const photo = document.getElementById('modal-photo');
    if (photo) {
      photo.src = 'images/' + id + '.jpg';
      photo.alt = data.title;
    }
    const thumbs = document.getElementById('modal-thumbs');
    if (thumbs) {
      thumbs.innerHTML = photoList(id).map((src, i) =>
        '<img src="' + src + '" data-idx="' + i + '" class="' + (i === 0 ? 'active' : '') + '" alt="">'
      ).join('');
      thumbs.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', (e) => {
          e.stopPropagation();
          setModalPhoto(Number(img.dataset.idx));
        });
      });
    }
    setModalPhoto(0);

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-meta').textContent = `${data.size} · ${data.technique}`;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-price').textContent = data.available ? data.price : (lang === 'sk' ? 'Vypredané' : 'Sold');
    document.getElementById('modal-price').classList.toggle('sold', !data.available);

    const btn = document.getElementById('modal-cta');
    if (data.available) {
      btn.style.display = 'inline-block';
      btn.href = `contact.html?art=${encodeURIComponent(data.title)}`;
    } else {
      btn.style.display = 'none';
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  artCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(card.dataset.artId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  const prevBtn = document.getElementById('modal-prev');
  const nextBtn = document.getElementById('modal-next');
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); setModalPhoto(currentPhoto - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); setModalPhoto(currentPhoto + 1); });

  document.addEventListener('keydown', (e) => {
    if (!modalOverlay || !modalOverlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') setModalPhoto(currentPhoto + 1);
    if (e.key === 'ArrowLeft') setModalPhoto(currentPhoto - 1);
  });

  // Gallery filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-grid .art-card').forEach(card => {
        const cats = (card.dataset.category || '').split(' ');
        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const cookieBanner = document.getElementById('cookie-banner');
  const cookieOk = document.getElementById('cookie-ok');
  try {
    if (cookieBanner && localStorage.getItem('vissimart-consent') !== '1') {
      cookieBanner.hidden = false;
    }
  } catch (e) {
    if (cookieBanner) cookieBanner.hidden = false;
  }
  if (cookieOk && cookieBanner) {
    cookieOk.addEventListener('click', () => {
      try { localStorage.setItem('vissimart-consent', '1'); } catch (e) {}
      cookieBanner.hidden = true;
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = document.getElementById('form-ok');
      form.querySelectorAll('label, button[type="submit"]').forEach((el) => {
        if (el.id !== 'form-ok') el.style.display = 'none';
      });
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.style.display = 'none';
      if (ok) ok.hidden = false;
    });
  }
});