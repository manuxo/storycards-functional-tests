const { Builder, By, Key, until } = require('selenium-webdriver');
const faker = require('faker');
const WAIT_INTERVAL = 10 * 1000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 40 * 1000;
const SLEEP_INTERVAL = 1000;
const BASE_URL = "http://localhost:8100";
const LOGIN_URL = `${BASE_URL}/login`;
const MAIN_URL_FIRST_TIME = `${BASE_URL}/menu/main?first=true&key=2`;
const REGISTER_URL = `${BASE_URL}/register`;

const FACILITADOR_USERNAME = 'alvaradomanuel2013@gmail.com';
const FACILITADOR_PASSWORD = '12345';

const BOOK_CODE = '3ditor1al295';
const BOOK_CODE_NO_EXIST = 'ASDD-ASDD';

async function registerFacilitador(driver, expectedUrl) {
    await driver.get(LOGIN_URL);

    console.log("Ingresando a página de registro...");
    btnRegistro = await driver.wait(until.elementLocated(By.id('btn-register')), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);
    await btnRegistro.click();
    await driver.wait(until.urlIs(REGISTER_URL), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando código de libro...");
    bookInput = await driver.wait(until.elementLocated(By.css('ion-input[name="book"] input')), WAIT_INTERVAL);
    await bookInput.sendKeys(BOOK_CODE, Key.RETURN);
    await driver.sleep(SLEEP_INTERVAL);
    btnValidar = await driver.wait(until.elementLocated(By.id('btn-verify-book')), WAIT_INTERVAL);
    await btnValidar.click();

    console.log("Ingresando nombres...");
    nombresInput = await driver.wait(until.elementLocated(By.css('ion-input[name="name"] input')), WAIT_INTERVAL);
    const firstName = faker.name.firstName();
    await nombresInput.sendKeys(firstName, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando apellidos...");
    apellidosInput = await driver.wait(until.elementLocated(By.css('ion-input[name="lastname"] input')), WAIT_INTERVAL);
    const lastName = faker.name.lastName();
    await apellidosInput.sendKeys(lastName, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Seleccionando país...");
    btnCountry = await driver.wait(until.elementLocated(By.id('btn-select-country')), WAIT_INTERVAL);
    await btnCountry.click();
    await driver.sleep(SLEEP_INTERVAL);
    await driver.wait(until.elementLocated(By.xpath('//ion-label[contains(text(), "Alemania")]')), WAIT_INTERVAL).click();
    await driver.sleep(SLEEP_INTERVAL);

    await driver.sleep(SLEEP_INTERVAL);
    console.log("Ingresando teléfono...");
    telefonoInput = await driver.wait(until.elementLocated(By.css('ion-input[name="phoneNumber"] input')), WAIT_INTERVAL);
    const phoneNumber = faker.phone.phoneNumber('96#######');
    await telefonoInput.sendKeys(phoneNumber, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando correo...");
    emailInput = await driver.wait(until.elementLocated(By.css('ion-input[name="emailAddress"] input')), WAIT_INTERVAL);
    const email = faker.internet.email(firstName, lastName, 'gmail.com');
    await emailInput.sendKeys(email, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando clave...");
    passwordInput = await driver.wait(until.elementLocated(By.css('ion-input[name="userPassword"] input')), WAIT_INTERVAL);
    await passwordInput.sendKeys('12345', Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);
    confirmPwdInput = await driver.wait(until.elementLocated(By.css('ion-input[formControlName="confirmPassword"] input')), WAIT_INTERVAL);
    await confirmPwdInput.sendKeys('12345', Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Aceptando términos y condiciones");
    cbxPrivacy = await driver.wait(until.elementLocated(By.id('privacyPolicy')), WAIT_INTERVAL);
    await cbxPrivacy.click();
    await driver.sleep(SLEEP_INTERVAL);
    const approve = faker.datatype.number(1);
    if (approve === 1) {
        cbxPersonalData = await driver.wait(until.elementLocated(By.id('personalData')), WAIT_INTERVAL);
        await cbxPersonalData.click();
        await driver.sleep(SLEEP_INTERVAL);
    }

    console.log('Registrando...');
    btnConfirmRegister = await driver.wait(until.elementLocated(By.id('btn-confirm-register')), WAIT_INTERVAL);
    await btnConfirmRegister.click();
    await driver.sleep(SLEEP_INTERVAL);

    await driver.wait(until.urlIs(expectedUrl), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);
    const url = await driver.getCurrentUrl();
    return url;
}

async function registerFacilitadorCodigoLibroUsado(driver, expectedUrl) {
    await driver.get(LOGIN_URL);

    console.log("Ingresando a página de registro...");
    btnRegistro = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), " Cree una ")]')), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);
    await btnRegistro.click();
    await driver.wait(until.urlIs(REGISTER_URL), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando código de libro...");
    bookInput = await driver.wait(until.elementLocated(By.css('ion-input[name="book"] input')), WAIT_INTERVAL);
    await bookInput.sendKeys(BOOK_CODE, Key.RETURN);
    await driver.sleep(SLEEP_INTERVAL);
    btnValidar = await driver.wait(until.elementLocated(By.id('btn-verify-book')), WAIT_INTERVAL);
    await btnValidar.click();

    await driver.wait(until.urlIs(expectedUrl), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);
    const url = await driver.getCurrentUrl();
    return url;
}

async function registerFacilitadorCodigoLibroInexistente(driver, expectedUrl) {
    await driver.get(LOGIN_URL);

    console.log("Ingresando a página de registro...");
    btnRegistro = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), " Cree una ")]')), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);
    await btnRegistro.click();
    await driver.wait(until.urlIs(REGISTER_URL), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando código de libro...");
    bookInput = await driver.wait(until.elementLocated(By.css('ion-input[name="book"] input')), WAIT_INTERVAL);
    await bookInput.sendKeys(BOOK_CODE_NO_EXIST, Key.RETURN);
    await driver.sleep(SLEEP_INTERVAL);
    btnValidar = await driver.wait(until.elementLocated(By.id('btn-verify-book')), WAIT_INTERVAL);
    await btnValidar.click();

    await driver.wait(until.urlIs(expectedUrl), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);
    const url = await driver.getCurrentUrl();
    return url;
}

async function registerFacilitadorDatosEnBlanco(driver, expectedUrl) {
    await driver.get(LOGIN_URL);

    console.log("Ingresando a página de registro...");
    btnRegistro = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), " Cree una ")]')), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);
    await btnRegistro.click();
    await driver.wait(until.urlIs(REGISTER_URL), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando código de libro...");
    bookInput = await driver.wait(until.elementLocated(By.css('ion-input[name="book"] input')), WAIT_INTERVAL);
    await bookInput.sendKeys(BOOK_CODE, Key.RETURN);
    await driver.sleep(SLEEP_INTERVAL);
    btnValidar = await driver.wait(until.elementLocated(By.id('btn-verify-book')), WAIT_INTERVAL);
    await btnValidar.click();

    console.log("Ingresando nombres...");
    nombresInput = await driver.wait(until.elementLocated(By.css('ion-input[name="name"] input')), WAIT_INTERVAL);
    const firstName = '';
    await nombresInput.sendKeys(firstName, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando apellidos...");
    apellidosInput = await driver.wait(until.elementLocated(By.css('ion-input[name="lastname"] input')), WAIT_INTERVAL);
    const lastName = '';
    await apellidosInput.sendKeys(lastName, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Seleccionando país...");
    btnCountry = await driver.wait(until.elementLocated(By.id('btn-select-country')), WAIT_INTERVAL);
    await btnCountry.click();
    await driver.sleep(SLEEP_INTERVAL);
    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), " X ")]')), WAIT_INTERVAL).click();
    await driver.sleep(SLEEP_INTERVAL);

    await driver.sleep(SLEEP_INTERVAL);
    console.log("Ingresando teléfono...");
    telefonoInput = await driver.wait(until.elementLocated(By.css('ion-input[name="phoneNumber"] input')), WAIT_INTERVAL);
    const phoneNumber = '';
    await telefonoInput.sendKeys(phoneNumber, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando correo...");
    emailInput = await driver.wait(until.elementLocated(By.css('ion-input[name="emailAddress"] input')), WAIT_INTERVAL);
    const email = '';
    await emailInput.sendKeys(email, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando clave...");
    passwordInput = await driver.wait(until.elementLocated(By.css('ion-input[name="userPassword"] input')), WAIT_INTERVAL);
    await passwordInput.sendKeys('', Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);
    confirmPwdInput = await driver.wait(until.elementLocated(By.css('ion-input[formControlName="confirmPassword"] input')), WAIT_INTERVAL);
    await confirmPwdInput.sendKeys('', Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), " He leído y acepto la ")]')), WAIT_INTERVAL).click();

    await driver.wait(until.urlIs(expectedUrl), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);
    const url = await driver.getCurrentUrl();
    return url;
}

