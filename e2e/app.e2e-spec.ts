import { LoyausPage } from './app.po';

describe('loyaus App', function() {
  let page: LoyausPage;

  beforeEach(() => {
    page = new LoyausPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
