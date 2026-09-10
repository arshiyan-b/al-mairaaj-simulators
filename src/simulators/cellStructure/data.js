// Data for the Cell Structure simulator. Kept separate from the 3D/UI
// components so the educational content can be reviewed and edited
// without touching rendering code.
//
// level: "core" = taught at both O Level and A Level.
//        "extension" = A Level only (hidden/de-emphasized at O Level).
// cellTypes: which cell(s) this organelle appears in.
// position: [x, y, z] placement inside the cell for the 3D scene.

export const ORGANELLES = [
  {
    id: "membrane",
    name: "Cell Membrane",
    cellTypes: ["animal", "plant"],
    level: "core",
    color: "#5aa9e6",
    position: [0, 0, 0], // special-cased: rendered as the cell's own shell
    structure:
      "A thin boundary made of a phospholipid bilayer with embedded proteins, surrounding the whole cell.",
    function: "Controls the movement of substances into and out of the cell.",
    whyStructureFunction:
      "The phospholipid bilayer is naturally impermeable to most water-soluble substances, while embedded proteins act as channels and carriers - together this makes the membrane selectively permeable rather than either fully open or fully sealed.",
    oLevel: "The cell membrane controls what substances can enter or leave the cell.",
    aLevel:
      "The fluid mosaic model describes the membrane as a bilayer of phospholipids in which proteins float and move, some spanning the whole membrane to act as channels or carriers for facilitated diffusion and active transport.",
    examTip: "If asked 'why selectively permeable', mention the phospholipid bilayer AND the proteins - one alone doesn't explain it.",
    commonMistake: "Calling it the 'cell wall' - only plant cells have a cell wall; every cell, plant or animal, has a membrane.",
  },
  {
    id: "wall",
    name: "Cell Wall",
    cellTypes: ["plant"],
    level: "core",
    color: "#4a7c59",
    position: [0, 0, 0], // special-cased: rendered as an outer shell
    structure: "A rigid layer made mainly of cellulose fibres, located outside the cell membrane.",
    function: "Provides structural support and maintains the cell's shape, preventing it from bursting.",
    whyStructureFunction:
      "Cellulose fibres are strong under tension, so the wall can resist the outward pressure of water entering the cell without stretching or breaking.",
    oLevel: "The cell wall is a rigid layer outside the membrane that supports and protects the cell.",
    aLevel:
      "Cellulose microfibrils are laid down in a criss-cross pattern within a matrix of pectin and hemicellulose, giving the wall tensile strength while still allowing some flexibility for growth.",
    examTip: "Link cell wall to turgor pressure - it's what stops a turgid plant cell from bursting when water enters by osmosis.",
    commonMistake: "Thinking the cell wall controls what enters/leaves the cell - that's the membrane's job. The wall is freely permeable.",
  },
  {
    id: "cytoplasm",
    name: "Cytoplasm",
    cellTypes: ["animal", "plant"],
    level: "core",
    color: "#1c242a",
    position: [0, 0, 0], // fills the cell interior
    structure: "A jelly-like substance made mostly of water, filling the space inside the cell membrane.",
    function: "The site of many chemical reactions, and the medium organelles are suspended in.",
    whyStructureFunction:
      "Being mostly water allows substances to dissolve and diffuse through it, so reacting molecules can meet and enzymes can catalyse reactions throughout the cell.",
    oLevel: "Cytoplasm is a jelly-like substance where chemical reactions happen.",
    aLevel:
      "The cytoplasm includes the cytosol (the fluid itself) and the cytoskeleton, a network of protein filaments that gives the cell shape, enables organelle movement, and anchors organelles in place.",
    examTip: "Don't confuse cytoplasm with the whole cell - it's specifically the substance filling the cell, excluding the nucleus and other organelles.",
    commonMistake: "Describing cytoplasm as 'empty space' - it's a busy site of metabolic reactions, not just filler.",
  },
  {
    id: "nucleus",
    name: "Nucleus",
    cellTypes: ["animal", "plant"],
    level: "core",
    color: "#b98af0",
    position: [-1.3, 0.4, 0.6],
    radius: 1.15,
    structure: "A large, roughly spherical structure containing chromosomes (DNA) and a nucleolus.",
    function: "Controls the activities of the cell by controlling which proteins are made.",
    whyStructureFunction:
      "Keeping DNA enclosed and separate from the cytoplasm protects it from damage during the cell's everyday reactions, while still allowing controlled export of instructions (via mRNA) to the ribosomes.",
    oLevel: "The nucleus contains the cell's genetic material (DNA) and controls the cell's activities.",
    aLevel:
      "The nucleus is bounded by a double nuclear envelope with pores that allow mRNA and ribosomal subunits to pass through. It contains chromatin (DNA plus histone proteins) and a nucleolus, which manufactures ribosomal RNA and assembles ribosome subunits.",
    examTip: "If the question asks about protein synthesis, mention that the nucleus is where mRNA is made (transcription) before it moves to ribosomes for translation.",
    commonMistake: "Saying the nucleus 'makes proteins' - it controls which proteins are made by supplying instructions (mRNA); the actual assembly happens at ribosomes.",
  },
  {
    id: "nucleolus",
    name: "Nucleolus",
    cellTypes: ["animal", "plant"],
    level: "extension",
    color: "#d9c2f7",
    position: [-1.5, 0.55, 0.75],
    radius: 0.32,
    structure: "A small, dense region inside the nucleus, not surrounded by its own membrane.",
    function: "Produces ribosomal RNA (rRNA) and assembles the subunits that form ribosomes.",
    whyStructureFunction:
      "Concentrating rRNA production and ribosome assembly in one dense region makes the process more efficient than if it occurred diffusely throughout the nucleus.",
    oLevel: "Not required at O Level - this is an A Level extension structure.",
    aLevel:
      "The nucleolus synthesises rRNA and combines it with proteins imported from the cytoplasm to build the large and small ribosomal subunits, which are then exported through nuclear pores.",
    examTip: "A Level: be ready to explain the nucleolus's role specifically in ribosome assembly, not general protein synthesis.",
    commonMistake: "Confusing the nucleolus with the nucleus itself - the nucleolus is a structure inside the nucleus, not a separate organelle.",
  },
  {
    id: "mitochondria",
    name: "Mitochondria",
    cellTypes: ["animal", "plant"],
    level: "core",
    color: "#ef7b5a",
    positions: [
      [1.4, -0.6, 0.3],
      [1.6, 0.7, -0.5],
      [-0.3, -1.2, 0.8],
    ],
    structure: "A double-membrane organelle with a highly folded inner membrane forming structures called cristae.",
    function: "The site of aerobic respiration, releasing energy (as ATP) from glucose.",
    whyStructureFunction:
      "The folded cristae greatly increase the surface area of the inner membrane, giving more space for the enzymes and reactions of aerobic respiration - more folding means more ATP can be produced.",
    oLevel: "Mitochondria are the site of aerobic respiration and release energy for the cell's activities.",
    aLevel:
      "ATP is generated mainly through oxidative phosphorylation, involving the electron transport chain on the cristae and chemiosmosis - a proton gradient across the inner membrane drives ATP synthase.",
    examTip: "Cells with high energy demands (e.g. muscle cells, sperm cells) have more mitochondria - a classic 'explain the adaptation' exam question.",
    commonMistake: "Saying mitochondria 'make energy' - energy cannot be created; mitochondria release/transfer energy stored in glucose into a usable form (ATP).",
  },
  {
    id: "ribosomes",
    name: "Ribosomes",
    cellTypes: ["animal", "plant"],
    level: "core",
    color: "#e3c07b",
    isScattered: true,
    count: 18,
    structure: "Very small structures, either free in the cytoplasm or attached to the rough endoplasmic reticulum.",
    function: "The site of protein synthesis.",
    whyStructureFunction:
      "Their small size lets huge numbers be packed into the cell, and their structure (made of rRNA and protein) forms a groove that holds mRNA and tRNA together in exactly the right position for translation.",
    oLevel: "Ribosomes are the site of protein synthesis, where amino acids are joined together.",
    aLevel:
      "Each ribosome has a large and small subunit that clamp around mRNA. tRNA molecules bring specific amino acids, matched to mRNA codons by complementary anticodons, and peptide bonds form between adjacent amino acids as the ribosome moves along the mRNA.",
    examTip: "Free ribosomes make proteins used inside the cell; ribosomes on the rough ER make proteins for export or membranes - a common distinction question.",
    commonMistake: "Thinking only 'rough ER ribosomes' make proteins - free ribosomes in the cytoplasm are just as real and just as important.",
  },
  {
    id: "roughER",
    name: "Rough Endoplasmic Reticulum",
    cellTypes: ["animal", "plant"],
    level: "extension",
    color: "#f06fa0",
    position: [-0.6, 0.9, -0.4],
    structure: "A network of folded membranes studded with ribosomes on its outer surface.",
    function: "Folds and transports proteins made by its attached ribosomes, ready for the Golgi apparatus.",
    whyStructureFunction:
      "The extensive folded membrane surface provides a large area for many ribosomes to be attached at once, and its internal space (lumen) allows proteins to be processed and folded correctly before release.",
    oLevel: "Not required at O Level - this is an A Level extension structure.",
    aLevel:
      "Proteins synthesised by attached ribosomes enter the RER lumen, where they're folded and may be modified, then packaged into transport vesicles that bud off toward the Golgi apparatus.",
    examTip: "A Level: describe the RER-Golgi-vesicle pathway as a sequence, since exam questions often ask you to order these stages.",
    commonMistake: "Mixing up rough and smooth ER - 'rough' specifically refers to the ribosomes studding its surface.",
  },
  {
    id: "smoothER",
    name: "Smooth Endoplasmic Reticulum",
    cellTypes: ["animal", "plant"],
    level: "extension",
    color: "#f4a6c6",
    position: [0.7, 1.0, 0.6],
    structure: "A network of folded membranes with no ribosomes attached, giving it a smooth appearance.",
    function: "Synthesises and processes lipids and steroids, and helps detoxify certain substances.",
    whyStructureFunction:
      "The absence of ribosomes and its folded membrane structure suit it to lipid synthesis reactions, which occur within the membrane itself rather than needing a protein-assembly surface.",
    oLevel: "Not required at O Level - this is an A Level extension structure.",
    aLevel:
      "The SER is particularly extensive in cells that secrete steroid hormones or that detoxify drugs and poisons (e.g. liver cells), reflecting its role in lipid metabolism.",
    examTip: "A Level: if a question mentions steroid hormone production or detoxification, that's a strong hint the answer involves smooth ER.",
    commonMistake: "Assuming smooth ER makes proteins - protein synthesis is the rough ER's job, not the smooth ER's.",
  },
  {
    id: "golgi",
    name: "Golgi Apparatus",
    cellTypes: ["animal", "plant"],
    level: "extension",
    color: "#f2a65a",
    position: [1.0, -0.2, -0.9],
    structure: "A stack of flattened, membrane-bound sacs, often with vesicles budding off at the edges.",
    function: "Modifies, sorts, and packages proteins and lipids, then dispatches them to their destination.",
    whyStructureFunction:
      "The stacked sac arrangement lets a protein be processed step by step as it moves through each sac, allowing progressive modification before final packaging into vesicles.",
    oLevel: "Not required at O Level - this is an A Level extension structure.",
    aLevel:
      "Proteins arriving from the RER are modified (e.g. by glycosylation, adding sugar groups), sorted according to their destination, and packaged into vesicles that may fuse with the cell membrane for secretion.",
    examTip: "A Level: 'processing and packaging' is the key phrase examiners look for when describing Golgi function.",
    commonMistake: "Saying the Golgi apparatus 'makes' proteins - it modifies and packages proteins that were already made by ribosomes.",
  },
  {
    id: "lysosome",
    name: "Lysosome",
    cellTypes: ["animal", "plant"],
    level: "extension",
    color: "#d6e05a",
    isScattered: true,
    count: 4,
    structure: "A small, membrane-bound sac containing digestive enzymes.",
    function: "Breaks down waste materials, worn-out organelles, and (in some cells) invading pathogens.",
    whyStructureFunction:
      "Enclosing the digestive enzymes within their own membrane keeps them separate from the rest of the cell, protecting the cell's own healthy structures from being digested.",
    oLevel: "Not required at O Level - this is an A Level extension structure.",
    aLevel:
      "Lysosomes fuse with vesicles containing material to be broken down (including in white blood cells, where they digest engulfed pathogens after phagocytosis) and release enzymes such as proteases and lipases into the resulting vacuole.",
    examTip: "A Level: link lysosomes to phagocytosis in white blood cells as a classic applied example.",
    commonMistake: "Confusing lysosomes with vacuoles - a lysosome specifically contains digestive enzymes; a vacuole's contents vary and are often just stored water or nutrients.",
  },
  {
    id: "centriole",
    name: "Centrioles",
    cellTypes: ["animal"],
    level: "extension",
    color: "#6bc4b8",
    position: [-0.2, -1.0, 1.1],
    structure: "A pair of small, cylindrical structures made of microtubules, positioned near the nucleus.",
    function: "Organise the spindle fibres that separate chromosomes during cell division.",
    whyStructureFunction:
      "Their microtubule structure allows them to nucleate and organise the growth of spindle fibres radiating outward, positioning them precisely to pull chromosomes to opposite poles of the cell.",
    oLevel: "Not required at O Level - this is an A Level extension structure.",
    aLevel:
      "Centrioles duplicate before mitosis and migrate to opposite poles of the cell, organising the mitotic spindle. Plant cells lack centrioles but still form a spindle by other means.",
    examTip: "A Level: note that plant cells still divide successfully without centrioles - useful for 'compare plant and animal cell division' questions.",
    commonMistake: "Thinking all cells need centrioles to divide - plant cells manage without them.",
  },
  {
    id: "chloroplast",
    name: "Chloroplast",
    cellTypes: ["plant"],
    level: "core",
    color: "#4dd0a8",
    positions: [
      [1.5, 0.3, 0.7],
      [1.7, -0.8, -0.3],
      [0.3, 1.1, -0.9],
      [-1.0, -1.0, -0.6],
    ],
    structure:
      "A double-membrane organelle containing stacks of membranes (thylakoids, grouped into grana) suspended in a fluid called the stroma. Contains the green pigment chlorophyll.",
    function: "The site of photosynthesis, converting light energy into chemical energy stored in glucose.",
    whyStructureFunction:
      "The thylakoid membranes provide a large surface area packed with chlorophyll to absorb as much light as possible, while the stroma surrounding them provides space for the reactions that build glucose.",
    oLevel: "Chloroplasts contain chlorophyll and are the site of photosynthesis, which makes food for the plant.",
    aLevel:
      "Light-dependent reactions occur across the thylakoid membranes (organised into grana), generating ATP and NADPH; these are then used in the stroma during the light-independent reactions (Calvin cycle) to fix carbon dioxide into glucose.",
    examTip: "Keep photosynthesis (chloroplast) and respiration (mitochondria) clearly separate in your answers - mixing them up is one of the most common exam errors.",
    commonMistake: "Saying chloroplasts are the site of respiration - that's mitochondria. Chloroplasts do photosynthesis.",
  },
  {
    id: "vacuole",
    name: "Vacuole",
    cellTypes: ["plant"],
    level: "core",
    color: "#a6e3e0",
    position: [-0.2, -0.3, -0.3],
    radius: 1.5,
    structure: "A large, permanent, fluid-filled sac surrounded by a membrane called the tonoplast, typically taking up most of the cell's volume.",
    function: "Stores water, nutrients, and waste products, and maintains pressure on the cell wall (turgor pressure).",
    whyStructureFunction:
      "Its large size and membrane allow it to hold a substantial volume of water under pressure, pushing outward on the cytoplasm and cell wall to keep the cell rigid (turgid) rather than limp.",
    oLevel: "The vacuole stores water and helps keep the cell firm (turgid) by pressing against the cell wall.",
    aLevel:
      "The tonoplast is selectively permeable, controlling solute movement in and out of the vacuole and thereby regulating the cell's water potential and turgor pressure through osmosis.",
    examTip: "Link vacuole + cell wall together when explaining turgor pressure - examiners want both structures mentioned, not just one.",
    commonMistake: "Saying animal cells have 'a vacuole' the same way plant cells do - at this level, only plant cells are described as having a large permanent vacuole.",
  },
];

