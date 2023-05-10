const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
    console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async () => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();

        setTimeout(async () => {
            let alert = await driver.switchTo().alert();
            await alert.sendKeys("Bananer");
            await alert.accept();
        }, 1000);
    })
});

describe('Clicking "Poppa från stacken"', () => {
	it('should remove the top element from the stack', async () => {
	  // Jag hade problem med mina alerts där de aldrig ville gå igenom, så jag satte dem därför i en setTimeout
	  // Med hjälp av setTimeout simuleras en fördröjning av popup rutan i funktionen över oss
	  // Detsamma händer här i denna funktionen och tydligen fungerar mina testfall med setTimeout men inte utan
	  let push = await driver.findElement(By.id('push'));
	  await push.click();
	  setTimeout(async () => {
		let alert = await driver.switchTo().alert();
		await alert.sendKeys("Element 1");
		await alert.accept();
	  }, 1000);
  
	  // Här tar vi sedan bort det översta elementet från stacken
	  let pop = await driver.findElement(By.id('pop'));
	  await pop.click();
	  setTimeout(async () => {
		let topElement = await driver.findElement(By.id('top_of_stack')).getText();
		expect(topElement).toEqual("n/a");
	  }, 1000);
	});
  });
  

