package com.prodyna.swa.bow;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

import org.junit.After;
import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Platform;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.gargoylesoftware.htmlunit.BrowserVersion;

public class Bow57Test {

	private WebDriver driver;

	void wait(long timeOutInSeconds, final String xpath, boolean throwTimeoutException) {
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
		driver.get("http://localhost:8888/bow/");

		driver.findElement(By.xpath("//h1[@id='heading'][starts-with(.,'This is a static page')]"));
	}

	@Test
	public void JavaScriptOnFirefoxTest() throws Exception {

		FirefoxProfile fp = new FirefoxProfile();
		fp.setEnableNativeEvents(true);

		DesiredCapabilities dc = new DesiredCapabilities();
		dc.setCapability(FirefoxDriver.PROFILE, fp);
		dc.setBrowserName("firefox");
		dc.setPlatform(Platform.LINUX);
		dc.setJavascriptEnabled(true);

		// Proxy proxy = new Proxy();
		// String PROXY = "localhost:8080";
		// proxy.setHttpProxy(PROXY).setFtpProxy(PROXY).setSslProxy(PROXY);
		// proxy.setProxyAutoconfigUrl("http://inetprox.inet.cns.fra.dlh.de/lsy.pac");
		// dc.setCapability(CapabilityType.PROXY, proxy);
		// dc.setCapability(CapabilityType.ACCEPT_SSL_CERTS, true);

		final String displayProps = System.getProperty("webDriverDisplayProps");
		Assert.assertEquals("target/test-classes/display.properties", displayProps);

		try {
			File f = new File(displayProps);
			System.out.println("File=" + f.getAbsolutePath() + " CanRead=" + f.canRead());
			BufferedReader br = new BufferedReader(new FileReader(f));
			String line;
			while ((line = br.readLine()) != null)
				System.out.println("Content:" + line);
			br.close();
		} catch (Exception e) {
			; // ignore
		}

		// #Xvfb Display Properties
		// #Wed Nov 28 22:38:29 CET 2012
		// DISPLAY=\:20
		// XAUTHORITY=/tmp/Xvfb4648548945587926008.Xauthority

		FirefoxBinary ffox = new FirefoxBinary();

		try {
			ResourceBundle b = ResourceBundle.getBundle(displayProps.replace(".properties", ""));
			ffox.setEnvironmentProperty("DISPLAY", b.getString("DISPLAY"));
		} catch (MissingResourceException e) {
			System.out.println("INFO: display.properties not written by WebDriver, ignoring:\n" + e.getMessage());
		}

		driver = new FirefoxDriver(ffox, fp, dc);
		driver.manage().window().maximize();
		driver.get("http://localhost:8888/bow/");

		new WebDriverWait(driver, 5).until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("div#map_canvas")));

		driver.findElement(By.xpath("//h1[@id='heading'][starts-with(.,'Welcome to the')]"));
		driver.findElement(By.xpath("//div[@id='map_form_div']/form[@id='mapForm']/input[@id='addressInput']"));
	}
}