export function getOrganellesForCell(cellType, level) {
  return ORGANELLES.filter((o) => {
    const matchesCell = o.cellTypes.includes(cellType);
    const matchesLevel = level === "a-level" || o.level === "core";
    return matchesCell && matchesLevel;
  });
}

// --- Glossary -----------------------------------------------------------

export const GLOSSARY = [
  { term: "Organelle", level: "core", definition: "A structure within a cell that carries out a specific function." },
  { term: "Cell membrane", level: "core", definition: "The selectively permeable boundary surrounding a cell." },
  { term: "Selectively permeable", level: "core", definition: "Allowing some substances through but not others." },
  { term: "Cytoplasm", level: "core", definition: "The jelly-like substance filling a cell, where many reactions occur." },
  { term: "Nucleus", level: "core", definition: "The organelle containing DNA that controls the cell's activities." },
  { term: "Chromosome", level: "core", definition: "A structure made of DNA that carries genetic information." },
  { term: "DNA", level: "core", definition: "The molecule that carries genetic instructions in living organisms." },
  { term: "Ribosome", level: "core", definition: "The organelle where protein synthesis takes place." },
  { term: "Protein synthesis", level: "core", definition: "The process of building proteins from amino acids, directed by DNA." },
  { term: "Mitochondrion", level: "core", definition: "The organelle that is the site of aerobic respiration." },
  { term: "ATP", level: "core", definition: "A molecule that stores and transfers usable energy within cells." },
  { term: "Chloroplast", level: "core", definition: "The organelle that is the site of photosynthesis in plant cells." },
  { term: "Chlorophyll", level: "core", definition: "The green pigment in chloroplasts that absorbs light energy." },
  { term: "Vacuole", level: "core", definition: "A fluid-filled sac in plant cells that stores water and maintains turgor pressure." },
  { term: "Cell wall", level: "core", definition: "The rigid, cellulose layer outside a plant cell's membrane." },
  { term: "Cristae", level: "extension", definition: "The folds of a mitochondrion's inner membrane, increasing surface area." },
  { term: "Thylakoid", level: "extension", definition: "A membrane structure inside a chloroplast where light-dependent reactions occur." },
  { term: "Granum", level: "extension", definition: "A stack of thylakoids within a chloroplast (plural: grana)." },
  { term: "Tonoplast", level: "extension", definition: "The membrane surrounding a plant cell's vacuole." },
  { term: "Nucleolus", level: "extension", definition: "A dense region within the nucleus that produces ribosomal RNA." },
  { term: "Oxidative phosphorylation", level: "extension", definition: "ATP production driven by the electron transport chain and a proton gradient." },
];

