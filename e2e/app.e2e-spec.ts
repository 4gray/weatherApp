import { WeatherAppPage } from './app.po';

describe('weather-app App', () => {
  let page: WeatherAppPage;

  beforeEach(() => {
    page = new WeatherAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
