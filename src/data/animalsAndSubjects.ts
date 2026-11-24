import { SubjectData, Badge, SubjectId } from '../types';
import uirapuruImg from '../assets/images/uirapuru_artes_real_1788267284597.jpg';
import raVidroImg from '../assets/images/ra_vidro_biologia_1788182637229.jpg';
import macacoImg from '../assets/images/macaco_espanhol_real_1788267653594.jpg';
import borboletaMorphoImg from '../assets/images/morpho_filosofia_real_1788266068638.jpg';
import queixadaImg from '../assets/images/queixada_fisica_real_1788182785281.jpg';
import harpiaImg from '../assets/images/harpia_real_historia_1788182557288.jpg';
import corujaImg from '../assets/images/coruja_ingles_real_1788266220664.jpg';
import oncaMatematicaImg from '../assets/images/onca_matematica_real_1789479778223.jpg';
import quatiImg from '../assets/images/quati_portugues_real_1788182491618.jpg';
import tartarugaImg from '../assets/images/tartaruga_quimica_real_1788266125829.jpg';
import acaraImg from '../assets/images/acara_disco_socio_1788182723256.jpg';
import ariranhaImg from '../assets/images/ariranha_geografia_real_1788266739806.jpg';

export const ANIMAL_ILLUSTRATIONS_MAP: Record<SubjectId | 'guilherme', string> = {
  artes: uirapuruImg,
  biologia: raVidroImg,
  espanhol: macacoImg,
  filosofia: borboletaMorphoImg,
  fisica: queixadaImg,
  geografia: ariranhaImg,
  historia: harpiaImg,
  ingles: corujaImg,
  matematica: oncaMatematicaImg,
  portugues: quatiImg,
  quimica: tartarugaImg,
  sociologia: acaraImg,
  guilherme: oncaMatematicaImg,
};

