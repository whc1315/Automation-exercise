const { Builder, Capabilities, By } = require("selenium-webdriver");

require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
  await driver.get("http://127.0.0.1:5501/movieList/index.html");
});

afterAll(async () => {
  await driver.quit();
});

test("add a movie", async () => {
  const theInput = await driver.findElement(By.xpath("//input"));

  const searchTerm = "Ice Age";

  await theInput.sendKeys(searchTerm);

  await driver.sleep(2000);

  const theButton = await driver.findElement(By.xpath("//form/button"));

  await theButton.click();

  await driver.sleep(2000);

  const theResult = await driver.findElement(By.xpath("//li/span")).getText();

  expect(theResult).toBe(searchTerm);

  const crossOff = await driver.findElement(By.xpath("//li/span"));

  await crossOff.click();

  let movie = await driver
    .findElement(By.xpath("//li/span"))
    .getAttribute("class");

  expect(movie).toEqual("checked");

  await driver.sleep(2000);

  const uncrossOff = await driver.findElement(By.xpath("//li/span"));

  await uncrossOff.click();

  await driver.sleep(2000);

  const deleteButton = await driver.findElement(By.xpath("//li/button"));

  await deleteButton.click();

  await driver.sleep(250);

  const deleteMessage = await driver.findElement(By.xpath("//main/aside"));

  const message = await deleteMessage.getText();

  expect(message).toBe(`${searchTerm} deleted!`);

  await driver.sleep(3000);
});