// --- Quiz questions -------------------------------------------------------

export const QUIZ_QUESTIONS = {
  "o-level": [
    {
      question: "Which organelle is the site of aerobic respiration?",
      options: ["Ribosome", "Mitochondrion", "Nucleus", "Vacuole"],
      correct: 1,
      explanation: "Mitochondria release energy from glucose through aerobic respiration, producing ATP.",
    },
    {
      question: "Which structure controls what enters and leaves a cell?",
      options: ["Cell wall", "Nucleus", "Cell membrane", "Cytoplasm"],
      correct: 2,
      explanation: "The cell membrane is selectively permeable, controlling movement of substances in and out.",
    },
    {
      question: "Which organelle contains the cell's genetic material?",
      options: ["Mitochondrion", "Ribosome", "Chloroplast", "Nucleus"],
      correct: 3,
      explanation: "The nucleus contains DNA, organised into chromosomes, and controls the cell's activities.",
    },
    {
      question: "Chloroplasts are the site of which process?",
      options: ["Respiration", "Photosynthesis", "Protein synthesis", "Water storage"],
      correct: 1,
      explanation: "Chloroplasts contain chlorophyll and carry out photosynthesis, producing glucose from light energy.",
    },
    {
      question: "Which structure is found in plant cells but NOT animal cells?",
      options: ["Nucleus", "Mitochondrion", "Cell wall", "Ribosome"],
      correct: 2,
      explanation: "Only plant cells have a cellulose cell wall; both cell types have a membrane, nucleus, mitochondria, and ribosomes.",
    },
    {
      question: "What is the function of ribosomes?",
      options: ["Photosynthesis", "Protein synthesis", "Respiration", "Water storage"],
      correct: 1,
      explanation: "Ribosomes join amino acids together to build proteins.",
    },
    {
      question: "What keeps a plant cell firm and rigid?",
      options: [
        "The nucleus alone",
        "Water pressure of the vacuole against the cell wall",
        "Mitochondria producing energy",
        "The cell membrane alone",
      ],
      correct: 1,
      explanation: "The vacuole fills with water, pushing outward on the cytoplasm and rigid cell wall - this is turgor pressure.",
    },
  ],
  "a-level": [
    {
      question: "ATP production in mitochondria mainly relies on which process?",
      options: [
        "Glycolysis in the cytoplasm",
        "Oxidative phosphorylation across the cristae",
        "Photolysis of water",
        "Protein synthesis at ribosomes",
      ],
      correct: 1,
      explanation: "Oxidative phosphorylation, involving the electron transport chain and chemiosmosis across the cristae, produces most ATP.",
    },
    {
      question: "What is the role of the rough endoplasmic reticulum?",
      options: [
        "Lipid synthesis",
        "Folding and transporting proteins made by attached ribosomes",
        "Aerobic respiration",
        "Storing genetic material",
      ],
      correct: 1,
      explanation: "The RER's attached ribosomes synthesise proteins, which are then folded and transported through the RER toward the Golgi apparatus.",
    },
    {
      question: "Which structure produces ribosomal RNA and assembles ribosome subunits?",
      options: ["Golgi apparatus", "Smooth ER", "Nucleolus", "Lysosome"],
      correct: 2,
      explanation: "The nucleolus, found within the nucleus, synthesises rRNA and assembles ribosomal subunits.",
    },
    {
      question: "Why do plant cells not require centrioles to divide?",
      options: [
        "Plant cells never divide",
        "Plant cells form a spindle by other means",
        "Plant cells lack a nucleus",
        "Plant cells do not have chromosomes",
      ],
      correct: 1,
      explanation: "Plant cells organise their mitotic spindle without centrioles, unlike most animal cells.",
    },
    {
      question: "The Golgi apparatus is primarily responsible for which process?",
      options: [
        "Synthesising DNA",
        "Modifying, sorting and packaging proteins and lipids",
        "Aerobic respiration",
        "Absorbing light energy",
      ],
      correct: 1,
      explanation: "The Golgi apparatus processes materials arriving from the ER and packages them into vesicles for their destination.",
    },
    {
      question: "In photosynthesis, where do the light-dependent reactions occur?",
      options: ["Stroma", "Thylakoid membranes", "Mitochondrial cristae", "Nucleolus"],
      correct: 1,
      explanation: "Light-dependent reactions take place across the thylakoid membranes, organised into stacks called grana.",
    },
    {
      question: "What is the function of the tonoplast?",
      options: [
        "Controls solute movement in and out of the vacuole",
        "Produces ATP",
        "Synthesises proteins",
        "Forms the mitotic spindle",
      ],
      correct: 0,
      explanation: "The tonoplast is the selectively permeable membrane around the vacuole, regulating its water potential.",
    },
  ],
};

