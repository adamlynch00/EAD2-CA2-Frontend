describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();

    it('should show register screen after tap', async () => {
      await element(by.id('register-button')).tap();
      await expect(element(by.text('register!!!'))).toBeVisible();
    });
  
    it('should change language after tap', async () => {
      await element(by.id('language-button')).tap();
      await expect(element(by.text('japanese!!!'))).toBeVisible();
    });

    it('should change language to english after tap', async () => {
      await element(by.id('language-button-eng')).tap();
      await expect(element(by.text('english!!!'))).toBeVisible();
    });

    
    
  });

});
