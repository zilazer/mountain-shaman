document.querySelectorAll('img[loading="lazy"]').forEach((image) => {
  image.loading = 'eager';
});

const historyMap = document.querySelector('.history-map');
const historyChapters = document.querySelectorAll('.history-chapter');
const historyHeading = historyMap?.querySelector('.history-map-heading');

const historyHeadings = {
  ancient: ['退海纪以前', '山曾经是海'],
  retreat: ['退海纪', '追随退去的水'],
  four: ['四职时代', '同一张黑毡'],
  black: ['三盟前史', '山曾经只有一种声音'],
  anomaly: ['第一次山腹危机', '无声的井'],
  diagnosis: ['封潮议会', '三种诊断'],
  rupture: ['断山夜', '三种颜色出现'],
  current: ['三盟当代', '三种责任']
};

if (historyMap && historyChapters.length) {
  const historyObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const state = visible.target.dataset.mapState;
    historyMap.dataset.state = state;
    if (historyHeading) {
      historyHeading.querySelector('span').textContent = historyHeadings[state][0];
      historyHeading.querySelector('strong').textContent = historyHeadings[state][1];
    }
    historyChapters.forEach((chapter) => chapter.classList.toggle('is-current', chapter === visible.target));
  }, { rootMargin: '-24% 0px -42% 0px', threshold: [0, .2, .45, .7] });

  historyChapters.forEach((chapter) => historyObserver.observe(chapter));
}

const factionProfiles = {
  tide: {
    description: '他们相信山腹仍保存着古海的潮路。萨满通过倾听、测量、引导与穿越，维持地下水脉之间的流动关系；聚落则依靠他们寻找水源、判断渔汛、维护渡路和制造轻型水工器具。现实传统在这里提供的是理解身体与环境的结构，不是可直接搬用的服装或仪式目录。',
    facts: [
      ['现实结构参照', '以鄂温克为中心的北亚萨满传统，以及迁徙、框鼓和动物帮助灵所构成的跨界知识。'],
      ['身体观', '身体是一副能够接收细微信号、进入不可见路径的第二身体；衣物和坠件像鳃、触须与感官延伸。'],
      ['活动空间', '河口、洞穴、雪线、迁徙路径、病者身边，以及古海水脉仍会回响的山腹空腔。'],
      ['社会角色', '维护水与记忆的循环，寻找中断的路径，为迁徙、治疗和聚落边界提供判断。'],
      ['生计与手艺', '水路勘测、地下水维护、渔汛与融雪判断、渡运导航，以及绳结、鼓膜、薄金属环和集雾器等轻型水工器具的制作。守潮者以水源图、航路判断和器具维修换取粮食、盐与过冬物资。'],
      ['物质与动作', '皮、木、绳、薄金属、鼓膜；听、触、测、引、编结与穿越。']
    ]
  },
  vein: {
    description: '他们把世界理解为一副可以加固、截断并重新制造的物质结构。矿石开采、冶炼、锻造、铆接和承压工程既是仪式，也是他们赖以生存的专业手艺；冷猩红只标记正在受压、发热或重新接合的节点。',
    facts: [
      ['现实结构参照', '蒙古—布里亚特萨满传统中金属、锻造、祖灵与山地力量的关系，并转译为虚构的工程仪式。'],
      ['身体观', '身体是一副不会轻易腐朽的铁骨，也是一件承压工具；外骨骼把萨满与山体固定在同一受力系统中。'],
      ['活动空间', '圣山裂隙、地下火场、矿脉、锻造工坊、输水石管，以及必须立即封闭或改道的危险节点。'],
      ['社会角色', '主动改造山体，承担封隙、熔接、牵引与截流等公共工程，同时决定哪些旧路应当结束。'],
      ['生计与手艺', '采矿、选矿、冶炼、锻造、铆接、炉场维护、管路铺设与承压结构施工。赤脉者以金属工具、结构件和危险工程服务换取燃料、食物及运输权。'],
      ['物质与动作', '厚铁片、铆钉、夹具、压力膜、烧结绳；钉、压、锻、拉、切与封合。']
    ]
  },
  confluence: {
    description: '这是分支最多的体系。他们依靠狩猎与林地知识、谱系记录、织带缝制、纸扎木作和聚落调解维持生活；同时在猎场、宗族家祭、边镇移民与后来进入山中的信仰之间辨认关系，使不同来路的新祖、新灵与新来者能够被命名、分座、编入或送行。',
    facts: [
      ['现实结构参照', '中国东北多民族长期交融形成的复合萨满谱系，包括狩猎民族、满族家祭与野祭、中国朝鲜族支系及后期汉族民间信仰的接触。'],
      ['身体观', '身体是多条祖灵、兽灵、地方神与迁徙记忆相遇并重新排座的场所，服饰上的每个新增部件都代表一条关系被接纳。'],
      ['活动空间', '宗族家屋与火塘、猎场边界、山口、村镇公共祭场、移民聚落，以及不同传统发生摩擦的门槛地带。'],
      ['社会角色', '辨认存在的来路，将新祖、新灵与新来者编入可共处的秩序；必要时也负责除名、分席和送行。'],
      ['生计与手艺', '辨踪狩猎、林地路线管理、皮毛与食物分配、家谱和迁徙档案记录，以及织带、缝制、木架、纸桥和名牌制作。合祀者还承担婚盟见证、争端调解、失散亲属辨认与新居民安置。'],
      ['物质与动作', '木、皮、鼓、腰铃、谱带、名牌、猎具残件与后期吸收的纸质结构；认、请、迎、命名、分座、续谱与送行。']
    ]
  }
};