export const SUBJECTS_DATA: SubjectData[] = [
  {
    id: 'artes',
    name: 'Artes',
    category: 'Linguagens',
    description: 'Compreensão das linguagens visuais, música, teatro, dança, história da arte e patrimônio cultural brasileiro.',
    highSchoolFocus: 'Vanguardas Europeias, Modernismo Brasileiro (1922), Arte Contemporânea, Patrimônio Imaterial e Funções Sociais da Arte.',
    recommendedTopics: ['Semana de Arte Moderna (1922)', 'Vanguardas Europeias', 'Movimento Antropofágico', 'Arte Popular & Folclore', 'Música & Dança no Brasil'],
    animal: {
      name: 'Uirapuru',
      species: 'Uirapuru-de-cabeça-vermelha / Uirapuru-verdadeiro',
      scientificName: 'Pipra rubrocapilla / Cyphorhinus arada',
      habitat: 'Sub-bosque e estratos médios das florestas tropicais da Amazônia e Mata Atlântica',
      funFact: 'Considerado o pássaro mágico da fauna brasileira, suas cores vibrantes e seu canto melódico são lendários: diz a lenda que quando o Uirapuru canta, toda a floresta silencia para apreciar sua arte sonora!',
      personality: 'Criativo, harmônico, expressivo e apaixonado pela estética, música e cores da natureza.',
      greetingMessage: 'Piu-tril! Sou o Uirapuru, o guardião das artes, das cores e da harmonia! Vamos desvendar juntos as vanguardas, a expressividade visual e a riqueza do modernismo brasileiro!',
      tipQuote: 'Nas provas de Linguagens e Códigos do ENEM, a Arte é cobrada como reflexo social e crítico: atente-se ao diálogo entre a estética da obra e o momento histórico em que foi produzida.',
      avatarIcon: 'palette',
      illustrationUrl: uirapuruImg,
      themeColor: 'from-rose-500 via-amber-500 to-yellow-500',
      accentColor: 'text-rose-800 bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300',
      bgGradient: 'bg-gradient-to-br from-rose-50 via-amber-50/40 to-yellow-100/50 dark:from-rose-950/20 dark:to-amber-950/20'
    },
    videoLessons: [
      {
        id: 'art-1',
        title: 'Semana de Arte Moderna (1922) & Antropofagia',
        duration: '18 min',
        topic: 'Modernismo Brasileiro',
        channel: 'Curso Enem Gratuito',
        youtubeId: 'ubyCGWXr3h8',
        summary: [
          'O rompimento com o academicismo parnasiano no Theatro Municipal de São Paulo em fevereiro de 1922.',
          'Principais nomes: Anita Malfatti, Mário de Andrade, Oswald de Andrade, Heitor Villa-Lobos e Victor Brecheret.',
          'O Manifesto Antropofágico (1928) e a pintura "Abaporu" de Tarsila do Amaral: deglutir a cultura estrangeira e recriá-la com identidade brasileira.'
        ],
        keyTerms: [
          { term: 'Antropofagia Cultural', definition: 'Conceito modernista de absorver criticamente influências estéticas estrangeiras para produzir uma arte genuinamente nacional.' },
          { term: 'Ruptura Estética', definition: 'Quebra com os padrões clássicos de simetria, perspectiva acadêmica e temas eurocêntricos.' }
        ],
        xpReward: 80
      },
      {
        id: 'art-2',
        title: 'Vanguardas Europeias: Características e Obras no ENEM',
        duration: '22 min',
        topic: 'História da Arte & Vanguardas',
        channel: 'Curso Enem Gratuito',
        youtubeId: '47t2s1EJotE',
        summary: [
          'As 5 grandes vanguardas do início do século XX: Cubismo (geometrização), Futurismo (velocidade), Expressionismo (angústia interior), Dadaísmo (anti-arte) e Surrealismo (inconsciente).',
          'A função social, política e expressiva da arte nos contextos contemporâneos.',
          'Análise de linguagens híbridas: grafite, intervenção urbana, instalações e performance.'
        ],
        keyTerms: [
          { term: 'Surrealismo', definition: 'Vanguarda que explora o mundo dos sonhos, o automatismo psíquico e o subconsciente (ex: Salvador Dalí).' },
          { term: 'Intervenção Urbana', definition: 'Ações artísticas realizadas no espaço público que alteram a percepção cotidiana da cidade.' }
        ],
        xpReward: 85
      }
    ],
    quizzes: [
      {
        id: 'art-q1',
        difficulty: 'Médio',
        yearSource: 'ENEM 2022',
        context: 'A tela "Abaporu" (1928), de Tarsila do Amaral, com seus pés e mãos agigantados ancorados na terra e cabeça diminuta ao lado de um cacto sob o sol escaldante, inspirou diretamente:',
        question: 'Qual movimento cultural brasileiro foi impulsionado por essa obra icônica?',
        options: [
          { id: 'a', text: 'O Romantismo indianista de José de Alencar.' },
          { id: 'b', text: 'O Movimento Antropofágico liderado por Oswald de Andrade.' },
          { id: 'c', text: 'O Realismo acadêmico da Escola Nacional de Belas Artes.' },
          { id: 'd', text: 'O Parnasianismo poético de Olavo Bilac.' },
          { id: 'e', text: 'O Concretismo paulista da década de 1950.' }
        ],
        correctOptionId: 'b',
        explanation: 'Ao presentear seu marido Oswald de Andrade com a tela "Abaporu" ("homem que come gente" em tupi), Tarsila inspirou a criação do Manifesto Antropofágico e da Revista de Antropofagia, símbolos da 1ª fase modernista brasileira.'
      },
      {
        id: 'art-q2',
        difficulty: 'Fácil',
        yearSource: 'ENEM 2021',
        context: 'Uma vanguarda europeia do início do século XX propôs a destruição dos padrões tradicionais por meio da fragmentação geométrica da forma e da representação simultânea de múltiplos pontos de vista sobre o mesmo plano bidimensional. Trata-se do:',
        question: 'Identifique a vanguarda artística descrita:',
        options: [
          { id: 'a', text: 'Cubismo (Pablo Picasso e Georges Braque).' },
          { id: 'b', text: 'Impressionismo (Claude Monet).' },
          { id: 'c', text: 'Rococó (Jean-Honoré Fragonard).' },
          { id: 'd', text: 'Neoclassicismo (Jacques-Louis David).' },
          { id: 'e', text: 'Barroco (Caravaggio).' }
        ],
        correctOptionId: 'a',
        explanation: 'O Cubismo, inaugurado por Picasso e Braque por volta de 1907 (com "Les Demoiselles d\'Avignon"), revolucionou a pintura ao decompor o espaço tridimensional em planos geométricos e múltiplos ângulos de visão simultâneos.'
      },
      {
        id: 'art-q3',
        difficulty: 'Médio',
        yearSource: 'ENEM 2020',
        context: 'O grafite e a arte urbana contemporânea diferenciam-se da pichação prioritariamente por:',
        question: 'Assinale a alternativa que explica o estatuto artístico e social do grafite:',
        options: [
          { id: 'a', text: 'O uso exclusivo de tintas a óleo sobre suportes móveis de museus.' },
          { id: 'b', text: 'A elaboração plástica complexa, dialogando esteticamente com a arquitetura urbana e ressignificando o espaço coletivo.' },
          { id: 'c', text: 'A proibição de transmitir mensagens de teor político ou social.' },
          { id: 'd', text: 'O caráter puramente decorativo sem vínculo com a cultura hip-hop.' },
          { id: 'e', text: 'A filiação rígida aos princípios do Renascimento italiano.' }
        ],
        correctOptionId: 'b',
        explanation: 'O grafite é uma manifestação das artes visuais urbanas que utiliza recursos técnicos apurados (composição, perspectiva, cores, texturas) para dialogar com a cidade e seus transeuntes, ressignificando a paisagem pública.'
      },
      {
        id: 'art-q4',
        difficulty: 'Médio',
        yearSource: 'ENEM 2023',
        context: 'A vanguarda artística europeia do início do século XX que se inspirou profundamente nas teorias psicanalíticas de Sigmund Freud sobre o inconsciente, os sonhos e o automatismo psíquico foi o:',
        question: 'Assinale a vanguarda descrita e seus principais expoentes:',
        options: [
          { id: 'a', text: 'Futurismo de Filippo Marinetti.' },
          { id: 'b', text: 'Surrealismo de Salvador Dalí e René Magritte.' },
          { id: 'c', text: 'Impressionismo de Claude Monet.' },
          { id: 'd', text: 'Abstracionismo geométrico de Piet Mondrian.' },
          { id: 'e', text: 'Realismo socialista soviético.' }
        ],
        correctOptionId: 'b',
        explanation: 'O Surrealismo (inaugurado pelo Manifesto de André Breton em 1924) propôs libertar o pensamento das amarras da razão lógica, explorando o universo dos sonhos, do delírio e do subconsciente.'
      },
      {
        id: 'art-q5',
        difficulty: 'Difícil',
        yearSource: 'ENEM 2021',
        context: 'No contexto do ciclo do ouro em Minas Gerais no século XVIII, o Barroco e Rococó ganharam feições próprias, destacando-se a obra escultórica e arquitetônica de Antônio Francisco Lisboa, o Aleijadinho.',
        question: 'Qual é uma marca estética marcante nas esculturas de profetas e relevos de Aleijadinho em Congonhas e Ouro Preto?',
        options: [
          { id: 'a', text: 'Uso exclusivo de mármore de Carrara importado com linhas puramente retas neoclássicas.' },
          { id: 'b', text: 'Expressividade dramática, olhos amendoados e talha em pedra-sabão e madeira de cedro.' },
          { id: 'c', text: 'Ausência total de temas religiosos ou figuras bíblicas.' },
          { id: 'd', text: 'Pintura abstrata geométrica sem representação de rostos humanos.' },
          { id: 'e', text: 'Rejeição do ouro e busca pelo minimalismo moderno.' }
        ],
        correctOptionId: 'b',
        explanation: 'Aleijadinho notabilizou-se pela genialidade expressiva em pedra-sabão (esteatito) e cedro, com traços inconfundíveis como olhos amendoados e expressividade mística e teatral do Barroco Mineiro.'
      },
      {
        id: 'art-q6',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Cultura Popular',
        context: 'As manifestações culturais brasileiras combinam matrizes indígenas, africanas e europeias em expressões vivas como o Frevo pernambucano, a Roda de Capoeira e o Bumba Meu Boi maranhense.',
        question: 'No âmbito das políticas públicas de preservação do IPHAN, essas expressões dinâmicas transmitidas entre gerações são protegidas como:',
        options: [
          { id: 'a', text: 'Patrimônio Cultural Imaterial, por constituírem saberes, celebrações e formas de expressão vivas.' },
          { id: 'b', text: 'Patrimônio exclusivamente paleontológico sem vínculo com a memória coletiva.' },
          { id: 'c', text: 'Arte erudita acadêmica restrita a galerias particulares.' },
          { id: 'd', text: 'Bens móveis industriais protegidos por patente comercial.' },
          { id: 'e', text: 'Manifestações folclóricas imutáveis proibidas de sofrer adaptações contemporâneas.' }
        ],
        correctOptionId: 'a',
        explanation: 'O Patrimônio Cultural Imaterial engloba práticas, representações, saberes, danças, festas e ofícios que as comunidades reconhecem como parte integrante de sua identidade e memória coletiva.'
      },
      {
        id: 'art-q7',
        difficulty: 'Médio',
        yearSource: 'ENEM / Teatro',
        context: 'Na década de 1960, o teatrólogo brasileiro Augusto Boal desenvolveu o "Teatro do Oprimido", rompendo a barreira tradicional entre palco e plateia.',
        question: 'Qual é a proposta central do conceito de "espect-ator" criado por Augusto Boal?',
        options: [
          { id: 'a', text: 'Manter o público em silêncio absoluto e passivo durante toda a encenação clássica.' },
          { id: 'b', text: 'Convidar o espectador a intervir na cena, assumindo o papel dramático para ensaiar soluções reais contra opressões sociais.' },
          { id: 'c', text: 'Substituir todos os diálogos teatrais por projeções digitais gravadas.' },
          { id: 'd', text: 'Limitar a dramaturgia a comédias palacianas da corte francesa.' },
          { id: 'e', text: 'Impedir qualquer debate político ou comunitário após o espetáculo.' }
        ],
        correctOptionId: 'b',
        explanation: 'No Teatro-Fórum, modalidade emblemática do Teatro do Oprimido, o público deixa de ser espectador passivo e sobe ao palco como "espect-ator" para transformar o conflito dramático e refletir criticamente sobre a realidade.'
      },
      {
        id: 'art-q8',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Arte Contemporânea',
        context: 'Na arte contemporânea brasileira da década de 1960, Hélio Oiticica criou os "Parangolés" — capas, estandartes e tendas coloridas que só ganham forma plena quando vestidas e dançadas pelo corpo do participante.',
        question: 'Qual ruptura estética os "Parangolés" de Hélio Oiticica consolidaram no movimento Neoconcreto?',
        options: [
          { id: 'a', text: 'O retorno rigoroso à pintura acadêmica a óleo sobre cavalete.' },
          { id: 'b', text: 'A superação da contemplação passiva da moldura, integrando obra, corpo, dança, espaço urbano e participação sensorial.' },
          { id: 'c', text: 'A proibição do uso de tecidos e pigmentos puros na escultura.' },
          { id: 'd', text: 'A defesa de que a arte deve permanecer trancada em cofres privados.' },
          { id: 'e', text: 'A cópia fiel de estátuas greco-romanas em mármore branco.' }
        ],
        correctOptionId: 'b',
        explanation: 'Os Parangolés deslocam a arte do objeto estático de museu para a vivência corporal e coletiva (inspirada no samba da Mangueira), transformando o público em coautor sensorial da obra.'
      },
      {
        id: 'art-q9',
        difficulty: 'Médio',
        yearSource: 'ENEM / Música Brasileira',
        context: 'O compositor Heitor Villa-Lobos combinou a estrutura contrapontística de Johann Sebastian Bach com serestas, choros e ritmos populares e indígenas brasileiros na série "Bachianas Brasileiras".',
        question: 'Essa fusão musical realizada por Villa-Lobos exemplifica perfeitamente o projeto estético do:',
        options: [
          { id: 'a', text: 'Nacionalismo Modernista brasileiro, que buscava universalizar a sonoridade popular e regional do país.' },
          { id: 'b', text: 'Canto gregoriano medieval monofônico sem instrumentos.' },
          { id: 'c', text: 'Serialismo dodecafônico austríaco radicalmente avesso à melodia.' },
          { id: 'd', text: 'Movimento grunge norte-americano dos anos 1990.' },
          { id: 'e', text: 'Arcadismo pastoril exclusivamente literário.' }
        ],
        correctOptionId: 'a',
        explanation: 'Participante da Semana de Arte Moderna de 1922, Villa-Lobos projetou a música brasileira internacionalmente ao unir o rigor formal erudito europeu às melodias, timbres e ritmos populares do Brasil.'
      },
      {
        id: 'art-q10',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Linguagens Visuais',
        context: 'Em uma obra do Impressionismo de Claude Monet, como a série da Catedral de Rouen ou os Jardins de Giverny, o artista pintava ao ar livre em diferentes horários do dia.',
        question: 'Qual era o principal foco de investigação plástica dos pintores impressionistas?',
        options: [
          { id: 'a', text: 'O contorno preto espesso e simétrico das figuras mitológicas.' },
          { id: 'b', text: 'A captação instantânea das variações da luz solar, das sombras coloridas e dos efeitos atmosféricos por pinceladas soltas.' },
          { id: 'c', text: 'A ausência total de cores primárias e secundárias.' },
          { id: 'd', text: 'A representação geométrica estritamente bidimensional de máquinas industriais.' },
          { id: 'e', text: 'O uso exclusivo de colagens de jornais e objetos descartados.' }
        ],
        correctOptionId: 'b',
        explanation: 'O Impressionismo revolucionou a pintura do século XIX ao abandonar os ateliês fechados para registrar o instante fugaz da luz natural e da cor vibrando sobre os objetos.'
      }
    ],
    flashcards: [
      {
        id: 'art-fc1',
        topic: 'Modernismo Brasileiro',
        front: 'O que representou a Semana de Arte Moderna de 1922?',
        back: 'Marco de renovação estética que ocorreu em São Paulo, propondo a liberdade formal, a ruptura com o academicismo europeizado e a valorização das raízes e linguagens autênticas do Brasil.',
        hint: 'Theatro Municipal de SP, 1922, Anita Malfatti e Mário de Andrade.'
      },
      {
        id: 'art-fc2',
        topic: 'Vanguardas',
        front: 'Qual a essência do Dadaísmo (Dadá)?',
        back: 'Movimento de contestação radical surgido durante a Primeira Guerra Mundial (1916), pautado pelo absurdo, pela ironia, pelo "ready-made" (como a fonte de Marcel Duchamp) e pela negação do conceito burguês de arte.',
        hint: 'Anti-arte, absurdo, Marcel Duchamp e a quebra da lógica.'
      },
      {
        id: 'art-fc3',
        topic: 'Patrimônio Cultural',
        front: 'Qual a diferença entre Patrimônio Material e Patrimônio Imaterial?',
        back: 'Patrimônio Material: bens tangíveis (edifícios históricos, esculturas, sítios arqueológicos, cidades históricas como Ouro Preto). Patrimônio Imaterial: práticas, saberes, celebrações e tradições vivas (Frevo, Capoeira, Círio de Nazaré, Samba de Roda).',
        hint: 'Material é físico/tangível; Imaterial são saberes e tradições vivas.'
      },
      {
        id: 'art-fc4',
        topic: 'Barroco Brasileiro',
        front: 'Quais são os traços centrais do Barroco Mineiro e da obra de Aleijadinho?',
        back: 'Dramatismo, teatralidade, curvas dinâmicas, profusão decorativa (talha dourada) e uso de materiais nativos como a pedra-sabão e o cedro, florescendo durante o apogeu do ciclo do ouro no século XVIII.',
        hint: 'Pedra-sabão, ciclo do ouro, Congonhas e Ouro Preto.'
      },
      {
        id: 'art-fc5',
        topic: 'Arte Contemporânea',
        front: 'O que foi a Pop Art (Arte Pop)?',
        back: 'Movimento surgido nas décadas de 1950/1960 (Andy Warhol, Roy Lichtenstein) que apropriou símbolos da cultura de massa, publicidade, produtos industriais (latas de sopa Campbell, Coca-Cola) e histórias em quadrinhos para criticar e ironizar o consumismo.',
        hint: 'Andy Warhol, quadrinhos, serigrafia e crítica ao consumo em massa.'
      }
    ]
  },
  {
    id: 'biologia',
    name: 'Biologia',
    category: 'Ciências da Natureza',
    description: 'Estudo da vida, ecossistemas, genética e a rica biodiversidade da Terra.',
    highSchoolFocus: 'Ecologia, Genética Mendeliana, Fisiologia Humana e Biologia Celular.',
    recommendedTopics: ['Ciclos Biogeoquímicos', 'Genética & DNA', 'Teoria da Evolução', 'Fotossíntese', 'Citologia'],
    animal: {
      name: 'Rã-de-vidro',
      species: 'Rã-de-vidro (Hyalinobatrachium)',
      scientificName: 'Centrolenidae sp.',
      habitat: 'Copas e folhagens úmidas sobre riachos na Amazônia',
      funFact: 'Sua pele ventral é tão transparente que é possível ver o coração batendo e os órgãos internos em tempo real!',
      personality: 'Curiosa, detalhista e fascinada por como a vida funciona por dentro.',
      greetingMessage: 'Ribbit! Sou a Rã-de-vidro. Assim como meu corpo transparente revela cada órgão, vamos desvendar todos os segredos das células e da ecologia!',
      tipQuote: 'Na ecologia do ENEM, lembre-se: a energia flui unidirecionalmente, enquanto a matéria é reciclada nos ciclos biogeoquímicos.',
      avatarIcon: 'frog',
      illustrationUrl: raVidroImg,
      themeColor: 'from-emerald-500 to-green-600',
      accentColor: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300',
      bgGradient: 'bg-gradient-to-br from-emerald-50 via-teal-50/40 to-green-100/50 dark:from-emerald-950/20 dark:to-teal-950/20'
    },
    videoLessons: [
      {
        id: 'bio-1',
        title: 'Ecologia no ENEM: Relações Ecológicas e Teias Alimentares',
        duration: '14 min',
        topic: 'Ecologia',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'pgVVimiPR1o',
        summary: [
          'Diferença entre relações harmônicas (mutualismo, comensalismo, protocooperação) e desarmônicas (predação, parasitismo, competição).',
          'Níveis tróficos em teias alimentares: produtores, consumidores e decompositores.',
          'Magnitude dos impactos antrópicos: eutrofização, bioacumulação e perda de habitat.'
        ],
        keyTerms: [
          { term: 'Bioacumulação', definition: 'Acúmulo progressivo de toxinas não biodegradáveis ao longo da cadeia alimentar.' },
          { term: 'Mutualismo', definition: 'Relação harmônica obrigatória interespecífica onde ambas as espécies se beneficiam.' }
        ],
        xpReward: 60
      },
      {
        id: 'bio-2',
        title: '1ª Lei de Mendel Descomplicada: Genética no ENEM',
        duration: '18 min',
        topic: 'Genética',
        channel: 'Prof. Paulo Jubilut',
        youtubeId: '4c3bEWWvA9c',
        summary: [
          '1ª Lei de Mendel (Lei da Segregação dos Fatores): alelos dominantes e recessivos.',
          'Cruzamentos genéticos com o Quadro de Punnett.',
          'Heredogramas e determinação do padrão de herança autossômica vs ligada ao sexo.'
        ],
        keyTerms: [
          { term: 'Genótipo', definition: 'Constituição genética de um indivíduo (ex: AA, Aa, aa).' },
          { term: 'Fenótipo', definition: 'Expressão observável dos genes influenciada pelo meio ambiente.' }
        ],
        xpReward: 75
      },
      {
        id: 'bio-3',
        title: 'Introdução à Biologia Celular: Organelas e Citologia',
        duration: '15 min',
        topic: 'Citologia',
        channel: 'Brasil Escola Oficial',
        youtubeId: '4FsLnuELY_E',
        summary: [
          'Mitocôndrias e a respiração celular aeróbia.',
          'Complexo de Golgi, Retículo Endoplasmático Liso e Rugoso.',
          'Membrana plasmática e transporte ativo vs passivo (osmose e difusão).'
        ],
        keyTerms: [
          { term: 'Mitocôndria', definition: 'Organela responsável pela produção de ATP via fosforilação oxidativa.' },
          { term: 'Osmose', definition: 'Passagem de solvente do meio hipotônico para o hipertônico através de membrana semipermeável.' }
        ],
        xpReward: 65
      }
    ],
    quizzes: [
      {
        id: 'bio-q1',
        question: 'Em uma teia alimentar aquática amazônica, se um poluente químico como o mercúrio for despejado na água, qual nível trófico apresentará a maior concentração desse poluente por quilo de biomassa?',
        context: 'A contaminação por metais pesados afeta gravemente rios e fauna no bioma amazônico.',
        options: [
          { id: 'a', text: 'Fitoplâncton (produtores)' },
          { id: 'b', text: 'Zooplâncton (consumidores primários)' },
          { id: 'c', text: 'Peixes herbívoros (consumidores secundários)' },
          { id: 'd', text: 'Aves e mamíferos carnívoros de topo (consumidores terciários)' }
        ],
        correctOptionId: 'd',
        explanation: 'Devido ao fenômeno da biomagnificação trófica (bioacumulação ao longo da teia), os organismos no topo da cadeia alimentar acumulam a maior concentração de poluentes não biodegradáveis.',
        difficulty: 'Médio',
        yearSource: 'ENEM / Biologia'
      },
      {
        id: 'bio-q2',
        question: 'No cruzamento entre duas plantas heterozigotas (Aa x Aa) para uma característica de dominância completa, qual é a proporção fenotípica esperada na geração descendente?',
        options: [
          { id: 'a', text: '1 : 2 : 1' },
          { id: 'b', text: '3 dominantes : 1 recessivo' },
          { id: 'c', text: '1 dominante : 1 recessivo' },
          { id: 'd', text: '100% dominantes' }
        ],
        correctOptionId: 'b',
        explanation: 'Pelo Quadro de Punnett (AA, Aa, Aa, aa), a proporção genotípica é 1:2:1 (25% AA, 50% Aa, 25% aa), gerando 75% fenótipo dominante e 25% recessivo (proporção 3:1).',
        difficulty: 'Fácil'
      },
      {
        id: 'bio-q3',
        question: 'Qual organela citoplasmática é primordial na produção de proteínas devido à presença de ribossomos aderidos à sua superfície externa?',
        options: [
          { id: 'a', text: 'Retículo Endoplasmático Granular (Rugoso)' },
          { id: 'b', text: 'Retículo Endoplasmático Liso' },
          { id: 'c', text: 'Lisossomo primário' },
          { id: 'd', text: 'Peroxissomo' }
        ],
        correctOptionId: 'a',
        explanation: 'O Retículo Endoplasmático Rugoso (RER) possui ribossomos fixados em suas membranas e atua intensamente na síntese de proteínas destinadas à exportação ou membrana.',
        difficulty: 'Fácil'
      },
      {
        id: 'bio-q4',
        question: 'No ciclo biogeoquímico do nitrogênio, qual grupo de microrganismos é responsável pela conversão do gás nitrogênio atmosférico (N₂) em amônia (NH₃), permitindo a sua incorporação pelas plantas leguminosas?',
        context: 'O nitrogênio é elemento químico essencial para a síntese de proteínas e ácidos nucleicos em todos os seres vivos.',
        options: [
          { id: 'a', text: 'Bactérias fixadoras de nitrogênio (como Rhizobium em nódulos radiculares).' },
          { id: 'b', text: 'Fungos liquênicos decompositores.' },
          { id: 'c', text: 'Bactérias desnitrificantes anaeróbias estritas.' },
          { id: 'd', text: 'Protozoários ciliados de água doce.' },
          { id: 'e', text: 'Vírus bacteriófagos de solo.' }
        ],
        correctOptionId: 'a',
        explanation: 'As bactérias do gênero Rhizobium vivem em simbiose mutualística nas raízes de leguminosas (feijão, soja) e utilizam a enzima nitrogenase para fixar o N₂ atmosférico em amônia (NH₃).',
        difficulty: 'Médio',
        yearSource: 'ENEM / Biologia'
      },
      {
        id: 'bio-q5',
        question: 'Uma pessoa foi picada por uma serpente peçonhenta na mata e levada imediatamente ao pronto-socorro. O tratamento médico adequado para neutralizar rapidamente as toxinas inoculadas é a aplicação de:',
        options: [
          { id: 'a', text: 'Vacina, pois estimula a produção ativa de anticorpos a longo prazo.' },
          { id: 'b', text: 'Soro antiofídico, pois contém anticorpos específicos prontos para neutralização imediata.' },
          { id: 'c', text: 'Antibiótico de largo espectro para inibir a síntese proteica viral.' },
          { id: 'd', text: 'Antitérmico via oral para bloquear a resposta inflamatória dos linfócitos.' },
          { id: 'e', text: 'Antígeno purificado atenuado para induzir memória imune primária.' }
        ],
        correctOptionId: 'b',
        explanation: 'O soro terapêutico confere imunização passiva, contendo anticorpos pré-formados (imunoglobulinas) que atuam de forma imediata na neutralização do veneno em situações de emergência clínica.',
        difficulty: 'Fácil',
        yearSource: 'ENEM 2022'
      },
      {
        id: 'bio-q6',
        difficulty: 'Difícil',
        yearSource: 'ENEM 2024 / Biotecnologia',
        context: 'A tecnologia de edição gênica CRISPR-Cas9 baseia-se em um sistema imunológico adaptativo bacteriano contra infecções por fagos. O sistema utiliza uma fita-guia de RNA (sgRNA) para guiar a enzima nuclease Cas9 até uma sequência de nucleotídeos específica do DNA alvo.',
        question: 'A principal vantagem inovadora do sistema CRISPR-Cas9 em comparação com os métodos anteriores de transgenia clássica é a sua:',
        options: [
          { id: 'a', text: 'Capacidade de editar sítios genômicos específicos com alta precisão e sem necessitar de inserções aleatórias de vetores virais.' },
          { id: 'b', text: 'Impossibilidade de gerar mutações em células eucarióticas animais.' },
          { id: 'c', text: 'Exigência de transcrição reversa contínua para alterar a sequência de aminoácidos.' },
          { id: 'd', text: 'Restrição de uso exclusiva para bactérias gram-negativas do gênero Escherichia.' },
          { id: 'e', text: 'Eliminação completa da necessidade de enzimas nucleases no processo.' }
        ],
        correctOptionId: 'a',
        explanation: 'O CRISPR-Cas9 permite a clivagem direcionada e precisa do DNA em coordenadas moleculares exatas, permitindo corrigir genes defeituosos ou silenciar sequências patogênicas sem o risco de inserção desordenada no genoma.'
      },
      {
        id: 'bio-q7',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Bioenergética',
        context: 'Durante a respiração celular aeróbia, a maior parte do trifosfato de adenosina (ATP) celular é produzida na membrana interna da mitocôndria pelo mecanismo quimiosmótico.',
        question: 'O aceptor final de elétrons e prótons (H⁺) na cadeia respiratória mitocondrial é o:',
        options: [
          { id: 'a', text: 'Gás Oxigênio (O₂), que ao receber elétrons e prótons reduz-se formando água (H₂O).' },
          { id: 'b', text: 'Gás Carbônico (CO₂), liberado no ciclo de Krebs na matriz mitocondrial.' },
          { id: 'c', text: 'Ácido pirúvico (piruvato), convertido em ácido lático na fermentação.' },
          { id: 'd', text: 'NADP⁺ oxidado, que transfere fosfatos para a glicólise anaeróbica.' },
          { id: 'e', text: 'Íon ferroso livre nos citocromos solúveis.' }
        ],
        correctOptionId: 'a',
        explanation: 'Na fosforilação oxidativa mitocondrial, o oxigênio molecular (O₂) atua como aceptor final de elétrons de alta afinidade, combinando-se com prótons H⁺ para formar moléculas de água (H₂O). Na ausência de O₂, a cadeia cessa e as células recorrem à fermentação.'
      },
      {
        id: 'bio-q8',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Ecologia',
        context: 'Na floresta amazônica e no cerrado, orquídeas e bromélias fixam-se sobre os troncos de árvores de grande porte para obter maior luminosidade para a fotossíntese, sem retirar seiva nem causar danos aos tecidos da árvore hospedeira.',
        question: 'Essa relação ecológica interespecífica harmônica é classificada como:',
        options: [
          { id: 'a', text: 'Epifitismo (Comensalismo vegetal), onde o vegetal suporte serve de abrigo sem prejuízo mútuo.' },
          { id: 'b', text: 'Parasitismo obrigatório de floema.' },
          { id: 'c', text: 'Competição interespecífica por seiva bruta.' },
          { id: 'd', text: 'Amensalismo por alelopatia tóxica.' }
        ],
        correctOptionId: 'a',
        explanation: 'O epifitismo é um exemplo de inquilinismo/comensalismo vegetal: a planta epífita usa a árvore apenas como suporte mecânico físico para alcançar luminosidade, mantendo suas raízes aéreas livres sem perfurar o floema nem parasitá-la.'
      },
      {
        id: 'bio-q9',
        difficulty: 'Médio',
        yearSource: 'ENEM / Imunologia',
        context: 'As campanhas de vacinação infantil aplicam antígenos atenuados ou fragmentos virais (ou RNA mensageiro) para estimular o organismo antes do contato com o patógeno selvagem.',
        question: 'Qual é o mecanismo biológico que torna as vacinas uma estratégia de imunização ativa duradoura?',
        options: [
          { id: 'a', text: 'A introdução direta de anticorpos prontos produzidos em cavalos, sem estimular linfócitos.' },
          { id: 'b', text: 'A ativação do sistema imune com produção própria de anticorpos e formação de células de memória imunológica.' },
          { id: 'c', text: 'A destruição imediata de todas as bactérias benéficas da microbiota intestinal.' },
          { id: 'd', text: 'O bloqueio permanente da medula óssea contra a produção de leucócitos.' },
          { id: 'e', text: 'A substituição do DNA das hemácias por proteínas plasmáticas.' }
        ],
        correctOptionId: 'b',
        explanation: 'Diferentemente do soro (imunização passiva com anticorpos prontos para efeito imediato e curto), a vacina promove imunização ativa ao induzir o próprio corpo a gerar anticorpos e linfócitos B e T de memória.'
      },
      {
        id: 'bio-q10',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Fisiologia Vegetal',
        context: 'Na Amazônia, árvores gigantescas conseguem transportar água do solo até as folhas da copa a mais de 40 metros de altura sem possuir um órgão bombeador equivalente a um coração.',
        question: 'Qual teoria fisiológica explica a ascensão contínua da seiva bruta pelos vasos do xilema?',
        options: [
          { id: 'a', text: 'Teoria da Coesão-Tensão-Transpiração (Dixon), impulsionada pela perda de vapor de água pelos estômatos foliares.' },
          { id: 'b', text: 'Bombeamento ativo exclusivo de glicose pelas células mortas do súber.' },
          { id: 'c', text: 'Contração muscular das fibras esclerenquimáticas do caule.' },
          { id: 'd', text: 'Osmose inversa forçada exclusivamente pela luz lunar.' },
          { id: 'e', text: 'Fermentação alcoólica das raízes empurrando oxigênio sólido.' }
        ],
        correctOptionId: 'a',
        explanation: 'A transpiração nas folhas gera uma pressão negativa (tensão/sucção) no topo da planta que puxa uma coluna contínua de água pelo xilema graças às forças de coesão entre as moléculas de água (pontes de hidrogênio) e adesão às paredes dos vasos.'
      }
    ],
    flashcards: [
      {
        id: 'bio-fc1',
        topic: 'Ecologia',
        front: 'O que é Nicho Ecológico e como ele se difere de Habitat?',
        back: 'Habitat é o "endereço" físico onde a espécie vive na natureza. Nicho ecológico é a "profissão", ou seja, o conjunto de funções, hábitos alimentares, reprodução e interações que ela desempenha no ecossistema.',
        hint: 'Pense em "endereço" vs "profissão/função".'
      },
      {
        id: 'bio-fc2',
        topic: 'Citologia',
        front: 'O que ocorre com uma hemácia humana ao ser colocada em meio hipertônico?',
        back: 'A hemácia perde água por osmose para o meio externo mais concentrado e murcha (fenômeno chamado de crenação).',
        hint: 'A água vai de onde tem menos soluto para onde tem mais soluto.'
      },
      {
        id: 'bio-fc3',
        topic: 'Genética',
        front: 'Qual é a diferença entre Alelos Homólogos e Cromossomos Homólogos?',
        back: 'Cromossomos homólogos são pares de cromossomos semelhantes (um paterno e um materno) com os mesmos locos gênicos. Alelos são as variantes de um mesmo gene encontradas nesses locos (ex: A e a).',
        hint: 'Cromossomos são as fitas completas; alelos são as versões de cada gene.'
      },
      {
        id: 'bio-fc4',
        topic: 'Imunologia',
        front: 'Qual a diferença crucial entre Vacina e Soro Terapêutico?',
        back: 'Vacina: Imunização ATIVA, preventiva, introduz antígenos atenuados para estimular o organismo a produzir anticorpos e células de memória a longo prazo. Soro: Imunização PASSIVA, curativa/emergencial, introduz anticorpos já prontos para ação imediata e temporária.',
        hint: 'Vacina = prevenção ativa (antígeno). Soro = cura imediata (anticorpos prontos).'
      },
      {
        id: 'bio-fc5',
        topic: 'Ciclos Biogeoquímicos',
        front: 'Quais são as 3 etapas microbiológicas do Ciclo do Nitrogênio no solo?',
        back: '1. Fixação: N₂ gasoso -> Amônia (NH₃) por bactérias fixadoras.\n2. Nitrificação: Nitrosação (NH₃ -> Nitrito NO₂⁻ por Nitrosomonas) e Nitratação (NO₂⁻ -> Nitrato NO₃⁻ por Nitrobacter).\n3. Desnitrificação: NO₃⁻ -> N₂ gasoso por bactérias desnitrificantes.',
        hint: 'Fixação -> Nitrificação (Nitrosação + Nitratação) -> Desnitrificação.'
      }
    ]
  },
  {
    id: 'espanhol',
    name: 'Espanhol',
    category: 'Linguagens',
    description: 'Desenvolvimento da competência leitora em língua espanhola, falsos amigos, variedades linguísticas e aspectos socioculturais hispânicos.',
    highSchoolFocus: 'Interpretação e Inferência Textual no ENEM, Heterossemânticos (Falsos Amigos), Heterotônicos, Conectores Discursivos e Usos do Artigo Neutro "Lo".',
    recommendedTopics: ['Heterossemânticos (Falsos Amigos)', 'Artigo Neutro "Lo" vs "El"', 'Conectores Discursivos', 'Compreensão de Charges & Cartoons', 'Diversidade Linguística Pan-Hispânica'],
    animal: {
      name: 'Macaco-de-cheiro',
      species: 'Macaco-de-cheiro / Mico-de-cheiro',
      scientificName: 'Saimiri sciureus',
      habitat: 'Copas de árvores e florestas tropicais de várzea e terra firme da Bacia Amazônica',
      funFact: 'Extremamente ágil, curioso e sociável, o Macaco-de-cheiro vive em grandes grupos cooperativos e se comunica por dezenas de vocalizações distintas — um mestre da comunicação e da convivência!',
      personality: 'Ágil, comunicativo, perspicaz, saltitante e atento às sutilezas dos idiomas e da cultura hispano-americana.',
      greetingMessage: '¡Hola, amigo! Sou o Macaco-de-cheiro, o guardião ágil da Língua Espanhola! Vamos saltar juntos pelas páginas, desvendar falsos amigos e gabaritar a prova de espanhol do ENEM!',
      tipQuote: '¡Ojo con los falsos amigos! No ENEM, nunca traduza palavras isoladas de forma literal; utilize sempre o contexto da oração e a intenção comunicativa do texto.',
      avatarIcon: 'message-circle',
      illustrationUrl: macacoImg,
      themeColor: 'from-amber-500 via-yellow-500 to-lime-600',
      accentColor: 'text-amber-800 bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300',
      bgGradient: 'bg-gradient-to-br from-amber-50 via-yellow-50/40 to-lime-100/50 dark:from-amber-950/20 dark:to-lime-950/20'
    },
    videoLessons: [
      {
        id: 'esp-1',
        title: 'Espanhol no ENEM: Estratégias de Interpretação e Falsos Cognatos',
        duration: '17 min',
        topic: 'Compreensão Leitora & Vocabulário',
        channel: 'Curso Enem Gratuito',
        youtubeId: 'sxzZphiJkug',
        summary: [
          'Estratégias de leitura dinâmica (skimming e scanning) aplicadas aos textos em espanhol do ENEM.',
          'Heterossemânticos cruciais: "embarazada" (grávida), "apellido" (sobrenome), "exquisito" (delicioso), "rato" (momento), "vaso" (copo).',
          'Identificação da tipologia textual: crônicas, charges políticas, poemas e editoriais latino-americanos.'
        ],
        keyTerms: [
          { term: 'Heterossemântico', definition: 'Palavras com grafia ou pronúncia semelhantes entre espanhol e português, mas com significados completamente distintos (falsos amigos).' },
          { term: 'Inferência Contextual', definition: 'Dedução do sentido de termos desconhecidos com base nas pistas gramaticais e semânticas do texto.' }
        ],
        xpReward: 80
      },
      {
        id: 'esp-2',
        title: 'Artigo Neutro "Lo", Conectores e Pronomes no ENEM',
        duration: '20 min',
        topic: 'Gramática Aplicada ao Texto',
        channel: 'Curso Enem Gratuito',
        youtubeId: '-MOuNhxWX5M',
        summary: [
          'O uso exclusivo do artigo neutro "lo" para substantivar adjetivos e advérbios (nunca antes de substantivos: usa-se "el").',
          'Conectores e marcadores discursivos essenciais: "sin embargo" (no entanto), "aunque" (embora), "además" (além disso), "por lo tanto" (portanto).',
          'Heterotônicos (oxítonas e paroxítonas diferentes) e heterogenéricos (gêneros gramaticais invertidos).'
        ],
        keyTerms: [
          { term: 'Artigo Neutro "Lo"', definition: 'Elemento gramatical invariável em espanhol usado para substantivar qualidades ou ideias abstratas (ex: "lo importante", "lo melhor").' },
          { term: 'Heterogenérico', definition: 'Vocábulo que muda de gênero masculino/feminino entre o espanhol e o português (ex: "la sal", "el viaje", "la sangre").' }
        ],
        xpReward: 85
      }
    ],
    quizzes: [
      {
        id: 'esp-q1',
        difficulty: 'Fácil',
        yearSource: 'ENEM 2022',
        context: 'Em uma tirinha argentina, um personagem afirma: "Tuvimos un almuerzo muy exquisito en casa de mis abuelos y pasamos un rato muy divertido".',
        question: 'No contexto da frase, os termos sublinhados "exquisito" e "rato" significam, respectivamente:',
        options: [
          { id: 'a', text: 'Estranho e animal roedor.' },
          { id: 'b', text: 'Delicioso/saboroso e pequeno intervalo de tempo.' },
          { id: 'c', text: 'Caro e momento entediante.' },
          { id: 'd', text: 'Simples e período prolongado.' },
          { id: 'e', text: 'Exótico e instante perigoso.' }
        ],
        correctOptionId: 'b',
        explanation: 'Em espanhol, "exquisito" significa primoroso, refinado ou delicioso ao paladar (não esquisito). "Rato" refere-se a um curto espaço de tempo ("un rato" = um tempinho, um momento).'
      },
      {
        id: 'esp-q2',
        difficulty: 'Médio',
        yearSource: 'ENEM 2021',
        context: 'Considere o fragmento de um ensaio hispânico: "El proyecto presentaba dificultades operativas; sin embargo, el equipo logró alcanzar las metas antes del plazo previsto".',
        question: 'O conector discursivo "sin embargo" introduz no texto uma relação semântica de:',
        options: [
          { id: 'a', text: 'Conclusão e encerramento.' },
          { id: 'b', text: 'Causa e justificativa.' },
          { id: 'c', text: 'Adversidade, oposição ou ressalva.' },
          { id: 'd', text: 'Adição de ideias acumuladas.' },
          { id: 'e', text: 'Finalidade e objetivo.' }
        ],
        correctOptionId: 'c',
        explanation: 'A conjunção adversativa "sin embargo" equivale a "no entanto", "porém" ou "todavia" em português, expressando oposição ou contraposição à oração anterior.'
      },
      {
        id: 'esp-q3',
        difficulty: 'Médio',
        yearSource: 'ENEM 2020',
        context: 'Na oração: "Lo bueno de estudiar con dedicación es que los resultados aparecen naturalmente", a palavra "Lo" é empregada corretamente como:',
        question: 'Assinale a justificativa gramatical adequada para o uso de "Lo":',
        options: [
          { id: 'a', text: 'Artigo definido masculino antes de substantivo masculino.' },
          { id: 'b', text: 'Artigo neutro com função de substantivar o adjetivo "bueno".' },
          { id: 'c', text: 'Pronome pessoal do caso reto em função de sujeito.' },
          { id: 'd', text: 'Preposição com valor de instrumento.' },
          { id: 'e', text: 'Advérbio de intensidade que modifica o verbo ser.' }
        ],
        correctOptionId: 'b',
        explanation: 'O artigo neutro "lo" tem a função de neutralizar e substantivar adjetivos (como em "lo bueno" = "a coisa boa" ou "o que é bom"), nunca acompanhando substantivos diretamente.'
      },
      {
        id: 'esp-q4',
        difficulty: 'Médio',
        yearSource: 'ENEM 2023',
        context: 'Na língua espanhola, certas palavras compartilham a mesma raiz do português, mas possuem a tonicidade (sílaba forte) deslocada, sendo classificadas como heterotônicas.',
        question: 'Assinale a alternativa que contém exclusivamente palavras com pronúncia heterotônica em relação ao português:',
        options: [
          { id: 'a', text: 'Alguien (paroxítona), límite (proparoxítona) e policía (paroxítona).' },
          { id: 'b', text: 'Café, sofá e computador.' },
          { id: 'c', text: 'Sol, mar e terra.' },
          { id: 'd', text: 'Brasil, Argentina e Chile.' },
          { id: 'e', text: 'Casa, mesa e cadeira.' }
        ],
        correctOptionId: 'a',
        explanation: 'Em espanhol: "al-guien" é paroxítona (em pt: al-guém é oxítona), "lí-mi-te" ou "li-mi-te", e "po-li-cí-a" tem acentuação própria no "i", alterando o padrão rítmico em relação ao português.'
      },
      {
        id: 'esp-q5',
        difficulty: 'Difícil',
        yearSource: 'ENEM 2022',
        context: 'Em uma passagem de conto: "¿Le entregaste la carta a tu padre? — Sí, ya se la entregué ayer por la tarde".',
        question: 'Na resposta "ya se la entregué", as formas pronominais "se" e "la" substituem respectivamente:',
        options: [
          { id: 'a', text: '"A tu padre" (objeto indireto) e "la carta" (objeto direto).' },
          { id: 'b', text: '"La carta" (objeto indireto) e "tu padre" (objeto direto).' },
          { id: 'c', text: 'Ambos substituem o sujeito da oração.' },
          { id: 'd', text: '"Ayer" (tempo) e "la tarde" (modo).' },
          { id: 'e', text: '"Por la tarde" e "el correo".' }
        ],
        correctOptionId: 'a',
        explanation: 'Em espanhol, quando o pronome de objeto indireto de 3ª pessoa (le/les) precede os pronomes de objeto direto (lo/la/los/las), ele se converte em "se" por eufonia. Assim, "se" = a tu padre (OI) e "la" = la carta (OD).'
      },
      {
        id: 'esp-q6',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Falsos Cognatos',
        context: 'En una receta médica encontrada en Buenos Aires se lee: "No ingerir alimentos con mucha grasa antes del examen de sangre".',
        question: 'No contexto da frase em espanhol, o termo "grasa" significa:',
        options: [
          { id: 'a', text: 'Gordura / alimento gorduroso.' },
          { id: 'b', text: 'Graça / piada divertida.' },
          { id: 'c', text: 'Grátis / sem custo financeiro.' },
          { id: 'd', text: 'Grama / folhagem verde.' },
          { id: 'e', text: 'Graxa de sapato industrial.' }
        ],
        correctOptionId: 'a',
        explanation: '"Grasa" em espanhol significa gordura (em alimentos, por exemplo). "Graça" em português traduz-se como "gracia" ou "chiste" conforme o sentido.'
      },
      {
        id: 'esp-q7',
        difficulty: 'Médio',
        yearSource: 'ENEM / Heterogenéricos',
        context: 'Observe os substantivos masculinos em espanhol que geram confusão para falantes de português: "el puente", "el árbol", "el viaje" e "el color".',
        question: 'Em qual alternativa TODOS os substantivos em espanhol estão empregados com o artigo definido gramaticalmente CORRETO?',
        options: [
          { id: 'a', text: 'La leche, la nariz, el sal e la árbol.' },
          { id: 'b', text: 'La leche, la nariz, la sal e el árbol.' },
          { id: 'c', text: 'El leche, el nariz, el sal e la árbol.' },
          { id: 'd', text: 'El color, el viaje, el puente e la costumbre.' },
          { id: 'e', text: 'La puente, la color, el miel e el sangre.' }
        ],
        correctOptionId: 'b',
        explanation: 'Os heterogenéricos mudam de gênero entre português e espanhol: em espanhol diz-se "la leche" (feminino), "la nariz" (feminino), "la sal" (feminino) e "el árbol" (masculino). Já "costumbre" também é feminino ("la costumbre"), mas "puente", "color" e "viaje" são masculinos.'
      },
      {
        id: 'esp-q8',
        difficulty: 'Médio',
        yearSource: 'ENEM / Conectivos',
        context: 'Leia o fragmento jornalístico: "Sin embargo, las medidas de reforestación aún resultan insuficientes para frenar la pérdida de hábitat."',
        question: 'A locução conjuntiva "Sin embargo" pode ser traduzida para o português, sem alterar o sentido, por:',
        options: [
          { id: 'a', text: 'Portanto / logo.' },
          { id: 'b', text: 'No entanto / contudo / todavia.' },
          { id: 'c', text: 'Sem dúvida / certamente.' },
          { id: 'd', text: 'Além disso / ademais.' },
          { id: 'e', text: 'Porque / visto que.' }
        ],
        correctOptionId: 'b',
        explanation: '"Sin embargo" é um falso amigo clássico para brasileiros: não significa "sem embargo" no sentido jurídico comum, mas sim uma conjunção adversativa equivalente a "no entanto", "porém", "contudo" ou "todavia".'
      },
      {
        id: 'esp-q9',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Expressões Idiomáticas',
        context: 'Em uma tirinha de Mafalda (Quino), um personagem comenta preocupado: "Si seguimos gastando el agua sin conciencia, pronto nos va a costar un ojo de la cara y estaremos en apuros".',
        question: 'A expressão idiomática "costar un ojo de la cara" significa que algo:',
        options: [
          { id: 'a', text: 'Exige cirurgia oftalmológica imediata.' },
          { id: 'b', text: 'Será extremamente caro / terá um custo elevadíssimo.' },
          { id: 'c', text: 'Será distribuído gratuitamente à população.' },
          { id: 'd', text: 'Passará despercebido pelos olhares críticos.' },
          { id: 'e', text: 'Será resolvido em poucos segundos sem esforço.' }
        ],
        correctOptionId: 'b',
        explanation: 'Em espanhol, "costar un ojo de la cara" equivale à expressão popular brasileira "custar os olhos da cara", indicando um preço ou sacrifício muito alto.'
      },
      {
        id: 'esp-q10',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Interpretação',
        context: 'En el cartel escolar dice: "Cierra el grifo mientras te cepillas los dientes. Cada gota cuenta para proteger los ríos."',
        question: 'De acordo com o cartaz de conscientização ambiental, qual ação prática o estudante deve adotar?',
        options: [
          { id: 'a', text: 'Abrir todas as janelas da escola durante a escovação.' },
          { id: 'b', text: 'Fechar a torneira enquanto escova os dentes, pois cada gota importa.' },
          { id: 'c', text: 'Comprar uma escova de dentes elétrica importada.' },
          { id: 'd', text: 'Evitar escovar os dentes em dias de chuva intensa.' },
          { id: 'e', text: 'Contar quantos litros de sabão há no banheiro.' }
        ],
        correctOptionId: 'b',
        explanation: '"El grifo" significa a torneira; "mientras te cepillas los dientes" significa enquanto você escova os dentes; e "cada gota cuenta" significa cada gota conta/importa.'
      }
    ],
    flashcards: [
      {
        id: 'esp-fc1',
        topic: 'Heterossemânticos',
        front: 'O que significam "embarazada", "apellido" e "taller" em espanhol?',
        back: 'Embarazada = grávida (não embaraçada). Apellido = sobrenome (não apelido/sobrenome vulgar). Taller = oficina ou ateliê (não talher).',
        hint: 'Falsos cognatos clássicos do espanhol.'
      },
      {
        id: 'esp-fc2',
        topic: 'Gramática',
        front: 'Quando usar "EL" e quando usar "LO"?',
        back: '"EL" é artigo definido masculino usado exclusivamente diante de substantivos masculinos (el libro, el día). "LO" é artigo neutro usado diante de adjetivos, particípios ou advérbios para criar conceitos abstratos (lo difícil, lo mejor). "Lo" NUNCA acompanha substantivos.',
        hint: 'El + substantivo; Lo + adjetivo/advérbio.'
      },
      {
        id: 'esp-fc3',
        topic: 'Heterogenéricos',
        front: 'O que são termos Heterogenéricos? Dê exemplos.',
        back: 'São palavras que possuem a mesma raiz e significado no espanhol e português, mas com gêneros gramaticais opostos. Ex: no espanhol são femininas "la costumbre", "la leche", "la nariz", "la señal", enquanto são masculinas "el árbol", "el viaje", "el color", "el dolor".',
        hint: 'Palavras com terminação -umbre e -aje invertem de gênero.'
      },
      {
        id: 'esp-fc4',
        topic: 'Heterotônicos',
        front: 'O que são Heterotônicos no espanhol? Dê exemplos.',
        back: 'Palavras que têm a mesma grafia ou significado, mas com a sílaba tônica (acentuação) em posições diferentes do português. Ex: al-guien (paroxítona em espanhol / oxítona em português), he-mo-rra-gia (oxítona no final em pt / paroxítona em es), a-ca-de-mia (paroxítona no "de" em es).',
        hint: 'Mudança da sílaba tônica entre os dois idiomas.'
      },
      {
        id: 'esp-fc5',
        topic: 'Acentuação',
        front: 'O que é a Tilde Diacrítica no espanhol?',
        back: 'É o acento gráfico utilizado para diferenciar palavras monossilábicas homônimas com classes gramaticais diferentes. Ex: él (ele - pronome) vs el (o - artigo); tú (tu - pronome) vs tu (teu - possessivo); sí (sim - afirmação) vs si (se - conjunção condicional); té (chá - substantivo) vs te (te - pronome).',
        hint: 'Diferencia pares como él/el, tú/tu, mí/mi, sí/si.'
      }
    ]
  },
  {
    id: 'filosofia',
    name: 'Filosofia',
    category: 'Ciências Humanas',
    description: 'Investigação do pensamento crítico, ética, epistemologia, política e existência humana.',
    highSchoolFocus: 'Filosofia Antiga (Sócrates, Platão, Aristóteles), Racionalismo vs Empirismo, Iluminismo e Ética Contemporânea.',
    recommendedTopics: ['Mito da Caverna', 'Ética das Virtudes', 'Contratualismo', 'Imperativo Categórico', 'Existencialismo'],
    animal: {
      name: 'Borboleta Morpho',
      species: 'Borboleta Morpho Azul',
      scientificName: 'Morpho peleides',
      habitat: 'Clareiras e margens de rios na copa da floresta tropical',
      funFact: 'O azul metálico deslumbrante de suas asas não vem de pigmento químico, mas de microestruturas que refratam a luz — uma verdadeira ilusão e reflexão óptica!',
      personality: 'Reflexiva, contemplativa e defensora de que a dúvida é o início da sabedoria.',
      greetingMessage: 'Saudações, pensador! Sou a Borboleta Morpho. Assim como a cor das minhas asas nos ensina que aparências podem enganar, convido você a questionar o mundo e buscar a verdade!',
      tipQuote: 'Sócrates dizia que "uma vida sem reflexão não vale a pena ser vivida". No ENEM, identifique sempre a tese central do filósofo.',
      avatarIcon: 'sparkles',
      illustrationUrl: borboletaMorphoImg,
      themeColor: 'from-sky-500 to-blue-600',
      accentColor: 'text-sky-700 bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300',
      bgGradient: 'bg-gradient-to-br from-sky-50 via-blue-50/40 to-indigo-100/50 dark:from-sky-950/20 dark:to-blue-950/20'
    },
    videoLessons: [
      {
        id: 'fil-1',
        title: 'Sócrates, Platão e o Mito da Caverna no ENEM',
        duration: '16 min',
        topic: 'Filosofia Antiga',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'NR7DkeQ6MUo',
        summary: [
          'O método socrático: ironia (desconstrução) e maiêutica (parto das ideias).',
          'O Mundo Sensível (aparências e sombras) versus o Mundo Inteligível (as ideias perfeitas).',
          'A alegoria da caverna como libertação pelo conhecimento filosófico.'
        ],
        keyTerms: [
          { term: 'Maiêutica', definition: 'Método de perguntas sucessivas que auxilia o interlocutor a dar à luz ao próprio conhecimento.' },
          { term: 'Mundo das Ideias', definition: 'Plano metafísico platônico onde residem as formas perfeitas e imutáveis da verdade.' }
        ],
        xpReward: 65
      },
      {
        id: 'fil-2',
        title: 'Contratualismo: Thomas Hobbes, John Locke e Jean-Jacques Rousseau',
        duration: '19 min',
        topic: 'Filosofia Política',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'G8whzW4cGgw',
        summary: [
          'Estado de Natureza: o "homem lobo do homem" (Hobbes) vs a "tábula rasa e direitos naturais" (Locke) vs o "bom selvagem" (Rousseau).',
          'O Contrato Social como legitimação da soberania estatal.',
          'Divisão entre absolutismo, liberalismo político e vontade geral.'
        ],
        keyTerms: [
          { term: 'Contrato Social', definition: 'Pacto hipotético onde indivíduos abrem mão de parte da liberdade natural em troca de segurança e ordem jurídica.' },
          { term: 'Jusnaturalismo', definition: 'Doutrina dos direitos naturais inerentes ao ser humano (vida, liberdade e propriedade).' }
        ],
        xpReward: 80
      }
    ],
    quizzes: [
      {
        id: 'fil-q1',
        question: 'Segundo a alegoria do Mito da Caverna de Platão, o que as correntes e as sombras projetadas na parede representam para os prisioneiros?',
        context: 'A República, Livro VII - Platão.',
        options: [
          { id: 'a', text: 'O conhecimento científico empírico rigoroso' },
          { id: 'b', text: 'A ignorância e a ilusão provocada pelo mundo sensível não refletido' },
          { id: 'c', text: 'O poder absoluto das leis da natureza divina' },
          { id: 'd', text: 'A liberdade plena da alma racional' }
        ],
        correctOptionId: 'b',
        explanation: 'Para Platão, as sombras são apenas cópias imperfeitas da realidade; representam a "doxa" (opinião/ilusão dos sentidos), enquanto a luz exterior representa a "episteme" (conhecimento verdadeiro das Ideias).',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Filosofia'
      },
      {
        id: 'fil-q2',
        question: 'O Imperativo Categórico de Immanuel Kant pode ser sintetizado na máxima de que o ser humano deve:',
        options: [
          { id: 'a', text: 'Buscar o prazer e evitar o sofrimento acima de tudo' },
          { id: 'b', text: 'Agir de tal modo que a máxima de sua conduta possa se tornar uma lei universal' },
          { id: 'c', text: 'Obedecer às leis civis apenas quando for conveniente' },
          { id: 'd', text: 'Tratar as outras pessoas como meios para atingir seus próprios fins' }
        ],
        correctOptionId: 'b',
        explanation: 'Kant formula a ética deontológica: aja apenas segundo a máxima pela qual você possa ao mesmo tempo querer que se torne uma lei universal, e trate a humanidade sempre como fim, nunca meramente como meio.',
        difficulty: 'Médio'
      },
      {
        id: 'fil-q3',
        difficulty: 'Médio',
        yearSource: 'ENEM 2023',
        context: 'Na obra "Ética a Nicômaco", Aristóteles concebe a virtude moral (areté) como a capacidade humana de encontrar a justa medida entre dois extremos viciosos.',
        question: 'Segundo o pensamento aristotélico, a coragem é a justa medida (mesótes) equilibrada entre quais dois vícios?',
        options: [
          { id: 'a', text: 'A avareza e a prodigalidade.' },
          { id: 'b', text: 'A covardia (falta) e a temeridade/imprudência (excesso).' },
          { id: 'c', text: 'A preguiça e a ambição desmedida.' },
          { id: 'd', text: 'A modéstia e a soberba extrema.' },
          { id: 'e', text: 'A inveja e o ódio desmedido.' }
        ],
        correctOptionId: 'b',
        explanation: 'Para Aristóteles, a virtude é o caminho do meio (mesótes): a coragem está exatamente equilibrada entre o vício da falta (covardia, que teme tudo) e o vício do excesso (temeridade, que se arrisca tolamente sem prudência).'
      },
      {
        id: 'fil-q4',
        difficulty: 'Difícil',
        yearSource: 'ENEM 2022',
        context: '"O homem está condenado a ser livre; porque, uma vez lançado no mundo, ele é responsável por tudo quanto fizer." — Jean-Paul Sartre.',
        question: 'A afirmação de Sartre expressa o princípio existencialista de que:',
        options: [
          { id: 'a', text: 'A essência humana é predeterminada biologicamente ou por um desígnio divino.' },
          { id: 'b', text: 'A existência precede a essência, cabendo a cada indivíduo construir seu projeto de vida e arcar com as consequências.' },
          { id: 'c', text: 'A sociedade determina de forma irrevogável o destino e o caráter moral dos homens.' },
          { id: 'd', text: 'A liberdade é uma ilusão cognitiva gerada pela linguagem.' },
          { id: 'e', text: 'O ser humano não possui responsabilidade ética sobre suas escolhas cotidianas.' }
        ],
        correctOptionId: 'b',
        explanation: 'No Existencialismo ateu de Sartre, "a existência precede a essência": o ser humano primeiro existe, atua no mundo e define livremente quem é por meio de seus atos, carregando angústia e total responsabilidade.'
      },
      {
        id: 'fil-q5',
        difficulty: 'Fácil',
        yearSource: 'ENEM 2020',
        context: 'René Descartes, em suas "Meditações Metafísicas", empregou a dúvida metódica radical para alcançar uma certeza indubitável que servisse de alicerce para toda a ciência.',
        question: 'Qual foi a primeira verdade incontestável e clara alcançada por Descartes ao duvidar de tudo?',
        options: [
          { id: 'a', text: 'A confiabilidade absoluta dos cinco sentidos corporais.' },
          { id: 'b', text: 'O princípio "Penso, logo existo" (Cogito, ergo sum), pois para duvidar é preciso pensar, e para pensar é preciso existir.' },
          { id: 'c', text: 'A existência física imediata do mundo material ao redor.' },
          { id: 'd', text: 'A perfeição moral inquestionável das autoridades eclesiásticas.' },
          { id: 'e', text: 'A imutabilidade perpétua das leis da física newtoniana.' }
        ],
        correctOptionId: 'b',
        explanation: 'Mesmo que um "gênio maligno" engane todos os sentidos, para ser enganado ou ter a dúvida, o sujeito precisa necessariamente pensar. Assim, "Cogito, ergo sum" (Penso, logo existo) é a primeira certeza racional inabalável.'
      },
      {
        id: 'fil-q6',
        difficulty: 'Médio',
        yearSource: 'ENEM / Iluminismo',
        context: 'Immanuel Kant define o Esclarecimento (Aufklärung) como "a saída do homem de sua menoridade, pela qual ele próprio é responsável", sintetizada no lema "Sapere aude!" (Ousa saber!).',
        question: 'Para Kant, o que caracteriza a "menoridade" da qual o ser humano precisa se emancipar?',
        options: [
          { id: 'a', text: 'A condição biológica de ter menos de dezoito anos de idade civil.' },
          { id: 'b', text: 'A incapacidade de fazer uso do próprio entendimento sem a tutela ou direção de outro indivíduo, por preguiça ou covardia.' },
          { id: 'c', text: 'A obediência às leis racionais universais formuladas pelo próprio sujeito moral.' },
          { id: 'd', text: 'O estudo aprofundado das ciências naturais experimentais.' },
          { id: 'e', text: 'A recusa de aceitar dogmas não verificados pela razão pública.' }
        ],
        correctOptionId: 'b',
        explanation: 'Segundo Kant, a menoridade intelectual não decorre de falta de inteligência, mas da falta de coragem de pensar por conta própria com autonomia racional, preferindo seguir tutores externos.'
      },
      {
        id: 'fil-q7',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Filosofia Antiga',
        context: 'Sócrates percorria as ruas de Atenas dialogando com cidadãos que se julgavam sábios e declarava: "Só sei que nada sei".',
        question: 'Como se denomina o método socrático dividido em ironia (desconstrução da falsa certeza) e maiêutica ("parto das ideias")?',
        options: [
          { id: 'a', text: 'Dogmatismo escolástico.' },
          { id: 'b', text: 'Dialética ou método maiêutico socrático.' },
          { id: 'c', text: 'Empirismo indutivo baconiano.' },
          { id: 'd', text: 'Positivismo comteano.' },
          { id: 'e', text: 'Determinismo histórico absoluto.' }
        ],
        correctOptionId: 'b',
        explanation: 'Através do diálogo (dialética), Sócrates usava a ironia para levar o interlocutor a reconhecer sua ignorância (catarse) e, em seguida, a maiêutica para ajudá-lo a "dar à luz" conceitos verdadeiros.'
      },
      {
        id: 'fil-q8',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Ética Contemporânea',
        context: 'Ao cobrir o julgamento de Adolf Eichmann em Jerusalém, a filósofa Hannah Arendt formulou o conceito de "banalidade do mal".',
        question: 'O que Hannah Arendt concluiu ao observar que Eichmann não parecia um monstro demoníaco, mas um burocrata comum e obediente?',
        options: [
          { id: 'a', text: 'Que crimes terríveis podem ser praticados por indivíduos comuns que abrem mão do pensamento reflexivo e do juízo moral próprio para obedecer mecanicamente a ordens.' },
          { id: 'b', text: 'Que o mal absoluto é fruto exclusivo de patologias genéticas raras e inevitáveis.' },
          { id: 'c', text: 'Que burocratas não possuem nenhuma responsabilidade jurídica pelos atos do Estado.' },
          { id: 'd', text: 'Que os regimes totalitários incentivam o debate ético plural entre os cidadãos.' },
          { id: 'e', text: 'Que apenas pessoas com profunda formação filosófica cometem injustiças.' }
        ],
        correctOptionId: 'a',
        explanation: 'Para Arendt, a banalidade do mal ocorre quando o sujeito abdica da faculdade crítica de julgar o bem e o mal, transformando a participação em atrocidades em mera rotina administrativa e obediência cega.'
      },
      {
        id: 'fil-q9',
        difficulty: 'Médio',
        yearSource: 'ENEM / Filosofia Política',
        context: 'Para Thomas Hobbes (Leviatã), no "estado de natureza" sem governo comum, todos têm direito a tudo e reina uma guerra de todos contra todos ("o homem é o lobo do homem").',
        question: 'Segundo Hobbes, qual é a finalidade primordial do Contrato Social que institui o Estado soberano?',
        options: [
          { id: 'a', text: 'Abolir toda autoridade política e garantir liberdade ilimitada sem leis.' },
          { id: 'b', text: 'Assegurar a paz, a segurança e a preservação da vida dos cidadãos por meio de um poder soberano forte.' },
          { id: 'c', text: 'Garantir o direito natural irrestrito à vingança privada.' },
          { id: 'd', text: 'Implantar uma democracia direta sem delegação de poder.' },
          { id: 'e', text: 'Reduzir a propriedade privada ao comunalismo primitivo.' }
        ],
        correctOptionId: 'b',
        explanation: 'Os indivíduos transferem parte de sua liberdade natural ao soberano (Leviatã) em troca de proteção mútua, ordem civil e sobrevivência, superando a insegurança do estado de natureza.'
      },
      {
        id: 'fil-q10',
        difficulty: 'Médio',
        yearSource: 'ENEM / Epistemologia',
        context: 'O filósofo John Locke sustentava que a mente humana ao nascer é como uma "tábula rasa" (folha em branco) sem ideias inatas.',
        question: 'Em oposição ao racionalismo cartesiano, essa tese de Locke fundamenta qual corrente filosófica sobre a origem do conhecimento?',
        options: [
          { id: 'a', text: 'O Inatismo platônico.' },
          { id: 'b', text: 'O Empirismo britânico, que afirma que todo conhecimento deriva da experiência sensível e da reflexão sobre ela.' },
          { id: 'c', text: 'O Ceticismo pirrônico radical que nega qualquer saber.' },
          { id: 'd', text: 'O Idealismo metafísico absoluto.' },
          { id: 'e', text: 'A Escolástica medieval teocêntrica.' }
        ],
        correctOptionId: 'b',
        explanation: 'Para o Empirismo de Locke (e posteriormente David Hume), não existem ideias inatas: todas as noções gravadas na mente têm origem nas impressões dos sentidos (sensação) e na elaboração interna (reflexão).'
      }
    ],
    flashcards: [
      {
        id: 'fil-fc1',
        topic: 'Ética',
        front: 'Qual é o princípio ético do Utilitarismo proposto por Jeremy Bentham e John Stuart Mill?',
        back: 'O princípio da maior felicidade: uma ação é moralmente correta quando promove o máximo de bem-estar ou prazer e o mínimo de sofrimento para o maior número possível de pessoas.',
        hint: 'Maior bem para o maior número de pessoas.'
      },
      {
        id: 'fil-fc2',
        topic: 'Epistemologia',
        front: 'Qual é o confronto central entre Racionalismo (Descartes) e Empirismo (Locke/Hume)?',
        back: 'O Racionalismo defende que o conhecimento genuíno provém da razão inata e dedutiva. O Empirismo afirma que a mente é uma "tábula rasa" e todo conhecimento tem origem na experiência sensorial.',
        hint: 'Razão inata vs Experiência sensorial dos sentidos.'
      },
      {
        id: 'fil-fc3',
        topic: 'Ética Antiga',
        front: 'O que é a "Justa Medida" (Mesótes) na ética aristotélica?',
        back: 'É o princípio de que a virtude moral reside no equilíbrio prudente entre dois extremos viciosos opostos: o vício do excesso e o vício da falta (exemplo: a coragem situa-se entre a covardia e a temeridade).',
        hint: 'Caminho do meio entre o excesso e a falta.'
      },
      {
        id: 'fil-fc4',
        topic: 'Existencialismo',
        front: 'O que significa a tese sartreana de que "a existência precede a essência"?',
        back: 'Significa que o ser humano não nasce com uma natureza ou destino pré-determinado. Ele primeiro existe no mundo, faz escolhas em total liberdade e, por meio de suas ações, constrói a sua própria essência e identidade.',
        hint: 'Primeiro existimos, depois nos definimos por nossas escolhas.'
      },
      {
        id: 'fil-fc5',
        topic: 'Iluminismo',
        front: 'Como Kant define o Esclarecimento (Aufklärung) em seu célebre ensaio?',
        back: 'O Esclarecimento é a saída do ser humano de sua menoridade intelectual da qual ele próprio é culpado. A menoridade é a incapacidade de pensar por si mesmo sem a tutela de outrem. Seu lema é "Sapere Aude!" (Ouse saber / pensar com autonomia!).',
        hint: 'Sapere Aude: ousadia de pensar por si próprio.'
      }
    ]
  },
  {
    id: 'fisica',
    name: 'Física',
    category: 'Ciências da Natureza',
    description: 'Compreensão das leis do universo, mecânica, energia, ondas, óptica e eletricidade.',
    highSchoolFocus: 'Cinemática, Leis de Newton, Conservação de Energia, Termodinâmica, Ondulatória e Circuitos Elétricos.',
    recommendedTopics: ['Trabalho & Energia', 'Leis de Newton', 'Refração e Reflexão', 'Efeito Doppler', 'Lei de Ohm & Potência'],
    animal: {
      name: 'Queixada',
      species: 'Queixada da Floresta',
      scientificName: 'Tayassu pecari',
      habitat: 'Bandos volumosos que percorrem longas distâncias no chão da floresta',
      funFact: 'Em bandos compactos de até 300 indivíduos, as queixadas exercem enorme força mecânica e impacto cinético para desbravar a mata fechada!',
      personality: 'Enérgico, focado na conservação da força e apaixonado pelo dinamismo do movimento.',
      greetingMessage: 'Oinc! Eu sou o Queixada. Comigo você vai entender cada vetor, cálculo de energia cinética e impulso como se estivesse marchando velozmente pela floresta!',
      tipQuote: 'Lembre-se sempre de converter as unidades no Sistema Internacional (SI): metros, segundos, quilogramas e Joules!',
      avatarIcon: 'shield',
      illustrationUrl: queixadaImg,
      themeColor: 'from-amber-600 to-orange-700',
      accentColor: 'text-amber-800 bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300',
      bgGradient: 'bg-gradient-to-br from-amber-50 via-orange-50/40 to-yellow-100/50 dark:from-amber-950/20 dark:to-orange-950/20'
    },
    videoLessons: [
      {
        id: 'fis-1',
        title: 'As 3 Leis de Newton e Dinâmica no ENEM',
        duration: '17 min',
        topic: 'Mecânica',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'V8C6M5nsAvQ',
        summary: [
          '1ª Lei (Inércia): Todo corpo permanece em repouso ou MRU até que uma força resultante atue sobre ele.',
          '2ª Lei (Princípio Fundamental da Dinâmica): F_res = m * a.',
          '3ª Lei (Ação e Reação): Forças sempre surgem em pares em corpos diferentes.'
        ],
        keyTerms: [
          { term: 'Inércia', definition: 'Tendência natural da matéria de resistir a variações no seu estado de movimento.' },
          { term: 'Força Normal', definition: 'Força de contato perpendicular exercida pela superfície sobre um corpo.' }
        ],
        xpReward: 70
      },
      {
        id: 'fis-2',
        title: 'Eletrodinâmica no ENEM: Resistência Elétrica e as Leis de Ohm',
        duration: '21 min',
        topic: 'Eletrodinâmica',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'u0YV6R2d0Jw',
        summary: [
          'Tensão (U), Corrente (i) e Resistência (R): Fórmula U = R * i.',
          'Potência Elétrica (P = U * i = R * i²) e cálculo de consumo de energia (kWh).',
          'Associação de resistores em série e em paralelo.'
        ],
        keyTerms: [
          { term: 'Resistência Equivalente em Paralelo', definition: '1/Req = 1/R1 + 1/R2 + ... (A resistência total é sempre menor que a menor das resistências individuais).' },
          { term: 'Consumo (kWh)', definition: 'Energia = Potência (kW) x Tempo de uso (horas).' }
        ],
        xpReward: 85
      }
    ],
    quizzes: [
      {
        id: 'fis-q1',
        question: 'Um chuveiro elétrico de 5500 W de potência funciona por 30 minutos todos os dias durante um mês de 30 dias. Sabendo que o custo de 1 kWh é R$ 0,80, qual é o valor gasto mensalmente por esse chuveiro?',
        options: [
          { id: 'a', text: 'R$ 44,00' },
          { id: 'b', text: 'R$ 66,00' },
          { id: 'c', text: 'R$ 82,50' },
          { id: 'd', text: 'R$ 132,00' }
        ],
        correctOptionId: 'b',
        explanation: 'Tempo total no mês = 0,5 h x 30 dias = 15 horas. Potência em kW = 5,5 kW. Energia gasta = 5,5 kW x 15 h = 82,5 kWh. Custo = 82,5 x 0,80 = R$ 66,00.',
        difficulty: 'Médio',
        yearSource: 'ENEM / Física'
      },
      {
        id: 'fis-q2',
        question: 'Quando uma ambulância com sirene ligada se aproxima de um pedestre parado, o pedestre percebe um som mais agudo (maior frequência). Esse fenômeno ondulatório é conhecido como:',
        options: [
          { id: 'a', text: 'Efeito Joule' },
          { id: 'b', text: 'Efeito Fotoelétrico' },
          { id: 'c', text: 'Efeito Doppler' },
          { id: 'd', text: 'Ressonância Acústica' }
        ],
        correctOptionId: 'c',
        explanation: 'O Efeito Doppler é a aparente variação da frequência percebida por um observador quando há movimento relativo de aproximação ou afastamento entre ele e a fonte emissora de ondas.',
        difficulty: 'Fácil'
      },
      {
        id: 'fis-q3',
        difficulty: 'Médio',
        yearSource: 'ENEM 2023',
        context: 'Um feixe de luz monocromática incide do ar (índice de refração n₁ = 1,0) para a água (n₂ = 1,33) com um ângulo de incidência de 45° em relação à reta normal.',
        question: 'Ao penetrar na água, o que ocorre com a frequência (f), a velocidade de propagação (v) e o comprimento de onda (λ) dessa radiação luminosa?',
        options: [
          { id: 'a', text: 'A frequência e a velocidade aumentam, enquanto o comprimento de onda diminui.' },
          { id: 'b', text: 'A frequência permanece constante, enquanto a velocidade e o comprimento de onda diminuem.' },
          { id: 'c', text: 'A velocidade permanece inalterada e a frequência cai pela metade.' },
          { id: 'd', text: 'Todas as grandezas aumentam devido à maior densidade do meio aquoso.' },
          { id: 'e', text: 'O comprimento de onda dobra e a velocidade se anula.' }
        ],
        correctOptionId: 'b',
        explanation: 'Na refração, a frequência (f) depende exclusivamente da fonte emissora e NUNCA se altera. Como a água é mais refringente (maior n), a velocidade (v = c/n) e o comprimento de onda (λ = v/f) diminuem proporcionalmente.'
      },
      {
        id: 'fis-q4',
        difficulty: 'Médio',
        yearSource: 'ENEM 2022',
        context: 'Um carrinho de montanha-russa de massa m = 400 kg parte do repouso do ponto mais alto da pista a uma altura h = 20 metros em relação ao solo. Desprezando todos os atritos e a resistência do ar (adote g = 10 m/s²).',
        question: 'Qual é a velocidade do carrinho ao atingir a base da pista no nível do solo?',
        options: [
          { id: 'a', text: '10 m/s' },
          { id: 'b', text: '20 m/s' },
          { id: 'c', text: '40 m/s' },
          { id: 'd', text: '200 m/s' },
          { id: 'e', text: '400 m/s' }
        ],
        correctOptionId: 'b',
        explanation: 'Pela conservação da energia mecânica: Ep = Ec -> m * g * h = m * v² / 2 -> v = √(2 * g * h) = √(2 * 10 * 20) = √400 = 20 m/s (equivalente a 72 km/h).'
      },
      {
        id: 'fis-q5',
        difficulty: 'Fácil',
        yearSource: 'ENEM 2021',
        context: 'Durante uma tempestade com raios intensos, especialistas recomendam que motoristas e passageiros permaneçam no interior de seus automóveis fechados com carroceria metálica.',
        question: 'O princípio físico que explica a segurança dos passageiros no interior do carro metálico é a:',
        options: [
          { id: 'a', text: 'Blindagem eletrostática (Gaiola de Faraday), pois o campo elétrico no interior de um condutor em equilíbrio é nulo.' },
          { id: 'b', text: 'Resistência elétrica dos pneus de borracha que impede a passagem de qualquer voltagem.' },
          { id: 'c', text: 'Atração magnética das chapas metálicas que repele as cargas atmosféricas.' },
          { id: 'd', text: 'Dissipação instantânea da carga por efeito piezoelétrico.' },
          { id: 'e', text: 'Reflexão total das micro-ondas eletromagnéticas nos vidros temperados.' }
        ],
        correctOptionId: 'a',
        explanation: 'Pelo efeito da Gaiola de Faraday (blindagem eletrostática), as cargas elétricas de uma descarga atmosférica distribuem-se exclusivamente na superfície externa condutora da carcaça metálica, mantendo o campo elétrico interno nulo e protegendo os ocupantes.'
      },
      {
        id: 'fis-q6',
        difficulty: 'Médio',
        yearSource: 'ENEM / Mecânica',
        context: 'Um carro de massa 1000 kg trafega em linha reta a 72 km/h (equivalente a 20 m/s) em uma rodovia plana.',
        question: 'Qual é a energia cinética desse automóvel nessa velocidade?',
        options: [
          { id: 'a', text: '200.000 J (200 kJ)' },
          { id: 'b', text: '100.000 J (100 kJ)' },
          { id: 'c', text: '400.000 J (400 kJ)' },
          { id: 'd', text: '20.000 J (20 kJ)' },
          { id: 'e', text: '2.592.000 J' }
        ],
        correctOptionId: 'a',
        explanation: 'Primeiro convertemos 72 km/h ÷ 3,6 = 20 m/s. Aplicando Ec = (m · v²) / 2 = (1000 · 20²) / 2 = (1000 · 400) / 2 = 200.000 J = 200 kJ.'
      },
      {
        id: 'fis-q7',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Termologia',
        context: 'Nos dias muito quentes, ao sair de uma piscina, uma pessoa sente frio imediato quando o vento sopra sobre a água que molha sua pele.',
        question: 'Qual processo físico explica essa sensação de resfriamento rápido na pele?',
        options: [
          { id: 'a', text: 'A evaporação da água absorve calor latente da pele (processo endotérmico), reduzindo sua temperatura superficial.' },
          { id: 'b', text: 'A condensação instantânea de vapor libera frio por condução térmica.' },
          { id: 'c', text: 'A água na pele realiza fusão nuclear liberando fótons infravermelhos.' },
          { id: 'd', text: 'O vento impede qualquer troca térmica por convecção.' },
          { id: 'e', text: 'A sublimação do ar atmosférico congela a derme.' }
        ],
        correctOptionId: 'a',
        explanation: 'Para mudar do estado líquido para o gasoso (evaporação), a água retira energia térmica (calor latente de vaporização) do corpo humano, causando a sensação refrescante.'
      },
      {
        id: 'fis-q8',
        difficulty: 'Médio',
        yearSource: 'ENEM / Eletrodinâmica',
        context: 'Em uma instalação residencial, lâmpadas e tomadas são ligadas em paralelo a uma rede elétrica de tensão constante (127 V ou 220 V), diferentemente de pisca-piscas antigos ligados em série.',
        question: 'Qual é a principal vantagem técnica de ligar os aparelhos residenciais em paralelo?',
        options: [
          { id: 'a', text: 'Todos os aparelhos ficam submetidos à mesma ddp (tensão) nominal e funcionam de forma independente caso um deles queime.' },
          { id: 'b', text: 'A corrente elétrica total diminui quando ligamos mais aparelhos simultaneamente.' },
          { id: 'c', text: 'Se uma lâmpada queimar, todas as tomadas da casa são desligadas por segurança.' },
          { id: 'd', text: 'A tensão da rede divide-se igualmente entre a geladeira e o chuveiro.' },
          { id: 'e', text: 'A resistência equivalente do circuito se torna infinita.' }
        ],
        correctOptionId: 'a',
        explanation: 'Na associação em paralelo, cada ramo recebe diretamente a tensão total da rede e possui caminho próprio para a corrente; assim, desligar ou queimar um dispositivo não interrompe os demais.'
      },
      {
        id: 'fis-q9',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Dinâmica',
        context: 'Para reduzir a gravidade das lesões em colisões frontais, os carros modernos contam com zonas de deformação programada na dianteira e airbags no interior da cabine.',
        question: 'Sob a ótica do Teorema do Impulso (I = ΔQ = F · Δt), como esses dispositivos diminuem a força média sobre os passageiros?',
        options: [
          { id: 'a', text: 'Aumentam o tempo de duração (Δt) da desaceleração para a mesma variação da quantidade de movimento (ΔQ), reduzindo a força média de impacto.' },
          { id: 'b', text: 'Reduzem a massa inercial do motorista a zero no instante da batida.' },
          { id: 'c', text: 'Diminuem o tempo de colisão (Δt) para milésimos de segundo, aumentando o pico de força.' },
          { id: 'd', text: 'Aumentam a quantidade de movimento final do automóvel.' },
          { id: 'e', text: 'Anulam a primeira lei de Newton no interior da cabine.' }
        ],
        correctOptionId: 'a',
        explanation: 'Como a variação da quantidade de movimento (ΔQ = m · Δv) do passageiro até parar é fixa para dada velocidade, prolongar o intervalo de tempo (Δt) da frenagem reduz inversamente a força média (F = ΔQ / Δt) sobre o corpo.'
      },
      {
        id: 'fis-q10',
        difficulty: 'Médio',
        yearSource: 'ENEM / Óptica',
        context: 'Uma pessoa com miopia apresenta dificuldade para enxergar objetos distantes com nitidez porque a imagem se forma antes da retina.',
        question: 'Qual tipo de lente corretiva deve ser prescrita para corrigir a miopia?',
        options: [
          { id: 'a', text: 'Lente divergente (de bordas espessas), que abre levemente os raios luminosos para levá-los até a retina.' },
          { id: 'b', text: 'Lente convergente (biconvexa), para antecipar ainda mais o foco antes da retina.' },
          { id: 'c', text: 'Espelho côncavo metálico acoplado aos óculos.' },
          { id: 'd', text: 'Prisma opaco de reflexão total.' },
          { id: 'e', text: 'Lente cilíndrica exclusivamente para daltonismo.' }
        ],
        correctOptionId: 'a',
        explanation: 'Na miopia há excesso de convergência ocular (foco antes da retina). A lente divergente afasta os raios incidentes antes de atingirem o cristalino, deslocando o foco exatamente para cima da retina.'
      }
    ],
    flashcards: [
      {
        id: 'fis-fc1',
        topic: 'Energia',
        front: 'Qual é o Teorema do Trabalho e da Energia Cinética?',
        back: 'O trabalho da força resultante que atua sobre um corpo é numericamente igual à variação da sua energia cinética: W_total = ΔEc = (m * v_final² / 2) - (m * v_inicial² / 2).',
        hint: 'Trabalho Total = Variação de Energia Cinética.'
      },
      {
        id: 'fis-fc2',
        topic: 'Termodinâmica',
        front: 'O que diz a 1ª Lei da Termodinâmica?',
        back: 'É a lei da conservação de energia para sistemas térmicos: a variação da energia interna (ΔU) é igual ao calor trocado (Q) menos o trabalho realizado pelo sistema (W): ΔU = Q - W.',
        hint: 'ΔU = Q - W.'
      },
      {
        id: 'fis-fc3',
        topic: 'Óptica Geométrica & Ondas',
        front: 'O que acontece com a frequência, velocidade e comprimento de onda na Refração da Luz?',
        back: 'A FREQUÊNCIA permanece constante (depende apenas da fonte). Ao passar para um meio mais refringente (maior índice n), a velocidade (v) e o comprimento de onda (λ) diminuem proporcionalmente (v = λ * f).',
        hint: 'Frequência NUNCA muda; velocidade e comprimento de onda variam juntos.'
      },
      {
        id: 'fis-fc4',
        topic: 'Mecânica Conservativa',
        front: 'Como se aplica a Conservação da Energia Mecânica?',
        back: 'Na ausência de forças dissipativas (como atrito e resistência do ar), a Energia Mecânica Total se conserva: E_mec = E_cinética + E_potencial = constante. Toda energia potencial perdida é convertida em energia cinética (v = √(2gh)).',
        hint: 'Emec_inicial = Emec_final.'
      },
      {
        id: 'fis-fc5',
        topic: 'Eletrostática',
        front: 'O que é o efeito da Gaiola de Faraday (Blindagem Eletrostática)?',
        back: 'Em um condutor metálico oco em equilíbrio eletrostático, o campo elétrico em todo o seu interior é rigorosamente NULO (E_interno = 0). O excesso de cargas elétricas se distribui unicamente pela superfície externa, isolando o interior contra descargas elétricas.',
        hint: 'Campo elétrico interno nulo em condutores metálicos fechados.'
      }
    ]
  },
  {
    id: 'geografia',
    name: 'Geografia',
    category: 'Ciências Humanas',
    description: 'Estudo do espaço geográfico, cartografia, relevo, hidrografia, clima, geopolítica e dinâmicas populacionais.',
    highSchoolFocus: 'Geografia Física do Brasil, Climatologia, Domínios Morfoclimáticos, Urbanização, Agropecuária e Geopolítica Mundial.',
    recommendedTopics: ['Domínios Morfoclimáticos', 'Bacias Hidrográficas', 'Geopolítica Global', 'Urbanização & Metropolização', 'Fontes de Energia'],
    animal: {
      name: 'Ariranha',
      species: 'Ariranha / Lontra Gigante',
      scientificName: 'Pteronura brasiliensis',
      habitat: 'Rios, bacias hidrográficas límpidas e áreas inundadas do Pantanal e Amazônia',
      funFact: 'Excelente nadadora e mapeadora de bacias hidrográficas, a Ariranha nada com agilidade incrível graças às membranas interdigitais em suas patas e cauda achatada!',
      personality: 'Social, comunicativa, exploradora e apaixonada pelas bacias hidrográficas e biomas.',
      greetingMessage: 'Splash! Sou a Ariranha, a guardiã das águas doces e do relevo! Vamos navegar juntos pelos rios, climas, biomas e geopolítica do nosso planeta!',
      tipQuote: 'Na prova de Geografia do ENEM, relacione sempre os elementos físicos (relevo, clima, hidrografia) às transformações socioeconômicas e à ocupação humana do espaço geográfico.',
      avatarIcon: 'waves',
      illustrationUrl: ariranhaImg,
      themeColor: 'from-cyan-600 to-blue-700',
      accentColor: 'text-cyan-800 bg-cyan-100 dark:bg-cyan-950/40 dark:text-cyan-300',
      bgGradient: 'bg-gradient-to-br from-cyan-50 via-teal-50/40 to-blue-100/50 dark:from-cyan-950/20 dark:to-blue-950/20'
    },
    videoLessons: [
      {
        id: 'geo-1',
        title: 'Domínios Morfoclimáticos Brasileiros (Aziz Ab’Sáber)',
        duration: '19 min',
        topic: 'Geografia Física do Brasil',
        channel: 'Curso Enem Gratuito',
        youtubeId: 'HU12Q4iEZ0s',
        summary: [
          'Os 6 grandes domínios morfoclimáticos segundo Aziz Ab’Sáber: Amazônico, Cerrado, Mares de Morros, Caatinga, Araucárias e Pradarias.',
          'Faixas de transição (ex: Pantanal e Mata dos Cocais) e sua relevância ecológica.',
          'Interações dinâmicas entre clima, relevo, vegetação e hidrografia em cada domínio.'
        ],
        keyTerms: [
          { term: 'Domínio Morfoclimático', definition: 'Combinação integrada de feições de relevo, tipos de solo, formas de vegetação e condições climáticas.' },
          { term: 'Mares de Morros', definition: 'Domínio associado ao relevo mamelonar (meias-laranjas) da Mata Atlântica ao longo da faixa litorânea oriental.' }
        ],
        xpReward: 80
      },
      {
        id: 'geo-2',
        title: 'Globalização e Geopolítica no ENEM',
        duration: '21 min',
        topic: 'Geografia Humana e Geopolítica',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'Bq9Hx3ExFR8',
        summary: [
          'A Nova Ordem Mundial multipolar, blocos econômicos e a ascensão dos países emergentes (BRICS).',
          'Fluxos migratórios globais, cadeias globais de valor e disputas energéticas e territoriais contemporâneas.',
          'Impactos da revolução técnico-científico-informacional na divisão internacional do trabalho.'
        ],
        keyTerms: [
          { term: 'Multipolaridade', definition: 'Cenário geopolítico com múltiplos centros de poder econômico, militar e tecnológico no mundo.' },
          { term: 'DIT (Divisão Internacional do Trabalho)', definition: 'Especialização produtiva e comercial dos diferentes países no comércio mundial.' }
        ],
        xpReward: 85
      }
    ],
    quizzes: [
      {
        id: 'geo-q1',
        difficulty: 'Médio',
        yearSource: 'ENEM 2022',
        context: 'O relevo mamelonar ou de "meias-laranjas", com encostas convexas modeladas pela intensa ação do intemperismo químico em clima tropical úmido, é feição típica de qual domínio morfoclimático brasileiro?',
        question: 'Assinale a alternativa que identifica corretamente esse domínio morfoclimático descrito por Aziz Ab\'Sáber:',
        options: [
          { id: 'a', text: 'Domínio da Caatinga (depressões interplanálticas semiáridas).' },
          { id: 'b', text: 'Domínio dos Mares de Morros (faixa atlântica florestada).' },
          { id: 'c', text: 'Domínio das Araucárias (planalto meridional subtropical).' },
          { id: 'd', text: 'Domínio Amazônico (terras baixas florestadas equatoriais).' },
          { id: 'e', text: 'Domínio das Pradarias (coxilhas subtropicais gauchas).' }
        ],
        correctOptionId: 'b',
        explanation: 'O relevo de "Mares de Morros" (colinas mamelonares) desenvolveu-se sob o clima tropical úmido ao longo da faixa costeira oriental brasileira (bioma Mata Atlântica), onde o intemperismo químico desgasta as rochas cristalinas formando colinas arredondadas.'
      },
      {
        id: 'geo-q2',
        difficulty: 'Fácil',
        yearSource: 'ENEM 2021',
        context: 'A bacia hidrográfica que possui o maior potencial hidrelétrico instalado no Brasil, atravessando áreas de intensa industrialização e urbanização no Sudeste e Centro-Sul, é a:',
        question: 'Indique a bacia hidrográfica em questão:',
        options: [
          { id: 'a', text: 'Bacia do Rio São Francisco.' },
          { id: 'b', text: 'Bacia do Rio Paraná.' },
          { id: 'c', text: 'Bacia do Rio Amazonas.' },
          { id: 'd', text: 'Bacia do Rio Parnaíba.' },
          { id: 'e', text: 'Bacia do Rio Tocantins-Araguaia.' }
        ],
        correctOptionId: 'b',
        explanation: 'A Bacia do Rio Paraná concentra o maior aproveitamento hidrelétrico em operação no país (incluindo Itaipu, Porto Primavera e Furnas), localizada próxima aos maiores centros de consumo energético do país.'
      },
      {
        id: 'geo-q3',
        difficulty: 'Médio',
        yearSource: 'ENEM 2020',
        context: 'O fenômeno urbano caracterizado pela confluência física e integração funcional entre duas ou mais cidades vizinhas, formando uma mancha urbana contínua, denomina-se:',
        question: 'Qual é o termo geográfico para esse fenômeno?',
        options: [
          { id: 'a', text: 'Gentrificação.' },
          { id: 'b', text: 'Conurbação.' },
          { id: 'c', text: 'Segregação socioespacial.' },
          { id: 'd', text: 'Desmetropolização.' },
          { id: 'e', text: 'Megalópole.' }
        ],
        correctOptionId: 'b',
        explanation: 'Conurbação é a integração física e socioespacial de duas ou mais áreas urbanas contíguas devido à expansão horizontal dos municípios.'
      },
      {
        id: 'geo-q4',
        difficulty: 'Médio',
        yearSource: 'ENEM 2023',
        context: 'Durante as manhãs frias de inverno em grandes metrópoles como São Paulo, uma camada de ar quente pode se sobrepor a uma camada de ar frio mais densa próxima à superfície, impedindo as correntes de convecção verticais.',
        question: 'Esse fenômeno atmosférico-urbano que agrava a concentração de poluentes e a incidência de doenças respiratórias é a:',
        options: [
          { id: 'a', text: 'Chuva ácida.' },
          { id: 'b', text: 'Inversão térmica.' },
          { id: 'c', text: 'Ilha de calor.' },
          { id: 'd', text: 'Desertificação antrópica.' },
          { id: 'e', text: 'El Niño oscilatório.' }
        ],
        correctOptionId: 'b',
        explanation: 'A inversão térmica é um fenômeno meteorológico natural no qual o ar frio (mais denso) fica retido rente ao solo sob uma camada de ar quente, bloqueando a circulação vertical e aprisionando fumaça e poluentes nas metrópoles.'
      },
      {
        id: 'geo-q5',
        difficulty: 'Fácil',
        yearSource: 'ENEM 2022',
        context: 'O acrônimo MATOPIBA designa uma das principais áreas de expansão recente da fronteira agrícola e do agronegócio de grãos (soja, milho e algodão) altamente mecanizado no Brasil.',
        question: 'Quais estados brasileiros compõem a região do MATOPIBA e qual é o bioma predominante nela?',
        options: [
          { id: 'a', text: 'Mato Grosso, Paraná, Rio de Janeiro e Bahia no bioma Mata Atlântica.' },
          { id: 'b', text: 'Maranhão, Tocantins, Piauí e Bahia no bioma Cerrado.' },
          { id: 'c', text: 'Minas Gerais, Amazonas, Tocantins e Paraíba no bioma Caatinga.' },
          { id: 'd', text: 'Mato Grosso do Sul, Alagoas, Paraná e Acre no bioma Pantanal.' },
          { id: 'e', text: 'Maranhão, Amapá, Tocantins e Rondônia no bioma Amazônico.' }
        ],
        correctOptionId: 'b',
        explanation: 'MATOPIBA é formado por partes do Maranhão, Tocantins, Piauí e Bahia, abrangendo relevos planos (chapadas) do bioma Cerrado que favorecem a agricultura mecanizada em larga escala.'
      },
      {
        id: 'geo-q6',
        difficulty: 'Médio',
        yearSource: 'ENEM / Climatologia',
        context: 'Mesmo estando distante do oceano, a Floresta Amazônica mantém elevadíssimos índices de chuva e ainda exporta grandes volumes de umidade atmosférica para o Centro-Oeste e Sudeste do Brasil.',
        question: 'Como é chamado esse corredor aéreo de umidade transportado da Amazônia pelos ventos alísios e bloqueado pela Cordilheira dos Andes?',
        options: [
          { id: 'a', text: 'Rios Voadores, alimentados pela intensa evapotranspiração da floresta tropical.' },
          { id: 'b', text: 'Correntes marítimas frias de Humboldt.' },
          { id: 'c', text: 'Ilhas de calor continentais secas.' },
          { id: 'd', text: 'Ciclones extratropicais polares.' },
          { id: 'e', text: 'Monções de inverno siberianas.' }
        ],
        correctOptionId: 'a',
        explanation: 'As árvores amazônicas bombeiam água do solo e a liberam na atmosfera por evapotranspiração; esses fluxos de vapor ("rios voadores") esbarram nos Andes e são redirecionados para o Centro-Sul do Brasil, garantindo chuvas fundamentais para a agricultura e hidrelétricas.'
      },
      {
        id: 'geo-q7',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Geopolítica',
        context: 'Nas últimas décadas, a população brasileira passou por um acelerado processo de redução das taxas de fecundidade e aumento da expectativa de vida.',
        question: 'Qual transformação estrutural esse cenário provoca na pirâmide etária do Brasil?',
        options: [
          { id: 'a', text: 'Estreitamento progressivo da base (menos jovens) e alargamento do topo (envelhecimento populacional).' },
          { id: 'b', text: 'Explosão da base infantil e desaparecimento da população idosa.' },
          { id: 'c', text: 'Estagnação completa da idade mediana em 15 anos.' },
          { id: 'd', text: 'Retorno às altas taxas de mortalidade infantil pré-industriais.' },
          { id: 'e', text: 'Aumento súbito da população rural acima de 80% do total.' }
        ],
        correctOptionId: 'a',
        explanation: 'A transição demográfica brasileira atual caracteriza-se por menor natalidade (base mais estreita) e maior longevidade (topo mais largo), gerando desafios para a previdência e políticas de saúde para idosos.'
      },
      {
        id: 'geo-q8',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Geologia & Relevo',
        context: 'Apesar de o Brasil possuir raros terremotos de grande magnitude, seu território apresenta bacias sedimentares extensas (como a do Paraná e a Amazônica) ao lado de antigos escudos cristalinos ricos em ferro e manganês.',
        question: 'Por que o Brasil não sofre terremotos de alta intensidade nem possui vulcanismo ativo atualmente?',
        options: [
          { id: 'a', text: 'Porque o território brasileiro localiza-se integralmente no centro estável da Placa Tectônica Sul-Americana, distante das bordas de encontro entre placas.' },
          { id: 'b', text: 'Porque o solo amazônico absorve integralmente a energia do núcleo terrestre.' },
          { id: 'c', text: 'Porque a América do Sul não repousa sobre nenhuma placa litosférica.' },
          { id: 'd', text: 'Porque a Cordilheira dos Andes impede o movimento de rotação da crosta.' },
          { id: 'e', text: 'Porque todas as rochas brasileiras são exclusivamente sedimentares recentes.' }
        ],
        correctOptionId: 'a',
        explanation: 'Grandes abalos sísmicos e vulcões ativos ocorrem sobretudo nas zonas de contato (convergentes, divergentes ou transformantes) entre placas tectônicas. O Brasil situa-se no interior da Placa Sul-Americana.'
      },
      {
        id: 'geo-q9',
        difficulty: 'Médio',
        yearSource: 'ENEM / Energia',
        context: 'A matriz elétrica brasileira destaca-se mundialmente pela elevada participação de fontes renováveis, embora dependa fortemente das chuvas regulares nas bacias hidrográficas.',
        question: 'Qual combinação de fontes tem crescido rapidamente no Nordeste brasileiro (como no Piauí, Ceará, Bahia e Rio Grande do Norte) para diversificar a matriz limpa?',
        options: [
          { id: 'a', text: 'Energia eólica e energia solar fotovoltaica, favorecidas por ventos alísios constantes e alta incidência solar.' },
          { id: 'b', text: 'Energia maremotriz polar e fissão nuclear de tório.' },
          { id: 'c', text: 'Termelétricas movidas exclusivamente a carvão mineral antracito.' },
          { id: 'd', text: 'Energia geotérmica de gêiseres vulcânicos.' },
          { id: 'e', text: 'Queima direta de turfa glacial.' }
        ],
        correctOptionId: 'a',
        explanation: 'O Nordeste brasileiro concentra os maiores parques eólicos e usinas solares fotovoltaicas do país graças aos ventos alísios intensos e à baixa nebulosidade com elevada radiação solar durante quase todo o ano.'
      },
      {
        id: 'geo-q10',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Cartografia',
        context: 'Em um mapa rodoviário do Piauí com escala numérica de 1 : 2.000.000, a distância medida com uma régua em linha reta entre duas cidades é de 5 cm.',
        question: 'Qual é a distância real correspondente entre essas duas cidades?',
        options: [
          { id: 'a', text: '100 km' },
          { id: 'b', text: '10 km' },
          { id: 'c', text: '1.000 km' },
          { id: 'd', text: '20 km' },
          { id: 'e', text: '200 km' }
        ],
        correctOptionId: 'a',
        explanation: 'Na escala 1 : 2.000.000, cada 1 cm no mapa equivale a 2.000.000 cm na realidade, ou seja, 20 km (cortando 5 zeros). Logo, 5 cm × 20 km/cm = 100 km.'
      }
    ],
    flashcards: [
      {
        id: 'geo-fc1',
        topic: 'Geomorfologia',
        front: 'O que diferencia Intemperismo Físico de Intemperismo Químico?',
        back: 'Intemperismo Físico: desagregação mecânica da rocha sem alterar sua composição química (típico de áreas secas e variações térmicas). Intemperismo Químico: alteração e dissolução mineral pela ação da água e ácidos (típico de climas quentes e úmidos).',
        hint: 'Físico quebra mecânica; químico altera composição por meio da água.'
      },
      {
        id: 'geo-fc2',
        topic: 'Climatologia',
        front: 'O que são "Rios Voadores" da Amazônia?',
        back: 'São imensos fluxos de vapor d\'água atmosférico gerados pela evapotranspiração da Floresta Amazônica, transportados pelos ventos alísios em direção aos Andes e desviados para o Centro-Oeste, Sudeste e Sul do Brasil, alimentando as chuvas nessas regiões.',
        hint: 'Vapor d\'água da floresta que irriga o Centro-Sul.'
      },
      {
        id: 'geo-fc3',
        topic: 'Urbanização',
        front: 'O que é Macrocefalia Urbana?',
        back: 'É a hipertrofia e concentração desproporcional de população, serviços, atividades econômicas e infraestrutura em uma única cidade ou metrópole principal, comum em países periféricos e emergentes.',
        hint: 'Inchaço urbano e concentração desigual de serviços.'
      },
      {
        id: 'geo-fc4',
        topic: 'Impactos Ambientais Urbanos',
        front: 'O que é Inversão Térmica e por que piora a poluição no inverno?',
        back: 'É o fenômeno no qual uma camada de ar quente fica sobreposta a uma camada de ar frio rente ao solo. O ar frio denso não sobe, cessando as correntes de convecção e aprisionando a poeira e gases tóxicos na altura dos pulmões dos habitantes.',
        hint: 'Ar frio embaixo + ar quente em cima = poluentes retidos.'
      },
      {
        id: 'geo-fc5',
        topic: 'Agronegócio e Fronteira Agrícola',
        front: 'O que é o MATOPIBA e qual sua importância econômica e ambiental?',
        back: 'Região de fronteira agrícola formada por partes do Maranhão, Tocantins, Piauí e Bahia no Cerrado. Destaca-se pela produção de commodities (soja, milho, algodão) em chapadas mecanizadas, mas gera pressão sobre os recursos hídricos e vegetação nativa.',
        hint: 'Maranhão, Tocantins, Piauí e Bahia no Cerrado.'
      }
    ]
  },
  {
    id: 'historia',
    name: 'História',
    category: 'Ciências Humanas',
    description: 'Análise dos processos históricos do Brasil e do Mundo, sociedades, transformações e memória.',
    highSchoolFocus: 'Brasil Colônia, Império, Era Vargas e Ditadura Militar; Revoluções Mundiais, Imperialismo e Guerras Mundiais.',
    recommendedTopics: ['Ciclos Econômicos no Brasil', 'Revolução Francesa', 'Era Vargas (1930-1945)', 'Guerra Fria', 'Ditadura Militar Brasileira'],
    animal: {
      name: 'Harpia',
      species: 'Harpia / Gavião-real',
      scientificName: 'Harpia harpyja',
      habitat: 'Dossel das árvores mais altas da floresta amazônica',
      funFact: 'Com uma envergadura de mais de 2 metros e visão panorâmica aguçada, a Harpia enxerga os acontecimentos do alto com precisão milimétrica!',
      personality: 'Estratégica, altiva, perspicaz e detentora da memória das eras.',
      greetingMessage: 'Do alto das mais altas sumaúmas, contemplo séculos de batalhas e transformações. Sou a Harpia, e vou guiá-lo pelos caminhos da História com visão panorâmica!',
      tipQuote: 'Na prova de história, nunca julgue o passado com os valores do presente (anacronismo). Compreenda o contexto material e ideológico de cada época!',
      avatarIcon: 'feather',
      illustrationUrl: harpiaImg,
      themeColor: 'from-stone-700 to-amber-900',
      accentColor: 'text-stone-800 bg-stone-100 dark:bg-stone-900 dark:text-stone-300',
      bgGradient: 'bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-100/40 dark:from-stone-950/30 dark:to-amber-950/20'
    },
    videoLessons: [
      {
        id: 'his-1',
        title: 'Brasil República: A Era Vargas (1930 - 1945) no ENEM',
        duration: '22 min',
        topic: 'História do Brasil',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'mVIssop5wYc',
        summary: [
          'Governo Provisório (1930-1934) e a Revolução Constitucionalista de 1932.',
          'Governo Constitucional (1934-1937) e o levante da Aliança Nacional Libertadora (ANL) vs Ação Integralista Brasileira (AIB).',
          'Estado Novo (1937-1945): criação da CLT, nacionalismo econômico (CSN, Vale) e censura com o DIP.'
        ],
        keyTerms: [
          { term: 'CLT (Consolidação das Leis do Trabalho)', definition: 'Decreto-lei criado em 1943 por Getúlio Vargas reunindo a legislação trabalhista no Brasil.' },
          { term: 'Plano Cohen', definition: 'Documento forjado que simulava uma conspiração comunista, utilizado como pretexto para o golpe do Estado Novo.' }
        ],
        xpReward: 80
      },
      {
        id: 'his-2',
        title: 'Guerra Fria e a Bipolarização Mundial no Século XX',
        duration: '18 min',
        topic: 'História Geral',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'bcZAMn-5mYU',
        summary: [
          'A divisão ideológica entre Bloco Capitalista (EUA - Doutrina Truman / OTAN) e Bloco Socialista (URSS - Pacto de Varsóvia).',
          'Conflitos indiretos: Guerra da Coreia, Guerra do Vietnã e Crise dos Mísseis em Cuba.',
          'Corrida armamentista, espacial e a queda do Muro de Berlim (1989).'
        ],
        keyTerms: [
          { term: 'Muro de Berlim', definition: 'Símbolo físico da Cortina de Ferro que dividiu a Alemanha entre 1961 e 1989.' },
          { term: 'Doutrina Truman', definition: 'Política externa norte-americana de contenção da expansão do comunismo internacional.' }
        ],
        xpReward: 70
      }
    ],
    quizzes: [
      {
        id: 'his-q1',
        question: 'Durante o período do Estado Novo (1937-1945), o governo de Getúlio Vargas caracterizou-se fortemente por:',
        options: [
          { id: 'a', text: 'Ampla liberdade de imprensa e descentralização federativa do poder aos estados' },
          { id: 'b', text: 'Centralização política, criação da legislação trabalhista (CLT) e propaganda estatal via DIP' },
          { id: 'c', text: 'Aliança irrestrita com a União Soviética e estatização de todas as propriedades agrícolas' },
          { id: 'd', text: 'Adoção do neoliberalismo econômico e privatização das jazidas minerais' }
        ],
        correctOptionId: 'b',
        explanation: 'O Estado Novo foi uma ditadura personalista de Vargas marcada pelo nacionalismo desenvolvimentista, centralização do executivo, criação da CLT e intensa propaganda oficial através do Departamento de Imprensa e Propaganda (DIP).',
        difficulty: 'Médio',
        yearSource: 'ENEM / História'
      },
      {
        id: 'his-q2',
        question: 'O Tratado de Tordesilhas (1494) foi um acordo pioneiro de partilha ultramarina celebrado entre quais duas coroas europeias?',
        options: [
          { id: 'a', text: 'Portugal e Espanha' },
          { id: 'b', text: 'Inglaterra e França' },
          { id: 'c', text: 'Portugal e Holanda' },
          { id: 'd', text: 'Espanha e Inglaterra' }
        ],
        correctOptionId: 'a',
        explanation: 'Assinado em 1494 com mediação papal, dividiu as terras descobertas e por descobrir fora da Europa entre o Reino de Portugal e a Coroa de Castela (Espanha).',
        difficulty: 'Fácil'
      },
      {
        id: 'his-q3',
        difficulty: 'Médio',
        yearSource: 'ENEM 2023',
        context: 'No final do século XVIII, a Capitania de Minas Gerais foi palco da Inconfidência Mineira (1789), uma das mais célebres conspirações separatistas do período colonial brasileiro.',
        question: 'O estopim imediato para a articulação dos inconfidentes contra a Coroa Portuguesa foi a ameaça de decretação da:',
        options: [
          { id: 'a', text: 'Lei Áurea de abolição imediata da escravidão.' },
          { id: 'b', text: 'Derrama, cobrança forçada e violenta dos impostos atrasados sobre o quinto do ouro.' },
          { id: 'c', text: 'Abertura dos Portos às Nações Amigas por Dom João VI.' },
          { id: 'd', text: 'Tarifa Alves Branco que taxava as importações inglesas.' },
          { id: 'e', text: 'Proibição do cultivo do café no Vale do Paraíba.' }
        ],
        correctOptionId: 'b',
        explanation: 'A Inconfidência Mineira foi impulsionada pelo descontentamento da elite local com a cobrança da Derrama (imposição de 100 arrobas anuais de ouro atrasadas) e pela influência dos ideais iluministas e da independência dos EUA.'
      },
      {
        id: 'his-q4',
        difficulty: 'Médio',
        yearSource: 'ENEM 2022',
        context: 'Em 13 de dezembro de 1968, durante a ditadura civil-militar brasileira no governo de Costa e Silva, foi promulgado o Ato Institucional nº 5 (AI-5).',
        question: 'Qual foi o impacto do AI-5 na ordem política e jurídica brasileira?',
        options: [
          { id: 'a', text: 'Restabelecimento do pluripartidarismo e anistia ampla aos exilados políticos.' },
          { id: 'b', text: 'Suspensão da garantia de habeas corpus para crimes políticos, fechamento temporário do Congresso e endurecimento da censura prévia.' },
          { id: 'c', text: 'Convocação imediata de eleições diretas para presidente da República.' },
          { id: 'd', text: 'Criação do Ministério da Educação e da Cultura.' },
          { id: 'e', text: 'Instituição do parlamentarismo como sistema de governo provisório.' }
        ],
        correctOptionId: 'b',
        explanation: 'O AI-5 marcou o período mais repressivo dos "anos de chumbo", dando ao Executivo poderes para fechar o parlamento, cassar mandatos, suspender o habeas corpus para crimes contra a segurança nacional e censurar a imprensa e as artes.'
      },
      {
        id: 'his-q5',
        difficulty: 'Médio',
        yearSource: 'ENEM 2021',
        context: 'Na Conferência de Berlim (1884-1885), potências industriais europeias reuniram-se para formalizar a partilha colonial do continente africano.',
        question: 'O processo neocolonialista do século XIX na África foi ideologicamente legitimado pela doutrina do:',
        options: [
          { id: 'a', text: 'Marxismo-leninismo internacionalista.' },
          { id: 'b', text: 'Darwinismo social e da "missão civilizadora" do homem branco europeu.' },
          { id: 'c', text: 'Pan-africanismo emancipatório.' },
          { id: 'd', text: 'Existencialismo humanista socrático.' },
          { id: 'e', text: 'Mercantilismo metalista ibérico.' }
        ],
        correctOptionId: 'b',
        explanation: 'O Imperialismo do século XIX justificou a exploração e dominação da África e Ásia por meio de teorias racistas pseudocientíficas (Darwinismo social) que afirmavam haver uma "missão civilizatória" da raça branca sobre os demais povos.'
      },
      {
        id: 'his-q6',
        difficulty: 'Médio',
        yearSource: 'ENEM / Brasil Colônia',
        context: 'Entre os séculos XVII e XVIII, comunidades como o Quilombo dos Palmares (na Serra da Barriga, atual Alagoas) reuniram milhares de pessoas lideradas por figuras como Ganga Zumba e Zumbi.',
        question: 'Historicamente, o que os quilombos representaram no sistema escravista do Brasil Colonial?',
        options: [
          { id: 'a', text: 'Formas organizadas de resistência à escravidão, com produção agrícola diversificada, organização política e preservação cultural africana.' },
          { id: 'b', text: 'Feitorias comerciais portuguesas destinadas à venda de ouro para a Inglaterra.' },
          { id: 'c', text: 'Instituições militares oficiais subordinadas aos senhores de engenho.' },
          { id: 'd', text: 'Reduções jesuíticas exclusivas para imigrantes europeus protestantes.' },
          { id: 'e', text: 'Acampamentos temporários desprovidos de agricultura ou organização social.' }
        ],
        correctOptionId: 'a',
        explanation: 'Os quilombos foram núcleos permanentes de liberdade e resistência contra a escravização, articulando defesa militar, agricultura de subsistência e troca comercial com vilas vizinhas.'
      },
      {
        id: 'his-q7',
        difficulty: 'Fácil',
        yearSource: 'ENEM / República Velha',
        context: 'Durante a Primeira República (1889-1930), o controle político eleitoral nas áreas rurais baseava-se no "voto de cabresto" e nas trocas de favores entre chefes locais e governadores.',
        question: 'Como ficou conhecido esse sistema político-social de dominação local na Primeira República?',
        options: [
          { id: 'a', text: 'Coronelismo.' },
          { id: 'b', text: 'Parlamentarismo às avessas.' },
          { id: 'c', text: 'Estado de Bem-Estar Social.' },
          { id: 'd', text: 'Despotismo Esclarecido.' },
          { id: 'e', text: 'Populismo trabalhista.' }
        ],
        correctOptionId: 'a',
        explanation: 'O Coronelismo sustentava o poder das oligarquias estaduais ("Política dos Governadores"): os "coronéis" garantiam votos em currais eleitorais por coerção ou clientelismo (voto aberto) em troca de verbas e cargos.'
      },
      {
        id: 'his-q8',
        difficulty: 'Médio',
        yearSource: 'ENEM / Idade Moderna',
        context: 'A invenção da imprensa de tipos móveis por Gutenberg e o florescimento das cidades italianas impulsionaram o Renascimento Cultural nos séculos XV e XVI.',
        question: 'Qual princípio intelectual define o Humanismo Renascentista em contraposição à visão medieval dominante?',
        options: [
          { id: 'a', text: 'O antropocentrismo, valorizando a razão humana, a observação científica e o resgate da Antiguidade Clássica greco-romana.' },
          { id: 'b', text: 'A rejeição absoluta das artes plásticas e da anatomia humana.' },
          { id: 'c', text: 'O teocentrismo dogmático que proibia o estudo da matemática e da perspectiva.' },
          { id: 'd', text: 'O retorno exclusivo ao sistema feudal agrário de servidão.' },
          { id: 'e', text: 'A defesa da queima de manuscritos clássicos em latim e grego.' }
        ],
        correctOptionId: 'a',
        explanation: 'O Renascimento colocou o ser humano e sua capacidade racional e criativa no centro das investigações (antropocentrismo), rompendo com o monopólio interpretativo escolástico sem necessariamente negar a fé.'
      },
      {
        id: 'his-q9',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Século XX',
        context: 'Após a Segunda Guerra Mundial, Europa Ocidental e Estados Unidos enfrentaram a disputa geopolítica e ideológica conhecida como Guerra Fria contra a União Soviética.',
        question: 'Qual foi o objetivo estratégico do Plano Marshall (1947) implementado pelos Estados Unidos?',
        options: [
          { id: 'a', text: 'Financiar a reconstrução econômica da Europa Ocidental para reerguer mercados consumidores e conter o avanço do socialismo soviético.' },
          { id: 'b', text: 'Criar o Pacto de Varsóvia para integrar os exércitos do Leste Europeu.' },
          { id: 'c', text: 'Proibir a industrialização da Alemanha Ocidental e da França.' },
          { id: 'd', text: 'Isolar diplomaticamente todos os países da América Latina da ONU.' },
          { id: 'e', text: 'Unificar as moedas asiáticas sob controle direto de Moscou.' }
        ],
        correctOptionId: 'a',
        explanation: 'Por meio de empréstimos e investimentos maciços, o Plano Marshall recuperou rapidamente a infraestrutura da Europa Ocidental, fortalecendo o bloco capitalista sob liderança norte-americana.'
      },
      {
        id: 'his-q10',
        difficulty: 'Médio',
        yearSource: 'ENEM / Redemocratização',
        context: 'Promulgada em 5 de outubro de 1988 após o fim do regime militar, a atual Constituição Brasileira ficou conhecida como "Constituição Cidadã".',
        question: 'Por que Ulysses Guimarães deu à Constituição de 1988 o título de "Constituição Cidadã"?',
        options: [
          { id: 'a', text: 'Pela ampla consagração de direitos fundamentais, liberdades democráticas, voto universal (inclusive para analfabetos e jovens de 16-17 anos) e garantias sociais como SUS e educação.' },
          { id: 'b', text: 'Por instaurar eleições indiretas para presidente por mais trinta anos.' },
          { id: 'c', text: 'Por manter a censura prévia à imprensa e extinguir os sindicatos rurais.' },
          { id: 'd', text: 'Por restringir o direito ao voto apenas a proprietários de terras.' },
          { id: 'e', text: 'Por adotar o parlamentarismo monárquico vitalício.' }
        ],
        correctOptionId: 'a',
        explanation: 'A Carta de 1988 restabeleceu o Estado Democrático de Direito, proibiu a censura, criminalizou o racismo e garantiu direitos trabalhistas, previdenciários, indígenas e ambientais amplos.'
      }
    ],
    flashcards: [
      {
        id: 'his-fc1',
        topic: 'Brasil Colônia',
        front: 'O que foi o Pacto Colonial (ou Exclusivo Metropolitano)?',
        back: 'Sistema de monopólio comercial onde a colônia (Brasil) era obrigada a comercializar exclusivamente com a sua metrópole (Portugal), fornecendo matérias-primas e comprando manufaturados.',
        hint: 'Monopólio obrigatório de comércio com Portugal.'
      },
      {
        id: 'his-fc2',
        topic: 'Idade Moderna',
        front: 'Quais foram os 3 lemas fundamentais da Revolução Francesa de 1789?',
        back: 'Liberté, Égalité, Fraternité (Liberdade, Igualdade e Fraternidade), inspirados nos ideais iluministas contra o Antigo Regime absolutista.',
        hint: 'Três palavras em francês que marcaram a queda da Bastilha.'
      },
      {
        id: 'his-fc3',
        topic: 'Brasil Colônia',
        front: 'O que foi a Inconfidência Mineira (1789) e qual foi seu estopim?',
        back: 'Movimento emancipacionista republicano da elite mineradora de Vila Rica, influenciado pelo Iluminismo e pela Independência dos EUA. Seu estopim foi o anúncio da Derrama (cobrança forçada do quinto do ouro atrasado pela Coroa portuguesa).',
        hint: 'Vila Rica, Tiradentes, Derrama e ideais iluministas.'
      },
      {
        id: 'his-fc4',
        topic: 'Brasil República',
        front: 'O que representou o AI-5 (1968) durante a Ditadura Militar?',
        back: 'O ato de maior endurecimento autoritário do regime militar: fechou o Congresso, cassou direitos políticos de opositores, instituiu a censura prévia irrestrita e suspendeu a garantia constitucional do habeas corpus.',
        hint: 'Fechamento do Congresso e suspensão do habeas corpus em 1968.'
      },
      {
        id: 'his-fc5',
        topic: 'História Geral',
        front: 'O que foi a Partilha da África e a Conferência de Berlim (1884-1885)?',
        back: 'Divisão geopolítica arbitrária das fronteiras do continente africano entre as potências imperialistas europeias (Inglaterra, França, Alemanha, Bélgica, etc.), impulsionada pela busca por matérias-primas industriais e justificada pela falsa tese do "Darwinismo Social".',
        hint: 'Neocolonialismo, partilha europeia e fronteiras artificiais na África.'
      }
    ]
  },
  {
    id: 'ingles',
    name: 'Inglês',
    category: 'Linguagens',
    description: 'Domínio da língua inglesa, interpretação de textos, estratégias de leitura (Skimming/Scanning) e gramática funcional.',
    highSchoolFocus: 'Interpretação de textos do ENEM, Linking Words, Verb Tenses (Present Perfect vs Simple Past), Falsos Cognatos e Modais.',
    recommendedTopics: ['Linking Words & Conectivos', 'Skimming and Scanning', 'Modal Verbs', 'Conditionals (If Clauses)', 'Falsos Cognatos'],
    animal: {
      name: 'Coruja-orelhuda',
      species: 'Coruja-orelhuda',
      scientificName: 'Asio clamator',
      habitat: 'Bordas de florestas, savanas e clareiras arborizadas',
      funFact: 'Suas "orelhas" são na verdade tufos de penas que expressam seu estado de alerta, e sua audição direcionada capta até o sussurro mais distante à noite!',
      personality: 'Poliglota, atenta a cada detalhe fonético e mestra em interpretação de textos.',
      greetingMessage: 'Hello there, brilliant student! I am the Striped Owl. Com meus ouvidos apurados e visão focada, vamos dominar o vocabulário e a interpretação de texto em inglês!',
      tipQuote: 'No ENEM, você não precisa traduzir palavra por palavra! Use o contexto e as palavras-chave (cognatos) para entender a ideia central do texto.',
      avatarIcon: 'book-open',
      illustrationUrl: corujaImg,
      themeColor: 'from-violet-600 to-purple-700',
      accentColor: 'text-violet-800 bg-violet-100 dark:bg-violet-950/40 dark:text-violet-300',
      bgGradient: 'bg-gradient-to-br from-violet-50 via-purple-50/40 to-indigo-100/40 dark:from-violet-950/20 dark:to-purple-950/20'
    },
    videoLessons: [
      {
        id: 'ing-1',
        title: 'Estratégias de Leitura no ENEM: Como usar Skimming e Scanning',
        duration: '13 min',
        topic: 'Interpretação Textual',
        channel: 'Curso Enem Gratuito',
        youtubeId: 'YvmH7tTcDY4',
        summary: [
          'Skimming: passar os olhos no texto para captar a ideia geral e o gênero textual.',
          'Scanning: busca rápida por dados específicos (números, datas, nomes próprios e palavras-chave).',
          'Atenção a charges, tirinhas, ironias e recursos multimodais.'
        ],
        keyTerms: [
          { term: 'Skimming', definition: 'Técnica de leitura rápida para entender o sentido global do texto sem ler palavra por palavra.' },
          { term: 'False Friends', definition: 'Palavras graficamente parecidas com o português, mas com significado distinto (ex: actually = na verdade).' }
        ],
        xpReward: 60
      },
      {
        id: 'ing-2',
        title: 'Linking Words e Conectivos Decisivos em Língua Inglesa no ENEM',
        duration: '15 min',
        topic: 'Gramática Aplicada',
        channel: 'Educa Mais Brasil',
        youtubeId: 'kKNhbV86Cyw',
        summary: [
          'Conectivos de contraste/oposição: However, Although, In spite of, Whereas.',
          'Conectivos de adição e consequência: Furthermore, In addition, Therefore, Consequently.',
          'Identificando a relação semântica entre parágrafos.'
        ],
        keyTerms: [
          { term: 'However / Nonetheless', definition: 'Entretanto / No entanto (estabelece contraste ou ressalva).' },
          { term: 'Therefore / Hence', definition: 'Portanto / Por conseguinte (estabelece conclusão ou causa e efeito).' }
        ],
        xpReward: 70
      }
    ],
    quizzes: [
      {
        id: 'ing-q1',
        question: 'No trecho: "Although renewable energy investments have increased significantly, fossil fuels still account for the majority of global power generation", a palavra "Although" expressa ideia de:',
        options: [
          { id: 'a', text: 'Adição' },
          { id: 'b', text: 'Concessão / Contraste' },
          { id: 'c', text: 'Causa e efeito' },
          { id: 'd', text: 'Tempo cronológico' }
        ],
        correctOptionId: 'b',
        explanation: '"Although" significa "embora" ou "ainda que", introduzindo uma oração subordinada concessiva que contrasta com a oração principal.',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Inglês'
      },
      {
        id: 'ing-q2',
        question: 'Em inglês, o termo "eventually" é um clássico falso cognato. Qual é a sua tradução correta no contexto: "After hours of negotiation, they eventually reached an agreement"?',
        options: [
          { id: 'a', text: 'Eventualmente / às vezes' },
          { id: 'b', text: 'Por fim / finalmente com o tempo' },
          { id: 'c', text: 'Raramente' },
          { id: 'd', text: 'Imediatamente' }
        ],
        correctOptionId: 'b',
        explanation: '"Eventually" significa "finalmente", "ao final de tudo" (não confundir com "occasionally", que significa de vez em quando/eventualmente).',
        difficulty: 'Médio'
      },
      {
        id: 'ing-q3',
        difficulty: 'Médio',
        yearSource: 'ENEM 2023',
        context: 'Consider the following sentence from an environmental report: "Scientists have discovered that reforestation in tropical biomes has significantly contributed to local temperature moderation over the past decade."',
        question: 'The verbal structures "have discovered" and "has contributed" are in the Present Perfect tense because they indicate:',
        options: [
          { id: 'a', text: 'Actions that occurred at a completely specified time in ancient history with no modern effect.' },
          { id: 'b', text: 'Past actions whose effects and relevance continue into the present moment.' },
          { id: 'c', text: 'Hypothetical future events that will never materialize.' },
          { id: 'd', text: 'Immediate commands given to the reader.' },
          { id: 'e', text: 'Actions in progress at the exact second of speech.' }
        ],
        correctOptionId: 'b',
        explanation: 'O Present Perfect Tense (have/has + particípio) conecta um fato iniciado no passado com suas consequências e relevância no presente, sem datação exata obrigatória.'
      },
      {
        id: 'ing-q4',
        difficulty: 'Médio',
        yearSource: 'ENEM 2022',
        context: '"If countries invest massively in clean energy sources today, they will prevent irreversible climate disasters in the future."',
        question: 'The grammatical structure utilized above is a First Conditional sentence, expressing:',
        options: [
          { id: 'a', text: 'A past regret that can no longer be changed.' },
          { id: 'b', text: 'A real and likely condition with a probable future outcome.' },
          { id: 'c', text: 'An impossible imaginary fantasy in an alternative reality.' },
          { id: 'd', text: 'A habit that was true in childhood only.' },
          { id: 'e', text: 'A passive voice construction with modal verbs.' }
        ],
        correctOptionId: 'b',
        explanation: 'O First Conditional (If + Simple Present, ... will + verbo) é utilizado para expressar situações reais ou muito prováveis de acontecerem no futuro mediante o cumprimento de uma condição.'
      },
      {
        id: 'ing-q5',
        difficulty: 'Fácil',
        yearSource: 'ENEM 2021',
        context: 'In an academic abstract: "The researchers intend to comprehend how digital platforms affect teenagers\' sleep cycles."',
        question: 'The words "intend" and "comprehend" mean, respectively:',
        options: [
          { id: 'a', text: 'Entender e fingir.' },
          { id: 'b', text: 'Pretender / ter a intenção e compreender / entender.' },
          { id: 'c', text: 'Desistir e julgar.' },
          { id: 'd', text: 'Exigir e duvidar.' },
          { id: 'e', text: 'Esquecer e memorizar.' }
        ],
        correctOptionId: 'b',
        explanation: '"Intend" significa ter a intenção/planejar (enquanto "pretend" significa fingir), e "comprehend" significa compreender/entender.'
      },
      {
        id: 'ing-q6',
        difficulty: 'Médio',
        yearSource: 'ENEM / Linking Words',
        context: 'Read the sentence: "Solar energy costs have dropped sharply; furthermore, battery storage technology is becoming much more efficient."',
        question: 'The linking word "furthermore" could be replaced without changing the meaning by:',
        options: [
          { id: 'a', text: 'However (entretanto).' },
          { id: 'b', text: 'Moreover / In addition (além disso).' },
          { id: 'c', text: 'Therefore (portanto).' },
          { id: 'd', text: 'Unless (a menos que).' },
          { id: 'e', text: 'Instead (em vez disso).' }
        ],
        correctOptionId: 'b',
        explanation: '"Furthermore" é um conector aditivo equivalente a "moreover" e "in addition" ("além disso", "ademais"), acrescentando um novo argumento favorável ao anterior.'
      },
      {
        id: 'ing-q7',
        difficulty: 'Fácil',
        yearSource: 'ENEM / False Friends',
        context: 'In an email to a college advisor: "Please let me know if I need to push the deadline or submit the actual draft today."',
        question: 'In English, the adjective "actual" is a false cognate and means:',
        options: [
          { id: 'a', text: 'Atual / presente neste exato momento.' },
          { id: 'b', text: 'Real / verdadeiro / efetivo.' },
          { id: 'c', text: 'Atuado / encenado no teatro.' },
          { id: 'd', text: 'Atrasado / fora do prazo.' },
          { id: 'e', text: 'Futuro / provisório.' }
        ],
        correctOptionId: 'b',
        explanation: '"Actual" em inglês significa "real / verdadeiro / de fato" (e "actually" = na verdade). Para dizer "atual" em inglês, utiliza-se "current" ou "present".'
      },
      {
        id: 'ing-q8',
        difficulty: 'Médio',
        yearSource: 'ENEM / Modal Verbs',
        context: 'Public health notice: "Students must wear protective goggles inside the chemistry lab, and they should wash their hands before leaving."',
        question: 'Regarding the modal verbs "must" and "should" in this notice, they express respectively:',
        options: [
          { id: 'a', text: 'Strict obligation / rule and recommendation / advice.' },
          { id: 'b', text: 'Past ability and polite permission.' },
          { id: 'c', text: 'Low probability and remote future wish.' },
          { id: 'd', text: 'Prohibition and regret about the past.' },
          { id: 'e', text: 'Optional hobby and physical capacity.' }
        ],
        correctOptionId: 'a',
        explanation: '"Must" indica obrigação firme ou regra de segurança indispensável; "should" expressa conselho ou recomendação fortemente sugerida.'
      },
      {
        id: 'ing-q9',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Reading Comprehension',
        context: 'Excerpt: "Far from being passive victims of climate shifts, coastal communities are spearheading low-cost mangrove restoration initiatives that shield shorelines from storm surges."',
        question: 'According to the excerpt, what is the role of coastal communities regarding climate shifts?',
        options: [
          { id: 'a', text: 'They passively wait for international relocation without acting locally.' },
          { id: 'b', text: 'They are actively leading affordable mangrove restoration projects that protect coastlines.' },
          { id: 'c', text: 'They have abandoned all mangrove forests to build concrete walls.' },
          { id: 'd', text: 'They deny the existence of storm surges along the shore.' },
          { id: 'e', text: 'They rely exclusively on expensive deep-sea barriers.' }
        ],
        correctOptionId: 'b',
        explanation: '"Far from being passive" indica que longe de serem passivas, essas comunidades "are spearheading" (estão liderando/encabeçando) iniciativas de baixo custo de restauração de manguezais que protegem a costa ("shield shorelines").'
      },
      {
        id: 'ing-q10',
        difficulty: 'Médio',
        yearSource: 'ENEM / Passive Voice',
        context: 'Science news: "Thousands of new plant species in the Amazon rainforest are still being cataloged by local botanists every decade."',
        question: 'Why did the journalist choose the Passive Voice ("are still being cataloged") in this headline?',
        options: [
          { id: 'a', text: 'To emphasize the thousands of plant species (the object of the action) rather than focusing only on who catalogs them.' },
          { id: 'b', text: 'To indicate an action finished centuries ago with no relation to the present.' },
          { id: 'c', text: 'Because plants are actively cataloging the scientists.' },
          { id: 'd', text: 'To express an impossible hypothetical condition in the past.' },
          { id: 'e', text: 'Because English prohibits active voice in scientific articles.' }
        ],
        correctOptionId: 'a',
        explanation: 'A voz passiva contínua ("are still being cataloged") destaca o paciente/tema principal da notícia (milhares de novas espécies vegetais) como sujeito gramatical da oração.'
      }
    ],
    flashcards: [
      {
        id: 'ing-fc1',
        topic: 'Linking Words',
        front: 'Qual é a função semântica de "Furthermore" e "Moreover"?',
        back: 'Ambas significam "Além disso" / "Ademais" e têm a função de adicionar novas informações ou argumentos de mesmo sentido ao texto.',
        hint: 'Indica soma / acréscimo de argumentos.'
      },
      {
        id: 'ing-fc2',
        topic: 'Modal Verbs',
        front: 'Qual é a diferença entre "Must" e "Should"?',
        back: '"Must" expressa uma obrigação forte ou dedução lógica irrefutável ("você deve/tem que"). "Should" expressa um conselho, recomendação ou sugestão ("você deveria").',
        hint: 'Obrigação imperativa vs Conselho amigável.'
      },
      {
        id: 'ing-fc3',
        topic: 'Verb Tenses',
        front: 'Quando usar Present Perfect (have/has + particípio) em vez de Simple Past?',
        back: 'Simple Past: tempo no passado pontual e determinado (yesterday, in 2020, two years ago). Present Perfect: ação ocorrida em tempo indeterminado ou ação que começou no passado e ainda repercute/continua no presente (I have studied here for 3 years).',
        hint: 'Tempo específico (Past Simple) vs Tempo indeterminado/relevante agora (Present Perfect).'
      },
      {
        id: 'ing-fc4',
        topic: 'Conditionals (If Clauses)',
        front: 'Qual a estrutura do First vs Second Conditional?',
        back: 'First Conditional (Provável no futuro): If + Present Simple, will + verbo base ("If you study, you will pass").\nSecond Conditional (Hipótese improvável/imaginária): If + Past Simple, would + verbo base ("If I had a million dollars, I would travel").',
        hint: '1st = If + present -> will | 2nd = If + past -> would.'
      },
      {
        id: 'ing-fc5',
        topic: 'False Friends (Falsos Cognatos)',
        front: 'O que significam "Parents", "Pretend", "Actually" e "Notice"?',
        back: 'Parents = Pais (pai e mãe, não parentes -> relatives).\nPretend = Fingir (não pretender -> intend).\nActually = Na verdade / realmente (não atualmente -> currently).\nNotice = Notar / perceber (não notícia -> news).',
        hint: 'Parents = pais; Pretend = fingir; Actually = na verdade.'
      }
    ]
  },
  {
    id: 'matematica',
    name: 'Matemática',
    category: 'Matemática',
    description: 'Cálculo, raciocínio lógico-quantitativo, funções, geometria, estatística e probabilidade.',
    highSchoolFocus: 'Funções de 1º e 2º Grau, Geometria Plana e Espacial, Análise Combinatória, Probabilidade e Matemática Financeira.',
    recommendedTopics: ['Funções Afim e Quadrática', 'Trigonometria', 'Geometria Espacial (Volumes)', 'Análise Combinatória', 'Estatística (Média, Moda e Mediana)'],
    animal: {
      name: 'Onça-pintada',
      species: 'Onça-pintada',
      scientificName: 'Panthera onca',
      habitat: 'Matas ciliares e florestas densas de todo o território brasileiro',
      funFact: 'A onça-pintada tem a mordida proporcionalmente mais poderosa entre todos os grandes felinos da Terra e calcula saltos com precisão trigonométrica absoluta!',
      personality: 'Líder da Floresta do Saber, preciso, motivador e apaixonado por padrões e lógica.',
      greetingMessage: 'Roar! Bem-vindo à minha área de maestria! Sou a Onça-Pintada, guardiã da Floresta do Saber. Aqui, nenhuma equação de segundo grau ou cálculo de volume vai escapar do nosso salto certeiro!',
      tipQuote: 'Na matemática do ENEM, a regra de ouro é: desenhe a situação e organize os dados em uma tabela antes de sair fazendo contas!',
      avatarIcon: 'trophy',
      illustrationUrl: oncaMatematicaImg,
      themeColor: 'from-yellow-500 to-amber-600',
      accentColor: 'text-amber-900 bg-amber-100 dark:bg-amber-950/40 dark:text-amber-300',
      bgGradient: 'bg-gradient-to-br from-yellow-50 via-amber-50/40 to-orange-100/50 dark:from-yellow-950/20 dark:to-amber-950/20'
    },
    videoLessons: [
      {
        id: 'mat-1',
        title: 'Função do Primeiro Grau (Função Afim): Conceitos e Gráficos',
        duration: '20 min',
        topic: 'Álgebra e Funções',
        channel: 'Professor Ferretto',
        youtubeId: 'hdMFlAv5GkU',
        summary: [
          'Função Afim f(x) = ax + b: coeficiente angular (taxa de variação) e linear (corte no eixo y).',
          'Função Quadrática f(x) = ax² + bx + c: raízes (Bhaskara) e Vértice da parábola (Xv = -b/2a, Yv = -Δ/4a) para pontos de máximo e mínimo.',
          'Problemas de otimização de lucro e trajetórias balísticas.'
        ],
        keyTerms: [
          { term: 'Vértice da Parábola', definition: 'Ponto de máximo (se a < 0) ou ponto de mínimo (se a > 0) na função quadrática.' },
          { term: 'Coeficiente Angular (a)', definition: 'Indica a inclinação da reta (se a > 0 função crescente, se a < 0 decrescente).' }
        ],
        xpReward: 90
      },
      {
        id: 'mat-2',
        title: 'Geometria Espacial: Cilindros e Prismas no ENEM',
        duration: '24 min',
        topic: 'Geometria Espacial',
        channel: 'Professor Ferretto',
        youtubeId: 'DR2WZkAQmG4',
        summary: [
          'Cálculo de volume de prismas e cilindros: Volume = Área da Base x Altura (V = Ab * h).',
          'Volume de pirâmides e cones: Volume = (Área da Base x Altura) / 3.',
          'Conversão prática de volumes: 1 m³ = 1.000 Litros, 1 cm³ = 1 mL.'
        ],
        keyTerms: [
          { term: 'Volume do Cilindro', definition: 'V = π * r² * h' },
          { term: 'Capacidade', definition: '1 decímetro cúbico (dm³) equivale exatamente a 1 Litro.' }
        ],
        xpReward: 85
      },
      {
        id: 'mat-3',
        title: 'Estatística no ENEM: Média, Moda e Mediana',
        duration: '16 min',
        topic: 'Estatística',
        channel: 'Professor Ferretto',
        youtubeId: '2KjlM-5FVqA',
        summary: [
          'Média Aritmética simples e ponderada.',
          'Mediana: o valor central dos dados ordenados em rol.',
          'Moda (o valor mais frequente) e Desvio Padrão (medida de dispersão e regularidade).'
        ],
        keyTerms: [
          { term: 'Mediana', definition: 'Valor que divide o conjunto de dados ordenados exatamente ao meio.' },
          { term: 'Desvio Padrão', definition: 'Indica o quão homogêneo ou disperso é um conjunto de dados em relação à média.' }
        ],
        xpReward: 70
      }
    ],
    quizzes: [
      {
        id: 'mat-q1',
        question: 'Uma caixa d’água em formato de cilindro circular reto possui raio da base igual a 2 metros e altura de 3 metros. Considerando π = 3, qual é a capacidade máxima de água dessa caixa em litros?',
        options: [
          { id: 'a', text: '12.000 litros' },
          { id: 'b', text: '18.000 litros' },
          { id: 'c', text: '36.000 litros' },
          { id: 'd', text: '72.000 litros' }
        ],
        correctOptionId: 'c',
        explanation: 'Volume = π * r² * h = 3 * (2²) * 3 = 3 * 4 * 3 = 36 m³. Como 1 m³ = 1.000 litros, a capacidade é 36 * 1.000 = 36.000 litros.',
        difficulty: 'Médio',
        yearSource: 'ENEM / Matemática'
      },
      {
        id: 'mat-q2',
        question: 'O lucro L (em milhares de reais) de uma pequena empresa florestal é dado pela função quadrática L(x) = -x² + 8x - 7, onde x é a quantidade de lotes vendidos. Qual é o lucro máximo que essa empresa pode obter?',
        options: [
          { id: 'a', text: 'R$ 4.000' },
          { id: 'b', text: 'R$ 8.000' },
          { id: 'c', text: 'R$ 9.000' },
          { id: 'd', text: 'R$ 16.000' }
        ],
        correctOptionId: 'c',
        explanation: 'O lucro máximo ocorre no Y do vértice: Yv = -Δ / (4a). Δ = b² - 4ac = 8² - 4(-1)(-7) = 64 - 28 = 36. Logo Yv = -36 / (4 * (-1)) = -36 / -4 = 9 milhares de reais = R$ 9.000.',
        difficulty: 'Médio'
      },
      {
        id: 'mat-q3',
        question: 'Ao lançar dois dados comuns de 6 faces simultaneamente, qual é a probabilidade de a soma dos números obtidos ser igual a 7?',
        options: [
          { id: 'a', text: '1/6' },
          { id: 'b', text: '1/12' },
          { id: 'c', text: '7/36' },
          { id: 'd', text: '1/4' }
        ],
        correctOptionId: 'a',
        explanation: 'O espaço amostral tem 6 x 6 = 36 resultados. Os pares que somam 7 são: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) — totalizando 6 casos favoráveis. Probabilidade = 6/36 = 1/6.',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-q4',
        difficulty: 'Médio',
        yearSource: 'ENEM 2023',
        context: 'O preço de uma mercadoria sofreu um aumento de 20% no mês de janeiro. No mês de fevereiro, devido a uma promoção de queima de estoque, o novo preço sofreu um desconto de 20%.',
        question: 'Em relação ao preço original antes do primeiro aumento, o preço final do produto após o desconto:',
        options: [
          { id: 'a', text: 'Permaneceu exatamente o mesmo.' },
          { id: 'b', text: 'Ficou 4% mais barato que o preço original.' },
          { id: 'c', text: 'Ficou 2% mais caro que o preço original.' },
          { id: 'd', text: 'Ficou 4% mais caro que o preço original.' },
          { id: 'e', text: 'Ficou 10% mais barato que o preço original.' }
        ],
        correctOptionId: 'b',
        explanation: 'Multiplicando os fatores de correção: Fator de aumento de 20% = 1,20. Fator de desconto de 20% = 0,80. Fator final acumulado = 1,20 * 0,80 = 0,96 (ou seja, 96% do preço original, representando uma redução real de 4%).'
      },
      {
        id: 'mat-q5',
        difficulty: 'Médio',
        yearSource: 'ENEM 2022',
        context: 'Um observador situado a 30 metros de distância horizontal da base de uma árvore na floresta avista o topo da copa sob um ângulo de elevação de 30°. Desprezando a altura do observador e considerando √3 ≅ 1,73.',
        question: 'Qual é a altura aproximada dessa árvore?',
        options: [
          { id: 'a', text: '15,0 metros' },
          { id: 'b', text: '17,3 metros' },
          { id: 'c', text: '25,5 metros' },
          { id: 'd', text: '30,0 metros' },
          { id: 'e', text: '51,9 metros' }
        ],
        correctOptionId: 'b',
        explanation: 'No triângulo retângulo: tg(30°) = Cateto Oposto / Cateto Adjacente -> (√3/3) = H / 30 -> H = 30 * (√3/3) = 10 * √3 = 10 * 1,73 = 17,3 metros.'
      },
      {
        id: 'mat-q6',
        difficulty: 'Difícil',
        yearSource: 'ENEM 2024 / Combinatória',
        context: 'Uma equipe de biólogos da floresta é composta por 5 botânicos e 4 zoólogos. Para uma expedição científica de campo, deve-se formar uma comissão de 4 membros, com a condição obrigatória de que haja pelo menos 2 zoólogos na comissão.',
        question: 'Quantas comissões distintas podem ser formadas atendendo a essa exigência?',
        options: [
          { id: 'a', text: '60 comissões' },
          { id: 'b', text: '81 comissões' },
          { id: 'c', text: '105 comissões' },
          { id: 'd', text: '126 comissões' },
          { id: 'e', text: '210 comissões' }
        ],
        correctOptionId: 'b',
        explanation: 'Casos possíveis:\n1) 2 zoólogos e 2 botânicos: C(4,2) * C(5,2) = 6 * 10 = 60.\n2) 3 zoólogos e 1 botânico: C(4,3) * C(5,1) = 4 * 5 = 20.\n3) 4 zoólogos e 0 botânicos: C(4,4) * C(5,0) = 1 * 1 = 1.\nTotal = 60 + 20 + 1 = 81 comissões distintas.'
      },
      {
        id: 'mat-q7',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Geometria Espacial',
        context: 'Um reservatório de água possui a forma de uma pirâmide regular de base quadrada de lado 6 metros e altura 4 metros. Durante uma estiagem, o nível da água atinge a metade da altura da pirâmide (2 metros a partir do vértice invertido).',
        question: 'Qual é a fração do volume total do reservatório que está ocupada pela água nesse momento?',
        options: [
          { id: 'a', text: '1/2 do volume total' },
          { id: 'b', text: '1/4 do volume total' },
          { id: 'c', text: '1/8 do volume total' },
          { id: 'd', text: '1/16 do volume total' },
          { id: 'e', text: '3/8 do volume total' }
        ],
        correctOptionId: 'c',
        explanation: 'Pela razão de semelhança entre sólidos: a razão entre as alturas é k = h / H = 2 / 4 = 1/2. Como o volume é proporcional ao cubo da razão linear de semelhança, temos: v / V = k³ = (1/2)³ = 1/8. Portanto, o volume de água representa 1/8 do volume total.'
      },
      {
        id: 'mat-q8',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Estatística',
        context: 'As notas de um estudante do 3º ano do Ensino Médio em 5 simulados de matemática foram: 640, 720, 800, 800 e 840.',
        question: 'A média aritmética e a mediana dessas 5 notas são, respectivamente:',
        options: [
          { id: 'a', text: '760 e 800' },
          { id: 'b', text: '780 e 720' },
          { id: 'c', text: '800 e 800' },
          { id: 'd', text: '760 e 720' },
          { id: 'e', text: '750 e 800' }
        ],
        correctOptionId: 'a',
        explanation: 'Média = (640 + 720 + 800 + 800 + 840) / 5 = 3800 / 5 = 760. Como o rol já está ordenado com 5 elementos ímpares, a mediana é o termo central (3º termo) = 800.'
      },
      {
        id: 'mat-q9',
        difficulty: 'Médio',
        yearSource: 'ENEM / Progressão Aritmética',
        context: 'Para se preparar para o ENEM, uma estudante decidiu resolver 15 exercícios na primeira semana e aumentar essa meta em 5 exercícios a cada nova semana (20 na 2ª, 25 na 3ª, e assim por diante).',
        question: 'Quantos exercícios ela resolverá apenas na 10ª semana de preparação?',
        options: [
          { id: 'a', text: '60 exercícios' },
          { id: 'b', text: '50 exercícios' },
          { id: 'c', text: '65 exercícios' },
          { id: 'd', text: '55 exercícios' },
          { id: 'e', text: '75 exercícios' }
        ],
        correctOptionId: 'a',
        explanation: 'Trata-se de uma PA com a₁ = 15 e razão r = 5. Pelo termo geral aₙ = a₁ + (n - 1)·r, temos a₁₀ = 15 + (10 - 1)·5 = 15 + 45 = 60 exercícios.'
      },
      {
        id: 'mat-q10',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Matemática Financeira',
        context: 'Um capital inicial de R$ 2.000,00 foi aplicado a juros compostos com taxa de 10% ao mês durante 2 meses, sem aportes adicionais.',
        question: 'Qual será o montante final acumulado ao término dos 2 meses?',
        options: [
          { id: 'a', text: 'R$ 2.420,00' },
          { id: 'b', text: 'R$ 2.400,00' },
          { id: 'c', text: 'R$ 2.200,00' },
          { id: 'd', text: 'R$ 2.440,00' },
          { id: 'e', text: 'R$ 2.662,00' }
        ],
        correctOptionId: 'a',
        explanation: 'Em juros compostos: M = C · (1 + i)ᵗ = 2000 · (1 + 0,10)² = 2000 · (1,10)² = 2000 · 1,21 = R$ 2.420,00 (note que juros simples dariam R$ 2.400,00).'
      }
    ],
    flashcards: [
      {
        id: 'mat-fc1',
        topic: 'Álgebra',
        front: 'Como encontrar as coordenadas do vértice de uma parábola f(x) = ax² + bx + c?',
        back: 'Xv = -b / (2a) e Yv = -Δ / (4a), onde Δ = b² - 4ac. O Xv indica o ponto onde ocorre o valor extremo e Yv é o próprio valor máximo ou mínimo.',
        hint: 'Xv = -b/2a | Yv = -Δ/4a'
      },
      {
        id: 'mat-fc2',
        topic: 'Combinatória',
        front: 'Quando usar Combinação Simples e quando usar Arranjo Simples?',
        back: 'Se a ordem dos elementos no grupo NÃO importa (ex: formar comissões, escolher sabores de sorvete), usa-se Combinação. Se a ordem IMPORTA (ex: senhas, pódio de 1º, 2º e 3º lugares), usa-se Arranjo.',
        hint: 'Ordem importa? Sim -> Arranjo. Não -> Combinação.'
      },
      {
        id: 'mat-fc3',
        topic: 'Matemática Financeira',
        front: 'Como calcular aumentos e descontos percentuais sucessivos?',
        back: 'Nunca some as porcentagens! Multiplique os fatores: aumento de i% usa fator (1 + i/100) e desconto de i% usa (1 - i/100). Exemplo: aumento de 10% seguido de aumento de 20% = 1,10 * 1,20 = 1,32 (aumento total de 32%, e não 30%).',
        hint: 'Multiplique os fatores (1 + taxa) ou (1 - taxa).'
      },
      {
        id: 'mat-fc4',
        topic: 'Trigonometria Básica',
        front: 'Quais são as razões trigonométricas no triângulo retângulo?',
        back: 'Seno (sen) = Cateto Oposto / Hipotenusa.\nCosseno (cos) = Cateto Adjacente / Hipotenusa.\nTangente (tg) = Cateto Oposto / Cateto Adjacente.\nMnemônico clássico: SOH-CAH-TOA.',
        hint: 'SOH CAH TOA (Sen=CO/Hip, Cos=CA/Hip, Tg=CO/CA).'
      },
      {
        id: 'mat-fc5',
        topic: 'Estatística',
        front: 'Qual a diferença entre Média, Mediana e Moda?',
        back: 'Média: soma de todos os valores dividida pela quantidade de elementos.\nMediana: o valor que divide exatamente ao meio uma sequência ordenada (rol).\nModa: o valor (ou valores) que aparece com maior frequência no conjunto de dados.',
        hint: 'Média = soma/n | Mediana = centro do rol | Moda = mais frequente.'
      }
    ]
  },
  {
    id: 'portugues',
    name: 'Português',
    category: 'Linguagens',
    description: 'Língua Portuguesa, análise sintática, figuras de linguagem, literatura brasileira e produção textual nota 1000.',
    highSchoolFocus: 'Redação ENEM (Estrutura dissertativo-argumentativa e Proposta de Intervenção), Funções da Linguagem, Sintaxe e Modernismo.',
    recommendedTopics: ['Proposta de Intervenção na Redação', 'Figuras de Linguagem', 'Concordância Verbal & Nominal', 'Modernismo no Brasil (Semana de 22)', 'Crase'],
    animal: {
      name: 'Quati',
      species: 'Quati-de-cauda-anelada',
      scientificName: 'Nasua nasua',
      habitat: 'Florestas tropicais, movendo-se ágil tanto no solo quanto no alto das árvores',
      funFact: 'O quati tem um olfato supersensível e fuça com curiosidade incansável em cada cantinho, farejando pistas e detalhes minuciosos!',
      personality: 'Sociável, leitor voraz, farejador de erros gramaticais e mestre em argumentação.',
      greetingMessage: 'Olá! Sou o Quati. Meu focinho afiado fareja qualquer desvio de concordância ou falha na coesão textual a quilômetros! Vamos construir redações nota 1000 juntos!',
      tipQuote: 'Na redação do ENEM, sua proposta de intervenção PRECISA dos 5 elementos: Agente, Ação, Meio/Modo, Efeito e Detalhamento!',
      avatarIcon: 'pencil',
      illustrationUrl: quatiImg,
      themeColor: 'from-red-500 to-rose-600',
      accentColor: 'text-rose-800 bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300',
      bgGradient: 'bg-gradient-to-br from-rose-50 via-red-50/40 to-orange-100/40 dark:from-rose-950/20 dark:to-red-950/20'
    },
    videoLessons: [
      {
        id: 'por-1',
        title: 'Redação ENEM Nota 1000: Proposta de Intervenção Completa',
        duration: '19 min',
        topic: 'Redação',
        channel: 'Professor Noslen',
        youtubeId: '1mlMoLJpZmM',
        summary: [
          'Competência 5 do ENEM: elaboração da proposta de intervenção para o problema abordado.',
          'Os 5 elementos obrigatórios: 1. Agente (Quem?), 2. Ação (O que fará?), 3. Modo/Meio (Como?), 4. Efeito (Para quê?), 5. Detalhamento.',
          'Respeito irrestrito aos Direitos Humanos e aplicabilidade prática.'
        ],
        keyTerms: [
          { term: 'Proposta de Intervenção', definition: 'Solução viável, detalhada e articulada ao tema apresentada no parágrafo conclusivo da dissertação.' },
          { term: 'Coesão Referencial', definition: 'Uso de pronomes, sinônimos e elipses para retomar termos sem repetição excessiva de palavras.' }
        ],
        xpReward: 85
      },
      {
        id: 'por-2',
        title: 'Aprenda Figuras de Linguagem de uma vez por todas!',
        duration: '15 min',
        topic: 'Linguística & Literatura',
        channel: 'Professor Noslen',
        youtubeId: 'n0e75nRstcU',
        summary: [
          'Metáfora vs Comparação explícita.',
          'Metonímia (o autor pela obra, a parte pelo todo).',
          'Antítese vs Paradoxo (ideias opostas vs contradição inconciliável) e Ironia.'
        ],
        keyTerms: [
          { term: 'Paradoxo', definition: 'Fusão de conceitos opostos que geram uma contradição de sentido aparente (ex: "amor é fogo que arde sem se ver").' },
          { term: 'Eufemismo', definition: 'Suavização de uma expressão desagradável ou pesada.' }
        ],
        xpReward: 65
      }
    ],
    quizzes: [
      {
        id: 'por-q1',
        question: 'Assinale a alternativa que apresenta corretamente o uso da CRASE segundo a norma culta da língua portuguesa:',
        options: [
          { id: 'a', text: 'Entregamos o documento à todos os participantes.' },
          { id: 'b', text: 'Fui à uma reunião muito importante hoje cedo.' },
          { id: 'c', text: 'Os estudantes foram à feira de ciências da floresta.' },
          { id: 'd', text: 'Ele começou à estudar assim que o sol nasceu.' }
        ],
        correctOptionId: 'c',
        explanation: 'A crase é a fusão da preposição "a" exigida pelo verbo "ir" (foram a) com o artigo feminino "a" que antecede "feira" (a feira). Nunca ocorre crase antes de palavras masculinas, pronomes indefinidos ("todos"), artigos indefinidos ("uma") ou verbos no infinitivo ("estudar").',
        difficulty: 'Médio',
        yearSource: 'ENEM / Português'
      },
      {
        id: 'por-q2',
        question: 'Na famosa frase de Guimarães Rosa: "O animal que se fez gente, o homem que se fez árvore", a figura de linguagem predominante pela contraposição de termos opostos em harmonia é:',
        options: [
          { id: 'a', text: 'Antítese' },
          { id: 'b', text: 'Pleonasmo' },
          { id: 'c', text: 'Hiperbato' },
          { id: 'd', text: 'Onomatopeia' }
        ],
        correctOptionId: 'a',
        explanation: 'A antítese é a aproximação de palavras ou pensamentos com sentidos contrários para enfatizar a expressividade do texto.',
        difficulty: 'Fácil'
      },
      {
        id: 'por-q3',
        difficulty: 'Médio',
        yearSource: 'ENEM 2023',
        context: 'Observe as frases quanto à concordância verbal da partícula "se":\nI. "Alugam-se salas comerciais no centro."\nII. "Precisa-se de novos professores de redação."',
        question: 'Assinale a alternativa que classifica correta e respectivamente a função da partícula "se" e a justificativa sintática:',
        options: [
          { id: 'a', text: 'Em I "se" é pronome apassivador (sujeito paciente "salas"); em II é índice de indeterminação do sujeito (verbo no singular).' },
          { id: 'b', text: 'Em I e II a partícula "se" é pronome reflexivo recíproco.' },
          { id: 'c', text: 'Em I o sujeito é indeterminado e em II o sujeito é composto oculto.' },
          { id: 'd', text: 'Ambas as frases estão em desacordo com a norma culta por falta de plural no verbo precisar.' },
          { id: 'e', text: 'Em I "se" é conjunção condicional subordinativa.' }
        ],
        correctOptionId: 'a',
        explanation: 'Com Verbo Transitivo Direto (alugar), "se" é pronome apassivador: "salas comerciais" é sujeito paciente, logo o verbo vai ao plural. Com Verbo Transitivo Indireto (precisar de), "se" é índice de indeterminação do sujeito, mantendo o verbo obrigatoriamente no singular (3ª pessoa).'
      },
      {
        id: 'por-q4',
        difficulty: 'Fácil',
        yearSource: 'ENEM 2022',
        context: 'Em uma campanha publicitária de vacinação infantil, lê-se o slogan: "Proteja quem você ama: leve seu filho ao posto de saúde neste sábado!".',
        question: 'A função da linguagem predominante nesse anúncio de utilidade pública é a:',
        options: [
          { id: 'a', text: 'Função Conativa (ou Apelativa), focada em persuadir e orientar o comportamento do receptor.' },
          { id: 'b', text: 'Função Metalinguística, que discute o significado das palavras do dicionário.' },
          { id: 'c', text: 'Função Fática, que busca apenas verificar a conexão do canal de áudio.' },
          { id: 'd', text: 'Função Emotiva, centrada no desabafo subjetivo do autor.' },
          { id: 'e', text: 'Função Poética formal parnasiana.' }
        ],
        correctOptionId: 'a',
        explanation: 'A função conativa/apelativa centra-se no destinatário/receptor, caracterizando-se pelo uso de verbos no modo imperativo ("proteja", "leve") e pronomes de 2ª pessoa para convencer e engajar o público-alvo.'
      },
      {
        id: 'por-q5',
        difficulty: 'Médio',
        yearSource: 'ENEM 2021',
        context: 'Na linguística moderna, o conceito de variação linguística reconhece que a língua se transforma de acordo com a região geográfica, o grupo social, o contexto situacional e a época histórica.',
        question: 'Diante das variações linguísticas, a atitude sociolinguística cientificamente correta é:',
        options: [
          { id: 'a', text: 'Considerar as variedades regionais ou populares como erros gramaticais inferiores.' },
          { id: 'b', text: 'Compreender que toda variedade possui lógica interna própria e que o falante deve adequar o registro ao contexto formal ou informal.' },
          { id: 'c', text: 'Exigir o uso de gírias e coloquialismos em documentos oficiais e leis.' },
          { id: 'd', text: 'Impedir qualquer neologismo ou empréstimo linguístico estrangeiro.' },
          { id: 'e', text: 'Substituir a norma padrão pelo dialeto arcaico quinhentista.' }
        ],
        correctOptionId: 'b',
        explanation: 'A sociolinguística combate o preconceito linguístico demonstrando que não há variedade "superior" ou "inferior", mas sim adequação contextual: em redações e concursos usa-se a norma-padrão; em conversas cotidianas, o registro coloquial.'
      },
      {
        id: 'por-q6',
        difficulty: 'Difícil',
        yearSource: 'ENEM 2024 / Literatura',
        context: 'No romance "Memórias Póstumas de Brás Cubas", de Machado de Assis, o narrador defunto dedica sua obra: "Ao verme que primeiro roeu as frias carnes do meu cadáver dedico como saudosa lembrança estas memórias póstumas".',
        question: 'O efeito discursivo gerado por essa dedicatória inaugural caracteriza-se principalmente por:',
        options: [
          { id: 'a', text: 'Ironia e desconstrução cáustica do idealismo romântico, invertendo a expectativa convencional de homenagem afetuosa.' },
          { id: 'b', text: 'Pessimismo patológico desprovido de qualquer crítica às hipocrisias da elite brasileira.' },
          { id: 'c', text: 'Homenagem literal à fauna de decompositores sem duplo sentido estilístico.' },
          { id: 'd', text: 'Adesão formal ao ufanismo nacionalista do Romantismo indianista.' },
          { id: 'e', text: 'Uso de linguagem conativa direcionada a orientar moralmente os jovens da corte.' }
        ],
        correctOptionId: 'a',
        explanation: 'Machado de Assis inaugura o Realismo brasileiro (1881) utilizando a ironia fina e o sarcasmo do narrador-defunto para desmistificar a vaidade humana e ridicularizar as convenções burguesas da sociedade imperial.'
      },
      {
        id: 'por-q7',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Redação Nota 1000',
        context: 'A Competência 5 da Matriz de Referência do ENEM avalia a capacidade do candidato de elaborar proposta de intervenção para a problemática abordada, respeitando os direitos humanos e contendo 5 elementos constitutivos.',
        question: 'Assinale a opção em que a proposta de intervenção possui os CINCO elementos válidos e articulados:',
        options: [
          { id: 'a', text: 'O Governo Federal deve criar novas leis mais rígidas para punir criminosos cibernéticos e assim resolver o problema no país.' },
          { id: 'b', text: 'Portanto, cabe ao Ministério da Educação (Agente), em parceria com as Secretarias Estaduais (Detalhamento do agente), implementar oficinas semanais de letramento digital no Ensino Médio (Ação), por meio de verbas do Fundo Nacional de Desenvolvimento da Educação (Meio/Modo), a fim de capacitar criticamente os jovens contra a desinformação (Efeito).' },
          { id: 'c', text: 'A sociedade civil precisa se conscientizar de que a leitura é fundamental para todos os cidadãos em nossa época.' },
          { id: 'd', text: 'É necessário que as famílias conversem mais com seus filhos sobre redes sociais para que o Brasil melhore no futuro.' },
          { id: 'e', text: 'As ONGs devem fazer palestras nas praças públicas com a ajuda de voluntários dedicados à causa.' }
        ],
        correctOptionId: 'b',
        explanation: 'A alternativa B apresenta com clareza exemplar todos os 5 elementos exigidos pelos corretores: Agente (MEC), Detalhamento (em parceria com as Secretarias Estaduais), Ação (implementar oficinas semanais), Meio/Modo (por meio de verbas do FNDE) e Efeito (a fim de capacitar criticamente os jovens).'
      },
      {
        id: 'por-q8',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Coesão Textual',
        context: 'Leia o período: "A onça-pintada e a harpia são predadores de topo na cadeia florestal. Esta domina as copas mais altas; aquela, o chão das matas fechadas."',
        question: 'Os pronomes demonstrativos "Esta" e "aquela" foram empregados com a função coesiva de:',
        options: [
          { id: 'a', text: 'Catáfora, pois antecipam termos que ainda serão citados mais adiante.' },
          { id: 'b', text: 'Anáfora distributiva, onde "esta" retoma o elemento mais próximo (harpia) e "aquela" o mais distante (onça-pintada).' },
          { id: 'c', text: 'Elipse, pois ocultam intencionalmente os sujeitos gramaticais das orações.' },
          { id: 'd', text: 'Ambiguidade viciosa, tornando impossível identificar a qual animal cada pronome se refere.' }
        ],
        correctOptionId: 'b',
        explanation: 'Na norma culta, ao retomar dois elementos citados anteriormente em uma mesma oração, emprega-se "este/esta" para o mais próximo no texto ("harpia") e "aquele/aquela" para o mais distante ("onça-pintada").'
      },
      {
        id: 'por-q9',
        difficulty: 'Médio',
        yearSource: 'ENEM / Literatura Brasileira',
        context: 'Na segunda geração modernista (1930-1945), o romance regionalista nordestino ganhou destaque com obras como "Vidas Secas" (Graciliano Ramos) e "O Quinze" (Rachel de Queiroz).',
        question: 'Qual traço temático e estilístico marca profundamente o Romance de 30?',
        options: [
          { id: 'a', text: 'A denúncia social realista da seca, do latifúndio, da miséria e dos conflitos humanos no sertão, com linguagem enxuta e crítica.' },
          { id: 'b', text: 'A idealização romântica do cavaleiro medieval europeu em palácios.' },
          { id: 'c', text: 'O culto parnasiano exclusivo à métrica perfeita sem engajamento social.' },
          { id: 'd', text: 'A evasão simbolista para mundos oníricos completamente desligados do Brasil.' },
          { id: 'e', text: 'A apologia irrestrita da escravidão colonial.' }
        ],
        correctOptionId: 'a',
        explanation: 'A prosa regionalista da Geração de 30 abandonou os exageros experimentais da primeira fase para mergulhar nas tensões sociais e econômicas do Brasil real, especialmente no Nordeste.'
      },
      {
        id: 'por-q10',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Concordância Verbal',
        context: 'Observe as frases: (I) Fazem três anos que estudo nesta escola. (II) Alugam-se casas na beira do rio. (III) Houveram muitos aplausos após o debate.',
        question: 'Segundo a norma padrão da Língua Portuguesa, qual avaliação está CORRETA sobre as três frases?',
        options: [
          { id: 'a', text: 'Apenas a frase II está correta ("casas" é sujeito paciente de "alugam-se"); em I e III os verbos "fazer" (tempo decorrido) e "haver" (existir) são impessoais e ficam no singular ("Faz", "Houve").' },
          { id: 'b', text: 'Todas as três frases estão rigorosamente corretas segundo a gramática normativa.' },
          { id: 'c', text: 'Apenas a frase I está correta, pois "três anos" obriga o verbo fazer a ir para o plural.' },
          { id: 'd', text: 'Apenas a frase III está correta, pois "muitos aplausos" flexiona o verbo haver.' },
          { id: 'e', text: 'Na frase II, o correto obrigatório é "Aluga-se casas" porque o sujeito é indeterminado.' }
        ],
        correctOptionId: 'a',
        explanation: '"Fazer" indicando tempo decorrido e "haver" no sentido de existir são verbos impessoais (ficam na 3ª pessoa do singular: "Faz três anos", "Houve muitos aplausos"). Já em "Alugam-se casas" (VTD + partícula apassivadora "se"), "casas" é o sujeito paciente plural ("Casas são alugadas"), exigindo "alugam-se".'
      }
    ],
    flashcards: [
      {
        id: 'por-fc1',
        topic: 'Gramática',
        front: 'Quais são os 5 elementos indispensáveis na Proposta de Intervenção do ENEM (Competência 5)?',
        back: '1. Agente (Quem executará?)\n2. Ação (O que será feito?)\n3. Meio / Modo (Por intermédio de quê?)\n4. Efeito (Com qual objetivo final?)\n5. Detalhamento (Explicação extra de um dos elementos).',
        hint: 'Quem? O quê? Como? Para quê? + Detalhe.'
      },
      {
        id: 'por-fc2',
        topic: 'Literatura',
        front: 'Qual foi o marco inicial e o objetivo principal do Modernismo no Brasil em 1922?',
        back: 'A Semana de Arte Moderna de 1922 no Theatro Municipal de SP, que buscava romper com o academicismo parnasiano europeu e construir uma identidade artística genuinamente brasileira (Antropofagia).',
        hint: 'Semana de Arte Moderna no Theatro Municipal de SP.'
      },
      {
        id: 'por-fc3',
        topic: 'Comunicação & Linguagem',
        front: 'Quais são as 6 Funções da Linguagem de Roman Jakobson?',
        back: '1. Referencial (foco na informação/mensagem objetiva)\n2. Emotiva/Expressiva (foco no emissor/sentimentos)\n3. Conativa/Apelativa (foco no receptor/imperativos)\n4. Metalinguística (foco no próprio código/dicionário)\n5. Fática (foco no canal/teste de contato: "alô?")\n6. Poética (foco na estética e ritmo da mensagem).',
        hint: 'Emissor, Receptor, Mensagem, Código, Canal, Contexto.'
      },
      {
        id: 'por-fc4',
        topic: 'Sintaxe & Concordância',
        front: 'Como diferenciar "SE" Apassivador de "SE" Índice de Indeterminação?',
        back: 'VTD + SE = Pronome Apassivador. O verbo concorda com o sujeito paciente no singular ou plural ("Vendem-se casas").\nVTI / VI + SE = Índice de Indeterminação do Sujeito. Não admite plural; o verbo fica fixo na 3ª pessoa do singular ("Precisa-se de serventes").',
        hint: 'VTD flexiona no plural com o sujeito; VTI fica sempre no singular.'
      },
      {
        id: 'por-fc5',
        topic: 'Coesão Textual',
        front: 'O que é Coesão Anafórica e Coesão Catafórica na Redação?',
        back: 'Coesão Anafórica: retoma um termo ou ideia mencionada anteriormente no texto (ex: "O desmatamento cresceu; esse problema requer atenção").\nCoesão Catafórica: antecipa um elemento que será explicitado a seguir (ex: "A solução é esta: reflorestamento urgente").',
        hint: 'Anáfora olha para trás no texto; Catáfora olha para frente.'
      }
    ]
  },
  {
    id: 'quimica',
    name: 'Química',
    category: 'Ciências da Natureza',
    description: 'Transformações da matéria, ligações químicas, estequiometria, termoquímica e química orgânica.',
    highSchoolFocus: 'Estequiometria, Funções Orgânicas, Eletroquímica (Pilhas e Eletrólise), Soluções e Equilíbrio Químico.',
    recommendedTopics: ['Cálculo Estequiométrico', 'Funções Orgânicas Oxigenadas', 'Pilhas & Potencial de Redução', 'pH e Equilíbrio Químico', 'Ligações Químicas'],
    animal: {
      name: 'Tartaruga-da-Amazônia',
      species: 'Tartaruga-da-Amazônia',
      scientificName: 'Podocnemis expansa',
      habitat: 'Grandes bacias hidrográficas e bancos de areia dos rios amazônicos',
      funFact: 'A casca óssea da tartaruga é um composto biológico complexo formado por queratina e fosfato de cálcio com resistência estrutural impressionante!',
      personality: 'Paciente, metódica, equilibrada e perita em reações químicas em equilíbrio.',
      greetingMessage: 'Saudações fluviais! Sou a Tartaruga-da-Amazônia. Na química, assim como nos rios da floresta, nada se perde, tudo se transforma! Vamos balancear cada equação com calma e precisão!',
      tipQuote: 'Para acertar estequiometria: 1º Escreva a reação, 2º Balanceie os coeficientes, 3º Monte a proporção em mols e converta para gramas se necessário!',
      avatarIcon: 'atom',
      illustrationUrl: tartarugaImg,
      themeColor: 'from-teal-500 to-cyan-600',
      accentColor: 'text-teal-800 bg-teal-100 dark:bg-teal-950/40 dark:text-teal-300',
      bgGradient: 'bg-gradient-to-br from-teal-50 via-cyan-50/40 to-emerald-100/40 dark:from-teal-950/20 dark:to-cyan-950/20'
    },
    videoLessons: [
      {
        id: 'qui-1',
        title: 'Estequiometria Passo a Passo para o ENEM',
        duration: '22 min',
        topic: 'Físico-Química',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'YyCgLLyhnc4',
        summary: [
          'Lei de Lavoisier (Conservação das Massas) e Lei de Proust (Proporções Definidas).',
          'Passo a passo do cálculo estequiométrico: proporção molar, massa molar e volume molar de gases na CNTP (22,4 L/mol).',
          'Reagente limitante e em excesso, pureza e rendimento de reações.'
        ],
        keyTerms: [
          { term: 'Massa Molar (M)', definition: 'Massa em gramas presente em 1 mol (6,02 x 10²³ entidades) de uma substância.' },
          { term: 'Reagente Limitante', definition: 'Reagente que é consumido primeiro, determinando a quantidade máxima de produto formado.' }
        ],
        xpReward: 85
      },
      {
        id: 'qui-2',
        title: 'Funções Orgânicas no ENEM: Álcoois, Aldeídos, Cetonas e Ácidos',
        duration: '18 min',
        topic: 'Química Orgânica',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'T93mF9p8EeA',
        summary: [
          'Hidrocarbonetos e grupos funcionais oxigenados.',
          'Diferenciando hidroxila em carbono saturado (Álcool) vs carbonila terminal (Aldeído) vs carbonila entre carbonos (Cetona).',
          'Ácido Carboxílico (-COOH) e reações de esterificação.'
        ],
        keyTerms: [
          { term: 'Carbonila', definition: 'Grupo funcional formado por um átomo de carbono ligado por dupla ligação a um oxigênio (C=O).' },
          { term: 'Esterificação', definition: 'Reação entre um ácido carboxílico e um álcool gerando um éster e água.' }
        ],
        xpReward: 75
      }
    ],
    quizzes: [
      {
        id: 'qui-q1',
        question: 'Dada a reação balanceada de combustão completa do gás metano: CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(v). Queimando-se completamente 32 gramas de metano (Massa molar do CH₄ = 16 g/mol), quantos gramas de CO₂ (Massa molar do CO₂ = 44 g/mol) serão produzidos?',
        options: [
          { id: 'a', text: '44 gramas' },
          { id: 'b', text: '88 gramas' },
          { id: 'c', text: '132 gramas' },
          { id: 'd', text: '176 gramas' }
        ],
        correctOptionId: 'b',
        explanation: '32 g de CH₄ correspondem a 32 / 16 = 2 mols de CH₄. Pela estequiometria 1:1, 2 mols de CH₄ geram 2 mols de CO₂. Massa de CO₂ = 2 mols * 44 g/mol = 88 gramas.',
        difficulty: 'Médio',
        yearSource: 'ENEM / Química'
      },
      {
        id: 'qui-q2',
        question: 'Em uma pilha galvânica tradicional (como a Pilha de Daniell Zinco-Cobre), o ânodo é o polo onde ocorre o processo de:',
        options: [
          { id: 'a', text: 'Oxidação (perda de elétrons), sendo o polo negativo' },
          { id: 'b', text: 'Redução (ganho de elétrons), sendo o polo positivo' },
          { id: 'c', text: 'Aumento de massa do eletrodo' },
          { id: 'd', text: 'Consumo do gás oxigênio' }
        ],
        correctOptionId: 'a',
        explanation: 'Mnemônico "CRAO": Cátodo = Redução | Ânodo = Oxidação. Na pilha, o ânodo sofre oxidação (perde elétrons e corrói) e constitui o polo negativo gerador de elétrons.',
        difficulty: 'Fácil'
      },
      {
        id: 'qui-q3',
        difficulty: 'Médio',
        yearSource: 'ENEM 2023',
        context: 'Considere a reação reversível de síntese da amônia pelo processo Haber-Bosch em fase gasosa:\nN₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)   (ΔH < 0, reação exotérmica).',
        question: 'De acordo com o Princípio de Le Chatelier, qual alteração no sistema provocará um aumento no rendimento de produção de NH₃?',
        options: [
          { id: 'a', text: 'Aumento da temperatura e diminuição da pressão total.' },
          { id: 'b', text: 'Aumento da pressão sobre o sistema e resfriamento moderado da mistura.' },
          { id: 'c', text: 'Adição de um catalisador sólido que desloque o equilíbrio.' },
          { id: 'd', text: 'Remoção contínua dos reagentes N₂ e H₂ do reator.' },
          { id: 'e', text: 'Injeção de gás hélio inerte a volume constante.' }
        ],
        correctOptionId: 'b',
        explanation: 'O aumento de pressão desloca o equilíbrio para o lado com menor número de mols gasosos (4 mols de reagentes -> 2 mols de NH₃). Como a reação direta é exotérmica (ΔH < 0), a diminuição de temperatura favorece o sentido direto exotérmico, maximizando o NH₃.'
      },
      {
        id: 'qui-q4',
        difficulty: 'Médio',
        yearSource: 'ENEM 2022',
        context: 'A água (H₂O, massa molar 18 g/mol) possui ponto de ebulição anormalmente elevado (100 °C) quando comparada ao sulfeto de hidrogênio (H₂S, massa molar 34 g/mol), que é um gás a temperatura ambiente (ponto de ebulição -60 °C).',
        question: 'A explicação físico-química para o elevado ponto de ebulição da água é a existência de:',
        options: [
          { id: 'a', text: 'Ligações covalentes apolares intramoleculares muito fracas.' },
          { id: 'b', text: 'Interações intermoleculares do tipo Ligações de Hidrogênio de alta intensidade entre suas moléculas.' },
          { id: 'c', text: 'Forças de dispersão de London exclusivas de compostos iônicos.' },
          { id: 'd', text: 'Pontes dissulfeto covalentes intermoleculares.' },
          { id: 'e', text: 'Radioatividade natural do oxigênio atmosférico.' }
        ],
        correctOptionId: 'b',
        explanation: 'O oxigênio é altamente eletronegativo. A atração entre o hidrogênio polarizado positivamente de uma molécula e os pares de elétrons do oxigênio de outra forma fortes Ligações de Hidrogênio, exigindo grande quantidade de energia térmica para a vaporização.'
      },
      {
        id: 'qui-q5',
        difficulty: 'Fácil',
        yearSource: 'ENEM 2021',
        context: 'Durante a dissolução de hidróxido de sódio sólido (NaOH) em água em um béquer de laboratório, observa-se que as paredes do recipiente se aquecem consideravelmente.',
        question: 'Esse processo de dissolução com liberação de calor para o meio externo é classificado como:',
        options: [
          { id: 'a', text: 'Exotérmico, com variação de entalpia negativa (ΔH < 0).' },
          { id: 'b', text: 'Endotérmico, com variação de entalpia positiva (ΔH > 0).' },
          { id: 'c', text: 'Isotérmico, com variação de entalpia nula (ΔH = 0).' },
          { id: 'd', text: 'Adiabático reversível sem troca de energia.' },
          { id: 'e', text: 'Sublimação forçada de soluto.' }
        ],
        correctOptionId: 'a',
        explanation: 'Processos que liberam energia térmica para o ambiente (aquecendo a vizinhança) são exotérmicos e apresentam variação de entalpia negativa (ΔH < 0, pois a entalpia final dos produtos é menor que a inicial dos reagentes).'
      },
      {
        id: 'qui-q6',
        difficulty: 'Médio',
        yearSource: 'ENEM / Química Orgânica',
        context: 'O etanol (CH₃CH₂OH) e o éter dimetílico (CH₃OCH₃) possuem exatamente a mesma fórmula molecular C₂H₆O, mas apresentam propriedades físicas e químicas muito distintas.',
        question: 'Qual tipo de isomeria plana existe entre o etanol e o éter dimetílico?',
        options: [
          { id: 'a', text: 'Isomeria de função (funcional), pois pertencem às funções álcool e éter, respectivamente.' },
          { id: 'b', text: 'Isomeria de cadeia ramificada.' },
          { id: 'c', text: 'Isomeria geométrica cis-trans.' },
          { id: 'd', text: 'Tautomeria aldo-enólica exclusivamente iônica.' },
          { id: 'e', text: 'Alotropia de carbono puro.' }
        ],
        correctOptionId: 'a',
        explanation: 'Compostos com mesma fórmula molecular mas grupos funcionais diferentes (álcool -OH vs. éter -O- entre carbonos) são isômeros de função.'
      },
      {
        id: 'qui-q7',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Soluções & pH',
        context: 'Em uma análise da qualidade da água de um rio amazônico a 25 °C, o medidor eletrônico indicou pH = 5,0 após chuvas ácidas locais.',
        question: 'Em comparação com uma amostra de água neutra (pH = 7,0), o que indica pH = 5,0?',
        options: [
          { id: 'a', text: 'Meio ácido, com concentração de íons H⁺ 100 vezes maior que na água neutra.' },
          { id: 'b', text: 'Meio fortemente básico (alcalino), com excesso de íons OH⁻.' },
          { id: 'c', text: 'Meio ácido apenas 2 vezes mais concentrado em H⁺ que o pH 7,0.' },
          { id: 'd', text: 'Ausência completa de íons hidrônio em solução aquosa.' },
          { id: 'e', text: 'Solução tampão básica acima de pOH = 14.' }
        ],
        correctOptionId: 'a',
        explanation: 'A escala de pH é logarítmica de base 10 (pH = -log[H⁺]). Uma redução de 2 unidades no pH (de 7 para 5) significa um aumento de 10² = 100 vezes na acidez ([H⁺]).'
      },
      {
        id: 'qui-q8',
        difficulty: 'Médio',
        yearSource: 'ENEM / Separação de Misturas',
        context: 'Para obter água potável em regiões áridas ou dessalinizar água do mar, podem-se empregar técnicas que separam o sal dissolvido (sólido) da água líquida.',
        question: 'Qual método de separação de misturas homogêneas permite recuperar integralmente a água doce líquida a partir da água salgada por mudança de estado físico seguida de condensação?',
        options: [
          { id: 'a', text: 'Destilação simples.' },
          { id: 'b', text: 'Filtração simples com papel de filtro comum.' },
          { id: 'c', text: 'Decantação por gravidade em funil de bromo.' },
          { id: 'd', text: 'Catação manual de cristais dissolvidos.' },
          { id: 'e', text: 'Imantação eletromagnética.' }
        ],
        correctOptionId: 'a',
        explanation: 'Como a água salgada é uma mistura homogênea (solução) de sólido em líquido com pontos de ebulição muito distantes, a destilação simples vaporiza a água e a condensa em recipiente separado, deixando o sal retido.'
      },
      {
        id: 'qui-q9',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Cinética Química',
        context: 'Nos escapamentos de automóveis modernos existe um conversor catalítico contendo metais como platina, paládio e ródio, que aceleram a conversão de gases tóxicos (CO e NOₓ) em gases menos nocivos.',
        question: 'Do ponto de vista termodinâmico e cinético, como atua o catalisador nessa reação?',
        options: [
          { id: 'a', text: 'Ele reduz a energia de ativação (Ea) criando um caminho reacional alternativo mais rápido, sem alterar o ΔH nem ser consumido ao final.' },
          { id: 'b', text: 'Ele aumenta a variação de entalpia (ΔH) tornando a reação mais endotérmica.' },
          { id: 'c', text: 'Ele desloca o equilíbrio químico exclusivamente para os reagentes.' },
          { id: 'd', text: 'Ele é totalmente transformado em monóxido de carbono sólido.' },
          { id: 'e', text: 'Ele eleva a energia de ativação para impedir colisões moleculares.' }
        ],
        correctOptionId: 'a',
        explanation: 'Catalisadores aumentam a velocidade da reação ao diminuir a energia de ativação necessária para atingir o complexo ativado, sem modificar a entalpia dos reagentes e produtos (ΔH permanece igual).'
      },
      {
        id: 'qui-q10',
        difficulty: 'Médio',
        yearSource: 'ENEM / Ligações Químicas',
        context: 'O cloreto de sódio (NaCl) é sólido à temperatura ambiente e conduz corrente elétrica quando fundido ou dissolvido em água, enquanto o gás carbônico (CO₂) não conduz corrente elétrica.',
        question: 'Qual característica estrutural explica essa diferença entre NaCl e CO₂?',
        options: [
          { id: 'a', text: 'O NaCl forma um retículo cristalino iônico com íons Na⁺ e Cl⁻ livres quando fundido/dissolvido, enquanto o CO₂ é um composto molecular covalente apolar sem íons livres.' },
          { id: 'b', text: 'O NaCl apresenta exclusivamente ligações metálicas com mar de elétrons.' },
          { id: 'c', text: 'O CO₂ possui ligações iônicas de elevadíssima massa molar.' },
          { id: 'd', text: 'O sódio compartilha quatro pares de elétrons covalentes com o cloro.' },
          { id: 'e', text: 'As moléculas de CO₂ são iônicas no estado sólido e metálicas no gasoso.' }
        ],
        correctOptionId: 'a',
        explanation: 'Compostos iônicos como o NaCl formam redes cristalinas com forte atração eletrostática (alto ponto de fusão) e conduzem eletricidade quando seus íons ganham mobilidade na água ou no estado líquido.'
      }
    ],
    flashcards: [
      {
        id: 'qui-fc1',
        topic: 'Eletroquímica',
        front: 'O que significa o mnemônico CRAO para pilhas e eletrólise?',
        back: 'C-R-A-O:\nCátodo sempre ocorre Redução (ganho de elétrons).\nÂnodo sempre ocorre Oxidação (perda de elétrons).',
        hint: 'Cátodo = Redução | Ânodo = Oxidação.'
      },
      {
        id: 'qui-fc2',
        topic: 'Química Orgânica',
        front: 'Qual é a diferença estrutural entre um Éter e um Éster?',
        back: 'Éter possui um oxigênio heteroátomo entre dois carbonos (R—O—R\'). Éster possui uma carbonila ligada a um oxigênio ligado a uma cadeia carbônica (R—COO—R\').',
        hint: 'Éter = R-O-R\' | Éster = R-COO-R\''
      },
      {
        id: 'qui-fc3',
        topic: 'Equilíbrio Químico',
        front: 'Como o Princípio de Le Chatelier reage a alterações de Pressão, Temperatura e Concentração?',
        back: '1. Aumento de Pressão: desloca para o lado com MENOR número de mols de gases.\n2. Aumento de Temperatura: desloca no sentido ENDOTÉRMICO (absorve calor).\n3. Adição de reagente: desloca para a DIREITA (formação de produtos).\nObs: Catalisador NÃO desloca o equilíbrio, apenas acelera a velocidade!',
        hint: 'O sistema reage sempre no sentido oposto à perturbação imposta.'
      },
      {
        id: 'qui-fc4',
        topic: 'Forças Intermoleculares',
        front: 'Qual é a ordem crescente de força das interações intermoleculares?',
        back: 'Dipolo Induzido / Forças de London (apolares, ex: CH₄, O₂) < Dipolo Permanente / Dipolo-Dipolo (polares, ex: HCl, H₂S) < Ligação de Hidrogênio (H ligado a F, O ou N, ex: H₂O, etanol, DNA).',
        hint: 'London < Dipolo-Dipolo < Ligação de H (FON).'
      },
      {
        id: 'qui-fc5',
        topic: 'Termoquímica',
        front: 'Qual a diferença entre Reação Exotérmica e Endotérmica?',
        back: 'Exotérmica: Libera calor para o ambiente (ΔH < 0, H_reagentes > H_produtos), frasco esquenta (ex: combustão).\nEndotérmica: Absorve calor do ambiente (ΔH > 0, H_produtos > H_reagentes), frasco esfria (ex: fotossíntese, fusão do gelo).',
        hint: 'Exo = sai calor (ΔH < 0) | Endo = entra calor (ΔH > 0).'
      }
    ]
  },
  {
    id: 'sociologia',
    name: 'Sociologia',
    category: 'Ciências Humanas',
    description: 'Estudo das relações sociais, instituições, cultura, cidadania, desigualdades e direitos humanos.',
    highSchoolFocus: 'Clássicos da Sociologia (Marx, Durkheim, Weber), Cultura e Identidade, Cidadania, Mundo do Trabalho e Movimentos Sociais.',
    recommendedTopics: ['Fato Social (Durkheim)', 'Ação Social (Weber)', 'Luta de Classes & Mais-Valia (Marx)', 'Indústria Cultural (Adorno & Horkheimer)', 'Estratificação Social'],
    animal: {
      name: 'Acará-disco',
      species: 'Acará-disco Amazônico',
      scientificName: 'Symphysodon aequifasciatus',
      habitat: 'Águas calmas e ricas em raízes submersas dos rios da bacia amazônica',
      funFact: 'O Acará-disco vive em grupos sociais altamente cooperativos e ambos os pais produzem uma secreção nutritiva na própria pele para alimentar coletivamente os filhotes!',
      personality: 'Sociável, empático, atento à coletividade e aos laços comunitários.',
      greetingMessage: 'Olá! Sou o Acará-disco. Nos rios da floresta, nenhum peixe nada sozinho: vivemos em sociedade com laços de cooperação e solidariedade. Vamos analisar como as estruturas sociais moldam nosso mundo!',
      tipQuote: 'Na sociologia, sempre diferencie a visão funcionalista e harmoniosa (Durkheim) da visão de conflito e transformação material (Marx)!',
      avatarIcon: 'users',
      illustrationUrl: acaraImg,
      themeColor: 'from-pink-500 to-rose-600',
      accentColor: 'text-pink-800 bg-pink-100 dark:bg-pink-950/40 dark:text-pink-300',
      bgGradient: 'bg-gradient-to-br from-pink-50 via-rose-50/40 to-purple-100/40 dark:from-pink-950/20 dark:to-rose-950/20'
    },
    videoLessons: [
      {
        id: 'soc-1',
        title: 'Sociologia no ENEM: Durkheim, Weber e Marx',
        duration: '21 min',
        topic: 'Teoria Sociológica Clássica',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'z-Uv_hE1q4s',
        summary: [
          'Émile Durkheim: O Fato Social (coercitividade, exterioridade e generalidade) e a solidariedade mecânica vs orgânica.',
          'Max Weber: Ação Social e a compreensão dos sentidos subjetivos e tipos de dominação legítima.',
          'Karl Marx: Materialismo histórico, luta de classes, alienação e mais-valia no sistema capitalista.'
        ],
        keyTerms: [
          { term: 'Fato Social', definition: 'Maneiras de agir, pensar e sentir que exercem força coercitiva externa sobre os indivíduos.' },
          { term: 'Mais-Valia', definition: 'Diferença entre o valor produzido pelo trabalho do operário e o salário efetivamente pago pelo capitalista.' }
        ],
        xpReward: 80
      },
      {
        id: 'soc-2',
        title: 'Indústria Cultural: Theodor Adorno e Max Horkheimer',
        duration: '16 min',
        topic: 'Cultura & Contemporaneidade',
        channel: 'Brasil Escola Oficial',
        youtubeId: 'Y2V5hU7B4mU',
        summary: [
          'A Escola de Frankfurt (Theodor Adorno e Max Horkheimer).',
          'A transformação da arte e da cultura em mercadorias de consumo padronizado.',
          'Mídia de massa, formação da opinião pública e cidadania digital.'
        ],
        keyTerms: [
          { term: 'Indústria Cultural', definition: 'Padronização e mercantilização dos bens culturais para consumo em massa gerando conformismo.' },
          { term: 'Etnocentrismo', definition: 'Tendência de julgar culturas alheias a partir dos padrões da própria cultura como superior.' }
        ],
        xpReward: 70
      }
    ],
    quizzes: [
      {
        id: 'soc-q1',
        question: 'Segundo a teoria de Émile Durkheim, para que um fenômeno seja considerado um "Fato Social", ele deve apresentar simultaneamente quais três características fundamentais?',
        options: [
          { id: 'a', text: 'Individualidade, espontaneidade e subjetividade' },
          { id: 'b', text: 'Exterioridade, coercitividade e generalidade' },
          { id: 'c', text: 'Rentabilidade, materialismo e alienação' },
          { id: 'd', text: 'Racionalidade, carisma e tradição' }
        ],
        correctOptionId: 'b',
        explanation: 'Para Durkheim, os fatos sociais existem fora do indivíduo (exterioridade), impõem-se sobre ele através de sanções ou normas (coercitividade) e estão presentes em toda a sociedade (generalidade).',
        difficulty: 'Médio',
        yearSource: 'ENEM / Sociologia'
      },
      {
        id: 'soc-q2',
        question: 'O conceito sociológico de "Etnocentrismo" refere-se à atitude de:',
        options: [
          { id: 'a', text: 'Reconhecer que todas as culturas possuem igual valor e legitimidade relativa' },
          { id: 'b', text: 'Julgar e desvalorizar a cultura do outro tomando a sua própria cultura como padrão superior de referência' },
          { id: 'c', text: 'Preservar as espécies animais nativas de um bioma contra a extinção' },
          { id: 'd', text: 'Eliminar as classes sociais por meio da revolução proletária' }
        ],
        correctOptionId: 'b',
        explanation: 'Etnocentrismo é a visão preconceituosa que coloca o próprio grupo étnico/cultural no centro do mundo, julgando os costumes alheios como inferiores ou anormais.',
        difficulty: 'Fácil'
      },
      {
        id: 'soc-q3',
        difficulty: 'Médio',
        yearSource: 'ENEM 2023',
        context: 'O sociólogo polonês Zygmunt Bauman formulou a metáfora da "Modernidade Líquida" para caracterizar a sociedade contemporânea ocidental.',
        question: 'Segundo Bauman, as principais marcas das relações humanas e instituições na modernidade líquida são:',
        options: [
          { id: 'a', text: 'Estabilidade duradoura, lealdades perpétuas e empregos vitalícios garantidos.' },
          { id: 'b', text: 'Fluidez, fragilidade dos vínculos afetivos, consumismo voraz e incerteza constante.' },
          { id: 'c', text: 'Retorno às tradições medievais comunitárias estritas.' },
          { id: 'd', text: 'Supressão total das redes sociais e retorno ao contato exclusivamente presencial.' },
          { id: 'e', text: 'Monopólio absoluto do Estado de bem-estar social keynesiano.' }
        ],
        correctOptionId: 'b',
        explanation: 'Na Modernidade Líquida de Bauman, os sólidos sociais (segurança no trabalho, laços comunitários duradouros, relações afetivas estáveis) derreteram, dando lugar a vínculos frágeis, individualismo exacerbado e consumo efêmero.'
      },
      {
        id: 'soc-q4',
        difficulty: 'Médio',
        yearSource: 'ENEM 2022',
        context: 'O sociólogo francês Pierre Bourdieu desenvolveu conceitos fundamentais para compreender como as desigualdades sociais e privilégios se reproduzem silenciosamente através do sistema educacional.',
        question: 'Dentre os conceitos formulados por Bourdieu, aquele que se refere ao acúmulo de saberes legítimos, erudição, diplomas e códigos culturais herdados da família é o:',
        options: [
          { id: 'a', text: 'Capital Cultural.' },
          { id: 'b', text: 'Capital Financeiro especulativo.' },
          { id: 'c', text: 'Materialismo dialético.' },
          { id: 'd', text: 'Solidariedade mecânica.' },
          { id: 'e', text: 'Anomia moral.' }
        ],
        correctOptionId: 'a',
        explanation: 'Para Bourdieu, o "Capital Cultural" (em suas formas incorporada, objetivada e institucionalizada) é transmitido no seio familiar e valorizado pela escola, convertendo privilégios de classe em mérito acadêmico aparente.'
      },
      {
        id: 'soc-q5',
        difficulty: 'Fácil',
        yearSource: 'ENEM 2021',
        context: 'Os teóricos da Escola de Frankfurt, Theodor Adorno e Max Horkheimer, cunharam o conceito de "Indústria Cultural" na obra Dialética do Esclarecimento.',
        question: 'O objetivo central da crítica frankfurtiana à Indústria Cultural é denunciar:',
        options: [
          { id: 'a', text: 'A padronização mercantil da arte para consumo de massa, que anestesia o senso crítico e estimula o conformismo social.' },
          { id: 'b', text: 'A proibição do uso de tecnologia na produção musical clássica.' },
          { id: 'c', text: 'A falta de lucro financeiro das grandes produtoras de cinema.' },
          { id: 'd', text: 'A supervalorização do artesanato folclórico regional.' },
          { id: 'e', text: 'A extinção da publicidade nas emissoras de rádio.' }
        ],
        correctOptionId: 'a',
        explanation: 'A Indústria Cultural submete a produção artística à lógica fabril e comercial capitalista, gerando produtos culturais homogêneos e pasteurizados destinados ao entretenimento passivo, esvaziando a capacidade reflexiva e emancipatória da arte.'
      },
      {
        id: 'soc-q6',
        difficulty: 'Médio',
        yearSource: 'ENEM / Sociologia Clássica',
        context: 'Ao analisar a ação dos indivíduos em sociedade, Max Weber destacou quatro tipos ideais de ação social: racional com relação a fins, racional com relação a valores, afetiva e tradicional.',
        question: 'Segundo Max Weber, qual é o objeto central de estudo da Sociologia Compreensiva?',
        options: [
          { id: 'a', text: 'A ação social, isto é, a conduta humana dotada de sentido subjetivo orientado em relação ao comportamento de outros indivíduos.' },
          { id: 'b', text: 'Exclusivamente as leis biológicas hereditárias da espécie.' },
          { id: 'c', text: 'A coerção externa absoluta sem qualquer participação do sentido individual.' },
          { id: 'd', text: 'A eliminação total da subjetividade nas decisões humanas.' },
          { id: 'e', text: 'A estatística pura desvinculada dos significados culturais.' }
        ],
        correctOptionId: 'a',
        explanation: 'Diferentemente de Durkheim (foco nos fatos sociais externos), Weber parte do indivíduo e busca compreender o sentido subjetivo que os atores atribuem às suas ações orientadas para os outros.'
      },
      {
        id: 'soc-q7',
        difficulty: 'Fácil',
        yearSource: 'ENEM / Cidadania',
        context: 'O sociólogo T. H. Marshall classificou os direitos da cidadania moderna em três dimensões históricas: direitos civis, direitos políticos e direitos sociais.',
        question: 'No Brasil, o direito à educação pública, à saúde (SUS), à previdência e ao salário justo pertence a qual dimensão da cidadania de Marshall?',
        options: [
          { id: 'a', text: 'Direitos Sociais, voltados à garantia de bem-estar material e dignidade coletiva.' },
          { id: 'b', text: 'Direitos exclusivamente feudais de linhagem.' },
          { id: 'c', text: 'Privilégios censitários restritos a grandes proprietários.' },
          { id: 'd', text: 'Direitos autorais de propriedade industrial.' },
          { id: 'e', text: 'Imunidade diplomática internacional.' }
        ],
        correctOptionId: 'a',
        explanation: 'Segundo Marshall, os direitos civis garantem liberdades individuais (ir e vir, expressão); os direitos políticos garantem participação no poder (votar e ser votado); e os direitos sociais asseguram educação, saúde, trabalho e proteção social.'
      },
      {
        id: 'soc-q8',
        difficulty: 'Médio',
        yearSource: 'ENEM / Trabalho & Sociedade',
        context: 'Com o avanço das plataformas digitais de entrega e transporte, trabalhadores atuam sem vínculo empregatício formal, assumindo os riscos, manutenção e jornadas extensas sob gerenciamento algorítmico.',
        question: 'Como a sociologia do trabalho contemporânea denomina esse processo de precarização mediado por aplicativos?',
        options: [
          { id: 'a', text: 'Uberização / plataformização do trabalho.' },
          { id: 'b', text: 'Corporativismo artesanal medieval.' },
          { id: 'c', text: 'Pleno emprego fordista com estabilidade vitalícia.' },
          { id: 'd', text: 'Socialismo utópico agrário.' },
          { id: 'e', text: 'Mercantilismo metalista.' }
        ],
        correctOptionId: 'a',
        explanation: 'A "uberização" descreve a conversão de trabalhadores em supostos "autônomos" sob controle rígido de algoritmos digitais, transferindo custos operacionais e riscos de acidente ou doença ao próprio trabalhador.'
      },
      {
        id: 'soc-q9',
        difficulty: 'Difícil',
        yearSource: 'ENEM / Pensamento Brasileiro',
        context: 'Na obra clássica "Raízes do Brasil" (1936), Sérgio Buarque de Holanda formulou o conceito de "homem cordial" para explicar traços da formação histórica e política brasileira.',
        question: 'O que significa exatamente o "homem cordial" na análise sociológica de Sérgio Buarque de Holanda?',
        options: [
          { id: 'a', text: 'O indivíduo que age guiado pelas emoções, afetos e relações pessoais ("do coração"), confundindo a esfera privada com a esfera pública e gerando personalismo e patrimonialismo.' },
          { id: 'b', text: 'Um cidadão perfeitamente educado, polido e rigorosamente impessoal diante das leis republicanas.' },
          { id: 'c', text: 'Um trabalhador fabril disciplinado exclusivamente pelo relógio de ponto.' },
          { id: 'd', text: 'Uma pessoa incapaz de demonstrar amizade ou hostilidade.' },
          { id: 'e', text: 'Um modelo ideal de burocracia weberiana sem favoritismos.' }
        ],
        correctOptionId: 'a',
        explanation: 'Em "cordial" (do latim cor = coração), Sérgio Buarque não elogia uma suposta bondade pacífica, mas critica a tendência brasileira de resolver assuntos públicos por laços afetivos, compadrio e intimidade, enfraquecendo a impessoalidade das leis.'
      },
      {
        id: 'soc-q10',
        difficulty: 'Médio',
        yearSource: 'ENEM / Cultura & Antropologia',
        context: 'A antropologia moderna demonstra que não existem culturas "superiores" ou "evoluídas" em relação a outras, mas formas distintas e legítimas de responder aos desafios humanos.',
        question: 'Qual postura metodológica e ética se opõe diretamente ao etnocentrismo ao propor compreender cada cultura a partir de seus próprios valores e contexto histórico?',
        options: [
          { id: 'a', text: 'Relativismo cultural.' },
          { id: 'b', text: 'Evolucionismo social linear.' },
          { id: 'c', text: 'Determinismo geográfico absoluto.' },
          { id: 'd', text: 'Eurocentrismo colonial.' },
          { id: 'e', text: 'Xenofobia estrutural.' }
        ],
        correctOptionId: 'a',
        explanation: 'O relativismo cultural recusa hierarquizar sociedades segundo um padrão único e busca interpretar práticas, línguas e crenças dentro do sistema simbólico próprio daquela sociedade.'
      }
    ],
    flashcards: [
      {
        id: 'soc-fc1',
        topic: 'Teoria Sociológica',
        front: 'Qual é a diferença entre Solidariedade Mecânica e Solidariedade Orgânica em Durkheim?',
        back: 'Solidariedade Mecânica é típica de sociedades tradicionais/pré-capitalistas, com pouca divisão do trabalho e forte consciência coletiva. Solidariedade Orgânica ocorre em sociedades modernas complexas, baseada na interdependência de funções especializadas.',
        hint: 'Pouca divisão do trabalho (semelhança) vs Alta especialização (interdependência).'
      },
      {
        id: 'soc-fc2',
        topic: 'Cidadania',
        front: 'Quais são as três dimensões clássicas da Cidadania segundo T.H. Marshall?',
        back: '1. Direitos Civis (liberdade individual, expressão e propriedade - séc. XVIII)\n2. Direitos Políticos (voto e participação no poder - séc. XIX)\n3. Direitos Sociais (educação, saúde e previdência - séc. XX).',
        hint: 'Civis, Políticos e Sociais.'
      },
      {
        id: 'soc-fc3',
        topic: 'Sociologia Contemporânea',
        front: 'O que é a "Modernidade Líquida" de Zygmunt Bauman?',
        back: 'Conceito que define a sociedade contemporânea caracterizada pela instabilidade crônica, transitoriedade, incerteza nas relações humanas e flexibilização das instituições sociais e do trabalho, onde tudo é volátil e descartável como líquido.',
        hint: 'Fragilidade dos vínculos e sociedade de consumo efêmero.'
      },
      {
        id: 'soc-fc4',
        topic: 'Sociologia da Educação',
        front: 'O que é "Capital Cultural" e "Violência Simbólica" em Pierre Bourdieu?',
        back: 'Capital Cultural: conjunto de conhecimentos, títulos e hábitos culturais valorizados pela classe dominante. Violência Simbólica: imposição sutil e imperceptível desses padrões culturais como universais e legítimos, legitimando as desigualdades sem o uso da força física.',
        hint: 'Reprodução das desigualdades escolares e culturais.'
      },
      {
        id: 'soc-fc5',
        topic: 'Teoria Crítica',
        front: 'O que é a "Indústria Cultural" segundo a Escola de Frankfurt?',
        back: 'Termo cunhado por Adorno e Horkheimer para descrever a transformação da cultura em mercadoria produzida em escala industrial, padronizada e serializada, visando ao lucro e à conformação ideológica das massas.',
        hint: 'Cultura como produto comercial alienante em massa.'
      }
    ]
  }
];