async function registerFacilitadorDatosConErrorFormato(driver, expectedUrl) {
    await driver.get(LOGIN_URL);

    console.log("Ingresando a página de registro...");
    btnRegistro = await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), " Cree una ")]')), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);
    await btnRegistro.click();
    await driver.wait(until.urlIs(REGISTER_URL), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando código de libro...");
    bookInput = await driver.wait(until.elementLocated(By.css('ion-input[name="book"] input')), WAIT_INTERVAL);
    await bookInput.sendKeys(BOOK_CODE, Key.RETURN);
    await driver.sleep(SLEEP_INTERVAL);
    btnValidar = await driver.wait(until.elementLocated(By.id('btn-verify-book')), WAIT_INTERVAL);
    await btnValidar.click();

    console.log("Ingresando nombres...");
    nombresInput = await driver.wait(until.elementLocated(By.css('ion-input[name="name"] input')), WAIT_INTERVAL);
    const firstName = '@';
    await nombresInput.sendKeys(firstName, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando apellidos...");
    apellidosInput = await driver.wait(until.elementLocated(By.css('ion-input[name="lastname"] input')), WAIT_INTERVAL);
    const lastName = '';
    await apellidosInput.sendKeys(lastName, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    await driver.sleep(SLEEP_INTERVAL);
    console.log("Ingresando teléfono...");
    telefonoInput = await driver.wait(until.elementLocated(By.css('ion-input[name="phoneNumber"] input')), WAIT_INTERVAL);
    const phoneNumber = 'a12345678';
    await telefonoInput.sendKeys(phoneNumber, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando correo...");
    emailInput = await driver.wait(until.elementLocated(By.css('ion-input[name="emailAddress"] input')), WAIT_INTERVAL);
    const email = 'textoPlano';
    await emailInput.sendKeys(email, Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    console.log("Ingresando clave...");
    passwordInput = await driver.wait(until.elementLocated(By.css('ion-input[name="userPassword"] input')), WAIT_INTERVAL);
    await passwordInput.sendKeys('12345678', Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);
    confirmPwdInput = await driver.wait(until.elementLocated(By.css('ion-input[formControlName="confirmPassword"] input')), WAIT_INTERVAL);
    await confirmPwdInput.sendKeys('12345678', Key.ENTER);
    await driver.sleep(SLEEP_INTERVAL);

    await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), " He leído y acepto la ")]')), WAIT_INTERVAL).click();

    await driver.wait(until.urlIs(expectedUrl), WAIT_INTERVAL);
    await driver.sleep(SLEEP_INTERVAL);
    const url = await driver.getCurrentUrl();
    return url;
}

function suiteRegistroFacilitador(browser) {

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
            const expected = MAIN_URL_FIRST_TIME;
            const url = await registerFacilitador(this.driver, expected);
            expect(url).toBe(expected);
        } catch (error) {
            console.log(error);
        } finally {
        }
    });
}

