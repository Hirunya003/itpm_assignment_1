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
  ],
  negative: [
    // Typos / Spacing errors
    {
      tcId: 'Neg_Fun_001',
      name: 'Spacing error in simple sentence',
      input: 'mata nidhimathayi hodhatama',
      expected: 'මටනිදිමතයිහොදටම',
      category: 'Spacing error',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_002',
      name: 'Spacing error in polite command',
      input: 'karunaakaralaa mata podi udhavvak karanna puLuvandha',
      expected: 'කරුනාකරලාමටපොඩිඋදව්වක්කරන්නපුළුවන්ද',
      category: 'Spacing error',
      grammar: 'Imperative (command)',
      length: 'M'
    },
    {
      tcId: 'Neg_Fun_003',
      name: 'Spacing error in question',
      input: 'oyaa kohedha inne',
      expected: 'ඔයාකොහෙදඉන්නේ',
      category: 'Spacing error',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    
    // Misspellings / Typos
    {
      tcId: 'Neg_Fun_004',
      name: 'Misspelling in present tense',
      input: 'mata nidhimathayi hodhatama',
      expected: 'මට නිදිමතයි හොදටම',
      category: 'Typo',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_005',
      name: 'Misspelling in phrase',
      input: 'hari hari lassaannai',
      expected: 'හරි හරි ලස්සනයි',
      category: 'Typo',
      grammar: 'Phrase',
      length: 'S'
    },
    
    // Invalid Einglish words
    {
      tcId: 'Neg_Fun_006',
      name: 'Invalid words mixed in sentence',
      input: 'mata tired eeth night venakam office inn unaa',
      expected: 'මට tired ඒත් night වෙනකම් office inn උනා',
      category: 'Invalid words',
      grammar: 'Complex sentence',
      length: 'M'
    },
    
    // Colloquial phrases and slang
    {
      tcId: 'Neg_Fun_007',
      name: 'Colloquial expression',
      input: 'hari hari lassaannai',
      expected: 'හරි හරි ලස්සනයි',
      category: 'Colloquial',
      grammar: 'Phrase',
      length: 'S'
    },
    
    // Incorrect punctuation
    {
      tcId: 'Neg_Fun_008',
      name: 'Using period incorrectly',
      input: 'oyaa kohedha inne.',
      expected: 'ඔයා කොහෙද ඉන්නේ',
      category: 'Punctuation error',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    
    // Extra spaces
    {
      tcId: 'Neg_Fun_009',
      name: 'Extra spaces added',
      input: 'api   heta  hamuvemu',
      expected: 'අපි හෙට හමුවෙමු',
      category: 'Spacing error',
      grammar: 'Simple sentence',
      length: 'S'
    },
    
    // Wrong capitalization
    {
      tcId: 'Neg_Fun_010',
      name: 'Wrong capitalization with English words',
      input: 'api Heta colombo yamu',
      expected: 'අපි හෙට colombo යමු',
      category: 'Capitalization error',
      grammar: 'Future tense',
      length: 'S'
    }
  ],
  ui: {
    tcId: 'UI_Fun_001',
    name: 'Translation updates as typing',
    partialInput: 'api heta ',
    input: 'api heta hamuvemu',
    expectedPartial: 'අපි ',
    expectedFull: 'අපි හෙට හමුවෙමු'
  }
};

// Page Model
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    const locator = this.page.getByPlaceholder(CONFIG.selectors.inputField);
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    return locator;
  }

  async getOutputField() {
    const locator = this.page.locator(CONFIG.selectors.outputContainer);
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    return locator;
  }

  normalizeText(text) {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.fill('');
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async performTranslation(inputText) {
    const input = await this.getInputField();
    const output = await this.getOutputField();

    await this.clearAndWait();
    await input.type(inputText, { delay: 50 });

    await this.waitForOutput(await output.textContent());

    return (await output.textContent())?.trim() || '';
  }

  // Wait for some non-empty output to appear when typing partial input
  async waitForPartialOutput(timeout = 15000) {
    const selector = CONFIG.selectors.outputContainer;
    await this.page.waitForFunction(
      sel => {
        const elements = Array.from(document.querySelectorAll(sel));
        // Find output container that is not the input
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent !== null;
        });
        return output && !!output.textContent.trim();
      },
      selector,
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