export const FOREST_BADGES: Badge[] = [
  {
    id: 'badge-guilherme',
    title: 'Guardião da Floresta',
    description: 'Iniciou a jornada de estudos com a Onça-Pintada.',
    icon: 'Sparkles',
    animalId: 'guilherme'
  },
  {
    id: 'badge-art',
    title: 'Sinfonia da Floresta',
    description: 'Dominou vanguardas, modernismo e patrimônio artístico com o Uirapuru.',
    icon: 'Palette',
    animalId: 'artes'
  },
  {
    id: 'badge-bio',
    title: 'Visão Transparente',
    description: 'Completou atividades de Biologia com a Rã-de-vidro.',
    icon: 'Activity',
    animalId: 'biologia'
  },
  {
    id: 'badge-esp',
    title: 'Agilidade Hispânica',
    description: 'Dominou leitura, vocabulário e gramática em Espanhol com o Macaco-de-cheiro.',
    icon: 'MessageCircle',
    animalId: 'espanhol'
  },
  {
    id: 'badge-fil',
    title: 'Asas da Razão',
    description: 'Refletiu profundamente em Filosofia com a Borboleta Morpho.',
    icon: 'Feather',
    animalId: 'filosofia'
  },
  {
    id: 'badge-fis',
    title: 'Impacto Cinético',
    description: 'Dominou forças e energia em Física com o Queixada.',
    icon: 'Zap',
    animalId: 'fisica'
  },
  {
    id: 'badge-geo',
    title: 'Navegação Hidrográfica',
    description: 'Mapeou biomas, bacias e relevo em Geografia com a Ariranha.',
    icon: 'Compass',
    animalId: 'geografia'
  },
  {
    id: 'badge-his',
    title: 'Olhar Panorâmico',
    description: 'Compreendeu os séculos em História com a Harpia.',
    icon: 'Eye',
    animalId: 'historia'
  },
  {
    id: 'badge-ing',
    title: 'Audição Poliglota',
    description: 'Aprimorou a leitura em Inglês com a Coruja-orelhuda.',
    icon: 'Globe',
    animalId: 'ingles'
  },
  {
    id: 'badge-mat',
    title: 'Salto Trigonométrico',
    description: 'Resolveu equações precisas em Matemática com a Onça-pintada.',
    icon: 'Calculator',
    animalId: 'matematica'
  },
  {
    id: 'badge-por',
    title: 'Faro Nota 1000',
    description: 'Lapidou a gramática e redação em Português com o Quati.',
    icon: 'PenTool',
    animalId: 'portugues'
  },
  {
    id: 'badge-qui',
    title: 'Casco Balanceado',
    description: 'Equilibrou estequiometria em Química com a Tartaruga-da-Amazônia.',
    icon: 'Shield',
    animalId: 'quimica'
  },
  {
    id: 'badge-soc',
    title: 'Cardume Cooperativo',
    description: 'Pensou em sociedade em Sociologia com o Acará-disco.',
    icon: 'HeartHandshake',
    animalId: 'sociologia'
  },
  {
    id: 'badge-streak-3',
    title: 'Chama da Constância',
    description: 'Manteve a sequência de estudos ativa por 3 dias seguidos.',
    icon: 'Flame',
    animalId: 'guilherme'
  },
  {
    id: 'badge-streak-7',
    title: 'Fogo Sagrado da Floresta',
    description: 'Alcançou 7 dias ininterruptos de dedicação ao ENEM.',
    icon: 'Flame',
    animalId: 'guilherme'
  },
  {
    id: 'badge-streak-14',
    title: 'Lenda da Disciplina',
    description: '14 dias consecutivos na Floresta do Saber sem quebrar a sequência.',
    icon: 'Award',
    animalId: 'guilherme'
  }
];

export const GUILHERME_SPEECH_QUOTES = [
  "Roar! Bem-vindo à Floresta do Saber! Cada animal aqui é um guardião especialista em uma matéria do Ensino Médio.",
  "Para vencer no ENEM e na vida, a consistência diária é como as raízes de uma sumaúma: quanto mais profundas, mais alto você cresce!",
  "A curiosidade é o seu melhor instinto. Escolha uma matéria na ordem alfabética ou teste seus conhecimentos no Desafio Diário!",
  "Sabia que a fauna brasileira e o conhecimento humano estão conectados? Ao estudar cada disciplina, você também valoriza nossa rica biodiversidade!",
  "Não tenha medo de errar nos quizzes: o erro é apenas a pegada que mostra onde devemos afiar nossas garras para acertar na próxima vez!"
];
