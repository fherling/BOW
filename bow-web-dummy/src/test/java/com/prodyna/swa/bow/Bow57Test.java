package com.prodyna.swa.bow;

import org.junit.After;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.gargoylesoftware.htmlunit.BrowserVersion;

public class Bow57Test {

	private WebDriver driver;

	private void wait(long timeOutInSeconds, final String xpath, boolean throwTimeoutException) {
		try {
			new WebDriverWait(driver, timeOutInSeconds).until(new ExpectedCondition<Boolean>() {
				@Override
				public Boolean apply(WebDriver d) {
					return xpath != null && d.findElement(By.xpath(xpath)) != null;
				}
			});
		} catch (TimeoutException e) {
			e.printStackTrace();
			if (throwTimeoutException)
				throw e;
		}
	}

	@After
	public void tearDown() {
		driver.quit();
	}

	@Test
	public void JavaScriptOffFirefoxTest() throws Exception {

		driver = new HtmlUnitDriver(BrowserVersion.FIREFOX_3_6);
		((HtmlUnitDriver) driver).setJavascriptEnabled(false);
		driver.get("http://localhost:8080/bow/");

		driver.findElement(By.xpath("//h1[@id='heading'][starts-with(.,'This is a static page')]"));
	}

	@Test
	public void JavaScriptOnFirefoxTest() throws Exception {

		driver = new FirefoxDriver();
		// ((FirefoxDriver) driver).setJavascriptEnabled(true); DEFAULT ON
		driver.manage().window().maximize();
		driver.get("http://localhost:8080/bow/");

		new WebDriverWait(driver, 5).until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div#map_canvas")));

		driver.findElement(By.xpath("//h1[@id='heading'][starts-with(.,'Welcome to the')]"));
		driver.findElement(By.xpath("//div[@id='map_form_div']/form[@id='mapForm']/input[@id='addressInput']"));
	}
}