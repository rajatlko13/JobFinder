const { Builder, By, Key, Util} = require("selenium-webdriver");

async function example() {
    const driver = await new Builder().forBrowser('chrome').build();

    await driver.get('http://localhost:3000');
    //await driver.findElement(By.name('q')).sendKeys('Selenium',Key.RETURN);
    await driver.findElement(By.xpath("//a[@href='/features']")).click();
}

example();
