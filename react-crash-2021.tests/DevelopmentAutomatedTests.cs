using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;

namespace react_crash_selenium_tests
{
    public class DevelopmentAutomatedTests
    {
        private IWebDriver webDriver;
        private string url;
        private string username;
        private string password;
        private string email;

        [TearDown]
        public void Cleanup()
        {
            webDriver.Quit();
            webDriver.Dispose();
            
        }

        [SetUp]
        public void Setup()
        {
            url = "http://localhost:44310";
            username = "foo@bar.com";
            email = "foo@bar.com";
            password = "Foobar*69";
            webDriver = new ChromeDriver();
            webDriver.Navigate().GoToUrl(url);
        }


        public void Login()
        {
            try
            {
                //go to login
                IWebElement loginLink = webDriver.FindElement(By.XPath("//*[@id=\"basic-navbar-nav\"]/div/a[1]"));
                loginLink.Click();
                //get usern and pw input
                IWebElement unInput = webDriver.FindElement(By.XPath("//*[@id=\"root\"]/div/form/div[1]/input"));
                IWebElement pwInput = webDriver.FindElement(By.XPath("//*[@id=\"root\"]/div/form/div[2]/input"));
                //enter un and pw
                unInput.SendKeys(username);
                pwInput.SendKeys(password);
                //click submit
                webDriver.FindElement(By.XPath("//*[@id=\"root\"]/div/form/button")).Click();
                
            }
            catch
            {
                throw;
            }           
            
        }

        [Test]
        public void LoginTest()
        {
            try
            {
                Login();
                IWebElement tasksHeader = webDriver.FindElement(By.XPath("//*[@id=\"root\"]/div/header/h1"));
                Assert.AreEqual("Task Tracker", tasksHeader.Text);
            }
            catch (Exception e)
            {
                Assert.Fail(e.Message);
            }

        }


        [Test]
        public void TaskCreatingTest()
        {
            Assert.Pass();
        }
        
        [Test]
        public void TaskUpdatingTest()
        {
            Assert.Pass();
        }
        
        [Test]
        public void TaskDeletingTest()
        {
            Assert.Pass();
        }
    }
}