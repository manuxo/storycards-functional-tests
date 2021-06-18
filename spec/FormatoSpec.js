const { Builder, By, Key, until } = require('selenium-webdriver');
const faker = require('faker');
const data = require('./storytelling.json');

const WAIT_INTERVAL = 10 * 1000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 40 * 1000;
const SLEEP_INTERVAL = 1000;
const BASE_URL = "http://localhost:8100";
const LOGIN_URL = `${BASE_URL}/login`;
const MAIN_URL = `${BASE_URL}/menu/main`;
const LISTADO_CANVAS_URL = `${BASE_URL}/canvas/canvas`;
const ADD_CANVAS_URL = `${BASE_URL}/canvas/add-canvas`;
const STORYTELLING_URL = `${BASE_URL}/canvas/storytelling`;
const FACILITADOR_USERNAME = 'alvaradomanuel2013@gmail.com';
const FACILITADOR_PASSWORD = '12345';

async function loginFacilitador(driver, username, password, expectedUrl) {
    await driver.get(LOGIN_URL);
    console.log("Ingresando usuario...");
    usernameInput = await driver.wait(until.elementLocated(By.css('ion-input[formControlName="email"] input')), WAIT_INTERVAL);
    await usernameInput.sendKeys(username);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando clave...");
    passwordInput = await driver.wait(until.elementLocated(By.css('ion-input[name="password"] input')), WAIT_INTERVAL);
    await passwordInput.sendKeys(password);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Iniciando sesión...");
    const btnLogin = await driver.wait(until.elementLocated(By.xpath('//ion-button[contains(text(), "Iniciar Sesión")]')), WAIT_INTERVAL);
    await btnLogin.click();
    await driver.wait(until.urlIs(expectedUrl), WAIT_INTERVAL);
}

async function CrearFormatoStoryTelling(driver, expectedUrl) {
    loginFacilitador(driver, FACILITADOR_USERNAME, FACILITADOR_PASSWORD, MAIN_URL);

    console.log("Ingresando al listado de canvas...");
    await driver.sleep(SLEEP_INTERVAL * 2);
    const btnCanvas = await driver.wait(until.elementLocated(By.id('btn-canvas')), WAIT_INTERVAL);
    await btnCanvas.click();
    await driver.wait(until.urlIs(LISTADO_CANVAS_URL), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando a crear nuevo formato");
    await driver.sleep(SLEEP_INTERVAL);
    const btnAddCanvas = await driver.wait(until.elementLocated(By.id('btn-add-canvas')), WAIT_INTERVAL);
    await btnAddCanvas.click();
    await driver.wait(until.urlIs(ADD_CANVAS_URL), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Seleccionando formato de storytelling");
    await driver.sleep(SLEEP_INTERVAL);
    const btnFormato4 = await driver.wait(until.elementLocated(By.id('btn-formato-4')), WAIT_INTERVAL);
    await btnFormato4.click();
    await driver.sleep(SLEEP_INTERVAL);
    const btnAddFormato = await driver.wait(until.elementLocated(By.id('btn-add-formato')), WAIT_INTERVAL);
    await btnAddFormato.click();
    await driver.wait(until.urlIs(STORYTELLING_URL), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando escenario...");
    const txtStage = await driver.wait(until.elementLocated(By.css('#txt-stage textarea')), WAIT_INTERVAL);
    await txtStage.sendKeys(data.stage);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando personaje...");
    const txtCharacter = await driver.wait(until.elementLocated(By.css('#txt-character textarea')), WAIT_INTERVAL);
    await txtCharacter.sendKeys(data.character);
    await driver.sleep(SLEEP_INTERVAL);

    const btnNext1 = await driver.wait(until.elementLocated(By.id('btn-next-1')), WAIT_INTERVAL);
    await btnNext1.click();
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando conflicto");
    const txtConflict = await driver.wait(until.elementLocated(By.css('#txt-conflict textarea')), WAIT_INTERVAL);
    await txtConflict.sendKeys(data.conflict);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando punto crítico");
    const txtCritical = await driver.wait(until.elementLocated(By.css('#txt-critical textarea')), WAIT_INTERVAL);
    await txtCritical.sendKeys(data.critical);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando soporte");
    const txtSupport = await driver.wait(until.elementLocated(By.css('#txt-support textarea')), WAIT_INTERVAL);
    await txtSupport.sendKeys(data.support);
    await driver.sleep(SLEEP_INTERVAL);
    
    const btnNext2 = await driver.wait(until.elementLocated(By.id('btn-next-2')), WAIT_INTERVAL);
    await btnNext2.click();
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando superación");
    const txtOvercoming = await driver.wait(until.elementLocated(By.css('#txt-overcoming textarea')), WAIT_INTERVAL);
    await txtOvercoming.sendKeys(data.overcoming);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando desenlace");
    const txtOutcome = await driver.wait(until.elementLocated(By.css('#txt-outcome textarea')), WAIT_INTERVAL);
    await txtOutcome.sendKeys(data.outcome);
    await driver.sleep(SLEEP_INTERVAL);

    const btnNext3 = await driver.wait(until.elementLocated(By.id('btn-next-3')), WAIT_INTERVAL);
    await btnNext3.click();
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando historia completa");
    const txtComplete = await driver.wait(until.elementLocated(By.css('#txt-complete textarea')), WAIT_INTERVAL);
    await txtComplete.sendKeys(data.complete);
    await driver.sleep(SLEEP_INTERVAL);

    const btnFinish = await driver.wait(until.elementLocated(By.id('btn-finish')), WAIT_INTERVAL);
    await btnFinish.click();
    await driver.sleep(SLEEP_INTERVAL);

    let btnGuardar = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Guardar")]')), WAIT_INTERVAL);
    await btnGuardar.click();
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando nombre de formato storytelling");
    const txtCanvasName = await driver.wait(until.elementLocated(By.id('txt-canvasName')), WAIT_INTERVAL);
    await txtCanvasName.sendKeys(`${data.canvasName} (${new Date().getTime()})`);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Guardando formato Storytelling...");

    btnGuardar = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Guardar")]')), WAIT_INTERVAL);
    await btnGuardar.click();
    await driver.wait(until.urlIs(expectedUrl), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL * 3);
    const url = await driver.getCurrentUrl();
    return url;
}

function suiteCrearFormatoStoryTelling(browser) {

    beforeAll(async function () {
        this.driver = await new Builder().forBrowser(browser).build();
        this.driver.manage().window().maximize();
    });

    afterAll(async function () {
        console.log("Cerrando navegador...");
        this.driver.quit();
        console.log("Navegador cerrado");
    });

    it('CP03 - Happy path', async function () {
        try {
            console.log("Browser: ", browser);
            const expected = LISTADO_CANVAS_URL;
            const url = await CrearFormatoStoryTelling(this.driver, expected);
            expect(url).toBe(expected);
        } catch (error) {
            console.log(error);
        } finally {
        }
    });
}

describe("Chrome: Crear formato de canvas de storytelling", function () {
    suiteCrearFormatoStoryTelling("chrome");
});
describe("Edge: Crear formato de canvas de storytelling", function () {
    suiteCrearFormatoStoryTelling("MicrosoftEdge");
});
describe("Firefox: Crear formato de canvas de storytelling", function() {
    suiteCrearFormatoStoryTelling("firefox");
});