// --- Guided "Learn" mode steps --------------------------------------------

export function getLearnSteps(cellType, level) {
  const core = ["nucleus", "mitochondria", "ribosomes", "membrane", "cytoplasm"];
  const plantCore = ["wall", "chloroplast", "vacuole"];
  const extension = ["nucleolus", "roughER", "smoothER", "golgi", "lysosome"];
  const animalExtension = ["centriole"];

  let ids = [...core];
  if (cellType === "plant") ids = [...ids, ...plantCore];
  if (level === "a-level") {
    ids = [...ids, ...extension];
    if (cellType === "animal") ids = [...ids, ...animalExtension];
  }

  const prompts = {
    nucleus: "Find the organelle that controls the cell's activities and contains DNA.",
    mitochondria: "Identify an organelle responsible for aerobic respiration.",
    ribosomes: "Find the tiny structures where protein synthesis happens.",
    membrane: "Click the boundary that controls what enters and leaves the cell.",
    cytoplasm: "Click the jelly-like substance filling most of the cell.",
    wall: "Find the rigid outer layer that supports the plant cell.",
    chloroplast: "Identify the organelle that carries out photosynthesis.",
    vacuole: "Find the large sac that keeps the plant cell firm.",
    nucleolus: "Find the structure inside the nucleus that assembles ribosomes.",
    roughER: "Identify the folded membrane studded with ribosomes.",
    smoothER: "Find the folded membrane with no ribosomes, involved in lipid synthesis.",
    golgi: "Identify the stack of sacs that packages proteins for export.",
    lysosome: "Find the small sac containing digestive enzymes.",
    centriole: "Identify the structure that organises the spindle during cell division.",
  };

  return ids
    .map((id) => ORGANELLES.find((o) => o.id === id))
    .filter(Boolean)
    .map((o) => ({ organelleId: o.id, prompt: prompts[o.id] || `Find the ${o.name}.` }));
}