function suiteRegistroFacilitadorCodigoUsado(browser) {

    beforeAll(async function () {
        this.driver = await new Builder().forBrowser(browser).build();
        this.driver.manage().window().maximize();
    });

    afterAll(async function () {
        console.log("Cerrando navegador...");
        this.driver.quit();
        console.log("Navegador cerrado");
    });

    it('CP04', async function () {
        try {
            console.log("Browser: ", browser);
            const expected = REGISTER_URL;
            const url = await registerFacilitadorCodigoLibroUsado(this.driver, expected);
            expect(url).toBe(expected);
            await this.driver.findElement(By.xpath('//h2[contains(text(), "El código ingresado ya ha sido utilizado")]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    expect("").toEqual("Error en mensaje al ingresar un código ya utilizado"); //forzamos que la prueba falle
                }
            });


        } catch (error) {
            console.log("ERROR => ", error);
        } finally {
        }
    });
}

function suiteRegistroFacilitadorCodigoNoExistente(browser) {

    beforeAll(async function () {
        this.driver = await new Builder().forBrowser(browser).build();
        this.driver.manage().window().maximize();
    });

    afterAll(async function () {
        console.log("Cerrando navegador...");
        this.driver.quit();
        console.log("Navegador cerrado");
    });

    it('CP05', async function () {
        try {
            console.log("Browser: ", browser);
            const expected = REGISTER_URL;
            const url = await registerFacilitadorCodigoLibroInexistente(this.driver, expected);
            expect(url).toBe(expected);
            await this.driver.findElement(By.xpath('//*[contains(text(), "El código ingresado no existe")]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    expect("").toEqual("Error de mensaje al registrar un facilitador con codigo inexistente"); //forzamos que la prueba falle
                }
            });

        } catch (error) {
            console.log("ERROR => ", error);
        } finally {
        }
    });
}

