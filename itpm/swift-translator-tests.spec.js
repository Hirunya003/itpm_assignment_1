const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data - Completely New Test Cases
const TEST_DATA = {
  positive: [
    // Simple Sentences
    {
      tcId: 'Pos_Fun_001',
      name: 'Simple present tense statement',
      input: 'mata nidhimathayi hodhatama',
      expected: 'මට නිදිමතයි හොදටම',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_002',
      name: 'Simple short daily activity sentence',
      input: 'adha mama office yanavaa',
      expected: 'අද මම office යනවා',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_003',
      name: 'Going home statement',
      input: 'api heta hamuvemu',
      expected: 'අපි හෙට හමුවෙමු',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    
    // Compound Sentences
    {
      tcId: 'Pos_Fun_004',
      name: 'Compound sentence connecting work completion and email sending',
      input: 'adha mama office vaeda avasan karala passe documents tika ready karalaa email ekak yavanna hadhanne saha heta vaeda patan ganna eeka pahasuyi',
      expected: 'අද මම office වැඩ අවසන් කරල පස්සෙ documents ටික ready කරලා email එකක් යවන්න හදන්නෙ සහ හෙට වැඩ පටන් ගන්න ඒක පහසුයි',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_005',
      name: 'Weather condition compound',
      input: 'vaessa unath api yanna epaeyi',
      expected: 'වැස්ස උනත් අපි යන්න එපැයි',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'S'
    },
    
    // Complex Sentences
    {
      tcId: 'Pos_Fun_006',
      name: 'Conditional complex sentence',
      input: 'adha mata tired eeth night venakam office inn unaa.',
      expected: 'අද මට tired ඒත් night වෙනකම් office inn උනා.',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'M'
    },
    
    // Questions
    {
      tcId: 'Pos_Fun_007',
      name: 'Simple question asking about current work state',
      input: 'oyaata vaeda hariyata karagena yanna puLuvandha kiyala ahanna hadhanne. vaeda tikak amaruyi vagee nisaa',
      expected: 'ඔයාට වැඩ හරියට කරගෙන යන්න පුළුවන්ද කියල අහන්න හදන්නෙ. වැඩ ටිකක් අමරුයි වගේ නිසා',
      category: 'Daily language usage',
      grammar: 'Interrogative (question)',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_008',
      name: 'Question about time',
      input: 'oyaa kohedha inne',
      expected: 'ඔයා කොහෙද ඉන්නේ',
      category: 'Daily language usage',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_009',
      name: 'Simple question about travel and timing state',
      input: 'heta udhee paandhara Kandy yanna puLuvandha kiyala balanna hithan inne. traffic eka kohomadha kiyala dhanna oonee',
      expected: 'හෙට උදේ පාන්දර Kandy යන්න පුළුවන්ද කියල බලන්න හිතන් ඉන්නේ. traffic එක කොහොමද කියල දන්න ඕනේ',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'M'
    },
    
    // Commands
    {
      tcId: 'Pos_Fun_010',
      name: 'Direct command to send documents via email',
      input: 'adha meeting eka avasan unaa passe documents tika email ekata attach karala yavanna. eka heta vaeda patan ganna kalin check karanna oonee',
      expected: 'අද meeting එක අවසන් උනා පස්සෙ documents ටික email එකට attach කරල යවන්න. එක හෙට වැඩ පටන් ගන්න කලින් check කරන්න ඕනේ',
      category: 'Daily language usage',
      grammar: 'Imperative (command)',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_011',
      name: 'Polite command',
      input: 'karunaakaralaa mata podi udhavvak karanna puLuvandha. adha mama office vaeda godak thiyenavaa saha documents tika ready karanna thiyena nisaa mata tikak amathaka venavaa',
      expected: 'කරුනාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද. අද මම office වැඩ ගොඩක් තියෙනවා සහ documents ටික ready කරන්න තියෙන නිසා මට ටිකක් අමතක වෙනවා',
      category: 'Greeting / request / response',
      grammar: 'Imperative (command)',
      length: 'M'
    },
    
    // Greetings and Responses
    {
      tcId: 'Pos_Fun_012',
      name: 'Morning greeting',
      input: 'suba udhaeesanak',
      expected: 'සුබ උදෑසනක්',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_013',
      name: 'Polite affirmative response',
      input: 'hari mama karannam',
      expected: 'හරි මම කරන්නම්',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'S'
    },
    
    // Tense Variations
    {
      tcId: 'Pos_Fun_014',
      name: 'Past tense action',
      input: 'mama iiyee gedhara giyaa',
      expected: 'මම ඊයේ ගෙදර ගියා',
      category: 'Daily language usage',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: "Pos_Fun_015",
      name: "Future tense plan",
      input: "api heta Colombo yamu",
      expected: "අපි හෙට Colombo යමු",
      category: "Daily language usage",
      grammar: "Future tense",
      length: "S"

    },
    
    // Negations
    {
      tcId: 'Pos_Fun_016',
      name: 'Simple negation',
      input: 'mata adha enna baee',
      expected: 'මට අද එන්න බෑ',
      category: 'Daily language usage',
      grammar: 'Negation (negative form)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_017',
      name: 'Cannot statement',
      input: 'mata eeka karanna baee',
      expected: 'මට ඒක කරන්න බෑ',
      category: 'Daily language usage',
      grammar: 'Negation (negative form)',
      length: 'S'
    },
    
    // Plural and Pronouns
    {
      tcId: 'Pos_Fun_018',
      name: 'Plural pronoun usage',
      input: 'api adha game ekak gahamu',
      expected: 'අපි අද game එකක් ගහමු',
      category: 'Daily language usage',
      grammar: 'Plural form',
      length: 'S'
    },
    
    // Word Combinations
    {
      tcId: 'Pos_Fun_019',
      name: 'Common phrase pattern',
      input: 'poddak innako mama ennam',
      expected: 'පොඩ්ඩක් ඉන්නකො මම එන්නම්',
      category: 'Word combination / phrase pattern',
      grammar: 'Simple sentence',
      length: 'S'
    },
    
    // Mixed Language
    {
      tcId: 'Pos_Fun_020',
      name: 'English brand term embedded',
      input: 'mama office meeting ekata attend karanavaa',
      expected: 'මම office meeting එකට attend කරනවා',
      category: 'Mixed Singlish + English',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_021',
      name: 'Place name preservation',
      input: 'nimeelaa Kandy giyaa',
      expected: 'නිමේලා Kandy ගියා',
      category: 'Names / places / common English words',
      grammar: 'Past tense',
      length: 'S'
    },
    
    // Punctuation
    {
      tcId: 'Pos_Fun_022',
      name: 'Exclamation mark handling',
      input: 'supiri!',
      expected: 'සුපිරි!',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    
    // Numbers and Formats
    {
      tcId: 'Pos_Fun_023',
      name: 'Currency amount',
      input: 'mata apples 3k ganna oonee',
      expected: 'මට apples 3ක් ගන්න ඕනේ',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    
    // Medium Length
    {
      tcId: 'Pos_Fun_024',
      name: 'Medium length conversation',
      input: 'adha mama office yanavaa namuth traffic thiyenavaa nisaa podi late venavaa',
      expected: 'අද මම office යනවා නමුත් traffic තියෙනවා නිසා පොඩි late වෙනවා',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'M'
    },

    // Medium Length (Robustness)
    {
      tcId: 'Pos_Fun_025',
      name: 'Medium length slang + mixed English + negative statements',
      input: `machan adha nam hari amaaruyi.
      traffic nisaa office enna late unaa,
      manager call karala kiyala inne meeting eka patan aran inne kiyala.
      mata hodhatama internet naehae, WiFi disconnect venavaa,
      files upload karanna bae.
      iita passe mama WhatsApp message ekak dhaemma adha ehema karanna bae kiyala.`,
      expected: `මචන් අද නම් හරි අමාරුයි.
      traffic නිසා office එන්න late උනා,
      manager call කරල කියල ඉන්නේ meeting එක පටන් අරන් ඉන්නේ කියල.
      මට හොදටම internet නැහැ, WiFi disconnect වෙනවා,
      files upload කරන්න බැ.
      ඊට පස්සෙ මම WhatsApp message එකක් දැම්ම අද එහෙම කරන්න බැ කියල.`,
      category: 'Slang / informal language',
      grammar: 'Compound sentence',
      length: 'M'
    },

    //long Length
  {
    tcId: 'Pos_Fun_026',
    name: 'Long daily life paragraph with mixed English and future planning',
    input: `adha mama office giyaa passe hari nidhimatha unaa. vaeda godak thibuna nisaa lunch eka late unaa.
    manager meeting ekedhi kiyala thibuna heta Zoom meeting ekak thiyenavaa kiyala, ehema nisaa mama calendar ekata note ekak dhaagaththa.
    office inna velavedhi email tika check karala files tika ready karalaa thibuna.
    heta nam api yaluvo okkoma ekka Kandy trip ekak yanna plan karala thiyenavaa namuth weather eka mona vidhihata veyidha kiyala sure naehae.`,
    expected: `අද මම office ගියා පස්සේ හරි නිදිමත උනා. වැඩ ගොඩක් තිබුණ නිසා lunch එක late උනා.
    manager meeting එකේදී කිව්වා හෙට Zoom meeting එකක් තියෙනවා කියලා, එහෙම නිසා මම calendar එකට note එකක් දාගත්තා.
    office ඉන්න වෙලාවේදී email ටික check කරලා files ටික ready කරලා තිබුණා.
    හෙට නම් අපි යාලුවෝ ඔක්කොම එකක් Kandy trip එකක් යන්න plan කරලා තියෙනවා නමුත් weather එක මොන විදිහට වේයිද කියලා sure නැහැ.`,
    category: 'Daily language usage',
    grammar: 'Complex sentence',
    length: 'L'
    }


  ],
  
  negative: [
    {
      tcId: 'Neg_Fun_001',
      name: 'Missing space between words',
      input: 'mamagedharayanavaa',
      expected: 'මම ගෙදර යනවා',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_002',
      name: 'Joined compound words',
      input: 'matabathkannaoonee',
      expected: 'මට බත් කන්න ඕනේ      ',
      category: 'Typographical error handling',
      grammar: 'Future tense',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_003',
      name: 'Mixed spacing issues',
      input: 'mama     gedhara     yanavaa',
      expected: 'මම ගෙදර යනවා',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_004',
      name: 'Line break in sentence',
      input: 'oyakohomadhainne',
      expected: 'ඔයා කොහොමද ඉන්නේ',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_005',
      name: 'Informal slang phrase',
      input: 'hari hari lassanai',
      expected: 'හරි හරි ලස්සනයි',
      category: 'Slang / informal language',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_006',
      name: 'Colloquial expression',
      input: 'eka eka dey karanna epaa',
      expected: 'එක එක දේ කරන්න එපා',
      category: 'Slang / informal language',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_007',
      name: 'Mixed English with errors',
      input: 'mama අද office giyaa',
      expected: 'මම අද office ගියා',
      category: 'Mixed Singlish + English',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_008',
      name: 'Abbreviation in sentence',
      input: 'ela machan supiri',
      expected: 'එල මචන් සුපිරි',
      category: 'Names / places / common English words',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_009',
      name: 'Question with spacing error',
      input: 'oyaakohedhainnee',
      expected: 'ඔයා කොහෙද ඉන්නේ',
      category: 'Typographical error handling',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_010',
      name: 'Informal slang command with emphasis',
      input: 'ehema karapan machan',
      expected: 'එහෙම කරපන් මචන්',
      category: 'Slang / informal language',
      grammar: 'Imperative (command)',
      length: 'S'
}

  ],
  
  ui: {
    tcId: 'Pos_UI_001',
    name: 'Real-time translation updates as typing',
    input: 'api passe kathaa karamu',
    partialInput: 'api passe',
    expectedFull: 'අපි පස්සේ කතා කරමු',
    category: 'Usability flow',
    grammar: 'Present tense',
    length: 'S'
  }
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    // Delegate to enhanced waitForOutput that supports previous-text comparison
    await this.waitForOutput('', 20000);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text ? text.trim() : '';
  }

  async performTranslation(inputText) {
    const prev = await this.getOutputText();
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput(prev, 20000);
    return await this.getOutputText();
  }

  // Collapse multiple spaces and trim
  normalizeText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
  }

  // Wait for a short, partial output (used for realtime typing UI check)
  async waitForPartialOutput(timeout = 5000) {
    await this.page.waitForFunction(
      selector => {
        const el = document.querySelector(selector);
        return el && el.textContent && el.textContent.trim().length > 0;
      },
      CONFIG.selectors.outputContainer,
      { timeout }
    );
  }

  // Wait until output becomes non-empty and different from prevText (or simply non-empty if prevText empty)
  async waitForOutput(prevText = '', timeout = 20000) {
    const selector = CONFIG.selectors.outputContainer;
    await this.page.waitForFunction(
      (sel, previous) => {
        const elements = Array.from(document.querySelectorAll(sel));
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent !== null;
        });
        if (!output) return false;
        const text = output.textContent.trim();
        if (!text) return false;
        if (!previous) return true;
        return text !== previous.trim();
      },
      selector,
      prevText,
      { timeout }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        const actualNormalized = translator.normalizeText(actualOutput);
        const expectedNormalized = translator.normalizeText(testCase.expected);
        expect(actualNormalized).toBe(expectedNormalized);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        // For negative/typo tests, compare after removing all whitespace
        const normActual = actualOutput ? actualOutput.replace(/\s+/g, '') : '';
        const normExpected = testCase.expected ? testCase.expected.replace(/\s+/g, '') : '';
        expect(normActual).toBe(normExpected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const inputField = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();

      // Type partial input (simulate typing)
      await inputField.type(TEST_DATA.ui.partialInput, { delay: 150 });

      // Wait for partial output and verify
      await translator.waitForPartialOutput(5000);
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);

      // Type remainder
      const remainder = TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length);
      if (remainder) await inputField.type(remainder, { delay: 150 });

      // Wait for full translation
      await translator.waitForOutput();

      // Verify full translation (normalized)
      outputText = await translator.getOutputText();
      expect(translator.normalizeText(outputText)).toBe(translator.normalizeText(TEST_DATA.ui.expectedFull));

      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});