document.querySelectorAll('.faction-column').forEach((column) => {
  const key = ['tide', 'vein', 'confluence'].find((name) => column.classList.contains(name));
  const profile = factionProfiles[key];
  const oldDescription = column.querySelector('.faction-description');
  const details = document.createElement('span');
  details.className = 'faction-details';
  details.innerHTML = `<span class="faction-description">${profile.description}</span><span class="faction-facts">${profile.facts.map(([label, value]) => `<span class="faction-fact"><span class="fact-label">${label}</span><span class="fact-value">${value}</span></span>`).join('')}</span>`;
  oldDescription.replaceWith(details);
});

const characterProfiles = {
  '分叉听潮者':['石斑鱼','分叉听潮杖与张力细绳','贴岩测听，判断潮路分合'],
  '雷鼓听者':['双髻鲨','框鼓与全身金属坠件','接收山腹震动并击鼓传讯'],
  '须脉听者':['鲶鱼','触觉垂带与水脉坠珠','以须、皮肤和坠件触探微弱水脉'],
  '鲟骨听风者':['鲟鱼','鲟骨风架与纵向衣片','辨认洞口气流并为远行队开路'],
  '河豚守息者':['河豚','双腔息囊','收束呼吸与体压，守候潮汐反转'],
  '鳟鳃听雪者':['鳟鱼','雪滴衡架','让雪粒落过鳃帘，推算融雪去向'],
  '鳗线测渊者':['鳗鱼','深渊测线与回弹坠','向不可见空腔放线测深'],
  '鲤须编界者':['鲤鱼','边界结绳','把水位、通路与季节约定编成绳结'],
  '鳐幕守梦者':['锯鳐','带金属坠片的守梦软幕','张幕围护睡者，隔开错误回声'],
  '海马播雾者':['海马','集雾瓶与水汽坠囊','收集岩缝水汽并播回断裂潮路'],
  '铁肋封隙者':['甲鲶','楔形封隙夹具与铁肋外骨骼','承压并把楔钉压入山体裂口'],
  '绞索牵脉者':['河鳅','横向绞盘与牵引索','拉紧错位结构，使山脉重回受力线'],
  '熔环接骨者':['狼鱼','圆形熔接环与双背风囊','持续供压加热，熔接断裂石管'],
  '断流改道者':['匙吻鲟','竖向截流闸与斜向杠杆','截断危险矿脉并开启旁路'],
  '火喉定压者':['黑鲈','喉压调节器与双阀轮','以自身呼吸校准压力并闭阀定压'],
  '锚齿镇层者':['鳄雀鳝','锚齿地层夹与双地钉','承受反力，将滑移岩层压回咬合位'],
  '磁鳍寻矿者':['黑魔鬼刀鱼','环身磁性勘测轭与三枚铁针','校准悬针，在不开凿时描出矿脉'],
  '矿鳔释压者':['扳机鱼','背负式压力鳔与泄压轮','缓慢释放山腹积气，防止骤然爆裂'],
  '链鳃铸门者':['大西洋狼鳚','双侧铰链铸门架','合拢门架并铆死失控的地下火路'],
  '火吻淬脉者':['针鱼','长槽淬火钳','夹持炽热矿脉，在临界温度骤冷定形'],
  '纳谱者':['北方狗鱼','可增补的穿戴式活谱架','把无名存在编入谱系并分配席位'],
  '猎径记踪者':['江鳕','猎场路线轮','读取踪迹，将通行、禁入与迁徙编入路线'],
  '炉边续谱者':['白鲑','三列家系织带与小鼓','在火塘旁续入新谱并请亲属见证'],
  '边镇判席者':['乌鳢','不对称判席天平','称量旧谱牌与陌生来物，判断能否入席'],
  '鼓路迎灵者':['哲罗鲑','穿戴式行路鼓架','边行边击，为离散者标出回归路径'],
  '纸桥送名者':['东北鲫','折叠纸桥与空白名灯','展开纸桥、点灯送名，使亡者完成离席'],
  '猎骨还林者':['细鳞鲑','猎物残件归还架','逐件辨认来处，并送回对应猎场边界'],
  '双语译梦者':['雅罗鱼','双面梦牌与口述结绳','翻转梦牌，在不同支系间转译同一梦兆'],
  '雪岸认亲者':['池沼公鱼','气味谱带与掌印框','以气味、纤维和掌印恢复迁徙亲族称谓'],
  '边炉结盟者':['花羔红点鲑','共火炉盘与双向杯架','将同一壶水斟入两席，缔结互助关系']
};

document.querySelectorAll('.character').forEach((card) => {
  const name = card.querySelector('.character-name').textContent.trim();
  const [species, tool, action] = characterProfiles[name];
  const facts = document.createElement('dl');
  facts.className = 'character-facts';
  facts.innerHTML = `<div><dt>鱼种</dt><dd>${species}</dd></div><div><dt>主道具</dt><dd>${tool}</dd></div><div><dt>仪式动作</dt><dd>${action}</dd></div>`;
  card.querySelector('.biography > div').prepend(facts);
});

document.querySelectorAll('.faction-intro').forEach((button) => {
  button.addEventListener('click', () => {
    const open = button.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
    button.querySelector('.faction-action').textContent = open ? '收起阵营介绍' : '展开阵营介绍';
  });
});

document.querySelectorAll('.character-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.character');
    const open = card.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
    if (open) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