function suiteRegistroFacilitadorDatosEnBlanco(browser) {

    beforeAll(async function () {
        this.driver = await new Builder().forBrowser(browser).build();
        this.driver.manage().window().maximize();
    });

    afterAll(async function () {
        console.log("Cerrando navegador...");
        this.driver.quit();
        console.log("Navegador cerrado");
    });

    it('CP06', async function () {
        try {
            console.log("Browser: ", browser);
            const expected = REGISTER_URL;
            const url = await registerFacilitadorDatosEnBlanco(this.driver, expected);
            expect(url).toBe(expected);
            await this.driver.findElement(By.xpath('//*[contains(text(), "* Debe ingresar un nombre")]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    console.log('error en mensaje de nombre');
                    expect("").toEqual("Error de mensaje de nombre"); //forzamos que la prueba falle
                }
            });
            await this.driver.findElement(By.xpath('//*[contains(text(), "* Debe ingresar un correo")]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    console.log('error en mensaje de correo');
                    expect("").toEqual("Error de mensaje de correo"); //forzamos que la prueba falle
                }
            });
            await this.driver.findElement(By.xpath('//*[contains(text(), "* Debe ingresar un número telefónico")]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    console.log('error en mensaje de telefono');
                    expect("").toEqual("Error de mensaje de teléfono"); //forzamos que la prueba falle
                }
            });
            await this.driver.findElement(By.xpath('//*[contains(text(), "* Debe ingresar una constraseña")]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    console.log('error en mensaje de contraseña');
                    expect("").toEqual("Error de mensaje de contraseña"); //forzamos que la prueba falle
                }
            });
            await this.driver.findElement(By.xpath('//*[contains(text(), "* Debe confirmar su contraseña")]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    expect("").toEqual("Error de mensaje de confirmar contraseña"); //forzamos que la prueba falle
                }
            });
            await this.driver.findElement(By.css('//ion-button[class="button-disabled"]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    console.log('error en mensaje de botón');
                    expect("").toEqual("Error de botón Registrarse, no está desactivado"); //forzamos que la prueba falle
                }
            });
            
        } catch (error) {
            console.log("ERROR => ", error);
        } finally {
        }
    });
}

