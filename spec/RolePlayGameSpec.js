const { Builder, By, Key, until, Capabilities, ActionSequence } = require('selenium-webdriver');
const WAIT_INTERVAL = 10 * 1000;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 120 * 1000;
const SLEEP_INTERVAL = 1000;
const BASE_URL = "http://localhost:8100";
const LOGIN_URL = `${BASE_URL}/login`;
const MAIN_URL = `${BASE_URL}/menu/main`;
const FACILITADOR_USERNAME = 'alvaradomanuel2013@gmail.com';
const FACILITADOR_PASSWORD = '12345';
const NAME_ROOM = 'Sala de prueba';
const NAME_GUEST = 'Invitado 1';

async function playGame(driverMain, driverGuest, username, password, expectedUrl) {
    await driverMain.get(LOGIN_URL);
    console.log("Ingresando usuario...");
    usernameInput = await driverMain.wait(until.elementLocated(By.css('ion-input[formControlName="email"] input')), WAIT_INTERVAL);
    await usernameInput.sendKeys(username, Key.ENTER);
    await driverMain.sleep(SLEEP_INTERVAL);

    console.log("Ingresando clave...");
    passwordInput = await driverMain.wait(until.elementLocated(By.css('ion-input[name="password"] input')), WAIT_INTERVAL);
    await passwordInput.sendKeys(password, Key.RETURN);
    await driverMain.sleep(SLEEP_INTERVAL);

    console.log("Iniciando sesión...");
    await driverMain.findElement(By.xpath('//ion-button[contains(text(), "Iniciar Sesión")]')).click();

    await driverMain.wait(until.urlIs(expectedUrl), WAIT_INTERVAL);
    await driverMain.sleep(SLEEP_INTERVAL);

    console.log("Entrando a la sección Mis salas...");
    await driverMain.findElement(By.xpath('//ion-button[contains(text(), "Mis salas")]')).click();
    await driverMain.sleep(SLEEP_INTERVAL * 5);

    console.log("Entrando a la sección Mis salas...");
    await driverMain.wait(until.elementLocated(By.id('button-add')), WAIT_INTERVAL).click();
    await driverMain.sleep(SLEEP_INTERVAL * 5);

    console.log("Ingresando nombre de la sala...");
    await driverMain.wait(until.elementLocated(By.id('alert-input-1-0')), WAIT_INTERVAL).sendKeys(NAME_ROOM, Key.ENTER);
    await driverMain.findElement(By.xpath('//*[contains(text(), "Guardar")]')).click();
    await driverMain.sleep(SLEEP_INTERVAL * 5);

    let roomCode = await driverMain.wait(until.elementLocated(By.id('room-code')), WAIT_INTERVAL).getText();
    console.log(roomCode);

    console.log("Creando usuario como invitado...");
    await driverGuest.get(LOGIN_URL);
    await driverGuest.sleep(SLEEP_INTERVAL);
    await driverGuest.wait(until.elementLocated(By.css('button[class="room-button"]')), WAIT_INTERVAL).click();
    await driverGuest.sleep(SLEEP_INTERVAL);
    await driverGuest.wait(until.elementLocated(By.css('ion-input[id="roomCode"] input')), WAIT_INTERVAL).sendKeys(roomCode);
    //await driverGuest.findElement(By.xpath('//ion-button[contains(text(), " Ingresar a sala ")]')).click();
    const btnIngresaSala = await driverGuest.wait(until.elementLocated(By.xpath('//ion-button[contains(text(), " Ingresar a sala ")]')), WAIT_INTERVAL);
    await btnIngresaSala.click();
    await driverGuest.sleep(SLEEP_INTERVAL);
    await driverGuest.wait(until.elementLocated(By.css('ion-input[id="guestName"] input')), WAIT_INTERVAL).sendKeys(NAME_GUEST);
    await driverGuest.findElement(By.xpath('//ion-button[contains(text(), " Ingresar ")]')).click();
    await driverGuest.sleep(SLEEP_INTERVAL);
    await driverGuest.findElement(By.xpath('//ion-button[contains(text(), "Role-play game")]')).click();
    await driverGuest.sleep(SLEEP_INTERVAL);

    console.log("Iniciando dinámica...");
    await driverMain.findElement(By.xpath('//ion-button[contains(text(), " Iniciar dinámica ")]')).click();
    await driverMain.sleep(SLEEP_INTERVAL * 2);

    let btnOk = await driverGuest.wait(until.elementLocated(By.xpath('//span[contains(text(), "Ok")]')), WAIT_INTERVAL);
    await btnOk.click();

    console.log("Seleccionando arquetipo...");
    await driverGuest.sleep(SLEEP_INTERVAL);
    await driverGuest.wait(until.elementLocated(By.css('ion-col[id="card-character-1"]')), WAIT_INTERVAL).click();
    await driverGuest.sleep(SLEEP_INTERVAL);
    const btnNext1 = await driverGuest.wait(until.elementLocated(By.id('btn-next-1')), WAIT_INTERVAL);
    await btnNext1.click();
    await driverGuest.sleep(SLEEP_INTERVAL);
    btnOk = await driverGuest.wait(until.elementLocated(By.xpath('//span[contains(text(), "Ok")]')), WAIT_INTERVAL);
    await btnOk.click();


    console.log("Seleccionando competencias...");
    await driverGuest.sleep(SLEEP_INTERVAL);
    const btnFirstAbility = await driverGuest.wait(until.elementLocated(By.id('btn-first-ability')), WAIT_INTERVAL);
    for (let i = 0; i < 4; i++) {
        await btnFirstAbility.click();
        await driverGuest.sleep(SLEEP_INTERVAL);
    }
    const btnSecondAbility = await driverGuest.wait(until.elementLocated(By.id('btn-second-ability')), WAIT_INTERVAL);
    for (let i = 0; i < 4; i++) {
        await btnSecondAbility.click();
        await driverGuest.sleep(SLEEP_INTERVAL);
    }
    const btnThirdAbility = await driverGuest.wait(until.elementLocated(By.id('btn-third-ability')), WAIT_INTERVAL);
    for (let i = 0; i < 4; i++) {
        await btnThirdAbility.click();
        await driverGuest.sleep(SLEEP_INTERVAL);
    }

    //Agregar competencias restantes
    for (let competency = 4; competency <= 7; competency++) {
        await driverGuest.wait(until.elementLocated(By.id(`btn-add-competency-${competency}`)), WAIT_INTERVAL).click();
        await driverGuest.sleep(SLEEP_INTERVAL);
        btnOk = await driverGuest.wait(until.elementLocated(By.xpath('//span[contains(text(), "Ok")]')), WAIT_INTERVAL);
        await btnOk.click();
        await driverGuest.sleep(SLEEP_INTERVAL);
    }

    const btnNext2 = await driverGuest.wait(until.elementLocated(By.id('btn-next-2')), WAIT_INTERVAL);
    await btnNext2.click();

    btnOk = await driverGuest.wait(until.elementLocated(By.xpath('//span[contains(text(), "Ok")]')), WAIT_INTERVAL);
    await btnOk.click();

    console.log("Creando reto...");
    const txtChallenge = await driverGuest.wait(until.elementLocated(By.css('#txt-challenge textarea')), WAIT_INTERVAL);
    await txtChallenge.sendKeys('Esto es un reto de prueba');
    await driverGuest.sleep(SLEEP_INTERVAL);
    const btnSendChallenge = await driverGuest.wait(until.elementLocated(By.id('btn-send-challenge')), WAIT_INTERVAL);
    await btnSendChallenge.click();
    await driverGuest.sleep(SLEEP_INTERVAL * 2);

    console.log("Aceptando reto...");
    await driverMain.wait(until.elementLocated(By.xpath('//ion-button[contains(text(), "Aceptar")]')), WAIT_INTERVAL).click();
    await driverMain.sleep(SLEEP_INTERVAL);
    await driverMain.wait(until.elementLocated(By.xpath('//span[contains(text(), "Aceptar")]')), WAIT_INTERVAL).click();
    await driverMain.sleep(SLEEP_INTERVAL);
    await driverMain.sleep(SLEEP_INTERVAL);
    await driverMain.wait(until.elementLocated(By.id('btn-iniciar-dinamica')), WAIT_INTERVAL).click();
    
    

    console.log("Turno de invitado...");
    await driverGuest.wait(until.elementLocated(By.id('select-competencia')), WAIT_INTERVAL).click();
    await driverGuest.sleep(SLEEP_INTERVAL);
    await driverGuest.wait(until.elementLocated(By.xpath('//div[contains(text(), "Buen trato (5)")]')), WAIT_INTERVAL).click();
    await driverGuest.sleep(SLEEP_INTERVAL);
    await driverGuest.wait(until.elementLocated(By.xpath('//span[contains(text(), "OK")]')), WAIT_INTERVAL).click();
    await driverGuest.sleep(SLEEP_INTERVAL);
    await driverGuest.wait(until.elementLocated(By.id('puntos-desarrollo')), WAIT_INTERVAL).click();
    await driverGuest.sleep(SLEEP_INTERVAL);
    await driverGuest.wait(until.elementLocated(By.id('puntos-destino')), WAIT_INTERVAL).click();
    await driverGuest.wait(until.elementLocated(By.css('textarea')), WAIT_INTERVAL).sendKeys("Solución al problema", Key.ENTER);
    await driverGuest.sleep(SLEEP_INTERVAL);
    await driverGuest.wait(until.elementLocated(By.xpath('//ion-button[contains(text(), " Lanzar dados ")]'))).click();
    await driverGuest.sleep(SLEEP_INTERVAL);
    await driverGuest.wait(until.elementLocated(By.id('btn-finalizar-turno')), WAIT_INTERVAL).click();    

    console.log("Terminando dinámica...");
    await driverMain.sleep(SLEEP_INTERVAL);
    await driverMain.wait(until.elementLocated(By.xpath('//ion-button[contains(text(), " Calificar respuesta ")]'))).click();
    await driverMain.sleep(SLEEP_INTERVAL);
    await driverMain.wait(until.elementLocated(By.id('btn-finalizar-dinamica')), WAIT_INTERVAL).click();   
    await driverMain.sleep(SLEEP_INTERVAL);
    await driverMain.wait(until.elementLocated(By.id('btn-concluir-dinamica')), WAIT_INTERVAL).click();   
    
    await driverMain.sleep(SLEEP_INTERVAL * 5);
    const url = await driverMain.getCurrentUrl();
    return url;
}

function suitePlayGame(browser) {
    beforeAll(async function () {
        this.driverMain = await new Builder().forBrowser(browser).build();
        this.driverGuest = await new Builder().forBrowser(browser).build();
        this.driverMain.manage().window().maximize();
        this.driverGuest.manage().window().maximize();
    });

    afterAll(async function () {
        console.log("Cerrando navegador...");
        this.driverMain.quit();
        this.driverGuest.quit();
        console.log("Navegador cerrado");
    });

    it('Play game', async function () {
        try {
            console.log("Browser: ", browser);
            const expected = MAIN_URL;
            const url = await playGame(this.driverMain, this.driverGuest, FACILITADOR_USERNAME, FACILITADOR_PASSWORD, expected);
            await this.driverMain.sleep(SLEEP_INTERVAL * 3);
            console.log('URL => ', url);
            expect(url).toBe(MAIN_URL);
        } catch (error) {
            console.log(error);
        } finally {
        }
    });
}

describe("Chrome: Simulando juego completo", function () {
    suitePlayGame("chrome")
});

describe("Edge: Simulando juego completo", function () {
    suitePlayGame("MicrosoftEdge")
});

describe("Firefox: Simulando juego completo", function () {
    suitePlayGame("firefox")
});