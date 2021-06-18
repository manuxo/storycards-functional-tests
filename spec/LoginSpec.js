const { Builder, By, Key, until } = require('selenium-webdriver');
const WAIT_INTERVAL = 10 * 1000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 40 * 1000;
const SLEEP_INTERVAL = 1000;
const BASE_URL = "http://localhost:8100";
const LOGIN_URL = `${BASE_URL}/login`;
const MAIN_URL = `${BASE_URL}/menu/main`;
const FACILITADOR_USERNAME = 'alvaradomanuel2013@gmail.com';
const FACILITADOR_PASSWORD = '12345';
const FACILITADOR_USERNAME_INCORRECTO = 'test@gmail.com';
const FACILITADOR_PASSWORD_INCORRECTO = 'admin123';


async function loginFacilitador(driver, username, password, expectedUrl) {
    await driver.get(LOGIN_URL);
    console.log("Ingresando usuario...");
    usernameInput = await driver.wait(until.elementLocated(By.css('ion-input[formControlName="email"] input')), WAIT_INTERVAL);
    await usernameInput.sendKeys(username, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando clave...");
    passwordInput = await driver.wait(until.elementLocated(By.css('ion-input[name="password"] input')), WAIT_INTERVAL);
    await passwordInput.sendKeys(password, Key.RETURN);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Iniciando sesión...");
    await driver.findElement(By.xpath('//ion-button[contains(text(), "Iniciar Sesión")]')).click();

    await driver.wait(until.urlIs(expectedUrl), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);

    const url = await driver.getCurrentUrl();
    return url;
}

function suiteLoginFacilitador(browser) {

    beforeAll(async function () {
        this.driver = await new Builder().forBrowser(browser).build();
        this.driver.manage().window().maximize();
    });

    afterAll(async function() {
        console.log("Cerrando navegador...");
        this.driver.quit();
        console.log("Navegador cerrado");
    });

    it('CP01 - Happy Path', async function () {
        try {
            console.log("Browser: ", browser);
            const expected = MAIN_URL;
            const url = await loginFacilitador(this.driver, FACILITADOR_USERNAME, FACILITADOR_PASSWORD, expected);
            console.log('URL => ', url);
            expect(url).toBe(expected);
        } catch (error) {
            console.log(error);
        } finally {
        }
    });
    
}

function suiteLoginFacilitadorCredencialesIncorrectas(browser) {

    beforeAll(async function () {
        this.driver = await new Builder().forBrowser(browser).build();
        this.driver.manage().window().maximize();
    });

    afterAll(async function() {
        console.log("Cerrando navegador...");
        this.driver.quit();
        console.log("Navegador cerrado");
    });

    it('CP02', async function () {
        try {
            console.log("Browser: ", browser);
            const expected = LOGIN_URL;
            const url = await loginFacilitador(this.driver, FACILITADOR_USERNAME_INCORRECTO, FACILITADOR_PASSWORD_INCORRECTO, expected);
            console.log('URL => ', url);
            expect(url).toBe(expected);
            await this.driver.sleep(SLEEP_INTERVAL);
            await this.driver.findElement(By.xpath('//h2[contains(text(), "¡Lo sentimos!")]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    expect("").toEqual("Error en mensaje de error al iniciar sesión con credenciales incorrectas");
                }
            });
        } catch (error) {
            console.log('ERROR => ', error);
        } finally {
        }
    });
    
}



describe("Chrome: Inicio de sesión de facilitador", function () {
    suiteLoginFacilitador("chrome")
});
describe("Edge: Inicio de sesión de facilitador", function () {
    suiteLoginFacilitador("MicrosoftEdge")
});
describe("Firefox: Inicio de sesión de facilitador", function() {
    suiteLoginFacilitador("firefox")
});

describe("Chrome: Inicio de sesión de facilitador con credenciales incorrectas", function () {
    suiteLoginFacilitadorCredencialesIncorrectas("chrome")
});
describe("Edge: Inicio de sesión de facilitador con credenciales incorrectas", function () {
    suiteLoginFacilitadorCredencialesIncorrectas("MicrosoftEdge")
});
describe("Firefox: Inicio de sesión de facilitador con credenciales incorrectas", function() {
    suiteLoginFacilitadorCredencialesIncorrectas("firefox")
});


