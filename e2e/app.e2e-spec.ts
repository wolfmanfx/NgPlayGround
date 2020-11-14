import { AppPage } from './app.po';

describe('starter App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Flight42 message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Flight42');
  });
});
