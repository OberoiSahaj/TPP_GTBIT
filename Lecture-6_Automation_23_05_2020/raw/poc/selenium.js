// npm install selenium-webdriver chromedriver
require("chromedriver");
let swd = require("selenium-webdriver");
let fs = require("fs");
let credentialsFile = process.argv[2];
// build browser
let bldr = new swd.Builder();
let login, pwd, email;
// represents single tab 
let driver = bldr.forBrowser("chrome").build();
// username,pwd
let fileWillBeReadPromise = fs.promises.readFile(credentialsFile, "utf-8");
// credentials.json
// {
//     "email":"lafibex383@aprimail.com",
//     "pwd":"yourpassword",
//     "login":"https://www.hackerrank.com/auth/login"
// }
// read credentials,
fileWillBeReadPromise
    // go to login page
    .then(function (data) {
        let credentials = JSON.parse(data);
        login = credentials.login;
        email = credentials.email;
        pwd = credentials.pwd;
        let loginPWillBeOpenedP = driver.get(login);
        // login page open wait 
        return loginPWillBeOpenedP;
    }).then(function () {
        let waitForEveryonePromise = driver.manage().setTimeouts({
            implicit: 10000,
            pageLoad: 10000
        })
        return waitForEveryonePromise;
    })
    .then(function () {
        // select element 
        let emailBoxWillBeSelectedPromise = driver.findElement(swd.By.css("#input-1"));
        return emailBoxWillBeSelectedPromise;
    }).then(function (emailBox) {
        let emailWillBeEnteredPromise = emailBox.sendKeys(email);
        return emailWillBeEnteredPromise;
    }).then(function () {
        let pBoxWillBefoundP = driver.findElement(swd.By.css("#input-2"));
        return pBoxWillBefoundP;
    }).then(function (pBox) {
        let pWillBeSendP = pBox.sendKeys(pwd);
        return pWillBeSendP;
    }).then(function () {
        let loginBtnWillBeClickedPromise = navigatorfn("button[data-analytics='LoginPassword']")
        return loginBtnWillBeClickedPromise;
    }).then(function () {
        let ipBtnWillBeClickedPromise = navigatorfn("#base-card-1-link")
        return ipBtnWillBeClickedPromise;
    }).then(function () {
        let wpBtnWillBeCLickedPromise = navigatorfn("a[data-attr1='warmup']")
        return wpBtnWillBeCLickedPromise;
    }).then(function () {
        let qpUrlP = driver.getCurrentUrl();
        return qpUrlP;

    }).
    then(function (qpurl) {
        // how to resolve (n)promises in series 
        let qWillBesolvePromise = questionSolver(qpurl);
        return qWillBesolvePromise;
    })
    .catch(function (err) {
        console.log(err);
    })
// Promise creation=> return 
// resolve
function navigatorfn(selector) {
    // resolve => element select ,click 
    return new Promise(function (resolve, reject) {
        let waitForSelector = driver.findElement(swd.By.css(selector));
        waitForSelector
            .then(function (element) {
                let elementWillBeClickedPromise = element.click();
                return elementWillBeClickedPromise;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })
    })
}

// submit email,
// submit password
// login click
// {
//     "pwd":
//     "email":
//     "link"
// }

function questionSolver(qpurl) {
    return new Promise(function (resolve, reject) {
        let goToQpUrlP = driver.get(qpurl);
        goToQpUrlP.then(function () {
            let goToQuestionP = navigatorfn("a[data-attr1='sock-merchant']");
            return goToQuestionP;
        }).then(function () {
            let goToEditorial = navigatorfn("a[data-attr2='Editorial']");
            return goToEditorial;
        }).then(function () {
            let clickOnLockP = navigatorfn(".ui-btn.ui-btn-normal.ui-btn-primary");
            return clickOnLockP;
        }).catch(function (err) {
            if (err.message === "Cannot read property 'click' of null") {
                console.log("Lock btn did not occur");
            }

        })
            .then(function () {
                resolve();
            }).catch(function (err) {
                console.log(err.message);
                reject();
            })
    })
}
