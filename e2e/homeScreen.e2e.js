describe('Home screen', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    beforeEach(async () => {
      await device.reloadReactNative();
    });
  
    it('"Register" button should be visible', async () => {
      await expect(element(by.id('register-button'))).toBeVisible();
    });
  
    /*it('Register Page" after tapping "Register"', async () => {
      await element(by.id('register-button')).tap();
      await expect(element(by.text('Hi!'))).toBeVisible();
    });*/
  });

  