function suiteRegistroFacilitadorDatosConErrorFormato(browser) {

    beforeAll(async function () {
        this.driver = await new Builder().forBrowser(browser).build();
        this.driver.manage().window().maximize();
    });

    afterAll(async function () {
        console.log("Cerrando navegador...");
        this.driver.quit();
        console.log("Navegador cerrado");
    });

    it('CP07', async function () {
        try {
            console.log("Browser: ", browser);
            const expected = REGISTER_URL;
            const url = await registerFacilitadorDatosConErrorFormato(this.driver, expected);
            expect(url).toBe(expected);
            await this.driver.findElement(By.xpath('//*[contains(text(), "* El nombre no debe contener caracteres especiales")]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    expect("").toEqual("Error de mensaje de nombre"); //forzamos que la prueba falle
                }
            });
            await this.driver.findElement(By.xpath('//*[contains(text(), "* Ingrese un correo válido")]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    console.log('error en mensaje de correo');
                    expect("").toEqual("Error de mensaje de correo"); //forzamos que la prueba falle
                }
            });
            await this.driver.findElement(By.xpath('//*[contains(text(), "* Debe ingresar un número de teléfono válido")]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    console.log('error en mensaje de telefono');
                    expect("").toEqual("Error de mensaje de teléfono"); //forzamos que la prueba falle
                }
            });
            await this.driver.findElement(By.css('//ion-button[class="button-disabled"]')).then(null, function(err){
                if (err.name === 'NoSuchElementError'){
                    console.log('error en mensaje de botón');
                    expect("").toEqual("Error de botón Registrarse, no está desactivado"); //forzamos que la prueba falle
                }
            });
            
        } catch (error) {
            console.log("ERROR => ", error);
        } finally {
        }
    });
}



describe("Chrome: Registro de facilitador", function () {
    suiteRegistroFacilitador("chrome")
});

describe("Edge: Registro de facilitador", function () {
    suiteRegistroFacilitador("MicrosoftEdge")
});

describe("Firefox: Registro de facilitador", function () {
    suiteRegistroFacilitador("firefox")
});


describe("Chrome: Registro de facilitador con código ya usado", function () {
    suiteRegistroFacilitadorCodigoUsado("chrome")
});

describe("Edge: Registro de facilitador con código ya usado", function () {
    suiteRegistroFacilitadorCodigoUsado("MicrosoftEdge")
});

describe("Firefox: Registro de facilitador con código ya usado", function () {
    suiteRegistroFacilitadorCodigoUsado("firefox")
});


describe("Chrome: Registro de facilitador con código no existente", function () {
    suiteRegistroFacilitadorCodigoNoExistente("chrome")
});

describe("Edge: Registro de facilitador con código no existente", function () {
    suiteRegistroFacilitadorCodigoNoExistente("MicrosoftEdge")
});

describe("Firefox: Registro de facilitador con código no existente", function () {
    suiteRegistroFacilitadorCodigoNoExistente("firefox")
});


describe("Chrome: Registro de facilitador con datos en blanco", function () {
    suiteRegistroFacilitadorDatosEnBlanco("chrome")
});

describe("Edge: Registro de facilitador con datos en blanco", function () {
    suiteRegistroFacilitadorDatosEnBlanco("MicrosoftEdge")
});

describe("Firefox: Registro de facilitador con datos en blanco", function () {
    suiteRegistroFacilitadorDatosEnBlanco("firefox")
});


describe("Chrome: Registro de facilitador con datos con error de formato", function () {
    suiteRegistroFacilitadorDatosConErrorFormato("chrome")
});

describe("Edge: Registro de facilitador con datos con error de formato", function () {
    suiteRegistroFacilitadorDatosConErrorFormato("MicrosoftEdge")
});

describe("Firefox: Registro de facilitador con datos con error de formato", function () {
    suiteRegistroFacilitadorDatosConErrorFormato("firefox")
});
